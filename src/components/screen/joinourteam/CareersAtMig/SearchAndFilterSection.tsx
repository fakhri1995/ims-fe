import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { FC, MouseEventHandler, useCallback } from "react";

import {
  onFilterChanged,
  onSearchKeywordChanged,
} from "stores/career/joinourteam.store";

import { ExperienceId, RoleTypeId } from "apis/career_v2/career_v2.types";

import en from "../../../../locales/en";
import id from "../../../../locales/id";
import { FilterDropdown } from "../FilterDropdown";
import styles from "./CareersAtMig.module.scss";

const hardcodedEmploymentTypeData = [
  { label: "Full Time", value: RoleTypeId.FULL_TIME },
  { label: "Part Time", value: RoleTypeId.PART_TIME },
  { label: "Internship", value: RoleTypeId.INTERNSHIP },
  { label: "Contract", value: RoleTypeId.CONTRACT },
];

const hardcodedExperienceRangeData = [
  { label: "0-1 years", value: ExperienceId.ZERO_TO_ONE_YEAR },
  { label: "1-3 years", value: ExperienceId.ONE_TO_THREE_YEAR },
  { label: "3-5 years", value: ExperienceId.THREE_TO_FIVE_YEAR },
  { label: "> 5 years", value: ExperienceId.FIVE_AND_MORE_YEAR },
];

/**
 * @private
 */
export const SearchAndFilter: FC = () => {
  /**
   * Dependencies
   */
  const [form] = Form.useForm();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : id;
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
      className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 lg:px-[122px]"
      onFinish={onFormSubmitted}
      onValuesChange={onFormValueChanged}
    >
      {/* Search */}
      <Form.Item noStyle name="keyword">
        <Input
          style={{ height: "37px", border: "1px solid #B8B8B8", fontSize: 18 }}
          placeholder={t.searchjobs}
        />
      </Form.Item>

      {/* Filter: Employment type */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0">
        <FilterDropdown
          label={t.employ_type}
          data={hardcodedEmploymentTypeData}
          onOptionChecked={onFilterEmploymentTypeChanged}
        />

        {/* Filter: Experience range */}
        <FilterDropdown
          label={t.experiencerange}
          data={hardcodedExperienceRangeData}
          onOptionChecked={onFilterExperienceRangeChanged}
        />
      </div>

      {/* Button search */}
      <Button
        className={
          "bg-primarygreen hidden lg:block rounded text-white text-base w-[85px] h-[40px]"
        }
        onClick={onSearchButtonClicked}
      >
        {locale == "en" ? "Search" : "Cari"}
      </Button>
      <Button
        className={
          "bg-primarygreen lg:hidden rounded text-white text-base w-full h-[40px]"
        }
        onClick={onSearchButtonClicked}
      >
        {locale == "en" ? "Search" : "Cari"}
      </Button>
    </Form>
  );
};
