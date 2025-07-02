import { Button, Form, Input, Space } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";

// Currently use for Training, Certifications, and Achievements section in resume
const ToolsCard = ({ data, formEdit, statusEdit, setFormEdit }) => {
  const [showMore, setShowMore] = useState(true);
  const [instanceForm] = Form.useForm();
  const { TextArea } = Input;

  const onFinish = (values) => {
    console.log("Form submitted:", values);
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
            Tools (6/7)
          </p>
          {showMore ? (
            <MdChevronDown className="w-[14px] h-[14px]" />
          ) : (
            <MdChevronUp className="w-[14px] h-[14px]" />
          )}
        </div>
        {statusEdit == false && (
          <div
            className={"hover:cursor-pointer"}
            onClick={() =>
              setFormEdit({
                ...formEdit,
                tools: true,
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
                    label="Tool Name"
                    name={"toolname"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Tool Name is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Tool Name" />
                  </Form.Item>
                </div>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Category"
                    name={"category"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Category is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Category" />
                  </Form.Item>
                </div>
              </div>
              <div className={"flex flex-col gap-2 w-1/2"}>
                <Form.Item
                  label="Profiency"
                  name={"proficiency"}
                  className="col-span-2"
                  rules={[
                    {
                      required: true,
                      message: "Proficiency is required",
                    },
                  ]}
                >
                  <Input placeholder="Input Proficiency" />
                </Form.Item>
              </div>
              <div className={"flex flex-col gap-2 w-1/2"}>
                <Form.Item
                  label="Details"
                  name={"details"}
                  className="col-span-2"
                  rules={[
                    {
                      required: true,
                      message: "Details is required",
                    },
                  ]}
                >
                  <Input placeholder="Input Details" />
                </Form.Item>
              </div>
              <div className={"flex gap-2"}>
                <div className={"w-full"}>
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
                    <TextArea rows={5} placeholder="Input Certification" />
                  </Form.Item>
                </div>
              </div>
              {statusEdit && (
                <div className={"flex justify-end"}>
                  <Space>
                    <Button
                      onClick={() =>
                        setFormEdit({
                          ...formEdit,
                          tools: false,
                        })
                      }
                    >
                      Cancel
                    </Button>
                    <Button htmlType="submit" type="primary">
                      Save
                    </Button>
                  </Space>
                </div>
              )}
            </Form>
          </div>
        ) : (
          <div>
            {data.length > 0 &&
              data.map((item, index) => (
                <div className={"flex flex-col gap-2 mt-4"}>
                  <div className={"flex gap-2"}>
                    <InformationColumn
                      label={"Tool Name"}
                      value={item?.name ?? "-"}
                      bold={false}
                    />
                    <InformationColumn
                      label={"Category"}
                      value={item?.category ?? "-"}
                      bold={false}
                    />
                  </div>
                  <InformationColumn
                    label={"Proficiency"}
                    full={true}
                    value={item?.profiency ?? "-"}
                    bold={false}
                  />
                  <InformationColumn
                    label={"Details"}
                    full={true}
                    value={item?.details ?? "-"}
                    bold={false}
                  />
                  <InformationColumn
                    label={"Certifications"}
                    full={true}
                    value={item?.certifications ?? "-"}
                    bold={false}
                  />
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default ToolsCard;
