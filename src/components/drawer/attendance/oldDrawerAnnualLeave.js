import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  Table,
  Tag,
  message,
  notification,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import PdfIcon from "assets/vectors/pdf-icon.svg";

import {
  CheckIconSvg,
  CloseIconSvg,
  UserIconSvg,
  UsercircleIconSvg,
} from "../../icon";

const DrawerAnnualLeave = ({
  visible,
  onvisible,
  dataDefault,
  closeDrawer,
  initProps,
  fetchData,
}) => {
  const [showData, setShowData] = useState("1");
  const [detailEmployee, setDetailEmployee] = useState({
    nama: null,
    role: null,
    company: null,
    nip: null,
    no_telp: null,
    email: null,
    jumlah_cuti_tahunan: null,
  });

  const [dataLoading, setDataLoading] = useState({
    loadingSetuju: false,
    loadingTolak: false,
  });
  const clickDetailEmployee = (record) => {
    console.log("isinya ", record);
    setDetailEmployee({
      nama: record.name,
      role: record.contract.role.name,
      company: record.contract.placement,
      nip: record.nip,
      no_telp: record.phone_number,
      email: record.email_office,
      jumlah_cuti_tahunan: record.contract.annual_leave,
    });
    setShowData("2");
  };

  const closeDrawerNew = () => {
    if (showData == "2") {
      setShowData("1");
    } else {
      closeDrawer();
    }
  };

  const processCuti = (aksi) => {
    if (aksi == "tolak") {
      setDataLoading({
        ...dataLoading,
        loadingTolak: true,
      });
    }
    if (aksi == "setuju") {
      setDataLoading({
        ...dataLoading,
        loadingSetuju: true,
      });
    }
    let dataSend = {
      id: dataDefault.id,
      approve: aksi == "setuju" ? 1 : 0,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/approveLeave`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(initProps),
      },
      body: JSON.stringify(dataSend),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          if (aksi == "tolak") {
            setDataLoading({
              ...dataLoading,
              loadingTolak: false,
            });
          }
          if (aksi == "setuju") {
            setDataLoading({
              ...dataLoading,
              loadingSetuju: false,
            });
          }

          notification["success"]({
            message:
              aksi == "setuju"
                ? "Setujui Pengajuan Cuti Sukses"
                : "Tolak Pengajuan Cuti Sukses",
            duration: 3,
          });
          closeDrawer();
          fetchData();
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  return (
    <Drawer
      width={468}
      title={"Detail Pengajuan Cuti Karyawan"}
      open={visible}
      closeIcon={
        showData == "2" ? (
          <ArrowLeftOutlined size={24} color={"black"} />
        ) : (
          <CloseOutlined size={24} color="black" />
        )
      }
      onClose={() => closeDrawerNew()}
      footer={
        showData == "1" && dataDefault?.status == 1 ? (
          <div className={"flex p-4 gap-4"}>
            <div
              onClick={() => processCuti("tolak")}
              className="w-1/2 bg-[#BF4A40] h-[36px] rounded-[5px] flex gap-2 justify-center items-center hover:cursor-pointer"
            >
              {dataLoading.loadingTolak ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  }
                />
              ) : (
                <CloseIconSvg size={16} color={"white"} />
              )}
              <p className={"text-white font-bold text-xs leading-5"}>
                Tolak Pengajuan
              </p>
            </div>
            <div
              onClick={() => processCuti("setuju")}
              className="w-1/2 bg-[#35763B] flex gap-2 justify-center items-center h-[36px] rounded-[5px] hover:cursor-pointer"
            >
              {dataLoading.loadingSetuju ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  }
                />
              ) : (
                <CheckOutlined size={16} style={{ color: "white" }} />
              )}

              <p className={"text-white font-bold text-xs leading-5"}>
                Setujui Pengajuan
              </p>
            </div>
          </div>
        ) : null
      }
    >
      {showData == "1" && (
        <div className={"flex flex-col gap-4"}>
          <div className="flex">
            <div className="flex flex-col gap-4 w-1/2">
              <p className="text-[#808080] font-medium text-xs leading-5">
                Status Pengajuan Cuti
              </p>
              <div
                className={`${
                  dataDefault?.status == 2
                    ? "bg-[#35763B]"
                    : dataDefault?.status == 1
                    ? "bg-[#F3F3F3]"
                    : "bg-[#BF4A40]"
                } text-center py-1.5 px-5  rounded-[5px] w-min`}
              >
                <p
                  className={`${
                    dataDefault?.status == 1
                      ? "text-[#4D4D4D]"
                      : dataDefault?.status == 2
                      ? "text-[#F3F3F3]"
                      : "text-white"
                  }  text-[10px] font-bold`}
                >
                  {dataDefault?.status == 1
                    ? "Pending"
                    : dataDefault?.status == 2
                    ? "Diterima"
                    : "Ditolak"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <p className="text-[#808080] font-medium text-xs leading-5">
                Tanggal Pengajuan
              </p>
              <p className={"text-[14px] font-medium leading-6 text-[#4D4D4D]"}>
                {moment(dataDefault?.issued_date).format("DD MMMM YYYY")}
              </p>
            </div>
          </div>
          <div className={"flex flex-col gap-4"}>
            <p className="text-[#808080] font-medium text-xs leading-5">
              Karyawan Pemohon
            </p>
            <div
              className={
                "border border-solid border-[#F3F3F3] h-[84px] rounded-[6px] bg-white py-3 px-2"
              }
            >
              <div className={"flex justify-between items-center"}>
                <div className={"flex gap-2"}>
                  <div
                    className={
                      "rounded-[200px] h-[55px] w-[55px] bg-[#F4FAF5] flex justify-center items-center"
                    }
                  >
                    <UsercircleIconSvg size={24} color={"#4D4D4D"} />
                  </div>
                  <div className={"flex flex-col gap-1"}>
                    {console.log("data default ", dataDefault)}
                    <p className={"text-[#4D4D4D] font-medium text-[14px] "}>
                      {dataDefault?.employee?.name}
                    </p>
                    <p
                      className={"text-[#4D4D4D] text-xs leading-4 font-normal"}
                    >
                      {dataDefault?.employee?.contract?.role?.name}
                    </p>
                    <p
                      className={"text-[#4D4D4D] text-xs leading-4 font-normal"}
                    >
                      {dataDefault?.employee?.nip}
                    </p>
                  </div>
                </div>
                <div
                  className={"flex gap-2 items-center hover:cursor-pointer"}
                  onClick={() => clickDetailEmployee(dataDefault?.employee)}
                >
                  <p className="text-[#35763B] text-xs leading-4 font-medium">
                    Lihat Detail Karyawan
                  </p>
                  <ArrowRightOutlined size={16} color="#35763B" />
                </div>
              </div>
            </div>
          </div>
          <div className={"flex flex-col gap-4"}>
            <p className="text-[#808080] font-medium text-xs leading-5">
              Tanggal Cuti
            </p>
            <p className={"text-[14px] font-medium leading-6 text-[#4D4D4D]"}>
              {moment(dataDefault?.start_date).format("DD MMMM YYYY")} -{" "}
              {moment(dataDefault?.end_date).format("DD MMMM YYYY")}
            </p>
          </div>
          <div className={"flex"}>
            <div className={"flex flex-col gap-4 w-1/2"}>
              <p className="text-[#808080] font-medium text-xs leading-5">
                Durasi Hari
              </p>
              <p className={"text-[14px] font-medium leading-6 text-[#4D4D4D]"}>
                {moment(dataDefault?.end_date).diff(
                  moment(dataDefault?.start_date),
                  "days"
                )}{" "}
                Hari
              </p>
            </div>
            <div className={"flex flex-col gap-4 w-1/2"}>
              <p className="text-[#808080] font-medium text-xs leading-5">
                Tipe Cuti
              </p>
              <p className={"text-[14px] font-medium leading-6 text-[#4D4D4D]"}>
                {dataDefault?.type?.name}
              </p>
            </div>
          </div>
          <div className={"flex flex-col gap-4"}>
            <p className="text-[#808080] font-medium text-xs leading-5">
              Delegasi Tugas
            </p>
            <div
              className={
                "border border-solid border-[#F3F3F3] h-[84px] rounded-[6px] bg-white py-3 px-2"
              }
            >
              <div className={"flex justify-between items-center"}>
                <div className={"flex gap-2"}>
                  <div
                    className={
                      "rounded-[200px] h-[55px] w-[55px] bg-[#F4FAF5] flex justify-center items-center"
                    }
                  >
                    <UsercircleIconSvg size={24} color={"#4D4D4D"} />
                  </div>
                  <div className={"flex flex-col gap-1"}>
                    <p className={"text-[#4D4D4D] font-medium text-[14px] "}>
                      {dataDefault?.delegate?.name}
                    </p>
                    <p
                      className={"text-[#4D4D4D] text-xs leading-4 font-normal"}
                    >
                      {dataDefault?.delegate?.contract?.role?.name}
                    </p>
                    <p
                      className={"text-[#4D4D4D] text-xs leading-4 font-normal"}
                    >
                      {dataDefault?.delegate?.nip}
                    </p>
                  </div>
                </div>
                <div
                  className={"flex gap-2 items-center hover:cursor-pointer"}
                  onClick={() => clickDetailEmployee(dataDefault?.delegate)}
                >
                  <p className="text-[#35763B] text-xs leading-4 font-medium">
                    Lihat Detail Karyawan
                  </p>
                  <ArrowRightOutlined size={16} color="#35763B" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#808080] font-medium text-xs leading-5">
              Catatan
            </p>
            <div className={"bg-[#FAFAFA] p-4 rounded-[6px]"}>
              <p className={"text-[#4D4D4D] text-xs leading-4 font-normal"}>
                {dataDefault?.notes}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#808080] font-medium text-xs leading-5">
              Dokumen Pendukung
            </p>
            {dataDefault?.document ? (
              <div
                className={
                  "border border-solid border-[#F3F3F3] rounded-[6px] bg-white py-4 px-2"
                }
              >
                <div className={"flex gap-2 items-center"}>
                  <PdfIcon />
                  <div className="flex flex-col gap-1">
                    <a
                      href={"https://cdn.mig.id/" + dataDefault?.document.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-[14px] leading-6 text-[#4D4D4D] ">
                        dokumen-pendukung-pengajuan-cuti.pdf
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <p>-</p>
            )}
          </div>
          <div className={"mt-2 flex flex-col gap-2"}>
            {/* <Form.Item label="Notes" name={"notes"} className="col-span-2"> */}
            <p className="text-[#808080] font-medium text-xs leading-5">
              Catatan Tambahan{" "}
              <span className="text-[12px] font-medium text-neutrals80">
                (optional)
              </span>
            </p>
            <textarea
              rows={4}
              className={"h-[164px] border border-solid border-[#E6E6E6] p-4"}
              placeholder=""
            />
            {/* </Form.Item> */}
          </div>
        </div>
      )}
      {showData == "2" && (
        <div className={"flex flex-col gap-4"}>
          <div className={"flex flex-col gap-2"}>
            <p className={"text-[#808080] text-xs font-medium leading-5"}>
              Nama
            </p>
            <p className={"text-[#4D4D4D] text-[14px] font-medium leading-6"}>
              {detailEmployee?.nama}
            </p>
          </div>
          <div className={"flex flex-col gap-2"}>
            <p className={"text-[#808080] text-xs font-medium leading-5"}>
              Role
            </p>
            <p className={"text-[#4D4D4D] text-[14px] font-medium leading-6"}>
              {detailEmployee?.role}
            </p>
          </div>
          <div className={"flex flex-col gap-2"}>
            <p className={"text-[#808080] text-xs font-medium leading-5"}>
              Company
            </p>
            <p className={"text-[#4D4D4D] text-[14px] font-medium leading-6"}>
              {detailEmployee?.company}
            </p>
          </div>
          <div className={"flex flex-col gap-2"}>
            <p className={"text-[#808080] text-xs font-medium leading-5"}>
              NIP
            </p>
            <p className={"text-[#4D4D4D] text-[14px] font-medium leading-6"}>
              {detailEmployee?.nip}
            </p>
          </div>
          <div className={"flex flex-col gap-2"}>
            <p className={"text-[#808080] text-xs font-medium leading-5"}>
              Nomor Telepon
            </p>
            <p className={"text-[#4D4D4D] text-[14px] font-medium leading-6"}>
              {detailEmployee?.no_telp}
            </p>
          </div>
          <div className={"flex flex-col gap-2"}>
            <p className={"text-[#808080] text-xs font-medium leading-5"}>
              Email
            </p>
            <p className={"text-[#4D4D4D] text-[14px] font-medium leading-6"}>
              {detailEmployee?.email}
            </p>
          </div>
          <div className={"flex flex-col gap-2"}>
            <p className={"text-[#808080] text-xs font-medium leading-5"}>
              Jumlah Cuti Tahunan
            </p>
            <p className={"text-[#4D4D4D] text-[14px] font-medium leading-6"}>
              {detailEmployee?.jumlah_cuti_tahunan} Hari
            </p>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default DrawerAnnualLeave;
