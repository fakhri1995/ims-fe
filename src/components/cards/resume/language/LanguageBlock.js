import { Button, Form, Input, Modal, Select, Space, notification } from "antd";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_LANGUAGE_DELETE, RESUME_LANGUAGE_UPDATE } from "lib/features";

import InformationColumn from "../InformationColumn";
import InformationColumnWithAction from "../InformationColumnWithAction";

// Currently use for Training, Certifications, and Achievements section in resume
const LanguageBlock = ({
  data,
  jumlah_data,
  index,
  editData,
  setEditData,
  cancelData,
  initProps,
  all_data,
  setEducationData,
}) => {
  const [instanceForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: null,
    name: null,
  });
  const levels = ["basic", "intermediate", "fluent", "native"];
  const { hasPermission } = useAccessControl();
  const isAllowedToUpdateLanguage = hasPermission(RESUME_LANGUAGE_UPDATE);
  const isAllowedToDeleteLanguage = hasPermission(RESUME_LANGUAGE_UPDATE);

  const onFinish = (values) => {
    let dataSend = {
      id: data.id,
      language: values.language,
      proficiency: values.proficiency,
      certifications: values.certification,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateResumeLanguage`, {
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
          message: `Gagal update Experience. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  const updateDataFromServer = (data_server) => {
    let dataTemp = all_data;
    dataTemp[index].id = data_server.id;
    (dataTemp[index].language = data_server.language),
      (dataTemp[index].certifications = data_server.certifications),
      (dataTemp[index].proficiency = data_server.proficiency),
      (dataTemp[index].resume_id = data_server.resume_id),
      (dataTemp[index].display_order = data_server.display_order);
    setEducationData(dataTemp);
    setEditData({
      ...editData,
      id: null,
    });
  };

  const changeData = (data) => {
    setEditData({
      ...editData,
      id: data.id,
      language: data.language,
      certifications: data.certifications,
      proficiency: data.proficiency,
    });
    instanceForm.setFieldsValue({
      language: data.language,
      certification: data.certifications,
      proficiency: data.proficiency,
    });
  };

  const deleteData = (data) => {
    setDataDelete({
      ...dataDelete,
      id: data.id,
      name: data.language,
    });
    setModalConfirm(true);
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    const payload = {
      id: Number(dataDelete?.id),
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteResumeLanguage`, {
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
          setEducationData(updatedData);
          notification.success({
            message: `Berhasil menghapus language ${dataDelete.name}.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menghapus language ${dataDelete.name}.. ${response2.message}`,
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
          <Form layout="vertical" form={instanceForm} onFinish={onFinish}>
            <div className={"flex gap-2"}>
              <div className={"flex flex-col gap-2 w-1/2"}>
                <Form.Item
                  label="Language"
                  name={"language"}
                  className="col-span-2"
                  rules={[
                    {
                      required: true,
                      message: "Language is required",
                    },
                  ]}
                >
                  <Input
                    // defaultValue={dataEdit?.name}
                    placeholder="Input Language"
                  />
                </Form.Item>
              </div>
              <div className={"flex flex-col gap-2 w-1/2"}>
                <Form.Item
                  label="Proficiency"
                  name={"proficiency"}
                  className="col-span-2"
                  rules={[
                    {
                      required: true,
                      message: "Proficiency is required",
                    },
                  ]}
                >
                  <Select placeholder="Select Proficiency" className={"w-1/2"}>
                    {levels.map((level) => (
                      <Option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className={"flex gap-2"}>
              <div className={"flex flex-col gap-2 w-full"}>
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
                  <Input placeholder="Input Certification" />
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
              label={"Language"}
              value={data?.language || "-"}
              bold={false}
            />
            <InformationColumnWithAction
              label={"Profiency"}
              id={data?.id}
              setEditData={setEditData}
              editData={editData}
              value={data?.proficiency || "-"}
              bold={false}
              changeData={() => changeData(data)}
              deleteData={() => deleteData(data)}
              permissionDelete={isAllowedToDeleteLanguage}
              permissionEdit={isAllowedToUpdateLanguage}
            />
          </div>
          <InformationColumn
            label={"Certifications"}
            full={true}
            value={data?.certifications || "-"}
            bold={false}
          />
          <Modal
            title={
              <h1 className="font-semibold">
                Apakah anda yakin ingin hapus data language dengan nama "
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

export default LanguageBlock;
