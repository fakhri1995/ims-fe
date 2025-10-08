import { Button, DatePicker, Form, Input, Space, notification } from "antd";
import moment from "moment";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_EDUCATION_ADD } from "lib/features";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import ButtonSys from "../../../button";
import ProjectInfoBlock from "./ProjectInfoBlock";

// Currently use for Training, Certifications, and Achievements section in resume
const ProjectInfoCard = ({
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
    name: null,
    technologies_skills: null,
    year: null,
    client: null,
    description: null,
  });
  const { hasPermission } = useAccessControl();
  const isAllowedToAddEducation = hasPermission(RESUME_EDUCATION_ADD);
  const onFinish = (values) => {
    let dataSend = {
      resume_id: resumeId,
      name: values.name,
      year: moment(values.year),
      description: values.description,
      technologies_skills: values.technologies_skills,
      client: values.client,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResumeProject`, {
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
        console.log("err ", err);
        notification.error({
          message: `Gagal add Project. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  const updateDataFromServer = (data_server) => {
    let dataTemp = data;
    let datasave = {
      id: data_server.id,
      name: data_server.name,
      year: data_server.year,
      description: data_server.description,
      technologies_skills: data_server.technologies_skills,
      client: data_server.client,
    };
    dataTemp.push(datasave);
    setEducationData(dataTemp);
    setFormAdd({
      ...formAdd,
      projects: false,
    });
  };

  const cancelData = () => {
    resetValue();
    setFormAdd({
      ...formAdd,
      projects: false,
    });
  };

  const resetValue = () => {
    setDataEdit({
      ...dataEdit,
      id: null,
      name: null,
      technologies_skills: null,
      year: null,
      client: null,
      description: null,
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
            Projects (4/8)
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
                <ProjectInfoBlock
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
          {formAdd.projects ? (
            <div className={"flex flex-col gap-2 mt-4"}>
              <Form layout="vertical" form={instanceForm} onFinish={onFinish}>
                <div className={"flex gap-2"}>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Project Name"
                      name={"name"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Project Name is required",
                        },
                      ]}
                    >
                      <Input placeholder="Input Project Name" />
                    </Form.Item>
                  </div>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Technologies/Skills"
                      name={"technologies_skills"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Technologies/Skills is required",
                        },
                      ]}
                    >
                      <Input placeholder="Input Technologies/Skills" />
                    </Form.Item>
                  </div>
                </div>
                <div className={"flex gap-2"}>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Year"
                      name={"year"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Year is required",
                        },
                      ]}
                    >
                      <DatePicker
                        allowClear={true}
                        picker="year"
                        placeholder="Year"
                        className="w-full"
                        // value={dataUpdateProj?.year ? moment(dataUpdateProj?.year) : null}
                        // onChange={(date) => {
                        //   let input = date?.format("YYYY-MM-DD");
                        //   setDataUpdateProj((prev) => ({
                        //     ...prev,
                        //     year: input,
                        //   }));
                        // }}
                      />
                    </Form.Item>
                  </div>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Client"
                      name={"client"}
                      className="col-span-2"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "GPA is required",
                      //   },
                      // ]}
                    >
                      <Input placeholder="Input Client" />
                    </Form.Item>
                  </div>
                </div>
                <div className={"flex gap-2"}>
                  <div className={"w-full"}>
                    <Form.Item
                      label="Description"
                      name={"description"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Description is required",
                        },
                      ]}
                    >
                      <TextArea rows={5} placeholder="Input Description" />
                    </Form.Item>
                  </div>
                </div>

                <div className={"flex justify-end mt-5"}>
                  <Space>
                    <Button
                      onClick={() =>
                        setFormAdd({
                          ...formAdd,
                          projects: false,
                        })
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={!isAllowedToAddEducation}
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
              type={"dashed"}
              disabled={!isAllowedToAddEducation}
              onClick={() => {
                resetValue();
                setFormAdd({
                  ...formAdd,
                  projects: true,
                });
              }}
            >
              <p className="text-primary100 font-bold hover:text-primary75">
                + Add Another Projects
              </p>
            </ButtonSys>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectInfoCard;
