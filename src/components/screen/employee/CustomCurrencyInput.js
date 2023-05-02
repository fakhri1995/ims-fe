import { Input } from "antd";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

const CustomCurrencyInput = ({
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
        const field = {
          employee_salary_column_id: Number(dataColumn?.id),
          employee_payslip_id: Number(payslipId),
          is_amount_for_bpjs:
            dataForm.salaries?.find(
              (benefit) => benefit?.employee_salary_column_id === dataColumn.id
            )?.is_amount_for_bpjs ?? 0,
          value: floatValue || 0,
          column: {
            id: Number(dataColumn?.id),
            name: dataColumn?.name,
            type: Number(dataColumn?.type),
            required: dataColumn?.required,
          },
        };

        let temp = dataForm?.salaries || [];
        let idx = temp.findIndex(
          (item) => item.employee_salary_column_id === dataColumn?.id
        );

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
