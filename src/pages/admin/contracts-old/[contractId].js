import { InputNumber, Modal, Tabs, Timeline, notification } from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Sticky from "wil-react-sticky";

import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function ViewContract({
  initProps,
  dataProfile,
  dataContract,
  dataContractTypes,
  sidemenu,
}) {
  const rt = useRouter();
  const tok = initProps;
  // const pathArr = rt.pathname.split("/").slice(1)
  const pathArr = [
    "admin",
    "contracts",
    dataContract.data.contract.nomor_kontrak,
  ];
  const { originPath } = rt.query;
  const { TabPane } = Tabs;

  const contractTypes = dataContractTypes.data.filter((item, idx) => {
    return dataContract.data.contract.id_tipe_kontrak == item.id;
  })[0];
  // console.log(contractTypes)
  const contract = dataContract.data.contract;
  // console.log(contract)
  const serviceItems = dataContract.data.service_item_kontraks;
  // console.log(dataContract)

  //--------hook modal delete dan terminate contract-------------
  const [warningDelete, setWarningDelete] = useState({
    istrue: false,
    key: null,
    nomor_kontrak: "",
    loadingBtn: false,
  });
  const [warningTerminate, setWarningTerminate] = useState({
    istrue: false,
    key: null,
    nomor_kontrak: "",
    loadingBtn: false,
  });
  const [warningActivate, setWarningActivate] = useState({
    istrue: false,
    key: null,
    nomor_kontrak: "",
    loadingBtn: false,
  });
  const onClickModalDeleteContract = (istrue, record) => {
    setWarningDelete({
      ...warningDelete,
      ["istrue"]: istrue,
      ["key"]: record.id,
      ["nomor_kontrak"]: record.nomor_kontrak,
    });
  };
  const onClickModalTerminateContract = (istrue, record) => {
    setWarningTerminate({
      ...warningTerminate,
      ["istrue"]: istrue,
      ["key"]: record.id,
      ["nomor_kontrak"]: record.nomor_kontrak,
    });
  };
  const onClickModalTerminateActivate = (istrue, record) => {
    setWarningActivate({
      ...warningActivate,
      ["istrue"]: istrue,
      ["key"]: record.id,
      ["nomor_kontrak"]: record.nomor_kontrak,
    });
  };
  //-------------------terminate contract------------------------
  const handleTerminateContract = (id) => {
    setWarningTerminate({ ...warningTerminate, loadingBtn: true });
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deactivatingContract?id=${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(tok),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setWarningTerminate(false, null);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/contracts`);
          }, 500);
        } else if (!res2.success) {
          setWarningTerminate(false, null);
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  //-------------------activate contract------------------------
  const handleActivateContract = (id) => {
    setWarningActivate({ ...warningActivate, loadingBtn: true });
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activatingContract?id=${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(tok),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setWarningActivate(false, null);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/contracts`);
          }, 500);
        } else if (!res2.success) {
          setWarningActivate(false, null);
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  //------------------handle delete contract-------------------
  const handleDeleteContract = (key) => {
    setWarningDelete({ ...warningDelete, loadingBtn: true });
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteContract?id=${key}`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(tok),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: key,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setWarningDelete(false, null);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/contracts`);
          }, 500);
        } else if (!res2.success) {
          setWarningDelete(false, null);
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  //--------------------------------------------------------
  const currentDate = moment();
  // const future = moment('2022-03-02 10:03:02');
  const future = moment(contract.tanggal_selesai);
  // const timeLeft = moment(future.diff(currentDate)).format("YYYY-MM-DD HH:mm:ss");
  var timeLeft =
    moment(future).diff(currentDate, "months") > 2
      ? moment(future).diff(currentDate, "months") + " Bulan"
      : moment(future).diff(currentDate, "days") + " Hari";
  var numtimeleft = Number(timeLeft.split(" ")[0]);
  numtimeleft <= 0 ? (timeLeft = "Habis") : timeLeft;
  var timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };

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
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 md:col-span-4" id="formAgentsWrapper">
            <Sticky containerSelectorFocus="#formAgentsWrapper">
              <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                <div className={"flex"}>
                  <h1 className="font-semibold text-base w-auto py-2 pr-4">
                    {contract.nomor_kontrak}
                  </h1>
                  {contract.is_active ? (
                    <div className=" relative top-1 h-9 bg-blue-100 text-blue-600 border-blue-600 border py-1 px-3 rounded-md w-auto md:mr-5">
                      AKTIF
                    </div>
                  ) : (
                    <div className=" relative top-1 h-9 bg-gray-100 text-gray-600 border-gray-600 border py-1 px-3 rounded-md w-auto md:mr-5">
                      NON-AKTIF
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 pt-1">
                  {[199].every((curr) =>
                    dataProfile.data.registered_feature.includes(curr)
                  ) && (
                    <>
                      {!contract.is_active && (
                        <button
                          onClick={() => {
                            onClickModalTerminateActivate(true, contract);
                          }}
                          className=" text-white text-sm bg-green-600 border-gray-900  hover:bg-green-700 cursor-pointer h-10 py-2.5 w-20 text-center"
                        >
                          <p>Activate</p>
                        </button>
                      )}
                    </>
                  )}
                  {[200].every((curr) =>
                    dataProfile.data.registered_feature.includes(curr)
                  ) && (
                    <>
                      {contract.is_active && (
                        <button
                          onClick={() => {
                            onClickModalTerminateContract(true, contract);
                          }}
                          className=" text-white text-sm bg-red-600 border-gray-900  hover:bg-red-700 cursor-pointer h-10 py-2.5 w-20 text-center"
                        >
                          <p>Terminate</p>
                        </button>
                      )}
                    </>
                  )}
                  {[197].every((curr) =>
                    dataProfile.data.registered_feature.includes(curr)
                  ) && (
                    <Link
                      href={`/admin/contracts/update/${contract.id}`}
                      legacyBehavior
                    >
                      <div className=" text-white text-sm bg-blue-500 hover:bg-blue-600 border-gray-900 cursor-pointer h-10 py-2.5 w-20 text-center">
                        <p>Edit</p>
                      </div>
                    </Link>
                  )}
                  {[198].every((curr) =>
                    dataProfile.data.registered_feature.includes(curr)
                  ) && (
                    <button
                      onClick={() => {
                        onClickModalDeleteContract(true, contract);
                      }}
                      className=" text-black text-sm bg-white border-gray-300 border hover:bg-gray-200 cursor-pointer h-10 py-2 w-20 text-center"
                    >
                      <p>Delete</p>
                    </button>
                  )}
                </div>
              </div>
            </Sticky>
          </div>
          <div className=" col-span-1 md:col-span-3 flex flex-col">
            <div className="col-span-3 flex flex-col space-y-3">
              <Tabs defaultActiveKey="1" tabPosition={"left"}>
                <TabPane tab={"Overview"} key={1}>
                  <div>
                    <div className={"py-2"}>General Details</div>
                    <div
                      className={
                        "text-black text-sm overflow-auto flex flex-col bg-white border-gray-300 border cursor-pointer p-1"
                      }
                    >
                      <div className={"grid grid-cols-1 md:grid-cols-3 p-2"}>
                        <div className={"col-span-1"}>Nomor Kontrak</div>
                        <div className={"col-span-2"}>
                          {contract.nomor_kontrak}
                        </div>
                      </div>
                      <div className={"grid grid-cols-1 md:grid-cols-3 p-2"}>
                        <div className={" mr-20 w-32"}>Perusahaan</div>
                        <div className={"col-span-2"}>
                          {contract.company_name}
                        </div>
                      </div>
                      <div className={"grid grid-cols-1 md:grid-cols-3 p-2"}>
                        <div className={" mr-20 w-32"}>Tipe Kontrak</div>
                        <div className={"col-span-2"}>{contractTypes.nama}</div>
                      </div>
                      <div className={"grid grid-cols-1 md:grid-cols-3 p-2"}>
                        <div className={" mr-20 w-32"}>Deskripsi</div>
                        <div className={"col-span-2"}>{contract.deskripsi}</div>
                      </div>
                      <div className={"grid grid-cols-1 md:grid-cols-3 p-2"}>
                        <div className={" mr-20 w-32"}>Tanggal Mulai</div>
                        <div className={"col-span-2"}>
                          {contract.tanggal_mulai}
                        </div>
                      </div>
                      <div className={"grid grid-cols-1 md:grid-cols-3 p-2"}>
                        <div className={" mr-20 w-32"}>Tanggal Selesai</div>
                        <div className={"col-span-2"}>
                          {contract.tanggal_selesai}
                        </div>
                      </div>
                      <div className={"grid grid-cols-1 md:grid-cols-3 p-2"}>
                        <div className={" mr-20 w-32"}>Sisa Waktu Kontrak</div>
                        <div className={"col-span-2"}>{timeLeft}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={"py-2"}>Service Items Detail</div>
                    {serviceItems.map((item, idx) => {
                      return (
                        <>
                          <div
                            className={
                              "text-black text-sm overflow-auto flex flex-col bg-white border-gray-300 border cursor-pointer p-1"
                            }
                          >
                            <div
                              className={"grid grid-cols-1 md:grid-cols-3 p-2"}
                            >
                              <div className={"col-span-1"}>
                                Nama Service Item
                              </div>
                              <div className={"col-span-2"}>{item.nama}</div>
                            </div>
                            <div
                              className={"grid grid-cols-1 md:grid-cols-3 p-2"}
                            >
                              <div className={"col-span-1 mt-1"}>Harga</div>
                              <div className={"col-span-2"}>
                                <InputNumber
                                  defaultValue={item.harga}
                                  formatter={(value) =>
                                    `IDR ${value}`.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    ) + " Rupiah"
                                  }
                                  parser={(value) =>
                                    value.replace(/\$\s?|(,*)/g, "")
                                  }
                                  readOnly
                                  bordered={false}
                                  style={{
                                    width: "220px",
                                    marginLeft: "-12px",
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              className={"grid grid-cols-1 md:grid-cols-3 p-2"}
                            >
                              <div className={"col-span-1"}>
                                Metode Pembayaran
                              </div>
                              <div className={"col-span-2"}>
                                {item.nama_metode_pembayaran}
                              </div>
                            </div>
                          </div>
                          <br />
                        </>
                      );
                    })}
                  </div>
                </TabPane>
                <TabPane tab={"Activity"} key={2}>
                  <div
                    className={
                      "text-black text-sm flex flex-col bg-white border-gray-300 border cursor-pointer p-3 w-full"
                    }
                  >
                    {/* <Timeline mode={'alternate'}> 
                                    {activityLog.map((doc,index) => {
                                        var text
                                        var data_update = ""
                                        // console.log(Object.keys(doc.properties.attributes).length)
                                        // console.log(Object.keys(doc.properties.attributes))
                                        // console.log(Object.values(doc.properties.attributes))
                                        if (doc.description == "created contract") {
                                            text =  "Created Contract Named " + doc.properties.attributes.nomor_kontrak +
                                                    ", Own by " + (doc.properties.attributes.kepemilikan=="milikSendiri"?"Milik Sendiri":doc.properties.attributes.kepemilikan) +
                                                    "with Asset Type as " +doc.properties.attributes.asset_id_name +
                                                    ", Vendor as " +doc.properties.attributes.vendor_name +
                                                    ", Status as " +doc.properties.attributes.status
                                        } else {
                                            for (let i = 0; i < Object.keys(doc.properties.attributes).length; i++) {
                                                data_update = data_update + Object.keys(doc.properties.attributes)[i] + " changed to " + Object.values(doc.properties.attributes)[i] + ", "
                                            }
                                            text = data_update
                                        }
                                            return(
                                                <Timeline.Item key={index} label={timeConverter(Date.parse(doc.date))}>
                                                    {text}
                                                </Timeline.Item>
                                                )
                                        })
                                    }
                                    </Timeline> */}
                  </div>
                </TabPane>
              </Tabs>
            </div>
            <Modal
              title="Konfirmasi untuk menghapus kontrak"
              visible={warningDelete.istrue}
              onOk={() => {
                handleDeleteContract(warningDelete.key);
              }}
              okButtonProps={{ disabled: warningDelete.loadingBtn }}
              onCancel={() => setWarningDelete(false, null)}
            >
              Apakah anda yakin ingin menghapus kontrak{" "}
              <strong>{warningDelete.nomor_kontrak}</strong>?
            </Modal>
            <Modal
              title="Konfirmasi untuk terminate kontrak"
              visible={warningTerminate.istrue}
              onOk={() => {
                handleTerminateContract(warningTerminate.key);
              }}
              okButtonProps={{ disabled: warningTerminate.loadingBtn }}
              onCancel={() => setWarningTerminate(false, null)}
            >
              Apakah anda yakin ingin mengakhiri kontrak{" "}
              <strong>{warningTerminate.nomor_kontrak}</strong>?
            </Modal>
            <Modal
              title="Konfirmasi untuk mengaktifkan kontrak"
              visible={warningActivate.istrue}
              onOk={() => {
                handleActivateContract(warningActivate.key);
              }}
              okButtonProps={{ disabled: warningActivate.loadingBtn }}
              onCancel={() => setWarningActivate(false, null)}
            >
              Apakah anda yakin ingin mengaktifkan kontrak{" "}
              <strong>{warningActivate.nomor_kontrak}</strong>?
            </Modal>
          </div>
          {/* <div className="flex flex-col space-y-3 px-4">
                        <div className="font-semibold text-sm">Groups</div>
                        <p className="font-normal text-sm">
                            You can organize your agents into specific Groups like “Sales” and “Product Management”. Segmenting them into divisions lets you easily assign tickets, create specific canned responses, manage workflows and generate group-level reports. Note that the same agent can be a member of multiple groups as well
                        </p>
                    </div> */}
        </div>
      </>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {
  var initProps = {};
  const contractid = params.contractId;

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
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  if (
    ![195, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206].every((curr) =>
      dataProfile.data.registered_feature.includes(curr)
    )
  ) {
    res.writeHead(302, { Location: "/dashboard/admin" });
    res.end();
  }

  const resourcesGetContract = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getContract?id=${contractid}`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGetContract = await resourcesGetContract.json();
  const dataContract = resjsonGetContract;

  const resourcesGetContractTypes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getContractTypes`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGetContractTypes = await resourcesGetContractTypes.json();
  const dataContractTypes = resjsonGetContractTypes;

  // const assetId = dataContract.data.contract.asset_id

  // const resourcesGetInventoryColumnAndVendor = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getInventoryColumns?id=${assetId}`, {
  //     method: `GET`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps)
  //     }
  // })
  // const resjsonGetInventoryColumnAndVendor = await resourcesGetInventoryColumnAndVendor.json()
  // const dataInventoryColumnAndVendor = resjsonGetInventoryColumnAndVendor

  // const resourcesGetInventoryActivityLog = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getActivityInventoryLogs?id=${inventoryid}`, {
  //     method: `GET`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps)
  //     }
  // })
  // const resjsonGetInventoryActivityLog = await resourcesGetInventoryActivityLog.json()
  // const dataInventoryActivityLog = resjsonGetInventoryActivityLog

  return {
    props: {
      initProps,
      dataProfile,
      dataContract,
      dataContractTypes,
      sidemenu: "4",
    },
  };
}

export default ViewContract;
