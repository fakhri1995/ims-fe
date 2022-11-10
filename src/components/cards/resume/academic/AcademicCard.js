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
import AcademicBlock from "./AcademicBlock";

const AcademicCard = ({
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

  const [dataUpdateEdu, setDataUpdateEdu] = useState({
    id: null,
    university: "",
    major: "",
    gpa: null,
    graduation_year: "",
    resume_id: null,
  });

  const clearDataUpdate = () => {
    setDataUpdateEdu({
      id: null,
      university: "",
      major: "",
      gpa: null,
      graduation_year: "",
      resume_id: 12,
    });
  };

  // console.log(dataUpdateEdu)
  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <h4 className="mig-heading--4">Academic History</h4>
      <hr className="my-4" />
      <Timeline>
        {dataDisplay.educations?.map((edu) => (
          <AcademicBlock
            key={edu.id}
            edu={edu}
            dataUpdateEdu={dataUpdateEdu}
            setDataUpdateEdu={setDataUpdateEdu}
            handleUpdateSection={handleUpdateSection}
            clearDataUpdate={clearDataUpdate}
            setModalDelete={setModalDelete}
            isAdd={isAdd}
            isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
            isAllowedToDeleteSection={isAllowedToDeleteSection}
          />
        ))}
      </Timeline>

      {/* Input Add Academic */}
      {isAdd ? (
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
              value={dataUpdateEdu.graduation_year}
              onChange={(date) => {
                let input = date.format("YYYY-MM-DD");
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
        isAllowedToAddSection && (
          <ButtonSys
            type={"dashed"}
            onClick={() => {
              clearDataUpdate();
              setIsAdd(true);
            }}
          >
            <p className="text-primary100 hover:text-primary75">
              + Add academic history
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
            handleDeleteSection("education", dataUpdateEdu.id);
            setModalDelete(false);
            clearDataUpdate();
          }}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"data"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin menghapus data akademis{" "}
            <strong>{dataUpdateEdu.university}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default AcademicCard;
