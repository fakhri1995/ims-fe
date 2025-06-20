import { Form, Input, Select, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../lib/helper";
import DrawerCore from "../drawerCore";

const DrawerRoleCreate = ({
  visible,
  onvisible,
  initProps,
  setRefresh,
  isAllowedToAddRole,
  dataRoleTypes,
  setLoadingCreate,
  loadingCreate,
}) => {
  /**
   * Dependencies
   */
  const [instanceForm] = Form.useForm();

  // USESTATE
  const [dataRole, setDataRole] = useState({
    id: null,
    role: "",
    alias: "",
    client: "",
    recruitment_role_type_id: null,
  });
  const [disabledCreate, setDisabledCreate] = useState(true);

  // USEEFFECT
  // Validate input field
  useEffect(() => {
    if (
      dataRole.role !== "" &&
      dataRole.client !== "" &&
      dataRole.recruitment_role_type_id !== null
    ) {
      setDisabledCreate(false);
    } else {
      setDisabledCreate(true);
    }
  }, [dataRole]);

  //HANDLER
  const onChangeInput = (e) => {
    setDataRole({
      ...dataRole,
      [e.target.name]: e.target.value,
    });
  };

  const clearData = () => {
    setDataRole({
      id: null,
      role: "",
      alias: "",
      recruitment_role_type_id: null,
    });
  };

  const handleCreateRole = () => {
    if (!isAllowedToAddRole) {
      permissionWarningNotification("Menambah", "Role Rekrutmen");
      return;
    }
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitmentRole`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRole),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Role berhasil ditambahkan.`,
            duration: 3,
          });
          setTimeout(() => {
            onvisible(false);
            clearData();
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan role. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingCreate(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan role. ${err.response}`,
          duration: 3,
        });
        setLoadingCreate(false);
      });
  };

  return (
    <DrawerCore
      title={"Tambah Role"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Simpan Role"}
      onClick={handleCreateRole}
      disabled={disabledCreate}
    >
      <Spin spinning={loadingCreate}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>
          <Form
            layout="vertical"
            form={instanceForm}
            className="grid grid-cols-2 gap-x-6"
          >
            <Form.Item
              label="Role"
              name={"role"}
              rules={[
                {
                  required: true,
                  message: "Nama role wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={dataRole.role}
                  name={"role"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>
            <Form.Item
              label="Client"
              name={"client"}
              rules={[
                {
                  required: true,
                  message: "Nama Client wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={dataRole.client}
                  name={"client"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>
            <Form.Item
              label="Alias"
              name={"alias"}
              rules={[
                {
                  required: true,
                  message: "Alias wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={dataRole.alias}
                  name={"alias"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Tipe Kontrak"
              name={"recruitment_role_type_id"}
              rules={[
                {
                  required: true,
                  message: "Tipe Kontrak wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Select
                  placeholder="Pilih Status Kontrak"
                  style={{ width: `100%` }}
                  value={dataRole.recruitment_role_type_id}
                  onChange={(value) => {
                    setDataRole({
                      ...dataRole,
                      recruitment_role_type_id: value,
                    });
                  }}
                >
                  {dataRoleTypes?.map((type) => (
                    <Select.Option key={type.id} value={type.id}>
                      {type.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerRoleCreate;
