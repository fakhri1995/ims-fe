import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Input, Select, Tag } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { setConstantValue } from "typescript";

import ButtonSys from "../../button";
import { CheckIconSvg, EditIconSvg, TrashIconSvg, XIconSvg } from "../../icon";
import { H2 } from "../../typography";

const SkillCard = ({
  initProps,
  dataDisplay,
  handleAddSection,
  handleDeleteSection,
  dataUpdateSkill,
  setDataUpdateSkill,
  isAllowedToGetSkillLists,
  isAllowedToAddSection,
  isAllowedToDeleteSection,
}) => {
  // State
  const [isAdd, setIsAdd] = useState(false);
  const [skillList, setSkillList] = useState([]);

  // Event
  const clearDataUpdate = () => {
    setDataUpdateSkill({
      id: null,
      name: "",
      resume_id: null,
    });
  };

  const handleGetSkillList = (value) => {
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
          setSkillList(response2.data);
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
      handleGetSkillList(newValue);
      setDataUpdateSkill((prev) => ({
        ...prev,
        name: newValue,
      }));
    } else {
      setSkillList([]);
    }
  };

  const handleChange = (newValue) => {
    setDataUpdateSkill((prev) => ({
      ...prev,
      name: newValue,
    }));
  };

  return (
    <div className="shadow-lg rounded-md bg-white p-5 row-span-1">
      <h4 className="mig-heading--4">Skills</h4>
      <hr className="my-4" />
      <div className="mb-5">
        {dataDisplay.skills?.map((skill) => (
          <Tag
            key={skill.id}
            closable
            onClose={() => {
              isAllowedToDeleteSection &&
                handleDeleteSection("skill", skill.id);
            }}
            color="#35763B1A"
            closeIcon={isAllowedToDeleteSection && <CloseCircleOutlined />}
            className="text-primary100 mb-3"
          >
            {skill.name}
          </Tag>
        ))}
      </div>
      {/* Input Skill */}
      {isAdd ? (
        <div className="flex flex-col space-y-4 mt-8 mb-4">
          <div className="flex flex-row space-x-4">
            <Select
              showSearch
              placeholder="Skill name"
              value={dataUpdateSkill.name}
              defaultActiveFirstOption={false}
              optionFilterProp="children"
              notFoundContent={null}
              onChange={handleChange}
              onSearch={handleSearch}
              className="w-full"
            >
              {skillList.map((skill) => (
                <Select.Option key={skill?.id} value={skill.name}>
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
