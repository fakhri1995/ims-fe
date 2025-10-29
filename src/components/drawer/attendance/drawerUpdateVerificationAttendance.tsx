import { Checkbox, Form, Input, Select, Spin, Tag, notification } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "lib/helper";

import DrawerCore from "../drawerCore";

const DrawerUpdateVerificationAttendance = ({
  getData,
  id,
  data,
  visible,
  onvisible,
  initProps,
  isAllowedToUpdateVerificationAttendance,
  setLoadingCreate,
  loadingCreate,
}) => {
  const [instanceForm] = Form.useForm();
  const [dataVerificationAttendance, setDataVerificationAttendance] = useState({
    id: null,
    name: null,
    company: null,
    issued_date: null,
    attendance_code_name: null,
    attendance_code_color: null,
    supporting_file: [],
    status_verification: null,
  });
  const statusOptions = [
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];
  // USEEFFECT
  // Validate input field

  useEffect(() => {
    if (!data) {
      return;
    }
    setDataVerificationAttendance({
      ...dataVerificationAttendance,
      id: data.id,
      name: data.attendance_user?.user?.name,
      company: data.attendance_user?.attendance_code?.company?.name,
      issued_date: data?.created_at,
      attendance_code_name: data.attendance_user?.attendance_code?.name,
      attendance_code_color: data.attendance_user?.attendance_code?.color,
      supporting_file: data?.supporting_file,
      status_verification: data?.status_verification,
    });
    // instanceForm.setFieldsValue({
    //   charge_code_name: data.name,
    //   description: data.description,
    //   color: data.color,
    // });
  }, [data]);

  const clearData = () => {
    setDataVerificationAttendance({
      id: null,
      name: null,
      company: null,
      issued_date: null,
      attendance_code_name: null,
      attendance_code_color: null,
      supporting_file: [],
      status_verification: null,
    });
  };

  const handleUpdateVerification = () => {
    const payload = {
      id: Number(id),
      status_verification: dataVerificationAttendance.status_verification,
    };
    // console.log('Json stringify ', JSON.stringify(payload))
    setLoadingCreate(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateVerificationAttendance`,
      {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((response2) => {
        setLoadingCreate(false);
        if (response2.status == 200) {
          getData();
          cancelClick();
          notification.success({
            message: `Verification Attendance has successfully updated`,
            duration: 3,
            // onClose: () => {
            //   rt.push("/company/workdayschedule/");
            // },
          });
        } else {
          notification.error({
            message: `Update Verification Attendance has failed. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingCreate(false);
        notification.error({
          message: `Update Verification Attendance has failed. ${err.response}`,
          duration: 3,
        });
      });
  };

  const cancelClick = () => {
    clearData();
    onvisible(false);
  };
  const handleClickButton = () => {
    // validasi dan ambil value form
    if (!isAllowedToUpdateVerificationAttendance) {
      permissionWarningNotification("Update", "Verification Attendance");
      return;
    }
    handleUpdateVerification();
  };

  return (
    <DrawerCore
      // width={550}
      title={"Edit Verification Status"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Save Changes"}
      onClick={handleClickButton}
      disabled={isAllowedToUpdateVerificationAttendance ? false : true}
      buttonCancelText={"Cancel"}
      onButtonCancelClicked={cancelClick}
      loading={loadingCreate}
    >
      <Spin spinning={loadingCreate}>
        <div className="flex flex-col gap-4">
          <p className=" text-red-500 text-xs italic">
            *This information is required to filled
          </p>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-xs/5 font-medium font-inter text-[#4D4D4D]"}>
              Name
            </p>
            <div className={"w-full bg-[#F3F3F3] rounded-[4px] px-3 py-1"}>
              <p className={"text-[#808080]"}>
                {dataVerificationAttendance?.name}
              </p>
            </div>
          </div>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-xs/5 font-medium font-inter text-[#4D4D4D]"}>
              Company
            </p>
            <div className={"w-full bg-[#F3F3F3] rounded-[4px] px-3 py-1"}>
              <p className={"text-[#808080]"}>
                {dataVerificationAttendance?.company}
              </p>
            </div>
          </div>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-xs/5 font-medium font-inter text-[#4D4D4D]"}>
              Issued Date
            </p>
            <div className={"w-full bg-[#F3F3F3] rounded-[4px] px-3 py-1"}>
              <p className={"text-[#808080]"}>
                {dataVerificationAttendance?.issued_date
                  ? moment(dataVerificationAttendance?.issued_date).format(
                      "DD MMMM YYYY"
                    )
                  : "-"}
              </p>
            </div>
          </div>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-xs/5 font-normal font-inter text-[#808080]"}>
              Attendance Code
            </p>
            <div className="inline-flex w-auto">
              <Tag
                color={`${dataVerificationAttendance?.attendance_code_color}1A`}
                style={{
                  color: `${dataVerificationAttendance?.attendance_code_color}`, // ungu tua untuk teks
                  borderRadius: "20px",
                  fontWeight: 600,
                  border: "none",
                  padding: "2px 10px",
                  display: "inline-flex", // 🔥 kunci utama
                  width: "auto",
                }}
              >
                <p
                  className={`text-[${dataVerificationAttendance?.attendance_code_color}]`}
                >
                  {dataVerificationAttendance?.attendance_code_name || ""}
                </p>
              </Tag>
            </div>
          </div>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-xs/5 font-normal font-inter text-[#808080]"}>
              Supporting File
            </p>
            <a
              href={generateStaticAssetUrl(
                dataVerificationAttendance?.supporting_file[0]?.link
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm/6 font-normal font-inter text-[#00589F] hover:underline hover:text-[#2563EB]"
            >
              {/* {dataVerificationAttendance?.supporting_file?.[0]?.link?.split("/").pop().length > 15 ? dataVerificationAttendance?.supporting_file?.[0]?.link?.split("/").pop().slice(0, 15) + "..." : dataVerificationAttendance?.supporting_file?.[0]?.link?.split("/").pop()} */}
              {dataVerificationAttendance?.supporting_file?.[0]?.link
                ?.split("/")
                .pop()}
            </a>
          </div>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-xs/5 font-medium font-inter text-[#4D4D4D]"}>
              Attendance Code *
            </p>
            <Select
              value={dataVerificationAttendance?.status_verification}
              onChange={(val) =>
                setDataVerificationAttendance({
                  ...dataVerificationAttendance,
                  status_verification: val,
                })
              }
              placeholder="Select status"
              options={statusOptions}
            />
          </div>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerUpdateVerificationAttendance;
