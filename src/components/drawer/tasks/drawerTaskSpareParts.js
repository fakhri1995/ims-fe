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
  for (var i = 0; i < dataa.length; i++) {
    dataa[i]["key"] = dataa[i].id;
    dataa[i]["value"] = dataa[i].id;
    dataa[i]["title"] = dataa[i].mig_id;
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
    dataa[i]["key"] = dataa[i].id;
    dataa[i]["value"] = dataa[i].id;
    dataa[i][
      "title"
    ] = `${dataa[i].mig_id} - ${dataa[i].model_inventory?.name} - ${dataa[i].model_inventory?.asset?.name}`;
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
  selectedforin,
  setselectedforin,
  selectedforout,
  setselectedforout,
  prevpath,
}) => {
  //useState
  const [datapayload, setdatapayload] = useState({
    id: Number(idtask),
    add_in_inventories: [],
    remove_in_inventory_ids: [],
    add_out_inventory_ids: [],
    remove_out_inventory_ids: [],
  });
  const [loadingspart, setloadingspart] = useState(false);
  //DATA IN
  const [praloadingin, setpraloadingin] = useState(true);
  const [dataselectforin, setdataselectforin] = useState([]);
  const [datainduk, setdatainduk] = useState([]);
  //DATA OUT
  const [praloadingout, setpraloadingout] = useState(true);
  const [dataselectforout, setdataselectforout] = useState([]);
  const [fetchingstate, setfetchingstate] = useState(false);

  //handler
  const handleSendSpareParts = () => {
    setloadingspart(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/sendInventoriesTask`, {
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
          window.location.href = `/tasks/detail/${idtask}`;
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
    setpraloadingin(true);
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/getTaskSparePartList?type=masuk`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdataselectforin(res2.data);

        setpraloadingin(false);
      });
  }, []);
  useEffect(() => {
    setpraloadingout(true);
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/getTaskSparePartList?type=keluar&id=${idtask}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        var modif1 = modifData1(res2.data);
        setdatainduk(modif1);
        var modif2 = modifData2(res2.data);
        setdataselectforout(modif2);
        setpraloadingout(false);
      });
  }, []);
  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={onClose}
      buttonOkText={buttonOkText}
      onClick={() => {
        console.log(datapayload, selectedforin);
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
                        `https://boiling-thicket-46501.herokuapp.com/getTaskSparePartList?type=masuk&keyword=${value}`,
                        {
                          method: `GET`,
                          headers: {
                            Authorization: JSON.parse(initProps),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((res2) => {
                          setdataselectforin(res2.data);
                          setfetchingstate(false);
                        });
                    }}
                    filterOption={(input, opt) =>
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
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
                <div className=" mb-2 flex flex-col">
                  {selectedforin.map((doc, idx) => (
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
                        <TreeSelect
                          allowClear
                          placeholder="Pilih Induk"
                          style={{ width: `10rem`, marginRight: `0.5rem` }}
                          showSearch
                          suffixIcon={<SearchOutlined />}
                          showArrow
                          defaultValue={
                            doc.connect_id === 0 ? null : doc.connect_id
                          }
                          name={`parent`}
                          onChange={(value) => {
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
                          treeData={datainduk}
                          treeDefaultExpandAll
                        ></TreeSelect>
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
                    treeData={dataselectforout}
                    treeDefaultExpandAll
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
