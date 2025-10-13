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

const DrawerAddAttendanceCode = ({
  visible,
  onvisible,
  initProps,
  isAllowedToAddCompany,
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
  const [loadingGetCompany, setLoadingGetCompany] = useState(false);
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
    const payload = {
      // year: dataCompany.year,
      charge_code_id: Number(idChargeCode),
      name: values.attendance_code_name,
      description: values.description,
      // month: dataCompany.month,
      hari_masuk: valuesCheckbox.hariMasuk,
      hari_penggajian: valuesCheckbox.hariPenggajian,
      dapat_ditagih: valuesCheckbox.dapatDitagih,
    };
    // console.log('Json stringify ', JSON.stringify(payload))
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addAttendanceCode`, {
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
            message: `Attendance Code has successfully created`,
            duration: 3,
            // onClose: () => {
            //   rt.push("/company/workdayschedule/");
            // },
          });
        } else {
          notification.error({
            message: `Create Attendance Code has failed. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingCreate(false);
        notification.error({
          message: `Create Attendance Code has failed. ${err.response}`,
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
    if (!isAllowedToAddCompany) {
      permissionWarningNotification("Add", "Attendance Code Company");
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
      title={"Create Attendance Code"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Save"}
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
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select Attendance Code"
                  filterOption={(input, option) =>
                    (option?.children ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  loading={loadingGetCompany}
                  style={{ width: `100%` }}
                  // value={item?.name}
                  onChange={(value) => {
                    instanceForm.setFieldsValue({
                      attendance_code_name: value,
                    });
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
                <Input
                  className={"w-full"}
                  placeholder="ex:Proyek Interna;"
                  name={"description"}
                />
              </div>
            </Form.Item>
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

export default DrawerAddAttendanceCode;
