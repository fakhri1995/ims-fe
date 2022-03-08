import { AppstoreAddOutlined, DownloadOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import type { FC } from "react";

import ButtonSys from "components/button";

const { TabPane } = Tabs;

/**
 * Component AttendanceStaffAktivitasSection's props.
 */
export interface IAttendanceStaffAktivitasSection {}

/**
 * Component AttendanceStaffAktivitasSection
 */
export const AttendanceStaffAktivitasSection: FC<
  IAttendanceStaffAktivitasSection
> = (props) => {
  return (
    <section className="mig-platform space-y-6">
      <h3 className="mig-heading--4">Aktivitas</h3>

      <div className="flex items-center justify-between">
        <Tabs
          defaultActiveKey="1"
          className="w-1/2"
          onChange={(activeKey) => console.log(activeKey)}
        >
          <TabPane tab="Hari Ini" key="1" />
          <TabPane tab="Riwayat" key="2" />
        </Tabs>

        <div className="flex space-x-6 w-1/2 justify-end items-center">
          <ButtonSys
            type="default"
            onClick={() => {
              alert("Button Unduh Tabel clicked");
            }}
          >
            <DownloadOutlined className="mr-2" />
            Unduh Tabel
          </ButtonSys>

          <ButtonSys
            type="primary"
            onClick={() => {
              alert("Button Masukkan Aktivitas Clicked");
            }}
          >
            <AppstoreAddOutlined className="mr-2" />
            Masukkan Aktivitas
          </ButtonSys>
        </div>
      </div>
    </section>
  );
};
