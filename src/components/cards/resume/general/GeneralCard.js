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
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";

import { RESUME_SECTION_DELETE } from "lib/features";

import ButtonSys from "../../../button";
import { CheckIconSvg, XIconSvg } from "../../../icon";
import { ModalHapus2 } from "../../../modal/modalCustom";
import GeneralBlock from "./GeneralBlock";

// Currently use for Training, Certifications, and Achievements section in resume
const GeneralCard = ({
  dataDisplay,
  handleAddSection,
  handleUpdateSection,
  handleDeleteSection,
  loadingDelete,
  isAllowedToAddSection,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
  sectionName,
}) => {
  // 1. State
  const [modalDelete, setModalDelete] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [editIdx, setEditIdx] = useState(null); // if value -1 --> add state

  const [dataUpdateDetail, setDataUpdateDetail] = useState({
    id: null,
    name: "",
    organizer: "",
    year: "",
    resume_id: null,
  });

  // 2. Use Effect
  useEffect(() => {
    setItemList(dataDisplay);
  }, [dataDisplay]);

  // 3. Handler
  const clearDataUpdate = () => {
    setDataUpdateDetail({
      id: null,
      name: "",
      organizer: "",
      year: "",
      resume_id: null,
    });
    setEditIdx(null);
  };

  const onDragEnd = async ({ active, over }) => {
    let activeIndex,
      overIndex = 0;
    let updatedList = [];

    if (active?.id !== over?.id) {
      // Display reordered item list
      setItemList((prev) => {
        activeIndex = prev.findIndex((i) => i.id === active.id);
        overIndex = prev.findIndex((i) => i.id === over?.id);
        updatedList = arrayMove(prev, activeIndex, overIndex);
        return updatedList;
      });

      // Update item after_id when reordered
      let prevIndex = overIndex - 1; // get item above the reordered item
      // if the reordered item moved to the first order, then set after_id as 0
      let prevId = prevIndex < 0 ? 0 : updatedList[prevIndex]?.id;
      let currentItem = itemList?.find((i) => i.id === active.id);

      let updatedItem = {
        ...currentItem,
        id: active?.id,
        after_id: prevId,
      };
      await handleUpdateSection(sectionName, updatedItem);
      clearDataUpdate();
    }
  };

  // Sortable Block
  const SortableItem = ({ data }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: data?.id });

    const style = {
      transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      transition,
    };
    return (
      <div ref={setNodeRef} style={style}>
        <GeneralBlock
          detail={data}
          dataUpdate={dataUpdateDetail}
          setDataUpdate={setDataUpdateDetail}
          handleUpdateSection={handleUpdateSection}
          clearDataUpdate={clearDataUpdate}
          setModalDelete={setModalDelete}
          editIdx={editIdx}
          setEditIdx={setEditIdx}
          isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
          isAllowedToDeleteSection={isAllowedToDeleteSection}
          sectionName={sectionName}
          {...listeners}
          {...attributes}
        />
      </div>
    );
  };

  return (
    <div className="border-neutrals70 shadow-desktopCard rounded-[10px] bg-white p-4 row-span-1">
      <h4 className="mig-heading--4">
        {sectionName == "training"
          ? "Training"
          : sectionName == "certificate"
          ? "Certifications"
          : "Achievements"}
      </h4>
      <hr className="my-4" />
      <DndContext
        onDragEnd={onDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={itemList?.map((p) => p.id)}>
          {itemList?.map((item, idx) =>
            editIdx === item.id ? (
              <GeneralBlock
                key={item.id}
                detail={item}
                dataUpdate={dataUpdateDetail}
                setDataUpdate={setDataUpdateDetail}
                handleUpdateSection={handleUpdateSection}
                clearDataUpdate={clearDataUpdate}
                setModalDelete={setModalDelete}
                editIdx={editIdx}
                setEditIdx={setEditIdx}
                isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
                isAllowedToDeleteSection={isAllowedToDeleteSection}
                afterId={itemList[idx - 1]?.id}
                sectionName={sectionName}
              />
            ) : (
              <SortableItem key={item.id} data={item} />
            )
          )}
        </SortableContext>
      </DndContext>
      {/* Input Add Training */}
      {editIdx === -1 ? (
        <div className="flex flex-col space-y-4 mt-8 mb-4">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder={
                sectionName === "achievement"
                  ? "Achievement name"
                  : "Course or program name"
              }
              value={dataUpdateDetail?.name}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateDetail((prev) => ({
                  ...prev,
                  name: input,
                }));
              }}
            ></Input>
            <button
              onClick={() => {
                handleAddSection(sectionName, {
                  ...dataUpdateDetail,
                  after_id: itemList[itemList.length - 1]?.id,
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
          <div className="flex flex-row space-x-4 w-full">
            <DatePicker
              allowClear={true}
              picker="year"
              placeholder="Year"
              className="w-1/3"
              value={
                dataUpdateDetail?.year ? moment(dataUpdateDetail.year) : null
              }
              onChange={(date) => {
                let input = date?.format("YYYY-MM-DD");
                setDataUpdateDetail((prev) => ({
                  ...prev,
                  year: input,
                }));
              }}
            />
            <Input
              placeholder="Company or organization"
              value={dataUpdateDetail?.organizer}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateDetail((prev) => ({
                  ...prev,
                  organizer: input,
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
              setEditIdx(-1);
            }}
          >
            <p className="text-primary100 hover:text-primary75">
              + Add {sectionName}
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
            handleDeleteSection(sectionName, dataUpdateDetail?.id);
            setModalDelete(false);
          }}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"data"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin menghapus data {sectionName}{" "}
            <strong>{dataUpdateDetail?.name}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default GeneralCard;
