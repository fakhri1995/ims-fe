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
import { SendIconSvg } from "components/icon";
import RichText from "components/migwebsite/RichText";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ANNOUNCEMENT_MAIL_GET, ANNOUNCEMENT_MAIL_SEND } from "lib/features";
import {
  beforeUploadFileMaxSize,
  generateStaticAssetUrl,
  notificationError,
  onMutationSucceed,
} from "lib/helper";

import {
  AnnouncementService,
  SendMailAnnouncementPayload,
} from "apis/announcement";

import DrawerCore from "../drawerCore";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const DrawerAnnouncementEmail = ({
  initProps,
  visible,
  onvisible,
  announcementId = -1,
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

  const isAllowedToSendAnnouncement = hasPermission(ANNOUNCEMENT_MAIL_SEND);

  const [instanceForm] = Form.useForm();

  //1. USE STATE
  const dataForm = {
    id: announcementId, // id announcement
    purpose_type: "staff", // staff || group
    purpose_ids: [], // array (id user || id group)
    publish_type: "now", // now || pending
    publish_at: "", // Y-m-d H:i | required if publish_type is pending
  };

  const [imageUrl, setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState([]);
  const [dataMail, setDataMail] =
    useState<SendMailAnnouncementPayload>(dataForm);
  const [selectedStaffs, setSelectedStaffs] = useState([]);

  // 2. USE EFFECT

  useEffect(() => {
    if (dataAnnouncement?.thumbnail_image?.link) {
      setImageUrl(
        generateStaticAssetUrl(dataAnnouncement?.thumbnail_image?.link)
      );
    }
  }, [dataAnnouncement?.thumbnail_image]);

  const handleClose = () => {
    setDataMail(dataForm);
    instanceForm.resetFields();
    setSelectedStaffs([]);
    onvisible(false);
  };

  const {
    mutate: sendMailAnnouncement,
    isLoading: loadingSendMailAnnouncement,
  } = useMutation({
    mutationFn: () => {
      let payload = {
        ...dataMail,
        id: announcementId,
        purpose_ids: selectedStaffs.map((staff) => staff.key),
      };

      return AnnouncementService.sendMailAnnouncement(
        isAllowedToSendAnnouncement,
        axiosClient,
        payload
      );
    },
    onSuccess: (response) => {
      onMutationSucceed(
        queryClient,
        ANNOUNCEMENT_MAIL_GET,
        response.data.message
      );
      handleClose();
    },
    onError: (error) => {
      notificationError({
        message: "Gagal mengirim email pesan pengumuman.",
      });
    },
  });

  return (
    <DrawerCore
      title={"Kirim Pesan Melalui Email"}
      visible={visible}
      onClose={handleClose}
      width={440}
      iconButtonText={<SendIconSvg size={16} color={"#FFF"} />}
      buttonOkText={"Kirim Pesan"}
      buttonCancelText={"Batalkan"}
      onClick={sendMailAnnouncement}
      onButtonCancelClicked={() => onvisible(false)}
      disabled={
        !isAllowedToSendAnnouncement ||
        selectedStaffs?.length < 1 || // disable if "Pesan Untuk" is not yet filled
        (dataMail.publish_type == "pending" && !dataMail.publish_at) // disable if "Tanggal & Waktu Kirim" is not yet filled
      }
      loading={loadingSendMailAnnouncement}
    >
      <Spin spinning={!dataAnnouncement ? null : loadingSendMailAnnouncement}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>

          <Form layout="vertical" form={instanceForm} id="formPesan">
            <div>
              <SelectStaffOrGroup
                title={
                  <p>
                    <span className="required-mark">*</span>Pesan Untuk :
                  </p>
                }
                initProps={initProps}
                selected={selectedStaffs}
                setSelected={setSelectedStaffs}
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

              <Form.Item
                label="Thumbnail Pesan"
                name={"thumbnail_image"}
                className="col-span-2"
              >
                <>
                  {/* <p className="text-mono50 mr-10 mb-4">
                    <em>
                      Unggah Gambar (Maksimal 5 MB dengan format PNG / JPG /
                      JPEG / GIF)
                    </em>
                  </p> */}
                  <Upload
                    accept=".png, .jpg, .jpeg, .gif"
                    listType="picture-card"
                    maxCount={1}
                    disabled={true}
                    fileList={fileList}
                  >
                    {!!imageUrl && (
                      <img
                        src={imageUrl}
                        alt="thumbnail"
                        style={{ width: "100%" }}
                      />
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
                <>
                  <RichText
                    initProps={initProps}
                    placeholder={"Isi Pesan..."}
                    value={dataAnnouncement?.text}
                    readOnly={true}
                  />
                </>
              </Form.Item>

              <Form.Item
                label="Jadwalkan Pengiriman"
                name={"publish_at"}
                rules={[
                  {
                    required: true,
                    message: "Wajib diisi",
                  },
                ]}
                className="col-span-2"
              >
                <div className="flex flex-col gap-4">
                  <Radio
                    checked={dataMail?.publish_type === "now"}
                    onChange={(checked) => {
                      if (checked) {
                        setDataMail((prev) => ({
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
                    checked={dataMail?.publish_type === "pending"}
                    onChange={(checked) => {
                      if (checked) {
                        setDataMail((prev) => ({
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

              {dataMail?.publish_type === "pending" && (
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
                      showTime={{
                        minuteStep: 15,
                      }}
                      className="w-full"
                      format={"DD MMMM YYYY HH:mm"}
                      placeholder={"Pilih Tanggal & Waktu Kirim"}
                      onChange={(value) => {
                        let formattedDate = moment(
                          value as MomentInput
                        ).isValid()
                          ? moment(value as MomentInput).format(
                              "YYYY-MM-DD HH:mm"
                            )
                          : null;

                        setDataMail((prev) => ({
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

export default DrawerAnnouncementEmail;
