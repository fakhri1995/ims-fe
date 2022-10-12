import { DatePicker, Input, Timeline } from "antd";
import TextArea from "antd/lib/input/TextArea";
import parse from "html-react-parser";
import moment from "moment";
import dynamic from "next/dynamic";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

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
  isAdd,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
  modules,
  formats,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (isAdd === true) {
      setIsUpdate(false);
    }
  }, [isAdd]);

  // console.log(dataUpdateExp)

  return (
    <Timeline.Item color="#35763B">
      {isUpdate ? (
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
                  handleUpdateSection("experience", dataUpdateExp);
                }
                setIsUpdate(false);
                clearDataUpdate();
              }}
              className="bg-transparent"
            >
              <CheckIconSvg size={24} color={"#35763B"} />
            </button>
            <button
              onClick={() => {
                setIsUpdate(false);
                clearDataUpdate();
              }}
              className="bg-transparent"
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
            value={[
              moment(dataUpdateExp.start_date),
              moment(dataUpdateExp.end_date),
            ]}
            onChange={(value, datestring) => {
              let startDate = datestring[0];
              let endDate = datestring[1];
              setDataUpdateExp((prev) => ({
                ...prev,
                start_date: startDate,
                end_date: endDate,
              }));
            }}
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
          <div className="flex flex-col">
            <p className="text-primary100 font-bold mb-1">{exp.role}</p>
            <p className="text-mono50 mb-1">
              {exp.company} ·&nbsp;
              <strong>
                {moment(exp.start_date).format("MMM YYYY")} -&nbsp;
                {moment(exp.end_date).format("MMM YYYY")}
              </strong>
            </p>
            <p className="text-mono50">{parse(exp.description)}</p>
          </div>
          {!isAdd && (
            <div className="flex flex-row space-x-2 items-start">
              {isAllowedToUpdateCandidate && (
                <button
                  onClick={(event) => {
                    // console.log(edu.id)
                    setIsUpdate(true);
                    setDataUpdateExp(exp);
                  }}
                  className="bg-transparent"
                  value={exp.id}
                >
                  <EditIconSvg size={18} color="#4D4D4D" />
                </button>
              )}
              {isAllowedToDeleteSection && (
                <button
                  onClick={() => {
                    // console.log(exp.id);
                    setDataUpdateExp(exp);
                    setModalDelete(true);
                  }}
                  className="bg-transparent"
                >
                  <TrashIconSvg size={18} color="#4D4D4D" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </Timeline.Item>
  );
};

export default ExperienceBlock;
