import { DatePicker, Input, Timeline } from "antd";
import moment from "moment";
import React from "react";

import {
  CheckIconSvg,
  EditIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../icon";

const GeneralBlock = ({
  detail,
  dataUpdate,
  setDataUpdate,
  handleUpdateSection,
  clearDataUpdate,
  setModalDelete,
  editIdx,
  setEditIdx,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
  sectionName,
  afterId,
  ...draggable
}) => {
  return (
    <div className="flex flex-row mb-3">
      {editIdx === detail.id ? (
        // Edit state
        <div className="flex flex-col space-y-4 mt-2 mb-4 w-full">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder={
                sectionName === "achievement"
                  ? "Achievement name"
                  : "Course or program name"
              }
              value={dataUpdate.name}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdate((prev) => ({
                  ...prev,
                  name: input,
                }));
              }}
            ></Input>
            <button
              onClick={() => {
                if (dataUpdate.id) {
                  handleUpdateSection(sectionName, {
                    ...dataUpdate,
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
          <div className="flex flex-row space-x-4 w-full">
            <DatePicker
              allowClear={true}
              picker="year"
              placeholder="Year"
              className="w-1/3"
              value={dataUpdate.year ? moment(dataUpdate.year) : null}
              onChange={(date) => {
                let input = date ? date.format("YYYY-MM-DD") : null;
                setDataUpdate((prev) => ({
                  ...prev,
                  year: input,
                }));
              }}
            />
            <Input
              placeholder="Company or organization"
              value={dataUpdate.organizer}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdate((prev) => ({
                  ...prev,
                  organizer: input,
                }));
              }}
              className="w-2/3"
            ></Input>
          </div>
        </div>
      ) : (
        <div className="flex w-full">
          {/* Read State */}
          <div className="flex w-3/4 cursor-move" {...draggable}>
            <p className="text-center text-primary100 font-bold w-1/3">
              {detail.year ? detail.year.slice(0, 4) : "-"}
            </p>
            <div className="flex flex-col w-2/3">
              <p className="font-bold text-mono30">{detail.name || "-"}</p>
              <p className="text-mono50">{detail.organizer || "-"}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-2 items-start w-1/4 justify-end">
            {isAllowedToUpdateCandidate && (
              <button
                onClick={() => {
                  setDataUpdate(detail);
                  setEditIdx(detail.id);
                }}
                className="bg-transparent hover:opacity-75"
              >
                <EditIconSvg size={18} color="#4D4D4D" />
              </button>
            )}

            {isAllowedToDeleteSection && (
              <button
                onClick={() => {
                  setDataUpdate(detail);
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

export default GeneralBlock;
