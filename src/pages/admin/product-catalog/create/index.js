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
  Form,
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
import QueryString from "qs";
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
  InfoCircleIconSvg,
  LuarPeriodeIconSvg,
  PakaiInternalIconSvg,
  PakaiSewaIconSvg,
  PeriodeIconSvg,
  PlusIconSvg,
  ReplacementIconSvg,
  TersediaIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard2";
import st from "../../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

const ProductCreate = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */
  const rt = useRouter();
  var activeTab = "overview";
  const { active } = rt.query;
  const { id: productId, prevpath } = rt.query;
  if (active) {
    activeTab = active;
  }
  var pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 2);
  pathArr[pathArr.length - 1] = "Tambah Produk";
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    asset_id: withDefault(NumberParam, undefined),
    name: withDefault(StringParam, undefined),
    sku: withDefault(StringParam, undefined),
  });
  const [instanceForm] = Form.useForm();
  const [switchValue, setSwitchValue] = useState(false);
  const [dataCategories, setDataCategories] = useState([]);
  const [dataModels, setDataModels] = useState([]);
  const [categoryChoose, setCategoryChoose] = useState(null);
  const [productName, setProductName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState("0");
  const [perPrice, setPerPrice] = useState(null);
  const [relationItem, setRelationItem] = useState(false);
  const [relation, setRelation] = useState(null);
  const [modelChoose, setModelChoose] = useState(null);
  const [productIdValue, setProductIdValue] = useState(null);
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
  const [rowstate, setrowstate] = useState(0);
  const [modalTambahProduk, setModalTambahProduk] = useState(false);
  const [modelId, setModelId] = useState(null);
  const [countItem, setCountItem] = useState("");

  const changeSwitchValue = () => {
    setSwitchValue(!switchValue);
  };

  const changeModel = (value) => {
    setModelId(value);
    let dataModel = dataModels.filter((x) => x.id === value);
    setCountItem(dataModel[0].count);
  };

  useEffect(() => {
    console.log("product id bro ", productId);
    if (productId) {
      setProductIdValue(productId);
      getDetailProduct();
    } else {
      generateProductId();
    }
    getCategories();
    getModels();
  }, []);

  const generateProductId = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProductInventoryId`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("generate id ", res2.data);
        if (res2.success) {
          setProductIdValue(res2.data);
          //  setDataDetail(res2.data)
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
  };
  const getDetailProduct = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProductInventory?id=${productId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        console.log("data detail ", res2.data);
        if (res2.success) {
          setProductName(res2.data.name);
          instanceForm.setFieldsValue({
            productName: res2.data.name,
          });
          setCategoryChoose(res2.data.category_id);
          setDescription(res2.data.description);
          setPrice(res2.data.price);
          setPerPrice(res2.data.price_option);
          if (res2.data.model_id != null) {
            setSwitchValue(true);
            setModelId(res2.data.model_id);
            setCountItem(res2.data.model_inventory.inventories_count);
          }
          //  setDataDetail(res2.data)
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
  };

  const getCategories = () => {
    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCategories${payload}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("datanya apis ", res2);
        console.log("datanya categories ", res2.data);
        setDataCategories(res2.data);
      });
  };

  const getModels = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getModels`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setDataModels(res2.data.data);
      });
  };

  const onChangeNameProduct = (e) => {
    console.log("value ", e.target.value);
    setProductName(e.target.value);
  };

  const handleCreateProduct = () => {
    setModalTambahProduk(true);
  };

  const handleCreatePostProduct = () => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/addProductInventory`;
    let method = "";
    if (productId) {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProductInventory`;
      method = "PUT";
    } else {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/addProductInventory`;
      method = "POST";
    }
    let payload = "";
    if (switchValue) {
      payload = {
        id: productIdValue,
        name: productName,
        description: description,
        price: Number(price),
        price_option_id: perPrice,
        category_id: categoryChoose,
        is_active: 1,
        model_id: modelId,
      };
    } else {
      payload = {
        id: productIdValue,
        name: productName,
        description: description,
        price: Number(price),
        price_option_id: perPrice,
        category_id: categoryChoose,
        is_active: 1,
      };
    }

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
            message: productId
              ? "Update Product Success!"
              : "Add Product Success!",
            duration: 3,
          });
          // handleAddUpdateCategory(response2)
          setTimeout(() => {
            setModalTambahProduk(false);
            if (productId) {
              rt.push(`/admin/product-catalog/detail/${productId}`);
            } else {
              rt.push(`/admin/product-catalog/detail/${response2.id}`);
            }
          }, 500);
        } else {
          notification.error({
            message: productId
              ? `Update Product Failed!`
              : `Add Product Failed!`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: productId
            ? `Update Category Failed!`
            : `Add Category Failed!`,
          duration: 3,
        });
        // setLoadingAdd(false);
      });
  };

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
                    Form Tambah Produk
                  </h3>
                </div>
              </div>
              <Modal
                title=""
                open={modalTambahProduk}
                width={680}
                footer={null}
                onCancel={() => setModalTambahProduk(false)}
              >
                <div className={"p-6"}>
                  <div className={"flex justify-between"}>
                    <p className={"text-2xl text-mono30 font-semibold"}>
                      Peringatan!
                    </p>
                    {/* <AlertCircleIconSvg /> */}
                  </div>
                  <div className={"mt-6"}>
                    <p className={"text-sm text-mono30"}>
                      Apakah Anda yakin ingin menambah data produk ?
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
                      <div
                        className={"flex cursor-pointer"}
                        onClick={() => handleCreatePostProduct()}
                      >
                        <PlusIconSvg size={16} color={"white"} />
                        <p className={"ml-2 text-white text-xs self-center"}>
                          Ya, saya yakin menambah data produk
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
              <div className="flex space-x-2 items-center">
                <div
                  style={{ marginRight: `8px` }}
                  onClick={() => {
                    rt.push(`/admin/product-catalog`);
                  }}
                  className={
                    "bg-white py-2 px-6 rounded-sm flex justify-center border border-mono80 cursor-pointer"
                  }
                  // disabled={!isAllowedToAddNotes}
                  // onClick={() => {
                  //   setmodalnotes(true);
                  // }}
                >
                  <p className={"text-mono30 text-xs"}>Batal</p>
                </div>
                <div
                  className={
                    "bg-open py-2 px-6 rounded-sm flex justify-center cursor-pointer"
                  }
                  // disabled={!isAllowedToDeleteItem}
                  onClick={instanceForm.submit}
                >
                  <p className={"text-white text-xs"}>Tambah</p>
                </div>
              </div>
            </div>
            <Form
              layout="vertical"
              className="createAgentsForm"
              onFinish={handleCreateProduct}
              form={instanceForm}
            >
              <div
                className={"bg-white py-6 px-4 mt-12"}
                style={{ boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.1)" }}
              >
                <div className={"flex space-x-6"}>
                  <div className={"w-1/2"}>
                    <div className={"flex"}>
                      <p className={"mr-2 text-mono30 text-xs"}>ID Produk</p>
                      <InfoCircleIconSvg color={"#808080"} size={16} />
                    </div>
                    <Input
                      value={productIdValue}
                      disabled={true}
                      className={"mt-4 h-[52px]"}
                      placeholder="Masukkan ID Produk"
                    />
                  </div>
                  <div className={"w-1/2"}>
                    <p className={"text-mono30 text-xs mb-4"}>
                      Kategori Produk
                    </p>
                    <div className={"example"}>
                      <Select
                        className={"w-full"}
                        showSearch
                        value={categoryChoose}
                        placeholder="Pilih Kategori"
                        optionFilterProp="children"
                        onChange={(value) => {
                          console.log("on change kategori bos ", value);
                          setCategoryChoose(value);
                        }}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      >
                        {dataCategories?.map((kategori) => (
                          <Select.Option key={kategori.id} value={kategori.id}>
                            {kategori.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className={"mt-6"}>
                  {/* <p className={"text-mono30 text-xs"}>Nama Produk *</p> */}
                  <Form.Item
                    className={"text-mono30 text-xs"}
                    label={<p className={"text-mono30 text-xs"}>Nama Produk</p>}
                    required
                    initialValue={productName}
                    name="productName"
                    rules={[
                      {
                        required: true,
                        message: "Nama Produk wajib diisi",
                      },
                    ]}
                  >
                    <Input
                      className={"mt-4 h-[52px]"}
                      value={productName}
                      onChange={onChangeNameProduct}
                      placeholder="Masukkan Nama Produk"
                    />
                  </Form.Item>
                </div>
                <div className={"flex mt-6 space-x-6"}>
                  <div className={"w-1/2"}>
                    <p className={"mr-2 text-mono30 text-xs"}>Deskripsi</p>
                    <Input.TextArea
                      className={"mt-4 h-[52px]"}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Masukkan Deskripsi Produk"
                    />
                  </div>
                  <div className={"w-1/2 flex"}>
                    <div className={"w-2/3"}>
                      <p className={"text-mono30 text-xs"}>Harga</p>
                      <Input
                        prefix={"Rp "}
                        onChange={(e) => setPrice(e.target.value)}
                        className={"mt-4 h-[52px]"}
                        value={price}
                        placeholder="Masukkan Harga Produk"
                      />
                    </div>
                    <div className={"w-1/3 ml-4 example"}>
                      <p className={"text-mono30 text-xs"}></p>
                      <Select
                        size="large"
                        className={"w-full mt-8"}
                        value={perPrice}
                        onChange={(value) => setPerPrice(value)}
                        options={[
                          {
                            value: "Jam",
                            label: "Per Jam",
                          },
                          {
                            value: "Hari",
                            label: "Per Hari",
                          },
                          {
                            value: "Bulan",
                            label: "Per Bulan",
                          },
                          {
                            value: "Tahun",
                            label: "Per Tahun",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className={"mt-6 flex"}>
                  <Switch checked={switchValue} onChange={changeSwitchValue} />
                  <p className={"ml-4 text-mono30 text-xs self-center"}>
                    Hubungkan produk dengan item
                  </p>
                </div>
                {switchValue && (
                  <div>
                    <div className={"flex mt-6 space-x-6"}>
                      <div className={"w-1/2"}>
                        <p className={"mr-2 text-mono30 text-xs"}>
                          Jenis Relasi
                        </p>
                        <Select
                          size={"large"}
                          value={"Aset"}
                          onChange={(value) => {
                            console.log("on change relasi bos ", value);
                            setRelation(value);
                          }}
                          className={"w-full mt-4"}
                          options={[
                            {
                              value: "Aset",
                              label: "Aset",
                            },
                          ]}
                        />
                      </div>
                      <div className={"w-1/2"}>
                        <p className={"text-mono30 text-xs"}>Pilih Model</p>
                        <Select
                          size="large"
                          value={modelId}
                          onChange={(value) => changeModel(value)}
                          className={"w-full mt-4"}
                          // options={[
                          //   {
                          //     value: "PC",
                          //     label: "PC",
                          //   },
                          //   {
                          //     value: "Laptop",
                          //     label: "Laptop",
                          //   },
                          // ]}
                        >
                          {dataModels?.map((model) => (
                            <Select.Option key={model.id} value={model.id}>
                              {model.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <div className={"mt-6 w-1/2 pr-4"}>
                      <div className={"flex"}>
                        <p className={"mr-2 text-mono30 text-xs"}>
                          Jumlah Item
                        </p>
                        <InfoCircleIconSvg color={"#808080"} size={16} />
                      </div>
                      <Input
                        className={"mt-4 h-[52px]"}
                        defaultValue={countItem}
                        value={countItem}
                        disabled
                      />
                    </div>
                  </div>
                )}
              </div>
            </Form>
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

export async function getServerSideProps({ req, res, params }) {
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
      sidemenu: "3",
    },
  };
}

export default ProductCreate;
