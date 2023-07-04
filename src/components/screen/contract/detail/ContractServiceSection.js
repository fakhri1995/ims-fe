import { PrinterOutlined, UpOutlined } from "@ant-design/icons";
import { Table, Tabs } from "antd";
import React, { useState } from "react";

import ButtonSys from "components/button";

import { FileTextIconSvg } from "../../../icon";

const ContractServiceSection = () => {
  const dataSource = [
    {
      key: "1",
      service: "PC",
      type: "Hardware",
      pax: 5,
      price: "500000",
      subtotal: "10000000",
    },
    {
      key: "2",
      service: "ATM",
      type: "Hardware",
      pax: 3,
      price: "400000",
      subtotal: "2400000",
    },
  ];

  return (
    <section className="grid shadow-md rounded-md bg-white p-6 mb-4 gap-6">
      <h4 className="mig-heading--4">Daftar Service</h4>
      <Tabs>
        <Tabs.TabPane tab="Service">
          <Table
            className="tableBordered border-2 rounded-md"
            dataSource={dataSource}
            rowKey={(record) => record.id}
            // loading={loading}
            scroll={{ x: 200 }}
            pagination={{
              // current: queryParams.page,
              // pageSize: queryParams.rows,
              // total: total,
              showSizeChanger: true,
            }}
            columns={[
              {
                title: "No",
                dataIndex: "no",
                render: (text, record, index) => <p>{index + 1}</p>,
              },
              {
                title: "Service",
                dataIndex: "service",
                render: (text, record) => (
                  <p className="">
                    {text} <span>{record?.type}</span>
                  </p>
                ),
              },
              {
                title: "Pax",
                dataIndex: "pax",
              },
              {
                title: "Harga",
                dataIndex: "price",
                render: (text) => (
                  <p className="">
                    Rp {Number(text)?.toLocaleString("id-ID") || "-"}/bulan
                  </p>
                ),
              },
              {
                title: "Subtotal",
                dataIndex: "subtotal",
                render: (text) => (
                  <p className="">
                    Rp {Number(text)?.toLocaleString("id-ID") || "-"}
                  </p>
                ),
              },
            ]}
          />
        </Tabs.TabPane>
      </Tabs>
    </section>
  );
};

export default ContractServiceSection;
