import { Skeleton } from "antd";
import { FC, memo, useMemo } from "react";
import React from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import ButtonBack from "components/buttonBack";
import { DetailCard, IDetailCard } from "components/cards/DetailCard";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ATTENDANCE_FORM_DELETE,
  ATTENDANCE_FORM_GET,
  ATTENDANCE_FORM_UPDATE,
} from "lib/features";
import { generateStaticAssetUrl } from "lib/helper";

import {
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
} from "apis/attendance";

import EditIcon from "assets/vectors/icon-edit.svg";

export interface IDetailFormAktivitasCard {
  onUbahButtonClicked?: () => void;

  aktivitasId?: number;
}

export const DetailFormAktivitasCard: FC<IDetailFormAktivitasCard> = memo(
  ({ onUbahButtonClicked, aktivitasId }) => {
    const axiosClient = useAxiosClient();
    const { hasPermission } = useAccessControl();
    const isAllowedToUpdateFormDetail = hasPermission(ATTENDANCE_FORM_UPDATE);
    const isAllowedToDeleteFormDetail = hasPermission(ATTENDANCE_FORM_DELETE);

    const canOpenUpdateDrawer =
      isAllowedToUpdateFormDetail || isAllowedToDeleteFormDetail;

    const { data, isLoading } = useQuery(
      [AttendanceFormAktivitasServiceQueryKeys.FIND_ONE, aktivitasId],
      () => AttendanceFormAktivitasService.findOne(axiosClient, aktivitasId),
      {
        enabled: hasPermission(ATTENDANCE_FORM_GET),
        select: (response) => {
          /** Reformat date value and replace profile_image with null if there is no image atm */
          const formattedUpdatedDate = formatDateToLocale(
            new Date(response.data.data.updated_at),
            "dd MMMM yyyy"
          );

          return {
            ...response.data.data,
            updated_at: formattedUpdatedDate,
            creator: {
              ...response.data.data.creator,
              profile_image: generateStaticAssetUrl(
                response.data.data.creator.profile_image.link
              ),
            },
          };
        },
      }
    );

    const detailCardContent = useMemo(() => {
      if (!data) {
        return [];
      }

      const detailCardContent: Pick<IDetailCard, "content"> = { content: [] };

      detailCardContent.content.push({
        label: "",
        content: data.description,
      });

      detailCardContent.content.push({
        label: "Date Modified",
        content: data.updated_at,
      });

      detailCardContent.content.push({
        label: "Created by",
        content: data.creator.name,
      });

      detailCardContent.content.push({
        label: "Total Staff",
        content: data.users.length,
      });

      return detailCardContent.content;
    }, [data]);

    const cardHeader = (
      <div className="flex items-center gap-3">
        <ButtonBack />
        {/* Title */}
        <span className="text-center text-mono30 font-bold text-lg">
          {isLoading && <Skeleton active round paragraph={{ rows: 1 }} />}
          {!isLoading && data?.name}
        </span>

        {/* Button Edit */}
        {/* <div className="self-center">
          {!isLoading && (
            <ButtonSys
              type={!canOpenUpdateDrawer ? "primary" : "default"}
              disabled={isLoading || !canOpenUpdateDrawer}
              onClick={onUbahButtonClicked}>
              <EditIcon className="mr-2 w-3 h-3" />
              Ubah Form
            </ButtonSys>
          )}
        </div> */}
      </div>
    );

    return (
      <DetailCard
        content={detailCardContent}
        isLoading={isLoading}
        estimatedContentLength={4}
        header={cardHeader}
      />
    );
  }
);
DetailFormAktivitasCard.displayName = "DetailFormAktivitasCard";
