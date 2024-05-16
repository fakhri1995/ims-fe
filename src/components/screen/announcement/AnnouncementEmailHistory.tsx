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
} from "lib/features";
import { generateStaticAssetUrl, momentFormatDate } from "lib/helper";

import { AnnouncementData, AnnouncementService } from "apis/announcement";

interface IAnnouncementEmailHistory {
  announcementId: number;
  setShowEmailDrawer?: Dispatch<SetStateAction<boolean>>;
}

export const AnnouncementEmailHistory: FC<IAnnouncementEmailHistory> = ({
  announcementId,
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

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const [queryParams, setQueryParams] = useQueryParams({
    id: withDefault(NumberParam, announcementId),
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

  // Get Announcement Email History
  const {
    data: dataRawHistory,
    isLoading: loadingHistory,
    refetch: refetchHistory,
  } = useQuery(
    [ANNOUNCEMENT_GET, queryParams, search],
    () =>
      AnnouncementService.getMailAnnouncement(
        isAllowedToGetAnnouncement,
        axiosClient,
        queryParams
      ),
    {
      enabled: isAllowedToGetAnnouncement,
      select: (response) => {
        return response.data.data;
      },
      onSuccess: (data) => {
        setDataHistory(data.data);
      },
    }
  );

  const dummy = [
    {
      id: 1,
      announcement_id: 9,
      publish_at: "2024-05-15 01:42:00",
      is_send: 1,
      created_at: "2024-05-14T18:42:48.000000Z",
      updated_at: "2024-05-14T19:25:26.000000Z",
      purposes: ["Engineer"],
      result: {
        id: 1,
        announcement_mail_id: 1,
        description: "Gagal kirim pesan ke email Admin MIG, Achmad Naufal.",
        created_at: "2024-05-14T19:25:26.000000Z",
        updated_at: "2024-05-14T19:25:26.000000Z",
      },
      staff: [],
      group: [
        {
          id: 1,
          announcement_mail_id: 1,
          group_id: 1,
          created_at: "2024-05-14T18:42:48.000000Z",
          updated_at: "2024-05-14T18:42:48.000000Z",
          groups: {
            id: 1,
            name: "Engineer",
            description: "For Engineer",
            group_head: 1,
            is_agent: 1,
          },
        },
      ],
    },
  ];

  return (
    <div className="mig-platform flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h5 className="mig-heading--4 text-base">Riwayat Pengiriman Email</h5>
        <ButtonSys
          onClick={() => setShowEmailDrawer(true)}
          type={"primary"}
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
        disabled={!isAllowedToGetAnnouncement}
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
            render: (_, item) => {
              return (
                <div key={item?.id} className="grid grid-cols-1 cursor-pointer">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 w-2/3">
                      <div className="w-10">
                        <img
                          src={generateStaticAssetUrl(
                            item?.causer?.profile_image?.link ??
                              "staging/Users/default_user.png"
                          )}
                          alt={"profile image"}
                          className="w-8 h-8 bg-cover object-cover rounded-full"
                        />
                      </div>
                      <p className="truncate">
                        <strong>{item?.causer?.name}</strong> -{" "}
                        {item?.causer?.roles?.[0]?.name}
                      </p>
                    </div>
                    <p className="text-right w-1/3">
                      {momentFormatDate(
                        item?.created_at,
                        "-",
                        "D MMM YYYY, HH:mm",
                        true
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <p>Kepada:</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {item?.purposes?.length > 0 &&
                        item.purposes.map((name) => (
                          <p
                            key={name}
                            className="bg-backdrop px-2 rounded-full w-max text-primary100 mig-caption--bold"
                          >
                            {name}
                          </p>
                        ))}
                    </div>
                  </div>
                  <p>{item?.result?.description}</p>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};
