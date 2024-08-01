import React, { ReactNode } from "react";

interface IStatisticCountCard {
  dataCount: number;
  icon: ReactNode;
  title: string;
  description: string;
}
const StatisticCountCard = ({
  dataCount,
  icon,
  title,
  description,
}: IStatisticCountCard) => {
  return (
    <div className="mig-platform bg-white w-full flex justify-between items-start">
      <div className="flex flex-col gap-4 justify-between h-full">
        <h4 className="mig-heading--4">{dataCount}</h4>
        <div>
          <p className="mig-caption--bold">{title}</p>
          <p className="mig-small">{description}</p>
        </div>
      </div>
      {icon}
    </div>
  );
};

export default StatisticCountCard;
