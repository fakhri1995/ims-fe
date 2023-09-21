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
import React, { useEffect } from "react";
import { useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { RESUME_SECTION_DELETE } from "lib/features";

import ButtonSys from "../../../button";
import { CheckIconSvg, XIconSvg } from "../../../icon";
import { ModalHapus2 } from "../../../modal/modalCustom";
import ProjectBlock from "./ProjectBlock";

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
  const [isAdd, setIsAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [projectList, setProjectList] = useState([]);

  const [dataUpdateProj, setDataUpdateProj] = useState({
    id: null,
    name: "",
    year: "",
    description: "",
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
      let currentProject = projectList?.find(
        (project) => project.id === active.id
      );

      let updatedProject = {
        id: active?.id,
        name: currentProject?.name,
        year: currentProject?.year,
        description: currentProject?.description,
        resume_id: currentProject?.resume_id,
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
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <div ref={setNodeRef} style={style}>
        <ProjectBlock
          key={data.id}
          project={data}
          dataUpdateProj={dataUpdateProj}
          setDataUpdateProj={setDataUpdateProj}
          handleUpdateSection={handleUpdateSection}
          clearDataUpdate={clearDataUpdate}
          setModalDelete={setModalDelete}
          isAdd={isAdd}
          isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
          isAllowedToDeleteSection={isAllowedToDeleteSection}
          {...listeners}
          {...attributes}
        />
      </div>
    );
  };

  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <h4 className="mig-heading--4">Projects</h4>
      <hr className="my-4" />
      <DndContext
        onDragEnd={onDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={dataDisplay?.map((p) => p.id)}>
          {dataDisplay?.map((project, idx) =>
            dataUpdateProj?.id == project?.id ? (
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
                afterId={projectList[idx - 1]?.id}
              />
            ) : (
              <SortableItem key={project.id} data={project} />
            )
          )}
        </SortableContext>
      </DndContext>

      {/* {dataDisplay.projects?.map((project) => (
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
      ))} */}

      {/* Input Add Project */}
      {isAdd ? (
        <div className="flex flex-col space-y-4 mt-8 mb-4">
          <div className="flex flex-row space-x-4">
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
            <button
              onClick={() => {
                handleAddSection("project", {
                  ...dataUpdateProj,
                  after_id: projectList[projectList.length - 1]?.id,
                });
                setIsAdd(false);
                clearDataUpdate();
              }}
              className="bg-transparent hover:opacity-75"
            >
              <CheckIconSvg size={24} color={"#35763B"} />
            </button>
            <button
              onClick={() => {
                setIsAdd(false);
                clearDataUpdate();
              }}
              className="bg-transparent hover:opacity-75"
            >
              <XIconSvg size={24} color={"#BF4A40"} />
            </button>
          </div>
          <div className="flex flex-row space-x-4 w-full">
            <DatePicker
              allowClear={true}
              picker="year"
              placeholder="Year"
              className="w-1/3"
              value={dataUpdateProj?.year ? moment(dataUpdateProj?.year) : null}
              onChange={(date) => {
                let input = date?.format("YYYY-MM-DD");
                setDataUpdateProj((prev) => ({
                  ...prev,
                  year: input,
                }));
              }}
            />
            <Input
              placeholder="Description"
              value={dataUpdateProj?.description}
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
