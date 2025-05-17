import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker, Empty, Input, Select, Spin, Tree } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import InfiniteScroll from "react-infinite-scroll-component";

import { permissionWarningNotification } from "../../../../lib/helper";
import {
  CircleXIconSvg,
  LocationIconSvg,
  MappinIconSvg,
  SearchIconSvg,
} from "../../../icon";
import { H1, H2, Label, Text } from "../../../typography";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const ActivityCompany = ({
  praloadingedit,
  logs,
  fetchDataMoreLogs,
  hasmore,
}) => {
  return (
    <div className="md:w-6/12 flex flex-col shadow-md rounded-md bg-white p-8 mx-6 md:mx-0">
      <div className="mb-8">
        <H1>Aktivitas</H1>
      </div>
      <div className="h-screen overflow-auto">
        {praloadingedit ? (
          <>
            <Spin />
          </>
        ) : logs.length === 0 ? (
          <>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </>
        ) : (
          <InfiniteScroll
            dataLength={logs.length}
            next={fetchDataMoreLogs}
            hasMore={hasmore}
            loader={
              <>
                <Spin />
              </>
            }
            endMessage={
              <div className="flex justify-center text-center">
                <Label>Sudah Semua</Label>
              </div>
            }
          >
            {logs.map((doc, idx) => {
              var tanggalan =
                (new Date() - new Date(doc.created_at)) / (1000 * 60 * 60 * 24);
              var aksi = "";
              const type = doc.subjectable_type.split("\\");
              if (type[1] === "Company") {
                if (doc.log_name === "Created") {
                  return (
                    <div className="flex flex-col mb-5">
                      <p className="mb-0">
                        {doc.causer.name} <strong>menambahkan</strong> lokasi{" "}
                        <strong>{doc.subjectable.name}</strong>
                      </p>
                      <Label>
                        {tanggalan < 1
                          ? `Hari ini, ${moment(doc.created_at)
                              .locale("id")
                              .format(`LT`)}`
                          : `${moment(doc.created_at)
                              .locale("id")
                              .format("dddd")} ${moment(doc.created_at)
                              .locale("id")
                              .format("LL")}, ${moment(doc.created_at)
                              .locale("id")
                              .format(`LT`)}`}
                      </Label>
                    </div>
                  );
                }
                if (doc.log_name === "Updated") {
                  return (
                    <div className="flex flex-col mb-5">
                      <p className="mb-0">
                        {doc.causer.name} <strong>mengubah</strong> informasi
                        profil perusahaan
                      </p>
                      <Label>
                        {tanggalan < 1
                          ? `Hari ini, ${moment(doc.created_at)
                              .locale("id")
                              .format(`LT`)}`
                          : `${moment(doc.created_at)
                              .locale("id")
                              .format("dddd")} ${moment(doc.created_at)
                              .locale("id")
                              .format("LL")}, ${moment(doc.created_at)
                              .locale("id")
                              .format(`LT`)}`}
                      </Label>
                    </div>
                  );
                }
              } else if (type[1] === "Bank") {
                if (doc.log_name === "Created") {
                  return (
                    <div className="flex flex-col mb-5">
                      <p className="mb-0">
                        {doc.causer.name} <strong>menambahkan</strong> akun{" "}
                        <strong>{doc.subjectable.name}</strong>
                      </p>
                      <Label>
                        {tanggalan < 1
                          ? `Hari ini, ${moment(doc.created_at)
                              .locale("id")
                              .format(`LT`)}`
                          : `${moment(doc.created_at)
                              .locale("id")
                              .format("dddd")} ${moment(doc.created_at)
                              .locale("id")
                              .format("LL")}, ${moment(doc.created_at)
                              .locale("id")
                              .format(`LT`)}`}
                      </Label>
                    </div>
                  );
                } else if (doc.log_name === "Updated") {
                  return (
                    <div className="flex flex-col mb-5">
                      <p className="mb-0">
                        {doc.causer.name} <strong>mengubah</strong> informasi
                        akun <strong>{doc.subjectable.name}</strong>
                      </p>
                      <Label>
                        {tanggalan < 1
                          ? `Hari ini, ${moment(doc.created_at)
                              .locale("id")
                              .format(`LT`)}`
                          : `${moment(doc.created_at)
                              .locale("id")
                              .format("dddd")} ${moment(doc.created_at)
                              .locale("id")
                              .format("LL")}, ${moment(doc.created_at)
                              .locale("id")
                              .format(`LT`)}`}
                      </Label>
                    </div>
                  );
                } else if (doc.log_name === "Deleted") {
                  return (
                    <div className="flex flex-col mb-5">
                      <p className="mb-0">
                        {doc.causer.name} <strong>menghapus</strong> akun{" "}
                        <strong>{doc.subjectable.name}</strong>
                      </p>
                      <Label>
                        {tanggalan < 1
                          ? `Hari ini, ${moment(doc.created_at)
                              .locale("id")
                              .format(`LT`)}`
                          : `${moment(doc.created_at)
                              .locale("id")
                              .format("dddd")} ${moment(doc.created_at)
                              .locale("id")
                              .format("LL")}, ${moment(doc.created_at)
                              .locale("id")
                              .format(`LT`)}`}
                      </Label>
                    </div>
                  );
                }
              }
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default ActivityCompany;
