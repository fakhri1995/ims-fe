import { ArrowRightOutlined, UploadOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_ADD, RESUME_ASSESSMENT_LIST } from "lib/features";

import ButtonSys from "../../../../components/button";
import {
  CheckIconSvg,
  CloudUploadIconSvg,
  LeftIconSvg,
  RightIconSvg,
  UploadIconSvg,
  XIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

const EmployeeProfileForm = dynamic(
  () => import("../../../../components/screen/employee/create/profile"),
  { ssr: false }
);
const EmployeeContractForm = dynamic(
  () => import("../../../../components/screen/employee/create/contract"),
  { ssr: false }
);
const EmployeeInventoryForm = dynamic(
  () => import("../../../../components/screen/employee/create/inventory"),
  { ssr: false }
);

const EmployeeCreate = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToCreateCandidate = hasPermission(RESUME_ADD);
  const isAllowedToGetAssessmentList = hasPermission(RESUME_ASSESSMENT_LIST);

  const rt = useRouter();

  const pathArr = rt.pathname.split("/").slice(1);
  // pathArr.splice(2, 1);
  // console.log(rt)
  pathArr[pathArr.length - 1] = "Tambah Karyawan";

  // 1. USE STATE
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");

  // 2. USE EFFECT

  // 3. HANDLER

  // const handleCreateCandidate = () => {
  //   if (!isAllowedToCreateCandidate) {
  //     permissionWarningNotification("Menambah", "Kandidat");
  //     return;
  //   }
  //   setLoadingCreate(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResume`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataAddEmployee),
  //   })
  //     .then((response) => response.json())
  //     .then((response2) => {
  //       if (response2.success) {
  //         notification.success({
  //           message: `Kandidat berhasil ditambahkan.`,
  //           duration: 3,
  //         });
  //         setTimeout(() => {
  //           setLoadingCreate(false);
  //           setDataAddEmployee({
  //             name: "",
  //             telp: "",
  //             email: "",
  //             city: "",
  //             province: "",
  //             assessment_id: "",
  //           });
  //           rt.push(`/admin/candidates/${response2.id}`);
  //         }, 500);
  //       } else {
  //         notification.error({
  //           message: `Gagal menambahkan kandidat. ${response2.message}`,
  //           duration: 3,
  //         });
  //         setTimeout(() => {
  //           setLoadingCreate(false);
  //         }, 500);
  //       }
  //     })
  //     .catch((err) => {
  //       notification.error({
  //         message: `Gagal menambahkan kandidat. ${err.response}`,
  //         duration: 3,
  //       });
  //       setLoadingCreate(false);
  //     });
  // };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className=" shadow-lg rounded-md bg-white py-7 px-4">
        <div className="flex flex-row items-center justify-between mb-4 px-1">
          <h3 className="mig-heading--3">Tambah Karyawan</h3>
          <div className="flex flex-row space-x-6">
            {currentTab == "1" ? (
              <ButtonSys
                type={"default"}
                color={"danger"}
                className="flex flex-row"
                onClick={() => {
                  rt.push("/admin/employees");
                }}
              >
                <XIconSvg size={18} color={`#BF4A40`} />
                <p className="ml-2">Batalkan</p>
              </ButtonSys>
            ) : (
              <ButtonSys
                type={"default"}
                className="flex flex-row"
                onClick={() => {
                  let numTab = Number(currentTab);
                  currentTab <= 3 && setCurrentTab(String(numTab - 1));
                }}
              >
                <LeftIconSvg size={18} color={`#35763B`} />
                <p className="ml-2">Kembali</p>
              </ButtonSys>
            )}
            {currentTab == "3" ? (
              <ButtonSys
                type={"primary"}
                className="flex flex-row"
                onClick={() => {
                  // rt.push('/admin/employees')
                }}
              >
                <CheckIconSvg size={18} color={`white`} />
                <p className="ml-2">Simpan Karyawan</p>
              </ButtonSys>
            ) : (
              <ButtonSys
                type={"primary"}
                className="flex flex-row"
                onClick={() => {
                  let numTab = Number(currentTab);
                  currentTab < 3 && setCurrentTab(String(numTab + 1));
                }}
                disabled={loadingCreate}
              >
                <p className="mr-2">Selanjutnya</p>
                <RightIconSvg size={18} color={`white`} />
              </ButtonSys>
            )}
          </div>
        </div>
        <Tabs
          defaultActiveKey="1"
          tabBarGutter={60}
          className="px-1"
          activeKey={currentTab}
          onTabClick={(key) => setCurrentTab(key)}
        >
          <Tabs.TabPane tab="Profil Karyawan" key="1">
            <EmployeeProfileForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Kontrak Karyawan" key="2">
            <EmployeeContractForm initProps={initProps} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Inventaris & Piranti" key="3">
            <EmployeeInventoryForm initProps={initProps} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res }) {
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
    },
  };
}

export default EmployeeCreate;
