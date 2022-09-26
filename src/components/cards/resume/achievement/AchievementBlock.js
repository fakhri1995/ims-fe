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

const AchievementBlock = ({
  achievement,
  dataUpdateAchiev,
  setDataUpdateAchiev,
  handleUpdateSection,
  clearDataUpdate,
  setModalDelete,
  isAdd,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (isAdd === true) {
      setIsUpdate(false);
    }
  }, [isAdd]);

  return (
    <div key={achievement.id} className="flex flex-row mb-3">
      {isUpdate ? (
        <div className="flex flex-col space-y-4 mt-2 mb-4 w-full">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="Achievement name"
              value={dataUpdateAchiev.name}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateAchiev((prev) => ({
                  ...prev,
                  name: input,
                }));
              }}
            ></Input>
            <button
              onClick={() => {
                if (dataUpdateAchiev.id) {
                  handleUpdateSection("achievement", dataUpdateAchiev);
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
          <div className="flex flex-row space-x-4 w-full">
            <DatePicker
              picker="year"
              placeholder="Year"
              className="w-1/3"
              value={moment(dataUpdateAchiev.year)}
              onChange={(date) => {
                let input = date?.format("YYYY-MM-DD");
                setDataUpdateAchiev((prev) => ({
                  ...prev,
                  year: moment(input),
                }));
              }}
            />
            <Input
              placeholder="Company or organization"
              value={dataUpdateAchiev.organizer}
              onChange={(e) => {
                let input = e.target.value;
                setDataUpdateAchiev((prev) => ({
                  ...prev,
                  organizer: input,
                }));
              }}
              className="w-2/3"
            ></Input>
          </div>
        </div>
      ) : (
        <>
          {/* Read State */}
          <p className="text-center text-primary100 font-bold w-1/4">
            {achievement.year.slice(0, 4)}
          </p>
          <div className="flex flex-col w-2/4">
            <p className="font-bold text-gray-700">{achievement.name}</p>
            <p className="text-gray-500">{achievement.organizer}</p>
          </div>
          {!isAdd && (
            <div className="flex flex-row space-x-2 items-start w-1/4 justify-end">
              <button
                onClick={(event) => {
                  setIsUpdate(true);
                  setDataUpdateAchiev(achievement);
                }}
                className="bg-transparent"
              >
                <EditIconSvg size={18} color="#4D4D4D" />
              </button>

              <button
                onClick={() => {
                  setDataUpdateAchiev(achievement);
                  setModalDelete(true);
                }}
                className="bg-transparent"
              >
                <TrashIconSvg size={18} color="#4D4D4D" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AchievementBlock;
