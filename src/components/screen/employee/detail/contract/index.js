import { UpOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  DatePicker,
  Form,
  Input,
  Select,
  Tag,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CurrencyFormat from "react-currency-format";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { EMPLOYEE_CONTRACT_DELETE, EMPLOYEE_CONTRACT_GET } from "lib/features";

import {
  EditIconSvg,
  FileTextIconSvg,
  TrashIconSvg,
  UploadIconSvg,
} from "../../../../../components/icon";
import {
  beforeUploadFileMaxSize,
  generateStaticAssetUrl,
  getFileName,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import { ModalHapus2 } from "../../../../modal/modalCustom";

const EmployeeContractDetail = ({
  employeeId,
  isAllowedToUpdateEmployeeContract,
  dataEmployee,
  initProps,
  setRefresh,
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
  const isAllowedToDeleteEmployeeContract = hasPermission(
    EMPLOYEE_CONTRACT_DELETE
  );

  const [instanceForm] = Form.useForm();
  const rt = useRouter();

  // 1. USE STATE
  // Display data contract
  const [loadingData, setLoadingData] = useState(false);
  const [dataContract, setDataContract] = useState({});
  const [benefitObject, setBenefitObject] = useState({});

  // Delete contract
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState({
    contractId: null,
    contractName: "",
  });

  // 2. USE EFFECT
  useEffect(() => {
    handleGetEmployeeContract(dataEmployee?.contracts[0]?.id);
  }, [isAllowedToGetEmployeeContract, dataEmployee]);

  // 3. EVENT HANDLER
  // 3.1. Get Employee Contract Data
  const handleGetEmployeeContract = (contractId) => {
    if (!isAllowedToGetEmployeeContract) {
      permissionWarningNotification("Mendapatkan", "Data Kontrak Employee");
      setLoadingData(false);
      return;
    }

    if (contractId) {
      setLoadingData(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeContract?id=${contractId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            setDataContract(res2.data);
            if (res2.data?.benefit) {
              setBenefitObject(JSON.parse(res2.data.benefit));
            }
          } else {
            notification.error({
              message: `${res2.message}`,
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
        .finally(() => {
          setLoadingData(false);
        });
    }
  };

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
        dataModalDelete?.contractId
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
          setRefresh((prev) => prev + 1);
          notification.success({
            message: res2.message,
            duration: 3,
          });
          setModalDelete(false);
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
    <section>
      <Collapse
        bordered={false}
        defaultActiveKey={0}
        expandIconPosition={"right"}
        expandIcon={({ isActive }) => (
          <UpOutlined rotate={isActive ? 180 : 0} />
        )}
        accordion={true}
        onChange={(contractId) => handleGetEmployeeContract(contractId)}
        className={"bg-transparent"}
      >
        {dataEmployee?.contracts?.map((contract, idx) => (
          <Collapse.Panel
            key={idx}
            header={
              <div className="flex flex-row space-x-3 items-center">
                <p className="text-sm font-bold">
                  {contract.contract_name || "-"}
                </p>
                {Number(contract.is_employee_active) ? (
                  <Tag
                    color="#35763B1A"
                    className="text-primary100 px-4 py-1 rounded-md"
                  >
                    Aktif
                  </Tag>
                ) : (
                  <Tag
                    color="#4D4D4D1A"
                    className="text-mono30 px-4 py-1 rounded-md"
                  >
                    Tidak Aktif
                  </Tag>
                )}
                <div className="space-x-1">
                  {isAllowedToUpdateEmployeeContract && (
                    <button
                      className="bg-transparent hover:opacity-70"
                      onClick={(e) => {
                        e.stopPropagation();
                        rt.push(`${employeeId}/editContract?id=${contract.id}`);
                      }}
                    >
                      <EditIconSvg color={"#35763B"} size={20} />
                    </button>
                  )}
                  {isAllowedToDeleteEmployeeContract && (
                    <button
                      className="bg-transparent hover:opacity-70"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDataModalDelete({
                          contractId: contract?.id,
                          contractName: contract?.contract_name || "-",
                        });
                        setModalDelete(true);
                      }}
                    >
                      <TrashIconSvg color={"#BF4A40"} size={20} />
                    </button>
                  )}
                </div>
              </div>
            }
          >
            <div className="grid grid-cols-2">
              <h5 className="mig-heading--5 col-span-2 mb-2">INFORMASI UMUM</h5>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Posisi</p>
                <p>{dataContract.role?.name || "-"}</p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">
                  Status Kontrak
                </p>
                <p>{dataContract.contract_status?.name || "-"}</p>
              </div>
              <div className="space-y-1 col-span-2 mb-2">
                <p className="mig-caption--medium text-mono80">
                  Dokumen Kontrak
                </p>
                {dataContract.contract_file?.link ? (
                  <div className="flex space-x-2 items-center">
                    <FileTextIconSvg size={48} color={"black"} />
                    <a
                      href={generateStaticAssetUrl(
                        dataContract.contract_file?.link
                      )}
                      target="_blank"
                      className="text-secondary100"
                    >
                      {getFileName(dataContract.contract_file?.link)}
                    </a>
                  </div>
                ) : (
                  "-"
                )}
              </div>
              <div className="space-y-1 col-span-2 mb-2">
                <p className="mig-caption--medium text-mono80">
                  Referensi PKWT
                </p>
                <p>{dataContract.pkwt_reference || "-"}</p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Awal Kontrak</p>
                <p>{momentFormatDate(dataContract.contract_start_at, "-")}</p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Akhir Kontrak</p>
                <p>{momentFormatDate(dataContract.contract_end_at, "-")}</p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Penempatan</p>
                <p>{dataContract.placement || "-"}</p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Kantor Baru</p>
                <p>{dataContract.new_office || "-"}</p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Cuti Tahunan</p>
                <p>{dataContract.annual_leave || "-"} hari</p>
              </div>
              <div className="space-y-1 mb-3">
                <p className="mig-caption--medium text-mono80">
                  Tanggal Resign
                </p>
                <p>{momentFormatDate(dataContract.resign_at, "-")}</p>
              </div>
              {/* TODO: change benefit data */}
              <div className="mb-3">
                <p className="mig-heading--5 mb-2">BENEFIT PENERIMAAN</p>
                <div className="space-y-1 col-span-2">
                  <p className="mig-caption--medium text-mono80">Gaji Pokok</p>
                  {benefitObject?.main_salary ? (
                    <CurrencyFormat
                      displayType="text"
                      value={benefitObject?.main_salary}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"Rp"}
                      suffix={",00"}
                    />
                  ) : (
                    "-"
                  )}
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="mig-caption--medium text-mono80">
                    Tunjangan Uang Makan
                  </p>
                  <p>{benefitObject?.meal_allowance || "-"}</p>
                </div>
              </div>
              <div className="mb-3">
                <p className="mig-heading--5 mb-2">BENEFIT PENGURANGAN</p>
                <div className="space-y-1 col-span-2">
                  <p className="mig-caption--medium text-mono80">PPh 21</p>
                  <p>{benefitObject?.income_tax || "-"}</p>
                </div>
              </div>
            </div>
          </Collapse.Panel>
        ))}
      </Collapse>

      {/* Modal Delete Contract */}
      <AccessControl hasPermission={EMPLOYEE_CONTRACT_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDeleteContract}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"kontrak"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan kontrak&nbsp;
            <strong>{dataModalDelete.contractName}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </section>
  );
};

export default EmployeeContractDetail;
