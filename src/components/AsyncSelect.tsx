import { Select } from "antd";
import React, { FC, useEffect, useRef } from "react";

/**
 * A select component + auto loads more options on scrolled
 */
interface IAsyncSelect {
  value: number;
  placeholder: string;
  disabled: boolean;
  className: string;
  onChange: (value: any, option: any) => void;
  data: any[];
  lock: boolean;
  setFilterParams: React.Dispatch<React.SetStateAction<any>>;
  allowClear: true;
}

const AsyncSelect: FC<IAsyncSelect> = ({
  value,
  placeholder,
  disabled,
  className = "",
  onChange,
  data,
  lock,
  setFilterParams,
  allowClear = false,
}) => {
  const timeoutRef = useRef(null);

  const handleSearch = (value) => {
    // Clear the previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setFilterParams((prev) => ({
        ...prev,
        page: 1,
        keyword: value,
      }));
    }, 500);
  };

  useEffect(() => {
    // Clean up the timeout when the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Select
      showSearch
      value={value}
      allowClear={allowClear}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      onChange={onChange}
      onSearch={handleSearch}
      optionFilterProp="children"
      filterOption={(input, option: { label: string; value: number }) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      onPopupScroll={(e) => {
        if (!lock) {
          setFilterParams((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      }}
    >
      {data?.map((item) => {
        return (
          <Select.Option key={item?.id} value={item?.id} label={item?.name}>
            {item?.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default AsyncSelect;
