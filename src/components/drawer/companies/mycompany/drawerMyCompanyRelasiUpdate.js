import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Empty,
  Input,
  Select,
  Spin,
  TreeSelect,
  notification,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import ButtonSys from "../../../button";
import {
  AlignJustifiedIconSvg,
  BorderAllSvg,
  CameraIconSvg,
  CheckboxIconSvg,
  CircleXIconSvg,
  CopyIconSvg,
  EmailIconSvg,
  FaxIconSvg,
  ListNumbersSvg,
  NotesIconSvg,
  PkpIconSvg,
  RefreshIconSvg,
  RulerIconSvg,
  SquarePlusIconSvg,
  TrashIconSvg,
  WebIconSvg,
} from "../../../icon";
import {
  DateNotRequired,
  DateRequired,
  InputNotRequired,
  InputRequired,
  RadioNotRequired,
  RadioRequired,
  SelectNotRequired,
  TextAreaRequired,
  TreeSelectRequired,
} from "../../../input";
import { H2, Label, Text } from "../../../typography";
import DrawerCore from "../../drawerCore";

const DrawerUpdateRelasi = ({
  id,
  title,
  visible,
  onClose,
  children,
  buttonOkText,
  initProps,
  onvisible,
  dataapiadd,
}) => {
  //add
  const [dataApiadd, setdataApiadd] = useState(dataapiadd);
  const [displaydatarelations, setdisplaydatarelations] = useState([]);
  const [relationnameadd, setrelationnameadd] = useState("");
  const [relationnameddadd, setrelationnameddadd] = useState(false);
  const [relationselectedidxadd, setrelationselectedidxadd] = useState(-1);
  const [relationselectedisinverseadd, setrelationselectedisinverseadd] =
    useState(-1);
  const [detailtipeadd, setdetailtipeadd] = useState(-10);
  const [detailtipedataadd, setdetailtipedataadd] = useState([]);
  const [modaladd, setmodaladd] = useState(false);
  const [disabledadd, setdisabledadd] = useState(true);
  const [loadingadd, setloadingadd] = useState(false);
  const [fetchingmodel, setfetchingmodel] = useState(false);
  const [sublocdata, setsublocdata] = useState(null);
  const [subloctrig, setsubloctrig] = useState(-1);

  const handleAddRelationshipItem = () => {
    setloadingadd(true);
    // delete dataApiadd.backup_connected_ids
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRelationshipInventory`,
      {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataApiadd),
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setloadingadd(false);
        onvisible(false);
        if (res2.success) {
          setdataApiadd({
            subject_id: Number(id),
            relationship_id: null,
            is_inverse: null,
            type_id: null,
            connected_ids: null,
            backup_connected_ids: null,
          });
          setrelationnameadd("");
          setsublocdata(null);
          setrelationselectedidxadd(-1);
          setrelationselectedisinverseadd(-1);
          setsubloctrig(-1);
          notification["success"]({
            message: "Relationship Item berhasil ditambahkan",
            duration: 3,
          });
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRelationships`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdisplaydatarelations(res2.data);
      });
  }, []);
  useEffect(() => {
    if (subloctrig !== -1) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRelationshipInventoryDetailList?type_id=${subloctrig}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setsublocdata(res2.data.children);
        });
    } else if (detailtipeadd !== -10) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRelationshipInventoryDetailList?type_id=${dataApiadd.type_id}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          dataApiadd.type_id === -3 && setdetailtipedataadd([res2.data]);
          dataApiadd.type_id === -1 && setdetailtipedataadd(res2.data);
          dataApiadd.type_id === -2 && setdetailtipedataadd(res2.data);
          dataApiadd.type_id === -4 && setdetailtipedataadd(res2.data.data);
        });
    }
  }, [detailtipeadd, subloctrig]);
  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={/*()=>{console.log(dataApiadd)}*/ onClose}
      buttonOkText={buttonOkText}
      onClick={handleAddRelationshipItem}
    >
      <Spin spinning={loadingadd}>
        <div className="flex flex-col mb-3">
          <div className="flex flex-col mb-3">
            <p className="mb-0">
              Relationship Type <span className="namapart"></span>
            </p>
            <div
              className="w-full border p-2 hover:border-primary100 rounded-sm flex items-center justify-between cursor-pointer"
              onClick={() => {
                setrelationnameddadd((prev) => !prev);
              }}
            >
              <p className="mb-0">{relationnameadd}</p>
              {relationnameddadd ? (
                <UpOutlined rev={""} style={{ color: `rgb(229,231,235)` }} />
              ) : (
                <DownOutlined rev={""} style={{ color: `rgb(229,231,235)` }} />
              )}
            </div>
            {relationnameddadd ? (
              <div className="flex flex-col">
                <div className="flex">
                  <div className="bg-gray-200 font-semibold p-3 w-6/12">
                    Relationship Type
                  </div>
                  <div className="bg-gray-200 font-semibold p-3 w-6/12">
                    Inverse Relationship Type
                  </div>
                </div>
                {displaydatarelations.map((doc, idx) => {
                  return (
                    <div className="flex">
                      <div
                        className={` hover:bg-primary10 cursor-pointer hover:text-black p-3 w-6/12 ${
                          relationselectedidxadd === idx &&
                          relationselectedisinverseadd === false
                            ? " bg-primary50"
                            : "bg-white"
                        }`}
                        onClick={(e) => {
                          setrelationnameddadd(false);
                          setrelationnameadd(doc.relationship_type);
                          setdataApiadd({
                            ...dataApiadd,
                            relationship_id: doc.id,
                            is_inverse: false,
                          });
                          doc.id === null || dataApiadd.type_id === null
                            ? setdisabledadd(true)
                            : setdisabledadd(false);
                          setrelationselectedidxadd(idx);
                          setrelationselectedisinverseadd(false);
                        }}
                      >
                        {doc.relationship_type}
                      </div>
                      <div
                        className={` hover:bg-primary10 cursor-pointer hover:text-black p-3 w-6/12 ${
                          relationselectedidxadd === idx &&
                          relationselectedisinverseadd === true
                            ? " bg-primary50"
                            : "bg-white"
                        }`}
                        onClick={(e) => {
                          setrelationnameddadd(false);
                          setrelationnameadd(doc.inverse_relationship_type);
                          setdataApiadd({
                            ...dataApiadd,
                            relationship_id: doc.id,
                            is_inverse: true,
                          });
                          doc.id === null || dataApiadd.type_id === null
                            ? setdisabledadd(true)
                            : setdisabledadd(false);
                          setrelationselectedidxadd(idx);
                          setrelationselectedisinverseadd(true);
                        }}
                      >
                        {doc.inverse_relationship_type}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <style jsx>
              {`
                                .namapart::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
            </style>
          </div>
          <div className="flex flex-col mb-3">
            <p className="mb-0">
              Tipe <span className="tipepart"></span>
            </p>
            <Select
              value={dataApiadd.type_id}
              onChange={(value) => {
                setdataApiadd({ ...dataApiadd, type_id: value });
                dataApiadd.relationship_id === null || value === null
                  ? setdisabledadd(true)
                  : setdisabledadd(false);
                setdetailtipeadd(value);
              }}
            >
              <Select.Option value={-1}>Agent</Select.Option>
              <Select.Option value={-2}>Requester</Select.Option>
              <Select.Option value={-3}>Company</Select.Option>
              <Select.Option value={-4}>Asset Type</Select.Option>
            </Select>
            <style jsx>
              {`
                                .tipepart::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
            </style>
          </div>
          {dataApiadd.type_id !== null ? (
            <>
              {dataApiadd.type_id === -1 && (
                <div className="flex flex-col mb-3">
                  <p className="mb-0">Detail Tipe</p>
                  <Select
                    value={dataApiadd.connected_ids}
                    mode="multiple"
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
                        }/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&name=${
                          value !== "" ? value : ""
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
                          setdetailtipedataadd(res2.data);
                          setfetchingmodel(false);
                        });
                    }}
                    filterOption={(input, opt) =>
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    onChange={(value) => {
                      setdataApiadd({
                        ...dataApiadd,
                        connected_ids: value,
                        backup_connected_ids: value,
                      });
                    }}
                  >
                    {detailtipedataadd.map((doc, idx) => {
                      return (
                        <Select.Option value={doc.id}>{doc.name}</Select.Option>
                      );
                    })}
                  </Select>
                </div>
              )}
              {dataApiadd.type_id === -2 && (
                <div className="flex flex-col mb-3">
                  <p className="mb-0">Detail Tipe</p>
                  <Select
                    value={dataApiadd.connected_ids}
                    mode="multiple"
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
                        }/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&name=${
                          value !== "" ? value : ""
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
                          setdetailtipedataadd(res2.data);
                          setfetchingmodel(false);
                        });
                    }}
                    filterOption={(input, opt) =>
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    onChange={(value) => {
                      setdataApiadd({
                        ...dataApiadd,
                        connected_ids: value,
                        backup_connected_ids: value,
                      });
                    }}
                  >
                    {detailtipedataadd.map((doc, idx) => {
                      return (
                        <Select.Option value={doc.id}>{doc.name}</Select.Option>
                      );
                    })}
                  </Select>
                </div>
              )}
              {dataApiadd.type_id === -3 && (
                <div className="flex flex-col mb-3">
                  <p className="mb-0">Detail Tipe</p>
                  <TreeSelect
                    value={
                      dataApiadd.backup_connected_ids === null
                        ? null
                        : dataApiadd.backup_connected_ids[0]
                    }
                    treeDefaultExpandedKeys={[1]}
                    treeData={detailtipedataadd}
                    onChange={(value, label, extra) => {
                      setdataApiadd({
                        ...dataApiadd,
                        connected_ids: [value],
                        backup_connected_ids: [value],
                      });
                      setsubloctrig(value);
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
                  ></TreeSelect>
                </div>
              )}
              {dataApiadd.type_id === -4 && (
                <div className="flex flex-col mb-3">
                  <p className="mb-0">Detail Tipe</p>
                  <Select
                    placeholder="Cari dengan Model ID"
                    value={dataApiadd.connected_ids}
                    mode="multiple"
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
                        }/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&model_id=${
                          value !== "" ? value : ""
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
                          setdetailtipedataadd(res2.data);
                          setfetchingmodel(false);
                        });
                    }}
                    filterOption={(input, opt) =>
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    onChange={(value) => {
                      setdataApiadd({
                        ...dataApiadd,
                        connected_ids: value,
                        backup_connected_ids: value,
                      });
                    }}
                  >
                    {detailtipedataadd.map((doc, idx) => {
                      return (
                        <Select.Option value={doc.id}>
                          {doc.mig_id}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              )}
            </>
          ) : null}
          {sublocdata !== null && (
            <div className="flex flex-col mb-3">
              <p className="mb-0">Detail Tipe (Sublokasi)</p>
              <TreeSelect
                multiple
                allowClear
                treeData={sublocdata}
                onChange={(value, label, extra) => {
                  if (value.length === 0) {
                    setdataApiadd({
                      ...dataApiadd,
                      connected_ids: dataApiadd.backup_connected_ids,
                    });
                  } else {
                    setdataApiadd({ ...dataApiadd, connected_ids: value });
                  }
                }}
                showSearch
                treeNodeFilterProp="title"
                filterTreeNode={(search, item) => {
                  /** `showSearch`, `filterTreeNode`, and `treeNodeFilterProp` */
                  /** @see https://stackoverflow.com/questions/58499570/search-ant-design-tree-select-by-title */
                  return (
                    item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
                  );
                }}
              ></TreeSelect>
            </div>
          )}
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerUpdateRelasi;
