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
const PersonalInfoCard = ({ formEdit, statusEdit, setFormEdit, data }) => {
  const [showMore, setShowMore] = useState(true);
  const [instanceForm] = Form.useForm();
  const { TextArea } = Input;
  useEffect(() => {
    if (statusEdit) {
      setShowMore(true);
    } else {
    }
  }, [statusEdit]);

  return (
    <div
      className={
        "border border-b-0 border-[#E6E6E6] rounded-t-[10px] bg-white w-full py-4 px-5 "
      }
    >
      <div className={"flex justify-between"}>
        <div
          onClick={() => setShowMore(!showMore)}
          className={"flex gap-1.5 items-center hover:cursor-pointer"}
        >
          <p className={"text-[#4D4D4D] text-[16px] leading-6 font-bold"}>
            Personal Info (1/7)
          </p>
          {showMore ? (
            <MdChevronDown className="w-[14px] h-[14px]" />
          ) : (
            <MdChevronUp className="w-[14px] h-[14px]" />
          )}
        </div>
        {formEdit?.personal == false && (
          <div
            className={"hover:cursor-pointer"}
            onClick={() =>
              setFormEdit({
                ...formEdit,
                personal: true,
              })
            }
          >
            <EditCvIconSvg />
          </div>
        )}
      </div>
      {showMore &&
        (formEdit?.personal ? (
          <div className={"flex flex-col gap-2 mt-4"}>
            <Form
              layout="vertical"
              form={instanceForm}
              // onFinish={dataDefault?.id ? handleSubmitUpdate : handleSubmitAdd}
            >
              <div className={"flex gap-2"}>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Name"
                    name={"name"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Name is required",
                      },
                    ]}
                  >
                    <Input placeholder="ex: Sick Leave" />
                  </Form.Item>
                </div>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Email"
                    name={"email"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Email is required",
                      },
                    ]}
                  >
                    <Input placeholder="ex: Sick Leave" />
                  </Form.Item>
                </div>
              </div>
              <div className={"flex gap-2"}>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Phone"
                    name={"phone"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Phone is required",
                      },
                    ]}
                  >
                    <Input placeholder="ex: Sick Leave" />
                  </Form.Item>
                </div>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Location"
                    name={"location"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Location is required",
                      },
                    ]}
                  >
                    <Input placeholder="ex: Sick Leave" />
                  </Form.Item>
                </div>
              </div>
              <div className={"flex gap-2"}>
                <div className={"w-1/2"}>
                  <Form.Item
                    label="LinkedIn"
                    name={"linkedin"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "LinkedIn is required",
                      },
                    ]}
                  >
                    <Input placeholder="ex: Sick Leave" />
                  </Form.Item>
                </div>
              </div>
              <div className={"flex gap-2"}>
                <div className={"w-full"}>
                  <Form.Item
                    label="Summary"
                    name={"summary"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Summary is required",
                      },
                    ]}
                  >
                    <TextArea rows={5} placeholder="ex: Sick Leave" />
                  </Form.Item>
                </div>
              </div>
            </Form>
            {formEdit?.personal && (
              <div className={"flex justify-end"}>
                <Space>
                  <Button
                    onClick={() =>
                      setFormEdit({
                        ...formEdit,
                        personal: false,
                      })
                    }
                  >
                    Cancel
                  </Button>
                  <Button type="primary">Save</Button>
                </Space>
              </div>
            )}
          </div>
        ) : (
          <div className={"flex flex-col gap-2 mt-4"}>
            <div className={"flex gap-2"}>
              <InformationColumn
                label={"Name"}
                value={data?.name}
                bold={true}
              />
              <InformationColumn
                label={"Email"}
                value={data?.email}
                bold={false}
              />
            </div>
            <div className={"flex gap-2"}>
              <InformationColumn
                label={"Phone"}
                value={data?.phone}
                bold={false}
              />
              <InformationColumn
                label={"Location"}
                value={data?.location}
                bold={false}
              />
            </div>
            <InformationColumn
              label={"LinkedIn"}
              full={true}
              value={"linkedin.com/id/lulu-id/"}
              bold={false}
            />
            <InformationColumn
              label={"Summary"}
              full={true}
              value={
                "Basic Programming (variable and conditional types (if/else, nested condition), looping (for, while), function)"
              }
              bold={false}
            />
          </div>
        ))}
    </div>
  );
};

export default PersonalInfoCard;
