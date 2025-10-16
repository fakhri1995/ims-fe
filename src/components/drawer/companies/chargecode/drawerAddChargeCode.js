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

const DrawerAddChargeCode = ({
  visible,
  onvisible,
  initProps,
  isAllowedToAddChargeCode,
  setLoadingCreate,
  loadingCreate,
  id_company,
  companyName,
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
    console.log("values ", values);
    const payload = {
      company_id: Number(id_company),
      name: values.charge_code_name,
      description: values.description,
      color: values.color,
      // month: dataCompany.month,
    };
    // console.log('Json stringify ', JSON.stringify(payload))
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addChargeCode`, {
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
            message: `Charge Codes has successfully created`,
            duration: 3,
            // onClose: () => {
            //   rt.push("/company/workdayschedule/");
            // },
          });
        } else {
          notification.error({
            message: `Create Charge Codes has failed. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingCreate(false);
        notification.error({
          message: `Create Charge Codes has failed. ${err.response}`,
          duration: 3,
        });
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
    setChargeCodes([
      ...chargeCodes,
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
    const newData = [...chargeCodes];
    newData[index][key] = checked ? 1 : 0;
    setChargeCodes(newData);
  };
  const handleClickButton = () => {
    // validasi dan ambil value form
    if (!isAllowedToAddChargeCode) {
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

  const handleSwitchVerification = (index, value) => {
    // console.log('value ',value)
    const newData = [...chargeCodes];
    newData[index].perlu_verifikasi = value ? 1 : 0;
    setChargeCodes(newData);
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
              className="col-span-2"
            >
              <div>
                <Select
                  disabled
                  style={{ width: `100%` }}
                  value={companyName}
                />
              </div>
            </Form.Item>
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
              label="Charge Code Color"
              name={"color"}
              rules={[
                {
                  required: true,
                  message: "Charge Code Color is required",
                },
              ]}
              className="w-full"
            >
              <div>
                <Input type="color" style={{ width: 80 }} />
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
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerAddChargeCode;
