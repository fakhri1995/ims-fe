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
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useState } from "react";

import ButtonSys from "../../button";
import { CheckIconSvg, EditIconSvg, TrashIconSvg, XIconSvg } from "../../icon";
import { H2 } from "../../typography";

const ExperienceCard = ({
  dataDisplay,
  handleAddSection,
  handleDeleteSection,
  dataUpdateExp,
  setDataUpdateExp,
}) => {
  const [isShowInput, setIsShowInput] = useState(false);

  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <H2>Experience</H2>
      <hr className="my-4" />
      <Timeline>
        {dataDisplay.experiences?.map((exp, idx) => (
          <Timeline.Item color="#35763B" key={idx}>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-green-theme font-bold mb-1">{exp.role}</p>
                <p className="text-gray-400 mb-1">
                  {exp.company} ·&nbsp;
                  <strong>
                    {exp.start_date.slice(0, 7)} - {exp.end_date.slice(0, 7)}
                  </strong>
                </p>
                <p className="text-gray-400">{exp.description}</p>
              </div>
              <div className="flex flex-row space-x-2 items-start">
                <button
                  onClick={(event) => {
                    // console.log(edu.id)
                    setIsShowInput(true);
                  }}
                  className="bg-transparent"
                  value={exp.id}
                >
                  <EditIconSvg size={18} color="#4D4D4D" />
                </button>

                <button
                  onClick={() => {
                    console.log(exp.id);
                    handleDeleteSection("experience", exp.id);
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
                handleAddSection("experience", dataUpdateExp);
                setDataUpdateExp({
                  id: null,
                  role: "",
                  company: "",
                  start_date: "",
                  end_date: "",
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
              placeholder="Start date..."
              value={dataUpdateExp.start_date}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateExp((prev) => ({
                  ...prev,
                  start_date: input,
                }));
              }}
              className="w-1/2"
            />
            <Input
              placeholder="End date..."
              value={dataUpdateExp.end_date}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateExp((prev) => ({
                  ...prev,
                  end_date: input,
                }));
              }}
              className="w-1/2"
            />
          </div>
          {/* <div className="flex flex-row space-x-4 w-full">
								<Input
									placeholder="End month..."
									value={dataUpdateExp.end_date}
									onChange={(e) => {
										let input = e.target.value;
										setDataUpdateExp((prev) => ({
										...prev,
										end_date: input,
										}))
									}}
									className="w-1/2"
								/>
								<Input
									placeholder="End Year..."
									value={dataUpdateExp.end_date}
									onChange={(e) => {
										let input = e.target.value;
										setDataUpdateExp((prev) => ({
										...prev,
										end_date: input,
										}))
									}}
									className="w-1/2"
								/>
						</div> */}
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
        <ButtonSys
          type={"dashed"}
          onClick={() => {
            setIsShowInput(true);
          }}
        >
          <p className="text-primary100 hover:text-primary75">
            + Add experience
          </p>
        </ButtonSys>
      )}
    </div>
  );
};

export default ExperienceCard;
