import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";

// Currently use for Training, Certifications, and Achievements section in resume
const ExperienceInfoCard = ({ data }) => {
  const [showMore, setShowMore] = useState(true);
  return (
    <div
      className={
        "border border-b-0 border-[#E6E6E6] bg-white w-full py-4 px-5 "
      }
    >
      <div className={"flex justify-between"}>
        <div
          onClick={() => setShowMore(!showMore)}
          className={"flex gap-1.5 items-center hover:cursor-pointer"}
        >
          <p className={"text-[#4D4D4D] text-[16px] leading-6 font-bold"}>
            Experiences (2/7)
          </p>
          {showMore ? (
            <MdChevronDown className="w-[14px] h-[14px]" />
          ) : (
            <MdChevronUp className="w-[14px] h-[14px]" />
          )}
        </div>
        <EditCvIconSvg />
      </div>
      {showMore &&
        data.length > 0 &&
        data.map((item, index) => (
          <div className={"flex flex-col gap-2 mt-4"}>
            <div className={"flex gap-2"}>
              <InformationColumn
                label={"Company"}
                value={item?.name ?? "-"}
                bold={false}
              />
              <InformationColumn
                label={"position"}
                value={item?.role ?? "-"}
                bold={false}
              />
            </div>
            <div className={"flex gap-2"}>
              <InformationColumn
                label={"Industry"}
                value={"Media"}
                bold={false}
              />
              <InformationColumn
                label={"Location"}
                value={"Indonesia"}
                bold={false}
              />
            </div>
            <div className={"flex gap-2"}>
              <InformationColumn
                label={"Start Date"}
                value={"12 Maret 2020"}
                bold={false}
              />
              <InformationColumn
                label={"End Date"}
                value={"20 Mei 2024"}
                bold={false}
              />
            </div>
            <InformationColumn
              label={"Achievements"}
              full={true}
              value={item?.achievements ?? "-"}
              bold={false}
            />
            <InformationColumn
              label={"Technologies"}
              full={true}
              value={item?.technologies ?? "-"}
              bold={false}
            />
          </div>
        ))}
    </div>
  );
};

export default ExperienceInfoCard;
