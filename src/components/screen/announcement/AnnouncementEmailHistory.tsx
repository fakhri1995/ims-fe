import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Form, Input, Select, Table, notification } from "antd";
import Search from "antd/lib/transfer/search";
import parse from "html-react-parser";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import ButtonSys from "components/button";
import { MailForwardIconSvg } from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_DELETE,
  ANNOUNCEMENT_GET,
  PROJECT_LOGS_GET,
} from "lib/features";
import { generateStaticAssetUrl, momentFormatDate } from "lib/helper";

import { AnnouncementData, AnnouncementService } from "apis/announcement";
import { ProjectManagementService } from "apis/project-management";

interface IAnnouncementEmailHistory {
  token: string;
  announcementId: number;
  isAdminPage?: boolean;
  setShowEmailDrawer?: Dispatch<SetStateAction<boolean>>;
}

export const AnnouncementEmailHistory: FC<IAnnouncementEmailHistory> = ({
  token,
  announcementId,
  isAdminPage,
  setShowEmailDrawer,
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

  const [queryParams, setQueryParams] = useQueryParams({
    project_id: withDefault(NumberParam, 3),
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    // keyword: withDefault(StringParam, null),
  });

  /**
   * States
   */
  const [dataHistory, setDataHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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
    setShowEmailDrawer(false);
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

  // 3.1. Get Project Logs
  const logParams = {
    project_id: 3,
    page: 1,
    rows: 5,
  };
  const {
    data: dataRawHistory,
    isLoading: loadingHistory,
    refetch: refetchHistory,
  } = useQuery(
    [PROJECT_LOGS_GET, queryParams, search],
    () =>
      ProjectManagementService.getProjectLogs(
        token,
        isAllowedToGetAnnouncement,
        queryParams,
        search
      ),
    {
      enabled: isAllowedToGetAnnouncement,
      select: (response) => {
        return response.data;
      },
      onSuccess: (data) => {
        setDataHistory(data.data);
      },
    }
  );

  return (
    <div className="mig-platform flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h5 className="mig-heading--4 text-base">Riwayat Pengiriman Email</h5>
        <ButtonSys
          onClick={() => setShowEmailDrawer(true)}
          type={"primary"}
          // color="danger"
          disabled={!isAllowedToDeleteAnnouncement}
        >
          <div className="flex gap-2 items-center whitespace-nowrap">
            <p>Kirim Email</p>
            <MailForwardIconSvg size={20} color="#FFF" />
          </div>
        </ButtonSys>
      </div>
      <hr />

      <Input
        placeholder="Cari riwayat pengiriman..."
        allowClear
        onChange={(e) => {
          setTimeout(() => {
            setSearch(e.target.value);
            setQueryParams({
              // keyword: e.target.value,
              page: 1,
            }),
              500;
          });
        }}
        // disabled={!isAllowedToGetAnnouncements}
      />
      <Table
        rowKey={(record) => record.id}
        showHeader={false}
        className="w-full"
        dataSource={dataHistory}
        loading={loadingHistory}
        pagination={{
          current: page,
          pageSize: 5,
          total: dataRawHistory?.total,
          showSizeChanger: false,
        }}
        onChange={(pagination) => {
          setPage(pagination.current);
        }}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: () => {
        //       setDataCurrentLog(record);
        //       setModalDetailLog(true);
        //     },
        //   };
        // }}
        columns={[
          {
            title: "Email History",
            dataIndex: "id",
            key: "id",
            render: (_, log) => {
              // remove html tag in description
              const stringDescription = log?.description?.replace(
                /(<([^>]+)>)/gi,
                ""
              );
              return (
                <div key={log?.id} className="grid grid-cols-1 cursor-pointer">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 w-2/3">
                      <div className="w-10">
                        <img
                          src={generateStaticAssetUrl(
                            log?.causer?.profile_image?.link ??
                              "staging/Users/default_user.png"
                          )}
                          alt={"profile image"}
                          className="w-8 h-8 bg-cover object-cover rounded-full"
                        />
                      </div>
                      <p className="truncate">
                        <strong>{log?.causer?.name}</strong> -{" "}
                        {log?.causer?.roles?.[0]?.name}
                      </p>
                    </div>
                    <p className="text-right w-1/3">
                      {momentFormatDate(
                        log?.created_at,
                        "-",
                        "D MMM YYYY, HH:mm",
                        true
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center mb-2">
                    <p>Kepada:</p>
                    <div className="flex items-center gap-2">
                      <p className="bg-backdrop px-2 rounded-full w-max text-primary100 mig-caption--bold">
                        Engineer
                      </p>
                    </div>
                  </div>
                  <p>
                    {stringDescription?.length > 140
                      ? stringDescription?.slice(0, 140) + "..."
                      : stringDescription}
                  </p>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};
