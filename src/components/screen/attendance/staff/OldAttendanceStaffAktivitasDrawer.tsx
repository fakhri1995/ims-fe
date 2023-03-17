export const AttendanceStaffAktivitasDrawer = () => {};
// import { CameraOutlined, UploadOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Checkbox,
//   Form,
//   Input,
//   InputNumber,
//   Modal,
//   Select,
//   Skeleton,
//   Upload,
//   UploadProps,
//   notification,
// } from "antd";
// import { UploadChangeParam } from "antd/lib/upload";
// import { RcFile, UploadFile } from "antd/lib/upload/interface";
// import type { AxiosError, AxiosResponse } from "axios";
// import { FC, useCallback, useEffect, useMemo, useState } from "react";
// import { useQuery } from "react-query";

// import DrawerCore from "components/drawer/drawerCore";

// import { useAccessControl } from "contexts/access-control";

// import { useAxiosClient } from "hooks/use-axios-client";

// import {
//   ATTENDANCE_ACTIVITY_ADD,
//   ATTENDANCE_ACTIVITY_DELETE,
//   ATTENDANCE_ACTIVITY_UPDATE,
// } from "lib/features";
// import { getBase64, permissionWarningNotification } from "lib/helper";

// import {
//   FormAktivitasTypes,
//   IAddAttendanceActivityPayload,
//   IUpdateAttendanceActivityPayload,
//   useGetUserAttendanceTodayActivities,
//   useMutateAttendanceActivity,
// } from "apis/attendance";
// import { AuthService, AuthServiceQueryKeys } from "apis/auth";
// import { Detail } from "apis/auth";

// import { AttendanceStaffWebcamModal } from "./AttendanceStaffWebcamModal";

// /**
//  * Component AttendanceStaffAktivitasDrawer's props.
//  */
// export interface IAttendanceStaffAktivitasDrawer {
//   action: "create" | "update";

//   /**
//    * Arg ini diperlukan untuk `action === "update"`.
//    */
//   activityFormId?: number;

//   visible: boolean;
//   onClose: () => void;
// }

// /**
//  * Component AttendanceStaffAktivitasDrawer
//  */
// export const AttendanceStaffAktivitasDrawer: FC<
//   IAttendanceStaffAktivitasDrawer
// > = ({ action = "create", visible, onClose, activityFormId }) => {
//   const [form] = Form.useForm();
//   const axiosClient = useAxiosClient();
//   const { todayActivities, findTodayActivity } =
//     useGetUserAttendanceTodayActivities();
//   const { hasPermission } = useAccessControl();
//   const isAllowedToAddActivity = hasPermission(ATTENDANCE_ACTIVITY_ADD);
//   const isAllowedToUpdateActivity = hasPermission(ATTENDANCE_ACTIVITY_UPDATE);
//   const isAllowedToDeleteActivity = hasPermission(ATTENDANCE_ACTIVITY_DELETE);

//   const {
//     addMutation: {
//       mutate: addAttendanceActivity,
//       isLoading: addMutationLoading,
//     },
//     updateMutation: {
//       mutate: updateAttendanceActivity,
//       isLoading: updateMutationLoading,
//     },
//     deleteMutation: {
//       mutate: deleteAttendanceActivity,
//       isLoading: deleteMutationLoading,
//     },
//   } = useMutateAttendanceActivity();

//   const isOnMutationLoading =
//     addMutationLoading || updateMutationLoading || deleteMutationLoading;

//   const { data: userAttendanceForm, isLoading } = useQuery(
//     [AuthServiceQueryKeys.DETAIL_PROFILE],
//     () => AuthService.whoAmI(axiosClient),
//     {
//       select: (response) => response.data.data.attendance_forms[0],
//     }
//   );

//   const formInitialValue = useMemo(() => {
//     if (userAttendanceForm === undefined) {
//       return {};
//     }

//     return userAttendanceForm.details.reduce((prev, curr) => {
//       let defaultValue;
//       switch (curr.type) {
//         case FormAktivitasTypes.TEKS:
//         case FormAktivitasTypes.PARAGRAPH:
//         case FormAktivitasTypes.DROPDOWN:
//         case FormAktivitasTypes.UNGGAH:
//           defaultValue = "";
//           break;
//         case FormAktivitasTypes.NUMERAL:
//           defaultValue = curr.required ? 0 : undefined;
//           break;
//         case FormAktivitasTypes.CHECKLIST:
//           defaultValue = [];
//           break;
//       }
//       return { ...prev, [curr.key]: defaultValue };
//     }, {});
//   }, [userAttendanceForm]);

//   console.log({ formInitialValue });

//   const onMutationSucceed = useCallback((response: AxiosResponse<any, any>) => {
//     form.resetFields();

//     onClose();

//     notification.success({ message: response.data.message });
//   }, []);

//   const onMutationFailed = useCallback((error: AxiosError) => {
//     notification.error({ message: error.response.data.message });
//   }, []);

//   const handleOnFormSubmitted = useCallback(
//     (formValues?: { [key: string]: any }) => {
//       if (!userAttendanceForm) {
//         return;
//       }

//       if (action === "create") {
//         if (!isAllowedToAddActivity) {
//           permissionWarningNotification("Membuat", "Aktivitas");
//           return;
//         }

//         const payload: IAddAttendanceActivityPayload = {
//           attendance_form_id: userAttendanceForm.id,
//           details: [],
//         };

//         for (const [key, value] of Object.entries(formValues)) {
//           payload.details.push({
//             key,
//             value: _safeCastPayloadValue(value),
//           });
//         }

//         addAttendanceActivity(payload, {
//           onSuccess: onMutationSucceed,
//           onError: onMutationFailed,
//         });
//       } else {
//         if (!isAllowedToUpdateActivity) {
//           permissionWarningNotification("Memperbarui", "Aktivitas");
//           return;
//         }

//         const payload: IUpdateAttendanceActivityPayload = {
//           id: activityFormId,
//           details: [],
//         };

//         for (const [key, value] of Object.entries(formValues)) {
//           payload.details.push({
//             key,
//             value: _safeCastPayloadValue(value),
//           });
//         }

//         updateAttendanceActivity(payload, {
//           onSuccess: onMutationSucceed,
//           onError: onMutationFailed,
//         });
//       }
//     },
//     [
//       activityFormId,
//       userAttendanceForm,
//       isAllowedToAddActivity,
//       isAllowedToUpdateActivity,
//     ]
//   );

//   const handleOnDeleteAktivitas = useCallback(() => {
//     if (action !== "update") {
//       return;
//     }

//     if (!isAllowedToDeleteActivity) {
//       permissionWarningNotification("Menghapus", "Aktivitas");
//       return;
//     }

//     Modal.confirm({
//       centered: true,
//       title: "Perhatian!",
//       content: "Apakah Anda yakin untuk menghapus aktivitas ini?",
//       okText: "Hapus Aktivitas",
//       cancelText: "Kembali",
//       onOk: () => {
//         deleteAttendanceActivity(activityFormId, {
//           onSuccess: onMutationSucceed,
//           onError: onMutationFailed,
//         });
//       },
//       onCancel: () => onClose(),
//     });
//   }, [action, activityFormId, isAllowedToDeleteActivity]);

//   useEffect(() => {
//     /** Always clean up the form fields on close */
//     if (!visible) {
//       form.resetFields();
//     }
//   }, [visible]);

//   useEffect(() => {
//     if (action !== "update" || !todayActivities) {
//       return;
//     }

//     const formFieldsValue = {};

//     const clickedActivityData = findTodayActivity(activityFormId);
//     clickedActivityData.details.forEach((detail) => {
//       const { key, value } = detail;

//       formFieldsValue[key] = value;
//     });

//     form.setFieldsValue(formFieldsValue);
//   }, [form, action, todayActivities]);

//   return (
//     <DrawerCore
//       title={`${action === "create" ? "Masukkan" : "Mengubah"} Aktivitas`}
//       buttonOkText="Simpan Aktivitas"
//       visible={visible}
//       onClose={onClose}
//       onClick={() => form.submit()}
//       buttonCancelText={action === "update" ? "Hapus Aktivitas" : undefined}
//       onButtonCancelClicked={handleOnDeleteAktivitas}
//       disabled={isOnMutationLoading}
//     >
//       <div className="space-y-6">
//         {isLoading && (
//           <div className="flex flex-col space-y-6">
//             <Skeleton active round paragraph={{ rows: 4 }} />
//             <Skeleton active round paragraph={{ rows: 2 }} />
//             <Skeleton active round paragraph={{ rows: 3 }} />
//           </div>
//         )}

//         {!isLoading && !!userAttendanceForm && (
//           <>
//             <em className="text-state1">* Informasi ini harus diisi</em>

//             <Form
//               form={form}
//               initialValues={formInitialValue}
//               layout="vertical"
//               onFinish={handleOnFormSubmitted}
//               validateMessages={{
//                 required: "Field ini harus diisi!",
//               }}
//             >
//               {userAttendanceForm.details.map(
//                 ({ name, description, type, key, list, required }) => {
//                   return (
//                     <Form.Item
//                       label={
//                         <label className="font-bold text-mono30">{name}</label>
//                       }
//                       required={!!required}
//                       key={key}
//                     >
//                       <p className="mb-4 mt-2">{description}</p>

//                       <Form.Item name={key} rules={[{ required }]}>
//                         {_renderDynamicInput(type, list)}
//                       </Form.Item>
//                     </Form.Item>
//                   );
//                 }
//               )}
//             </Form>
//           </>
//         )}
//       </div>
//     </DrawerCore>
//   );
// };

// /**
//  * Generates a child for <Form.Item> component respective to its type argument.
//  *
//  * @private
//  */
// const _renderDynamicInput = (
//   type: FormAktivitasTypes,
//   list?: Pick<Detail, "list">["list"]
// ) => {
//   // START: Upload Field
//   const [uploadPictureLoading, setUploadPictureLoading] = useState(false);

//   /** Uploaded file object. Wrapped as RcFile. Used as payload. */
//   const [uploadedActivityPicture, setUploadedActivityPicture] = useState<
//     RcFile | Blob | File
//   >(null);

//   /** Toggle preview modal on and off. */
//   const [isPreviewActivityPicture, setIsPreviewActivityPicture] =
//     useState(false);

//   /** Either empty string or long long string (base64) from a file (`uploadedActivityPicture`). */
//   const [previewActivityPictureData, setPreviewActivityPictureData] =
//     useState("");

//   const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);
//   const onUploadChange = useCallback(
//     ({ file }: UploadChangeParam<UploadFile<RcFile>>) => {
//       setUploadPictureLoading(file.status === "uploading");

//       if (file.status !== "removed") {
//         setFileList([file]);
//       }
//     },
//     []
//   );
//   const [isWebcamModalShown, setIsWebcamModalShown] = useState(false);

//   /**
//    * Validating uploaded file before finally attached to the paylaod.
//    *
//    * - Size max 5 MiB
//    * - File type should satisfy ["image/png", "image/jpeg"]
//    */
//   const beforeUploadEvidencePicture = useCallback<
//     Pick<UploadProps, "beforeUpload">["beforeUpload"]
//   >((uploadedFile) => {
//     const allowedFileTypes = ["image/png", "image/jpeg"];
//     if (!allowedFileTypes.includes(uploadedFile.type)) {
//       return Upload.LIST_IGNORE;
//     }

//     const fileSizeInMb = Number.parseFloat(
//       (uploadedFile.size / 1024 / 1024).toFixed(4)
//     );
//     if (fileSizeInMb > 5) {
//       notification.error({
//         message: "Ukuran file melebih batas persyaratan!",
//       });
//       return Upload.LIST_IGNORE;
//     }

//     setUploadedActivityPicture(uploadedFile);
//   }, []);

//   const onRemoveActivityPicture = useCallback(() => {
//     setFileList([]);
//     setUploadedActivityPicture(null);
//   }, []);

//   const onPreviewActivityPicture = useCallback(async () => {
//     const previewImageData = (await getBase64(
//       uploadedActivityPicture
//     )) as string;

//     setPreviewActivityPictureData(previewImageData);
//     setIsPreviewActivityPicture(true);
//   }, [uploadedActivityPicture]);

//   const onWebcamModalFinished = useCallback((result: string) => {
//     /**
//      * 1. Set uploaded evidence picture
//      * 2. Set uploaded evidence picture data (base64) for preview purpose
//      */
//     (async () => {
//       const base64ToBlob = await (await fetch(result)).blob();

//       const fileLastModifiedTimestamp = Date.now();
//       const fileName = `capture_${fileLastModifiedTimestamp}.jpeg`;

//       const blobFile = new File([base64ToBlob], "webcam_picture.jpeg", {
//         type: "image/jpeg",
//         lastModified: fileLastModifiedTimestamp,
//       });

//       // Update the image preview component
//       setFileList([
//         {
//           uid: fileLastModifiedTimestamp.toString(),
//           name: fileName,
//           status: "done",
//           url: result,
//         },
//       ]);
//       // Update File payload
//       setUploadedActivityPicture(blobFile);
//       // Set preview base64 data
//       setPreviewActivityPictureData(result);

//       // close the modal
//       setIsWebcamModalShown(false);
//     })();
//   }, []);
//   // END: Upload field

//   switch (type) {
//     case FormAktivitasTypes.TEKS:
//       return <Input name="" type="text" />;

//     case FormAktivitasTypes.PARAGRAPH:
//       return <Input.TextArea />;

//     case FormAktivitasTypes.CHECKLIST:
//       return (
//         <Checkbox.Group className="flex flex-col space-x-0 space-y-4">
//           {list?.map((value, idx) => (
//             <Checkbox value={idx} key={idx}>
//               {value}
//             </Checkbox>
//           ))}
//         </Checkbox.Group>
//       );

//     case FormAktivitasTypes.NUMERAL:
//       return <InputNumber className="w-full" />;

//     case FormAktivitasTypes.DROPDOWN:
//       return (
//         <Select placeholder="Pilih nilai" allowClear>
//           {list?.map((value, idx) => (
//             <Select.Option value={value} key={idx}>
//               {value}
//             </Select.Option>
//           ))}
//         </Select>
//       );

//     case FormAktivitasTypes.UNGGAH:
//       return (
//         <div className="flex flex-col space-y-6">
//           <div className="relative">
//             {/* Gunakan camera */}
//             <div className="flex items-center space-x-5">
//               <Button
//                 className="mig-button mig-button--outlined-primary self-start"
//                 onClick={() => {
//                   setIsWebcamModalShown(true);
//                 }}
//               >
//                 <CameraOutlined />
//                 Ambil Foto
//               </Button>

//               <span className="mig-caption--medium text-mono50">Atau</span>
//             </div>

//             {/* Upload from file */}
//             <Upload
//               capture
//               listType="picture"
//               name="file"
//               accept="image/png, image/jpeg"
//               maxCount={1}
//               beforeUpload={beforeUploadEvidencePicture}
//               onRemove={onRemoveActivityPicture}
//               onPreview={onPreviewActivityPicture}
//               disabled={uploadPictureLoading}
//               fileList={fileList}
//               onChange={onUploadChange}
//             >
//               <Button className="mig-button mig-button--outlined-primary absolute top-0 right-0">
//                 <UploadOutlined />
//                 Unggah File
//               </Button>
//             </Upload>
//           </div>

//           <em className="text-mono50">Unggah File JPEG (Maksimal 5 MB)</em>
//           <Modal
//             title="Foto Aktivitas"
//             visible={isPreviewActivityPicture}
//             footer={null}
//             onCancel={() => setIsPreviewActivityPicture(false)}
//             centered
//           >
//             <img
//               alt="Preview Activity Picture"
//               src={previewActivityPictureData}
//             />
//           </Modal>

//           <AttendanceStaffWebcamModal
//             visible={isWebcamModalShown}
//             title="Ambil foto aktivitas"
//             onCancel={() => setIsWebcamModalShown(false)}
//             onOk={onWebcamModalFinished}
//           />
//         </div>
//       );
//   }
// };

// /**
//  * Safely cast the given `value` before we send it to the backend.
//  *
//  * @private
//  */
// const _safeCastPayloadValue = (value: any) => {
//   let mValue;

//   switch (typeof value) {
//     case "number":
//       mValue = value.toString();
//       break;
//     case "undefined":
//     case "string":
//       mValue = value || "";
//       break;
//     default:
//       mValue = value;
//       break;
//   }

//   return mValue;
// };
