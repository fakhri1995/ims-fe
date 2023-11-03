import { UnorderedListOutlined } from "@ant-design/icons";
import { Spin, Tabs, notification } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { PlusIconSvg, UsersIconSvg, XIconSvg } from "components/icon";
import st from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import { ModalHapus2 } from "components/modal/modalCustom";
import ModalCategoryCreate from "components/modal/talent-pool/modalCategoryCreate";
import ModalLinkList from "components/modal/talent-pool/modalLinkList";
import TalentPoolSection from "components/screen/talent-pool/TalentPoolSection";

import { useAccessControl } from "contexts/access-control";

import {
  TALENT_POOLS_GET,
  TALENT_POOL_CANDIDATES_GET,
  TALENT_POOL_CATEGORIES_GET,
  TALENT_POOL_CATEGORY_ADD,
  TALENT_POOL_FILTERS_GET,
} from "lib/features";
import {
  RESUME_GET,
  TALENT_POOL_ADD,
  TALENT_POOL_CATEGORY_DELETE,
  TALENT_POOL_DELETE,
  TALENT_POOL_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { TalentPoolService } from "apis/talent-pool/talent-pool.service";

import { TableOffIconSvg } from "../../components/icon";
import ModalEliminatedTalent from "../../components/modal/talent-pool/modalEliminatedTalent";
import httpcookie from "cookie";

const TalentPoolRequesterIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetTalentPools = hasPermission(TALENT_POOLS_GET);
  const isAllowedToGetTalentPool = hasPermission(TALENT_POOL_GET);
  const isAllowedToAddTalentPool = hasPermission(TALENT_POOL_ADD);
  const isAllowedToDeleteTalentPool = hasPermission(TALENT_POOL_DELETE);
  const isAllowedToGetTalentPoolFilters = hasPermission(
    TALENT_POOL_FILTERS_GET
  );

  const isAllowedToGetTalentPoolCategories = hasPermission(
    TALENT_POOL_CATEGORIES_GET
  );
  const isAllowedToAddTalentPoolCategory = hasPermission(
    TALENT_POOL_CATEGORY_ADD
  );
  const isAllowedToDeleteTalentPoolCategory = hasPermission(
    TALENT_POOL_CATEGORY_DELETE
  );

  const isAllowedToGetResume = hasPermission(RESUME_GET);

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    category_id: withDefault(NumberParam, 1),
    roles: withDefault(StringParam, undefined),
    skills: withDefault(StringParam, undefined),
    years: withDefault(StringParam, undefined),
    educations: withDefault(StringParam, undefined),
    status: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pageBreadcrumbValue = useMemo(() => [
    { name: "Rekrutmen", hrefValue: "/admin/recruitment" },
    { name: "Talent Pool", hrefValue: "/admin/recruitment/talent-pool" },
  ]);

  // 2. Use state
  const [currentCategory, setCurrentCategory] = useState({ id: 0, name: "" });

  const [loadingDelete, setLoadingDelete] = useState(false);

  const [modalTable, setModalTable] = useState(false);
  const [modalCategoryCreate, setModalCategoryCreate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({ id: 0, name: "" });

  // 3. UseEffect & UseQuery
  // 3.1. Get Talent Pool Categories
  const {
    data: dataCategories,
    isLoading: loadingCategories,
    refetch: refetchCategories,
  } = useQuery(
    [TALENT_POOL_CATEGORIES_GET],
    () =>
      TalentPoolService.getCategories(
        initProps,
        isAllowedToGetTalentPoolCategories
      ),
    {
      enabled: isAllowedToGetTalentPoolCategories,
      select: (response) => response.data,
    }
  );

  // 3.2. Set active category tab
  useEffect(() => {
    const firstCategory = dataCategories?.[0];
    setCurrentCategory({ id: firstCategory?.id, name: firstCategory?.name });
    setQueryParams({ category_id: firstCategory?.id });
  }, [dataCategories]);

  // 4. Event

  if (isAccessControlPending) {
    return null;
  }

  // console.log({ dataCategories });
  // console.log({ currentCategory });
  return (
    <LayoutDashboard
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      fixedBreadcrumbValues={pageBreadcrumbValue}
    >
      <div className="grid grid-cols-1 px-4 md:px-5" id="mainWrapper">
        <div className="flex flex-col shadow-md rounded-md bg-white px-5 py-6 gap-6 mb-6">
          <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
            <h4 className="mig-heading--4 w-full md:w-2/12 whitespace-nowrap">
              Daftar Talent
            </h4>
            <div className="flex flex-col lg:flex-row gap-2 md:justify-end">
              <ButtonSys
                type={"primary"}
                color={"danger"}
                onClick={() => setModalTable(true)}
              >
                <div className="flex gap-2 items-center">
                  <TableOffIconSvg size={16} color={"#FFFFFF"} />
                  <p className="mig-caption">Tabel Eliminasi Talent</p>
                </div>
              </ButtonSys>
              <ButtonSys
                type={"primary"}
                // onClick={() => setModalCategoryCreate(true)}
                disabled={!isAllowedToAddTalentPoolCategory}
              >
                <div className="flex gap-2 items-center">
                  <PlusIconSvg size={16} />
                  <p className="mig-caption">Tambah Permintaan</p>
                </div>
              </ButtonSys>
            </div>
          </div>
          <Spin spinning={loadingCategories}>
            <Tabs
              defaultActiveKey={"1"}
              className="talentPoolTab px-1"
              activeKey={"1"}
            >
              <Tabs.TabPane
                key={"1"}
                tab={
                  <div
                    className={`flex gap-2 items-center justify-between py-2 px-5 bg-primary100 bg-opacity-10
                          `}
                  >
                    <p className="w-2/3">{currentCategory?.name}</p>
                  </div>
                }
                tabKey={"1"}
              >
                {/* Talent Pool per Category */}
                <TalentPoolSection
                  initProps={initProps}
                  isAllowedToGetTalentPools={isAllowedToGetTalentPools}
                  isAllowedToGetTalentPool={isAllowedToGetTalentPool}
                  isAllowedToGetTalentPoolFilters={
                    isAllowedToGetTalentPoolFilters
                  }
                  isAllowedToAddTalentPool={isAllowedToAddTalentPool}
                  isAllowedToDeleteTalentPool={isAllowedToDeleteTalentPool}
                  isAllowedToGetResume={isAllowedToGetResume}
                  queryParams={queryParams}
                  setQueryParams={setQueryParams}
                  category={currentCategory}
                  isRequester={true}
                />
              </Tabs.TabPane>
            </Tabs>
          </Spin>
        </div>
      </div>

      {/* TODO: change feature access */}
      <AccessControl hasPermission={TALENT_POOL_ADD}>
        <ModalEliminatedTalent
          initProps={initProps}
          visible={modalTable}
          onvisible={setModalTable}
          category={currentCategory}
        />
      </AccessControl>
    </LayoutDashboard>
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
      sidemenu: "talent/daftar-talent",
    },
  };
}

export default TalentPoolRequesterIndex;
