import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Modal,
  Select,
  Spin,
  Table,
  TreeSelect,
  notification,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { ASSETS_GET, INVENTORY_PARTS_ADD, MODELS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

const CreateItemPart = ({ dataProfile, sidemenu, initProps, itemid }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToAddInventoryParts = hasPermission(INVENTORY_PARTS_ADD); // for /addInventoryParts and /getInventoryAddable
  const isAllowedToGetModelList = hasPermission(MODELS_GET); // for /getModels and /getFilterModels
  const isAllowedToGetAssetType = hasPermission(ASSETS_GET);

  // 1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 1);
  pathArr[pathArr.length - 1] = "Tambah Item Part";
  var asset_id1 = "",
    model_id1 = "",
    name1 = "";
  const { asset_id, model_id, name, nama, itemId } = rt.query;
  if (asset_id) {
    asset_id1 = asset_id;
  }
  if (model_id) {
    model_id1 = model_id;
  }
  if (name) {
    name1 = name;
  }

  //useState
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
  const [displaydata, setdisplaydata] = useState([]);
  // const [displaydata2, setdisplaydata2] = useState([]);
  const [displaydata3, setdisplaydata3] = useState([]);
  const [newpartdata, setnewpartdata] = useState({
    id: Number(itemid),
    inventory_part_ids: [],
    notes: "",
  });
  // const [invrelations, setinvrelations] = useState({
  //   models: [
  //     {
  //       id: "",
  //       name: "",
  //       deleted_at: null,
  //     },
  //   ],
  //   assets: [
  //     {
  //       id: "",
  //       name: "",
  //       deleted_at: null,
  //     },
  //   ],
  //   manufacturers: [
  //     {
  //       id: "",
  //       name: "",
  //       deleted_at: null,
  //     },
  //   ],
  //   status_condition: [],
  //   status_usage: [],
  //   vendors: [],
  //   companies: [],
  // });
  const [listselectedpart, setlistselectedpart] = useState([]);
  const [namasearchact, setnamasearchact] = useState(
    name1 === "" ? false : true
  );
  const [namavalue, setnamavalue] = useState(null);
  const [assettypefilteract, setassettypefilteract] = useState(
    asset_id1 === "" ? false : true
  );
  const [assettypevalue, setassettypevalue] = useState(null);
  const [modelfilteract, setmodelfilteract] = useState(
    model_id1 === "" ? false : true
  );
  const [modelvalue, setmodelvalue] = useState(null);
  const [namaasset, setnamaasset] = useState(asset_id1);
  const [defasset, setdefasset] = useState(null);
  const [assetdata, setassetdata] = useState([]);
  // const [rowstate, setrowstate] = useState(0);
  const [praloading, setpraloading] = useState(true);
  const [praloading2, setpraloading2] = useState(true);
  const [modaladd, setmodaladd] = useState(false);
  const [loadingadd, setloadingadd] = useState(false);
  const [disabledadd, setdisabledadd] = useState(true);
  const [fetchingmodel, setfetchingmodel] = useState(false);
  const [modelfilter, setmodelfilter] = useState([]);

  //3.Define
  const columnsTable = [
    // {
    //     title: 'Nama Item',
    //     dataIndex: 'inventory_name',
    //     key: 'inventory_name',
    // },
    {
      title: "MIG ID",
      dataIndex: "mig_id",
      key: "mig_id",
    },
    {
      title: "Model",
      dataIndex: "model_name",
      key: "model_name",
      render: (text, record, index) => {
        return {
          children: <>{record.model_inventory.name}</>,
        };
      },
    },
    {
      title: "Asset Type",
      dataIndex: "asset_name",
      key: "asset_name",
      render: (text, record, index) => {
        return {
          children: <>{record.model_inventory.asset.name}</>,
        };
      },
    },
  ];
  const recursiveGetParentId = (id, tree) => {
    let parentId;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.id === id)) {
          parentId = node.id;
        } else if (recursiveGetParentId(id, node.children)) {
          parentId = recursiveGetParentId(id, node.children);
        }
      }
    }
    return parentId;
  };
  const recursiveGetParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (recursiveGetParentKey(key, node.children)) {
          parentKey = recursiveGetParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };
  const recursiveGetParent = (key, tree) => {
    let parent;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parent = node;
        } else if (recursiveGetParent(key, node.children)) {
          parent = recursiveGetParent(key, node.children);
        }
      }
    }
    return parent;
  };
  var selectedPart = {};
  const recursiveSearchPart = (doc, key) => {
    for (var i = 0; i < doc.length; i++) {
      if (doc[i].key === key) {
        selectedPart = doc[i];
      } else {
        if (doc[i].children) {
          recursiveSearchPart(doc[i].children, key);
        }
      }
    }
  };
  const assetPart = [];
  const recursiveSearchPartFromAsset = (doc, assetid) => {
    var arr = [];
    for (var i = 0; i < doc.length; i++) {
      if (doc[i].asset_id === Number(assetid)) {
        // continue
        assetPart.push(doc[i]);
      } else {
        if (doc[i].children) {
          arr.push({
            ...doc[i],
            children: recursiveSearchPartFromAsset(doc[i].children, assetid),
          });
        } else {
          arr.push({
            ...doc[i],
          });
        }
      }
    }
    return arr;
  };
  const modelPart = [];
  const recursiveSearchPartFromModel = (doc, modelid) => {
    var arr = [];
    for (var i = 0; i < doc.length; i++) {
      if (doc[i].model_id === Number(modelid)) {
        // continue
        modelPart.push(doc[i]);
      } else {
        if (doc[i].children) {
          arr.push({
            ...doc[i],
            children: recursiveSearchPartFromModel(doc[i].children, modelid),
          });
        } else {
          arr.push({
            ...doc[i],
          });
        }
      }
    }
    return arr;
  };
  const namePart = [];
  const recursiveSearchPartFromName = (doc, name) => {
    var arr = [];
    for (var i = 0; i < doc.length; i++) {
      if (doc[i].inventory_name.toLowerCase().includes(name.toLowerCase())) {
        // continue
        namePart.push(doc[i]);
      } else {
        if (doc[i].children) {
          arr.push({
            ...doc[i],
            children: recursiveSearchPartFromName(doc[i].children, name),
          });
        } else {
          arr.push({
            ...doc[i],
          });
        }
      }
    }
    return arr;
  };

  //handler
  //1.onChange
  //search nama
  const onChangeSearch = (e) => {
    if (e.target.value === "") {
      // setdisplaydata(displaydata3)
      window.location.href = `/items/createpart/${itemid}?asset_id=${
        assettypefilteract ? asset_id1 : ""
      }&model_id=${modelfilteract ? model_id1 : ""}&name=&nama=${nama}`;
      setnamasearchact(false);
    } else {
      setnamasearchact(true);
      setnamavalue(e.target.value);
    }
  };
  //search asset type
  const onChangeAssetType = (id) => {
    if (typeof id === "undefined") {
      // setdisplaydata(displaydata3)
      window.location.href = `/items/createpart/${itemid}?asset_id=&model_id=&name=${
        namasearchact ? name1 : ""
      }&nama=${nama}`;
      setassettypefilteract(false);
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getModels?asset_id=${id}`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          res2.data.length === 0
            ? setmodelfilter([])
            : setmodelfilter(res2.data.data);
        });
      setassettypefilteract(true);
      setassettypevalue(id);
    }
  };
  //search model
  const onChangeModel = (idmodel) => {
    if (typeof idmodel === "undefined") {
      // setdisplaydata(displaydata3)
      window.location.href = `/items/createpart/${itemid}?asset_id=${
        assettypefilteract ? asset_id1 : ""
      }&model_id=&name=${namasearchact ? name1 : ""}&nama=${nama}`;
      setmodelfilteract(false);
    } else {
      setmodelfilteract(true);
      setmodelvalue(idmodel);
    }
  };
  const onFinalClick = () => {
    // var datatemp = displaydata2
    // if (assettypefilteract) {
    //     recursiveSearchPartFromAsset(datatemp, assettypevalue)
    //     datatemp = assetPart
    // }
    // if (modelfilteract) {
    //     recursiveSearchPartFromModel(datatemp, modelvalue)
    //     datatemp = modelPart
    // }
    // if (namasearchact) {
    //     recursiveSearchPartFromName(datatemp, namavalue)
    //     datatemp = namePart
    // }
    // setdisplaydata(datatemp)
    window.location.href = `/items/createpart/${itemid}?asset_id=${
      assettypefilteract
        ? assettypevalue === null
          ? asset_id1
          : assettypevalue
        : ""
    }&model_id=${
      modelfilteract ? (modelvalue === null ? model_id1 : modelvalue) : ""
    }&name=${
      namasearchact ? (namavalue === null ? name1 : namavalue) : ""
    }&nama=${nama}`;
  };
  const handleAddItemPart = () => {
    setloadingadd(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addInventoryParts`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newpartdata),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingadd(false);
        if (res2.success) {
          notification["success"]({
            message: "Item Part berhasil ditambahkan",
            duration: 3,
          });
          setmodaladd(false);
          rt.push(`/items/detail/${itemid}?active=konfigurasiPart`);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  //useEffect
  /** Data fetching to retrieve data source for table component */
  useEffect(() => {
    if (!isAllowedToAddInventoryParts) {
      permissionWarningNotification("Mendapatkan", "Daftar Inventory");
      setpraloading(false);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getInventoryAddable?rows=10&page=1&asset_id=${asset_id1}&model_id=${model_id1}&name=${name1}&inventory_id=${itemId}`,
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
        const recursiveChangetoChildren = (rsc) => {
          var res = [];
          for (var i = 0; i < rsc?.length; i++) {
            rsc[i].key = rsc[i].id;
            rsc[i].title = rsc[i].inventory_name;
            rsc[i].children = rsc[i].inventory_parts;
            delete rsc[i].inventory_parts;
            if (rsc[i].children) {
              res.push({
                ...rsc[i],
                children: recursiveChangetoChildren(rsc[i].children),
              });
            } else {
              delete rsc[i].children;
              res.push({
                ...rsc[i],
              });
            }
          }
          return res;
        };
        const t = recursiveChangetoChildren(res2.data.data);
        setdisplaydata(t); // table data source
        // setdisplaydata2(t);
        setdisplaydata3(t); // record's children (a.k.a tree's node)
        setpraloading(false);
      });
  }, [isAllowedToAddInventoryParts]);

  /** Data fetching for: "Cari Asset Type" input field data source */
  useEffect(() => {
    if (!isAllowedToGetAssetType) {
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
        console.log(selectedAsset);
        setdefasset(selectedAsset.key);
        setassetdata(res2.data);
        setpraloading2(false);
      });
  }, [isAllowedToGetAssetType]);

  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getInventoryRelations`, {
  //     method: `GET`,
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       setinvrelations(res2.data);
  //     });
  // }, []);

  /** Data fetching for: "Model" input field data source */
  useEffect(() => {
    if (!isAllowedToGetModelList) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterModels`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setmodelfilter(res2.data);
      });
  }, [isAllowedToGetModelList]);

  return (
    <Layout
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 bg-white mb-5 p-4">
        <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
          <div className="font-semibold text-xl w-auto">
            Form Tambah Item Part "{nama}"
          </div>
        </div>
        <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
          <Button
            onClick={() => {
              rt.push(
                `/items/detail/${itemid}?active=konfigurasiPart`
              ); /*console.log(listselectedpart)*/
            }}
            style={{ marginRight: `1rem` }}
            size="middle"
            type="danger"
          >
            Batal
          </Button>
          <Button
            disabled={disabledadd || !isAllowedToAddInventoryParts}
            onClick={() => {
              setmodaladd(true);
            }}
            size="middle"
            type="primary"
          >
            Simpan
          </Button>
        </div>
      </div>
      <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
        <div className="md:col-span-5 col-span-1 flex flex-col py-3">
          <div className="flex mb-8">
            <div className=" w-full mr-1 grid grid-cols-12">
              <div className="col-span-5 mr-1">
                <Input
                  defaultValue={name1}
                  style={{ width: `100%`, marginRight: `0.5rem` }}
                  placeholder="Cari MIG ID"
                  onChange={onChangeSearch}
                  allowClear
                  disabled={!isAllowedToAddInventoryParts}
                ></Input>
              </div>
              {praloading2 ? (
                <>
                  <Spin />
                </>
              ) : (
                <div className="col-span-3 mr-1">
                  <TreeSelect
                    defaultValue={namaasset === "" ? null : defasset}
                    allowClear
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    treeData={assetdata}
                    disabled={!isAllowedToGetAssetType}
                    placeholder="Cari Asset Type"
                    treeDefaultExpandAll
                    style={{ width: `100%` }}
                    onChange={(value, label, extra) => {
                      if (typeof value === "undefined") {
                        onChangeAssetType();
                      } else {
                        onChangeAssetType(
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
              )}
              <div className="col-span-3 mr-1">
                <Select
                  showSearch
                  optionFilterProp="children"
                  notFoundContent={fetchingmodel ? <Spin size="small" /> : null}
                  disabled={!isAllowedToGetModelList}
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
                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  defaultValue={model_id1 === "" ? null : Number(model_id1)}
                  placeholder="Model"
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
                      <Select.Option value={docmodels.id}>
                        {docmodels.name}
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
                  disabled={!isAllowedToAddInventoryParts}
                >
                  <SearchOutlined />
                </Button>
              </div>
            </div>
          </div>
          <Table
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                if (selectedRows.length > 0) {
                  setdisabledadd(false);
                } else {
                  setdisabledadd(true);
                }
                setnewpartdata({
                  ...newpartdata,
                  inventory_part_ids: selectedRows.map((doc) => doc.id),
                });
                var listarr = [];
                selectedRows.forEach((doc, idx) => {
                  const a = recursiveGetParentKey(doc.key, displaydata3);
                  if (typeof a !== "undefined") {
                    recursiveSearchPart(displaydata3, a);
                    listarr.push({ mig_id: doc.mig_id, parent: selectedPart });
                  } else {
                    listarr.push({ mig_id: doc.mig_id, parent: "" });
                  }
                });
                setlistselectedpart(listarr);
              },
              onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
              },
              checkStrictly: true,
            }}
            pagination={{
              pageSize: 10,
              total: rawdata.total,
              onChange: (page, pageSize) => {
                setpraloading(true);
                fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/getInventoryAddable?page=${page}&rows=10&asset_id=${asset_id1}&model_id=${model_id1}&name=${name1}&inventory_id=${itemId}`,
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
                    const recursiveChangetoChildren = (rsc) => {
                      var res = [];
                      for (var i = 0; i < rsc?.length; i++) {
                        rsc[i].key = rsc[i].id;
                        rsc[i].title = rsc[i].inventory_name;
                        rsc[i].children = rsc[i].inventory_parts;
                        delete rsc[i].inventory_parts;
                        if (rsc[i].children) {
                          res.push({
                            ...rsc[i],
                            children: recursiveChangetoChildren(
                              rsc[i].children
                            ),
                          });
                        } else {
                          delete rsc[i].children;
                          res.push({
                            ...rsc[i],
                          });
                        }
                      }
                      return res;
                    };
                    const t = recursiveChangetoChildren(res2.data.data);
                    setdisplaydata(t);
                    // setdisplaydata2(t);
                    setdisplaydata3(t);
                    setpraloading(false);
                  });
              },
            }}
            scroll={{ x: 200 }}
            dataSource={displaydata}
            columns={columnsTable}
            loading={praloading}
            // onRow={(record, rowIndex) => {
            //     return {
            //         onMouseOver: (event) => {
            //             setrowstate(record.id)
            //         },
            //         onClick: (event) => {
            //             // {
            //             //     [107, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
            //             // rt.push(`/items/detail/${record.id}`)
            //             //         :
            //             //         null
            //             // }
            //         }
            //     }
            // }}
            // rowClassName={(record, idx) => {
            //     return (
            //         record.id === rowstate ? `cursor-pointer` : ``
            //     )
            // }}
          ></Table>
        </div>
      </div>

      <AccessControl hasPermission={INVENTORY_PARTS_ADD}>
        <Modal
          title={
            <h1 className="font-semibold">
              Apakah anda yakin untuk menambahkan Item berikut ini menjadi Item
              Part "{nama}"?
            </h1>
          }
          visible={modaladd}
          onCancel={() => {
            setmodaladd(false);
          }}
          okText="Ya"
          cancelText="Tidak"
          onOk={handleAddItemPart}
          okButtonProps={{ loading: loadingadd }}
          width={760}
        >
          <div className="flex flex-col">
            <div className="flex flex-col mb-4">
              {listselectedpart.map((doc, idx) => {
                if (doc.parent !== "") {
                  return (
                    <p className="mb-0 text-xs font-semibold">
                      - {doc.mig_id}, sedang menjadi Item Part dari "
                      {doc.parent.mig_id}"
                    </p>
                  );
                } else {
                  return (
                    <p className="mb-0 text-xs font-semibold">- {doc.mig_id}</p>
                  );
                }
              })}
            </div>
            {listselectedpart.some((doc2) => doc2.parent !== "") && (
              <div className="flex flex-col mb-3">
                <p className="text-red-500 mb-0">
                  Dengan menyetujui hal ini, anda akan mengeluarkan item part
                  diatas dari item utama-nya!
                </p>
              </div>
            )}
            <div className="flex flex-col">
              <p className="mb-0">Notes</p>
              <Input.TextArea
                rows={4}
                placeholder="Masukkan Notes"
                onChange={(e) => {
                  setnewpartdata({ ...newpartdata, notes: e.target.value });
                }}
              ></Input.TextArea>
            </div>
          </div>
        </Modal>
      </AccessControl>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const itemid = params.itemId;
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
      itemid,
    },
  };
}

export default CreateItemPart;
