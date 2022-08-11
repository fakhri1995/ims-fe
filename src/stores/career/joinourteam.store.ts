import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import shallow from "zustand/shallow";

/**
 * Types
 */
type JoinOurTeamState = {
  keyword: string;
  employmentTypeFilter: FilterItemType[];
  experienceRangeFilter: FilterItemType[];
};

type FilterItemType = {
  checked: boolean;
  label: string;
  value: number;
};

const initialState: JoinOurTeamState = {
  keyword: "",
  employmentTypeFilter: [],
  experienceRangeFilter: [],
};

/**
 * Store
 */
export const useJoinOurTeamStore = create(
  devtools(
    immer(() => initialState),
    { enabled: process.env.NODE_ENV === "development" }
  )
);

/**
 * Shows a search result message if there is some applied filters.
 * E.g. "Showing results for “<keyword>” with job types <employmentTypeFilter> and experience ranges <experienceRangeFilter>."
 */
export const getSearchResultMessage = () => {
  const { keyword, employmentTypeFilter, experienceRangeFilter } =
    useJoinOurTeamStore((state) => state, shallow);

  const noFilterApplied = [
    keyword,
    employmentTypeFilter,
    experienceRangeFilter,
  ].every((value) => value.length === 0);
  if (noFilterApplied) {
    return "&zwnj;"; // invisible character (for better UX)
  }

  let searchResultMessage = "Showing results ";
  if (keyword.length > 0) {
    searchResultMessage += `for <strong>${keyword}</strong> `;
  }

  if (employmentTypeFilter.length > 0) {
    if (keyword.length > 0) {
      searchResultMessage += "with job types ";
    } else {
      searchResultMessage += "for job types ";
    }

    const jobTypes = employmentTypeFilter.map(({ label }) => label).join(", ");
    searchResultMessage += `<strong>${jobTypes}</strong> `;
  }

  if (experienceRangeFilter.length > 0) {
    if (keyword.length > 0 || employmentTypeFilter.length > 0) {
      searchResultMessage += "and experience ranges ";
    } else {
      searchResultMessage += "experience ranges ";
    }

    const experienceRanges = experienceRangeFilter
      .map(({ label }) => label)
      .join(", ");

    searchResultMessage += `<strong>${experienceRanges}</strong>.`;
  }

  if (searchResultMessage[searchResultMessage.length - 1] !== ".") {
    searchResultMessage += ".";
  }

  return searchResultMessage;
};

/**
 * Actions / Events
 */
export const onSearchKeywordChanged = (newKeywordValue: string) =>
  useJoinOurTeamStore.setState((state) => {
    state.keyword = newKeywordValue;
  });

export const onFilterChanged = (
  filterType: "employment-type" | "experience-range",
  newFilters: FilterItemType[]
) =>
  useJoinOurTeamStore.setState((state) => {
    switch (filterType) {
      case "employment-type":
        state.employmentTypeFilter = newFilters;
        break;
      case "experience-range":
        state.experienceRangeFilter = newFilters;
        break;
    }
  });
