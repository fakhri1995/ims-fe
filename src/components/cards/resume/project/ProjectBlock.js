import { DatePicker, Input, Timeline } from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import {
  CheckIconSvg,
  EditIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../icon";

const ProjectBlock = ({
  project,
  dataUpdateProj,
  setDataUpdateProj,
  handleUpdateSection,
  clearDataUpdate,
  setModalDelete,
  isAdd,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
  afterId,
  ...draggable
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (isAdd === true) {
      setIsUpdate(false);
    }
  }, [isAdd]);

  return (
    <div className="flex flex-row mb-3">
      {isUpdate ? (
        <div className="flex flex-col space-y-4 mt-2 mb-4 w-full">
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
                if (dataUpdateProj.id) {
                  handleUpdateSection("project", {
                    ...dataUpdateProj,
                    after_id: afterId,
                  });
                }
                setIsUpdate(false);
                clearDataUpdate();
              }}
              className="bg-transparent hover:opacity-75"
            >
              <CheckIconSvg size={24} color={"#35763B"} />
            </button>
            <button
              onClick={() => {
                setIsUpdate(false);
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
              value={dataUpdateProj.year ? moment(dataUpdateProj.year) : null}
              onChange={(date) => {
                let input = date ? date.format("YYYY-MM-DD") : null;
                setDataUpdateProj((prev) => ({
                  ...prev,
                  year: input,
                }));
              }}
            />
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
        <div className="flex w-full  ">
          {/* Read state */}
          <div className="flex w-3/4 cursor-move" {...draggable}>
            <p className="text-center text-primary100 font-bold w-1/3">
              {project.year ? project.year.slice(0, 4) : "-"}
            </p>
            <div className="flex flex-col w-2/3">
              <p className="font-bold text-mono30">{project.name}</p>
              <p className="text-mono50">{project.description}</p>
            </div>
          </div>
          {!isAdd && (
            <div className="flex flex-row space-x-2 items-start w-1/4 justify-end">
              {isAllowedToUpdateCandidate && (
                <button
                  onClick={() => {
                    setIsUpdate(true);
                    setDataUpdateProj(project);
                  }}
                  className="bg-transparent hover:opacity-75"
                >
                  <EditIconSvg size={18} color="#4D4D4D" />
                </button>
              )}

              {isAllowedToDeleteSection && (
                <button
                  onClick={() => {
                    setDataUpdateProj(project);
                    setModalDelete(true);
                  }}
                  className="bg-transparent hover:opacity-75"
                >
                  <TrashIconSvg size={18} color="#4D4D4D" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectBlock;
