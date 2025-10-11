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
  const [valuesCheckbox, setValuesCheckbox] = useState({
    hariMasuk: 0,
    hariPenggajian: 0,
    dapatDitagih: 0,
  });
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

  const handleCreateChargeCode = () => {
    if (!isAllowedToAddCompany) {
      permissionWarningNotification("Add", "Company");
      return;
    }
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
      onClick={handleCreateChargeCode}
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
                <Input
                  className={"w-full"}
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
