import { Tabs, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_CONTRACT_ADD,
  EMPLOYEE_CONTRACT_UPDATE,
  EMPLOYEE_DELETE,
  EMPLOYEE_GET,
  EMPLOYEE_INVENTORY_ADD,
  EMPLOYEE_INVENTORY_UPDATE,
  EMPLOYEE_UPDATE,
} from "lib/features";

import ButtonSys from "../../../../components/button";
import {
  CirclePlusIconSvg,
  EditIconSvg,
  OneUserIconSvg,
  TrashIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { ModalHapus2 } from "../../../../components/modal/modalCustom";
import EmployeeContractDetail from "../../../../components/screen/employee/detail/contract";
import EmployeeInventoryDetail from "../../../../components/screen/employee/detail/inventory";
import EmployeeProfileDetail from "../../../../components/screen/employee/detail/profile";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

const FormSolutionDetailIndex = ({
  initProps,
  dataProfile,
  sidemenu,
  formSolutionId,
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
  const isAllowedToDeleteEmployee = hasPermission(EMPLOYEE_DELETE);
  const isAllowedToAddEmployeeContract = hasPermission(EMPLOYEE_CONTRACT_ADD);
  const isAllowedToUpdateEmployeeContract = hasPermission(
    EMPLOYEE_CONTRACT_UPDATE
  );
  const isAllowedToAddEmployeeInventory = hasPermission(EMPLOYEE_INVENTORY_ADD);
  const isAllowedToUpdateEmployeeInventory = hasPermission(
    EMPLOYEE_INVENTORY_UPDATE
  );

  //INIT
  const rt = useRouter();
  const { tab: tabId } = rt.query;

  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 2);
  pathTitleArr.splice(1, 2, "Form Solution", "Details");

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [currentTab, setCurrentTab] = useState(tabId || "1");
  const [dataFormSolution, setDataFormSolution] = useState({
    id: 0,
    company_name: "",
    contact_name: "",
    kind_form: "",
    email: "",
    kind_project: "",
    type_project: "",
    many_people: "",
    meeting_schedule: "",
    phone_number: "",
    purpose: "",
    type_project: "",
    details: [],
  });

  const [refresh, setRefresh] = useState(-1);

  // 1.2 Update
  const [drawerUpdate, setDrawerUpdate] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);

  // 1.3. Delete
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 1.4 Add Contract
  const [loadingAdd, setLoadingAdd] = useState(false);

  // 2. USE EFFECT
  // 2.1 Get employee detail
  useEffect(() => {
    if (!isAllowedToGetEmployee) {
      permissionWarningNotification("Mendapatkan", "Detail Karyawan");
      setpraloading(false);
      return;
    }
    if (formSolutionId) {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFormSolutionDetail?id=${formSolutionId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((response) => response.json())
        .then((response2) => {
          console.log("hasil api ", response2);
          if (response2.success) {
            setDataFormSolution(response2.data);
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
  }, [isAllowedToGetEmployee, formSolutionId, refresh]);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div>
        <div className="shadow-lg rounded-md bg-white py-4 px-6 divide-y-2 h-full">
          <h4 className="mig-heading--4 mb-3">Data Sender</h4>
          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="flex flex-col space-y-1">
              <p className="mig-caption--medium text-mono80">Company Name</p>
              <p>{dataFormSolution?.company_name}</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="mig-caption--medium text-mono80">Contact Name</p>
              <p>{dataFormSolution?.contact_name}</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="mig-caption--medium text-mono80">Email</p>
              <p>{dataFormSolution?.email}</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="mig-caption--medium text-mono80">Nomor Telepon</p>
              <p>{dataFormSolution?.phone_number}</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="mig-caption--medium text-mono80">
                Meeting Schedule
              </p>
              <p>{dataFormSolution?.meeting_schedule}</p>
            </div>
          </div>
        </div>
        {dataFormSolution.kind_form != "" &&
          dataFormSolution.kind_form != "software" && (
            <div className="shadow-lg rounded-md bg-white py-4 px-6 divide-y-2 h-full">
              <h4 className="mig-heading--4 mb-3">Data Form Detail</h4>
              <div className="grid grid-cols-2 gap-4 pt-3">
                {dataFormSolution?.details.map((data, index) => (
                  <div>
                    <div className="flex flex-col space-y-1">
                      <p className="mig-caption--medium text-mono80">Nomor</p>
                      <p>{index + 1}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="mig-caption--medium text-mono80">
                        {dataFormSolution.kind_form == "hardware"
                          ? "Kind Product"
                          : "Kind of Talent"}
                      </p>
                      <p>{data.kind_of_product}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="mig-caption--medium text-mono80">
                        Urgently
                      </p>
                      <p>{data.urgently}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="mig-caption--medium text-mono80">
                        Time Used
                      </p>
                      <p>{data.time_used} month</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="mig-caption--medium text-mono80">
                        {dataFormSolution.kind_form == "hardware"
                          ? "Many Product"
                          : "Many Talent"}
                      </p>
                      <p>{data.many_product}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="mig-caption--medium text-mono80">
                        Maximum Budget
                      </p>
                      <p>
                        {`Rp ${data.maximum_budget}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const formSolutionId = params.formSolutionId;
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
      sidemenu: "4",
      formSolutionId,
    },
  };
}

export default FormSolutionDetailIndex;
