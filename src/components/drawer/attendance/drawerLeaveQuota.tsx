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
  InputNumber,
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

const DrawerLeaveQuota = ({
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
  const [dataLeaveQuota, setDataLeaveQuota] = useState({
    employee_id: null,
    start_date: null,
    end_date: null,
    quota: null,
  });
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (visible) {
      fetchDataEmployees();
    }
  }, [visible]);

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
            message: "Add Leave Quota Success",
            duration: 3,
          });
        } else {
          notification["error"]({
            message: "Add Leave Quota Success",
            duration: 3,
          });
        }
      });
  };

  return (
    <DrawerCore
      title={"Add Leave Quota"}
      visible={visible}
      onClose={onCancel}
      onButtonCancelClicked={onCancel}
      buttonCancelText={"Cancel"}
      onClick={() => instanceForm.submit()}
      buttonOkText="Add Leave Quota"
      loading={loadingSave}
    >
      <div className={"flex flex-col gap-8"}>
        <Form layout="vertical" form={instanceForm} onFinish={handleSubmit}>
          <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-col"}>
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
                  value={dataLeaveQuota?.employee_id}
                  placeholder={"Search employee’s name"}
                  style={{ width: `100%` }}
                  onSearch={(value) => onSearchUsers(value, setDataEmployees)}
                  optionFilterProp="children"
                  onChange={(value, option) => {
                    setDataLeaveQuota((prev) => ({
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
            <div className={"mb-2"}>
              <Form.Item
                label="Input Leave Quota"
                name={"leave_quota"}
                rules={[
                  {
                    required: true,
                    message: "Leave Quota is required",
                  },
                ]}
                className="col-span-2 "
              >
                <InputNumber
                  placeholder="input leave quota"
                  className={"w-full"}
                  onChange={(value) =>
                    setDataLeaveQuota({ ...dataLeaveQuota, quota: value })
                  }
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Validity Period"
              name={"validity_period"}
              rules={[
                {
                  required: true,
                  message: "Validity Period is required",
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
                    moment(current).diff(
                      moment(dataLeaveQuota.start_date),
                      "days"
                    ) > MAX_SCHEDULED_DAYS
                  );
                }}
                value={[
                  moment(dataLeaveQuota.start_date).isValid()
                    ? moment(dataLeaveQuota.start_date)
                    : null,
                  moment(dataLeaveQuota.end_date).isValid()
                    ? moment(dataLeaveQuota.end_date)
                    : null,
                ]}
                onChange={(values) => {
                  let formattedStartDate = moment(values?.[0]).isValid()
                    ? moment(values?.[0]).format("YYYY-MM-DD")
                    : null;

                  let formattedEndDate = moment(values?.[1]).isValid()
                    ? moment(values?.[1]).format("YYYY-MM-DD")
                    : null;

                  setDataLeaveQuota((prev) => ({
                    ...prev,
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </DrawerCore>
  );
};

export default DrawerLeaveQuota;
