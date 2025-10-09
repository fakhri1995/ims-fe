import { Input } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { CheckIconSvg, EditIconSvg, TrashIconSvg, XIconSvg } from "../../icon";

const AssessmentResultCard = ({
  dataDisplay,
  setDataDisplay,
  handleUpdate,
  isAllowedToUpdateResumeAssessment,
}) => {
  const [isShowInput, setIsShowInput] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({
    id: null,
    assessment_result_values: [],
  });

  useEffect(() => {
    if (!isAllowedToUpdateResumeAssessment) {
      return;
    }

    let oldResult = dataDisplay.assessment_results?.map(
      (result) => result?.value
    );
    setDataUpdate({
      id: Number(dataDisplay?.id),
      assessment_result_values: oldResult,
    });
  }, [isAllowedToUpdateResumeAssessment, dataDisplay]);

  // console.log("data display", dataDisplay);
  // console.log("data update", dataUpdate);
  return (
    <div className="border-neutrals70 shadow-desktopCard rounded-[10px] bg-white p-4">
      <div className="flex flex-row justify-between ">
        <h4 className="mig-heading--4">Technical Assessment Results</h4>
        {isShowInput ? (
          <div className="flex flex-row space-x-4 items-start">
            <button
              onClick={() => {
                handleUpdate(dataUpdate);
                setIsShowInput(false);
              }}
              className="bg-transparent hover:opacity-75"
            >
              <CheckIconSvg size={24} color={"#35763B"} />
            </button>
            <button
              onClick={() => {
                setIsShowInput(false);
              }}
              className="bg-transparent hover:opacity-75"
            >
              <XIconSvg size={24} color={"#BF4A40"} />
            </button>
          </div>
        ) : (
          isAllowedToUpdateResumeAssessment && (
            <div className="flex flex-row space-x-2 items-start w-1/4 justify-end">
              <button
                onClick={() => {
                  setIsShowInput(true);
                }}
                className="bg-transparent hover:opacity-75"
              >
                <EditIconSvg size={18} color="#4D4D4D" />
              </button>
            </div>
          )
        )}
      </div>

      <hr className="my-4" />
      <div>
        <div className="flex flex-col space-y-2 mb-3">
          <p className="text-xs text-mono80">Assessment Role</p>
          <p>{dataDisplay?.assessment?.name || "-"}</p>
        </div>

        <div>
          <p className="text-xs text-mono80 mb-2">Criteria</p>
          {isShowInput ? (
            <ul>
              {/* Input Assessment Result */}
              {dataDisplay?.assessment_results?.map((result, idx) => (
                <li key={idx}>
                  <div className="flex flex-row justify-between items-center mb-1">
                    <p className="w-full mr-5">{result?.criteria}</p>
                    <Input
                      className="w-20"
                      value={dataUpdate?.assessment_result_values?.[idx]}
                      onChange={(event) => {
                        // to change update data
                        let newScore = event.target.value;
                        const tempUpdate = [
                          ...dataUpdate?.assessment_result_values,
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
            // Read state
            <ul>
              {dataDisplay?.assessment_results?.map((result) => (
                <li key={result?.id}>
                  <div className="flex flex-row justify-between mb-1">
                    <p className="text-mono30">{result?.criteria || "-"}</p>
                    <p className="text-primary100 font-bold">
                      {result?.value || "-"}
                    </p>
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
