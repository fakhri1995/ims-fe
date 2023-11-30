import { Spin, Tabs, Tag, Timeline } from "antd";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { CandidateService } from "../../../../apis/candidates";
import { TalentPoolService } from "../../../../apis/talent-pool/talent-pool.service";
import ButtonSys from "../../../../components/button";
import {
  ArrowLeftIconSvg,
  BriefcaseIconSvg,
  CalendarEventIconSvg,
  CompanyIconSvg,
  PhoneIconSvg,
  SchoolIconSvg,
} from "../../../../components/icon";
import st from "../../../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../../../components/layout-dashboardNew";
import { RESUME_GET, TALENT_POOL_GET } from "../../../../lib/features";
import {
  generateStaticAssetUrl,
  getNameInitial,
  momentFormatDate,
} from "../../../../lib/helper";
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
  const pathArr = rt.pathname?.split("/")?.slice(1);

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

  // 3.2. Get Resume Talent
  const { data: dataResume, isLoading: loadingResume } = useQuery(
    [RESUME_GET, dataTalent?.resume_id],
    () =>
      CandidateService.getResume(
        initProps,
        isAllowedToGetResume,
        dataTalent?.resume_id
      ),
    {
      enabled: !!dataTalent?.resume_id,
      select: (response) => response.data,
    }
  );

  // 4. Event

  if (isAccessControlPending) {
    return null;
  }

  const assessmentResults = dataResume?.assessment_results?.filter(
    (item) => item.value
  );

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
        <Spin spinning={loadingResume}>
          <div className="flex flex-col shadow-md rounded-md bg-white p-6 gap-4 ">
            <div>
              <button
                onClick={() => rt.back()}
                className="flex gap-2 items-center bg-transparent hover:opacity-70"
              >
                <ArrowLeftIconSvg size={24} color={"#4D4D4D"} />
                <p className="mig-caption--bold text-mono50">Kembali</p>
              </button>
            </div>

            <div className="flex gap-6 items-center">
              {dataTalent?.resume?.profile_image?.id ? (
                <img
                  src={generateStaticAssetUrl(
                    dataTalent?.resume?.profile_image?.link
                  )}
                  alt={dataTalent?.resume?.profile_image?.description}
                  className="rounded-full w-20 h-20 bg-cover object-cover flex items-center justify-center"
                />
              ) : (
                <div
                  className="rounded-full w-20 h-20 p-2 flex justify-center items-center 
              bg-backdrop mig-heading--4 text-primary100"
                >
                  {getNameInitial(dataTalent?.resume?.name)}
                </div>
              )}

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

            {/* INFORMASI UMUM */}
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
                <p>
                  {momentFormatDate(
                    dataTalent?.resume?.recruitment?.created_at || "-"
                  )}
                </p>
              </div>
            </div>

            <hr className="" />

            {/* SUMMARY */}
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

            {/* RESUME */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT COLUMN */}
              <div className="flex flex-col w-full gap-4">
                {/* ACADEMIC / EDUCATION */}
                <div className="flex flex-col gap-6  border-b border-mono-90">
                  <h4 className="mig-heading--4">Academic History</h4>
                  {dataResume?.educations?.length ? (
                    <Timeline>
                      {dataResume?.educations?.map((item) => (
                        <Timeline.Item key={item?.id} color="#35763B">
                          <p className="text-primary100 font-bold">
                            {item.university}
                          </p>
                          <p className="text-mono50">
                            {item.major} ·{" "}
                            <strong>{item.graduation_year?.slice(0, 4)}</strong>
                          </p>
                          <p className="text-mono50">GPA {item.gpa}</p>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  ) : (
                    <p className="pb-6">-</p>
                  )}
                </div>

                {/* EXPERIENCES */}
                <div className="flex flex-col gap-6 border-b border-mono-90">
                  <h4 className="mig-heading--4">Experiences</h4>
                  {dataResume?.experiences?.length ? (
                    <Timeline>
                      {dataResume?.experiences?.map((item) => (
                        <Timeline.Item key={item?.id} color="#35763B">
                          <p className="text-primary100 font-bold">
                            {item.role}
                          </p>
                          <p className="text-mono50">
                            {item.company} ·{" "}
                            <strong>
                              {momentFormatDate(
                                item.start_date,
                                "-",
                                "MMM YYYY"
                              )}{" "}
                              -&nbsp;
                              {momentFormatDate(
                                item.end_date,
                                <em>present</em>,
                                "MMM YYYY"
                              )}
                            </strong>
                          </p>
                          <div className="text-mono50">
                            {parse(item.description)}
                          </div>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  ) : (
                    <p className="pb-6">-</p>
                  )}
                </div>

                {/* PROJECTS */}
                <div className="flex flex-col gap-6">
                  <h4 className="mig-heading--4">Projects</h4>
                  {dataResume?.projects?.length ? (
                    <div className="flex flex-col gap-4">
                      {dataResume?.projects?.map((item) => (
                        <div key={item?.id} className="flex gap-6">
                          <p className="text-primary100 font-bold">
                            {item.year?.slice(0, 4)}
                          </p>
                          <div>
                            <p className="text-mono30 font-bold">{item.name}</p>
                            <p className="text-mono50">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col w-full gap-4">
                {/* SKILLS */}
                <div className="flex flex-col gap-6 border-b border-mono-90">
                  <h4 className="mig-heading--4">Skills</h4>
                  {dataResume?.skills?.length ? (
                    <div className="flex flex-wrap gap-x-4">
                      {dataResume?.skills?.map((skill) => (
                        <Tag
                          key={skill.id}
                          color="#35763B1A"
                          className="text-primary100 rounded-md mb-6"
                        >
                          {skill.name}
                        </Tag>
                      ))}
                    </div>
                  ) : (
                    <p className="pb-6">-</p>
                  )}
                </div>

                {/* TRAININGS */}
                <div className="flex flex-col gap-6 pb-6 border-b border-mono-90">
                  <h4 className="mig-heading--4">Trainings</h4>
                  {dataResume?.trainings?.length ? (
                    <div className="flex flex-col gap-4">
                      {dataResume?.trainings?.map((item) => (
                        <div key={item?.id} className="flex gap-6">
                          <p className="text-primary100 font-bold">
                            {item.year?.slice(0, 4)}
                          </p>
                          <div>
                            <p className="text-mono30 font-bold">{item.name}</p>
                            <p className="text-mono50">{item.organizer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>-</p>
                  )}
                </div>

                {/* CERTIFICATIONS */}
                <div className="flex flex-col gap-6 pb-6 border-b border-mono-90">
                  <h4 className="mig-heading--4">Certifications</h4>
                  {dataResume?.certificates?.length ? (
                    <div className="flex flex-col gap-4">
                      {dataResume?.certificates?.map((item) => (
                        <div key={item?.id} className="flex gap-6">
                          <p className="text-primary100 font-bold">
                            {item.year?.slice(0, 4)}
                          </p>
                          <div>
                            <p className="text-mono30 font-bold">{item.name}</p>
                            <p className="text-mono50">{item.organizer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>-</p>
                  )}
                </div>

                {/* ACHIEVEMENTS */}
                <div className="flex flex-col gap-6 pb-2">
                  <h4 className="mig-heading--4">Achievements</h4>
                  {dataResume?.achievements?.length ? (
                    <div className="flex flex-col gap-4">
                      {dataResume?.achievements?.map((item) => (
                        <div key={item?.id} className="flex gap-6">
                          <p className="text-primary100 font-bold">
                            {item.year?.slice(0, 4)}
                          </p>
                          <div>
                            <p className="text-mono30 font-bold">{item.name}</p>
                            <p className="text-mono50">{item.organizer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>-</p>
                  )}
                </div>

                {/* ASSESSMENT RESULTS */}
                {!!assessmentResults?.length && (
                  <div className="flex flex-col gap-6 pt-4 border-t border-mono-90">
                    <h4 className="mig-heading--4">
                      Technical Assessment Results
                    </h4>

                    <ul>
                      {assessmentResults?.map((item) => (
                        <li key={item?.id}>
                          <div className="flex flex-row justify-between">
                            <p className="text-mono30">{item?.criteria}</p>
                            <p className="text-primary100 font-bold">
                              {item?.value}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Spin>
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
