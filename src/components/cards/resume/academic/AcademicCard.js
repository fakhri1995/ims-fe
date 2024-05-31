import { DndContext } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DatePicker, Input, InputNumber, Timeline } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { RESUME_SECTION_DELETE } from "lib/features";

import ButtonSys from "../../../button";
import { CheckIconSvg, XIconSvg } from "../../../icon";
import { ModalHapus2 } from "../../../modal/modalCustom";
import AcademicBlock from "./AcademicBlock";

const { RangePicker } = DatePicker;

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
  const [modalDelete, setModalDelete] = useState(false);
  const [academicList, setAcademicList] = useState([]);
  const [editIdx, setEditIdx] = useState(null); // if value -1 --> add state
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [dataUpdateEdu, setDataUpdateEdu] = useState({
    id: 0,
    university: "",
    major: "",
    gpa: "",
    start_date: "",
    end_date: "",
    resume_id: 0,
  });

  // 2. use Effect
  useEffect(() => {
    setAcademicList(dataDisplay);
  }, [dataDisplay]);

  // 3. Handler
  const clearDataUpdate = () => {
    setDataUpdateEdu({
      id: 0,
      university: "",
      major: "",
      gpa: "",
      start_date: "",
      end_date: "",
      resume_id: 12,
    });
    setEditIdx(null);
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
        after_id: prevId ?? 0,
        start_date: currentItem?.start_date_format,
        end_date: currentItem?.end_date_format,
      };
      await handleUpdateSection("education", updatedItem);
      clearDataUpdate();
    }
  };

  // Sortable Block
  const SortableItem = ({ data }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: data.id });

    const style = {
      transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      transition,
    };
    return (
      <div ref={setNodeRef} style={style}>
        <AcademicBlock
          edu={data}
          dataUpdateEdu={dataUpdateEdu}
          setDataUpdateEdu={setDataUpdateEdu}
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
              editIdx === edu.id ? (
                <AcademicBlock
                  key={edu.id}
                  edu={edu}
                  dataUpdateEdu={dataUpdateEdu}
                  setDataUpdateEdu={setDataUpdateEdu}
                  handleUpdateSection={handleUpdateSection}
                  clearDataUpdate={clearDataUpdate}
                  setModalDelete={setModalDelete}
                  editIdx={editIdx}
                  setEditIdx={setEditIdx}
                  isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
                  isAllowedToDeleteSection={isAllowedToDeleteSection}
                  afterId={academicList[idx - 1]?.id}
                />
              ) : (
                <SortableItem key={edu.id} data={edu} />
              )
            )}
          </SortableContext>
        </DndContext>
      </Timeline>

      {/* Input Add Academic */}
      {editIdx === -1 ? (
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
            <RangePicker
              allowEmpty
              value={[
                dataUpdateEdu.start_date
                  ? moment(dataUpdateEdu.start_date)
                  : null,
                dataUpdateEdu.end_date ? moment(dataUpdateEdu.end_date) : null,
              ]}
              open={calendarOpen}
              onOpenChange={setCalendarOpen}
              onCalendarChange={(value, datestring) => {
                let startDate = datestring[0];
                let endDate = datestring[1];
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  start_date: startDate,
                  end_date: endDate,
                }));
              }}
              picker="month"
              className="w-1/2"
              renderExtraFooter={() => (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mb-0 bg-transparent text-primary100 hover:text-primary75 cursor-pointer"
                    onClick={() => {
                      setDataUpdateEdu((prev) => ({
                        ...prev,
                        end_date: null,
                      }));
                      setCalendarOpen(false);
                    }}
                  >
                    Present
                  </button>
                </div>
              )}
            />

            <InputNumber
              placeholder="GPA"
              min={0.0}
              max={4.0}
              step={"0.01"}
              value={dataUpdateEdu?.gpa}
              onChange={(value) => {
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  gpa: value || "",
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
              setEditIdx(-1);
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
