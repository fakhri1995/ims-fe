import { Form, Input, Select, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../lib/helper";
import { TrashIconSvg } from "../../icon";
import DrawerCore from "../drawerCore";

const DrawerRoleUpdate = ({
  id,
  visible,
  onvisible,
  initProps,
  trigger,
  setRefresh,
  isAllowedToGetRole,
  isAllowedToUpdateRole,
  dataRoleTypes,
  setLoadingUpdate,
  loadingUpdate,
  onClickDelete,
}) => {
  /**
   * Dependencies
   */

  const [instanceForm] = Form.useForm();

  // USESTATE
  const [dataRole, setDataRole] = useState({
    id: null,
    name: "",
    alias: "",
    recruitments_count: 0,
    recruitment_role_type_id: null,
  });
  const [loadingDataRole, setLoadingDataRole] = useState(false);
  const [disabledUpdate, setDisabledUpdate] = useState(true);

  // USEEFFECT
  // Validate input field
  useEffect(() => {
    if (dataRole.name !== "" && dataRole.recruitment_role_type_id !== null) {
      setDisabledUpdate(false);
    } else {
      setDisabledUpdate(true);
    }
  }, [dataRole]);

  // Get role data
  useEffect(() => {
    if (!isAllowedToGetRole) {
      setLoadingDataRole(false);
      permissionWarningNotification("Mendapatkan", "Data Role");
      return;
    }

    if (trigger !== -1) {
      setLoadingDataRole(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRole?id=${id.current}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setDataRole((prev) => ({
            ...prev,
            id: res2.data.id,
            name: res2.data.name,
            alias: res2.data.alias,
            recruitments_count: res2.data.recruitments_count,
            recruitment_role_type_id: res2.data.recruitment_role_type_id,
          }));
          setLoadingDataRole(false);
        });
    }
  }, [trigger, isAllowedToGetRole]);

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
      name: "",
      alias: "",
      recruitment_role_type_id: null,
    });
  };

  const handleUpdateRole = () => {
    if (!isAllowedToUpdateRole) {
      permissionWarningNotification("Mengubah", "Role Rekrutmen");
      return;
    }
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitmentRole`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRole),
    })
      .then((res) => res.json())
      .then((res2) => {
        setRefresh((prev) => prev + 1);
        if (res2.success) {
          setLoadingUpdate(false);
          onvisible(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          clearData();
        } else {
          setLoadingUpdate(false);
          notification["error"]({
            message: `Gagal mengubah role. ${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah role. ${err.message}`,
          duration: 3,
        });
      });
  };

  // console.log(dataCandidate);
  return (
    <DrawerCore
      title={"Ubah Role"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Simpan Role"}
      onClick={handleUpdateRole}
      disabled={disabledUpdate}
      buttonCancelText={
        <div className="flex flex-row space-x-2 items-center">
          <TrashIconSvg size={16} color={"#BF4A40"} />
          <p>Hapus Role</p>
        </div>
      }
      onButtonCancelClicked={() => {
        onClickDelete(dataRole);
        onvisible(false);
      }}
    >
      <Spin spinning={loadingUpdate}>
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
              label="Nama"
              name={"name"}
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
                  value={dataRole.name}
                  name={"name"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>

            <Form.Item label="Alias" name={"alias"} className="col-span-2">
              <div>
                <Input
                  value={dataRole.alias}
                  name={"alias"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Tipe"
              name={"recruitment_role_type_id"}
              rules={[
                {
                  required: true,
                  message: "Tipe role wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Select
                  placeholder="Pilih tipe.."
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

export default DrawerRoleUpdate;
