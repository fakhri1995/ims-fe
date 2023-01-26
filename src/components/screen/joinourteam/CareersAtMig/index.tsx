import type { FC } from "react";

import { JobListTable } from "./JobListTable";
import { SearchAndFilter } from "./SearchAndFilterSection";

export const CareersAtMig: FC = () => {
  return (
    <section className="section7careers pb-10 md:pb-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 space-y-8">
      {/* Section Heading */}
      <div>
        <h2
          style={{ lineHeight: "120%" }}
          className="text-center gilroy-semibold text-2xl text-blackmig font-semibold md:text-[36px] pb-8"
        >
          Careers at MIG
        </h2>
        <p
          style={{ lineHeight: "150%" }}
          className="pb-8 text-center text-xl gilroy-regular text-blackmig"
        >
          Want to advance your career with us ? See our job openings below for
          our current financial services and government projects.
        </p>
      </div>

      {/* Input data: Search and Filter */}
      <SearchAndFilter />

      {/* Display data: Table */}
      <JobListTable />

      {/* Notes */}
      <div className="flex flex-col justify-center items-center">
        <span className="h-[2px] bg-primarygreen w-[200px] md:w-60 block" />

        <p className="pb-12 md:pb-8 text-base text-black text-center mt-4">
          Didn't find the role that best describes your skills ? Send your CV to{" "}
          <a
            href="mailto:recruitment@mitrasolusi.group"
            className="text-base text-blackmig font-semibold"
          >
            recruitment@mitrasolusi.group
          </a>{" "}
          for potential opportunities.
        </p>
      </div>
    </section>
  );
};
