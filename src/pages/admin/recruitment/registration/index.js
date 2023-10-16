import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Input, Select, notification } from "antd";
// import DrawerRegistrationCreate from "../../../../components/drawer/recruitment/drawerRegistrationCreate";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENT_JALUR_DAFTARS_GET,
  RECRUITMENT_JALUR_DAFTARS_LIST_GET,
  RECRUITMENT_JALUR_DAFTAR_ADD,
  RECRUITMENT_JALUR_DAFTAR_DELETE,
  RECRUITMENT_JALUR_DAFTAR_GET,
  RECRUITMENT_JALUR_DAFTAR_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../../components/button";
import DrawerCore from "../../../../components/drawer/drawerCore";
import DrawerRegistrationUpdate from "../../../../components/drawer/recruitment/drawerRegistrationUpdate";
import { EditIconSvg, SearchIconSvg } from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { ModalHapus2 } from "../../../../components/modal/modalCustom";
import SetupMenu from "../../../../components/setupMenu";
import { TableCustomRecruitmentRegistration } from "../../../../components/table/tableCustom";
import { createKeyPressHandler } from "../../../../lib/helper";
import httpcookie from "cookie";

const DrawerRegistrationCreate = dynamic(
  () => {
    return import(
      "../../../../components/drawer/recruitment/drawerRegistrationCreate"
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
  const isAllowedToGetRegistrationsList = hasPermission(
    RECRUITMENT_JALUR_DAFTARS_LIST_GET
  );
  const isAllowedToGetRegistrations = hasPermission(
    RECRUITMENT_JALUR_DAFTARS_GET
  );
  const isAllowedToGetRegistration = hasPermission(
    RECRUITMENT_JALUR_DAFTAR_GET
  );
  const isAllowedToAddRegistration = hasPermission(
    RECRUITMENT_JALUR_DAFTAR_ADD
  );
  const isAllowedToUpdateRegistration = hasPermission(
    RECRUITMENT_JALUR_DAFTAR_UPDATE
  );
  const isAllowedToDeleteRegistration = hasPermission(
    RECRUITMENT_JALUR_DAFTAR_DELETE
  );
  const canUpdateRegistration = hasPermission([
    RECRUITMENT_JALUR_DAFTAR_UPDATE,
    RECRUITMENT_JALUR_DAFTAR_GET,
  ]);

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Kelola Jalur Daftar";

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1, "Rekrutmen");

  // 2. Use state
  // 2.1. Table Registration
  const [loadingRegistrations, setLoadingRegistrations] = useState(false);
  const [loadingRegistrationList, setLoadingRegistrationList] = useState(false);

  const [dataRegistrations, setDataRegistrations] = useState([]);
  const [dataRawRegistrations, setDataRawRegistrations] = useState({
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

  const [pageRegistrations, setPageRegistrations] = useState(1);
  const [rowsRegistrations, setRowsRegistrations] = useState(10);
  const [sortingRegistrations, setSortingRegistrations] = useState({
    sort_by: "",
    sort_type: "",
  });

  const [searchingFilterRegistrations, setSearchingFilterRegistrations] =
    useState("");
  const [refresh, setRefresh] = useState(-1);

  // 2.2. Create Registration
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  // 2.3. Update Registration
  const [isUpdateDrawerShown, setUpdateDrawerShown] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const tempIdUpdate = useRef(-1);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);

  // 2.4. Delete Registration
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: null,
    name: "",
    recruitments_count: 0,
  });

  // 2.5 Data Registration
  const [dataRegistration, setDataRegistration] = useState({
    id: 0,
    name: "",
    recruitments_count: 0,
  });

  // 2.6 READ FORM
  const [drawread, setdrawread] = useState(false);

  // 3. UseEffect
  // 3.1. Get Registrations
  useEffect(() => {
    if (!isAllowedToGetRegistrations) {
      permissionWarningNotification(
        "Mendapatkan",
        "Daftar Recruitment Jalur Daftar"
      );
      setLoadingRegistrations(false);
      return;
    }

    const fetchData = async () => {
      setLoadingRegistrations(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentJalurDaftars?keyword=${searchingFilterRegistrations}&rows=${rowsRegistrations}&page=${pageRegistrations}`,
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
            setDataRawRegistrations(res2.data);
            setDataRegistrations(res2.data.data);
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
          setLoadingRegistrations(false);
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
          setLoadingRegistrations(false);
        });
    };

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [isAllowedToGetRegistrations, refresh, searchingFilterRegistrations]);

  // 4. Event
  const onFilterRegistration = () => {
    setLoadingRegistrations(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentJalurDaftars?sort_by=${sortingRegistrations.sort_by}&sort_type=${sortingRegistrations.sort_type}&keyword=${searchingFilterRegistrations}&rows=${rowsRegistrations}&page=${pageRegistrations}`,
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
          setDataRawRegistrations(res2.data);
          setDataRegistrations(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRegistrations(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRegistrations(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterRegistration,
    "Enter"
  );

  const onOpenReadDrawer = (data) => {
    setdrawread(true);
    setDataRegistration((prev) => ({
      ...prev,
      id: parseInt(data.id),
      name: data.name,
      recruitments_count: parseInt(data.recruitments_count),
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
    if (!isAllowedToDeleteRegistration) {
      permissionWarningNotification("Menghapus", "Registration Rekrutmen");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteRecruitmentJalurDaftar?id=${dataDelete.id}`,
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
          message: `Gagal menghapus jalur daftar rekrutmen. ${err.response}`,
          duration: 3,
        });
        setLoadingDelete(false);
        setModalDelete(false);
      });
  };

  // Table's columns
  const columnsRegistration = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawRegistrations?.from + index}
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
      sorter: isAllowedToGetRegistrations
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Jumlah Kandidat",
      dataIndex: "recruitments_count",
      render: (text, record, index) => {
        return {
          children: <>{record.recruitments_count}</>,
        };
      },
      sorter: isAllowedToGetRegistrations
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
                type={canUpdateRegistration ? "default" : "primary"}
                disabled={!canUpdateRegistration}
                onClick={(event) => {
                  event.stopPropagation();
                  tempIdUpdate.current = record.id;
                  setTriggerUpdate((prev) => prev + 1);
                  setUpdateDrawerShown(true);
                }}
              >
                <EditOutlined />
              </ButtonSys>
              <ButtonSys
                type={isAllowedToDeleteRegistration ? "default" : "primary"}
                color="danger"
                disabled={!isAllowedToDeleteRegistration}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenDeleteModal(record);
                }}
              >
                <DeleteOutlined />
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
      pathTitleArr={pathTitleArr}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="grid grid-cols-5 md:px-5 gap-6">
          <SetupMenu menu={"2"} />

          {/* Table Semua Registration */}
          <div className="col-span-4 flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="mig-heading--4 ">
                Semua Jalur Daftar ({dataRawRegistrations?.total})
              </h4>

              <ButtonSys
                type={isAllowedToAddRegistration ? "default" : "primary"}
                onClick={() => setCreateDrawerShown(true)}
                disabled={!isAllowedToAddRegistration}
              >
                <div className="flex flex-row space-x-2.5 items-center">
                  <AppstoreAddOutlined />
                  <p>Tambah Jalur Daftar</p>
                </div>
              </ButtonSys>
            </div>

            {/* Start: Search criteria */}
            <div className="flex flex-row justify-between w-full space-x-4 items-center mb-4">
              {/* Search by keyword (kata kunci) */}
              <div className="w-11/12">
                <Input
                  value={
                    searchingFilterRegistrations === ""
                      ? null
                      : searchingFilterRegistrations
                  }
                  style={{ width: `100%` }}
                  placeholder="Kata Kunci.."
                  allowClear
                  onChange={(e) => {
                    setSearchingFilterRegistrations(e.target.value);
                  }}
                  onKeyPress={onKeyPressHandler}
                  disabled={!isAllowedToGetRegistrations}
                />
              </div>

              <ButtonSys
                type={`primary`}
                onClick={onFilterRegistration}
                disabled={!isAllowedToGetRegistrations}
              >
                <div className="flex flex-row space-x-2.5 w-full items-center">
                  <SearchIconSvg size={15} color={`#ffffff`} />
                  <p>Cari</p>
                </div>
              </ButtonSys>
            </div>
            {/* End: Search criteria */}

            <TableCustomRecruitmentRegistration
              dataSource={dataRegistrations}
              setDataSource={setDataRegistrations}
              columns={columnsRegistration}
              loading={loadingRegistrations}
              setpraloading={setLoadingRegistrations}
              pageSize={rowsRegistrations}
              total={dataRawRegistrations?.total}
              initProps={initProps}
              setpage={setPageRegistrations}
              pagefromsearch={pageRegistrations}
              setdataraw={setDataRawRegistrations}
              setsorting={setSortingRegistrations}
              sorting={sortingRegistrations}
              searching={searchingFilterRegistrations}
            />
          </div>
        </div>
      </div>

      <AccessControl hasPermission={RECRUITMENT_JALUR_DAFTAR_ADD}>
        <DrawerRegistrationCreate
          visible={isCreateDrawerShown}
          initProps={initProps}
          onvisible={setCreateDrawerShown}
          setRefresh={setRefresh}
          isAllowedToAdd={isAllowedToAddRegistration}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
        />
      </AccessControl>

      <AccessControl
        hasPermission={[
          RECRUITMENT_JALUR_DAFTAR_UPDATE,
          RECRUITMENT_JALUR_DAFTAR_GET,
        ]}
      >
        <DrawerRegistrationUpdate
          id={tempIdUpdate}
          visible={isUpdateDrawerShown}
          initProps={initProps}
          onvisible={setUpdateDrawerShown}
          setRefresh={setRefresh}
          trigger={triggerUpdate}
          isAllowedToGetRegistration={isAllowedToGetRegistration}
          isAllowedToUpdateRegistration={isAllowedToUpdateRegistration}
          setLoadingUpdate={setLoadingUpdate}
          loadingUpdate={loadingUpdate}
          onClickDelete={onOpenDeleteModal}
        />
      </AccessControl>

      {/* Drawer Status Detail */}
      <AccessControl hasPermission={RECRUITMENT_JALUR_DAFTAR_GET}>
        <DrawerCore
          title={`${dataRegistration.name}`}
          visible={drawread}
          onClose={() => {
            setdrawread(false);
          }}
          width={380}
          buttonUpdateText={
            <div className="flex flex-row space-x-2 items-center">
              <EditOutlined />
              <p>Ubah Status</p>
            </div>
          }
          onClick={() => {
            tempIdUpdate.current = dataRegistration.id;
            setTriggerUpdate((prev) => prev + 1);
            setUpdateDrawerShown(true);
            setdrawread(false);
          }}
          buttonCancelText={"Hapus Form"}
          onButtonCancelClicked={() => {
            onOpenDeleteModal(dataRegistration);
            setdrawread(false);
          }}
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-5">
              <div>
                <p className="text-gray-400 mb-2">Nama</p>
                <div className="flex flex-row items-center space-x-3">
                  <p>{dataRegistration.name}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 mb-2">Jumlah Kandidat</p>
                <div className="flex flex-row items-center space-x-3">
                  <p>{dataRegistration.recruitments_count}</p>
                </div>
              </div>
            </div>
          </div>
        </DrawerCore>
      </AccessControl>

      <AccessControl hasPermission={RECRUITMENT_JALUR_DAFTAR_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDelete}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"jalur daftar"}
          loading={loadingDelete}
          // disabled={candidateCount > 0}
        >
          Ada <strong>{dataDelete.recruitments_count} kandidat</strong> yang
          berada pada jalur daftar
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
