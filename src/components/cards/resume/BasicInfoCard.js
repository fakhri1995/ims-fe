import {
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Steps,
  Timeline,
  notification,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import ButtonSys from "../../button";
import {
  CheckIconSvg,
  DownloadIconSvg,
  EditIconSvg,
  EmailIconSvg,
  MappinIconSvg,
  OneUserIconSvg,
  PhoneIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../icon";
import { ModalHapus2 } from "../../modal/modalCustom";
import { H1 } from "../../typography";

const BasicInfoCard = ({
  dataDisplay,
  setDataDisplay,
  handleUpdate,
  dataUpdateBasic,
  setDataUpdateBasic,
  praloading,
  assessmentRoles,
  handleDelete,
  isAllowedToDeleteCandidate,
  // modalDelete,
  // setModalDelete,
  loadingDelete,
  isCreateForm,
}) => {
  const rt = useRouter();
  const [instanceForm] = Form.useForm();
  const [isShowInput, setIsShowInput] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const onChangeInput = (e) => {
    // setDataDisplay({
    //   ...dataDisplay,
    //   [e.target.name]: e.target.value,
    // });
    setDataUpdateBasic({
      ...dataUpdateBasic,
      [e.target.name]: e.target.value,
    });
    // setdisabledtrigger((prev) => prev + 1);
  };

  // console.log(dataUpdateBasic);
  // console.log(dataDisplay)

  return isShowInput || isCreateForm ? (
    <div className=" shadow-lg rounded-md bg-white p-5 divide-y">
      <div className="flex flex-row items-center justify-between mb-4 ">
        <H1>Basic Information</H1>
        <div className="flex flex-row space-x-6">
          <ButtonSys
            type={"default"}
            color={"danger"}
            className="flex flex-row"
            onClick={() => {
              isCreateForm
                ? rt.back()
                : setDataUpdateBasic({
                    name: dataDisplay.name,
                    telp: dataDisplay.telp,
                    email: dataDisplay.email,
                    role: dataDisplay.role,
                    city: dataDisplay.city,
                    province: dataDisplay.province,
                  });
              setIsShowInput(false);
            }}
          >
            <XIconSvg size={16} color={`#BF4A40`} />
            <p>Batalkan</p>
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
          >
            <CheckIconSvg size={16} color={`white`} />
            {isCreateForm ? <p>Tambah Kandidat</p> : <p>Simpan Kandidat</p>}
          </ButtonSys>
        </div>
      </div>
      <Form
        layout="vertical"
        form={instanceForm}
        className="grid grid-cols-2 gap-x-6 pt-5"
      >
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
              value={dataUpdateBasic.name}
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
              defaultValue={dataUpdateBasic.role}
              onChange={(value) => {
                // console.log(value)
                setDataUpdateBasic({
                  ...dataUpdateBasic,
                  role: value,
                });
              }}
            >
              {assessmentRoles.map((role) => (
                <Select.Option key={role.id} value={role.name}>
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
              value={dataUpdateBasic.email}
              name={"email"}
              onChange={onChangeInput}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name={"telp"}
          // type={"number"}
          rules={[
            {
              required: true,
              message: "Nomor HP wajib diisi",
            },
          ]}
        >
          <div>
            <Input
              value={dataUpdateBasic.telp}
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
              value={dataUpdateBasic.city}
              name={"city"}
              placeholder="City"
              onChange={onChangeInput}
            />
            <Input
              value={dataUpdateBasic.province}
              name={"province"}
              placeholder="Province"
              onChange={onChangeInput}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <div className="col-span-2 shadow-lg rounded-md bg-white p-5">
      <div className="flex flex-row items-center justify-between mb-4 ">
        <div className="flex flex-row space-x-2">
          <H1>{dataDisplay.name} </H1>
          <button
            onClick={() => {
              setDataUpdateBasic({
                name: dataDisplay.name,
                telp: dataDisplay.telp,
                email: dataDisplay.email,
                role: dataDisplay.role,
                city: dataDisplay.city,
                province: dataDisplay.province,
              });
              setIsShowInput(true);
            }}
            className="bg-transparent flex items-center"
          >
            <EditIconSvg size={18} color={"#4D4D4D"} />
          </button>
        </div>

        <div className="flex flex-row space-x-6">
          <ButtonSys
            type={isAllowedToDeleteCandidate ? "default" : "primary"}
            color="danger"
            disabled={!isAllowedToDeleteCandidate}
            onClick={() => setModalDelete(true)}
          >
            <div className="flex flex-row space-x-2">
              <TrashIconSvg size={16} color={`#BF4A40`} />
              <p>Remove Candidate</p>
            </div>
          </ButtonSys>
          <ButtonSys
            type={"default"}
            // onClick={handleCreateCandidate}
          >
            <div className="flex flex-row space-x-2">
              <DownloadIconSvg size={16} color={"#35763B"} />
              <p>Download Resume</p>
            </div>
          </ButtonSys>
        </div>
      </div>
      <hr />
      {praloading ? (
        <div className=" flex justify-center">
          <Spin />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col mt-3">
            <p className="text-xs text-gray-300 mb-2">Role</p>
            <div className="flex flex-row items-center space-x-2">
              <OneUserIconSvg size={18} color="#4D4D4D" />
              <p>{dataDisplay.role}</p>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <p className="text-xs text-gray-300 mb-2">Phone Number</p>
            <div className="flex flex-row items-center space-x-2">
              <PhoneIconSvg size={18} color="#4D4D4D" />
              <p>{dataDisplay.telp}</p>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <p className="text-xs text-gray-300 mb-2">Email</p>
            <div className="flex flex-row items-center space-x-2">
              <EmailIconSvg size={18} color="#4D4D4D" />
              <p>{dataDisplay.email}</p>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <p className="text-xs text-gray-300 mb-2">Address</p>
            <div className="flex flex-row items-center space-x-2">
              <MappinIconSvg size={18} color="#4D4D4D" />
              <p>
                {dataDisplay.city}, {dataDisplay.province}
              </p>
            </div>
          </div>
        </div>
      )}

      <AccessControl isAllowedToDeleteCandidate>
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
            dengan nama <strong>{dataDisplay.name}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
    </div>
  );
};

export default BasicInfoCard;
