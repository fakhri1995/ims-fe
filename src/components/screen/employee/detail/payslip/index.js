import { DownloadOutlined, UpOutlined } from "@ant-design/icons";
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
import React, { useEffect } from "react";
import { useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_PAYSLIPS_GET,
  EMPLOYEE_PAYSLIP_DOWNLOAD,
  EMPLOYEE_PAYSLIP_GET,
} from "lib/features";

import {
  DownloadIconSvg,
  EditIconSvg,
  UploadIconSvg,
} from "../../../../../components/icon";
import {
  beforeUploadFileMaxSize,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import { ModalDownloadPayslip } from "../../../../modal/modalCustom";

const EmployeePayslipDetail = ({ initProps, employeeId }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployeePayslips = hasPermission(EMPLOYEE_PAYSLIPS_GET);
  const isAllowedToGetEmployeePayslip = hasPermission(EMPLOYEE_PAYSLIP_GET);
  const isAllowedToDownloadPayslip = hasPermission(EMPLOYEE_PAYSLIP_DOWNLOAD);

  const [instanceForm] = Form.useForm();
  const rt = useRouter();

  // Array of 12 month names
  const monthNames = moment.months();

  // 1. USE STATE
  // Display data payslip
  const [loadingData, setLoadingData] = useState(false);
  const [dataPayslips, setDataPayslips] = useState([]);
  const [dataPayslip, setDataPayslip] = useState({});

  const [modalDownload, setModalDownload] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [downloadPass, setDownloadPass] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");

  // 2. USE EFFECT
  // useEffect(() => {
  //   handleGetEmployeePayslip(dataPayslips?.contracts[0]?.id);
  // }, [isAllowedToGetEmployeePayslips, dataPayslips]);

  useEffect(() => {
    if (!isAllowedToGetEmployeePayslips) {
      permissionWarningNotification("Mendapatkan", "Employee Payslips");
      setLoadingData(false);
      return;
    }

    if (employeeId) {
      setLoadingData(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeePayslips?employee_id=${employeeId}`,
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
            setDataPayslips(res2.data.data);
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err}`,
            duration: 3,
          });
        })
        .finally(() => {
          setLoadingData(false);
        });
    }
  }, [isAllowedToGetEmployeePayslips, employeeId]);

  // 3. EVENT HANDLER
  const handleDownloadPayslip = (idPayslip) => {
    if (!isAllowedToDownloadPayslip) {
      permissionWarningNotification("Mengunduh", "Slip Gaji");
      return;
    }
    setLoadingDownload(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/downloadEmployeePayslip?id=${idPayslip}`,
      {
        method: "GET",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: `Slip gaji berhasil diunduh.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal mengunduh slip gaji. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengunduh slip gaji. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDownload(false);
      });
  };

  return (
    <section>
      <Collapse
        bordered={false}
        defaultActiveKey={dataPayslips?.[0]?.id}
        expandIconPosition={"right"}
        expandIcon={({ isActive }) => (
          <UpOutlined rotate={isActive ? 180 : 0} />
        )}
        accordion={true}
      >
        {dataPayslips?.map((payslip) => (
          <Collapse.Panel
            key={payslip?.id}
            header={
              <div className="flex flex-row space-x-3 items-center">
                <p className="text-sm font-bold">
                  {monthNames[payslip?.month - 1]} {payslip?.year}
                </p>
                <Tag
                  color="#35763B1A"
                  className="text-primary100 px-4 py-1 rounded-md"
                >
                  Diterbitkan
                </Tag>
              </div>
            }
          >
            <div className="flex flex-row justify-between items-center">
              <div className="grid grid-cols-2">
                <div className="space-y-1">
                  <p className="mig-caption--medium text-mono80">
                    Total Hari Kerja
                  </p>
                  <p>{payslip?.total_hari_kerja} hari</p>
                </div>
                <div className="space-y-1">
                  <p className="mig-caption--medium text-mono80">
                    Tanggal Dibayarkan
                  </p>
                  <p>{momentFormatDate(payslip?.tanggal_dibayarkan)}</p>
                </div>
              </div>
              <ButtonSys
                type={"default"}
                onClick={() => handleDownloadPayslip(payslip?.id)}
                disabled={!isAllowedToDownloadPayslip || loadingDownload}
                //   () => {
                //   setCurrentMonth(
                //     `${monthNames[payslip?.month - 1]} ${payslip?.year}`
                //   );
                //   setDataPayslip(payslip);
                //   setModalDownload(true);
                // }
              >
                <DownloadOutlined />
                <p className="ml-2">Unduh Slip Gaji</p>
              </ButtonSys>
            </div>
          </Collapse.Panel>
        ))}
      </Collapse>

      {/* Modal Download Payslip */}
      {/* <AccessControl hasPermission={EMPLOYEE_PAYSLIP_DOWNLOAD}>
        <ModalDownloadPayslip
          visible={modalDownload}
          onvisible={setModalDownload}
          onOk={handleDownloadPayslip}
          loading={loadingDownload}
          disabled={!isAllowedToGetEmployeePayslip}
          downloadPass={downloadPass}
          setDownloadPass={setDownloadPass}
          instanceForm={instanceForm}
          monthOfPayslip={currentMonth}
        />
      </AccessControl> */}
    </section>
  );
};

export default EmployeePayslipDetail;
