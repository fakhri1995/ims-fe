import { Button, Form, Input, Space, notification } from "antd";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_TOOL_ADD } from "lib/features";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import ButtonSys from "../../../button";
import ToolsBlock from "./ToolsBlock";

// Currently use for Training, Certifications, and Achievements section in resume
const ToolsCard = ({
  data,
  setToolData,
  resumeId,
  formAdd,
  setFormAdd,
  initProps,
}) => {
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const [dataEdit, setDataEdit] = useState({
    id: null,
    proficiency: null,
    name: null,
    certifications: null,
    category: null,
  });
  const [instanceForm] = Form.useForm();
  const { hasPermission } = useAccessControl();
  const isAllowedToAddTool = hasPermission(RESUME_TOOL_ADD);

  const onFinish = (values) => {
    let dataSend = {
      resume_id: resumeId,
      name: values.toolname,
      category: values.category,
      proficiency: values.proficiency,
      details: values.details,
      certifications: values.certification,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResumeTool`, {
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
            message: "Tambah Data Tool Gagal",
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal update Data Tool. ${err.response}`,
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
      display_order: data_server.display_order,
      category: data_server.category,
      proficiency: data_server.proficiency,
      details: data_server.details,
      certifications: data_server.certifications,
    };
    dataTemp.push(datasave);
    setToolData(dataTemp);
    setFormAdd({
      ...formAdd,
      tools: false,
    });
  };

  const resetValue = () => {
    setDataEdit({
      ...dataEdit,
      id: null,
      proficiency: null,
      name: null,
      category: null,
      certifications: null,
    });
    instanceForm.resetFields();
  };

  const cancelData = () => {
    resetValue();
    setFormAdd({
      ...formAdd,
      tools: false,
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
            Tools (6/7)
          </p>
          {showMore ? (
            <MdChevronDown className="w-[14px] h-[14px]" />
          ) : (
            <MdChevronUp className="w-[14px] h-[14px] font-bold" />
          )}
        </div>
      </div>
      {showMore && (
        <div>
          <div className={"mb-4"}>
            {data.length > 0 &&
              data.map((item, index) => (
                <ToolsBlock
                  cancelData={cancelData}
                  editData={dataEdit}
                  setEditData={setDataEdit}
                  jumlah_data={data.length}
                  data={item}
                  initProps={initProps}
                  index={index}
                  all_data={data}
                  setToolData={setToolData}
                  setFormAdd={setFormAdd}
                  formAdd={formAdd}
                />
              ))}
          </div>
          {formAdd.tools ? (
            <div className={"flex flex-col gap-2 mt-4"}>
              <Form layout="vertical" form={instanceForm} onFinish={onFinish}>
                <div className={"flex gap-2"}>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Tool Name"
                      name={"toolname"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Tool Name is required",
                        },
                      ]}
                    >
                      <Input placeholder="Input Tool Name" />
                    </Form.Item>
                  </div>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Category"
                      name={"category"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Category is required",
                        },
                      ]}
                    >
                      <Input placeholder="Input Category" />
                    </Form.Item>
                  </div>
                </div>
                <div className={"flex gap-2"}>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Profiency"
                      name={"proficiency"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Proficiency is required",
                        },
                      ]}
                    >
                      <Input placeholder="Input Proficiency" />
                    </Form.Item>
                  </div>
                  <div className={"flex flex-col gap-2 w-1/2"}>
                    <Form.Item
                      label="Details"
                      name={"details"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Details is required",
                        },
                      ]}
                    >
                      <Input placeholder="Input Details" />
                    </Form.Item>
                  </div>
                </div>
                <div className={"flex gap-2"}>
                  <div className={"w-full"}>
                    <Form.Item
                      label="Certification"
                      name={"certification"}
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Certification is required",
                        },
                      ]}
                    >
                      <TextArea rows={5} placeholder="Input Certification" />
                    </Form.Item>
                  </div>
                </div>
                <div className={"flex justify-end mt-5"}>
                  <Space>
                    <Button
                      onClick={() =>
                        setFormAdd({
                          ...formAdd,
                          tools: false,
                        })
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={!isAllowedToAddTool}
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
              disabled={!isAllowedToAddTool}
              size={"small"}
              type={"dashed"}
              onClick={() => {
                resetValue();
                setFormAdd({
                  ...formAdd,
                  tools: true,
                });
              }}
            >
              <p className="text-primary100 font-bold hover:text-primary75">
                + Add Another Tools
              </p>
            </ButtonSys>
          )}
        </div>
      )}
    </div>
  );
};

export default ToolsCard;
