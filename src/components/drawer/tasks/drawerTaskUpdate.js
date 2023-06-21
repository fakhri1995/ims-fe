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

import { useAccessControl } from "contexts/access-control";

import { DATE_MOMENT_FORMAT_PAYLOAD } from "lib/constants";
import {
  COMPANY_LISTS_GET,
  COMPANY_SUB_LOCATIONS_GET,
  GROUPS_GET,
  INVENTORIES_GET,
  TASK_TYPES_GET,
  TASK_UPDATE,
  TICKETS_GET,
  USERS_GET,
} from "lib/features";
import { generateStaticAssetUrl, isValidDate } from "lib/helper";

import ButtonSys from "../../button";
import {
  AssetIconSvg,
  CalendartimeIconSvg,
  CircleXIconSvg,
  UserIconSvg,
} from "../../icon";
import { InputRequired, TextAreaNotRequired } from "../../input";
import { H1, H2, Label } from "../../typography";
import DrawerCore from "../drawerCore";

function recursiveModifData(dataa) {
  for (var i = 0; i < dataa.length; i++) {
    dataa[i]["key"] = dataa[i].id;
    dataa[i]["value"] = dataa[i].id;
    dataa[i]["title"] = dataa[i].name;
    if (dataa[i].children) {
      recursiveModifData(dataa[i].children);
    }
  }
  return dataa;
}

const DrawerTaskUpdate = ({
  title,
  visible,
  onvisible,
  onClose,
  buttonOkText,
  disabled,
  initProps,
  dataupdate,
  setdataupdate,
  loading,
  selecteditems,
  setselecteditems,
  selectedstaffgroup,
  setselectedstaffgroup,
  switchstaffgroup,
  setswitchstaffgroup,
  now,
  setnow,
  choosedate,
  setchoosedate,
  nowend,
  setnowend,
  choosedateend,
  setchoosedateend,
  repeatable,
  setrepeatable,
  regular,
  setregular,
  choosedateendrepeat,
  setchoosedateendrepeat,
  prevpath,
  idsubloc,
  setidsubloc,
  setrefreshdefaultupdatetask,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToUpdateTask = hasPermission(TASK_UPDATE);
  const isAllowedToGetTaskTypes = hasPermission(TASK_TYPES_GET);
  const isAllowedToGetTickets = hasPermission(TICKETS_GET);
  const isAllowedToGetCompanyList = hasPermission(COMPANY_LISTS_GET);
  const isAllowedToGetSublocations = hasPermission(COMPANY_SUB_LOCATIONS_GET);
  const isAllowedToGetInventories = hasPermission(INVENTORIES_GET);
  const isAllowedToGetUsers = hasPermission(USERS_GET);
  const isAllowedToGetGroups = hasPermission(GROUPS_GET);

  const router = useRouter();

  //USESTATE
  const [loadingupdate, setloadingupdate] = useState(false);
  const [disabledupdate, setdisabledupdate] = useState(true);
  const [disabledtrigger, setdisabledtrigger] = useState(-1);
  //task types
  const [datatasktypes, setdatatasktypes] = useState([]);
  // const [fetchingtasktypes, setfetchingtasktypes] = useState(false);
  //references
  const [datareferences, setdatareferences] = useState([]);
  const [fetchingreferences, setfetchingreferences] = useState(false);
  //locations
  const [datalocations, setdatalocations] = useState([]);
  const [datasublocs, setdatasublocs] = useState([]);
  // const [fetchinglocations, setfetchinglocations] = useState(false);
  const [triggersubloc, settriggersubloc] = useState(-1);
  // const [selectedsubloc, setselectedsubloc] = useState(null);
  //items
  const [dataitems, setdataitems] = useState([]);
  const [fetchingitems, setfetchingitems] = useState(false);
  //staff/group
  const [datastaffgroup, setdatastaffgroup] = useState([]);
  const [fetchingstaffgroup, setfetchingstaffgroup] = useState(false);
  //original date (immutable) - fallback value untuk input field Jadwal Mulai dan Jadwal Berakhir
  const [immutableCreatedAt, _] = useState(dataupdate.created_at);
  const [immutableDeadline, __] = useState(dataupdate.deadline);

  //HANDLER
  const handleUpdateTask = () => {
    var finaldata = {
      ...dataupdate,
      location_id:
        dataupdate.subloc_id === null
          ? dataupdate.location_id
          : dataupdate.subloc_id,
    };
    setloadingupdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateTask`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finaldata),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingupdate(false);
        if (res2.success) {
          onvisible(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setdataupdate({
            id: "",
            name: "",
            description: "",
            location_id: null,
            reference_id: null,
            created_at: moment(new Date())
              .locale("id")
              .format(DATE_MOMENT_FORMAT_PAYLOAD),
            deadline: moment(new Date())
              .add(3, "h")
              .locale("id")
              .format(DATE_MOMENT_FORMAT_PAYLOAD),
            is_group: null,
            is_replaceable: false,
            assign_ids: [],
            inventory_ids: [],
            is_uploadable: false,
            repeat: 0,
            files: [],
            end_repeat_at: null,
            subloc_id: null,
          });
          setdataitems([]);
          setdatastaffgroup([]);
          // window.location.href = `/tasks/detail/${dataupdate.id}${
          //   prevpath && `?prevpath=${prevpath}`
          // }`;
          router?.reload();
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  //USEEFFECT
  useEffect(() => {
    //
    // Effect ini akan produce value untuk state `dataupdate.deadline`.
    // Ketika terjadi perubahan input saat Use memilih "Jadwal Mulai"
    //  dan "Jadwal Berakhir".
    //
    // Nilai deadline yang dihasilkan akan menyesuaikan dengan `dataupdate.created_at`.
    //
    if (dataupdate.deadline !== null) {
      // Do not run this effect if deadline was defined.
      return;
    }

    const deadlineRelativeHour = nowend;
    const startDate = dataupdate.created_at;

    const isInitialRender = deadlineRelativeHour === null; // Initial render
    const deadlineHasNotChoosen = deadlineRelativeHour === -10; // Corner case: Jadwal Berakhir has not choosen (and User uses date picker instead)
    const startDateHasNotChoosen = startDate === null; // Jadwal Mulai has not choosen

    if (isInitialRender || deadlineHasNotChoosen || startDateHasNotChoosen) {
      return;
    }

    const startDateMomentInstance = moment(
      startDate,
      DATE_MOMENT_FORMAT_PAYLOAD
    );

    const deadlineRelativeValue = moment(startDateMomentInstance)
      .add(deadlineRelativeHour, "hour")
      .format(DATE_MOMENT_FORMAT_PAYLOAD);

    // Flush state changes
    setdataupdate((prev) => ({
      ...prev,
      deadline: deadlineRelativeValue,
    }));
  }, [nowend, dataupdate.deadline, dataupdate.created_at]);

  //Tipe task
  useEffect(() => {
    if (!isAllowedToGetTaskTypes) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterTaskTypes`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        const modif = recursiveModifData(res2.data);
        setdatatasktypes(modif);
      });
  }, [isAllowedToGetTaskTypes]);

  //Referensi
  useEffect(() => {
    if (!isAllowedToGetTickets) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterTickets`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatareferences(res2.data);
      });
  }, [isAllowedToGetTickets]);

  //Lokasi
  useEffect(() => {
    if (!isAllowedToGetCompanyList) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAllCompanyList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatalocations(res2.data.children);
      });
  }, [isAllowedToGetCompanyList]);

  //Sublokasi
  useEffect(() => {
    if (!isAllowedToGetSublocations) {
      return;
    }

    if (triggersubloc !== -1) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getSubLocations?company_id=${idsubloc}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setdatasublocs(res2.data.children);
        });
    }
  }, [triggersubloc, isAllowedToGetSublocations]);

  //Items
  useEffect(() => {
    if (!isAllowedToGetInventories) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterInventories`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdataitems(res2.data);
      });
  }, [isAllowedToGetInventories]);

  //Staff/group
  useEffect(() => {
    if (switchstaffgroup !== -1) {
      if (switchstaffgroup === 0) {
        if (!isAllowedToGetGroups) {
          return;
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterGroups`, {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        })
          .then((res) => res.json())
          .then((res2) => {
            setdatastaffgroup(res2.data);
          });
      } else if (switchstaffgroup === 1) {
        if (!isAllowedToGetUsers) {
          return;
        }

        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterUsers?type=${1}`,
          {
            method: `GET`,
            headers: {
              Authorization: JSON.parse(initProps),
            },
          }
        )
          .then((res) => res.json())
          .then((res2) => {
            setdatastaffgroup(res2.data);
          });
      }
    }
  }, [switchstaffgroup, isAllowedToGetUsers, isAllowedToGetGroups]);

  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterGroups`, {
  //     method: `GET`,
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       setdatastaffgroup(res2.data);
  //     });
  // }, []);
  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterUsers?type=${1}`, {
  //     method: `GET`,
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       setdatastaffgroup(res2.data);
  //     });
  // }, []);

  useEffect(() => {
    if (
      dataupdate.task_type_id !== null &&
      dataupdate.name !== "" &&
      dataupdate.location_id !== null &&
      dataupdate.created_at !== null &&
      dataupdate.deadline !== null &&
      dataupdate.repeat !== -1
    ) {
      setdisabledupdate(false);
    } else {
      setdisabledupdate(true);
    }
  }, [disabledtrigger, dataupdate.deadline]);

  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        setrefreshdefaultupdatetask((prev) => prev + 1);
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={handleUpdateTask}
      disabled={disabledupdate || !isAllowedToUpdateTask}
    >
      {loading ? (
        <>
          <div id={`card-1`} className=" flex justify-center">
            <Spin />
          </div>
        </>
      ) : (
        <Spin spinning={loadingupdate}>
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="mb-0 text-red-500 text-xs italic">
                *Informasi ini harus diisi
              </p>
            </div>
            <div className="mb-6 flex px-3">
              <div className=" w-6/12 mr-2 flex flex-col">
                <div className="flex mb-2">
                  <Label>Tipe Task</Label>
                  <span className="tasktype"></span>
                  <style jsx>
                    {`
                                        .tasktype::before{
                                            content: '*';
                                            color: red;
                                        }
                                    `}
                  </style>
                </div>
                <Select
                  suffixIcon={<SearchOutlined />}
                  disabled
                  showArrow
                  name={`task_type_id`}
                  value={dataupdate.task_type_id}
                  onChange={(value) => {
                    setdataupdate({ ...dataupdate, task_type_id: value });
                    setdisabledtrigger((prev) => prev + 1);
                  }}
                >
                  {datatasktypes.map((doc, idx) => (
                    <Select.Option key={idx} value={doc.id}>
                      {doc.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="w-6/12 ml-2 flex flex-col justify-center">
                <div className="mb-2 text-center">
                  <Label>No. Task (dibuat otomatis)</Label>
                </div>
                <div className="w-full text-center">
                  <H1>T-000{dataupdate.id}</H1>
                </div>
              </div>
            </div>
            <div id={`card${0}`} className="mb-5 flex flex-col px-3">
              <div className="flex mb-1">
                <Label>Referensi</Label>
                <span className="tasktype"></span>
                <style jsx>
                  {`
                                    .tasktype::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                </style>
              </div>
              <div className="w-full">
                <Select
                  style={{ width: `100%` }}
                  suffixIcon={<SearchOutlined />}
                  showArrow
                  value={dataupdate.reference_id}
                  placeholder="Referensi"
                  disabled={!isAllowedToGetTickets}
                  name={`reference_id`}
                  onChange={(value) => {
                    setdataupdate({ ...dataupdate, reference_id: value });
                  }}
                  showSearch
                  optionFilterProp="children"
                  notFoundContent={
                    fetchingreferences ? <Spin size="small" /> : null
                  }
                  onSearch={(value) => {
                    setfetchingreferences(true);
                    fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterTickets?id=${value}`,
                      {
                        method: `GET`,
                        headers: {
                          Authorization: JSON.parse(initProps),
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((res2) => {
                        setdatareferences(res2.data);
                        setfetchingreferences(false);
                      });
                  }}
                  filterOption={(input, opt) =>
                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {datareferences.map((doc, idx) => (
                    <Select.Option key={idx} value={doc.id}>
                      {doc.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <div id={`card${1}`}>
              <InputRequired
                value={dataupdate.name}
                label={`Judul Task`}
                onChangeInput={(e) => {
                  setdataupdate({ ...dataupdate, name: e.target.value });
                  setdisabledtrigger((prev) => prev + 1);
                }}
              ></InputRequired>
            </div>
            <div id={`card${2}`}>
              <TextAreaNotRequired
                value={dataupdate.description}
                rows={4}
                label={`Deskripsi Task`}
                onChangeInput={(e) => {
                  setdataupdate({ ...dataupdate, description: e.target.value });
                }}
              ></TextAreaNotRequired>
            </div>
            <div id={`card${3}`} className="mb-6 px-3 flex flex-col">
              <div className="flex mb-2">
                <Label>Lokasi</Label>
                <span className="locations"></span>
                <style jsx>
                  {`
                                    .locations::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                </style>
              </div>
              <TreeSelect
                allowClear
                placeholder="Cari Lokasi"
                disabled={!isAllowedToGetCompanyList}
                showSearch
                suffixIcon={<SearchOutlined />}
                showArrow
                name={`locations_id`}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setdataupdate({
                        ...dataupdate,
                        location_id: null,
                        subloc_id: null,
                      })
                    : (setdataupdate({ ...dataupdate, location_id: value }),
                      setidsubloc(value),
                      settriggersubloc((prev) => prev + 1));
                  setdisabledtrigger((prev) => prev + 1);
                }}
                treeData={datalocations}
                treeDefaultExpandAll
                value={dataupdate.location_id}
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
            {dataupdate.location_id !== null ? (
              <div id={`card${4}`} className="mb-6 px-3 flex flex-col">
                <div className="flex mb-2">
                  <Label>Sublokasi</Label>
                </div>
                <TreeSelect
                  allowClear
                  placeholder="Cari Sublokasi"
                  disabled={!isAllowedToGetSublocations}
                  showSearch
                  suffixIcon={<SearchOutlined />}
                  showArrow
                  name={`locations_id`}
                  onChange={(value) => {
                    typeof value === "undefined"
                      ? setdataupdate({ ...dataupdate, subloc_id: null })
                      : setdataupdate({ ...dataupdate, subloc_id: value });
                  }}
                  treeData={datasublocs}
                  treeDefaultExpandAll
                  value={dataupdate.subloc_id}
                ></TreeSelect>
              </div>
            ) : null}
            <div
              id={`card${4}`}
              className="mb-6 px-3 flex justify-between items-center"
            >
              <div>
                <Label>Pergantian Suku Cadang</Label>
              </div>
              <div>
                <Switch
                  checked={dataupdate.is_replaceable}
                  onChange={(checked) => {
                    setdataupdate({ ...dataupdate, is_replaceable: checked });
                  }}
                ></Switch>
              </div>
            </div>
            <div id={`card${5}`} className="mb-6 px-3 flex flex-col">
              <div className="mb-2">
                <Label>Aset</Label>
              </div>
              <div className="mb-2">
                <Select
                  style={{ width: `100%` }}
                  className="dontShow"
                  mode="multiple"
                  suffixIcon={<SearchOutlined />}
                  showArrow
                  value={dataupdate.inventory_ids}
                  placeholder="Cari MIG ID, Nama Model, Nama Aset"
                  disabled={!isAllowedToGetInventories}
                  name={`inventory_ids`}
                  onChange={(values, options) => {
                    setdataupdate({ ...dataupdate, inventory_ids: values });
                    setselecteditems(options);
                  }}
                  showSearch
                  optionFilterProp="children"
                  notFoundContent={fetchingitems ? <Spin size="small" /> : null}
                  onSearch={(value) => {
                    setfetchingitems(true);
                    fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterInventories?keyword=${value}`,
                      {
                        method: `GET`,
                        headers: {
                          Authorization: JSON.parse(initProps),
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((res2) => {
                        setdataitems(res2.data);
                        setfetchingitems(false);
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
                  {dataitems.map((doc, idx) => (
                    <Select.Option
                      key={idx}
                      migid={doc.mig_id}
                      modelname={doc.model_name}
                      assetname={doc.asset_name}
                      value={doc.id}
                    >
                      {doc.mig_id} - {doc.model_name} - {doc.asset_name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              {selecteditems.map((doc, idx) => (
                <div className="mb-2 flex items-center" key={idx}>
                  <div className="mr-2 flex items-center">
                    <AssetIconSvg size={50} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="mb-1 flex">
                      <div className="mr-1">
                        <H2>{doc.modelname}</H2>
                      </div>
                      <div
                        className=" cursor-pointer"
                        onClick={() => {
                          var temp = [...selecteditems];
                          temp.splice(idx, 1);
                          setselecteditems(temp);
                          setdataupdate((prev) => ({
                            ...prev,
                            inventory_ids: temp.map((docmap) => docmap.id),
                          }));
                        }}
                      >
                        <CircleXIconSvg size={15} color={`#BF4A40`} />
                      </div>
                    </div>
                    <div>
                      <Label>
                        {doc.migid} / {doc.assetname}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div id={`card${6}`} className="mb-6 px-3 flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <Label>{switchstaffgroup === 0 ? `Group` : `Staff`}</Label>
                </div>
                <div className="flex items-center">
                  <div className="mr-1">
                    <Label>Staff</Label>
                  </div>
                  <div className="mx-1">
                    <Switch
                      defaultChecked={dataupdate.is_group}
                      onChange={(checked) => {
                        setswitchstaffgroup(checked ? 0 : 1);
                        setdataupdate({
                          ...dataupdate,
                          is_group: checked,
                          assign_ids: [],
                        });
                        setselectedstaffgroup([]);
                      }}
                    ></Switch>
                  </div>
                  <div className="ml-1">
                    <Label>Group</Label>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                {switchstaffgroup === 1 ? (
                  <Select
                    style={{ width: `100%` }}
                    className="dontShow"
                    mode="multiple"
                    suffixIcon={<SearchOutlined />}
                    showArrow
                    value={dataupdate.assign_ids}
                    placeholder="Cari Nama Staff, Group.."
                    disabled={!isAllowedToGetUsers}
                    name={`assign_ids`}
                    onChange={(values, options) => {
                      setdataupdate({ ...dataupdate, assign_ids: values });
                      setselectedstaffgroup(options);
                    }}
                    showSearch
                    optionFilterProp="children"
                    notFoundContent={
                      fetchingstaffgroup ? <Spin size="small" /> : null
                    }
                    onSearch={(value) => {
                      setfetchingstaffgroup(true);
                      fetch(
                        `${
                          process.env.NEXT_PUBLIC_BACKEND_URL
                        }/getFilterUsers?type=${1}&name=${value}`,
                        {
                          method: `GET`,
                          headers: {
                            Authorization: JSON.parse(initProps),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((res2) => {
                          setdatastaffgroup(res2.data);
                          setfetchingstaffgroup(false);
                        });
                    }}
                    filterOption={(input, opt) =>
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                  >
                    {datastaffgroup.map((doc, idx) => (
                      <Select.Option
                        key={idx}
                        value={doc.id}
                        position={doc.position}
                        image={generateStaticAssetUrl(doc.profile_image?.link)}
                      >
                        {doc.name}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Select
                    style={{ width: `100%` }}
                    className="dontShow"
                    suffixIcon={<SearchOutlined />}
                    showArrow
                    value={[dataupdate.assign_ids]}
                    placeholder="Cari Nama Staff, Group.."
                    disabled={!isAllowedToGetGroups}
                    name={`assign_ids`}
                    onChange={(value, option) => {
                      setdataupdate({ ...dataupdate, assign_ids: [value] });
                      setselectedstaffgroup([option]);
                    }}
                    showSearch
                    optionFilterProp="children"
                    notFoundContent={
                      fetchingstaffgroup ? <Spin size="small" /> : null
                    }
                    onSearch={(value) => {
                      setfetchingstaffgroup(true);
                      fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterGroups?name=${value}`,
                        {
                          method: `GET`,
                          headers: {
                            Authorization: JSON.parse(initProps),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((res2) => {
                          setdatastaffgroup(res2.data);
                          setfetchingstaffgroup(false);
                        });
                    }}
                    filterOption={(input, opt) =>
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                  >
                    {datastaffgroup.map((doc, idx) => (
                      <Select.Option key={idx} value={doc.id}>
                        {doc.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </div>
              {selectedstaffgroup.map((doc, idx) => (
                <div className="mb-2 flex items-center" key={idx}>
                  <div className="mr-2 flex items-center">
                    {switchstaffgroup === 1 ? (
                      <div className=" w-10 h-10 rounded-full">
                        <img
                          src={
                            doc.image === "" || doc.image === "-"
                              ? "/image/staffTask.png"
                              : `${doc.image}`
                          }
                          className="w-10 h-10 bg-cover object-cover rounded-full"
                          alt=""
                        />
                      </div>
                    ) : (
                      <UserIconSvg />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="mb-1 flex">
                      <div className="mr-1">
                        <H2>{doc.children}</H2>
                      </div>
                      <div
                        className=" cursor-pointer"
                        onClick={() => {
                          var temp = [...selectedstaffgroup];
                          temp.splice(idx, 1);
                          setselectedstaffgroup(temp);
                          setdataupdate((prev) => ({
                            ...prev,
                            assign_ids: temp.map(
                              (docmap) => docmap.value || docmap.id
                            ), // shape dari docmap bisa berubah. .value dan .id adalah nilai yang sama
                          }));
                        }}
                      >
                        <CircleXIconSvg size={15} color={`#BF4A40`} />
                      </div>
                    </div>
                    <div>
                      <Label>
                        {switchstaffgroup === 0 ? `` : `${doc.position}`}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div id={`card${7}`} className="mb-6 px-3 flex flex-col">
              <div className=" flex mb-2">
                <Label>Jadwal Mulai</Label>
                <span className="jadwal"></span>
                <style jsx>
                  {`
                                    .jadwal::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                </style>
              </div>
              <div className="mb-2">
                <Radio.Group
                  name={`created_at`}
                  onChange={(e) => {
                    setnow(e.target.value);
                    setdataupdate({
                      ...dataupdate,
                      created_at:
                        e.target.value === true
                          ? moment(new Date())
                              .locale("id")
                              .format(DATE_MOMENT_FORMAT_PAYLOAD)
                          : immutableCreatedAt || undefined,
                    });
                    e.target.value === true ? setchoosedate(false) : null;
                    setdisabledtrigger((prev) => prev + 1);
                  }}
                  defaultValue={now}
                >
                  <div className="flex flex-col">
                    <div className="mb-1">
                      <Radio value={true}>Saat Ini</Radio>
                    </div>
                    <div className="mb-1">
                      <Radio value={false}>Tanggal Lain</Radio>
                    </div>
                  </div>
                </Radio.Group>
              </div>
              <div className="pl-4 flex flex-col">
                <div className="mb-2">
                  <ButtonSys
                    type={`primary`}
                    disabled={now === false ? false : true}
                    onClick={() => {
                      setchoosedate(true);
                    }}
                  >
                    <CalendartimeIconSvg size={15} color={`#ffffff`} />
                    Pilih Tanggal
                  </ButtonSys>
                </div>
                {choosedate && (
                  <div>
                    <DatePicker
                      showTime
                      format={DATE_MOMENT_FORMAT_PAYLOAD}
                      placeholder="Jadwal Mulai"
                      style={{ width: `100%` }}
                      value={
                        dataupdate.created_at !== null
                          ? moment(dataupdate.created_at)
                          : moment(immutableCreatedAt)
                      }
                      onChange={(date, datestring) => {
                        setdataupdate({
                          ...dataupdate,
                          created_at: datestring,
                        });
                        setdisabledtrigger((prev) => prev + 1);
                      }}
                    ></DatePicker>
                  </div>
                )}
              </div>
            </div>
            <div id={`card${8}`} className="mb-6 px-3 flex flex-col">
              <div className=" flex mb-2">
                <Label>Jadwal Berakhir</Label>
                <span className="jadwal"></span>
                <style jsx>
                  {`
                                    .jadwal::before{
                                        content: '*';
                                        color: red;
                                    }
                                `}
                </style>
              </div>
              <div className="mb-2">
                <Radio.Group
                  name={`deadline`}
                  onChange={(e) => {
                    setnowend(e.target.value);
                    // var choisedate = "";
                    // if (e.target.value === 3) {
                    //   choisedate = moment().add(3, "h").locale("id").format();
                    // } else if (e.target.value === 30) {
                    //   choisedate = moment().add(30, "h").locale("id").format();
                    // } else if (e.target.value === 24) {
                    //   choisedate = moment().add(1, "d").locale("id").format();
                    // } else if (e.target.value === 168) {
                    //   choisedate = moment().add(1, "w").locale("id").format();
                    // }
                    // setdataupdate({
                    //   ...dataupdate,
                    //   deadline: e.target.value !== -10 ? choisedate : null,
                    // });
                    setdataupdate({
                      ...dataupdate,
                      deadline: immutableDeadline,
                    });
                    e.target.value !== -10 ? setchoosedateend(false) : null;
                    setdisabledtrigger((prev) => prev + 1);
                  }}
                  defaultValue={nowend}
                >
                  <div className="flex flex-col">
                    <div className="mb-1">
                      <Radio value={3}>3 jam ke depan</Radio>
                    </div>
                    <div className="mb-1">
                      <Radio value={30}>30 jam ke depan</Radio>
                    </div>
                    <div className="mb-1">
                      <Radio value={24}>Besok</Radio>
                    </div>
                    <div className="mb-1">
                      <Radio value={168}>1 minggu ke depan</Radio>
                    </div>
                    <div className="mb-1">
                      <Radio value={-10}>Tanggal Lain</Radio>
                    </div>
                  </div>
                </Radio.Group>
              </div>
              <div className="pl-4 flex flex-col">
                <div className="mb-2">
                  <ButtonSys
                    type={`primary`}
                    disabled={nowend === -10 ? false : true}
                    onClick={() => {
                      setchoosedateend(true);
                    }}
                  >
                    <CalendartimeIconSvg size={15} color={`#ffffff`} />
                    Pilih Tanggal
                  </ButtonSys>
                </div>
                {choosedateend && (
                  <div>
                    <DatePicker
                      showTime
                      format={DATE_MOMENT_FORMAT_PAYLOAD}
                      placeholder="Jadwal Berakhir"
                      style={{ width: `100%` }}
                      value={
                        isValidDate(dataupdate.deadline)
                          ? moment(dataupdate.deadline)
                          : isValidDate(immutableDeadline)
                          ? moment(immutableDeadline)
                          : undefined
                      }
                      // value={
                      //   dataupdate.deadline !== null
                      //     ? moment(dataupdate.deadline)
                      //     : immutableDeadline !== null
                      //     ? moment(immutableDeadline)
                      //     : undefined
                      // }
                      onChange={(date, datestring) => {
                        setdataupdate({ ...dataupdate, deadline: datestring });
                        setdisabledtrigger((prev) => prev + 1);
                      }}
                    ></DatePicker>
                  </div>
                )}
              </div>
            </div>
            <div id={`card${9}`} className="mb-6 px-3 flex flex-col">
              <div className=" flex mb-2 justify-between">
                <div>
                  <Label>Jadwal Berulang</Label>
                </div>
                <div>
                  <Switch
                    checked={repeatable}
                    onChange={(checked) => {
                      setrepeatable(checked);
                      setchoosedateendrepeat(false);
                      checked === false
                        ? setdataupdate({
                            ...dataupdate,
                            repeat: 0,
                            end_repeat_at: null,
                          })
                        : null;
                    }}
                  />
                </div>
              </div>
              {repeatable ? (
                <>
                  <div className=" mb-2">
                    <Select
                      style={{ width: `100%` }}
                      placeholder="Reguler, Setelah Selesai"
                      defaultValue={dataupdate.repeat === 1 ? 1 : -1}
                      onChange={(value) => {
                        setdataupdate({ ...dataupdate, repeat: value });
                        value === -1
                          ? setregular(true)
                          : (setdataupdate({ ...dataupdate, repeat: 1 }),
                            setregular(false));
                        setdisabledtrigger((prev) => prev + 1);
                      }}
                    >
                      <Select.Option value={-1}>Reguler</Select.Option>
                      <Select.Option value={1}>Setelah Selesai</Select.Option>
                    </Select>
                  </div>
                  {regular && (
                    <>
                      <div className="mb-2">
                        <Radio.Group
                          defaultValue={dataupdate.repeat}
                          name={`repeat`}
                          onChange={(e) => {
                            setdataupdate({
                              ...dataupdate,
                              repeat: e.target.value,
                            });
                            setdisabledtrigger((prev) => prev + 1);
                          }}
                          value={
                            dataupdate.repeat < 2 ? null : dataupdate.repeat
                          }
                        >
                          <div className="flex flex-col">
                            <div className="mb-1">
                              <Radio value={2}>Setiap Hari</Radio>
                            </div>
                            <div className="mb-1">
                              <Radio value={3}>Setiap Minggu</Radio>
                            </div>
                            <div className="mb-1">
                              <Radio value={4}>Setiap 2 Minggu</Radio>
                            </div>
                            <div className="mb-1">
                              <Radio value={5}>Setiap Bulan</Radio>
                            </div>
                            <div className="mb-1">
                              <Radio value={6}>Setiap 3 Bulan</Radio>
                            </div>
                            <div className="mb-1">
                              <Radio value={7}>Setiap 4 Bulan</Radio>
                            </div>
                          </div>
                        </Radio.Group>
                      </div>
                    </>
                  )}
                  <div className=" pl-4 mb-2">
                    <Label>Selesai Pada</Label>
                  </div>
                  <div className="pl-4 flex flex-col">
                    <div className="mb-2">
                      <ButtonSys
                        type={`primary`}
                        onClick={() => {
                          setchoosedateendrepeat(true);
                        }}
                      >
                        <CalendartimeIconSvg size={15} color={`#ffffff`} />
                        Pilih Tanggal
                      </ButtonSys>
                    </div>
                    {choosedateendrepeat && (
                      <div>
                        <DatePicker
                          defaultValue={
                            dataupdate.end_repeat_at === null
                              ? null
                              : moment(dataupdate.end_repeat_at)
                          }
                          showTime
                          placeholder="Selesai pada"
                          style={{ width: `100%` }}
                          onChange={(date, datestring) => {
                            setdataupdate({
                              ...dataupdate,
                              end_repeat_at: datestring,
                            });
                          }}
                        ></DatePicker>
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>
            <div id={`card${10}`} className="mb-6 px-3 flex justify-between">
              <div>
                <Label>Unggah Dokumen Pelengkap (PDF, JPG)</Label>
              </div>
              <div>
                <Switch
                  checked={dataupdate.is_uploadable}
                  onChange={(checked) => {
                    setdataupdate({ ...dataupdate, is_uploadable: checked });
                  }}
                />
              </div>
            </div>
          </div>
        </Spin>
      )}
    </DrawerCore>
  );
};

export default DrawerTaskUpdate;
