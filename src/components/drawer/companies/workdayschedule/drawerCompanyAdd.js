import { Form, Input, Select, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../../lib/helper";
import DrawerCore from "../../drawerCore";

const DrawerCompanyAdd = ({
  visible,
  onvisible,
  initProps,
  setRefresh,
  isAllowedToAddCompany,
  dataWorkDayTypes,
  setLoadingCreate,
  loadingCreate,
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
  const [disabledCreate, setDisabledCreate] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [loadingGetCompany, setLoadingGetCompany] = useState(false);
  // USEEFFECT
  // Validate input field
  useEffect(() => {
    if (dataCompany.name !== "" && dataCompany.work_day_type !== null) {
      setDisabledCreate(false);
    } else {
      setDisabledCreate(true);
    }
  }, [dataCompany]);

  //HANDLER
  const onChangeInput = (e) => {
    setDataRole({
      ...dataRole,
      [e.target.name]: e.target.value,
    });
  };

  const clearData = () => {
    setDataCompany({
      id: null,
      name: "",
      work_day_type: null,
    });
  };

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
        console.log("hasilnya ", res2);
        setCompanyList(res2.data);
        setLoadingGetCompany(false);
      });
  }, []);

  const handleCreateRole = () => {
    if (!isAllowedToAddCompany) {
      permissionWarningNotification("Add", "Company");
      return;
    }
    // setLoadingCreate(true);
    // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitmentRole`, {
    //     method: "POST",
    //     headers: {
    //         Authorization: JSON.parse(initProps),
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(dataRole),
    // })
    //     .then((response) => response.json())
    //     .then((response2) => {
    //         setRefresh((prev) => prev + 1);
    //         if (response2.success) {
    //             notification.success({
    //                 message: `Role berhasil ditambahkan.`,
    //                 duration: 3,
    //             });
    //             setTimeout(() => {
    //                 onvisible(false);
    //                 clearData();
    //             }, 500);
    //         } else {
    //             notification.error({
    //                 message: `Gagal menambahkan role. ${response2.message}`,
    //                 duration: 3,
    //             });
    //         }
    //         setLoadingCreate(false);
    //     })
    //     .catch((err) => {
    //         notification.error({
    //             message: `Gagal menambahkan role. ${err.response}`,
    //             duration: 3,
    //         });
    //         setLoadingCreate(false);
    //     });
  };

  const cancelClick = () => {
    clearData();
    onvisible(false);
  };

  return (
    <DrawerCore
      title={"Add Company"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Add Company"}
      buttonCancelText={"Cancel"}
      onClick={handleCreateRole}
      disabled={disabledCreate}
      onButtonCancelClicked={cancelClick}
    >
      <Spin spinning={loadingCreate}>
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

export default DrawerCompanyAdd;
