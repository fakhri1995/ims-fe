import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { FC } from "react";

import { formatDateToLocale } from "lib/date-utils";

import { useGetPostedCareer } from "apis/career_v2";

import { JobAttributeDetail } from "./JobAttributeDetail";

const ShareButtonsGroup = dynamic(
  async () => (await import("./ShareButtonsGroup")).ShareButtonsGroup,
  { ssr: false }
);

export const JobDetail: FC = () => {
  /**
   * Dependencies
   */
  const router = useRouter();
  const slug = router.query?.job_slug as string;

  const { data, isLoading } = useGetPostedCareer(
    { slug },
    (response) => response.data.data
  );

  /**
   * Values
   */
  const formattedJobPostedDate = formatDateToLocale(
    data?.created_at,
    "MMMM dd, yyyy"
  );

  const currencyI18n = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const startSalaryRange = currencyI18n.format(data?.salary_min || 0);
  const endSalaryRange = currencyI18n.format(data?.salary_max || 0);

  const formattedSalaryRange = `${startSalaryRange} - ${endSalaryRange}`;

  return (
    <section className="py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12">
      <div className="w-full space-y-12 flex flex-col justify-between">
        {/* Job title */}
        <div className="space-y-12">
          {isLoading ? (
            <Skeleton active />
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold">{data?.name}</h2>

              {/* Share */}
              <ShareButtonsGroup />
            </>
          )}
        </div>

        {/* CTA */}
        <div className="">
          <span className="text-xl gilroy-regular hover:text-green-500">
            Apply for this job now!
          </span>
          <img
            className="mt-5 animate-bounce"
            src="/image/landingpage/arrow-down.png"
            style={{ width: 60 }}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-start space-y-12">
        <JobAttributeDetail
          loading={isLoading}
          label="Posted On"
          value={formattedJobPostedDate}
        />

        <JobAttributeDetail
          loading={isLoading}
          label="Employment Type"
          value={data?.role_type.name}
        />

        <JobAttributeDetail
          loading={isLoading}
          label="Experience Range"
          value={data?.experience.str}
        />

        <JobAttributeDetail
          loading={isLoading}
          label="Salary Range"
          value={formattedSalaryRange}
        />
      </div>
    </section>
  );
};
