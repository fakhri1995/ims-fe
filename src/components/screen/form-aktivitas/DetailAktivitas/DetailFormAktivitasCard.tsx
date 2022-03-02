import { EditOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { FC, ReactNode, memo } from "react";
import React from "react";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

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
        select: (record) => {
          /** Reformart date value and replace profile_image with null if there is no image atm */
          return {
            ...record.data.data,
            updated_at: format(
              new Date(record.data.data.updated_at.toString()),
              "dd MMMM yyyy",
              { locale: idLocale }
            ),
            creator: {
              ...record.data.data.creator,
              profile_image:
                record.data.data.creator.profile_image === "-"
                  ? null
                  : record.data.data.creator.profile_image,
            },
          };
        },
      }
    );

    return (
      <div className="bg-white rounded-md p-6 shadow-md space-y-4 flex flex-col">
        {/* Title */}
        <span className="text-center text-mono30 font-bold text-lg">
          {isLoading && <Skeleton active round paragraph={{ rows: 1 }} />}
          {!isLoading && data?.name}
        </span>

        {/* Button Edit */}
        <div className="self-center">
          <Button
            type="ghost"
            className="mig-button mig-button--outlined-primary"
            disabled={isLoading}
            onClick={onUbahButtonClicked}
          >
            <EditOutlined className="mr-2" />
            Ubah Form
          </Button>
        </div>

        {/* Deskripsi */}
        <DetailInformation label="Deskripsi Form" loading={isLoading}>
          {data?.description}
        </DetailInformation>

        {/* Tanggal Diubah */}
        <DetailInformation label="Tanggal Diubah" loading={isLoading}>
          {data?.updated_at}
        </DetailInformation>

        {/* Jumlah Staff */}
        <DetailInformation label="Jumlah Staff" loading={isLoading}>
          {data?.users.length}
        </DetailInformation>

        {/* Nama Pembuat */}
        <DetailInformation label="Nama Pembuat" loading={isLoading}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-mono80">
              {data?.creator.profile_image && (
                <img
                  className="w-full h-full bg-cover"
                  src={data?.creator.profile_image}
                  alt="Avatar"
                />
              )}
            </div>

            <span>{data?.creator.name}</span>
          </div>
        </DetailInformation>
      </div>
    );
  }
);
DetailFormAktivitasCard.displayName = "DetailFormAktivitasCard";

/**
 * @private
 */
interface IDetailInformation {
  label: string;
  children: ReactNode | string;
  loading?: boolean;
}

/**
 * @private
 */
const DetailInformation: FC<IDetailInformation> = ({
  label,
  children,
  loading = true,
}) => {
  return (
    <div className="space-y-2">
      <span className="text-mono80 font-medium text-xs">{label}</span>
      {!React.isValidElement(children) ? (
        <>
          {loading && <Skeleton round active paragraph={{ rows: 1 }} />}
          {!loading && <p className="text-mono30 text-sm">{children}</p>}
        </>
      ) : (
        <>
          {loading && <Skeleton avatar round active paragraph={{ rows: 1 }} />}
          {!loading && children}
        </>
      )}
    </div>
  );
};
