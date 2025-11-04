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

import { AGENTS_GET, AGENT_ADD, COMPANY_CLIENTS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";
import { generateStaticAssetUrl } from "lib/helper";

import {
  UserIconSvg,
  UserPlusIconSvg,
  UserXIconSvg,
  UsersIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import { createKeyPressHandler } from "../../../lib/helper";
import httpcookie from "cookie";

function Agents({ initProps, dataProfile, dataListAgent, sidemenu }) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetAgentList = hasPermission(AGENTS_GET);
  const isAllowedToAddAganet = hasPermission(AGENT_ADD);
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);

  const rt = useRouter();

  const [queryParams, setQueryParams] = useQueryParams({
    name: withDefault(StringParam, undefined),
    company_id: withDefault(NumberParam, undefined),
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
  //data company
  const [dataCompany, setDataCompany] = useState([]);
  //loading pre render
  const [datarawloading, setdatarawloading] = useState(false);
  //loading pre render
  const [praloading, setpraloading] = useState(true);
  //data agents
  const [dataagents, setdataagents] = useState([]);
  //state row table
  const [rowstate, setrowstate] = useState(0);
  //FILTER
  const [namaasset, setnamaasset] = useState(queryParams.company_id);
  const [triggerRefetchAgentList, setTriggerRefetchAgentList] = useState(0);

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
      title: "Posisi",
      dataIndex: "position",
    },
    {
      title: "No. Handphone",
      dataIndex: "phone_number",
    },
    {
      title: "Company",
      dataIndex: "company_name",
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
      page: 1,
    });
  };
  const onChangeCompany = (value) => {
    setQueryParams({
      company_id: value,
      page: 1,
    });
  };
  const onChangeStatus = (value) => {
    setQueryParams({
      is_enabled: value === undefined ? undefined : Number(Boolean(value)),
      page: 1,
    });
  };
  const onFinalClick = () => {
    setTriggerRefetchAgentList((prev) => ++prev);
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFinalClick, "Enter");

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetAgentList) {
      setpraloading(false);
      permissionWarningNotification("Mendapatkan", "Daftar Agent");
      return;
    }

    const queryPayload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAgentList${queryPayload}`,
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
                phone_number: doc.phone_number,
                company_name: doc.company_name,
                is_enabled: doc.is_enabled,
                company_id: doc.company_id,
                position: doc.position,
              };
            });
          }
          setdataagents(dataDD);
          setpraloading(false);
        });
    };

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [
    isAllowedToGetAgentList,
    triggerRefetchAgentList,
    queryParams.name,
    queryParams.company_id,
    queryParams.is_enabled,
    queryParams.page,
    queryParams.rows,
  ]);

  // Get Company options
  useEffect(() => {
    if (!isAllowedToGetCompanyClients) {
      setdatarawloading(false);
      return;
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList?with_mig=1`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setDataCompany(res2.data);
      })
      .catch((err) => {
        notification.error({
          message: "Gagal mendapatkan daftar company",
          duration: 3,
        });
      })
      .finally(() => setdatarawloading(false));
  }, [isAllowedToGetCompanyClients]);

  // useEffect(() => {
  //   if (!isAllowedToGetCompanyClients) {
  //     setdatarawloading(false);
  //     return;
  //   }

  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList?with_mig=1`, {
  //     method: `GET`,
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       var selectedBranchCompany = {};
  //       const recursiveSearchBranchCompany = (doc, key) => {
  //         for (var i = 0; i < doc.length; i++) {
  //           if (doc[i].id === key) {
  //             selectedBranchCompany = doc[i];
  //           } else {
  //             if (doc[i].children) {
  //               recursiveSearchBranchCompany(doc[i].children, key);
  //             }
  //           }
  //         }
  //       };
  //       recursiveSearchBranchCompany([res2.data], Number(namaasset));
  //       // setdefasset(selectedBranchCompany.key);
  //       setDataCompany([res2.data]);
  //       setdatarawloading(false);
  //     });
  // }, [isAllowedToGetBranchCompanyList]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      originPath={originPath}
      st={st}
    >
      <div className="rounded-[8px] border border-neutrals70 shadow-desktopCard bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-4 py-3 border-b">
          <h4 className="text-[16px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
            Agent List
          </h4>
          <div
            className={
              "hover:cursor-pointer w-[121px] h-[32px] rounded-[5px] flex justify-center items-center gap-3 bg-primary100"
            }
            onClick={() => {
              rt.push("/admin/agents/create");
            }}
          >
            <UserPlusIconSvg />
            <p className={"text-white"}>Add Agent</p>
          </div>
        </div>

        {
          // [108].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
            <div className="md:col-span-5 col-span-1 flex flex-col py-3">
              {datarawloading ? null : (
                <div className="flex mb-8">
                  <div className=" w-10/12 mr-1 grid grid-cols-6">
                    <div className="col-span-3 mr-1">
                      <Input
                        disabled={!isAllowedToGetAgentList}
                        defaultValue={queryParams.name}
                        // defaultValue={name1}
                        style={{ width: `100%`, marginRight: `0.5rem` }}
                        placeholder="Cari nama agent"
                        onChange={onChangeSearch}
                        allowClear
                        onKeyPress={onKeyPressHandler}
                      ></Input>
                    </div>
                    <div className="col-span-2 mr-1">
                      <Select
                        showSearch
                        allowClear
                        placeholder="Cari company agent"
                        defaultValue={queryParams.company_id}
                        options={dataCompany.map((company) => ({
                          label: company.name,
                          value: company.id,
                        }))}
                        filterOption={(input, option) => {
                          return (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase());
                        }}
                        onChange={onChangeCompany}
                        disabled={!isAllowedToGetCompanyClients}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        style={{ width: `100%`, marginRight: `0.5rem` }}
                      />
                    </div>

                    <div className="col-span-1 mr-1">
                      <Select
                        disabled={!isAllowedToGetAgentList}
                        defaultValue={
                          queryParams.is_enabled !== undefined
                            ? Boolean(queryParams.is_enabled)
                            : undefined
                        }
                        // defaultValue={
                        //   is_enabled1 === ""
                        //     ? null
                        //     : is_enabled1 === "true"
                        //     ? true
                        //     : false
                        // }
                        placeholder="Pilih status agent"
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
                      disabled={!isAllowedToGetAgentList}
                      style={{ width: `100%` }}
                      onClick={onFinalClick}
                    >
                      <SearchOutlined />
                    </Button>
                    {/* <Button style={{ width: `40%` }} onClick={() => { setdataagents(dataraw) }}>Reset</Button> */}
                  </div>
                </div>
              )}
              <Table
                pagination={{
                  disabled: !isAllowedToGetAgentList,
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
                dataSource={dataagents}
                columns={columnsDD}
                loading={praloading}
                onRow={(record, rowIndex) => {
                  return {
                    onMouseOver: (event) => {
                      setrowstate(record.id);
                    },
                    onClick: (event) => {
                      {
                        // [107, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                        rt.push(`/admin/agents/detail/${record.id}`);
                        // :
                        // null
                      }
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
      </div>
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
      // dataListAgent,
      sidemenu: "61",
    },
  };
}

export default Agents;
