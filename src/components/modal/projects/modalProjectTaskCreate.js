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
import { InfoCircleIconSvg } from "../../icon";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalProjectTaskCreate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddTask,
  isAllowedToGetProjects,
  setRefresh,
}) => {
  const axiosClient = useAxiosClient();
  const [form] = Form.useForm();

  // 1. USE STATE
  const [dataTask, setDataTask] = useState({
    name: "",
    project_id: 0,
    start_date: "",
    end_date: "",
    task_staffs: [],
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDetailOn, setIsDetailOn] = useState(false);
  const [dataStaffsOrGroups, setDataStaffsOrGroups] = useState([]);
  const [dataProjects, setDataProjects] = useState([]);

  // 2. HANDLER
  const clearData = () => {
    setDataTask({
      name: "",
      start_date: "",
      end_date: "",
      project_staffs: [],
      description: "",
    });
    form.resetFields();
  };

  const handleAddTask = () => {
    if (!isAllowedToAddTask) {
      permissionWarningNotification("Menambah", "Task");
      return;
    }

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addProjectTask`, {
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTask),
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
          message: `Gagal menambahkan task baru. ${err.response}`,
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

  // console.log({ dataTask });
  return (
    <Modal
      title={
        <div className="flex flex-col space-y-2 ">
          <p>Tambah Task Baru</p>
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
              onClick={handleAddTask}
              disabled={!isAllowedToAddTask || !dataTask.name}
            >
              <p>Tambah Task</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Proyek" name={"project_id"}>
          <Select
            allowClear
            showSearch
            value={dataTask.project_id}
            disabled={!isAllowedToGetProjects}
            placeholder="Pilih Proyek"
            style={{ width: `100%` }}
            onChange={(value) => {
              setDataTask((prev) => ({
                ...prev,
                project_id: value,
              }));
            }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {dataProjects.map((item) => (
              <Select.Option key={item?.id} value={item?.id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className="text-notice flex space-x-2 items-center mb-6">
          <InfoCircleIconSvg color={"#DDB44A"} size={16} />
          <p className="text-xs">
            Kosongkan proyek jika task yang ditambah tidak terafiliasi dengan
            proyek manapun.
          </p>
        </div>
        <Form.Item
          label="Nama Task"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nama task wajib diisi",
            },
          ]}
        >
          <Input
            name={"name"}
            placeholder="Masukkan nama task"
            value={dataTask.name}
            onChange={(e) =>
              setDataTask((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </Form.Item>

        <div className="flex justify-between items-center mb-6">
          <p>Tampilkan field lainnya</p>
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
                  dataTask.start_date === ""
                    ? null
                    : moment(dataTask.start_date)
                }
                placeholder={"Pilih Tanggal Mulai"}
                style={{ width: `100%` }}
                onChange={(dates, datestrings) => {
                  setDataTask((prev) => ({
                    ...prev,
                    start_date: datestrings,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Tanggal Selesai" name={"end_date"}>
              <DatePicker
                allowClear
                allowEmpty
                showTime={{
                  format: "HH:mm",
                }}
                value={
                  dataTask.end_date === "" ? null : moment(dataTask.end_date)
                }
                placeholder={"Pilih Tanggal Selesai"}
                style={{ width: `100%` }}
                onChange={(dates, datestrings) => {
                  setDataTask((prev) => ({
                    ...prev,
                    end_date: datestrings,
                  }));
                }}
              />
            </Form.Item>
            <div className="flex flex-col md:flex-row">
              <Form.Item
                label="Staff Task"
                name={"task_staffs"}
                className="w-full"
              >
                <Select
                  allowClear
                  showSearch
                  mode="multiple"
                  value={dataTask.task_staffs}
                  // disabled={!isAllowedToGetProjects}
                  placeholder="Cari Nama Staff..."
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    setDataTask((prev) => ({
                      ...prev,
                      task_staffs: value,
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

            <Form.Item label="Deskripsi Task" name={"description"}>
              <ReactQuill
                theme="snow"
                value={dataTask.description}
                modules={modules}
                formats={formats}
                className="h-44 pb-10"
                onChange={(value) => {
                  setDataTask((prev) => ({
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

export default ModalProjectTaskCreate;
