import { DeleteOutlined } from "@ant-design/icons";
import { Modal, notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

import { generateStaticAssetUrl, momentFormatDate } from "../../../lib/helper";

const ModalProjectLog = ({ visible, onvisible, dataLog }) => {
  const [dataTableLog, setDataTableLog] = useState([]);

  useEffect(() => {
    const dataLogNew = dataLog?.properties?.new;
    const dataLogOld = dataLog?.properties?.old;

    // Restructure log data from API response
    let dataTable = [];
    let dataLogName = dataLogNew || dataLogOld;
    if (dataLogName) {
      // add object of each log attribute to a list
      Object.entries(dataLogName)?.forEach((logData) => {
        let rowTable = {};
        rowTable.name = logData[0];
        dataTable.push(rowTable);
      });

      // add new value to table list
      if (dataLogNew) {
        Object.entries(dataLogNew)?.forEach((newData, idx) => {
          dataTable[idx].newValue = newData[1]?.toString();
        });
      } else {
        dataTable.forEach((logData, idx) => {
          dataTable[idx].newValue = "-";
        });
      }

      // add old value to table list
      if (dataLogOld) {
        Object.entries(dataLogOld)?.forEach((oldData, idx) => {
          dataTable[idx].oldValue = oldData[1]?.toString();
        });
      } else {
        dataTable.forEach((logData, idx) => {
          dataTable[idx].oldValue = "-";
        });
      }
    }

    dataTable?.forEach((data, idx) => {
      if (data.newValue == data.oldValue) {
        dataTable.splice(idx, 1);
      }
    });

    setDataTableLog(dataTable);
  }, [dataLog]);

  // console.log({ dataTableLog });

  return (
    <Modal
      title={<p className="mig-heading--4 text-mono30">Detail Log</p>}
      visible={visible}
      closable={true}
      onCancel={() => onvisible(false)}
      maskClosable={false}
      footer={false}
    >
      <div key={dataLog?.id} className="grid grid-cols-1 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <img
              src={generateStaticAssetUrl(
                dataLog?.causer?.profile_image?.link ??
                  "staging/Users/default_user.png"
              )}
              alt={"profile image"}
              className="w-8 h-8 bg-cover object-cover rounded-full"
            />
            <p className="truncate">
              <strong>{dataLog?.causer?.name}</strong> -{" "}
              {dataLog?.causer?.roles?.[0]?.name}
            </p>
          </div>
          <p className="text-right">
            {momentFormatDate(
              dataLog?.created_at,
              "-",
              "D MMM YYYY, HH:mm",
              true
            )}
          </p>
        </div>
        <table className="border rounded p-2 w-full">
          <thead>
            <tr className="grid grid-cols-3">
              <th className="p-2 border"></th>
              <th className="p-2 border">Lama</th>
              <th className="p-2 border">Baru</th>
            </tr>
          </thead>

          <tbody>
            {dataTableLog?.map((log) => (
              <tr key={log.name} className="grid grid-cols-3">
                <td className="p-2 font-bold border">{log?.name ?? "-"}</td>
                <td className="p-2 border">{log?.oldValue ?? "-"}</td>
                <td className="p-2 border">{log?.newValue ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default ModalProjectLog;
