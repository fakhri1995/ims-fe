import { Input, notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  TASK_TYPES_GET, // add new task type
  TASK_TYPE_ADD, // update task type
  TASK_TYPE_DELETE,
  TASK_TYPE_GET,
  TASK_TYPE_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import Buttonsys from "../../../components/button";
import DrawerTaskTypesCreate from "../../../components/drawer/tasks/drawerTaskTypesCreate";
import DrawerTaskTypesUpdate from "../../../components/drawer/tasks/drawerTaskTypesUpdate";
import {
  BackIconSvg,
  EditIconSvg,
  TrashIconSvg,
} from "../../../components/icon";
import st from "../../../components/layout-dashboard.module.css";
import Layout from "../../../components/layout-dashboardNew";
import { ModalHapusTipeTask } from "../../../components/modal/modalCustom";
import { TableCustomTipeTask } from "../../../components/table/tableCustom";
import { H1 } from "../../../components/typography";
import httpcookie from "cookie";

const TaskTypes = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToDeletTaskType = hasPermission(TASK_TYPE_DELETE);
  const isAllowedToGetTaskTypeList = hasPermission(TASK_TYPES_GET);

  const canAddNewTaskType = hasPermission([TASK_TYPE_ADD, TASK_TYPES_GET]);
  const canUpdateTaskType = hasPermission([TASK_TYPE_UPDATE, TASK_TYPE_GET]);

  //1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  //2.Use State
  //TASK TYPES
  const [datarawtipetask, setdatarawtipetask] = useState({
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
  const [datatipetasks, setdatatipetasks] = useState([]);
  const [loadingtipetasks, setloadingtipetasks] = useState(false);
  // const [viewdetailtipetask, setviewdetailtipetask] = useState(false);
  const [pagetipetask, setpagetipetask] = useState(1);
  const [rowstipetask, setrowstipetask] = useState(10);
  const [sortingtipetask, setsortingtipetask] = useState({
    sort_by: "",
    sort_type: "",
  });
  const [searcingtipetask, setsearcingtipetask] = useState("");
  // const [datafiltertipetasks, setdatafiltertipetasks] = useState([]);
  //create - task type
  const [drawertasktypecreate, setdrawertasktypecreate] = useState(false);
  //update - task type
  const [triggertasktypupdate, settriggertasktypupdate] = useState(-1);
  // const [idtasktypupdate, setidtasktypupdate] = useState(-1);
  // const [tempidtasktypeupdate, settempidtasktypeupdate] = useState(-1)
  const tempidtasktypeupdate = useRef(-1);
  const [drawertasktypupdate, setdrawertasktypupdate] = useState(false);
  //delete - task type
  const [datatipetaskdelete, setdatatipetaskdelete] = useState({
    id: null,
    name: "",
  });
  const [modaltipetaskdelete, setmodaltipetaskdelete] = useState(false);
  const [loadingtipetaskdelete, setloadingtipetaskdelete] = useState(false);

  //2. Column Table
  const columnsTipetask = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{datarawtipetask.from + index}</>,
        };
      },
    },
    {
      title: "Tipe Task",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: <>{record.name}</>,
        };
      },
      sorter: isAllowedToGetTaskTypeList
        ? (a, b) => a.name.localeCompare(b.name)
        : false,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      render: (text, record, index) => {
        return {
          children: <>{record.description}</>,
        };
      },
    },
    {
      title: "Jumlah Task",
      dataIndex: "count",
      render: (text, record, index) => {
        return {
          children: <>{record.tasks_count}</>,
        };
      },
      sorter: isAllowedToGetTaskTypeList
        ? (a, b) => a.tasks_count > b.tasks_count
        : false,
    },
    {
      title: "Opsi",
      dataIndex: "option",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex items-center">
              <div className="mx-1">
                <Buttonsys
                  type={canUpdateTaskType ? "default" : "primary"}
                  disabled={!canUpdateTaskType}
                  onClick={() => {
                    // settempidtasktypeupdate(record.id)
                    tempidtasktypeupdate.current = record.id;
                    settriggertasktypupdate((prev) => prev + 1);
                    setdrawertasktypupdate(true);
                  }}
                >
                  <EditIconSvg size={15} color={`#35763B`} />
                </Buttonsys>
              </div>
              <div className="mx-1">
                <Buttonsys
                  type={isAllowedToDeletTaskType ? "default" : "primary"}
                  color="danger"
                  disabled={!isAllowedToDeletTaskType}
                  onClick={() => {
                    setdatatipetaskdelete({ id: record.id, name: record.name });
                    setmodaltipetaskdelete(true);
                  }}
                >
                  <TrashIconSvg size={15} color={`#BF4A40`} />
                </Buttonsys>
              </div>
            </div>
          ),
        };
      },
    },
  ];

  //3. Handler
  const handleDeleteTipeTask = () => {
    setloadingtipetaskdelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteTaskType`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: datatipetaskdelete.id,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingtipetaskdelete(false);
        if (res2.success) {
          setmodaltipetaskdelete(false);
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

  //4.Use Effect
  useEffect(() => {
    if (!isAllowedToGetTaskTypeList) {
      permissionWarningNotification("Mendapatkan", "Daftar Tipe Task");
    }
  }, [isAllowedToGetTaskTypeList]);

  useEffect(() => {
    if (!isAllowedToGetTaskTypeList) {
      setloadingtipetasks(false);
      return;
    }

    // Only fetch after drawers or modals were closed
    if (drawertasktypecreate || modaltipetaskdelete || drawertasktypupdate) {
      return;
    }

    setloadingtipetasks(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskTypes?page=${pagetipetask}&rows=${rowstipetask}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdatarawtipetask(res2.data);
        setdatatipetasks(res2.data.data);
        // setdatafiltertipetasks(res2.data.data);
        setloadingtipetasks(false);
      });
  }, [
    drawertasktypecreate,
    modaltipetaskdelete,
    drawertasktypupdate,
    isAllowedToGetTaskTypeList,
  ]);

  // useEffect(() => {
  //     if (triggertasktypupdate !== -1) {
  //         setidtasktypupdate(tempidtasktypeupdate.current)
  //     }
  // }, [triggertasktypupdate])

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      st={st}
      prevpath={"admin"}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="px-5">
          <div className="flex flex-col shadow-md rounded-lg bg-white p-5 mb-6 mx-3">
            <div className="flex justify-between items-center mb-5">
              <div className="flex">
                <div
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    rt.push(`/tasks/admin`);
                  }}
                >
                  <BackIconSvg size={15} color={`#000000`} />
                </div>
                <H1>Semua Tipe Task</H1>
              </div>
              <div className="w-8/12 flex justify-end">
                <div className=" mx-2">
                  <Buttonsys
                    type="primary"
                    disabled={!canAddNewTaskType}
                    onClick={() => {
                      setdrawertasktypecreate(true);
                    }}
                  >
                    + Tambah Tipe Task
                  </Buttonsys>
                </div>
                <div className="mx-2">
                  <Input
                    style={{ width: `20rem` }}
                    placeholder="Nama tipe task.."
                    disabled={!isAllowedToGetTaskTypeList}
                    allowClear
                    onChange={(e) => {
                      setsearcingtipetask(e.target.value);
                      setloadingtipetasks(true);
                      fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getTaskTypes?page=${pagetipetask}&rows=${rowstipetask}&name=${e.target.value}&sort_by=${sortingtipetask.sort_by}&sort_type=${sortingtipetask.sort_type}`,
                        {
                          method: `GET`,
                          headers: {
                            Authorization: JSON.parse(initProps),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((res2) => {
                          setdatarawtipetask(res2.data);
                          setdatatipetasks(res2.data.data);
                          setloadingtipetasks(false);
                        });
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <TableCustomTipeTask
                dataSource={datatipetasks}
                setDataSource={setdatatipetasks}
                columns={columnsTipetask}
                loading={loadingtipetasks}
                setpraloading={setloadingtipetasks}
                pageSize={rowstipetask}
                total={datarawtipetask.total}
                initProps={initProps}
                setpage={setpagetipetask}
                pagefromsearch={pagetipetask}
                setdataraw={setdatarawtipetask}
                setsortingtipetask={setsortingtipetask}
                sortingtipetask={sortingtipetask}
                searcingtipetask={searcingtipetask}
              />
            </div>
          </div>

          <AccessControl hasPermission={TASK_TYPE_DELETE}>
            <ModalHapusTipeTask
              title={"Konfirmasi Hapus Tipe Task"}
              visible={modaltipetaskdelete}
              onvisible={setmodaltipetaskdelete}
              onCancel={() => {
                setmodaltipetaskdelete(false);
              }}
              loading={loadingtipetaskdelete}
              datadelete={datatipetaskdelete}
              onOk={handleDeleteTipeTask}
            />
          </AccessControl>

          <AccessControl hasPermission={[TASK_TYPE_ADD, TASK_TYPES_GET]}>
            <DrawerTaskTypesCreate
              title={"Tambah Tipe Task"}
              visible={drawertasktypecreate}
              onClose={() => {
                setdrawertasktypecreate(false);
              }}
              buttonOkText={"Simpan Tipe Task"}
              initProps={initProps}
              onvisible={setdrawertasktypecreate}
            />
          </AccessControl>

          <AccessControl hasPermission={[TASK_TYPE_UPDATE, TASK_TYPE_GET]}>
            <DrawerTaskTypesUpdate
              title={"Ubah Tipe Task"}
              visible={drawertasktypupdate}
              onClose={() => {
                setdrawertasktypupdate(false);
              }}
              buttonOkText={"Simpan Tipe Task"}
              initProps={initProps}
              onvisible={setdrawertasktypupdate}
              loading={loadingtipetasks}
              id={tempidtasktypeupdate}
              trigger={triggertasktypupdate}
            />
          </AccessControl>
        </div>
      </div>
    </Layout>
  );
};

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
      sidemenu: "201",
    },
  };
}

export default TaskTypes;
