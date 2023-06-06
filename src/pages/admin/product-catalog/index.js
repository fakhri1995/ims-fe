import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table, TreeSelect } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { ASSETS_GET, MODELS_GET, MODEL_ADD } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { createKeyPressHandler } from "../../../lib/helper";
import httpcookie from "cookie";

const ProductCatalogIndex = ({ initProps, dataProfile, sidemenu }) => {
  // 1.Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToSeeModels = hasPermission(MODELS_GET);
  const isAllowedToSeeAssets = hasPermission(ASSETS_GET);
  const isAllowedToAddModel = hasPermission(MODEL_ADD);

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    asset_id: withDefault(NumberParam, undefined),
    name: withDefault(StringParam, undefined),
    sku: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  //2.useState
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
  const [assetdata, setassetdata] = useState([]);
  const [namavalue, setnamavalue] = useState(null);
  const [skuSearchValue, setSkuSearchValue] = useState(null);
  const [namaasset, setnamaasset] = useState(null);
  const [rowstate, setrowstate] = useState(0);
  const [praloading, setpraloading] = useState(true);

  //3.Define
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
      dataIndex: "count",
      render: (count) =>
        count <= 0 ? (
          <div
            className={
              "bg-statusarchived py-1 px-4 rounded-[5px] flex justify-center"
            }
          >
            <p className={"text-state2 text-[10px] items-center"}>Archived</p>
          </div>
        ) : (
          <div
            className={
              "bg-statusactive py-1 px-4 rounded-[5px] flex justify-center"
            }
          >
            <p className={"text-primary100 text-[10px]"}>Active</p>
          </div>
        ),
    },
  ];

  //3.onChange
  const onChangeSearch = (e) => {
    if (e.target.value === "") {
      setQueryParams({
        name: undefined,
      });
    } else {
      setnamavalue(e.target.value);
    }
  };
  const onChangeSkuSearch = (e) => {
    if (e.target.value === "") {
      setQueryParams({
        sku: undefined,
      });
    } else {
      setSkuSearchValue(e.target.value);
    }
  };
  const onChangeAssetType = (id) => {
    setQueryParams({
      asset_id: id,
    });
  };
  const onFinalClick = () => {
    setQueryParams({
      name: namavalue,
      sku: skuSearchValue,
    });
  };

  //4.handler
  const { onKeyPressHandler } = createKeyPressHandler(onFinalClick, "Enter");

  useEffect(() => {
    if (!isAllowedToSeeAssets) {
      setpraloading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssets`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        var selectedAsset = {};
        const recursiveSearchAsset = (doc, key) => {
          for (var i = 0; i < doc.length; i++) {
            if (doc[i].id === key) {
              selectedAsset = doc[i];
            } else {
              if (doc[i].children) {
                recursiveSearchAsset(doc[i].children, key);
              }
            }
          }
        };

        recursiveSearchAsset(res2.data, Number(namaasset));
        setassetdata(res2.data);
        setpraloading(false);
      });
  }, [isAllowedToSeeAssets]);

  useEffect(() => {
    if (!isAllowedToSeeModels) {
      permissionWarningNotification("Mendapatkan", "Daftar Model");
    }
  }, [isAllowedToSeeModels]);

  useEffect(() => {
    if (!isAllowedToSeeModels) {
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    setpraloading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getModels${payload}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("datanya ", res2.data.data);
        setdisplayentiredata(res2);
        setdisplaydata(res2.data.data);
        setpraloading(false);
      });
  }, [
    isAllowedToSeeModels,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.name,
    queryParams.asset_id,
    queryParams.sku,
  ]);

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 border-gray-400 md:border-t md:border-b bg-white mb-5 p-4">
        <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
          <div className="font-semibold text-2xl w-auto text-mono30">
            Produk
          </div>
        </div>
      </div>
      <div
        className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-[5px] p-6"
        style={{ boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="md:col-span-5 col-span-1 flex flex-col">
          <div className={"flex justify-between mb-6"}>
            <div>
              <p className={"text-[18px] text-mono30 font-semibold"}>
                Daftar Produk
              </p>
            </div>
            <div className={"flex"}>
              <div className={"mr-6 flex text-[14px] text-mono30"}>
                <p className={"font-semibold mr-1"}>{displaydata.length}</p>
                <p>Produk Ditampilkan</p>
              </div>
              <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                <div className={"bg-open py-2 px-6"}>
                  <Link href={"/admin/models/create"}>
                    <p className={"text-white text-xs"}>Tambah Produk</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {praloading ? null : (
            <div className="flex mb-8">
              <div className=" w-11/12 mr-1 grid grid-cols-6">
                <div className="col-span-4 mr-1">
                  <Input
                    style={{ width: `100%`, marginRight: `0.5rem` }}
                    defaultValue={queryParams.name}
                    placeholder="Cari produk dengan kata kunci"
                    onChange={onChangeSearch}
                    allowClear
                    onKeyPress={onKeyPressHandler}
                  ></Input>
                </div>
                <div className="col-span-2 mr-1">
                  <TreeSelect
                    allowClear
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    defaultValue={namaasset || queryParams.asset_id}
                    treeData={assetdata}
                    disabled={!isAllowedToSeeAssets}
                    filter
                    placeholder="Status"
                    treeDefaultExpandAll
                    style={{ width: `100%`, marginRight: `0.5rem` }}
                    showSearch
                    treeNodeFilterProp="title"
                    filterTreeNode={(search, item) => {
                      /** `showSearch`, `filterTreeNode`, and `treeNodeFilterProp` */
                      /** @see https://stackoverflow.com/questions/58499570/search-ant-design-tree-select-by-title */
                      return (
                        item.title
                          .toLowerCase()
                          .indexOf(search.toLowerCase()) >= 0
                      );
                    }}
                    onChange={(value, label, extra) => {
                      if (typeof value === "undefined") {
                        onChangeAssetType();
                        setnamaasset(null);
                      } else {
                        onChangeAssetType(
                          extra.allCheckedNodes[0].node.props.id
                        );
                        setnamaasset(extra.allCheckedNodes[0].node.props.title);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="w-1/12 flex bg-primary100 justify-center items-center rounded-[5px] px-6 py-2">
                {/* <Button
                  type="primary"
                  style={{ width: `100%` }}
                  onClick={onFinalClick}
                >
                  <SearchOutlined />
                  <p>Cari</p>
                </Button> */}
                <SearchOutlined style={{ color: "#FFFFFF" }} />
                <p className={"ml-2 text-white text-xs"}>Cari</p>
              </div>
            </div>
          )}
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
                  sortTypePayload === undefined ? undefined : sorter.field,
                page: pagination.current,
                rows: pagination.pageSize,
              });
            }}
          ></Table>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
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
      sidemenu: "82",
    },
  };
}

export default ProductCatalogIndex;
