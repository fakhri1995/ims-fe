import { PDFDownloadLink } from "@react-pdf/renderer";
import { Form, Input, Select, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import parse from "html-react-parser";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";

import { RESUME_DELETE } from "lib/features";

import ButtonSys from "../../button";
import {
  CheckIconSvg,
  EditIconSvg,
  EmailIconSvg,
  InfoCircleIconSvg,
  MappinIconSvg,
  OneUserIconSvg,
  PhoneIconSvg,
  XIconSvg,
} from "../../icon";
import { ModalHapus2 } from "../../modal/modalCustom";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const SummaryCard = ({
  dataDisplay,
  setDataDisplay,
  handleAddSection,
  handleUpdateSection,
  dataSummary,
  setDataSummary,
  praloading,
  assessmentRoles,
  handleDelete,
  isAllowedToDeleteCandidate,
  isAllowedToUpdateCandidate,
  loadingUpdate,
  loadingDelete,
  isCreateForm,
  isGuest,
}) => {
  const rt = useRouter();
  const [instanceForm] = Form.useForm();
  const [isShowInput, setIsShowInput] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [isAddDescription, setIsAddDescription] = useState(false);
  const onChangeInput = (e) => {
    setDataUpdateBasic({
      ...dataUpdateBasic,
      [e.target.name]: e.target?.value,
    });
  };
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
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

  /** State to only renders `<PDFDownloadLink>` component after this page mount (client-side) */
  const [isOnClient, setIsOnClient] = useState(false);
  useEffect(() => {
    setIsOnClient(true);
  }, []);

  // console.log(dataUpdateBasic);
  // console.log(dataDisplay)
  const clearDataUpdate = () => {
    setDataSummary({
      description: "",
    });
  };

  function checkDataDescription(data) {
    if (data.description != undefined) {
      // console.log("datanya bro ", data);
      let checkDescription = parse(data.description);
      // console.log("deskription ", checkDescription);
      // Check if description is available
      if (checkDescription?.props?.children?.length > 1) {
        return true;
      } else if (checkDescription?.props?.children?.type !== "br") {
        return true;
      } else {
        return false;
      }
    } else return false;
  }

  return (
    <div className="col-span-2 shadow-lg rounded-md bg-white p-5 mt-6">
      <div className="flex flex-row items-center justify-between mb-4 ">
        <div className="flex flex-row space-x-2">
          <h3 className="mig-heading--3">Summary</h3>
        </div>
      </div>
      {isAddDescription == false &&
        dataDisplay.summaries != null &&
        checkDataDescription(dataDisplay.summaries) && (
          <div className={"mb-4"}>
            <div>
              {!!dataDisplay.summaries.description &&
                parse(dataDisplay.summaries?.description)}
            </div>
          </div>
        )}
      <hr />
      {isAddDescription ? (
        <Spin spinning={praloading}>
          <div className="flex flex-row gap-4 mt-6">
            <div className={"w-11/12"}>
              <ReactQuill
                theme="snow"
                value={dataSummary?.description}
                modules={modules}
                formats={formats}
                className="h-44 pb-10"
                onChange={(value) => {
                  setDataSummary({
                    ...dataSummary,
                    description: value,
                  });
                }}
              />
            </div>
            <div
              className={"flex flex-nowrap justify-center items-start gap-2"}
            >
              <button
                onClick={() => {
                  if (dataSummary.id) {
                    handleUpdateSection("summary", dataSummary);
                  } else {
                    handleAddSection("summary", dataSummary);
                  }
                  setIsAddDescription(false);
                  clearDataUpdate();
                }}
                className="bg-transparent hover:opacity-75"
              >
                <CheckIconSvg size={24} color={"#35763B"} />
              </button>
              <button
                onClick={() => {
                  setIsAddDescription(false);
                }}
                className="bg-transparent hover:opacity-75"
              >
                <XIconSvg size={24} color={"#BF4A40"} />
              </button>
            </div>
          </div>
        </Spin>
      ) : (
        isAllowedToUpdateCandidate && (
          <div>
            <ButtonSys
              type={"dashed"}
              onClick={() => {
                // clearDataUpdate();
                if (dataDisplay.summaries) {
                  setDataSummary({
                    id: dataDisplay.summaries.id,
                    description: dataDisplay.summaries.description,
                  });
                }
                setIsAddDescription(true);
              }}
            >
              <p className="text-primary100 hover:text-primary75">
                + Add Summary
              </p>
            </ButtonSys>
          </div>
        )
      )}

      <AccessControl hasPermission={RESUME_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDelete}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"resume"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan resume kandidat
            dengan nama <strong>{dataDisplay.name}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default SummaryCard;
