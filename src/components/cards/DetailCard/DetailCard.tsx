import { Skeleton } from "antd";
import { FC, ReactNode, memo } from "react";
import React from "react";

import clsx from "clsx";

/**
 * Component DetailCard's props.
 */
export interface IDetailCard {
  /**
   * All additional information to be displayed in the card.
   */
  content: CardContentType[];

  /** An indicator to render its content as Skeleton */
  isLoading?: boolean;
  /** Number of skeleton will be rendered (when isLoading === true) */
  estimatedContentLength?: number;

  /**
   * Optional React component to be composed with this card as Heaeder or Footer.
   */
  header?: ReactNode;
  footer?: ReactNode;

  /** Class name to card's wrapper <div> element. */
  className?: string;
}

/**
 * Component DetailCard is a component that used some information with label-content style structure.
 * It's possible the card to have custom Header or Footer as another React Component.
 *
 * Implementation examples:
 * - Detail Form Aktivitas
 * - Detail Ticket
 */
export const DetailCard: FC<IDetailCard> = ({
  header,
  content,
  footer,
  isLoading = false,
  estimatedContentLength = 3,
  className,
}) => {
  const wrapperClassName = clsx("mig-platform flex flex-col", className);

  const hasHeader = React.isValidElement(header);
  const hasFooter = React.isValidElement(footer);

  const contentClassName = clsx("space-y-5", {
    "mt-4": hasHeader,
    "mb-4": hasFooter,
  });

  return (
    <div className={wrapperClassName}>
      {/* Header */}
      {hasHeader && header}

      <div className={contentClassName}>
        {/* Skeleton animation */}
        {isLoading &&
          Array(estimatedContentLength)
            .fill(null)
            .map((_, idx) => (
              <CardContent key={idx} label="" content="" renderAsSkeleton />
            ))}

        {/* Content */}
        {!isLoading &&
          content?.map((contentValue, idx) => (
            <CardContent key={idx} {...contentValue} />
          ))}
      </div>

      {/* Footer */}
      {hasFooter && footer}
    </div>
  );
};

/**
 * @private
 */
type CardContentType = {
  label: string;
  content: string | ReactNode;

  className?: string;
  labelClassName?: string;
  contentClassName?: string;

  renderAsSkeleton?: boolean;
};

/**
 * @private
 */
const CardContent: FC<CardContentType> = memo(
  ({
    label,
    content,
    renderAsSkeleton,
    className,
    labelClassName,
    contentClassName,
  }) => {
    if (renderAsSkeleton) {
      return <Skeleton round active paragraph={{ rows: 1 }} />;
    }

    const mLabelClassName = clsx(
      "mig-caption text-gray-400 block mb-2",
      labelClassName
    );
    const mContentClassName = clsx("text-gray-500 block", contentClassName);

    /** True => ReactNode, False => string */
    const isContentReactNode = React.isValidElement(content);

    return (
      <div className={className}>
        <span className={mLabelClassName}>{label}</span>
        {isContentReactNode && content}
        {!isContentReactNode && (
          <span className={mContentClassName}>{content}</span>
        )}
      </div>
    );
  }
);
CardContent.displayName = "CardContent";
