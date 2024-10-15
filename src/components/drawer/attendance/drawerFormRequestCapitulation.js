import { CalendarOutlined } from "@ant-design/icons";
import {
  Checkbox,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Select,
  notification,
} from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import { RcFile } from "antd/lib/upload";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
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
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import DrawerCore from "../drawerCore";

const { RangePicker } = DatePicker;
const DrawerFormRequestCapitulation = ({
  dataToken,
  visible,
  onCancel,
  queryParams,
  setQueryParams,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }
  const [instanceForm] = Form.useForm();
  const [loadingSave, setLoadingSave] = useState(false);
  const [dataCompanyList, setDataCompanyList] = useState([]);
  const [roleList, setDataRoleList] = useState([]);
  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);
  const [dateForm, setDateForm] = useState({
    start_date: null,
    end_date: null,
  });
  useEffect(() => {
    if (visible) {
      fetchDataCompany();
      fetchDataRole();
    }
  }, [visible]);

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

  const fetchDataRole = async () => {
    if (!isAllowedToGetRoleList) {
      permissionWarningNotification("Mendapatkan", "Data Role");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(dataToken),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setDataRoleList(res2.data);
        });
    }
  };

  const handleSubmit = (values) => {
    console.log("submit ", values);
    setLoadingSave(true);
    setQueryParams({
      ...queryParams,
      company_id: values.company_id,
      role_ids: values.position ? values.position : undefined,
      start_date: dateForm.start_date ? dateForm.start_date : undefined,
      end_date: dateForm.end_date ? dateForm.end_date : undefined,
    });
    onCancel();
    setLoadingSave(false);
  };

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
      title={"Form Request Recapitulation"}
      visible={visible}
      onClose={onCancel}
      onButtonCancelClicked={onCancel}
      buttonCancelText={"Cancel"}
      onClick={() => instanceForm.submit()}
      buttonOkText={"Submit"}
      loading={loadingSave}
    >
      <div className={"flex flex-col gap-8"}>
        <Form layout="vertical" form={instanceForm} onFinish={handleSubmit}>
          <div className={"flex flex-col gap-2"}>
            <div className={"mb-2"}>
              <Form.Item
                label="Project/Location"
                name={"company_id"}
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Project/Location is required",
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  className="w-full"
                  //   defaultValue={queryParams.company_id}
                  disabled={!isAllowedToGetCompanyClients || loadingCompanyList}
                  placeholder="Input Project/Location"
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
            <div className={"mb-2"}>
              <Form.Item
                label="Position"
                name={"position"}
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Position is required",
                  },
                ]}
              >
                <Select
                  allowClear
                  mode="tags"
                  tokenSeparators={[","]}
                  showSearch
                  disabled={!isAllowedToGetRoleList}
                  placeholder="Select Position"
                  style={{ width: `100%` }}
                  optionFilterProp="children"
                >
                  {roleList?.map((item) => (
                    <Select.Option
                      key={item.id}
                      value={item.id}
                      label={item.name}
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className={"mb-2"}>
              <Form.Item
                label="Date Range"
                name={"date_range"}
                className="col-span-2"
              >
                <RangePicker onChange={onRangeChange} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </DrawerCore>
  );
};

export default DrawerFormRequestCapitulation;
