import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import MdChevronDown from "assets/vectors/md-chevron-down.svg";
import MdChevronUp from "assets/vectors/md-chevron-up.svg";

import ButtonSys from "../../../button";
import { EditCvIconSvg } from "../../../icon";
import InformationColumn from "../InformationColumn";
import ExperienceInfoBlock from "./ExperienceInfoBlock";

// Currently use for Training, Certifications, and Achievements section in resume
const ExperienceInfoCard = ({ data }) => {
  const [showMore, setShowMore] = useState(true);
  const [editData, setEditData] = useState({
    id: null,
    company: null,
    position: null,
    industry: null,
    location: null,
    start_date: null,
    end_date: null,
    achievement: null,
    technologies: null,
  });

  const cancelData = () => {
    setEditData({
      ...editData,
      id: null,
      company: null,
      position: null,
      industry: null,
      location: null,
      start_date: null,
      end_date: null,
      achievement: null,
      technologies: null,
    });
  };
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
      </div>
      {showMore && (
        <div>
          <div className={"mb-4"}>
            {data.length > 0 &&
              data.map((item, index) => (
                <ExperienceInfoBlock
                  cancelData={cancelData}
                  editData={editData}
                  setEditData={setEditData}
                  jumlah_data={data.length}
                  data={item}
                  index={index}
                />
              ))}
          </div>
          <ButtonSys
            size={"small"}
            type={"dashed"}
            onClick={() => {
              // clearDataUpdate();
              // setIsAdd(true);
            }}
          >
            <p className="text-primary100 font-bold hover:text-primary75">
              + Add Another Experience
            </p>
          </ButtonSys>
        </div>
      )}
    </div>
  );
};

export default ExperienceInfoCard;
