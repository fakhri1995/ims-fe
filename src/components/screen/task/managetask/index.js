import { useRouter } from "next/router";

import { permissionWarningNotification } from "../../../../lib/helper";
import {
  ClipboardcheckIconSvg,
  EditIconSvg,
  ListcheckIconSvg,
} from "../../../icon";
import { H1, H2, Label, Text } from "../../../typography";

const ManageTask = ({
  canAddNewTask,
  setdrawertaskcreate,
  setdrawertasktypecreate,
  canAddNewTaskType,
}) => {
  const rt = useRouter();
  return (
    <div className="md:col-span-10 lg:col-span-4 flex flex-col shadow-md rounded-md bg-white p-5 ">
      <div className="flex items-center justify-between mb-4">
        <H1>Kelola Task</H1>
      </div>
      <div className="flex flex-col justify-center h-full">
        <div
          className=" h-2/6 flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2"
          onClick={() => {
            if (!canAddNewTask) {
              permissionWarningNotification("Menambahkan", "Task Baru");
              return;
            }

            setdrawertaskcreate(true);
          }}
        >
          <div className="flex p-1 bg-primary10 rounded mr-3">
            <ClipboardcheckIconSvg size={35} color={`#35763B`} />
          </div>
          <div className="flex flex-col">
            <H2>Tambah Task</H2>
            <Label>
              Error, PM, Instalasi, Perbaikan, Upgrade Sistem, dll.{" "}
            </Label>
          </div>
        </div>
        <div
          className=" h-2/6 flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2"
          onClick={() => {
            if (!canAddNewTaskType) {
              permissionWarningNotification("Menambahkan", "Tipe Task Baru");
              return;
            }

            setdrawertasktypecreate(true);
          }}
        >
          <div className="flex p-1 bg-primary10 rounded mr-3">
            <ListcheckIconSvg size={35} color={`#35763B`} />
          </div>
          <div className="flex flex-col">
            <H2>Tambah Tipe Task</H2>
            <Label>Tambah tipe task baru</Label>
          </div>
        </div>
        <div
          className=" h-2/6 flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2"
          onClick={() => {
            rt.push(`/tasks/tasktypes`);
          }}
        >
          <div className="flex p-1 bg-primary10 rounded mr-3">
            <EditIconSvg size={35} color={`#35763B`} />
          </div>
          <div className="flex flex-col">
            <H2>Kelola Tipe Task</H2>
            <Label>Hapus, ubah, lihat daftar tipe task</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTask;
