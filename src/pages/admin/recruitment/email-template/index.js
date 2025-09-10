import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Input, Select, notification } from "antd";
import parse from "html-react-parser";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENT_EMAIL_TEMPLATES_GET,
  RECRUITMENT_EMAIL_TEMPLATES_LIST_GET,
  RECRUITMENT_EMAIL_TEMPLATE_ADD,
  RECRUITMENT_EMAIL_TEMPLATE_DELETE,
  RECRUITMENT_EMAIL_TEMPLATE_GET,
  RECRUITMENT_EMAIL_TEMPLATE_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../../components/button";
import DrawerCore from "../../../../components/drawer/drawerCore";
import DrawerEmailTemplateCreate from "../../../../components/drawer/recruitment/drawerEmailTemplateCreate";
import DrawerEmailTemplateUpdate from "../../../../components/drawer/recruitment/drawerEmailTemplateUpdate";
import {
  DeleteTablerIconSvg,
  EditTablerIconSvg,
  PlusIconSvg,
  SearchIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard-management";
import st from "../../../../components/layout-dashboard-management.module.css";
import { ModalHapus2 } from "../../../../components/modal/modalCustom";
import SetupMenu from "../../../../components/setupMenu";
import { TableCustomRecruitmentTemplateEmail } from "../../../../components/table/tableCustom";
import { createKeyPressHandler } from "../../../../lib/helper";
import httpcookie from "cookie";

const EmailTemplateManagementIndex = ({ dataProfile, sidemenu, initProps }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetEmailTemplatesList = hasPermission(
    RECRUITMENT_EMAIL_TEMPLATES_LIST_GET
  );
  const isAllowedToGetEmailTemplates = hasPermission(
    RECRUITMENT_EMAIL_TEMPLATES_GET
  );
  const isAllowedToGetEmailTemplate = hasPermission(
    RECRUITMENT_EMAIL_TEMPLATE_GET
  );
  const isAllowedToAddEmailTemplate = hasPermission(
    RECRUITMENT_EMAIL_TEMPLATE_ADD
  );
  const isAllowedToUpdateEmailTemplate = hasPermission(
    RECRUITMENT_EMAIL_TEMPLATE_UPDATE
  );
  const isAllowedToDeleteEmailTemplate = hasPermission(
    RECRUITMENT_EMAIL_TEMPLATE_DELETE
  );
  const canUpdateEmailTemplate = hasPermission([
    RECRUITMENT_EMAIL_TEMPLATE_UPDATE,
    RECRUITMENT_EMAIL_TEMPLATE_GET,
  ]);

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Kelola Template Email";

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1, "Rekrutmen");

  // 2. Use state
  // 2.1. Table Stage
  const [loadingEmailTemplates, setLoadingEmailTemplates] = useState(false);
  const [loadingEmailTemplateList, setLoadingEmailTemplateList] =
    useState(false);

  const [dataEmailTemplates, setDataEmailTemplates] = useState([]);
  const [dataRawEmailTemplates, setDataRawEmailTemplates] = useState({
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

  const [pageEmailTemplates, setPageEmailTemplates] = useState(1);
  const [rowsEmailTemplates, setRowsEmailTemplates] = useState(10);
  const [sortingEmailTemplates, setSortingEmailTemplates] = useState({
    sort_by: "",
    sort_type: "",
  });

  const [searchingFilterEmailTemplates, setSearchingFilterEmailTemplates] =
    useState("");
  const [refresh, setRefresh] = useState(-1);

  // 2.2. Create Email Template
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  // 2.3. Update Email Template
  const [isUpdateDrawerShown, setUpdateDrawerShown] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const tempIdUpdate = useRef(-1);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);

  // 2.4. Delete Email Template
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    id: null,
    name: "",
    recruitments_count: 0,
  });

  // 2.2. Read Email Template
  const [isReadDrawerShown, setReadDrawerShown] = useState(false);
  const [loadingRead, setLoadingRead] = useState(false);
  const [dataTemplate, setDataTemplate] = useState({
    id: null,
    name: "",
    subject: "",
    body: "",
  });

  // 3. UseEffect
  // 3.1. Get Stages
  useEffect(() => {
    if (!isAllowedToGetEmailTemplates) {
      permissionWarningNotification("Mendapatkan", "Daftar Email Template");
      setLoadingEmailTemplates(false);
      return;
    }

    const fetchData = async () => {
      setLoadingEmailTemplates(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentEmailTemplates?keyword=${searchingFilterEmailTemplates}&rows=${rowsEmailTemplates}&page=${pageEmailTemplates}`,
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
            setDataRawEmailTemplates(res2.data);
            setDataEmailTemplates(res2.data.data);
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
          setLoadingEmailTemplates(false);
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
          setLoadingEmailTemplates(false);
        });
    };

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [isAllowedToGetEmailTemplates, refresh, searchingFilterEmailTemplates]);

  // 4. Event
  const onFilterEmailTemplate = () => {
    setLoadingEmailTemplates(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentEmailTemplates?sort_by=${sortingEmailTemplates.sort_by}&sort_type=${sortingEmailTemplates.sort_type}&keyword=${searchingFilterEmailTemplates}&rows=${rowsEmailTemplates}&page=${pageEmailTemplates}`,
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
          setDataRawEmailTemplates(res2.data);
          setDataEmailTemplates(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingEmailTemplates(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingEmailTemplates(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterEmailTemplate,
    "Enter"
  );

  const onOpenDeleteModal = (data) => {
    setModalDelete(true);
    setDataDelete({
      id: parseInt(data.id),
      name: data.name,
    });
  };

  const onOpenReadDrawer = (record) => {
    setReadDrawerShown(true);
    setDataTemplate((prev) => ({
      ...prev,
      id: record.id,
      name: record.name,
      subject: record.subject,
      body: record.body,
    }));
  };

  const clearData = () => {
    setDataTemplate({
      id: null,
      name: "",
      subject: "",
      body: "",
    });
  };

  const handleDelete = () => {
    if (!isAllowedToDeleteEmailTemplate) {
      permissionWarningNotification("Menghapus", "Template Email Rekrutmen");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteRecruitmentEmailTemplate?id=${dataDelete.id}`,
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
          message: `Gagal menghapus template email rekrutmen. ${err.response}`,
          duration: 3,
        });
        setLoadingDelete(false);
        setModalDelete(false);
      });
  };

  // Table's columns
  const columnsTemplateEmail = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="text-center w-5">
              {dataRawEmailTemplates?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: <div className="flex lg:w-80 xl:w-96">{record.name}</div>,
        };
      },
      sorter: isAllowedToGetEmailTemplates
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Action",
      key: "button_action",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex items-center space-x-2">
              <div
                className={"hover:cursor-pointer"}
                onClick={(event) => {
                  event.stopPropagation();
                  tempIdUpdate.current = record.id;
                  setTriggerUpdate((prev) => prev + 1);
                  setUpdateDrawerShown(true);
                }}
              >
                <EditTablerIconSvg size={20} color={"#808080"} />
              </div>
              <div
                className={"hover:cursor-pointer"}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenDeleteModal(record);
                }}
              >
                <DeleteTablerIconSvg size={20} color={"#BF4A40"} />
              </div>
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
      <div
        className="flex flex-col lg:flex-row w-full 
          space-y-6 lg:space-y-0 lg:space-x-6"
      >
        <div className="w-full lg:w-[258px] h-max space-y-5 rounded-[10px] border border-neutrals70 shadow-desktopCard">
          <SetupMenu menu={"5"} />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-12 space-y-6 mig-platform--p-0">
            <div className="col-span-full">
              <div className="flex items-center justify-between border-b py-3 px-4">
                <p className="mig-body--bold">
                  Semua Template Email ({dataRawEmailTemplates?.total})
                </p>
                <ButtonSys
                  type={isAllowedToAddEmailTemplate ? "primary" : "default"}
                  onClick={() => setCreateDrawerShown(true)}
                  disabled={!isAllowedToAddEmailTemplate}
                >
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <PlusIconSvg size={16} />
                    <p>Add Template Email</p>
                  </div>
                </ButtonSys>
              </div>
              {/* Start: Search criteria */}
              <div className="flex flex-row justify-between w-full gap-3 items-center py-3 px-4">
                {/* Search by keyword (kata kunci) */}
                <div className="w-full">
                  <Input
                    value={
                      searchingFilterEmailTemplates === ""
                        ? null
                        : searchingFilterEmailTemplates
                    }
                    style={{ width: `100%` }}
                    placeholder="Search Email Template.."
                    allowClear
                    onChange={(e) => {
                      setSearchingFilterEmailTemplates(e.target.value);
                      setPageEmailTemplates(1);
                    }}
                    onKeyPress={onKeyPressHandler}
                    disabled={!isAllowedToGetEmailTemplates}
                  />
                </div>
              </div>
              {/* End: Search criteria */}

              <TableCustomRecruitmentTemplateEmail
                dataSource={dataEmailTemplates}
                setDataSource={setDataEmailTemplates}
                columns={columnsTemplateEmail}
                loading={loadingEmailTemplates}
                setpraloading={setLoadingEmailTemplates}
                pageSize={rowsEmailTemplates}
                total={dataRawEmailTemplates?.total}
                initProps={initProps}
                setpage={setPageEmailTemplates}
                pagefromsearch={pageEmailTemplates}
                setdataraw={setDataRawEmailTemplates}
                setsorting={setSortingEmailTemplates}
                sorting={sortingEmailTemplates}
                searching={searchingFilterEmailTemplates}
                onOpenReadDrawer={onOpenReadDrawer}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Template Detail */}
      <AccessControl hasPermission={RECRUITMENT_EMAIL_TEMPLATE_GET}>
        <DrawerCore
          title={dataTemplate.name}
          visible={isReadDrawerShown}
          onClose={() => {
            setReadDrawerShown(false);
            clearData();
          }}
          width={380}
          newbuttonUpdateText={
            <div className="flex flex-row space-x-2 items-center">
              <EditTablerIconSvg size={16} />
              <p>Change Template</p>
            </div>
          }
          onClick={() => {
            tempIdUpdate.current = dataTemplate.id;
            setTriggerUpdate((prev) => prev + 1);
            setUpdateDrawerShown(true);
            setReadDrawerShown(false);
          }}
          newbuttonCancelText={
            <div className="flex flex-row space-x-2 items-center">
              <DeleteTablerIconSvg size={16} color={"#BF4A40"} />
              <p className={"text-[#BF4A40] font-roboto text-sm/4 font-medium"}>
                Delete Template
              </p>
            </div>
          }
          onButtonCancelClicked={() => {
            onOpenDeleteModal(dataTemplate);
            setReadDrawerShown(false);
          }}
        >
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-4">
              <p className="mig-caption--medium text-mono80">Subyek</p>
              <p>{dataTemplate.subject}</p>
            </div>
            <div className="flex flex-col space-y-4">
              <p className="mig-caption--medium text-mono80">Body</p>
              <p>{parse(dataTemplate.body)}</p>
            </div>
          </div>
        </DrawerCore>
      </AccessControl>

      <AccessControl hasPermission={RECRUITMENT_EMAIL_TEMPLATE_ADD}>
        <DrawerEmailTemplateCreate
          visible={isCreateDrawerShown}
          initProps={initProps}
          onvisible={setCreateDrawerShown}
          setRefresh={setRefresh}
          isAllowedToAdd={isAllowedToAddEmailTemplate}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
        />
      </AccessControl>

      <AccessControl
        hasPermission={[
          RECRUITMENT_EMAIL_TEMPLATE_UPDATE,
          RECRUITMENT_EMAIL_TEMPLATE_GET,
        ]}
      >
        <DrawerEmailTemplateUpdate
          id={tempIdUpdate}
          visible={isUpdateDrawerShown}
          initProps={initProps}
          onvisible={setUpdateDrawerShown}
          setRefresh={setRefresh}
          trigger={triggerUpdate}
          isAllowedToGetEmailTemplate={isAllowedToGetEmailTemplate}
          isAllowedToUpdateEmailTemplate={isAllowedToUpdateEmailTemplate}
          setLoadingUpdate={setLoadingUpdate}
          loadingUpdate={loadingUpdate}
          onClickDelete={onOpenDeleteModal}
        />
      </AccessControl>

      <AccessControl hasPermission={RECRUITMENT_EMAIL_TEMPLATE_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDelete}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"template"}
          loading={loadingDelete}
          okButtonText={
            <div className="flex flex-row space-x-2">
              <DeleteTablerIconSvg size={16} rev={""} />
              <p>Delete Template</p>
            </div>
          }
          buttonCancel={
            <ButtonSys
              type={"default"}
              color="mono50"
              onClick={() => setModalDelete(false)}
            >
              Cancel
            </ButtonSys>
          }
        >
          Are you sure want to delete <strong>{dataDelete.name}</strong>?
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

export default EmailTemplateManagementIndex;
