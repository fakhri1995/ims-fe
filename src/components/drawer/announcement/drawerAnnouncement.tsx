import { DatePicker, Form, Input, Select, Spin, notification } from "antd";
import CheckableTag from "antd/lib/tag/CheckableTag";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_ADD,
  ANNOUNCEMENT_UPDATE,
  ATTENDANCE_SHIFTS_GET,
  ATTENDANCE_SHIFT_ADD,
  ATTENDANCE_SHIFT_UPDATE,
} from "lib/features";

import {
  AnnouncementService,
  IAddAnnouncementPayload,
  IUpdateAnnouncementPayload,
} from "apis/announcement";
import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import {
  IAddShiftPayload,
  IUpdateShiftPayload,
} from "apis/attendance/attendance-shift.types";

import DrawerCore from "../drawerCore";

const DrawerAnnouncement = ({ visible, onvisible, data = null }) => {
  /**
   * Dependencies
   */
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToAddAnnouncement = hasPermission(ANNOUNCEMENT_ADD);
  const isAllowedToUpdateAnnouncement = hasPermission(ANNOUNCEMENT_UPDATE);

  const [instanceForm] = Form.useForm();

  //1. USE STATE
  //1.1 Update
  const [dataAnnouncement, setDataAnnouncement] =
    useState<IUpdateAnnouncementPayload>({
      _method: "PUT",
      id: -1,
      title: "",
      text: "",
      publish_type: "now",
    });

  // 2. USE EFFECT
  // 2.1. set initial dataAnnouncement from data
  // useEffect(() => {
  //   if (visible && data) {
  //     setDataAnnouncement({
  //       ...data,
  //       start_at: data?.start_at?.slice(0, 5),
  //       end_at: data?.end_at?.slice(0, 5),
  //       start_break: data?.start_break?.slice(0, 5),
  //       end_break: data?.end_break?.slice(0, 5),
  //     });
  //   }
  // }, [data, visible]);

  //3. HANDLER
  const onChangeInput = (e) => {
    setDataAnnouncement({
      ...dataAnnouncement,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setDataAnnouncement({
      _method: "PUT",
      id: -1,
      title: "",
      text: "",
      publish_type: "now",
    });
    onvisible(false);
  };

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  const { mutate: addAnnouncement, isLoading: loadingAddAnnouncement } =
    useMutation(
      (payload: IAddAnnouncementPayload) =>
        AnnouncementService.addAnnouncement(
          isAllowedToAddAnnouncement,
          axiosClient,
          payload
        ),
      {
        onSuccess: (response) => {
          onMutationSucceed(ANNOUNCEMENTS_GET, response.data.message);
          handleClose();
        },
        onError: (error) => {
          notification.error({ message: "Gagal menambah pesan pengumuman." });
        },
      }
    );

  const { mutate: updateAnnouncement, isLoading: loadingUpdateAnnouncement } =
    useMutation(
      (payload: IUpdateAnnouncementPayload) =>
        AnnouncementService.updateAnnouncement(
          isAllowedToUpdateAnnouncement,
          axiosClient,
          payload
        ),
      {
        onSuccess: (response) => {
          onMutationSucceed(ANNOUNCEMENTS_GET, response.data.message);
          handleClose();
        },
        onError: (error) => {
          notification.error({ message: "Gagal mengubah pesan pengumuman." });
        },
      }
    );

  return (
    <DrawerCore
      title={!data ? "Buat Pesan" : "Edit Pesan"}
      visible={visible}
      onClose={handleClose}
      buttonOkText={"Simpan"}
      onClick={() =>
        !data
          ? addAnnouncement(dataAnnouncement)
          : updateAnnouncement(dataAnnouncement)
      }
      disabled={
        (!data
          ? !isAllowedToAddAnnouncement
          : !isAllowedToUpdateAnnouncement) || !dataAnnouncement?.title
      }
    >
      <Spin spinning={!data ? null : loadingUpdateAnnouncement}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>
          <Form layout="vertical" form={instanceForm}>
            <div>
              <Form.Item
                label="Judul Pesan"
                name={"title"}
                rules={[
                  {
                    required: true,
                    message: "Judul Pesan Wajib Diisi",
                  },
                ]}
                className="col-span-2"
              >
                <div>
                  <Input
                    value={dataAnnouncement.title}
                    name={"title"}
                    onChange={onChangeInput}
                    placeholder="Masukkan Judul Pesan..."
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Thumbnail Pesan"
                name={"thumbnail_image"}
                rules={[
                  {
                    required: true,
                    message: "Thubnail Pesan Wajib Diisi",
                  },
                ]}
                className="col-span-2"
              >
                <div>
                  <Input
                    value={dataAnnouncement.title}
                    name={"title"}
                    onChange={onChangeInput}
                    placeholder="Masukkan Judul Pesan..."
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Isi Pesan"
                name={"text"}
                rules={[
                  {
                    required: true,
                    message: "Isi Pesan Wajib Diisi",
                  },
                ]}
                className="col-span-2"
              >
                <div>
                  <Input
                    value={dataAnnouncement.title}
                    name={"title"}
                    onChange={onChangeInput}
                    placeholder="Masukkan Judul Pesan..."
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Jadwalkan Pengiriman"
                name={"publihs_at"}
                rules={[
                  {
                    required: true,
                    message: "Wajib diisi",
                  },
                ]}
                className="col-span-2"
              >
                <div className="flex items-center">
                  <CheckableTag
                    checked={dataAnnouncement?.publish_type === "now"}
                    onChange={(checked) => {
                      setDataAnnouncement((prev) => ({
                        ...prev,
                        publish_type: checked ? "now" : "pending",
                      }));
                    }}
                    className="border border-primary100 py-1 px-3 rounded-full mb-2"
                  >
                    <div className="flex flex-row items-center space-x-1">
                      <p>Sekarang</p>
                    </div>
                  </CheckableTag>

                  <CheckableTag
                    checked={dataAnnouncement?.publish_type === "pending"}
                    className="border border-primary100 py-1 px-3 rounded-full mb-2"
                    onChange={(checked) => {
                      if (checked) {
                        setDataAnnouncement((prev) => ({
                          ...prev,
                          publish_type: "pending",
                        }));
                      }
                    }}
                  >
                    <div className="flex flex-row items-center space-x-1">
                      <p>Atur Jadwal</p>
                    </div>
                  </CheckableTag>
                </div>
              </Form.Item>
              {/* {dataAnnouncement.publish_type === "pending" && (
                <>
                  <Form.Item
                    label="Tangal & Waktu"
                    name={"publish_at"}
                    rules={[
                      {
                        required: true,
                        message: "Tangal & Waktu wajib diisi",
                      },

                    ]}
                    className="col-span-2"
                  >
                    <DatePicker
                      locale={locale}
                      picker="date"
                      className="w-full"
                      format={"DD MMMM YYYY"}
                      placeholder={["Mulai", "Akhir"]}
                      disabledDate={(current) => {
                        return (
                          moment(current) < moment(dataSchedule?.date) ||
                          moment(current).diff(
                            moment(dataSchedule.start_date),
                            "days"
                          ) > MAX_SCHEDULED_DAYS
                        );
                      }}
                      value={[
                        moment(dataSchedule.start_date).isValid()
                          ? moment(dataSchedule.start_date)
                          : null,
                        moment(dataSchedule.end_date).isValid()
                          ? moment(dataSchedule.end_date)
                          : null,
                      ]}
                      onChange={(values) => {
                        let formattedStartDate = moment(values?.[0]).isValid()
                          ? moment(values?.[0]).format("YYYY-MM-DD")
                          : null;

                        let formattedEndDate = moment(values?.[1]).isValid()
                          ? moment(values?.[1]).format("YYYY-MM-DD")
                          : null;

                        setDataSchedule((prev) => ({
                          ...prev,
                          start_date: formattedStartDate,
                          end_date: formattedEndDate,
                        }));
                      }}
                    />
                  </Form.Item>

                  {isRepetition &&
                    dataSchedule?.start_date < dataSchedule?.date && (
                      <div className="flex items-center gap-2 bg-warning px-4 py-3 rounded-md mb-6">
                        <AlerttriangleIconSvg color={"#FFF"} size={20} />
                        <p className="text-white">
                          <b>Tanggal Mulai Repetisi</b> harus melebihi{" "}
                          <b>Tanggal Berlaku</b>!
                        </p>
                      </div>
                    )}
                </>
              )} */}
            </div>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerAnnouncement;
