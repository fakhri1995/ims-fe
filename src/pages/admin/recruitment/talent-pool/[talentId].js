import { UnorderedListOutlined } from "@ant-design/icons";
import { Tabs, Tag } from "antd";
import parse from "html-react-parser";
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

import { CandidateService } from "../../../../apis/candidates";
import { TalentPoolService } from "../../../../apis/talent-pool/talent-pool.service";
import ButtonSys from "../../../../components/button";
import {
  ArrowLeftIconSvg,
  BriefcaseIconSvg,
  BulbIconSvg,
  CalendarEventIconSvg,
  CompanyIconSvg,
  PhoneIconSvg,
  PlusIconSvg,
  SchoolIconSvg,
  UsersIconSvg,
} from "../../../../components/icon";
import st from "../../../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../../../components/layout-dashboardNew";
import ModalCategoryCreate from "../../../../components/modal/talent-pool/modalCategoryCreate";
import TalentPoolSection from "../../../../components/screen/talent-pool/TalentPoolSection";
import {
  RESUME_GET,
  TALENT_POOL_ADD,
  TALENT_POOL_DELETE,
  TALENT_POOL_GET,
} from "../../../../lib/features";
import { getNameInitial } from "../../../../lib/helper";
import httpcookie from "cookie";

const TalentDetailIndex = ({ dataProfile, sidemenu, initProps, talentId }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetTalentPool = hasPermission(TALENT_POOL_GET);
  const isAllowedToGetResume = hasPermission(RESUME_GET);

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pageBreadcrumbValue = useMemo(() => [
    { name: "Rekrutmen", hrefValue: "/admin/recruitment" },
    { name: "Talent Pool", hrefValue: "/admin/recruitment/talent-pool" },
    {
      name: "Detail Kandidat",
      hrefValue: `/admin/recruitment/talent-pool/${talentId}`,
    },
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
  // 3.1. Get Talent
  const { data: dataTalent, isLoading: loadingTalent } = useQuery(
    [TALENT_POOL_GET, talentId],
    () =>
      TalentPoolService.getTalent(
        initProps,
        isAllowedToGetTalentPool,
        talentId
      ),
    {
      enabled: isAllowedToGetTalentPool,
      select: (response) => response.data,
    }
  );

  // 3.1. Get Resume Talent
  const { data: dataResume, isLoading: loadingResume } = useQuery(
    [RESUME_GET, dataTalent?.resume_id],
    () =>
      CandidateService.getResume(
        initProps,
        isAllowedToGetResume,
        dataTalent?.resume_id
      ),
    {
      enabled: isAllowedToGetResume,
      select: (response) => response.data,
    }
  );

  // 4. Event

  if (isAccessControlPending) {
    return null;
  }

  // console.log({ dataTalent });
  // console.log({ dataResume });
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
        <div className="flex flex-col shadow-md rounded-md bg-white p-6 gap-4 ">
          <div className="flex gap-2 items-center">
            <ArrowLeftIconSvg size={24} color={"#4D4D4D"} />
            <p className="mig-caption--bold text-mono50">Kembali</p>
          </div>

          <div className="flex gap-6 items-center">
            <div
              className="rounded-full w-20 h-20 p-2 flex justify-center items-center 
              bg-backdrop mig-heading--4 text-primary100"
            >
              {getNameInitial(dataTalent?.resume?.name)}
            </div>
            <div>
              <h4 className="mig-heading--4">{dataTalent?.resume?.name}</h4>
              <p className="mig-caption--medium text-mono30">
                {dataTalent?.resume?.last_assessment?.name}
              </p>
              <p className="mig-caption--medium text-mono50">
                {dataTalent?.resume?.email}
              </p>
            </div>
          </div>

          <hr />

          {/* Informasi Umum */}
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mig-caption--medium">
              <div
                className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
              >
                <CompanyIconSvg size={16} color={"#35763B"} />
                <p className="text-primary100">Asal Kota</p>
              </div>
              <p>{dataTalent?.resume?.city || "-"}</p>
            </div>

            <div className="mig-caption--medium">
              <div
                className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
              >
                <BriefcaseIconSvg size={16} color={"#35763B"} />
                <p className="text-primary100">Pengalaman Terakhir</p>
              </div>
              <p>{dataTalent?.resume?.last_experience?.name || "-"}</p>
            </div>

            <div className="mig-caption--medium">
              <div
                className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
              >
                <PhoneIconSvg size={16} color={"#35763B"} />
                <p className="text-primary100">No Telepon</p>
              </div>
              <p>{dataTalent?.resume?.telp || "-"}</p>
            </div>

            <div className="mig-caption--medium">
              <div
                className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
              >
                <SchoolIconSvg size={16} color={"#35763B"} />
                <p className="text-primary100">Universitas</p>
              </div>
              <p>{dataTalent?.resume?.last_education?.university || "-"}</p>
            </div>

            <div className="mig-caption--medium">
              <div
                className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
              >
                <BriefcaseIconSvg size={16} color={"#35763B"} />
                <p className="text-primary100">Role</p>
              </div>
              <p>{dataTalent?.resume?.last_assessment?.name || "-"}</p>
            </div>

            <div className="mig-caption--medium">
              <div
                className="flex rounded-sm w-max bg-backdrop gap-2 
                items-center px-2 py-0.5 mb-2 "
              >
                <CalendarEventIconSvg size={16} color={"#35763B"} />
                <p className="text-primary100">Tanggal Daftar</p>
              </div>
              <p>{dataTalent?.resume?.recruitment?.created_at || "-"}</p>
            </div>
          </div>

          <hr className="" />

          {/* Summary */}
          <div className="flex flex-col gap-4">
            <h4 className="mig-heading--4">Summary</h4>
            <div>
              {dataResume?.summaries?.description ? (
                parse(dataResume?.summaries?.description)
              ) : (
                <p>-</p>
              )}
            </div>
          </div>

          <hr className="col-span-3" />

          {/* Resume */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Academic */}
            <div className="flex flex-col gap-4">
              <h4 className="mig-heading--4">Academic History</h4>
              <div>
                {dataResume?.summaries?.description ? (
                  parse(dataResume?.summaries?.description)
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-4">
              <h4 className="mig-heading--4">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {dataTalent?.resume?.skills?.map((skill) => (
                  <Tag
                    key={skill.id}
                    color="#35763B1A"
                    className="text-primary100 rounded-md mig-caption--bold"
                  >
                    {skill.name}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const talentId = params.talentId;
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
      talentId,
    },
  };
}

export default TalentDetailIndex;
