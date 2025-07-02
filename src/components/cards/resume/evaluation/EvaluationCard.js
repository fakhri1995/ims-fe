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
const EvaluationCard = ({ formEdit, statusEdit, setFormEdit, data }) => {
  const [showMore, setShowMore] = useState(true);
  const [instanceForm] = Form.useForm();
  const { TextArea } = Input;

  return (
    <div className={"border border-[#E6E6E6] bg-white w-full py-4 px-5 "}>
      <div className={"flex justify-between"}>
        <div
          onClick={() => setShowMore(!showMore)}
          className={"flex gap-1.5 items-center hover:cursor-pointer"}
        >
          <p className={"text-[#4D4D4D] text-[16px] leading-6 font-bold"}>
            CV Evaluation (7/7)
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
                evaluation: true,
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
            <Form
              layout="vertical"
              form={instanceForm}
              // onFinish={onFinish}
            >
              <div className={"flex gap-2"}>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Grammar & Spelling"
                    name={"grammar"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Grammar & Spelling is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Score Grammar & Spelling" />
                  </Form.Item>
                </div>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Content Validity"
                    name={"content"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Content Validity is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Content Validity" />
                  </Form.Item>
                </div>
                {/* <div className={"flex flex-col gap-2 w-1/3"}>
                  <Form.Item
                    label="Skill Alignment"
                    name={"skill"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Skill Alignment is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Score Skill Alignment" />
                  </Form.Item>
                </div> */}
              </div>
              <div className={"flex gap-2"}>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Skill Alignment"
                    name={"skill"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Skill Alignment is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Score Skill Alignment" />
                  </Form.Item>
                </div>
              </div>
              <div className={"flex gap-2"}>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Flags"
                    name={"flags"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Flags is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Flags" />
                  </Form.Item>
                </div>
              </div>
              <div className={"flex gap-2"}>
                <div className={"flex flex-col gap-2 w-full"}>
                  <Form.Item
                    label="Suggestions"
                    name={"suggestions"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Suggestions is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Suggestions" />
                  </Form.Item>
                </div>
              </div>
              <div className={"flex gap-2"}>
                <div className={"flex flex-col gap-2 w-full"}>
                  <Form.Item
                    label="Improvement Points"
                    name={"improvement"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Improvement Points is required",
                      },
                    ]}
                  >
                    <TextArea rows={5} placeholder="Input Improvement Points" />
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
                          evaluation: false,
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
          <div className={"flex flex-col gap-3 mt-4"}>
            <div className={"flex flex-col gap-1"}>
              <p className={"text-sm leading-6 font-medium text-mono30"}>
                Scores
              </p>
              <div className={"flex gap-1"}>
                <div className={"w-1/3 flex flex-col"}>
                  <p className={`text-xs leading-6 font-normal text-[#808080]`}>
                    Grammar & Spelling
                  </p>
                  <p
                    className={`text-[#4D4D4D] text-[13px] leading-6 font-normal `}
                  >
                    9
                  </p>
                </div>
                <div className={"w-1/3 flex flex-col"}>
                  <p className={`text-xs leading-6 font-normal text-[#808080]`}>
                    Content Validity
                  </p>
                  <p
                    className={`text-[#4D4D4D] text-[13px] leading-6 font-normal `}
                  >
                    9
                  </p>
                </div>
                <div className={"w-1/3 flex flex-col"}>
                  <p className={`text-xs leading-6 font-normal text-[#808080]`}>
                    Skill Alignment
                  </p>
                  <p
                    className={`text-[#4D4D4D] text-[13px] leading-6 font-normal `}
                  >
                    9
                  </p>
                </div>
              </div>
            </div>
            <div className={"flex flex-col gap-1"}>
              <p className={"text-sm leading-6 font-medium text-mono30"}>
                Flags
              </p>
            </div>
            <div className={"flex flex-col gap-1"}>
              <p className={"text-sm leading-6 font-medium text-mono30"}>
                Suggestions
              </p>
              <p className={`text-xs leading-6 font-normal text-[#808080]`}>
                Improvement Points
              </p>
              <p className={"text-sm leading-6 font-medium text-mono30"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EvaluationCard;
