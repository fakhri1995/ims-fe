import { Button, DatePicker, Form, Input, Space } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";
import InformationColumnWithAction from "../InformationColumnWithAction";

// Currently use for Training, Certifications, and Achievements section in resume
const ExperienceInfoBlock = ({
  data,
  jumlah_data,
  index,
  editData,
  setEditData,
  cancelData,
}) => {
  const [showMore, setShowMore] = useState(true);
  const [instanceForm] = Form.useForm();
  const { TextArea } = Input;

  const onFinish = (values) => {
    console.log("values ", values);
    // let dataSend = {
    //   resume_id: data.id,
    //   name: values.name,
    //   telp: values.phone,
    //   email: values.email,
    //   location: values.location,
    //   summary: values.summary,
    //   linkedin: values.linkedin,
    // };
    // setLoading(true);
    // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateResumePersonalInfo`, {
    //   method: `PUT`,
    //   headers: {
    //     Authorization: JSON.parse(initProps),
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataSend),
    // })
    //   .then((res) => res.json())
    //   .then((response) => {
    //     console.log("response ", response);
    //     if (response.success) {
    //       setDataPersonalInfo({
    //         ...dataPersonalInfo,
    //         name: values.name,
    //         phone: values.phone,
    //         email: values.email,
    //         location: values.location,
    //         summary: values.summary,
    //         linkedin: values.linkedin,
    //       });
    //       setFormEdit({
    //         ...formEdit,
    //         personal: false,
    //       });
    //       notification.success({
    //         message: response.message,
    //         duration: 3,
    //       });
    //     } else {
    //       notification.error({
    //         message: response.message,
    //         duration: 3,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("error apa ", err);
    //     notification.error({
    //       message: `Gagal update Personal Info. ${err.response}`,
    //       duration: 3,
    //     });
    //   })
    //   .finally(() => setLoading(false));
  };
  return (
    <div
      className={`flex flex-col gap-2 mt-4 ${
        index != jumlah_data - 1 && "border-b-1.5"
      } pb-2`}
    >
      {data.id == editData.id ? (
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
        <div>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Company"}
              value={data?.name ?? "-"}
              bold={false}
            />
            <InformationColumnWithAction
              label={"position"}
              id={data?.id}
              setEditData={setEditData}
              editData={editData}
              value={data?.role ?? "-"}
              bold={false}
            />
          </div>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Industry"}
              value={"Media"}
              bold={false}
            />
            <InformationColumn
              label={"Location"}
              value={"Indonesia"}
              bold={false}
            />
          </div>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Start Date"}
              value={"12 Maret 2020"}
              bold={false}
            />
            <InformationColumn
              label={"End Date"}
              value={"20 Mei 2024"}
              bold={false}
            />
          </div>
          <InformationColumn
            label={"Achievements"}
            full={true}
            value={data?.achievements ?? "-"}
            bold={false}
          />
          <InformationColumn
            label={"Technologies"}
            full={true}
            value={data?.technologies ?? "-"}
            bold={false}
          />
        </div>
      )}
    </div>
  );
};

export default ExperienceInfoBlock;
