import { UpOutlined } from "@ant-design/icons";
import { Collapse, Form, Input, Select, Spin, Table, notification } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

import { useAccessControl } from "contexts/access-control";

import { EMPLOYEE_PAYSLIP_GET } from "lib/features";

import { momentFormatDate } from "../../../lib/helper";
import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import { InputRequired } from "../../input";
import { Label } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerPayslipDetail = ({
  initProps,
  title,
  visible,
  onvisible,
  setRefresh,
  isAllowedToGetPayslip,
  payslipId,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const [instanceForm] = Form.useForm();

  // useState
  const [detailPayslip, setDetailPayslip] = useState({
    employee_id: -1,
    id: -1,
    is_posted: -1,
    take_home_pay: 0,
    tanggal_dibayarkan: "",
    total_gross_penerimaan: 0,
    total_gross_pengurangan: 0,
    total_hari_kerja: 0,
  });
  const [loadingDetail, setLoadingDetail] = useState(false);

  // 2. useEffect
  // 2.1 Get employee payslip detail
  useEffect(() => {
    if (!isAllowedToGetPayslip) {
      permissionWarningNotification("Mendapatkan", "Detail Slip Gaji Karyawan");
      setLoadingDetail(false);
      return;
    }

    if (visible) {
      setLoadingDetail(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeePayslip?id=${payslipId}`,
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
            setDetailPayslip(response2.data);
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
        .finally(() => setLoadingDetail(false));
    }
  }, [isAllowedToGetPayslip, payslipId, visible]);

  // console.log(dataCandidate);
  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => onvisible(false)}
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <div className="flex flex-col">
          <p className="mig-caption--medium text-mono80">Total Hari Kerja</p>
          <p>{detailPayslip?.total_hari_kerja}</p>
        </div>
        <div className="flex flex-col">
          <p className="mig-caption--medium text-mono80">Tanggal Dibayarkan</p>
          <p>{momentFormatDate(detailPayslip?.tanggal_dibayarkan, "-")}</p>
        </div>
        <div className="flex flex-col col-span-2">
          <p className="mig-caption--medium text-mono80">Jumlah Diterima</p>
          <div className="flex flex-row">
            <CurrencyFormat
              displayType="text"
              value={detailPayslip?.take_home_pay}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp"}
              suffix={",00"}
            />
            <p>&nbsp;(Lima Juta Dua Ratus Lima Puluh Ribu Rupiah)</p>
          </div>
        </div>
        <hr className="col-span-2" />
        <Collapse
          className="col-span-2 bg-transparent "
          bordered={false}
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <UpOutlined rotate={isActive ? 180 : 0} />
          )}
          defaultActiveKey={["1", "2"]}
        >
          <Collapse.Panel
            key={"1"}
            header={
              <p className="text-sm font-bold text-primary100">
                Detail Penerimaan
              </p>
            }
          >
            <Table
              // bordered={true}
              className="border-2 rounded-md"
              pagination={false}
              size={"small"}
              columns={[
                {
                  title: "DESKRIPSI",
                  dataIndex: "description",
                },
                {
                  title: "PENERIMAAN (IDR)",
                  dataIndex: "receive",
                  render: (text) => (
                    <p className="font-bold text-right">{text}</p>
                  ),
                },
              ]}
              dataSource={[
                {
                  key: "1",
                  description: "Gaji Pokok",
                  receive: "3,500,000",
                },
                {
                  key: "2",
                  description: "Tunjangan Uang Makan",
                  receive: "550,000",
                },
              ]}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} className="font-bold">
                      Total Penerimaan
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={1}
                      className="font-bold text-right"
                    >
                      <CurrencyFormat
                        displayType="text"
                        value={detailPayslip?.total_gross_penerimaan}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                      />
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Collapse.Panel>
          <Collapse.Panel
            key={"2"}
            header={
              <p className="text-sm font-bold text-primary100">
                Detail Pengurangan
              </p>
            }
          >
            <Table
              // bordered={true}
              className="border-2 rounded-md"
              pagination={false}
              size={"small"}
              columns={[
                {
                  title: "DESKRIPSI",
                  dataIndex: "description",
                },
                {
                  title: "PENGURANGAN (IDR)",
                  dataIndex: "receive",
                  render: (text) => (
                    <p className="font-bold text-right">{text}</p>
                  ),
                },
              ]}
              dataSource={[
                {
                  key: "1",
                  description: "Gaji Pokok",
                  receive: "3,500,000",
                },
                {
                  key: "2",
                  description: "Tunjangan Uang Makan",
                  receive: "550,000",
                },
              ]}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} className="font-bold">
                      Total Pengurangan
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={1}
                      className="font-bold text-right"
                    >
                      <CurrencyFormat
                        displayType="text"
                        value={detailPayslip?.total_gross_pengurangan}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                      />
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Collapse.Panel>
        </Collapse>
      </div>
    </DrawerCore>
  );
};

export default DrawerPayslipDetail;
