import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { FC, useMemo, useState } from "react";

import ButtonSys from "components/button";
import { DataEmptyState } from "components/states/DataEmptyState";

import { getAntdTablePaginationConfig } from "lib/standard-config";

import { EksporAbsensiDrawer } from "../shared/EksporAbsensiDrawer";

const { TabPane } = Tabs;

/**
 * Component AttendanceAdminTable's props.
 */
export interface IAttendanceAdminTable {}

/**
 * Component AttendanceAdminTable
 */
export const AttendanceAdminTable: FC<IAttendanceAdminTable> = () => {
  const [isExportDrawerShown, setIsExportDrawerShown] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="mig-platform">
        {/* Header: tabs, buttons, and search box */}
        <div className="flex items-center justify-between">
          <Tabs
            defaultActiveKey="1"
            className="w-1/3"
            // onChange={setTabActiveKey}
          >
            <TabPane tab="Hadir" key="1" />
            <TabPane tab="Absen" key="2" />
          </Tabs>

          <div className="flex space-x-4 w-2/3 justify-end items-center">
            <ButtonSys
              type="default"
              onClick={() => setIsExportDrawerShown(true)}
            >
              <DownloadOutlined className="mr-2" />
              Unduh Tabel
            </ButtonSys>

            <Form
              layout="inline"
              onFinish={(values) => {
                setSearchValue(values.search);
              }}
            >
              <Form.Item name="search">
                <Input
                  placeholder="Cari..."
                  allowClear
                  onChange={(event) => {
                    if (
                      event.target.value.length === 0 ||
                      event.target.value === ""
                    ) {
                      setSearchValue("");
                    }
                  }}
                />
              </Form.Item>

              <Form.Item noStyle>
                <Button
                  htmlType="submit"
                  className="mig-button mig-button--solid-primary"
                  icon={<SearchOutlined />}
                >
                  Cari
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        {/* Actual table */}
        <HadirTable />
      </div>

      <EksporAbsensiDrawer
        exportAsAdmin
        visible={isExportDrawerShown}
        onClose={() => setIsExportDrawerShown(false)}
      />
    </>
  );
};

/**
 * @private
 */
const HadirTable: FC = () => {
  const tableHadirColumns = useMemo<ColumnsType<{}>>(() => {
    return [
      {
        key: "id",
        title: "No.",
        render: (_, __, index) => <>{++index}.</>,
      },
      {
        title: "Nama",
        sorter: true,
      },
      {
        title: "Kerja",
      },
      {
        title: "Waktu Check In",
        sorter: true,
      },
      {
        title: "Lokasi Check In",
      },
      {
        title: "Waktu Check Out",
      },
    ];
  }, []);

  const tablePaginationConf = useMemo(
    () => getAntdTablePaginationConfig(),
    [
      /**TODO */
    ]
  );

  return (
    <ConfigProvider
      renderEmpty={() => <DataEmptyState caption="Data kehadiran kosong." />}
    >
      <Table
        columns={tableHadirColumns}
        dataSource={[]}
        pagination={tablePaginationConf}
        // scroll={{ x: 240 }}
        className="tableTypeTask"
        onRow={() => {
          /**
           * TODO: redirect to detail page
           */
          return {
            className: "hover:cursor-pointer",
          };
        }}
      />
    </ConfigProvider>
  );
};
