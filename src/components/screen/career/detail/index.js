import parse from "html-react-parser";
import React from "react";

const CareerDetail = ({ detailCareer }) => {
  const currencyI18n = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div>
      <div className={"mt-5 flex flex-col md:flex-row"}>
        <div className={"w-full md:w-1/4 mt-3 md:mt-0"}>
          <p className={"text-mono50 font-medium leading-5 "}>Tipe Kontrak</p>
          <p className={"mt-2.5 text-sm leading-6 font-normal text-mono30"}>
            {detailCareer?.role_type?.name}
          </p>
        </div>
        <div className={"w-full md:w-1/4 mt-3 md:mt-0"}>
          <p className={"text-mono50 font-medium leading-5 "}>
            Rentang Pengalaman
          </p>
          <p className={"mt-2.5 text-sm leading-6 font-normal text-mono30"}>
            {detailCareer?.experience?.str}
          </p>
        </div>
        <div className={"w-full md:w-1/4 mt-3 md:mt-0"}>
          <p className={"text-mono50 font-medium leading-5 "}>Rentan Gaji</p>
          <p className={"mt-2.5 text-sm leading-6 font-normal text-mono30"}>
            {detailCareer ? currencyI18n.format(detailCareer.salary_min) : "0"}{" "}
            -{" "}
            {detailCareer ? currencyI18n.format(detailCareer.salary_max) : "0"}
          </p>
        </div>
        <div className={"w-full md:w-1/4 mt-3 md:mt-0"}>
          <p className={"text-mono50 font-medium leading-5 "}>Role</p>
          <p className={"mt-2.5 text-sm leading-6 font-normal text-mono30"}>
            {detailCareer?.recruitment_role?.name}
          </p>
        </div>
      </div>
      <div className={"mt-4"}>
        <p className={"text-mono50 font-medium leading-5 "}>Overview</p>
        <p className={"mt-2.5 text-sm leading-6 font-normal text-mono30"}>
          {detailCareer ? parse(detailCareer?.overview) : ""}
        </p>
      </div>
      <div className={"mt-4 flex flex-col md:flex-row"}>
        <div className={"w-full md:w-1/2 mt-3 md:mt-0"}>
          <p className={"text-mono50 font-medium leading-5 "}>
            Deskripsi Pekerjaan
          </p>
          <p className={"mt-2.5 text-sm leading-6 font-normal text-mono30"}>
            {detailCareer ? parse(detailCareer?.description) : ""}
          </p>
        </div>
        <div className={"w-full md:w-1/2 mt-3 md:mt-0"}>
          <p className={"text-mono50 font-medium leading-5 "}>
            Spesifikasi Minimal
          </p>
          <p className={"mt-2.5 text-sm leading-6 font-normal text-mono30"}>
            {detailCareer ? parse(detailCareer?.qualification) : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
