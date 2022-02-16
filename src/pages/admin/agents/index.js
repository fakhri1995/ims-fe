import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Table, TreeSelect, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { createKeyPressHandler } from "../../../lib/helper";
import httpcookie from "cookie";

function Agents({ initProps, dataProfile, dataListAgent, sidemenu }) {
  const rt = useRouter();
  var location_id1 = "",
    name1 = "",
    is_enabled1 = "";
  const { location_id, name, is_enabled } = rt.query;
  if (location_id) {
    location_id1 = location_id;
  }
  if (name) {
    name1 = name;
  }
  if (is_enabled) {
    is_enabled1 = is_enabled;
  }
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
  //data lokasi
  const [datalokasi, setdatalokasi] = useState([]);
  //loading pre render
  const [datarawloading, setdatarawloading] = useState(false);
  //loading pre render
  const [praloading, setpraloading] = useState(true);
  //data agents
  const [dataagents, setdataagents] = useState([]);
  //state row table
  const [rowstate, setrowstate] = useState(0);
  //FILTER
  const [namasearchact, setnamasearchact] = useState(
    name1 === "" ? false : true
  );
  const [asallokasifilteract, setasallokasifilteract] = useState(
    location_id1 === "" ? false : true
  );
  const [statusfilteract, setstatusfilteract] = useState(
    is_enabled1 === "" ? false : true
  );
  const [namavalue, setnamavalue] = useState(null);
  const [asallokasivalue, setasallokasivalue] = useState(null);
  const [statusvalue, setstatusvalue] = useState(null);
  const [namaasset, setnamaasset] = useState(location_id1);
  const [defasset, setdefasset] = useState(null);
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
                className=" object-cover w-10 h-10 rounded-full"
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
      title: "Asal Lokasi",
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
    if (e.target.value === "") {
      window.location.href = `/admin/agents?name=&location_id=${
        asallokasifilteract ? location_id1 : ""
      }&is_enabled=${statusfilteract ? is_enabled1 : ""}`;
      setnamasearchact(false);
    } else {
      setnamasearchact(true);
      setnamavalue(e.target.value);
    }
  };
  const onChangeAsalLokasi = (value) => {
    if (typeof value === "undefined") {
      window.location.href = `/admin/agents?name=${
        namasearchact ? name1 : ""
      }&location_id=&is_enabled=${statusfilteract ? is_enabled1 : ""}`;
      setasallokasifilteract(false);
    } else {
      setasallokasifilteract(true);
      setasallokasivalue(value);
    }
  };
  const onChangeStatus = (value) => {
    if (typeof value === "undefined") {
      window.location.href = `/admin/agents?name=${
        namasearchact ? name1 : ""
      }&location_id=${asallokasifilteract ? location_id1 : ""}&is_enabled=`;
      setstatusfilteract(false);
    } else {
      setstatusfilteract(true);
      setstatusvalue(value);
    }
  };
  const onFinalClick = () => {
    window.location.href = `/admin/agents?name=${
      namasearchact ? (namavalue === null ? name1 : namavalue) : ""
    }&location_id=${
      asallokasifilteract
        ? asallokasivalue === null
          ? location_id1
          : asallokasivalue
        : ""
    }&is_enabled=${
      statusfilteract ? (statusvalue === "" ? is_enabled1 : statusvalue) : ""
    }`;
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFinalClick, "Enter");

  //useEffect
  useEffect(() => {
    setpraloading(true);
    setdatarawloading(true);
    fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/getAgentList?name=${name1}&company_id=${location_id1}${
        is_enabled1 === "" ? "" : `&is_enabled=${is_enabled1}`
      }`,
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
              profile_image:
                doc.profile_image === "-" || doc.profile_image === ""
                  ? `/default-users.jpeg`
                  : doc.profile_image,
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
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getBranchCompanyList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        var selectedBranchCompany = {};
        const recursiveSearchBranchCompany = (doc, key) => {
          for (var i = 0; i < doc.length; i++) {
            if (doc[i].id === key) {
              selectedBranchCompany = doc[i];
            } else {
              if (doc[i].children) {
                recursiveSearchBranchCompany(doc[i].children, key);
              }
            }
          }
        };
        recursiveSearchBranchCompany([res2.data], Number(namaasset));
        setdefasset(selectedBranchCompany.key);
        setdatalokasi([res2.data]);
        setdatarawloading(false);
      });
  }, []);
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
            <div className="font-semibold text-base w-auto">Agents</div>
          </div>
          {
            // [109].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
            <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
              <Link
                href={{
                  pathname: "/admin/agents/create/",
                }}
              >
                <Button size="large" type="primary">
                  Tambah
                </Button>
              </Link>
            </div>
          }
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
                        defaultValue={name1}
                        style={{ width: `100%`, marginRight: `0.5rem` }}
                        placeholder="Cari nama agent"
                        onChange={onChangeSearch}
                        allowClear
                        onKeyPress={onKeyPressHandler}
                      ></Input>
                    </div>
                    <div className="col-span-2 mr-1">
                      <TreeSelect
                        defaultValue={
                          location_id1 === "" ? null : Number(defasset)
                        }
                        allowClear
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        treeData={datalokasi}
                        placeholder="Cari asal lokasi agent"
                        treeDefaultExpandAll
                        style={{ width: `100%`, marginRight: `0.5rem` }}
                        onChange={onChangeAsalLokasi}
                      />
                    </div>
                    <div className="col-span-1 mr-1">
                      <Select
                        defaultValue={
                          is_enabled1 === ""
                            ? null
                            : is_enabled1 === "true"
                            ? true
                            : false
                        }
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
                  pageSize: 10,
                  total: rawdata.total,
                  onChange: (page, pageSize) => {
                    setpraloading(true);
                    fetch(
                      `${
                        process.env.NEXT_PUBLIC_BACKEND_URL
                      }/getAgentList?page=${page}&rows=10&name=${name1}&company_id=${location_id1}${
                        is_enabled1 === "" ? "" : `&is_enabled=${is_enabled1}`
                      }`,
                      {
                        method: `GET`,
                        headers: {
                          Authorization: JSON.parse(initProps),
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((res2) => {
                        setrawdata(res2.data);
                        var temppagination = res2.data.data.map((doc, idx) => ({
                          ...doc,
                          profile_image:
                            doc.profile_image === "-" ||
                            doc.profile_image === ""
                              ? `/default-users.jpeg`
                              : doc.profile_image,
                        }));
                        setdataagents(temppagination);
                        setpraloading(false);
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
      // dataListAgent,
      sidemenu: "61",
    },
  };
}

export default Agents;
