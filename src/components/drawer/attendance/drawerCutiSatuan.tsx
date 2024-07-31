import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  RightOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  Table,
  Tag,
  Upload,
  notification,
} from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import { RcFile } from "antd/lib/upload";
import { AxiosResponse } from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import ButtonSys from "components/button";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { MAX_SCHEDULED_DAYS, TODAY } from "lib/constants";
import {
  AGENTS_GET,
  COMPANY_CLIENTS_GET,
  FILTER_EMPLOYEES_GET,
  LEAVE_TYPES_GET,
} from "lib/features";
import {
  generateStaticAssetUrl,
  getBase64,
  permissionWarningNotification,
} from "lib/helper";

import {
  AgentService,
  IGetAgentsPaginateParams,
  IGetAgentsPaginateSucceedResponse,
} from "apis/user";

import DrawerCore from "../drawerCore";

const DrawerCutiSatuan = ({
  dataToken,
  visible,
  onCancel,
}: {
  dataToken: string;
  visible: boolean;
  onCancel: () => void;
}) => {
  const [showData, setShowData] = useState("1");
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const clickDetailEmployee = () => {
    setShowData("2");
  };
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }
  const [instanceForm] = Form.useForm();
  const isAllowedToGetAgents = hasPermission(AGENTS_GET);
  const isAllowedToGetCompanyList = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetEmployees = hasPermission(FILTER_EMPLOYEES_GET);
  const isAllowedToGetLeaveTypes = hasPermission(LEAVE_TYPES_GET);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [dataAgents, setDataAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [dataEmployees, setDataEmployees] = useState([]);
  const [dataDelegates, setDataDelegates] = useState([]);
  const [dataTipeCutis, setDataTipeCutis] = useState([]);
  const [dokumenFileBlob, setDokumenFileBlob] = useState<RcFile | Blob | File>(
    null
  );
  const [dataCuti, setDataCuti] = useState({
    employee_id: null,
    start_date: null,
    end_date: null,
    delegasi: null,
    tipe_cuti: null,
    catatan: null,
    document_requirement: true,
  });
  const searchTimeoutRef = useRef(null);
  const [agentFilterParams, setAgentFilterParams] =
    useState<IGetAgentsPaginateParams>({
      page: 1,
      rows: 10,
      name: "",
      company_id: null,
      is_enabled: 1,
    });
  const [isMaxAgents, setIsMaxAgents] = useState(false);
  const closeDrawer = () => {
    if (showData == "2") {
      setShowData("1");
    } else {
    }
  };
  const onChangeSearchAgents = (e) => {
    setTimeout(
      () => setAgentFilterParams((prev) => ({ ...prev, name: e.target.value })),
      500
    );
  };

  const handleSelect = (value, checked) => {
    const currentSelected = value;
    let newSelectedAgents = [];
    let newSelectedAgentIds = [];
    if (checked && selectedAgents?.length < 20) {
      newSelectedAgents = [...selectedAgents, currentSelected];
    } else {
      newSelectedAgents = selectedAgents.filter(
        (obj) => obj.id !== currentSelected?.id
      );
    }
    newSelectedAgentIds = newSelectedAgents.map((item) => item?.id);
    setSelectedAgents(newSelectedAgents);

    handleCheckMaxAgents(newSelectedAgents);
  };

  const handleSelectAll = () => {
    setSelectedAgents(dataAgents);

    handleCheckMaxAgents(dataAgents);
  };

  const handleUnselectAll = () => {
    setSelectedAgents([]);

    handleCheckMaxAgents([]);
  };

  const handleCheckMaxAgents = (selectedAgents) => {
    if (selectedAgents?.length >= 20) {
      setIsMaxAgents(true);
    } else {
      setIsMaxAgents(false);
    }
  };
  useEffect(() => {
    if (visible) {
      fetchData();
      fetchDataEmployees();
    }
  }, [visible]);

  const fetchData = async () => {
    if (!isAllowedToGetLeaveTypes) {
      permissionWarningNotification("Mendapatkan", "Daftar Tipe Cuti");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeaveTypes`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(dataToken),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          // setDataRawTipeCuti(res2.data); // table-related data source
          setDataTipeCutis(res2.data);
        });
    }
  };

  const {
    data: dataRawAgents,
    isLoading: loadingAgents,
    refetch: refetchAgents,
  } = useQuery(
    [AGENTS_GET, agentFilterParams],
    () =>
      AgentService.getAgents(
        isAllowedToGetAgents,
        axiosClient,
        agentFilterParams
      ),
    {
      enabled: isAllowedToGetAgents && visible,
      select: (response: AxiosResponse<IGetAgentsPaginateSucceedResponse>) => {
        return response.data.data;
      },
      onSuccess: (data) => setDataAgents(data.data),
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar karyawan (agent).",
        });
      },
    }
  );

  const [dataPengajuan, setDataPengajuan] = useState({
    user_ids: [],
    date: "",
    tipe_cuti: null,
    start_date: "",
    end_date: "",
  });

  const validateRepetitionRange = (_, value) => {
    if (value && value[1].diff(value[0], "days") > MAX_SCHEDULED_DAYS) {
      return Promise.reject(
        "Maksimal rentang tanggal yang dapat dipilih adalah 3 bulan"
      );
    }
    return Promise.resolve();
  };

  const fetchDataEmployees = async () => {
    if (!isAllowedToGetEmployees) {
      permissionWarningNotification("Mendapatkan", "Daftar Karyawan");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterEmployees`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(dataToken),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setDataEmployees(res2.data);
          setDataDelegates(res2.data);
        });
    }
  };

  const onSearchUsers = (searchKey, setData) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (!isAllowedToGetEmployees) {
      permissionWarningNotification("Mendapatkan", "Daftar Karyawan");
    } else {
      setLoading(true);
      searchTimeoutRef.current = setTimeout(() => {
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterEmployees?name=${searchKey}`,
          {
            method: `GET`,
            headers: {
              Authorization: JSON.parse(dataToken),
            },
          }
        )
          .then((res) => res.json())
          .then((res2) => {
            setData([...res2.data]);
          })
          .catch((err) =>
            notification.error({
              message: "Gagal mendapatkan daftar user",
              duration: 3,
            })
          )
          .finally(() => setLoading(false));
      }, 500);
    }
  };
  const onChangeFile = async (info) => {
    if (info.file.status === "uploading") {
      // setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);
      setDokumenFileBlob(blobFile);
    }
  };
  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("type", values.tipe_cuti);
    formData.append("start_date", values.tanggal_cuti[0]);
    formData.append("end_date", values.tanggal_cuti[1]);
    if (values.notes) {
      formData.append("notes", values.notes);
    }
    formData.append("employee_id", values.employee_id);
    if (values.delegate_id) {
      formData.append("delegate_id", values.delegate_id);
    }
    if (dokumenFileBlob) {
      formData.append("document", dokumenFileBlob);
    }
    setLoadingSave(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addLeave `, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(dataToken),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoadingSave(false);
          onCancel();
          // fetchData()
          notification["success"]({
            message: "Pengajuan Cuti Berhasil",
            duration: 3,
          });
        } else {
          notification["error"]({
            message: "Pengajuan Cuti Gagal Karena ada kesalahan dalam server",
            duration: 3,
          });
        }
      });
  };
  const handleChangeTipe = (value) => {
    setDataCuti({
      ...dataCuti,
      tipe_cuti: value,
    });
  };

  return (
    <DrawerCore
      title={"Single Leave"}
      visible={visible}
      onClose={onCancel}
      onButtonCancelClicked={onCancel}
      buttonCancelText={"Cancel"}
      onClick={() => instanceForm.submit()}
      buttonOkText="Create Leave"
      loading={loadingSave}

      // footer={
      //   <div className={"flex gap-4 justify-end p-6"}>
      //     <div
      //       onClick={onCancel}
      //       className={
      //         "bg-[#F3F3F3] py-2.5 px-8 rounded-[5px] hover:cursor-pointer"
      //       }>
      //       <p className={"text-xs leading-5 text-[#808080] font-bold"}>
      //         Batalkan
      //       </p>
      //     </div>
      //     <div
      //       onClick={() => instanceForm.submit()}
      //       className={
      //         "bg-[#35763B] flex gap-2 items-center py-2.5 px-8 rounded-[5px] hover:cursor-pointer"
      //       }>
      //       {loadingSave && (
      //         <Spin indicator={<LoadingOutlined style={{ fontSize: 12 }} />} />
      //       )}
      //       <p className="text-white text-xs leading-5 font-bold">Ajukan</p>
      //     </div>
      //   </div>
      // }
    >
      <div className={"flex flex-col gap-8"}>
        <Form layout="vertical" form={instanceForm} onFinish={handleSubmit}>
          <div>
            <div className={"flex flex-col "}>
              <Form.Item
                label="Employee's Name"
                name={"employee_id"}
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Employee Name is required",
                  },
                ]}
              >
                <Select
                  showSearch
                  // className="dontShow"
                  value={dataCuti?.employee_id}
                  placeholder={"Search employee’s name"}
                  style={{ width: `100%` }}
                  onSearch={(value) => onSearchUsers(value, setDataEmployees)}
                  optionFilterProp="children"
                  onChange={(value, option) => {
                    setDataCuti((prev) => ({
                      ...prev,
                      employee_id: option,
                    }));
                  }}
                >
                  {dataEmployees?.map((item) => {
                    return (
                      <Select.Option
                        key={item?.id}
                        value={item.id}
                        position={item?.contract?.role?.name}
                        name={item?.name}
                      >
                        {item?.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            {/* <div className="flex flex-wrap mb-4">
              {dataCuti?.employee_id && (
                <Tag
                  closable
                  onClose={() => {
                    setDataCuti((prev) => ({
                      ...prev,
                      employee_id: null,
                    }));
                  }}
                  className="flex items-center p-2 w-max mb-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={generateStaticAssetUrl(
                        dataCuti?.employee_id?.profile_image?.link ??
                          "staging/Users/default_user.png"
                      )}
                      alt={dataCuti?.delegasi?.name}
                      className="w-6 h-6 bg-cover object-cover rounded-full"
                    />
                    <p className="truncate">
                      <strong>{dataCuti?.employee_id?.name}</strong> -{" "}
                      {dataCuti?.employee_id?.position}
                    </p>
                  </div>
                </Tag>
              )}
            </div> */}
            <Form.Item
              label="Select Leave Date"
              name={"tanggal_cuti"}
              rules={[
                {
                  required: true,
                  message: "Leave Date is required",
                },

                { validator: validateRepetitionRange },
              ]}
              className="col-span-2 "
            >
              <DatePicker.RangePicker
                locale={locale}
                picker="date"
                className="w-full"
                format={"DD MMMM YYYY"}
                placeholder={["Start", "End"]}
                disabledDate={(current) => {
                  return (
                    moment(current).diff(moment(dataCuti.start_date), "days") >
                    MAX_SCHEDULED_DAYS
                  );
                }}
                value={[
                  moment(dataCuti.start_date).isValid()
                    ? moment(dataCuti.start_date)
                    : null,
                  moment(dataCuti.end_date).isValid()
                    ? moment(dataCuti.end_date)
                    : null,
                ]}
                onChange={(values) => {
                  let formattedStartDate = moment(values?.[0]).isValid()
                    ? moment(values?.[0]).format("YYYY-MM-DD")
                    : null;

                  let formattedEndDate = moment(values?.[1]).isValid()
                    ? moment(values?.[1]).format("YYYY-MM-DD")
                    : null;

                  setDataCuti((prev) => ({
                    ...prev,
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                  }));
                }}
              />
            </Form.Item>
            <div className={"flex flex-col gap-2 mb-4"}>
              <p>Leave Duration</p>
              <Input
                // className={"h-[52px]"}
                disabled
                value={
                  dataCuti.start_date && dataCuti.end_date
                    ? moment(dataCuti.end_date).diff(
                        moment(dataCuti.start_date),
                        "days"
                      ) + " days"
                    : ""
                }
              />
            </div>
            <Form.Item
              label="Leave Type"
              name={"tipe_cuti"}
              className="col-span-2 "
              rules={[
                {
                  required: true,
                  message: "Leave Type is required",
                },
              ]}
            >
              <Select
                placeholder="Select Leave Type"
                onChange={(value, option) => {
                  setDataCuti((prev) => ({
                    ...prev,
                    tipe_cuti: option,
                  }));
                }}
              >
                {dataTipeCutis?.map((item) => {
                  return (
                    <Select.Option
                      key={item?.id}
                      value={item.id}
                      is_document_required={item?.is_document_required}
                      name={item?.name}
                    >
                      {item?.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            {/* <div className={"mt-4 flex flex-col gap-2"}> */}
            <Form.Item
              label="Description"
              name={"notes"}
              className="col-span-2"
              rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                className={"h-[164px] border border-solid border-[#E6E6E6]"}
                placeholder="Insert reason of taking leaves"
              />
            </Form.Item>
            {/* </div> */}
            <div className={"mt-4 flex flex-col gap-2"}>
              <Form.Item
                label={
                  <p>
                    Task Delegation{" "}
                    <span className="text-neutrals80">(Optional)</span>
                  </p>
                }
                name={"delegate_id"}
                className="col-span-2"
                rules={[
                  {
                    required: false,
                    message: "Task Delegation is required",
                  },
                ]}
              >
                <Select
                  showSearch
                  // className="dontShow"
                  value={dataCuti?.delegasi}
                  placeholder={"Search Name or manual input"}
                  style={{ width: `100%` }}
                  onSearch={(value) => onSearchUsers(value, setDataDelegates)}
                  optionFilterProp="children"
                  onChange={(value, option) => {
                    setDataCuti((prev) => ({
                      ...prev,
                      delegasi: option,
                    }));
                  }}
                >
                  {dataDelegates?.map((item) => {
                    return (
                      <Select.Option
                        key={item?.id}
                        value={item.id}
                        position={item?.contract?.role?.name}
                        users={item?.users}
                        name={item?.name}
                        profile_image={item?.profile_image}
                      >
                        {item?.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            {/* <div className="flex flex-wrap mb-4">
              {dataCuti?.delegasi && (
                <Tag
                  closable
                  onClose={() => {
                    setDataCuti((prev) => ({
                      ...prev,
                      delegasi: null,
                    }));
                  }}
                  className="flex items-center p-2 w-max mb-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={generateStaticAssetUrl(
                        dataCuti?.delegasi?.profile_image?.link ??
                          "staging/Users/default_user.png"
                      )}
                      alt={dataCuti?.delegasi?.name}
                      className="w-6 h-6 bg-cover object-cover rounded-full"
                    />
                    <p className="truncate">
                      <strong>{dataCuti?.delegasi?.name}</strong> -{" "}
                      {dataCuti?.delegasi?.position}
                    </p>
                  </div>
                </Tag>
              )}
            </div> */}
            <div className={" flex flex-col gap-2"}>
              <Form.Item
                label="Supporting File"
                name={"dokumen"}
                className="col-span-2"
                rules={[
                  {
                    required:
                      dataCuti == null
                        ? true
                        : dataCuti?.tipe_cuti?.is_document_required
                        ? true
                        : false,
                    message: "Supporting File is required",
                  },
                ]}
              >
                <div className={""}>
                  <Upload
                    accept=".pdf"
                    multiple={false}
                    onChange={onChangeFile}
                  >
                    <ButtonSys>
                      <div
                        className={"flex justify-center items-center gap-2 "}
                      >
                        <UploadOutlined size={16} />
                        <p>Upload File</p>
                      </div>
                    </ButtonSys>
                  </Upload>

                  <p
                    className={
                      "text-[#808080] text-xs leading-4 font-normal italic mt-2"
                    }
                  >
                    Upload File (Max. 5 MB).
                  </p>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </DrawerCore>
  );
};

export default DrawerCutiSatuan;
