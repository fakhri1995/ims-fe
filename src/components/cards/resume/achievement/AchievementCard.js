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
import moment from "moment";
import React from "react";
import { useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { RESUME_SECTION_DELETE } from "lib/features";

import ButtonSys from "../../../button";
import {
  CheckIconSvg,
  EditIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../icon";
import { ModalHapus2 } from "../../../modal/modalCustom";
import { H2 } from "../../../typography";
import AchievementBlock from "./AchievementBlock";

const AchievementCard = ({
  dataDisplay,
  handleAddSection,
  handleUpdateSection,
  handleDeleteSection,
  dataUpdateAchiev,
  setDataUpdateAchiev,
  loadingDelete,
  isAllowedToAddSection,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const clearDataUpdate = () => {
    setDataUpdateAchiev({
      id: null,
      achievement: "",
      name: "",
      organizer: "",
      year: "",
      resume_id: null,
    });
  };

  // console.log(dataDisplay.achievements)
  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <h4 className="mig-heading--4">Achievements</h4>
      <hr className="my-4" />
      {dataDisplay.achievements?.map((achievement) => (
        <AchievementBlock
          key={achievement.id}
          achievement={achievement}
          dataUpdateAchiev={dataUpdateAchiev}
          setDataUpdateAchiev={setDataUpdateAchiev}
          handleUpdateSection={handleUpdateSection}
          clearDataUpdate={clearDataUpdate}
          setModalDelete={setModalDelete}
          isAdd={isAdd}
          isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
          isAllowedToDeleteSection={isAllowedToDeleteSection}
        />
      ))}
      {/* Input Add Achievement */}
      {isAdd ? (
        <div className="flex flex-col space-y-4 mt-4 mb-4">
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
                handleAddSection("achievement", dataUpdateAchiev);
                setIsAdd(false);
                clearDataUpdate();
              }}
              className="bg-transparent"
            >
              <CheckIconSvg size={24} color={"#35763B"} />
            </button>
            <button
              onClick={() => {
                setIsAdd(false);
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
              value={dataUpdateAchiev.year}
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
        isAllowedToAddSection && (
          <ButtonSys
            type={"dashed"}
            onClick={() => {
              clearDataUpdate();
              setIsAdd(true);
            }}
          >
            <p className="text-primary100 hover:text-primary75">
              + Add achievement
            </p>
          </ButtonSys>
        )
      )}

      <AccessControl hasPermission={RESUME_SECTION_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() => {
            handleDeleteSection("achievement", dataUpdateAchiev.id);
            setModalDelete(false);
          }}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"data"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin menghapus data penghargaan{" "}
            <strong>{dataUpdateAchiev.name}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default AchievementCard;
