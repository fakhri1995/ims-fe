import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Table, TreeSelect, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

function modifData(dataa) {
  for (var i = 0; i < dataa.length; i++) {
    dataa[i]["key"] = dataa[i].id;
    dataa[i]["value"] = dataa[i].id;
    dataa[i]["title"] = dataa[i].name;
    dataa[i]["children"] = dataa[i].members;
    delete dataa[i].members;
    if (dataa[i].children) {
      modifData(dataa[i].children);
    }
  }
  return dataa;
}

function Requesters({
  initProps,
  dataProfile,
  dataListRequester,
  dataCompanyList,
  sidemenu,
}) {
  const rt = useRouter();
  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  const { originPath } = rt.query;
  var location_id1 = "",
    name1 = "",
    is_enabled1 = "",
    company_id1 = "";
  const { location_id, name, is_enabled, company_id } = rt.query;
  if (location_id) {
    location_id1 = location_id;
  }
  if (name) {
    name1 = name;
  }
  if (is_enabled) {
    is_enabled1 = is_enabled;
  }
  if (company_id) {
    company_id1 = company_id;
  }
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

  //useState
  const [dataraw, setdataraw] = useState([]);
  const [praloading, setpraloading] = useState(true);
  const [datarawloading, setdatarawloading] = useState(false);
  const [datarawloading2, setdatarawloading2] = useState(false);
  const [dataKK, setDataSource] = useState([]);
  const [rowstate, setrowstate] = useState(0);
  const [datacompany, setdatacompany] = useState([]);
  const [datalokasi, setdatalokasi] = useState([]);
  //state order
  const [namasearchact, setnamasearchact] = useState(
    name1 === "" ? false : true
  );
  const [asalcompanyfilteract, setasalcompanyfilteract] = useState(
    company_id1 === "" ? false : true
  );
  const [asallokasifilteract, setasallokasifilteract] = useState(
    location_id1 === "" ? false : true
  );
  const [asallokasitrigger, setasallokasitrigger] = useState(-1);
  const [statusfilteract, setstatusfilteract] = useState(
    is_enabled1 === "" ? false : true
  );
  //state value
  const [namavalue, setnamavalue] = useState(null);
  const [asallokasivalue, setasallokasivalue] = useState(null);
  const [asalcompanyvalue, setasalcompanyvalue] = useState(null);
  const [statusvalue, setstatusvalue] = useState(null);
  const [loadinglokasi, setloadinglokasi] = useState(true);
  const [namaasset, setnamaasset] = useState(location_id1);
  const [defasset, setdefasset] = useState(null);
  const [defasset2, setdefasset2] = useState(null);

  //function
  var temp = [];
  function getidData(dataa) {
    for (var i = 0; i < dataa.length; i++) {
      temp.push(dataa[i]["id"]);
      if (dataa[i]["children"]) {
        getidData(dataa[i]["children"]);
      }
    }
  }

  //filtering
  const onChangeSearch = (e) => {
    if (e.target.value === "") {
      // setDataSource(dataraw)
      window.location.href = `/admin/requesters?name=&location_id=${
        asallokasifilteract ? location_id1 : ""
      }&is_enabled=${statusfilteract ? is_enabled1 : ""}&company_id=${
        asalcompanyfilteract ? company_id1 : ""
      }`;
      setnamasearchact(false);
    } else {
      setnamasearchact(true);
      setnamavalue(e.target.value);
    }
  };
  const onChangeAsalCompany = (value) => {
    if (typeof value === "undefined") {
      // setDataSource(dataraw)
      window.location.href = `/admin/requesters?name=${
        namasearchact ? name1 : ""
      }&location_id=&is_enabled=${
        statusfilteract ? is_enabled1 : ""
      }&company_id=`;
      // setasalcompanyfilteract(false)
      // setasalcompanyvalue(null)
      // setdatalokasi([])
      // setloadinglokasi(true)
    } else {
      setasalcompanyfilteract(true);
      setasalcompanyvalue(value);
      setasallokasitrigger((prev) => prev + 1);
    }
  };
  const onChangeAsalLokasi = (value) => {
    if (typeof value === "undefined") {
      // setDataSource(dataraw)
      window.location.href = `/admin/requesters?name=${
        namasearchact ? name1 : ""
      }&location_id=&is_enabled=${
        statusfilteract ? is_enabled1 : ""
      }&company_id=${asalcompanyfilteract ? company_id1 : ""}`;
      // setasallokasifilteract(false)
      // setasalcompanyfilteract(true)
      // setasallokasivalue(null)
    } else {
      setasallokasifilteract(true);
      setasalcompanyfilteract(true);
      setasallokasivalue(value);
    }
  };
  const onChangeStatus = (value) => {
    if (typeof value === "undefined") {
      // setDataSource(dataraw)
      window.location.href = `/admin/requesters?name=${
        namasearchact ? name1 : ""
      }&location_id=&is_enabled=&company_id=${
        asalcompanyfilteract ? company_id1 : ""
      }`;
      setstatusfilteract(false);
    } else {
      setstatusfilteract(true);
      setstatusvalue(value);
    }
  };
  const onFinalClick = () => {
    // var datatemp = dataraw
    // if (asalcompanyfilteract) {
    //     datatemp = datatemp.filter(flt => {
    //         return flt.company_id === asalcompanyvalue
    //     })
    // }
    // if (asallokasifilteract) {
    //     datatemp = datatemp.filter(flt => {
    //         return flt.company_id === asallokasivalue
    //     })
    // }
    // if (namasearchact) {
    //     datatemp = datatemp.filter(flt => {
    //         return flt.fullname.toLowerCase().includes(namavalue.toLowerCase())
    //     })
    // }
    // if (statusfilteract) {
    //     datatemp = datatemp.filter(flt => {
    //         return flt.status === statusvalue
    //     })
    // }
    // setDataSource(datatemp)
    window.location.href = `/admin/requesters?name=${
      namasearchact ? (namavalue === null ? name1 : namavalue) : ""
    }&location_id=${
      asallokasifilteract
        ? asallokasivalue === null
          ? location_id1
          : asallokasivalue
        : ""
    }&is_enabled=${
      statusfilteract ? (statusvalue === null ? is_enabled1 : statusvalue) : ""
    }&company_id=${
      asalcompanyfilteract
        ? asalcompanyvalue === null
          ? company_id1
          : asalcompanyvalue
        : ""
    }`;
  };

  const FilterAll = () => {
    setDataSource(dataraw);
  };
  const FilterByWord = (word) => {
    const currValue = word;
    const filteredData = dataraw.filter((entry) => {
      if (entry.fullname.toLowerCase()[0] === word) {
        return entry.fullname.toLowerCase().includes(currValue);
      }
    });
    setDataSource(filteredData);
  };
  const onFilterByCompany = (val) => {
    setDataSource(dataraw);
    if (val === "all") {
      setDataSource(dataraw);
    } else {
      setDataSource((prev) => {
        return prev.filter((dataa) => {
          return dataa.company_id === val;
        });
      });
    }
  };

  const columnsDD = [
    {
      dataIndex: "profil_image",
      render: (text, record, index) => {
        return {
          // props: {
          //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
          // },
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
      // render: (text, record, index) => (
      //     <>
      //         <img src={record.profile_image} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full" />
      //     </>
      // )
    },
    // {
    //     title: 'ID',
    //     dataIndex: 'user_id',
    //     // sorter: (a, b) => a.user_id - b.user_id,
    //     // sortDirections: ['descend', 'ascend'],
    //     render: (text, record, index) => {
    //         return {
    //             // props: {
    //             //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
    //             // },
    //             children:
    //                 <>
    //                     {record.user_id}
    //                 </>
    //         }
    //     }
    // },
    {
      title: "Nama",
      dataIndex: "name",
      // sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      // sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => {
        return {
          // props: {
          //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
          // },
          children: <>{record.name}</>,
        };
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record, index) => {
        return {
          // props: {
          //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
          // },
          children: <>{record.email}</>,
        };
      },
    },
    {
      title: "Posisi",
      dataIndex: "position",
      render: (text, record, index) => {
        return {
          // props: {
          //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
          // },
          children: <>{record.position}</>,
        };
      },
    },
    {
      title: "No. Handphone",
      dataIndex: "phone_number",
      render: (text, record, index) => {
        return {
          // props: {
          //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
          // },
          children: <>{record.phone_number}</>,
        };
      },
    },
    {
      title: "Asal Perusahaan",
      dataIndex: "company_name",
      render: (text, record, index) => {
        return {
          // props: {
          //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
          // },
          children: <>{record.company_name}</>,
        };
      },
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
                  Non-aktif
                </div>
              )}
            </>
          ),
        };
      },
    },
    // {
    //     title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    //     dataIndex: 'actionss',
    //     render: (text, record, index) => {
    //         return {
    //             // props: {
    //             //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
    //             // },
    //             children:
    //                 <>
    //                     {/* {
    //                         actions[index] ?
    //                             <>{actions[index]} */}
    //                     {
    //                         [114, 115, 116, 118, 133].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
    //                             <Button onClick={() => { rt.push(`/admin/requesters/${record.user_id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
    //                                 <EditOutlined />
    //                             </Button>
    //                             :
    //                             null
    //                     }
    //                     {/* </>
    //                             :
    //                             null
    //                     } */}
    //                 </>
    //         }
    //     }
    //     // render: (text, record, index) => (
    //     //     <>
    //     //         {
    //     //             actions[index] ?
    //     //                 <>{actions[index]}
    //     //                     <Button onClick={() => { rt.push(`/admin/requesters/${record.user_id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}>
    //     //                         <EditOutlined />
    //     //                     </Button>
    //     //                 </>
    //     //                 :
    //     //                 null
    //     //         }
    //     //     </>
    //     // )
    // }
  ];

  //useEffect
  useEffect(() => {
    setpraloading(true);
    setdatarawloading(true);
    setdatarawloading2(true);
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/getRequesterList?name=${name1}&company_id=${
        location_id1 === "" && company_id1 === "null"
          ? ""
          : location_id1 === ""
          ? company_id1
          : location_id1
      }${is_enabled1 === "" ? "" : `&is_enabled=${is_enabled1}`}`,
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
              id: doc.id,
              profile_image:
                doc.profile_image === "" || doc.profile_image === "-"
                  ? `/default-users.jpeg`
                  : doc.profile_image,
              name: doc.name,
              email: doc.email,
              phone_number: doc.phone_number,
              company_id: doc.company_id,
              company_name: doc.company_name,
              is_enabled: doc.is_enabled,
              position: doc.position,
            };
          });
        }
        setdataraw(res2.data);
        setDataSource(dataDD);
        setpraloading(false);
      });
  }, []);
  useEffect(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyClientList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatacompany(res2.data);
        setdatarawloading(false);
      });
  }, []);
  useEffect(() => {
    setloadinglokasi(true);
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/getLocations${
        location_id1 !== "" ? `?company_id=${company_id1}` : ``
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
        if (location_id1 !== "") {
          res2.data.children
            ? setdatalokasi(res2.data.children)
            : setdatalokasi([]);
          setloadinglokasi(false);
          var selectedBranchClient = {};
          const recursiveSearchBranchClient = (doc, key) => {
            for (var i = 0; i < doc.length; i++) {
              if (doc[i].id === key) {
                selectedBranchClient = doc[i];
              } else {
                if (doc[i].children) {
                  recursiveSearchBranchClient(doc[i].children, key);
                }
              }
            }
          };
          res2.data.children
            ? recursiveSearchBranchClient(
                res2.data.children,
                Number(location_id1)
              )
            : (selectedBranchClient = null);
          res2.data.children
            ? setdefasset2(selectedBranchClient.key)
            : setdefasset2(null);
        } else {
          setdatalokasi([]);
          company_id1 === "" ? setloadinglokasi(true) : setloadinglokasi(false);
        }
        setdatarawloading2(false);
      });
  }, []);
  useEffect(() => {
    if (asallokasitrigger !== -1) {
      setloadinglokasi(true);
      fetch(
        `https://boiling-thicket-46501.herokuapp.com/getLocations${
          asalcompanyvalue !== null ? `?company_id=${asalcompanyvalue}` : ``
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
          if (asalcompanyvalue !== null) {
            res2.data.children
              ? setdatalokasi(res2.data.children)
              : setdatalokasi([]);
            setloadinglokasi(false);
          } else {
            setdatalokasi([]);
            setloadinglokasi(false);
          }
        });
    }
  }, [asallokasitrigger]);
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
        <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 border-gray-400 md:border-t md:border-b p-4 bg-white mb-5">
          <div className="col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
            <div className="font-semibold text-base w-auto">Requesters</div>
          </div>
          {
            // [117].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
            <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
              <Link
                href={{
                  pathname: "/admin/requesters/create",
                }}
              >
                <Button
                  /*onClick={() => { console.log(asalcompanyfilteract, company_id1, asalcompanyvalue); console.log(asallokasifilteract, location_id1, asallokasivalue) }}*/ size="large"
                  type="primary"
                >
                  Tambah
                </Button>
              </Link>
            </div>
          }
        </div>
        {
          // [119].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white">
            <div className="md:col-span-5 col-span-1 flex flex-col py-3">
              <div className="flex mb-8">
                <div className=" w-10/12 mr-1 grid grid-cols-9">
                  {datarawloading ? null : (
                    <div className="col-span-3 mr-1">
                      <Input
                        defaultValue={name1}
                        style={{ width: `100%`, marginRight: `0.5rem` }}
                        placeholder="Cari nama requester"
                        onChange={onChangeSearch}
                        allowClear
                      ></Input>
                    </div>
                  )}
                  {datarawloading ? null : (
                    <div className="col-span-2 mr-1">
                      <Select
                        defaultValue={
                          company_id1 === "" ? null : Number(company_id1)
                        }
                        placeholder="Pilih asal perusahaan requester"
                        style={{ width: `100%`, marginRight: `0.5rem` }}
                        onChange={onChangeAsalCompany}
                        allowClear
                      >
                        {datacompany.map((doc, idx) => {
                          return (
                            <Select.Option value={doc.id}>
                              {doc.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                      {/* <TreeSelect defaultValue={company_id1 === "null" || company_id1 === "" ? null : Number(defasset)} allowClear
                                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                    treeData={datacompany}
                                                    placeholder="Cari asal perusahaan requester"
                                                    treeDefaultExpandAll
                                                    style={{ width: `100%`, marginRight: `0.5rem` }}
                                                    onChange={onChangeAsalCompany}
                                                /> */}
                    </div>
                  )}
                  {datarawloading2 ? null : (
                    <div className="col-span-2 mr-1">
                      <TreeSelect
                        defaultValue={
                          location_id1 === ""
                            ? null
                            : defasset2 === null
                            ? defasset2
                            : Number(defasset2)
                        }
                        allowClear
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        treeData={datalokasi}
                        placeholder="Cari asal lokasi requester"
                        treeDefaultExpandAll
                        style={{ width: `100%`, marginRight: `0.5rem` }}
                        onChange={onChangeAsalLokasi}
                        disabled={loadinglokasi}
                      />
                    </div>
                  )}
                  {datarawloading ? null : (
                    <div className="col-span-2 mr-1">
                      <Select
                        defaultValue={
                          is_enabled1 === ""
                            ? null
                            : is_enabled1 === "true"
                            ? true
                            : false
                        }
                        placeholder="Pilih status requester"
                        style={{ width: `100%`, marginRight: `0.5rem` }}
                        onChange={onChangeStatus}
                        allowClear
                      >
                        <Select.Option value={true}>Aktif</Select.Option>
                        <Select.Option value={false}>Non Aktif</Select.Option>
                      </Select>
                    </div>
                  )}
                </div>
                {datarawloading ? null : (
                  <div className="w-2/12">
                    <Button
                      type="primary"
                      style={{ width: `100%` }}
                      onClick={onFinalClick}
                    >
                      <SearchOutlined />
                    </Button>
                  </div>
                )}
              </div>
              <Table
                pagination={{
                  pageSize: 10,
                  total: rawdata.total,
                  onChange: (page, pageSize) => {
                    setpraloading(true);
                    fetch(
                      `https://boiling-thicket-46501.herokuapp.com/getRequesterList?page=${page}&rows=10&name=${name1}&company_id=${
                        location_id1 === "" ? company_id1 : location_id1
                      }${
                        is_enabled1 === "" ? "" : `&is_enabled=${is_enabled1}`
                      }`,
                      {
                        // fetch(`https://boiling-thicket-46501.herokuapp.com/getRequesterList`, {
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
                        setDataSource(temppagination);
                        setpraloading(false);
                      });
                  },
                }}
                scroll={{ x: 200 }}
                dataSource={dataKK}
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
                        rt.push(`/admin/requesters/detail/${record.id}`);
                        // :
                        // null
                      }
                    },
                  };
                }}
                rowClassName={(record, idx) => {
                  return record.id === rowstate ? `cursor-pointer` : ``;
                }}
                // onRow={(record, rowIndex) => {
                //     return {
                //         onMouseOver: (event) => {
                //             var actionsCopy = actions
                //             actionsCopy[rowIndex] = true
                //             setActions(actionsCopy)
                //             setAction("block")
                //         },
                //         onMouseLeave: (event) => {
                //             var actionsCopy = actions
                //             actionsCopy[rowIndex] = false
                //             setActions(actionsCopy)
                //             setAction("hidden")
                //         }
                //     }
                // }}
              ></Table>
            </div>
          </div>
        }
      </>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  const reqBodyAccountList = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
  const reqBody = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
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
    `https://boiling-thicket-46501.herokuapp.com/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  // if (![119, 118, 117, 116, 115, 114, 133].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  // const resourcesLA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getRequesterList`, {
  //     method: `POST`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps),
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(reqBodyAccountList)
  // })
  // const resjsonLA = await resourcesLA.json()
  // const dataListRequester = resjsonLA

  // const resourcesGCL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getClientCompanyList`, {
  //     method: `POST`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps),
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(reqBody)
  // })
  // const resjsonGCL = await resourcesGCL.json()
  // const dataCompanyList = resjsonGCL

  return {
    props: {
      initProps,
      dataProfile,
      // dataListRequester,
      // dataCompanyList,
      sidemenu: "62",
    },
  };
}

export default Requesters;
