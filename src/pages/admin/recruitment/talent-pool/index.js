import { UnorderedListOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { NumberParam, useQueryParams, withDefault } from "next-query-params";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  TALENT_POOLS_GET,
  TALENT_POOL_CANDIDATES_GET,
  TALENT_POOL_CATEGORIES_GET,
  TALENT_POOL_CATEGORY_ADD,
  TALENT_POOL_FILTERS_GET,
} from "lib/features";

import { TalentPoolService } from "../../../../apis/talent-pool/talent-pool.service";
import ButtonSys from "../../../../components/button";
import { PlusIconSvg, UsersIconSvg } from "../../../../components/icon";
import st from "../../../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../../../components/layout-dashboardNew";
import ModalCategoryCreate from "../../../../components/modal/talent-pool/modalCategoryCreate";
import TalentPoolSection from "../../../../components/screen/talent-pool/TalentPoolSection";
import {
  TALENT_POOL_ADD,
  TALENT_POOL_DELETE,
  TALENT_POOL_GET,
} from "../../../../lib/features";
import httpcookie from "cookie";

const TalentPoolIndex = ({ dataProfile, sidemenu, initProps }) => {
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

  const isAllowedToGetTalentPoolCandidates = hasPermission(
    TALENT_POOL_CANDIDATES_GET
  );
  const isAllowedToGetTalentPoolCategories = hasPermission(
    TALENT_POOL_CATEGORIES_GET
  );
  const isAllowedToAddTalentPoolCategory = hasPermission(
    TALENT_POOL_CATEGORY_ADD
  );

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    category_id: withDefault(NumberParam, 1),
    role: withDefault(NumberParam, undefined),
    skill: withDefault(NumberParam, undefined),
    year: withDefault(NumberParam, undefined),
    university: withDefault(NumberParam, undefined),
    status: withDefault(NumberParam, undefined),
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
  // 2.1. Table Contract
  // filter search & selected options
  const [searchingFilterTalents, setSearchingFilterTalents] = useState("");
  const [currentCategory, setCurrentCategory] = useState("1");
  const [modalCategoryCreate, setModalCategoryCreate] = useState(false);
  const [refreshCategory, setRefreshCategory] = useState(-1);
  const [refreshPool, setRefreshPool] = useState(-1);

  // 3. UseEffect & UseQuery
  // 3.1. Get Talent Pool Categories
  const { data: dataCategories, isLoading: loadingCategories } = useQuery(
    [TALENT_POOL_CATEGORIES_GET, refreshCategory],
    () => TalentPoolService.getCategories(initProps, isAllowedToGetTalentPools),
    {
      enabled: isAllowedToGetTalentPoolCategories,
      select: (response) => response.data,
    }
  );

  // 3.2. Get Talent Pools
  const { data: dataTalents, isLoading: loadingTalents } = useQuery(
    [TALENT_POOLS_GET, queryParams, searchingFilterTalents, refreshPool],
    () =>
      TalentPoolService.getTalentPools(
        initProps,
        isAllowedToGetTalentPools,
        queryParams,
        searchingFilterTalents
      ),
    {
      enabled: isAllowedToGetTalentPools,
      select: (response) => response.data,
    }
  );

  // 3.3. Get Talent Pool Filters
  const { data: dataFilters, isLoading: loadingFilters } = useQuery(
    [TALENT_POOL_FILTERS_GET, queryParams.category_id, refreshPool],
    () =>
      TalentPoolService.getFilters(
        initProps,
        isAllowedToGetTalentPools,
        queryParams.category_id
      ),
    {
      enabled: isAllowedToGetTalentPoolFilters,
      select: (response) => response.data,
    }
  );

  // 4. Event

  if (isAccessControlPending) {
    return null;
  }

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
          <div className="flex justify-between items-center">
            <h4 className="mig-heading--4 w-full md:w-2/12">Daftar Talent</h4>
            <div className="flex flex-wrap gap-2 justify-end">
              <ButtonSys type={"default"}>
                <div className="flex gap-2 items-center">
                  <UnorderedListOutlined rev={""} />
                  <p className="mig-caption">Daftar Tautan [Nama Kategori]</p>
                </div>
              </ButtonSys>
              <ButtonSys type={"primary"} color={"secondary100"}>
                <div className="flex gap-2 items-center">
                  <UsersIconSvg size={16} color={"#FFFFFF"} />
                  <p className="mig-caption">Kelola Permintaan Klien</p>
                </div>
              </ButtonSys>
              <ButtonSys
                type={"primary"}
                onClick={() => setModalCategoryCreate(true)}
                disabled={!isAllowedToAddTalentPoolCategory}
              >
                <div className="flex gap-2 items-center">
                  <PlusIconSvg size={16} />
                  <p className="mig-caption">Tambah Kategori</p>
                </div>
              </ButtonSys>
            </div>
          </div>
          <Tabs
            defaultActiveKey={"1"}
            tabBarGutter={60}
            className="px-1"
            activeKey={currentCategory}
            onTabClick={(key) => {
              setCurrentCategory(key);
              setQueryParams({ category_id: key });
              rt.push(`talent-pool?category_id=${key}`, undefined, {
                shallow: true,
              });
            }}
          >
            {dataCategories?.map((category) => (
              <Tabs.TabPane
                key={category?.id}
                tab={category?.name}
                tabKey={category?.id}
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
                  queryParams={queryParams}
                  setQueryParams={setQueryParams}
                  category={category}
                  dataTalents={dataTalents}
                  loadingTalents={loadingTalents}
                  searchingFilterTalents={searchingFilterTalents}
                  setSearchingFilterTalents={setSearchingFilterTalents}
                  dataFilters={dataFilters}
                  setRefresh={setRefreshPool}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </div>

      <AccessControl hasPermission={TALENT_POOL_CATEGORY_ADD}>
        <ModalCategoryCreate
          initProps={initProps}
          visible={modalCategoryCreate}
          onvisible={setModalCategoryCreate}
          isAllowedToAddCategory={isAllowedToAddTalentPoolCategory}
          setRefreshCategory={setRefreshCategory}
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
      sidemenu: "recruitment-talent-pool",
    },
  };
}

export default TalentPoolIndex;
