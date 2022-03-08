import { FC, memo } from "react";

import clsx from "clsx";

/**
 * Component DataEmptyState's props.
 */
export interface IDataEmptyState {
  caption: string;

  illustrationImageUrl?: string;

  /** Class name untuk <span> element yang membungkus `caption` */
  captionClassName?: string;
  /** Class name untuk <img> element */
  illustrationImageClassName?: string;
}

/**
 * Component DataEmptyState adalah komponen untuk menampilkan suatu data ketika state Empty.
 *
 * Contoh penggunaan paling umum adalah ketika Table atau List tidak memiliki data. Dan komponen ini
 *  berperan sebagai "placeholder" atau indikator kalau data kosong.
 */
export const DataEmptyState: FC<IDataEmptyState> = memo(
  ({
    caption,
    illustrationImageUrl,
    captionClassName,
    illustrationImageClassName,
  }) => {
    const mCaptionClassName = clsx(
      "mig-caption text-mono50 text-center",
      captionClassName
    );

    const mIllustrationImageClassName = clsx(
      "pointer-events-none select-none",
      illustrationImageClassName
    );

    return (
      <div className="flex items-center justify-center">
        {/* Illustration and Text */}
        <div className="flex flex-col items-center space-y-4 py-10">
          <img
            src={illustrationImageUrl || "/404-illustration.png"}
            alt="Empty state data"
            className={mIllustrationImageClassName}
          />
          <span className={mCaptionClassName}>{caption}</span>
        </div>
      </div>
    );
  }
);
DataEmptyState.displayName = "DataEmptyState";
