import type { FC } from "react";

import { JobListTable } from "./JobListTable";
import { SearchAndFilter } from "./SearchAndFilterSection";

export const CareersAtMig: FC = () => {
  return (
    <section className="section7careers pb-10 md:pb-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 space-y-8">
      {/* Section Heading */}
      <div>
        <h3 className="text-center gilroy-bold text-3xl md:text-4xl pb-8">
          Careers at MIG
        </h3>
        <p className="pb-8 text-xl">
          Want to advance your career with us ? See our job openings below for
          our current financial services and government projects.
        </p>
      </div>

      {/* Input data: Search and Filter */}
      <SearchAndFilter />

      {/* Display data: Table */}
      <JobListTable />

      {/* Notes */}
      <div className="flex flex-col justify-center items-center space-y-8">
        <span className="h-[3px] bg-primary100 w-60 block" />

        <p className="pb-8 text-xl text-center">
          Didn't find the role that best describes your skills ? Send your CV to{" "}
          <a href="mailto:recruitment@mitrasolusi.group" className="font-bold">
            recruitment@mitrasolusi.group
          </a>{" "}
          for potential opportunities.
        </p>
      </div>
    </section>
  );
};
