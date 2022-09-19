import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Steps,
  Tag,
  Timeline,
  notification,
} from "antd";
import React from "react";
import { useState } from "react";

import ButtonSys from "../../button";
import { CheckIconSvg, EditIconSvg, TrashIconSvg, XIconSvg } from "../../icon";
import { H2 } from "../../typography";

const SkillCard = ({
  dataDisplay,
  handleAddSection,
  handleDeleteSection,
  dataUpdateSkill,
  setDataUpdateSkill,
}) => {
  const [isShowInput, setIsShowInput] = useState(false);

  return (
    <div className="shadow-lg rounded-md bg-white p-5 row-span-1">
      <H2>Skills</H2>
      <hr className="my-4" />
      <div className="mb-5">
        {dataDisplay.skills?.map((skill) => (
          <Tag
            key={skill.id}
            closable
            onClose={() => {
              handleDeleteSection("skill", skill.id);
            }}
            color="#35763B1A"
            closeIcon={<CloseCircleOutlined />}
            className="text-green-theme"
          >
            {skill.name}
          </Tag>
        ))}
      </div>
      {/* Input Skill */}
      {isShowInput ? (
        <div className="flex flex-col space-y-4 mt-8 mb-4">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="Skill name"
              value={dataUpdateSkill.name}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateSkill((prev) => ({
                  ...prev,
                  name: input,
                }));
              }}
            ></Input>
            <button
              onClick={() => {
                handleAddSection("skill", dataUpdateSkill);
                setDataUpdateSkill({
                  id: null,
                  name: "",
                  resume_id: null,
                });
              }}
              className="bg-transparent"
            >
              <CheckIconSvg size={24} color={"#35763B"} />
            </button>
            <button
              onClick={() => {
                setIsShowInput(false);
              }}
              className="bg-transparent"
            >
              <XIconSvg size={24} color={"#BF4A40"} />
            </button>
          </div>
        </div>
      ) : (
        <ButtonSys
          type={"dashed"}
          onClick={() => {
            setIsShowInput(true);
          }}
        >
          <p className="text-primary100 hover:text-primary75">+ Add skill</p>
        </ButtonSys>
      )}
    </div>
  );
};

export default SkillCard;
