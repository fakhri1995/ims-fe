import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { EditCvIconSvg } from "../../icon";

// Currently use for Training, Certifications, and Achievements section in resume
const InformationColumnWithAction = ({
  label,
  value,
  bold,
  id,
  editData,
  setEditData,
}) => {
  const handleEdit = (id) => {
    setEditData({
      ...editData,
      id: id,
    });
  };

  return (
    <div className={`flex w-1/2`}>
      <div className={"flex-col w-11/12"}>
        <p className={`text-xs leading-6 font-normal text-[#808080]`}>
          {label}
        </p>
        <p
          className={`text-[#4D4D4D] text-[13px] leading-6 ${
            bold ? "font-bold" : "font-normal"
          } `}
        >
          {value}
        </p>
      </div>
      <div
        onClick={() => handleEdit(id)}
        className={"flex w-1/12 items-start hover:cursor-pointer"}
      >
        <EditCvIconSvg />
      </div>
    </div>
  );
};

export default InformationColumnWithAction;
