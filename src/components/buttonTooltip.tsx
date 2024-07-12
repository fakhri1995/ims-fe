import { Button, Tooltip } from "antd";
import { ButtonType } from "antd/lib/button";
import { FC, MouseEventHandler, ReactNode } from "react";

import clsx from "clsx";

export interface IButtonTooltip {
  size?: "large";
  square?: boolean;
  type: ButtonType;
  children: ReactNode;
  color?: string;
  submit?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  form?: string;
  disabled: boolean;
  fullWidth?: boolean;
  tooltipTitle: string;
  tooltipColor?: string;
}

const ButtonTooltip: FC<IButtonTooltip> = ({
  size,
  square,
  type = "default",
  children,
  color = "primary100",
  submit,
  onClick,
  form,
  disabled,
  fullWidth,
  tooltipTitle,
  tooltipColor = "#000000",
}) => {
  const commonButtonClassName = clsx(
    {
      "btn-sm": size !== "large",
      "btn-square ": square,
      "w-full": fullWidth,
      "bg-disabled text-white border-disabled": disabled,
    },
    "btn font-semibold border"
  );

  const buttonSolidColorsClassName = clsx({
    "bg-state1 hover:opacity-75 text-white border-state1 hover:border-state1":
      color === "danger" && !disabled,
    "bg-white hover:bg-gray-100 border-white hover:border-gray-100":
      color === "white" && !disabled,
    "bg-mono100 text-neutrals100 border-mono100 hover:bg-primary100 hover:text-white hover:border-primary100 ":
      color === "mono100" && !disabled,
    "bg-mono50 text-white border-mono50 hover:opacity-75":
      color === "mono50" && !disabled,
    "bg-secondary100 text-white border-secondary100 hover:opacity-75":
      color === "secondary100" && !disabled,
    "bg-primary100 hover:bg-primary75 text-white border-primary100 hover:border-primary75":
      !color && !disabled,
  });

  const buttonOutlineColorsClassName = clsx(
    {
      "text-state2 border-state2 hover:border-state2 hover:bg-state2":
        color == "state2" && !disabled,
      "text-secondary100 border-secondary100 hover:border-secondary100 hover:bg-secondary100":
        color == "secondary100" && !disabled,
    },
    "hover:bg-opacity-75 hover:text-white"
  );

  const primaryButtonClassName = clsx(
    commonButtonClassName,
    buttonSolidColorsClassName
  );

  const defaultButtonClassName = clsx(
    commonButtonClassName,
    buttonOutlineColorsClassName
  );

  const buttonType = submit ? "submit" : "button";

  let buttonElement = null;
  switch (type) {
    case "primary":
      buttonElement = (
        <Tooltip placement="bottom" title={tooltipTitle} color={tooltipColor}>
          <button
            disabled={disabled}
            form={form}
            onClick={onClick}
            type={buttonType}
            className={primaryButtonClassName}
          >
            {children}
          </button>
        </Tooltip>
      );
      break;

    case "default":
      buttonElement = (
        <Tooltip placement="bottom" title={tooltipTitle} color={tooltipColor}>
          <button
            disabled={disabled}
            form={form}
            onClick={onClick}
            type={buttonType}
            className={defaultButtonClassName}
          >
            {children}
          </button>
        </Tooltip>
      );
      break;
  }

  return buttonElement;
};

export default ButtonTooltip;
