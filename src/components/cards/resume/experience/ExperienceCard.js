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
import moment from "moment";
import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

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
import ExperienceBlock from "./ExperienceBlock";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const { RangePicker } = DatePicker;

const ExperienceCard = ({
  dataDisplay,
  handleAddSection,
  handleUpdateSection,
  handleDeleteSection,
  dataUpdateExp,
  setDataUpdateExp,
  loadingDelete,
  isAllowedToAddSection,
  isAllowedToUpdateCandidate,
  isAllowedToDeleteSection,
}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const clearDataUpdate = () => {
    setDataUpdateExp({
      id: null,
      role: "",
      company: "",
      start_date: "",
      end_date: "",
      description: "",
      resume_id: null,
    });
  };

  // Text Editor Config
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  // console.log(dataUpdateExp)
  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <h4 className="mig-heading--4">Experience</h4>
      <hr className="my-4" />
      <Timeline>
        {dataDisplay.experiences?.map((exp) => (
          <ExperienceBlock
            key={exp.id}
            exp={exp}
            dataUpdateExp={dataUpdateExp}
            setDataUpdateExp={setDataUpdateExp}
            handleUpdateSection={handleUpdateSection}
            clearDataUpdate={clearDataUpdate}
            setModalDelete={setModalDelete}
            isAdd={isAdd}
            isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
            isAllowedToDeleteSection={isAllowedToDeleteSection}
            modules={modules}
            formats={formats}
          />
        ))}
      </Timeline>

      {/* Input Experience */}
      {isAdd ? (
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
            value={[dataUpdateExp.start_date, dataUpdateExp.end_date]}
            onChange={(dates) => {
              // console.log(dates[0].format('MMMM YYYY'))
              let startDate = dates[0].format("MMM YYYY");
              let endDate = dates[1].format("MMM YYYY");
              setDataUpdateExp((prev) => ({
                ...prev,
                start_date: moment(startDate),
                end_date: moment(endDate),
              }));
            }}
          />
          <ReactQuill
            placeholder="Job description..."
            theme="snow"
            value={dataUpdateExp.description}
            modules={modules}
            formats={formats}
            className="h-32 pb-4"
            onChange={(value) => {
              setDataUpdateExp((prev) => ({
                ...prev,
                description: value,
              }));
            }}
          />
        </div>
      ) : (
        isAllowedToAddSection && (
          <div>
            <ButtonSys
              type={"dashed"}
              onClick={() => {
                clearDataUpdate();
                setIsAdd(true);
              }}
            >
              <p className="text-primary100 hover:text-primary75">
                + Add experience
              </p>
            </ButtonSys>
          </div>
        )
      )}

      <AccessControl hasPermission={RESUME_SECTION_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() => {
            handleDeleteSection("experience", dataUpdateExp.id);
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
            Apakah Anda yakin ingin menghapus data pengalaman&nbsp;
            <strong>{dataUpdateExp.role}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default ExperienceCard;
