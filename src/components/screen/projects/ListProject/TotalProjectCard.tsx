import type { FC } from "react";

export interface ITotalProjectCard {
  projectCount: number;
}

export const TotalProjectCard: FC<ITotalProjectCard> = ({ projectCount }) => {
  return (
    <div className="p-6 flex items-center justify-between rounded-md bg-white shadow-md">
      <span className="font-bold text-lg text-mono30">Total Project</span>

      <span className="text-5xl text-primary100">{projectCount}</span>
    </div>
  );
};
