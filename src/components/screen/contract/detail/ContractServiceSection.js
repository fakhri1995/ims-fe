import { PrinterOutlined, UpOutlined } from "@ant-design/icons";
import { Table, Tabs } from "antd";
import React, { useState } from "react";

import ButtonSys from "components/button";

import { FileTextIconSvg } from "../../../icon";

const ContractServiceSection = ({ dataServices, loading }) => {
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
            dataSource={dataServices}
            rowKey={(record) => record.key}
            loading={loading}
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
                dataIndex: ["product", "name"],
                render: (text) => <p className="">{text}</p>,
              },
              {
                title: "Pax",
                dataIndex: "pax",
              },
              {
                title: "Harga",
                dataIndex: "price",
                render: (text, record) => (
                  <p className="">
                    Rp {Number(text)?.toLocaleString("id-ID") || "-"}
                    <span className="text-mono50">
                      /{record?.unit?.toLowerCase()}
                    </span>
                  </p>
                ),
              },
              {
                title: "Subtotal",
                dataIndex: "subtotal",
                render: (text, record) => {
                  let tempSubtotal =
                    Number(record?.pax) * Number(record?.price);
                  return (
                    <p className="">
                      Rp{" "}
                      {Number(text || tempSubtotal)?.toLocaleString("id-ID") ||
                        "-"}
                    </p>
                  );
                },
              },
            ]}
          />
        </Tabs.TabPane>
      </Tabs>
    </section>
  );
};

export default ContractServiceSection;
