import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { DeleteTablerIconSvg, EditCvIconSvg, TrashIconSvg } from "../../icon";

// Currently use for Training, Certifications, and Achievements section in resume
const InformationColumnWithAction = ({
  label,
  value,
  bold,
  id,
  editData,
  setEditData,
  changeData,
  deleteData,
}) => {
  const handleEdit = (id) => {
    setEditData({
      ...editData,
      id: id,
    });
  };

  return (
    <div className={`flex w-1/2`}>
      <div className={"flex-col w-10/12"}>
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
      <div className={"flex w-2/12 gap-2 items-start"}>
        <div onClick={() => changeData()} className={"hover:cursor-pointer"}>
          <EditCvIconSvg size={18} />
        </div>
        <div onClick={() => deleteData()} className={"hover:cursor-pointer"}>
          <TrashIconSvg size={18} color="#4D4D4D" />
        </div>
      </div>
    </div>
  );
};

export default InformationColumnWithAction;
