import { Button, DatePicker, Form, Input, Space } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import ButtonSys from "../../../button";
import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";
import ExperienceInfoBlock from "./ExperienceInfoBlock";

// Currently use for Training, Certifications, and Achievements section in resume
const ExperienceInfoCard = ({ data, formAdd, setFormAdd }) => {
  const [showMore, setShowMore] = useState(true);
  const [isAdd, setIsAdd] = useState(false);
  const [instanceForm] = Form.useForm();
  const { TextArea } = Input;
  const [editData, setEditData] = useState({
    id: null,
    company: null,
    position: null,
    industry: null,
    location: null,
    start_date: null,
    end_date: null,
    achievement: null,
    technologies: null,
  });

  const cancelData = () => {
    clearUpdate();
    setFormAdd({
      ...formAdd,
      experience: false,
    });
  };

  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  const clearUpdate = () => {
    setEditData({
      ...editData,
      id: null,
      company: null,
      position: null,
      industry: null,
      location: null,
      start_date: null,
      end_date: null,
      achievement: null,
      technologies: null,
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
            Experiences (2/7)
          </p>
          {showMore ? (
            <MdChevronDown className="w-[14px] h-[14px]" />
          ) : (
            <MdChevronUp className="w-[14px] h-[14px]" />
          )}
        </div>
      </div>
      {showMore && (
        <div>
          <div className={"mb-4"}>
            {data.length > 0 &&
              data.map((item, index) => (
                <ExperienceInfoBlock
                  cancelData={cancelData}
                  editData={editData}
                  setEditData={setEditData}
                  jumlah_data={data.length}
                  data={item}
                  index={index}
                />
              ))}
          </div>
          {formAdd.experience ? (
            <div className={"flex flex-col gap-2 mt-4"}>
              <Form layout="vertical" form={instanceForm} onFinish={onFinish}>
                <div className={"flex gap-2"}>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Company"
                      name={"company"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Company is required",
                        },
                      ]}
                    >
                      <Input placeholder="Input Company" />
                    </Form.Item>
                  </div>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Position"
                      name={"position"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Position is required",
                        },
                      ]}
                    >
                      <Input placeholder="Input Position" />
                    </Form.Item>
                  </div>
                </div>
                <div className={"flex gap-2"}>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Industry"
                      name={"industry"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Industry is required",
                        },
                      ]}
                    >
                      <Input placeholder="Input Industry" />
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
                      <Input placeholder="Input Location" />
                    </Form.Item>
                  </div>
                </div>
                <div className={"flex gap-2"}>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Start Date"
                      name={"start_date"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Start Date is required",
                        },
                      ]}
                    >
                      <DatePicker
                        allowClear={true}
                        placeholder="Start Date"
                        className="w-full"
                        // onChange={(date) => {
                        //   let input = date ? date.format("YYYY-MM-DD") : null;
                        //   setDataUpdate((prev) => ({
                        //     ...prev,
                        //     year: input,
                        //   }));
                        // }}
                      />
                    </Form.Item>
                  </div>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="End Date"
                      name={"end_date"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "End Date is required",
                        },
                      ]}
                    >
                      <DatePicker
                        allowClear={true}
                        placeholder="End Date"
                        className="w-full"
                        // onChange={(date) => {
                        //   let input = date ? date.format("YYYY-MM-DD") : null;
                        //   setDataUpdate((prev) => ({
                        //     ...prev,
                        //     year: input,
                        //   }));
                        // }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={"flex gap-2"}>
                  <Form.Item
                    label="Achievements"
                    name={"achievements"}
                    className="col-span-2 w-full"
                    rules={[
                      {
                        required: true,
                        message: "Achievements is required",
                      },
                    ]}
                  >
                    <TextArea rows={5} placeholder="Input Achievements" />
                  </Form.Item>
                </div>
                <div className={"flex gap-2 "}>
                  <Form.Item
                    label="Technologies"
                    name={"technologies"}
                    className="col-span-2 w-full"
                    rules={[
                      {
                        required: true,
                        message: "Technologies is required",
                      },
                    ]}
                  >
                    <Input placeholder="Input Technologies" />
                  </Form.Item>
                </div>
                <div className={"flex justify-end"}>
                  <Space>
                    <Button onClick={() => cancelData()}>Cancel</Button>
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
                clearUpdate();
                setFormAdd({
                  ...formAdd,
                  experience: true,
                });
              }}
            >
              <p className="text-primary100 font-bold hover:text-primary75">
                + Add Another Experience
              </p>
            </ButtonSys>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperienceInfoCard;
