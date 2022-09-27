import { DatePicker, Input, Timeline } from "antd";
import TextArea from "antd/lib/input/TextArea";
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
            onChange={(dates) => {
              // console.log(dates)
              let startDate = dates[0].format("MMM YYYY");
              let endDate = dates[1].format("MMM YYYY");
              setDataUpdateExp((prev) => ({
                ...prev,
                start_date: moment(startDate),
                end_date: moment(endDate),
              }));
            }}
          />

          <TextArea
            placeholder="Job description..."
            value={dataUpdateExp.description}
            onChange={(e) => {
              let input = e.target.value;
              setDataUpdateExp((prev) => ({
                ...prev,
                description: input,
              }));
            }}
          />
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-primary100 font-bold mb-1">{exp.role}</p>
            <p className="text-gray-400 mb-1">
              {exp.company} ·&nbsp;
              <strong>
                {moment(exp.start_date).format("MMM YYYY")} -&nbsp;
                {moment(exp.end_date).format("MMM YYYY")}
              </strong>
            </p>
            <p className="text-gray-400">{exp.description}</p>
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
