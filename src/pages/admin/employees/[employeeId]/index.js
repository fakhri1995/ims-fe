import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Modal,
  Popover,
  Select,
  Spin,
  Tabs,
  Tag,
  Timeline,
  notification,
} from "antd";
import parse from "html-react-parser";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Html from "react-pdf-html";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  GUEST_STATUS,
  RECRUITMENT_DELETE,
  RECRUITMENT_EMAIL_SEND,
  RECRUITMENT_EMAIL_TEMPLATES_LIST_GET,
  RECRUITMENT_GET,
  RECRUITMENT_LOG_GET,
  RECRUITMENT_LOG_NOTES_ADD,
  RECRUITMENT_STAGES_LIST_GET,
  RECRUITMENT_STATUSES_LIST_GET,
  RECRUITMENT_UPDATE,
  RECRUITMENT_UPDATE_STAGE,
  RECRUITMENT_UPDATE_STATUS,
  RESUME_GET,
} from "lib/features";

import ButtonSys from "../../../../components/button";
import {
  CirclePlusIconSvg,
  DotsIconSvg,
  DownloadIconSvg,
  EditIconSvg,
  ExternalLinkIconSvg,
  InfoCircleIconSvg,
  MailForwardIconSvg,
  OneUserIconSvg,
  PlusIconSvg,
  TrashIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import ModalCore from "../../../../components/modal/modalCore";
import {
  ModalHapus2,
  ModalUbah,
} from "../../../../components/modal/modalCustom";
import EmployeeContractDetail from "../../../../components/screen/employee/detail/contract";
import EmployeeInventoryDetail from "../../../../components/screen/employee/detail/inventory";
import EmployeeProfileDetail from "../../../../components/screen/employee/detail/profile";
import { permissionWarningNotification } from "../../../../lib/helper";
import httpcookie from "cookie";

moment.locale("id");

const EmployeeDetailIndex = ({
  initProps,
  dataProfile,
  sidemenu,
  employeeId,
}) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployee = hasPermission(RECRUITMENT_GET);
  const isAllowedToUpdateEmployee = hasPermission(RECRUITMENT_UPDATE);
  const isAllowedToDeleteEmployee = hasPermission(RECRUITMENT_DELETE);

  //INIT
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  // console.log(pathArr);
  pathArr[pathArr.length - 1] = "Yasmin Adelia Puti C";

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [currentTab, setCurrentTab] = useState("1");
  const [dataEmployee, setDataEmployee] = useState({});

  const [resumeId, setResumeId] = useState(0);

  const [refresh, setRefresh] = useState(-1);

  // 1.2 Update
  const [drawerUpdate, setDrawerUpdate] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);

  // 1.3. Delete
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 2. USE EFFECT
  // 2.1 Get employee detail
  useEffect(() => {
    if (!isAllowedToGetEmployee) {
      permissionWarningNotification("Mendapatkan", "Detail Karyawan");
      setpraloading(false);
      return;
    }

    if (employeeId) {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitment?id=${employeeId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            setDataEmployee(response2.data);
            setResumeId(response2.data.resume?.id);
          } else {
            notification.error({
              message: `${response2.message}`,
              duration: 3,
            });
          }
          setpraloading(false);
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
          setpraloading(false);
        });
    }
  }, [isAllowedToGetEmployee, employeeId, refresh]);

  // 3. Event
  const handleDeleteEmployee = () => {
    if (!isAllowedToDeleteEmployee) {
      permissionWarningNotification("Menghapus", "Kandidat");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteRecruitment?id=${Number(
        employeeId
      )}`,
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
          notification.success({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menghapus kandidat. ${res2.response}`,
            duration: 3,
          });
        }
        rt.push("/admin/recruitment");
        setTimeout(() => {
          setLoadingDelete(false);
          setModalDelete(false);
          setDataEmployee({});
        }, 500);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus kandidat. ${err.response}`,
          duration: 3,
        });
        setLoadingDelete(false);
        setModalDelete(false);
      });
  };

  // Tab Button
  const tabButton = () => {
    if (currentTab == "1") {
      return (
        <ButtonSys
          type={"default"}
          onClick={() => rt.push(`${employeeId}/editProfile`)}
        >
          <div className="flex flex-row items-center space-x-2">
            <EditIconSvg color={"#35763B"} size={16} />
            <p>Edit Profil</p>
          </div>
        </ButtonSys>
      );
    } else if (currentTab == "2") {
      return (
        <ButtonSys
          type={"default"}
          onClick={() => rt.push(`${employeeId}/addContract`)}
        >
          <div className="flex flex-row items-center space-x-2">
            <CirclePlusIconSvg color={"#35763B"} size={16} />
            <p>Tambah Kontrak</p>
          </div>
        </ButtonSys>
      );
    } else {
      return (
        <ButtonSys
          type={"default"}
          onClick={() => rt.push(`${employeeId}/addInventory`)}
        >
          <div className="flex flex-row items-center space-x-2">
            <CirclePlusIconSvg color={"#35763B"} size={16} />
            <p>Tambah Piranti</p>
          </div>
        </ButtonSys>
      );
    }
  };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div>
        <div className="flex flex-row gap-5 w-full">
          {/* Left Column - ID Card Photo */}
          <div className="w-1/4">{/* <img /> */}</div>
          {/* Right column */}
          <div className="flex flex-col w-3/4 gap-5">
            {/* Employee Status */}
            <div
              className="shadow-lg rounded-md bg-white px-6 py-3 flex flex-row 
							justify-between items-center"
            >
              <div className="flex flex-col space-y-2">
                <p className="mig-caption--medium text-mono80">
                  Status Karyawan
                </p>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="rounded-full w-4 h-4 bg-primary100"></div>
                  <h4 className="mig-heading--4">Aktif</h4>
                </div>
              </div>
              <ButtonSys
                type={!isAllowedToDeleteEmployee ? "primary" : "default"}
                color={"danger"}
                onClick={() => setModalDelete(true)}
                disabled={!isAllowedToDeleteEmployee}
              >
                <TrashIconSvg color={"#BF4A40"} size={16} />
                <p className="ml-2">Nonaktifkan Karyawan</p>
              </ButtonSys>
            </div>

            {/* Profile summary */}
            <div className="shadow-lg rounded-md bg-white py-4 px-6 divide-y-2">
              <h4 className="mig-heading--4 mb-3">Ringkasan Profil</h4>
              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">Nama</p>
                  <p>Yasmin Adelia Puti C</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">NIP</p>
                  <p>71231922</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">Posisi</p>
                  <p>Frontend Engineer</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">
                    Status Kontrak
                  </p>
                  <p>Tetap</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">E-mail</p>
                  <p>yasmin@mitrasolusi.group</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">
                    Nomor Telepon
                  </p>
                  <p>0812345678</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee detail */}
        <div className="shadow-lg rounded-md bg-white p-4 mt-8">
          <Tabs
            defaultActiveKey="1"
            tabBarGutter={60}
            className="px-1"
            activeKey={currentTab}
            onTabClick={(key) => setCurrentTab(key)}
            tabBarExtraContent={tabButton()}
          >
            <Tabs.TabPane tab="Profil Karyawan" key="1">
              <EmployeeProfileDetail />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Kontrak Karyawan" key="2">
              <EmployeeContractDetail employeeId={employeeId} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Inventaris & Piranti" key="3">
              <EmployeeInventoryDetail employeeId={employeeId} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>

      {/* Drawer Update Recruitment Candidate */}
      {/* <AccessControl hasPermission={RECRUITMENT_UPDATE}>
        <DrawerCandidateUpdate
          dataEmployee={dataEmployee}
          visible={drawerUpdate}
          initProps={initProps}
          onvisible={setDrawerUpdate}
          setRefresh={setRefresh}
          trigger={triggerUpdate}
          isAllowedToGetEmployee={isAllowedToGetEmployee}
          isAllowedToUpdateEmployee={isAllowedToUpdateEmployee}
          isAllowedToDeleteEmployee={isAllowedToDeleteEmployee}
          setModalDelete={setModalDelete}
        />
      </AccessControl> */}

      {/* Modal Delete Employee */}
      <AccessControl hasPermission={RECRUITMENT_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDeleteEmployee}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"karyawan"}
          loading={loadingDelete}
        >
          Apakah Anda yakin ingin menonaktifkan karyawan{" "}
          <strong>{dataEmployee?.name}</strong>?
        </ModalHapus2>
      </AccessControl>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const employeeId = params.employeeId;
  var initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "employee-list",
      employeeId,
    },
  };
}

export default EmployeeDetailIndex;
