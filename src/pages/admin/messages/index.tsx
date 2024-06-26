import { SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Table, notification } from "antd";
import { SorterResult } from "antd/lib/table/interface";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { MESSAGES_GET } from "lib/features";

import { MessageData, MessageService } from "apis/message";

import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import { momentFormatDate } from "../../../lib/helper";
import httpcookie from "cookie";

const Messages = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetMessages = hasPermission(MESSAGES_GET);

  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const axiosClient = useAxiosClient();

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"created_at"} */ "created_at"),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ "desc"),
    keyword: withDefault(StringParam, null),
  });

  /**
   * States
   */
  const [dataMessages, setDataMessages] = useState<MessageData[]>([]);

  /**
   * Queries
   */
  const {
    data: dataRawMessages,
    isLoading: loadingMessages,
    refetch: refetchMessages,
  } = useQuery(
    [MESSAGES_GET, queryParams],
    () =>
      MessageService.getPaginateMessages(
        isAllowedToGetMessages,
        axiosClient,
        queryParams
      ),
    {
      enabled: isAllowedToGetMessages,
      select: (response) => response.data.data,
      onSuccess: (data) => setDataMessages(data.data),
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar messages.",
        });
      },
    }
  );

  //Definisi table
  const columnsFeature = [
    {
      title: "No",
      dataIndex: "nomor",
      key: "nomor",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <p className="text-center">
              {(dataRawMessages?.from || 0) + index}.
            </p>
          ),
        };
      },
    },
    {
      title: "Nama Pengirim",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className=" text-base">{record.name}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Company Email",
      dataIndex: "company_email",
      key: "company_email",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className="text-xs">{record.company_email}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <p className="text-xs">{record.company_name}</p>
            </>
          ),
        };
      },
    },
    {
      title: "Interested In",
      dataIndex: "interested_in",
      key: "interested_in",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <>
              <h1 className="text-xs">{record.interested_in}</h1>
            </>
          ),
        };
      },
    },
    {
      title: "Sending Date",
      dataIndex: "created_at",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <p className="text-xs">
              {momentFormatDate(text, "-", "DD MMM YYYY hh:mm")}
            </p>
          ),
        };
      },
      // defaultSortOrder: "descend",
      sorter: (a, b) => {
        const lhsDate = new Date(a.created_at);
        const rhsDate = new Date(b.created_at);
        return lhsDate < rhsDate ? -1 : 1;
      },
    },
    {
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        return {
          props: {
            style: { backgroundColor: index % 2 == 1 ? "#f2f2f2" : "#fff" },
          },
          children: (
            <div className=" flex">
              <Button
                style={{
                  paddingTop: `0`,
                  paddingBottom: `0.3rem`,
                  marginRight: `1rem`,
                }}
                onClick={() => {
                  setdatadetail({
                    id: record.id,
                    name: record.name,
                    company_email: record.company_email,
                    company_name: record.company_name,
                    interseted_in: record.interested_in,
                    message: record.message,
                    sending_date: record.created_at,
                  });
                  setmodaldetail(true);
                }}
              >
                <SearchOutlined />
              </Button>
            </div>
          ),
        };
      },
    },
  ];

  //detail
  const [modaldetail, setmodaldetail] = useState(false);
  const [loadingdetail, setloadingdetail] = useState(false);
  const [datadetail, setdatadetail] = useState({
    id: -1,
    name: "",
    company_email: "",
    company_name: "",
    interseted_in: "",
    message: "",
    sending_date: "",
  });

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      st={st}
    >
      <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
        <div className="col-span-5 border-b border-opacity-30 border-gray-400 flex items-center justify-between px-0 py-4 md:p-4 mb-5">
          <h1 className="font-bold">Messages</h1>
        </div>
        <div className="col-span-5 p-0 md:p-5 flex flex-col">
          <AccessControl hasPermission={MESSAGES_GET}>
            <Table<MessageData>
              rowKey={(record) => record.id}
              columns={columnsFeature}
              dataSource={dataMessages}
              pagination={{
                total: dataRawMessages?.total,
                current: queryParams?.page,
                pageSize: queryParams.rows,
                showSizeChanger: true,
              }}
              onChange={(
                pagination,
                filters,
                sorter: SorterResult<any>,
                extra
              ) => {
                const sortTypePayload =
                  sorter.order === "ascend"
                    ? "asc"
                    : sorter.order === "descend"
                    ? "desc"
                    : undefined;

                setQueryParams({
                  page: pagination.current,
                  rows: pagination.pageSize,
                  sort_type: sortTypePayload,
                });
              }}
              scroll={{ x: 300 }}
            ></Table>
          </AccessControl>
        </div>
      </div>
      <Modal
        title={`Message Detail`}
        visible={modaldetail}
        okButtonProps={{ disabled: loadingdetail }}
        onCancel={() => {
          setmodaldetail(false);
        }}
        style={{ top: `3rem` }}
        width={500}
        footer={null}
        destroyOnClose={true}
      >
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold mb-2">Name:</h1>
          <p className="text-sm mb-5">{datadetail.company_name}</p>
          <h1 className="text-sm font-semibold mb-2">Company Name:</h1>
          <p className="text-sm mb-5">{datadetail.company_name}</p>
          <h1 className="text-sm font-semibold mb-2">Company Email:</h1>
          <p className="text-sm mb-5">{datadetail.company_email}</p>
          <h1 className="text-sm font-semibold mb-2">Interested In:</h1>
          <p className="text-sm mb-5">{datadetail.interseted_in}</p>
          <h1 className="text-sm font-semibold mb-2">Sending Date:</h1>
          <p className="text-sm mb-5">
            {momentFormatDate(
              datadetail.sending_date,
              "-",
              "DD MMM YYYY hh:mm"
            )}
          </p>
          <h1 className="text-sm font-semibold mb-2">Message:</h1>
          <p className="text-sm mb-5">{datadetail.message}</p>
        </div>
      </Modal>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  var initProps = "";
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (!cookies) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
    if (typeof cookies === "string") {
      const cookiesJSON = httpcookie.parse(cookies);
      initProps = cookiesJSON.token;
    }
  }
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "92",
    },
  };
}

export default Messages;
