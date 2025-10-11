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

const DrawerAddChargeCode = ({
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
      title={"Add Charge Code"}
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

            <div className={"p-4 rounded-[10px] border border-[#E6E6E6]"}>
              <p className={"text-xs/5 font-bold font-inter text-mono30 mb-4"}>
                Attendance Code 1
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
                    <Input
                      className={"w-full"}
                      placeholder="ex : MIGHTY"
                      name={"attendance_code_name"}
                      // value={item.name}
                      // onChange={(e) =>
                      //     handleChangeName(index, e.target.value)
                      // }
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
                      // value={item.description}
                      // onChange={(e) =>
                      //     handleChangeDescription(index, e.target.value)
                      // }
                    />
                  </div>
                </Form.Item>
                <div className={"flex flex-row justify-between"}>
                  <Checkbox>Hari Masuk</Checkbox>
                  <InputNumber min={0} defaultValue={0} style={{ width: 60 }} />
                </div>
                <div className={"flex flex-row justify-between"}>
                  <Checkbox>Hari Penggajian</Checkbox>
                  <InputNumber min={0} defaultValue={0} style={{ width: 60 }} />
                </div>
              </Form>
            </div>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerAddChargeCode;
