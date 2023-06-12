import {
  CloseCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Button,
  Empty,
  Input,
  Modal,
  Popover,
  Select,
  Spin,
  Switch,
  Table,
  Tabs,
  Timeline,
  Tooltip,
  TreeSelect,
  notification,
} from "antd";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

import { useAccessControl } from "contexts/access-control";

import {
  ASSETS_GET,
  INVENTORY_DELETE,
  INVENTORY_GET, // <Activity>
  INVENTORY_LOG_GET, // <Relationship>
  INVENTORY_NOTES_ADD,
  INVENTORY_PARTS_ADD, // <ItemDetail>
  INVENTORY_PART_REMOVE,
  INVENTORY_PART_REPLACE,
  INVENTORY_STATUS_CONDITION,
  INVENTORY_STATUS_USAGE, // <Overview>
  INVENTORY_UPDATE,
  MODELS_GET,
  RELATIONSHIPS_GET, // <KonfigurasiPart>
  RELATIONSHIP_INVENTORY_ADD,
  RELATIONSHIP_INVENTORY_DELETE,
  RELATIONSHIP_INVENTORY_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import {
  AlertCircleIconSvg,
  AlertIconSvg,
  DeleteTablerIconSvg,
  LuarPeriodeIconSvg,
  PakaiInternalIconSvg,
  PakaiSewaIconSvg,
  PeriodeIconSvg,
  ReplacementIconSvg,
  TersediaIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard2";
import st from "../../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

const ProductCatalogDetail = ({ initProps, dataProfile, sidemenu, itemid }) => {
  /**
   * Dependencies
   */
  const rt = useRouter();
  var activeTab = "overview";
  const { active } = rt.query;
  if (active) {
    activeTab = active;
  }
  var pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 2);
  pathArr[pathArr.length - 1] = "Detail Product";
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    asset_id: withDefault(NumberParam, undefined),
    name: withDefault(StringParam, undefined),
    sku: withDefault(StringParam, undefined),
  });
  const [displayentiredata, setdisplayentiredata] = useState({
    success: false,
    message: "",
    data: {
      current_page: 0,
      data: [],
      first_page_url: "",
      from: 0,
      last_page: 0,
      last_page_url: "",
      next_page_url: null,
      path: "",
      per_page: "",
      prev_page_url: "",
      to: 0,
      total: 0,
    },
  });
  const [dataDummy, setDataDummy] = useState({
    success: true,
    message: "Data Berhasil Diambil",
    data: {
      current_page: 1,
      data: [
        {
          id: 5,
          asset_id: 33,
          name: "ATM GRG H22VL",
          description: "",
          sku: "ATM_GRG_H22VL",
          manufacturer_id: 1,
          required_sn: 1,
          is_consumable: 0,
          deleted_at: null,
          asset_name: "ATM",
          asset_deleted_at: null,
          count: 68,
          status_item: {
            pemakaian: "pakai_sewa",
            kondisi_barang: "bagus",
            status_sewa: "periode",
          },
        },
        {
          id: 6,
          asset_id: 33,
          name: "ATM Diebold 529",
          description: "",
          sku: "ATM_Die_529",
          manufacturer_id: 8,
          required_sn: 1,
          is_consumable: 0,
          deleted_at: null,
          asset_name: "ATM",
          asset_deleted_at: null,
          count: 34,
          status_item: {
            pemakaian: "pakai_internal",
            kondisi_barang: "abu",
            status_sewa: "luar_periode",
          },
        },
        {
          id: 7,
          asset_id: 33,
          name: "ATM Hyosung Monimax 5600S",
          description: "",
          sku: "ATM_HYO_MON_5600S",
          manufacturer_id: 9,
          required_sn: 1,
          is_consumable: 0,
          deleted_at: null,
          asset_name: "ATM",
          asset_deleted_at: null,
          count: 4,
          status_item: {
            pemakaian: "tersedia",
            kondisi_barang: "buruk",
            status_sewa: "luar_periode",
          },
        },
        {
          id: 8,
          asset_id: 38,
          name: "UPS HPH SERIES",
          description: "",
          sku: "",
          manufacturer_id: 5,
          required_sn: 1,
          is_consumable: 0,
          deleted_at: null,
          asset_name: "UPS",
          asset_deleted_at: null,
          count: 1,
          status_item: {
            pemakaian: "pakai_sewa",
            kondisi_barang: "bagus",
            status_sewa: null,
          },
        },
        {
          id: 9,
          asset_id: 38,
          name: "UPS EP ISO",
          description: "",
          sku: "",
          manufacturer_id: 4,
          required_sn: 1,
          is_consumable: 0,
          deleted_at: null,
          asset_name: "UPS",
          asset_deleted_at: null,
          count: 9,
          status_item: {
            pemakaian: "replacement",
            kondisi_barang: "bagus",
            status_sewa: "luar_periode",
          },
        },
        {
          id: 10,
          asset_id: 38,
          name: "UPS NH PLUS",
          description: "",
          sku: "",
          manufacturer_id: 5,
          required_sn: 1,
          is_consumable: 0,
          deleted_at: null,
          asset_name: "UPS",
          asset_deleted_at: null,
          count: 2,
          status_item: {
            pemakaian: "pakai_sewa",
            kondisi_barang: "bagus",
            status_sewa: "periode",
          },
        },
        {
          id: 11,
          asset_id: 38,
          name: "UPS GT3-3",
          description: "",
          sku: "",
          manufacturer_id: 4,
          required_sn: 1,
          is_consumable: 0,
          deleted_at: null,
          asset_name: "UPS",
          asset_deleted_at: null,
          count: 2,
          status_item: {
            pemakaian: "pakai_sewa",
            kondisi_barang: "bagus",
            status_sewa: "periode",
          },
        },
        {
          id: 12,
          asset_id: 38,
          name: "UPS PCL HT",
          description: "",
          sku: "",
          manufacturer_id: 10,
          required_sn: 1,
          is_consumable: 0,
          deleted_at: null,
          asset_name: "UPS",
          asset_deleted_at: null,
          count: 1,
          status_item: {
            pemakaian: "pakai_sewa",
            kondisi_barang: "bagus",
            status_sewa: "periode",
          },
        },
        {
          id: 13,
          asset_id: 44,
          name: "CDM Controller",
          description: "",
          sku: "GRG_CDMController",
          manufacturer_id: 1,
          required_sn: 1,
          is_consumable: 0,
          deleted_at: null,
          asset_name: "ATM & CRM Part / ATM & CRM Rotable Part",
          asset_deleted_at: null,
          count: 1,
          status_item: {
            pemakaian: "pakai_sewa",
            kondisi_barang: "bagus",
            status_sewa: "periode",
          },
        },
        {
          id: 14,
          asset_id: 44,
          name: "Note Feeder GRG",
          description: "",
          sku: "GRG_NoteFeeder",
          manufacturer_id: 1,
          required_sn: 1,
          is_consumable: 0,
          deleted_at: null,
          asset_name: "ATM & CRM Part / ATM & CRM Rotable Part",
          asset_deleted_at: null,
          count: 8,
          status_item: {
            pemakaian: "pakai_sewa",
            kondisi_barang: "bagus",
            status_sewa: "periode",
          },
        },
      ],
      first_page_url: "https://service.mig.id/getModels?page=1",
      from: 1,
      last_page: 2,
      last_page_url: "https://service.mig.id/getModels?page=2",
      next_page_url: "https://service.mig.id/getModels?page=2",
      path: "https://service.mig.id/getModels",
      per_page: "10",
      prev_page_url: null,
      to: 10,
      total: 15,
    },
    status: 200,
  });
  const [displaydata, setdisplaydata] = useState([]);
  const columnsTable = [
    {
      title: "Nama",
      dataIndex: ["name", "count"],
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, row) =>
        row["count"] == 0 ? (
          <div className={"flex"}>
            <p className={"text-[14px] text-warning"}>{row["name"]}</p>
            <div className="py-1 px-4 bg-outofstock ml-[10px] rounded-[5px]">
              <p className={"text-warning text-[10px]"}>Out of stock</p>
            </div>
          </div>
        ) : (
          <div>
            <p className={"text-[14px] text-warning"}>{row["name"]}</p>
          </div>
        ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      render: (skuValue) => (!!skuValue ? skuValue : "-"),
      sorter: true,
    },
    {
      title: "Asset Type",
      dataIndex: "asset_name",
    },
    {
      title: "Jumlah Item",
      dataIndex: "count",
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Status",
      dataIndex: "status_item",
      render: (status_item) => (
        <div className={"flex"}>
          <div className={""}>
            {status_item.pemakaian == "pakai_sewa" ? (
              <Tooltip
                color="white"
                title={
                  <div
                    className={"p-2 bg-white rounded-[5px]"}
                    style={{
                      boxShadow: "2px 4px 20px 5px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <div className={"flex"}>
                      <PakaiSewaIconSvg size={16} />
                      <div className={"ml-2"}>
                        <p
                          className={"text-xs text-secondary100 font-semibold"}
                        >
                          Pakai Sewa
                        </p>
                        <p className={"text-mono30 text-[10px] mt-1"}>
                          Barang ini sedang digunakan
                        </p>
                      </div>
                    </div>
                  </div>
                }
                placement="bottom"
              >
                <div
                  className={
                    "border-secondary100 flex justify-center border border-solid rounded-[5px] px-4 py-2"
                  }
                >
                  <PakaiSewaIconSvg />
                </div>
              </Tooltip>
            ) : status_item.pemakaian == "pakai_internal" ? (
              <Tooltip
                color="white"
                title={
                  <div
                    className={"p-2 bg-white rounded-[5px]"}
                    style={{
                      boxShadow: "2px 4px 20px 5px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <div className={"flex"}>
                      <PakaiInternalIconSvg size={16} />
                      <div className={"ml-2"}>
                        <p
                          className={"text-xs text-secondary100 font-semibold"}
                        >
                          Pakai Internal
                        </p>
                        <p className={"text-mono30 text-[10px] mt-1"}>
                          Barang ini sedang dipakai oleh internal.
                        </p>
                      </div>
                    </div>
                  </div>
                }
                placement="bottom"
              >
                <div
                  className={
                    "border-secondary100 flex justify-center border border-solid rounded-[5px] px-4 py-2"
                  }
                >
                  <PakaiInternalIconSvg />
                </div>
              </Tooltip>
            ) : status_item.pemakaian == "tesedia" ? (
              <Tooltip
                color="white"
                title={
                  <div
                    className={"p-2 bg-white rounded-[5px]"}
                    style={{
                      boxShadow: "2px 4px 20px 5px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <div className={"flex"}>
                      <TersediaIconSvg size={16} />
                      <div className={"ml-2"}>
                        <p
                          className={"text-xs text-secondary100 font-semibold"}
                        >
                          Tersedia
                        </p>
                        <p className={"text-mono30 text-[10px] mt-1"}>
                          Barang ini tersedia
                        </p>
                      </div>
                    </div>
                  </div>
                }
                placement="bottom"
              >
                <div
                  className={
                    "border-secondary100 flex justify-center border border-solid rounded-[5px] px-4 py-2"
                  }
                >
                  <TersediaIconSvg />
                </div>
              </Tooltip>
            ) : (
              <Tooltip
                color="white"
                title={
                  <div
                    className={"p-2 bg-white rounded-[5px]"}
                    style={{
                      boxShadow: "2px 4px 20px 5px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <div className={"flex"}>
                      <ReplacementIconSvg size={16} />
                      <div className={"ml-2"}>
                        <p
                          className={"text-xs text-secondary100 font-semibold"}
                        >
                          Replacement
                        </p>
                        <p className={"text-mono30 text-[10px] mt-1"}>
                          Barang ini sebagai pengganti
                        </p>
                      </div>
                    </div>
                  </div>
                }
                placement="bottom"
              >
                <div
                  className={
                    "border-secondary100 flex justify-center border border-solid rounded-[5px] px-4 py-2"
                  }
                >
                  <ReplacementIconSvg />
                </div>
              </Tooltip>
            )}
          </div>
          <div className={"ml-2.5"}>
            {status_item.kondisi_barang == "bagus" ? (
              <Tooltip
                color="white"
                title={
                  <div
                    className={"p-2 bg-white rounded-[5px]"}
                    style={{
                      boxShadow: "2px 4px 20px 5px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <div className={"flex"}>
                      <div
                        className={
                          "w-2 h-2 bg-secondary100 rounded-full self-center"
                        }
                      />
                      <div className={"ml-[14px]"}>
                        <p
                          className={"text-xs text-secondary100 font-semibold"}
                        >
                          Bagus
                        </p>
                      </div>
                    </div>
                    <p className={"text-mono30 text-[10px] mt-1 ml-[24px]"}>
                      Kondisi barang ini bagus.
                    </p>
                  </div>
                }
                placement="bottom"
              >
                <div
                  className={
                    "border-secondary100 flex justify-center border border-solid rounded-[5px] px-4 py-2"
                  }
                >
                  <div className={"w-2 h-2 bg-secondary100 rounded-full"} />
                </div>
              </Tooltip>
            ) : status_item.kondisi_barang == "abu" ? (
              <Tooltip
                color="white"
                title={
                  <div
                    className={"p-2 bg-white rounded-[5px]"}
                    style={{
                      boxShadow: "2px 4px 20px 5px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <div className={"flex"}>
                      <div
                        className={"w-2 h-2 bg-closed rounded-full self-center"}
                      />
                      <div className={"ml-[14px]"}>
                        <p className={"text-xs text-mono50 font-semibold"}>
                          Abu-abu
                        </p>
                      </div>
                    </div>
                    <p className={"text-mono30 text-[10px] mt-1 ml-[24px]"}>
                      Kondisi barang ini abu-abu.
                    </p>
                  </div>
                }
                placement="bottom"
              >
                <div
                  className={
                    "border-mono50 flex justify-center border border-solid rounded-[5px] px-4 py-2"
                  }
                >
                  <div className={"w-2 h-2 bg-closed rounded-full"} />
                </div>
              </Tooltip>
            ) : (
              <Tooltip
                color="white"
                title={
                  <div
                    className={"p-2 bg-white rounded-[5px]"}
                    style={{
                      boxShadow: "2px 4px 20px 5px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <div className={"flex"}>
                      <div
                        className={
                          "w-2 h-2 bg-warning rounded-full self-center"
                        }
                      />
                      <div className={"ml-[14px]"}>
                        <p className={"text-xs text-mono30 font-semibold"}>
                          Buruk
                        </p>
                      </div>
                    </div>
                    <p className={"text-mono30 text-[10px] mt-1 ml-[26px]"}>
                      Kondisi barang ini buruk.
                    </p>
                  </div>
                }
                placement="bottom"
              >
                <div
                  className={
                    "border-state1 flex justify-center border border-solid rounded-[5px] px-4 py-2"
                  }
                >
                  <div className={"w-2 h-2 bg-warning rounded-full"} />
                </div>
              </Tooltip>
            )}
          </div>
          <div className={"ml-2.5"}>
            {status_item.status_sewa == "periode" ? (
              <Tooltip
                color="white"
                title={
                  <div
                    className={"p-2 bg-white rounded-[5px]"}
                    style={{
                      boxShadow: "2px 4px 20px 5px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <div className={"flex"}>
                      <PeriodeIconSvg size={16} />
                      <div className={"ml-2"}>
                        <p className={"text-xs text-primary100 font-semibold"}>
                          Periode
                        </p>
                        <p className={"text-mono30 text-[10px] mt-1"}>
                          Barang ini masih dalam periode sewa
                        </p>
                      </div>
                    </div>
                  </div>
                }
                placement="bottom"
              >
                <div
                  className={
                    "border-primary100 flex justify-center border border-solid rounded-[5px] px-4 py-2"
                  }
                >
                  <PeriodeIconSvg />
                </div>
              </Tooltip>
            ) : status_item.status_sewa == "luar_periode" ? (
              <Tooltip
                color="white"
                title={
                  <div
                    className={"p-2 bg-white rounded-[5px]"}
                    style={{
                      boxShadow: "2px 4px 20px 5px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <div className={"flex"}>
                      <LuarPeriodeIconSvg size={16} />
                      <div className={"ml-2"}>
                        <p className={"text-xs text-state2 font-semibold"}>
                          Luar Periode
                        </p>
                        <p className={"text-mono30 text-[10px] mt-1"}>
                          Barang ini diluar periode waktu sewa.
                        </p>
                      </div>
                    </div>
                  </div>
                }
                placement="bottom"
              >
                <div
                  className={
                    "border-state2 flex justify-center border border-solid rounded-[5px] px-4 py-2"
                  }
                >
                  <LuarPeriodeIconSvg />
                </div>
              </Tooltip>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      ),
    },
  ];
  const dataListProduct = [
    {
      id: 1234,
      value: "Dekstop",
    },
    {
      id: 2344,
      value: "Laptop",
    },
    {
      id: 3234,
      value: "Tablet",
    },
    {
      id: 6234,
      value: "Macbook",
    },
    {
      id: 7234,
      value: "Iphone",
    },
  ];
  const [rowstate, setrowstate] = useState(0);
  const [showModalDelete, setShowModalDelete] = useState(false);

  useEffect(() => {
    setdisplayentiredata(dataDummy);
    setdisplaydata(dataDummy.data.data);
  }, []);
  return (
    <Layout
      st={st}
      sidemenu={sidemenu}
      tok={initProps}
      pathArr={pathArr}
      dataProfile={dataProfile}
    >
      <div
        className="w-full h-auto grid grid-cols-1 md:grid-cols-4"
        id="createAssetsWrapper"
      >
        <div className=" col-span-1 md:col-span-4 mb-8">
          <Sticky containerSelectorFocus="#createAgentsWrapper">
            <div className=" col-span-4 flex justify-between py-5 px-4 border-t border-b bg-white">
              <div className="flex items-center">
                <div className="flex">
                  <h3 className="font-semibold py-2 text-2xl mb-0 mr-6">
                    Macbook Pro M1
                  </h3>
                  <Switch
                    className={" h-[24px] self-center"}
                    checkedChildren={"ACTIVE"}
                    unCheckedChildren={"ARCHIVED"}
                  />
                </div>
              </div>
              <Modal
                title=""
                open={showModalDelete}
                width={680}
                footer={null}
                onCancel={() => setShowModalDelete(false)}
              >
                <div className={"p-6"}>
                  <div className={"flex justify-between"}>
                    <p className={"text-2xl text-mono30 font-semibold"}>
                      Peringatan!
                    </p>
                    <AlertCircleIconSvg />
                  </div>
                  <div className={"mt-6"}>
                    <p className={"text-sm text-mono30"}>
                      Apakah Anda yakin ingin menghapus produk{" "}
                      <span className={"font-semibold"}>
                        MacBook Pro 2022 M1
                      </span>
                      ? Sebanyak 2 produk sedang dalam status{" "}
                      <span className={"font-semibold"}>Active</span>
                    </p>
                  </div>
                  <div className={"mt-14 flex justify-between"}>
                    <div
                      className={
                        "border border-primary100 py-2 px-6 cursor-pointer rounded-[5px]"
                      }
                    >
                      <p className={"text-xs text-mono30"}>Batalkan</p>
                    </div>
                    <div
                      className={
                        "bg-state1 py-2 px-6 cursor-pointer rounded-[5px]"
                      }
                    >
                      <div className={"flex"}>
                        <DeleteTablerIconSvg />
                        <p className={"ml-2 text-white text-xs self-center"}>
                          Ya, saya yakin dan hapus produk
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
              <div className="flex space-x-2 items-center">
                <div
                  style={{ marginRight: `8px` }}
                  className={
                    "bg-open py-2 px-6 rounded-sm flex justify-center cursor-pointer"
                  }
                  // disabled={!isAllowedToAddNotes}
                  // onClick={() => {
                  //   setmodalnotes(true);
                  // }}
                >
                  <p className={"text-white text-xs"}>Ubah</p>
                </div>
                <div
                  onClick={() => setShowModalDelete(true)}
                  className={
                    "bg-buttondeleteproduct py-2 px-6 rounded-sm flex justify-center cursor-pointer"
                  }
                  // disabled={!isAllowedToDeleteItem}
                  // onClick={() => {
                  //   setmodaldelete(true);
                  // }}
                >
                  <p className={"text-white text-xs"}>Hapus</p>
                </div>
              </div>
            </div>
            <div className={"mt-12 flex pr-[21px] pl-[35px]"}>
              <div className={"w-3/12 pr-8 rounded-[5px]"}>
                <div
                  className={"bg-white py-6 px-4"}
                  style={{ boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.1)" }}
                >
                  <p className={"text-base font-semibold text-mono30"}>
                    List Produk
                  </p>
                  <div className={"mt-4"}>
                    <Input
                      style={{ width: `100%` }}
                      className={"rounded-[5px] px-4 py-2"}
                      // defaultValue={queryParams.name}
                      placeholder="Cari Produk di sini.."
                      // onChange={onChangeSearch}
                      allowClear
                      // onKeyPress={onKeyPressHandler}
                    ></Input>
                  </div>
                  <div className={"mt-6 flex"}>
                    <div className={"w-1/2 p-3"}>
                      <p className={"text-mono30 text-sm font-semibold"}>
                        Id Produk
                      </p>
                    </div>
                    <div className={"w-1/2 p-3"}>
                      <p className={"text-mono30 text-sm font-semibold"}>
                        Nama Produk
                      </p>
                    </div>
                  </div>

                  {dataListProduct.map((data) => (
                    <div className={"flex"}>
                      <div className={"w-1/2 p-3"}>
                        <p className={"text-mono30 text-sm font-regular"}>
                          {data.id}
                        </p>
                      </div>
                      <div className={"w-1/2 p-3"}>
                        <p className={"text-mono30 text-sm font-regular"}>
                          {data.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={"w-9/12"}>
                <div
                  className={"p-6 bg-white rounded-[5px]"}
                  style={{ boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.1)" }}
                >
                  <p className={"text-base text-mono30 font-semibold"}>
                    Detail Produk
                  </p>
                  <div className={"flex mt-6"}>
                    <div className={"w-1/2 flex flex-col"}>
                      <p className={"text-xs text-mono30 font-semibold"}>
                        Product ID
                      </p>
                      <p className={"mt-2 text-sm text-mono30"}>76253</p>
                    </div>
                    <div className={"w-1/2 flex flex-col"}>
                      <p className={"text-xs text-mono30 font-semibold"}>
                        Kategori Produk
                      </p>
                      <p className={"mt-2 text-sm text-mono30"}>
                        Desktop / Apple / MacBook
                      </p>
                    </div>
                  </div>
                  <div className={"flex mt-6"}>
                    <div className={"w-1/2 flex flex-col"}>
                      <p className={"text-xs text-mono30 font-semibold"}>
                        Jenis Produk
                      </p>
                      <p className={"mt-2 text-sm text-mono30"}>Jasa</p>
                    </div>
                    <div className={"w-1/2 flex flex-col"}>
                      <p className={"text-xs text-mono30 font-semibold"}>
                        Harga Produk
                      </p>
                      <p className={"mt-2 text-sm text-mono30"}>
                        Rp. 5.000.000 / bulan
                      </p>
                    </div>
                  </div>
                  <div className={"mt-6 flex flex-col"}>
                    <p className={"text-xs text-mono30 font-semibold"}>
                      Deskripsi
                    </p>
                    <p className={"mt-2 text-sm text-mono30"}>
                      Desktop merupakan jedis hardware yang digunakan untuk
                      bekerja di kantor
                    </p>
                  </div>
                </div>
                <div
                  className={"px-5 py-4 bg-white rounded-[5px] mt-8"}
                  style={{ boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.1)" }}
                >
                  <p className={"text-base text-mono30 font-semibold"}>
                    List Item
                  </p>
                  <div className="flex mt-6">
                    <div className=" w-11/12 mr-4 grid grid-cols-6">
                      <div className="col-span-6">
                        <Input
                          style={{ width: `100%`, marginRight: `0.5rem` }}
                          placeholder="MIG ID"
                          allowClear
                        ></Input>
                      </div>
                    </div>
                    <div className="w-1/12 flex bg-primary100 justify-center items-center rounded-[5px] px-6 py-2">
                      <SearchOutlined style={{ color: "#FFFFFF" }} />
                      <p className={"ml-2 text-white text-xs"}>Cari</p>
                    </div>
                  </div>
                </div>
                <Table
                  className="tableTypeTask"
                  pagination={{
                    simple: true,
                    current: queryParams.page,
                    pageSize: queryParams.rows,
                    total: displayentiredata.data.total,
                  }}
                  scroll={{ x: 200 }}
                  dataSource={displaydata}
                  columns={columnsTable}
                  // loading={praloading}
                  onRow={(record, rowIndex) => {
                    return {
                      onMouseOver: (event) => {
                        setrowstate(record.id);
                      },
                      onClick: (event) => {
                        rt.push(`/admin/product-catalog/detail/${record.id}`);
                      },
                    };
                  }}
                  rowClassName={(record, idx) => {
                    return record.id === rowstate ? `cursor-pointer` : ``;
                  }}
                  onChange={(pagination, _, sorter) => {
                    const sortTypePayload =
                      sorter.order === "ascend"
                        ? "asc"
                        : sorter.order === "descend"
                        ? "desc"
                        : undefined;

                    setQueryParams({
                      sort_type: sortTypePayload,
                      sort_by:
                        sortTypePayload === undefined
                          ? undefined
                          : sorter.field,
                      page: pagination.current,
                      rows: pagination.pageSize,
                    });
                  }}
                ></Table>
              </div>
            </div>
          </Sticky>
        </div>
      </div>
    </Layout>
  );
};

/**
 * Custom Array.map() function to map the data from GET `/getActivityInventoryLogs?id=:number`
 *  into timeline component's content.
 *
 * @param {*} doclogs
 * @param {*} idxlogs
 * @returns {object}
 */
const _activityLogMapFn = (logs, maindata) => {
  const result = [];

  logs.forEach((doclogs) => {
    const datenew = moment(doclogs.date).locale("id").format("LLL");
    var descnew = "";

    const desckondisiOld = doclogs.properties
      ? doclogs.properties.old
        ? doclogs.properties.old.status_condition === 1
          ? "Good"
          : doclogs.properties.old.status_condition === 2
          ? "Grey"
          : doclogs.properties.old.status_condition === 3
          ? "Bad"
          : null
        : null
      : null;

    const desckondisiBaru = doclogs.properties
      ? doclogs.properties.attributes
        ? doclogs.properties.attributes.status_condition === 1
          ? "Good"
          : doclogs.properties.attributes.status_condition === 2
          ? "Grey"
          : doclogs.properties.attributes.status_condition === 3
          ? "Bad"
          : null
        : null
      : null;

    const descusageOld = doclogs.properties
      ? doclogs.properties.old
        ? doclogs.properties.old.status_usage === 1
          ? "In Used"
          : doclogs.properties.old.status_usage === 2
          ? "In Stock"
          : doclogs.properties.old.status_usage === 3
          ? "Replacement"
          : null
        : null
      : null;

    const descusageBaru = doclogs.properties
      ? doclogs.properties.attributes
        ? doclogs.properties.attributes.status_usage === 1
          ? "In Used"
          : doclogs.properties.attributes.status_usage === 2
          ? "In Stock"
          : doclogs.properties.attributes.status_usage === 3
          ? "Replacement"
          : null
        : null
      : null;

    const desc1 = doclogs.description.split(" ");

    if (desc1[0] === "Created") {
      if (desc1[2] === "Relationship") {
        desc1[0] === "Created"
          ? (descnew =
              descnew +
              `Penambahan Relationship "${doclogs.properties.attributes.relationship}"`)
          : null;
        desc1[0] === "Deleted"
          ? (descnew =
              descnew +
              `Penghapusan Relationship "${doclogs.properties.old.relationship}"`)
          : null;
      } else if (desc1[1] === "Association") {
        descnew = descnew + `Association Baru: ${doclogs.properties}`;
      } else if (doclogs.properties.attributes?.list_parts) {
        descnew =
          descnew +
          `Inisialisasi Pembuatan Item Part "${maindata.inventory_parts
            .filter((docfil) =>
              doclogs.properties.attributes?.list_parts.includes(docfil.id)
            )
            .map((docmap) => docmap.inventory_name)
            .join(", ")}"`;
      } else {
        descnew =
          descnew +
          `Penambahan Item ke Induk "${doclogs.properties.attributes?.parent_id?.mig_id}"`;

        // descnew =
        //   descnew +
        //   `Pembuatan Item Baru bernama "${doclogs.properties.attributes?.inventory_name}"`;
      }
    }

    desc1[0] === "Notes" ? (descnew = descnew + `Penambahan Notes`) : null;

    if (desc1[0] === "Updated") {
      if ("attributes" in doclogs.properties && "old" in doclogs.properties) {
        const old = doclogs.properties.old;
        const attributes = doclogs.properties.attributes;
        for (const [key, _] of Object.entries(attributes)) {
          let descnew = "";

          if (key === "status_condition") {
            descnew =
              descnew +
              `Pengubahan status kondisi dari ${desckondisiOld} ke ${desckondisiBaru}`;
          } else if (key === "status_usage") {
            descnew =
              descnew +
              `Pengubahan status pemakaian dari ${descusageOld} ke ${descusageBaru}`;
          } else if (key === "inventory_name") {
            descnew =
              descnew +
              `Pengubahan Nama Item dari "${old.inventory_name}" ke "${attributes.inventory_name}"`;
          } else if (key === "serial_number") {
            descnew =
              descnew +
              `Pengubahan Serial Number Item dari "${old.serial_number}" ke "${attributes.serial_number}"`;
          } else if (key === "location") {
            descnew =
              descnew +
              `Pengubahan Location Item dari "${
                old.location_id === null ? "-" : old.location_name
              }" ke "${attributes.location_name}"`;
          } else if (key === "vendor_id") {
            descnew =
              descnew +
              `Pengubahan Vendor Item dari "${
                old.vendor_id === null ? "-" : old.vendor_name
              }" ke "${attributes.vendor_name}"`;
          } else if (key === "manufacturer_id") {
            descnew =
              descnew +
              `Pengubahan Manufacturer Item dari "${
                old.manufacturer_id === null ? "-" : old.manufacturer_name
              }" ke "${attributes.manufacturer_name}"`;
          } else if (key === "deskripsi") {
            descnew = descnew + `Pengubahan Deskripsi Item`;
          } else if (key === "owned_by") {
            descnew =
              descnew +
              `Pengubahan Owner Item dari "${
                old.owned_by === null ? "-" : old.owner_name
              }" ke "${attributes.owner_name}"`;
          } else if (
            key === "list_parts" &&
            attributes.list_parts?.length > old.list_parts?.length
          ) {
            const listpartsnew = attributes.list_parts?.filter(
              (docfil) =>
                old.list_parts?.map((part) => part.id).includes(docfil.id) ===
                false
            );
            descnew =
              descnew +
              `Penambahan Item "${listpartsnew
                ?.map((part) => part.mig_id)
                .join(", ")}" menjadi Item Part`;
          } else if (
            key === "list_parts" &&
            attributes.list_parts?.length < old.list_parts?.length
          ) {
            const listpartsold = old.list_parts?.filter(
              (docfil) =>
                attributes.list_parts
                  ?.map((part) => part.id)
                  .includes(docfil.id) === false
            );
            descnew =
              descnew +
              `Pengeluaran Item Part "${listpartsold
                ?.map((part) => part.mig_id)
                .join(", ")}"`;
          } else if (
            key === "list_parts" &&
            attributes.list_parts?.length === old.list_parts?.length
          ) {
            const listpartsnew = attributes.list_parts?.filter(
              (docfil) =>
                old.list_parts?.map((part) => part.id).includes(docfil.id) ===
                false
            );
            const listpartsold = old.list_parts?.filter(
              (docfil) =>
                attributes.list_parts
                  ?.map((part) => part.id)
                  .includes(docfil.id) === false
            );
            descnew =
              descnew +
              `Pergantian Item Part "${listpartsold
                ?.map((part) => part.mig_id)
                .join(", ")}" menjadi "${listpartsnew
                ?.map((part) => part.mig_id)
                .join(", ")}"`;
          } else {
            continue;
          }

          const producing = {
            ...doclogs,
            date: datenew,
            description: descnew,
          };
          result.push(producing);
        }

        return;
      }
    }

    if (desc1[0] === "Deleted") {
      if (desc1[2] === "Relationship") {
        desc1[0] === "Created"
          ? (descnew =
              descnew +
              `Penambahan Relationship "${doclogs.properties.attributes.relationship}"`)
          : null;
        desc1[0] === "Deleted"
          ? (descnew =
              descnew +
              `Penghapusan Relationship "${doclogs.properties.old.relationship}"`)
          : null;
      } else if (desc1[1] === "Association") {
        descnew = descnew + `Association Dihapus: ${doclogs.properties}`;
      } else {
        descnew =
          descnew +
          `Pengeluaran Item dari Induk "${doclogs.properties?.old?.parent_id?.mig_id}"`;
      }
    }

    result.push({
      ...doclogs,
      date: datenew,
      description: descnew,
    });
  });

  return result;
};

export async function getServerSideProps({ req, res, params }) {
  var initProps = {};
  const itemid = params.productCatalogId;
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
      sidemenu: "3",
      itemid,
    },
  };
}

export default ProductCatalogDetail;
