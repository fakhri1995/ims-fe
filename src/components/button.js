import { notification } from "antd";
import { useCallback, useRef } from "react";

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
  inputFileMaxSize = 5, // in MiB
}) => {
  // Reference to <input> element
  // we need to reset its value on each `onClick` event is fired up.
  const inputRef = useRef(null);

  /**
   * Callback untuk membungkus `onChangeGambar` dengan tambahan logic,
   *  misal filter file size.
   */
  const onInputChange = useCallback(
    (e) => {
      if (onChangeGambar === undefined) {
        return undefined;
      }

      const file = e.target.files[0];

      const fileSizeInMb = Number.parseFloat(
        (file.size / 1024 / 1024).toFixed(2)
      );

      if (fileSizeInMb > inputFileMaxSize) {
        notification.error({
          message: `Ukuran File ${fileSizeInMb} MiB melebih batas persyaratan maksimum sebesar ${inputFileMaxSize} MiB`,
        });

        return;
      }

      onChangeGambar?.call(null, e);
    },
    [onChangeGambar]
  );

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

  const dashedButtonClassName = clsx(
    "border border-dashed border-primary100",
    "hover:border-primary75 py-3.5 flex justify-center",
    "items-center w-full rounded-md cursor-pointer bg-white"
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

    case "dashed":
      buttonElement = (
        <button
          form={form}
          onClick={onClick}
          type={buttonType}
          className={dashedButtonClassName}
        >
          {children}
        </button>
      );
      break;

    case "primaryInput":
      buttonElement = (
        <label
          onClick={() => {
            onClick?.call(null);

            // reset the input's value attribute so we can choose the exact same file multiple times.
            inputRef.current.value = null;
          }}
          className={primaryButtonClassName}
        >
          <input
            type="file"
            ref={inputRef}
            style={{ display: `none` }}
            name="urlgambarProduct"
            accept={inputAccept}
            onChange={onInputChange}
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
            onChange={onInputChange}
          />
          {children}
        </label>
      );
      break;
  }

  return buttonElement;
};

export default ButtonSys;
