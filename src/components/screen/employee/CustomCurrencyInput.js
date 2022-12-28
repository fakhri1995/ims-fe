import { Input } from "antd";
import React from "react";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";

const CustomCurrencyInput = ({
  fieldLabel,
  fieldName,
  setDataForm,
  disabled,
}) => {
  const [formattedNominal, setFormattedNominal] = useState(0);
  return (
    <CurrencyFormat
      customInput={Input}
      placeholder={`Masukkan ${fieldLabel}`}
      value={formattedNominal}
      thousandSeparator={"."}
      decimalSeparator={","}
      prefix={"Rp"}
      suffix={",00"}
      disabled={disabled}
      onValueChange={(values) => {
        const { formattedValue, value } = values;
        // formattedValue = $2,223
        // value ie, 2223
        setFormattedNominal(formattedValue);
        setDataForm((prev) => ({
          ...prev,
          benefit: { ...prev.benefit, [fieldName]: value },
        }));
      }}
    />
  );
};

export default CustomCurrencyInput;
