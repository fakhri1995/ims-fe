import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";

// Currently use for Training, Certifications, and Achievements section in resume
const SkillCard = ({ skillSet }) => {
  const [showMore, setShowMore] = useState(true);
  const [dataSkills, setDataSkills] = useState([
    { id: 1, skill: "Python" },
    { id: 2, skill: "JavaScript" },
    { id: 3, skill: "Java" },
    { id: 4, skill: "C++" },
    { id: 5, skill: "Ruby" },
    { id: 6, skill: "Go" },
    { id: 7, skill: "Swift" },
    { id: 8, skill: "PHP" },
    { id: 9, skill: "Kotlin" },
    { id: 10, skill: "Rust" },
  ]);
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
            Skill (4/7)
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
        <div className={"flex flex-wrap gap-1 mt-4"}>
          {skillSet?.map((skill, index) => (
            <div
              className={
                "rounded-[5px] flex items-center px-2 py-1   bg-[#35763B1A]"
              }
            >
              <p
                className={"text-primary100 text-[10px] leading-6 font-normal"}
              >
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillCard;
