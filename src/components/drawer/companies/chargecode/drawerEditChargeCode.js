import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../../lib/helper";
import { CopyIconSvg, TrashIconSvg } from "../../../icon";
import DrawerCore from "../../drawerCore";

const DrawerEditChargeCode = ({
  id,
  visible,
  onvisible,
  initProps,
  isAllowedToAddCompany,
  setLoadingCreate,
  loadingCreate,
  id_company,
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
  const [dataChargeCode, setDataChargeCode] = useState({
    name: null,
    description: null,
  });
  const attendanceCodeList = [
    {
      id: 1,
      name: "Present",
    },
    {
      id: 2,
      name: "Overtime",
    },
    {
      id: 3,
      name: "Unpaid Leave",
    },
    {
      id: 4,
      name: "Paid Leave",
    },
  ];
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

  useEffect(() => {
    if (!id) {
      return;
    }
    getDataDetail();
  }, [id]);

  const getDataDetail = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getChargeCode?id=${id}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setDataChargeCode({
          ...dataChargeCode,
          name: res2.data.name,
          description: res2.data.description,
        });
        instanceForm.setFieldsValue(
          {
            charge_code_name: res2.data.name,
          },
          { description: res2.data.description }
        );
        setChargeCodes(res2.data.attendance_codes);
        //   setCompanyList(res2.data);
        //   setLoadingGetCompany(false);
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
        setCompanyList(res2.data);
        setLoadingGetCompany(false);
      });
  }, []);

  const handleCreateChargeCode = (values) => {
    const hasDuplicate = chargeCodes.some(
      (item, index) =>
        chargeCodes.findIndex((obj) => obj.name === item.name) !== index
    );
    if (hasDuplicate) {
      notification.error({
        message: `Attendance code name must be different`,
        duration: 1,
      });
    } else {
      const payload = {
        // year: dataCompany.year,
        company_id: Number(id_company),
        id: Number(id),
        name: dataChargeCode.name,
        description: dataChargeCode.description,
        // month: dataCompany.month,
        attendance_codes: chargeCodes,
      };
      // console.log('Json stringify ', JSON.stringify(payload))
      setLoadingCreate(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateChargeCode`, {
        method: "PUT",
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
              message: `Charge Codes has successfully updated`,
              duration: 3,
              // onClose: () => {
              //   rt.push("/company/workdayschedule/");
              // },
            });
          } else {
            notification.error({
              message: `Update Charge Codes has failed. ${response2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          setLoadingCreate(false);
          notification.error({
            message: `Update Charge Codes has failed. ${err.response}`,
            duration: 3,
          });
        });
    }
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
    setChargeCodes([
      ...chargeCodes,
      {
        name: "",
        description: "",
        hari_masuk: 0,
        hari_penggajian: 0,
        dapat_ditagih: 0,
      },
    ]);
  };

  const handleCheckboxChange = (index, key, checked) => {
    let temp = "";
    const newData = [...chargeCodes];
    newData[index][key] = checked ? 1 : 0;
    setChargeCodes(newData);
  };
  const handleClickButton = () => {
    // validasi dan ambil value form
    if (!isAllowedToAddCompany) {
      permissionWarningNotification("Add", "Charge Code");
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

  return (
    <DrawerCore
      title={"Update Charge Code"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Update"}
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
                  value={dataChargeCode?.name}
                  onChange={(e) =>
                    setDataChargeCode({
                      ...dataChargeCode,
                      name: e.target.value,
                    })
                  }
                  placeholder="ex:Mighty"
                  name={"charge_code_name"}
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
                <Input.TextArea
                  rows={4}
                  className={"w-full"}
                  placeholder="ex:Proyek Interna;"
                  name={"description"}
                  value={dataChargeCode?.description}
                  onChange={(e) =>
                    setDataChargeCode({
                      ...dataChargeCode,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </Form.Item>
            {chargeCodes.map((item, index) => (
              <div
                className={`p-4 rounded-[10px] border border-[#E6E6E6] ${
                  index != 0 ? "mt-4" : "mt-0"
                }`}
              >
                <p
                  className={"text-xs/5 font-bold font-inter text-mono30 mb-4"}
                >
                  Attendance Code {index + 1}
                </p>
                <Form layout="vertical">
                  <Form.Item
                    label="Attendance Code Name"
                    name={"attendance_code_name"}
                    rules={[
                      {
                        required: true,
                        message: "Attendance Code Name is required",
                      },
                    ]}
                    className="w-full"
                  >
                    <div>
                      <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder="Select Attendance Code Name"
                        filterOption={(input, option) =>
                          (option?.children ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        loading={loadingGetCompany}
                        style={{ width: `100%` }}
                        value={item?.name}
                        onChange={(value) => {
                          handleChangeName(index, value);
                        }}
                      >
                        {attendanceCodeList?.map((code) => (
                          <Select.Option key={code.id} value={code.name}>
                            {code.name}
                          </Select.Option>
                        ))}
                      </Select>
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
                      <Input.TextArea
                        rows={4}
                        className={"w-full"}
                        placeholder="ex:Proyek Interna;"
                        name={"description"}
                        value={item?.description}
                        onChange={(e) =>
                          handleChangeDescription(index, e.target.value)
                        }
                      />
                    </div>
                  </Form.Item>
                  <div className={"flex flex-row justify-between"}>
                    <Checkbox
                      checked={item?.hari_masuk}
                      onChange={(e) =>
                        handleCheckboxChange(
                          index,
                          "hari_masuk",
                          e.target.checked
                        )
                      }
                    >
                      Hari Masuk
                    </Checkbox>
                    <p className={"text-sm/6 font-inter text-mono30"}>
                      {item?.hari_masuk ? "1" : "0"}
                    </p>
                  </div>
                  <div className={"flex flex-row justify-between mt-3"}>
                    <Checkbox
                      checked={item?.hari_penggajian}
                      onChange={(e) =>
                        handleCheckboxChange(
                          index,
                          "hari_penggajian",
                          e.target.checked
                        )
                      }
                    >
                      Hari Penggajian
                    </Checkbox>
                    <p className={"text-sm/6 font-inter text-mono30"}>
                      {item?.hari_penggajian ? "1" : "0"}
                    </p>
                  </div>
                  <div className={"flex flex-row justify-between mt-3"}>
                    <Checkbox
                      checked={item?.dapat_ditagih}
                      onChange={(e) =>
                        handleCheckboxChange(
                          index,
                          "dapat_ditagih",
                          e.target.checked
                        )
                      }
                    >
                      Dapat Ditagih
                    </Checkbox>
                    <p className={"text-sm/6 font-inter text-mono30"}>
                      {item?.dapat_ditagih ? "1" : "0"}
                    </p>
                  </div>
                </Form>
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

export default DrawerEditChargeCode;
