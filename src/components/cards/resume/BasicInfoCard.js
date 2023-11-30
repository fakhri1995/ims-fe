import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Form, Input, Select, Spin, Switch, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

import { AccessControl } from "components/features/AccessControl";

import { RESUME_DELETE, RESUME_GET } from "lib/features";

import {
  beforeUploadFileMaxSize,
  generateStaticAssetUrl,
} from "../../../lib/helper";
import { ResumePDFTemplate } from "../../../pages/admin/candidates/[candidateId]";
import ButtonSys from "../../button";
import {
  CheckIconSvg,
  DownloadIcon2Svg,
  EditIconSvg,
  EmailIconSvg,
  InfoCircleIconSvg,
  MappinIconSvg,
  OneUserIconSvg,
  PhoneIconSvg,
} from "../../icon";
import ModalCore from "../../modal/modalCore";
import { ModalHapus2 } from "../../modal/modalCustom";

const BasicInfoCard = ({
  dataDisplay,
  handleUpdate,
  dataUpdateBasic,
  setDataUpdateBasic,
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
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [showLogoStatus, setShowLogoStatus] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [uploadPictureLoading, setUploadPictureLoading] = useState(false);
  const onChangeInput = (e) => {
    setDataUpdateBasic({
      ...dataUpdateBasic,
      [e.target.name]: e.target?.value,
    });
  };

  /** State to only renders `<PDFDownloadLink>` component after this page mount (client-side) */
  const [isOnClient, setIsOnClient] = useState(false);
  useEffect(() => {
    setIsOnClient(true);
  }, []);

  // Display profile photo filename when available
  useEffect(() => {
    if (dataDisplay?.profile_image?.link) {
      const currentFileName = dataDisplay?.profile_image?.link?.split("/")[2];
      setFileList([{ name: currentFileName }]);
    } else {
      setFileList([]);
    }
  }, [dataDisplay?.profile_image]);

  // Handle upload file
  const beforeUploadIDCardPicture = useCallback((uploadedFile) => {
    const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
    const isReachedMaxFileSize =
      checkMaxFileSizeFilter(uploadedFile) === Upload.LIST_IGNORE;
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

    setDataUpdateBasic((prev) => ({
      ...prev,
      profile_image: uploadedFile,
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
    setDataUpdateBasic((prev) => ({
      ...prev,
      profile_image: null,
    }));
  }, []);

  // console.log(dataUpdateBasic);
  // console.log(dataDisplay)

  return (
    <>
      {isShowInput || isCreateForm ? (
        <div className=" shadow-lg rounded-md bg-white p-5">
          <div className="flex flex-row items-center justify-between mb-4 ">
            <h3 className="mig-heading--3">Basic Information</h3>
            <div
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 
          md:space-x-6 items-end md:items-center"
            >
              <ButtonSys
                type={"default"}
                color={"danger"}
                onClick={() => {
                  isCreateForm
                    ? rt.back()
                    : setDataUpdateBasic({
                        name: dataDisplay?.name,
                        telp: dataDisplay?.telp,
                        email: dataDisplay?.email,
                        assessment_id: dataDisplay?.assessment_id,
                        city: dataDisplay?.city,
                        province: dataDisplay?.province,
                      });
                  setIsShowInput(false);
                }}
              >
                <div className="flex flex-row space-x-2">
                  <CloseOutlined rev={""} />
                  <p>Batalkan</p>
                </div>
              </ButtonSys>
              <ButtonSys
                type={"primary"}
                className="flex flex-row"
                onClick={() => {
                  isCreateForm
                    ? handleUpdate()
                    : handleUpdate("basic_information", dataUpdateBasic);
                  setIsShowInput(false);
                }}
                disabled={loadingUpdate}
              >
                <div className="flex flex-row space-x-2 items-center">
                  <CheckIconSvg size={16} color={`white`} />
                  {isCreateForm ? (
                    <p className="whitespace-nowrap">Tambah Kandidat</p>
                  ) : (
                    <p className="whitespace-nowrap">Simpan Kandidat</p>
                  )}
                </div>
              </ButtonSys>
            </div>
          </div>
          <hr />
          {isCreateForm && (
            <div className="px-2.5 py-2 space-x-2.5 flex flex-row items-center mt-4">
              <InfoCircleIconSvg size={20} color={"#35763B"} />
              <p className="text-mono30">
                Harap mengisi <strong>Basic Information</strong> terlebih dahulu
                sebelum menambahkan informasi lainnya!
              </p>
            </div>
          )}
          <Form
            layout="vertical"
            form={instanceForm}
            className="md:grid md:grid-cols-2 gap-x-6 md:pt-5"
          >
            <Form.Item
              label="Profile Photo"
              className="relative col-span-2 w-full"
            >
              <em className="text-mono50 mr-10">
                Unggah File JPEG (Maksimal 2 MB)
              </em>
              <Upload
                accept=".png, .jpg, .jpeg"
                listType="picture"
                maxCount={1}
                beforeUpload={beforeUploadIDCardPicture}
                onChange={onUploadChange}
                onRemove={onUploadRemove}
                disabled={uploadPictureLoading}
                fileList={fileList}
              >
                <Button
                  className="btn-sm btn font-semibold px-6 space-x-2 border
            text-primary100 hover:text-white bg-white border-primary100 
            hover:bg-primary75 hover:border-primary75  
            focus:border-primary75 focus:text-primary100 "
                >
                  <UploadOutlined />
                  <p>Unggah File</p>
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Name"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Nama kandidat wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={dataUpdateBasic?.name}
                  name={"name"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>
            <Form.Item
              label="Role"
              name={"role"}
              rules={[
                {
                  required: true,
                  message: "Role kandidat wajib diisi",
                },
              ]}
            >
              <div>
                <Select
                  defaultValue={dataUpdateBasic.assessment_id}
                  onChange={(value) => {
                    setDataUpdateBasic({
                      ...dataUpdateBasic,
                      assessment_id: value,
                    });
                  }}
                  disabled={isGuest}
                >
                  {assessmentRoles?.map((role) => (
                    <Select.Option key={role.id} value={role.id}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email kandidat wajib diisi",
                },
                {
                  pattern:
                    /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                  message: "Email belum diisi dengan benar",
                },
              ]}
            >
              <div>
                <Input
                  value={dataUpdateBasic?.email}
                  name={"email"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name={"telp"}
              rules={[
                {
                  required: true,
                  message: "Nomor HP wajib diisi",
                },
                {
                  pattern: /[0-9]+/,
                  message: "Nomor HP hanya boleh diisi dengan angka",
                },
              ]}
            >
              <div>
                <Input
                  value={dataUpdateBasic?.telp}
                  name={"telp"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>
            <Form.Item
              label="Address"
              name={"address"}
              rules={[
                {
                  required: true,
                  message: "Alamat kandidat wajib diisi",
                },
              ]}
            >
              <div className="flex flex-row space-x-3">
                <Input
                  value={dataUpdateBasic?.city}
                  name={"city"}
                  placeholder="City"
                  onChange={onChangeInput}
                />
                <Input
                  value={dataUpdateBasic?.province}
                  name={"province"}
                  placeholder="Province"
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 shadow-lg rounded-md bg-white p-5">
          <div className="flex justify-center">
            {dataDisplay?.profile_image?.id ? (
              <img
                src={generateStaticAssetUrl(dataDisplay?.profile_image?.link)}
                alt={dataDisplay?.profile_image?.description}
                className="w-24 h-32 bg-cover object-cover shadow-lg rounded-md flex items-center justify-center"
              />
            ) : (
              <div className="w-24 h-32 shadow-lg rounded-md flex items-center justify-center">
                <OneUserIconSvg size={100} color={"black"} strokeWidth={1} />
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="flex flex-row items-center justify-between mb-4 ">
              <div className="flex flex-row space-x-2">
                <h3 className="mig-heading--3">{dataDisplay?.name}</h3>
                {isAllowedToUpdateCandidate && (
                  <button
                    onClick={() => {
                      setDataUpdateBasic({
                        name: dataDisplay?.name,
                        telp: dataDisplay?.telp,
                        email: dataDisplay?.email,
                        assessment_id: dataDisplay?.assessment_id,
                        city: dataDisplay?.city,
                        province: dataDisplay?.province,
                      });
                      setIsShowInput(true);
                    }}
                    disabled={!isAllowedToUpdateCandidate}
                    className="bg-transparent flex items-center hover:opacity-75"
                  >
                    <EditIconSvg size={18} color={"#4D4D4D"} />
                  </button>
                )}
              </div>

              <div
                className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 
                items-end lg:items-center"
              >
                {!isGuest && (
                  <ButtonSys
                    type={isAllowedToDeleteCandidate ? "default" : "primary"}
                    color="danger"
                    disabled={!isAllowedToDeleteCandidate}
                    onClick={() => setModalDelete(true)}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <DeleteOutlined rev={""} />
                      <p className="whitespace-nowrap">Remove Candidate</p>
                    </div>
                  </ButtonSys>
                )}
                {!isGuest && isOnClient && (
                  <ButtonSys
                    type={"default"}
                    onClick={() => setOpenDownloadModal(true)}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <DownloadOutlined rev={""} />
                      <p className="whitespace-nowrap">Download Resume</p>
                    </div>
                  </ButtonSys>
                )}
                {isGuest && (
                  <ButtonSys
                    type={"primary"}
                    onClick={() => rt.push("/myApplication")}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <CheckIconSvg size={16} color={"white"} />
                      <p>Selesai</p>
                    </div>
                  </ButtonSys>
                )}
              </div>
            </div>
            <hr />
            <Spin spinning={praloading}>
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex flex-col mt-3">
                  <p className="text-xs text-gray-300 mb-2">Role</p>
                  <div className="flex flex-row items-center space-x-2">
                    <OneUserIconSvg size={18} color="#4D4D4D" />
                    <p>{dataDisplay?.assessment?.name}</p>
                  </div>
                </div>
                <div className="flex flex-col mt-3">
                  <p className="text-xs text-gray-300 mb-2">Phone Number</p>
                  <div className="flex flex-row items-center space-x-2">
                    <PhoneIconSvg size={18} color="#4D4D4D" />
                    <p>{dataDisplay?.telp}</p>
                  </div>
                </div>
                <div className="flex flex-col mt-3">
                  <p className="text-xs text-gray-300 mb-2">Email</p>
                  <div className="flex flex-row items-center space-x-2">
                    <EmailIconSvg size={18} color="#4D4D4D" />
                    <p>{dataDisplay?.email}</p>
                  </div>
                </div>
                <div className="flex flex-col mt-3">
                  <p className="text-xs text-gray-300 mb-2">Address</p>
                  <div className="flex flex-row items-center space-x-2">
                    <MappinIconSvg size={18} color="#4D4D4D" />
                    <p>
                      {dataDisplay?.city}, {dataDisplay?.province}
                    </p>
                  </div>
                </div>
              </div>
            </Spin>
          </div>
        </div>
      )}

      <AccessControl hasPermission={RESUME_GET}>
        <ModalCore
          title={"Unduh Resume"}
          visible={openDownloadModal}
          onCancel={() => setOpenDownloadModal(false)}
          footer={<></>}
        >
          <div className="flex flex-col space-y-5 ml-1">
            <p className="">
              Klik untuk mengunduh resume kandidat dengan nama&nbsp;
              <strong>{dataDisplay?.name}</strong>
            </p>
            <div className={"mt-6 flex"}>
              <Switch
                checked={showLogoStatus}
                onChange={() => setShowLogoStatus(!showLogoStatus)}
              />
              <p className={"ml-4 text-mono30 text-xs self-center"}>
                {showLogoStatus
                  ? "Menampilkan Logo Migsys"
                  : "Tidak Menampilkan Logo Migsys"}
              </p>
            </div>
            <div className={"flex self-end"}>
              <p
                onClick={() => setOpenDownloadModal(false)}
                className={
                  "flex items-center mr-8 text-xs text-mono50 cursor-pointer"
                }
              >
                Batalkan
              </p>
              <PDFDownloadLink
                document={
                  <ResumePDFTemplate
                    dataResume={dataDisplay}
                    logoStatus={showLogoStatus}
                  />
                }
                fileName={`CV-${dataDisplay?.assessment?.name}-${dataDisplay?.name}.pdf`}
              >
                <ButtonSys
                  type={"primary"}
                  // onClick={() => rt.push('/admin/candidates/pdfTemplate')}
                >
                  <div className={"flex flex-row"}>
                    <DownloadIcon2Svg size={16} color={"#fffffff"} />
                    <p className={"ml-2 text-xs text-white"}>Unduh Resume</p>
                  </div>
                </ButtonSys>
              </PDFDownloadLink>
            </div>
          </div>
        </ModalCore>
      </AccessControl>
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
            dengan nama <strong>{dataDisplay?.name}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </>
  );
};

export default BasicInfoCard;
