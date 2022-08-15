import { Skeleton } from "antd";
import { useRouter } from "next/router";
import type { FC } from "react";

import { useGetPostedCareer } from "apis/career_v2";

export const Overview: FC = () => {
  /**
   * Dependencies
   */
  const router = useRouter();
  const slug = router.query?.job_slug as string;

  const { data, isLoading } = useGetPostedCareer(
    { slug },
    (response) => response.data.data
  );

  return (
    <section
      className="flex flex-col
      py-10 md:py-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 space-y-8
      "
    >
      <article>
        <h3 className="text-3xl md:text-4xl font-bold mb-4 md:text-center">
          Overview
        </h3>

        {/* TODO: parse markdown / whatever the actual content is */}
        {isLoading ? (
          <Skeleton title={false} active />
        ) : (
          <p>{data?.overview}</p>
        )}
      </article>

      {/* Job Desc & Min. Req */}
      <div className="flex flex-col space-y-8 md:space-y-0 md:space-x-12 md:flex-row">
        <article className="w-full">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Job Description
          </h3>

          {isLoading ? (
            <Skeleton title={false} active />
          ) : (
            <p>{data?.description}</p>
          )}
        </article>

        <article className="w-full">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Minimum Requirement
          </h3>

          {isLoading ? (
            <Skeleton title={false} active />
          ) : (
            <p>{data?.qualification}</p>
          )}
        </article>
      </div>
    </section>
  );
};
