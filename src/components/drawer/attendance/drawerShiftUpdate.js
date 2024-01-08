import { DatePicker, Form, Input, Select, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENT_JALUR_DAFTARS_LIST_GET,
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";

import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import DrawerCore from "../drawerCore";

const DrawerShiftUpdate = ({
  visible,
  onvisible,
  initProps,
  setRefresh,
  isAllowedToUpdate,
  data,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const [instanceForm] = Form.useForm();

  //USESTATE
  //1.1 Update
  const [dataUpdate, setDataUpdate] = useState({
    id: null,
    name: "",
    email: "",
    university: "",
    recruitment_role_id: null,
    recruitment_jalur_daftar_id: null,
    recruitment_stage_id: null,
    recruitment_status_id: null,
    lampiran: [],
  });

  const [modalUpdate, setModalUpdate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [disabledUpdate, setDisabledUpdate] = useState(true);

  const [loadingRegistPlatformList, setLoadingRegistPlatformList] =
    useState(false);
  const [loadingRoleList, setLoadingRoleList] = useState([]);
  const [dataRegistPlatformList, setDataRegistPlatformList] = useState([]);
  const [dataRoleList, setDataRoleList] = useState([]);

  // 2. useEffect
  // 2.1. set initial dataUpdate from data
  useEffect(() => {
    setDataUpdate({
      ...dataUpdate,
      id: Number(data.id),
      name: data.name,
      email: data.email,
      university: data.university,
      recruitment_role_id: data.recruitment_role_id,
      recruitment_jalur_daftar_id: data.recruitment_jalur_daftar_id,
      recruitment_stage_id: data.recruitment_stage_id,
      recruitment_status_id: data.recruitment_status_id,
      lampiran: data?.lampiran ?? [],
    });
  }, [data, visible]);

  // 2.2. Validate input field
  useEffect(() => {
    let allFilled = Object.values(dataUpdate).every((value) => value);

    let attachmentIsFilled = dataUpdate?.lampiran?.every(
      (attachment) => attachment.judul_lampiran && attachment.isi_lampiran
    );

    if (allFilled && attachmentIsFilled) {
      setDisabledUpdate(false);
    } else {
      setDisabledUpdate(true);
    }
  }, [dataUpdate]);

  //HANDLER
  const onChangeInput = (e) => {
    setDataUpdate({
      ...dataUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const clearData = () => {
    setDataUpdate({
      id: null,
      name: "",
      email: "",
      university: "",
      recruitment_role_id: null,
      recruitment_jalur_daftar_id: null,
      recruitment_stage_id: null,
      recruitment_status_id: null,
    });
  };

  const handleUpdateRecruitment = () => {
    if (!isAllowedToUpdate) {
      permissionWarningNotification("Mengubah", "Rekrutmen Kandidat");
      return;
    }
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitment`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          setLoadingUpdate(false);
          onvisible(false);
          notification.success({
            message: `Kandidat berhasil diubah.`,
            duration: 3,
          });
          // setTimeout(() => {
          //   clearData()
          // }, 500);
        } else {
          setLoadingUpdate(false);
          notification.error({
            message: `Gagal mengubah kandidat. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification.error({
          message: `Gagal mengubah kandidat. ${err.response}`,
          duration: 3,
        });
      });
  };

  return (
    <DrawerCore
      title={"Edit Shift"}
      visible={visible}
      onClose={() => {
        onvisible(false);
      }}
      buttonOkText={"Simpan Shift"}
      onClick={handleUpdateRecruitment}
      disabled={disabledUpdate}
    >
      <Spin spinning={loadingUpdate}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>
          <Form
            layout="vertical"
            form={instanceForm}
            className="grid grid-cols-2 gap-x-6"
          >
            <Form.Item
              label="Nama Shift"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Nama Shift wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={data.name}
                  name={"name"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Jam Kerja"
              name={"work_time"}
              rules={[
                {
                  required: true,
                  message: "Jam kerja wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <DatePicker.RangePicker
                  allowEmpty
                  // value={[
                  //   moment(dataUpdateEdu.start_date).isValid()
                  //     ? moment(dataUpdateEdu.start_date)
                  //     : null,
                  //   moment(dataUpdateEdu.end_date).isValid()
                  //     ? moment(dataUpdateEdu.end_date)
                  //     : null,
                  // ]}
                  // open={calendarOpen}
                  // onOpenChange={setCalendarOpen}
                  // onCalendarChange={(value, datestring) => {
                  //   let startDate = datestring[0];
                  //   let endDate = datestring[1];
                  //   setDataUpdateEdu((prev) => ({
                  //     ...prev,
                  //     start_date: startDate || "",
                  //     end_date: endDate || "",
                  //     start_date_format: startDate || "",
                  //     end_date_format: endDate || "",
                  //   }));
                  // }}
                  picker="time"
                  className="w-full"
                  // renderExtraFooter={() => (
                  //   <div className="flex justify-end">
                  //     <button
                  //       type="button"
                  //       className="mb-0 bg-transparent text-primary100 hover:text-primary75 cursor-pointer"
                  //       onClick={() => {
                  //         setDataUpdateEdu((prev) => ({
                  //           ...prev,
                  //           end_date: "",
                  //           end_date_format: "",
                  //         }));
                  //         setCalendarOpen(false);
                  //       }}
                  //     >
                  //       Present
                  //     </button>
                  //   </div>
                  // )}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Jam Istirahat"
              name={"break_Time"}
              className="col-span-2"
            >
              <div>
                <DatePicker.RangePicker
                  allowEmpty
                  // value={[
                  //   moment(dataUpdateEdu.start_date).isValid()
                  //     ? moment(dataUpdateEdu.start_date)
                  //     : null,
                  //   moment(dataUpdateEdu.end_date).isValid()
                  //     ? moment(dataUpdateEdu.end_date)
                  //     : null,
                  // ]}
                  // open={calendarOpen}
                  // onOpenChange={setCalendarOpen}
                  // onCalendarChange={(value, datestring) => {
                  //   let startDate = datestring[0];
                  //   let endDate = datestring[1];
                  //   setDataUpdateEdu((prev) => ({
                  //     ...prev,
                  //     start_date: startDate || "",
                  //     end_date: endDate || "",
                  //     start_date_format: startDate || "",
                  //     end_date_format: endDate || "",
                  //   }));
                  // }}
                  picker="time"
                  className="w-full"
                  // renderExtraFooter={() => (
                  //   <div className="flex justify-end">
                  //     <button
                  //       type="button"
                  //       className="mb-0 bg-transparent text-primary100 hover:text-primary75 cursor-pointer"
                  //       onClick={() => {
                  //         setDataUpdateEdu((prev) => ({
                  //           ...prev,
                  //           end_date: "",
                  //           end_date_format: "",
                  //         }));
                  //         setCalendarOpen(false);
                  //       }}
                  //     >
                  //       Present
                  //     </button>
                  //   </div>
                  // )}
                />
              </div>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerShiftUpdate;
