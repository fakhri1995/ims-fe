import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  notification,
} from "antd";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_TOOL_DELETE, RESUME_TOOL_UPDATE } from "lib/features";

import InformationColumn from "../InformationColumn";
import InformationColumnWithAction from "../InformationColumnWithAction";

// Currently use for Training, Certifications, and Achievements section in resume
const ToolsBlock = ({
  data,
  jumlah_data,
  index,
  editData,
  setEditData,
  cancelData,
  initProps,
  all_data,
  setToolData,
}) => {
  const [toolForm] = Form.useForm();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: null,
    name: null,
  });
  const { hasPermission } = useAccessControl();
  const isAllowedToUpdateTool = hasPermission(RESUME_TOOL_UPDATE);
  const isAllowedToDeleteTool = hasPermission(RESUME_TOOL_DELETE);

  const onFinish = (values) => {
    let dataSend = {
      id: data.id,
      name: values.name,
      category: values.category,
      proficiency: values.proficiency,
      details: values.details,
      certifications: values.certification,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateResumeTool`, {
      method: `PUT`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          toolForm.resetFields();

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
          message: `Gagal update Experience. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  const updateDataFromServer = (data_server) => {
    let dataTemp = all_data;
    dataTemp[index].id = data_server.id;
    (dataTemp[index].name = data_server.name),
      (dataTemp[index].category = data_server.category),
      (dataTemp[index].proficiency = data_server.proficiency),
      (dataTemp[index].details = data_server.details),
      (dataTemp[index].certifications = data_server.certifications),
      (dataTemp[index].resume_id = data_server.resume_id),
      (dataTemp[index].display_order = data_server.display_order);
    setToolData(dataTemp);
    setEditData({
      ...editData,
      id: null,
    });
  };

  const changeData = (data) => {
    setEditData({
      ...editData,
      id: data.id,
      proficiency: data.proficiency,
      name: data.name,
      category: data.category,
      certifications: data.certifications,
    });
    toolForm.setFieldsValue({
      proficiency: data.proficiency,
      name: data.name,
      category: data.category,
      certifications: data.certifications,
    });
  };

  const deleteData = (data) => {
    setDataDelete({
      ...dataDelete,
      id: data.id,
      name: data.name,
    });
    setModalConfirm(true);
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    const payload = {
      id: Number(dataDelete?.id),
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteResumeTool`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          const updatedData = all_data.filter(
            (item) => item.id !== dataDelete?.id
          );
          setToolData(updatedData);
          notification.success({
            message: `Berhasil menghapus data tools ${dataDelete.name}.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menghapus data tools ${dataDelete.name}.. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingDelete(false);
        setModalConfirm(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus education. ${err.response}`,
          duration: 3,
        });
        setLoadingDelete(false);
      });
  };

  return (
    <div
      className={`flex flex-col gap-2 mt-4 ${
        index != jumlah_data - 1 && "border-b-1.5"
      } pb-2`}
    >
      {data.id == editData.id ? (
        <div className={"flex flex-col gap-2 mt-4"}>
          <Form layout="vertical" form={toolForm} onFinish={onFinish}>
            <div className={"flex gap-2"}>
              <div className={"flex flex-col gap-2 w-1/2"}>
                <Form.Item
                  label="Tool Name"
                  name={"name"}
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
                <Button onClick={() => cancelData()}>Cancel</Button>
                <Button loading={loading} htmlType="submit" type="primary">
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
              label={"Tool Name"}
              value={data?.name ?? "-"}
              bold={false}
            />
            <InformationColumnWithAction
              label={"Category"}
              id={data?.id}
              setEditData={setEditData}
              editData={editData}
              value={data?.category || "-"}
              bold={false}
              changeData={() => changeData(data)}
              deleteData={() => deleteData(data)}
              permissionDelete={isAllowedToDeleteTool}
              permissionEdit={isAllowedToUpdateTool}
            />
          </div>
          <InformationColumn
            label={"Proficiency"}
            full={true}
            value={data?.proficiency || "-"}
            bold={false}
          />
          <InformationColumn
            label={"Details"}
            full={true}
            value={data?.details || "-"}
            bold={false}
          />
          <InformationColumn
            label={"Certifications"}
            full={true}
            value={data?.certifications || "-"}
            bold={false}
          />
          <Modal
            title={
              <h1 className="font-semibold mr-2">
                Apakah anda yakin ingin hapus data tools dengan nama "
                <span className={"font-bold"}>{dataDelete?.name}</span>"?
              </h1>
            }
            visible={modalConfirm}
            onCancel={() => {
              setModalConfirm(false);
            }}
            okText="Ya"
            cancelText="Tidak"
            onOk={handleDelete}
            okButtonProps={{ loading: loadingDelete }}
          ></Modal>
        </div>
      )}
    </div>
  );
};

export default ToolsBlock;
