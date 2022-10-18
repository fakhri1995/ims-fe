import { Input, Select, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENT_ROLES_GET,
  RECRUITMENT_ROLES_LIST_GET,
  RECRUITMENT_ROLE_ADD,
  RECRUITMENT_ROLE_DELETE,
  RECRUITMENT_ROLE_GET,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
  RECRUITMENT_ROLE_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../../components/button";
import DrawerRoleCreate from "../../../../components/drawer/recruitment/drawerRoleCreate";
import DrawerRoleUpdate from "../../../../components/drawer/recruitment/drawerRoleUpdate";
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
import {
  TableCustomRecruitmentRole,
  TableCustomTickets,
} from "../../../../components/table/tableCustom";
import { createKeyPressHandler } from "../../../../lib/helper";
import httpcookie from "cookie";

const RoleManagementIndex = ({ dataProfile, sidemenu, initProps }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetRolesList = hasPermission(RECRUITMENT_ROLES_LIST_GET);
  const isAllowedToGetRoles = hasPermission(RECRUITMENT_ROLES_GET);
  const isAllowedToGetRoleTypes = hasPermission(
    RECRUITMENT_ROLE_TYPES_LIST_GET
  );
  const isAllowedToGetRole = hasPermission(RECRUITMENT_ROLE_GET);
  const isAllowedToAddRole = hasPermission(RECRUITMENT_ROLE_ADD);
  const isAllowedToUpdateRole = hasPermission(RECRUITMENT_ROLE_UPDATE);
  const isAllowedToDeleteRole = hasPermission(RECRUITMENT_ROLE_DELETE);
  const canUpdateRole = hasPermission([
    RECRUITMENT_ROLE_UPDATE,
    RECRUITMENT_ROLE_GET,
  ]);

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Kelola Role";

  // 2. Use state
  // 2.1. Table Role
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [loadingRoleTypes, setLoadingRoleTypes] = useState(false);

  const [dataRoles, setDataRoles] = useState([]);
  const [dataRoleList, setDataRoleList] = useState([]);
  const [dataRoleTypes, setDataRoleTypes] = useState([]);
  const [dataRawRoles, setDataRawRoles] = useState({
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

  const [pageRoles, setPageRoles] = useState(1);
  const [rowsRoles, setRowsRoles] = useState(10);
  const [sortingRoles, setSortingRoles] = useState({
    sort_by: "",
    sort_type: "",
  });
  // const typeOrder = ['Internship', 'Contract', 'Part Time', 'Full Time']

  const [searchingFilterRoles, setSearchingFilterRoles] = useState("");
  const [roleTypeId, setRoleTypeId] = useState(0);
  const [refresh, setRefresh] = useState(-1);

  // 2.2. Create Role
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  // 2.3. Update Role
  const [isUpdateDrawerShown, setUpdateDrawerShown] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const tempIdUpdate = useRef(-1);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);

  // 2.4. Delete Role
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: null,
    name: "",
    recruitments_count: 0,
  });

  // 3. UseEffect
  // 3.1. Get Roles List
  useEffect(() => {
    if (!isAllowedToGetRolesList) {
      permissionWarningNotification(
        "Mendapatkan",
        "Data Recruitment Role List"
      );
      setLoadingRoleList(false);
      return;
    }

    setLoadingRoleList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRoleList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRoleList(false);
      })
      .catch((err) => {
        // console.log(err);
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRoleList(false);
      });
  }, [isAllowedToGetRolesList, refresh]);

  // 3.2. Get Roles
  useEffect(() => {
    if (!isAllowedToGetRoles) {
      permissionWarningNotification("Mendapatkan", "Daftar Role");
      setLoadingRoles(false);
      return;
    }

    setLoadingRoles(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoles?rows=10`,
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
          setDataRawRoles(res2.data);
          setDataRoles(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRoles(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRoles(false);
      });
  }, [isAllowedToGetRoles, refresh]);

  // 3.3. Get Role Types
  useEffect(() => {
    if (!isAllowedToGetRoleTypes) {
      permissionWarningNotification("Mendapatkan", "Daftar Tipe Role");
      setLoadingRoleTypes(false);
      return;
    }

    setLoadingRoleTypes(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoleTypesList`,
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
          setDataRoleTypes(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRoleTypes(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRoleTypes(false);
      });
  }, [isAllowedToGetRoleTypes, refresh]);

  // 4. Event
  const onFilterRoles = () => {
    setLoadingRoles(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoles?sort_by=${sortingRoles.sort_by}&sort_type=${sortingRoles.sort_type}&recruitment_role_type_id=${roleTypeId}&keyword=${searchingFilterRoles}&rows=${rowsRoles}&page=${pageRoles}`,
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
          setDataRawRoles(res2.data);
          setDataRoles(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRoles(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRoles(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterRoles, "Enter");

  const onOpenDeleteModal = (data) => {
    setModalDelete(true);
    setDataDelete({
      id: parseInt(data.id),
      name: data.name,
      recruitments_count: parseInt(data.recruitments_count),
    });
  };

  const handleDelete = () => {
    if (!isAllowedToDeleteRole) {
      permissionWarningNotification("Menghapus", "Role Rekrutmen");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteRecruitmentRole?id=${dataDelete.id}`,
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
          message: `Gagal menghapus role rekrutmen. ${err.response}`,
          duration: 3,
        });
        setLoadingDelete(false);
        setModalDelete(false);
      });
  };

  // Table's columns
  const columnsRole = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawRoles?.from + index}
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
      sorter: isAllowedToGetRoles
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Alias",
      dataIndex: "alias",
      render: (text, record, index) => {
        return {
          children: <>{record.alias}</>,
        };
      },
    },
    {
      title: "Tipe",
      dataIndex: "role_type",
      render: (text, record, index) => {
        return {
          children: <>{record.type?.name}</>,
        };
      },
      sorter: isAllowedToGetRoles
        ? (a, b) => a.type?.name > b.type?.name
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
      sorter: isAllowedToGetRoles
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
                type={canUpdateRole ? "default" : "primary"}
                disabled={!canUpdateRole}
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
                type={isAllowedToDeleteRole ? "default" : "primary"}
                color="danger"
                disabled={!isAllowedToDeleteRole}
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
          <SetupMenu menu={"1"} />

          {/* Table Semua Role */}
          <div className="col-span-4 flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="mig-heading--4 ">
                Semua Role ({dataRoleList.length})
              </h4>

              <ButtonSys
                type={isAllowedToAddRole ? "default" : "primary"}
                onClick={() => setCreateDrawerShown(true)}
                disabled={!isAllowedToAddRole}
              >
                <div className="flex flex-row space-x-2.5 items-center">
                  <LayoutGridAddSvg size={16} color="#35763B" />
                  <p>Tambah Role</p>
                </div>
              </ButtonSys>
            </div>

            {/* Start: Search criteria */}
            <div className="flex flex-row justify-between w-full space-x-2 items-center mb-4">
              {/* Search by keyword (kata kunci) */}
              <div className="w-7/12">
                <Input
                  value={
                    searchingFilterRoles === "" ? null : searchingFilterRoles
                  }
                  style={{ width: `100%` }}
                  placeholder="Kata Kunci.."
                  allowClear
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSearchingFilterRoles("");
                    } else {
                      setSearchingFilterRoles(e.target.value);
                    }
                  }}
                  onKeyPress={onKeyPressHandler}
                  disabled={!isAllowedToGetRoles}
                />
              </div>

              {/* Filter by role type (dropdown) */}
              <div className="w-3/12">
                <Select
                  value={roleTypeId === 0 ? null : roleTypeId}
                  allowClear
                  name={`role_type`}
                  disabled={!isAllowedToGetRoleTypes}
                  defaultValue={0}
                  placeholder="Semua Tipe"
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    typeof value === "undefined"
                      ? setRoleTypeId(0)
                      : setRoleTypeId(value);
                  }}
                >
                  <Select.Option value={0}>Semua Tipe</Select.Option>
                  {dataRoleTypes.map((type) => (
                    <Select.Option key={type.id} value={type.id}>
                      {type.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <ButtonSys
                type={`primary`}
                onClick={onFilterRoles}
                disabled={!isAllowedToGetRoles}
              >
                <div className="flex flex-row space-x-2.5 w-full items-center">
                  <SearchIconSvg size={15} color={`#ffffff`} />
                  <p>Cari</p>
                </div>
              </ButtonSys>
            </div>
            {/* End: Search criteria */}

            <TableCustomRecruitmentRole
              dataSource={dataRoles}
              setDataSource={setDataRoles}
              columns={columnsRole}
              loading={loadingRoles}
              setpraloading={setLoadingRoles}
              pageSize={rowsRoles}
              total={dataRawRoles?.total}
              initProps={initProps}
              setpage={setPageRoles}
              pagefromsearch={pageRoles}
              setdataraw={setDataRawRoles}
              setsorting={setSortingRoles}
              sorting={sortingRoles}
              searching={searchingFilterRoles}
              roleTypeId={roleTypeId}
              // onOpenReadDrawer={onOpenReadDrawer}
            />
          </div>
        </div>
      </div>

      <AccessControl hasPermission={RECRUITMENT_ROLE_ADD}>
        <DrawerRoleCreate
          visible={isCreateDrawerShown}
          initProps={initProps}
          onvisible={setCreateDrawerShown}
          setRefresh={setRefresh}
          isAllowedToAddRole={isAllowedToAddRole}
          dataRoleTypes={dataRoleTypes}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
        />
      </AccessControl>

      <AccessControl hasPermission={RECRUITMENT_ROLE_UPDATE}>
        <DrawerRoleUpdate
          id={tempIdUpdate}
          visible={isUpdateDrawerShown}
          initProps={initProps}
          onvisible={setUpdateDrawerShown}
          setRefresh={setRefresh}
          trigger={triggerUpdate}
          isAllowedToGetRole={isAllowedToGetRole}
          isAllowedToUpdateRole={isAllowedToUpdateRole}
          dataRoleTypes={dataRoleTypes}
          setLoadingUpdate={setLoadingUpdate}
          loadingUpdate={loadingUpdate}
          onClickDelete={onOpenDeleteModal}
        />
      </AccessControl>

      <AccessControl hasPermission={RECRUITMENT_ROLE_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDelete}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"role"}
          loading={loadingDelete}
          // disabled={candidateCount > 0}
        >
          Ada <strong>{dataDelete.recruitments_count}</strong> yang melamar role
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

export default RoleManagementIndex;
