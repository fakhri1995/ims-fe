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
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  RESUME_EXPERIENCE_DELETE,
  RESUME_EXPERIENCE_UPDATE,
} from "lib/features";

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
  all_data,
  setExperienceData,
  initProps,
}) => {
  const [showMore, setShowMore] = useState(true);
  const [experienceForm] = Form.useForm();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: null,
    name: null,
  });
  const [modalConfirm, setModalConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { hasPermission } = useAccessControl();
  const isAllowedToUpdateExperience = hasPermission(RESUME_EXPERIENCE_UPDATE);
  const isAllowedToDeleteExperience = hasPermission(RESUME_EXPERIENCE_DELETE);

  useEffect(() => {
    if (showMore && editData.id != null) {
      experienceForm.setFieldsValue({
        company: editData.company,
        start_date:
          editData.start_date != "0000-00-00"
            ? moment(editData.start_date)
            : null,
        end_date:
          editData.end_date != "0000-00-00" ? moment(editData.end_date) : null,
        achievements: editData.achievement,
        technologies: editData.technologies,
        description: editData.description,
        position: editData.position,
        industry: editData.industry,
        location: editData.location,
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
      role: values.position,
      company: values.company,
      start_date: moment(values.start_date).format("YYYY-MM-DD"),
      end_date: moment(values.end_date).format("YYYY-MM-DD"),
      achievements: values.achievements,
      technologies: values.technologies,
      description: values.description,
      industry: values.industry,
      location: values.location,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateResumeExperience`, {
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
          experienceForm.resetFields();

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
    (dataTemp[index].company = data_server.company),
      (dataTemp[index].start_date = data_server.start_date),
      (dataTemp[index].end_date = data_server.end_date),
      (dataTemp[index].role = data_server.role),
      (dataTemp[index].resume_id = data_server.resume_id),
      (dataTemp[index].display_order = data_server.display_order);
    dataTemp[index].achievements = data_server.achievements;
    dataTemp[index].description = data_server.description;
    dataTemp[index].technologies = data_server.technologies;
    dataTemp[index].industry = data_server.industry;
    dataTemp[index].location = data_server.location;
    setExperienceData(dataTemp);
    setEditData({
      ...editData,
      id: null,
    });
  };

  const changeData = (data) => {
    setEditData({
      ...editData,
      id: data.id,
      company: data.company,
      position: data.role,
      industry: data.industry,
      location: data.location,
      start_date: data.start_date,
      end_date: data.end_date,
      achievement: data.achievements,
      technologies: data.technologies,
      description: data.description,
    });
    experienceForm.setFieldsValue({
      company: data.company,
      start_date:
        data.start_date != "0000-00-00" ? moment(data.start_date) : null,
      end_date: data.end_date != "0000-00-00" ? moment(data.end_date) : null,
      achievements: data.achievements,
      technologies: data.technologies,
      description: data.description,
      position: data.role,
      industry: data.industry,
      location: data.location,
    });
  };
  const deleteData = (data) => {
    setDataDelete({
      ...dataDelete,
      id: data.id,
      name: data.company,
    });
    setModalConfirm(true);
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    const payload = {
      id: Number(dataDelete?.id),
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteResumeExperience`, {
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
          setExperienceData(updatedData);
          notification.success({
            message: `Berhasil menghapus experience ${dataDelete.name}.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menghapus experience ${dataDelete.name}.. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingDelete(false);
        setModalConfirm(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus experience. ${err.response}`,
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
          <Form layout="vertical" form={experienceForm} onFinish={onFinish}>
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
                  <Input
                    onChange={(e) => onChangeData("company", e)}
                    placeholder="Input Company"
                  />
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
                  <Input
                    onChange={(e) => onChangeData("position", e)}
                    placeholder="Input Position"
                  />
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
                  <Input
                    onChange={(e) => onChangeData("industry", e)}
                    placeholder="Input Industry"
                  />
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
                  <Input
                    onChange={(e) => onChangeData("location", e)}
                    placeholder="Input Location"
                  />
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
                    onChange={(date) => {
                      let input = date ? date.format("YYYY-MM-DD") : null;
                      setEditData({
                        ...editData,
                        start_date: input,
                      });
                    }}
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
                    onChange={(date) => {
                      let input = date ? date.format("YYYY-MM-DD") : null;
                      setEditData({
                        ...editData,
                        end_date: input,
                      });
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={"flex gap-2"}>
              <Form.Item
                label="Responsibility"
                name={"description"}
                className="col-span-2 w-full"
                rules={[
                  {
                    required: true,
                    message: "Responsibility is required",
                  },
                ]}
              >
                <TextArea
                  onChange={(e) => onChangeData("description", e)}
                  rows={5}
                  placeholder="Input Responsibility"
                />
              </Form.Item>
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
                <TextArea
                  onChange={(e) => onChangeData("achievement", e)}
                  rows={5}
                  placeholder="Input Achievements"
                />
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
                <Input
                  onChange={(e) => onChangeData("technologies", e)}
                  placeholder="Input Technologies"
                />
              </Form.Item>
            </div>
            <div className={"flex justify-end"}>
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
              label={"Company"}
              value={data?.company ?? "-"}
              bold={false}
            />
            <InformationColumnWithAction
              label={"position"}
              id={data?.id}
              setEditData={setEditData}
              editData={editData}
              value={data?.role?.trim() || "-"}
              bold={false}
              changeData={() => changeData(data)}
              deleteData={() => deleteData(data)}
              permissionDelete={isAllowedToDeleteExperience}
              permissionEdit={isAllowedToUpdateExperience}
            />
          </div>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Industry"}
              value={data?.industry ?? "-"}
              bold={false}
            />
            <InformationColumn
              label={"Location"}
              value={data?.location ?? "-"}
              bold={false}
            />
          </div>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Start Date"}
              value={
                data?.start_date && data?.start_date != "0000-00-00"
                  ? moment(data?.start_date).format("DD MMMM YYYY")
                  : "-"
              }
              bold={false}
            />
            <InformationColumn
              label={"End Date"}
              value={
                data?.end_date && data?.end_date != "0000-00-00"
                  ? moment(data?.end_date).format("DD MMMM YYYY")
                  : "-"
              }
              bold={false}
            />
          </div>
          <InformationColumn
            label={"Responsibility"}
            full={true}
            value={data?.description?.trim() || "-"}
            bold={false}
          />
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
          <Modal
            title={
              <h1 className="font-semibold">
                Apakah anda yakin ingin hapus data experience dengan nama
                company "<span className={"font-bold"}>{dataDelete?.name}</span>
                "?
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

export default ExperienceInfoBlock;
