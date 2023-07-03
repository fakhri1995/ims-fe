import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Select,
  Spin,
  Table,
  TableColumnsType,
  Tooltip,
  TreeSelect,
  notification,
} from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  ASSETS_GET,
  INVENTORIES_GET,
  INVENTORY_ADD,
  INVENTORY_GET,
  MODELS_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { ClockIconSvg, ClockXIconSvg } from "../../components/icon";
import Layout from "../../components/layout-dashboard2";
import st from "../../components/layout-dashboard.module.css";
import { createKeyPressHandler } from "../../lib/helper";
import httpcookie from "cookie";

const ItemsIndex = ({ dataProfile, sidemenu, initProps }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToShowInventoryList = hasPermission(INVENTORIES_GET); // showing the table data and as a dependency for another search-related permissions
  const isAllowedToSearchLocation = hasPermission(INVENTORY_GET);
  const isAllowedToSearchAssetType = hasPermission(ASSETS_GET);
  const isAllowedToSearchModel = hasPermission(MODELS_GET); // either GET /getModels or GET /getFilterModels
  const isAllowedToAddInventory = hasPermission(INVENTORY_ADD);

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    asset_id: withDefault(NumberParam, undefined),
    model_id: withDefault(NumberParam, undefined),
    location_id: withDefault(NumberParam, undefined),
    mig_id: withDefault(StringParam, undefined),
    status_condition: withDefault(NumberParam, /** 1-3 */ undefined),
    status_usage: withDefault(NumberParam, /** 1-3 */ undefined),
    sort_by: withDefault(
      StringParam,
      /** @type {"name"|"status_usage"|"status_condition"|"mig_id"} */ undefined
    ),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });

  const [dataRefresher, setDataRefresher] = useState(1);

  // 1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  //2.useState
  const [displaydata, setdisplaydata] = useState([]);
  const [invrelations, setinvrelations] = useState({
    models: [],
    assets: [],
    manufacturers: [],
    status_condition: [],
    status_usage: [],
    companies: [],
  });
  const [assetdata, setassetdata] = useState([]);
  const [modelvalue, setmodelvalue] = useState(
    null
    // model_id1 === "" ? null : Number(model_id1)
  );
  const [namaasset, setnamaasset] = useState(() => queryParams.asset_id);
  const [rowstate, setrowstate] = useState(0);
  const [loadingTable, setLoadingTable] = useState(true);
  const [praloading, setpraloading] = useState(true);
  const [praloading2, setpraloading2] = useState(true);
  const [modelfilter, setmodelfilter] = useState([]);
  const [fetchingmodel, setfetchingmodel] = useState(false);

  const [selectedModelName, setSelectedModelName] = useState(undefined);

  const [totalItems, setTotalItems] = useState(0);

  //3.Define
  /** @type {TableColumnsType<{ mig_id: string | null }>} */
  const columnsTable = [
    {
      title: "MIG ID",
      dataIndex: "mig_id",
      render: (_, _record, index) => {
        /** If mig_id === null then replace it with "-" */
        return (
          <React.Fragment key={index}>{_record.mig_id || "-"}</React.Fragment>
        );
      },
    },
    {
      title: "Asset Type",
      dataIndex: "asset_name",
      render: (text, record, index) => {
        return {
          children: (
            <div key={index} className="flex items-center">
              <p className="mb-0 mr-1">
                {record.model_inventory.asset.asset_name}
              </p>
              {record.model_inventory.asset.deleted_at !== null ? (
                <Tooltip
                  placement="right"
                  title="Asset Type telah dihapus, segera lakukan pengubahan Asset Type!"
                >
                  <ExclamationCircleOutlined
                    style={{ color: `red` }}
                  ></ExclamationCircleOutlined>
                </Tooltip>
              ) : null}
            </div>
          ),
        };
      },
    },
    {
      title: "Model",
      dataIndex: "model_name",
      render: (text, record, index) => {
        return {
          children: (
            <div key={index} className="flex items-center">
              <p className="mb-0 mr-1">{record.model_inventory.name}</p>
              {record.model_inventory.deleted_at !== null ? (
                <Tooltip
                  placement="right"
                  title="Model telah dihapus, segera lakukan pengubahan Model!"
                >
                  <ExclamationCircleOutlined
                    style={{ color: `red` }}
                  ></ExclamationCircleOutlined>
                </Tooltip>
              ) : null}
            </div>
          ),
        };
      },
    },
    {
      title: "Lokasi",
      dataIndex: "location",
      render: (text, record, index) => {
        return {
          children: (
            <div key={index} className="flex items-center">
              <p className="mb-0 mr-1">
                {record.location_inventory.id === 0
                  ? "-"
                  : record.location_inventory.name}
              </p>
            </div>
          ),
        };
      },
    },
    {
      title: "Kondisi",
      dataIndex: "status_condition",
      render: (text, record, index) => {
        return {
          children: (
            <div key={index} className="w-full flex">
              {record.status_condition.id === 1 && (
                <div className="p-1 flex w-full items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <p className="mb-0">Good</p>
                </div>
              )}
              {record.status_condition.id === 2 && (
                <div className="p-1 flex w-full items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                  <p className="mb-0">Grey</p>
                </div>
              )}
              {record.status_condition.id === 3 && (
                <div className="p-1 flex w-full items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <p className="mb-0">Bad</p>
                </div>
              )}
            </div>
          ),
        };
      },
      sorter: isAllowedToShowInventoryList
        ? (a, b) => a.status_condition.id - b.status_condition.id
        : false,
    },
    {
      title: "Status Pemakaian",
      dataIndex: "status_usage",
      align: "center",
      render: (text, record, index) => {
        return {
          children: (
            <div key={index} className="justify-center flex">
              {record.status_usage?.id === 1 && (
                <div className="rounded-md h-auto px-4 text-center py-1 bg-blue-100 border border-blue-200 text-blue-600 flex space-x-2 items-center whitespace-nowrap">
                  <p>In Used: Sewa</p>
                  {record.status_rent?.id === 1 ? (
                    <ClockXIconSvg size={20} color={"#BF4A40"} />
                  ) : (
                    <ClockIconSvg size={20} color={"#35763B"} />
                  )}
                </div>
              )}
              {record.status_usage?.id === 2 && (
                <div className="rounded-md h-auto px-4 text-center py-1 bg-green-100 border border-green-200 text-green-600">
                  In Stock
                </div>
              )}
              {record.status_usage?.id === 3 && (
                <div className="rounded-md h-auto px-4 text-center py-1 bg-red-100 border border-red-200 text-red-600">
                  Replacement
                </div>
              )}
              {record.status_usage?.id === 4 && (
                <div className="rounded-md h-auto px-4 text-center py-1 bg-blue-100 border border-blue-200 text-blue-600">
                  In Used: Internal
                </div>
              )}
            </div>
          ),
        };
      },
      sorter: isAllowedToShowInventoryList
        ? (a, b) => a.status_usage.id - b.status_usage.id
        : false,
    },
  ];

  //3.onChange
  //search mig id
  const onChangeMigid = (e) => {
    setQueryParams({
      mig_id: e.target.value === "" ? undefined : e.target.value,
    });
  };
  //search location
  const onChangeLocation = (id) => {
    setQueryParams({
      location_id: id === undefined ? undefined : id,
    });
  };
  //search asset type
  const onChangeAssetType = (id) => {
    const isIdUndefined = id === undefined;
    setQueryParams({
      asset_id: isIdUndefined ? undefined : id,
      model_id: isIdUndefined ? undefined : queryParams.model_id,
    });

    if (isIdUndefined) {
      setmodelfilter([]);
      setSelectedModelName(undefined);

      return;
    }

    /** Only update the models whenever the asset_id is new */
    if (id !== queryParams.asset_id) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getModels?rows=100&asset_id=${id}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          res2.data.length === 0
            ? setmodelfilter([])
            : setmodelfilter(res2.data.data);
        });
    }
  };
  //search model
  const onChangeModel = (idmodel) => {
    setQueryParams({
      model_id: idmodel,
    });

    if (idmodel === undefined) {
      setSelectedModelName(undefined);
      return;
    }

    if (modelfilter.length > 0) {
      const model = modelfilter.find((model) => model.id === idmodel);
      setSelectedModelName(model.name);
    }
  };
  //search kondisi
  const onChangeKondisi = (idkondisi) => {
    setQueryParams({
      status_condition: idkondisi,
    });
  };
  //search Pemakaian
  const onChangePemakaian = (idpemakaian) => {
    setQueryParams({
      status_usage: idpemakaian,
    });
  };
  const onFinalClick = () => {
    setDataRefresher((prev) => prev + 1);
  };

  //4.handler
  const { onKeyPressHandler } = createKeyPressHandler(onFinalClick, "Enter");

  //5.useEffect
  /** Data fetching for Items table's records */
  useEffect(() => {
    if (!isAllowedToShowInventoryList) {
      permissionWarningNotification("Mendapatkan", "Daftar Inventory");
      return;
    }

    /**
     * Transform URL query paramter yang dynamic berdasarkan input User
     *  menjadi payload untuk ke endpoint `/getInventories`.
     *
     * @example
     * ```
     * ?page=1&rows=10&asset_id=2
     * ```
     */
    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      setLoadingTable(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getInventories${payload}`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setdisplaydata(res2.data.data);
          setTotalItems(res2.data.total);
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        })
        .finally(() => {
          setLoadingTable(false);
        });
    };

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [
    dataRefresher,
    queryParams.mig_id,
    queryParams.asset_id,
    queryParams.model_id,
    queryParams.location_id,
    queryParams.status_condition,
    queryParams.status_usage,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    isAllowedToShowInventoryList,
  ]);

  /** Data fetching for "Cari Lokasi" input field  */
  useEffect(() => {
    if (!isAllowedToShowInventoryList || !isAllowedToSearchLocation) {
      setpraloading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getInventoryRelations`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setinvrelations(res2.data);
        setpraloading(false);
      });
  }, [isAllowedToShowInventoryList, isAllowedToSearchLocation]);

  /** Data fetching for "Cari Model" input field */
  useEffect(() => {
    if (!isAllowedToShowInventoryList || !isAllowedToSearchModel) {
      setpraloading2(false);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getModels?rows=50&asset_id=${
        queryParams.asset_id || ""
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
        res2.data.length === 0
          ? setmodelfilter([])
          : setmodelfilter(res2.data.data);
        setpraloading2(false);
      });
  }, [isAllowedToShowInventoryList, isAllowedToSearchModel]);

  /** Data fetching for "Cari Asset Type" input field */
  useEffect(() => {
    if (!isAllowedToShowInventoryList || !isAllowedToSearchAssetType) {
      setpraloading2(false);
      return;
    }

    setpraloading2(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssets`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        /** NOTE: Variable ini jangan dihapus yaaa.... */
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
        setpraloading2(false);
      });
  }, [isAllowedToShowInventoryList, isAllowedToSearchAssetType]);

  /** Always clear "Cari Model" input field when User changes "Cari Asset Type" */
  useEffect(() => {
    setSelectedModelName(undefined);
    setQueryParams({
      model_id: queryParams.model_id,
    });
  }, [queryParams.asset_id]);

  return (
    <Layout
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 border-gray-400 md:border-t md:border-b bg-white mb-5 p-4">
        <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
          <div className="font-bold text-2xl w-auto">Items</div>
        </div>
        <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
          <Button
            size="large"
            type="primary"
            disabled={!isAllowedToAddInventory}
          >
            <Link href={"/items/create"}>Tambah</Link>
          </Button>
        </div>
      </div>
      <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
        <div className="md:col-span-5 col-span-1 flex flex-col py-3">
          {praloading ? null : (
            <div className="flex mb-8">
              <div className="w-full grid grid-cols-12">
                <div className="col-span-2 mr-1">
                  <Input
                    style={{ width: `100%`, marginRight: `0.5rem` }}
                    defaultValue={queryParams.mig_id}
                    placeholder="Cari MIG ID"
                    onChange={onChangeMigid}
                    allowClear
                    onKeyPress={onKeyPressHandler}
                    disabled={!isAllowedToShowInventoryList}
                  ></Input>
                </div>

                <div className="col-span-2 mr-1">
                  <TreeSelect
                    allowClear
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    defaultValue={queryParams.asset_id}
                    // treeData={assetdata}
                    treeData={
                      isAllowedToShowInventoryList && isAllowedToSearchAssetType
                        ? assetdata
                        : []
                    }
                    disabled={
                      !isAllowedToShowInventoryList ||
                      !isAllowedToSearchAssetType
                    }
                    placeholder="Cari Asset Type"
                    treeDefaultExpandAll
                    style={{ width: `100%` }}
                    onChange={(value, _, extra) => {
                      if (typeof value === "undefined") {
                        onChangeAssetType();
                      } else {
                        onChangeAssetType(
                          extra.allCheckedNodes[0].node.props.id
                        );
                        setnamaasset(extra.allCheckedNodes[0].node.props.title);
                        modelvalue !== null ? setmodelvalue(null) : null;
                      }
                    }}
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
                  />
                </div>

                {praloading2 ? (
                  <>
                    <Spin />
                  </>
                ) : (
                  <div className="col-span-2 mr-1 flex flex-col">
                    <Select
                      value={selectedModelName}
                      defaultValue={queryParams.model_id}
                      showSearch
                      optionFilterProp="children"
                      notFoundContent={
                        fetchingmodel ? <Spin size="small" /> : null
                      }
                      onSearch={(value) => {
                        setfetchingmodel(true);
                        fetch(
                          `${
                            process.env.NEXT_PUBLIC_BACKEND_URL
                          }/getFilterModels?name=${value !== "" ? value : ""}`,
                          {
                            method: `GET`,
                            headers: {
                              Authorization: JSON.parse(initProps),
                            },
                          }
                        )
                          .then((res) => res.json())
                          .then((res2) => {
                            setmodelfilter(res2.data);
                            setfetchingmodel(false);
                          });
                      }}
                      filterOption={(input, opt) =>
                        opt.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      disabled={
                        modelfilter.length === 0 ||
                        !isAllowedToShowInventoryList
                      }
                      placeholder="Cari Model"
                      style={{ width: `100%` }}
                      allowClear
                      onChange={(value) => {
                        if (typeof value === "undefined") {
                          onChangeModel();
                        } else {
                          onChangeModel(value);
                        }
                      }}
                    >
                      {modelfilter.map((docmodels, idxmodels) => {
                        return (
                          <Select.Option key={idxmodels} value={docmodels.id}>
                            {docmodels.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    {modelfilter.length === 0 && (
                      <p className="mb-0 text-red-500 text-sm">Model kosong</p>
                    )}
                  </div>
                )}
                <div className="col-span-2 mr-1">
                  <TreeSelect
                    allowClear
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    treeData={
                      isAllowedToShowInventoryList && isAllowedToSearchLocation
                        ? [invrelations.tree_companies]
                        : []
                    }
                    defaultValue={queryParams.location_id}
                    disabled={!isAllowedToShowInventoryList}
                    placeholder="Cari Lokasi"
                    treeDefaultExpandAll
                    style={{ width: `100%` }}
                    onChange={(value, label, extra) => {
                      if (typeof value === "undefined") {
                        onChangeLocation();
                      } else {
                        onChangeLocation(
                          extra.allCheckedNodes[0].node.props.id
                        );
                        setnamaasset(extra.allCheckedNodes[0].node.props.title);
                      }
                    }}
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
                  />
                </div>
                <div className="col-span-1 mr-1">
                  <Select
                    placeholder="Kondisi"
                    defaultValue={queryParams.status_condition}
                    disabled={!isAllowedToShowInventoryList}
                    style={{ width: `100%` }}
                    allowClear
                    onChange={(value) => {
                      if (typeof value === "undefined") {
                        onChangeKondisi();
                      } else {
                        onChangeKondisi(value);
                      }
                    }}
                  >
                    {invrelations.status_condition.map((docconds, idxconds) => {
                      return (
                        <Select.Option key={idxconds} value={docconds.id}>
                          {docconds.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
                <div className="col-span-2 mr-1">
                  <Select
                    placeholder="Pemakaian"
                    defaultValue={queryParams.status_usage}
                    disabled={!isAllowedToShowInventoryList}
                    style={{ width: `100%` }}
                    allowClear
                    onChange={(value) => {
                      if (typeof value === "undefined") {
                        onChangePemakaian();
                      } else {
                        onChangePemakaian(value);
                      }
                    }}
                  >
                    {invrelations.status_usage.map((docusage, idxusage) => {
                      return (
                        <Select.Option key={idxusage} value={docusage.id}>
                          {docusage.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
                <div className=" col-span-1">
                  <Button
                    type="primary"
                    style={{ width: `100%` }}
                    onClick={onFinalClick}
                    disabled={!isAllowedToShowInventoryList}
                  >
                    <SearchOutlined />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <Table
            className="tableTypeTask"
            pagination={{
              current: queryParams.page,
              pageSize: queryParams.rows,
              total: totalItems,
            }}
            scroll={{ x: 200 }}
            dataSource={displaydata}
            columns={columnsTable}
            loading={loadingTable}
            onRow={(record, rowIndex) => {
              return {
                onMouseOver: (event) => {
                  setrowstate(record.id);
                },
                onClick: (event) => {
                  // {
                  //     [107, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                  rt.push(`/items/detail/${record.id}`);
                  //         :
                  //         null
                  // }
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
      sidemenu: "3",
    },
  };
}

export default ItemsIndex;
