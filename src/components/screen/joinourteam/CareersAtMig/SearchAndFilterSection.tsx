import { Button, Form, Input } from "antd";
import { FC, useCallback } from "react";

import { FilterDropdown } from "../FilterDropdown";
import {
  onFilterChanged,
  onSearchKeywordChanged,
} from "stores/career/joinourteam.store";

const dummyEmploymentTypeData = [
  { label: "Full Time", value: 1 },
  { label: "Part Time", value: 4 },
  { label: "Internship", value: 2 },
  { label: "Contract", value: 3 },
];

const dummyExperienceRangeData = [
  { label: "0-1 years", value: 1 },
  { label: "1-3 years", value: 2 },
  { label: "3-5 years", value: 3 },
  { label: "> 5 years", value: 4 },
];

/**
 * @private
 */
export const SearchAndFilter: FC = () => {
  /**
   * Callbacks
   */
  const onFormSubmitted = useCallback(({ keyword }: { keyword?: string }) => {
    onSearchKeywordChanged(keyword);
  }, []);

  const onFilterEmploymentTypeChanged = useCallback((value) => {
    onFilterChanged("employment-type", value);
  }, []);

  const onFilterExperienceRangeChanged = useCallback((value) => {
    onFilterChanged("experience-range", value);
  }, []);

  return (
    <Form
      className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
      onFinish={onFormSubmitted}
    >
      {/* Search */}
      <Form.Item noStyle name="keyword">
        <Input placeholder="Search jobs..." />
      </Form.Item>

      {/* Filter: Employment type */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <FilterDropdown
          label="Employment type"
          data={dummyEmploymentTypeData}
          onOptionChecked={onFilterEmploymentTypeChanged}
        />

        {/* Filter: Experience range */}
        <FilterDropdown
          label="Experience range"
          data={dummyExperienceRangeData}
          onOptionChecked={onFilterExperienceRangeChanged}
        />
      </div>

      {/* Button search */}
      <Button htmlType="submit">Search</Button>
    </Form>
  );
};
