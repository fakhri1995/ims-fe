import { Form, Input, Select, Spin, Timeline, notification } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import "moment/locale/id";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { ASSESSMENT_ADD } from "lib/features";

import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import { InputRequired } from "../../input";
import { Label } from "../../typography";
import DrawerCore from "../drawerCore";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
moment.locale("id");

const DrawerCandidatePreview = ({
  id,
  visible,
  onvisible,
  initProps,
  setRefresh,
  isAllowedToGetPreviewRecruitment,
  isAllowedToGetRecruitment,
  trigger,
}) => {
  /**
   * Dependencies
   */
  const rt = useRouter();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  //USESTATE
  const [dataPreview, setDataPreview] = useState({
    name: "",
    role: "",
    created_at: "",
    recruitment_stage: [],
  });

  const [loadingDataPreview, setLoadingDataPreview] = useState(false);

  // useEffect
  // 3.1. Get Recruitment Preview Data
  useEffect(() => {
    if (!isAllowedToGetPreviewRecruitment) {
      permissionWarningNotification("Mendapatkan", "Data Preview Recruitment");
      setLoadingDataPreview(false);
      return;
    }

    if (trigger !== -1) {
      setLoadingDataPreview(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentPreviewStageStatus?id=${id.current}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            setDataPreview((prev) => ({
              ...prev,
              name: res2.data.name,
              role: res2.data.role?.name,
              created_at: res2.data.created_at,
              recruitment_stage: res2.data.recruitment_stage,
            }));
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        })
        .finally(() => {
          setLoadingDataPreview(false);
        });
    }
  }, [isAllowedToGetPreviewRecruitment, trigger]);

  // console.log(trigger)
  // console.log(dataPreview)
  return (
    <DrawerCore
      title={dataPreview.name}
      visible={visible}
      onClose={() => {
        setDataPreview({
          id: null,
          name: "",
          role: "",
          created_at: "",
          stage_history: [],
        });
        onvisible(false);
      }}
      buttonUpdateText={"Lihat Detail"}
      onClick={() => rt.push(`/admin/recruitment/${id.current}`)}
      disabled={!isAllowedToGetRecruitment}
    >
      <Spin spinning={loadingDataPreview}>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between mb-6">
            <div className="flex flex-col space-y-2">
              <p className="mig-caption--medium text-mono80">Role</p>
              <p>{dataPreview.role ?? "-"}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="mig-caption--medium text-mono80">Tanggal Daftar</p>
              <p>
                {dataPreview.created_at
                  ? `${moment(dataPreview.created_at).format("LL")}, ${moment(
                      dataPreview.created_at
                    ).format("LT")}`
                  : "-"}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="mig-caption--medium text-mono80">Stage</p>
            {dataPreview.recruitment_stage?.length > 0 ? (
              <Timeline className="mt-6">
                {/* loop stage history */}
                {dataPreview.recruitment_stage?.map((stage, idx) => (
                  <Timeline.Item key={idx} color="#35763B">
                    <p>{stage.name}</p>
                    <p className="mig-caption--medium text-mono80">
                      {moment(stage.updated_at).format("ll")},&nbsp;
                      {moment(stage.updated_at).format("LT")}
                    </p>
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              <div className="mt-2">-</div>
            )}
          </div>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerCandidatePreview;
