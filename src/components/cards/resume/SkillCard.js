import { CloseCircleOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input, Select, Tag } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";

import ButtonSys from "../../button";
import { CheckIconSvg, EditIconSvg, TrashIconSvg, XIconSvg } from "../../icon";

const SkillCard = ({
  initProps,
  dataDisplay,
  handleAddSection,
  handleUpdateSection,
  handleDeleteSection,
  isAllowedToGetSkillLists,
  isAllowedToAddSection,
  isAllowedToDeleteSection,
}) => {
  // State
  const [isAdd, setIsAdd] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);

  const [dataUpdateSkill, setDataUpdateSkill] = useState({
    id: null,
    name: "",
    resume_id: null,
  });

  // 2. use Effect
  useEffect(() => {
    setSkillList(dataDisplay);
  }, [dataDisplay]);

  // Event
  const clearDataUpdate = () => {
    setDataUpdateSkill({
      id: null,
      name: "",
      resume_id: null,
    });
  };

  const handleGetSkillOptions = (value) => {
    if (!isAllowedToGetSkillLists) {
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getSkillLists?name=${value}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          setSkillOptions(response2.data);
        } else {
          notification.error({
            message: `${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      handleGetSkillOptions(newValue);
      setDataUpdateSkill((prev) => ({
        ...prev,
        name: newValue,
      }));
    } else {
      setSkillOptions([]);
    }
  };

  const handleChange = (newValue) => {
    setDataUpdateSkill((prev) => ({
      ...prev,
      name: newValue,
    }));
  };

  const onDragEnd = async ({ active, over }) => {
    let activeIndex,
      overIndex = 0;
    let updatedList = [];

    if (active?.id !== over?.id) {
      // Display reordered item list
      setSkillList((prev) => {
        activeIndex = prev.findIndex((i) => i.id === active.id);
        overIndex = prev.findIndex((i) => i.id === over?.id);
        updatedList = arrayMove(prev, activeIndex, overIndex);
        return updatedList;
      });

      // Update item after_id when reordered
      let prevIndex = overIndex - 1; // get item above the reordered item
      // if the reordered item moved to the first order, then set after_id as 0
      let prevId = prevIndex < 0 ? 0 : updatedList[prevIndex]?.id;
      let currentItem = skillList?.find((item) => item.id === active.id);

      let updatedItem = {
        ...currentItem,
        id: active?.id,
        after_id: prevId ?? 0,
        start_date: currentItem?.start_date_format,
        end_date: currentItem?.end_date_format,
      };
      await handleUpdateSection("skill", updatedItem);
      clearDataUpdate();
    }
  };
  const SkillTag = ({ data, ...draggable }) => (
    <Tag
      closable
      onClose={(e) => {
        if (isAllowedToDeleteSection) {
          e.stopPropagation();
          handleDeleteSection("skill", data.id);
        }
      }}
      color="#35763B1A"
      closeIcon={isAllowedToDeleteSection && <CloseCircleOutlined rev={""} />}
      className="text-primary100 flex gap-1 items-center"
    >
      <div className="cursor-move" {...draggable}>
        {data.name}
      </div>
    </Tag>
  );

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
        <SkillTag data={data} {...listeners} {...attributes} />
      </div>
    );
  };

  return (
    <div className="shadow-lg rounded-md bg-white p-5 row-span-1">
      <h4 className="mig-heading--4">Skills</h4>
      <hr className="my-4" />
      <div className="mb-5">
        <DndContext onDragEnd={onDragEnd} modifiers={[restrictToParentElement]}>
          <SortableContext items={skillList?.map((i) => i.id)}>
            <div className="flex flex-wrap gap-y-2">
              {skillList?.map((skill) => (
                <SortableItem key={skill.id} data={skill} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      {/* Input Skill */}
      {isAdd ? (
        <div className="flex flex-col space-y-4 mt-8 mb-4">
          <div className="flex flex-row space-x-4">
            <Select
              showSearch
              placeholder="Skill name"
              value={dataUpdateSkill?.name}
              defaultActiveFirstOption={false}
              optionFilterProp="children"
              notFoundContent={null}
              onChange={handleChange}
              onSearch={handleSearch}
              className="w-full"
            >
              {skillOptions.map((skill) => (
                <Select.Option key={skill?.id} value={skill?.name}>
                  {skill?.name}
                </Select.Option>
              ))}
            </Select>
            <button
              onClick={() => {
                handleAddSection("skill", dataUpdateSkill);
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
            <p className="text-primary100 hover:text-primary75">+ Add skill</p>
          </ButtonSys>
        )
      )}
    </div>
  );
};

export default SkillCard;
