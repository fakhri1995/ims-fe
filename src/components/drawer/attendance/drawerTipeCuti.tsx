import { Checkbox, Form, Input, notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";

import DrawerCore from "../drawerCore";

const DrawerTipeCuti = ({
  visible,
  onClose,
  fetchData,
  initProps,
  dataDefault,
}) => {
  const [isTahunan, setIsTahunan] = useState(false);
  const [isDocumentRequired, setIsDocumentRequired] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [instanceForm] = Form.useForm();

  const handleSubmitAdd = (values) => {
    setLoadingSave(true);
    let datapayload = {
      name: values.name,
      description: values.description,
      is_tahunan: isTahunan ? 1 : 0,
      is_document_required: isDocumentRequired ? 1 : 0,
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addLeaveType `, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datapayload),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoadingSave(false);
          handleClose();
          fetchData();
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  const handleSubmitUpdate = (values) => {
    setLoadingSave(true);
    let datapayload = {
      id: dataDefault?.id,
      name: values.name,
      description: values.description,
      is_tahunan: isTahunan ? 1 : "0",
      is_document_required: isDocumentRequired ? 1 : "0",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateLeaveType `, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datapayload),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoadingSave(false);
          handleClose();
          fetchData();
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  useEffect(() => {
    if (visible && dataDefault) {
      instanceForm.setFieldValue("name", dataDefault.name);
      instanceForm.setFieldValue("description", dataDefault.description);

      setIsTahunan(dataDefault.is_tahunan == 0 ? false : true);
      setIsDocumentRequired(
        dataDefault.is_document_required == 0 ? false : true
      );
    }
  }, [visible, dataDefault]);

  const handleClose = () => {
    instanceForm.resetFields();
    setIsDocumentRequired(false);
    setIsTahunan(false);
    onClose();
  };

  return (
    <DrawerCore
      // width={550}
      title={dataDefault ? "Update Leave Type" : "Add Leave Type"}
      visible={visible}
      onClose={handleClose}
      buttonOkText={dataDefault ? "Update Leave Type" : "Add Leave Type"}
      onClick={() => instanceForm.submit()}
      buttonCancelText={"Cancel"}
      onButtonCancelClicked={handleClose}
      loading={loadingSave}
      // disabled={}

      // footer={
      //   <div className={"flex gap-4 justify-end p-2"}>
      //     <div
      //       onClick={onClose}
      //       className={
      //         "bg-[#F3F3F3] py-2.5 px-8 rounded-[5px] hover:cursor-pointer"
      //       }>
      //       <p className={"text-xs leading-5 text-[#808080] font-bold"}>
      //         Batalkan
      //       </p>
      //     </div>
      //     <div
      //       onClick={() => instanceForm.submit()}
      //       className={
      //         "bg-[#35763B] flex items-center gap-4 h-[40px] py-2.5 px-8 rounded-[5px] hover:cursor-pointer"
      //       }>
      //       {loadingSave && (
      //         <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} />} />
      //       )}
      //       <p className="text-white text-xs leading-5 font-bold">Simpan</p>
      //     </div>
      //   </div>
      // }
    >
      <div className={"flex flex-col gap-8"}>
        <Form
          layout="vertical"
          form={instanceForm}
          onFinish={dataDefault?.id ? handleSubmitUpdate : handleSubmitAdd}
        >
          <Form.Item
            label="Leave Type Name"
            name={"name"}
            className="col-span-2"
            rules={[
              {
                required: true,
                message: "Leave Type Name is required",
              },
            ]}
          >
            {/* <div className="flex gap-2 items-center "> */}
            <Input placeholder="ex: Sick Leave" />
            {/* </div> */}
          </Form.Item>
          <Form.Item
            label="Description"
            name={"description"}
            className="col-span-2"
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            {/* <div className="flex gap-2 items-center "> */}
            <Input.TextArea rows={4} />
            {/* </div> */}
          </Form.Item>

          <div className="col-span-2 grid grid-cols-2 gap-2 ">
            <Form.Item
              label="Annual Leave"
              name={"is_tahunan"}
              // className="col-span-2"
            >
              <Checkbox
                checked={isTahunan}
                onChange={() => setIsTahunan(!isTahunan)}
              >
                {" "}
                Reducing
              </Checkbox>
            </Form.Item>
            <Form.Item
              label="Supporting Files"
              name={"is_document_required"}
              // className="col-span-2"
            >
              <Checkbox
                checked={isDocumentRequired}
                onChange={() => setIsDocumentRequired(!isDocumentRequired)}
              >
                Required
              </Checkbox>
            </Form.Item>
          </div>
        </Form>
        {/* <div
          className={"h-[1px]"}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}></div>
        <div className={"flex flex-col gap-4"}>
          <p className={"text-lg text-[#4D4D4D] leading-6 font-bold"}>
            Konfigurasi Tipe Cuti
          </p>
          <div className={"flex flex-row justify-between items-center"}>
            <p className={"text-[#4D4D4D] text-xs leading-5 font-bold"}>
              Cuti Tahunan
            </p>
            <div className={"flex flex-row gap-2 items-center"}>
              <p className={"text-[#808080] text-xs leading-5 font-medium"}>
                Mengurangi Cuti
              </p>
              <Switch
                checked={isTahunan}
                onChange={() => setIsTahunan(!isTahunan)}
              />
            </div>
          </div>
          <div className={"flex flex-row justify-between items-center"}>
            <p className={"text-[#4D4D4D] text-xs leading-5 font-bold"}>
              File Pendukung
            </p>
            <div className={"flex flex-row gap-2 items-center"}>
              <p className={"text-[#808080] text-xs leading-5 font-medium"}>
                Wajib Diisi
              </p>
              <Switch
                checked={isDocumentRequired}
                onChange={() => setIsDocumentRequired(!isDocumentRequired)}
              />
            </div>
          </div>
        </div> */}
      </div>
    </DrawerCore>
  );
};

export default DrawerTipeCuti;
