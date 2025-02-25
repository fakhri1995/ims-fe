import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";

// Currently use for Training, Certifications, and Achievements section in resume
const LanguageCard = ({}) => {
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
            Languages (5/7)
          </p>
          {showMore ? (
            <MdChevronDown className="w-[14px] h-[14px]" />
          ) : (
            <MdChevronUp className="w-[14px] h-[14px] font-bold" />
          )}
        </div>
        <EditCvIconSvg />
      </div>
      {showMore && (
        <div className={"flex flex-col gap-2 mt-4"}>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Language"}
              value={"Indonesia"}
              bold={false}
            />
            <InformationColumn
              label={"Profiency"}
              value={"Fluent"}
              bold={false}
            />
          </div>
          <InformationColumn
            label={"Certifications"}
            full={true}
            value={"Indonesia Full Conversation Volume 1 2025"}
            bold={false}
          />
        </div>
      )}
    </div>
  );
};

export default LanguageCard;
