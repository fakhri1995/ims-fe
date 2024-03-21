import { useRouter } from "next/router";
import { FC, useState } from "react";

import { formatDateToLocale } from "lib/date-utils";
import { generateStaticAssetUrl } from "lib/helper";

import { AnnouncementData, AnnouncementService } from "apis/announcement";

interface IAnnouncementCardVertical {
  data: AnnouncementData;
}

export const AnnouncementCardVertical: FC<IAnnouncementCardVertical> = ({
  data,
}) => {
  /**
   * Dependencies
   */
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 cursor-pointer hover:opacity-80 bg-white pb-4 rounded-md shadow-md">
      {/* Thumbnail */}
      {data?.thumbnail_image?.link &&
      data?.thumbnail_image?.link !=
        "staging/Announcement/mig-announce-logo.png" ? (
        <div className="h-28  rounded-t-lg">
          <img
            src={generateStaticAssetUrl(data?.thumbnail_image?.link)}
            className="w-full h-full bg-cover object-cover rounded-t-lg"
          />
        </div>
      ) : (
        <div
          className="h-28 bg-backdrop rounded-t-lg flex flex-col items-center 
                    justify-center py-10 px-6"
        >
          <img
            src="/mig.png"
            style={{ width: "10rem", mixBlendMode: "luminosity" }}
          />
        </div>
      )}

      {/* Content */}
      <div className=" flex flex-col justify-between px-4">
        <p className="mb-2 mig-caption--medium">by {data?.user?.name}</p>
        <h1 className="mb-2 font-bold text-lg">{data?.title}</h1>
        <p className="">
          {formatDateToLocale(
            data?.publish_at as unknown as Date,
            "dd MMM yyyy, HH:mm"
          )}
        </p>
      </div>
    </div>
  );
};
