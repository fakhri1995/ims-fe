import { Button, Form, Input, Select, Space, notification } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import ButtonSys from "../../../button";
import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";
import LanguageBlock from "./LanguageBlock";

// Currently use for Training, Certifications, and Achievements section in resume
const LanguageCard = ({
  data,
  setLanguageData,
  resumeId,
  formAdd,
  setFormAdd,
  initProps,
  formEdit,
  statusEdit,
  setFormEdit,
}) => {
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    id: null,
    proficiency: null,
    language: null,
    certifications: null,
  });
  const [instanceForm] = Form.useForm();
  const levels = ["basic", "intermediate", "fluent", "native"];

  const onFinish = (values) => {
    let dataSend = {
      resume_id: resumeId,
      language: values.language,
      proficiency: values.proficiency,
      certifications: values.certification,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResumeLanguage`, {
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          instanceForm.resetFields();
          let data_server = response.data;
          updateDataFromServer(data_server);
          notification.success({
            message: response.message,
            duration: 3,
          });
        } else {
          notification.error({
            message: "Tambah Data Language Gagal",
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal Tambah Language. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
    //
  };

  const updateDataFromServer = (data_server) => {
    let dataTemp = data;
    let datasave = {
      id: data_server.id,
      language: data_server.language,
      display_order: data_server.display_order,
      proficiency: data_server.proficiency,
      certifications: data_server.certifications,
    };
    dataTemp.push(datasave);
    setLanguageData(dataTemp);
    setFormAdd({
      ...formAdd,
      languages: false,
    });
  };

  const resetValue = () => {
    setDataEdit({
      ...dataEdit,
      id: null,
      proficiency: null,
      language: null,
      certifications: null,
    });
    instanceForm.resetFields();
  };

  const cancelData = () => {
    resetValue();
    setFormAdd({
      ...formAdd,
      languages: false,
    });
  };

  return (
    <div
      className={
        "border border-b-0 border-[#E6E6E6] bg-white w-full py-4 px-5 "
      }
    >
      <div className={"flex justify-between"}>
        <div
          onClick={() => setShowMore(!showMore)}
          className={"flex gap-1.5 items-center hover:cursor-pointer"}
        >
          <p className={"text-[#4D4D4D] text-[16px] leading-6 font-bold"}>
            Languages (5/7)
          </p>
          {showMore ? (
            <MdChevronDown className="w-[14px] h-[14px]" />
          ) : (
            <MdChevronUp className="w-[14px] h-[14px] font-bold" />
          )}
        </div>
      </div>
      {showMore && (
        <div>
          <div className={"mb-4"}>
            {data.length > 0 &&
              data.map((item, index) => (
                <LanguageBlock
                  cancelData={cancelData}
                  editData={dataEdit}
                  setEditData={setDataEdit}
                  jumlah_data={data.length}
                  data={item}
                  initProps={initProps}
                  index={index}
                  all_data={data}
                  setEducationData={setLanguageData}
                />
              ))}
          </div>
          {formAdd.languages ? (
            <div className={"flex flex-col gap-2 mt-4"}>
              <Form layout="vertical" form={instanceForm} onFinish={onFinish}>
                <div className={"flex gap-2"}>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Language"
                      name={"language"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Language is required",
                        },
                      ]}
                    >
                      <Input
                        // defaultValue={dataEdit?.name}
                        placeholder="Input Language"
                      />
                    </Form.Item>
                  </div>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Proficiency"
                      name={"proficiency"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Proficiency is required",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Proficiency"
                        className={"w-1/2"}
                      >
                        {levels.map((level) => (
                          <Option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className={"flex gap-2"}>
                  <div className={"flex flex-col gap-2 w-full"}>
                    <Form.Item
                      label="Certification"
                      name={"certification"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Certification is required",
                        },
                      ]}
                    >
                      <Input placeholder="Input Certification" />
                    </Form.Item>
                  </div>
                </div>
                <div className={"flex justify-end mt-5"}>
                  <Space>
                    <Button
                      onClick={() =>
                        setFormAdd({
                          ...formAdd,
                          languages: false,
                        })
                      }
                    >
                      Cancel
                    </Button>
                    <Button loading={loading} htmlType="submit" type="primary">
                      Save
                    </Button>
                  </Space>
                </div>
              </Form>
            </div>
          ) : (
            <ButtonSys
              size={"small"}
              type={"dashed"}
              onClick={() => {
                resetValue();
                setFormAdd({
                  ...formAdd,
                  languages: true,
                });
              }}
            >
              <p className="text-primary100 font-bold hover:text-primary75">
                + Add Another Languages
              </p>
            </ButtonSys>
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageCard;
