import { DeleteOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Spin, Tag } from "antd";
import { useRouter } from "next/router";
import React from "react";

import { useAccessControl } from "contexts/access-control";

import { getNameInitial, momentFormatDate } from "../../../lib/helper";
import ButtonSys from "../../button";
import {
  ArrowUpRightIconSvg,
  BriefcaseIconSvg,
  BulbIconSvg,
  CalendarEventIconSvg,
  CompanyIconSvg,
  PhoneIconSvg,
  SchoolIconSvg,
} from "../../icon";
import DrawerCore from "../drawerCore";

const DrawerTalentDetail = ({ visible, onvisible, dataTalent, onDelete }) => {
  /**
   * Dependencies
   */
  const {
    hasRole,
    hasPermission,
    isPending: isAccessControlPending,
  } = useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const rt = useRouter();
  const moreMenu = (
    <Menu>
      <Menu.Item>
        <button
          onClick={onDelete}
          className="flex space-x-2 items-center whitespace-nowrap bg-transparent"
        >
          <DeleteOutlined rev={""} />
          <p>Hapus Talent</p>
        </button>
      </Menu.Item>
    </Menu>
  );

  // console.log({ talentId });
  // console.log(dataTalent);
  return (
    <DrawerCore
      title={`Detail Informasi Talent`}
      visible={visible}
      onClose={() => onvisible(false)}
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-6 items-center">
          <div
            className="rounded-full w-20 h-20 p-2 flex justify-center items-center 
              bg-backdrop mig-heading--4 text-primary100"
          >
            {getNameInitial(dataTalent?.resume?.name)}
          </div>
          <div>
            <h4 className="mig-heading--4">{dataTalent?.resume?.name}</h4>
            <p className="mig-caption--medium text-mono50">
              {dataTalent?.resume?.last_assessment?.name}
            </p>
            <p className="mig-caption--medium text-mono50">
              {dataTalent?.resume?.email}
            </p>
          </div>
        </div>

        <hr className="" />

        {/* Informasi Umum */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
          <h5 className="md:col-span-2 mig-heading--5 font-bold">
            Informasi Umum
          </h5>
          <div className="mig-caption--medium">
            <div
              className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
            >
              <CompanyIconSvg size={16} color={"#35763B"} />
              <p className="text-primary100">Asal Kota</p>
            </div>
            <p>{dataTalent?.resume?.city || "-"}</p>
          </div>

          <div className="mig-caption--medium">
            <div
              className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
            >
              <BriefcaseIconSvg size={16} color={"#35763B"} />
              <p className="text-primary100">Pengalaman Terakhir</p>
            </div>
            <p>{dataTalent?.resume?.last_experience?.role || "-"}</p>
          </div>

          <div className="mig-caption--medium">
            <div
              className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
            >
              <PhoneIconSvg size={16} color={"#35763B"} />
              <p className="text-primary100">No Telepon</p>
            </div>
            <p>{dataTalent?.resume?.telp || "-"}</p>
          </div>

          <div className="mig-caption--medium">
            <div
              className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
            >
              <BriefcaseIconSvg size={16} color={"#35763B"} />
              <p className="text-primary100">Role</p>
            </div>
            <p>{dataTalent?.resume?.last_assessment?.name || "-"}</p>
          </div>

          <div className="mig-caption--medium">
            <div
              className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
            >
              <SchoolIconSvg size={16} color={"#35763B"} />
              <p className="text-primary100">Universitas</p>
            </div>
            <p>{dataTalent?.resume?.last_education?.university || "-"}</p>
          </div>

          <div className="mig-caption--medium">
            <div
              className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
            >
              <CalendarEventIconSvg size={16} color={"#35763B"} />
              <p className="text-primary100">Tanggal Daftar</p>
            </div>
            <p>
              {momentFormatDate(
                dataTalent?.resume?.recruitment?.created_at || "-"
              )}
            </p>
          </div>

          <div className="col-span-2 mig-caption--medium">
            <div
              className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-4 "
            >
              <BulbIconSvg size={16} color={"#35763B"} />
              <p className="text-primary100">Skill</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {dataTalent?.resume?.skills?.map((skill) => (
                <Tag
                  key={skill.id}
                  color="#35763B1A"
                  className="text-primary100 rounded-md mig-caption--bold"
                >
                  {skill.name}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <div className="w-11/12">
            <ButtonSys
              type={"primary"}
              fullWidth
              onClick={() => rt.push(`talent-pool/${dataTalent?.id}`)}
            >
              <div className="flex gap-2 items-center">
                <p>Lihat Detail</p>
                <ArrowUpRightIconSvg color={"#FFFFFF"} size={16} />
              </div>
            </ButtonSys>
          </div>
          <Dropdown overlay={moreMenu} placement="topRight">
            <Button
              type={"primary"}
              className="btn btn-sm text-mono50 font-semibold px-6 border 
                bg-mono100 border-mono100 hover:opacity-75 hover:bg-mono80 rounded-lg
                hover:border-mono80 focus:bg-mono80 focus:border-mono80 
                "
            >
              ...
            </Button>
          </Dropdown>
        </div>
      </div>
    </DrawerCore>
  );
};

export default DrawerTalentDetail;
