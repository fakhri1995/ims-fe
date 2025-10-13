import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../../lib/helper";
import { CopyIconSvg, TrashIconSvg } from "../../../icon";
import DrawerCore from "../../drawerCore";

const DrawerCompanyAddChargeCode = ({
  visible,
  onvisible,
  initProps,
  isAllowedToAddCompany,
  setLoadingCreate,
  loadingCreate,
  setIsRefresh,
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
  const [chargeCodes, setChargeCodes] = useState([]);
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
    instanceForm.resetFields();
    setChargeCodes([]);
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

  const handleCreateChargeCode = (values) => {
    if (checkChargeCode) {
      const payload = {
        // year: dataCompany.year,
        company_id: Number(dataCompany.id),
        // month: dataCompany.month,
        charge_codes: chargeCodes,
      };
      // console.log('Json stringify ', JSON.stringify(payload))
      setLoadingCreate(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addChargeCodesCompany`, {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((response2) => {
          setLoadingCreate(false);
          if (response2.status == 200) {
            setIsRefresh(1);
            cancelClick();
            notification.success({
              message: `Charge Codes Company has successfully created`,
              duration: 3,
              // onClose: () => {
              //   rt.push("/company/workdayschedule/");
              // },
            });
          } else {
            notification.error({
              message: `Create Charge Codes Company has failed. ${response2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          setLoadingCreate(false);
          notification.error({
            message: `Create Charge Codes Company has failed. ${err.response}`,
            duration: 3,
          });
        });
    }
  };

  function checkChargeCode() {
    const allEmpty = chargeCodes.every(
      (item) => !item.name || item.name.trim() === ""
    );

    if (allEmpty) {
      // setWarningWorkingDay(true);
      return false;
    } else {
      // setWarningWorkingDay(false);
      return true;
    }
  }

  const handleClickButton = () => {
    // validasi dan ambil value form
    if (!isAllowedToAddCompany) {
      permissionWarningNotification("Add", "Charge Code Company");
      return;
    }
    instanceForm
      .validateFields()
      .then((values) => {
        handleCreateChargeCode(values);
      })
      .catch((info) => {
        console.log("Validasi gagal:", info);
      });
  };

  const cancelClick = () => {
    clearData();
    onvisible(false);
  };

  const handleChangeName = (index, value) => {
    const newData = [...chargeCodes];
    newData[index].name = value;
    setChargeCodes(newData);
  };

  const handleChangeDescription = (index, value) => {
    const newData = [...chargeCodes];
    newData[index].description = value;
    setChargeCodes(newData);
  };
  const handleAdd = () => {
    setChargeCodes([...chargeCodes, { name: "", description: "" }]);
  };

  const handleDelete = (index) => {
    const newData = chargeCodes.filter((_, i) => i !== index);
    setChargeCodes(newData);
  };

  const handleDuplicate = (index) => {
    const newData = [...chargeCodes];
    newData.splice(index + 1, 0, { ...chargeCodes[index] });
    setChargeCodes(newData);
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
      onClick={handleClickButton}
      disabled={false}
      onButtonCancelClicked={cancelClick}
    >
      <Spin spinning={loadingCreate}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *This information is required to filled
          </p>
          <Form layout="vertical" form={instanceForm} className="">
            <Form.Item
              label="Company"
              name={"company_id"}
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
                  value={dataCompany.id}
                  onChange={(value) => {
                    setDataCompany({
                      ...dataCompany,
                      id: value,
                    });
                    instanceForm.setFieldsValue({ company_id: value });
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

            {chargeCodes.map((item, index) => (
              <div className={"p-4 rounded-[10px] border border-[#E6E6E6]"}>
                <p
                  className={"text-xs/5 font-bold font-inter text-mono30 mb-4"}
                >
                  Charge Code {index + 1}
                </p>
                <Form layout="vertical">
                  <Form.Item
                    label="Charge Code Name"
                    name={"charge_code_name"}
                    rules={[
                      {
                        required: true,
                        message: "Charge Code Name is required",
                      },
                    ]}
                    className="w-full"
                  >
                    <div>
                      <Input
                        className={"w-full"}
                        placeholder="ex : MIGHTY"
                        name={"charge_code_name"}
                        value={item.name}
                        onChange={(e) =>
                          handleChangeName(index, e.target.value)
                        }
                      />
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name={"description"}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Charge Code Name is required",
                    //   },
                    // ]}
                    className="w-full"
                  >
                    <div>
                      <Input
                        className={"w-full"}
                        placeholder="ex:Proyek Interna;"
                        name={"description"}
                        value={item.description}
                        onChange={(e) =>
                          handleChangeDescription(index, e.target.value)
                        }
                      />
                    </div>
                  </Form.Item>
                </Form>
                <div className={"flex gap-4 justify-end mt-3"}>
                  <div
                    onClick={() => handleDuplicate(index)}
                    className={"hover:cursor-pointer"}
                  >
                    <CopyIconSvg size={24} color={"#4D4D4D"} />
                  </div>
                  {/* <Button
                                                                    danger
                                                                    icon={<DeleteOutlined />}
                                                                    onClick={() => handleDelete(index)}
                                                                  /> */}
                  <div
                    onClick={() => handleDelete(index)}
                    className={"hover:cursor-pointer"}
                  >
                    <TrashIconSvg size={24} color={"#4D4D4D"} />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="dashed"
              block
              style={{
                borderColor: "#35763B",
                color: "#35763B",
                height: 32,
                marginTop: 16,
              }}
              className="flex justify-center items-center"
              icon={<PlusCircleOutlined />}
              onClick={handleAdd}
            >
              Add More Charge Code
            </Button>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerCompanyAddChargeCode;
