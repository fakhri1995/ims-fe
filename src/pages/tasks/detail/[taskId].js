// import { LoadingOutlined } from "@ant-design/icons";
import {
  Document,
  Image,
  Link,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Checkbox, Empty, Input, Select, Spin, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { AccessControl } from "components/features/AccessControl";
import { TaskDetailLampiran } from "components/screen/task";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  TASK_APPROVE,
  TASK_ATTENDANCE_TOGGLE,
  TASK_DECLINE,
  TASK_DELETE,
  TASK_DETAIL_ADD, // Button "Edit" outlined dan Drawer "DrawerTaskDetailUpdate"
  TASK_DETAIL_ASSIGN,
  TASK_DETAIL_DELETE,
  TASK_DETAIL_FILL,
  TASK_DETAIL_UPDATE,
  TASK_FILES_SAVE,
  TASK_GET, // Update task drawer
  TASK_STATUS_TOGGLE,
  TASK_SUBMIT,
  TASK_UPDATE, // Button "Tambah Pekerjaan Baru" dan Drawer "DrawerTaskDetailCreate"
} from "lib/features";
import {
  generateStaticAssetUrl,
  isValidDate,
  permissionWarningNotification,
} from "lib/helper";

import { TaskService } from "apis/task";

import Buttonsys from "../../../components/button";
import DrawerTaskDetailCreate from "../../../components/drawer/tasks/drawerTaskDetailCreate";
import DrawerTaskDetailUpdate from "../../../components/drawer/tasks/drawerTaskDetailUpdate";
import DrawerTaskSpareParts from "../../../components/drawer/tasks/drawerTaskSpareParts";
import DrawerTaskUpdate from "../../../components/drawer/tasks/drawerTaskUpdate";
import {
  ArrowsSortIconSvg,
  AssetIconSvg,
  BackIconSvg,
  CheckIconSvg,
  CircleXIconSvg,
  ClipboardcheckIconSvg,
  ClockIconSvg,
  CloudUploadIconSvg,
  EditIconSvg,
  ForbidIconSvg,
  PlayerPauseIconSvg,
  PlayerPlayIconSvg,
  RefreshIconSvg,
  SearchIconSvg,
  SendIconSvg,
  SortAscendingIconSvg,
  SortDescendingIconSvg,
  TrashIconSvg,
  UserPlusIconSvg,
} from "../../../components/icon";
import { TextAreaRequired } from "../../../components/input";
import st from "../../../components/layout-dashboard.module.css";
import Layout from "../../../components/layout-dashboardNew";
import {
  ModalHapusTask,
  ModalHapusTaskDetail,
  ModalUbahOnHoldTask,
} from "../../../components/modal/modalCustom";
import { H1, H2, Label } from "../../../components/typography";
import httpcookie from "cookie";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingVertical: 23,
    paddingHorizontal: 25,
  },
  boxHeader: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    border: `1px solid #35763B`,
    borderRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 20,
  },
  boxUmum: {
    flexDirection: `row`,
    border: `1px solid #35763B`,
    borderRadius: 5,
    padding: 18,
    marginBottom: 20,
    flexWrap: `wrap`,
  },
  boxDetail: {
    flexDirection: `column`,
    border: `1px solid #35763B`,
    borderRadius: 5,
    padding: 18,
    marginBottom: 20,
    flexWrap: `wrap`,
  },
  boxUsers: {
    flexDirection: `row`,
    border: `1px solid #E5E5E5`,
    borderRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 15,
    flexWrap: `wrap`,
  },
  boxType4: {
    border: `1px solid #E5E5E5`,
    borderRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 0,
  },
  boxType5: {
    flexDirection: `row`,
    border: `1px solid #E5E5E5`,
    borderRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 0,
    flexWrap: `wrap`,
  },
  judul2: {
    fontSize: 12,
    fontWeight: `heavy`,
    color: `#4D4D4D`,
    marginBottom: 2,
  },
  label: {
    fontSize: 8,
    fontWeight: `light`,
    color: `#bbbbbb`,
    marginBottom: 4,
  },
  texter: {
    fontSize: 9,
    fontWeight: `light`,
    color: `#4D4D4D`,
    marginBottom: 4,
  },
});

const TaskPDFTemplate = ({ detail, datatype4 }) => {
  return (
    <Document>
      <Page size={`A4`} style={styles.page}>
        {/* Header */}
        <View style={styles.boxHeader}>
          <View style={{ flexDirection: `row`, alignItems: `center` }}>
            <View style={{ marginRight: 1 }}>
              <Image
                style={{ width: 40, height: 40 }}
                src={`/image/LogoMig.png`}
              ></Image>
            </View>
            <Text style={{ fontSize: 10, color: `#4D4D4D` }}>
              <Text
                style={{ fontSize: 18, fontWeight: `heavy`, color: `#4d4d4d` }}
              >
                MIG
              </Text>
              Sys
            </Text>
          </View>
          <View style={{ flexDirection: `column`, justifyContent: `flex-end` }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: `heavy`,
                color: `black`,
                marginBottom: 2,
              }}
            >
              SAR
            </Text>
            <Text
              style={{
                fontSize: 8,
                fontWeight: `light`,
                color: `#bbbbbb`,
                textAlign: `right`,
              }}
            >
              Service Activity Report
            </Text>
          </View>
        </View>
        {/* Informasi Umum */}
        <View style={styles.boxUmum}>
          <View
            style={{ width: `33%`, flexDirection: `column`, marginBottom: 10 }}
          >
            <Text style={styles.label}>Tipe Task</Text>
            <Text style={styles.texter}>{detail.task_type.name}</Text>
            {/* <Text style={styles.texter}>PM 2</Text> */}
          </View>
          <View
            style={{ width: `33%`, flexDirection: `column`, marginBottom: 10 }}
          >
            <Text style={styles.label}>Nomor Task</Text>
            <Text style={styles.texter}>T-000{detail.id}</Text>
            {/* <Text style={styles.texter}>T-000089</Text> */}
          </View>
          <View
            style={{ width: `33%`, flexDirection: `column`, marginBottom: 10 }}
          >
            <Text style={styles.label}>Lokasi</Text>
            <Text style={styles.texter}>
              {detail.location?.full_location || "-"}
            </Text>
            {/* <Text style={styles.texter}>KCP Tebet 2</Text> */}
          </View>
          <View style={{ width: `33%`, flexDirection: `column` }}>
            <Text style={styles.label}>Referensi (Jika ada)</Text>
            <Text style={styles.texter}>
              Tiket{" "}
              {detail.reference_id === null
                ? "-"
                : `${detail.reference.type.code}-${detail.reference.id}`}
            </Text>
            {/* <Text style={styles.texter}>Tiket INC-7</Text> */}
          </View>
          <View style={{ width: `33%`, flexDirection: `column` }}>
            <Text style={styles.label}>Pembuat Task</Text>
            <Text style={styles.texter}>{detail.creator.name}</Text>
            {/* <Text style={styles.texter}>John Doe</Text> */}
          </View>
          <View style={{ width: `33%`, flexDirection: `column` }}>
            <Text style={styles.label}>Tanggal Pembuatan</Text>
            <Text style={styles.texter}>
              {isValidDate(detail.created_at)
                ? moment(detail.created_at).locale("id").format("lll")
                : "-"}
            </Text>
            {/* <Text style={styles.texter}>08 Nov 2021, 12:00</Text> */}
          </View>
        </View>
        {/* Informasi Detail */}
        <View style={styles.boxDetail}>
          <View
            style={{
              width: `100%`,
              flexDirection: `column`,
              marginBottom: 15,
            }}
          >
            <Text style={styles.label}>Jenis Task</Text>
            <Text style={styles.judul2}>Task Kelompok</Text>
          </View>
          <View
            style={{
              width: `100%`,
              flexDirection: `column`,
              marginBottom: 15,
            }}
          >
            <Text style={styles.label}>Deskripsi</Text>
            <Text style={styles.texter}>
              Layar rusak & tombol tidak responsif
            </Text>
          </View>
          {/* Table Users */}
          <View style={styles.boxUsers}>
            <View style={{ width: `10%`, marginBottom: 10 }}>
              <Text style={styles.judul2}>No.</Text>
            </View>
            <View style={{ width: `30%`, marginBottom: 10 }}>
              <Text style={styles.judul2}>Staff</Text>
            </View>
            <View style={{ width: `30%`, marginBottom: 10 }}>
              <Text style={styles.judul2}>Check In</Text>
            </View>
            <View style={{ width: `30%`, marginBottom: 10 }}>
              <Text style={styles.judul2}>Check Out</Text>
            </View>
            {detail.users.map((user, idx) => (
              <React.Fragment key={idx}>
                <View
                  style={{
                    width: `10%`,
                    marginBottom: idx === detail.users.length - 1 ? 0 : 10,
                  }}
                >
                  <Text style={styles.texter}>{idx + 1}</Text>
                </View>
                <View
                  style={{
                    width: `30%`,
                    marginBottom: idx === detail.users.length - 1 ? 0 : 10,
                  }}
                >
                  <View
                    style={{
                      display: `flex`,
                      flexDirection: `row`,
                      alignItems: `center`,
                    }}
                  >
                    <View style={{ borderRadius: `9999px`, marginRight: 3 }}>
                      <Image
                        style={{ width: 15, height: 15 }}
                        src={generateStaticAssetUrl(user.profile_image?.link)}
                        // src={
                        //   user.profile_image === "-"
                        //     ? `/image/staffTask.png`
                        //     : user.profile_image
                        // }
                      ></Image>
                    </View>
                    <Text style={styles.texter}>{user.name}</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: `30%`,
                    marginBottom: idx === detail.users.length - 1 ? 0 : 10,
                  }}
                >
                  <Text style={styles.texter}>
                    {user.check_in === null ? `-` : user.check_in}
                  </Text>
                </View>
                <View
                  style={{
                    width: `30%`,
                    marginBottom: idx === detail.users.length - 1 ? 0 : 10,
                  }}
                >
                  <Text style={styles.texter}>
                    {user.check_out === null ? `-` : user.check_out}
                  </Text>
                </View>
              </React.Fragment>
            ))}
          </View>
          {/* Hasil Pekerjaan */}
          <View
            style={{
              width: `100%`,
              flexDirection: `column`,
              marginBottom: 15,
            }}
          >
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.label}>Hasil Pekerjaan</Text>
            </View>
            {detail.task_details.map((task, idx2) => (
              <View
                style={{
                  marginBottom:
                    idx2 === detail.task_details.length - 1 ? 0 : 15,
                  flexDirection: `column`,
                  borderTopWidth: idx2 === 0 ? 0.5 : 0,
                  borderBottomWidth: 0.5,
                  borderColor: `1px solid #bbbbbb`,
                  paddingVertical: 8,
                }}
                key={idx2}
              >
                <View style={{ marginBottom: 4 }}>
                  <Text style={styles.judul2}>{task.component.name}</Text>
                </View>
                <View style={{ marginBottom: 4 }}>
                  <Text style={styles.label}>
                    {task.component.description === ""
                      ? `-`
                      : task.component.description}
                  </Text>
                </View>
                {task.component.type === 1 && (
                  <View>
                    <Text style={styles.texter}>{task.component.values}</Text>
                  </View>
                )}
                {task.component.type === 2 && (
                  <View>
                    <Text style={styles.texter}>{task.component.values}</Text>
                  </View>
                )}
                {task.component.type === 3 &&
                  task.component.lists?.map((val, idx3) => (
                    <View
                      style={{
                        marginBottom:
                          idx3 === task.component.lists.length - 1 ? 0 : 4,
                        flexDirection: `row`,
                      }}
                      key={idx3}
                    >
                      <View style={{ marginRight: 3 }}>
                        <Image
                          style={{ width: 15, height: 15 }}
                          src={
                            task.component.values[idx3]
                              ? `/image/check.png`
                              : `/image/forbid.png`
                          }
                        ></Image>
                      </View>
                      <Text style={styles.texter}>{val}</Text>
                    </View>
                  ))}
                {task.component.type === 4 && (
                  <View style={styles.boxType4}>
                    <View style={{ flexDirection: `row`, flexWrap: `wrap` }}>
                      <View style={{ width: `25%`, marginBottom: 7 }}>
                        <Text style={styles.judul2}>Model</Text>
                      </View>
                      {task.component.columns.map((col, idx4) => (
                        <View
                          style={{
                            width: `15%`,
                            marginBottom:
                              idx4 === task.component.columns.length - 1
                                ? 0
                                : 7,
                          }}
                        >
                          <Text style={styles.judul2}>{col}</Text>
                        </View>
                      ))}
                    </View>
                    {datatype4
                      ?.filter((docfil, idxfil) => docfil[0]?.id === task.id)[0]
                      ?.map((data4, idx5) => (
                        <View
                          style={{ flexDirection: `row`, flexWrap: `wrap` }}
                        >
                          <View
                            style={{
                              width: `25%`,
                              marginBottom:
                                idx5 === datatype4.length - 1 ? 0 : 7,
                            }}
                          >
                            <Text style={styles.judul2}>{data4.model}</Text>
                          </View>
                          {task.component.columns.map((coll, idx6) => (
                            <View
                              style={{
                                width: `15%`,
                                marginBottom:
                                  idx6 === task.component.columns.length - 1
                                    ? 0
                                    : 7,
                              }}
                            >
                              {data4[coll] ? (
                                <View>
                                  <Image
                                    style={{ width: 15, height: 15 }}
                                    src={`/image/check.png`}
                                  ></Image>
                                </View>
                              ) : (
                                <View>
                                  <Image
                                    style={{ width: 15, height: 8 }}
                                    src={`/image/na.png`}
                                  ></Image>
                                </View>
                              )}
                            </View>
                          ))}
                        </View>
                      ))}
                  </View>
                )}
                {task.component.type === 5 && (
                  <View style={styles.boxType5}>
                    <View style={{ width: `40%`, marginBottom: 10 }}>
                      <Text style={styles.judul2}>Keterangan</Text>
                    </View>
                    <View style={{ width: `30%`, marginBottom: 10 }}>
                      <Text style={styles.judul2}>Nilai</Text>
                    </View>
                    <View style={{ width: `30%`, marginBottom: 10 }}>
                      <Text style={styles.judul2}>Satuan</Text>
                    </View>
                    {task.component.lists.map((list, idx7) => (
                      <>
                        <View
                          style={{
                            width: `40%`,
                            marginBottom:
                              idx7 === task.component.lists.length - 1 ? 0 : 10,
                          }}
                        >
                          <Text style={styles.texter}>
                            {list.description === "" ? `-` : list.description}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: `30%`,
                            marginBottom:
                              idx7 === task.component.lists.length - 1 ? 0 : 10,
                          }}
                        >
                          <Text style={styles.texter}>
                            {list.values === "" ? `-` : list.values}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: `30%`,
                            marginBottom:
                              idx7 === task.component.lists.length - 1 ? 0 : 10,
                          }}
                        >
                          <Text style={styles.texter}>
                            {list.type === "" ? `-` : list.type}
                          </Text>
                        </View>
                      </>
                    ))}
                  </View>
                )}
                {task.component.type === 6 && (
                  <View>
                    <Text style={styles.texter}>
                      {task.component.values === ""
                        ? `-`
                        : task.component.values}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
          <View
            style={{
              width: `100%`,
              flexDirection: `column`,
              marginBottom: 15,
            }}
          >
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.label}>Lampiran</Text>
            </View>
            <View
              style={{
                flexDirection: `row`,
                alignItems: `center`,
                flexWrap: `wrap`,
              }}
            >
              {detail.files?.map((file, idx8) => (
                <View
                  style={{
                    marginHorizontal: `0.5rem`,
                    marginVertical: `0.5rem`,
                    width: `33%`,
                    display: `flex`,
                    justifyContent: `center`,
                    marginBottom: idx8 >= 3 ? 0 : 10,
                  }}
                >
                  <Image
                    style={{
                      maxHeight: 80,
                      maxWidth: 80,
                      objectFit: `contain`,
                    }}
                    src={file}
                  ></Image>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const TaskDetail = ({ initProps, dataProfile, sidemenu, taskid }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToDeleteTask = hasPermission(TASK_DELETE);
  const isAllowedToSubmitTask = hasPermission(TASK_SUBMIT);
  const isAllowedToDeclineTask = hasPermission(TASK_DECLINE);
  const isAllowedToApproveTask = hasPermission(TASK_APPROVE);
  const isAllowedToGetTask = hasPermission(TASK_GET);

  const isAllowedToToggleStatus = hasPermission(TASK_STATUS_TOGGLE);

  const isAllowedToDetailAssign = hasPermission(TASK_DETAIL_ASSIGN);
  const isAllowedToDetailDelete = hasPermission(TASK_DETAIL_DELETE);
  const isAllowedToDetailFill = hasPermission(TASK_DETAIL_FILL);

  const isAllowedToToggleAttendance = hasPermission(TASK_ATTENDANCE_TOGGLE);

  const isAllowedToSaveFiles = hasPermission(TASK_FILES_SAVE);

  const isAllowedToUpdateTask = hasPermission(TASK_UPDATE);

  const isAllowedToAddTaskDetail = hasPermission(TASK_DETAIL_ADD);
  const isAllowedToUpdateTaskDetail = hasPermission(TASK_DETAIL_UPDATE);

  //1.Init
  const axiosClient = useAxiosClient();
  const rt = useRouter();
  // const { prevpath } = rt.query;
  const prevpath = rt.query?.prevpath || "mytask"; // force fallback prevpath to "mytask"
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(1, 2);
  pathArr.push(`Detail Task`);

  /** State to only renders `<PDFDownloadLink>` component after this page mount (client-side) */
  const [isOnClient, setIsOnClient] = useState(false);
  useEffect(() => {
    setIsOnClient(true);
  }, []);

  //USESTATE
  const [displaytask, setdisplaytask] = useState({
    id: null,
    name: "",
    description: "",
    task_type_id: null,
    location_id: null,
    reference_id: null,
    created_by: null,
    group_id: null,
    created_at: null,
    on_hold_at: null,
    deadline: null,
    status: null,
    is_replaceable: null,
    deleted_at: null,
    task_type: {
      id: null,
      name: "",
      deleted_at: null,
    },
    location: {
      id: null,
      name: "",
      full_location: "",
    },
    creator: {
      id: null,
      name: "",
      profile_image: {
        id: 0,
        link: "",
        description: "",
      },
    },
    users: [],
    group: [],
    inventories: [],
    task_details: [],
    reference: [],
    files: [],
  });
  const [dataupdate, setdataupdate] = useState({
    id: null,
    name: "",
    description: "",
    location_id: null,
    reference_id: null,
    created_at: moment(new Date()).locale("id").format(),
    deadline: moment(new Date()).add(3, "h").locale("id").format(),
    is_group: null,
    is_replaceable: false,
    assign_ids: [],
    inventory_ids: [],
    is_uploadable: false,
    repeat: 0,
    files: [],
    attachments: [],
    end_repeat_at: null,
    subloc_id: null,
  });
  const [attachments, setAttachments] = useState([]);

  const [triggersubloc, settriggersubloc] = useState(-1);
  const [users2, setusers2] = useState([]);
  const [praloadingtask, setpraloadingtask] = useState(true);
  const [timeleft, settimeleft] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  // const [colorstatus, setcolorstatus] = useState({
  //   text: "",
  //   bg: "",
  //   border: "",
  // });
  const [drawertaskupdate, setdrawertaskupdate] = useState(false);
  const [drawertaskdetailcreate, setdrawertaskdetailcreate] = useState(false);
  const [drawertaskdetailupdate, setdrawertaskdetailupdate] = useState(false);
  const [modaltaskdetaildelete, setmodaltaskdetaildelete] = useState(false);
  const [loadingchange, setloadingchange] = useState(false);
  //Fill Task
  const [currentdataeditable, setcurrentdataeditable] = useState({
    id: null,
    values: null,
  });
  const [editable, seteditable] = useState([]);
  const [disablededitable, setdisablededitable] = useState(true);
  const [completeclose, setcompleteclose] = useState(false);
  const [isselfcheckout, setisselfcheckout] = useState(false);
  const [revise, setrevise] = useState({
    display: false,
    data: {
      id: Number(taskid),
      notes: "",
    },
  });
  const [loadingeditable, setloadingeditable] = useState(false);
  // CheckIn Task
  const [loadingcheckin, setloadingcheckin] = useState(false);
  //staff
  const [sortstate, setsortstate] = useState(0);
  //status
  const [datastatustoggle, setdatastatustoggle] = useState({
    notes: "",
    id: Number(taskid),
  });
  const [modalstatustoggle, setmodalstatustoggle] = useState(false);
  //TASK SUBMIT
  const [loadingsubmittask, setloadingsubmittask] = useState(false);
  //TASK DETAIL
  //tambah staff
  const [currentidstafftask, setcurrentidstafftask] = useState(null);
  const [currentstafftask, setcurrentstafftask] = useState([]);
  const [displaycurrentstafftask, setdisplaycurrentstafftask] = useState([]);
  const [displaycurrentstafftask2, setdisplaycurrentstafftask2] = useState([]);
  const [loadingstafftask, setloadingstafftask] = useState(false);
  //4(matriks)
  const [datatype4, setdatatype4] = useState([]);
  const [datatype42, setdatatype42] = useState([]);
  const [sort4state, setsort4state] = useState(0);
  //create task detail
  const [triggertaskdetailcreate, settriggertaskdetailcreate] = useState(-1);
  //update task detail
  const [idtaskdetailupdate, setidtaskdetailupdate] = useState(-1);
  const [triggertaskdetailupdate, settriggertaskdetailupdate] = useState(-1);
  //delete task detail
  const [datataskdetaildelete, setdatatasktaildelete] = useState({
    id: null,
    name: "",
    task_id: Number(taskid),
  });
  const [loadingtaskdetaildelete, setloadingtaskdetaildelete] = useState(false);
  //TASK UPDATE
  const [refreshdefaultupdatetask, setrefreshdefaultupdatetask] = useState(-1);
  const [selecteditems, setselecteditems] = useState([]);
  const [selectedstaffgroup, setselectedstaffgroup] = useState([]);
  const [switchstaffgroup, setswitchstaffgroup] = useState(1);
  const [now, setnow] = useState(true);
  const [choosedate, setchoosedate] = useState(false);
  const [nowend, setnowend] = useState(3);
  const [choosedateend, setchoosedateend] = useState(false);
  const [scrollidupdate, setscrollidupdate] = useState(-1);

  const [scrolltriggerupdate, setscrolltriggerupdate] = useState(true);
  const [repeatable, setrepeatable] = useState(false);
  const [regular, setregular] = useState(null);
  const [choosedateendrepeat, setchoosedateendrepeat] = useState(false);
  //delete task
  const [datataskdelete, setdatataskdelete] = useState({
    id: null,
    name: "",
  });
  const [modaltaskdelete, setmodaltaskdelete] = useState(false);
  const [loadingtaskdelete, setloadingtaskdelete] = useState(false);
  //SPARE PARTS
  const [drawerspart, setdrawerspart] = useState(false);
  const [selectedforin, setselectedforin] = useState([]);
  const [selectedforout, setselectedforout] = useState([]);
  //UPLOAD FILE
  // const [loadingfile, setloadingfile] = useState(false);

  //HANDLER
  const handlePushRouterBack = useCallback(() => {
    // A function to push the User back to their previous page.
    //
    // User can access this page from various pages (e.g. admin task, my task, and Ticket Detail).
    //
    // We use 'prevpath' as query string to decide where we should push them back.

    if (!rt.isReady) {
      return;
    }

    switch (prevpath) {
      case "admin":
        rt.push(`/tasks/admin`);
        return;
      case "mytask":
        rt.push(`/tasks/mytask`);
        return;
      default:
        if (prevpath !== undefined && typeof prevpath === "string") {
          rt.push(decodeURIComponent(prevpath));
          return;
        }

        // just in case ?
        rt.back();
        return;
    }
  }, [rt, prevpath]);
  // const onChangeGambar = async (e) => {
  //   setloadingfile(true);
  //   const foto = e.target.files;
  //   const formdata = new FormData();
  //   formdata.append("file", foto[0]);
  //   formdata.append("upload_preset", "migsys");
  //   const fetching = await fetch(
  //     `https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`,
  //     {
  //       method: "POST",
  //       body: formdata,
  //     }
  //   );
  //   const datajson = await fetching.json();
  //   var tempfile = [...dataupdate.files];
  //   tempfile.push(datajson.secure_url);
  //   setdataupdate({ ...dataupdate, files: tempfile });
  //   setloadingfile(false);
  // };

  const handleDeleteTask = () => {
    // setloadingtaskdelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteTask`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: datataskdelete.id,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        // setloadingtaskdelete(false);
        if (res2.success) {
          // setmodaltaskdelete(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });

          handlePushRouterBack();
          // prevpath ? rt.push(`/tasks/${prevpath}`) : rt.push(`/tasks`);
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  const handleSwitchToOnHold = () => {
    setloadingchange(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/changeStatusToggle`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datastatustoggle),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingchange(false);
        if (res2.success) {
          setmodalstatustoggle(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          // rt.push(`/tasks/detail/${taskid}`)
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  const handleAssignStaffTaskDetail = () => {
    const finaldata = currentstafftask.map((doc) => doc.id);
    setloadingstafftask(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assignTaskDetail`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(currentidstafftask),
        assign_ids: finaldata,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingstafftask(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          // rt.push(`/tasks/detail/${taskid}`)
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  const handleDeleteTaskDetail = () => {
    setloadingtaskdetaildelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteTaskDetail`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datataskdetaildelete),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingtaskdetaildelete(false);
        if (res2.success) {
          setmodaltaskdetaildelete(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          // rt.push(`/tasks/detail/${taskid}`)
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  const handleCheckInTask = () => {
    setloadingcheckin(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/changeAttendanceToggle`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(taskid),
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingcheckin(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          // rt.push(`/tasks/detail/${taskid}`)
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  const handleFillTaskDetail = () => {
    setloadingeditable(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fillTaskDetail`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentdataeditable),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingeditable(false);
        if (res2.success) {
          seteditable(displaytask.task_details.map((doc, idx) => false));
          setcurrentdataeditable({ id: null, values: null });
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          // rt.push(`/tasks/detail/${taskid}`)
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  const handleSubmitTask = () => {
    setloadingsubmittask(true);

    const hitSubmitTask = () => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/submitTask`, {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(taskid),
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          setloadingsubmittask(false);
          if (res2.success) {
            notification["success"]({
              message: res2.message,
              duration: 3,
            });
            rt?.reload();
            // window.location.href = `/tasks/detail/${taskid}`;
          } else {
            notification["error"]({
              message: res2.message,
              duration: 3,
            });
          }
        });
    };

    const newAttachments = attachments;
    if (newAttachments.length > 0) {
      TaskService.saveFilesTask(axiosClient, {
        id: Number(taskid),
        attachments,
      })
        .then(() => {
          setAttachments([]);
        })
        .then(() => {
          hitSubmitTask();
        });
      return;
    }

    hitSubmitTask();
  };
  const handleReviseTask = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/declineTask`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(revise.data),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          // window.location.href = `/tasks/${prevpath}`;
          handlePushRouterBack();
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };
  const handleApproveTask = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/approveTask`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(taskid),
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          // window.location.href = `/tasks/${prevpath}`;
          handlePushRouterBack();
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
    if (!isAllowedToGetTask) {
      permissionWarningNotification("Mendapatkan", "Detail Task");
    }
  }, [isAllowedToGetTask]);

  useEffect(() => {
    if (!isAllowedToGetTask) {
      setpraloadingtask(false);
      return;
    }

    setpraloadingtask(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getTask?id=${taskid}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdisplaytask(res2.data);
        setusers2(res2.data.users);
        seteditable(res2.data.task_details.map((doc, idx) => false));
        setdataupdate({
          ...dataupdate,
          id: Number(taskid),
          task_type_id: res2.data.task_type_id,
          name: res2.data.name,
          description: res2.data.description,
          location_id: res2.data.location.top_parent
            ? res2.data.location.top_parent.id
            : res2.data.location_id,
          subloc_id: res2.data.location.top_parent
            ? res2.data.location_id
            : null,
          reference_id: res2.data.reference_id,
          created_at: res2.data.created_at,
          deadline: res2.data.deadline,
          is_group: res2.data.group_id === null ? false : true,
          is_replaceable: Boolean(res2.data.is_replaceable),
          assign_ids:
            res2.data.group_id === null
              ? res2.data.users.map((doc) => doc.id)
              : [res2.data.group.id],
          inventory_ids: res2.data.inventories.map((doc) => doc.id),
          group_id: res2.data.group_id,
          is_uploadable: Boolean(res2.data.is_uploadable),
          repeat: res2.data.repeat,
          end_repeat_at: res2.data.end_repeat_at,
          files: res2.data.files || [],
          attachments: res2.data.attachments || [],
        });
        var tempitems = res2.data.inventories.map((doc, idx) => ({
          ...doc,
          modelname: doc.model_name,
          migid: doc.mig_id,
          assetname: doc.asset_name,
        }));
        settriggersubloc(
          res2.data.location.top_parent ? res2.data.location.top_parent.id : ""
        );
        setselecteditems(tempitems);
        setrepeatable(res2.data.repeat === 0 ? false : true);
        setregular(res2.data.repeat > 1 ? true : false);
        setchoosedateendrepeat(res2.data.end_repeat_at !== null ? true : false);
        var tempstaffgroup = [];
        res2.data.group_id === null
          ? ((tempstaffgroup = res2.data.users.map((doc, idx) => ({
              ...doc,
              children: doc.name,
              position: doc.position ?? "",
              image: generateStaticAssetUrl(doc.profile_image?.link),
            }))),
            setswitchstaffgroup(1))
          : ((tempstaffgroup = [
              {
                children: res2.data.group.name,
              },
            ]),
            setswitchstaffgroup(0));
        setselectedstaffgroup(tempstaffgroup);
        setnow(false);
        setchoosedate(true);
        setnowend(-10);
        setchoosedateend(true);
        //data type 4
        const data4map = res2.data.task_details
          .filter((docfil) => docfil.component.type === 4)
          .map((docmap, idxmap) => {
            var tasklistItem = docmap.component.rows.map((docmap2, idxmap2) => {
              var colattr = {};
              for (var i = 0; i < docmap.component.columns.length; i++) {
                colattr[docmap.component.columns[i]] =
                  docmap.component.values[i][idxmap2];
              }
              return {
                id: docmap.id,
                model: docmap2,
                ...colattr,
              };
            });
            return [...tasklistItem];
          });
        setdatatype4(data4map);
        setdatatype42(data4map);
        //time_left
        settimeleft({
          ...timeleft,
          // d: Math.abs((moment.utc().diff(moment().add(res2.data.time_left.y, 'y').locale('id').format(), 'days'))) + Math.abs((moment.utc().diff(moment().add(res2.data.time_left.m, 'M').locale('id').format(), 'days'))) + res2.data.time_left.d,
          d: res2.data.time_left.days,
          h: res2.data.time_left.h,
          m: res2.data.time_left.i,
          s: res2.data.time_left.s,
        });
        if (res2.data.created_by !== dataProfile.data.id) {
          res2.data.users.filter(
            (docfil) => docfil.id === dataProfile.data.id
          )[0]?.check_in === null || res2.data.status === 4
            ? setdisablededitable(true)
            : setdisablededitable(false);
        }
        res2.data.status === 5 || res2.data.status === 6
          ? setcompleteclose(true)
          : setcompleteclose(false);
        res2.data.users.filter(
          (docsome) => docsome.id === dataProfile.data.id
        )[0]?.check_out !== null
          ? setisselfcheckout(true)
          : setisselfcheckout(false);
        var tempin = [],
          tempout = [];
        res2.data.inventories
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
        setselectedforin(tempin);
        setselectedforout(tempout);
        setpraloadingtask(false);
      });
  }, [
    loadingtaskdelete,
    refreshdefaultupdatetask,
    loadingchange,
    loadingstafftask,
    triggertaskdetailupdate,
    loadingtaskdetaildelete,
    triggertaskdetailcreate,
    loadingeditable,
    loadingcheckin,
  ]);

  useEffect(() => {
    if (!isOnClient) {
      return;
    }

    document.getElementById(`card${scrollidupdate}`)?.scrollIntoView(true);
  }, [scrolltriggerupdate, isOnClient]);

  const pageBreadcrumbValue = useMemo(() => {
    const prevpathValue = prevpath?.toLowerCase() || undefined;

    let breadcrumbFirstItemName = "";
    let breadcrumbFirstItemHref = "";

    if (prevpathValue === undefined) {
      breadcrumbFirstItemName = "My Task";
      breadcrumbFirstItemHref = "/tasks/mytask";
    } else {
      const isFromAdminPage = prevpathValue === "admin";

      breadcrumbFirstItemName = isFromAdminPage ? "Task" : "My Task";
      breadcrumbFirstItemHref = isFromAdminPage
        ? "/tasks/admin"
        : "/tasks/mytask";
    }

    return [
      {
        name: breadcrumbFirstItemName,
        hrefValue: breadcrumbFirstItemHref,
      },
      {
        name: "Detail Task",
      },
    ];
  }, [prevpath]);

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={prevpath === "admin" ? "201" : "202"}
      pathArr={pathArr}
      st={st}
      // prevpath={prevpath}
      fixedBreadcrumbValues={pageBreadcrumbValue}
    >
      <AccessControl hasPermission={TASK_GET}>
        <div className="grid grid-cols-12 px-5">
          <div className=" col-span-9 flex flex-col">
            <div className="shadow-md rounded-md bg-white p-5 mb-6 mr-3 flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center">
                  <div
                    className="mr-3 cursor-pointer"
                    onClick={() => {
                      handlePushRouterBack();

                      // if (prevpath) {
                      //   prevpath === "admin" && rt.push(`/tasks/admin`);
                      //   prevpath === "mytask" && rt.push(`/tasks/mytask`);
                      // }
                    }}
                  >
                    <BackIconSvg size={20} color={`#000000`} />
                  </div>
                  <div className="ml-3">
                    <H1>{displaytask.name}</H1>
                  </div>
                </div>
                <div className="p-2 rounded bg-red-50 text-state1 text-xs flex">
                  <div className="mr-1 flex items-center">
                    <ClockIconSvg size={15} color={`#BF4A40`} />
                  </div>
                  Berakhir {/* Nullable: */}
                  {displaytask.deadline
                    ? moment(displaytask.deadline).locale("id").format("lll")
                    : "-"}
                </div>
              </div>
              <div className="flex flex-col mb-7">
                <div className="mb-2">
                  <Label>Deskripsi</Label>
                </div>
                <div>
                  <p className="mb-0 text-sm text-gray-600">
                    {displaytask.description === "" ||
                    displaytask.description === "-"
                      ? `-`
                      : displaytask.description}
                  </p>
                </div>
              </div>
              {displaytask.created_by === dataProfile.data.id ? (
                <div className="flex flex-col mb-7">
                  <div className="mb-3">
                    <Label>Daftar Staff</Label>
                  </div>
                  <div className=" border rounded-md mb-3">
                    <div className="grid grid-cols-12 mb-3">
                      <div className=" col-span-1 flex items-center p-2">
                        <H2>No.</H2>
                      </div>
                      <div className=" col-span-5 flex items-center p-2">
                        <div
                          className="mr-1 flex items-center cursor-pointer"
                          onClick={() => {
                            var temp = [...displaytask.users];
                            var temp2 = [];
                            if (sortstate === 0)
                              temp2 = temp.sort((a, b) =>
                                a.name > b.name ? 1 : -1
                              );
                            else if (sortstate === 1)
                              temp2 = temp.sort((a, b) =>
                                a.name < b.name ? 1 : -1
                              );
                            else if (sortstate === -1) temp2 = users2;
                            setdisplaytask((prev) => ({
                              ...prev,
                              users: temp2,
                            }));
                            var tempsort = sortstate;
                            tempsort === 0 ? setsortstate(1) : null;
                            tempsort === 1 ? setsortstate(-1) : null;
                            tempsort === -1 ? setsortstate(0) : null;
                          }}
                        >
                          {sortstate === -1 && (
                            <SortDescendingIconSvg
                              size={15}
                              color={`#8f8f8f`}
                            />
                          )}
                          {sortstate === 0 && (
                            <ArrowsSortIconSvg size={15} color={`#CCCCCC`} />
                          )}
                          {sortstate === 1 && (
                            <SortAscendingIconSvg size={15} color={`#8f8f8f`} />
                          )}
                        </div>
                        <div className="flex items-center">
                          <H2>Staf</H2>
                        </div>
                      </div>
                      <div className=" col-span-3 flex items-center p-2">
                        <H2>Check In</H2>
                      </div>
                      <div className=" col-span-3 flex items-center p-2">
                        <H2>Check Out</H2>
                      </div>
                      {displaytask.users.map((docusers, idxusers) => (
                        <React.Fragment key={idxusers}>
                          <div className=" col-span-1 flex items-center py-2 pl-3">
                            <div className=" text-black mb-0 text-xs">
                              {idxusers + 1}
                            </div>
                          </div>
                          <div className=" col-span-5 flex items-center p-2">
                            <div className="mr-1 flex items-center w-10 h-10 rounded-full">
                              <img
                                src={generateStaticAssetUrl(
                                  docusers.profile_image?.link
                                )}
                                // src={
                                //   docusers.profile_image === "-" ||
                                //   docusers.profile_image === ""
                                //     ? "/image/staffTask.png"
                                //     : docusers.profile_image
                                // }
                                className=" object-contain"
                                alt=""
                              />
                            </div>
                            <div className="flex items-center">
                              <div className=" text-black mb-0 text-xs">
                                {docusers.name}
                              </div>
                            </div>
                          </div>
                          <div className=" col-span-3 flex items-center p-2">
                            <div className=" text-black mb-0 text-xs">
                              {docusers.check_in === null
                                ? `-`
                                : moment(docusers.check_in)
                                    .locale("id")
                                    .format("lll")}
                            </div>
                          </div>
                          <div className=" col-span-3 flex items-center p-2">
                            <div className=" text-black mb-0 text-xs">
                              {docusers.check_out === null
                                ? `-`
                                : moment(docusers.check_out)
                                    .locale("id")
                                    .format("lll")}
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  {completeclose === false && (
                    <div className=" flex justify-end mb-3">
                      <Buttonsys
                        type={`primary`}
                        disabled={!isAllowedToUpdateTask}
                        onClick={() => {
                          setdrawertaskupdate(true);
                          setscrollidupdate(6);
                          setscrolltriggerupdate((prev) => !prev);
                        }}
                      >
                        <div className="mb-1">
                          <UserPlusIconSvg size={15} color={`#ffffff`} />
                        </div>
                        Tambah Staff
                      </Buttonsys>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="mb-1">
                      <Label>Status</Label>
                    </div>
                    <div>
                      {displaytask.status === 1 && <H2>Overdue</H2>}
                      {displaytask.status === 2 && <H2>Open</H2>}
                      {displaytask.status === 3 && <H2>On Progress</H2>}
                      {displaytask.status === 4 && <H2>On Hold</H2>}
                      {displaytask.status === 5 && <H2>Completed</H2>}
                      {displaytask.status === 6 && <H2>Closed</H2>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" flex flex-col mb-7">
                  <div className="flex flex-col mb-7">
                    <div className="mb-3">
                      <Label>Daftar Staff</Label>
                    </div>
                    <div className=" border rounded-md mb-3">
                      <div className="grid grid-cols-12 mb-3">
                        <div className=" col-span-1 flex items-center p-2">
                          <H2>No.</H2>
                        </div>
                        <div className=" col-span-5 flex items-center p-2">
                          <div
                            className="mr-1 flex items-center cursor-pointer"
                            onClick={() => {
                              var temp = [...displaytask.users];
                              var temp2 = [];
                              if (sortstate === 0)
                                temp2 = temp.sort((a, b) =>
                                  a.name > b.name ? 1 : -1
                                );
                              else if (sortstate === 1)
                                temp2 = temp.sort((a, b) =>
                                  a.name < b.name ? 1 : -1
                                );
                              else if (sortstate === -1) temp2 = users2;
                              setdisplaytask((prev) => ({
                                ...prev,
                                users: temp2,
                              }));
                              var tempsort = sortstate;
                              tempsort === 0 ? setsortstate(1) : null;
                              tempsort === 1 ? setsortstate(-1) : null;
                              tempsort === -1 ? setsortstate(0) : null;
                            }}
                          >
                            {sortstate === -1 && (
                              <SortDescendingIconSvg
                                size={15}
                                color={`#8f8f8f`}
                              />
                            )}
                            {sortstate === 0 && (
                              <ArrowsSortIconSvg size={15} color={`#CCCCCC`} />
                            )}
                            {sortstate === 1 && (
                              <SortAscendingIconSvg
                                size={15}
                                color={`#8f8f8f`}
                              />
                            )}
                          </div>
                          <div className="flex items-center">
                            <H2>Staf</H2>
                          </div>
                        </div>
                        <div className=" col-span-3 flex items-center p-2">
                          <H2>Check In</H2>
                        </div>
                        <div className=" col-span-3 flex items-center p-2">
                          <H2>Check Out</H2>
                        </div>
                        {displaytask.users.map((docusers, idxusers) => (
                          <React.Fragment key={idxusers}>
                            <div className=" col-span-1 flex items-center py-2 pl-3">
                              <div className=" text-black text-xs mb-0">
                                {idxusers + 1}
                              </div>
                            </div>
                            <div className=" col-span-5 flex items-center p-2">
                              <div className="mr-1 flex items-center w-10 h-10 rounded-full">
                                <img
                                  src={generateStaticAssetUrl(
                                    docusers.profile_image?.link
                                  )}
                                  // src={
                                  //   docusers.profile_image === "-" ||
                                  //   docusers.profile_image === ""
                                  //     ? "/image/staffTask.png"
                                  //     : docusers.profile_image
                                  // }
                                  className=" object-contain"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center">
                                <div className=" text-black text-xs mb-0">
                                  {docusers.name}
                                </div>
                              </div>
                            </div>
                            <div className=" col-span-3 flex items-center p-2">
                              <div className=" text-black text-xs mb-0">
                                {docusers.check_in === null
                                  ? `-`
                                  : moment(docusers.check_in)
                                      .locale("id")
                                      .format("lll")}
                              </div>
                            </div>
                            <div className=" col-span-3 flex items-center p-2">
                              <div className=" text-black text-xs mb-0">
                                {docusers.check_out === null
                                  ? `-`
                                  : moment(docusers.check_out)
                                      .locale("id")
                                      .format("lll")}
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-7">
                    <div className="mb-1">
                      <Label>Status</Label>
                    </div>
                    <div>
                      {displaytask.status === 1 && <H2>Overdue</H2>}
                      {displaytask.status === 2 && <H2>Open</H2>}
                      {displaytask.status === 3 && <H2>On Progress</H2>}
                      {displaytask.status === 4 && <H2>On Hold</H2>}
                      {displaytask.status === 5 && <H2>Completed</H2>}
                      {displaytask.status === 6 && <H2>Closed</H2>}
                    </div>
                  </div>
                  <div className="flex flex-col mb-7">
                    <div className="mb-1">
                      <Label>Jenis Task</Label>
                    </div>
                    <div>
                      {displaytask.users.length <= 1 ? (
                        <H2>Task Individu</H2>
                      ) : (
                        <H2>Task Kelompok</H2>
                      )}
                    </div>
                  </div>
                  <div className=" flex flex-col">
                    <div className=" mb-1">
                      <Label>Revisi Pekerjaan</Label>
                    </div>
                    <div>
                      <p className=" mb-0 text-sm text-gray-700">
                        {displaytask.notes === null ? `-` : displaytask.notes}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-col mb-7">
                {praloadingtask ? (
                  <>
                    <Spin />
                  </>
                ) : displaytask.task_details.filter(
                    (docfil) =>
                      docfil.users.some(
                        (docsome) => docsome.id === dataProfile.data.id
                      ) || displaytask.created_by === dataProfile.data.id
                  ).length === 0 ? (
                  <>
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="Belum ada pekerjaan yang ditugaskan"
                    />
                  </>
                ) : (
                  displaytask.task_details
                    .filter(
                      (docfil) =>
                        docfil.users.some(
                          (docsome) => docsome.id === dataProfile.data.id
                        ) || displaytask.created_by === dataProfile.data.id
                    )
                    .map((doctask, idxtask) => {
                      return (
                        <div className="flex flex-col mb-5" key={idxtask}>
                          <div className="mb-3">
                            <p
                              className={`font-bold text-lg text-gray-600 mb-0`}
                            >
                              {doctask.component.name}
                            </p>
                          </div>
                          {doctask.component.description !== "" && (
                            <div className="mb-3">
                              <p className="mb-0 text-sm text-gray-500">
                                {doctask.component.description}
                              </p>
                            </div>
                          )}
                          {displaytask.created_by === dataProfile.data.id && (
                            <div className="mb-3 flex items-center">
                              <div className="flex items-center">
                                {doctask.users.map(
                                  (doctaskuser, idxtaskuser) => (
                                    <div
                                      className=" bg-primary100 bg-opacity-10 rounded p-1 flex items-center mr-2"
                                      key={idxtaskuser}
                                    >
                                      <div className="w-6 h-6 rounded-full mr-1">
                                        <img
                                          src={generateStaticAssetUrl(
                                            doctaskuser.profile_image?.link
                                          )}
                                          // src={
                                          //   doctaskuser.profile_image === "-"
                                          //     ? "/image/staffTask.png"
                                          //     : doctaskuser.profile_image
                                          // }
                                          alt=""
                                          className=" object-contain"
                                        />
                                      </div>
                                      <p className="mb-0 text-primary100 mr-1">
                                        {doctaskuser.name}
                                      </p>
                                      {/* <div className=' cursor-pointer flex items-center'>
                                                                              <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                                          </div> */}
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="dropdown">
                                {completeclose === false && (
                                  <div
                                    tabIndex={`0`}
                                    onClick={() => {
                                      setcurrentidstafftask(doctask.id);
                                      setdisplaycurrentstafftask(
                                        displaytask.users.filter(
                                          (fil) =>
                                            doctask.users
                                              .map((m) => m.id)
                                              .includes(fil.id) === false
                                        )
                                      );
                                      setdisplaycurrentstafftask2(
                                        displaytask.users.filter(
                                          (fil) =>
                                            doctask.users
                                              .map((m) => m.id)
                                              .includes(fil.id) === false
                                        )
                                      );
                                      setcurrentstafftask(doctask.users);
                                    }}
                                  >
                                    <p className="mb-0 font-semibold text-sm text-primary100 hover:text-primary75 cursor-pointer flex items-center">
                                      <EditIconSvg
                                        size={15}
                                        color={`#35763B`}
                                      />
                                      Atur Staff
                                    </p>
                                  </div>
                                )}
                                <div
                                  tabIndex={`0`}
                                  className="p-5 shadow menu dropdown-content bg-white rounded-box w-80 flex flex-col"
                                >
                                  <Spin spinning={loadingstafftask}>
                                    {currentstafftask.length === 0 ? (
                                      <>
                                        <Empty
                                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                      </>
                                    ) : (
                                      currentstafftask.map((doc, idx) => {
                                        return (
                                          <React.Fragment key={idx}>
                                            <div className=" mb-4 flex items-center">
                                              <div className=" w-10 h-10 rounded-full">
                                                <img
                                                  src={generateStaticAssetUrl(
                                                    doc.profile_image?.link
                                                  )}
                                                  // src={
                                                  //   currentstafftask[idx]
                                                  //     .profile_image === "" ||
                                                  //   doc.profile_image === "-"
                                                  //     ? "/image/staffTask.png"
                                                  //     : `${doc.profile_image}`
                                                  // }
                                                  className=" object-contain w-10 h-10"
                                                  alt=""
                                                />
                                              </div>
                                              <div className=" flex flex-col justify-center">
                                                <div className="mb-1 flex">
                                                  <div className="mr-1">
                                                    <H2>{doc.name}</H2>
                                                  </div>
                                                  <div
                                                    className=" cursor-pointer"
                                                    onClick={() => {
                                                      var temp = [
                                                        ...currentstafftask,
                                                      ];
                                                      temp.splice(idx, 1);
                                                      setcurrentstafftask(temp);
                                                      setdisplaycurrentstafftask(
                                                        [
                                                          ...displaycurrentstafftask,
                                                          doc,
                                                        ]
                                                      );
                                                    }}
                                                  >
                                                    <CircleXIconSvg
                                                      size={15}
                                                      color={`#BF4A40`}
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <Label>
                                                    {
                                                      displaytask.users.filter(
                                                        (fil) =>
                                                          fil.id === doc.id
                                                      )[0].position
                                                    }
                                                  </Label>
                                                </div>
                                              </div>
                                            </div>
                                          </React.Fragment>
                                        );
                                      })
                                    )}
                                    <div className=" mb-4">
                                      <Input
                                        allowClear
                                        placeholder="Nama Staff, Group.."
                                        onChange={(e) => {
                                          if (e.target.value === "") {
                                            setdisplaycurrentstafftask(
                                              displaycurrentstafftask2.filter(
                                                (docfil) =>
                                                  currentstafftask
                                                    .map((doc) => doc.id)
                                                    .includes(docfil.id) ===
                                                  false
                                              )
                                            );
                                          } else {
                                            var temp = [
                                              ...displaycurrentstafftask,
                                            ];
                                            var tempfil = temp.filter(
                                              (docfil) =>
                                                docfil.name
                                                  .toLowerCase()
                                                  .includes(
                                                    e.target.value.toLowerCase()
                                                  )
                                            );
                                            setdisplaycurrentstafftask(tempfil);
                                          }
                                        }}
                                      ></Input>
                                    </div>
                                    {displaycurrentstafftask.length === 0 ? (
                                      <>
                                        <Empty
                                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                      </>
                                    ) : (
                                      displaycurrentstafftask.map(
                                        (doc, idx) => (
                                          <div
                                            className=" mb-4 flex items-center cursor-pointer"
                                            onClick={() => {
                                              setcurrentstafftask([
                                                ...currentstafftask,
                                                doc,
                                              ]);
                                              var temp = [
                                                ...displaycurrentstafftask,
                                              ];
                                              temp.splice(idx, 1);
                                              setdisplaycurrentstafftask(temp);
                                            }}
                                            key={idx}
                                          >
                                            <div className=" w-10 h-10 rounded-full">
                                              <img
                                                src={generateStaticAssetUrl(
                                                  doc.profile_image?.link
                                                )}
                                                // src={
                                                //   doc.profile_image === "" ||
                                                //   doc.profile_image === "-"
                                                //     ? "/image/staffTask.png"
                                                //     : `${doc.profile_image}`
                                                // }
                                                className=" object-contain w-10 h-10"
                                                alt=""
                                              />
                                            </div>
                                            <div className=" flex flex-col justify-center">
                                              <div className="mb-1 flex">
                                                <div className="mr-1">
                                                  <H2>{doc.name}</H2>
                                                </div>
                                              </div>
                                              <div>
                                                <Label>
                                                  {
                                                    displaytask.users.filter(
                                                      (fil) => fil.id === doc.id
                                                    )[0].position
                                                  }
                                                </Label>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )
                                    )}
                                    <div className=" flex justify-end">
                                      <Buttonsys
                                        type={`primary`}
                                        disabled={!isAllowedToDetailAssign}
                                        onClick={handleAssignStaffTaskDetail}
                                      >
                                        <CheckIconSvg
                                          size={15}
                                          color={`#ffffff`}
                                        />
                                        Simpan Perubahan
                                      </Buttonsys>
                                    </div>
                                  </Spin>
                                </div>
                              </div>
                            </div>
                          )}
                          {doctask.component.type === 1 && (
                            <>
                              {displaytask.created_by ===
                              dataProfile.data.id ? (
                                <div className="mb-3 flex flex-col">
                                  <p className="mb-2 font-bold text-sm">
                                    Catatan Pekerjaan
                                  </p>
                                  <div className=" w-full rounded-md flex overflow-hidden p-2 text-gray-600 border ">
                                    {doctask.component.values}
                                  </div>
                                </div>
                              ) : (
                                <div className="mb-3 flex flex-col">
                                  <p className="mb-2 font-bold text-sm">
                                    Catatan Pekerjaan
                                  </p>
                                  {editable[idxtask] ? (
                                    <Input
                                      defaultValue={doctask.component.values}
                                      onChange={(e) => {
                                        setcurrentdataeditable({
                                          ...currentdataeditable,
                                          id: doctask.id,
                                          values: e.target.value,
                                        });
                                      }}
                                    ></Input>
                                  ) : (
                                    <div className=" w-full rounded-md flex overflow-hidden p-2 text-gray-600 border ">
                                      {doctask.component.values}
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                          {doctask.component.type === 2 && (
                            <>
                              {displaytask.created_by ===
                              dataProfile.data.id ? (
                                <div className="mb-3 flex flex-col">
                                  <p className="mb-2 font-bold text-sm">
                                    Catatan Pekerjaan
                                  </p>
                                  <div className=" w-full rounded-md flex overflow-hidden p-3 text-gray-600 border h-28 ">
                                    {doctask.component.values}
                                  </div>
                                </div>
                              ) : (
                                <div className="mb-3 flex flex-col">
                                  <p className="mb-2 font-bold text-sm">
                                    Catatan Pekerjaan
                                  </p>
                                  {editable[idxtask] ? (
                                    <Input.TextArea
                                      rows={4}
                                      defaultValue={doctask.component.values}
                                      onChange={(e) => {
                                        setcurrentdataeditable({
                                          ...currentdataeditable,
                                          id: doctask.id,
                                          values: e.target.value,
                                        });
                                      }}
                                    ></Input.TextArea>
                                  ) : (
                                    <div className=" w-full rounded-md flex overflow-hidden p-3 text-gray-600 border h-28">
                                      {doctask.component.values}
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                          {doctask.component.type === 3 && (
                            <>
                              {displaytask.created_by ===
                              dataProfile.data.id ? (
                                <div className=" border rounded-md mb-3 w-full p-2">
                                  <div className="grid grid-cols-12 w-full">
                                    <div className=" col-span-5 flex items-center p-2">
                                      <H2>Pekerjaan</H2>
                                    </div>
                                    <div className=" col-span-7 flex items-center p-2">
                                      <H2>Staf</H2>
                                    </div>
                                    {doctask.component.lists.map(
                                      (doc3, idx3) => (
                                        <React.Fragment key={idx3}>
                                          <div className=" col-span-5 flex items-center py-2 px-2">
                                            <p className=" mb-0 text-sm text-gray-700">
                                              {doc3}
                                            </p>
                                          </div>
                                          <div className=" col-span-7 flex items-center py-2 px-2">
                                            <div className="mr-1 flex items-center">
                                              {doctask.component.values[
                                                idx3
                                              ] ? (
                                                <CheckIconSvg
                                                  size={18}
                                                  color={`#35763B`}
                                                />
                                              ) : (
                                                <ForbidIconSvg
                                                  size={18}
                                                  color={`#CCCCCC`}
                                                />
                                              )}
                                            </div>
                                            <div className="flex items-center">
                                              {doctask.component.values[
                                                idx3
                                              ] ? (
                                                <p className=" mb-0 text-sm text-gray-500">
                                                  Telah diceklis
                                                </p>
                                              ) : (
                                                <p className=" mb-0 text-sm text-gray-500">
                                                  Belum diceklis
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        </React.Fragment>
                                      )
                                    )}
                                  </div>
                                </div>
                              ) : editable[idxtask] ? (
                                <div className=" mb-3 flex flex-col">
                                  {doctask.component.lists.map((doc3, idx3) => (
                                    <div className=" mb-3" key={idx3}>
                                      <Checkbox
                                        defaultChecked={
                                          doctask.component.values[idx3]
                                        }
                                        onChange={(e) => {
                                          var temp = [
                                            ...currentdataeditable.values,
                                          ];
                                          temp[idx3] = e.target.checked;
                                          setcurrentdataeditable({
                                            ...currentdataeditable,
                                            values: temp,
                                          });
                                        }}
                                      >
                                        {doc3}
                                      </Checkbox>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className=" border rounded-md mb-3 w-full p-2">
                                  <div className="grid grid-cols-12 w-full">
                                    <div className=" col-span-5 flex items-center p-2">
                                      <H2>Pekerjaan</H2>
                                    </div>
                                    <div className=" col-span-7 flex items-center p-2">
                                      <H2>Staf</H2>
                                    </div>
                                    {doctask.component.lists.map(
                                      (doc3, idx3) => (
                                        <React.Fragment key={idx3}>
                                          <div className=" col-span-5 flex items-center py-2 px-2">
                                            <p className=" mb-0 text-sm text-gray-700">
                                              {doc3}
                                            </p>
                                          </div>
                                          <div className=" col-span-7 flex items-center py-2 px-2">
                                            <div className="mr-1 flex items-center">
                                              {doctask.component.values[
                                                idx3
                                              ] ? (
                                                <CheckIconSvg
                                                  size={18}
                                                  color={`#35763B`}
                                                />
                                              ) : (
                                                <ForbidIconSvg
                                                  size={18}
                                                  color={`#CCCCCC`}
                                                />
                                              )}
                                            </div>
                                            <div className="flex items-center">
                                              {doctask.component.values[
                                                idx3
                                              ] ? (
                                                <p className=" mb-0 text-sm text-gray-500">
                                                  Telah diceklis
                                                </p>
                                              ) : (
                                                <p className=" mb-0 text-sm text-gray-500">
                                                  Belum diceklis
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        </React.Fragment>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                          {doctask.component.type === 4 && (
                            <>
                              {displaytask.created_by ===
                              dataProfile.data.id ? (
                                <div className=" border rounded-md mb-3 w-full p-2">
                                  <div className={`grid grid-cols-12 w-full`}>
                                    <div className=" col-span-4 flex items-center p-2">
                                      {/* <div className='mr-1 flex items-center cursor-pointer' onClick={() => {
                                                                                      var awaltemp = datatype4.filter((docfil, idxfil) => docfil[0].id === doctask.id)[0]
                                                                                      var temp = [...awaltemp]
                                                                                      var temp2 = []
                                                                                      if (sort4state === 0)
                                                                                          temp2 = temp.sort((a, b) => a.model > b.model ? 1 : -1)
                                                                                      else if (sort4state === 1)
                                                                                          temp2 = temp.sort((a, b) => a.model < b.model ? 1 : -1)
                                                                                      else if (sort4state === -1)
                                                                                          temp2 = datatype42.filter((docfil, idxfil) => docfil[0].id === doctask.id)[0]
                                                                                      setdatatype4([...[temp2]])
                                                                                      var tempsort = sort4state
                                                                                      tempsort === 0 ? setsort4state(1) : null
                                                                                      tempsort === 1 ? setsort4state(-1) : null
                                                                                      tempsort === -1 ? setsort4state(0) : null
                                                                                  }}>
                                                                                      {sort4state === -1 && <SortDescendingIconSvg size={15} color={`#8f8f8f`} />}
                                                                                      {sort4state === 0 && <ArrowsSortIconSvg size={15} color={`#CCCCCC`} />}
                                                                                      {sort4state === 1 && <SortAscendingIconSvg size={15} color={`#8f8f8f`} />}
                                                                                  </div> */}
                                      <div className="flex items-center">
                                        <H2>Model</H2>
                                      </div>
                                    </div>
                                    {doctask.component.columns.map(
                                      (doccol, idxcol) => (
                                        <div
                                          className=" col-span-2 flex items-center justify-center p-2"
                                          key={idxcol}
                                        >
                                          <H2>{doccol}</H2>
                                        </div>
                                      )
                                    )}
                                  </div>
                                  {datatype4
                                    ?.filter(
                                      (docfil, idxfil) =>
                                        docfil[0]?.id === doctask.id
                                    )[0]
                                    ?.map((doc4, idx4) => (
                                      <div
                                        className="grid grid-cols-12"
                                        key={idx4}
                                      >
                                        <div className=" col-span-4 flex items-center py-2 px-2">
                                          <p className=" mb-0 text-sm text-gray-700">
                                            {doc4.model}
                                          </p>
                                        </div>
                                        {doctask.component.columns.map(
                                          (doc41, idx41) => (
                                            <div
                                              className=" col-span-2 flex items-center justify-center py-2 px-2"
                                              key={idx4}
                                            >
                                              {doc4[doc41] ? (
                                                <CheckIconSvg
                                                  size={18}
                                                  color={`#35763B`}
                                                />
                                              ) : (
                                                <CheckIconSvg
                                                  size={18}
                                                  color={`#CCCCCC`}
                                                />
                                              )}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ))}
                                </div>
                              ) : editable[idxtask] ? (
                                <div className="border rounded-md mb-3 w-full p-2">
                                  <div className={`grid grid-cols-12 w-full`}>
                                    <div className=" col-span-3 flex items-center p-2">
                                      <H2>Model</H2>
                                    </div>
                                    {doctask.component.columns.map(
                                      (doccol, idxcol) => (
                                        <div
                                          className=" col-span-2 flex items-center justify-center p-2"
                                          key={idxcol}
                                        >
                                          <H2>{doccol}</H2>
                                        </div>
                                      )
                                    )}
                                  </div>
                                  {datatype4
                                    .filter(
                                      (docfil, idxfil) =>
                                        docfil[0].id === doctask.id
                                    )[0]
                                    .map((doc4, idx4) => (
                                      <div className="grid grid-cols-12">
                                        <div className=" col-span-3 flex items-center py-2 px-2">
                                          <p className=" mb-0 text-sm text-gray-700">
                                            {doc4.model}
                                          </p>
                                        </div>
                                        {doctask.component.columns.map(
                                          (doc41, idx41) => (
                                            <div className=" col-span-2 flex items-center justify-center py-2 px-2">
                                              {doc4[doc41] ? (
                                                <Buttonsys
                                                  type={`primary`}
                                                  color={`danger`}
                                                  onClick={() => {
                                                    var temp = [
                                                      ...currentdataeditable.values,
                                                    ];
                                                    temp[idx41][idx4] = false;
                                                    setcurrentdataeditable({
                                                      ...currentdataeditable,
                                                      values: temp,
                                                    });
                                                    var temp2 = [...datatype4];
                                                    var idxtemp2 = temp2
                                                      .map(
                                                        (docmap) => docmap[0].id
                                                      )
                                                      .indexOf(doctask.id);
                                                    temp2[idxtemp2][idx4][
                                                      doc41
                                                    ] = false;
                                                    setdatatype4(temp2);
                                                  }}
                                                >
                                                  <div className=" mr-1">
                                                    <RefreshIconSvg
                                                      size={15}
                                                      color={`#ffffff`}
                                                    />
                                                  </div>
                                                  Uncheck
                                                </Buttonsys>
                                              ) : (
                                                <Buttonsys
                                                  type={`primary`}
                                                  onClick={() => {
                                                    var temp = [
                                                      ...currentdataeditable.values,
                                                    ];
                                                    temp[idx41][idx4] = true;
                                                    setcurrentdataeditable({
                                                      ...currentdataeditable,
                                                      values: temp,
                                                    });
                                                    var temp2 = [...datatype4];
                                                    var idxtemp2 = temp2
                                                      .map(
                                                        (docmap) => docmap[0].id
                                                      )
                                                      .indexOf(doctask.id);
                                                    temp2[idxtemp2][idx4][
                                                      doc41
                                                    ] = true;
                                                    setdatatype4(temp2);
                                                  }}
                                                >
                                                  <div className=" mr-1">
                                                    <CheckIconSvg
                                                      size={15}
                                                      color={`#ffffff`}
                                                    />
                                                  </div>
                                                  Check
                                                </Buttonsys>
                                              )}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ))}
                                </div>
                              ) : (
                                <div className=" border rounded-md mb-3 w-full p-2">
                                  <div className={`grid grid-cols-12 w-full`}>
                                    <div className=" col-span-4 flex items-center p-2">
                                      <div
                                        className="mr-1 flex items-center cursor-pointer"
                                        onClick={() => {
                                          var awaltemp = datatype4.filter(
                                            (docfil, idxfil) =>
                                              docfil[0].id === doctask.id
                                          )[0];
                                          var temp = [...awaltemp];
                                          var temp2 = [];
                                          if (sort4state === 0)
                                            temp2 = temp.sort((a, b) =>
                                              a.model > b.model ? 1 : -1
                                            );
                                          else if (sort4state === 1)
                                            temp2 = temp.sort((a, b) =>
                                              a.model < b.model ? 1 : -1
                                            );
                                          else if (sort4state === -1)
                                            temp2 = datatype42.filter(
                                              (docfil, idxfil) =>
                                                docfil[0].id === doctask.id
                                            )[0];
                                          setdatatype4([...[temp2]]);
                                          var tempsort = sort4state;
                                          tempsort === 0
                                            ? setsort4state(1)
                                            : null;
                                          tempsort === 1
                                            ? setsort4state(-1)
                                            : null;
                                          tempsort === -1
                                            ? setsort4state(0)
                                            : null;
                                        }}
                                      >
                                        {sort4state === -1 && (
                                          <SortDescendingIconSvg
                                            size={15}
                                            color={`#8f8f8f`}
                                          />
                                        )}
                                        {sort4state === 0 && (
                                          <ArrowsSortIconSvg
                                            size={15}
                                            color={`#CCCCCC`}
                                          />
                                        )}
                                        {sort4state === 1 && (
                                          <SortAscendingIconSvg
                                            size={15}
                                            color={`#8f8f8f`}
                                          />
                                        )}
                                      </div>
                                      <div className="flex items-center">
                                        <H2>Model</H2>
                                      </div>
                                    </div>
                                    {doctask.component.columns.map(
                                      (doccol, idxcol) => (
                                        <div className=" col-span-2 flex items-center justify-center p-2">
                                          <H2>{doccol}</H2>
                                        </div>
                                      )
                                    )}
                                  </div>
                                  {datatype4
                                    .filter(
                                      (docfil, idxfil) =>
                                        docfil[0]?.id === doctask.id
                                    )[0]
                                    ?.map((doc4, idx4) => (
                                      <div className="grid grid-cols-12">
                                        <div className=" col-span-4 flex items-center py-2 px-2">
                                          <p className=" mb-0 text-sm text-gray-700">
                                            {doc4.model}
                                          </p>
                                        </div>
                                        {doctask.component.columns.map(
                                          (doc41, idx41) => (
                                            <div className=" col-span-2 flex items-center justify-center py-2 px-2">
                                              {doc4[doc41] ? (
                                                <CheckIconSvg
                                                  size={18}
                                                  color={`#35763B`}
                                                />
                                              ) : (
                                                <CheckIconSvg
                                                  size={18}
                                                  color={`#CCCCCC`}
                                                />
                                              )}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ))}
                                </div>
                              )}
                            </>
                          )}
                          {doctask.component.type === 5 && (
                            <>
                              {displaytask.created_by ===
                              dataProfile.data.id ? (
                                <div className=" border rounded-md mb-3 w-full p-2">
                                  <div className="grid grid-cols-12 w-full">
                                    <div className=" col-span-4 flex items-center p-2">
                                      <H2>Keterangan</H2>
                                    </div>
                                    <div className=" col-span-2 flex items-center p-2">
                                      <H2>Nilai</H2>
                                    </div>
                                    <div className=" col-span-2 flex items-center p-2">
                                      <H2>Satuan</H2>
                                    </div>
                                  </div>
                                  {doctask.component.lists.map((doc3, idx3) => (
                                    <div className="grid grid-cols-12">
                                      <div className=" col-span-4 flex items-center py-2 px-2">
                                        <p className=" mb-0 text-sm text-gray-700">
                                          {doc3.description}
                                        </p>
                                      </div>
                                      <div className=" col-span-2 flex items-center py-2 px-2">
                                        <p className=" mb-0 text-sm text-gray-700">
                                          {doc3.values}
                                        </p>
                                      </div>
                                      <div className=" col-span-2 flex items-center py-2 px-2">
                                        <p className=" mb-0 text-sm font-semibold text-gray-700">
                                          {doc3.type}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : editable[idxtask] ? (
                                <div className=" border rounded-md mb-3 w-full p-2">
                                  <div className="grid grid-cols-12 w-full">
                                    <div className=" col-span-2 flex items-center p-2">
                                      <H2>Nilai</H2>
                                    </div>
                                    <div className=" col-span-4 flex items-center p-2">
                                      <H2>Keterangan</H2>
                                    </div>
                                    <div className=" col-span-2 flex items-center p-2">
                                      <H2>Satuan</H2>
                                    </div>
                                  </div>
                                  {doctask.component.lists.map((doc3, idx3) => (
                                    <div className="grid grid-cols-12">
                                      <div className=" col-span-2 flex items-center py-2 px-2">
                                        <Input
                                          bordered={false}
                                          defaultValue={doc3.values}
                                          onChange={(e) => {
                                            var temp = [
                                              ...currentdataeditable.values,
                                            ];
                                            temp[idx3] = e.target.value;
                                            setcurrentdataeditable({
                                              ...currentdataeditable,
                                              values: temp,
                                            });
                                          }}
                                        ></Input>
                                      </div>
                                      <div className=" col-span-4 flex items-center py-2 px-2">
                                        <p className=" mb-0 text-sm text-gray-700">
                                          {doc3.description}
                                        </p>
                                      </div>
                                      <div className=" col-span-2 flex items-center py-2 px-2">
                                        <p className=" mb-0 text-sm font-semibold text-gray-700">
                                          {doc3.type}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className=" border rounded-md mb-3 w-full p-2">
                                  <div className="grid grid-cols-12 w-full">
                                    <div className=" col-span-4 flex items-center p-2">
                                      <H2>Keterangan</H2>
                                    </div>
                                    <div className=" col-span-2 flex items-center p-2">
                                      <H2>Nilai</H2>
                                    </div>
                                    <div className=" col-span-2 flex items-center p-2">
                                      <H2>Satuan</H2>
                                    </div>
                                  </div>
                                  {doctask.component.lists.map((doc3, idx3) => (
                                    <div className="grid grid-cols-12">
                                      <div className=" col-span-4 flex items-center py-2 px-2">
                                        <p className=" mb-0 text-sm text-gray-700">
                                          {doc3.description}
                                        </p>
                                      </div>
                                      <div className=" col-span-2 flex items-center py-2 px-2">
                                        <p className=" mb-0 text-sm text-gray-700">
                                          {doc3.values}
                                        </p>
                                      </div>
                                      <div className=" col-span-2 flex items-center py-2 px-2">
                                        <p className=" mb-0 text-sm font-semibold text-gray-700">
                                          {doc3.type}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                          {doctask.component.type === 6 && (
                            <>
                              {displaytask.created_by ===
                              dataProfile.data.id ? (
                                <div className=" mb-3 flex flex-col pointer-events-none">
                                  <p className=" mb-2 text-sm text-gray-800">
                                    {doctask.component.dropdown_name}
                                  </p>
                                  <Select
                                    style={{ width: `100%` }}
                                    placeholder="Nilai masih kosong"
                                    defaultValue={
                                      doctask.component.values === "-"
                                        ? null
                                        : doctask.component.values
                                    }
                                  >
                                    {doctask.component.lists.map((docmap) => (
                                      <Select.Option value={docmap}>
                                        {docmap}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </div>
                              ) : editable[idxtask] ? (
                                <div className=" mb-3 flex flex-col">
                                  <p className=" mb-2 text-sm text-gray-800">
                                    {doctask.component.dropdown_name}
                                  </p>
                                  <Select
                                    style={{ width: `100%` }}
                                    placeholder="Nilai masih kosong"
                                    defaultValue={
                                      doctask.component.values === "-"
                                        ? null
                                        : doctask.component.values
                                    }
                                    onChange={(value) => {
                                      setcurrentdataeditable({
                                        ...currentdataeditable,
                                        values: value,
                                      });
                                    }}
                                  >
                                    {doctask.component.lists.map((docmap) => (
                                      <Select.Option value={docmap}>
                                        {docmap}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </div>
                              ) : (
                                <div className=" mb-3 flex flex-col pointer-events-none">
                                  <p className=" mb-2 text-sm text-gray-800">
                                    {doctask.component.dropdown_name}
                                  </p>
                                  <Select
                                    style={{ width: `100%` }}
                                    placeholder="Nilai masih kosong"
                                    defaultValue={
                                      doctask.component.values === "-"
                                        ? null
                                        : doctask.component.values
                                    }
                                  >
                                    {doctask.component.lists.map((docmap) => (
                                      <Select.Option value={docmap}>
                                        {docmap}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </div>
                              )}
                            </>
                          )}
                          {displaytask.created_by === dataProfile.data.id ? (
                            <div className="mb-3 flex justify-end items-center px-4">
                              <div
                                className="mr-2 cursor-pointer"
                                onClick={() => {
                                  if (!isAllowedToUpdateTaskDetail) {
                                    permissionWarningNotification(
                                      "Memperbarui",
                                      "Detail Task"
                                    );
                                    return;
                                  }

                                  setidtaskdetailupdate(doctask.id);
                                  setdrawertaskdetailupdate(true);
                                }}
                              >
                                <EditIconSvg size={20} color={`#000000`} />
                              </div>
                              <div
                                className="ml-2 cursor-pointer"
                                onClick={() => {
                                  if (!isAllowedToDetailDelete) {
                                    permissionWarningNotification(
                                      "Menghapus",
                                      "Detail Task"
                                    );
                                    return;
                                  }

                                  setdatatasktaildelete({
                                    ...datataskdetaildelete,
                                    name: doctask.component.name,
                                    id: doctask.id,
                                  });
                                  setmodaltaskdetaildelete(true);
                                }}
                              >
                                <TrashIconSvg size={20} color={`#000000`} />
                              </div>
                            </div>
                          ) : completeclose && isselfcheckout ? null : editable[
                              idxtask
                            ] ? (
                            <div className=" mb-3 flex justify-end items-center">
                              <div className=" mr-2">
                                <Buttonsys
                                  type={`default`}
                                  onClick={() => {
                                    var temp = [...editable];
                                    temp[idxtask] = false;
                                    seteditable(temp);
                                  }}
                                >
                                  Batalkan
                                </Buttonsys>
                              </div>
                              <Buttonsys
                                type={`primary`}
                                onClick={handleFillTaskDetail}
                                disabled={!isAllowedToDetailFill}
                              >
                                <div className=" mr-1">
                                  <CheckIconSvg size={15} color={`#ffffff`} />
                                </div>
                                Simpan
                              </Buttonsys>
                            </div>
                          ) : (
                            <div className=" mb-3 flex justify-end items-center">
                              <Buttonsys
                                disabled={disablededitable}
                                type={`default`}
                                onClick={() => {
                                  if (
                                    doctask.component.type === 1 ||
                                    doctask.component.type === 2
                                  ) {
                                    setcurrentdataeditable({
                                      id: doctask.id,
                                      values: doctask.component.values,
                                    });
                                  } else if (doctask.component.type === 3) {
                                    setcurrentdataeditable({
                                      id: doctask.id,
                                      values: doctask.component.values,
                                    });
                                  } else if (doctask.component.type === 4) {
                                    setcurrentdataeditable({
                                      id: doctask.id,
                                      values: doctask.component.values,
                                    });
                                  } else if (doctask.component.type === 5) {
                                    setcurrentdataeditable({
                                      id: doctask.id,
                                      values: doctask.component.lists.map(
                                        (docmap) => docmap.values
                                      ),
                                    });
                                  } else if (doctask.component.type === 6) {
                                    setcurrentdataeditable({
                                      id: doctask.id,
                                      values: doctask.component.values,
                                    });
                                  }
                                  var temp = [...editable];
                                  temp[idxtask] = true;
                                  seteditable(temp);
                                }}
                              >
                                <div className=" mr-1">
                                  <EditIconSvg size={15} color={`#35763B`} />
                                </div>
                                Ubah
                              </Buttonsys>
                            </div>
                          )}
                        </div>
                      );
                    })
                )}
              </div>

              {Boolean(displaytask.is_uploadable) && (
                <>
                  <TaskDetailLampiran
                    taskId={Number(taskid)}
                    isSubmitting={loadingsubmittask}
                    isTaskSubmitted={completeclose && isselfcheckout}
                    isSeenAsCreator={
                      displaytask.created_by === dataProfile.data.id
                    }
                    onNewFileChanged={setAttachments}
                    currentAttachments={dataupdate.attachments}
                  />
                  {loadingsubmittask && (
                    <div className="flex items-center space-x-3 mt-4">
                      <Spin /> <em>Sedang mengupload file...</em>
                    </div>
                  )}
                </>
              )}

              {/* {displaytask.created_by !== dataProfile.data.id ? (
                <>
                  {Boolean(displaytask.is_uploadable) && (
                    <div className=" mb-7 flex flex-col">
                      <div className=" flex items-center justify-between mb-4">
                        <div>
                          <H2>Lampiran</H2>
                        </div>
                        {completeclose && isselfcheckout ? null : (
                          <div>
                            <Buttonsys
                              disabled={disablededitable}
                              onChangeGambar={onChangeGambar}
                              type={`defaultInput`}
                            >
                              <div className="mr-1">
                                {loadingfile ? (
                                  <LoadingOutlined
                                    style={{ marginRight: `0.5rem` }}
                                  />
                                ) : (
                                  <CloudUploadIconSvg
                                    size={15}
                                    color={`#35763B`}
                                  />
                                )}
                              </div>
                              Unggah Lampiran
                            </Buttonsys>
                          </div>
                        )}
                      </div>
                      <div className=" grid grid-cols-4 mb-4">
                        {displaytask.files === null ? (
                          <>
                            <Empty
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                              description="Belum ada file yang di upload"
                            ></Empty>
                          </>
                        ) : (
                          dataupdate.files?.map((doc, idx) => (
                            <div className=" col-span-1 mx-1 flex flex-col items-center mb-5">
                              <img
                                src={doc}
                                className=" object-contain mb-1 h-40 w-full"
                                alt=""
                              />
                              {completeclose && isselfcheckout ? null : (
                                <div
                                  className=" cursor-pointer"
                                  onClick={() => {
                                    var tempfiles = [...dataupdate.files];
                                    tempfiles.splice(idx, 1);
                                    setdataupdate((prev) => ({
                                      ...prev,
                                      files: tempfiles,
                                    }));
                                  }}
                                >
                                  <TrashIconSvg size={15} color={`#BF4A40`} />
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                completeclose && (
                  <div className="mb-7 flex flex-col">
                    {displaytask.files?.length === 0 ? (
                      <>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="Belum ada file yang di upload"
                        ></Empty>
                      </>
                    ) : (
                      <div className=" grid grid-cols-3">
                        {displaytask.files?.map((doc, idx) => (
                          <a href={doc} target={`_blank`}>
                            <div className=" col-span-1 mx-2 mb-2 flex flex-col items-center">
                              <img
                                src={doc}
                                className=" object-contain mb-1 max-h-40 w-full"
                                alt=""
                              />
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )} */}
              {displaytask.created_by === dataProfile.data.id ? (
                displaytask.status === 5 ? (
                  <div className=" mb-7 flex flex-col mt-8">
                    <div className=" mb-4 flex items-center">
                      <p className=" mb-0 text-lg text-gray-500">
                        Setujui Task
                      </p>
                    </div>
                    <div className=" mb-4 flex items-center justify-end">
                      <div className="mx-1">
                        <Buttonsys
                          type={`primary`}
                          color={`danger`}
                          onClick={() => {
                            setrevise({ ...revise, display: true });
                          }}
                        >
                          <div className="mr-1">
                            <SearchIconSvg size={15} color={`#ffffff`} />
                          </div>
                          Revisi Task
                        </Buttonsys>
                      </div>
                      <div className="mx-1">
                        <Buttonsys
                          type={`primary`}
                          disabled={revise.display || !isAllowedToApproveTask}
                          onClick={handleApproveTask}
                        >
                          <div className="mr-1">
                            <SearchIconSvg size={15} color={`#ffffff`} />
                          </div>
                          Approve Task
                        </Buttonsys>
                      </div>
                    </div>
                    {revise.display && (
                      <>
                        <div className="mb-4">
                          <TextAreaRequired
                            label={`Deskripsi Perbaikan Task`}
                            onChangeInput={(e) => {
                              setrevise({
                                ...revise,
                                data: {
                                  ...revise.data,
                                  notes: e.target.value,
                                },
                              });
                            }}
                          ></TextAreaRequired>
                        </div>
                        <div className=" mb-4 flex justify-end">
                          <div className="mx-1">
                            <Buttonsys
                              type={`default`}
                              onClick={() => {
                                setrevise({ ...revise, display: false });
                              }}
                            >
                              Batalkan
                            </Buttonsys>
                          </div>
                          <div className="mx-1">
                            <Buttonsys
                              type={`primary`}
                              disabled={
                                isAllowedToDeclineTask
                                  ? revise.data.notes === ""
                                    ? true
                                    : false
                                  : true
                              }
                              // disabled={revise.data.notes === "" ? true : false}
                              onClick={handleReviseTask}
                            >
                              <div className="mr-1">
                                <SendIconSvg size={15} color={`#ffffff`} />
                              </div>
                              Kirim Revisi
                            </Buttonsys>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : displaytask.status === 6 ? null : (
                  <div
                    className="mb-4 border border-dashed border-primary100 hover:border-primary75 hover:text-primary75 py-2 flex justify-center items-center w-full rounded-md cursor-pointer"
                    onClick={() => {
                      if (!isAllowedToAddTaskDetail) {
                        permissionWarningNotification(
                          "Menambahkan",
                          "Pekerjaan Baru"
                        );
                        return;
                      }
                      setdrawertaskdetailcreate(true);
                    }}
                  >
                    <div className="text-primary100">
                      + Tambah Pekerjaan Baru
                    </div>
                  </div>
                )
              ) : displaytask.users.some(
                  (docsome) => docsome.id === dataProfile.data.id
                ) ? (
                completeclose && isselfcheckout ? (
                  <div className=" flex justify-center w-full text-center mt-8">
                    <div className=" mr-2">
                      <CheckIconSvg size={30} color={`#35763B`} />
                    </div>
                    <div>
                      <p className=" mb-0 text-primary100 text-xl">
                        Task telah disubmit
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className=" flex justify-center w-full mt-8">
                    <Buttonsys
                      disabled={
                        loadingsubmittask ||
                        disablededitable ||
                        (!isAllowedToSaveFiles && !isAllowedToSubmitTask)
                      }
                      type={`primary`}
                      // loading={loadingsubmittask}
                      onClick={handleSubmitTask}
                    >
                      <div className="mr-1">
                        <CheckIconSvg size={15} color={`#ffffff`} />
                      </div>
                      Selesai dan Submit
                    </Buttonsys>
                  </div>
                )
              ) : null}

              <AccessControl hasPermission={TASK_DETAIL_DELETE}>
                <ModalHapusTaskDetail
                  title={"Konfirmasi Hapus Task Detail"}
                  visible={modaltaskdetaildelete}
                  onvisible={setmodaltaskdetaildelete}
                  onCancel={() => {
                    setmodaltaskdetaildelete(false);
                  }}
                  loading={loadingtaskdetaildelete}
                  datadelete={datataskdetaildelete}
                  onOk={handleDeleteTaskDetail}
                />
              </AccessControl>
            </div>
          </div>
          <div className=" col-span-3 flex flex-col">
            {praloadingtask ? (
              <>
                <Spin />
              </>
            ) : (
              <div
                className={`shadow-md rounded-md ${
                  displaytask.status === 1 && `bg-overdue`
                } ${displaytask.status === 2 && `bg-open`} ${
                  displaytask.status === 3 && `bg-onprogress`
                } ${displaytask.status === 4 && `bg-onhold`} ${
                  displaytask.status === 5 && `bg-completed`
                } ${
                  displaytask.status === 6 && `bg-closed`
                } p-4 mb-3 ml-3 flex items-center flex-col`}
              >
                <div className=" my-2 text-white">
                  <H2>Waktu Tersisa</H2>
                </div>
                <div className="my-4 flex flex-col items-center">
                  <p className="mb-1 text-4xl font-bold text-white">
                    {timeleft.d}
                  </p>
                  <p className="text-sm mb-0 text-white">Hari</p>
                </div>
                <div className=" my-2 flex justify-around">
                  <div className="flex flex-col mx-3 items-center">
                    <p className="mb-1 text-xl font-bold text-white">
                      {timeleft.h}
                    </p>
                    <p className="text-sm mb-0 text-white">Jam</p>
                  </div>
                  <div className="flex flex-col mx-3 items-center">
                    <p className="mb-1 text-xl font-bold text-white">
                      {timeleft.m}
                    </p>
                    <p className="text-sm mb-0 text-white">Menit</p>
                  </div>
                  <div className="flex flex-col mx-3 items-center">
                    <p className="mb-1 text-xl font-bold text-white">
                      {timeleft.s}
                    </p>
                    <p className="text-sm mb-0 text-white">Detik</p>
                  </div>
                </div>
                {displaytask.status === 5 ||
                displaytask.status === 6 ? null : displaytask.users.every(
                    (docsome) => docsome.id !== dataProfile.data.id
                  ) ? null : (
                  <div
                    className={`mt-2 mb-3 ${
                      displaytask.status === 1 && `text-overdue`
                    } ${displaytask.status === 2 && `text-open`} ${
                      displaytask.status === 3 && `text-onprogress`
                    } ${displaytask.status === 4 && `text-onhold`} ${
                      displaytask.status === 5 && `text-completed`
                    } ${displaytask.status === 6 && `text-closed`}`}
                  >
                    <Buttonsys
                      type={`primary`}
                      color={`white`}
                      disabled={!isAllowedToToggleStatus}
                      onClick={() => {
                        displaytask.status !== 4
                          ? setmodalstatustoggle(true)
                          : handleSwitchToOnHold();
                      }}
                    >
                      {displaytask.status === 4 ? (
                        <>
                          <div className="mr-1">
                            <PlayerPlayIconSvg size={25} color={`#E5C471`} />
                          </div>
                          <p className="mb-0 text-onhold">Lanjutkan Task</p>
                        </>
                      ) : displaytask.created_by !== dataProfile.data.id ? (
                        <>
                          <div className="mr-1">
                            {displaytask.status === 1 && (
                              <ClockIconSvg size={25} color={`#BF4A40`} />
                            )}
                            {displaytask.status === 2 && (
                              <ClockIconSvg size={25} color={`#2F80ED`} />
                            )}
                            {displaytask.status === 3 && (
                              <ClockIconSvg size={25} color={`#ED962F`} />
                            )}
                            {displaytask.status === 5 && (
                              <ClockIconSvg size={25} color={`#6AAA70`} />
                            )}
                            {displaytask.status === 6 && (
                              <ClockIconSvg size={25} color={`#808080`} />
                            )}
                          </div>
                          <p
                            className={`mb-0 ${
                              displaytask.status === 1 && `text-overdue`
                            } ${displaytask.status === 2 && `text-open`} ${
                              displaytask.status === 3 && `text-onprogress`
                            } ${displaytask.status === 4 && `text-onhold`} ${
                              displaytask.status === 5 && `text-completed`
                            } ${displaytask.status === 6 && `text-closed`}`}
                          >
                            Request On Hold
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="mr-1">
                            {displaytask.status === 1 && (
                              <PlayerPauseIconSvg size={25} color={`#BF4A40`} />
                            )}
                            {displaytask.status === 2 && (
                              <PlayerPauseIconSvg size={25} color={`#2F80ED`} />
                            )}
                            {displaytask.status === 3 && (
                              <PlayerPauseIconSvg size={25} color={`#ED962F`} />
                            )}
                            {displaytask.status === 5 && (
                              <PlayerPauseIconSvg size={25} color={`#6AAA70`} />
                            )}
                            {displaytask.status === 6 && (
                              <PlayerPauseIconSvg size={25} color={`#808080`} />
                            )}
                          </div>
                          <p
                            className={`mb-0 ${
                              displaytask.status === 1 && `text-overdue`
                            } ${displaytask.status === 2 && `text-open`} ${
                              displaytask.status === 3 && `text-onprogress`
                            } ${displaytask.status === 4 && `text-onhold`} ${
                              displaytask.status === 5 && `text-completed`
                            } ${displaytask.status === 6 && `text-closed`}`}
                          >
                            Hold Task
                          </p>
                        </>
                      )}
                    </Buttonsys>
                  </div>
                )}

                <AccessControl hasPermission={TASK_STATUS_TOGGLE}>
                  <ModalUbahOnHoldTask
                    title={
                      displaytask.status !== 4
                        ? "Ubah Status On Hold"
                        : "Lanjutkan Task"
                    }
                    visible={modalstatustoggle}
                    onvisible={setmodalstatustoggle}
                    onCancel={() => {
                      setmodalstatustoggle(false);
                    }}
                    loading={loadingchange}
                    onOk={handleSwitchToOnHold}
                    datastatustoggle={datastatustoggle}
                    setdatastatustoggle={setdatastatustoggle}
                    displaytask={displaytask}
                  />
                </AccessControl>
              </div>
            )}
            {praloadingtask ? null : displaytask.created_by ===
              dataProfile.data.id ? null : displaytask.status === 4 ? (
              <div className=" my-3 ml-3">
                <div>
                  <Buttonsys
                    onClick={handleCheckInTask}
                    disabled={true}
                    type={`primary`}
                    fullWidth={true}
                  >
                    Check In
                  </Buttonsys>
                </div>
              </div>
            ) : (
              <div className=" my-3 ml-3">
                <div>
                  <Buttonsys
                    onClick={handleCheckInTask}
                    disabled={
                      isAllowedToToggleAttendance
                        ? disablededitable === true
                          ? false
                          : true
                        : true
                    }
                    // disabled={disablededitable === true ? false : true}
                    type={`primary`}
                    fullWidth={true}
                  >
                    Check In
                  </Buttonsys>
                </div>
              </div>
            )}
            <div className="shadow-md rounded-md bg-white p-4 my-3 ml-3 flex flex-col">
              <div className="my-3 flex flex-col">
                <div className="mb-2">
                  <Label>Tipe Task</Label>
                </div>
                <p className="mb-0 text-sm text-gray-500">
                  {displaytask.task_type.name}
                </p>
              </div>
              <div className="my-3 flex flex-col">
                <div className="mb-2">
                  <Label>Nomor Task</Label>
                </div>
                <p className="mb-0 text-sm text-gray-500">
                  T-000{displaytask.id}
                </p>
              </div>
              <div className="my-3 flex flex-col">
                <div className="mb-2">
                  <Label>Lokasi Task</Label>
                </div>
                <p className="mb-0 text-sm text-gray-500">
                  {displaytask.location === null
                    ? `-`
                    : displaytask.location.full_location}
                </p>
              </div>
              <div className="my-3 flex flex-col">
                <div className="mb-2">
                  <Label>Referensi Tiket (Jika ada)</Label>
                </div>{" "}
                {displaytask.reference_id === null ? (
                  `-`
                ) : (
                  <p className=" mb-0 text-sm text-gray-500">
                    Tiket {displaytask.reference.type.code}-
                    {displaytask.reference.id}
                  </p>
                )}
              </div>
              <div className="my-3 flex flex-col">
                <div className="mb-2">
                  <Label>Pembuat Task</Label>
                </div>
                <div className=" flex items-center">
                  <div className=" rounded-full w-8 h-8">
                    <img
                      src={generateStaticAssetUrl(
                        displaytask.creator.profile_image?.link
                      )}
                      // src={
                      //   displaytask.creator.profile_image === "-" ||
                      //   displaytask.creator.profile_image === ""
                      //     ? `/image/staffTask.png`
                      //     : displaytask.creator.profile_image
                      // }
                      className=" object-contain"
                      alt=""
                    />
                  </div>
                  <p className="mb-0 text-sm text-gray-500 ml-1">
                    {displaytask.creator.name}
                  </p>
                </div>
              </div>
              <div className="my-3 flex flex-col">
                <div className="mb-2">
                  <Label>Tanggal Pembuatan</Label>
                </div>
                <p className="mb-0 text-sm text-gray-500">
                  {displaytask.created_at === null
                    ? `-`
                    : moment(displaytask.created_at).locale("id").format("lll")}
                </p>
              </div>
              {displaytask.created_by === dataProfile.data.id ? (
                displaytask.status === 6 ? (
                  <div className="my-5 flex flex-col items-center">
                    <div className=" mb-3">
                      {isOnClient && (
                        <PDFDownloadLink
                          document={
                            <TaskPDFTemplate
                              detail={displaytask}
                              datatype4={datatype4}
                            />
                          }
                          fileName={`T-000${displaytask.id}-${moment(new Date())
                            .locale("id")
                            .format(`L-LT`)}.pdf`}
                        >
                          <Buttonsys
                            type={`primary`}
                            onClick={() => {
                              console.log(currentdataeditable);
                            }}
                          >
                            <div className="mr-1 flex items-center">
                              <ClipboardcheckIconSvg
                                size={15}
                                color={`#ffffff`}
                              />
                              Cetak Task
                            </div>
                          </Buttonsys>
                        </PDFDownloadLink>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="my-5 flex flex-col items-center">
                    <div className=" mb-3">
                      <Buttonsys
                        type={`default`}
                        disabled={!isAllowedToUpdateTask}
                        onClick={() => {
                          setdrawertaskupdate(true);
                        }}
                      >
                        <div className="mr-1 flex items-center">
                          <EditIconSvg size={15} color={`#35763B`} />
                          Ubah Task
                        </div>
                      </Buttonsys>
                    </div>
                    <div className=" mb-3">
                      <Buttonsys
                        type={`primary`}
                        color={`danger`}
                        disabled={!isAllowedToDeleteTask}
                        onClick={() => {
                          setmodaltaskdelete(true);
                          setdatataskdelete({
                            id: taskid,
                            name: displaytask.name,
                          });
                        }}
                      >
                        <div className="mr-1 flex items-center">
                          <TrashIconSvg size={15} color={`#ffffff`} />
                          Hapus Task
                        </div>
                      </Buttonsys>
                    </div>
                    <div className=" mb-3">
                      {isOnClient && (
                        <PDFDownloadLink
                          document={
                            <TaskPDFTemplate
                              detail={displaytask}
                              datatype4={datatype4}
                            />
                          }
                          fileName={`T-000${displaytask.id}-${moment(new Date())
                            .locale("id")
                            .format(`L-LT`)}.pdf`}
                        >
                          <Buttonsys
                            type={`primary`}
                            onClick={() => {
                              console.log(currentdataeditable);
                            }}
                          >
                            <div className="mr-1 flex items-center">
                              <ClipboardcheckIconSvg
                                size={15}
                                color={`#ffffff`}
                              />
                              Cetak Task
                            </div>
                          </Buttonsys>
                        </PDFDownloadLink>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <div className="my-5 flex flex-col items-center">
                  <div className=" mb-3">
                    {isOnClient && (
                      <PDFDownloadLink
                        document={
                          <TaskPDFTemplate
                            detail={displaytask}
                            datatype4={datatype4}
                          />
                        }
                        fileName={`T-000${displaytask.id}-${moment(new Date())
                          .locale("id")
                          .format(`L-LT`)}.pdf`}
                      >
                        <Buttonsys
                          type={`primary`}
                          onClick={() => {
                            console.log(currentdataeditable);
                          }}
                        >
                          <div className="mr-1 flex items-center">
                            <ClipboardcheckIconSvg
                              size={15}
                              color={`#ffffff`}
                            />
                            Cetak Task
                          </div>
                        </Buttonsys>
                      </PDFDownloadLink>
                    )}
                  </div>
                </div>
              )}
              <AccessControl hasPermission={TASK_DELETE}>
                <ModalHapusTask
                  title={"Konfirmasi Hapus Task"}
                  visible={modaltaskdelete}
                  onvisible={setmodaltaskdelete}
                  onCancel={() => {
                    setmodaltaskdelete(false);
                  }}
                  loading={loadingtaskdelete}
                  datadelete={datataskdelete}
                  onOk={handleDeleteTask}
                />
              </AccessControl>
            </div>
            <div className="shadow-md rounded-md bg-white p-4 mt-3 ml-3 flex flex-col">
              <div className="mb-3">
                <H1>Aset</H1>
              </div>
              {/* .filter((doc) => doc.is_from_task === true) */}
              {displaytask.inventories
                .filter((doc) => Boolean(doc.is_from_task))
                .map((doc, idx) => (
                  <div className="my-3 flex items-center">
                    <div className="mr-2 flex items-center">
                      <AssetIconSvg size={50} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="mb-1 flex">
                        <div className="mr-1">
                          <H2>{doc.model_name}</H2>
                        </div>
                      </div>
                      <div>
                        <Label>
                          {doc.mig_id} - {doc.asset_name}
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              <p className="my-2 text-sm text-gray-500 ml-1">Masuk</p>
              {/* (doc) => doc.is_in === true && doc.is_from_task === false */}
              {displaytask.inventories.filter(
                (doc) => Boolean(doc.is_in) && !Boolean(doc.is_from_task)
              ).length === 0
                ? `-`
                : displaytask.inventories
                    .filter(
                      (doc) => Boolean(doc.is_in) && !Boolean(doc.is_from_task)
                    )
                    .map((doc, idx) => (
                      <div className="my-3 flex items-center">
                        <div className="mr-2 flex items-center">
                          <AssetIconSvg size={50} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="mb-1 flex">
                            <div className="mr-1">
                              <H2>{doc.model_name}</H2>
                            </div>
                          </div>
                          <div>
                            <Label>
                              {doc.mig_id} - {doc.asset_name}
                            </Label>
                          </div>
                        </div>
                      </div>
                    ))}
              <p className="my-2 text-sm text-gray-500 ml-1">Keluar</p>
              {/* (doc) => doc.is_in === false && doc.is_from_task === false */}
              {displaytask.inventories.filter(
                (doc) => !Boolean(doc.is_in) && !Boolean(doc.is_from_task)
              ).length === 0
                ? `-`
                : displaytask.inventories
                    .filter(
                      (doc) => !Boolean(doc.is_in) && !Boolean(doc.is_from_task)
                    )
                    .map((doc, idx) => (
                      <div className="my-3 flex items-center">
                        <div className="mr-2 flex items-center">
                          <AssetIconSvg size={50} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="mb-1 flex">
                            <div className="mr-1">
                              <H2>{doc.model_name}</H2>
                            </div>
                          </div>
                          <div>
                            <Label>
                              {doc.mig_id} - {doc.asset_name}
                            </Label>
                          </div>
                        </div>
                      </div>
                    ))}
              {praloadingtask
                ? null
                : displaytask.created_by !== dataProfile.data.id &&
                  Boolean(displaytask.is_replaceable) && (
                    <>
                      {completeclose && isselfcheckout ? null : (
                        <div className="my-3 flex items-center justify-center">
                          <Buttonsys
                            disabled={disablededitable}
                            type={`default`}
                            onClick={() => {
                              setdrawerspart(true);
                            }}
                          >
                            <div className="mr-1">
                              <EditIconSvg size={18} color={`#35763B`} />
                            </div>
                            Pergantian Suku Cadang
                          </Buttonsys>
                        </div>
                      )}
                    </>
                  )}
            </div>
          </div>
        </div>
        {praloadingtask ? (
          <div id={`card-1`} className=" flex justify-center"></div>
        ) : (
          <AccessControl hasPermission={TASK_UPDATE}>
            <DrawerTaskUpdate
              title={"Ubah Task"}
              visible={drawertaskupdate}
              onClose={() => {
                setdrawertaskupdate(false);
              }}
              buttonOkText={"Simpan Task"}
              initProps={initProps}
              onvisible={setdrawertaskupdate}
              dataupdate={dataupdate}
              setdataupdate={setdataupdate}
              loading={praloadingtask}
              selecteditems={selecteditems}
              setselecteditems={setselecteditems}
              selectedstaffgroup={selectedstaffgroup}
              setselectedstaffgroup={setselectedstaffgroup}
              switchstaffgroup={switchstaffgroup}
              setswitchstaffgroup={setswitchstaffgroup}
              now={now}
              setnow={setnow}
              choosedate={choosedate}
              setchoosedate={setchoosedate}
              nowend={nowend}
              setnowend={setnowend}
              choosedateend={choosedateend}
              setchoosedateend={setchoosedateend}
              scrolltriggerupdate={scrolltriggerupdate}
              setscrolltriggerupdate={setscrolltriggerupdate}
              repeatable={repeatable}
              setrepeatable={setrepeatable}
              regular={regular}
              setregular={setregular}
              choosedateendrepeat={choosedateendrepeat}
              setchoosedateendrepeat={setchoosedateendrepeat}
              prevpath={prevpath}
              idsubloc={triggersubloc}
              setidsubloc={settriggersubloc}
              setrefreshdefaultupdatetask={setrefreshdefaultupdatetask}
            />
          </AccessControl>
        )}

        <AccessControl hasPermission={TASK_DETAIL_UPDATE}>
          <DrawerTaskDetailUpdate
            title={"Ubah Task Detail"}
            visible={drawertaskdetailupdate}
            onClose={() => {
              setdrawertaskdetailupdate(false);
            }}
            buttonOkText={"Simpan Task Detail"}
            initProps={initProps}
            onvisible={setdrawertaskdetailupdate}
            id={idtaskdetailupdate}
            taskid={taskid}
            settriggertaskdetailupdate={settriggertaskdetailupdate}
          />
        </AccessControl>

        <AccessControl hasPermission={TASK_DETAIL_ADD}>
          <DrawerTaskDetailCreate
            title={"Buat Task Detail"}
            visible={drawertaskdetailcreate}
            onClose={() => {
              setdrawertaskdetailcreate(false);
            }}
            buttonOkText={"Simpan Task Detail"}
            initProps={initProps}
            onvisible={setdrawertaskdetailcreate}
            taskid={taskid}
            settriggertaskdetailcreate={settriggertaskdetailcreate}
            taskid={taskid}
          />
        </AccessControl>

        {Boolean(displaytask.is_replaceable) && (
          <DrawerTaskSpareParts
            title={"Pergantian Suku Cadang"}
            visible={drawerspart}
            onClose={() => {
              setdrawerspart(false);
            }}
            buttonOkText={"Simpan Suku Cadang"}
            initProps={initProps}
            onvisible={setdrawerspart}
            idtask={taskid}
            selectedforin={selectedforin}
            setselectedforin={setselectedforin}
            selectedforout={selectedforout}
            setselectedforout={setselectedforout}
            prevpath={prevpath}
          />
        )}
      </AccessControl>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  var initProps = {};
  const taskid = params.taskId;
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

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "20",
      taskid,
    },
  };
}

export default TaskDetail;
