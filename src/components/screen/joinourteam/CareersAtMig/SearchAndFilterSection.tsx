import { Button, Form, Input } from "antd";
import { FC, MouseEventHandler, useCallback } from "react";

import {
  onFilterChanged,
  onSearchKeywordChanged,
} from "stores/career/joinourteam.store";

import { FilterDropdown } from "../FilterDropdown";
import styles from "./CareersAtMig.module.scss";

const hardcodedEmploymentTypeData = [
  { label: "Full Time", value: 1 },
  { label: "Part Time", value: 4 },
  { label: "Internship", value: 2 },
  { label: "Contract", value: 3 },
];

const hardcodedExperienceRangeData = [
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
   * Dependencies
   */
  const [form] = Form.useForm();

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

  const onSearchButtonClicked = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      form?.submit();
      e.preventDefault();
    },
    [form]
  );

  const onFormValueChanged = useCallback(
    (changedValues: { keyword: string }) => {
      if (changedValues.keyword === "") {
        onSearchKeywordChanged("");
      }
    },
    []
  );

  return (
    <Form
      form={form}
      className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
      onFinish={onFormSubmitted}
      onValuesChange={onFormValueChanged}
    >
      {/* Search */}
      <Form.Item noStyle name="keyword">
        <Input placeholder="Search jobs..." />
      </Form.Item>

      {/* Filter: Employment type */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <FilterDropdown
          label="Employment type"
          data={hardcodedEmploymentTypeData}
          onOptionChecked={onFilterEmploymentTypeChanged}
        />

        {/* Filter: Experience range */}
        <FilterDropdown
          label="Experience range"
          data={hardcodedExperienceRangeData}
          onOptionChecked={onFilterExperienceRangeChanged}
        />
      </div>

      {/* Button search */}
      <Button className={styles.ctaButton} onClick={onSearchButtonClicked}>
        Search
      </Button>
    </Form>
  );
};
