import { EditOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { FC, memo, useMemo } from "react";
import React from "react";
import { useQuery } from "react-query";

import { DetailCard, IDetailCard } from "components/cards/DetailCard";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";

export interface IDetailFormAktivitasCard {
  onUbahButtonClicked: () => void;

  aktivitasId?: number;
}

export const DetailFormAktivitasCard: FC<IDetailFormAktivitasCard> = memo(
  ({ onUbahButtonClicked, aktivitasId }) => {
    const axiosClient = useAxiosClient();
    const { data, isLoading } = useQuery(
      [AttendanceServiceQueryKeys.FIND_ONE, aktivitasId],
      () => AttendanceService.findOne(axiosClient, aktivitasId),
      {
        select: (response) => {
          /** Reformart date value and replace profile_image with null if there is no image atm */
          const formattedUpdatedDate = formatDateToLocale(
            new Date(response.data.data.updated_at.toString()),
            "dd MMMM yyyy"
          );

          const mappedCreatorProfileImage =
            response.data.data.creator.profile_image === "-"
              ? null
              : response.data.data.creator.profile_image;

          return {
            ...response.data.data,
            updated_at: formattedUpdatedDate,
            creator: {
              ...response.data.data.creator,
              profile_image: mappedCreatorProfileImage,
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
        label: "Deskripsi Form",
        content: data.description,
      });

      detailCardContent.content.push({
        label: "Tanggal Diubah",
        content: data.updated_at,
      });

      detailCardContent.content.push({
        label: "Jumlah Staff",
        content: data.users.length,
      });

      detailCardContent.content.push({
        label: "Nama Pembuat",
        content: (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-mono80">
              {data.creator.profile_image && (
                <img
                  className="w-full h-full bg-cover"
                  src={data.creator.profile_image}
                  alt="Avatar"
                />
              )}
            </div>

            <span>{data.creator.name}</span>
          </div>
        ),
      });

      return detailCardContent.content;
    }, [data]);

    const cardHeader = (
      <div className="flex flex-col space-y-6">
        {/* Title */}
        <span className="text-center text-mono30 font-bold text-lg">
          {isLoading && <Skeleton active round paragraph={{ rows: 1 }} />}
          {!isLoading && data?.name}
        </span>

        {/* Button Edit */}
        <div className="self-center">
          {!isLoading && (
            <Button
              type="ghost"
              className="mig-button mig-button--outlined-primary"
              disabled={isLoading}
              onClick={onUbahButtonClicked}
            >
              <EditOutlined className="mr-2" />
              Ubah Form
            </Button>
          )}
        </div>
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
