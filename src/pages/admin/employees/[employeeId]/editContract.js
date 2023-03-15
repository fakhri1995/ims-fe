import { Form, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { EMPLOYEE_CONTRACT_GET, EMPLOYEE_CONTRACT_UPDATE } from "lib/features";

import ButtonSys from "../../../../components/button";
import { CheckIconSvg, XIconSvg } from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import EmployeeContractForm from "../../../../components/screen/employee/create/contract";
import {
  objectToFormData,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

const EmployeeContractEditIndex = ({
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

  const isAllowedToGetEmployeeContract = hasPermission(EMPLOYEE_CONTRACT_GET);
  const isAllowedToUpdateEmployeeContract = hasPermission(
    EMPLOYEE_CONTRACT_UPDATE
  );

  //INIT
  const rt = useRouter();
  const { id: contractId, prevpath } = rt.query;

  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 3);
  pathTitleArr.splice(1, 3, "Daftar Karyawan", employeeName, "Edit Kontrak");

  // const [instanceForm] = Form.useForm();

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [dataContract, setDataContract] = useState({
    id: null,
    employee_id: null,
    is_employee_active: 0,
    contract_name: "",
    contract_file: null,
    contract_status_id: null,
    role_id: null,
    employee_status: false,
    pkwt_reference: "",
    annual_leave: 0,
    contract_start_at: "",
    contract_end_at: "",
    placement: "",
    new_office: "",
    resign_at: "",
    salaries: [],
  });

  const [refresh, setRefresh] = useState(-1);

  // 1.2 Update
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // 1.3. Delete
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [disablePublish, setDisablePublish] = useState(true);

  // 2. USE EFFECT
  // 2.1 Get employee contract detail
  useEffect(() => {
    if (!isAllowedToGetEmployeeContract) {
      permissionWarningNotification("Mendapatkan", "Detail Kontrak Karyawan");
      setpraloading(false);
      return;
    }
    if (contractId) {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeContract?id=${contractId}`,
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
            setDataContract(response2.data);
            if (prevpath === "inactivate") {
              setDataContract({ ...response2.data, is_employee_active: 0 });
            }
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
  }, [isAllowedToGetEmployeeContract, contractId, refresh]);

  // 2.2. Disable "Simpan" button if any required field is empty
  useEffect(() => {
    // resign date field is required if page comes from "Nonaktifkan Karyawan" button
    let isNotResign = true;
    if (prevpath === "inactivate") {
      isNotResign = moment(dataContract?.resign_at).isValid();
    }

    let requiredContractField = Boolean(
      dataContract.contract_name &&
        dataContract.role_id &&
        dataContract.contract_status_id &&
        dataContract.contract_file &&
        dataContract.pkwt_reference &&
        dataContract.contract_start_at &&
        dataContract.contract_end_at &&
        dataContract.placement &&
        dataContract.gaji_pokok &&
        dataContract.pph21 &&
        isNotResign
    );

    if (!requiredContractField) {
      setDisablePublish(true);
    } else {
      setDisablePublish(false);
    }
  }, [dataContract, prevpath]);

  // 3. Event
  // 3.1. Save Employee Contract
  const handleSaveContract = () => {
    if (!isAllowedToUpdateEmployeeContract) {
      permissionWarningNotification("Menyimpan", "Kontrak Karyawan");
      return;
    }

    // Setup form data to be sent in API
    let payloadFormData;
    if (dataContract?.salaries?.length > 0) {
      // Mapping salaries list to required format in API updateEmployeeContract form-data
      let benefitObjectList = dataContract?.salaries?.map((benefit, idx) => {
        let obj = {};
        obj[`salaries[${idx}][employee_salary_column_id]`] =
          benefit.employee_salary_column_id;
        obj[`salaries[${idx}][value]`] = benefit.value;
        return obj;
      });

      let allBenefitObject = {};
      for (let benefitObject of benefitObjectList) {
        Object.assign(allBenefitObject, benefitObject);
      }

      const payload = {
        ...dataContract,
        ...allBenefitObject,
      };

      // convert object to form data
      payloadFormData = objectToFormData(payload);
    } else {
      payloadFormData = objectToFormData(dataContract);
    }

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployeeContract`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
      },
      body: payloadFormData,
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          rt.push(`/admin/employees/${employeeId}?tab=2`);
          setTimeout(() => {
            if (prevpath === "inactivate") {
              notification.success({
                message: `Status karyawan berhasil dinonaktifkan.`,
                duration: 3,
              });
            } else {
              notification.success({
                message: `Kontrak karyawan berhasil diubah.`,
                duration: 3,
              });
            }
          }, 500);
        } else {
          notification.error({
            message: `Gagal mengubah draft karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah draft karyawan. ${err.response}`,
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
          <h4 className="mig-heading--4">Edit Kontrak</h4>
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
              onClick={handleSaveContract}
              disabled={!isAllowedToUpdateEmployeeContract || disablePublish}
            >
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
          prevpath={prevpath}
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

export default EmployeeContractEditIndex;
