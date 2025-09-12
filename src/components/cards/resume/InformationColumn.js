import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

// Currently use for Training, Certifications, and Achievements section in resume
const InformationColumn = ({ label, value, bold, full = false }) => {
  const handleEdit = () => {
    console.log("handle edit");
  };
  return (
    <div className={`flex ${full ? "w-full" : "w-1/2"} flex-col`}>
      <p className={`text-xs leading-6 font-normal text-[#808080]`}>{label}</p>
      <button
        onDoubleClick={handleEdit}
        className={`text-[#4D4D4D] text-[13px] leading-6 ${
          bold ? "font-bold" : "font-normal"
        }  bg-transparent border-none p-0 m-0 text-left`}
        style={{ all: "unset" }} // Optional: to reset all default styles
      >
        {value}
      </button>
    </div>
  );
};

export default InformationColumn;
