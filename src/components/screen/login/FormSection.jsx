import React from "react";

import { CopyrightIconSvg } from "../../icon";

const FormSection = ({ children }) => {
  return (
    <div
      className="relative h-full w-full md:w-1/2 bg-[#F4F6F9] flex flex-col justify-center items-center"
      id="wrapper"
    >
      <div className="bg-white rounded-lg w-10/12 lg:w-8/12 shadow-lg p-6 text-center">
        {children}
      </div>
      <div className="mt-10 flex items-center gap-2 ">
        <CopyrightIconSvg size={16} />
        <p className="font-medium text-mono50">2024 Mitramas Infosys Global</p>
      </div>
    </div>
  );
};

export default FormSection;
