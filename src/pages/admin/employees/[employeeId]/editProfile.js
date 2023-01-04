import { notification } from "antd";
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

import { EMPLOYEE_GET, EMPLOYEE_UPDATE } from "lib/features";

import ButtonSys from "../../../../components/button";
import { CheckIconSvg, XIconSvg } from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import EmployeeProfileForm from "../../../../components/screen/employee/create/profile";
import {
  objectToFormData,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

moment.locale("id");

const EmployeeProfileEditIndex = ({
  initProps,
  dataProfile,
  sidemenu,
  employeeId,
  employeeName,
}) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployee = hasPermission(EMPLOYEE_GET);
  const isAllowedToUpdateEmployee = hasPermission(EMPLOYEE_UPDATE);

  //INIT
  const rt = useRouter();

  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 3);
  pathTitleArr.splice(1, 3, "Daftar Karyawan", employeeName, "Edit Profil");

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [dataEmployee, setDataEmployee] = useState({
    // id_photo: "",
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
  });

  const [refresh, setRefresh] = useState(-1);

  // 1.2 Update
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [disablePublish, setDisablePublish] = useState(true);

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
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        })
        .finally(() => setpraloading(false));
    }
  }, [isAllowedToGetEmployee, employeeId, refresh]);

  // 2.2. Disable "Simpan" button if any required field is empty
  useEffect(() => {
    let requiredProfileField = Boolean(
      dataEmployee.name &&
        dataEmployee.nip &&
        dataEmployee.nik &&
        dataEmployee.alias &&
        dataEmployee.email_office &&
        dataEmployee.email_personal &&
        dataEmployee.phone_number &&
        dataEmployee.birth_place &&
        dataEmployee.birth_date &&
        dataEmployee.gender
    );

    if (!requiredProfileField) {
      setDisablePublish(true);
    } else {
      setDisablePublish(false);
    }
  }, [dataEmployee]);

  // 3. Event
  // 3.1. Save employee profile
  const handleSaveEmployee = () => {
    const payloadFormData = objectToFormData(dataEmployee);

    if (!isAllowedToUpdateEmployee) {
      permissionWarningNotification("Menyimpan", "Profil Karyawan");
      return;
    }
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployee`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
      },
      body: payloadFormData,
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          rt.push(`/admin/employees/${employeeId}`);
          setTimeout(() => {
            notification.success({
              message: `Profil karyawan berhasil disimpan.`,
              duration: 3,
            });
          }, 500);
        } else {
          notification.error({
            message: `Gagal menyimpan profil karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menyimpan profil karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="grid grid-cols-1 shadow-lg rounded-md bg-white md:py-7 md:px-5">
        <div className="flex flex-row items-center justify-between mb-7">
          <h4 className="mig-heading--4">Edit Profil</h4>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-end md:items-center">
            <ButtonSys
              color={"danger"}
              type={"default"}
              onClick={() => rt.back()}
            >
              <div className="flex flex-row space-x-2">
                <XIconSvg color={"#BF4A40"} size={16} />
                <p>Batalkan</p>
              </div>
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              onClick={handleSaveEmployee}
              disabled={!isAllowedToUpdateEmployee || disablePublish}
            >
              <div className="flex flex-row space-x-2">
                <CheckIconSvg color={"white"} size={16} />
                <p>Simpan</p>
              </div>
            </ButtonSys>
          </div>
        </div>
        <EmployeeProfileForm
          dataEmployee={dataEmployee}
          setDataEmployee={setDataEmployee}
        />
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, query }) {
  const employeeId = query.employeeId;
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

  const resourcesGE = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployee?id=${employeeId}`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGE = await resourcesGE.json();
  const employeeName = resjsonGE?.data?.name || "-";

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "employee-list",
      employeeId,
      employeeName,
    },
  };
}

export default EmployeeProfileEditIndex;
