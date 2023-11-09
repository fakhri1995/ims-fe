import React from "react";

import { getNameInitial } from "../../../lib/helper";
import { BriefcaseIconSvg, CompanyIconSvg, SchoolIconSvg } from "../../icon";

const CandidateDetailCard = ({ candidateData }) => {
  const displayData = [
    {
      icon: <CompanyIconSvg size={16} color={"#35763B"} />,
      title: "Asal Kota",
      value: candidateData?.city,
    },
    {
      icon: <BriefcaseIconSvg size={16} color={"#35763B"} />,
      title: "Role",
      value: candidateData?.last_assessment?.name,
    },
    {
      icon: <SchoolIconSvg size={16} color={"#35763B"} />,
      title: "Universitas",
      value: candidateData?.last_education?.university,
    },
    {
      icon: <BriefcaseIconSvg size={16} color={"#35763B"} />,
      title: "Pengalaman Terakhir",
      value:
        candidateData?.last_experience?.name ||
        candidateData?.last_experience?.role,
    },
  ];

  return (
    <div
      className={`w-full shadow-lg border border-mono100 rounded-lg grid grid-cols-1 gap-4 p-6 bg-white`}
    >
      <div className="flex gap-3 items-center w-11/12">
        <div
          className="rounded-full w-12 h-12 flex justify-center items-center 
          bg-backdrop text-primary100 mig-caption--bold p-1 text-sm"
        >
          {getNameInitial(candidateData?.name)}
        </div>
        <div>
          <p className="font-bold text-mono30">{candidateData?.name}</p>
          <p className="mig-caption--medium text-mono50">
            {candidateData?.email}
          </p>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-2 gap-6">
        {displayData.map((item) => (
          <div key={item.title} className="mig-caption--medium">
            <div
              className="flex rounded-sm w-fit bg-backdrop gap-2 
              items-center px-2 py-0.5 mb-2"
            >
              {item.icon}
              <p className="text-primary100">{item.title}</p>
            </div>
            <p>{item.value || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateDetailCard;
