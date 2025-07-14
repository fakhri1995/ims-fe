import { Button, Form, Input, Space } from "antd";
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
const EducationInfoCard = ({ data, formEdit, statusEdit, setFormEdit }) => {
  const [showMore, setShowMore] = useState(true);
  const [instanceForm] = Form.useForm();
  const { TextArea } = Input;
  const [dataEdit, setDataEdit] = useState({
    id: null,
    school: null,
    degree: null,
    gpa: null,
    field: null,
    location: null,
    honors: null,
    relevant_coursework: null,
  });
  const [isAdd, setIsAdd] = useState(false);

  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  const resetValue = () => {
    setDataEdit({
      ...dataEdit,
      id: null,
      school: null,
      degree: null,
      gpa: null,
      field: null,
      location: null,
      honors: null,
      relevant_coursework: null,
    });
    instanceForm.resetFields();
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
            Education (3/7)
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
                education: true,
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
                    label="School"
                    name={"school"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "School is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input School Name" />
                  </Form.Item>
                </div>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Degree"
                    name={"degree"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Degree is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Degree" />
                  </Form.Item>
                </div>
              </div>
              <div className={"flex gap-2"}>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Field"
                    name={"field"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Field is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Field Name" />
                  </Form.Item>
                </div>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="GPA"
                    name={"gpa"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "GPA is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input GPA" />
                  </Form.Item>
                </div>
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
                  <Input placeholder="Input Location" />
                </Form.Item>
              </div>
              <div className={"flex gap-2"}>
                <div className={"w-full"}>
                  <Form.Item
                    label="Honors"
                    name={"honors"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Honors is required",
                      },
                    ]}
                  >
                    <TextArea rows={5} placeholder="Input Honors" />
                  </Form.Item>
                </div>
              </div>
              <div className={"flex gap-2"}>
                <div className={"w-full"}>
                  <Form.Item
                    label="Relevant Coursework"
                    name={"coursework"}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Relevant Coursework is required",
                      },
                    ]}
                  >
                    <TextArea
                      rows={5}
                      placeholder="Input Relevant Coursework"
                    />
                  </Form.Item>
                </div>
              </div>

              {statusEdit && (
                <div className={"flex justify-end mt-5"}>
                  <Space>
                    <Button
                      onClick={() =>
                        setFormEdit({
                          ...formEdit,
                          education: false,
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
          <div className={"flex flex-col gap-2 mt-4"}>
            <div className={"flex gap-2"}>
              <InformationColumn
                label={"School"}
                value={data?.name}
                bold={false}
              />
              <InformationColumn
                label={"Degree"}
                value={"Bachelor Degree"}
                bold={false}
              />
            </div>
            <div className={"flex gap-2"}>
              <InformationColumn
                label={"Field"}
                value={data?.field}
                bold={false}
              />
              <InformationColumn
                label={"GPA"}
                value={data?.gpa ? data?.gpa : "-"}
                bold={false}
              />
            </div>
            <InformationColumn
              label={"Location"}
              full={true}
              value={"Indonesia"}
              bold={false}
            />
            <InformationColumn
              label={"Honors"}
              full={true}
              value={`Basic Programming (variable and
                    conditional types (if/else, nested
                    condition), looping (for, while),
                    function`}
              bold={false}
            />
            <InformationColumn
              label={"Relevant Coursework"}
              full={true}
              value={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
              }
              bold={false}
            />
            {isAdd ? (
              <div className={"flex flex-col gap-2 mt-4"}>
                <Form layout="vertical" form={instanceForm} onFinish={onFinish}>
                  <div className={"flex gap-2"}>
                    <div className={"flex flex-col gap-2 w-1/2"}>
                      <Form.Item
                        label="School"
                        name={"school"}
                        className="col-span-2"
                        rules={[
                          {
                            required: true,
                            message: "School is required",
                          },
                        ]}
                      >
                        <Input placeholder="Input School Name" />
                      </Form.Item>
                    </div>
                    <div className={"flex flex-col gap-2 w-1/2"}>
                      <Form.Item
                        label="Degree"
                        name={"degree"}
                        className="col-span-2"
                        rules={[
                          {
                            required: true,
                            message: "Degree is required",
                          },
                        ]}
                      >
                        <Input placeholder="Input Degree" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className={"flex gap-2"}>
                    <div className={"flex flex-col gap-2 w-1/2"}>
                      <Form.Item
                        label="Field"
                        name={"field"}
                        className="col-span-2"
                        rules={[
                          {
                            required: true,
                            message: "Field is required",
                          },
                        ]}
                      >
                        <Input placeholder="Input Field Name" />
                      </Form.Item>
                    </div>
                    <div className={"flex flex-col gap-2 w-1/2"}>
                      <Form.Item
                        label="GPA"
                        name={"gpa"}
                        className="col-span-2"
                        rules={[
                          {
                            required: true,
                            message: "GPA is required",
                          },
                        ]}
                      >
                        <Input placeholder="Input GPA" />
                      </Form.Item>
                    </div>
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
                      <Input placeholder="Input Location" />
                    </Form.Item>
                  </div>
                  <div className={"flex gap-2"}>
                    <div className={"w-full"}>
                      <Form.Item
                        label="Honors"
                        name={"honors"}
                        className="col-span-2"
                        rules={[
                          {
                            required: true,
                            message: "Honors is required",
                          },
                        ]}
                      >
                        <TextArea rows={5} placeholder="Input Honors" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className={"flex gap-2"}>
                    <div className={"w-full"}>
                      <Form.Item
                        label="Relevant Coursework"
                        name={"coursework"}
                        className="col-span-2"
                        rules={[
                          {
                            required: true,
                            message: "Relevant Coursework is required",
                          },
                        ]}
                      >
                        <TextArea
                          rows={5}
                          placeholder="Input Relevant Coursework"
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className={"flex justify-end mt-5"}>
                    <Space>
                      <Button
                        onClick={() =>
                          // setFormEdit({
                          //   ...formEdit,
                          //   education: false,
                          // })
                          setIsAdd(false)
                        }
                      >
                        Cancel
                      </Button>
                      <Button htmlType="submit" type="primary">
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
                  setIsAdd(true);
                }}
              >
                <p className="text-primary100 font-bold hover:text-primary75">
                  + Add Another Educations
                </p>
              </ButtonSys>
            )}
          </div>
        ))}
    </div>
  );
};

export default EducationInfoCard;
