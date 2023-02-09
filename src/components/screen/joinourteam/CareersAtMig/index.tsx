import { useRouter } from "next/router";
import type { FC } from "react";

import en from "../../../../locales/en";
import id from "../../../../locales/id";
import { JobListTable } from "./JobListTable";
import { SearchAndFilter } from "./SearchAndFilterSection";

export const CareersAtMig: FC = () => {
  const router = useRouter();

  const { locale } = router;
  const t = locale === "en" ? en : id;

  return (
    <section className="section7careers pb-10 md:pb-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 space-y-8">
      {/* Section Heading */}
      <div>
        <h2
          style={{ lineHeight: "120%" }}
          className="text-center gilroy-semibold text-2xl text-blackmig font-semibold md:text-[36px] pb-8"
        >
          {t.vacancylistsectiontitle}
        </h2>
        <p
          style={{ lineHeight: "150%" }}
          className="pb-8 text-center text-xl gilroy-regular text-blackmig"
        >
          {t.vacancylistsectiondescription}
        </p>
      </div>

      {/* Input data: Search and Filter */}
      <SearchAndFilter />

      {/* Display data: Table */}
      <JobListTable />

      {/* Notes */}
      <div className="flex flex-col justify-center items-center">
        <span className="h-[2px] bg-primarygreen w-[200px] md:w-60 block" />

        <p
          style={{ lineHeight: "150%" }}
          className="pb-12 md:pb-8 text-xl text-black text-center mt-4"
        >
          {t.vacancylistsectiondescriptionbelow}{" "}
          <a
            style={{ lineHeight: "150%" }}
            href="mailto:recruitment@mitrasolusi.group"
            className="text-xl text-blackmig font-semibold"
          >
            recruitment@mitrasolusi.group
          </a>{" "}
          {t.vacancylistsectiondescriptionbelow2}
        </p>
      </div>
    </section>
  );
};
