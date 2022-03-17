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
 * Component AttendanceAdminListSection's props.
 */
export interface IAttendanceAdminListSection {}

/**
 * Component AttendanceAdminListSection
 */
export const AttendanceAdminListSection: FC<IAttendanceAdminListSection> = (
  props
) => {
  /** 1 -> Hadir, 2 -> Absen */
  const [activeTab, setActiveTab] = useState<"1" | "2">("1");
  const [isExportDrawerShown, setIsExportDrawerShown] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="mig-platform space-y-6">
        {/* Header: tabs, buttons, and search box */}
        <div className="flex items-center justify-between">
          <Tabs
            defaultActiveKey="1"
            className="w-1/3"
            onChange={(value) => setActiveTab(value as "1" | "2")}
          >
            <TabPane tab="Hadir" key="1" />
            <TabPane tab="Absen" key="2" />
          </Tabs>

          {/* Table's header */}
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
        <ConfigProvider
          renderEmpty={() => (
            <DataEmptyState caption="Data kehadiran kosong." />
          )}
        >
          {activeTab === "1" && <HadirTable />}
          {activeTab === "2" && <AbsenTable />}
        </ConfigProvider>
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
  const tableHadirColumns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        key: "id",
        title: "No.",
        // (currentPage - 1) * 10 + index + 1
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
    <Table
      columns={tableHadirColumns}
      dataSource={[]}
      pagination={tablePaginationConf}
      // scroll={{ x: 640 }}
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
  );
};

/**
 * @private
 */
const AbsenTable: FC = () => {
  const tableAbsenColumns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: "No.",
        // (currentPage - 1) * 10 + index + 1
        render: (_, __, index) => <>{++index}.</>,
      },
      {
        title: "Nama",
        sorter: true,
      },
      {
        title: "Jabatan",
        sorter: true,
      },
      {
        title: "Form Aktivitas",
        sorter: true,
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
    <Table
      columns={tableAbsenColumns}
      dataSource={[]}
      pagination={tablePaginationConf}
      // scroll={{ x: 640 }}
      className="tableTypeTask"
      onRow={() => {
        return {
          className: "hover:cursor-pointer",
        };
      }}
    />
  );
};
