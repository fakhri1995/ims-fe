import { Button, Form, Input, Space, notification } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";

// Currently use for Training, Certifications, and Achievements section in resume
const EvaluationCard = ({
  formEdit,
  statusEdit,
  initProps,
  setFormEdit,
  data,
  setEvaluationData,
}) => {
  const [showMore, setShowMore] = useState(true);
  const [instanceForm] = Form.useForm();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    let dataSend = {
      resume_id: data.id,
      grammar_and_spelling: values.grammar,
      content_validity: values.content,
      skill_alignment: values.skill,
      flags: values.flags,
      improvement_points: values.improvement,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResumeEvaluation`, {
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response ", response);
        if (response.success) {
          setEvaluationData({
            ...data,
            resume_id: data.id,
            grammar_and_spelling: values.grammar,
            content_validity: values.content,
            skill_alignment: values.skill,
            flags: values.flags,
            improvement_points: values.improvement,
          });
          setFormEdit({
            ...formEdit,
            evaluation: false,
          });
          notification.success({
            message: response.message,
            duration: 3,
          });
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        console.log("error apa ", err);
        notification.error({
          message: `Gagal update Evaluation. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

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
            <Form layout="vertical" form={instanceForm} onFinish={onFinish}>
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
                      {
                        pattern: /^\d+$/,
                        message: "Grammar & Spelling must be numeric",
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
                      {
                        pattern: /^\d+$/,
                        message: "Content Validity must be numeric",
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
                      {
                        pattern: /^\d+$/,
                        message: "Skill ALignment must be numeric",
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
                    <Button loading={loading} htmlType="submit" type="primary">
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
                    {data?.grammar_and_spelling}
                  </p>
                </div>
                <div className={"w-1/3 flex flex-col"}>
                  <p className={`text-xs leading-6 font-normal text-[#808080]`}>
                    Content Validity
                  </p>
                  <p
                    className={`text-[#4D4D4D] text-[13px] leading-6 font-normal `}
                  >
                    {data?.content_validity}
                  </p>
                </div>
                <div className={"w-1/3 flex flex-col"}>
                  <p className={`text-xs leading-6 font-normal text-[#808080]`}>
                    Skill Alignment
                  </p>
                  <p
                    className={`text-[#4D4D4D] text-[13px] leading-6 font-normal `}
                  >
                    {data?.skill_alignment}
                  </p>
                </div>
              </div>
            </div>
            <div className={"flex flex-col gap-1"}>
              <p className={"text-sm leading-6 font-medium text-mono30"}>
                Flags
              </p>
              <p className={"text-sm leading-6 font-medium text-mono30"}>
                {data?.flags}
              </p>
            </div>
            <div className={"flex flex-col gap-1"}>
              <p className={"text-sm leading-6 font-medium text-mono30"}>
                Suggestions
              </p>
              <p className={"text-sm leading-6 font-medium text-mono30"}>
                {data?.suggestions}
              </p>
              <p className={`text-xs leading-6 font-normal text-[#808080]`}>
                Improvement Points
              </p>
              <p className={"text-sm leading-6 font-medium text-mono30"}>
                {data?.improvement_points}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EvaluationCard;
