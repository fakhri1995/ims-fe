import { Input } from "antd";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

const CustomCurrencyInput = ({
  idx,
  fieldLabel,
  fieldName,
  dataForm,
  setDataForm,
  disabled,
  value,
  dataColumn,
  payslipId,
}) => {
  // Auto update benefit variable if value change automatically in a disabled field (currently only used in BPJS field)
  useEffect(() => {
    if (disabled) {
      setDataForm((prev) => ({
        ...prev,
        [fieldName]: value || 0,
      }));
    }
  }, [value]);

  return (
    <CurrencyFormat
      customInput={Input}
      placeholder={`Masukkan ${fieldLabel}`}
      value={value || 0}
      thousandSeparator={"."}
      decimalSeparator={","}
      prefix={"Rp"}
      allowNegative={false}
      disabled={disabled}
      onValueChange={(values) => {
        const { formattedValue, value, floatValue } = values;
        // formattedValue = $2,223
        // value ie, 2223
        const field = {
          id: idx,
          employee_salary_column_id: dataColumn?.id,
          employee_payslip_id: payslipId,
          value: floatValue || 0,
          column: {
            id: dataColumn?.id,
            name: dataColumn?.name,
            type: dataColumn?.type,
            required: dataColumn?.required,
          },
        };

        let temp = dataForm?.salaries || [];
        temp[idx] = field;

        setDataForm((prev) => ({
          ...prev,
          salaries: temp,
        }));
      }}
      renderText={(value) => <p>{value}</p>}
    />
  );
};

export default CustomCurrencyInput;
