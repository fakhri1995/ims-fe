import { Spin, Tabs, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { PlusIconSvg, UsersIconSvg, XIconSvg } from "components/icon";
import st from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";

import { TalentPoolPublicService } from "../../apis/talent-pool";
import { TableOffIconSvg } from "../../components/icon";
import ModalEliminatedTalent from "../../components/modal/talent-pool/modalEliminatedTalent";
import TalentPoolSectionPublic from "../../components/screen/talent-pool/TalentPoolSectionPublic";
import { TALENT_POOL_SHARE_PUBLIC_AUTH } from "../../lib/features";
import httpcookie from "cookie";

const TalentPoolPublicIndex = ({
  initProps,
  dataProfile,
  sidemenu,
  linkCode,
  isPublic,
}) => {
  // 1. Init
  /**
   * Dependencies
   */

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pageBreadcrumbValue = useMemo(() => [
    { name: "Talent Pool", hrefValue: "" },
  ]);

  // 2. Use state
  const [modalTable, setModalTable] = useState(false);

  // 3. UseEffect & UseQuery
  // 3.1. Get Public Talent Pool Auth
  const {
    data: dataAuth,
    isLoading: loadingAuth,
    refetch: refetchAuth,
  } = useQuery(
    [TALENT_POOL_SHARE_PUBLIC_AUTH, linkCode],
    () => TalentPoolPublicService.getAuth(linkCode),
    {
      enabled: !!linkCode,
      initialData: [],
      select: (response) => response.data,
    }
  );

  // 4. Event

  return (
    <LayoutDashboard
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      fixedBreadcrumbValues={pageBreadcrumbValue}
      isPublic={isPublic}
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
                // disabled={!isAllowedToAddTalentPoolCategory}
              >
                <div className="flex gap-2 items-center">
                  <PlusIconSvg size={16} />
                  <p className="mig-caption">Tambah Permintaan</p>
                </div>
              </ButtonSys>
            </div>
          </div>
          <Spin spinning={loadingAuth}>
            <Tabs
              defaultActiveKey={"1"}
              className="talentPoolTab px-1"
              activeKey={"1"}
            >
              <Tabs.TabPane
                key={"1"}
                tab={
                  <div
                    className={`flex gap-2 items-center justify-between py-2 px-5 
                    bg-primary100 bg-opacity-10`}
                  >
                    <p className="w-2/3">{dataAuth?.category?.name}</p>
                  </div>
                }
                tabKey={"1"}
              >
                <TalentPoolSectionPublic
                  shareId={dataAuth?.id}
                  category={dataAuth?.category}
                  setModalEliminatedTalent={setModalTable}
                />
              </Tabs.TabPane>
            </Tabs>
          </Spin>
        </div>
      </div>

      <ModalEliminatedTalent
        visible={modalTable}
        onvisible={setModalTable}
        category={dataAuth?.category}
        shareId={dataAuth?.id}
      />
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  let initProps = {};
  let cookiesJSON1 = {};
  let linkCode = params.linkCode;
  let dataProfile = {};
  let isPublic = true;

  if (!req.headers.cookie && !linkCode) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  if (typeof req.headers.cookie == "string") {
    cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  }

  if (!cookiesJSON1.token && !linkCode) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  initProps = cookiesJSON1.token || null;
  if (initProps) {
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
    dataProfile = resjsonGP;
    isPublic = false;
  } else if (linkCode) {
    const publicAuth = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/authTalentPoolSharePublic?code=${linkCode}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    dataProfile = {
      data: publicAuth.data.user,
    };
    isPublic = true;
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "talent/daftar-talent",
      linkCode,
      isPublic,
    },
  };
}

export default TalentPoolPublicIndex;
