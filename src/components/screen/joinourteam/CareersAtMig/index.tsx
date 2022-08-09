import { Button, Form, Input } from "antd";
import type { FC } from "react";

import { FilterDropdown } from "../FilterDropdown";

export const CareersAtMig: FC = () => {
  return (
    <section className="section7careers pb-10 md:pb-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20">
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

      {/* Search and filter */}
      <Form
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
        onFinish={() => {
          console.log("form finish!");
        }}
      >
        {/* Search */}
        <Form.Item noStyle>
          <Input placeholder="Search jobs..." />
        </Form.Item>

        {/* Filter: Employment type */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <FilterDropdown
            label="Employment type"
            data={[
              { label: "Full Time", value: "full-time" },
              { label: "Part Time", value: "part-time" },
              { label: "Internship", value: "internship" },
              { label: "Contract", value: "contract" },
            ]}
          />

          {/* Filter: Experience range */}
          <FilterDropdown
            label="Experience range"
            data={[
              { label: "0-1 years", value: "0,1" },
              { label: "1-3 years", value: "1,3" },
              { label: "3-5 years", value: "3,5" },
              { label: "> 5 years", value: "5+" },
            ]}
          />
        </div>

        {/* Button search */}
        <Button htmlType="submit">Search</Button>
      </Form>
    </section>
  );
};
