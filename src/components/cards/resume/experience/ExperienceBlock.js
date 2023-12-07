import { DatePicker, Input, Timeline } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { momentFormatDate } from "../../../../lib/helper";
import {
  CheckIconSvg,
  EditIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../icon";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const { RangePicker } = DatePicker;

const ExperienceBlock = ({
  exp,
  dataUpdateExp,
  setDataUpdateExp,
  handleUpdateSection,
  clearDataUpdate,
  setModalDelete,
  editIdx,
  setEditIdx,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
  modules,
  formats,
  afterId,
  ...draggable
}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <Timeline.Item color="#35763B">
      {editIdx === exp.id ? (
        // Edit state
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="Role"
              value={dataUpdateExp.role}
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
                if (dataUpdateExp.id) {
                  handleUpdateSection("experience", {
                    ...dataUpdateExp,
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
          <Input
            placeholder="Company"
            value={dataUpdateExp.company}
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
              dataUpdateExp.start_date
                ? moment(dataUpdateExp.start_date)
                : null,
              dataUpdateExp.end_date ? moment(dataUpdateExp.end_date) : null,
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
                  onClick={() => {
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
            theme="snow"
            value={dataUpdateExp.description}
            modules={modules}
            formats={formats}
            className="h-44 pb-10"
            onChange={(value) => {
              setDataUpdateExp((prev) => ({
                ...prev,
                description: value,
              }));
            }}
          />
        </div>
      ) : (
        <div className="flex justify-between">
          {/* Read state */}
          <div className="flex flex-col cursor-move" {...draggable}>
            <p className="text-primary100 font-bold mb-1">{exp.role || "-"}</p>
            <p className="text-mono50 mb-1">
              {exp.company} ·&nbsp;
              <strong>
                {momentFormatDate(exp.start_date, "-", "MMM YYYY")} -&nbsp;
                {momentFormatDate(exp.end_date, <em>present</em>, "MMM YYYY")}
              </strong>
            </p>
            <div className="text-mono50">{parse(exp.description) || "-"}</div>
          </div>
          <div className="flex flex-row space-x-2 items-start">
            {isAllowedToUpdateCandidate && (
              <button
                onClick={() => {
                  setDataUpdateExp(exp);
                  setEditIdx(exp.id);
                }}
                className="bg-transparent hover:opacity-75"
                value={exp.id}
              >
                <EditIconSvg size={18} color="#4D4D4D" />
              </button>
            )}
            {isAllowedToDeleteSection && (
              <button
                onClick={() => {
                  setDataUpdateExp(exp);
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
    </Timeline.Item>
  );
};

export default ExperienceBlock;
