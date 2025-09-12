import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

// Currently use for Training, Certifications, and Achievements section in resume
const InformationColumnEdit = ({
  label,
  value,
  bold,
  full = false,
  dataEdit,
  setDataEdit,
}) => {
  const handleEdit = (label) => {
    setDataEdit(
      Object.fromEntries(
        Object.keys(dataEdit).map((key) => [key, key === label.toLowerCase()])
      )
    );
  };
  return (
    <div className={`flex ${full ? "w-full" : "w-1/2"} flex-col`}>
      <p className={`text-xs leading-6 font-normal text-[#808080]`}>{label}</p>
      <button
        onDoubleClick={() => handleEdit(label)}
        className={`text-[#4D4D4D] w-full text-[13px] leading-6 ${
          bold ? "font-bold" : "font-normal"
        }  bg-transparent border-none p-0 m-0 text-left  truncate`}
        // Optional: to reset all default styles
      >
        {value}
      </button>
    </div>
  );
};

export default InformationColumnEdit;
