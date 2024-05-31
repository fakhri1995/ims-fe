import {
  DeleteOutlined,
  HolderOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Form, Input, Modal, Spin, Switch, Tooltip, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import "react-quill/dist/quill.snow.css";

import { permissionWarningNotification } from "lib/helper";

import {
  PROJECTS_GET,
  PROJECT_STATUSES_GET,
  PROJECT_TASKS_GET,
} from "../../../lib/features";
import ButtonSys from "../../button";
import { EditSquareIconSvg, LeftIconSvg, PlusIconSvg } from "../../icon";
import { ModalHapus2 } from "../modalCustom";

const ModalStatusManage = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddStatus,
  isAllowedToEditStatus,
  isAllowedToGetStatus,
  isAllowedToDeleteStatus,
  currentStatusList,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // 1. USE STATE
  // Modal current state: manage, add, edit
  const [currentState, setCurrentState] = useState("manage");

  const [dataStatusList, setDataStatusList] = useState([]);
  const [dataStatus, setDataStatus] = useState({
    id: 0,
    name: "",
    color: "",
    after_id: 0,
    is_active: 0,
  });
  const [loadingStatus, setLoadingStatus] = useState(false);

  const [editStatusId, setEditStatusId] = useState(0);

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  // 2. USE EFFECT
  useEffect(() => {
    setDataStatusList(currentStatusList);
  }, [currentStatusList]);

  // 2.1. Get Status Detail
  useEffect(() => {
    if (!isAllowedToGetStatus) {
      permissionWarningNotification("Mendapatkan", "Detail Status Proyek");
      setLoadingStatus(false);
      return;
    }

    if (editStatusId && currentState === "edit") {
      setLoadingStatus(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectStatus?id=${editStatusId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            setDataStatus(res2.data);
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        })
        .finally(() => {
          setLoadingStatus(false);
        });
    }
  }, [isAllowedToGetStatus, editStatusId, currentState]);

  // 3. HANDLER
  const clearData = () => {
    setDataStatus({
      name: "",
      color: "",
      after_id: 0,
    });
  };

  const handleClose = () => {
    onvisible(false);
    clearData();
    form.resetFields();
    setCurrentState("manage");
  };

  const handleAddStatus = () => {
    if (!isAllowedToAddStatus) {
      permissionWarningNotification("Menambah", "Status");
      return;
    }

    const payload = {
      ...dataStatus,
      after_id: dataStatusList[dataStatusList.length - 1]?.id,
    };

    setLoadingSave(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addProjectStatus`, {
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          notification.success({
            message: response.message,
            duration: 3,
          });
          queryClient.invalidateQueries(PROJECT_STATUSES_GET);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan status baru. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingSave(false));
  };

  const handleUpdateStatus = (statusData) => {
    if (!isAllowedToEditStatus) {
      permissionWarningNotification("Mengubah", "Status");
      return;
    }

    if (statusData?.id) {
      setLoadingSave(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProjectStatus`, {
        method: `PUT`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusData),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            notification.success({
              message: response.message,
              duration: 3,
            });
            queryClient.invalidateQueries(PROJECT_STATUSES_GET);
            queryClient.invalidateQueries(PROJECTS_GET);
            queryClient.invalidateQueries(PROJECT_TASKS_GET);
          } else {
            notification.error({
              message: response.message,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `Gagal mengubah status. ${err.response}`,
            duration: 3,
          });
        })
        .finally(() => setLoadingSave(false));
    }
  };

  const handleDeleteStatus = () => {
    if (!isAllowedToDeleteStatus) {
      permissionWarningNotification("Menghapus", "Status Proyek");
      setLoadingDelete(false);
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteProjectStatus?id=${dataStatus?.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setModalDelete(false);
          setCurrentState("manage");
          notification.success({
            message: res2.message,
            duration: 3,
          });

          queryClient.invalidateQueries(PROJECT_STATUSES_GET);
          queryClient.invalidateQueries(PROJECTS_GET);
          queryClient.invalidateQueries(PROJECT_TASKS_GET);
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus status proyek. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  const onDragEnd = ({ active, over }) => {
    let activeIndex,
      overIndex = 0;
    let updatedDataStatusList = [];

    if (active?.id !== over?.id) {
      // Display reordered status list
      setDataStatusList((prev) => {
        activeIndex = prev.findIndex((i) => i.id === active.id);
        overIndex = prev.findIndex((i) => i.id === over?.id);
        updatedDataStatusList = arrayMove(prev, activeIndex, overIndex);
        return updatedDataStatusList;
      });

      // Update a status after_id when reordered
      let prevIndex = overIndex - 1; // get status above the reordered status
      // if the reordered status moved to the first order, then set after_id as 0
      let prevId = prevIndex < 0 ? 0 : updatedDataStatusList[prevIndex]?.id;
      let currentStatus = dataStatusList?.find(
        (status) => status.id === active.id
      );
      setDataStatus({
        id: active?.id,
        name: currentStatus?.name,
        color: currentStatus?.color,
        after_id: prevId,
      });
      handleUpdateStatus({
        id: active.id,
        name: currentStatus?.name,
        color: currentStatus?.color,
        is_active: currentStatus?.is_active,
        after_id: prevId,
      });
    }
  };

  // Sortable component (status card)
  const SortableItem = ({
    id,
    idx,
    statusColor,
    statusName,
    isActive,
    onClickEdit,
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      transition,
    };

    return (
      <li ref={setNodeRef} style={style}>
        <div className="flex justify-between items-center border border-mono90 py-3 px-4 rounded-md">
          <div className="flex items-center space-x-3">
            <div
              className={`h-6 w-6 rounded-full`}
              style={{ backgroundColor: `${statusColor}` }}
            ></div>
            <p className="text-sm font-bold text-mono30">{statusName}</p>

            <div
              className={`text-white rounded-md text-xs font-bold px-2 py-[2px] ${
                isActive ? "bg-primary100" : "bg-mono50"
              }`}
            >
              {isActive ? "Aktif" : "Nonaktif"}
            </div>

            <p className="mig-caption text-mono80">
              {idx === 0 ? (
                "(Prioritas Tinggi)"
              ) : idx === dataStatusList?.length - 1 ? (
                "(Prioritas Rendah)"
              ) : (
                <></>
              )}
            </p>
          </div>
          <div className="flex space-x-2 items-center">
            {isAllowedToEditStatus && (
              <>
                <button
                  onClick={onClickEdit}
                  className="border-none shadow-none hover:opacity-70 bg-transparent"
                  disabled={!isAllowedToEditStatus}
                >
                  <EditSquareIconSvg size={24} color={"#CCCCCC"} />
                </button>

                <button
                  {...listeners}
                  {...attributes}
                  className="bg-transparent -mt-1"
                  disabled={!isAllowedToEditStatus}
                >
                  <HolderOutlined
                    rev={""}
                    className="text-lg text-mono50 cursor-move"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </li>
    );
  };

  // Switch modal header, body, and footer according to current state
  let header = null;
  let body = null;
  let footer = null;
  switch (currentState) {
    case "manage":
      header = (
        <div>
          <h4 className="mb-2 mig-heading--4">Kelola Status</h4>{" "}
          <div className="flex items-center space-x-2 text-secondary100">
            <InfoCircleOutlined rev={""} color="#00589F" size={16} />
            <p className="mig-caption">
              Urutkan prioritas status dengan cara melakukan "drag and drop"
              pada card status
            </p>
          </div>
        </div>
      );
      body = (
        <div className="flex flex-col space-y-6">
          <DndContext
            onDragEnd={onDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext items={dataStatusList?.map((i) => i.id)}>
              {dataStatusList?.map((status, idx) => (
                <SortableItem
                  key={status?.id}
                  id={status.id}
                  idx={idx}
                  statusColor={status?.color}
                  statusName={status?.name}
                  isActive={status?.is_active}
                  onClickEdit={(e) => {
                    setEditStatusId(status?.id);
                    setCurrentState("edit");
                  }}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      );
      footer = (
        <ButtonSys
          type={"dashed"}
          onClick={() => {
            if (isAllowedToAddStatus) {
              clearData();
              setCurrentState("add");
            }
          }}
          disabled={!isAllowedToAddStatus}
        >
          <div className="flex space-x-2 items-center">
            <PlusIconSvg color={"#35763B"} size={24} />
            <p>Tambah Status Baru</p>
          </div>
        </ButtonSys>
      );
      break;

    case "add":
      header = (
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setCurrentState("manage")}
            className="bg-transparent hover:opacity-75"
          >
            <LeftIconSvg size={24} color={"#4D4D4D"} />
          </button>
          <p className="mig-heading--4">Tambah Status</p>
        </div>
      );
      body = (
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Nama"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Nama status wajib diisi",
              },
            ]}
          >
            <Input
              name={"name"}
              placeholder="Isi nama status"
              value={dataStatus?.name}
              onChange={(e) =>
                setDataStatus((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </Form.Item>
          <div className="grid grid-cols-3 space-x-4">
            <Form.Item
              label="Warna"
              name={"color"}
              rules={[
                {
                  required: true,
                  message: "Warna status wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <Input
                name={"color"}
                type="color"
                value={dataStatus?.color}
                onChange={(e) =>
                  setDataStatus((prev) => ({
                    ...prev,
                    color: e.target.value,
                  }))
                }
              />
            </Form.Item>
            <div className="">
              <div className="flex items-center space-x-2 mb-3">
                <p className="">Konfigurasi Status </p>
                <Tooltip
                  title={
                    <div className="flex flex-col space-y-2 items-start p-2 text-mono30">
                      <div className="flex space-x-2 items-center">
                        <InfoCircleOutlined
                          rev={""}
                          color="#4D4D4D"
                          size={16}
                        />
                        <p className="font-bold">Konfigurasi Status</p>
                      </div>
                      <p className="ml-5">
                        Aktif menandakan proyek atau tugas sedang dalam
                        pengerjaan dan belum selesai
                      </p>
                    </div>
                  }
                  color="#FFFFFF"
                  placement="bottomLeft"
                >
                  <div className="cursor-help -mt-2">
                    <InfoCircleOutlined rev={""} color="#4D4D4D" size={16} />
                  </div>
                </Tooltip>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={dataStatus?.is_active}
                  onChange={(checked) =>
                    setDataStatus((prev) => ({
                      ...prev,
                      is_active: +checked,
                    }))
                  }
                />
                {dataStatus?.is_active ? <p>Aktif</p> : <p>Nonaktif</p>}
              </div>
            </div>
          </div>
        </Form>
      );
      footer = (
        <Spin spinning={loadingSave}>
          <div className="flex space-x-2 justify-end items-center">
            <button
              onClick={() => setCurrentState("manage")}
              className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
            >
              Batal
            </button>
            <ButtonSys
              type={"primary"}
              onClick={() => {
                handleAddStatus();
                setCurrentState("manage");
                form.resetFields();
              }}
              disabled={
                !isAllowedToAddStatus || !dataStatus?.name || !dataStatus?.color
              }
            >
              <p>Simpan Perubahan</p>
            </ButtonSys>
          </div>
        </Spin>
      );
      break;

    case "edit":
      header = (
        <div className="flex justify-between">
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => setCurrentState("manage")}
              className="bg-transparent hover:opacity-75"
            >
              <LeftIconSvg size={24} color={"#4D4D4D"} />
            </button>
            <p className="mig-heading--4">Edit Status</p>
          </div>
          <ButtonSys
            type={"default"}
            color={"danger"}
            onClick={() => {
              setModalDelete(true);
            }}
            disabled={!isAllowedToDeleteStatus}
          >
            <div className="flex space-x-2 items-center">
              <DeleteOutlined rev={""} />
              <p>Hapus Status</p>
            </div>
          </ButtonSys>
        </div>
      );
      body = (
        <Spin spinning={loadingStatus}>
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Nama"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Nama status wajib diisi",
                },
              ]}
            >
              <>
                <Input
                  name={"name"}
                  placeholder="Isi nama status"
                  value={dataStatus?.name}
                  onChange={(e) =>
                    setDataStatus((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </>
            </Form.Item>
            <div className="grid grid-cols-3 space-x-4">
              <Form.Item
                label="Warna"
                name={"color"}
                rules={[
                  {
                    required: true,
                    message: "Warna status wajib diisi",
                  },
                ]}
                className="col-span-2"
              >
                <>
                  <Input
                    name={"color"}
                    type="color"
                    value={dataStatus?.color}
                    onChange={(e) =>
                      setDataStatus((prev) => ({
                        ...prev,
                        color: e.target.value,
                      }))
                    }
                  />
                </>
              </Form.Item>
              <div className="">
                <div className="flex items-center space-x-2 mb-3">
                  <p className="">Konfigurasi Status </p>
                  <Tooltip
                    title={
                      <div className="flex flex-col space-y-2 items-start p-2 text-mono30">
                        <div className="flex space-x-2 items-center">
                          <InfoCircleOutlined
                            rev={""}
                            color="#4D4D4D"
                            size={16}
                          />
                          <p className="font-bold">Konfigurasi Status</p>
                        </div>
                        <p className="ml-5">
                          Aktif menandakan proyek atau tugas sedang dalam
                          pengerjaan dan belum selesai
                        </p>
                      </div>
                    }
                    color="#FFFFFF"
                    placement="bottomLeft"
                  >
                    <div className="cursor-help -mt-2">
                      <InfoCircleOutlined rev={""} color="#4D4D4D" size={16} />
                    </div>
                  </Tooltip>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={dataStatus?.is_active}
                    onChange={(checked) =>
                      setDataStatus((prev) => ({
                        ...prev,
                        is_active: +checked,
                      }))
                    }
                  />
                  {dataStatus?.is_active ? <p>Aktif</p> : <p>Nonaktif</p>}
                </div>
              </div>
            </div>
          </Form>
        </Spin>
      );
      footer = (
        <Spin spinning={loadingSave}>
          <div className="flex space-x-2 justify-end items-center">
            <button
              onClick={() => setCurrentState("manage")}
              className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
            >
              Batal
            </button>
            <ButtonSys
              type={"primary"}
              onClick={() => {
                let currentStatusIdx = dataStatusList?.findIndex(
                  (status) => status.id === dataStatus?.id
                );
                handleUpdateStatus({
                  ...dataStatus,
                  after_id: dataStatusList?.[currentStatusIdx - 1]?.id,
                });
                setCurrentState("manage");
                form.resetFields();
              }}
              disabled={
                !isAllowedToEditStatus ||
                !dataStatus?.name ||
                !dataStatus?.color
              }
            >
              <p>Simpan Perubahan</p>
            </ButtonSys>
          </div>
        </Spin>
      );
      break;
  }

  return modalDelete ? (
    <ModalHapus2
      title={`Perhatian`}
      visible={modalDelete}
      onvisible={setModalDelete}
      onOk={handleDeleteStatus}
      onCancel={() => {
        setModalDelete(false);
        handleClose();
      }}
      itemName={"status"}
      loading={loadingDelete}
    >
      <p className="mb-4">
        Apakah Anda yakin ingin menghapus status{" "}
        <strong>{dataStatus?.name}</strong>?
      </p>
    </ModalHapus2>
  ) : (
    <Modal
      title={header}
      visible={visible}
      closable={currentState !== "manage" ? false : true}
      onCancel={handleClose}
      maskClosable={false}
      footer={footer}
    >
      {body}
    </Modal>
  );
};

export default ModalStatusManage;
