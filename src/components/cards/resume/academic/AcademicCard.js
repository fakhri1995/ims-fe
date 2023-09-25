import { DndContext } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
import React, { useEffect } from "react";
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
import AcademicBlock from "./AcademicBlock";

const AcademicCard = ({
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
  const [updateIdx, setUpdateIdx] = useState(-1);
  const [modalDelete, setModalDelete] = useState(false);
  const [academicList, setAcademicList] = useState([]);

  const [dataUpdateEdu, setDataUpdateEdu] = useState({
    id: null,
    university: "",
    major: "",
    gpa: null,
    graduation_year: "",
    resume_id: null,
  });

  // 2. use Effect
  useEffect(() => {
    setAcademicList(dataDisplay);
  }, [dataDisplay]);

  // 3. Handler
  const clearDataUpdate = () => {
    setDataUpdateEdu({
      id: null,
      university: "",
      major: "",
      gpa: null,
      graduation_year: "",
      resume_id: 12,
    });
  };

  const onDragEnd = async ({ active, over }) => {
    let activeIndex,
      overIndex = 0;
    let updatedList = [];

    if (active?.id !== over?.id) {
      // Display reordered item list
      setAcademicList((prev) => {
        activeIndex = prev.findIndex((i) => i.id === active.id);
        overIndex = prev.findIndex((i) => i.id === over?.id);
        updatedList = arrayMove(prev, activeIndex, overIndex);
        return updatedList;
      });

      // Update item after_id when reordered
      let prevIndex = overIndex - 1; // get item above the reordered item
      // if the reordered item moved to the first order, then set after_id as 0
      let prevId = prevIndex < 0 ? 0 : updatedList[prevIndex]?.id;
      let currentItem = academicList?.find((edu) => edu.id === active.id);

      let updatedItem = {
        ...currentItem,
        id: active?.id,
        after_id: prevId,
      };
      await handleUpdateSection("education", updatedItem);
      clearDataUpdate();
    }
  };

  // Sortable Block
  const SortableItem = ({ id, edu }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <li ref={setNodeRef} style={style}>
        <AcademicBlock
          edu={edu}
          dataUpdateEdu={dataUpdateEdu}
          setDataUpdateEdu={setDataUpdateEdu}
          handleUpdateSection={handleUpdateSection}
          clearDataUpdate={clearDataUpdate}
          setModalDelete={setModalDelete}
          isAdd={isAdd}
          isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
          isAllowedToDeleteSection={isAllowedToDeleteSection}
          {...listeners}
          {...attributes}
        />
      </li>
    );
  };

  // console.log(dataUpdateEdu)
  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <h4 className="mig-heading--4">Academic History</h4>
      <hr className="my-4" />
      <Timeline>
        <DndContext
          onDragEnd={onDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={academicList?.map((i) => i.id)}>
            {academicList?.map((edu, idx) =>
              dataUpdateEdu?.id == edu.id ? (
                <AcademicBlock
                  key={edu.id}
                  edu={edu}
                  dataUpdateEdu={dataUpdateEdu}
                  setDataUpdateEdu={setDataUpdateEdu}
                  handleUpdateSection={handleUpdateSection}
                  clearDataUpdate={clearDataUpdate}
                  setModalDelete={setModalDelete}
                  isAdd={isAdd}
                  isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
                  isAllowedToDeleteSection={isAllowedToDeleteSection}
                  afterId={academicList[idx - 1]?.id}
                />
              ) : (
                <SortableItem key={edu.id} id={edu.id} edu={edu} />
              )
            )}
          </SortableContext>
        </DndContext>
      </Timeline>

      {/* Input Add Academic */}
      {isAdd ? (
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="University"
              value={dataUpdateEdu?.university}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  university: input,
                }));
              }}
            ></Input>
            <button
              onClick={() => {
                handleAddSection("education", {
                  ...dataUpdateEdu,
                  after_id: academicList[academicList.length - 1]?.id,
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
          <Input
            placeholder="Degree"
            value={dataUpdateEdu?.major}
            onChange={(e) => {
              let input = e.target.value;
              setDataUpdateEdu((prev) => ({
                ...prev,
                major: input,
              }));
            }}
          />

          <div className="flex flex-row space-x-4 w-full">
            <DatePicker
              picker="year"
              placeholder="Graduation Year"
              allowClear={false}
              className="w-1/2"
              value={dataUpdateEdu?.graduation_year}
              onChange={(date) => {
                let input = date.format("YYYY-MM-DD");
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  graduation_year: moment(input),
                }));
              }}
            />
            <Input
              placeholder="GPA"
              value={dataUpdateEdu?.gpa}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  gpa: input,
                }));
              }}
              className="w-1/2"
            />
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
              + Add academic history
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
            handleDeleteSection("education", dataUpdateEdu.id);
            setModalDelete(false);
            clearDataUpdate();
          }}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"data"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin menghapus data akademis{" "}
            <strong>{dataUpdateEdu.university}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default AcademicCard;
