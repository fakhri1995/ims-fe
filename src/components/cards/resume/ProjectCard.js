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
import React from "react";
import { useState } from "react";

import ButtonSys from "../../button";
import { CheckIconSvg, EditIconSvg, TrashIconSvg, XIconSvg } from "../../icon";
import { H2 } from "../../typography";

const ProjectCard = ({
  dataDisplay,
  handleAddSection,
  handleDeleteSection,
  dataUpdateProj,
  setDataUpdateProj,
}) => {
  const [isShowInput, setIsShowInput] = useState(false);

  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <H2>Projects</H2>
      <hr className="my-4" />
      {dataDisplay.projects?.map((project) => (
        <div key={project.id} className="flex flex-row mb-3">
          <p className="text-center text-green-theme font-bold w-1/4">
            {project.year.slice(0, 4)}
          </p>
          <div className="flex flex-col w-2/4">
            <p className="font-bold text-gray-700">{project.name}</p>
            <p className="text-gray-500">{project.description}</p>
          </div>
          <div className="flex flex-row space-x-2 items-start w-1/4 justify-end">
            <button
              onClick={(event) => {
                // console.log(edu.id)
                setIsShowInput(true);
              }}
              className="bg-transparent"
            >
              <EditIconSvg size={18} color="#4D4D4D" />
            </button>

            <button
              onClick={() => {
                console.log(project.id);
                handleDeleteSection("project", project.id);
              }}
              className="bg-transparent"
            >
              <TrashIconSvg size={18} color="#4D4D4D" />
            </button>
          </div>
        </div>
      ))}
      {/* Input Project */}
      {isShowInput ? (
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
                setDataUpdateProj({
                  id: null,
                  name: "",
                  year: "",
                  description: "",
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
          <div className="flex flex-row space-x-4 w-full">
            <Input
              placeholder="Year"
              value={dataUpdateProj.year}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateProj((prev) => ({
                  ...prev,
                  year: input,
                }));
              }}
              className="w-1/3"
            ></Input>
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
        <ButtonSys
          type={"dashed"}
          onClick={() => {
            setIsShowInput(true);
          }}
        >
          <p className="text-primary100 hover:text-primary75">+ Add project</p>
        </ButtonSys>
      )}
    </div>
  );
};

export default ProjectCard;
