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
  CheckIconSvg,
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
  XIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import ModalCore from "../../../../components/modal/modalCore";
import {
  ModalHapus2,
  ModalUbah,
} from "../../../../components/modal/modalCustom";
import EmployeeContractForm from "../../../../components/screen/employee/create/contract";
import EmployeeProfileForm from "../../../../components/screen/employee/create/profile";
import EmployeeContractDetail from "../../../../components/screen/employee/detail/contract";
import EmployeeInventoryDetail from "../../../../components/screen/employee/detail/inventory";
import EmployeeProfileDetail from "../../../../components/screen/employee/detail/profile";
import { permissionWarningNotification } from "../../../../lib/helper";
import httpcookie from "cookie";

moment.locale("id");

const EmployeeContractAddIndex = ({
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
  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 3);
  pathTitleArr.splice(
    1,
    3,
    "Daftar Karyawan",
    "Yasmin Adelia Puti C",
    "Tambah Kontrak"
  );

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [currentTab, setCurrentTab] = useState("1");
  const [dataContract, setDataContract] = useState({
    contract_name: "",
    contract_status: "",
    position: "",
    employee_status: false,
    contract_doc: "",
    pkwt: "",
    contract_starts: "",
    contract_ends: "",
    placement: "",
    new_office: "",
    resign_date: "",
    benefits: {},
  });

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
  // useEffect(() => {
  //   if (!isAllowedToGetEmployee) {
  //     permissionWarningNotification("Mendapatkan", "Detail Karyawan");
  //     setpraloading(false);
  //     return;
  //   }

  //   if (employeeId) {
  //     setpraloading(true);
  //     fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitment?id=${employeeId}`,
  //       {
  //         method: `GET`,
  //         headers: {
  //           Authorization: JSON.parse(initProps),
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((response2) => {
  //         if (response2.success) {
  //           setDataEmployee(response2.data);
  //           setResumeId(response2.data.resume?.id);
  //         } else {
  //           notification.error({
  //             message: `${response2.message}`,
  //             duration: 3,
  //           });
  //         }
  //         setpraloading(false);
  //       })
  //       .catch((err) => {
  //         notification.error({
  //           message: `${err.response}`,
  //           duration: 3,
  //         });
  //         setpraloading(false);
  //       });
  //   }
  // }, [isAllowedToGetEmployee, employeeId, refresh]);

  // 3. Event
  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="shadow-lg rounded-md bg-white py-7 px-5">
        <div className="flex flex-row items-center justify-between mb-7">
          <h4 className="mig-heading--4">Tambah Kontrak</h4>
          <div className="space-x-6">
            <ButtonSys
              color={"danger"}
              type={"default"}
              onClick={() => rt.push(`/admin/employees/${employeeId}`)}
            >
              <div className="flex flex-row space-x-2">
                <XIconSvg color={"#BF4A40"} size={16} />
                <p>Batalkan</p>
              </div>
            </ButtonSys>
            <ButtonSys type={"primary"}>
              <div className="flex flex-row space-x-2">
                <CheckIconSvg color={"white"} size={16} />
                <p>Simpan</p>
              </div>
            </ButtonSys>
          </div>
        </div>
        <EmployeeContractForm
          initProps={initProps}
          dataContract={dataContract}
          setDataContract={setDataContract}
        />
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
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  // const employeeId = params.employeeId;
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
      sidemenu: "employee-list",
      employeeId,
    },
  };
}

export default EmployeeContractAddIndex;
