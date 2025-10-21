import { PlusCircleOutlined } from "@ant-design/icons";
import { color } from "@chakra-ui/react";
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
import { CopyIconSvg, TrashIconSvg } from "../../../icon";
import DrawerCore from "../../drawerCore";

const DrawerEditChargeCode = ({
  id,
  data,
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
    id: null,
    name: null,
    description: null,
    color: null,
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

  useEffect(() => {
    if (!data) {
      return;
    }
    setDataChargeCode({
      ...dataChargeCode,
      name: data.name,
      description: data.description,
      color: data.color,
    });
    instanceForm.setFieldsValue({
      charge_code_name: data.name,
      description: data.description,
      color: data.color,
    });
  }, [data]);

  const clearData = () => {
    setDataChargeCode({
      id: null,
      name: null,
      color: null,
      description: null,
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
      company_id: Number(id_company),
      id: Number(id),
      name: dataChargeCode.name,
      description: dataChargeCode.description,
      color: dataChargeCode.color,
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
  };

  const cancelClick = () => {
    clearData();
    onvisible(false);
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

  const handleSwitchVerification = (index, value) => {
    // console.log('value ',value)
    const newData = [...chargeCodes];
    newData[index].perlu_verifikasi = value ? 1 : 0;
    setChargeCodes(newData);
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
                <Input
                  value={dataChargeCode?.color}
                  onChange={(e) =>
                    setDataChargeCode({
                      ...dataChargeCode,
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
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerEditChargeCode;
