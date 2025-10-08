import { Button, DatePicker, Form, Input, Space, notification } from "antd";
import moment from "moment";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_EXPERIENCE_ADD } from "lib/features";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import ButtonSys from "../../../button";
import ExperienceInfoBlock from "./ExperienceInfoBlock";

// Currently use for Training, Certifications, and Achievements section in resume
const ExperienceInfoCard = ({
  resumeId,
  data,
  formAdd,
  setFormAdd,
  setExperienceData,
  initProps,
}) => {
  const [showMore, setShowMore] = useState(true);
  const [instanceForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
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
  const { hasPermission } = useAccessControl();
  const isAllowedToAddExperience = hasPermission(RESUME_EXPERIENCE_ADD);

  const cancelData = () => {
    clearUpdate();
    setFormAdd({
      ...formAdd,
      experience: false,
    });
  };

  const onFinish = (values) => {
    let dataSend = {
      resume_id: resumeId,
      role: values.position,
      company: values.company,
      start_date: moment(values.start_date).format("YYYY-MM-DD"),
      end_date: moment(values.end_date).format("YYYY-MM-DD"),
      achievements: values.achievements,
      technologies: values.technologies,
      industry: values.industry,
      location: values.location,
      description: values.responsibility,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResumeExperience`, {
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
            message: "Tambah Data Experience Gagal",
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
      company: data_server.company,
      display_order: data_server.display_order,
      role: data_server.role,
      start_date: data_server.start_date,
      end_date: data_server.end_date,
      resume_id: data_server.resume_id,
      location: data_server.location,
      industry: data_server.industry,
      achievements: data_server.achievements,
      technologies: data_server.technologies,
      description: data_server.description,
    };
    dataTemp.push(datasave);
    setExperienceData(dataTemp);
    setFormAdd({
      ...formAdd,
      experience: false,
    });
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
                  all_data={data}
                  index={index}
                  setExperienceData={setExperienceData}
                  initProps={initProps}
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
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Industry is required",
                      //   },
                      // ]}
                    >
                      <Input placeholder="Input Industry" />
                    </Form.Item>
                  </div>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Location"
                      name={"location"}
                      className="col-span-2"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Location is required",
                      //   },
                      // ]}
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
                    label="Responsibility"
                    name={"responsibility"}
                    className="col-span-2 w-full"
                    rules={[
                      {
                        required: true,
                        message: "Responsibility is required",
                      },
                    ]}
                  >
                    <TextArea rows={5} placeholder="Input Responsibility" />
                  </Form.Item>
                </div>
                <div className={"flex gap-2"}>
                  <Form.Item
                    label="Achievements"
                    name={"achievements"}
                    className="col-span-2 w-full"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Achievements is required",
                    //   },
                    // ]}
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
                    <Button
                      disabled={!isAllowedToAddExperience}
                      loading={loading}
                      htmlType="submit"
                      type="primary"
                    >
                      Save
                    </Button>
                  </Space>
                </div>
              </Form>
            </div>
          ) : (
            <ButtonSys
              size={"small"}
              disabled={!isAllowedToAddExperience}
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
