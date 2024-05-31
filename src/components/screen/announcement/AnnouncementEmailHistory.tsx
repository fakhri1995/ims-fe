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

import { ANNOUNCEMENT_MAIL_GET, ANNOUNCEMENT_MAIL_SEND } from "lib/features";
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

  const isAllowedToGetAnnouncementMail = hasPermission(ANNOUNCEMENT_MAIL_GET);
  const isAllowedToSendAnnouncementMail = hasPermission(ANNOUNCEMENT_MAIL_SEND);

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const [queryParams, setQueryParams] = useQueryParams({
    id: withDefault(NumberParam, announcementId),
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 5),
    keyword: withDefault(StringParam, null),
  });

  /**
   * States
   */
  const [dataHistory, setDataHistory] = useState([]);

  // Get Announcement Email History
  const {
    data: dataRawHistory,
    isLoading: loadingHistory,
    refetch: refetchHistory,
  } = useQuery(
    [ANNOUNCEMENT_MAIL_GET, queryParams],
    () =>
      AnnouncementService.getMailAnnouncement(
        isAllowedToGetAnnouncementMail,
        axiosClient,
        queryParams
      ),
    {
      enabled: isAllowedToGetAnnouncementMail,
      select: (response) => {
        return response.data.data;
      },
      onSuccess: (data) => {
        setDataHistory(data.data);
      },
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar riwayat email announcement.",
        });
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
          disabled={!isAllowedToSendAnnouncementMail}
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
          setTimeout(
            () =>
              setQueryParams({
                keyword: e.target.value,
                page: 1,
              }),
            1000
          );
        }}
        disabled={!isAllowedToGetAnnouncementMail}
      />
      <Table
        rowKey={(record) => record.id}
        showHeader={false}
        className="w-full"
        dataSource={dataHistory}
        loading={loadingHistory}
        pagination={{
          current: queryParams?.page,
          pageSize: queryParams?.rows,
          total: dataRawHistory?.total,
          showSizeChanger: false,
        }}
        onChange={(pagination) => {
          setQueryParams({
            page: pagination.current,
            rows: pagination.pageSize,
          });
        }}
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
                            item?.user?.profile_image?.link ??
                              "staging/Users/default_user.png"
                          )}
                          alt={"profile image"}
                          className="w-8 h-8 bg-cover object-cover rounded-full"
                        />
                      </div>
                      <p className="truncate">
                        <strong>{item?.user?.name}</strong> -{" "}
                        {item?.user?.position}
                      </p>
                    </div>
                    <p className="text-right w-1/3">
                      {momentFormatDate(
                        item?.publish_at,
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
                            className="bg-backdrop px-2 rounded-full w-max text-primary100 mig-caption--bold truncate"
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
