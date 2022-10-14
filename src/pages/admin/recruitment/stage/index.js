import { Input, Select, notification } from "antd";
// import DrawerStageCreate from "../../../../components/drawer/recruitment/drawerStageCreate";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENT_STAGES_GET,
  RECRUITMENT_STAGES_LIST_GET,
  RECRUITMENT_STAGE_ADD,
  RECRUITMENT_STAGE_DELETE,
  RECRUITMENT_STAGE_GET,
  RECRUITMENT_STAGE_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../../components/button";
import DrawerStageUpdate from "../../../../components/drawer/recruitment/drawerStageUpdate";
import {
  EditIconSvg,
  LayoutGridAddSvg,
  SearchIconSvg,
  TrashIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import {
  ModalHapus2,
  ModalUbah,
} from "../../../../components/modal/modalCustom";
import SetupMenu from "../../../../components/setupMenu";
import { TableCustomRecruitmentStage } from "../../../../components/table/tableCustom";
import { createKeyPressHandler } from "../../../../lib/helper";
import httpcookie from "cookie";

const DrawerStageCreate = dynamic(
  () => {
    return import(
      "../../../../components/drawer/recruitment/drawerStageCreate"
    );
  },
  { ssr: false }
);

const StageManagementIndex = ({ dataProfile, sidemenu, initProps }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetStagesList = hasPermission(RECRUITMENT_STAGES_LIST_GET);
  const isAllowedToGetStages = hasPermission(RECRUITMENT_STAGES_GET);
  const isAllowedToGetStage = hasPermission(RECRUITMENT_STAGE_GET);
  const isAllowedToAddStage = hasPermission(RECRUITMENT_STAGE_ADD);
  const isAllowedToUpdateStage = hasPermission(RECRUITMENT_STAGE_UPDATE);
  const isAllowedToDeleteStage = hasPermission(RECRUITMENT_STAGE_DELETE);
  const canUpdateStage = hasPermission([
    RECRUITMENT_STAGE_UPDATE,
    RECRUITMENT_STAGE_GET,
  ]);

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  // 2. Use state
  // 2.1. Table Stage
  const [loadingStages, setLoadingStages] = useState(false);
  const [loadingStageList, setLoadingStageList] = useState(false);

  const [dataStages, setDataStages] = useState([]);
  const [dataStageList, setDataStageList] = useState([]);
  const [dataRawStages, setDataRawStages] = useState({
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

  const [pageStages, setPageStages] = useState(1);
  const [rowsStages, setRowsStages] = useState(10);
  const [sortingStages, setSortingStages] = useState({
    sort_by: "",
    sort_type: "",
  });

  const [searchingFilterStages, setSearchingFilterStages] = useState("");
  const [refresh, setRefresh] = useState(-1);

  // 2.2. Create Stage
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  // 2.3. Update Stage
  const [isUpdateDrawerShown, setUpdateDrawerShown] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const tempIdUpdate = useRef(-1);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);

  // 2.4. Delete Stage
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: null,
    name: "",
    recruitments_count: 0,
  });

  // 3. UseEffect
  // 3.1. Get Stages List
  useEffect(() => {
    if (!isAllowedToGetStagesList) {
      permissionWarningNotification(
        "Mendapatkan",
        "Data Recruitment Stage List"
      );
      setLoadingStageList(false);
      return;
    }

    setLoadingStageList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStagesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataStageList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingStageList(false);
      })
      .catch((err) => {
        // console.log(err);
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingStageList(false);
      });
  }, [isAllowedToGetStagesList, refresh]);

  // 3.2. Get Stages
  useEffect(() => {
    if (!isAllowedToGetStages) {
      permissionWarningNotification("Mendapatkan", "Daftar Stage");
      setLoadingStages(false);
      return;
    }

    setLoadingStages(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStages?rows=10`,
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
          setDataRawStages(res2.data);
          setDataStages(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingStages(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingStages(false);
      });
  }, [isAllowedToGetStages, refresh]);

  // 4. Event
  const onFilterStage = () => {
    setLoadingStages(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStages?sort_by=${sortingStages.sort_by}&sort_type=${sortingStages.sort_type}&keyword=${searchingFilterStages}&rows=${rowsStages}&page=${pageStages}`,
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
          setDataRawStages(res2.data);
          setDataStages(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingStages(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingStages(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterStage, "Enter");

  const onOpenDeleteModal = (data) => {
    setModalDelete(true);
    setDataDelete({
      id: parseInt(data.id),
      name: data.name,
      recruitments_count: parseInt(data.recruitments_count),
    });
  };

  const handleDelete = () => {
    if (!isAllowedToDeleteStage) {
      permissionWarningNotification("Menghapus", "Stage Rekrutmen");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteRecruitmentStage?id=${dataDelete.id}`,
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
          message: `Gagal menghapus stage rekrutmen. ${err.response}`,
          duration: 3,
        });
        setLoadingDelete(false);
        setModalDelete(false);
      });
  };

  // Table's columns
  const columnsStage = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawStages?.from + index}
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
          children: <>{record.name}</>,
        };
      },
      sorter: isAllowedToGetStages
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      render: (text, record, index) => {
        return {
          children: <div className="xl:w-60">{record.description}</div>,
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
      sorter: isAllowedToGetStages
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
                type={canUpdateStage ? "default" : "primary"}
                disabled={!canUpdateStage}
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
                type={isAllowedToDeleteStage ? "default" : "primary"}
                color="danger"
                disabled={!isAllowedToDeleteStage}
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
          <SetupMenu menu={"3"} />

          {/* Table Semua Stage */}
          <div className="col-span-4 flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="mig-heading--4 ">
                Semua Stage ({dataStageList.length})
              </h4>

              <ButtonSys
                type={isAllowedToAddStage ? "default" : "primary"}
                onClick={() => setCreateDrawerShown(true)}
                disabled={!isAllowedToAddStage}
              >
                <div className="flex flex-row space-x-2.5 items-center">
                  <LayoutGridAddSvg size={16} color="#35763B" />
                  <p>Tambah Stage</p>
                </div>
              </ButtonSys>
            </div>

            {/* Start: Search criteria */}
            <div className="flex flex-row justify-between w-full space-x-4 items-center mb-4">
              {/* Search by keyword (kata kunci) */}
              <div className="w-11/12">
                <Input
                  value={
                    searchingFilterStages === "" ? null : searchingFilterStages
                  }
                  style={{ width: `100%` }}
                  placeholder="Kata Kunci.."
                  allowClear
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSearchingFilterStages("");
                    } else {
                      setSearchingFilterStages(e.target.value);
                    }
                  }}
                  onKeyPress={onKeyPressHandler}
                  disabled={!isAllowedToGetStages}
                />
              </div>

              <ButtonSys
                type={`primary`}
                onClick={onFilterStage}
                disabled={!isAllowedToGetStages}
              >
                <div className="flex flex-row space-x-2.5 w-full items-center">
                  <SearchIconSvg size={15} color={`#ffffff`} />
                  <p>Cari</p>
                </div>
              </ButtonSys>
            </div>
            {/* End: Search criteria */}

            <TableCustomRecruitmentStage
              dataSource={dataStages}
              setDataSource={setDataStages}
              columns={columnsStage}
              loading={loadingStages}
              setpraloading={setLoadingStages}
              pageSize={rowsStages}
              total={dataRawStages?.total}
              initProps={initProps}
              setpage={setPageStages}
              pagefromsearch={pageStages}
              setdataraw={setDataRawStages}
              setsorting={setSortingStages}
              sorting={sortingStages}
              searching={searchingFilterStages}
            />
          </div>
        </div>
      </div>

      <AccessControl hasPermission={RECRUITMENT_STAGE_ADD}>
        <DrawerStageCreate
          visible={isCreateDrawerShown}
          initProps={initProps}
          onvisible={setCreateDrawerShown}
          setRefresh={setRefresh}
          isAllowedToAdd={isAllowedToAddStage}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
        />
      </AccessControl>

      <AccessControl hasPermission={RECRUITMENT_STAGE_UPDATE}>
        <DrawerStageUpdate
          id={tempIdUpdate}
          visible={isUpdateDrawerShown}
          initProps={initProps}
          onvisible={setUpdateDrawerShown}
          setRefresh={setRefresh}
          trigger={triggerUpdate}
          isAllowedToGetStage={isAllowedToGetStage}
          isAllowedToUpdateStage={isAllowedToUpdateStage}
          setLoadingUpdate={setLoadingUpdate}
          loadingUpdate={loadingUpdate}
          onClickDelete={onOpenDeleteModal}
        />
      </AccessControl>

      <AccessControl hasPermission={RECRUITMENT_STAGE_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDelete}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"stage"}
          loading={loadingDelete}
          // disabled={candidateCount > 0}
        >
          Ada <strong>{dataDelete.recruitments_count} kandidat</strong> yang
          berada pada stage
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

export default StageManagementIndex;
