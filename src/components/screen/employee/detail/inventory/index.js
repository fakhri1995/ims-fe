import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  UpOutlined,
} from "@ant-design/icons";
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
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_INVENTORY_DELETE,
  EMPLOYEE_INVENTORY_GET,
} from "lib/features";

import {
  DownIconSvg,
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

const EmployeeInventoryDetail = ({
  initProps,
  employeeId,
  isAllowedToUpdateEmployeeInventory,
  isAllowedToDeleteEmployeeInventory,
  dataEmployee,
}) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployeeInventory = hasPermission(EMPLOYEE_INVENTORY_GET);

  const rt = useRouter();
  const queryClient = useQueryClient();

  // 1. USE STATE
  // Detail inventory
  const [loadingData, setLoadingData] = useState(false);
  const [dataInventory, setDataInventory] = useState({});

  // Delete inventory
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState({
    inventoryId: null,
    inventoryName: "",
  });
  // 2. USE EFFECT
  useEffect(() => {
    handleGetEmployeeInventory(dataEmployee?.inventories[0]?.id);
  }, [isAllowedToGetEmployeeInventory, dataEmployee]);

  // 3. EVENT HANDLER
  // 3.1. Get Employee Inventory Data
  const handleGetEmployeeInventory = (inventoryId) => {
    if (!isAllowedToGetEmployeeInventory) {
      permissionWarningNotification("Mendapatkan", "Data Inventaris Employee");
      setLoadingData(false);
      return;
    }

    if (inventoryId) {
      setLoadingData(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeInventory?id=${inventoryId}`,
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
            setDataInventory(res2.data);
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

  const handleDeleteInventory = () => {
    if (!isAllowedToDeleteEmployeeInventory) {
      permissionWarningNotification("Menghapus", "Inventaris Karyawan");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteEmployeeInventory?id=${dataModalDelete.inventoryId}&employee_id=${employeeId}`,
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
        queryClient.invalidateQueries(EMPLOYEE_GET);
        if (res2.success) {
          notification.success({
            message: res2.message,
            duration: 3,
          });
          setModalDelete(false);
        } else {
          notification.error({
            message: `Gagal menghapus inventaris karyawan. ${res2.response}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus inventaris karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  return (
    <section className="">
      {dataEmployee?.inventories?.length > 0 ? (
        <Collapse
          bordered={false}
          defaultActiveKey={dataEmployee?.inventories?.[0]?.id}
          expandIconPosition={"right"}
          expandIcon={({ isActive }) => (
            <UpOutlined rotate={isActive ? 180 : 0} />
          )}
          accordion={true}
          onChange={(inventoryId) => handleGetEmployeeInventory(inventoryId)}
          className={"bg-transparent"}
        >
          {dataEmployee?.inventories?.map((inventory, idx) => (
            <Collapse.Panel
              key={inventory?.id}
              header={
                <div className="flex flex-row space-x-3 items-center">
                  <p className="text-md font-bold">
                    {inventory.device_name || "-"}
                  </p>
                  <div className="space-x-1">
                    {isAllowedToUpdateEmployeeInventory && (
                      <button
                        className="bg-transparent hover:opacity-70"
                        onClick={(e) => {
                          e.stopPropagation();
                          rt.push(
                            `${employeeId}/editInventory?id=${inventory.id}`
                          );
                        }}
                      >
                        <EditIconSvg color={"#35763B"} size={20} />
                      </button>
                    )}
                    {isAllowedToDeleteEmployeeInventory && (
                      <button
                        className="bg-transparent hover:opacity-70"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDataModalDelete({
                            inventoryId: inventory.id,
                            inventoryName: inventory.device_name || "-",
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
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">ID</p>
                  <p>{dataInventory.id_number || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Referensi Inventaris
                  </p>
                  <p>{dataInventory.referance_invertory || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">Tipe</p>
                  <p>{dataInventory.device_type || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Nomor Serial
                  </p>
                  <p>{dataInventory.serial_number || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Tanggal Penyerahan
                  </p>
                  <p>{momentFormatDate(dataInventory.delivery_date, "-")}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Tanggal Pengembalian
                  </p>
                  <p>{momentFormatDate(dataInventory.return_date, "-")}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Penanggung Jawab Penyerahan
                  </p>
                  <p>{dataInventory.pic_delivery || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Penanggung Jawab Pengembalian
                  </p>
                  <p>{dataInventory.pic_return || "-"}</p>
                </div>
                <div className="space-y-1 mb-3">
                  <p className="mig-caption--medium text-mono80">
                    Dokumen Penyerahan
                  </p>
                  {dataInventory.delivery_file?.link ? (
                    <div className="flex space-x-2 items-center">
                      <FileTextIconSvg size={48} color={"black"} />
                      <a
                        href={generateStaticAssetUrl(
                          dataInventory.delivery_file?.link
                        )}
                        target="_blank"
                        className="text-secondary100"
                      >
                        {getFileName(dataInventory.delivery_file?.link)}
                      </a>
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="space-y-1 mb-3">
                  <p className="mig-caption--medium text-mono80">
                    Dokumen Pengembalian
                  </p>
                  {dataInventory.return_file?.link ? (
                    <div className="flex space-x-2 items-center">
                      <FileTextIconSvg size={48} color={"black"} />
                      <a
                        href={generateStaticAssetUrl(
                          dataInventory.return_file?.link
                        )}
                        target="_blank"
                        className="text-secondary100"
                      >
                        {getFileName(dataInventory.return_file?.link)}
                      </a>
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </Collapse.Panel>
          ))}
        </Collapse>
      ) : (
        <p>Tidak ada inventaris & piranti pada {dataEmployee?.name}</p>
      )}

      {/* Modal Delete Inventory */}
      <AccessControl hasPermission={EMPLOYEE_INVENTORY_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDeleteInventory}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"inventaris"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan inventaris&nbsp;
            <strong>{dataModalDelete.inventoryName}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </section>
  );
};

export default EmployeeInventoryDetail;
