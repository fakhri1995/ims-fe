import { Button, DatePicker, Form, Input, Space, notification } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import ButtonSys from "../../../button";
import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";
import EducationInfoBlock from "./EducationInfoBlock";

// Currently use for Training, Certifications, and Achievements section in resume
const EducationInfoCard = ({
  data,
  resumeId,
  initProps,
  setEducationData,
  formAdd,
  setFormAdd,
}) => {
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [instanceForm] = Form.useForm();
  const { TextArea } = Input;
  const [dataEdit, setDataEdit] = useState({
    id: null,
    school: null,
    degree: null,
    gpa: null,
    field: null,
    location: null,
    start_date: null,
    end_date: null,
    honors: null,
    relevant_coursework: null,
  });
  const [isAdd, setIsAdd] = useState(false);

  const onFinish = (values) => {
    let dataSend = {
      resume_id: resumeId,
      university: values.school,
      major: values.field,
      degree: values.degree,
      gpa: values.gpa,
      start_date: moment(values.start_date).format("YYYY-MM-DD"),
      end_date: moment(values.end_date).format("YYYY-MM-DD"),
      location: values.location,
      honors: values.honors,
      relevant_coursework: values.coursework,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResumeEducation`, {
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
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal update Education. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  const updateDataFromServer = (data_server) => {
    let dataTemp = data;
    let datasave = {
      id: data_server.id,
      university: data_server.university,
      major: data_server.major,
      degree: data_server.degree,
      gpa: data_server.gpa,
      start_date: data_server.start_date,
      end_date: data_server.end_date,
      resume_id: data_server.resume_id,
      display_order: data_server.display_order,
      location: data_server.location,
      honors: data_server.honors,
      relevant_coursework: data_server.relevant_coursework,
    };
    dataTemp.push(datasave);
    setEducationData(dataTemp);
    setFormAdd({
      ...formAdd,
      education: false,
    });
  };

  const cancelData = () => {
    resetValue();
    setFormAdd({
      ...formAdd,
      education: false,
    });
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
      start_date: null,
      end_date: null,
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
      </div>
      {showMore && (
        <div>
          <div className={"mb-4"}>
            {data.length > 0 &&
              data.map((item, index) => (
                <EducationInfoBlock
                  cancelData={cancelData}
                  editData={dataEdit}
                  setEditData={setDataEdit}
                  jumlah_data={data.length}
                  data={item}
                  initProps={initProps}
                  index={index}
                  all_data={data}
                  setEducationData={setEducationData}
                />
              ))}
          </div>
          {formAdd.education ? (
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
                        setFormAdd({
                          ...formAdd,
                          education: false,
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
                  education: true,
                });
              }}
            >
              <p className="text-primary100 font-bold hover:text-primary75">
                + Add Another Educations
              </p>
            </ButtonSys>
          )}
        </div>
      )}
    </div>
  );
};

export default EducationInfoCard;
