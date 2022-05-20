import clsx from "clsx";

const ButtonSys = ({
  size,
  type,
  children,
  color,
  submit,
  onClick,
  form,
  selected,
  onChangeGambar,
  disabled,
  fullWidth,

  inputAccept, // only accept certain files type (`accept` <input>'s attribute)
  inputMultiple = false,
}) => {
  const commonButtonClassName = clsx(
    {
      "btn-sm": size !== "large",
      "w-full": fullWidth,
      "bg-disabled border-disabled": disabled,
    },
    "btn text-white font-semibold px-6 border"
  );

  const buttonSolidColorsClassName = clsx({
    "bg-state1 hover:bg-state12 border-state1 hover:border-state1":
      color === "danger" && !disabled,
    "bg-white hover:bg-gray-100 border-white hover:border-gray-100":
      color === "white" && !disabled,
    "bg-primary100 hover:bg-primary75 border-primary100 hover:border-primary75":
      !color && !disabled,
  });

  const buttonOutlineColorsClassName = clsx(
    {
      "text-state1 hover:bg-state1 border-state1": color === "danger",
      "text-primary100 hover:bg-primary75 border-primary100 hover:border-primary75":
        !color,
    },
    "hover:text-white bg-white"
  );

  const primaryButtonClassName = clsx(
    commonButtonClassName,
    buttonSolidColorsClassName
  );
  const defaultButtonClassName = clsx(
    commonButtonClassName,
    buttonOutlineColorsClassName
  );
  const ghostButtonClassName = clsx(
    commonButtonClassName,
    buttonOutlineColorsClassName,
    "border-none"
  );

  const buttonType = submit ? "submit" : "button";

  let buttonElement = null;
  switch (type) {
    case "primary":
      buttonElement = (
        <button
          disabled={disabled}
          form={form}
          onClick={onClick}
          type={buttonType}
          className={primaryButtonClassName}
        >
          {children}
        </button>
      );
      break;

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

    case "ghost":
      buttonElement = (
        <button
          form={form}
          onClick={onClick}
          type={buttonType}
          className={ghostButtonClassName}
        >
          {children}
        </button>
      );
      break;

    case "primaryInput":
      buttonElement = (
        <label onClick={onClick} className={primaryButtonClassName}>
          <input
            type="file"
            style={{ display: `none` }}
            name="urlgambarProduct"
            accept={inputAccept}
            multiple={inputMultiple}
            onChange={onChangeGambar}
          />
          {children}
        </label>
      );
      break;

    case "defaultInput":
      buttonElement = (
        <label onClick={onClick} className={defaultButtonClassName}>
          <input
            type="file"
            style={{ display: `none` }}
            name="urlgambarProduct"
            onChange={onChangeGambar}
          />
          {children}
        </label>
      );
      break;
  }

  return buttonElement;
};

export default ButtonSys;
