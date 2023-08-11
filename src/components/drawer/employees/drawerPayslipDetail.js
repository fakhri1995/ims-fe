import { UpOutlined } from "@ant-design/icons";
import { Collapse, Form, Input, Select, Spin, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import convertTerbilang from "terbilang-ts";

import { useAccessControl } from "contexts/access-control";

import { momentFormatDate } from "../../../lib/helper";
import { defaultSalaryVar } from "../../modal/payslips/modalSalaryVarAdd";
import DrawerCore from "../drawerCore";

const DrawerPayslipDetail = ({
  initProps,
  visible,
  onvisible,
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
    show_all_benefits: false,
  });
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailReceive, setDetailReceive] = useState([]);
  const [detailReduction, setDetailReduction] = useState([]);

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
            const payslipDetail = response2.data;

            const defaultReductionBenefits = defaultSalaryVar
              ?.filter((v) => payslipDetail[v.attrName] !== null)
              ?.map((v) => ({
                key: v.attrName,
                column: { name: v.title },
                value: payslipDetail[v.attrName],
              }));

            // Add value to receivement benefit
            const receiveBenefits = [
              {
                key: "Gaji Pokok",
                column: { name: "Gaji Pokok" },
                value: payslipDetail?.gaji_pokok,
              },
            ];

            if (payslipDetail?.show_all_benefit) {
              receiveBenefits = receiveBenefits.concat(
                defaultReductionBenefits
              );
            }
            const additionalReceiveBenefits = payslipDetail?.salaries
              ?.filter((benefit) => benefit?.column?.type === 1)
              ?.map((v) => ({ ...v, key: v.column?.name }));

            receiveBenefits = receiveBenefits.concat(additionalReceiveBenefits);

            // Add value to reduction benefit
            const additionalReductionBenefits = payslipDetail?.salaries
              ?.filter((benefit) => benefit?.column?.type === 2)
              ?.map((v) => ({ ...v, key: v.column?.name }));

            const reductionBenefits = defaultReductionBenefits.concat(
              additionalReductionBenefits
            );

            setDetailPayslip(payslipDetail);
            setDetailReceive(receiveBenefits);
            setDetailReduction(reductionBenefits);
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
      title={`Slip Gaji ${momentFormatDate(
        detailPayslip.tanggal_dibayarkan,
        "-",
        "MMMM YYYY"
      )}`}
      visible={visible}
      onClose={() => onvisible(false)}
    >
      {loadingDetail ? (
        <>
          <Spin />
        </>
      ) : (
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          <div className="flex flex-col">
            <p className="mig-caption--medium text-mono80">Total Hari Kerja</p>
            <p>{detailPayslip?.total_hari_kerja || "-"}</p>
          </div>
          <div className="flex flex-col">
            <p className="mig-caption--medium text-mono80">
              Tanggal Dibayarkan
            </p>
            <p>{momentFormatDate(detailPayslip?.tanggal_dibayarkan, "-")}</p>
          </div>
          <div className="flex flex-col col-span-2">
            <p className="mig-caption--medium text-mono80">Jumlah Diterima</p>
            <div className="flex flex-row">
              <p>
                Rp{detailPayslip?.take_home_pay.toLocaleString("id-ID")} (
                {convertTerbilang(detailPayslip?.take_home_pay) || "Nol"}{" "}
                Rupiah)
              </p>
            </div>
          </div>
          <hr className="col-span-2" />
          <Collapse
            className="col-span-2 bg-transparent "
            bordered={false}
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
              <UpOutlined rev={""} rotate={isActive ? 180 : 0} />
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
                className="border-2 rounded-md"
                pagination={false}
                size={"small"}
                tableLayout="fixed"
                columns={[
                  {
                    title: "DESKRIPSI",
                    dataIndex: "name",
                    render: (text, record) => <p>{record?.column?.name}</p>,
                  },
                  {
                    title: "PENERIMAAN (IDR)",
                    dataIndex: "value",
                    render: (text) => (
                      <p className="font-bold text-right">
                        {Number(text)?.toLocaleString("id-ID") || "-"}
                      </p>
                    ),
                  },
                ]}
                dataSource={detailReceive}
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
                        {detailPayslip?.total_gross_penerimaan?.toLocaleString(
                          "id-ID"
                        )}
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
                className="border-2 rounded-md"
                pagination={false}
                size={"small"}
                tableLayout="fixed"
                columns={[
                  {
                    title: "DESKRIPSI",
                    dataIndex: "name",
                    render: (text, record) => <p>{record?.column?.name}</p>,
                  },
                  {
                    title: "PENGURANGAN (IDR)",
                    dataIndex: "value",
                    render: (text) => (
                      <p className="font-bold text-right">
                        {Number(text)?.toLocaleString("id-ID") || "-"}
                      </p>
                    ),
                  },
                ]}
                dataSource={detailReduction}
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
                        {detailPayslip?.total_gross_pengurangan?.toLocaleString(
                          "id-ID"
                        )}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                )}
              />
            </Collapse.Panel>
          </Collapse>
        </div>
      )}
    </DrawerCore>
  );
};

export default DrawerPayslipDetail;
