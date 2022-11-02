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
import { RECRUITMENT_GET } from "lib/features";

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
  // const isAllowedToGetRecruitmentLog = hasPermission(
  //   RECRUITMENT_EMAIL_TEMPLATES_LIST_GET
  // );

  //USESTATE
  const [dataPreview, setDataPreview] = useState({
    name: "",
    role: "",
    created_at: "",
    stage_history: [],
  });

  const [loadingDataPreview, setLoadingDataPreview] = useState(false);

  // useEffect
  // 3.1. Get Recruitment Preview Data
  useEffect(() => {
    if (!isAllowedToGetRecruitment) {
      permissionWarningNotification("Mendapatkan", "Data Recruitment");
      setLoadingDataPreview(false);
      return;
    }

    if (trigger !== -1) {
      setLoadingDataPreview(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitment?id=${id.current}`,
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
              // stage_history: ""
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
  }, [isAllowedToGetRecruitment, trigger]);

  //HANDLER
  const handleSendEmail = () => {
    if (!isAllowedToSendEmail) {
      permissionWarningNotification("Mengirim", "email kepada kandidat");
      return;
    }
    setLoadingSendEmail(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sendEmail`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPreview),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Email berhasil dikirim.`,
            duration: 3,
          });
          setTimeout(() => {
            onvisible(false);
            setDataPreview({});
          }, 500);
        } else {
          notification.error({
            message: `Gagal mengirim email. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingSendEmail(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengirim email. ${err.response}`,
          duration: 3,
        });
        setLoadingSendEmail(false);
      });
  };

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
              <p>{dataPreview.role}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="mig-caption--medium text-mono80">Tanggal Daftar</p>
              <p>
                {moment(dataPreview.created_at).format("LL")},&nbsp;
                {moment(dataPreview.created_at).format("LT")}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="mig-caption--medium text-mono80 mb-6">Stage</p>
            <Timeline>
              {/* loop stage history */}
              <Timeline.Item color="#35763B">
                <p>Technical Test</p>
                <p className="mig-caption--medium text-mono80">
                  12 Jan 2022, 16:00
                </p>
              </Timeline.Item>
              <Timeline.Item color="#35763B">
                <p>Technical Test</p>
                <p className="mig-caption--medium text-mono80">
                  12 Jan 2022, 16:00
                </p>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerCandidatePreview;
