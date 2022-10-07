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
import TrainingBlock from "./TrainingBlock";

const TrainingCard = ({
  dataDisplay,
  handleAddSection,
  handleUpdateSection,
  handleDeleteSection,
  loadingDelete,
  isAllowedToAddSection,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [dataUpdateTrain, setDataUpdateTrain] = useState({
    id: null,
    name: "",
    organizer: "",
    year: "",
    resume_id: null,
  });

  const clearDataUpdate = () => {
    setDataUpdateTrain({
      id: null,
      name: "",
      organizer: "",
      year: "",
      resume_id: null,
    });
  };

  return (
    <div className="shadow-lg rounded-md bg-white p-5 row-span-1">
      <h4 className="mig-heading--4">Training</h4>
      <hr className="my-4" />
      {dataDisplay.trainings?.map((training) => (
        <TrainingBlock
          key={training.id}
          training={training}
          dataUpdateTrain={dataUpdateTrain}
          setDataUpdateTrain={setDataUpdateTrain}
          handleUpdateSection={handleUpdateSection}
          clearDataUpdate={clearDataUpdate}
          setModalDelete={setModalDelete}
          isAdd={isAdd}
          isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
          isAllowedToDeleteSection={isAllowedToDeleteSection}
        />
      ))}
      {/* Input Add Training */}
      {isAdd ? (
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
              value={dataUpdateTrain.year}
              onChange={(date) => {
                let input = date?.format("YYYY-MM-DD");
                setDataUpdateTrain((prev) => ({
                  ...prev,
                  year: moment(input),
                }));
              }}
            />
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
        isAllowedToAddSection && (
          <ButtonSys
            type={"dashed"}
            onClick={() => {
              clearDataUpdate();
              setIsAdd(true);
            }}
          >
            <p className="text-primary100 hover:text-primary75">
              + Add training
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
            handleDeleteSection("training", dataUpdateTrain.id);
            setModalDelete(false);
          }}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"data"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin menghapus data pelatihan{" "}
            <strong>{dataUpdateTrain.name}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default TrainingCard;
