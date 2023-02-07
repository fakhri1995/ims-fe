import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo, useState } from "react";

import {
  getSearchResultMessage,
  useJoinOurTeamStore,
} from "stores/career/joinourteam.store";

import { useGetPostedCareers } from "apis/career_v2/career_v2.hooks";
import type { Career } from "apis/career_v2/career_v2.types";

import styles from "./CareersAtMig.module.scss";

const JOB_LIMIT_ADDER = 5;

/**
 * @private
 */
export const JobListTable: FC = () => {
  /**
   * States
   */
  const [jobLimit, setJobLimit] = useState(JOB_LIMIT_ADDER);

  /**
   * Dependencies
   */
  const router = useRouter();

  const employmentTypeFilterValues = useJoinOurTeamStore((state) =>
    state.employmentTypeFilter.map(({ value }) => value).join(",")
  );

  const experienceRangeFilterValues = useJoinOurTeamStore((state) =>
    state.experienceRangeFilter.map(({ value }) => value).join(",")
  );

  const searchJobValue = useJoinOurTeamStore((state) => state.keyword);

  const { data, isLoading } = useGetPostedCareers(
    {
      role_type_id: employmentTypeFilterValues,
      experience_id: experienceRangeFilterValues,
      keyword: searchJobValue,
      rows: jobLimit,
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
      { title: "Employment Type", dataIndex: ["role_type", "name"] },
      { title: "Experience Range", dataIndex: ["experience", "str"] },
      {
        title: "",
        render: () => (
          <span>
            <svg
              className="w-8 h-4 text-primary100"
              viewBox="0 0 34 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11.5H33M33 11.5L19.9311 1.5M33 11.5L19.9311 22.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ),
      },
    ],
    []
  );

  const hasLoadedAllJobs = useMemo(() => {
    const totalJobs = Number(data?.total);
    if (isNaN(totalJobs)) {
      return false;
    }

    const nextLimit = jobLimit + JOB_LIMIT_ADDER;
    const diffLimit = nextLimit - totalJobs;

    if (diffLimit > JOB_LIMIT_ADDER) {
      return true;
    }

    return false;
  }, [data?.total, jobLimit]);

  /**
   * Callbacks
   */
  const onLoadMoreClicked = useCallback(() => {
    if (hasLoadedAllJobs) {
      return;
    }

    setJobLimit((currentLimit) => currentLimit + JOB_LIMIT_ADDER);
  }, [hasLoadedAllJobs]);

  const onRowClicked = (career: Career) => {
    router?.push(`/joinourteam/${career.slug}`);
  };

  return (
    <div className="grid grid-cols-1 mt-5  md:gap-y-8 px-4 md:px-[112px]">
      <p
        dangerouslySetInnerHTML={{
          __html: searchMessage,
        }}
      />

      <Table<Career>
        className={styles.jobListTable}
        columns={tableColumns}
        dataSource={data?.data || []}
        bordered={false}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
        rowClassName="hover:cursor-pointer hover:opacity-75 transition-opacity duration-300 shadow-md text-[18px]"
        onRow={(career) => ({
          onClick: () => onRowClicked(career),
        })}
      />
      {data && (
        <div className="flex flex-col justify-center items-center space-y-4 text-[18px]">
          <p>
            Showing{" "}
            <span className={"text-[18px] text-blackmig font-gilroysemibold"}>
              {data?.to}
            </span>{" "}
            out of{" "}
            <span className={"text-[18px] text-blackmig font-gilroysemibold"}>
              {data?.total} jobs
            </span>
          </p>

          <Button
            type="ghost"
            disabled={hasLoadedAllJobs}
            loading={isLoading}
            className={styles.ctaButton}
            onClick={onLoadMoreClicked}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
