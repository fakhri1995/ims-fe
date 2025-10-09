import { DndContext } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DatePicker, Input } from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { RESUME_SECTION_DELETE } from "lib/features";

import ButtonSys from "../../../button";
import { CheckIconSvg, XIconSvg } from "../../../icon";
import { ModalHapus2 } from "../../../modal/modalCustom";
import { formats, modules } from "../textEditorConfig";
import ProjectBlock from "./ProjectBlock";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ProjectCard = ({
  dataDisplay,
  handleAddSection,
  handleUpdateSection,
  handleDeleteSection,
  loadingDelete,
  isAllowedToAddSection,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
}) => {
  // 1. State
  const [modalDelete, setModalDelete] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [editIdx, setEditIdx] = useState(null); // if value -1 --> add state

  const [dataUpdateProj, setDataUpdateProj] = useState({
    id: null,
    name: "",
    year: "",
    description: "",
    client: "",
    technologies_skills: "",
    resume_id: null,
    after_id: null,
  });

  // 2. Use Effect
  useEffect(() => {
    setProjectList(dataDisplay);
  }, [dataDisplay]);

  // 3. Handler
  const clearDataUpdate = () => {
    setDataUpdateProj({
      id: null,
      name: "",
      year: "",
      description: "",
      resume_id: null,
      after_id: null,
    });

    setEditIdx(null);
  };

  const onDragEnd = async ({ active, over }) => {
    let activeIndex,
      overIndex = 0;
    let updatedProjectList = [];

    if (active?.id !== over?.id) {
      // Display reordered project list
      setProjectList((prev) => {
        activeIndex = prev.findIndex((i) => i.id === active.id);
        overIndex = prev.findIndex((i) => i.id === over?.id);
        updatedProjectList = arrayMove(prev, activeIndex, overIndex);
        return updatedProjectList;
      });

      // Update a project after_id when reordered
      let prevIndex = overIndex - 1; // get project above the reordered project
      // if the reordered project moved to the first order, then set after_id as 0
      let prevId = prevIndex < 0 ? 0 : updatedProjectList[prevIndex]?.id;
      let currentItem = projectList?.find(
        (project) => project.id === active.id
      );

      let updatedProject = {
        ...currentItem,
        id: active?.id,
        after_id: prevId,
      };
      setDataUpdateProj(updatedProject);
      await handleUpdateSection("project", updatedProject);
      clearDataUpdate();
    }
  };

  // Sortable Project Block
  const SortableItem = ({ data }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: data.id });

    const style = {
      transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      transition,
    };
    return (
      <div ref={setNodeRef} style={style}>
        <ProjectBlock
          project={data}
          dataUpdateProj={dataUpdateProj}
          setDataUpdateProj={setDataUpdateProj}
          handleUpdateSection={handleUpdateSection}
          clearDataUpdate={clearDataUpdate}
          setModalDelete={setModalDelete}
          editIdx={editIdx}
          setEditIdx={setEditIdx}
          isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
          isAllowedToDeleteSection={isAllowedToDeleteSection}
          {...listeners}
          {...attributes}
        />
      </div>
    );
  };

  return (
    <div className="border-neutrals70 shadow-desktopCard rounded-[10px] bg-white p-4">
      <h4 className="mig-heading--4">Projects</h4>
      <hr className="my-4" />
      <DndContext
        onDragEnd={onDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={projectList?.map((p) => p.id)}>
          {projectList?.map((project, idx) =>
            editIdx === project?.id ? (
              <ProjectBlock
                key={project.id}
                project={project}
                dataUpdateProj={dataUpdateProj}
                setDataUpdateProj={setDataUpdateProj}
                handleUpdateSection={handleUpdateSection}
                clearDataUpdate={clearDataUpdate}
                setModalDelete={setModalDelete}
                editIdx={editIdx}
                setEditIdx={setEditIdx}
                isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
                isAllowedToDeleteSection={isAllowedToDeleteSection}
                afterId={projectList[idx - 1]?.id}
              />
            ) : (
              <SortableItem key={project.id} data={project} />
            )
          )}
        </SortableContext>
      </DndContext>

      {/* Input Add Project */}
      {editIdx === -1 ? (
        <div className="flex flex-col space-y-4 mt-8 mb-4">
          <div className="flex flex-row space-x-4">
            <div className={"flex flex-col w-1/2 gap-1"}>
              <p className={"text-xs/5 text-mono30 font-medium font-inter"}>
                Project Name <span className="text-state1"> *</span>
              </p>
              <Input
                placeholder="Project name"
                value={dataUpdateProj?.name}
                onChange={(e) => {
                  let input = e.target.value;
                  setDataUpdateProj((prev) => ({
                    ...prev,
                    name: input,
                  }));
                }}
              ></Input>
            </div>
            <div className={"flex flex-col w-1/2 gap-1"}>
              <p className={"text-xs/5 text-mono30 font-medium font-inter"}>
                Technologies/Skills<span className="text-state1"> *</span>
              </p>
              <Input
                placeholder="Technologies/Skills"
                value={dataUpdateProj?.technologies_skills}
                onChange={(e) => {
                  let input = e.target.value;
                  setDataUpdateProj((prev) => ({
                    ...prev,
                    technologies_skills: input,
                  }));
                }}
              ></Input>
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <div className={"flex flex-col w-1/2 gap-1"}>
              <p className={"text-xs/5 text-mono30 font-medium font-inter"}>
                Year <span className="text-state1"> *</span>
              </p>
              <DatePicker
                allowClear={true}
                picker="year"
                placeholder="Year"
                className="w-full"
                value={
                  dataUpdateProj?.year ? moment(dataUpdateProj?.year) : null
                }
                onChange={(date) => {
                  let input = date?.format("YYYY-MM-DD");
                  setDataUpdateProj((prev) => ({
                    ...prev,
                    year: input,
                  }));
                }}
              />
            </div>
            <div className={"flex flex-col w-1/2 gap-1"}>
              <p className={"text-xs/5 text-mono30 font-medium font-inter"}>
                Klien
              </p>
              <Input
                placeholder="Klien"
                value={dataUpdateProj?.client}
                onChange={(e) => {
                  let input = e.target.value;
                  setDataUpdateProj((prev) => ({
                    ...prev,
                    client: input,
                  }));
                }}
              ></Input>
            </div>
          </div>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-xs/5 text-mono30 font-medium font-inter"}>
              Description<span className="text-state1"> *</span>
            </p>
            <ReactQuill
              theme="snow"
              placeholder="Job Description"
              value={dataUpdateProj.description}
              modules={modules}
              formats={formats}
              className="h-44 pb-10"
              onChange={(value) => {
                setDataUpdateProj((prev) => ({
                  ...prev,
                  description: value,
                }));
              }}
            />
          </div>
          <div className={"flex gap-4 justify-end"}>
            <button
              onClick={() => {
                handleAddSection("project", {
                  ...dataUpdateProj,
                  after_id: projectList[projectList.length - 1]?.id,
                });
                clearDataUpdate();
              }}
              className="bg-transparent hover:opacity-75"
            >
              <CheckIconSvg size={24} color={"#35763B"} />
            </button>
            <button
              onClick={() => {
                clearDataUpdate();
              }}
              className="bg-transparent hover:opacity-75"
            >
              <XIconSvg size={24} color={"#BF4A40"} />
            </button>
          </div>
        </div>
      ) : (
        isAllowedToAddSection && (
          <ButtonSys
            type={"dashed"}
            onClick={() => {
              clearDataUpdate();
              setEditIdx(-1);
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
