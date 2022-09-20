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
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";

import { RESUME_ASSESSMENT_DELETE } from "lib/features";

import ButtonSys from "../../button";
import { CheckIconSvg, EditIconSvg, TrashIconSvg, XIconSvg } from "../../icon";
import { ModalHapus2 } from "../../modal/modalCustom";
import { H2 } from "../../typography";

const AssessmentResultCard = ({
  dataDisplay,
  handleAdd,
  handleDelete,
  dataUpdate,
  setDataUpdate,
  assessmentRoles,
  isAllowedToDeleteResumeAssessment,
  loadingDelete,
}) => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [selected, setSelected] = useState();
  const [criterias, setCriterias] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    if (isShowInput === true) {
      let findCriterias = assessmentRoles.find(
        (assessment) => assessment.id === selected
      );
      // console.log(findCriterias.details)
      setCriterias(findCriterias.details);
    }
  }, [selected]);

  // console.log(assessmentRoles);
  // console.log(dataUpdate)
  return (
    <div className="shadow-lg rounded-md bg-white p-5">
      <div className="flex flex-row justify-between ">
        <H2>Technical Assessment Results</H2>
        {isShowInput ? (
          <div className="flex flex-row space-x-4 items-start">
            <button
              onClick={() => {
                handleAdd();
                // setDataUpdate({
                // 	id: null,
                // 	role: "",
                // 	company: "",
                // 	start_date: "",
                // 	end_date: "",
                // 	description: "",
                // 	resume_id: null,
                // })
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
        ) : (
          <div className="flex flex-row space-x-2 items-start w-1/4 justify-end">
            <button
              onClick={(event) => {
                // console.log(edu.id)
                setIsShowInput(true);
              }}
              className="bg-transparent"
            >
              <EditIconSvg size={18} color="#4D4D4D" />
            </button>

            <button
              onClick={() => {
                setModalDelete(true);
              }}
              className="bg-transparent"
            >
              <TrashIconSvg size={18} color="#4D4D4D" />
            </button>
          </div>
        )}
      </div>

      <hr className="my-4" />

      {/* Input Assessment Result */}
      {isShowInput ? (
        <div>
          <div className="flex flex-col space-y-2 mb-3">
            <p className="text-xs text-gray-400">Assessment Role</p>
            <Select
              defaultValue={dataDisplay.role}
              onChange={(value) => {
                console.log(value);
                setSelected(value);
                setDataUpdate((prev) => ({
                  ...prev,
                  assessment_id: value,
                }));
              }}
            >
              {assessmentRoles.map((role) => (
                <Select.Option key={role.id} value={role.id}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">Criteria</p>
            <ul>
              {criterias.map((assessment, idx) => (
                <li key={assessment.id}>
                  <div className="flex flex-row justify-between items-center mb-1">
                    <p className="w-full mr-5">{assessment.criteria}</p>
                    <Input
                      className="w-20"
                      value={assessment.value}
                      onChange={(event) => {
                        let newScore = event.target.value;
                        let tempResult = [
                          ...dataUpdate.assessment_result_values,
                        ];
                        tempResult[idx] = newScore;
                        // console.log(event.target.value)
                        setDataUpdate((prev) => ({
                          ...prev,
                          assessment_result_values: tempResult,
                        }));
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col space-y-2 mb-3">
            <p className="text-xs text-gray-400">Assessment Role</p>
            <p>{dataDisplay.role}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">Criteria</p>
            <ul>
              {dataDisplay.assessment_results.map((assessment) => (
                <li key={assessment.id}>
                  <div className="flex flex-row justify-between mb-1">
                    <p>{assessment.criteria}</p>
                    <p className="text-green-theme font-bold">
                      {assessment.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <AccessControl hasPermission={RESUME_ASSESSMENT_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDelete}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"nilai"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan hasil assessment
            kandidat dengan nama <strong>{dataDisplay.name}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default AssessmentResultCard;
