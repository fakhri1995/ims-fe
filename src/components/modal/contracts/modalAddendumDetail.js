import { Modal, Spin, notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { CONTRACT_HISTORY_LOGS_GET } from "lib/features";

import { ContractService } from "apis/contract";

import { currency } from "../../../lib/helper";
import { ArrowNarrowRightIconSvg } from "../../icon";
import { getExtrasDetail } from "../../screen/contract/detail/ContractInfoSection";
import { ModalHapus2 } from "../modalCustom";

const addendumLogDetailLabel = {
  id: "ID History Kontrak",
  code_number: "Nomor Kontrak",
  title: "Judul Kontrak",
  client_id: "ID Klien",
  requester_id: "ID Requester",
  initial_date: "Tanggal Dibuat",
  start_date: "Tanggal Mulai",
  end_date: "Tanggal Selesai",
  extras: "Isian",
  services: "Service",
};

const ModalAddendumDetail = ({
  initProps,
  visible,
  onvisible,
  contractHistoryId,
  versionLabel,
  contractNumber,
}) => {
  // 1. Access Control
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetContractHistoryLogs = hasPermission(
    CONTRACT_HISTORY_LOGS_GET
  );

  // 2. Use State
  const [dataLogChanges, setDataLogChanges] = useState([]);

  // 3. Use Effect & Use Query
  // Get contract history logs
  const {
    data: dataContractHistoryLogs,
    isLoading: loadingDataContractHistoryLogs,
  } = useQuery(
    [CONTRACT_HISTORY_LOGS_GET, contractHistoryId],
    () =>
      ContractService.getContractHistoryLogs(
        initProps,
        isAllowedToGetContractHistoryLogs,
        contractHistoryId,
        visible
      ),
    {
      enabled: isAllowedToGetContractHistoryLogs,
      refetchOnMount: true,
      select: (response) => response.data.data?.[0],
    }
  );

  // Construct data to track changes in addendum
  useEffect(() => {
    const dataLogNew = dataContractHistoryLogs?.properties?.new;
    const dataLogOld = dataContractHistoryLogs?.properties?.old;

    // Restructure log data from API response
    let dataLogs = [];
    if (dataLogOld) {
      // add object of each log attribute to a list
      Object.entries(dataLogOld)?.forEach((logData) => {
        if (addendumLogDetailLabel[logData[0]]) {
          let rowTable = {};

          // add raw attribute name
          rowTable.name = logData[0];

          // add old value
          rowTable.oldValue = logData[1] || "-";

          dataLogs.push(rowTable);
        }
      });

      // add new value to table list
      if (dataLogNew) {
        dataLogs?.forEach((item, idx) => {
          // add new value
          dataLogs[idx].newValue = dataLogNew[item?.name] || "-";

          // map raw attribute name to be more readable for user
          dataLogs[idx].name = addendumLogDetailLabel[item?.name];
        });
      }
    }

    // Remove unchanged value
    dataLogs?.forEach((data, idx) => {
      // Handle extras
      if (data.name == "Isian") {
        let isExtrasSame = true;

        if (data?.oldValue?.length === data?.newValue?.length) {
          for (let item in data?.oldValue) {
            if (
              data?.oldValue?.[item]?.key != data?.newValue?.[item]?.key ||
              data?.oldValue?.[item]?.name != data?.newValue?.[item]?.name ||
              data?.oldValue?.[item]?.type != data?.newValue?.[item]?.type ||
              data?.oldValue?.[item]?.value?.toString() !=
                data?.newValue?.[item]?.value?.toString()
            ) {
              isExtrasSame = false;
              break;
            }
          }
        } else {
          isExtrasSame = false;
        }

        if (isExtrasSame) {
          dataLogs?.splice(idx, 1);
        }
      }

      // Handle services
      if (data?.name == "Service") {
        let isServiceSame = true;

        if (data?.oldValue?.length === data?.newValue?.length) {
          for (let item in data?.oldValue) {
            if (
              data?.oldValue?.[item]?.id != data?.newValue?.[item]?.id ||
              data?.oldValue?.[item]?.product_id !=
                data?.newValue?.[item]?.product_id ||
              data?.oldValue?.[item]?.pax != data?.newValue?.[item]?.pax ||
              data?.oldValue?.[item]?.price != data?.newValue?.[item]?.price ||
              data?.oldValue?.[item]?.unit != data?.newValue?.[item]?.unit ||
              data?.oldValue?.[item]?.subtotal !=
                data?.newValue?.[item]?.subtotal
            ) {
              isServiceSame = false;
              break;
            }
          }
        } else {
          isServiceSame = false;
        }

        if (isServiceSame) {
          dataLogs?.splice(idx, 1);
        }
      }

      // Handle attributes other than extras and services
      if (data?.newValue == data?.oldValue) {
        dataLogs?.splice(idx, 1);
      }
    });

    setDataLogChanges(dataLogs);
  }, [dataContractHistoryLogs]);

  return (
    <Modal
      width={600}
      title={
        <div className="flex space-x-2 mr-5">
          <p className="mig-heading--4 text-mono30">{contractNumber}</p>
          <p className="bg-backdrop text-primary100 px-2 py-1 rounded-md font-bold">
            {versionLabel}
          </p>
        </div>
      }
      visible={visible}
      closable={true}
      onCancel={() => onvisible(false)}
      footer={false}
    >
      <div>
        <Spin spinning={loadingDataContractHistoryLogs}>
          <div className="grid grid-cols-1 gap-6">
            {dataLogChanges.map((item) => {
              // get the biggest extras array length to be use as num of iteration
              let iterNum = 0;
              if (item?.name == "Isian" || item?.name == "Service") {
                iterNum = Math.max(
                  item?.oldValue?.length,
                  item?.newValue?.length
                );
              }

              return item?.name == "Isian" ? (
                // Extras attribute
                Array.from({ length: iterNum }, (_, idx) => (
                  <div key={idx} className="flex justify-between items-center ">
                    <div className="w-5/12 space-y-3">
                      <div key={idx} className=" text-mono50">
                        <h5 className="mig-caption--bold text-mono50">
                          {item?.oldValue?.[idx]?.name || `Isian ${idx + 1}`}
                        </h5>
                        {item?.oldValue?.[idx]?.value
                          ? getExtrasDetail(
                              item?.oldValue?.[idx]?.type,
                              item?.oldValue?.[idx]?.value
                            )
                          : "-"}
                      </div>
                    </div>

                    <div className="w-2/12 text-center">
                      <ArrowNarrowRightIconSvg color={"#35763B"} size={24} />
                    </div>

                    <div className="w-5/12 space-y-3">
                      <div key={idx} className="">
                        <h5 className="mig-caption--bold">
                          {item?.newValue?.[idx]?.name || `Isian ${idx + 1}`}
                        </h5>
                        {item?.newValue?.[idx]?.value
                          ? getExtrasDetail(
                              item?.newValue?.[idx]?.type,
                              item?.newValue?.[idx]?.value
                            )
                          : "-"}
                      </div>
                    </div>
                  </div>
                ))
              ) : item?.name == "Service" ? (
                // Service Attribute
                Array.from({ length: iterNum }, (_, idx) => (
                  <div key={idx} className="flex justify-between items-center ">
                    <div className="w-5/12 space-y-3">
                      <div key={idx} className=" text-mono50">
                        <h5 className="mig-caption--bold text-mono50">
                          {`Service ${idx + 1}`}
                        </h5>
                        {item?.oldValue?.[idx]?.product_id ? (
                          <div className="grid grid-cols-1 gap-2">
                            <p>
                              ID Produk: {item?.oldValue?.[idx]?.product_id}
                            </p>
                            <p>Pax: {item?.oldValue?.[idx]?.pax}</p>
                            <p>
                              Harga: {currency(item?.oldValue?.[idx]?.price)}/
                              {item?.oldValue?.[idx]?.unit}
                            </p>

                            <p>
                              Subtotal:{" "}
                              {currency(item?.oldValue?.[idx]?.subtotal)}
                            </p>
                          </div>
                        ) : (
                          <p>-</p>
                        )}
                      </div>
                    </div>

                    <div className="w-2/12 text-center">
                      <ArrowNarrowRightIconSvg color={"#35763B"} size={24} />
                    </div>

                    <div className="w-5/12 space-y-3">
                      <div key={idx} className="">
                        <h5 className="mig-caption--bold">
                          {`Service ${idx + 1}`}
                        </h5>
                        {item?.newValue?.[idx]?.product_id ? (
                          <div className="grid grid-cols-1 gap-2">
                            <p>
                              ID Produk: {item?.newValue?.[idx]?.product_id}
                            </p>
                            <p>Pax: {item?.newValue?.[idx]?.pax}</p>
                            <p>
                              Harga: {currency(item?.newValue?.[idx]?.price)}/
                              {item?.newValue?.[idx]?.unit}
                            </p>

                            <p>
                              Subtotal:{" "}
                              {currency(item?.newValue?.[idx]?.subtotal)}
                            </p>
                          </div>
                        ) : (
                          <p>-</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Attributes other than extras and service
                <div
                  key={item?.name}
                  className="flex justify-between items-center"
                >
                  <div className="w-5/12 text-mono50">
                    <p className="mig-caption--bold">{item?.name}</p>
                    <p>{item?.oldValue}</p>
                  </div>
                  <div className="w-2/12 text-center">
                    <ArrowNarrowRightIconSvg color={"#35763B"} size={24} />
                  </div>
                  <div className="w-5/12">
                    <p className="mig-caption--bold">{item?.name}</p>
                    <p>{item?.newValue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Spin>
      </div>
    </Modal>
  );
};

export default ModalAddendumDetail;
