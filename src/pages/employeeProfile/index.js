import { DownloadOutlined } from "@ant-design/icons";
import { Form, Tabs, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { EMPLOYEE_GET, EMPLOYEE_PAYSLIP_DOWNLOAD } from "lib/features";

import {
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "../..//lib/helper";
import ButtonSys from "../../components/button";
import { OneUserIconSvg } from "../../components/icon";
import LayoutDashboard2 from "../../components/layout-dashboard2";
import st from "../../components/layout-dashboard.module.css";
import { ModalDownloadPayslip } from "../../components/modal/modalCustom";
import EmployeeContractDetail from "../../components/screen/employee/detail/contract";
import EmployeeInventoryDetail from "../../components/screen/employee/detail/inventory";
import EmployeePayslipDetail from "../../components/screen/employee/detail/payslip";
import EmployeeProfileDetail from "../../components/screen/employee/detail/profile";
import EmployeeProfileSummary from "../../components/screen/employee/detail/summary";
import httpcookie from "cookie";

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
  const isAllowedToDownloadPayslip = hasPermission(EMPLOYEE_PAYSLIP_DOWNLOAD);

  //INIT
  const rt = useRouter();
  const { tab: tabId } = rt.query;

  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(0, 1, "Karyawan");

  // Array of 12 month names
  const monthNames = moment.months();

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [currentTab, setCurrentTab] = useState(tabId || "2");
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
    join_at: "",
  });

  const [refresh, setRefresh] = useState(-1);

  // 1.3. Download
  const [modalDownload, setModalDownload] = useState(false);
  const [downloadPass, setDownloadPass] = useState("");
  const [loadingDownload, setLoadingDownload] = useState(false);

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
  const handleDownloadPayslip = () => {
    if (!isAllowedToDownloadPayslip) {
      permissionWarningNotification("Mengunduh", "Slip Gaji");
      return;
    }

    const payslip = dataEmployee?.last_month_payslip;
    const payload = {
      password: downloadPass,
    };

    setLoadingDownload(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/downloadEmployeePayslip?id=${payslip?.id}`,
      {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.blob();
        }
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);

        // Create download link element
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = `Slip Gaji ${monthNames[payslip?.month - 1]} ${
          payslip?.year
        } - ${dataEmployee?.name}`;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();

        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengunduh slip gaji. Kata sandi salah.`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDownload(false);
        setModalDownload(false);
        setDownloadPass("");
      });
  };

  // console.log({ dataProfile });
  return (
    <LayoutDashboard2
      dataProfile={dataProfile}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="grid grid-cols-1">
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
          {/* Left Column - ID Card Photo */}
          {dataEmployee.id_card_photo ? (
            <img
              src={generateStaticAssetUrl(dataEmployee.id_card_photo?.link)}
              alt={dataEmployee.id_card_photo?.description}
              className="md:w-2/5 lg:w-1/5 bg-cover object-cover rounded-md shadow-lg"
            />
          ) : (
            <div
              className="md:w-2/5 lg:w-1/5 bg-white rounded-md shadow-lg flex flex-col items-center 
              justify-center space-y-2 p-4"
            >
              <OneUserIconSvg size={200} color={"black"} strokeWidth={1} />
              <h4 className="mig-heading--4 text-center">
                {dataEmployee?.name}
              </h4>
            </div>
          )}

          {/* Right column */}
          <div className="md:flex md:flex-col md:w-3/5 lg:w-4/5 gap-3 md:gap-5">
            {/* Employee Status */}
            <div
              className="shadow-lg rounded-md bg-white px-3 md:px-6 py-3 
              flex flex-col md:flex-row justify-between md:items-center space-y-3 md:space-y-0"
            >
              <div className="flex flex-col space-x-0 space-y-2 justify-between ">
                <p className="mig-caption--medium text-mono80">
                  Status Slip Gaji (
                  {moment().subtract(1, "month").format("MMMM YYYY")})
                </p>
                {dataEmployee?.last_month_payslip?.is_posted ? (
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="rounded-full w-4 h-4 bg-primary100"></div>
                    <h4 className="mig-heading--4">Diterbitkan</h4>
                  </div>
                ) : (
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="rounded-full w-4 h-4 bg-mono80"></div>
                    <h4 className="mig-heading--4">Kosong</h4>
                  </div>
                )}
              </div>
              {Boolean(dataEmployee?.last_month_payslip?.is_posted) && (
                <ButtonSys
                  type={"primary"}
                  onClick={() => setModalDownload(true)}
                  disabled={!isAllowedToDownloadPayslip || loadingDownload}
                >
                  <div className="flex space-x-2 whitespace-nowrap">
                    <DownloadOutlined />
                    <p>Unduh Slip Gaji</p>
                  </div>
                </ButtonSys>
              )}
            </div>

            {/* Profile summary */}
            <EmployeeProfileSummary dataEmployee={dataEmployee} />
          </div>
        </div>

        {/* Employee detail */}
        <div className="shadow-lg rounded-md bg-white md:p-4 mt-8 p-3">
          <Tabs
            defaultActiveKey="2"
            tabBarGutter={60}
            className="px-1"
            activeKey={currentTab}
            onTabClick={(key) => {
              setCurrentTab(key);
              rt.push(`employeeProfile?tab=${key}`, undefined, {
                shallow: true,
              });
            }}
          >
            <Tabs.TabPane tab="Detail Profil" key="1">
              <EmployeeProfileDetail dataEmployee={dataEmployee} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Slip Gaji" key="2">
              <EmployeePayslipDetail
                employeeId={employeeId}
                employeeName={dataEmployee?.name}
                initProps={initProps}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Kontrak Karyawan" key="3">
              <EmployeeContractDetail
                dataEmployee={dataEmployee}
                initProps={initProps}
                myEmployeeId={employeeId}
                employeeId={employeeId}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Inventaris & Piranti" key="4">
              <EmployeeInventoryDetail
                dataEmployee={dataEmployee}
                initProps={initProps}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>

      {/* Modal Download Payslip */}
      <AccessControl hasPermission={EMPLOYEE_PAYSLIP_DOWNLOAD}>
        <ModalDownloadPayslip
          visible={modalDownload}
          onvisible={setModalDownload}
          onOk={handleDownloadPayslip}
          loading={loadingDownload}
          disabled={!isAllowedToGetEmployee}
          downloadPass={downloadPass}
          setDownloadPass={setDownloadPass}
          monthOfPayslip={`${
            monthNames[dataEmployee?.last_month_payslip?.month - 1]
          } ${dataEmployee?.last_month_payslip?.year}`}
        />
      </AccessControl>
    </LayoutDashboard2>
  );
};

export async function getServerSideProps({ req, res, params }) {
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
  const employeeId = (await dataProfile.data?.employee?.id) || null;

  return {
    props: {
      initProps,
      dataProfile,
      employeeId,
    },
  };
}

export default EmployeeViewProfileIndex;
