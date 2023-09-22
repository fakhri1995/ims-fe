import { HolderOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DatePicker, Input, Timeline } from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

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
import ExperienceBlock from "./ExperienceBlock";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const { RangePicker } = DatePicker;

const ExperienceCard = ({
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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [experienceList, setExperienceList] = useState([]);

  const [dataUpdateExp, setDataUpdateExp] = useState({
    id: null,
    role: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    resume_id: null,
    after_id: null,
  });

  // 2. Use Effect
  useEffect(() => {
    setExperienceList(dataDisplay);
  }, [dataDisplay]);

  // 3. Handler
  const clearDataUpdate = () => {
    setDataUpdateExp({
      id: null,
      role: "",
      company: "",
      start_date: "",
      end_date: "",
      description: "",
      resume_id: null,
      after_id: null,
    });
  };

  // Text Editor Config
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
    ],
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const onDragEnd = async ({ active, over }) => {
    let activeIndex,
      overIndex = 0;
    let updatedExperienceList = [];

    if (active?.id !== over?.id) {
      // Display reordered experience list
      setExperienceList((prev) => {
        activeIndex = prev.findIndex((i) => i.id === active.id);
        overIndex = prev.findIndex((i) => i.id === over?.id);
        updatedExperienceList = arrayMove(prev, activeIndex, overIndex);
        return updatedExperienceList;
      });

      // Update a experience after_id when reordered
      let prevIndex = overIndex - 1; // get experience above the reordered experience
      // if the reordered experience moved to the first order, then set after_id as 0
      let prevId = prevIndex < 0 ? 0 : updatedExperienceList[prevIndex]?.id;
      let currentExp = experienceList?.find((exp) => exp.id === active.id);

      let updatedExp = {
        id: active?.id,
        role: currentExp?.role,
        company: currentExp?.company,
        start_date: currentExp?.start_date,
        end_date: currentExp?.end_date,
        description: currentExp?.description,
        resume_id: currentExp?.resume_id,
        after_id: prevId,
      };
      setDataUpdateExp(updatedExp);
      await handleUpdateSection("experience", updatedExp);
      clearDataUpdate();
    }
  };

  // Sortable Experience Block
  const SortableItem = ({ id, exp }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <li ref={setNodeRef} style={style}>
        <ExperienceBlock
          exp={exp}
          dataUpdateExp={dataUpdateExp}
          setDataUpdateExp={setDataUpdateExp}
          handleUpdateSection={handleUpdateSection}
          clearDataUpdate={clearDataUpdate}
          setModalDelete={setModalDelete}
          isAdd={isAdd}
          isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
          isAllowedToDeleteSection={isAllowedToDeleteSection}
          modules={modules}
          formats={formats}
          {...listeners}
          {...attributes}
        />
      </li>
    );
  };

  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <h4 className="mig-heading--4">Experience</h4>
      <hr className="my-4" />
      <Timeline>
        <DndContext
          onDragEnd={onDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={experienceList?.map((i) => i.id)}>
            {experienceList?.map((exp, idx) =>
              dataUpdateExp?.id == exp?.id ? (
                <ExperienceBlock
                  key={exp.id}
                  exp={exp}
                  dataUpdateExp={dataUpdateExp}
                  setDataUpdateExp={setDataUpdateExp}
                  handleUpdateSection={handleUpdateSection}
                  clearDataUpdate={clearDataUpdate}
                  setModalDelete={setModalDelete}
                  isAdd={isAdd}
                  isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
                  isAllowedToDeleteSection={isAllowedToDeleteSection}
                  modules={modules}
                  formats={formats}
                  afterId={experienceList[idx - 1]?.id}
                />
              ) : (
                <SortableItem key={exp.id} id={exp.id} exp={exp} />
              )
            )}
          </SortableContext>
        </DndContext>
      </Timeline>

      {/* Input Experience */}
      {isAdd ? (
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="Role"
              value={dataUpdateExp?.role}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateExp((prev) => ({
                  ...prev,
                  role: input,
                }));
              }}
            />
            <button
              onClick={() => {
                handleAddSection("experience", {
                  ...dataUpdateExp,
                  after_id: experienceList[experienceList.length - 1]?.id,
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
            placeholder="Company"
            value={dataUpdateExp?.company}
            onChange={(e) => {
              let input = e.target.value;
              setDataUpdateExp((prev) => ({
                ...prev,
                company: input,
              }));
            }}
          />

          <RangePicker
            allowEmpty
            value={[
              dataUpdateExp?.start_date
                ? moment(dataUpdateExp?.start_date)
                : null,
              dataUpdateExp?.end_date ? moment(dataUpdateExp?.end_date) : null,
            ]}
            open={calendarOpen}
            onOpenChange={setCalendarOpen}
            onCalendarChange={(value, datestring) => {
              let startDate = datestring[0];
              let endDate = datestring[1];
              setDataUpdateExp((prev) => ({
                ...prev,
                start_date: startDate,
                end_date: endDate,
              }));
            }}
            renderExtraFooter={() => (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mb-0 bg-transparent text-primary100 hover:text-primary75 cursor-pointer"
                  onClick={(e) => {
                    setDataUpdateExp((prev) => ({
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
          <ReactQuill
            placeholder="Job description..."
            theme="snow"
            value={dataUpdateExp?.description}
            modules={modules}
            formats={formats}
            className="h-32 pb-10"
            onChange={(value) => {
              setDataUpdateExp((prev) => ({
                ...prev,
                description: value,
              }));
            }}
          />
        </div>
      ) : (
        isAllowedToAddSection && (
          <div>
            <ButtonSys
              type={"dashed"}
              onClick={() => {
                clearDataUpdate();
                setIsAdd(true);
              }}
            >
              <p className="text-primary100 hover:text-primary75">
                + Add experience
              </p>
            </ButtonSys>
          </div>
        )
      )}

      <AccessControl hasPermission={RESUME_SECTION_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() => {
            handleDeleteSection("experience", dataUpdateExp.id);
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
            Apakah Anda yakin ingin menghapus data pengalaman&nbsp;
            <strong>{dataUpdateExp.role}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default ExperienceCard;
