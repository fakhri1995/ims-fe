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
  CopyIconSvg,
  DownloadIcon2Svg,
  ListNumbersSvg,
  TrashIconSvg,
  UploadIconSvg,
} from "../../icon";
import { H2, Label } from "../../typography";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const DrawerPelamarDetail = ({
  title,
  visible,
  setDrawDetailPelamar,
  dataTerpilih,
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
      title={title}
      visible={visible}
      onClose={() => {
        setDrawDetailPelamar(false);
      }}
      destroyOnClose={true}
      maskClosable={false}
      width={380}
      //   disabled={disabledcreate}
    >
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col gap-2.5"}>
          <p className={"text-xs font-medium leading-5 text-mono50"}>
            Tanggal Melamar
          </p>
          <p className={"text-sm text-mono30 font-medium leading-5"}>
            {dataTerpilih
              ? moment(dataTerpilih.created_at).format("DD MMMM YYYY")
              : "-"}
          </p>
        </div>

        <div className={"flex flex-col gap-2.5"}>
          <p className={"text-xs font-medium leading-5 text-mono50"}>
            Nama Pelamar
          </p>
          <p className={"text-sm text-mono30 font-medium leading-5"}>
            {dataTerpilih ? dataTerpilih?.name : "-"}
          </p>
        </div>
        <div className={"flex flex-col gap-2.5"}>
          <p className={"text-xs font-medium leading-5 text-mono50"}>
            Nomor Ponsel
          </p>
          <p className={"text-sm text-mono30 font-medium leading-5"}>
            {dataTerpilih ? dataTerpilih?.phone : "-"}
          </p>
        </div>
        <div className={"flex flex-col gap-2.5"}>
          <p className={"text-xs font-medium leading-5 text-mono50"}>
            Email Pelamar
          </p>
          <p className={"text-sm text-mono30 font-medium leading-5"}>
            {dataTerpilih ? dataTerpilih?.email : "-"}
          </p>
        </div>
        <div className={"flex flex-col gap-2.5"}>
          <p className={"text-xs font-medium leading-5 text-mono50"}>Status</p>
          <p className={"text-sm text-mono30 font-medium leading-5"}>
            {dataTerpilih ? dataTerpilih?.status?.name : "-"}
          </p>
        </div>
      </div>
      <div className={"mt-10"}>
        {dataTerpilih && dataTerpilih.resume ? (
          <a
            download
            href={"https://cdn.mig.id/" + dataTerpilih.resume.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonSys
              fullWidth={true}
              type={"primary"}
              // onClick={() => rt.push('/admin/candidates/pdfTemplate')}
            >
              <div className={"flex flex-row"}>
                <DownloadIcon2Svg size={16} color={"#fffffff"} />
                <p className={"ml-2 text-xs text-white"}>Unduh CV Pelamar</p>
              </div>
            </ButtonSys>
          </a>
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
      <div className={"mt-6 border border-solid border-[#f0f0f0] -mx-6"}></div>
      <p className={"text-mono30 text-lg leading-6 font-bold mt-6"}>
        Jawaban Pertanyaan Tambahan
      </p>
      <div
        className={
          "mt-6 py-3 px-4 rounded-[5px] border border-solid border-inputkategori "
        }
      >
        <p className={"text-xs font-medium text-mono50 leading-5  "}>
          1. Year Experience
        </p>
        <p className={"text-sm font-bold leading-6 text-mono30"}>
          1-2 Year Experiences
        </p>
      </div>
    </Drawer>
  );
};

export default DrawerPelamarDetail;
