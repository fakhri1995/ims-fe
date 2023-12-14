import { DatePicker, Input } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import dynamic from "next/dynamic";
import React from "react";

import {
  CheckIconSvg,
  EditIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../icon";
import { formats, modules } from "../textEditorConfig";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ProjectBlock = ({
  project,
  dataUpdateProj,
  setDataUpdateProj,
  handleUpdateSection,
  clearDataUpdate,
  setModalDelete,
  editIdx,
  setEditIdx,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
  afterId,
  ...draggable
}) => {
  return (
    <div className="flex flex-row mb-3">
      {editIdx === project.id ? (
        // Edit state
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
            <button
              onClick={() => {
                if (dataUpdateProj.id) {
                  handleUpdateSection("project", {
                    ...dataUpdateProj,
                    after_id: afterId,
                  });
                }
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
          {/* <div className="flex flex-row space-x-4 w-full"> */}
          <ReactQuill
            theme="snow"
            value={dataUpdateProj.description}
            modules={modules}
            formats={formats}
            className="h-44 pb-10"
            onChange={(value) => {
              setDataUpdateProj((prev) => ({
                ...prev,
                description: value,
              }));
            }}
          />
        </div>
      ) : (
        <div className="flex w-full  ">
          {/* Read state */}
          <div className="flex w-3/4 cursor-move" {...draggable}>
            <p className="text-center text-primary100 font-bold w-1/3">
              {project.year ? project.year.slice(0, 4) : "-"}
            </p>
            <div className="flex flex-col w-2/3">
              <p className="font-bold text-mono30">{project.name || "-"}</p>
              <div className="text-mono50">
                {parse(project.description) || "-"}
              </div>
            </div>
          </div>
          <div className="flex flex-row space-x-2 items-start w-1/4 justify-end">
            {isAllowedToUpdateCandidate && (
              <button
                onClick={() => {
                  setDataUpdateProj(project);
                  setEditIdx(project.id);
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
        </div>
      )}
    </div>
  );
};

export default ProjectBlock;
