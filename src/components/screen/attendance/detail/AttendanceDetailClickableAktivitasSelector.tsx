import type { FC } from "react";

import { formatDateToLocale } from "lib/date-utils";

import clsx from "clsx";

/**
 * Component AttendanceDetailClickableAktivitasSelector's props.
 */
export interface IAttendanceDetailClickableAktivitasSelector {
  content: Date | string | number;
  onClick: () => void;

  isActive?: boolean;
}

/**
 * Component AttendanceDetailClickableAktivitasSelector
 */
export const AttendanceDetailClickableAktivitasSelector: FC<
  IAttendanceDetailClickableAktivitasSelector
> = ({ content, onClick, isActive }) => {
  const aktivitasClickableItemClassName = clsx("px-6 py-3 transition-colors", {
    "font-bold text-primary100 bg-primary100/10": isActive,
    "text-mono30 hover:cursor-pointer hover:bg-primary75/10": !isActive,
  });

  return (
    <div className={aktivitasClickableItemClassName} onClick={onClick}>
      <span>{formatDateToLocale(content as Date, "HH:mm")}</span>
    </div>
  );
};
