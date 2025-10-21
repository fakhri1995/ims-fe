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
  Switch,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../../lib/helper";
import { CopyIconSvg, InfoCircleIconSvg, TrashIconSvg } from "../../../icon";
import DrawerCore from "../../drawerCore";

const DrawerEditAttendanceCode = ({
  getData,
  dataAttendanceCode,
  visible,
  onvisible,
  initProps,
  isAllowedToUpdateAttendanceCode,
  setLoadingCreate,
  loadingCreate,
  idChargeCode,
  setIsRefresh,
}) => {
  /**
   * Dependencies
   */
  const [instanceForm] = Form.useForm();

  // USESTATE
  const [disabledCreate, setDisabledCreate] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [dataEdit, setDataEdit] = useState({
    name: null,
    color: null,
    description: null,
  });
  const [loadingGetCompany, setLoadingGetCompany] = useState(false);
  const [isVerification, setIsVerification] = useState(0);
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
  const [valuesCheckbox, setValuesCheckbox] = useState({
    hariMasuk: 0,
    hariPenggajian: 0,
    dapatDitagih: 0,
  });
  // USEEFFECT
  // Validate input field

  const clearData = () => {
    instanceForm.resetFields();
    setValuesCheckbox({
      hariMasuk: 0,
      hariPenggajian: 0,
      dapatDitagih: 0,
    });
  };

  useEffect(() => {
    if (!dataAttendanceCode) {
      return;
    }
    instanceForm.setFieldsValue({
      attendance_code_name: dataAttendanceCode.name,
      description: dataAttendanceCode.description,
      color: dataAttendanceCode.color,
    });
    setDataEdit({
      ...dataEdit,
      name: dataAttendanceCode?.name,
      description: dataAttendanceCode?.description,
      color: dataAttendanceCode?.color,
    });
    setIsVerification(dataAttendanceCode?.perlu_verifikasi);
    setValuesCheckbox({
      ...valuesCheckbox,
      dapatDitagih: dataAttendanceCode?.dapat_ditagih,
      hariPenggajian: dataAttendanceCode?.hari_penggajian,
      hariMasuk: dataAttendanceCode?.hari_masuk,
    });
  }, [dataAttendanceCode]);

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

  const handleCreateAttendanceCode = (values) => {
    const payload = {
      // year: dataCompany.year,
      id: Number(dataAttendanceCode?.id),
      attendance_code_id: Number(idChargeCode),
      name: values.attendance_code_name,
      color: values.color,
      description: values.description,
      perlu_verifikasi: isVerification,
      hari_masuk: valuesCheckbox.hariMasuk,
      hari_penggajian: valuesCheckbox.hariPenggajian,
      dapat_ditagih: valuesCheckbox.dapatDitagih,
    };
    // console.log('Json stringify ', JSON.stringify(payload))
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateAttendanceCode`, {
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
          getData();
          cancelClick();
          notification.success({
            message: `Attendance Code has successfully updated`,
            duration: 3,
            // onClose: () => {
            //   rt.push("/company/workdayschedule/");
            // },
          });
        } else {
          notification.error({
            message: `Update Attendance Code has failed. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingCreate(false);
        notification.error({
          message: `Update Attendance Code has failed. ${err.response}`,
          duration: 3,
        });
      });
  };

  const cancelClick = () => {
    clearData();
    onvisible(false);
  };

  const handleCheckboxChange = (key, checked) => {
    setValuesCheckbox((prev) => ({
      ...prev,
      [key]: checked ? 1 : 0,
    }));
  };

  const handleClickButton = () => {
    // validasi dan ambil value form
    if (!isAllowedToUpdateAttendanceCode) {
      permissionWarningNotification("Add", "Attendance Code Company");
      return;
    }
    instanceForm
      .validateFields()
      .then((values) => {
        handleCreateAttendanceCode(values);
      })
      .catch((info) => {
        console.log("Validasi gagal:", info);
      });
  };

  return (
    <DrawerCore
      title={"Update Attendance Code"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Save Changes"}
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
                <div>
                  <Input
                    className={"w-full"}
                    value={dataEdit?.name}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        name: e.target.value,
                      })
                    }
                    placeholder="ex:Mighty"
                    name={"attendance_code_name"}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item
              label="Attendance Code Color"
              name={"color"}
              rules={[
                {
                  required: true,
                  message: "Attendance Code Color is required",
                },
              ]}
              className="w-full"
            >
              <div>
                <Input
                  value={dataEdit?.color}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      color: e.target.value,
                    })
                  }
                  type="color"
                  style={{ width: 80 }}
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
                  value={dataEdit?.description}
                  onChange={(e) =>
                    setDataEdit({
                      ...dataEdit,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </Form.Item>
            <div className={"flex gap-2.5 items-center mb-3"}>
              <p className={"text-sm/6 font-inter font-normal text-mono30"}>
                Perlu Verifikasi Berkas
              </p>
              <Switch
                checked={isVerification == 1 ? true : false}
                onChange={(value) => setIsVerification(value ? 1 : 0)}
              />
            </div>
            <div
              className={
                "flex items-center gap-2 px-3 py-2 mb-3 rounded-[4px] w-full bg-[#00589F1A]"
              }
            >
              <InfoCircleIconSvg size={16} color={"#00589F"} />
              <p className={"text-[#00589F] text-xs/5 font-inter font-normal"}>
                Jika verifikasi berkas menyala, akan muncul field untuk
                mengunggah berkas pendukung.
              </p>
            </div>
            <div className={"flex flex-col gap-3"}>
              <div className={"flex flex-row justify-between"}>
                <Checkbox
                  checked={valuesCheckbox.hariMasuk === 1}
                  onChange={(e) =>
                    handleCheckboxChange("hariMasuk", e.target.checked)
                  }
                >
                  Hari Masuk
                </Checkbox>
                <p className={"text-sm/6 font-inter text-mono30"}>
                  {valuesCheckbox.hariMasuk ? "1" : "0"}
                </p>
              </div>
              <div className={"flex flex-row justify-between"}>
                <Checkbox
                  checked={valuesCheckbox.hariPenggajian === 1}
                  onChange={(e) =>
                    handleCheckboxChange("hariPenggajian", e.target.checked)
                  }
                >
                  Hari Penggajian
                </Checkbox>
                <p className={"text-sm/6 font-inter text-mono30"}>
                  {valuesCheckbox.hariPenggajian ? "1" : "0"}
                </p>
              </div>
              <div className={"flex flex-row justify-between"}>
                <Checkbox
                  checked={valuesCheckbox.dapatDitagih === 1}
                  onChange={(e) =>
                    handleCheckboxChange("dapatDitagih", e.target.checked)
                  }
                >
                  Dapat Ditagih
                </Checkbox>
                <p className={"text-sm/6 font-inter text-mono30"}>
                  {valuesCheckbox.dapatDitagih ? "1" : "0"}
                </p>
              </div>
            </div>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerEditAttendanceCode;
