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

import { useAccessControl } from "contexts/access-control";

import { DATE_MOMENT_FORMAT_PAYLOAD } from "lib/constants";
import {
  COMPANY_LISTS_GET,
  COMPANY_SUB_LOCATIONS_GET,
  GROUPS_GET,
  INVENTORIES_GET,
  TASK_ADD,
  TASK_TYPES_GET,
  TICKETS_GET,
  USERS_GET,
} from "lib/features";
import { generateStaticAssetUrl } from "lib/helper";

import ButtonSys from "../../button";
import {
  AssetIconSvg,
  CalendartimeIconSvg,
  CircleXIconSvg,
  UserIconSvg,
} from "../../icon";
import { InputRequired, TextAreaNotRequired } from "../../input";
import { H2, Label } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerTaskCreate = ({
  title,
  visible,
  onvisible,
  onClose,
  buttonOkText,
  disabled,
  initProps,
  loadingcreate,
  setloadingcreate,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToAddTask = hasPermission(TASK_ADD);
  const isAllowedToGetTaskTypes = hasPermission(TASK_TYPES_GET);
  const isAllowedToGetCompanyList = hasPermission(COMPANY_LISTS_GET);
  const isAllowedToGetCompanySubLocations = hasPermission(
    COMPANY_SUB_LOCATIONS_GET
  );
  const isAllowedToGetInventories = hasPermission(INVENTORIES_GET);
  const isAllowedToGetStaffList = hasPermission(USERS_GET);
  const isAllowedToGetGroups = hasPermission(GROUPS_GET);
  const isAllowedToGetReferensi = hasPermission(TICKETS_GET);

  const canFindStaffOrGroup = isAllowedToGetStaffList || isAllowedToGetGroups;

  const canAddNewTask =
    isAllowedToAddTask && isAllowedToGetTaskTypes && isAllowedToGetCompanyList;

  //USESTATE
  const [datacreate, setdatacreate] = useState({
    name: "",
    description: "",
    task_type_id: null,
    location_id: null,
    reference_id: null,
    created_at: null,
    deadline: null,
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
  const [disabledcreate, setdisabledcreate] = useState(true);
  const [disabledtrigger, setdisabledtrigger] = useState(-1);
  //task types
  const [datatasktypes, setdatatasktypes] = useState([]);
  const [fetchingtasktypes, setfetchingtasktypes] = useState(false);
  //references
  const [datareferences, setdatareferences] = useState([]);
  const [fetchingreferences, setfetchingreferences] = useState(false);
  //locations
  const [datalocations, setdatalocations] = useState([]);
  const [datasublocs, setdatasublocs] = useState([]);
  // const [fetchinglocations, setfetchinglocations] = useState(false);
  const [triggersubloc, settriggersubloc] = useState(-1);
  //items
  const [dataitems, setdataitems] = useState([]);
  const [selecteditems, setselecteditems] = useState([]);
  const [fetchingitems, setfetchingitems] = useState(false);
  //staff/group
  const [datastaffgroup, setdatastaffgroup] = useState([]);
  const [selectedstaffgroup, setselectedstaffgroup] = useState([]);
  const [fetchingstaffgroup, setfetchingstaffgroup] = useState(false);
  const [switchstaffgroup, setswitchstaffgroup] = useState(1);
  //start date
  const [now, setnow] = useState(null);
  const [tempdate, settempdate] = useState("");
  const [choosedate, setchoosedate] = useState(false);
  //end date
  const [nowend, setnowend] = useState(null);
  const [choosedateend, setchoosedateend] = useState(false);
  //repeat date
  const [repeatable, setrepeatable] = useState(false);
  const [regular, setregular] = useState(null);
  const [choosedateendrepeat, setchoosedateendrepeat] = useState(false);

  //HANDLER
  const handleAddTask = () => {
    var finaldata = {
      ...datacreate,
      location_id:
        datacreate.subloc_id === null
          ? datacreate.location_id
          : datacreate.subloc_id,
    };
    setloadingcreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addTask`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finaldata),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingcreate(false);
        if (res2.success) {
          setdatacreate({
            name: "",
            description: "",
            task_type_id: null,
            location_id: null,
            reference_id: null,
            created_at: null,
            deadline: null,
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
          setselecteditems([]);
          setselectedstaffgroup([]);
          setswitchstaffgroup(1);
          setnow(null);
          setnowend(null);
          setrepeatable(false);
          onvisible(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
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
    // Effect ini akan produce value untuk state `datacreate.deadline`.
    // Ketika terjadi perubahan input saat Use memilih "Jadwal Mulai"
    //  dan "Jadwal Berakhir".
    //
    // Nilai deadline yang dihasilkan akan menyesuaikan dengan `datacreate.created_at`.
    //
    if (datacreate.deadline !== null) {
      // Do not run this effect if deadline was defined.
      return;
    }

    const deadlineRelativeHour = nowend;
    const startDate = datacreate.created_at;

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
    setdatacreate((prev) => ({
      ...prev,
      deadline: deadlineRelativeValue,
    }));
  }, [nowend, datacreate.deadline, datacreate.created_at]);

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
        setdatatasktypes(res2.data);
      });
  }, [isAllowedToGetTaskTypes]);

  //Referensi
  useEffect(() => {
    if (!isAllowedToGetReferensi) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterTickets?id=`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatareferences(res2.data);
      });
  }, [isAllowedToGetReferensi]);

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
    if (!isAllowedToGetCompanySubLocations) {
      return;
    }

    if (triggersubloc !== -1) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getSubLocations?company_id=${triggersubloc}`,
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
  }, [triggersubloc, isAllowedToGetCompanySubLocations]);

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

        fetch(
          // `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssignToList?assignable_type=0`,
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterGroups`,
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
      } else if (switchstaffgroup === 1) {
        if (!isAllowedToGetStaffList) {
          return;
        }

        fetch(
          // `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssignToList?assignable_type=1`,
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterUsers?type=1`,
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
  }, [switchstaffgroup, isAllowedToGetGroups, isAllowedToGetStaffList]);

  useEffect(() => {
    if (
      datacreate.task_type_id !== null &&
      datacreate.name !== "" &&
      datacreate.location_id !== null &&
      datacreate.created_at !== null &&
      datacreate.deadline !== null &&
      datacreate.repeat !== -1
    ) {
      setdisabledcreate(false);
    } else {
      setdisabledcreate(true);
    }
  }, [disabledtrigger, datacreate.deadline]);

  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        setdatacreate({
          name: "",
          description: "",
          task_type_id: null,
          location_id: null,
          reference_id: null,
          created_at: null,
          deadline: null,
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
        setselecteditems([]);
        setselectedstaffgroup([]);
        setswitchstaffgroup(1);
        setnow(null);
        setnowend(null);
        setrepeatable(false);
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={handleAddTask}
      disabled={disabledcreate || !canAddNewTask}
    >
      <Spin spinning={loadingcreate}>
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="mb-0 text-red-500 text-xs italic">
              *Informasi ini harus diisi
            </p>
          </div>
          <div className="mb-6 flex flex-col px-3">
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
            <div className="w-full">
              <Select
                style={{ width: `100%` }}
                value={datacreate.task_type_id}
                placeholder="Nama tipe task"
                disabled={!isAllowedToGetTaskTypes}
                showSearch
                optionFilterProp="children"
                notFoundContent={
                  fetchingtasktypes ? <Spin size="small" /> : null
                }
                onSearch={(value) => {
                  setfetchingtasktypes(true);
                  fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterTaskTypes?name=${value}`,
                    {
                      method: `GET`,
                      headers: {
                        Authorization: JSON.parse(initProps),
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((res2) => {
                      setdatatasktypes(res2.data);
                      setfetchingtasktypes(false);
                    });
                }}
                filterOption={(input, opt) =>
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                name={`task_type_id`}
                defaultValue={datacreate.task_type_id}
                onChange={(value) => {
                  setdatacreate({ ...datacreate, task_type_id: value });
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
            {/* <div className='w-6/12 ml-2 flex flex-col'>
                            <div className='mb-2 text-center'>
                                <Label>No. Task (dibuat otomatis)</Label>
                            </div>
                            <div className='w-full text-center'>
                                <H1>T-000089</H1>
                            </div>
                        </div> */}
          </div>
          <div className="mb-5 flex flex-col px-3">
            <div className="flex mb-2">
              <Label>Referensi</Label>
            </div>
            <div className="w-full">
              <Select
                value={datacreate.reference_id}
                style={{ width: `100%` }}
                suffixIcon={<SearchOutlined />}
                showArrow
                placeholder="Referensi"
                disabled={!isAllowedToGetReferensi}
                name={`reference_id`}
                onChange={(value) => {
                  setdatacreate({ ...datacreate, reference_id: value });
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
          <InputRequired
            value={datacreate.name}
            label={`Judul Task`}
            onChangeInput={(e) => {
              setdatacreate({ ...datacreate, name: e.target.value });
              setdisabledtrigger((prev) => prev + 1);
            }}
          ></InputRequired>
          <TextAreaNotRequired
            value={datacreate.description}
            rows={4}
            label={`Deskripsi Task`}
            onChangeInput={(e) => {
              setdatacreate({ ...datacreate, description: e.target.value });
            }}
          ></TextAreaNotRequired>
          <div className="mb-6 px-3 flex flex-col">
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
                  ? setdatacreate({
                      ...datacreate,
                      location_id: null,
                      subloc_id: null,
                    })
                  : (setdatacreate({ ...datacreate, location_id: value }),
                    settriggersubloc(value));
                setdisabledtrigger((prev) => prev + 1);
              }}
              treeData={datalocations}
              treeDefaultExpandAll
              value={datacreate.location_id}
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
          {datacreate.location_id !== null ? (
            <div className="mb-6 px-3 flex flex-col">
              <div className="flex mb-2">
                <Label>Sublokasi</Label>
              </div>
              <TreeSelect
                allowClear
                placeholder="Cari Sublokasi"
                disabled={!isAllowedToGetCompanySubLocations}
                showSearch
                suffixIcon={<SearchOutlined />}
                showArrow
                name={`locations_id`}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setdatacreate({ ...datacreate, subloc_id: null })
                    : setdatacreate({ ...datacreate, subloc_id: value });
                }}
                treeData={datasublocs}
                treeDefaultExpandAll
                value={datacreate.subloc_id}
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
          ) : null}
          <div className="mb-6 px-3 flex justify-between items-center">
            <div>
              <Label>Pergantian Suku Cadang</Label>
            </div>
            <div>
              <Switch
                checked={datacreate.is_replaceable}
                onChange={(checked) => {
                  setdatacreate({
                    ...datacreate,
                    is_replaceable: checked,
                  }); /*console.log(datacreate, Math.floor(moment.duration(moment("2022-01-06 11:58:27").diff(moment(datacreate.created_at))).asHours())) console.log(moment.duration(moment(new Date()).diff(moment("2022-01-07 09:21:48"))).asDays())*/
                }}
              ></Switch>
            </div>
          </div>
          <div className="mb-6 px-3 flex flex-col">
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
                value={datacreate.inventory_ids}
                placeholder="Cari MIG ID, Nama Model, Nama Aset"
                disabled={!isAllowedToGetInventories}
                name={`inventory_ids`}
                onChange={(values, options) => {
                  setdatacreate({ ...datacreate, inventory_ids: values });
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
              <div className="mb-2 flex items-center">
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
                        setdatacreate((prev) => ({
                          ...prev,
                          inventory_ids: temp.map((docmap) => docmap.value),
                        }));
                      }}
                    >
                      <CircleXIconSvg size={15} color={`#BF4A40`} />
                    </div>
                  </div>
                  <div>
                    <Label>
                      {doc.migid}/{doc.assetname}
                    </Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-6 px-3 flex flex-col">
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
                    checked={datacreate.is_group}
                    disabled={!canFindStaffOrGroup}
                    onChange={(checked) => {
                      setswitchstaffgroup(checked ? 0 : 1);
                      setdatacreate({
                        ...datacreate,
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
                  value={datacreate.assign_ids}
                  placeholder="Cari Nama Staff, Group.."
                  disabled={!isAllowedToGetStaffList}
                  name={`assign_ids`}
                  onChange={(values, options) => {
                    setdatacreate({ ...datacreate, assign_ids: values });
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
                      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssignToList?assignable_type=1&name=${value}`,
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterUsers?type=1&name=${value}`,
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
                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {datastaffgroup.map((doc, idx) => (
                    <Select.Option
                      key={idx}
                      value={doc.id}
                      position={doc.position}
                      // image={doc.profile_image}
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
                  value={[datacreate.assign_ids]}
                  placeholder="Cari Nama Staff, Group.."
                  name={`assign_ids`}
                  onChange={(value, option) => {
                    setdatacreate({ ...datacreate, assign_ids: [value] });
                    setselectedstaffgroup([option]);
                  }}
                  showSearch
                  optionFilterProp="children"
                  notFoundContent={
                    fetchingstaffgroup ? <Spin size="small" /> : null
                  }
                  disabled={!isAllowedToGetGroups}
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
                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
              <div className="mb-2 flex items-center">
                <div className="mr-2 flex items-center">
                  {switchstaffgroup === 1 ? (
                    <div className=" w-10 h-10 rounded-full">
                      <img
                        src={
                          doc.image === "" || doc.image === "-"
                            ? "/image/staffTask.png"
                            : `${doc.image}`
                        }
                        className=" object-contain w-10 h-10"
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
                        setdatacreate((prev) => ({
                          ...prev,
                          assign_ids: temp.map((docmap) => docmap.value),
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
          <div className="mb-6 px-3 flex flex-col">
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
                  settempdate(datacreate.created_at);
                  setdatacreate({
                    ...datacreate,
                    created_at:
                      e.target.value === true
                        ? moment(new Date())
                            .locale("id")
                            .format(DATE_MOMENT_FORMAT_PAYLOAD)
                        : null,
                  });
                  // setdatacreate({
                  //   ...datacreate,
                  //   created_at:
                  //     e.target.value === true
                  //       ? moment(new Date()).locale("id").format()
                  //       : null,
                  //   deadline:
                  //     datacreate.deadline === null
                  //       ? null
                  //       : moment(datacreate.deadline)
                  //           .add(
                  //             Math.floor(
                  //               moment
                  //                 .duration(
                  //                   moment(new Date()).diff(
                  //                     moment(datacreate.created_at)
                  //                   )
                  //                 )
                  //                 .asHours()
                  //             ),
                  //             "h"
                  //           )
                  //           .locale("id")
                  //           .format(),
                  // });
                  e.target.value === true ? setchoosedate(false) : null;
                  setdisabledtrigger((prev) => prev + 1);
                }}
                value={now}
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
                    placeholder="Jadwal Mulai"
                    format={DATE_MOMENT_FORMAT_PAYLOAD}
                    style={{ width: `100%` }}
                    onChange={(date, datestring) => {
                      setdatacreate({
                        ...datacreate,
                        created_at: datestring,
                      });

                      // setdatacreate({
                      //   ...datacreate,
                      //   created_at: datestring,
                      //   deadline:
                      //     datacreate.deadline === null
                      //       ? null
                      //       : moment(datacreate.deadline)
                      //           .add(
                      //             Math.floor(
                      //               moment
                      //                 .duration(
                      //                   moment(datestring).diff(
                      //                     moment(tempdate)
                      //                   )
                      //                 )
                      //                 .asHours()
                      //             ),
                      //             "h"
                      //           )
                      //           .locale("id")
                      //           .format(),
                      // });
                      setdisabledtrigger((prev) => prev + 1);
                    }}
                  ></DatePicker>
                </div>
              )}
            </div>
          </div>
          <div className="mb-6 px-3 flex flex-col">
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
                  //   now === false
                  //     ? (choisedate = moment(datacreate.created_at)
                  //         .add(3, "h")
                  //         .locale("id")
                  //         .format())
                  //     : (choisedate = moment()
                  //         .add(3, "h")
                  //         .locale("id")
                  //         .format());
                  // } else if (e.target.value === 30) {
                  //   now === false
                  //     ? (choisedate = moment(datacreate.created_at)
                  //         .add(30, "h")
                  //         .locale("id")
                  //         .format())
                  //     : (choisedate = moment()
                  //         .add(30, "h")
                  //         .locale("id")
                  //         .format());
                  // } else if (e.target.value === 24) {
                  //   now === false
                  //     ? (choisedate = moment(datacreate.created_at)
                  //         .add(1, "d")
                  //         .locale("id")
                  //         .format())
                  //     : (choisedate = moment()
                  //         .add(1, "d")
                  //         .locale("id")
                  //         .format());
                  // } else if (e.target.value === 168) {
                  //   now === false
                  //     ? (choisedate = moment(datacreate.created_at)
                  //         .add(1, "w")
                  //         .locale("id")
                  //         .format())
                  //     : (choisedate = moment()
                  //         .add(1, "w")
                  //         .locale("id")
                  //         .format());
                  // }
                  setdatacreate({
                    ...datacreate,
                    deadline: null,
                  });
                  e.target.value !== -10 ? setchoosedateend(false) : null;
                  setdisabledtrigger((prev) => prev + 1);
                }}
                value={nowend}
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
                    placeholder="Jadwal Berakhir"
                    format={DATE_MOMENT_FORMAT_PAYLOAD}
                    style={{ width: `100%` }}
                    onChange={(date, datestring) => {
                      setdatacreate({ ...datacreate, deadline: datestring });
                      setdisabledtrigger((prev) => prev + 1);
                    }}
                  ></DatePicker>
                </div>
              )}
            </div>
          </div>
          <div className="mb-6 px-3 flex flex-col">
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
                      ? setdatacreate({
                          ...datacreate,
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
                    onChange={(value) => {
                      setdatacreate({ ...datacreate, repeat: value });
                      value === -1
                        ? setregular(true)
                        : (setdatacreate({ ...datacreate, repeat: 1 }),
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
                        name={`repeat`}
                        onChange={(e) => {
                          setdatacreate({
                            ...datacreate,
                            repeat: e.target.value,
                          });
                          setdisabledtrigger((prev) => prev + 1);
                        }}
                        value={datacreate.repeat < 2 ? null : datacreate.repeat}
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
                        showTime
                        placeholder="Selesai pada"
                        style={{ width: `100%` }}
                        onChange={(date, datestring) => {
                          setdatacreate({
                            ...datacreate,
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
          <div className="mb-6 px-3 flex justify-between">
            <div>
              <Label>Unggah Dokumen Pelengkap (PDF, JPG)</Label>
            </div>
            <div>
              <Switch
                checked={datacreate.is_uploadable}
                onChange={(checked) => {
                  setdatacreate({ ...datacreate, is_uploadable: checked });
                }}
              />
            </div>
          </div>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerTaskCreate;
