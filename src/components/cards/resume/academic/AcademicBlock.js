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

const AcademicBlock = ({
  edu,
  dataUpdateEdu,
  setDataUpdateEdu,
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

  // console.log(dataUpdateEdu)

  return (
    <Timeline.Item color="#35763B">
      {isUpdate ? (
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="University"
              value={dataUpdateEdu.university}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  university: input,
                }));
              }}
            ></Input>
            <button
              onClick={() => {
                if (dataUpdateEdu.id) {
                  handleUpdateSection("education", dataUpdateEdu);
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
            placeholder="Degree"
            value={dataUpdateEdu.major}
            onChange={(e) => {
              let input = e.target.value;
              setDataUpdateEdu((prev) => ({
                ...prev,
                major: input,
              }));
            }}
          />

          <div className="flex flex-row space-x-4 w-full">
            <DatePicker
              picker="year"
              placeholder="Graduation Year"
              allowClear={false}
              className="w-1/2"
              value={moment(dataUpdateEdu.graduation_year)}
              onChange={(date) => {
                let input = date?.format("YYYY-MM-DD");
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  graduation_year: moment(input),
                }));
              }}
            />
            <Input
              placeholder="GPA"
              value={dataUpdateEdu.gpa}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  gpa: input,
                }));
              }}
              className="w-1/2"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-primary100 font-bold mb-1">{edu?.university}</p>
            <p className="text-mono50 mb-1">
              {edu?.major} ·&nbsp;
              <strong>{edu?.graduation_year?.slice(0, 4)}</strong>
            </p>
            {edu?.gpa && <p className="text-mono50">GPA {edu?.gpa}</p>}
          </div>
          {!isAdd && (
            <div className="flex flex-row space-x-2 items-start">
              {isAllowedToUpdateCandidate && (
                <button
                  onClick={() => {
                    setIsUpdate(true);
                    setDataUpdateEdu(edu);
                  }}
                  className="bg-transparent"
                  value={edu?.id}
                >
                  <EditIconSvg size={18} color="#4D4D4D" />
                </button>
              )}
              {isAllowedToDeleteSection && (
                <button
                  onClick={() => {
                    setDataUpdateEdu(edu);
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

export default AcademicBlock;
