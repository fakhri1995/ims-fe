import { ArrowRightOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Tabs,
  Upload,
  notification,
} from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_ADD, RESUME_ASSESSMENT_LIST } from "lib/features";

import ButtonSys from "../../../../components/button";
import BasicInfoCard from "../../../../components/cards/resume/BasicInfoCard";
import {
  CloudUploadIconSvg,
  UploadIconSvg,
  XIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import EmployeeContractForm from "../../../../components/screen/employee/create/EmployeeContractForm";
import EmployeeProfileForm from "../../../../components/screen/employee/create/EmployeeProfileForm";
import { H1, H2 } from "../../../../components/typography";
import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

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
  const [instanceForm] = Form.useForm();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  // pathArr.splice(2, 1);
  // console.log(rt)
  pathArr[pathArr.length - 1] = "Tambah Karyawan";

  // 1. USE STATE
  // const [dataAddEmployee, setDataAddEmployee] = useState({
  //   id_photo: "",
  //   name: "",
  //   nip: "",
  //   nik: "",
  //   alias: "",
  //   telp: "",
  //   email_office: "",
  //   email_personal: "",
  //   domicile: "",
  //   birth_place: "",
  //   birth_date: "",
  //   gender: "",
  //   blood_type: "",
  //   marital_status: "",
  //   child_total: "",
  //   mother_name: "",
  //   npwp: "",
  //   bpjsk: "",
  //   bpjstk: "",
  //   rek_bukopin: "",
  //   other: "",
  // });

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [assessmentRoles, setAssessmentRoles] = useState([]);
  const [roleName, setRoleName] = useState("");

  // 2. USE EFFECT
  // 2.1. Get Role List
  // useEffect(() => {
  //   if (!isAllowedToGetAssessmentList) {
  //     permissionWarningNotification("Mendapatkan", "Daftar Role");
  //     setLoadingRoleList(false);
  //     return;
  //   }

  //   setLoadingRoleList(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessmentList`, {
  //     method: `GET`,
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       if (res2.success) {
  //         setAssessmentRoles(res2.data);
  //       } else {
  //         notification.error({
  //           message: `${res2.message}`,
  //           duration: 3,
  //         });
  //       }
  //       setLoadingRoleList(false);
  //     })
  //     .catch((err) => {
  //       notification.error({
  //         message: `${err.response}`,
  //         duration: 3,
  //       });
  //       setLoadingRoleList(false);
  //     });
  // }, [isAllowedToGetAssessmentList]);

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
            <ButtonSys
              type={"default"}
              color={"danger"}
              className="flex flex-row"
              // onClick={() => {
              //   isCreateForm
              //     ? rt.back()
              //     : setDataUpdateBasic({
              //         name: dataDisplay.name,
              //         telp: dataDisplay.telp,
              //         email: dataDisplay.email,
              //         assessment_id: dataDisplay.assessment_id,
              //         city: dataDisplay.city,
              //         province: dataDisplay.province,
              //       });
              //   setIsShowInput(false);
              // }}
            >
              <XIconSvg size={16} color={`#BF4A40`} />
              <p>Batalkan</p>
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              className="flex flex-row"
              // onClick={() => {
              //   isCreateForm
              //     ? handleUpdate()
              //     : handleUpdate("basic_information", dataUpdateBasic);
              //   setIsShowInput(false);
              // }}
              disabled={loadingCreate}
            >
              <p>Selanjutnya</p>
              <ArrowRightOutlined />
            </ButtonSys>
          </div>
        </div>
        <Tabs defaultActiveKey="1" tabBarGutter={60} className="px-1 pb-6">
          <Tabs.TabPane tab="Profil Karyawan" key="1">
            <EmployeeProfileForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Kontrak Karyawan" key="2">
            <EmployeeContractForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Inventaris & Piranti" key="3">
            Content of Tab Pane 3
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
