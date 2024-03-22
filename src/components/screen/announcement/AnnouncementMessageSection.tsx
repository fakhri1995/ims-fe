import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Select, Table, notification } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import ButtonSys from "components/button";
import { ArrowLeftIconSvg } from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_DELETE,
  ANNOUNCEMENT_GET,
} from "lib/features";
import { generateStaticAssetUrl } from "lib/helper";

import { AnnouncementData, AnnouncementService } from "apis/announcement";

interface IAnnouncementMessageSection {
  announcementId: number;
  setShowDeleteModal?: Dispatch<SetStateAction<boolean>>;
}

export const AnnouncementMessageSection: FC<IAnnouncementMessageSection> = ({
  announcementId,
  setShowDeleteModal,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetAnnouncement = hasPermission(ANNOUNCEMENT_GET);
  const isAllowedToDeleteAnnouncement = hasPermission(ANNOUNCEMENT_DELETE);

  const router = useRouter();
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  /**
   * States
   */

  const {
    data: dataAnnouncement,
    isLoading: loadingAnnouncement,
    refetch: refetchAnnouncement,
  } = useQuery(
    [ANNOUNCEMENT_GET, announcementId],
    () =>
      AnnouncementService.getAnnouncement(
        isAllowedToGetAnnouncement,
        axiosClient,
        announcementId
      ),
    {
      enabled: isAllowedToGetAnnouncement && !!announcementId,
      select: (response) => response.data.data,
      // onSuccess: (data) => setDataAnnouncements(data.data),
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan detail announcement.",
        });
      },
    }
  );

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  const { mutate: deleteAnnouncement, isLoading: loadingDeleteAnnouncement } =
    useMutation(
      (announcementId: number) =>
        AnnouncementService.deleteAnnouncement(
          isAllowedToDeleteAnnouncement,
          axiosClient,
          announcementId
        ),
      {
        onSuccess: (response) => {
          router.back();
          onMutationSucceed(ANNOUNCEMENTS_GET, response.data.message);
          handleCloseDelete();
        },
        onError: (error) => {
          notification.error({ message: "Gagal menghapus pesan pengumuman." });
        },
      }
    );

  return (
    <div className="mig-platform grid grid-cols-1 space-y-5 h-full">
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex gap-1 items-center bg-transparent hover:opacity-70"
        >
          <ArrowLeftIconSvg size={20} />
          <p>Kembali</p>
        </button>

        {!!setShowDeleteModal && (
          <ButtonSys
            onClick={() => setShowDeleteModal(true)}
            type={"default"}
            color="danger"
            disabled={!isAllowedToDeleteAnnouncement}
          >
            <div className="flex gap-2 items-center">
              <DeleteOutlined color="#BF4A40" />
              <p>Hapus</p>
            </div>
          </ButtonSys>
        )}
      </div>
      <hr />
      <div className="flex gap-2 items-center">
        <h1 className="font-medium text-2xl">{dataAnnouncement?.title}</h1>
        {moment().diff(moment(dataAnnouncement?.publish_at), "days") <= 2 && (
          <div className="bg-primary100 px-3 py-0.5 rounded-md text-white mig-caption--bold">
            Baru
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <p className="">
          <span className="text-mono50">Oleh: </span>
          <span className="font-medium">{dataAnnouncement?.user?.name}</span>
        </p>
        <p className="text-mono50">
          {formatDateToLocale(
            dataAnnouncement?.publish_at as unknown as Date,
            "dd MMM yyyy, HH:mm"
          )}
        </p>
      </div>
      {dataAnnouncement?.thumbnail_image?.link &&
      dataAnnouncement?.thumbnail_image?.link !=
        "staging/Announcement/mig-announce-logo.png" ? (
        <img
          src={generateStaticAssetUrl(dataAnnouncement?.thumbnail_image?.link)}
          alt={dataAnnouncement?.thumbnail_image?.description}
          className="lg:h-96 bg-cover object-cover rounded-md shadow-lg"
        />
      ) : (
        <div
          className="md:w-3/5 h-60 bg-backdrop rounded flex flex-col items-center 
              justify-center py-10 px-6"
        >
          <img
            src="/mig.png"
            style={{ width: "10rem", mixBlendMode: "luminosity" }}
          />
        </div>
      )}
      <div className="py-4 parsed">
        {dataAnnouncement?.text ? parse(dataAnnouncement?.text) : ""}
      </div>
    </div>
  );
};
