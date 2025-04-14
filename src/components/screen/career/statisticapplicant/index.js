import React from "react";

const CareerStatisticApplicant = ({ dataIkhtisar }) => {
  return (
    <div
      className={"bg-white md:h-[178px] rounded-[5px] py-6 px-[22px]"}
      style={{ boxShadow: "0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <p className={"text-lg leading-4 text-mono30 font-bold"}>
        Ikhtisar Pelamar
      </p>
      {dataIkhtisar.length > 0 && (
        <div className={"mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"}>
          {dataIkhtisar.map((dataIkhtisar1) => (
            <div
              className={`py-2 self-stretch ${
                dataIkhtisar1.name == "Unprocessed"
                  ? "bg-bgikhtisar1"
                  : dataIkhtisar1.name == "Shortlisted"
                  ? "bg-bgstatustaskfinish"
                  : "bg-bgBackdropOverdue "
              } flex flex-col justify-center items-center rounded-[5px] gap-[3px]`}
            >
              <p
                className={`text-2xl leading-8 font-bold ${
                  dataIkhtisar1.name == "Unprocessed"
                    ? "text-mono30"
                    : dataIkhtisar1.name == "Shortlisted"
                    ? "text-primary100"
                    : "text-danger"
                }`}
              >
                {dataIkhtisar1.applicants_count}
              </p>
              <p
                className={`text-[10px] leading-4 font-normal ${
                  dataIkhtisar1.name == "Unprocessed"
                    ? "text-mono30"
                    : dataIkhtisar1.name == "Shortlisted"
                    ? "text-primary100"
                    : "text-danger"
                }  `}
              >
                {dataIkhtisar1.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerStatisticApplicant;
