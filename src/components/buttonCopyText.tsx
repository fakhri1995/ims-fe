import React from "react";

import { CopyIconSvg } from "components/icon";

import { notificationSuccess } from "lib/helper";

const ButtonCopyText = ({ text }) => {
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        notificationSuccess({
          message: "Successfully copied text!",
        });
      }}
      className="mig-buttons py-[6px] bg-transparent 
      flex items-center gap-2 text-primary100 hover:text-opacity-70 "
    >
      <CopyIconSvg size={16} />
      <p className="">Copy text</p>
    </button>
  );
};

export default ButtonCopyText;
