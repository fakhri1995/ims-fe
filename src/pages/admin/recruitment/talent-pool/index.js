import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ShareAltOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Input, Modal, Select, Spin, Tabs, Tag, notification } from "antd";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  TALENT_POOLS_GET,
  TALENT_POOL_CANDIDATES_GET,
  TALENT_POOL_CATEGORIES_GET,
  TALENT_POOL_CATEGORY_ADD,
  TALENT_POOL_FILTERS_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { CompanyService } from "apis/company";
import { ContractService } from "apis/contract";

import { TalentPoolService } from "../../../../apis/talent-pool/talent-pool.service";
import ButtonSys from "../../../../components/button";
import {
  NewsIconSvg,
  PlusIconSvg,
  SearchIconSvg,
  ShareIconSvg,
  TableImportIconSvg,
  UsersIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../../../components/layout-dashboardNew";
import { ModalHapus2 } from "../../../../components/modal/modalCustom";
import TalentPoolSection from "../../../../components/screen/talent-pool/TalentPoolSection";
import {
  TableCustomContractList,
  TableCustomTalentPoolList,
} from "../../../../components/table/tableCustom";
import {
  convertDaysToString,
  createKeyPressHandler,
  momentFormatDate,
} from "../../../../lib/helper";
import httpcookie from "cookie";

const TalentPoolIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const axiosClient = useAxiosClient();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetTalentPools = hasPermission(TALENT_POOLS_GET);
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
  const [refresh, setRefresh] = useState(-1);

  // 3. UseEffect & UseQuery
  // 3.1. Get Talent Pool Categories
  const { data: dataCategories, isLoading: loadingCategories } = useQuery(
    [TALENT_POOL_CATEGORIES_GET, refresh],
    () => TalentPoolService.getCategories(initProps, isAllowedToGetTalentPools),
    {
      enabled: isAllowedToGetTalentPoolCategories,
      select: (response) => response.data,
    }
  );

  // 3.2. Get Talent Pools
  const { data: dataTalents, isLoading: loadingTalents } = useQuery(
    [TALENT_POOLS_GET, queryParams, searchingFilterTalents, refresh],
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
    [TALENT_POOL_FILTERS_GET, queryParams.category_id, refresh],
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

  // 4.2. Create Contract
  // const onAddContract = useCallback(() => {
  //   handleAddContract();
  // }, []);

  // const handleAddContract = () => {
  //   // if (!isAllowedToAddTalentPoolCategory) {
  //   //   permissionWarningNotification("Menambah", "Kontrak");
  //   //   return;
  //   // }
  //   setLoadingAdd(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addContract`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response2) => {
  //       if (response2.success) {
  //         setTimeout(() => {
  //           rt.push(
  //             `/admin/contracts/create?id=${response2.data?.id}&prevpath=add`
  //           );
  //           setLoadingAdd(false);
  //         }, 500);
  //       } else {
  //         notification.error({
  //           message: `Gagal menambahkan kontrak. ${response2.message}`,
  //           duration: 3,
  //         });
  //         setLoadingAdd(false);
  //       }
  //     })
  //     .catch((err) => {
  //       notification.error({
  //         message: `Gagal menambahkan kontrak. ${err.response}`,
  //         duration: 3,
  //       });
  //       setLoadingAdd(false);
  //     });
  // };

  // 4.3. Delete Contract
  // const handleDeleteContract = (id) => {
  //   if (!isAllowedToGetTalentPoolCategories) {
  //     permissionWarningNotification("Menghapus", "Kontrak");
  //     return;
  //   }

  //   setLoadingDelete(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteContract?id=${id}`, {
  //     method: `DELETE`,
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       if (response.success) {
  //         setRefresh((prev) => prev + 1);
  //         setModalDelete(false);

  //         notification.success({
  //           message: response.message,
  //           duration: 3,
  //         });
  //       } else {
  //         notification.error({
  //           message: response.message,
  //           duration: 3,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       notification.error({
  //         message: `Gagal menghapus proyek. ${err.response}`,
  //         duration: 3,
  //       });
  //     })
  //     .finally(() => setLoadingDelete(false));
  // };

  if (isAccessControlPending) {
    return null;
  }

  console.log({ dataTalents });
  console.log({ dataFilters });
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
              <ButtonSys type={"primary"}>
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
                  isAllowedToGetTalentPools={isAllowedToGetTalentPools}
                  isAllowedToGetTalentPoolFilters={
                    isAllowedToGetTalentPoolFilters
                  }
                  queryParams={queryParams}
                  setQueryParams={setQueryParams}
                  dataTalents={dataTalents}
                  loadingTalents={loadingTalents}
                  searchingFilterTalents={searchingFilterTalents}
                  setSearchingFilterTalents={setSearchingFilterTalents}
                  dataFilters={dataFilters}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Modal Delete Talent */}
      {/* <AccessControl hasPermission={CONTRACT_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() => handleDeletTalent(dataRowClicked?.id)}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"talent"}
          loading={loadingDelete}>
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan talent{" "}
            <strong>{dataRowClicked?.code_number}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl> */}
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
