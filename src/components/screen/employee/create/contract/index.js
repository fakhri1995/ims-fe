import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Switch,
  Tabs,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_LISTS_GET,
  RECRUITMENT_ROLES_LIST_GET,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
} from "lib/features";

import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import {
  CircleCheckIconSvg,
  SquarePlusIconSvg,
  UploadIconSvg,
} from "../../../../icon";

const EmployeeContractForm = ({ initProps }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetCompanyList = hasPermission(COMPANY_LISTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);
  const isAllowedToGetRoleTypeList = hasPermission(
    RECRUITMENT_ROLE_TYPES_LIST_GET
  );

  const rt = useRouter();
  const [instanceForm] = Form.useForm();

  // 1. USE STATE
  const [dataContract, setDataContract] = useState({
    contract_name: "",
    contract_status: "",
    position: "",
    employee_status: false,
    contract_doc: "",
    pkwt: "",
    contract_starts: "",
    contract_ends: "",
    placement: "",
    new_office: "",
    resign_date: "",
    benefits: {},
  });

  const [modalSalaryVar, setModalSalaryVar] = useState(false);
  const [isInputVar, setInputVar] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingCreate, setLoadingCreate] = useState(false);

  const [loadingPositonList, setLoadingPositionList] = useState(false);
  const [dataPositionList, setDataPositionList] = useState([]);

  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
  const [dataCompanyList, setDataCompanyList] = useState([]);

  const [loadingRoleTypeList, setLoadingRoleTypeList] = useState(false);
  const [dataRoleTypeList, setDataRoleTypeList] = useState([]);

  // 2. USE EFFECT
  // 2.1. Get Position List
  useEffect(() => {
    if (!isAllowedToGetRoleList) {
      permissionWarningNotification("Mendapatkan", "Daftar Role");
      setLoadingPositionList(false);
      return;
    }

    setLoadingPositionList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataPositionList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingPositionList(false);
      });
  }, [isAllowedToGetRoleList]);

  // 2.2. Get Company Client List
  useEffect(() => {
    if (!isAllowedToGetCompanyList) {
      permissionWarningNotification("Mendapatkan", "Daftar Company Client");
      setLoadingCompanyList(false);
      return;
    }

    setLoadingCompanyList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataCompanyList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingCompanyList(false);
      });
  }, [isAllowedToGetCompanyList]);

  // 2.3. Get Role/Position Type List
  useEffect(() => {
    if (!isAllowedToGetRoleTypeList) {
      permissionWarningNotification("Mendapatkan", "Daftar Tipe Role");
      setLoadingRoleTypeList(false);
      return;
    }

    setLoadingRoleTypeList(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoleTypesList`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRoleTypeList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingRoleTypeList(false);
      });
  }, [isAllowedToGetRoleTypeList]);

  // 3. HANDLER
  const onChangeInput = (e) => {
    setDataCompanyList({
      ...dataCompanyList,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form
      layout="vertical"
      form={instanceForm}
      className="grid grid-cols-2 gap-x-8"
    >
      <h5 className="mig-heading--5 col-span-2 mb-3">INFORMASI UMUM</h5>
      <Form.Item
        label="Status Karyawan"
        name={"employee_status"}
        rules={[
          {
            required: true,
            message: "Status karyawan wajib diisi",
          },
        ]}
        className="col-span-2"
      >
        {/* TODO: ubah jadi toggle */}
        <div className="flex flex-row space-x-4">
          <Switch
            onChange={(checked) => {
              setDataContract({
                ...dataContract,
                employee_status: checked,
              });
            }}
          />
          {dataContract.employee_status ? <p>Aktif</p> : <p>Tidak AKtif</p>}
        </div>
      </Form.Item>
      <Form.Item
        label="Nama Kontrak"
        name={"contract_name"}
        rules={[
          {
            required: true,
            message: "Nama kontrak wajib diisi",
          },
        ]}
        className="col-span-2"
      >
        <div>
          <Input
            value={dataContract.contract_name}
            name={"contract_name"}
            onChange={onChangeInput}
            placeholder="Masukkan nama kontrak"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Posisi"
        name={"position"}
        rules={[
          {
            required: true,
            message: "Posisi wajib diisi",
          },
        ]}
      >
        <Select
          value={dataContract.position}
          onChange={(value) => {
            setDataContract({
              ...dataContract,
              position: value,
            });
          }}
          placeholder="Pilih posisi"
        >
          {dataPositionList.map((option) => (
            <Select.Option key={option.id} value={option.id}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Status Kontrak"
        name={"contract_status"}
        rules={[
          {
            required: true,
            message: "Status kontrak wajib diisi",
          },
        ]}
      >
        <Select
          value={dataContract.contract_status}
          onChange={(value) => {
            setDataContract({
              ...dataContract,
              contract_status: value,
            });
          }}
          placeholder="Pilih status kontrak"
        >
          {dataRoleTypeList.map((option) => (
            <Select.Option key={option.id} value={option.name}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Dokumen Kontrak"
        name={"contract_doc"}
        className="col-span-2 w-full"
        rules={[
          {
            required: true,
            message: "Dokumen kontrak wajib diisi",
          },
        ]}
      >
        <div className="relative">
          <em className="text-mono50 mr-10">Unggah File PDF (Maksimal 5 MB)</em>
          <Upload
            accept=".pdf"
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
              const isReachedMaxFileSize =
                checkMaxFileSizeFilter(file) === Upload.LIST_IGNORE;
              const isPDF = file.type === `application/pdf`;
              if (!isPDF) {
                notification.error({
                  message: "File harus memilki format .pdf",
                });
              }
              const allowedUpload = !isReachedMaxFileSize && isPDF;
              return allowedUpload || Upload.LIST_IGNORE;
            }}
            // disabled={true}
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
        label="Referensi PKWT"
        name={"pkwt"}
        rules={[
          {
            required: true,
            message: "Referensi PKWT wajib diisi",
          },
        ]}
        className="col-span-2"
      >
        <div>
          <Input
            value={dataContract.pkwt}
            name={"pkwt"}
            onChange={onChangeInput}
            placeholder="Masukkan PKWT"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Awal Kontrak"
        name={"contract_starts"}
        rules={[
          {
            required: true,
            message: "Awal kontrak wajib diisi",
          },
        ]}
      >
        <DatePicker
          name="contract_start"
          placeholder="Pilih tanggal awal kontrak"
          className="w-full"
          value={[
            dataContract.contract_starts
              ? moment(dataContract.contract_starts)
              : null,
          ]}
          onChange={(value, datestring) => {
            let selectedDate = datestring[0];
            setDataContract((prev) => ({
              ...prev,
              contract_starts: selectedDate,
            }));
          }}
        />
      </Form.Item>
      <Form.Item
        label="Akhir Kontrak"
        name={"contract_ends"}
        rules={[
          {
            required: true,
            message: "Akhir kontrak wajib diisi",
          },
        ]}
      >
        <DatePicker
          name="contract_ends"
          placeholder="Pilih tanggal akhir kontrak"
          className="w-full"
          value={[
            dataContract.contract_ends
              ? moment(dataContract.contract_ends)
              : null,
          ]}
          onChange={(value, datestring) => {
            let selectedDate = datestring[0];
            setDataContract((prev) => ({
              ...prev,
              contract_ends: selectedDate,
            }));
          }}
        />
      </Form.Item>
      <Form.Item label="Penempatan" name={"placement"}>
        <Select
          value={dataContract.placement}
          onChange={(value) => {
            setDataContract({
              ...dataContract,
              placement: value,
            });
          }}
          placeholder="Pilih penempatan"
        >
          {dataCompanyList.map((option) => (
            <Select.Option key={option.id} value={option.id}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Kantor Baru" name={"new_office"}>
        <div>
          <Input
            value={dataContract.new_office}
            name={"new_office"}
            onChange={onChangeInput}
            placeholder="Masukkan kantor baru"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Tanggal Resign"
        name={"resign_date"}
        className="col-span-2"
      >
        <DatePicker
          name="resign_date"
          placeholder="Pilih tanggal resign"
          className="w-full"
          value={[
            dataContract.resign_date ? moment(dataContract.resign_date) : null,
          ]}
          onChange={(value, datestring) => {
            let selectedDate = datestring[0];
            setDataContract((prev) => ({
              ...prev,
              resign_date: selectedDate,
            }));
          }}
        />
      </Form.Item>

      {/* TODO: ubah value input benefit */}
      <div className="flex flex-col space-y-3">
        <p className="mig-heading--5">BENEFIT PENERIMAAN</p>
        <Form.Item
          label="Gaji Pokok"
          name={"main_salary"}
          rules={[
            {
              required: true,
              message: "Gaji pokok wajib diisi",
            },
          ]}
        >
          <div>
            <Input
              // value={dataUpdateBasic.name}
              name={"main_salary"}
              onChange={onChangeInput}
              placeholder="Masukkan gaji pokok"
            />
          </div>
        </Form.Item>
        <Form.Item label="Tunjangan Uang Makan" name={"meal_allowance"}>
          <div>
            <Input
              // value={dataUpdateBasic.name}
              name={"meal_allowance"}
              onChange={onChangeInput}
              placeholder="Masukkan tunjangan uang makan"
            />
          </div>
        </Form.Item>
      </div>

      <div className="flex flex-col space-y-3">
        <p className="mig-heading--5">BENEFIT PENGURANGAN</p>
        <Form.Item label="PPh 21" name={"income_tax"}>
          <div>
            <Input
              // value={dataUpdateBasic.name}
              name={"income_tax"}
              onChange={onChangeInput}
              placeholder="Masukkan pajak penghasilan"
            />
          </div>
        </Form.Item>
      </div>
      <div className="col-span-2 mt-3">
        <ButtonSys
          type={"dashed"}
          onClick={() => {
            // clearDataUpdate();
            setModalSalaryVar(true);
          }}
        >
          <p className="text-primary100 hover:text-primary75">
            + Tambah Variable Gaji
          </p>
        </ButtonSys>
      </div>

      {/* Modal Add Salary Variable */}
      {/* TODO: change hasPermission */}
      <AccessControl hasPermission={RECRUITMENT_ROLES_LIST_GET}>
        <Modal
          title={
            <div className="flex flex-row justify-between items-center">
              <p>Tambah Variabel Gaji</p>
              <CircleCheckIconSvg size={32} color={"#35763B"} />
            </div>
          }
          visible={modalSalaryVar}
          // onCancel={() => setModalSalaryVar(false)}
          closable={false}
          footer={
            <Spin spinning={loadingSave}>
              <div className="flex flex-row justify-between my-2">
                <ButtonSys
                  type={"default"}
                  onClick={() => setModalSalaryVar(false)}
                >
                  Batalkan
                </ButtonSys>
                <ButtonSys type={"primary"}>Simpan</ButtonSys>
              </div>
            </Spin>
          }
          loading={loadingSave}
        >
          <div className="flex flex-row space-x-8">
            <div className="w-full space-y-2">
              <h5 className="mig-heading--5">PENERIMAAN</h5>
              {/* TODO: Loop variabel */}
              <Checkbox
                className="ml-1"
                // onChange={}
              >
                Gaji Pokok
              </Checkbox>
              {isInputVar ? (
                <div className="flex flex-row items-center space-x-1">
                  <button
                    onClick={() => {
                      setInputVar(false);
                    }}
                    className="bg-transparent hover:opacity-75"
                  >
                    <SquarePlusIconSvg color={"#35763B"} size={24} />
                  </button>

                  <Input
                    size="small"
                    placeholder="Masukkan variabel"
                    autoFocus
                  ></Input>
                </div>
              ) : (
                <button
                  className="flex flex-row items-center bg-transparent hover:opacity-75"
                  onClick={() => setInputVar(true)}
                >
                  <SquarePlusIconSvg color={"#35763B"} size={24} />
                  <p className="text-primary100 ml-1">Tambah</p>
                </button>
              )}
            </div>
            <div className="w-full space-y-2">
              <h5 className="mig-heading--5">PENGURANGAN</h5>
              <Checkbox
              // onChange={}
              >
                PPh 21
              </Checkbox>
            </div>
          </div>
        </Modal>
      </AccessControl>
    </Form>
  );
};

export default EmployeeContractForm;
