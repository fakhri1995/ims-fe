import { EditOutlined } from "@ant-design/icons";
import { FC, ReactNode, memo } from "react";
import React from "react";

import ButtonSys from "components/button";

export interface IDetailFormAktivitasCard {
  title: string;

  onUbahButtonClicked: () => void;

  description: string;

  updatedDate: string;

  staffCount: number;

  createdBy: { avatarUrl: string; name: string };
}

export const DetailFormAktivitasCard: FC<IDetailFormAktivitasCard> = memo(
  ({
    title,
    description,
    updatedDate,
    staffCount,
    createdBy = { avatarUrl: "", name: "" },
    onUbahButtonClicked,
  }) => {
    return (
      <div className="bg-white rounded-md p-6 shadow-md space-y-4 flex flex-col">
        {/* Title */}
        <span className="text-center text-mono30 font-bold text-lg">
          {title}
        </span>

        {/* Button Edit */}
        <div className="self-center">
          <ButtonSys type="default" onClick={onUbahButtonClicked}>
            <EditOutlined className="mr-2" />
            Ubah Project
          </ButtonSys>
        </div>

        {/* Deskripsi */}
        <DetailInformation label="Deskripsi Project">
          {description}
        </DetailInformation>

        {/* Tanggal Diubah */}
        <DetailInformation label="Tanggal Diubah">
          {updatedDate}
        </DetailInformation>

        {/* Jumlah Staff */}
        <DetailInformation label="Jumlah Staff">{staffCount}</DetailInformation>

        {/* Nama Pembuat */}
        <DetailInformation label="Nama Pembuat">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-mono80">
              <img
                className="w-full h-full bg-cover"
                src={createdBy.avatarUrl}
                alt="Avatar"
              />
            </div>

            <span>{createdBy.name}</span>
          </div>
        </DetailInformation>
      </div>
    );
  }
);
DetailFormAktivitasCard.displayName = "DetailFormAktivitasCard";

interface IDetailInformation {
  label: string;
  children: ReactNode | string;
}

const DetailInformation: FC<IDetailInformation> = ({ label, children }) => {
  return (
    <div className="space-y-2">
      <span className="text-mono80 font-medium text-xs">{label}</span>
      {!React.isValidElement(children) ? (
        <p className="text-mono30 text-sm">{children}</p>
      ) : (
        children
      )}
    </div>
  );
};
