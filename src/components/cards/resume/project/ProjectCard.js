import {
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Steps,
  Timeline,
  notification,
} from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { RESUME_SECTION_DELETE } from "lib/features";

import ButtonSys from "../../../button";
import {
  CheckIconSvg,
  EditIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../icon";
import { ModalHapus2 } from "../../../modal/modalCustom";
import { H2 } from "../../../typography";
import ProjectBlock from "./ProjectBlock";

const ProjectCard = ({
  dataDisplay,
  handleAddSection,
  handleUpdateSection,
  handleDeleteSection,
  dataUpdateProj,
  setDataUpdateProj,
  loadingDelete,
  isAllowedToAddSection,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const clearDataUpdate = () => {
    setDataUpdateProj({
      id: null,
      name: "",
      year: "",
      description: "",
      resume_id: null,
    });
  };

  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <H2>Projects</H2>
      <hr className="my-4" />
      {dataDisplay.projects?.map((project) => (
        <ProjectBlock
          key={project.id}
          project={project}
          dataUpdateProj={dataUpdateProj}
          setDataUpdateProj={setDataUpdateProj}
          handleUpdateSection={handleUpdateSection}
          clearDataUpdate={clearDataUpdate}
          setModalDelete={setModalDelete}
          isAdd={isAdd}
          isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
          isAllowedToDeleteSection={isAllowedToDeleteSection}
        />
      ))}

      {/* Input Add Project */}
      {isAdd ? (
        <div className="flex flex-col space-y-4 mt-8 mb-4">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="Project name"
              value={dataUpdateProj.name}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateProj((prev) => ({
                  ...prev,
                  name: input,
                }));
              }}
            ></Input>
            <button
              onClick={() => {
                handleAddSection("project", dataUpdateProj);
                setIsAdd(false);
                clearDataUpdate();
              }}
              className="bg-transparent"
            >
              <CheckIconSvg size={24} color={"#35763B"} />
            </button>
            <button
              onClick={() => {
                setIsAdd(false);
                clearDataUpdate();
              }}
              className="bg-transparent"
            >
              <XIconSvg size={24} color={"#BF4A40"} />
            </button>
          </div>
          <div className="flex flex-row space-x-4 w-full">
            <DatePicker
              picker="year"
              placeholder="Year"
              className="w-1/3"
              value={dataUpdateProj.year}
              onChange={(date) => {
                let input = date?.format("YYYY-MM-DD");
                setDataUpdateProj((prev) => ({
                  ...prev,
                  year: moment(input),
                }));
              }}
            />
            <Input
              placeholder="Description"
              value={dataUpdateProj.description}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateProj((prev) => ({
                  ...prev,
                  description: input,
                }));
              }}
              className="w-2/3"
            ></Input>
          </div>
        </div>
      ) : (
        isAllowedToAddSection && (
          <ButtonSys
            type={"dashed"}
            onClick={() => {
              clearDataUpdate();
              setIsAdd(true);
            }}
          >
            <p className="text-primary100 hover:text-primary75">
              + Add project
            </p>
          </ButtonSys>
        )
      )}

      <AccessControl hasPermission={RESUME_SECTION_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() => {
            handleDeleteSection("project", dataUpdateProj.id);
            setModalDelete(false);
          }}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"data"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin menghapus data proyek{" "}
            <strong>{dataUpdateProj.name}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default ProjectCard;
