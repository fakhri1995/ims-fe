import { Button, Tooltip, notification } from "antd";
import { useCallback, useRef } from "react";

import clsx from "clsx";

const ButtonSysColor = ({
  size,
  type,
  children,
  color,
  submit,
  onClick,
  form,
  disabled,
  fullWidth,
  tooltipTitle,
}) => {
  const commonButtonClassName = clsx(
    {
      "btn-sm": size !== "large",
      "w-full": fullWidth,
      "bg-disabled border-disabled": disabled,
    },
    "btn text-white font-semibold px-6 border"
  );

  const buttonOutlineColorsClassName = clsx(`
    hover:opacity-75 ${color}

  `);

  const defaultButtonClassName = clsx(
    commonButtonClassName,
    buttonOutlineColorsClassName
  );

  const buttonType = submit ? "submit" : "button";

  let buttonElement = null;
  switch (type) {
    case "default":
      buttonElement = (
        <button
          disabled={disabled}
          form={form}
          onClick={onClick}
          type={buttonType}
          className={defaultButtonClassName}
        >
          {children}
        </button>
      );
      break;

    case "tooltip":
      buttonElement = (
        <Tooltip placement="bottom" title={tooltipTitle} color="#35763B">
          <Button
            disabled={disabled}
            form={form}
            onClick={onClick}
            type={buttonType}
            className={defaultButtonClassName}
          >
            {children}
          </Button>
        </Tooltip>
      );
      break;
  }

  return buttonElement;
};

export default ButtonSysColor;
