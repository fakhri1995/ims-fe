import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  TreeSelect,
  Upload,
  notification,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";
import { ArrowLeftIconSvg, CheckIconSvg, UploadIconSvg } from "components/icon";
import { ModalAccept } from "components/modal/modalConfirmation";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";
import { useDebounce } from "hooks/use-debounce-value";

import {
  AGENT_GET,
  AGENT_UPDATE,
  COMPANY_CLIENTS_GET,
  ROLES_GET,
} from "lib/features";
import {
  generateStaticAssetUrl,
  getBase64,
  permissionWarningNotification,
} from "lib/helper";

import { AttendanceFormAktivitasService } from "apis/attendance";
import { AgentService } from "apis/user";

import UserPicturUploadIcon from "assets/vectors/user-picture-upload.svg";

import Layout from "../../../../../components/layout-dashboard-management";
import st from "../../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function AgentUpdate({
  initProps,
  dataProfile,
  dataDetailRequester,
  dataRoles,
  sidemenu,
  userid,
}) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetRolesList = hasPermission(ROLES_GET);
  const isAllowedToGetAgentDetail = hasPermission(AGENT_GET);
  const isAllowedToUpdateAgent = hasPermission(AGENT_UPDATE);
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);

  const axiosClient = useAxiosClient();
  const rt = useRouter();

  const tok = initProps;
  const [instanceForm] = Form.useForm();
  const { Option } = Select;

  // START: Form Aktivitas
  const [searchFormAktivitasValue, setFormAktivitasValue] = useState("");
  const [modalConfirm, setModalConfirm] = useState(false);

  const debouncedSearchFormAktivitasValue = useDebounce(
    searchFormAktivitasValue
  );

  const { data: formAktivitasData, refetch: findFormAktivitas } = useQuery(
    ["ATTENDANCE_FORMS_GET", debouncedSearchFormAktivitasValue],
    (query) => {
      const searchKeyword = query.queryKey[1];

      return AttendanceFormAktivitasService.find(axiosClient, {
        keyword: searchKeyword,
      });
    },
    {
      enabled: false,
      select: (response) =>
        response.data.data.data.map((formAktivitasDatum) => ({
          id: formAktivitasDatum.id,
          name: formAktivitasDatum.name,
        })),
    }
  );

  useEffect(() => {
    findFormAktivitas({
      queryKey: ["ATTENDANCE_FORMS_GET", debouncedSearchFormAktivitasValue],
      exact: true,
    });
  }, [debouncedSearchFormAktivitasValue]);
  // END: Form Aktivitas

  //loading upload image
  const [loadingfoto, setLoadingfoto] = useState(false);
  //data payload
  const [dataupdate, setdataupdate] = useState({
    id: Number(userid),
    company_id: null,
    fullname: "",
    phone_number: "",
    email: "",
    profile_image: `/default-users.jpeg`,
    profile_image_file: null, // File | null (hanya digunakan sebagai payload)
    role_ids: [],
    position: "",
    nip: 0,
    attendance_form_ids: [],
  });
  //data company
  const [dataCompanyList, setDataCompanyList] = useState([]);
  //data default roles
  const [defaultroles, setdefaultroles] = useState(0);
  //data breadcrumb
  const [patharr, setpatharr] = useState([]);
  //loading pre render
  const [preloading, setpreloading] = useState(true);
  //loading update button
  const [loadingupdate, setLoadingupdate] = useState(false);
  //data roles
  const [dataroles, setdataroles] = useState({ data: [] });

  const onChangeRole = (value) => {
    setdataupdate({
      ...dataupdate,
      role_ids: value,
    });
  };
  const onChangeEditAgents = (e) => {
    setdataupdate({
      ...dataupdate,
      [e.target.name]: e.target.value,
    });

    instanceForm.setFieldValue(e.target.name, e.target.value);
  };

  const onChangeEditFoto = async (info) => {
    if (info.file.status === "uploading") {
      setLoadingfoto(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);

      setdataupdate({
        ...dataupdate,
        profile_image: base64Data,
        profile_image_file: blobFile,
      });
    }
    setLoadingfoto(false);
  };
  const handleSubmitEditAccount = () => {
    setLoadingupdate(true);

    const updatePayload = {
      ...dataupdate,
      profile_image: dataupdate.profile_image_file,
    };
    if ("profile_image_file" in updatePayload) {
      delete updatePayload["profile_image_file"];
    }

    AgentService.update(axiosClient, updatePayload)
      .then((response) => {
        const res2 = response.data;
        setLoadingupdate(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.back();
          }, 300);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Terjadi kesalahan saat memperbarui profil",
          duration: 3,
        });
      });
  };

  const fetchAgentDetail = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAgentDetail?account_id=${userid}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        // Update default `attendance_form_ids` data
        let currentAttendanceFormIds = [];
        /** @type {{id: number; name: string}[]} */
        const userAttendanceForms = res2.data.attendance_forms;
        if (userAttendanceForms.length > 0) {
          currentAttendanceFormIds = userAttendanceForms.map(
            (attendanceForm, index) => {
              if (index === 0) {
                setFormAktivitasValue(attendanceForm.name);
              }
              return attendanceForm.id;
            }
          );
        }

        var temp = {
          id: res2.data.id,
          company_id: res2.data.company_id,
          fullname: res2.data.name,
          role: res2.data.role,
          phone_number: res2.data.phone_number,
          profile_image: generateStaticAssetUrl(res2.data.profile_image?.link),
          profile_image_file: null,
          // profile_image:
          //   res2.data.profile_image === "" || res2.data.profile_image === "-"
          //     ? `/default-users.jpeg`
          //     : res2.data.profile_image,
          email: res2.data.email,
          role_ids: res2.data.roles.map((docmap) => docmap.id),
          position: res2.data.position,
          nip: res2.data?.nip || "",
          attendance_form_ids: currentAttendanceFormIds,
        };
        setdataupdate(temp);
        setdefaultroles(res2.data.roles.map((docmap) => docmap.id));
        var pathArr = rt.pathname.split("/").slice(1);
        pathArr.splice(3, 1);
        pathArr[pathArr.length - 1] = `Ubah Profil Agent - ` + res2.data.name;
        setpatharr(pathArr);
        setpreloading(false);
      });
  };

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetAgentDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Agent");
      return () => {};
    }

    fetchAgentDetail();
  }, [isAllowedToGetAgentDetail, userid]);

  useEffect(() => {
    // Update form values when initialValues change
    instanceForm.setFieldsValue(dataupdate);
  }, [dataupdate, instanceForm]);

  // Get Role options
  useEffect(() => {
    if (isAllowedToGetRolesList) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRoles`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setdataroles(res2);
        });
      return () => {};
    }
  }, [isAllowedToGetRolesList]);

  // Get Company options
  useEffect(() => {
    if (!isAllowedToGetCompanyClients) {
      setpreloading(false);
      return () => {};
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList?with_mig=1`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setDataCompanyList(res2.data);
      })
      .catch((err) => {
        notification.error({
          message: "Gagal mendapatkan daftar company",
          duration: 3,
        });
      })
      .finally(() => setpreloading(false));
  }, [isAllowedToGetCompanyClients]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={patharr}
      sidemenu={sidemenu}
      dataDetailAccount={dataupdate}
      st={st}
    >
      <div className="w-full bg-white rounded-[10px] border border-neutrals70 shadow-desktopCard">
        <Sticky containerSelectorFocus="#formAgentsWrapper">
          <div
            className={
              "px-5 bg-white py-5 border-b flex justify-between items-center"
            }
          >
            <div className={"flex gap-3"}>
              <div className={"hover:cursor-pointer"} onClick={() => rt.back()}>
                <ArrowLeftIconSvg color={"#808080"} size={20} />
              </div>

              <p
                className={"text-[16px]/6 font-bold font-inter text-[#424242]"}
              >
                Edit Account
              </p>
            </div>
            <div className={"flex flex-row gap-3"}>
              <div
                onClick={() => {
                  rt.back();
                }}
                className={
                  "hover:cursor-pointer border border-primary100 text-primary100 rounded-[5px] h-[36px] w-[76px] flex justify-center items-center"
                }
              >
                <p className={"text-sm/4 font-inter font-normal"}>Cancel</p>
              </div>
              <div
                onClick={() => setModalConfirm(true)}
                className={
                  "hover:cursor-pointer border bg-primary100 border-primary100 text-white rounded-[5px] h-[36px] w-[79px] gap-1.5 flex justify-center items-center"
                }
              >
                <CheckIconSvg size={16} />
                <p className={"text-sm/4 font-inter font-normal"}>Save</p>
              </div>
            </div>
          </div>
        </Sticky>
        <div
          className={"grid grid-cols-1 md:grid-cols-3 md:space-x-5 px-6 pt-5"}
        >
          <div className={"col-span-1"}>
            <div className={"flex items-center gap-5"}>
              {dataupdate.profile_image ? (
                <img
                  src={dataupdate.profile_image}
                  alt="avatar"
                  style={{ width: 120, height: 120 }}
                />
              ) : (
                <div
                  className={
                    "w-[120px] h-[120px] flex justify-center items-center shadow-desktopCard rounded-[15px]"
                  }
                >
                  <UserPicturUploadIcon />
                </div>
              )}

              <div className={"flex flex-col gap-2.5 justify-center"}>
                <p
                  className={"font-inter font-medium text-xs/5 text-[#4D4D4D]"}
                >
                  Account Picture <span className={"text-[#BF4A40]"}>*</span>
                </p>
                <Upload
                  name="profile_image"
                  // listType="picture-card"
                  className="profileImage"
                  showUploadList={false}
                  // beforeUpload={beforeUploadProfileImage}
                  onChange={onChangeEditFoto}
                >
                  <Button
                    className="btn-sm btn font-semibold px-4 flex gap-1.5 border
                           hover:text-white bg-white border-[#4D4D4D]
                          hover:bg-primary75 hover:border-primary75  
                          focus:border-primary75 focus:text-primary100 "
                  >
                    <UploadIconSvg size={16} color={"#4D4D4D"} />
                    <p
                      className={
                        "text-sm/4 font-roboto font-medium text-[#4D4D4D]"
                      }
                    >
                      Upload File
                    </p>
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
          <Form
            name="agentForm"
            layout="vertical"
            initialValues={dataupdate}
            form={instanceForm}
            className={"col-span-2"}
            onFinish={handleSubmitEditAccount}
          >
            <div className={"grid grid-cols-2 space-x-5"}>
              <Form.Item
                className={"col-span-1"}
                label="Company"
                name="company_id"
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Select company"
                  value={dataupdate?.company_id}
                  options={dataCompanyList.map((company) => ({
                    label: company.name,
                    value: company.id,
                  }))}
                  filterOption={(input, option) => {
                    return (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                  onChange={(value) => {
                    setdataupdate({ ...dataupdate, company_id: value });
                  }}
                  disabled={!isAllowedToGetCompanyClients}
                />
              </Form.Item>
              <Form.Item
                label="Full Name"
                className={"col-span-1"}
                required
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: "Full Name must be filled",
                  },
                ]}
              >
                <Input
                  value={dataupdate.fullname}
                  onChange={onChangeEditAgents}
                  name="fullname"
                />
              </Form.Item>
            </div>
            <div className={"grid grid-cols-2 space-x-5"}>
              <Form.Item
                label="Email"
                className={"col-span-1"}
                required
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email wajib diisi",
                  },
                  {
                    pattern:
                      /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                    message: "Email belum diisi dengan benar",
                  },
                ]}
              >
                <Input
                  disabled
                  value={dataupdate.email}
                  name={`email`}
                  onChange={onChangeEditAgents}
                />
              </Form.Item>
              <Form.Item
                label="Position"
                className={"col-span-1"}
                required
                name="position"
                rules={[
                  {
                    required: true,
                    message: "Position must be filled",
                  },
                ]}
              >
                <Input
                  value={dataupdate.position}
                  name={`position`}
                  onChange={onChangeEditAgents}
                />
              </Form.Item>
            </div>
            <div className={"grid grid-cols-2 space-x-5"}>
              <Form.Item
                label="Phone Number"
                className={"col-span-1"}
                required
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Phone Number must be filled",
                  },
                  {
                    pattern: /(\-)|(^\d*$)/,
                    message: "Phone number must number",
                  },
                ]}
              >
                <Input
                  value={dataupdate.phone_number}
                  onChange={onChangeEditAgents}
                  name="phone_number"
                />
              </Form.Item>
              <Form.Item
                label="NIP"
                className={"col-span-1"}
                name="nip"
                rules={[
                  {
                    required: true,
                    message: "NIP must be filled",
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: "NIP must number",
                  },
                ]}
              >
                <Input
                  value={dataupdate.nip}
                  name="nip"
                  onChange={onChangeEditAgents}
                />
              </Form.Item>
            </div>
            <div className={"grid grid-cols-2 space-x-5"}>
              <Form.Item label="Activity Form" name="attendance_form_ids">
                <Select
                  showSearch
                  allowClear
                  placeholder="Select Activity Form"
                  filterOption={false}
                  onSearch={(value) => setFormAktivitasValue(value)}
                  onChange={(value) => {
                    if (!value) {
                      setdataupdate((prev) => ({
                        ...prev,
                        attendance_form_ids: [],
                      }));
                      setFormAktivitasValue("");
                    }

                    setdataupdate((prev) => ({
                      ...prev,
                      attendance_form_ids: [value],
                    }));
                  }}
                  value={dataupdate?.attendance_form_ids}
                >
                  {formAktivitasData?.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Account Role" name="role">
                {
                  <Select
                    mode="multiple"
                    showSearch
                    disabled={!isAllowedToGetRolesList}
                    placeholder="Select Role"
                    onChange={(value) => {
                      onChangeRole(value);
                    }}
                    defaultValue={defaultroles}
                    style={{ width: `100%` }}
                    options={dataroles.data.map((doc) => ({
                      label: doc.name,
                      value: doc.id,
                    }))}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.label?.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                }
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
      <ModalAccept
        visible={modalConfirm}
        loading={loadingupdate}
        disabled={!isAllowedToUpdateAgent}
        htmlType="submit"
        form="agentForm"
        onOk={() => {
          setModalConfirm(false);
        }}
        onCancel={() => setModalConfirm(false)}
        title="Ubah Profil Agent"
      >
        <p>
          Apakah Anda yakin ingin mengubah profil agent dengan nama{" "}
          <strong>{dataupdate?.fullname}</strong>?
        </p>
      </ModalAccept>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, resolvedUrl, params }) {
  const userid = params.userId;
  var initProps = "";
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;

  const resources = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjson = await resources.json();
  const dataProfile = resjson;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "61",
      userid,
    },
  };
}

export default AgentUpdate;
