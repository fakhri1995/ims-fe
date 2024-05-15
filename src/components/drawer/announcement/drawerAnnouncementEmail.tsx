import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
import moment, { Moment, MomentInput } from "moment";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import "react-quill/dist/quill.snow.css";

import SelectStaffOrGroup from "components/SelectStaffOrGroup";
import RichText from "components/migwebsite/RichText";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_ADD,
  ANNOUNCEMENT_UPDATE,
  GROUPS_GET,
  USERS_GET,
} from "lib/features";
import { beforeUploadFileMaxSize } from "lib/helper";

import {
  AnnouncementService,
  IAddAnnouncementPayload,
  IUpdateAnnouncementPayload,
} from "apis/announcement";
import { UserService } from "apis/user";
import { GroupService } from "apis/user/group.service";

import DrawerCore from "../drawerCore";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const DrawerAnnouncementEmail = ({
  initProps,
  visible,
  onvisible,
  dataAnnouncement = null,
}) => {
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

  console.log({ dataAnnouncement });
  //1. USE STATE
  const [uploadPictureLoading, setUploadPictureLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState([]);

  // 2. USE EFFECT

  //3. HANDLER
  // const onChangeInput = (e) => {
  //   setDataAnnouncement({
  //     ...dataAnnouncement,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleClose = () => {
    // setDataAnnouncement({
    //   // _method: "PUT",
    //   // id: -1,
    //   title: "",
    //   text: "",
    //   publish_type: "now",
    //   publish_at: null,
    // });
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
  // const beforeUploadPicture = useCallback((uploadedFile, fileList) => {
  //   const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
  //   const isReachedMaxFileSize =
  //     checkMaxFileSizeFilter(uploadedFile, fileList) === Upload.LIST_IGNORE;
  //   const allowedFileTypes = [
  //     `image/png`,
  //     `image/jpg`,
  //     `image/jpeg`,
  //     `image/gif`,
  //   ];

  //   if (!allowedFileTypes.includes(uploadedFile.type)) {
  //     notification.error({
  //       message: "File harus berupa gambar",
  //     });
  //     return Upload.LIST_IGNORE;
  //   }

  //   if (isReachedMaxFileSize) {
  //     return Upload.LIST_IGNORE;
  //   }

  //   setDataAnnouncement((prev) => ({
  //     ...prev,
  //     thumbnail_image: uploadedFile,
  //   }));
  // }, []);

  const onUploadChange = useCallback(({ file }) => {
    setUploadPictureLoading(file.status === "uploading");
    if (file.status !== "removed") {
      setFileList([file]);
    }
  }, []);

  // const onUploadRemove = useCallback(() => {
  //   setFileList([]);
  //   setDataAnnouncement((prev) => ({
  //     ...prev,
  //     thumbnail_image: null,
  //   }));
  // }, []);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {uploadPictureLoading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );

  // console.log({ dataAnnouncement });
  return (
    <DrawerCore
      title={"Kirim Pesan Melalui Email"}
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
        !isAllowedToAddAnnouncement ||
        !dataAnnouncement?.title ||
        !dataAnnouncement?.text
      }
    >
      <Spin spinning={!dataAnnouncement ? null : loadingUpdateAnnouncement}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>

          <Form layout="vertical" form={instanceForm} id="formPesan">
            <div>
              <SelectStaffOrGroup
                title="Pesan Untuk :"
                dataProfile={{}}
                initProps={initProps}
              />
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
                    value={dataAnnouncement?.title}
                    disabled
                    name={"title"}
                    placeholder="Masukkan Judul Pesan..."
                  />
                </div>
              </Form.Item>

              {/* <Form.Item
                label="Thumbnail Pesan"
                name={"thumbnail_image"}
                className="col-span-2">
                <>
                  <p className="text-mono50 mr-10 mb-4">
                    <em>
                      Unggah Gambar (Maksimal 5 MB dengan format PNG / JPG /
                      JPEG / GIF)
                    </em>
                  </p>
                  <Upload
                    accept=".png, .jpg, .jpeg, .gif"
                    listType="picture-card"
                    maxCount={1}
                    // showUploadList={false}
                    beforeUpload={beforeUploadPicture}
                    onChange={onUploadChange}
                    onRemove={onUploadRemove}
                    disabled={uploadPictureLoading}
                    fileList={fileList}>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="thumbnail"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </>
              </Form.Item> */}

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
                <RichText
                  initProps={initProps}
                  placeholder={"Isi Pesan..."}
                  value={dataAnnouncement?.text}
                  onChange={(value) => {
                    // setDataAnnouncement((prev) => ({
                    //   ...prev,
                    //   text: value,
                    // }));
                  }}
                />
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
                        // setDataAnnouncement((prev) => ({
                        //   ...prev,
                        //   publish_type: "now",
                        // }));
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
                        // setDataAnnouncement((prev) => ({
                        //   ...prev,
                        //   publish_type: "pending",
                        // }));
                      }
                    }}
                  >
                    <div className="flex flex-row items-center space-x-1">
                      <p>Atur Jadwal</p>
                    </div>
                  </Radio>
                </div>
              </Form.Item>

              {dataAnnouncement?.publish_type === "pending" && (
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
                    valuePropName={"date"}
                  >
                    <DatePicker
                      locale={locale}
                      picker="date"
                      showTime
                      className="w-full"
                      format={"DD MMMM YYYY HH:mm"}
                      placeholder={"Pilih Tanggal & Waktu Kirim"}
                      value={
                        moment(
                          dataAnnouncement.publish_at,
                          "YYYY-MM-DD HH:mm:ss"
                        ).isValid()
                          ? moment(dataAnnouncement.publish_at)
                          : null
                      }
                      onChange={(value) => {
                        // console.log({ value });
                        let formattedDate = moment(
                          value as MomentInput
                        ).isValid()
                          ? moment(value as MomentInput).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          : null;

                        // setDataAnnouncement((prev) => ({
                        //   ...prev,
                        //   publish_at: formattedDate,
                        // }));
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

export default DrawerAnnouncementEmail;
