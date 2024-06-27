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

import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import { createKeyPressHandler } from "../../../lib/helper";
import httpcookie from "cookie";

const ModelsIndex = ({ initProps, dataProfile, sidemenu }) => {
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
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
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
  ];

  //3.onChange
  const onChangeSearch = (e) => {
    if (e.target.value === "") {
      setQueryParams({
        name: undefined,
      });
    }

    setnamavalue(e.target.value);
  };
  const onChangeSkuSearch = (e) => {
    if (e.target.value === "") {
      setQueryParams({
        sku: undefined,
      });
    }
    setSkuSearchValue(e.target.value);
  };

  const onChangeAssetType = (id) => {
    setQueryParams({
      page: 1,
      asset_id: id,
    });
  };

  const onFinalClick = () => {
    setQueryParams({
      name: namavalue,
      sku: skuSearchValue,
      page: 1,
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
          <div className="font-semibold text-base w-auto">Models</div>
        </div>
        <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
          <Button size="large" type="primary" disabled={!isAllowedToAddModel}>
            <Link href={"/admin/models/create"}>Tambah</Link>
          </Button>
        </div>
      </div>
      <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
        <div className="md:col-span-5 col-span-1 flex flex-col py-3">
          {praloading ? null : (
            <div className="flex mb-8">
              <div className=" w-10/12 mr-1 grid grid-cols-6">
                <div className="col-span-2 mr-1">
                  <Input
                    style={{ width: `100%`, marginRight: `0.5rem` }}
                    defaultValue={queryParams.name}
                    placeholder="Cari Nama Model"
                    onChange={onChangeSearch}
                    allowClear
                    onKeyPress={onKeyPressHandler}
                  ></Input>
                </div>
                <div className="col-span-2 mr-1">
                  <Input
                    style={{ width: `100%`, marginRight: `0.5rem` }}
                    defaultValue={queryParams.sku}
                    placeholder="Cari SKU"
                    onChange={onChangeSkuSearch}
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
                    placeholder="Cari Asset Type"
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
              <div className="w-2/12">
                <Button
                  type="primary"
                  style={{ width: `100%` }}
                  onClick={onFinalClick}
                >
                  <SearchOutlined />
                </Button>
              </div>
            </div>
          )}
          <Table
            className="tableTypeTask"
            pagination={{
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
                  rt.push(`/admin/models/detail/${record.id}`);
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

export default ModelsIndex;
