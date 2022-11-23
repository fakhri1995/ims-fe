import { Button, Checkbox, Dropdown } from "antd";
import { FC, memo, useCallback, useEffect, useState } from "react";

import IconChevronDown from "assets/vectors/icon-chevron-down.svg";

import clsx from "clsx";

type FilterItemType = {
  label: string;
  value: any;
};

type CheckableFilterItemType = { checked: boolean } & FilterItemType;

interface FilterDropdownProps {
  label: string;
  data?: FilterItemType[];
  onOptionChecked?: (checkedItems: CheckableFilterItemType[]) => void;
}

export const FilterDropdown: FC<FilterDropdownProps> = memo(
  ({ label, data = [], onOptionChecked = () => {} }) => {
    /**
     * States
     */
    const [_data, _setData] = useState<CheckableFilterItemType[]>([]);
    const [countSelectedOptions, setCountSelectedOptions] = useState(0);

    /**
     * Effects
     */
    useEffect(() => {
      if (data.length === 0) {
        return;
      }

      _setData(data.map((rest) => ({ checked: false, ...rest })));
    }, [data]);

    useEffect(() => {
      if (_data.length === 0) {
        return;
      }

      const checkedItems = _data.filter(({ checked }) => checked);
      onOptionChecked?.call(null, checkedItems);

      setCountSelectedOptions(checkedItems.length);
    }, [_data, onOptionChecked]);

    /**
     * Callbacks
     */
    const onOptionSelected = useCallback(
      (index: number) => {
        _setData((data) =>
          data.map((datum, _index) =>
            _index !== index
              ? datum
              : {
                  ...datum,
                  checked: !datum.checked,
                }
          )
        );
      },
      [_setData, _data]
    );

    /**
     * Classnames
     */
    const countOptionIndicatorClassName = clsx(
      "bg-[#D9D9D9] rounded-md inline-block px-2 py-1 text-xs",
      countSelectedOptions > 0 ? "visible" : "invisible"
    );

    return (
      <Dropdown
        trigger={["click"]}
        overlayStyle={{
          padding: 0,
          margin: 0,
        }}
        overlay={
          <div className="px-4 py-2 w-full bg-white h-[40px] border border-lightgrey">
            {_data.map(({ label, checked }, index) => (
              <div
                key={index}
                onClick={(e) => {
                  onOptionSelected(index);
                }}
                className="flex items-center space-x-4 py-2 border border-lightgrey hover:bg-[#e4e4e4] hover:cursor-pointer transition-colors duration-300"
              >
                <Checkbox checked={checked} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        }
      >
        <Button
          className="flex items-center bg-white h-[40px] border border-lightgrey p-0 px-2 m-0 w-full space-x-2"
          type="text"
          disabled={data.length === 0}
        >
          <span className="block text-left flex-grow">{label}</span>

          <div className="flex items-center flex-shrink-0 space-x-3">
            <span className={countOptionIndicatorClassName}>
              {countSelectedOptions}
            </span>

            <IconChevronDown className="w-2 h-2" />
          </div>
        </Button>
      </Dropdown>
    );
  }
);
