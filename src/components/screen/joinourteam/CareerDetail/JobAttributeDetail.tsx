import type { FC } from "react";

interface JobAttributeDetailProps {
  label: string;
  value: string;
}

export const JobAttributeDetail: FC<JobAttributeDetailProps> = ({
  label,
  value,
}) => {
  return (
    <div>
      <span className="text-xl">{label}</span>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
};
