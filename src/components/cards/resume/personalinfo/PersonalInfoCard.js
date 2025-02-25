import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";

// Currently use for Training, Certifications, and Achievements section in resume
const PersonalInfoCard = ({}) => {
  const [showMore, setShowMore] = useState(true);
  return (
    <div
      className={
        "border border-b-0 border-[#E6E6E6] rounded-t-[10px] bg-white w-full py-4 px-5 "
      }
    >
      <div className={"flex justify-between"}>
        <div
          onClick={() => setShowMore(!showMore)}
          className={"flex gap-1.5 items-center hover:cursor-pointer"}
        >
          <p className={"text-[#4D4D4D] text-[16px] leading-6 font-bold"}>
            Personal Info (1/7)
          </p>
          {showMore ? (
            <MdChevronDown className="w-[14px] h-[14px]" />
          ) : (
            <MdChevronUp className="w-[14px] h-[14px]" />
          )}
        </div>
        <EditCvIconSvg />
      </div>
      {showMore && (
        <div className={"flex flex-col gap-2 mt-4"}>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Name"}
              value={"Lulu Agustin"}
              bold={true}
            />
            <InformationColumn
              label={"Email"}
              value={"lulu@gmail.com"}
              bold={false}
            />
          </div>
          <div className={"flex gap-2"}>
            <InformationColumn
              label={"Phone"}
              value={"+62 858 2215 2334"}
              bold={false}
            />
            <InformationColumn
              label={"Location"}
              value={"Indonesia"}
              bold={false}
            />
          </div>
          <InformationColumn
            label={"LinkedIn"}
            full={true}
            value={"linkedin.com/id/lulu-id/"}
            bold={false}
          />
          <InformationColumn
            label={"Summary"}
            full={true}
            value={
              "Basic Programming (variable and conditional types (if/else, nested condition), looping (for, while), function)"
            }
            bold={false}
          />
        </div>
      )}
    </div>
  );
};

export default PersonalInfoCard;
