import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";

// Currently use for Training, Certifications, and Achievements section in resume
const EvaluationCard = ({}) => {
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
            CV Evaluation (7/7)
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
        <div className={"flex flex-col gap-3 mt-4"}>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-sm leading-6 font-medium text-mono30"}>
              Scores
            </p>
            <div className={"flex gap-1"}>
              <div className={"w-1/3 flex flex-col"}>
                <p className={`text-xs leading-6 font-normal text-[#808080]`}>
                  Grammar & Spelling
                </p>
                <p
                  className={`text-[#4D4D4D] text-[13px] leading-6 font-normal `}
                >
                  9
                </p>
              </div>
              <div className={"w-1/3 flex flex-col"}>
                <p className={`text-xs leading-6 font-normal text-[#808080]`}>
                  Content Validity
                </p>
                <p
                  className={`text-[#4D4D4D] text-[13px] leading-6 font-normal `}
                >
                  9
                </p>
              </div>
              <div className={"w-1/3 flex flex-col"}>
                <p className={`text-xs leading-6 font-normal text-[#808080]`}>
                  Skill Alignment
                </p>
                <p
                  className={`text-[#4D4D4D] text-[13px] leading-6 font-normal `}
                >
                  9
                </p>
              </div>
            </div>
          </div>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-sm leading-6 font-medium text-mono30"}>Flags</p>
          </div>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-sm leading-6 font-medium text-mono30"}>
              Suggestions
            </p>
            <p className={`text-xs leading-6 font-normal text-[#808080]`}>
              Improvement Points
            </p>
            <p className={"text-sm leading-6 font-medium text-mono30"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationCard;
