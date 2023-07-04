import { PrinterOutlined, UpOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import ButtonSys from "components/button";

import { FileTextIconSvg } from "../../../icon";

const ContractInfoSection = () => {
  return (
    <section className="grid grid-cols-2 shadow-md rounded-md bg-white p-6 mb-4 gap-6">
      <div className="col-span-2 flex flex-col lg:flex-row lg:justify-between ">
        <div className="flex space-x-2 items-center mb-4 lg:mb-0">
          <h4 className="mig-heading--4">[no]/CNTR/BKP/III/2020</h4>
          <p className="bg-backdrop text-primary100 px-2 py-1 rounded-md font-bold">
            Aktif
          </p>
        </div>
        <ButtonSys type={"default"}>
          <div className="flex space-x-2 items-center">
            <PrinterOutlined />
            <p>Cetak Kontrak</p>
          </div>
        </ButtonSys>
      </div>

      <div className="col-span-2">
        <h5 className="mig-caption--bold mb-2">Judul Kontrak</h5>
        <p>Perjanjian Kerjasama PT XYZ tahun 2022 hingga 2025</p>
      </div>

      <div className="">
        <h5 className="mig-caption--bold mb-2">Requester</h5>
        <p>John Doe</p>
      </div>

      <div className="">
        <h5 className="mig-caption--bold mb-2">Klien</h5>
        <p>PT. BKP</p>
      </div>
      <div className="">
        <h5 className="mig-caption--bold mb-2">Tanggal Dimulai</h5>
        <p>28 Desember 2020</p>
      </div>

      <div className="">
        <h5 className="mig-caption--bold mb-2">Tanggal Selesai</h5>
        <p>29 Desember 2021</p>
      </div>

      <div className="">
        <h5 className="mig-caption--bold mb-2">Durasi Kontrak</h5>
        <p>1 tahun 1 hari</p>
      </div>

      <div className="">
        <h5 className="mig-caption--bold mb-2">Tanggal Dibuat</h5>
        <p>29 Desember 2021</p>
      </div>

      <hr className="col-span-2" />

      <div className="col-span-2">
        <h5 className="mig-caption--bold mb-2">Deskripsi</h5>
        <p>
          Kontrak yang dibuat atas perjanjian kerjasama antara kedua perusahaan
          dalam rangka penyewaan 100 Laptop untuk durasi 3 tahun
        </p>
      </div>

      <div className="col-span-2">
        <h5 className="mig-caption--bold mb-2">Dokumen</h5>
        <span className="flex space-x-2 items-center">
          <FileTextIconSvg size={24} color={"#35763B"} />
          <p className="text-primary100">Document_000323.pdf</p>
        </span>
      </div>
    </section>
  );
};

export default ContractInfoSection;
