import { DatePicker, Form, InputNumber, Select, notification } from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import { RcFile } from "antd/lib/upload";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { MAX_CONTRACT_DAYS, MAX_SCHEDULED_DAYS, TODAY } from "lib/constants";
import {
  AGENTS_GET,
  COMPANY_CLIENTS_GET,
  FILTER_EMPLOYEES_GET,
  LEAVE_TYPES_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import DrawerCore from "../drawerCore";

const DrawerLeaveQuota = ({
  dataToken,
  visible,
  onCancel,
  fetchData,
  resetParams,
  dataDefault,
}: {
  dataToken: string;
  visible: boolean;
  onCancel: () => void;
  fetchData: () => void;
  resetParams: () => void;
  dataDefault?: {
    employee_id: null;
    id: null;
    leave_quota: null;
    start_date: null;
    end_date: null;
  };
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
    if (dataDefault) {
      instanceForm.setFieldValue("leave_quota", dataDefault.leave_quota);
      instanceForm.setFieldValue("employee_id", dataDefault.employee_id);
      instanceForm.setFieldValue("validity_period", [
        moment(dataDefault.start_date),
        moment(dataDefault.end_date),
      ]);
    }
  }, [visible, dataDefault]);

  const validateRepetitionRange = (_, value) => {
    if (value && value[1].diff(value[0], "days") > MAX_CONTRACT_DAYS) {
      return Promise.reject(
        "Maksimal rentang tanggal yang dapat dipilih adalah 1 tahun"
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
    setLoadingSave(true);
    let url = "";
    let method = "POST";
    let datapayload = {};
    if (dataDefault) {
      url = `updateEmployeeLeaveQuota`;
      method = "PUT";
      datapayload = {
        id: dataDefault.id,
        employee_id: values.employee_id,
        leave_total: values.leave_quota,
        start_period: moment(values.validity_period[0]).format("YYYY-MM-DD"),
        end_period: moment(values.validity_period[1]).format("YYYY-MM-DD"),
      };
    } else {
      url = "addEmployeeLeaveQuota";
      method = "POST";
      datapayload = {
        employee_id: values.employee_id,
        leave_total: values.leave_quota,
        start_period: moment(values.validity_period[0]).format("YYYY-MM-DD"),
        end_period: moment(values.validity_period[1]).format("YYYY-MM-DD"),
      };
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
      method: method,
      headers: {
        Authorization: JSON.parse(dataToken),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datapayload),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoadingSave(false);
          instanceForm.resetFields();
          resetParams();
          onCancel();
          fetchData();
          notification["success"]({
            message: `${dataDefault ? "Update" : " Add"} Leave Quota Success`,
            duration: 3,
          });
        } else {
          setLoadingSave(false);
          notification["error"]({
            message: `${dataDefault ? "Update" : " Add"} Leave Quota Failed`,
            duration: 3,
          });
        }
      });
  };

  return (
    <DrawerCore
      title={dataDefault ? "Update Leave Quota" : "Add Leave Quota"}
      visible={visible}
      onClose={onCancel}
      onButtonCancelClicked={onCancel}
      buttonCancelText={"Cancel"}
      onClick={() => instanceForm.submit()}
      buttonOkText={dataDefault ? "Update Leave Quota" : "Add Leave Quota"}
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
                  value={
                    dataDefault
                      ? dataDefault.employee_id
                      : dataLeaveQuota?.employee_id
                  }
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
                  value={dataDefault ? dataDefault.leave_quota : null}
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
