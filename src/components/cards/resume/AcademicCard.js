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

const AcademicCard = ({
  dataDisplay,
  handleAddSection,
  handleDeleteSection,
  dataUpdateEdu,
  setDataUpdateEdu,
}) => {
  const [isShowInput, setIsShowInput] = useState(false);

  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <H2>Academic History</H2>
      <hr className="my-4" />
      <Timeline>
        {dataDisplay.educations?.map((edu, idx) => (
          <Timeline.Item color="#35763B" key={idx}>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-green-theme font-bold mb-1">
                  {edu.university}
                </p>
                <p className="text-gray-400 mb-1">
                  {edu.major} ·&nbsp;
                  <strong>{edu.graduation_year.slice(0, 4)}</strong>
                </p>
                <p className="text-gray-400">GPA {edu.gpa}</p>
              </div>
              <div className="flex flex-row space-x-2 items-start">
                <button
                  onClick={(event) => {
                    // console.log(edu.id)
                    setIsShowInput(true);
                  }}
                  className="bg-transparent"
                  value={edu.id}
                >
                  <EditIconSvg size={18} color="#4D4D4D" />
                </button>

                <button
                  onClick={() => {
                    console.log(edu.id);
                    handleDeleteSection("education", edu.id);
                  }}
                  className="bg-transparent"
                >
                  <TrashIconSvg size={18} color="#4D4D4D" />
                </button>
              </div>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
      {/* Input Academic */}

      {isShowInput ? (
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
                handleAddSection("education", dataUpdateEdu);
                setDataUpdateEdu({
                  id: null,
                  university: "",
                  major: "",
                  gpa: null,
                  graduation_year: "",
                  resume_id: 12,
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
            {/* TODO FIX ERROR IN DATEPICKER */}
            {/* <DatePicker
								picker="year"
								placeholder="Graduation Year"
								// format={DATE_MOMENT_FORMAT_PAYLOAD}
								className="w-1/2"
								value={dataUpdateEdu.graduation_year}
								onChange={(date, datestring) => {
										// let input = value.toDate();
										console.log(datestring)
										// setDataUpdateEdu((prev) => ({
										//   ...prev,
										//   graduation_year: datestring,
										// }))
								}}
								/> */}
            <Input
              placeholder="Graduation Year"
              value={dataUpdateEdu.graduation_year}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateEdu((prev) => ({
                  ...prev,
                  graduation_year: input,
                }));
              }}
              className="w-1/2"
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
        <ButtonSys
          type={"dashed"}
          onClick={() => {
            setIsShowInput(true);
          }}
        >
          <p className="text-primary100 hover:text-primary75">
            + Add academic history
          </p>
        </ButtonSys>
      )}
    </div>
  );
};

export default AcademicCard;
