import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
  Tabs,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_DEVICES_GET,
  EMPLOYEE_DEVICE_ADD,
  EMPLOYEE_DEVICE_DELETE,
} from "lib/features";

import {
  beforeUploadFileMaxSize,
  getBase64,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import { UploadIconSvg } from "../../../../icon";
import { ModalHapus2 } from "../../../../modal/modalCustom";
import DeviceForm from "./deviceForm";

const InventoryForm = ({
  initProps,
  idx,
  inventoryList,
  setInventoryList,
  inventoryId,
  setRefresh,
  debouncedApiCall,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployeeInventoryDevices =
    hasPermission(EMPLOYEE_DEVICES_GET);
  const isAllowedToAddEmployeeInventoryDevice =
    hasPermission(EMPLOYEE_DEVICE_ADD);
  const isAllowedToDeleteDevice = hasPermission(EMPLOYEE_DEVICE_DELETE);

  const [instanceForm] = Form.useForm();

  // 1. USE STATE
  const [praloading, setpraloading] = useState(true);

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [deviceList, setDeviceList] = useState([]);

  // File upload
  const [assignFileList, setAssignFileList] = useState([]);
  const [returnFileList, setReturnFileList] = useState([]);
  const [uploadAssignDocumentLoading, setUploadAssignDocumentLoading] =
    useState(false);
  const [uploadReturnDocumentLoading, setUploadReturnDocumentLoading] =
    useState(false);

  // Delete device (piranti)
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState({
    deviceId: null,
    deviceName: "",
  });

  // const [refresh, setRefresh] = useState(-1);

  // 2. USE EFFECT
  // Fill devices
  useEffect(() => {
    if (inventoryList[0]?.devices) {
      setDeviceList(inventoryList[0]?.devices);
    }
  }, [inventoryList]);

  // 2.1 Get employee devices
  // useEffect(() => {
  //   if (!isAllowedToGetEmployeeInventoryDevices) {
  //     permissionWarningNotification("Mendapatkan", "Daftar Piranti Karyawan");
  //     setpraloading(false);
  //     return;
  //   }
  //   if (inventoryId) {
  //     setpraloading(true);
  //     fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeDevices?employee_inventory_id=${inventoryId}`,
  //       {
  //         method: `GET`,
  //         headers: {
  //           Authorization: JSON.parse(initProps),
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((response2) => {
  //         if (response2.success) {
  //           setDeviceList([...deviceList, response2.data]);
  //         } else {
  //           notification.error({
  //             message: `${response2.message}`,
  //             duration: 3,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         notification.error({
  //           message: `${err.response}`,
  //           duration: 3,
  //         });
  //       })
  //       .finally(() => setpraloading(false))
  //   }
  // }, [isAllowedToGetEmployeeInventoryDevices, inventoryId, refresh]);

  // 3. HANDLER
  const onChangeInput = (e) => {
    let data = [...inventoryList];
    data[idx][e.target.name] = e.target.value;
    setInventoryList(data);

    if (debouncedApiCall) {
      debouncedApiCall(data[idx]);
    }
  };

  const handleAddNewDevice = () => {
    // let newDataDevice = {
    //   id: null,
    //   employee_inventory_id: null,
    //   id_number: "",
    //   device_name: "",
    //   device_type: "",
    //   serial_number: "",
    // };

    // let newDeviceList = [...deviceList, newDataDevice];
    // setDeviceList(newDeviceList);

    // let dataInventories = [...inventoryList];
    // dataInventories[idx].devices = newDeviceList;
    // setInventoryList(dataInventories);
    const payload = {
      employee_inventory_id: inventoryId,
    };

    if (!isAllowedToAddEmployeeInventoryDevice) {
      permissionWarningNotification("Menambah", "Piranti Karyawan");
      return;
    }

    if (inventoryId) {
      setLoadingAdd(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addEmployeeDevice`, {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            setRefresh((prev) => prev + 1);
          } else {
            notification.error({
              message: `Gagal menambahkan piranti karyawan. ${response2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `Gagal menambahkan piranti karyawan. ${err.response}`,
            duration: 3,
          });
        })
        .finally(() => setLoadingAdd(false));
    }
  };

  const handleDeleteDevice = () => {
    if (!isAllowedToDeleteDevice) {
      permissionWarningNotification("Menghapus", "Piranti Karyawan");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteEmployeeDevice?id=${Number(
        dataModalDelete?.deviceId
      )}&employee_inventory_id=${Number(inventoryId)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setRefresh((prev) => prev + 1);
          notification.success({
            message: res2.message,
            duration: 3,
          });
          setModalDelete(false);
        } else {
          notification.error({
            message: `Gagal menghapus piranti karyawan. ${res2.response}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus piranti karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  const beforeUploadAssignDocument = useCallback((uploadedFile) => {
    const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
    const isReachedMaxFileSize =
      checkMaxFileSizeFilter(uploadedFile) === Upload.LIST_IGNORE;
    const allowedFileTypes = "application/pdf";

    if (uploadedFile.type !== allowedFileTypes) {
      notification.error({
        message: "File harus memilki format .pdf",
      });
      return Upload.LIST_IGNORE;
    }

    if (isReachedMaxFileSize) {
      return Upload.LIST_IGNORE;
    }

    // setUploadedAssignDocument(uploadedFile);

    let data = [...inventoryList];
    data[idx]["delivery_file"] = uploadedFile;
    setInventoryList(data);

    // const blobFile = e.target.files[0];

    // const base64Data = getBase64(uploadedFile);

    // const newFiles = [...datapayload.files, base64Data];
    // const newAttachments = [...datapayload.attachments, blobFile];
  }, []);

  const beforeUploadReturnDocument = useCallback((uploadedFile) => {
    const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
    const isReachedMaxFileSize =
      checkMaxFileSizeFilter(uploadedFile) === Upload.LIST_IGNORE;
    const allowedFileTypes = "application/pdf";

    if (uploadedFile.type !== allowedFileTypes) {
      notification.error({
        message: "File harus memilki format .pdf",
      });
      return Upload.LIST_IGNORE;
    }

    if (isReachedMaxFileSize) {
      return Upload.LIST_IGNORE;
    }

    // setUploadedReturnDocument(uploadedFile);

    let data = [...inventoryList];
    data[idx]["return_file"] = uploadedFile;
    setInventoryList(data);

    // const blobFile = e.target.files[0];

    // const base64Data = getBase64(uploadedFile);

    // const newFiles = [...datapayload.files, base64Data];
    // const newAttachments = [...datapayload.attachments, blobFile];
  }, []);

  const onUploadAssignChange = useCallback(({ file }) => {
    setUploadAssignDocumentLoading(file.status === "uploading");

    if (file.status !== "removed") {
      setAssignFileList([file]);
    }
  }, []);

  const onUploadReturnChange = useCallback(({ file }) => {
    setUploadReturnDocumentLoading(file.status === "uploading");

    if (file.status !== "removed") {
      setReturnFileList([file]);
    }
  }, []);

  const onUploadAssignRemove = useCallback(() => {
    setAssignFileList([]);
    setUploadAssignDocumentLoading(null);

    let data = [...inventoryList];
    data[idx]["delivery_file"] = "";
    setInventoryList(data);
  }, []);

  const onUploadReturnRemove = useCallback(() => {
    setReturnFileList([]);
    setUploadReturnDocumentLoading(null);

    let data = [...inventoryList];
    data[idx]["return_file"] = "";
    setInventoryList(data);
  }, []);

  // const onChangeFile = async (e) => {
  //   if (datapayload.files.length === MAX_FILE_UPLOAD_COUNT) {
  //     notification.warning({
  //       message: `Jumlah unggahan sudah mencapai batas maksimum yaitu ${MAX_FILE_UPLOAD_COUNT} file.`,
  //     });
  //     return;
  //   }

  //   setloadingfile(true);

  //   const blobFile = e.target.files[0];
  //   const base64Data = await getBase64(blobFile);

  //   const newFiles = [...datapayload.files, base64Data];
  //   const newAttachments = [...datapayload.attachments, blobFile];

  //   setdatapayload({
  //     ...datapayload,
  //     files: newFiles,
  //     attachments: newAttachments,
  //   });

  //   setloadingfile(false);
  // };

  return (
    <>
      <div>
        <Form
          layout="vertical"
          form={instanceForm}
          className="grid md:grid-cols-2 gap-x-8 mt-6"
        >
          <h5 className="mig-heading--5 md:col-span-2 mb-3">
            INVENTARIS {idx + 1}/PIRANTI 1
          </h5>
          <Form.Item
            label="ID"
            name={"id_number"}
            rules={[
              {
                required: true,
                message: "ID piranti wajib diisi",
              },
            ]}
          >
            <div>
              <Input
                value={inventoryList[idx]?.id_number}
                name={"id_number"}
                onChange={onChangeInput}
                placeholder="Masukkan ID"
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Nama Piranti"
            name={"device_name"}
            rules={[
              {
                required: true,
                message: "Nama piranti wajib diisi",
              },
            ]}
          >
            <div>
              <Input
                value={inventoryList[idx]?.device_name}
                name={"device_name"}
                onChange={onChangeInput}
                placeholder="Masukkan nama piranti"
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Referensi Inventaris"
            name={"referance_invertory"}
            rules={[
              {
                required: true,
                message: "Referensi Inventaris wajib diisi",
              },
            ]}
            className="md:col-span-2"
          >
            <div>
              <Input
                value={inventoryList[idx]?.referance_invertory}
                name={"referance_invertory"}
                onChange={onChangeInput}
                placeholder="Masukkan referensi inventaris"
              />
            </div>
          </Form.Item>
          <Form.Item label="Tipe" name={"device_type"}>
            <div>
              <Input
                value={inventoryList[idx]?.device_type}
                name={"device_type"}
                onChange={onChangeInput}
                placeholder="Masukkan tipe"
              />
            </div>
          </Form.Item>
          <Form.Item label="Nomor Serial" name={"serial_number"}>
            <div>
              <Input
                value={inventoryList[idx]?.serial_number}
                name={"serial_number"}
                onChange={onChangeInput}
                placeholder="Masukkan nomor serial"
              />
            </div>
          </Form.Item>

          <Form.Item
            label="Tanggal Penyerahan"
            name={"delivery_date"}
            rules={[
              {
                required: true,
                message: "Tanggal penyerahan wajib diisi",
              },
            ]}
          >
            <>
              <DatePicker
                name="delivery_date"
                placeholder="Pilih tanggal penyerahan"
                className="w-full"
                value={
                  moment(inventoryList[idx]?.delivery_date).isValid()
                    ? moment(inventoryList[idx]?.delivery_date)
                    : null
                }
                onChange={(value, datestring) => {
                  let data = [...inventoryList];
                  data[idx].delivery_date = datestring;
                  setInventoryList(data);
                }}
              />
            </>
          </Form.Item>

          <Form.Item label="Tanggal Pengembalian" name={"return_date"}>
            <>
              <DatePicker
                placeholder="Pilih tanggal pengembalian"
                className="w-full"
                value={
                  moment(inventoryList[idx]?.return_date).isValid()
                    ? moment(inventoryList[idx]?.return_date)
                    : null
                }
                onChange={(value, datestring) => {
                  let data = [...inventoryList];
                  data[idx].return_date = datestring;
                  setInventoryList(data);
                }}
              />
            </>
          </Form.Item>

          <Form.Item
            label="Penanggung Jawab Penyerahan"
            name={"pic_delivery"}
            rules={[
              {
                required: true,
                message: "Penanggung jawab penyerahan wajib diisi",
              },
            ]}
          >
            <div>
              <Input
                value={inventoryList[idx]?.pic_delivery}
                name={"pic_delivery"}
                onChange={onChangeInput}
                placeholder="Masukkan penanggung jawab penyerahan"
              />
            </div>
          </Form.Item>

          <Form.Item label="Penanggung Jawab Pengembalian" name={"pic_return"}>
            <div>
              <Input
                value={inventoryList[idx]?.pic_return}
                name={"pic_return"}
                onChange={onChangeInput}
                placeholder="Masukkan penanggung jawab pengembalian"
              />
            </div>
          </Form.Item>

          <Form.Item
            label="Dokumen Penyerahan"
            name={"delivery_file"}
            className="w-full"
          >
            <div className="relative">
              <em className="text-mono50 mr-3">
                Unggah File PDF (Maksimal 5 MB)
              </em>
              <Upload
                accept=".pdf"
                listType="picture"
                maxCount={1}
                beforeUpload={beforeUploadAssignDocument}
                onChange={onUploadAssignChange}
                onRemove={onUploadAssignRemove}
                disabled={uploadAssignDocumentLoading}
                fileList={assignFileList}
              >
                <Button
                  className="btn-sm btn text-white font-semibold px-6 border
                  text-primary100 hover:bg-primary75 border-primary100 
                  hover:border-primary75 hover:text-white bg-white space-x-2
                  focus:border-primary75 focus:text-primary100"
                >
                  <UploadIconSvg size={16} color="#35763B" />
                  <p>Unggah File</p>
                </Button>
              </Upload>
            </div>
          </Form.Item>
          <Form.Item
            label="Dokumen Pengembalian"
            name={"return_file"}
            className="w-full"
          >
            <div className="relative">
              <em className="text-mono50 mr-3">
                Unggah File PDF (Maksimal 5 MB)
              </em>
              <Upload
                accept=".pdf"
                listType="picture"
                maxCount={1}
                beforeUpload={beforeUploadReturnDocument}
                onChange={onUploadReturnChange}
                onRemove={onUploadReturnRemove}
                disabled={uploadReturnDocumentLoading}
                fileList={returnFileList}
              >
                <Button
                  className="btn-sm btn text-white font-semibold px-6 border
                  text-primary100 hover:bg-primary75 border-primary100 
                  hover:border-primary75 hover:text-white bg-white space-x-2
                  focus:border-primary75 focus:text-primary100"
                >
                  <UploadIconSvg size={16} color="#35763B" />
                  <p>Unggah File</p>
                </Button>
              </Upload>
            </div>
          </Form.Item>
        </Form>

        {/* Add Device Form */}
        {inventoryList[idx]?.devices?.map((device, idxDev) => (
          <DeviceForm
            key={idxDev}
            idxInv={idx}
            idxDev={idxDev}
            inventoryList={inventoryList}
            setInventoryList={setInventoryList}
            deviceList={deviceList}
            setDeviceList={setDeviceList}
            setDataModalDelete={setDataModalDelete}
            setModalDelete={setModalDelete}
            isAllowedToDeleteDevice={isAllowedToDeleteDevice}
          />
        ))}

        <div className="mb-6">
          <ButtonSys type={"dashed"} onClick={handleAddNewDevice}>
            <p className="text-primary100 hover:text-primary75">
              + Tambah Piranti
            </p>
          </ButtonSys>
        </div>
      </div>

      {/* Modal Delete Device */}
      <AccessControl hasPermission={EMPLOYEE_DEVICE_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDeleteDevice}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"piranti"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan piranti&nbsp;
            <strong>{dataModalDelete.deviceName}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </>
  );
};

export default InventoryForm;
