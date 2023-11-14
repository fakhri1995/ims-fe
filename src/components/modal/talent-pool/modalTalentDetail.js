import {
  DownloadOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Modal, Tag, Timeline } from "antd";
import parse from "html-react-parser";
import React, { useState } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { getNameInitial, momentFormatDate } from "lib/helper";

import { TalentPoolPublicService } from "../../../apis/talent-pool";
import { TALENT_POOL_SHARE_PUBLIC_GET } from "../../../lib/features";
import { ResumePDFTemplate } from "../../../pages/admin/candidates/[candidateId]";
import ButtonSys from "../../button";

const ModalTalentDetail = ({
  visible,
  onvisible,
  dataTalent,
  setModalTalentEliminate,
  handleMarkTalent,
}) => {
  // 1. USE STATE

  const [loading, setLoading] = useState(false);

  // 2. USE QUERY & USE EFFECT
  // 3.2. Get Resume Talent
  const { data: dataResume, isLoading: loadingResume } = useQuery(
    [TALENT_POOL_SHARE_PUBLIC_GET, dataTalent?.resume_id],
    () => TalentPoolPublicService.getResume(dataTalent?.resume_id),
    {
      enabled: !!dataTalent?.resume_id,
      select: (response) => response.data,
    }
  );

  // 3. HANDLER
  const handleClose = () => {
    onvisible(false);
  };

  const onChangeSearchCandidate = (e) => {
    setTimeout(() => setSearchCandidate(e.target.value), 500);
  };

  const footer = (
    <div className="grid grid-cols-3 gap-2 items-center">
      <ButtonSys
        type={"default"}
        color={"danger"}
        // disabled={!isAllowedToEliminateTalent}
        onClick={(event) => {
          event.stopPropagation();
          onvisible(false);
          setModalTalentEliminate(true);
        }}
      >
        <div className="flex items-center gap-2 whitespace-nowrap">
          <UserDeleteOutlined rev={""} />
          <p className="mig-caption--small">Eliminasi Talent</p>
        </div>
      </ButtonSys>

      <ButtonSys
        type={"primary"}
        color={"secondary100"}
        // disabled={!isAllowedToMarkTalent}
        onClick={(event) => {
          event.stopPropagation();
          if (dataTalent?.id)
            handleMarkTalent(dataTalent?.id).then(() => onvisible(false));
        }}
      >
        <div className="flex items-center gap-2 whitespace-nowrap">
          <UserAddOutlined rev={""} />
          <p className="mig-caption--small">
            {!dataTalent?.mark ? "Tandai Talent" : "Batal Tandai Talent"}
          </p>
        </div>
      </ButtonSys>

      {dataResume && (
        <PDFDownloadLink
          document={
            <ResumePDFTemplate dataResume={dataResume} logoStatus={true} />
          }
          fileName={`CV-${dataResume?.assessment?.name}-${dataResume?.name}.pdf`}
        >
          <ButtonSys
            type={"primary"}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="flex items-center gap-2 whitespace-nowrap">
              <DownloadOutlined rev={""} />
              <p className="mig-caption--small">Unduh Resume</p>
            </div>
          </ButtonSys>
        </PDFDownloadLink>
      )}
    </div>
  );

  const assessmentResults = dataResume?.assessment_results?.filter(
    (item) => item.value
  );

  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={handleClose}
      footer={footer}
      loading={loadingResume}
      mask={false}
      maskClosable={true}
      className="top-4 right-4 absolute"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* HEADER */}
        <div className="col-span-2 flex gap-6 items-center">
          <div
            className="rounded-full w-12 h-12 p-2 flex justify-center items-center 
              bg-backdrop text-primary100 font-bold text-base"
          >
            {getNameInitial(dataResume?.name)}
          </div>
          <div>
            <h4 className="mig-heading--4">{dataResume?.name}</h4>

            <p className="mig-caption--medium text-mono50">
              {dataResume?.email}
            </p>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="col-span-2 flex flex-col gap-1">
          <h4 className="mig-heading--4 pb-1 mb-1 border-b border-mono-90">
            Summary
          </h4>
          <div>
            {dataResume?.summaries?.description ? (
              parse(dataResume?.summaries?.description)
            ) : (
              <p>-</p>
            )}
          </div>
        </div>

        {/* RESUME */}

        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="flex flex-col w-full gap-4">
            {/* ACADEMIC / EDUCATION */}
            <div className="flex flex-col gap-1">
              <h4 className="mig-heading--4 pb-1 mb-1 border-b border-mono-90">
                Academic History
              </h4>
              {dataResume?.educations?.length ? (
                <Timeline>
                  {dataResume?.educations?.map((item) => (
                    <Timeline.Item key={item?.id} color="#35763B">
                      <p className="text-primary100 font-bold">
                        {item.university}
                      </p>
                      <p className="text-mono50">
                        {item.major} ·{" "}
                        <strong>{item.graduation_year.slice(0, 4)}</strong>
                      </p>
                      <p className="text-mono50">GPA {item.gpa}</p>
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <p>-</p>
              )}
            </div>

            {/* EXPERIENCES */}
            <div className="flex flex-col gap-1">
              <h4 className="mig-heading--4 pb-1 mb-1 border-b border-mono-90">
                Experiences
              </h4>
              {dataResume?.experiences?.length ? (
                <Timeline>
                  {dataResume?.experiences?.map((item) => (
                    <Timeline.Item key={item?.id} color="#35763B">
                      <p className="text-primary100 font-bold">{item.role}</p>
                      <p className="text-mono50">
                        {item.company} ·{" "}
                        <strong>
                          {momentFormatDate(item.start_date, "-", "MMM YYYY")}{" "}
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
                <p>-</p>
              )}
            </div>

            {/* PROJECTS */}
            <div className="flex flex-col gap-1">
              <h4 className="mig-heading--4 pb-1 mb-1 border-b border-mono-90">
                Projects
              </h4>
              {dataResume?.projects?.length ? (
                <div className="flex flex-col gap-2">
                  {dataResume?.projects?.map((item) => (
                    <div key={item?.id} className="flex gap-6">
                      <p className="text-primary100 font-bold">
                        {item.year.slice(0, 4)}
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
            <div className="flex flex-col gap-1">
              <h4 className="mig-heading--4 pb-1 mb-1 border-b border-mono-90">
                Skills
              </h4>
              {dataResume?.skills?.length ? (
                <div className="flex flex-wrap gap-2">
                  {dataResume?.skills?.map((skill) => (
                    <Tag
                      key={skill.id}
                      color="#35763B1A"
                      className="text-primary100 rounded-md"
                    >
                      {skill.name}
                    </Tag>
                  ))}
                </div>
              ) : (
                <p>-</p>
              )}
            </div>

            {/* TRAININGS */}
            <div className="flex flex-col gap-1">
              <h4 className="mig-heading--4 pb-1 mb-1 border-b border-mono-90">
                Trainings
              </h4>
              {dataResume?.trainings?.length ? (
                <div className="flex flex-col gap-2">
                  {dataResume?.trainings?.map((item) => (
                    <div key={item?.id} className="flex gap-4">
                      <p className="text-primary100 font-bold">
                        {item.year.slice(0, 4)}
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
            <div className="flex flex-col gap-1 ">
              <h4 className="mig-heading--4 pb-1 mb-1 border-b border-mono-90">
                Certifications
              </h4>
              {dataResume?.certificates?.length ? (
                <div className="flex flex-col gap-2">
                  {dataResume?.certificates?.map((item) => (
                    <div key={item?.id} className="flex gap-4">
                      <p className="text-primary100 font-bold">
                        {item.year.slice(0, 4)}
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
            <div className="flex flex-col gap-1">
              <h4 className="mig-heading--4 pb-1 mb-1 border-b border-mono-90">
                Achievements
              </h4>
              {dataResume?.achievements?.length ? (
                <div className="flex flex-col gap-2">
                  {dataResume?.achievements?.map((item) => (
                    <div key={item?.id} className="flex gap-4">
                      <p className="text-primary100 font-bold">
                        {item.year.slice(0, 4)}
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
              <div className="flex flex-col gap-1">
                <h4 className="mig-heading--4 pb-1 mb-1 border-b border-mono-90">
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
    </Modal>
  );
};

export default ModalTalentDetail;
