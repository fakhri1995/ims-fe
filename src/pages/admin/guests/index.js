import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Table, TreeSelect, notification } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { GUESTS_GET, GUEST_ADD, GUEST_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";
import { generateStaticAssetUrl } from "lib/helper";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { createKeyPressHandler } from "../../../lib/helper";
import httpcookie from "cookie";

function Guests({ initProps, dataProfile, sidemenu }) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetGuestList = hasPermission(GUESTS_GET);
  const isAllowedToGetGuest = hasPermission(GUEST_GET);
  const isAllowedToAddGuest = hasPermission(GUEST_ADD);

  const rt = useRouter();

  const [queryParams, setQueryParams] = useQueryParams({
    name: withDefault(StringParam, undefined),
    role: withDefault(NumberParam, undefined),
    is_enabled: withDefault(NumberParam, undefined),
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
  });

  //data payload
  const [rawdata, setrawdata] = useState({
    current_page: "",
    data: [],
    first_page_url: "",
    from: null,
    last_page: null,
    last_page_url: "",
    next_page_url: "",
    path: "",
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  });
  //loading pre render
  const [datarawloading, setdatarawloading] = useState(false);
  //loading pre render
  const [praloading, setpraloading] = useState(true);
  //data guests
  const [dataguests, setdataguests] = useState([]);
  //state row table
  const [rowstate, setrowstate] = useState(0);
  //FILTER
  // const [namaasset, setnamaasset] = useState(queryParams.company_id);
  const [triggerRefetchGuestList, setTriggerRefetchGuestList] = useState(0);

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  const { originPath } = rt.query;

  const columnsDD = [
    {
      dataIndex: "profil_image",
      key: `profil_image`,
      render: (text, record, index) => {
        return {
          children: (
            <>
              <img
                src={record.profile_image}
                alt="imageProfile"
                className="object-cover w-10 h-10 rounded-full"
              />
            </>
          ),
        };
      },
    },
    {
      title: "Nama",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Access Allowed",
      dataIndex: "role",
    },
    {
      title: "Status",
      dataIndex: "is_enabled",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.is_enabled ? (
                <div className="rounded-md w-auto h-auto px-1 text-center py-1 bg-blue-100 border border-blue-200 text-blue-600">
                  Aktif
                </div>
              ) : (
                <div className="rounded-md w-auto h-auto px-1 text-center py-1 bg-red-100 border border-red-200 text-red-600">
                  {"Non-aktif"}
                </div>
              )}
            </>
          ),
        };
      },
    },
  ];

  //filtering
  const onChangeSearch = (e) => {
    setQueryParams({
      name: e.target.value === "" ? undefined : e.target.value,
    });
  };
  // const onChangeAsalLokasi = (value) => {
  //   setQueryParams({
  //     company_id: value,
  //   });
  // };
  const onChangeStatus = (value) => {
    setQueryParams({
      is_enabled: value === undefined ? undefined : Number(Boolean(value)),
    });
  };
  const onFinalClick = () => {
    setTriggerRefetchGuestList((prev) => ++prev);
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFinalClick, "Enter");

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetGuestList) {
      setpraloading(false);
      setdatarawloading(false);

      permissionWarningNotification("Mendapatkan", "Daftar Guest");
      return;
    }

    const queryPayload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    setpraloading(true);
    setdatarawloading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getGuestList${queryPayload}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setrawdata(res2.data);
        var dataDD = [];
        if (!res2) {
          dataDD = [];
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          rt.push("/dashboard/admin");
        } else {
          dataDD = res2.data.data.map((doc, idx) => {
            return {
              nomor: idx + 1,
              id: doc.id,
              profile_image: generateStaticAssetUrl(doc.profile_image?.link),
              // profile_image:
              //   doc.profile_image === "-" || doc.profile_image === ""
              //     ? `/default-users.jpeg`
              //     : doc.profile_image,
              name: doc.name,
              email: doc.email,
              is_enabled: doc.is_enabled,
              role: doc.role,
            };
          });
        }
        setdataguests(dataDD);
        setpraloading(false);
        setdatarawloading(false);
      });
  }, [
    isAllowedToGetGuestList,
    triggerRefetchGuestList,
    queryParams.page,
    queryParams.rows,
  ]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      originPath={originPath}
      st={st}
    >
      <>
        <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 border-gray-400 md:border-t md:border-b bg-white mb-5 p-4">
          <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
            <div className="font-semibold text-base w-auto">Guests</div>
          </div>
          {
            <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
              <Button
                size="large"
                type="primary"
                disabled={!isAllowedToAddGuest}
                onClick={() => {
                  rt.push("/admin/guests/create");
                }}
              >
                Tambah
              </Button>
            </div>
          }
        </div>
        {
          // [108].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
            <div className="md:col-span-5 col-span-1 flex flex-col py-3">
              {datarawloading ? null : (
                <div className="flex mb-8">
                  <div className=" w-10/12 mr-1 grid grid-cols-3">
                    <div className="col-span-2 mr-1">
                      <Input
                        disabled={!isAllowedToGetGuestList}
                        defaultValue={queryParams.name}
                        // defaultValue={name1}
                        style={{ width: `100%`, marginRight: `0.5rem` }}
                        placeholder="Cari nama guest"
                        onChange={onChangeSearch}
                        allowClear
                        onKeyPress={onKeyPressHandler}
                      ></Input>
                    </div>
                    <div className="col-span-1 mr-1">
                      <Select
                        disabled={!isAllowedToGetGuestList}
                        defaultValue={
                          queryParams.is_enabled !== undefined
                            ? Boolean(queryParams.is_enabled)
                            : undefined
                        }
                        placeholder="Pilih status guest"
                        style={{ width: `100%`, marginRight: `0.5rem` }}
                        onChange={onChangeStatus}
                        allowClear
                      >
                        <Select.Option value={true}>Aktif</Select.Option>
                        <Select.Option value={false}>Non Aktif</Select.Option>
                      </Select>
                    </div>
                  </div>
                  <div className="w-2/12">
                    <Button
                      type="primary"
                      disabled={!isAllowedToGetGuestList}
                      style={{ width: `100%` }}
                      onClick={onFinalClick}
                    >
                      <SearchOutlined />
                    </Button>
                    {/* <Button style={{ width: `40%` }} onClick={() => { setdataguests(dataraw) }}>Reset</Button> */}
                  </div>
                </div>
              )}
              <Table
                pagination={{
                  disabled: !isAllowedToGetGuestList,
                  pageSize: queryParams.rows,
                  current: queryParams.page,
                  total: rawdata.total,
                  onChange: (page, pageSize) => {
                    setQueryParams({
                      page,
                      rows: pageSize,
                    });
                  },
                }}
                scroll={{ x: 200 }}
                dataSource={dataguests}
                columns={columnsDD}
                loading={praloading}
                onRow={(record, rowIndex) => {
                  return {
                    onMouseOver: (event) => {
                      setrowstate(record.id);
                    },
                    onClick: (event) => {
                      isAllowedToGetGuest
                        ? rt.push(`/admin/guests/detail/${record.id}`)
                        : permissionWarningNotification(
                            "Mendapatkan",
                            "Detail Guest"
                          );
                    },
                  };
                }}
                rowClassName={(record, idx) => {
                  return record.id === rowstate ? `cursor-pointer` : ``;
                }}
              ></Table>
            </div>
          </div>
        }
      </>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const reqBodyAccountList = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
  var initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
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

  // if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "64",
    },
  };
}

export default Guests;
