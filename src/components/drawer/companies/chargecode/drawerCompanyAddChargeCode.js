import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../../lib/helper";
import { CopyIconSvg, InfoCircleIconSvg, TrashIconSvg } from "../../../icon";
import DrawerCore from "../../drawerCore";

const DrawerCompanyAddChargeCode = ({
  visible,
  onvisible,
  initProps,
  isAllowedToAddChargeCodeCompany,
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
  const [attendanceCodes, setAttendanceCodes] = useState([]);
  const [activeTab, setActiveTab] = useState("attendance");
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
        setCompanyList(res2.data);
        setLoadingGetCompany(false);
      });
  }, []);

  const handleCreateChargeCode = (values) => {
    if (checkChargeCode && checkAttendanceCode) {
      const payload = {
        // year: dataCompany.year,
        company_id: Number(dataCompany.id),
        // month: dataCompany.month,
        charge_codes: chargeCodes,
        attendance_codes: attendanceCodes,
      };
      // console.log('Json stringify ', JSON.stringify(payload))
      setLoadingCreate(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addCompanyCodes`, {
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
              message: `Attendance & Charge code for ${dataCompany.name} successfully added`,
              duration: 3,
              // onClose: () => {
              //   rt.push("/company/workdayschedule/");
              // },
            });
          } else {
            notification.error({
              message: `Attendance & Charge code has failed.`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          setLoadingCreate(false);
          notification.error({
            message: `Attendance & Charge code has failed. ${err.response}`,
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

  function checkAttendanceCode() {
    const allEmpty = attendanceCodes.every(
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
    if (!isAllowedToAddChargeCodeCompany) {
      permissionWarningNotification("Add", "Charge Code Company");
      return;
    }
    instanceForm
      .validateFields()
      .then((values) => {
        if (chargeCodes.length > 0 && attendanceCodes.length > 0) {
          handleCreateChargeCode(values);
        } else {
          if (chargeCodes.length == 0) {
            notification.error({
              message: `Charge Code must be filled`,
              duration: 1,
            });
          }
          if (attendanceCodes.length == 0) {
            notification.error({
              message: `Attendances Code must be filled`,
              duration: 1,
            });
          }
        }
      })
      .catch((info) => {
        console.log("Validasi gagal:", info);
      });
  };

  const handleChangeColor = (index, value) => {
    console.log("value ", value);
    const newData = [...chargeCodes];
    newData[index].color = value;
    setChargeCodes(newData);
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
      { name: "", description: "", color: null },
    ]);
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

  const handleChangeAttendanceName = (index, value) => {
    const newData = [...attendanceCodes];
    newData[index].name = value;
    setAttendanceCodes(newData);
  };

  const handleChangeDescriptionAttendance = (index, value) => {
    const newData = [...attendanceCodes];
    newData[index].description = value;
    setAttendanceCodes(newData);
  };
  const handleAddAttendance = () => {
    setAttendanceCodes([
      ...attendanceCodes,
      {
        name: "",
        description: "",
        perlu_verifikasi: false,
        hari_masuk: 0,
        hari_penggajian: 0,
        dapat_ditagih: 0,
      },
    ]);
  };

  const handleCheckboxChange = (index, key, checked) => {
    let temp = "";
    const newData = [...attendanceCodes];
    newData[index][key] = checked ? 1 : 0;
    setAttendanceCodes(newData);
  };

  const handleSwitchVerification = (index, value) => {
    // console.log('value ',value)
    const newData = [...attendanceCodes];
    newData[index].perlu_verifikasi = value ? 1 : 0;
    setAttendanceCodes(newData);
  };

  const handleDeleteAttendance = (index) => {
    const newData = attendanceCodes.filter((_, i) => i !== index);
    setAttendanceCodes(newData);
  };

  const handleDuplicateAttendance = (index) => {
    const newData = [...attendanceCodes];
    newData.splice(index + 1, 0, { ...attendanceCodes[index] });
    setAttendanceCodes(newData);
  };

  return (
    <DrawerCore
      title={"Set Up Code"}
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
                  onChange={(value, option) => {
                    console.log("option ", option.children);
                    setDataCompany({
                      ...dataCompany,
                      name: option.children,
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
            <div className={"flex border-b"}>
              <div
                onClick={() => setActiveTab("attendance")}
                className={`hover:cursor-pointer w-1/2 flex justify-center pb-1.5 ${
                  activeTab == "attendance"
                    ? "border-b-2 border-primary100"
                    : ""
                }`}
              >
                <p
                  className={`text-sm/6 font-inter ${
                    activeTab == "attendance"
                      ? "font-bold text-primary100"
                      : "text-[#808080] font-normal"
                  }`}
                >
                  Attendance Code
                </p>
              </div>
              <div
                onClick={() => setActiveTab("charge_code")}
                className={`hover:cursor-pointer w-1/2 flex justify-center pb-1.5 ${
                  activeTab == "charge_code"
                    ? "border-b-2 border-primary100"
                    : ""
                }`}
              >
                <p
                  className={`text-sm/6 font-inter ${
                    activeTab == "charge_code"
                      ? "font-bold text-primary100"
                      : "text-[#808080] font-normal"
                  }`}
                >
                  Charge Code
                </p>
              </div>
            </div>
            {activeTab == "charge_code" ? (
              <div className={"mt-4"}>
                {chargeCodes.map((item, index) => (
                  <div className={"p-4 rounded-[10px] border border-[#E6E6E6]"}>
                    <p
                      className={
                        "text-xs/5 font-bold font-inter text-mono30 mb-4"
                      }
                    >
                      Charge Code {index + 1}
                    </p>
                    <Form layout="vertical" form={instanceForm}>
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
                        label="Charge Code Color"
                        name={"charge_code_color"}
                        className="w-full"
                      >
                        <div>
                          <Input
                            type="color"
                            style={{ width: 80 }}
                            value={item?.color}
                            onChange={(e) =>
                              handleChangeColor(index, e.target.value)
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
              </div>
            ) : (
              <div className={"mt-4"}>
                {attendanceCodes.map((item, index) => (
                  <div
                    className={`p-4 rounded-[10px] border border-[#E6E6E6] ${
                      index != 0 ? "mt-4" : "mt-0"
                    }`}
                  >
                    <p
                      className={
                        "text-xs/5 font-bold font-inter text-mono30 mb-4"
                      }
                    >
                      Attendance Code {index + 1}
                    </p>
                    <Form layout="vertical" form={instanceForm}>
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
                            placeholder="Select Company"
                            filterOption={(input, option) =>
                              (option?.children ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            loading={loadingGetCompany}
                            style={{ width: `100%` }}
                            value={item?.name}
                            onChange={(value) => {
                              handleChangeAttendanceName(index, value);
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
                              handleChangeDescriptionAttendance(
                                index,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </Form.Item>
                      <div className={"flex gap-2.5 items-center mb-3"}>
                        <p
                          className={
                            "text-sm/6 font-inter font-normal text-mono30"
                          }
                        >
                          Verifikasi Berkas
                        </p>
                        <Switch
                          checked={item?.perlu_verifikasi == 1 ? true : false}
                          onChange={(value) =>
                            handleSwitchVerification(index, value)
                          }
                        />
                      </div>
                      <div
                        className={
                          "flex items-center gap-2 px-3 py-2 mb-3 rounded-[4px] w-full bg-[#00589F1A]"
                        }
                      >
                        <InfoCircleIconSvg size={16} color={"#00589F"} />
                        <p
                          className={
                            "text-[#00589F] text-xs/5 font-inter font-normal"
                          }
                        >
                          Jika verifikasi berkas menyala, akan muncul field
                          untuk mengunggah berkas pendukung.
                        </p>
                      </div>
                      <div className={"flex flex-row justify-between"}>
                        <Checkbox
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
                      <div className={"flex gap-4 justify-end mt-3"}>
                        <div
                          onClick={() => handleDuplicateAttendance(index)}
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
                          onClick={() => handleDeleteAttendance(index)}
                          className={"hover:cursor-pointer"}
                        >
                          <TrashIconSvg size={24} color={"#4D4D4D"} />
                        </div>
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
                  onClick={handleAddAttendance}
                >
                  Add More Attendance Code
                </Button>
              </div>
            )}
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerCompanyAddChargeCode;
