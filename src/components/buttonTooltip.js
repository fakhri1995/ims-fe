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

  const buttonOutlineColorsClassName = clsx(`
    hover:opacity-75 ${color}
  `);

  const defaultButtonClassName = clsx(
    commonButtonClassName,
    buttonOutlineColorsClassName
  );

  const buttonType = submit ? "submit" : "button";

  return (
    <Tooltip
      placement="bottom"
      title={tooltipTitle}
      color={tooltipColor}
      className
    >
      <Button
        disabled={disabled}
        form={form}
        onClick={onClick}
        type={buttonType}
        className={`${defaultButtonClassName} bg-transparent hover:bg-transparent`}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default ButtonTooltip;
