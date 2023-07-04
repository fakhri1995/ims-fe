import { PrinterOutlined, UpOutlined } from "@ant-design/icons";
import {
  Avatar,
  Collapse,
  DatePicker,
  Input,
  Select,
  Spin,
  Table,
  Tabs,
  Timeline,
  Tooltip,
  notification,
} from "antd";
import parse from "html-react-parser";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { Doughnut, Line } from "react-chartjs-2";

import ButtonSys from "components/button";
import TaskCard from "components/cards/project/TaskCard";
import { AccessControl } from "components/features/AccessControl";
import {
  CalendartimeIconSvg,
  ClipboardListIconSvg,
  EditSquareIconSvg,
  PlusIconSvg,
  SearchIconSvg,
} from "components/icon";
import st from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import ModalProjectTaskCreate from "components/modal/projects/modalProjectTaskCreate";
import ModalProjectTaskDetailUpdate from "components/modal/projects/modalProjectTaskDetailUpdate";
import ModalProjectUpdate from "components/modal/projects/modalProjectUpdate";
import ModalStaffList from "components/modal/projects/modalStaffList";

import { useAccessControl } from "contexts/access-control";

import {
  PROJECTS_GET,
  PROJECT_DELETE,
  PROJECT_GET,
  PROJECT_STATUSES_GET,
  PROJECT_TASKS_COUNT_GET,
  PROJECT_TASKS_DEADLINE_GET,
  PROJECT_TASKS_GET,
  PROJECT_TASK_ADD,
  PROJECT_TASK_DELETE,
  PROJECT_TASK_GET,
  PROJECT_TASK_UPDATE,
  PROJECT_UPDATE,
} from "lib/features";
import {
  createKeyPressHandler,
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "lib/helper";

import {
  BellRingingIconSvg,
  CutIconSvg,
  FileTextIconSvg,
  WritingIconSvg,
} from "../../../components/icon";
import ContractInfoSection from "../../../components/screen/contract/detail/ContractInfoSection";
import ContractNotesSection from "../../../components/screen/contract/detail/ContractNotesSection";
import ContractServiceSection from "../../../components/screen/contract/detail/ContractServiceSection";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  TooltipChart,
} from "chart.js";
import httpcookie from "cookie";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const ContractDetailIndex = ({
  dataProfile,
  sidemenu,
  initProps,
  contractId,
}) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetProjects = hasPermission(PROJECTS_GET);
  const isAllowedToGetProject = hasPermission(PROJECT_GET);
  const isAllowedToUpdateProject = hasPermission(PROJECT_UPDATE);
  const isAllowedToDeleteProject = hasPermission(PROJECT_DELETE);

  const isAllowedToAddTask = hasPermission(PROJECT_TASK_ADD);
  const isAllowedToGetTask = hasPermission(PROJECT_TASK_GET);
  const isAllowedToUpdateTask = hasPermission(PROJECT_TASK_UPDATE);
  const isAllowedToGetTasks = hasPermission(PROJECT_TASKS_GET);
  const isAllowedToDeleteTask = hasPermission(PROJECT_TASK_DELETE);

  const isAllowedToGetStatuses = hasPermission(PROJECT_STATUSES_GET);

  const isAllowedToGetTaskStatusCount = hasPermission(PROJECT_TASKS_COUNT_GET);
  const isAllowedToGetTaskDeadlineCount = hasPermission(
    PROJECT_TASKS_DEADLINE_GET
  );

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 6),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ "deadline"),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    status_ids: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  const dataColorBar = [
    "#2F80ED",
    "#BF4A40",
    "#ED962F",
    "#DDB44A",
    "#6AAA70",
    "#808080",
  ];

  // 2. useState
  const [refresh, setRefresh] = useState(-1); // use for all data except project notes & tasks
  const [refreshTasks, setRefreshTasks] = useState(-1);

  // 2.1. Charts
  const [loadingChart, setLoadingChart] = useState(false);
  const [taskStatusCount, setTaskStatusCount] = useState([]);
  const [taskTotal, setTaskTotal] = useState(0);

  const [dataTaskDeadline, setDataTaskDeadline] = useState({
    deadline: {
      today_deadline: 0,
      tomorrow_deadline: 0,
      first_range_deadline: 0,
      second_range_deadline: 0,
      third_range_deadline: 0,
    },
    date: {
      first_start_date: "",
      first_end_date: "",
      second_start_date: "",
      second_end_date: "",
      third_start_date: "",
      third_end_date: "",
    },
  });
  const [dateFilter, setDateFilter] = useState(false);
  const [dateState, setDateState] = useState({
    from: "",
    to: "",
  });

  // 2.2. Table Task List
  // filter data
  const [loadingStatusList, setLoadingStatusList] = useState(false);
  const [dataStatusList, setDataStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterTasks, setSearchingFilterTasks] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(undefined);
  const [selectedSortType, setSelectedSortType] = useState(undefined);

  // table data
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [dataTasks, setDataTasks] = useState([]);
  const [dataRawTasks, setDataRawTasks] = useState({
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

  const [dataRowClicked, setDataRowClicked] = useState({});

  // 2.3. Project Detail
  const [dataProject, setDataProject] = useState({});
  const [loadingProject, setLoadingProject] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({});

  // 2.4. Modal
  const [modalUpdateProject, setModalUpdateProject] = useState(false);
  const [modalStaffs, setModalStaffs] = useState(false);
  const [modalAddTask, setModalAddTask] = useState(false);
  const [modalDetailTask, setModalDetailTask] = useState(false);

  const [dataProjectList, setDataProjectList] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(0);

  // 3. UseEffect

  // 4. Event

  const pageBreadcrumbValue = useMemo(
    () => [
      { name: "Manajemen Proyek", hrefValue: "/projects" },
      { name: dataProject?.name, hrefValue: `/projects/${contractId}` },
    ],
    [dataProject.name]
  );

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      fixedBreadcrumbValues={pageBreadcrumbValue}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 px-4 md:px-5 "
        id="mainWrapper"
      >
        {/* Action Buttons */}
        <section className="md:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 shadow-md rounded-md bg-white p-4 lg:p-6">
          <div className="flex flex-row min-w-min p-2 lg:p-4 bg-backdrop rounded-md items-center">
            <WritingIconSvg size={32} color={"#35763B"} />
            <span className="ml-4">
              <p className="mb-2 mig-caption--bold text-primary100">
                Tambah Adendum Kontrak
              </p>
              <p className="mig-caption text-primary75">
                s.d. 05 Desember 2022
              </p>
            </span>
          </div>

          <div className="flex flex-row min-w-min p-2 lg:p-4 bg-backdrop rounded-md items-center">
            <CutIconSvg size={32} color={"#35763B"} />
            <span className="ml-4">
              <p className="mb-2 mig-caption--bold text-primary100">
                Batalkan Kontrak
              </p>
              <p className="mig-caption text-primary75">Belum ada pembatalan</p>
            </span>
          </div>

          <div className="flex flex-row min-w-min p-2 lg:p-4 bg-backdrop rounded-md items-center">
            <BellRingingIconSvg size={32} color={"#35763B"} />
            <span className="ml-4">
              <p className="mb-2 mig-caption--bold text-primary100">
                Atur Notifikasi
              </p>
              <p className="mig-caption text-primary75">
                50 hari sebelum berakhir (Klien, Int)
              </p>
            </span>
          </div>

          <div className="flex flex-row min-w-min p-2 lg:p-4 bg-backdrop rounded-md items-center">
            <FileTextIconSvg size={32} color={"#35763B"} />
            <span className="ml-4">
              <p className="mb-2 mig-caption--bold text-primary100">
                Template Invoice
              </p>
              <p className="mig-caption text-primary75">
                Template belum terisi
              </p>
            </span>
          </div>
        </section>

        {/* Catatan & Aktivitas */}
        <section className="md:col-span-4 shadow-md rounded-md bg-white p-6 order-last md:order-none">
          <Tabs defaultActiveKey={1}>
            <Tabs.TabPane tab="Catatan" key={1}>
              <ContractNotesSection initProps={initProps} contractId={1} />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Aktivitas" key={2}>
              <h4 className="mig-heading--4 mb-6">Aktivitas</h4>
              <Timeline>
                <Timeline.Item color="#35763B">
                  <p className="text-mono50">Kontrak dibuat oleh [nama user]</p>
                  <p className="mig-caption text-mono80">
                    Senin, 17 Januari 2022 10:00 WIB
                  </p>
                </Timeline.Item>
                <Timeline.Item color="#35763B">
                  <p className="text-mono50">Kontrak dibuat oleh [nama user]</p>
                  <p className="mig-caption text-mono80">
                    Senin, 17 Januari 2022 10:00 WIB
                  </p>
                </Timeline.Item>
              </Timeline>
            </Tabs.TabPane>
          </Tabs>
        </section>

        {/* Detail Kontrak & Daftar Service */}
        <div className="md:col-span-8 ">
          <ContractInfoSection />

          <ContractServiceSection />
        </div>
      </div>

      {/* Modal Project */}
      <AccessControl hasPermission={PROJECT_UPDATE}>
        <ModalProjectUpdate
          initProps={initProps}
          visible={modalUpdateProject}
          onvisible={setModalUpdateProject}
          isAllowedToUpdateProject={isAllowedToUpdateProject}
          isAllowedToDeleteProject={isAllowedToDeleteProject}
          setRefresh={setRefresh}
          dataProject={dataProject}
          dataStatusList={dataStatusList}
        />
      </AccessControl>

      <AccessControl hasPermission={PROJECT_GET}>
        <ModalStaffList
          visible={modalStaffs}
          onvisible={setModalStaffs}
          dataStaffs={dataProject?.project_staffs}
          taskName={dataProject?.name}
        />
      </AccessControl>

      {/* Modal Task */}
      <AccessControl hasPermission={PROJECT_TASK_ADD}>
        <ModalProjectTaskCreate
          initProps={initProps}
          visible={modalAddTask}
          onvisible={setModalAddTask}
          isAllowedToUpdateTask={isAllowedToUpdateTask}
          isAllowedToDeleteTask={isAllowedToDeleteTask}
          isAllowedToGetProjects={isAllowedToGetProjects}
          isAllowedToGetProject={isAllowedToGetProject}
          setRefreshTasks={setRefreshTasks}
          defaultProject={dataProject}
          taskId={currentTaskId}
        />
      </AccessControl>
      <AccessControl hasPermission={PROJECT_TASK_GET}>
        <ModalProjectTaskDetailUpdate
          initProps={initProps}
          visible={modalDetailTask}
          onvisible={setModalDetailTask}
          isAllowedToGetTask={isAllowedToGetTask}
          isAllowedToUpdateTask={isAllowedToUpdateTask}
          isAllowedToDeleteTask={isAllowedToDeleteTask}
          isAllowedToGetProjects={isAllowedToGetProjects}
          isAllowedToGetProject={isAllowedToGetProject}
          isAllowedToGetStatuses={isAllowedToGetStatuses}
          setRefreshTasks={setRefreshTasks}
          taskId={currentTaskId}
          dataStatusList={dataStatusList}
        />
      </AccessControl>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const contractId = params.contractId;
  let initProps = {};
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
      method: "GET",
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
      sidemenu: "contract-list",
      contractId,
    },
  };
}

export default ContractDetailIndex;
