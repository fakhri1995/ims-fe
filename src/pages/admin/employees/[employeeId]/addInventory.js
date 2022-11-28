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
  EMPLOYEE_INVENTORY_DELETE,
  EMPLOYEE_INVENTORY_GET,
  EMPLOYEE_INVENTORY_UPDATE,
} from "lib/features";

import ButtonSys from "../../../../components/button";
import { CheckIconSvg, XIconSvg } from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import ModalCore from "../../../../components/modal/modalCore";
import {
  ModalHapus2,
  ModalUbah,
} from "../../../../components/modal/modalCustom";
import EmployeeInventoryForm from "../../../../components/screen/employee/create/inventory";
import EmployeeProfileForm from "../../../../components/screen/employee/create/profile";
import EmployeeContractDetail from "../../../../components/screen/employee/detail/contract";
import EmployeeInventoryDetail from "../../../../components/screen/employee/detail/inventory";
import EmployeeProfileDetail from "../../../../components/screen/employee/detail/profile";
import { permissionWarningNotification } from "../../../../lib/helper";
import httpcookie from "cookie";

moment.locale("id");

const EmployeeInventoryAddIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployeeInventory = hasPermission(EMPLOYEE_INVENTORY_GET);
  const isAllowedToUpdateEmployeeInventory = hasPermission(
    EMPLOYEE_INVENTORY_UPDATE
  );
  const isAllowedToDeleteEmployeeInventory = hasPermission(
    EMPLOYEE_INVENTORY_DELETE
  );

  //INIT
  const rt = useRouter();
  const { id: inventoryId, employeeId } = rt.query;

  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 3);
  pathTitleArr.splice(1, 3, "Daftar Karyawan", "Karyawan", "Tambah Piranti");

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [currentTab, setCurrentTab] = useState("1");
  const [inventoryList, setInventoryList] = useState([]);

  const [refresh, setRefresh] = useState(-1);

  // 1.2 Update
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // 1.3. Delete
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 2. USE EFFECT
  // 2.1 Get employee inventory detail
  useEffect(() => {
    if (!isAllowedToGetEmployeeInventory) {
      permissionWarningNotification(
        "Mendapatkan",
        "Detail Inventaris Karyawan"
      );
      setpraloading(false);
      return;
    }
    if (inventoryId) {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeInventory?id=${inventoryId}`,
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
            setInventoryList([...inventoryList, response2.data]);
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
  }, [isAllowedToGetEmployeeInventory, inventoryId, refresh]);

  // 3. Event
  // Save Employee Inventory
  const handleSaveInventory = () => {
    if (!isAllowedToUpdateEmployeeInventory) {
      permissionWarningNotification("Menyimpan", "Inventaris Karyawan");
      return;
    }
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployeeInventory`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryList[0]),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          rt.push(`/admin/employees/${employeeId}`);
          setTimeout(() => {
            notification.success({
              message: `Inventaris karyawan berhasil ditambahkan.`,
              duration: 3,
            });
          }, 500);
        } else {
          notification.error({
            message: `Gagal menyimpan inventaris karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menyimpan inventaris karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  // console.log(inventoryList);
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
          <h4 className="mig-heading--4">Tambah Piranti</h4>
          <div className="space-x-6">
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
              onClick={handleSaveInventory}
              disabled={!isAllowedToUpdateEmployeeInventory}
            >
              <div className="flex flex-row space-x-2">
                <CheckIconSvg color={"white"} size={16} />
                <p>Simpan</p>
              </div>
            </ButtonSys>
          </div>
        </div>
        <EmployeeInventoryForm
          initProps={initProps}
          isAdd={true}
          inventoryList={inventoryList}
          setInventoryList={setInventoryList}
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

export default EmployeeInventoryAddIndex;
