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
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { GROUPS_GET, USERS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { generateStaticAssetUrl } from "../../../lib/helper";
import ButtonSys from "../../button";
import { PlusIconSvg } from "../../icon";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalServiceCreate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToUpdateProject,
  isAllowedToDeleteProject,
  currentProject,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetUsers = hasPermission(USERS_GET);
  const isAllowedToGetGroups = hasPermission(GROUPS_GET);
  const [form] = Form.useForm();
  const rt = useRouter();
  const searchTimeoutRef = useRef(null);

  // 1. USE STATE
  const [dataServiceList, setDataServiceList] = useState([dataService]);
  const [dataService, setDataService] = useState({
    type: "",
    pax: 0,
    price: "",
    duration: 0,
  });

  const [loading, setLoading] = useState(false);
  const [isSwitchGroup, setIsSwitchGroup] = useState(false);

  const [dataStaffsOrGroups, setDataStaffsOrGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  // 2 USE EFFECT
  // 2.1. Get users or groups for task staff options
  useEffect(() => {
    if (!visible) {
      return;
    }

    if (isSwitchGroup) {
      if (!isAllowedToGetGroups) {
        permissionWarningNotification("Mendapatkan", "Daftar Group");
        return;
      }
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterGroupsWithUsers`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setDataStaffsOrGroups(res2.data);
        })
        .catch((err) =>
          notification.error({
            message: "Gagal mendapatkan daftar grup",
            duration: 3,
          })
        );
    } else {
      if (!isAllowedToGetUsers) {
        permissionWarningNotification("Mendapatkan", "Daftar User");
        return;
      }

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterUsers`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setDataStaffsOrGroups(res2.data);
        })
        .catch((err) =>
          notification.error({
            message: "Gagal mendapatkan daftar user",
            duration: 3,
          })
        );
    }
  }, [isAllowedToGetGroups, isAllowedToGetUsers, isSwitchGroup, visible]);

  // 3. HANDLER
  const clearData = () => {
    setDataServiceList([dataService]);
    form.resetFields();
  };

  const handleClose = () => {
    onvisible(false);
    clearData();
  };

  const onSearchUsers = (searchKey, setData) => {
    if (!isAllowedToGetUsers) {
      permissionWarningNotification("Mendapatkan", "Daftar User");
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setLoading(true);
    searchTimeoutRef.current = setTimeout(() => {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterUsers?type=1&name=${searchKey}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setData(res2.data);
        })
        .catch((err) =>
          notification.error({
            message: "Gagal mendapatkan daftar user",
            duration: 3,
          })
        )
        .finally(() => setLoading(false));
    }, 500);
  };

  const handleUpdateProject = () => {
    if (!isAllowedToUpdateProject) {
      permissionWarningNotification("Mengubah", "Proyek");
      return;
    }

    const payload = {
      ...dataService,
      id: currentProject?.id,
      proposed_bys: currentProject?.proposed_bys?.map((staff) =>
        Number(staff.id)
      ),
      project_staffs: dataService?.project_staffs?.map((staff) =>
        Number(staff.key)
      ),
    };

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProject`, {
      method: `PUT`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
          notification.success({
            message: response.message,
            duration: 3,
          });
          rt.push(`projects/${currentProject?.id}`);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah proyek. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteProject = () => {
    if (!isAllowedToDeleteProject) {
      permissionWarningNotification("Menghapus", "Proyek");
      return;
    }

    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteProject?id=${currentProject?.id}`,
      {
        method: `DELETE`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
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
          message: `Gagal menghapus proyek. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      title={"Tambah Service"}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      width={700}
      footer={
        <Spin spinning={loading}>
          <div className="flex space-x-2 justify-end items-center">
            <button
              onClick={handleClose}
              className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
            >
              Batal
            </button>
            <ButtonSys
              type={"primary"}
              onClick={handleUpdateProject}
              disabled={!isAllowedToUpdateProject || !dataService.name}
            >
              <p>Tambah & Simpan</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      {dataServiceList.map((service, idx) => (
        <div key={idx}>
          <Form layout="vertical" form={form}>
            <div className="grid grid-cols-2 gap-x-6">
              <Form.Item
                label="Jenis Service"
                name={"type"}
                rules={[
                  {
                    required: true,
                    message: "Jenis service wajib diisi",
                  },
                ]}
              >
                <div className="w-full mb-2">
                  <Select
                    showSearch
                    value={1}
                    // disabled={!isAllowedToGetServices}
                    placeholder={"Pilih jenis service"}
                    style={{ width: `100%` }}
                    // onSearch={(value) =>
                    //   !isSwitchGroup &&
                    //   onSearchUsers(value, setDataStaffsOrGroups)
                    // }
                    // onChange={(value, option) => {

                    // }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.children ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {dataStaffsOrGroups.map((item) => {
                      return (
                        <Select.Option
                          key={item?.id}
                          value={item.id}
                          position={item?.position}
                          users={item?.users}
                          name={item?.name}
                          profile_image={item?.profile_image}
                        >
                          {item?.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              </Form.Item>
              <Form.Item
                label="Pax"
                name={"quantity"}
                rules={[
                  {
                    required: true,
                    message: "Jumlah service wajib diisi",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Pilih jumlah service"
                  min={1}
                />
              </Form.Item>

              <div className="flex items-center justify-between space-x-2">
                <Form.Item
                  label="Harga"
                  name={"price"}
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Harga produk wajib diisi",
                    },
                  ]}
                >
                  <>
                    <Input
                      addonBefore="Rp."
                      placeholder="Isi harga produk"
                      type="number"
                    />
                  </>
                </Form.Item>

                <div className="mt-1.5">
                  <Select defaultValue={3}>
                    <Select.Option key={1} value={1}>
                      per Jam
                    </Select.Option>
                    <Select.Option key={2} value={2}>
                      per Hari
                    </Select.Option>
                    <Select.Option key={3} value={3}>
                      per Bulan
                    </Select.Option>
                    <Select.Option key={4} value={4}>
                      per Tahun
                    </Select.Option>
                  </Select>
                </div>
              </div>

              <button
                onClick={() => {
                  const newService = { ...dataService };
                  setDataServiceList((prev) => [...prev, newService]);
                }}
                type="button"
                className="border border-dashed border-mono90 
                rounded-md bg-transparent h-10 mt-6"
              >
                <div className="flex items-center space-x-2 justify-center">
                  <PlusIconSvg color={"#808080"} size={16} />
                  <p className="text-mono50">Tambah Produk</p>
                </div>
              </button>
            </div>
          </Form>

          {dataServiceList.length > 1 && <hr className="text-mono90 mb-6" />}
        </div>
      ))}
    </Modal>
  );
};

export default ModalServiceCreate;
