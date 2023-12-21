import { RiseOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo, useState } from "react";

import {
  getSearchResultMessage,
  useJoinOurTeamStore,
} from "stores/career/joinourteam.store";

import { formatDatePayload, momentFormatDate } from "lib/helper";

import { useGetPostedCareers } from "apis/career_v2/career_v2.hooks";
import type { Career } from "apis/career_v2/career_v2.types";

import en from "../../../../locales/en";
import id from "../../../../locales/id";
import {
  AccessTimeIconSvg,
  ArchivedIconSvg,
  ViewListIconSvg,
  ViewModuleIconSvg,
  WorkIconSvg,
} from "../../../icon";
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

  const [choiceList, setChoiceList] = useState("list");
  const currencyI18n = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const { locale } = router;
  const t = locale === "en" ? en : id;

  return (
    <div className={"mt-[41.5px]"}>
      <div className={"flex justify-between px-4 lg:px-[112px]"}>
        <p className={"text-mono30 text-[18px] font-bold leading-6"}>
          Latest Job Vacancy
        </p>
        <div className={"flex flex-row gap-3"}>
          {choiceList == "list" ? (
            <div
              className={`p-2 rounded hover:cursor-pointer bg-primarygreen`}
              onClick={() => setChoiceList("list")}
            >
              <ViewListIconSvg color={"#ffffff"} />
            </div>
          ) : (
            <div
              className={`p-2 rounded hover:cursor-pointer border border-solid border-inputkategori`}
              onClick={() => setChoiceList("list")}
            >
              <ViewListIconSvg />
            </div>
          )}
          {choiceList == "list" ? (
            <div
              className={`p-2 rounded hover:cursor-pointer border border-solid border-inputkategori`}
              onClick={() => setChoiceList("grid")}
            >
              <ViewModuleIconSvg color={"#E6E6E6"} />
            </div>
          ) : (
            <div
              className={`p-2 rounded hover:cursor-pointer bg-primarygreen`}
              onClick={() => setChoiceList("grid")}
            >
              <ViewModuleIconSvg />
            </div>
          )}
        </div>
      </div>
      {choiceList == "list" ? (
        <div className="grid grid-cols-1 mt-4  lg:gap-y-8 px-4 lg:px-[112px]">
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
                {locale == "en" ? "Showing " : "Menampilkan "}
                <span
                  className={"text-[18px] text-blackmig font-gilroysemibold"}
                >
                  {data?.to}
                </span>{" "}
                {locale == "en" ? "out of " : "dari "}
                <span
                  className={"text-[18px] text-blackmig font-gilroysemibold"}
                >
                  {data?.total} {locale == "en" ? "jobs" : "pekerjaan"}
                </span>
              </p>

              <Button
                type="ghost"
                disabled={hasLoadedAllJobs}
                loading={isLoading}
                className={styles.ctaButton}
                onClick={onLoadMoreClicked}
              >
                {locale == "en" ? "Load More" : "Lihat lebih banyak"}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className={"mt-4 px-4 lg:px-[112px]"}>
          <p>
            {locale == "en" ? "Showing " : "Menampilkan "}
            <span className={"text-[18px] text-blackmig font-gilroysemibold"}>
              {data?.to}
            </span>{" "}
            {locale == "en" ? "out of " : "dari "}
            <span className={"text-[18px] text-blackmig font-gilroysemibold"}>
              {data?.total} {locale == "en" ? "jobs" : "pekerjaan"}
            </span>
          </p>
          {data && data.data && (
            <div className={"grid grid-cols-4 gap-8"}>
              {data.data.map((newdata, key) => (
                <div
                  style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.05)" }}
                  className={
                    "mt-4 p-6 flex flex-col rounded-[5px] bg-white items-start self-stretch"
                  }
                >
                  <p className={"text-[18px] text-mono30 font-bold leading-6"}>
                    {newdata.name}
                  </p>
                  <p
                    className={"text-xs text-mono30 font-medium leading-5 mt-3"}
                  >
                    Posted on{" "}
                    {moment(newdata.created_at).format("DD MMMM YYYY")}
                  </p>
                  <div className={"flex flex-row gap-3 mt-[26px]"}>
                    <WorkIconSvg />
                    <p
                      className={
                        "font-gilroyregular text-xs font-medium leading-6 text-blackmig"
                      }
                    >
                      {currencyI18n.format(newdata.salary_min)} -{" "}
                      {currencyI18n.format(newdata.salary_max)}
                    </p>
                  </div>
                  <div className={"flex flex-row gap-3 mt-4"}>
                    <ArchivedIconSvg size={20} color={"#585858"} />
                    <p
                      className={
                        "font-gilroyregular text-xs font-medium leading-6 text-blackmig"
                      }
                    >
                      {newdata.role_type.name}
                    </p>
                  </div>
                  <div className={"flex flex-row gap-3 mt-4"}>
                    <AccessTimeIconSvg size={20} color={"#585858"} />
                    <p
                      className={
                        "font-gilroyregular text-xs font-medium leading-6 text-blackmig"
                      }
                    >
                      {newdata.experience.str}
                    </p>
                  </div>
                  <div
                    onClick={() => onRowClicked(newdata)}
                    className={
                      "mt-6 flex justify-center items-center gap-[9px] bg-primarygreen rounded py-4 w-full hover:cursor-pointer"
                    }
                  >
                    <p
                      className={
                        "text-[16px] font-gilroysemibold font-normal leading-6 text-white"
                      }
                    >
                      Apply Now
                    </p>
                    <RiseOutlined
                      rev={""}
                      style={{ fontSize: 20, color: "#FFFFFF" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
