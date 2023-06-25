import {
  CloseCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Collapse,
  DatePicker,
  Input,
  Modal,
  Select,
  Spin,
  Switch,
  Table,
  Tooltip,
  notification,
} from "antd";
import parse from "html-react-parser";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useState } from "react";
import { useEffect } from "react";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  PROJECTS_GET,
  PROJECT_DELETE,
  PROJECT_GET,
  PROJECT_STATUSES_GET,
  PROJECT_TASKS_COUNT_GET,
  PROJECT_TASKS_DEADLINE_GET,
  PROJECT_TASKS_GET,
  PROJECT_TASK_ADD,
  PROJECT_TASK_DELETE,
  PROJECT_TASK_GET,
  PROJECT_TASK_UPDATE,
  PROJECT_UPDATE,
} from "lib/features";

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
import st from "../../../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../../../components/layout-dashboardNew";
import {
  createKeyPressHandler,
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../../lib/helper";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  TooltipChart,
} from "chart.js";
import httpcookie from "cookie";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const ProductCatalogDetail = ({
  dataProfile,
  sidemenu,
  initProps,
  productCatalogId,
}) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetProjects = hasPermission(PROJECTS_GET);
  const isAllowedToGetProject = hasPermission(PROJECT_GET);
  const isAllowedToUpdateProject = hasPermission(PROJECT_UPDATE);
  const isAllowedToDeleteProject = hasPermission(PROJECT_DELETE);

  const isAllowedToAddTask = hasPermission(PROJECT_TASK_ADD);
  const isAllowedToGetTask = hasPermission(PROJECT_TASK_GET);
  const isAllowedToUpdateTask = hasPermission(PROJECT_TASK_UPDATE);
  const isAllowedToGetTasks = hasPermission(PROJECT_TASKS_GET);
  const isAllowedToDeleteTask = hasPermission(PROJECT_TASK_DELETE);

  const isAllowedToGetStatuses = hasPermission(PROJECT_STATUSES_GET);

  const isAllowedToGetTaskStatusCount = hasPermission(PROJECT_TASKS_COUNT_GET);
  const isAllowedToGetTaskDeadlineCount = hasPermission(
    PROJECT_TASKS_DEADLINE_GET
  );

  const rt = useRouter();
  var activeTab = "overview";
  const { active } = rt.query;
  if (active) {
    activeTab = active;
  }
  var pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 2);
  pathArr[pathArr.length - 1] = "Detail Product";
  const [dataDetail, setDataDetail] = useState(null);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    asset_id: withDefault(NumberParam, undefined),
    name: withDefault(StringParam, undefined),
    sku: withDefault(StringParam, undefined),
  });
  const [praloading, setpraloading] = useState(true);
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
  const [searchingFilterProducts, setSearchingFilterProducts] = useState("");
  const [displaydata, setdisplaydata] = useState([]);
  const [displayentiredataproduk, setdisplayentiredataproduk] = useState({
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
  const [displaydataproduk, setdisplaydataproduk] = useState([]);
  const columnsTableProduk = [
    {
      title: "ID Produk",
      dataIndex: "id",
    },
    {
      title: "Nama Produk",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name) => (
        <div>
          <p className={"text-[14px] text-warning"}>{name}</p>
        </div>
      ),
    },
  ];
  const columnsTable = [
    {
      title: "Nama",
      dataIndex: ["name", "inventories_count"],
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, row) =>
        row["inventories_count"] == 0 ? (
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
      dataIndex: "inventories_count",
      sorter: (a, b) => a.inventories_count - b.inventories_count,
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

  // 3.5. Get Task List
  useEffect(() => {
    if (!isAllowedToGetTasks) {
      permissionWarningNotification("Mendapatkan", "Daftar Product");
      return;
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProductInventory?id=${productCatalogId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        console.log("data detail ", res2.data.model_inventory);
        if (res2.success) {
          setDataDetail(res2.data);
          //  setdisplaydata(res2.data.model_inventory)
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        // setLoadingTasks(false);
      });
  }, [isAllowedToGetTasks, productCatalogId]);

  useEffect(() => {
    if (!isAllowedToAddTask) {
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    setpraloading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProductInventories${payload}&keyword=${searchingFilterProducts}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdisplayentiredataproduk(res2);
        setdisplaydataproduk(res2.data.data);

        setpraloading(false);
      });
  }, [
    isAllowedToAddTask,
    searchingFilterProducts.length > 2,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.name,
    queryParams.asset_id,
    queryParams.sku,
  ]);

  const handleDeleteProduct = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteProductInventory?id=${productCatalogId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: response2.message,
            duration: 3,
          });
          setShowModalDelete(false);
          rt.push(`/admin/product-catalog/`);
        } else {
          notification.error({
            message: `Gagal menghapus Kategori. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus Kategori. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        // setLoadingDelete(false);
      });
  };

  const handleSwitchProduct = () => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProductInventory`;
    let method = "PUT";
    let payload = {
      id: productCatalogId,
      name: dataDetail.name,
      description: dataDetail.description,
      price: dataDetail.price,
      price_option_id: dataDetail.price_option_id,
      category_id: dataDetail.category_id,
      is_active: dataDetail.is_active == 1 ? 0 : 1,
    };
    fetch(url, {
      method: method,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response2) => {
        console.log("response add inventory ", response2);
        if (response2.success) {
          notification.success({
            message: "Update Product Success!",
            duration: 3,
          });
          setDataDetail({
            ...dataDetail,
            is_active: dataDetail.is_active == 1 ? false : true,
          });
        } else {
          notification.error({
            message: `Update Product Failed!`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Update Product Failed!`,
          duration: 3,
        });
        // setLoadingAdd(false);
      });
  };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
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
                    {dataDetail?.name}
                  </h3>
                  <Switch
                    checked={
                      dataDetail
                        ? dataDetail.is_active == 1
                          ? true
                          : false
                        : false
                    }
                    className={"self-center"}
                    onChange={() => handleSwitchProduct()}
                    // checkedChildren={"ACTIVE"}
                    // unCheckedChildren={"ARCHIVED"}
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
                        {dataDetail?.name}
                      </span>
                      ? sedang dalam status{" "}
                      <span className={"font-semibold"}>Active</span>
                    </p>
                  </div>
                  <div
                    className={"mt-14 flex justify-between cursor-pointer "}
                    onClick={() => setShowModalDelete(false)}
                  >
                    <div
                      className={
                        "border border-primary100 py-2 px-6 rounded-[5px]"
                      }
                    >
                      <p className={"text-xs text-mono30"}>Batalkan</p>
                    </div>
                    <div
                      onClick={() => handleDeleteProduct()}
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
                  onClick={() =>
                    rt.push(
                      `/admin/product-catalog/create?id=${productCatalogId}`
                    )
                  }
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
                      defaultValue={searchingFilterProducts}
                      onChange={(e) => {
                        setSearchingFilterProducts(e.target.value);
                      }}
                      allowClear
                      // onKeyPress={onKeyPressHandler}
                    ></Input>
                  </div>
                  {/* <div className={"mt-6 flex"}>
                    <div className={"w-1/2 p-3"}>
                      <p className={"text-mono30 text-sm font-semibold"}>
                        Produk ID
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
                  ))} */}
                  <Table
                    className="tableTypeTask mt-6"
                    pagination={{
                      showSizeChanger: true,
                      current: queryParams.page,
                      pageSize: queryParams.rows,
                      total: displayentiredataproduk.data.total,
                    }}
                    scroll={{ x: 200 }}
                    dataSource={displaydataproduk}
                    columns={columnsTableProduk}
                    loading={praloading}
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
                      <p className={"mt-2 text-sm text-mono30"}>
                        {dataDetail?.id}
                      </p>
                    </div>
                    <div className={"w-1/2 flex flex-col"}>
                      <p className={"text-xs text-mono30 font-semibold"}>
                        Kategori Produk
                      </p>
                      <p className={"mt-2 text-sm text-mono30"}>
                        {dataDetail?.category?.name}
                      </p>
                    </div>
                  </div>
                  <div className={"flex mt-6"}>
                    <div className={"w-1/2 flex flex-col"}>
                      <p className={"text-xs text-mono30 font-semibold"}>
                        Jenis Produk
                      </p>
                      <p className={"mt-2 text-sm text-mono30"}>Aset</p>
                    </div>
                    <div className={"w-1/2 flex flex-col"}>
                      <p className={"text-xs text-mono30 font-semibold"}>
                        Harga Produk
                      </p>
                      <p className={"mt-2 text-sm text-mono30"}>
                        Rp {dataDetail?.price}
                      </p>
                    </div>
                  </div>
                  <div className={"mt-6 flex flex-col"}>
                    <p className={"text-xs text-mono30 font-semibold"}>
                      Deskripsi
                    </p>
                    <p className={"mt-2 text-sm text-mono30"}>
                      {dataDetail
                        ? dataDetail.description
                          ? dataDetail.description
                          : "-"
                        : "-"}
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
                {console.log("isi data tabel ", displaydata)}
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
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const productCatalogId = params.productCatalogId;
  let initProps = {};
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
      method: "GET",
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
      sidemenu: "113",
      productCatalogId,
    },
  };
}

export default ProductCatalogDetail;
