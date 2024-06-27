import { Button, Empty, Input, Spin, Tree } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { ASSETS_GET, ASSET_ADD } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function AssetsIndex({ initProps, dataProfile, sidemenu, dataAssetsList }) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetAssets = hasPermission(ASSETS_GET);
  const isAllowedToAddAsset = hasPermission(ASSET_ADD);

  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  const [searchValue, setSearchValue] = useState("");

  //useState
  const [maindata, setmaindata] = useState([]);
  const [praloading, setpraloading] = useState(true);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [expandedKeys, setExpandedKeys] = useState([]);

  //onChange
  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  //filterAsset
  const dataList = [];
  const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { id, key, value, id_parent, title } = node;
      dataList.push({ id, key, value, id_parent, title });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(maindata);
  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };
  const onChangeFilterAsset = (e) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return getParentKey(item.key, maindata);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    if (value) {
      setExpandedKeys(expandedKeys);
      setSearchValue(value);
      setAutoExpandParent(true);
    } else {
      setExpandedKeys(maindata.map((doc) => doc.key));
      setSearchValue("");
      setAutoExpandParent(false);
    }
  };

  const filterTreeNode = (node) => {
    const title = node.title.props.children[0].props
      ? node.title.props.children[0].props.children[2]
      : node.title.props.children[2];
    const result = title
      ? title.indexOf(searchValue) !== -1
        ? true
        : false
      : false;
    return result;
  };

  const loop = (data) =>
    data.map((item) => {
      const index = item.title.toLowerCase().indexOf(searchValue.toLowerCase());
      const beforeStr = item.title.substr(0, index).toUpperCase();
      const afterStr = item.title
        .substr(index + searchValue.length)
        .toUpperCase();

      // const index = itemTitleLowerCase.indexOf(searchValue);
      // const beforeStr = itemTitleLowerCase.substr(0, index);
      // const afterStr = itemTitleLowerCase.substr(index + searchValue.length);

      // const prt = item.value.substring(0, item.value.length - 4)
      const title =
        index > -1 ? (
          <div
            className={`flex justify-between md:h-7 hover:bg-blue-100 font-normal`}
            onMouseOver={() => {
              var d = document.getElementById(`node${item.key}`);
              d.classList.add("flex");
              d.classList.remove("hidden");
            }}
            onMouseLeave={() => {
              var e = document.getElementById(`node${item.key}`);
              e.classList.add("hidden");
              e.classList.remove("flex");
            }}
          >
            <div
              className="w-full"
              onClick={() => {
                rt.push(`/admin/assets/detail/${item.id}`);
              }}
            >
              {beforeStr}
              <span className="text-blue-500 font-medium">
                {searchValue.toUpperCase()}
              </span>
              {afterStr}
            </div>
            <div className={`hidden mx-2`} id={`node${item.key}`}>
              <a
                className="mx-2 py-2 flex items-center"
                alt="add"
                onClick={() => {
                  rt.push(
                    `/admin/assets/create?idparent=${item.id}&codeparent=${item.value}`
                  ); /*setNewmodalparent(true); fungsiSetParent(item.value); setParenttitle(item.title)*/
                }}
              >
                <div className="rounded-full bg-black text-white h-5 w-5 flex items-center text-xs justify-center hover:bg-gray-700">
                  +
                </div>
              </a>
            </div>
          </div>
        ) : (
          <span className="font-normal">{item.title.toUpperCase()}</span>
        );

      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetAssets) {
      permissionWarningNotification("Mendapatkan", "Daftar Asset");
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
        if (typeof res2.data === "undefined") {
          res2.data = [];
          setmaindata(res2.data);
          setpraloading(false);
        } else {
          setmaindata(res2.data);
          const defaultexpand = res2.data.map((doc) => doc.key);
          setExpandedKeys(defaultexpand);
          setpraloading(false);
        }
      });
  }, [isAllowedToGetAssets]);

  return (
    <Layout
      tok={tok}
      pathArr={pathArr}
      sidemenu={sidemenu}
      dataProfile={dataProfile}
      st={st}
    >
      <div className="w-full h-auto border-t border-opacity-30 border-gray-500 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 md:col-span-4 flex flex-col">
            <div className="p-2 md:p-5 mb-5 border-b flex justify-between">
              <div className="text-xs md:text-sm font-semibold">
                <h1 className="mt-2 font-semibold text-xl">Assets Types</h1>
              </div>
              <Button
                disabled={praloading || !isAllowedToAddAsset}
                type="primary"
                size="large"
                onClick={() => {
                  /*setNewmodal(true)*/ rt.push(
                    `/admin/assets/create?idparent=&codeparent=`
                  );
                }}
              >
                Tambah
              </Button>
            </div>
            <div className="flex mb-2 md:mb-5">
              <Input
                placeholder="Masukkan Nama Asset Type"
                style={{ width: `75%` }}
                onChange={onChangeFilterAsset}
                allowClear
                disabled={!isAllowedToGetAssets}
              />
            </div>
            {praloading ? (
              <div className="flex">
                <Spin></Spin>
              </div>
            ) : (
              <div className="p-2 md:p-5 w-full md:w-9/12 border rounded-md shadow-md">
                {maindata.length === 0 ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                ) : (
                  <Tree
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    treeData={loop(maindata)}
                    filterTreeNode={filterTreeNode}
                    showLine={{
                      showLeafIcon: false,
                    }}
                    blockNode={true}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

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
  const resources = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjson = await resources.json();
  const dataProfile = resjson;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "81",
    },
  };
}

export default AssetsIndex;
