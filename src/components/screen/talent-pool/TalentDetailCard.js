import { Tag } from "antd";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

import { CandidateService } from "../../../apis/candidates";
import { RESUME_GET } from "../../../lib/features";
import { getNameInitial, momentFormatDate } from "../../../lib/helper";
import { ArrowUpRightIconSvg } from "../../icon";

const TalentDetailCard = ({
  data,
  isAllowedToGetResume,
  initProps,
  isPublic,
}) => {
  const rt = useRouter();

  // Get Resume Talent, use in Recruitment Talent Pool
  const { data: fetchedData, isLoading: loadingResume } = useQuery(
    [RESUME_GET, data?.resume_id],
    () =>
      CandidateService.getResume(
        initProps,
        isAllowedToGetResume,
        data?.resume_id
      ),
    {
      enabled: !isPublic && !!data?.resume_id,
      select: (response) => response.data,
    }
  );

  const dataResume = fetchedData || data?.resume;

  return (
    <div
      className={`w-full min-h-44 max-h-fit shadow-lg border border-mono100 rounded-lg grid grid-cols-1 gap-2 p-4 bg-white`}
    >
      <div className="flex justify-between">
        <div className="flex gap-3 items-center w-10/12">
          <div
            className="rounded-full w-12 h-12 flex justify-center items-center 
          bg-backdrop text-primary100 mig-caption--bold p-1 text-sm "
          >
            {getNameInitial(dataResume?.name)}
          </div>
          <div>
            <p className="font-bold text-mono30">{dataResume?.name}</p>
            {/* use for public talent pool */}
            {isPublic && dataResume?.last_education && (
              <p className="mig-caption--medium text-mono50">
                {dataResume?.last_education?.university} ·{" "}
                {dataResume?.last_education?.major} ·{" "}
                {dataResume?.last_education?.graduation_year?.slice(0, 4)} ·{" "}
                {dataResume?.last_education?.gpa}
              </p>
            )}

            {/* use in recruitment talent pool */}
            {!isPublic && !!dataResume?.educations?.length && (
              <p className="mig-caption--medium text-mono50">
                {dataResume?.educations?.[0]?.university} ·{" "}
                {dataResume?.educations?.[0]?.major} ·{" "}
                {dataResume?.educations?.[0]?.graduation_year?.slice(0, 4)} ·{" "}
                {dataResume?.educations?.[0]?.gpa}
              </p>
            )}
          </div>
        </div>

        {!isPublic && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              rt.push(`talent-pool/${data?.id}`);
            }}
            className="flex items-center gap-1 bg-transparent hover:opacity-70"
          >
            <p className="mig-caption--bold text-mono50 whitespace-nowrap">
              Lihat Lainnya
            </p>
            <ArrowUpRightIconSvg color={"#808080"} size={20} />
          </button>
        )}
      </div>

      <hr />

      <div className="grid grid-cols-2 gap-6 text-mono50">
        <div className=" mig-caption text-ellipsis overflow-hidden">
          {dataResume?.summaries?.description ? (
            parse(dataResume?.summaries?.description)
          ) : (
            <p>-</p>
          )}
        </div>

        <div className="mig-caption--bold">
          <p>Pengalaman Terakhir</p>

          {/* use for public talent pool */}
          {isPublic ? (
            dataResume?.last_experience ? (
              <p className="mb-2">
                <span className="text-primary100 mr-1">
                  {dataResume?.last_experience?.role}
                </span>{" "}
                {dataResume?.last_experience?.company} ·{" "}
                {momentFormatDate(
                  dataResume?.last_experience?.start_date,
                  "-",
                  "MMM YYYY"
                )}{" "}
                -{" "}
                {momentFormatDate(
                  dataResume?.last_experience?.end_date,
                  "present",
                  "MMM YYYY"
                )}
              </p>
            ) : (
              "-"
            )
          ) : null}

          {/* use in recruitment talent pool */}
          {!isPublic ? (
            !!dataResume?.experiences?.length ? (
              <p className="mb-2">
                <span className="text-primary100 mr-1">
                  {dataResume?.experiences?.[0]?.role}
                </span>{" "}
                {dataResume?.experiences?.[0]?.company} ·{" "}
                {momentFormatDate(
                  dataResume?.experiences?.[0]?.start_date,
                  "-",
                  "MMM YYYY"
                )}{" "}
                -{" "}
                {momentFormatDate(
                  dataResume?.experiences?.[0]?.end_date,
                  "present",
                  "MMM YYYY"
                )}
              </p>
            ) : (
              "-"
            )
          ) : null}

          <div className="">
            {!!dataResume?.skills?.length && (
              <div className="flex flex-wrap gap-1">
                {dataResume?.skills?.map((skill) => (
                  <Tag
                    key={skill.id}
                    color="#35763B1A"
                    className="text-primary100 rounded-md mb-1"
                  >
                    {skill.name}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDetailCard;
