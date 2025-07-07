import { Button, Form, Input, Space, notification } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_PERSONAL_INFO_UPDATE } from "lib/features";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";

// Currently use for Training, Certifications, and Achievements section in resume
const PersonalInfoCard = ({
  idResume,
  initProps,
  formEdit,
  statusEdit,
  setFormEdit,
  data,
  dataPersonalInfo,
  setDataPersonalInfo,
}) => {
  const [showMore, setShowMore] = useState(true);
  const [instanceForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    name: null,
    email: null,
    location: null,
    phone: null,
    linkedin: null,
    summary: null,
  });
  const { TextArea } = Input;
  useEffect(() => {
    if (statusEdit) {
      setShowMore(true);
    } else {
    }
  }, [statusEdit]);

  const { hasPermission } = useAccessControl();
  const isAllowedToUpdatePersonalInfo = hasPermission(
    RESUME_PERSONAL_INFO_UPDATE
  );

  useEffect(() => {
    if (formEdit?.personal) {
      console.log("isi data yang akan diedit ", data);
      setDataEdit({
        ...dataEdit,
        name: data?.name,
        email: data?.email,
        location: data?.location,
        phone: data?.phone,
        linkedin: data?.linkedin,
        summary: data?.summary,
      });
      instanceForm.setFieldsValue({
        name: data?.name,
        email: data?.email,
        location: data?.location,
        phone: data?.phone,
        linkedin: data?.linkedin,
        summary: data?.summary,
      });
    } else {
    }
  }, [formEdit]);

  const onFinish = (values) => {
    let dataSend = {
      resume_id: data.id,
      name: values.name,
      telp: values.phone,
      email: values.email,
      location: "Universitas Indonesia",
      summary: values.summary,
      linkedin: values.linkedin,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateResumePersonalInfo`, {
      method: `PUT`,
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
          setDataPersonalInfo({
            ...dataPersonalInfo,
            name: values.name,
            phone: values.phone,
            email: values.email,
            location: "Universitas Indonesia",
            summary: values.summary,
            linkedin: values.linkedin,
          });
          setFormEdit({
            ...formEdit,
            personal: false,
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
          message: `Gagal update Personal Info. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

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
        {formEdit?.personal == false && isAllowedToUpdatePersonalInfo && (
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
            <Form layout="vertical" form={instanceForm} onFinish={onFinish}>
              <div className={"flex gap-2"}>
                <div className={"flex flex-col gap-2 w-1/2"}>
                  <Form.Item
                    label="Name"
                    name={"name"}
                    initialValue={dataEdit?.name}
                    className="col-span-2"
                    rules={[
                      {
                        required: true,
                        message: "Name is required",
                      },
                    ]}
                  >
                    <Input
                      defaultValue={dataEdit?.name}
                      placeholder="Input name"
                    />
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
                    <Input placeholder="Input email" />
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
                      {
                        pattern: /^\d+$/,
                        message: "Phone must be numeric",
                      },
                    ]}
                  >
                    <Input placeholder="Input Phone" />
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
                    <Input placeholder="Input location" />
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
                    <Input placeholder="Input linkedIn" />
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
                    <TextArea rows={5} placeholder="Input Summary" />
                  </Form.Item>
                </div>
              </div>
              {formEdit?.personal && isAllowedToUpdatePersonalInfo && (
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
              value={"linkedin.com/" + data?.linkedin}
              bold={false}
            />
            <InformationColumn
              label={"Summary"}
              full={true}
              value={data?.summary}
              bold={false}
            />
          </div>
        ))}
    </div>
  );
};

export default PersonalInfoCard;
