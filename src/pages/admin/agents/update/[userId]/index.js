import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, TreeSelect, notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";

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
    profile_image: `/default-users.jpeg`,
    profile_image_file: null, // File | null (hanya digunakan sebagai payload)
    role_ids: [],
    position: "",
    nip: "",
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
  const onChangeEditFoto = async (e) => {
    setLoadingfoto(true);
    const blobFile = e.target.files[0];
    const base64Data = await getBase64(blobFile);

    setdataupdate({
      ...dataupdate,
      profile_image: base64Data,
      profile_image_file: blobFile,
    });
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
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#formAgentsWrapper">
            <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
              <h1 className="font-semibold py-2">Ubah Profil Agent</h1>
              <div className="flex space-x-2">
                <Button
                  disabled={preloading}
                  onClick={() => {
                    rt.back();
                  }}
                  type="default"
                >
                  Batal
                </Button>
                {
                  <Button
                    disabled={preloading || !isAllowedToUpdateAgent}
                    type="primary"
                    loading={loadingupdate}
                    onClick={instanceForm.submit}
                  >
                    Simpan
                  </Button>
                }
              </div>
            </div>
          </Sticky>
        </div>
        <div
          className=" col-span-1 md:col-span-3 flex flex-col"
          id="formAgentsWrapper"
        >
          <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-5">
            <div className="border-b border-black p-4 font-semibold mb-5 flex">
              <div className=" mr-3 md:mr-5 pt-1">
                Ubah Profil Agent - {dataupdate.fullname}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="p-3 col-span-1 md:col-span-1 flex flex-col items-center">
                <img
                  src={dataupdate.profile_image}
                  alt="imageProfile"
                  className=" object-cover w-32 h-32 rounded-full mb-4"
                />
                {
                  <label
                    className="custom-file-upload py-2 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3"
                    onClick={(e) => {
                      if (!isAllowedToUpdateAgent) {
                        permissionWarningNotification(
                          "Memperbarui",
                          "Detail Agent"
                        );
                        e.stopPropagation();
                      }
                    }}
                  >
                    <AccessControl hasPermission={AGENT_UPDATE}>
                      <input
                        type="file"
                        style={{ display: `none` }}
                        name="profile_image"
                        onChange={onChangeEditFoto}
                      />
                    </AccessControl>
                    {loadingfoto ? (
                      <LoadingOutlined />
                    ) : (
                      <EditOutlined style={{ fontSize: `1.2rem` }} />
                    )}
                    Ganti Foto
                  </label>
                }
              </div>
              {preloading ? null : (
                <div className="p-3 col-span-1 md:col-span-3">
                  <Form
                    layout="vertical"
                    initialValues={dataupdate}
                    form={instanceForm}
                    onFinish={handleSubmitEditAccount}
                  >
                    <Form.Item label="Company" name="company_id">
                      <Select
                        showSearch
                        allowClear
                        placeholder="Pilih company"
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
                      label="Nama Lengkap"
                      required
                      name="fullname"
                      rules={[
                        {
                          required: true,
                          message: "Nama Lengkap wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        value={dataupdate.fullname}
                        onChange={onChangeEditAgents}
                        name="fullname"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email"
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
                      label="Posisi"
                      required
                      name="position"
                      rules={[
                        {
                          required: true,
                          message: "Posisi wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        value={dataupdate.position}
                        name={`position`}
                        onChange={onChangeEditAgents}
                      />
                    </Form.Item>
                    <Form.Item
                      label="No. Handphone"
                      required
                      name="phone_number"
                      rules={[
                        {
                          required: true,
                          message: "No. Handphone wajib diisi",
                        },
                        {
                          pattern: /(\-)|(^\d*$)/,
                          message: "No. Handphone harus berisi angka",
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
                      name="nip"
                      rules={[
                        {
                          required: true,
                          message: "NIP wajib diisi",
                        },
                        {
                          pattern: /^[0-9]*$/,
                          message: "NIP harus berisi angka",
                        },
                      ]}
                    >
                      <Input
                        value={dataupdate.nip}
                        name="nip"
                        onChange={onChangeEditAgents}
                      />
                    </Form.Item>

                    {/* Form Aktivitas */}
                    <Form.Item
                      label="Form Aktivitas"
                      name="attendance_form_ids"
                    >
                      <Select
                        showSearch
                        allowClear
                        placeholder="Pilih form aktivitas"
                        filterOption={false}
                        onSearch={(value) => setFormAktivitasValue(value)}
                        onChange={(value) => {
                          if (value === undefined || value === "") {
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

                    <h1 className="text-sm">Role:</h1>
                    {
                      <Select
                        mode="multiple"
                        showSearch
                        disabled={!isAllowedToGetRolesList}
                        placeholder="Pilih Role"
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
                          option?.label
                            ?.toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    }
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, resolvedUrl, params }) {
  const userid = params.userId;
  var initProps = {};
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
