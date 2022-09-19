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

const TrainingCard = ({
  dataDisplay,
  handleAddSection,
  handleDeleteSection,
  dataUpdateTrain,
  setDataUpdateTrain,
}) => {
  const [isShowInput, setIsShowInput] = useState(false);

  return (
    <div className="shadow-lg rounded-md bg-white p-5 row-span-1">
      <H2>Training</H2>
      <hr className="my-4" />
      {dataDisplay.trainings?.map((training) => (
        <div key={training.id} className="flex flex-row mb-3">
          <p className="text-center text-green-theme font-bold w-1/4">
            {training.year.slice(0, 4)}
          </p>
          <div className="flex flex-col w-2/4">
            <p className="font-bold text-gray-700">{training.name}</p>
            <p className="text-gray-500">{training.organizer}</p>
          </div>
          <div className="flex flex-row space-x-2 items-start w-1/4 justify-end">
            <button
              onClick={(event) => {
                setIsShowInput(true);
              }}
              className="bg-transparent"
            >
              <EditIconSvg size={18} color="#4D4D4D" />
            </button>

            <button
              onClick={() => {
                handleDeleteSection("training", training.id);
              }}
              className="bg-transparent"
            >
              <TrashIconSvg size={18} color="#4D4D4D" />
            </button>
          </div>
        </div>
      ))}
      {/* Input Training */}
      {isShowInput ? (
        <div className="flex flex-col space-y-4 mt-8 mb-4">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="Course or program name"
              value={dataUpdateTrain.name}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateTrain((prev) => ({
                  ...prev,
                  name: input,
                }));
              }}
            ></Input>
            <button
              onClick={() => {
                handleAddSection("training", dataUpdateTrain);
                setDataUpdateTrain({
                  id: null,
                  name: "",
                  organizer: "",
                  year: "",
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
          <div className="flex flex-row space-x-4 w-full">
            <Input
              placeholder="Year"
              value={dataUpdateTrain.year}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateTrain((prev) => ({
                  ...prev,
                  year: input,
                }));
              }}
              className="w-1/3"
            ></Input>
            <Input
              placeholder="Company or organization"
              value={dataUpdateTrain.organizer}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateTrain((prev) => ({
                  ...prev,
                  organizer: input,
                }));
              }}
              className="w-2/3"
            ></Input>
          </div>
        </div>
      ) : (
        <ButtonSys
          type={"dashed"}
          onClick={() => {
            setIsShowInput(true);
          }}
        >
          <p className="text-primary100 hover:text-primary75">+ Add training</p>
        </ButtonSys>
      )}
    </div>
  );
};

export default TrainingCard;
