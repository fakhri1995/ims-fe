import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Radio,
  Select,
  Spin,
  Upload,
  notification,
} from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import CheckableTag from "antd/lib/tag/CheckableTag";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import "react-quill/dist/quill.snow.css";

import CustomTextEditor from "components/CustomTextEditor";
import ButtonSys from "components/button";
import { formats, modules } from "components/cards/resume/textEditorConfig";
import { CheckIconSvg } from "components/icon";

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
import { beforeUploadFileMaxSize } from "lib/helper";

import {
  AnnouncementService,
  IAddAnnouncementPayload,
  IUpdateAnnouncementPayload,
} from "apis/announcement";

import DrawerCore from "../drawerCore";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
  const [dataAnnouncement, setDataAnnouncement] =
    useState<IAddAnnouncementPayload>({
      // _method: "PUT",
      // id: -1,
      title: "",
      text: "",
      publish_type: "now",
    });
  const [uploadPictureLoading, setUploadPictureLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState([]);

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
      // _method: "PUT",
      // id: -1,
      title: "",
      text: "",
      publish_type: "now",
    });
    instanceForm.resetFields();
    setFileList([]);
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

  // Handle upload file
  const beforeUploadPicture = useCallback((uploadedFile, fileList) => {
    const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
    const isReachedMaxFileSize =
      checkMaxFileSizeFilter(uploadedFile, fileList) === Upload.LIST_IGNORE;
    const allowedFileTypes = [`image/png`, `image/jpg`, `image/jpeg`];

    if (!allowedFileTypes.includes(uploadedFile.type)) {
      notification.error({
        message: "File harus berupa gambar",
      });
      return Upload.LIST_IGNORE;
    }

    if (isReachedMaxFileSize) {
      return Upload.LIST_IGNORE;
    }

    setDataAnnouncement((prev) => ({
      ...prev,
      thumbnail_image: uploadedFile,
    }));
  }, []);

  const onUploadChange = useCallback(({ file }) => {
    setUploadPictureLoading(file.status === "uploading");
    if (file.status !== "removed") {
      setFileList([file]);
    }
  }, []);

  const onUploadRemove = useCallback(() => {
    setFileList([]);
    setDataAnnouncement((prev) => ({
      ...prev,
      thumbnail_image: null,
    }));
  }, []);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {uploadPictureLoading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );

  return (
    <DrawerCore
      title={!data ? "Buat Pesan" : "Edit Pesan"}
      visible={visible}
      onClose={handleClose}
      width={440}
      buttonOkText={"Simpan"}
      submit={true}
      form="formPesan"
      onClick={
        () => addAnnouncement(dataAnnouncement)
        // !data
        //   ? addAnnouncement(dataAnnouncement)
        //   : updateAnnouncement(dataAnnouncement)
      }
      disabled={
        (!data
          ? !isAllowedToAddAnnouncement
          : !isAllowedToUpdateAnnouncement) ||
        !dataAnnouncement?.title ||
        !dataAnnouncement?.text
      }
    >
      <Spin spinning={!data ? null : loadingUpdateAnnouncement}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>
          <Form layout="vertical" form={instanceForm} id="formPesan">
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
                className="col-span-2"
              >
                <>
                  <p className="text-mono50 mr-10 mb-4">
                    <em>Unggah Gambar (Maksimal 5 MB)</em>
                  </p>
                  <Upload
                    accept=".png, .jpg, .jpeg"
                    listType="picture-card"
                    maxCount={1}
                    // showUploadList={false}
                    beforeUpload={beforeUploadPicture}
                    onChange={onUploadChange}
                    onRemove={onUploadRemove}
                    disabled={uploadPictureLoading}
                    fileList={fileList}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </>
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
                {/* <div> */}
                <ReactQuill
                  theme="snow"
                  // value={dataAnnouncement.text}
                  // modules={modules}
                  // formats={formats}
                  className="h-44 pb-10"
                  onChange={(value) => {
                    setDataAnnouncement((prev) => ({
                      ...prev,
                      text: value,
                    }));
                  }}
                />
                {/* </div> */}
              </Form.Item>

              <Form.Item
                label="Jadwalkan Pengiriman"
                name={"publish_at"}
                // rules={[
                //   {
                //     required: true,
                //     message: "Wajib diisi",
                //   },
                // ]}
                className="col-span-2"
              >
                <div className="flex flex-col gap-4">
                  <Radio
                    checked={dataAnnouncement?.publish_type === "now"}
                    onChange={(checked) => {
                      if (checked) {
                        setDataAnnouncement((prev) => ({
                          ...prev,
                          publish_type: "now",
                        }));
                      }
                    }}
                  >
                    <div className="flex flex-row items-center space-x-1">
                      <p>Sekarang</p>
                    </div>
                  </Radio>

                  <Radio
                    checked={dataAnnouncement?.publish_type === "pending"}
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
                  </Radio>
                </div>
              </Form.Item>

              {dataAnnouncement.publish_type === "pending" && (
                <>
                  <Form.Item
                    label="Tangal & Waktu Kirim"
                    name={"publish_at"}
                    rules={[
                      {
                        required: true,
                        message: "Tangal & Waktu Kirim Wajib Diisi",
                      },
                    ]}
                    className="col-span-2"
                  >
                    <DatePicker
                      locale={locale}
                      // picker="date"
                      showTime
                      className="w-full"
                      format={"DD MMMM YYYY, HH:mm"}
                      placeholder={"Pilih Tanggal & Waktu Kirim"}
                      value={
                        moment(dataAnnouncement.publish_at).isValid()
                          ? moment(dataAnnouncement.publish_at)
                          : null
                      }
                      onChange={(values) => {
                        let formattedDate = moment(values).isValid()
                          ? moment(values).format("YYYY-MM-DD HH:mm:ss")
                          : null;

                        setDataAnnouncement((prev) => ({
                          ...prev,
                          publish_at: formattedDate,
                        }));
                      }}
                    />
                  </Form.Item>
                </>
              )}
            </div>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerAnnouncement;
