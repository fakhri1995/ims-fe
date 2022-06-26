import { SearchOutlined } from "@ant-design/icons";
import { Modal, Select, Spin, TreeSelect, notification } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { TASK_SEND_INVENTORIES, TASK_SPARE_PART_LIST_GET } from "lib/features";

import ButtonSys from "../../button";
import { AssetIconSvg, TrashIconSvg } from "../../icon";
import { H2, Label } from "../../typography";
import DrawerCore from "../drawerCore";

function recursiveInventoryList(dataa, checkListIds) {
  for (var i = 0; i < dataa.length; i++) {
    // MIG_ID - MODEL_NAME - ASSET_NAME
    const displayFormat = `${dataa[i].mig_id} - ${dataa[i].model_inventory?.name} - ${dataa[i].model_inventory?.asset?.name}`;
    const inventoryId = dataa[i].id;

    if (checkListIds.includes(inventoryId)) {
      dataa.splice(i, 1);
      recursiveInventoryList(dataa, checkListIds);
      continue;
    }

    dataa[i]["key"] = inventoryId;
    dataa[i]["value"] = inventoryId;
    dataa[i]["title"] = displayFormat;

    if (dataa[i].inventory_parts) {
      dataa[i]["children"] = dataa[i].inventory_parts;
      delete dataa[i].inventory_parts;
      recursiveInventoryList(dataa[i].children, checkListIds);
    }
  }
  return dataa;
}

function parentIdsToMap(dataa, parentId = null, parentIds = {}) {
  for (var i = 0; i < dataa.length; i++) {
    // MIG_ID - MODEL_NAME - ASSET_NAME
    const inventoryId = dataa[i].id;

    if (parentId) {
      parentIds[inventoryId] = parentId;
    }

    if (dataa[i].inventory_parts) {
      dataa[i]["children"] = dataa[i].inventory_parts;
      delete dataa[i].inventory_parts;
      parentIdsToMap(dataa[i].children, inventoryId, parentIds);
    }
  }
  return dataa;
}

/**
 * Function to check and find conflicted inventories (out with in).
 *
 * It returns an array where its element shape follows `selectedForIn`'s element shape.
 *
 * The object may contain `id` or `value` attribute.
 * - `id` -> existing inventory, thus you need to update payload `remove_in_inventory_ids` and `add_in_inventories`
 * - `value` -> new inventory, only `add_in_inventories` since the mutation happens in client-side.
 *
 *
 * @see https://gist.github.com/kennfatt-mig/fe4afe7fa83bc04a794d8f8c51f1320e To test the function with Node
 *
 * @param {number} removedInventoryId
 * @param {*} selectedForIn
 * @param {Map<number, number>} parentIdsMap
 * @param {{ inventory_id: number, connect_id: number }[]} payloadIn
 *
 * @returns {any[]}
 */
function checkForConflictedInventories(
  removedInventoryId = null,
  selectedForIn = [],
  parentIdsMap = {},
  payloadIn = []
) {
  if (removedInventoryId === null) {
    return [];
  }

  return payloadIn
    .filter(({ connect_id }) => {
      const itsParentId = parentIdsMap[connect_id];

      const isConflicted =
        itsParentId !== undefined && itsParentId === removedInventoryId;

      return isConflicted;
    })
    .map(({ inventory_id }) =>
      selectedForIn.find(({ id, value }) => {
        const itsId = id || value;

        const isMatched = itsId === inventory_id;

        return isMatched;
      })
    )
    .filter((model) => !!model);
}

const DrawerTaskSpareParts = ({
  title,
  visible,
  onvisible,
  onClose,
  buttonOkText,
  initProps,
  idtask,
  inventories,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToSendInventories = hasPermission(TASK_SEND_INVENTORIES);
  const isAllowedToGetTaskSparePartList = hasPermission(
    TASK_SPARE_PART_LIST_GET
  );

  const router = useRouter();

  //useState

  // State untuk trigger apakah ada conflict antara spare part out dengan spare part in (atau induknya).
  //
  // Properties
  //  id:         id inventory yang akan dikeluarkan (setelah User klik item pada "Suku Cadang Keluar Tree")
  //  model:      bentuk dari inventory tersebut (bentuk model sama seperti salah satu element pada state `dataselectforout`)
  const [removedInventoryCandidate, setRemovedInventoryCandidate] = useState({
    id: null,
    model: {},
  });
  const [conflictedInventories, setConflictedInventories] = useState([]);
  const [isConflictPromptShown, setIsConflictPromptShown] = useState(false);

  /** @type {[Map<number, number>, Function]} parentIdsMap Key adalah children Id dan Value adalah parent Id-nya */
  const [parentIdsMap, setParentIdsMap] = useState({});
  const [rawInventoryList, setRawInventoryList] = useState([]);

  const [datapayload, setdatapayload] = useState({
    id: Number(idtask),
    add_in_inventories: [],
    remove_in_inventory_ids: [],
    add_out_inventory_ids: [],
    remove_out_inventory_ids: [],
  });

  const [loadingspart, setloadingspart] = useState(false);
  //DATA IN
  const [selectedforin, setselectedforin] = useState([]);
  const [praloadingin, setpraloadingin] = useState(true);
  const [dataselectforin, setdataselectforin] = useState([]); // display
  const [datainduk, setdatainduk] = useState([]); // display

  const [dataIndukCheckListIds, setDataIndukCheckListIds] = useState([]);

  useEffect(() => {
    const connectIds = datapayload.add_in_inventories
      .map(({ connect_id }) => connect_id)
      .filter((id) => id !== 0);

    setOutCheckListIds([...new Set(connectIds)]);
  }, [datapayload.add_in_inventories]);

  useEffect(() => {
    if (!visible || rawInventoryList.length === 0) {
      return;
    }

    const filteredDataInduk = recursiveInventoryList(
      JSON.parse(JSON.stringify(rawInventoryList)),
      dataIndukCheckListIds
    );

    setdatainduk(filteredDataInduk);
  }, [visible, rawInventoryList, dataIndukCheckListIds]);

  //DATA OUT
  const [outCheckListIds, setOutCheckListIds] = useState([]);
  const [selectedforout, setselectedforout] = useState([]);
  const [praloadingout, setpraloadingout] = useState(true);
  const [dataselectforout, setdataselectforout] = useState([]); // display

  useEffect(() => {
    setDataIndukCheckListIds([
      ...new Set(selectedforout.map(({ id, value }) => id || value)),
    ]);
  }, [selectedforout]);

  useEffect(() => {
    if (!visible || rawInventoryList.length === 0) {
      return;
    }

    const filteredDataInduk = recursiveInventoryList(
      JSON.parse(JSON.stringify(rawInventoryList)),
      outCheckListIds
    );
    setdataselectforout(filteredDataInduk);
  }, [visible, rawInventoryList, outCheckListIds]);

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

  const resetRemovedInventoryCandidate = () => {
    setRemovedInventoryCandidate({
      id: null,
      model: {},
    });
  };

  const resetConflictedInventoriesQueue = () => {
    setConflictedInventories([]);
  };

  // Conflict ketika prompt (modal) conflict suku cadang keluar di-close / batalkan
  const discardConflictedInventoriesPrompt = () => {
    // Flow:
    // 1. Remove candidate's id from `dataIndukCheckListIds` state
    // 2. Remove candidate's id from `selectedforout` state
    // 3. Remove candidate's id from `datapayload.add_out_inventory_ids`
    // 4. Reset conflicted inventories queue
    // 5. Reset removed inventory candidate state
    // 6. Close the modal
    const candidateId = removedInventoryCandidate.id;

    setDataIndukCheckListIds((prev) => prev.filter((id) => id !== candidateId));

    setselectedforout((prev) => {
      return prev.filter(({ id, value }) => {
        const itsId = id || value;

        return itsId !== candidateId;
      });
    });

    setdatapayload((prev) => ({
      ...prev,
      add_out_inventory_ids: prev.add_out_inventory_ids.filter(
        (id) => id !== candidateId
      ),
    }));

    resetConflictedInventoriesQueue();
    resetRemovedInventoryCandidate();

    setIsConflictPromptShown(false);
  };

  // Callback setelah user click prompt untuk mengeluarkan suku cadang yang conflict
  const commitConflictedInventoriesPrompt = () => {
    // Flow:
    // 1. Remove all conflicted inventory ids from `selectedforin` state
    //      AND flag id yang sudah sync dengan backend sehingga perlu di kirim ke dalam payload
    //          cara membedakannya: "id" in `selectedforin[n]` || id !== undefined
    // 2. Remove all conflicted ids from `datapayload.add_in_inventories`
    //      AND add flagged ids to `datapayload.remove_in_inventory_ids` (make sure no duplicate id)
    // 3. Reset conflicted inventories queue
    // 4. Reset removed inventory candidate state
    // 5. Close the modal
    const { conflictedInventoryIds, removeFromInIds } =
      conflictedInventories.reduce(
        (prev, { id, value }) => {
          const itsId = id || value;
          const shouldSync = id !== undefined;

          prev.conflictedInventoryIds.push(itsId);

          if (shouldSync) {
            prev.removeFromInIds.push(itsId);
          }

          return prev;
        },
        { conflictedInventoryIds: [], removeFromInIds: [] }
      );

    setselectedforin((prev) =>
      prev.filter(({ id, value }) => {
        const itsId = id || value;

        return !conflictedInventoryIds.includes(itsId);
      })
    );

    setdatapayload((prev) => ({
      ...prev,
      add_in_inventories: prev.add_in_inventories.filter(
        ({ inventory_id }) => !conflictedInventoryIds.includes(inventory_id)
      ),
      remove_in_inventory_ids: [
        ...new Set([...prev.remove_in_inventory_ids, ...removeFromInIds]),
      ],
    }));

    resetConflictedInventoriesQueue();
    resetRemovedInventoryCandidate();

    setIsConflictPromptShown(false);
  };

  //useEffect
  useEffect(() => {
    // Effect untuk scan apakah ada conflict antara suku cadang keluar dengan suku cadang masuk saat ini
    // terjadi setiapkali User memilih "Suku Cadang Keluar" tree node.
    const inventoryId = removedInventoryCandidate.id;
    if (typeof inventoryId !== "number") {
      return;
    }

    const possibleConflictedInventories = checkForConflictedInventories(
      inventoryId,
      selectedforin,
      parentIdsMap,
      datapayload.add_in_inventories
    );

    if (possibleConflictedInventories.length === 0) {
      resetRemovedInventoryCandidate();
      return;
    }

    setConflictedInventories(possibleConflictedInventories);
    setIsConflictPromptShown(true);
  }, [
    removedInventoryCandidate.id,
    selectedforin,
    parentIdsMap,
    datapayload.add_in_inventories,
  ]);

  useEffect(() => {
    // Effect untuk mapping `inventory_list` dari parent component
    //  menjadi state `selectedforin` dan `selectedforout` pada component ini.
    //  DAN persist setiap `selectedforin` dengan payload.
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

    let existingAddInInventories = [];

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

          existingAddInInventories.push({
            inventory_id: doc.id,
            connect_id: doc.connect_id,
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

    // reset the payload right after opening up the drawer
    // it's necessary to keep the `add_in_inventories` persistent based on current inventories data.
    setdatapayload((prev) => ({
      ...prev,
      add_in_inventories: existingAddInInventories,
      add_out_inventory_ids: [],
      remove_in_inventory_ids: [],
      remove_out_inventory_ids: [],
    }));

    setselectedforin(tempin);
    setselectedforout(tempout);
  }, [inventories, visible]);

  useEffect(() => {
    // Effect untuk check list suku cadang keluar
    if (!visible || !isAllowedToGetTaskSparePartList) {
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
        setOutCheckListIds(res2.data.check_list?.map(({ id }) => id) || []);

        setpraloadingin(false);
      });
  }, [visible, isAllowedToGetTaskSparePartList]);

  useEffect(() => {
    // Effect untuk fetch data dan store them sebagai data source untuk "Pilih Induk" dan "Suku Cadang Keluar" tree select component.
    //  DAN scan (recursively) tree data untuk map children-parent id
    if (!visible || !isAllowedToGetTaskSparePartList) {
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
        setRawInventoryList(res2.data.inventory_list);

        const parentIdsMap = {};
        parentIdsToMap(
          JSON.parse(JSON.stringify(res2.data.inventory_list)),
          null,
          parentIdsMap
        ); // mutation by reference
        setParentIdsMap(parentIdsMap);

        setpraloadingout(false);
      });
  }, [visible, isAllowedToGetTaskSparePartList]);

  return (
    <>
      <DrawerCore
        title={title}
        visible={visible}
        onClose={onClose}
        disabled={!isAllowedToSendInventories}
        buttonOkText={buttonOkText}
        onClick={() => {
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
                      disabled={!isAllowedToGetTaskSparePartList}
                      name={`part_in`}
                      onChange={(value, option) => {
                        const isValueInserted = datapayload.add_in_inventories
                          .map(({ inventory_id }) => inventory_id)
                          .includes(value);

                        if (isValueInserted) {
                          return;
                        }

                        setdatapayload({
                          ...datapayload,
                          add_in_inventories: [
                            ...datapayload.add_in_inventories,
                            { inventory_id: value, connect_id: 0 },
                          ],
                        });
                        setselectedforin([...selectedforin, option]);
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
                      <div
                        className=" mb-2 flex items-center justify-between"
                        key={doc.id || doc.value || idx}
                      >
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
                              // setdatapayload((prev) => ({
                              //   ...prev,
                              //   remove_in_inventory_ids: [
                              //     ...prev.remove_in_inventory_ids,
                              //     doc.id,
                              //   ],
                              //   add_in_inventories:
                              //     prev.add_in_inventories.filter(
                              //       (fil) => fil.inventory_id !== doc.id
                              //     ),
                              // }));

                              doc.id
                                ? setdatapayload((prev) => ({
                                    ...prev,
                                    remove_in_inventory_ids: [
                                      ...prev.remove_in_inventory_ids,
                                      doc.id,
                                    ],
                                    add_in_inventories:
                                      prev.add_in_inventories.filter(
                                        (fil) => fil.inventory_id !== doc.id
                                      ),
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
                        setRemovedInventoryCandidate({
                          id: value,
                          model: extra.triggerNode.props,
                        });

                        const isValueInserted = selectedforout
                          .map(({ id, value }) => id || value)
                          .includes(value);

                        if (isValueInserted) {
                          return;
                        }

                        setselectedforout([
                          ...selectedforout,
                          {
                            value: extra.allCheckedNodes[0].node.props.value,
                            migid: extra.allCheckedNodes[0].node.props.mig_id,
                            modelname:
                              extra.allCheckedNodes[0].node.props
                                .model_inventory?.name,
                            assetname:
                              extra.allCheckedNodes[0].node.props
                                .model_inventory?.asset?.name,
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
                      <div
                        className=" mb-2 flex items-center justify-between"
                        key={doc.id || doc.value || idx}
                      >
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

      <Modal
        visible={isConflictPromptShown}
        title="Pergantian Suku Cadang Keluar"
        closable
        destroyOnClose
        onCancel={discardConflictedInventoriesPrompt}
        footer={
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              onClick={discardConflictedInventoriesPrompt}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys
              type="primary"
              color="danger"
              onClick={commitConflictedInventoriesPrompt}
            >
              Ya, saya yakin dan keluarkan suku cadang
            </ButtonSys>
          </div>
        }
      >
        <div className="flex flex-col space-y-6">
          <p>
            Anda akan mengeluarkan suku cadang{" "}
            <strong>
              {removedInventoryCandidate.model?.model_inventory?.name ||
                "Unknown"}
            </strong>{" "}
            dan beberapa suku cadang di bawah ini:
          </p>

          <ul>
            {conflictedInventories.map(({ model_name, modelname }, index) => (
              <li key={index}>
                <strong>
                  {++index}. {model_name || modelname || "Uknown"}
                </strong>
              </li>
            ))}
          </ul>

          <p>
            Apakah Anda yakin untuk mengeluarkan suku cadang{" "}
            <strong>
              {removedInventoryCandidate.model?.model_inventory?.name ||
                "Unknown"}
            </strong>
            ?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default DrawerTaskSpareParts;
