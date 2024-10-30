import { CalendarOutlined } from "@ant-design/icons";
import {
  Checkbox,
  DatePicker,
  Form,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  notification,
} from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import { RcFile } from "antd/lib/upload";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";

import { CalendarFilIconSvg } from "components/icon";

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

const { RangePicker } = DatePicker;

const DrawerRecapitulation = ({
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
  const [dataCompanyList, setDataCompanyList] = useState([]);
  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const [dokumenFileBlob, setDokumenFileBlob] = useState<RcFile | Blob | File>(
    null
  );
  const [dateForm, setDateForm] = useState({
    start_date: null,
    end_date: null,
  });
  const [queryParams, setQueryParams] = useState({
    company_id: null,
  });
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
      fetchDataCompany();
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

  const fetchDataCompany = async () => {
    if (!isAllowedToGetCompanyClients) {
      permissionWarningNotification("Mendapatkan", "Data Company");
    } else {
      setLoadingCompanyList(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList?with_mig=true`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(dataToken),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setDataCompanyList(res2.data);
          setLoadingCompanyList(false);
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
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/exportAttendanceRecap?employee_ids${values.employee_id}&company_id=${values.company_id}&start_date=${dateForm.start_date}&end_date=${dateForm.end_date}&format=${values.export_data}`;
    fetch(`${url}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(dataToken),
      },
    })
      .then((res) => res.blob())
      .then((res2) => {
        if (values.export_data == "pdf") {
          var newBlob = new Blob([res2], {
            type: "application/pdf",
          });
          const data = window.URL.createObjectURL(newBlob);
          var link = document.createElement("a");
          link.href = data;
          link.download = `recapitulation_${dateForm.start_date}_${dateForm.end_date}.pdf`;
          link.click();
          setTimeout(function () {
            window.URL.revokeObjectURL(data);
          });
        } else {
          var newBlob = new Blob([res2], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const data = window.URL.createObjectURL(newBlob);
          var link = document.createElement("a");
          link.href = data;
          link.download = `recapitulation_${dateForm.start_date}_${dateForm.end_date}.xlsx`;
          link.click();
          setTimeout(function () {
            window.URL.revokeObjectURL(data);
          });
        }

        setLoadingSave(false);
      });
  };

  const options = [
    {
      label: "PDF",
      value: "PDF",
    },
    {
      label: "Excel",
      value: "Excel",
    },
  ];

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setDateForm({
        start_date: dateStrings[0],
        end_date: dateStrings[1],
      });
    } else {
      setDateForm({
        start_date: null,
        end_date: null,
      });
    }
  };

  return (
    <DrawerCore
      title={"Export Recapitulation"}
      visible={visible}
      onClose={onCancel}
      onButtonCancelClicked={onCancel}
      buttonCancelText={"Cancel"}
      onClick={() => instanceForm.submit()}
      buttonOkText={"Export Data"}
      loading={loadingSave}
    >
      <div className={"flex flex-col gap-8"}>
        <Form layout="vertical" form={instanceForm} onFinish={handleSubmit}>
          <div className={"flex flex-col gap-2"}>
            <div className={"mb-2"}>
              <Form.Item
                label="Company"
                name={"company_id"}
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Company is required",
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  className="w-full"
                  //   defaultValue={queryParams.company_id}
                  disabled={!isAllowedToGetCompanyClients || loadingCompanyList}
                  placeholder="Select Company"
                  onChange={(value) => {
                    setQueryParams({ company_id: value });
                  }}
                  filterOption={(input, option) =>
                    (String(option?.children) ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  loading={loadingCompanyList}
                  optionFilterProp="children"
                >
                  {dataCompanyList?.map((company) => (
                    <Select.Option key={company.id} value={company.id}>
                      {company.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
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
                  mode={"multiple"}
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
                label="Date Range"
                name={"date_range"}
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Date Range is required",
                  },
                ]}
              >
                <RangePicker className={"w-full"} onChange={onRangeChange} />
              </Form.Item>
            </div>
            <div className={"mb-2"}>
              <Form.Item
                label="Export Data As"
                name={"export_data"}
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Export Data is required",
                  },
                ]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value={"pdf"}>PDF</Radio>
                    <Radio value={"Excel"}>Excel</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </DrawerCore>
  );
};

export default DrawerRecapitulation;
