import { Button, Tooltip } from "antd";

import clsx from "clsx";

const ButtonTooltip = ({
  size,
  children,
  color,
  submit,
  onClick,
  form,
  disabled,
  fullWidth,
  tooltipTitle,
  tooltipColor,
}) => {
  const commonButtonClassName = clsx(
    {
      "btn-sm": size !== "large",
      "w-full": fullWidth,
      "bg-disabled text-white border-disabled": disabled,
    },
    "btn font-semibold px-6 border"
  );

  const buttonOutlineColorsClassName = clsx(
    {
      "border-state2 hover:border-state2 hover:bg-state2":
        color == "state2" && !disabled,
      "border-secondary100 hover:border-secondary100 hover:bg-secondary100":
        color == "secondary100" && !disabled,
    },
    "hover:bg-opacity-75 hover:text-white"
  );

  const defaultButtonClassName = clsx(
    commonButtonClassName,
    buttonOutlineColorsClassName
  );

  const buttonType = submit ? "submit" : "button";

  return (
    <Tooltip placement="bottom" title={tooltipTitle} color={tooltipColor}>
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
};

export default ButtonTooltip;
