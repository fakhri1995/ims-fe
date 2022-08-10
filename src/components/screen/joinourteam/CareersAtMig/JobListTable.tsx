import { Button, Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { FC, useMemo, useState } from "react";

import {
  getSearchResultMessage,
  useJoinOurTeamStore,
} from "stores/career/joinourteam.store";

import { useGetCareers } from "apis/career_v2/career_v2.hooks";
import type { Career } from "apis/career_v2/career_v2.types";

export const JobListTable: FC = () => {
  /**
   * States
   */
  const [jobLimit, setJobLimit] = useState(5);

  /**
   * Dependencies
   */
  const employmentTypeFilterValues = useJoinOurTeamStore((state) =>
    state.employmentTypeFilter.map(({ value }) => value).join(",")
  );

  const experienceRangeFilterValues = useJoinOurTeamStore((state) =>
    state.experienceRangeFilter.map(({ value }) => value).join(",")
  );

  const { data, isLoading } = useGetCareers(
    {
      role: employmentTypeFilterValues,
      experience: experienceRangeFilterValues,
      limit: jobLimit,
    },
    (data) => data.data.data
  );

  const searchMessage = getSearchResultMessage();

  /**
   * Values
   */
  const tableColumns = useMemo<ColumnsType<Career>>(
    () => [
      { title: "Job Title", dataIndex: "name" },
      { title: "Employment Type", dataIndex: "role_type.name" },
      { title: "Experience Range", dataIndex: "experience.str" },
    ],
    []
  );

  /**
   * Callbacks
   */
  const onLoadMoreClicked = () => {
    setJobLimit((current) => current + 5);
  };

  return (
    <div className="space-y-12">
      <p
        dangerouslySetInnerHTML={{
          __html: searchMessage,
        }}
      />

      <Table<Career>
        columns={tableColumns}
        dataSource={[]}
        bordered={false}
        loading={isLoading}
      ></Table>

      {data && (
        <div className="flex flex-col justify-center items-center space-y-8">
          <p>
            Showing <strong>{data?.to}</strong> out of{" "}
            <strong>{data?.total} jobs</strong>
          </p>

          <Button type="ghost" onClick={onLoadMoreClicked}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
