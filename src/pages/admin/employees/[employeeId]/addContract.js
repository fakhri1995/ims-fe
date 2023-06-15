import { CloseOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_CONTRACTS_GET,
  EMPLOYEE_CONTRACT_DELETE,
  EMPLOYEE_CONTRACT_GET,
  EMPLOYEE_CONTRACT_UPDATE,
} from "lib/features";

import ButtonSys from "../../../../components/button";
import { CheckIconSvg } from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { ModalUbah } from "../../../../components/modal/modalCustom";
import EmployeeContractForm from "../../../../components/screen/employee/create/contract";
import {
  objectToFormData,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

const EmployeeContractAddIndex = ({
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

  const isAllowedToGetEmployeeContracts = hasPermission(EMPLOYEE_CONTRACTS_GET);
  const isAllowedToUpdateEmployeeContract = hasPermission(
    EMPLOYEE_CONTRACT_UPDATE
  );

  const isAllowedToDeleteEmployeeContract = hasPermission(
    EMPLOYEE_CONTRACT_DELETE
  );

  //INIT
  const rt = useRouter();
  const { id: contractId } = rt.query;

  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 3);
  pathTitleArr.splice(1, 3, "Daftar Karyawan", employeeName, "Tambah Kontrak");

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [dataContract, setDataContract] = useState({
    id: null,
    employee_id: null,
    is_employee_active: 1,
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

  const [refresh, setRefresh] = useState(-1);

  // 1.2 Update
  const [modalUpdate, setModalUpdate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [prevContractName, setPrevContractName] = useState("");
  const [disablePublish, setDisablePublish] = useState(true);

  // 1.3. Delete
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 2. USE EFFECT
  // 2.1. Get employee contracts (use for getting previous active contract name)
  useEffect(() => {
    if (!isAllowedToGetEmployeeContracts) {
      permissionWarningNotification("Mendapatkan", "Daftar Kontrak Karyawan");
      setpraloading(false);
      return;
    }
    if (contractId) {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeContracts?employee_id=${employeeId}`,
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
            let contractList = response2.data;
            let previousContractName = contractList[0]?.contract_name;
            setPrevContractName(previousContractName);
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
  }, [isAllowedToGetEmployeeContracts, employeeId]);

  // 2.2. Disable "Simpan" button if any required field is empty
  useEffect(() => {
    let requiredContractField = Boolean(
      dataContract.role_id &&
        dataContract.contract_status_id &&
        dataContract.contract_files &&
        dataContract.contract_start_at &&
        dataContract.contract_end_at &&
        dataContract.placement &&
        dataContract.gaji_pokok &&
        Number(dataContract.pph21 !== null ? dataContract.pph21 : true)
    );

    if (!requiredContractField) {
      setDisablePublish(true);
    } else {
      setDisablePublish(false);
    }
  }, [dataContract]);

  // 2.3. Cleanup effect
  useEffect(() => {
    return () => {
      setDataContract({});
    };
  }, []);

  // 3. Event
  // Save Employee Contract
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
          notification.success({
            message: `Kontrak karyawan berhasil ditambahkan.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menyimpan kontrak karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menyimpan kontrak karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  // Delete Employee Contract when click "Batalkan"
  const handleDeleteContract = () => {
    if (!isAllowedToDeleteEmployeeContract) {
      permissionWarningNotification("Menghapus", "Kontrak");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/deleteEmployeeContract?id=${Number(
        dataContract.id
      )}&employee_id=${Number(employeeId)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          rt.back();
        } else {
          notification.error({
            message: `Gagal menghapus kontrak karyawan. ${res2.response}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus kontrak karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDelete(false);
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
      <div className="grid grid-cols-1 shadow-lg rounded-md bg-white p-3 md:py-7 md:px-5">
        <div className="flex flex-row items-center justify-between mb-7">
          <h4 className="mig-heading--4">Tambah Kontrak</h4>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-end md:items-center">
            <ButtonSys
              color={"danger"}
              type={"default"}
              onClick={() => {
                handleDeleteContract();
              }}
            >
              <div className="flex flex-row space-x-2">
                <CloseOutlined />
                <p>Batalkan</p>
              </div>
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              onClick={() => setModalUpdate(true)}
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
          employeeId={employeeId}
          contractId={contractId}
          prevpath={"add"}
        />
      </div>

      {/* Modal save contract */}
      <AccessControl hasPermission={EMPLOYEE_CONTRACT_UPDATE}>
        <ModalUbah
          title={`Konfirmasi Penambahan Kontrak`}
          visible={modalUpdate}
          onvisible={setModalUpdate}
          onOk={() => {
            handleSaveContract(dataContract);
            setModalUpdate(false);
            rt.push(`/admin/employees/${employeeId}?tab=2`);
          }}
          onCancel={() => {
            setModalUpdate(false);
          }}
          loading={loadingUpdate}
          okButtonText={"Ya, saya yakin"}
          disabled={!isAllowedToUpdateEmployeeContract}
        >
          <div className="space-y-4">
            <p className="">
              Dengan menambahkan kontrak ini, status kontrak Anda dengan
              nama&nbsp;
              <strong>{prevContractName || "-"} </strong> akan menjadi{" "}
              <strong>Tidak Aktif</strong>.
            </p>
            <p>
              Apakah Anda yakin ingin menambahkan kontrak ini dan
              menjadikan&nbsp;
              <strong>{dataContract?.contract_name}</strong> sebagai kontrak{" "}
              <strong>Aktif</strong> Anda?
            </p>
          </div>
        </ModalUbah>
      </AccessControl>
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

export default EmployeeContractAddIndex;
