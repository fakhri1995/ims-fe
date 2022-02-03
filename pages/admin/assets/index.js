import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import {
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Spin,
  Tree,
  TreeSelect,
  notification,
} from "antd";
import httpcookie from "cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function AssetsIndex({ initProps, dataProfile, sidemenu, dataAssetsList }) {
  const rt = useRouter();
  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  const [loadingbtn, setloadingbtn] = useState(false);
  const [loadingbtnfromparent, setloadingbtnparent] = useState(false);
  const [loadingdelete, setlaodingdelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //useState
  const [maindata, setmaindata] = useState([]);
  const [praloading, setpraloading] = useState(true);
  const [newmodal, setNewmodal] = useState(false);
  const [newmodalparent, setNewmodalparent] = useState(false);
  const [modaldelete, setmodaldelete] = useState(false);
  const [parentadd, setParentadd] = useState("");
  const [parenttitle, setParenttitle] = useState("");
  const [datanew, setDatanew] = useState({
    name: "",
    parent: "",
  });
  const [datadelete, setDatadelete] = useState({
    id: 0,
  });
  const onChangeAddAssets = (e) => {
    setDatanew({
      ...datanew,
      [e.target.name]: e.target.value,
    });
  };
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [expandedKeys, setExpandedKeys] = useState([]);

  //onChange
  const onChangeParent = (value) => {
    setDatanew({
      ...datanew,
      ["parent"]: value,
    });
  };
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
        if (item.title.indexOf(value) > -1) {
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
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      // const prt = item.value.substring(0, item.value.length - 4)
      const title =
        index > -1 ? (
          <div
            className={`flex justify-between md:h-7 hover:bg-blue-100 text-black`}
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
              <span className=" text-blue-500">{searchValue}</span>
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
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  const handleAddAssets = () => {
    // rt.push(`/assets/update/${datanew.name}?originPath=Admin&title=${datanew.name}&parent=${datanew.parent}&create=true`)
    setloadingbtn(true);
    setloadingbtnparent(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/addAsset`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(tok),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datanew),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingbtn(false);
        setloadingbtnparent(false);
        // return
        if (res2.success) {
          setNewmodal(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(
              `/admin/assets/${datanew.name}?parent=${datanew.parent}&create=true`
            );
          }, 500);
        } else if (!res2.success) {
          setNewmodal(false);
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
        }
      });
  };
  const handleDeleteAssets = () => {
    setlaodingdelete(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/deleteAsset`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(tok),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datadelete),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setlaodingdelete(false);
          setmodaldelete(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/assets`);
          }, 500);
        } else if (!res2.success) {
          setlaodingdelete(false);
          setmodaldelete(false);
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
        }
      });
  };

  //useEffect
  useEffect(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getAssets`, {
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
  }, []);
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
                disabled={praloading}
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
              {praloading ? null : (
                <Modal
                  title="Tambah Assets Type & Field"
                  visible={newmodal}
                  onCancel={() => setNewmodal(false)}
                  maskClosable={false}
                  footer={null}
                  style={{ top: `3rem` }}
                  width={800}
                  destroyOnClose
                >
                  <Form layout="vertical" onFinish={handleAddAssets}>
                    <div className="grid grid-cols-1 md:grid-cols-3 mb-5">
                      <div className="flex flex-col mx-3">
                        <h1 className="text-sm">Nama:</h1>
                        <Input
                          onChange={onChangeAddAssets}
                          name="name"
                          value={datanew.name}
                          allowClear
                          required
                        />
                      </div>
                      <div className="flex flex-col mx-3">
                        <h1 className="text-sm">Deskripsi:</h1>
                        <Input name="description" allowClear />
                      </div>
                      <div className="flex flex-col mx-3">
                        <h1 className="text-sm">Parent:</h1>
                        <TreeSelect
                          style={{ width: "100%" }}
                          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                          treeData={maindata}
                          placeholder="Pilih parent"
                          treeDefaultExpandAll
                          onChange={(value) => {
                            onChangeParent(value);
                          }}
                          allowClear
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="default"
                        onClick={() => {
                          setNewmodal(false);
                        }}
                        style={{ marginRight: `1rem` }}
                      >
                        Cancel
                      </Button>
                      <Button
                        htmlType="submit"
                        loading={loadingbtn}
                        type="primary"
                        size="middle"
                      >
                        Save
                      </Button>
                    </div>
                    {/* <button type="submit" className="bg-blue-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-blue-800">Submit</button> */}
                  </Form>
                </Modal>
              )}
              {praloading ? null : (
                <Modal
                  title={`Tambah Assets Type & Field dari parent ${parenttitle}`}
                  visible={newmodalparent}
                  onCancel={() => {
                    setNewmodalparent(false);
                    setParentadd("");
                  }}
                  maskClosable={false}
                  footer={null}
                  style={{ top: `3rem` }}
                  width={800}
                  destroyOnClose
                >
                  <Form layout="vertical" onFinish={handleAddAssets}>
                    <div className="grid grid-cols-1 md:grid-cols-3 mb-5">
                      <div className="flex flex-col mx-3">
                        <h1 className="text-sm">Nama:</h1>
                        <Input
                          onChange={onChangeAddAssets}
                          name="name"
                          value={datanew.name}
                          allowClear
                          required
                        />
                      </div>
                      <div className="flex flex-col mx-3">
                        <h1 className="text-sm">Deskripsi:</h1>
                        <Input name="description" allowClear />
                      </div>
                      <div className="flex flex-col mx-3">
                        <h1 className="text-sm">Parent:</h1>
                        <TreeSelect
                          style={{ width: "100%" }}
                          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                          defaultValue={parentadd}
                          // value={parentadd}
                          treeData={maindata}
                          placeholder="Pilih parent"
                          treeDefaultExpandAll
                          // onChange={(value) => { onChangeParent(value) }}
                          disabled
                          allowClear
                        />
                      </div>
                    </div>
                    <Button
                      htmlType="submit"
                      loading={loadingbtnfromparent}
                      type="primary"
                      size="middle"
                    >
                      Submit
                    </Button>
                    {/* <button type="submit" className="bg-blue-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-blue-800">Submit</button> */}
                  </Form>
                </Modal>
              )}
              <Modal
                title={`Konfirmasi hapus asset`}
                visible={modaldelete}
                okButtonProps={{ disabled: loadingdelete }}
                onCancel={() => {
                  setmodaldelete(false);
                }}
                onOk={handleDeleteAssets}
                maskClosable={false}
                style={{ top: `3rem` }}
                width={500}
                destroyOnClose={true}
              >
                Yakin ingin hapus asset ini?
              </Modal>
            </div>
            <div className="flex mb-2 md:mb-5">
              <Input
                placeholder="Masukkan Nama Asset Type"
                style={{ width: `75%` }}
                onChange={onChangeFilterAsset}
                allowClear
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
    `https://boiling-thicket-46501.herokuapp.com/detailProfile`,
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
