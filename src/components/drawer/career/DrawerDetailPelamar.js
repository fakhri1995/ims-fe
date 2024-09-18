import {
  Button,
  Checkbox,
  Drawer,
  Empty,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  notification,
} from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { RECRUITMENT_JALUR_DAFTARS_LIST_GET } from "lib/features";

import ButtonSys from "../../button";
import {
  AlignJustifiedIconSvg,
  CheckIconSvg,
  CheckboxIconSvg,
  CircleXIconSvg,
  CloseIconSvg,
  CopyIconSvg,
  DownloadIcon2Svg,
  ListNumbersSvg,
  TrashIconSvg,
  UploadIconSvg,
  UserPlusIconSvg,
} from "../../icon";
import { ModalUbah } from "../../modal/modalCustom";
import { H2, Label } from "../../typography";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const DrawerDetailPelamar = ({
  dataUpdateStatus,
  setDataUpdateStatus,
  drawDetailPelamar,
  setDrawDetailPelamar,
  dataTerpilih,
  dataStatusApply,
  modalUpdateStatusNew,
  handleUpdateStatusNew,
  loadingUpdateNew,
  disableUpdateNew,
  setModalUpdateStatusNew,
  handleClickExportPelamar,
  exportRejectPelamar,
}) => {
  /**
   * Dependencies
   */

  const downloadNoData = () => {
    notification.error({
      message: `Pelamar tidak punya file resume`,
      duration: 3,
    });
  };

  return (
    <Drawer
      title={`Informasi Pelamar`}
      maskClosable={false}
      visible={drawDetailPelamar}
      onClose={() => {
        setDrawDetailPelamar(false);
      }}
      width={731}
      destroyOnClose={true}
    >
      <div
        className={
          "flex flex-col gap-4 mt-4 border border-[#F3F3F3] rounded-[6px] p-4"
        }
      >
        <div className={"flex flex-row items-center gap-2"}>
          <p className={"text-xs font-medium leading-5 text-mono50"}>Status:</p>
          <select
            value={dataTerpilih?.status?.id}
            className="rounded-md py-1 hover:cursor-pointer bg-bgstatuscareer2 px-2 customcareerselectstatus"
            onClick={(e) => e.stopPropagation()}
            onChange={(event) => {
              setDataUpdateStatus({
                ...dataUpdateStatus,
                id: dataTerpilih?.id,
                name: dataTerpilih?.name,
                prev_recruitment_status_name: dataTerpilih?.status.name,
                recruitment_status_name: event.target.selectedOptions[0].text,
                recruitment_status_id: Number(event.target.value),
              });
              setDrawDetailPelamar(false);
              setModalUpdateStatusNew(true);
            }}
            style={{
              backgroundColor:
                dataTerpilih?.status?.id == 1
                  ? "#4D4D4D1A"
                  : dataTerpilih?.status?.id == 2
                  ? "#35763B"
                  : "#BF4A40",
              color: dataTerpilih?.status?.id != 1 ? "white" : "#4D4D4D",
            }}
          >
            {dataStatusApply.map((status) => (
              <option
                key={status.id}
                value={status.id}
                style={{
                  backgroundColor:
                    status.id == 1
                      ? "#4D4D4D1A"
                      : status?.id == 2
                      ? "#35763B"
                      : "#BF4A40",
                  color: status.id != 1 ? "white" : "#4D4D4D",
                }}
              >
                {status?.name}
              </option>
            ))}
          </select>
        </div>
        <div className={"flex flex-row"}>
          <div className={"flex flex-col gap-2.5 w-1/2"}>
            <p className={"text-xs font-medium leading-5 text-mono50"}>
              Nama Pelamar
            </p>
            <p className={"text-sm text-mono30 font-medium leading-5"}>
              {dataTerpilih ? dataTerpilih?.name : "-"}
            </p>
          </div>
          <div className={"flex flex-col gap-2.5 w-1/2"}>
            <p className={"text-xs font-medium leading-5 text-mono50"}>
              Tanggal Melamar
            </p>
            <p className={"text-sm text-mono30 font-medium leading-5"}>
              {dataTerpilih
                ? moment(dataTerpilih.created_at).format("DD MMMM YYYY")
                : "-"}
            </p>
          </div>
        </div>
        <div className={"flex flex-row"}>
          <div className={"flex flex-col gap-2.5 w-1/2"}>
            <p className={"text-xs font-medium leading-5 text-mono50"}>
              Nomor Ponsel
            </p>
            <p className={"text-sm text-mono30 font-medium leading-5"}>
              {dataTerpilih ? dataTerpilih?.phone : "-"}
            </p>
          </div>
          <div className={"flex flex-col gap-2.5 w-1/2"}>
            <p className={"text-xs font-medium leading-5 text-mono50"}>
              Email Pelamar
            </p>
            <p className={"text-sm text-mono30 font-medium leading-5"}>
              {dataTerpilih ? dataTerpilih?.email : "-"}
            </p>
          </div>
        </div>

        {dataTerpilih?.status?.id == 1 && (
          <div className={"flex gap-4"}>
            <div
              onClick={() => handleClickExportPelamar(dataTerpilih, "terpilih")}
              className={
                "flex gap-2 items-center justify-center w-[143px] h-6 bg-[#F4FAF5] rounded hover:cursor-pointer"
              }
            >
              <UserPlusIconSvg size={14} color={"#35763B"} />
              <p className={"text-[#35763B] text-xs leading-4 font-bold"}>
                Export Pelamar
              </p>
            </div>
            <div
              onClick={() => exportRejectPelamar(dataTerpilih, "reject")}
              className={
                "flex gap-2 items-center justify-center w-[143px] h-6 bg-[#BF4A40] bg-opacity-20 rounded hover:cursor-pointer"
              }
            >
              <CloseIconSvg size={14} color={"#BF4A40"} />
              <p className={"text-[#BF4A40] text-xs leading-4 font-bold"}>
                Reject
              </p>
            </div>
          </div>
        )}
        {dataTerpilih?.status?.id == 2 && (
          <div
            className={
              "flex gap-2 justify-center items-center rounded-[3px] bg-[#35763B] h-[28px] py-1.5"
            }
          >
            <CheckIconSvg color={"#ffffff"} size={16} />
            <p className={"text-white text-xs leading-4 font-bold"}>
              Pelamar ini Sudah Diekspor
            </p>
          </div>
        )}
        {dataTerpilih?.status?.id == 3 && (
          <div
            className={
              "flex gap-2 justify-center items-center rounded-[3px] bg-[#BF4A40] h-[28px] py-1.5"
            }
          >
            <CloseIconSvg />
            <p className={"text-white text-xs leading-4 font-bold"}>
              Pelamar ini Sudah Tersisihkan
            </p>
          </div>
        )}
      </div>
      <div className={"mt-6 border border-solid border-[#f0f0f0] -mx-6"}></div>
      <div className={"mt-6"}>
        <p className={"text-[#4D4D4D] text-[14px] leading-6 font-bold"}>
          Resume Pelamar
        </p>
      </div>
      <div className={"mt-4"}>
        {dataTerpilih && dataTerpilih.resume ? (
          <object
            class="pdf"
            data={"https://cdn.mig.id/" + dataTerpilih.resume.link}
            width="100%"
            height="500"
          ></object>
        ) : (
          <ButtonSys
            onClick={() => downloadNoData()}
            fullWidth={true}
            type={"primary"}
            // onClick={() => rt.push('/admin/candidates/pdfTemplate')}
          >
            <div className={"flex flex-row"}>
              <DownloadIcon2Svg size={16} color={"#fffffff"} />
              <p className={"ml-2 text-xs text-white"}>Unduh CV Pelamar</p>
            </div>
          </ButtonSys>
        )}
      </div>

      {dataTerpilih && dataTerpilih.question != null && (
        <div>
          <div
            className={"mt-6 border border-solid border-[#f0f0f0] -mx-6"}
          ></div>
          <p className={"text-mono30 text-lg leading-6 font-bold mt-6"}>
            Jawaban Pertanyaan Tambahan
          </p>
          {dataTerpilih.question.details.map((data, index) =>
            dataTerpilih.question.question.details[index].type == 1 ||
            dataTerpilih.question.question.details[index].type == 2 ||
            dataTerpilih.question.question.details[index].type == 4 ? (
              <div
                className={
                  "mt-6 py-3 px-4 rounded-[5px] border border-solid border-inputkategori "
                }
              >
                <p className={"text-xs font-medium text-mono50 leading-5  "}>
                  {index + 1}.{" "}
                  {dataTerpilih.question.question.details[index].description}
                </p>
                <p className={"text-sm font-bold leading-6 text-mono30"}>
                  {data.value}
                </p>
              </div>
            ) : dataTerpilih.question.question.details[index].type == 3 ? (
              <div
                className={
                  "mt-6 py-3 px-4 rounded-[5px] border border-solid border-inputkategori "
                }
              >
                <p className={"text-xs font-medium text-mono50 leading-5  "}>
                  {index + 1}.{" "}
                  {dataTerpilih.question.question.details[index].description} ({" "}
                  {dataTerpilih.question.question.details[index].list.map(
                    (data, index) => data + " "
                  )}{" "}
                  )
                </p>
                <p className={"text-sm font-bold leading-6 text-mono30"}>
                  {data.value.map(
                    (data1, index2) =>
                      dataTerpilih.question.question.details[index].list[data1]
                  )}
                </p>
              </div>
            ) : dataTerpilih.question.question.details[index].type == 5 ? (
              <div
                className={
                  "mt-6 py-3 px-4 rounded-[5px] border border-solid border-inputkategori "
                }
              >
                <p className={"text-xs font-medium text-mono50 leading-5  "}>
                  {index + 1}.{" "}
                  {dataTerpilih.question.question.details[index].description}{" "}
                  diantara berikut ini : ({" "}
                  {dataTerpilih.question.question.details[index].list.map(
                    (data, indexnew) => data + " "
                  )}{" "}
                  )
                </p>
                <p className={"text-sm font-bold leading-6 text-mono30"}>
                  {data.value}
                </p>
              </div>
            ) : (
              <div
                className={
                  "mt-6 py-3 px-4 rounded-[5px] border border-solid border-inputkategori "
                }
              >
                <p className={"text-xs font-medium text-mono50 leading-5  "}>
                  {index + 1}.{" "}
                  {dataTerpilih.question.question.details[index].description}
                </p>
                {data.value ? (
                  <a
                    download
                    href={"https://cdn.mig.id/" + data.value}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download File
                  </a>
                ) : (
                  <p className={"text-sm font-bold leading-6 text-mono30"}>-</p>
                )}
              </div>
            )
          )}
        </div>
      )}
    </Drawer>
  );
};

export default DrawerDetailPelamar;
