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
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";
import InformationColumnWithAction from "../InformationColumnWithAction";

// Currently use for Training, Certifications, and Achievements section in resume
const EducationInfoBlock = ({
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
  const [educationForm] = Form.useForm();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: null,
    name: null,
  });

  useEffect(() => {
    if (showMore && editData.id != null) {
      educationForm.setFieldsValue({
        school: editData.school,
        start_date: editData.start_date ? moment(editData.start_date) : null,
        end_date: editData.end_date ? moment(editData.end_date) : null,
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateResumeEducation`, {
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
          educationForm.resetFields();

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
    let dataTemp = all_data;
    dataTemp[index].id = data_server.id;
    (dataTemp[index].university = data_server.university),
      (dataTemp[index].major = data_server.major),
      (dataTemp[index].degree = data_server.degree),
      (dataTemp[index].gpa = data_server.gpa),
      (dataTemp[index].start_date = data_server.start_date),
      (dataTemp[index].end_date = data_server.end_date),
      (dataTemp[index].resume_id = data_server.resume_id),
      (dataTemp[index].display_order = data_server.display_order);
    dataTemp[index].location = data_server.location;
    dataTemp[index].honors = data_server.honors;
    dataTemp[index].relevant_coursework = data_server.relevant_coursework;
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
      school: data.university,
      degree: data.degree,
      gpa: data.gpa,
      field: data.major,
      location: data.location,
      start_date: data.start_date,
      end_date: data.end_date,
      honors: data.honors,
      relevant_coursework: data.relevant_coursework,
    });
    educationForm.setFieldsValue({
      school: data.university,
      start_date: data.start_date ? moment(data.start_date) : null,
      end_date: data.end_date ? moment(data.end_date) : null,
      degree: data.degree,
      gpa: data.gpa,
      field: data.major,
      location: data.location,
      honors: data.honors,
      coursework: data.relevant_coursework,
    });
  };

  const deleteData = (data) => {
    setDataDelete({
      ...dataDelete,
      id: data.id,
      name: data.university,
    });
    setModalConfirm(true);
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    const payload = {
      id: Number(dataDelete?.id),
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteResumeEducation`, {
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
          <Form layout="vertical" form={educationForm} onFinish={onFinish}>
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
                  <Input
                    onChange={(e) => onChangeData("school", e)}
                    placeholder="Input School Name"
                  />
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
                  <Input
                    onChange={(e) => onChangeData("degree", e)}
                    placeholder="Input Degree"
                  />
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
                  <Input
                    onChange={(e) => onChangeData("field", e)}
                    placeholder="Input Field Name"
                  />
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
                  <Input
                    onChange={(e) => onChangeData("gpa", e)}
                    placeholder="Input GPA"
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
                  <TextArea
                    onChange={(e) => onChangeData("honors", e)}
                    rows={5}
                    placeholder="Input Honors"
                  />
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
                    onChange={(e) => onChangeData("relevant_coursework", e)}
                    rows={5}
                    placeholder="Input Relevant Coursework"
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
              label={"School"}
              value={data?.university}
              bold={false}
            />
            <InformationColumnWithAction
              label={"Degree"}
              id={data?.id}
              setEditData={setEditData}
              editData={editData}
              value={data?.degree}
              bold={false}
              changeData={() => changeData(data)}
              deleteData={() => deleteData(data)}
            />
          </div>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Field"}
              value={data?.major}
              bold={false}
            />
            <InformationColumn
              label={"GPA"}
              value={data?.gpa ? data?.gpa : "-"}
              bold={false}
            />
          </div>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Start Date"}
              value={
                data?.start_date
                  ? moment(data?.start_date).format("DD MMMM YYYY")
                  : "-"
              }
              bold={false}
            />
            <InformationColumn
              label={"End Date"}
              value={
                data?.end_date
                  ? moment(data?.end_date).format("DD MMMM YYYY")
                  : "-"
              }
              bold={false}
            />
          </div>
          <InformationColumn
            label={"Location"}
            full={true}
            value={data?.location}
            bold={false}
          />
          <InformationColumn
            label={"Honors"}
            full={true}
            value={data?.honors}
            bold={false}
          />
          <InformationColumn
            label={"Relevant Coursework"}
            full={true}
            value={data?.relevant_coursework}
            bold={false}
          />
          <Modal
            title={
              <h1 className="font-semibold">
                Apakah anda yakin ingin hapus data education dengan nama "
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

export default EducationInfoBlock;
