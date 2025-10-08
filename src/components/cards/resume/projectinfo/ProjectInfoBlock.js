import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  notification,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_EDUCATION_DELETE, RESUME_EDUCATION_UPDATE } from "lib/features";

import InformationColumn from "../InformationColumn";
import InformationColumnWithAction from "../InformationColumnWithAction";

// Currently use for Training, Certifications, and Achievements section in resume
const ProjectInfoBlock = ({
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
  const [showMore, setShowMore] = useState(true);
  const [projectForm] = Form.useForm();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: null,
    name: null,
  });
  const { hasPermission } = useAccessControl();
  const isAllowedToUpdateEducation = hasPermission(RESUME_EDUCATION_UPDATE);
  const isAllowedToDeleteEducation = hasPermission(RESUME_EDUCATION_DELETE);

  useEffect(() => {
    if (showMore && editData.id != null) {
      projectForm.setFieldsValue({
        school: editData.school,
        start_date:
          editData.start_date != "0000-00-00"
            ? moment(editData.start_date)
            : null,
        end_date:
          editData.end_date != "0000-00-00" ? moment(editData.end_date) : null,
        degree: editData.degree,
        gpa: editData.gpa,
        field: editData.field,
        location: editData.location,
        honors: editData.honors,
        coursework: editData.relevant_coursework,
      });
    }
  }, [showMore]);

  const onChangeData = (field, value) => {
    setEditData({
      ...editData,
      [field]: value.target.value,
    });
  };

  const onFinish = (values) => {
    let dataSend = {
      id: data.id,
      name: values.name,
      year: moment(values.year),
      description: values.description,
      technologies_skills: values.technologies_skills,
      client: values.client,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateResumeProject`, {
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
          projectForm.resetFields();

          let data_server = response.data;
          updateDataFromServer(data_server);
          notification.success({
            message: "Data Berhasil Diperbarui",
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
    let dataTemp = all_data;
    dataTemp[index].id = data_server.id;
    (dataTemp[index].name = data_server.name),
      (dataTemp[index].technologies_skills = data_server.technologies_skills),
      (dataTemp[index].year = data_server.year),
      (dataTemp[index].description = data_server.description),
      (dataTemp[index].client = data_server.client),
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
      name: data.name,
      year: data.year ? moment(data?.year) : null,
      technologies_skills: data.technologies_skills,
      client: data.client,
      description: data.description,
    });
    projectForm.setFieldsValue({
      name: data.name,
      year: data.year ? moment(data?.year) : null,
      technologies_skills: data.technologies_skills,
      client: data.client,
      description: data.description,
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteResumeProject`, {
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
            message: `Berhasil menghapus education ${dataDelete.name}.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menghapus education ${dataDelete.name}.. ${response2.message}`,
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
          <Form layout="vertical" form={projectForm} onFinish={onFinish}>
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
                  <Input
                    onChange={(e) => onChangeData("name", e)}
                    placeholder="Input Project Name"
                  />
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
                  <Input
                    onChange={(e) => onChangeData("technologies_skills", e)}
                    placeholder="Input Technologies/Skills"
                  />
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
                    placeholder="Start Date"
                    className="w-full"
                    onChange={(date) => {
                      let input = date ? date.format("YYYY-MM-DD") : null;
                      setEditData({
                        ...editData,
                        year: input,
                      });
                    }}
                  />
                </Form.Item>
              </div>
              <div className={"flex flex-col gap-2 w-1/2"}>
                <Form.Item
                  label="Client"
                  name={"client"}
                  className="col-span-2"
                  // rules={[
                  //     {
                  //         required: true,
                  //         message: "Technologies/Skills is required",
                  //     },
                  // ]}
                >
                  <Input
                    onChange={(e) => onChangeData("client", e)}
                    placeholder="Input Technologies/Skills"
                  />
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
                  <TextArea
                    onChange={(e) => onChangeData("description", e)}
                    rows={5}
                    placeholder="Input Description"
                  />
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
              label={"Project Name"}
              value={data?.name}
              bold={false}
            />
            <InformationColumnWithAction
              label={"Technologies/Skills"}
              id={data?.id}
              setEditData={setEditData}
              editData={editData}
              value={data?.technologies_skills}
              bold={false}
              changeData={() => changeData(data)}
              deleteData={() => deleteData(data)}
              permissionDelete={isAllowedToDeleteEducation}
              permissionEdit={isAllowedToUpdateEducation}
            />
          </div>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Year"}
              value={data?.year ? moment(data?.year).format("YYYY") : "-"}
              bold={false}
            />
            <InformationColumn
              label={"Client"}
              value={data?.client ? data?.client : "-"}
              bold={false}
            />
          </div>
          <InformationColumn
            label={"Description"}
            full={true}
            value={data?.description}
            bold={false}
          />
          <Modal
            title={
              <h1 className="font-semibold">
                Apakah anda yakin ingin hapus data project dengan nama "
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

export default ProjectInfoBlock;
