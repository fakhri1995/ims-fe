import { SearchOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Radio,
  Select,
  Spin,
  Switch,
  TreeSelect,
  notification,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import ButtonSys from "../../button";
import {
  AssetIconSvg,
  CalendartimeIconSvg,
  CircleXIconSvg,
  TrashIconSvg,
  UserIconSvg,
} from "../../icon";
import {
  InputRequired,
  SelectRequired,
  TextAreaNotRequired,
} from "../../input";
import { H1, H2, Label } from "../../typography";
import DrawerCore from "../drawerCore";

function modifData1(dataa) {
  for (var i = 0; i < dataa?.length; i++) {
    dataa[i]["key"] = dataa[i].id;
    dataa[i]["value"] = dataa[i].id;
    dataa[i][
      "title"
    ] = `${dataa[i].mig_id} - ${dataa[i].model_inventory.name} - ${dataa[i].model_inventory.asset.name}`;

    if (dataa[i].inventory_parts) {
      dataa[i]["children"] = dataa[i].inventory_parts;
      delete dataa[i].inventory_parts;
      modifData1(dataa[i].children);
    }
  }
  return dataa;
}

function modifData2(dataa) {
  for (var i = 0; i < dataa.length; i++) {
    // MIG_ID - MODEL_NAME - ASSET_NAME
    const displayFormat = `${dataa[i].mig_id} - ${dataa[i].model_inventory?.name} - ${dataa[i].model_inventory?.asset?.name}`;

    dataa[i]["key"] = dataa[i].id;
    dataa[i]["value"] = dataa[i].id;
    dataa[i]["title"] = displayFormat;

    if (dataa[i].inventory_parts) {
      dataa[i]["children"] = dataa[i].inventory_parts;
      delete dataa[i].inventory_parts;
      modifData2(dataa[i].children);
    }
  }
  return dataa;
}

const DrawerTaskSpareParts = ({
  title,
  visible,
  onvisible,
  onClose,
  buttonOkText,
  disabled,
  initProps,
  idtask,
  // selectedforin,
  // setselectedforin,
  // selectedforout,
  // setselectedforout,
  prevpath,
  inventories,
}) => {
  /**
   * Dependencies
   */
  const router = useRouter();

  //useState
  const [datapayload, setdatapayload] = useState({
    id: Number(idtask),
    add_in_inventories: [],
    remove_in_inventory_ids: [],
    add_out_inventory_ids: [],
    remove_out_inventory_ids: [],
  });
  useEffect(() => {
    console.log("[Effect] Data Payload", { datapayload });
  }, [datapayload]);

  const [loadingspart, setloadingspart] = useState(false);
  //DATA IN
  const [selectedforin, setselectedforin] = useState([]);

  const [praloadingin, setpraloadingin] = useState(true);
  const [dataselectforin, setdataselectforin] = useState([]); // display
  useEffect(() => {
    console.log("[Effect] Data In", { dataselectforin });
  }, [dataselectforin]);

  const [datainduk, setdatainduk] = useState([]); // display
  useEffect(() => {
    console.log("[Effect] Data Induk", { datainduk });
  }, [datainduk]);

  //DATA OUT
  const [selectedforout, setselectedforout] = useState([]);

  const [praloadingout, setpraloadingout] = useState(true);
  const [dataselectforout, setdataselectforout] = useState([]); // display
  useEffect(() => {
    console.log("[Effect] Data Out", { dataselectforout });
  }, [dataselectforout]);

  const [fetchingstate, setfetchingstate] = useState(false);

  //handler
  const handleSendSpareParts = () => {
    setloadingspart(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sendInventoriesTask`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datapayload),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingspart(false);
        if (res2.success) {
          onvisible(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          // window.location.href = `/tasks/detail/${idtask}`;
          router?.reload();
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  //useEffect
  useEffect(() => {
    if (!visible) {
      return;
    }

    if (
      inventories !== undefined &&
      inventories instanceof Array &&
      inventories.length === 0
    ) {
      return;
    }

    var tempin = [],
      tempout = [];

    inventories
      .filter((fil) => !Boolean(fil.is_from_task))
      // .filter((fil) => fil.is_from_task === false)
      .map((doc, idx) => {
        // if (doc.is_in === true) {
        if (Boolean(doc.is_in)) {
          tempin.push({
            ...doc,
            migid: doc.mig_id,
            modelname: doc.model_name,
            assetname: doc.asset_name,
          });
        } else {
          tempout.push({
            ...doc,
            migid: doc.mig_id,
            modelname: doc.model_name,
            assetname: doc.asset_name,
          });
        }
      });

    console.log("[Effect] getTask", { tempin, tempout });

    setselectedforin(tempin);
    setselectedforout(tempout);
  }, [inventories, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setpraloadingin(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskSparePartList?type=masuk&id=${idtask}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdataselectforin(res2.data.inventory_list);

        setpraloadingin(false);
      });
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setpraloadingout(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskSparePartList?type=keluar&id=${idtask}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        // var modif1 = modifData1(res2.data.inventory_list);
        var modif1 = modifData2(res2.data.inventory_list);
        setdatainduk(modif1);
        // setdatainduk(res2.data.inventory_list)
        // var modif2 = modifData2(res2.data);
        var modif2 = modifData2(res2.data.inventory_list);
        setdataselectforout(modif2);
        // setpraloadingout(false);
        // setdataselectforout(res2.data.inventory_list);
        setpraloadingout(false);
      });
  }, [visible]);

  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={onClose}
      buttonOkText={buttonOkText}
      onClick={() => {
        console.log("[On Click] Drawer Button", datapayload, selectedforin);
        handleSendSpareParts();
      }}
      // disabled={disabledcreate}
    >
      {loadingspart ? (
        <div className=" flex w-full items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="mb-0 text-red-500 text-xs italic">
              *Informasi ini harus diisi
            </p>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex mb-2">
              <Label>Suku Cadang Masuk</Label>
              <span className="spartsin"></span>
              <style jsx>
                {`
                                .spartsin::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
              </style>
            </div>
            {praloadingin ? (
              <>
                <Spin />
              </>
            ) : (
              <>
                <div className=" mb-2 flex">
                  <Select
                    style={{ width: `100%` }}
                    className="dontShow"
                    suffixIcon={<SearchOutlined />}
                    showArrow
                    placeholder="MIG ID, Model"
                    name={`part_in`}
                    onChange={(value, option) => {
                      console.log("[On Change] Suku Cadang Masuk", { value });
                      setdatapayload({
                        ...datapayload,
                        add_in_inventories: [
                          ...datapayload.add_in_inventories,
                          { inventory_id: value, connect_id: 0 },
                        ],
                      });
                      setselectedforin([...selectedforin, option]);
                      console.log(option);
                    }}
                    showSearch
                    optionFilterProp="children"
                    notFoundContent={
                      fetchingstate ? <Spin size="small" /> : null
                    }
                    onSearch={(value) => {
                      setfetchingstate(true);
                      fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskSparePartList?type=masuk&keyword=${value}&id=${idtask}`,
                        {
                          method: `GET`,
                          headers: {
                            Authorization: JSON.parse(initProps),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((res2) => {
                          setdataselectforin(res2.data.inventory_list);
                          setfetchingstate(false);
                        });
                    }}
                    filterOption={(input, opt) => {
                      const { migid, modelname, assetname } = opt;
                      const searchableString = `${migid}${modelname}${assetname}`;

                      return (
                        searchableString
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                  >
                    {dataselectforin.map((doc, idx) => (
                      <Select.Option
                        key={idx}
                        value={doc.id}
                        migid={doc.mig_id}
                        modelname={doc.model_name}
                        assetname={doc.asset_name}
                      >
                        {doc.mig_id} - {doc.model_name} - {doc.asset_name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                <div className="mb-2 flex flex-col space-y-2">
                  {selectedforin.map((doc, idx) => (
                    <div className=" mb-2 flex items-center justify-between">
                      <div>
                        <AssetIconSvg size={50} />
                      </div>

                      <div className="flex flex-col flex-grow-0 w-2/3">
                        <H2>{doc.modelname}</H2>
                        <Label>
                          {doc.migid}/{doc.assetname}
                        </Label>
                        <TreeSelect
                          allowClear
                          placeholder="Pilih Induk"
                          className="mt-2"
                          showSearch
                          suffixIcon={<SearchOutlined />}
                          showArrow
                          defaultValue={
                            doc.connect_id === 0 ? null : doc.connect_id
                          }
                          name={`parent`}
                          onChange={(value) => {
                            console.log("[On Change] Pilih Induk", { value });
                            if (typeof value === "undefined") {
                              var temp = [...datapayload.add_in_inventories];
                              temp[idx].connect_id = 0;
                              setdatapayload((prev) => ({
                                ...prev,
                                add_in_inventories: temp,
                              }));
                            } else {
                              var temp = [...datapayload.add_in_inventories];
                              temp[idx].connect_id = value;
                              setdatapayload((prev) => ({
                                ...prev,
                                add_in_inventories: temp,
                              }));
                            }
                          }}
                          // treeData={[]}
                          treeData={datainduk}
                          // fieldNames={{
                          //   children: "inventory_parts",
                          //   value: "id",
                          //   label: "mig_id"
                          // }}
                          // treeDataSimpleMode={{
                          //   id: "id",
                          // }}
                          treeDefaultExpandAll
                          treeNodeFilterProp="title"
                          filterTreeNode={(search, item) =>
                            item.title
                              .toLowerCase()
                              .indexOf(search.toLowerCase()) >= 0
                          }
                        ></TreeSelect>
                      </div>

                      <div className="flex items-center">
                        <div
                          className=" cursor-pointer flex justify-center items-center"
                          onClick={() => {
                            var temp = [...selectedforin];
                            temp.splice(idx, 1);
                            setselectedforin(temp);
                            doc.id
                              ? setdatapayload((prev) => ({
                                  ...prev,
                                  remove_in_inventory_ids: [
                                    ...prev.remove_in_inventory_ids,
                                    doc.id,
                                  ],
                                }))
                              : setdatapayload((prev) => ({
                                  ...prev,
                                  add_in_inventories:
                                    prev.add_in_inventories.filter(
                                      (fil) => fil.inventory_id !== doc.value
                                    ),
                                }));
                          }}
                        >
                          <TrashIconSvg size={20} color={`#BF4A40`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex mb-2">
              <Label>Suku Cadang Keluar</Label>
              <span className="spartsout"></span>
              <style jsx>
                {`
                                .spartsout::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
              </style>
            </div>
            {praloadingout ? (
              <>
                <Spin />
              </>
            ) : (
              <>
                <div className=" mb-2 flex">
                  <TreeSelect
                    placeholder="MIG ID, Model"
                    style={{ width: `100%` }}
                    showSearch
                    className="dontShow"
                    suffixIcon={<SearchOutlined />}
                    showArrow
                    name={`part_out`}
                    onChange={(value, label, extra) => {
                      console.log("[On Change] Data Out", { value });
                      setselectedforout([
                        ...selectedforout,
                        {
                          value: extra.allCheckedNodes[0].node.props.value,
                          migid: extra.allCheckedNodes[0].node.props.mig_id,
                          modelname:
                            extra.allCheckedNodes[0].node.props.model_inventory
                              ?.name,
                          assetname:
                            extra.allCheckedNodes[0].node.props.model_inventory
                              ?.asset?.name,
                        },
                      ]);
                      setdatapayload((prev) => ({
                        ...prev,
                        add_out_inventory_ids: [
                          ...prev.add_out_inventory_ids,
                          value,
                        ],
                      }));
                    }}
                    // treeData={[]}
                    treeData={dataselectforout}
                    // fieldNames={{
                    //   children: "inventory_parts",
                    //   value: "id",
                    //   label: "mig_id"
                    // }}
                    treeDefaultExpandAll
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
                  ></TreeSelect>
                </div>
                <div className=" mb-2 flex flex-col">
                  {selectedforout.map((doc, idx) => (
                    <div className=" mb-2 flex items-center justify-between">
                      <div className=" flex items-center">
                        <div className=" mr-2">
                          <AssetIconSvg size={50} />
                        </div>
                        <div className=" flex flex-col">
                          <H2>{doc.modelname}</H2>
                          <Label>
                            {doc.migid}/{doc.assetname}
                          </Label>
                        </div>
                      </div>
                      <div className=" flex items-center">
                        <div
                          className=" cursor-pointer flex justify-center items-center"
                          onClick={() => {
                            var temp = [...selectedforout];
                            temp.splice(idx, 1);
                            setselectedforout(temp);
                            doc.id
                              ? setdatapayload((prev) => ({
                                  ...prev,
                                  remove_out_inventory_ids: [
                                    ...prev.remove_out_inventory_ids,
                                    doc.id,
                                  ],
                                }))
                              : setdatapayload((prev) => ({
                                  ...prev,
                                  add_out_inventory_ids:
                                    prev.add_out_inventory_ids.filter(
                                      (fil) => fil !== doc.value
                                    ),
                                }));
                          }}
                        >
                          <TrashIconSvg size={20} color={`#BF4A40`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </DrawerCore>
  );
};

export default DrawerTaskSpareParts;
