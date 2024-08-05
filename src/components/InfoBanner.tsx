import React, { ReactNode } from "react";

const InfoBanner = ({ icon, text }: { icon: ReactNode; text: string }) => {
  return (
    <div
      className="py-2 px-3 rounded bg-secondary100 bg-opacity-10 
    text-secondary100 flex items-center gap-2"
    >
      {icon}
      <p className="mig-caption">{text}</p>
    </div>
  );
};

export default InfoBanner;
