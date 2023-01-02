import { Input } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";

const CustomCurrencyInput = ({
  fieldLabel,
  fieldName,
  benefitType,
  setDataForm,
  disabled,
  value,
}) => {
  // Auto update benefit variable if value change automatically in a disabled field
  useEffect(() => {
    if (disabled) {
      const timer = setTimeout(() => {
        setDataForm((prev) => ({
          ...prev,
          [benefitType]: { ...prev[benefitType], [fieldName]: value || 0 },
        }));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [value, disabled]);

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
        setDataForm((prev) => ({
          ...prev,
          [benefitType]: { ...prev[benefitType], [fieldName]: floatValue || 0 },
        }));
      }}
      renderText={(value) => <p>{value}</p>}
    />
  );
};

export default CustomCurrencyInput;
