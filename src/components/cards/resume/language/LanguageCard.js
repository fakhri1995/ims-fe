import { Button, Form, Input, Select, Space } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import ButtonSys from "../../../button";
import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";

// Currently use for Training, Certifications, and Achievements section in resume
const LanguageCard = ({ initProps, formEdit, statusEdit, setFormEdit }) => {
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [instanceForm] = Form.useForm();
  const levels = ["basic", "intermediate", "fluent", "native"];

  const onFinish = (values) => {
    console.log("isi values ", values);
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
        {statusEdit == false && (
          <div
            className={"hover:cursor-pointer"}
            onClick={() =>
              setFormEdit({
                ...formEdit,
                languages: true,
              })
            }
          >
            <EditCvIconSvg />
          </div>
        )}
      </div>
      {showMore &&
        (statusEdit ? (
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
              <ButtonSys
                size={"small"}
                type={"dashed"}
                onClick={() => {
                  // clearDataUpdate();
                  // setIsAdd(true);
                }}
              >
                <p className="text-primary100 font-bold hover:text-primary75">
                  + Add Another Language
                </p>
              </ButtonSys>
              {statusEdit && (
                <div className={"flex justify-end mt-5"}>
                  <Space>
                    <Button
                      onClick={() =>
                        setFormEdit({
                          ...formEdit,
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
              )}
            </Form>
          </div>
        ) : (
          <div className={"flex flex-col gap-2 mt-4"}>
            <div className={"flex gap-2"}>
              <InformationColumn
                label={"Language"}
                value={"Indonesia"}
                bold={false}
              />
              <InformationColumn
                label={"Profiency"}
                value={"Fluent"}
                bold={false}
              />
            </div>
            <InformationColumn
              label={"Certifications"}
              full={true}
              value={"Indonesia Full Conversation Volume 1 2025"}
              bold={false}
            />
          </div>
        ))}
    </div>
  );
};

export default LanguageCard;
