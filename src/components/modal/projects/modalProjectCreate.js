import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Switch,
  Tag,
  notification,
} from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { useAxiosClient } from "hooks/use-axios-client";

import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../button";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalProjectCreate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddProject,
  setRefresh,
}) => {
  const axiosClient = useAxiosClient();
  const [form] = Form.useForm();

  // 1. USE STATE
  const [dataProject, setDataProject] = useState({
    name: "",
    start_date: "",
    end_date: "",
    project_staffs: [],
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDetailOn, setIsDetailOn] = useState(false);
  const [dataStaffsOrGroups, setDataStaffsOrGroups] = useState([]);
  // 2. HANDLER
  const clearData = () => {
    setDataProject({
      name: "",
      start_date: "",
      end_date: "",
      project_staffs: [],
      description: "",
    });
    form.resetFields();
  };

  const handleAddProject = () => {
    if (!isAllowedToAddProject) {
      permissionWarningNotification("Menambah", "Proyek");
      return;
    }

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addProject`, {
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataProject),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          onvisible(false);
          notification.success({
            message: response.message,
            duration: 3,
          });
          setRefresh((prev) => prev + 1);
          setTimeout(() => {
            clearData();
          }, 500);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan proyek baru. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  // Text Editor Config
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
    ],
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
  ];
  return (
    <Modal
      title={
        <div className="flex flex-col space-y-2 ">
          <p>Tambah Proyek Baru</p>
          <p className="text-warning text-[12px] italic">
            * Field ini harus diisi
          </p>
        </div>
      }
      visible={visible}
      onCancel={() => {
        clearData();
        onvisible(false);
      }}
      maskClosable={false}
      footer={
        <Spin spinning={loading}>
          <div className="flex space-x-2 justify-end items-center">
            <button
              onClick={() => onvisible(false)}
              className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
            >
              Batal
            </button>
            <ButtonSys
              type={"primary"}
              onClick={handleAddProject}
              disabled={!isAllowedToAddProject || !dataProject.name}
            >
              <p>Tambah Proyek</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Nama Proyek"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nama proyek wajib diisi",
            },
          ]}
        >
          <Input
            name={"name"}
            placeholder="Masukkan nama proyek"
            value={dataProject.name}
            onChange={(e) =>
              setDataProject((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </Form.Item>

        <div className="flex justify-between items-center mb-6">
          <p>Tambahkan Detail Proyek lainnya</p>
          <Switch
            checked={isDetailOn}
            onChange={(checked) => setIsDetailOn(checked)}
          ></Switch>
        </div>

        {isDetailOn && (
          <div>
            <Form.Item label="Tanggal Dimulai" name={"start_date"}>
              <DatePicker
                allowClear
                allowEmpty
                showTime={{
                  format: "HH:mm",
                }}
                value={
                  dataProject.start_date === ""
                    ? null
                    : moment(dataProject.start_date)
                }
                placeholder={"Pilih Tanggal Mulai"}
                style={{ width: `100%` }}
                onChange={(dates, datestrings) => {
                  setDataProject((prev) => ({
                    ...prev,
                    start_date: datestrings,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Ekspektasi Tanggal Selesai" name={"end_date"}>
              <DatePicker
                allowClear
                allowEmpty
                showTime={{
                  format: "HH:mm",
                }}
                value={
                  dataProject.end_date === ""
                    ? null
                    : moment(dataProject.end_date)
                }
                placeholder={"Pilih Tanggal Selesai"}
                style={{ width: `100%` }}
                onChange={(dates, datestrings) => {
                  setDataProject((prev) => ({
                    ...prev,
                    end_date: datestrings,
                  }));
                }}
              />
            </Form.Item>
            <div className="flex flex-col md:flex-row">
              <Form.Item
                label="Staff Proyek"
                name={"project_staffs"}
                className="w-full"
              >
                <Select
                  allowClear
                  showSearch
                  mode="multiple"
                  value={dataProject.project_staffs}
                  // disabled={!isAllowedToGetProjects}
                  placeholder="Cari Nama Staff..."
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    setDataProject((prev) => ({
                      ...prev,
                      project_staffs: value,
                    }));
                  }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {dataStaffsOrGroups.map((item) => (
                    <Select.Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <div className="flex space-x-2 items-center absolute right-6">
                <p>Staff</p>
                <Switch></Switch>
                <p>Group</p>
              </div>
            </div>
            <div className="flex space-x-2 mb-6">
              <Tag closable className="flex items-center space-x-2 p-2">
                <img
                  src="/image/staffTask.png"
                  className="w-7 h-7 rounded-full object-contain"
                />
                <p>
                  <strong>Fachry</strong> - Staff
                </p>
              </Tag>
            </div>

            <Form.Item label="Deskripsi Proyek" name={"description"}>
              <ReactQuill
                theme="snow"
                value={dataProject.description}
                modules={modules}
                formats={formats}
                className="h-44 pb-10"
                onChange={(value) => {
                  setDataProject((prev) => ({
                    ...prev,
                    description: value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default ModalProjectCreate;
