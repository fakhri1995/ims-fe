import { Form, Tabs, notification } from "antd";
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

import { EMPLOYEE_GET } from "lib/features";

import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "../..//lib/helper";
import ButtonSys from "../../components/button";
import { DownloadIconSvg, OneUserIconSvg } from "../../components/icon";
import LayoutDashboard2 from "../../components/layout-dashboard2";
import st from "../../components/layout-dashboard.module.css";
import { ModalDownloadPayslip } from "../../components/modal/modalCustom";
import EmployeeContractDetail from "../../components/screen/employee/detail/contract";
import EmployeeInventoryDetail from "../../components/screen/employee/detail/inventory";
import EmployeePayslipDetail from "../../components/screen/employee/detail/payslip";
import EmployeeProfileDetail from "../../components/screen/employee/detail/profile";
import httpcookie from "cookie";

moment.locale("id");

const EmployeeViewProfileIndex = ({ initProps, dataProfile, employeeId }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployee = hasPermission(EMPLOYEE_GET);

  //INIT
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Karyawan";

  const [instanceForm] = Form.useForm();

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [currentTab, setCurrentTab] = useState("1");
  const [dataEmployee, setDataEmployee] = useState({
    id: 0,
    name: "",
    nip: "",
    nik: "",
    alias: "",
    phone_number: "",
    email_office: "",
    email_personal: "",
    domicile: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    blood_type: "",
    marital_status: "",
    child_total: "",
    bio_mother_name: "",
    npwp: "",
    bpjs_kesehatan: "",
    bpjs_ketenagakerjaan: "",
    acc_number_bukopin: "",
    acc_number_another: "",
    is_posted: 0,
    contracts: [],
    inventories: [],
    id_card_photo: {},
  });

  const [resumeId, setResumeId] = useState(0);

  const [refresh, setRefresh] = useState(-1);

  // 1.3. Download
  const [modalDownload, setModalDownload] = useState(false);
  const [loadingDownload, setLoadingDelete] = useState(false);
  const [downloadPass, setDownloadPass] = useState("");

  // 2. USE EFFECT
  // 2.1 Get employee detail
  useEffect(() => {
    if (!isAllowedToGetEmployee) {
      permissionWarningNotification("Mendapatkan", "Detail Karyawan");
      setpraloading(false);
      return;
    }

    setpraloading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployee?id=${employeeId}`,
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
  }, [isAllowedToGetEmployee, employeeId, refresh]);

  // 3. Event

  return (
    <LayoutDashboard2
      dataProfile={dataProfile}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div>
        <div className="flex flex-row gap-5 w-full">
          {/* Left Column - ID Card Photo */}
          {dataEmployee.id_card_photo ? (
            <img
              src={generateStaticAssetUrl(dataEmployee.id_card_photo?.link)}
              alt={dataEmployee.id_card_photo?.description}
              className="w-1/5 bg-cover object-cover rounded-md shadow-lg"
            />
          ) : (
            <div
              className="w-1/5 bg-white rounded-md shadow-lg flex flex-col items-center 
                justify-center space-y-2 p-4"
            >
              <OneUserIconSvg size={200} color={"black"} strokeWidth={1} />
              <h4 className="mig-heading--4 text-center">
                {dataEmployee?.name}
              </h4>
            </div>
          )}

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
                {Number(dataEmployee?.contracts[0]?.is_employee_active) ? (
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="rounded-full w-4 h-4 bg-primary100"></div>
                    <h4 className="mig-heading--4">Aktif</h4>
                  </div>
                ) : (
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="rounded-full w-4 h-4 bg-warning"></div>
                    <h4 className="mig-heading--4">Tidak Aktif</h4>
                  </div>
                )}
              </div>
              <ButtonSys
                type={!isAllowedToGetEmployee ? "primary" : "default"}
                onClick={() => setModalDownload(true)}
                disabled={!isAllowedToGetEmployee}
              >
                <DownloadIconSvg color={"#35763B"} size={16} />
                <p className="ml-2">Unduh Slip Gaji</p>
              </ButtonSys>
            </div>

            {/* Profile summary */}
            <div className="shadow-lg rounded-md bg-white py-4 px-6 divide-y-2">
              <h4 className="mig-heading--4 mb-3">Ringkasan Profil</h4>
              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">Nama</p>
                  <p>{dataEmployee?.name}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">NIP</p>
                  <p>{dataEmployee?.nip}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">Posisi</p>
                  <p>{dataEmployee?.role_name}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">
                    Status Kontrak
                  </p>
                  <p>{dataEmployee?.contracts[0]?.contract_status_name}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">E-mail</p>
                  <p>{dataEmployee?.email_office}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">
                    Nomor Telepon
                  </p>
                  <p>{dataEmployee?.phone_number}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee detail */}
        <div className="shadow-lg rounded-md bg-white p-4 mt-8">
          <Tabs
            defaultActiveKey="2"
            tabBarGutter={60}
            className="px-1"
            activeKey={currentTab}
            onTabClick={(key) => setCurrentTab(key)}
          >
            <Tabs.TabPane tab="Detail Profil" key="1">
              <EmployeeProfileDetail />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Slip Gaji" key="2">
              <EmployeePayslipDetail employeeId={employeeId} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Kontrak Karyawan" key="3">
              <EmployeeContractDetail employeeId={employeeId} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Inventaris & Piranti" key="4">
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
          setModalDownload={setModalDownload}
        />
      </AccessControl> */}

      {/* Modal Download Payslip */}
      {/* TODO: change access control */}
      <AccessControl hasPermission={EMPLOYEE_GET}>
        <ModalDownloadPayslip
          visible={modalDownload}
          onvisible={setModalDownload}
          // onOk
          loading={loadingDownload}
          disabled={!isAllowedToGetEmployee}
          downloadPass={downloadPass}
          setDownloadPass={setDownloadPass}
          instanceForm={instanceForm}
          monthOfPayslip={"Oktober 2022"}
        />
      </AccessControl>
    </LayoutDashboard2>
  );
};

export async function getServerSideProps({ req, res, params }) {
  // TODO: adjust employeeId
  //   const employeeId = params.employeeId;
  const employeeId = 1;
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
      employeeId,
    },
  };
}

export default EmployeeViewProfileIndex;
