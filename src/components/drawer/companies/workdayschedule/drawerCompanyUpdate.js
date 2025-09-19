import { Form, Input, Select, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../../lib/helper";
import DrawerCore from "../../drawerCore";

const DrawerCompanyUpdate = ({
  id,
  visible,
  onvisible,
  initProps,
  trigger,
  setRefresh,
  isAllowedToAddCompany,
  isAllowedToUpdateCompany,
  loadingUpdate,
  dataWorkDayTypes,
}) => {
  /**
   * Dependencies
   */

  const [instanceForm] = Form.useForm();

  // USESTATE
  const [dataCompany, setDataCompany] = useState({
    id: null,
    name: "",
    work_day_type: null,
  });
  const [loadingDataRole, setLoadingDataRole] = useState(false);
  const [loadingGetCompany, setLoadingGetCompany] = useState(false);
  const [disabledUpdate, setDisabledUpdate] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  // USEEFFECT
  // Validate input field
  useEffect(() => {
    setLoadingGetCompany(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setCompanyList(res2.data);
        setLoadingGetCompany(false);
      });
  }, []);
  useEffect(() => {
    if (dataCompany.name !== "" && dataCompany.work_day_type !== null) {
      setDisabledUpdate(false);
    } else {
      setDisabledUpdate(true);
    }
  }, [dataCompany]);

  // Get role data
  useEffect(() => {
    if (!isAllowedToAddCompany) {
      setLoadingDataRole(false);
      permissionWarningNotification("Mendapatkan", "Data Company");
      return;
    }

    // if (trigger !== -1) {
    //   setLoadingDataRole(true);
    //   fetch(
    //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRole?id=${id.current}`,
    //     {
    //       method: `GET`,
    //       headers: {
    //         Authorization: JSON.parse(initProps),
    //       },
    //     }
    //   )
    //     .then((res) => res.json())
    //     .then((res2) => {
    //       setDataCompany((prev) => ({
    //         ...prev,
    //         id: res2.data.id,
    //         name: res2.data.name,
    //         work_day_type: res2.data.work_day_type,
    //       }));
    //       setLoadingDataRole(false);
    //     });
    // }
  }, [trigger, isAllowedToAddCompany]);

  const clearData = () => {
    setDataCompany({
      id: null,
      name: "",
      work_day_type: null,
    });
  };

  const handleUpdateRole = () => {
    if (!isAllowedToUpdateCompany) {
      permissionWarningNotification("Mengubah", "Role Rekrutmen");
      return;
    }
    // setLoadingUpdate(true);
    // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitmentRole`, {
    //   method: "PUT",
    //   headers: {
    //     Authorization: JSON.parse(initProps),
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataRole),
    // })
    //   .then((res) => res.json())
    //   .then((res2) => {
    //     setRefresh((prev) => prev + 1);
    //     if (res2.success) {
    //       setLoadingUpdate(false);
    //       onvisible(false);
    //       notification["success"]({
    //         message: res2.message,
    //         duration: 3,
    //       });
    //       clearData();
    //     } else {
    //       setLoadingUpdate(false);
    //       notification["error"]({
    //         message: `Gagal mengubah role. ${res2.message}`,
    //         duration: 3,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     setLoadingUpdate(false);
    //     notification["error"]({
    //       message: `Gagal mengubah role. ${err.message}`,
    //       duration: 3,
    //     });
    //   });
  };

  // console.log(dataCandidate);
  return (
    <DrawerCore
      title={"Edit Company"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Save Change"}
      onClick={handleUpdateRole}
      disabled={disabledUpdate}
      buttonCancelText={"Cancel"}
      onButtonCancelClicked={() => {
        clearData();
        onvisible(false);
      }}
    >
      <Spin spinning={loadingUpdate}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *This information is required to filled
          </p>
          <Form
            layout="vertical"
            form={instanceForm}
            className="grid grid-cols-2 gap-x-6"
          >
            <Form.Item
              label="Company"
              name={"recruitment_role_type_id"}
              rules={[
                {
                  required: true,
                  message: "Company is required",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select Company"
                  filterOption={(input, option) =>
                    (option?.children ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  loading={loadingGetCompany}
                  style={{ width: `100%` }}
                  value={dataCompany.recruitment_role_type_id}
                  onChange={(value) => {
                    setDataCompany({
                      ...dataCompany,
                      name: value,
                    });
                  }}
                >
                  {companyList?.map((company) => (
                    <Select.Option key={company.id} value={company.id}>
                      {company.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item>

            <Form.Item
              label="Work Day Type"
              name={"recruitment_role_type_id"}
              rules={[
                {
                  required: true,
                  message: "Work Day Type is required",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Select
                  placeholder="Select Work Day Type"
                  style={{ width: `100%` }}
                  value={dataCompany.work_day_type}
                  onChange={(value) => {
                    setDataCompany({
                      ...dataCompany,
                      work_day_type: value,
                    });
                  }}
                >
                  {dataWorkDayTypes?.map((type) => (
                    <Select.Option key={type.id} value={type.id}>
                      {type.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerCompanyUpdate;
