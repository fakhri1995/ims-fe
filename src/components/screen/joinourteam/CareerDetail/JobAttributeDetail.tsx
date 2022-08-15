import { Skeleton } from "antd";
import type { FC } from "react";

interface JobAttributeDetailProps {
  label: string;
  value: string;

  loading?: boolean;
}

export const JobAttributeDetail: FC<JobAttributeDetailProps> = ({
  label,
  value,
  loading = false,
}) => {
  const onLoadingContent = <Skeleton paragraph={{ rows: 1 }} active />;

  const actualContent = (
    <div>
      <span className="text-xl">{label}</span>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );

  return loading ? onLoadingContent : actualContent;
};
