import { DatePicker, Input, InputNumber, Timeline } from "antd";
import moment from "moment";
import React, { useState } from "react";

import { momentFormatDate } from "../../../../lib/helper";
import {
  CheckIconSvg,
  EditIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../icon";

const { RangePicker } = DatePicker;

const AcademicBlock = ({
  edu,
  dataUpdateEdu,
  setDataUpdateEdu,
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
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <Timeline.Item color="#35763B">
      {editIdx === edu.id ? (
        // Edit state
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
                  handleUpdateSection("education", {
                    ...dataUpdateEdu,
                    after_id: afterId ?? 0,
                    start_date: dataUpdateEdu?.start_date_format,
                    end_date: dataUpdateEdu?.end_date_format,
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
            <RangePicker
              allowEmpty
              value={[
                moment(dataUpdateEdu.start_date).isValid()
                  ? moment(dataUpdateEdu.start_date)
                  : null,
                moment(dataUpdateEdu.end_date).isValid()
                  ? moment(dataUpdateEdu.end_date)
                  : null,
              ]}
              open={calendarOpen}
              onOpenChange={setCalendarOpen}
              onCalendarChange={(value, datestring) => {
                let startDate = datestring[0];
                let endDate = datestring[1];
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  start_date: startDate || "",
                  end_date: endDate || "",
                  start_date_format: startDate || "",
                  end_date_format: endDate || "",
                }));
              }}
              picker="month"
              className="w-1/2"
              renderExtraFooter={() => (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mb-0 bg-transparent text-primary100 hover:text-primary75 cursor-pointer"
                    onClick={() => {
                      setDataUpdateEdu((prev) => ({
                        ...prev,
                        end_date: "",
                        end_date_format: "",
                      }));
                      setCalendarOpen(false);
                    }}
                  >
                    Present
                  </button>
                </div>
              )}
            />
            <InputNumber
              placeholder="GPA"
              min={0.0}
              max={4.0}
              step={"0.01"}
              value={dataUpdateEdu.gpa}
              onChange={(value) => {
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  gpa: value,
                }));
              }}
              className="w-1/2"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          {/* Read state */}
          <div className="flex flex-col cursor-move" {...draggable}>
            <p className="text-primary100 font-bold mb-1">
              {edu?.university || "-"}
            </p>
            <div className="text-mono50 mb-1 flex gap-1">
              {edu?.major || "-"}
              {(edu?.start_date || edu?.end_date) && (
                <div className="flex gap-1">
                  <p>·</p>
                  <p>
                    <strong>
                      {momentFormatDate(edu?.start_date, "", "MMM YYYY")}
                      {edu?.start_date && " - "}
                      {momentFormatDate(
                        edu?.end_date,
                        <em>present</em>,
                        "MMM YYYY"
                      )}
                    </strong>
                  </p>
                </div>
              )}
            </div>
            {edu?.gpa && <p className="text-mono50">GPA {edu?.gpa}</p>}
          </div>
          <div className="flex flex-row space-x-2 items-start">
            {isAllowedToUpdateCandidate && (
              <button
                onClick={() => {
                  setDataUpdateEdu(edu);
                  setEditIdx(edu.id);
                }}
                className="bg-transparent hover:opacity-75"
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

export default AcademicBlock;
