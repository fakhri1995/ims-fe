import { Input, Select, notification } from "antd";
// import DrawerStatusCreate from "../../../../components/drawer/recruitment/drawerStatusCreate";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENT_STATUSES_GET,
  RECRUITMENT_STATUSES_LIST_GET,
  RECRUITMENT_STATUS_ADD,
  RECRUITMENT_STATUS_DELETE,
  RECRUITMENT_STATUS_GET,
  RECRUITMENT_STATUS_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../../components/button";
import DrawerCore from "../../../../components/drawer/drawerCore";
import DrawerStatusUpdate from "../../../../components/drawer/recruitment/drawerStatusUpdate";
import {
  EditIconSvg,
  LayoutGridAddSvg,
  SearchIconSvg,
  TrashIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { ModalHapus2 } from "../../../../components/modal/modalCustom";
import SetupMenu from "../../../../components/setupMenu";
import { TableCustomRecruitmentStatus } from "../../../../components/table/tableCustom";
import { createKeyPressHandler } from "../../../../lib/helper";
import httpcookie from "cookie";

const DrawerStatusCreate = dynamic(
  () => {
    return import(
      "../../../../components/drawer/recruitment/drawerStatusCreate"
    );
  },
  { ssr: false }
);

const RegistrationManagementIndex = ({ dataProfile, sidemenu, initProps }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const StatuisAllowedToGetStatusesList = hasPermission(
    RECRUITMENT_STATUSES_LIST_GET
  );
  const StatuisAllowedToGetStatuses = hasPermission(RECRUITMENT_STATUSES_GET);
  const isAllowedToGetStatus = hasPermission(RECRUITMENT_STATUS_GET);
  const isAllowedToAddStatus = hasPermission(RECRUITMENT_STATUS_ADD);
  const isAllowedToUpdateStatus = hasPermission(RECRUITMENT_STATUS_UPDATE);
  const StatusisAllowedToDeleteStatus = hasPermission(
    RECRUITMENT_STATUS_DELETE
  );
  const canUpdateStatus = hasPermission([
    RECRUITMENT_STATUS_UPDATE,
    RECRUITMENT_STATUS_GET,
  ]);

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Kelola Status";

  // 2. Use state
  // 2.1. Table Status
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingStatusList, setLoadingStatusList] = useState(false);

  const [drawUpdate, setDrawUpdate] = useState(false);

  const [dataStatuses, setdataStatuses] = useState([]);
  const [dataStatusesList, setdataStatusesList] = useState([]);
  const [dataRawStatus, setDataRawStatus] = useState({
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

  const [dataStatus, setDataStatus] = useState({
    id: 0,
    name: "",
    color: "",
    description: "",
    recruitments_count: 0,
  });

  const [pageStatus, setPageStatus] = useState(1);
  const [rowsStatus, setRowsStatus] = useState(10);
  const [sortingStatus, setSortingStatus] = useState({
    sort_by: "",
    sort_type: "",
  });

  const [searchingFilterStatus, setSearchingFilterStatus] = useState("");
  const [refresh, setRefresh] = useState(-1);

  // 2.2. Create Status
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  // 2.3. Update Status
  const [isUpdateDrawerShown, setUpdateDrawerShown] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const tempIdUpdate = useRef(-1);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);

  // 2.4. Delete Status
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: null,
    name: "",
    recruitments_count: 0,
  });

  // 2.5 READ FORM
  const [drawread, setdrawread] = useState(false);

  // 3. UseEffect
  // 3.1. Get Status List
  useEffect(() => {
    if (!StatuisAllowedToGetStatusesList) {
      permissionWarningNotification(
        "Mendapatkan",
        "Data Recruitment Status List"
      );
      setLoadingStatusList(false);
      return;
    }

    setLoadingStatusList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStatusesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setdataStatusesList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingStatusList(false);
      })
      .catch((err) => {
        // console.log(err);
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingStatusList(false);
      });
  }, [StatuisAllowedToGetStatusesList, refresh]);

  // 3.2. Get Status
  useEffect(() => {
    if (!StatuisAllowedToGetStatuses) {
      permissionWarningNotification("Mendapatkan", "Dafta");
      setLoadingStatus(false);
      return;
    }

    setLoadingStatus(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStatuses?rows=10`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRawStatus(res2.data);
          setdataStatuses(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingStatus(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingStatus(false);
      });
  }, [StatuisAllowedToGetStatuses, refresh]);

  // 4. Event
  const onFilterStatus = () => {
    setLoadingStatus(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStatuses?sort_by=${sortingStatus.sort_by}&sort_type=${sortingStatus.sort_type}&keyword=${searchingFilterStatus}&rows=${rowsStatus}&page=${pageStatus}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRawStatus(res2.data);
          setdataStatuses(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingStatus(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingStatus(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterStatus, "Enter");

  const onOpenReadDrawer = (data) => {
    setdrawread(true);
    setDataStatus((prev) => ({
      ...prev,
      id: parseInt(data.id),
      name: data.name,
      recruitments_count: parseInt(data.recruitments_count),
      color: data.color,
      description: data.description,
    }));
  };

  const onOpenDeleteModal = (data) => {
    setModalDelete(true);
    setDataDelete({
      id: parseInt(data.id),
      name: data.name,
      recruitments_count: parseInt(data.recruitments_count),
    });
  };

  const handleDelete = () => {
    if (!StatusisAllowedToDeleteStatus) {
      permissionWarningNotification("Menghapus", "Status Rekrutmen");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteRecruitmentStatus?id=${dataDelete.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification.success({
            message: res2.message,
            duration: 3,
          });
        }
        setTimeout(() => {
          setLoadingDelete(false);
          setModalDelete(false);
          setRefresh((prev) => prev + 1);
        }, 500);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus status rekrutmen. ${err.response}`,
          duration: 3,
        });
        setLoadingDelete(false);
        setModalDelete(false);
      });
  };

  // Table's columns
  const columnsStatus = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawStatus?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Nama",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1
                onClick={() => {
                  onOpenReadDrawer(record);
                }}
              >
                {record.name}
              </h1>
            </>
          ),
        };
      },
      sorter: StatuisAllowedToGetStatuses
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Warna",
      dataIndex: "color",
      render: (text, record, index) => {
        return {
          children: (
            <div
              className={`w-6 h-6 rounded-sm`}
              style={{ backgroundColor: `${record.color}` }}
            ></div>
          ),
        };
      },
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
      title: "Jumlah Kandidat",
      dataIndex: "recruitments_count",
      render: (text, record, index) => {
        return {
          children: <>{record.recruitments_count}</>,
        };
      },
      sorter: StatuisAllowedToGetStatuses
        ? (a, b) => a.recruitments_count > b.recruitments_count
        : false,
    },
    {
      title: "Aksi",
      key: "button_action",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex items-center space-x-2">
              <ButtonSys
                type={canUpdateStatus ? "default" : "primary"}
                disabled={!canUpdateStatus}
                onClick={(event) => {
                  event.stopPropagation();
                  tempIdUpdate.current = record.id;
                  setTriggerUpdate((prev) => prev + 1);
                  setUpdateDrawerShown(true);
                }}
              >
                <EditIconSvg size={15} color={`#35763B`} />
              </ButtonSys>
              <ButtonSys
                type={StatusisAllowedToDeleteStatus ? "default" : "primary"}
                color="danger"
                disabled={!StatusisAllowedToDeleteStatus}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenDeleteModal(record);
                  // setModalDelete(true);
                }}
              >
                <TrashIconSvg size={15} color={`#BF4A40`} />
              </ButtonSys>
            </div>
          ),
        };
      },
    },
  ];

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="grid grid-cols-5 px-5 gap-6">
          <SetupMenu menu={"4"} />

          {/* Table Semua Status */}
          <div className="col-span-4 flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="mig-heading--4 ">
                Semua Status ({dataStatusesList.length})
              </h4>

              <ButtonSys
                type={isAllowedToAddStatus ? "default" : "primary"}
                onClick={() => setCreateDrawerShown(true)}
                disabled={!isAllowedToAddStatus}
              >
                <div className="flex flex-row space-x-2.5 items-center">
                  <LayoutGridAddSvg size={16} color="#35763B" />
                  <p>Tambah Status</p>
                </div>
              </ButtonSys>
            </div>

            {/* Start: Search criteria */}
            <div className="flex flex-row justify-between w-full space-x-4 items-center mb-4">
              {/* Search by keyword (kata kunci) */}
              <div className="w-11/12">
                <Input
                  value={
                    searchingFilterStatus === "" ? null : searchingFilterStatus
                  }
                  style={{ width: `100%` }}
                  placeholder="Kata Kunci.."
                  allowClear
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSearchingFilterStatus("");
                    } else {
                      setSearchingFilterStatus(e.target.value);
                    }
                  }}
                  onKeyPress={onKeyPressHandler}
                  disabled={!StatuisAllowedToGetStatuses}
                />
              </div>

              <ButtonSys
                type={`primary`}
                onClick={onFilterStatus}
                disabled={!StatuisAllowedToGetStatuses}
              >
                <div className="flex flex-row space-x-2.5 w-full items-center">
                  <SearchIconSvg size={15} color={`#ffffff`} />
                  <p>Cari</p>
                </div>
              </ButtonSys>
            </div>
            {/* End: Search criteria */}

            <TableCustomRecruitmentStatus
              dataSource={dataStatuses}
              setDataSource={setdataStatuses}
              columns={columnsStatus}
              loading={loadingStatus}
              setpraloading={setLoadingStatus}
              pageSize={rowsStatus}
              total={dataRawStatus?.total}
              initProps={initProps}
              setpage={setPageStatus}
              pagefromsearch={pageStatus}
              setdataraw={setDataRawStatus}
              setsorting={setSortingStatus}
              sorting={sortingStatus}
              searching={searchingFilterStatus}
              onOpenReadDrawer={onOpenReadDrawer}
            />
          </div>
        </div>
      </div>

      <AccessControl hasPermission={RECRUITMENT_STATUS_ADD}>
        <DrawerStatusCreate
          visible={isCreateDrawerShown}
          initProps={initProps}
          onvisible={setCreateDrawerShown}
          setRefresh={setRefresh}
          isAllowedToAdd={isAllowedToAddStatus}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
        />
      </AccessControl>

      <AccessControl hasPermission={RECRUITMENT_STATUS_UPDATE}>
        <DrawerStatusUpdate
          id={tempIdUpdate}
          visible={isUpdateDrawerShown}
          initProps={initProps}
          onvisible={setUpdateDrawerShown}
          setRefresh={setRefresh}
          trigger={triggerUpdate}
          isAllowedToGetStatus={isAllowedToGetStatus}
          isAllowedToUpdateStatus={isAllowedToUpdateStatus}
          setLoadingUpdate={setLoadingUpdate}
          loadingUpdate={loadingUpdate}
          onClickDelete={onOpenDeleteModal}
        />
      </AccessControl>

      {/* Drawer Status Detail */}
      <AccessControl hasPermission={RECRUITMENT_STATUS_GET}>
        <DrawerCore
          title={`${dataStatus.name}`}
          visible={drawread}
          onClose={() => {
            setdrawread(false);
          }}
          width={380}
          buttonUpdateText={
            <div className="flex flex-row space-x-2 items-center">
              <EditIconSvg size={16} color={"#35763B"} />
              <p>Ubah Status</p>
            </div>
          }
          onClick={() => {
            tempIdUpdate.current = dataStatus.id;
            setTriggerUpdate((prev) => prev + 1);
            setUpdateDrawerShown(true);
            setdrawread(false);
          }}
          buttonCancelText={"Hapus Form"}
          onButtonCancelClicked={() => {
            onOpenDeleteModal(dataStatus);
            setdrawread(false);
          }}
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-5">
              <div>
                <p className="text-gray-400 mb-2">Nama</p>
                <div className="flex flex-row items-center space-x-3">
                  <p>{dataStatus.name}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 mb-2">Warna</p>
                <div
                  className="w-6 h-6 rounded-sm"
                  style={{ backgroundColor: `${dataStatus.color}` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-5">
              <div>
                <p className="text-gray-400 mb-2">Jumlah Kandidat</p>
                <div className="flex flex-row items-center space-x-3">
                  <p>{dataStatus.recruitments_count}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Deskripsi</p>
                <div className="flex flex-row items-center space-x-3">
                  <p>{dataStatus.description}</p>
                </div>
              </div>
            </div>
          </div>
        </DrawerCore>
      </AccessControl>

      <AccessControl hasPermission={RECRUITMENT_STATUS_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDelete}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"Status"}
          loading={loadingDelete}
          // disabled={candidateCount > 0}
        >
          Ada <strong>{dataDelete.recruitments_count} kandidat</strong> yang
          berada pada Status
          {"\n"}
          <strong>{dataDelete.name}</strong>. Apakah Anda yakin ingin
          melanjutkan penghapusan?
        </ModalHapus2>
      </AccessControl>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
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
      sidemenu: "112",
    },
  };
}

export default RegistrationManagementIndex;
