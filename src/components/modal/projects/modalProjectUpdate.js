import {
  Button,
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

import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../button";
import { EditIconSvg, EditSquareIconSvg } from "../../icon";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalProjectUpdate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddProject,
  setRefresh,
}) => {
  const [form] = Form.useForm();

  // 1. USE STATE
  // const [dataProject, setDataProject] = useState({
  //   name: "",
  //   start_date: "",
  //   end_date: "",
  //   project_staffs: [],
  //   description: "",
  // });

  const [dataProject, setDataProject] = useState({
    id: 1,
    name: "Fikri Ilmi",
    proposed_bys: [
      [
        {
          id: 1,
          name: "Lesti",
          profile_image: {
            id: 0,
            link: "staging\\/Users\\/default_user.png",
            description: "profile_image",
          },
        },
      ],
    ],
    start_date: "2022-01-01",
    end_date: "2022-02-02",
    description: "",
    project_staffs: [
      {
        id: 1,
        name: "Yasmin",
        profile_image: {
          id: 0,
          link: "staging\\/Users\\/default_user.png",
          description: "profile_image",
        },
      },
    ],
    status_id: 1,
    created_by: 1,
    created_at: "2022-01-01 11:50:20",
    updated_at: "2022-01-01 11:50:20",
    deleted_at: null,
    status: {
      id: 1,
      name: "On-Going",
      color: "#ABC123",
      display_order: 1,
    },
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

  const handleUpdateProject = () => {
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
        <div className="flex space-x-2 items-center ">
          <EditSquareIconSvg color={"#4D4D4D"} size={24} />
          <p className="mig-heading--4">{dataProject.name}</p>
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
              onClick={handleUpdateProject}
              disabled={!isAllowedToAddProject || !dataProject.name}
            >
              <p>Simpan</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <Form
        layout="vertical"
        form={form}
        className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6"
      >
        <div className="mb-4 md:mb-6">
          <p className="mb-2">Diajukan oleh</p>
          <button
            type="button"
            className="py-2 mig-caption--bold text-secondary100 bg-transparent hover:opacity-75"
          >
            Tambahkan Pengaju
          </button>
        </div>
        <div className="mb-4 md:mb-6">
          <p className="mb-2">Status</p>
          <div className="flex space-x-2 items-center">
            <p className="bg-mono90 py-2 px-4 rounded-md">-</p>

            <button
              type="button"
              className="mig-caption--bold text-secondary100 bg-transparent hover:opacity-75"
            >
              Ubah Status
            </button>
          </div>
        </div>
        <div>
          <Form.Item label="Tanggal Mulai" name={"start_date"}>
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
        </div>
        <div>
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
        </div>
        <div className="md:col-span-2 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row ">
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
          <div className="flex space-x-2">
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
        </div>

        <div>
          <Form.Item
            label="Deskripsi Proyek"
            name={"description"}
            className="md:col-span-2"
          >
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
      </Form>
    </Modal>
  );
};

export default ModalProjectUpdate;
