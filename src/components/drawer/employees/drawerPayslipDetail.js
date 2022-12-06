import { UpOutlined } from "@ant-design/icons";
import { Collapse, Form, Input, Select, Spin, Table, notification } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { EMPLOYEE_PAYSLIP_GET } from "lib/features";

import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import { InputRequired } from "../../input";
import { Label } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerPayslipDetail = ({
  title,
  visible,
  onvisible,
  setRefresh,
  isAllowedToGetPayslip,
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

  // useEffect

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
          <p>25 hari</p>
        </div>
        <div className="flex flex-col">
          <p className="mig-caption--medium text-mono80">Tanggal Dibayarkan</p>
          <p>1 Oktober 2022</p>
        </div>
        <div className="flex flex-col col-span-2">
          <p className="mig-caption--medium text-mono80">Jumlah Diterima</p>
          <p>Rp5,250,000 (Lima Juta Dua Ratus Lima Puluh Ribu Rupiah)</p>
        </div>
        <hr className="col-span-2" />
        <Collapse
          className="col-span-2 bg-transparent"
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
                {
                  key: "3",
                  description: "Total Penerimaan",
                  receive: "5,997,600",
                },
              ]}
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
                {
                  key: "3",
                  description: "Total Pengurangan",
                  receive: "5,997,600",
                },
              ]}
            />
          </Collapse.Panel>
        </Collapse>
      </div>
    </DrawerCore>
  );
};

export default DrawerPayslipDetail;
