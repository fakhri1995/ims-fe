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
  setDataDisplay,
  handleAdd,
  handleUpdate,
  handleDelete,
  dataUpdate,
  setDataUpdate,
  assessmentRoles,
  loadingDelete,
}) => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [resultValue, setResultValue] = useState([]);

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
                handleUpdate(dataUpdate);
                setIsShowInput(false);
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
              onClick={() => {
                setIsShowInput(true);
              }}
              className="bg-transparent"
            >
              <EditIconSvg size={18} color="#4D4D4D" />
            </button>
          </div>
        )}
      </div>

      <hr className="my-4" />
      <div>
        <div className="flex flex-col space-y-2 mb-3">
          <p className="text-xs text-gray-400">Assessment Role</p>
          <p>{dataDisplay.assessment?.name}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-2">Criteria</p>
          {isShowInput ? (
            <ul>
              {/* Input Assessment Result */}
              {dataDisplay.assessment_results?.map((result, idx) => (
                <li key={idx}>
                  <div className="flex flex-row justify-between items-center mb-1">
                    <p className="w-full mr-5">{result.criteria}</p>
                    <Input
                      className="w-20"
                      value={result.value}
                      onChange={(event) => {
                        // to change display data
                        let newScore = event.target.value;
                        const tempDisplay = [...dataDisplay.assessment_results];
                        tempDisplay[idx].value = newScore;
                        setDataDisplay((prev) => ({
                          ...prev,
                          assessment_results: tempDisplay,
                        }));

                        // to change update data
                        const tempUpdate = [
                          ...dataUpdate.assessment_result_values,
                        ];
                        tempUpdate[idx] = newScore;
                        setDataUpdate((prev) => ({
                          ...prev,
                          assessment_result_values: tempUpdate,
                        }));
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {dataDisplay.assessment_results?.map((result) => (
                <li key={result.id}>
                  <div className="flex flex-row justify-between mb-1">
                    <p>{result.criteria}</p>
                    <p className="text-green-theme font-bold">{result.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentResultCard;
