// import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
// import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { Button, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import DrawerCreateClient from "components/drawer/companies/clients/drawerClientCompanyCreate";
import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { COMPANY_CLIENTS_GET, COMPANY_CLIENT_ADD } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

// function modifData(dataa) {
//   for (var i = 0; i < dataa.length; i++) {
//     dataa[i]["key"] = dataa[i].id;
//     dataa[i]["value"] = dataa[i].id;
//     dataa[i]["title"] = dataa[i].name;
//     dataa[i]["children"] = dataa[i].members;
//     delete dataa[i].members;
//     if (dataa[i].children) [modifData(dataa[i].children)];
//   }
//   return dataa;
// }

function ClientsIndex({ initProps, dataProfile, sidemenu }) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetCompanyClientList = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToAddCompanyClient = hasPermission(COMPANY_CLIENT_ADD);

  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(1, 1);
  const [drawablecreate, setDrawablecreate] = useState(false);
  // const [loadingupload, setLoadingupload] = useState(false);
  // const [loadingbtn, setloadingbtn] = useState(false);
  // const [instanceForm] = Form.useForm()
  // const { Option } = Select
  // const [newclients, setnewclients] = useState({
  //   name: "",
  //   role: 2,
  //   address: "",
  //   phone_number: "",
  //   image_logo: "",
  //   parent_id: 0,
  // });
  const [datatable, setdatatable] = useState([]);
  const [datatable2, setdatatable2] = useState([]);
  const [loaddatatable, setloaddatatable] = useState(false);
  // var dataTable = []
  // if (!dataCompanyList.data) {
  //     dataTable = []
  //     notification['error']({
  //         message: dataCompanyList.message.errorInfo.status_detail,
  //         duration: 3
  //     })
  //     rt.push('/admin/company')
  // }
  // else {
  //     dataTable = dataCompanyList.data.filter(dataa => dataa.company_id != 66).map((doc, idx) => {
  //         return ({
  //             image_logo: doc.image_logo,
  //             company_id: doc.company_id,
  //             company_name: doc.company_name,
  //             is_enabled: doc.is_enabled
  //         })
  //     })
  // }
  const columnsTable = [
    {
      title: "Logo",
      dataIndex: "image_logo",
      render: (text, record, index) => {
        return {
          // props: {
          //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
          // },
          children: (
            <>
              <Link href={`/company/clients/${record.id}`}>
                <a>
                  <img
                    src={
                      record.image_logo === "-" || record.image_logo === ""
                        ? `/image/Induk.png`
                        : record.image_logo
                    }
                    alt="imageProfile"
                    className=" object-cover w-10 h-10 rounded-full"
                  />
                </a>
              </Link>
            </>
          ),
        };
      },
    },
    // {
    //     title: 'ID',
    //     dataIndex: 'company_id',
    //     render: (text, record, index) => {
    //         return {
    //             props: {
    //                 style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
    //             },
    //             children:
    //                 <>
    //                     <Link href={`/admin/company/${record.company_id}`}>
    //                         <a><h1>{record.company_id}</h1></a>
    //                     </Link>
    //                 </>
    //         }
    //     },
    //     // sorter: (a, b) => a.company_id - b.company_id,
    //     // sortDirections: ['descend', 'ascend'],
    // },
    {
      title: "Nama Perusahaan",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          // props: {
          //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
          // },
          children: (
            <>
              <Link href={`/company/clients/${record.id}`}>
                <a>
                  <h1>{record.name}</h1>
                </a>
              </Link>
            </>
          ),
        };
      },
      // sorter: (a, b) => a.company_name.localeCompare(b.company_name),
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Status",
      dataIndex: "is_enabled",
      align: `center`,
      render: (text, record, index) => {
        return {
          // props: {
          //     style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
          // },
          children: (
            <div className="flex justify-center">
              <Link href={`/company/clients/${record.id}`}>
                {record.is_enabled ? (
                  <a>
                    <div className=" bg-blue-100 text-blue-600 border-blue-600 border py-1 px-3 rounded-md text-center w-40">
                      AKTIF MODULE
                    </div>
                  </a>
                ) : (
                  <a>
                    <div className=" bg-red-100 text-red-600 border-red-600 border py-1 px-3 rounded-md text-center w-52">
                      NON-AKTIF MODULE
                    </div>
                  </a>
                )}
              </Link>
            </div>
          ),
        };
      },
      // filters: [
      //     {
      //         text: 'Aktif',
      //         value: true,
      //     },
      //     {
      //         text: 'Non-aktif',
      //         value: false,
      //     },
      // ],
      // onFilter: (value, record) => record.is_enabled === value,
    },
    // {
    //     title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    //     dataIndex: 'actionss',
    //     align: `center`,
    //     render: (text, record, index) => {
    //         return {
    //             props: {
    //                 style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
    //             },
    //             children:

    //                 <>
    //                     {/* {
    //                         events[index] ?
    //                             <> */}
    //                     {
    //                         [156, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
    //                         <Button onClick={() => { rt.push(`/admin/company/${record.company_id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `1rem` }}>
    //                             <EditOutlined />
    //                         </Button>
    //                     }
    //                     {/* <Link href={`/admin/company/${record.company_id}`}> */}
    //                     {/* {events[index]} */}
    //                     {/* <Link href={`/company/${record.company_id}?originPath=Admin`}> */}
    //                     {/* <a><EditOutlined /></a> */}
    //                     {/* </Link> */}
    //                     {/* </Link> */}
    //                     {/* </>
    //                             :
    //                             null
    //                     } */}
    //                 </>
    //         }
    //     }
    // }
  ];
  // const closeClientsDrawer = () => {
  //   setnewclients({
  //     name: "",
  //     role: 0,
  //     address: "",
  //     phone_number: "",
  //     image_logo: "",
  //     parent_id: null,
  //   });
  // };

  // const beforeUploadProfileImage = (file) => {
  //   const isJpgOrPng =
  //     file.type === "image/jpeg" ||
  //     file.type === "image/png" ||
  //     file.type === "image/jpg";
  //   if (!isJpgOrPng) {
  //     message.error("You can only upload JPG/PNG file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("Image must smaller than 2MB!");
  //   }
  //   return isJpgOrPng && isLt2M;
  // };
  // const onChangeProfileImage = async (info) => {
  //   if (info.file.status === "uploading") {
  //     setLoadingupload(true);
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     const formData = new FormData();
  //     formData.append("file", info.file.originFileObj);
  //     formData.append("upload_preset", "migsys");
  //     return fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((res2) => {
  //         setLoadingupload(false);
  //         setnewclients({
  //           ...newclients,
  //           image_logo: res2.secure_url,
  //         });
  //       });
  //   }
  // };
  // const uploadButton = (
  //   <div>
  //     {loadingupload ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Unggah</div>
  //   </div>
  // );
  // const onChangeCreateClients = (e) => {
  //   var val = e.target.value;
  //   if (e.target.name === "role") {
  //     val = parseInt(e.target.value);
  //   }
  //   setnewclients({
  //     ...newclients,
  //     [e.target.name]: val,
  //   });
  // };
  // const onChangeParent = (value) => {
  //   setnewclients({
  //     ...newclients,
  //     parent_id: value,
  //   });
  // };
  // const onChangeSearch = (e) => {
  //   const filtered = datatable2.filter((flt) => {
  //     return flt.name.toLowerCase().includes(e.target.value.toLowerCase());
  //   });
  //   setdatatable(filtered);
  // };
  // const handleSubmitCreateClients = () => {
  //   setnewclients({
  //     ...newclients,
  //     role: 2,
  //   });
  //   if (newclients.address === "") {
  //     setnewclients({
  //       ...newclients,
  //       address: "-",
  //     });
  //   }
  //   if (newclients.phone_number === "") {
  //     setnewclients({
  //       ...newclients,
  //       phone_number: "-",
  //     });
  //   }
  //   setloadingbtn(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addCompanyClient`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: JSON.parse(tok),
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newclients),
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       setloadingbtn(false);
  //       if (res2.success) {
  //         notification["success"]({
  //           message: res2.message,
  //           duration: 3,
  //         });
  //         setnewclients({
  //           name: "",
  //           role: 0,
  //           address: "",
  //           phone_number: "",
  //           image_logo: "",
  //           parent_id: null,
  //         });
  //         setTimeout(() => {
  //           setDrawablecreate(false);
  //           rt.push(`/admin/clients`);
  //         }, 800);
  //       } else if (!res2.success) {
  //         notification["error"]({
  //           message: res2.message.errorInfo.status_detail,
  //           duration: 3,
  //           style: {
  //             zIndex: `1000`,
  //           },
  //         });
  //       }
  //     });
  // };

  const [refreshCompanyClientList, triggerRefreshCompanyClientList] =
    useState(0);

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetCompanyClientList && !isAccessControlPending) {
      permissionWarningNotification("Mendapatkan", "Daftar Company Client");
      setloaddatatable(false);
      return;
    }

    setloaddatatable(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatatable(res2.data);
        setdatatable2(res2.data);
        setloaddatatable(false);
      });
  }, [
    refreshCompanyClientList,
    isAllowedToGetCompanyClientList,
    isAccessControlPending,
  ]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      st={st}
    >
      <AccessControl hasPermission={COMPANY_CLIENT_ADD}>
        <DrawerCreateClient
          title="Tambah Client"
          buttonOkText="Simpan"
          initProps={initProps}
          visible={drawablecreate}
          onvisible={setDrawablecreate}
          onSucceed={() => {
            triggerRefreshCompanyClientList((prev) => ++prev);
          }}
        />
      </AccessControl>

      <div className="flex justify-start md:justify-end p-3 md:border-t-2 md:border-b-2 bg-white mb-4 md:mb-8">
        <div className=" w-full flex justify-between items-center px-2">
          <h1 className="font-bold">Clients</h1>
          {
            // [157].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
            <Button
              type="primary"
              size="large"
              onClick={() => {
                // rt.push(`/admin/clients/locations/new?parent=list&frominduk=0`);
                setDrawablecreate(true);
              }}
              disabled={!isAllowedToAddCompanyClient}
            >
              Tambah
            </Button>
            // <Button type="primary" size="large" onClick={() => { setDrawablecreate(true); }}>Tambah</Button>
          }
        </div>
      </div>
      <div className="p-5 mt-5 flex flex-col space-y-5 rounded-md w-full h-auto bg-white">
        {/* <Input style={{ width: `50%` }} onChange={(e) => { onChangeSearch(e) }} placeholder="Cari Nama Client" /> */}
        <Table
          pagination={{ pageSize: 6 }}
          scroll={{ x: 200 }}
          // onRow={(record, rowIndex) => {
          //     return {
          //         onMouseOver: (event) => {
          //             var eventscopy = events
          //             eventscopy[rowIndex] = true
          //             setEvents(eventscopy)
          //             setEvent("block")
          //             setColorhover("bg-blue-100")
          //         },
          //         onMouseLeave: (event) => {
          //             var eventscopy = events
          //             eventscopy[rowIndex] = false
          //             setEvents(eventscopy)
          //             setEvent("hidden")
          //             setColorhover("")
          //         }
          //     }
          // }}
          columns={columnsTable}
          dataSource={datatable}
          loading={loaddatatable}
        />
        {/* {
                    dataCompanyList.data.companies.map((doc, idx) => {
                        return (
                            <div className="p-4 grid grid-col hover:bg-blue-100" onMouseOver={() => onMouseOverCells(idx)} onMouseLeave={() => onMouseLeaveCells(idx)}>
                                <img src={doc.image_logo} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full mr-8" />
                                <div className="mr-14 w-40 text-xs md:text-sm">
                                    {doc.company_name}
                                </div>
                                {
                                    events[idx] ?
                                        <> {events[idx]}
                                            <Link href={{
                                                pathname: `/company/${doc.company_id}`,
                                                query: {
                                                    originPath: 'Admin'
                                                }
                                            }}>
                                                <EditOutlined />
                                            </Link>
                                        </>
                                        :
                                        null
                                }
                            </div>
                        )
                    })
                } */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  const reqBody = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
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
        "Content-Type": "application/json",
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  // if (![155, 156, 157, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  // const resourcesGCL = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getClientCompanyList`, {
  //     method: `POST`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps),
  //         'Content-Type': 'application/json'
  //     },
  // })
  // const resjsonGCL = await resourcesGCL.json()
  // const dataCompanyList = resjsonGCL

  // const resourcesGL = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLocations`, {
  //     method: `POST`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps),
  //     },
  // })
  // const resjsonGL = await resourcesGL.json()
  // const dataLocations = resjsonGL

  return {
    props: {
      initProps,
      dataProfile,
      // dataCompanyList,
      // dataLocations,
      sidemenu: "52",
    },
  };
}

export default ClientsIndex;
