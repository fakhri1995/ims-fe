import { CloseOutlined } from "@ant-design/icons";
import { Form, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import { EMPLOYEE_CONTRACT_GET, EMPLOYEE_CONTRACT_UPDATE } from "lib/features";

import ButtonSys from "../../../../components/button";
import { CheckIconSvg } from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard-management";
import st from "../../../../components/layout-dashboard-management.module.css";
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
  const [dataContract, setDataContract] = useState({
    id: null,
    employee_id: null,
    is_employee_active: 0,
    contract_name: "",
    contract_files: [],
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
    salaries: [
      {
        id: 0,
        employee_salary_column_id: 0,
        employee_payslip_id: 0,
        value: 0,
        column: [],
      },
    ],
    removed_file_ids: [],
  });

  // 1.2 Update
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // 1.3. Delete
  const [disablePublish, setDisablePublish] = useState(true);

  // 2. USE EFFECT
  // 2.1. Disable "Simpan" button if any required field is empty
  useEffect(() => {
    // resign date field is required if page comes from "Nonaktifkan Karyawan" button
    let isNotResign = true;
    if (prevpath === "inactivate") {
      isNotResign = moment(dataContract?.resign_at).isValid();
    }

    let requiredContractField = Boolean(
      dataContract.role_id &&
        dataContract.contract_status_id &&
        dataContract.contract_files &&
        dataContract.contract_start_at &&
        dataContract.contract_end_at &&
        dataContract.placement &&
        dataContract.gaji_pokok &&
        Number(dataContract.pph21 !== false ? dataContract.pph21 : true) &&
        isNotResign
    );

    if (!requiredContractField) {
      setDisablePublish(true);
    } else {
      setDisablePublish(false);
    }
  }, [dataContract, prevpath]);

  // 2.2. Cleanup effect
  useEffect(() => {
    return () => {
      setDataContract({});
    };
  }, []);

  // 3. Event
  // 3.1. Save Employee Contract
  const handleSaveContract = (contractData) => {
    if (!isAllowedToUpdateEmployeeContract) {
      permissionWarningNotification("Menyimpan", "Kontrak Karyawan");
      return;
    }

    /** Setup form data to be sent in API */
    let payload = contractData;

    // Mapping file list to required format in API updateEmployeeContract form-data
    if (contractData?.contract_files?.length) {
      let fileObjectList = contractData?.contract_files?.map(
        (file, idx) => file?.originFileObj
      );

      fileObjectList?.forEach((file, idx) => {
        payload[`contract_files[${idx}]`] = file;
      });
    }

    // Mapping removed file list to required format
    if (contractData?.removed_file_ids?.length) {
      contractData?.removed_file_ids?.forEach((removedFileId, idx) => {
        payload[`contract_file_delete_ids[${idx}]`] = removedFileId;
      });
    }

    // Mapping salaries list to required format
    if (contractData?.salaries?.length > 0) {
      let benefitObjectList = contractData?.salaries?.map((benefit, idx) => {
        let obj = {};
        obj[`salaries[${idx}][employee_salary_column_id]`] =
          benefit?.employee_salary_column_id;
        obj[`salaries[${idx}][value]`] = benefit?.value;
        obj[`salaries[${idx}][is_amount_for_bpjs]`] =
          benefit?.is_amount_for_bpjs;
        return obj;
      });

      let allBenefitObject = {};
      for (let benefitObject of benefitObjectList) {
        Object.assign(allBenefitObject, benefitObject);
      }

      payload = {
        ...payload,
        ...allBenefitObject,
      };
    }

    // convert object to form data
    const payloadFormData = objectToFormData(payload);

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

  // console.log({ dataContract });

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="grid grid-cols-1 shadow-lg rounded-md bg-white p-3 md:py-7 md:px-5">
        <div className="flex flex-row items-center justify-between mb-7">
          <h4 className="mig-heading--4">Edit Kontrak</h4>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-end md:items-center">
            <ButtonSys
              color={"danger"}
              type={"default"}
              onClick={() => rt.back()}
            >
              <div className="flex flex-row space-x-2">
                <CloseOutlined />
                <p>Batalkan</p>
              </div>
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              onClick={() => {
                handleSaveContract(dataContract);
                rt.push(`/admin/employees/${employeeId}?tab=2`);
              }}
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
          employeeId={employeeId}
          contractId={contractId}
          currentTab={2}
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
