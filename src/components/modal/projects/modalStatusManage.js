import { DragOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

import { useAxiosClient } from "hooks/use-axios-client";

import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../button";
import { EditIconSvg, LeftIconSvg, PlusIconSvg } from "../../icon";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalStatusManage = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddStatus,
  isAllowedToEditStatus,
  setRefresh,
}) => {
  const [form] = Form.useForm();
  // 1. USE STATE
  // Modal current state: manage, add, edit
  const [currentState, setCurrentState] = useState("manage");

  const [loading, setLoading] = useState(false);
  const [dataStatus, setDataStatus] = useState({
    name: "",
    color: "",
    after_id: 0,
  });
  const [dataStatusList, setDataStatusList] = useState([
    {
      id: 1,
      name: "On-Going",
      color: "#ABC123",
      display_order: 1,
    },
    {
      id: 2,
      name: "Open",
      color: "#ABC123",
      display_order: 1,
    },
    {
      id: 3,
      name: "Close",
      color: "#ABC123",
      display_order: 1,
    },
  ]);

  // 2. USE EFFECT

  // 3. HANDLER
  const handleAddStatus = () => {};
  const handleUpdateStatus = () => {};

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
  };

  const onDragEnd = ({ active, over }) => {
    let activeIndex,
      overIndex = 0;
    let updatedDataStatusList = [];

    if (active.id !== over?.id) {
      // Display reordered status list
      setDataStatusList((prev) => {
        activeIndex = prev.findIndex((i) => i.id === active.id);
        overIndex = prev.findIndex((i) => i.id === over?.id);
        updatedDataStatusList = arrayMove(prev, activeIndex, overIndex);
        return updatedDataStatusList;
      });

      // Update a status after_id when reordered
      let prevIndex = overIndex - 1; // see status above the reordered status
      // if the reordered status moved to the first order, then set after_id as 0
      let prevId = prevIndex < 0 ? 0 : updatedDataStatusList[prevIndex].id;
      let currentStatus = dataStatusList.find(
        (status) => status.id === active.id
      );
      setDataStatus({
        id: active.id,
        name: currentStatus?.name,
        color: currentStatus?.color,
        after_id: prevId,
      });
      handleUpdateStatus();
    }
  };

  // console.log({ dataStatus });

  // Switch modal header, body, and footer according to current state
  let header = null;
  let body = null;
  let footer = null;
  switch (currentState) {
    case "manage":
      header = <p>Kelola Status</p>;
      body = (
        <div className="flex flex-col space-y-6">
          <DndContext
            onDragEnd={onDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext items={dataStatusList.map((i) => i.id)}>
              {dataStatusList.map((status) => (
                <SortableItem
                  key={status?.id}
                  id={status.id}
                  statusColor={status?.color}
                  statusName={status?.name}
                  onClickEdit={(e) => setCurrentState("edit")}
                ></SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      );
      footer = (
        <ButtonSys type={"dashed"} onClick={() => setCurrentState("add")}>
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
              value={dataStatus.name}
              onChange={(e) =>
                setDataStatus((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </Form.Item>
          <Form.Item
            label="Warna"
            name={"color"}
            rules={[
              {
                required: true,
                message: "Warna status wajib diisi",
              },
            ]}
          >
            <Input
              name={"color"}
              type="color"
              value={dataStatus.color}
              onChange={(e) =>
                setDataStatus((prev) => ({
                  ...prev,
                  color: e.target.value,
                }))
              }
            />
          </Form.Item>
        </Form>
      );
      footer = (
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
              onClick={handleAddStatus}
              disabled={
                !isAllowedToAddStatus || !dataStatus.name || !dataStatus.color
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
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setCurrentState("manage")}
            className="bg-transparent hover:opacity-75"
          >
            <LeftIconSvg size={24} color={"#4D4D4D"} />
          </button>
          <p className="mig-heading--4">Edit Status</p>
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
              value={dataStatus.name}
              onChange={(e) =>
                setDataStatus((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </Form.Item>
          <Form.Item
            label="Warna"
            name={"color"}
            rules={[
              {
                required: true,
                message: "Warna status wajib diisi",
              },
            ]}
          >
            <Input
              name={"color"}
              type="color"
              value={dataStatus.color}
              onChange={(e) =>
                setDataStatus((prev) => ({
                  ...prev,
                  color: e.target.value,
                }))
              }
            />
          </Form.Item>
        </Form>
      );
      footer = (
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
              onClick={handleUpdateStatus}
              disabled={
                !isAllowedToEditStatus || !dataStatus.name || !dataStatus.color
              }
            >
              <p>Simpan Perubahan</p>
            </ButtonSys>
          </div>
        </Spin>
      );
      break;
  }

  return (
    <Modal
      title={header}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      footer={footer}
    >
      {body}
    </Modal>
  );
};

function SortableItem({ id, statusColor, statusName, onClickEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
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
        </div>
        <div className="flex space-x-2 items-center">
          <button
            onClick={onClickEdit}
            className="border-none shadow-none hover:opacity-70 bg-transparent"
          >
            <EditIconSvg size={24} color={"#CCCCCC"} />
          </button>
          <button
            {...listeners}
            {...attributes}
            className="bg-transparent -mt-1"
          >
            <HolderOutlined className="text-lg text-mono50 cursor-move" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default ModalStatusManage;
