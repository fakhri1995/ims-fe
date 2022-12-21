import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
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
import { useCallback } from "react";
import CurrencyFormat from "react-currency-format";

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
  TrashIconSvg,
  UploadIconSvg,
} from "../../../../icon";
import { ModalAddSalaryVar } from "../../../../modal/modalCustom";

const EmployeeContractForm = ({
  initProps,
  dataContract,
  setDataContract,
  debouncedApiCall,
  prevpath,
  // instanceForm,
  // handleSaveContract,
}) => {
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

  const [fileList, setFileList] = useState([]);
  const [uploadDocumentLoading, setUploadDocumentLoading] = useState(false);

  const [formattedNominal, setFormattedNominal] = useState(0);

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

  // 2.4. Display contract file when available
  useEffect(() => {
    if (dataContract?.contract_file?.link) {
      const currentFileName = dataContract?.contract_file?.link?.split("/")[2];
      setFileList([{ name: currentFileName }]);
    }
  }, [dataContract?.contract_file]);

  // 3. HANDLER
  // 3.1. Handle input change and auto save in "Tambah Karyawan"
  const onChangeInput = (e) => {
    setDataContract({
      ...dataContract,
      [e.target.name]: e.target.value,
    });

    if (debouncedApiCall) {
      debouncedApiCall({
        ...dataContract,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onChangeSelect = (value, attributeName) => {
    setDataContract({
      ...dataContract,
      [attributeName]: value,
    });

    // use for auto save
    if (debouncedApiCall) {
      debouncedApiCall({
        ...dataContract,
        [attributeName]: value,
      });
    }
  };

  const onChangeDatePicker = (datestring, attributeName) => {
    setDataContract((prev) => ({
      ...prev,
      [attributeName]: datestring,
    }));

    // use for auto save
    if (debouncedApiCall) {
      debouncedApiCall({
        ...dataContract,
        [attributeName]: datestring,
      });
    }
  };

  // 3.2. Handle upload file
  const beforeUploadDocument = useCallback((uploadedFile) => {
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

    setDataContract((prev) => ({
      ...prev,
      contract_file: uploadedFile,
    }));

    // use for auto save in "Tambah Karyawan"
    if (debouncedApiCall) {
      debouncedApiCall({
        ...dataContract,
        contract_file: uploadedFile,
      });
    }
  }, []);

  const onUploadChange = useCallback(({ file }) => {
    setUploadDocumentLoading(file.status === "uploading");

    if (file.status !== "removed") {
      setFileList([file]);
    }
  }, []);

  const onUploadRemove = useCallback(() => {
    setFileList([]);
    setDataContract((prev) => ({
      ...prev,
      contract_file: null,
    }));

    // use for auto save in "Tambah Karyawan"
    if (debouncedApiCall) {
      debouncedApiCall({
        ...dataContract,
        contract_file: null,
      });
    }
  }, []);

  return (
    <Form
      layout="vertical"
      form={instanceForm}
      className="grid grid-cols-2 gap-x-8"
      // onFinish={handleSaveContract}
    >
      <h5 className="mig-heading--5 col-span-2 mb-3">INFORMASI UMUM</h5>
      <Form.Item
        label="Status Karyawan"
        name={"is_employee_active"}
        rules={[
          {
            required: true,
            message: "Status karyawan wajib diisi",
          },
        ]}
        className="col-span-2"
      >
        <div className="flex flex-row space-x-4">
          <Switch
            checked={Number(dataContract?.is_employee_active)}
            onChange={(checked) => {
              setDataContract({
                ...dataContract,
                is_employee_active: Number(checked),
              });

              // use for auto save in "Tambah Karyawan"
              if (debouncedApiCall) {
                debouncedApiCall({
                  ...dataContract,
                  is_employee_active: Number(checked),
                });
              }
            }}
          />
          {Number(dataContract?.is_employee_active) ? (
            <p>Aktif</p>
          ) : (
            <p>Tidak Aktif</p>
          )}
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
            value={dataContract?.contract_name}
            name={"contract_name"}
            onChange={onChangeInput}
            placeholder="Masukkan nama kontrak"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Posisi"
        name={"role_id"}
        rules={[
          {
            required: true,
            message: "Posisi wajib diisi",
          },
        ]}
      >
        <>
          <Select
            value={dataContract?.role_id && Number(dataContract?.role_id)}
            onChange={(value) => onChangeSelect(value, "role_id")}
            placeholder="Pilih posisi"
          >
            <>
              {dataPositionList?.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </>
          </Select>
        </>
      </Form.Item>
      <Form.Item
        label="Status Kontrak"
        name={"contract_status_id"}
        rules={[
          {
            required: true,
            message: "Status kontrak wajib diisi",
          },
        ]}
      >
        <>
          <Select
            value={
              dataContract?.contract_status_id &&
              Number(dataContract?.contract_status_id)
            }
            onChange={(value) => onChangeSelect(value, "contract_status_id")}
            placeholder="Pilih status kontrak"
          >
            <>
              {dataRoleTypeList?.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </>
          </Select>
        </>
      </Form.Item>
      <Form.Item
        label="Dokumen Kontrak"
        name={"contract_file"}
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
            listType="text"
            maxCount={1}
            beforeUpload={beforeUploadDocument}
            onChange={onUploadChange}
            onRemove={onUploadRemove}
            disabled={uploadDocumentLoading}
            fileList={fileList}
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
        name={"pkwt_reference"}
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
            value={dataContract?.pkwt_reference}
            name={"pkwt_reference"}
            onChange={onChangeInput}
            placeholder="Masukkan PKWT"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Awal Kontrak"
        name={"contract_start_at"}
        rules={[
          {
            required: true,
            message: "Awal kontrak wajib diisi",
          },
        ]}
      >
        <>
          <DatePicker
            name="contract_start_at"
            placeholder="Pilih tanggal awal kontrak"
            className="w-full"
            value={
              moment(dataContract?.contract_start_at).isValid()
                ? moment(dataContract?.contract_start_at)
                : null
            }
            format={"YYYY-MM-DD"}
            onChange={(value, datestring) => {
              onChangeDatePicker(datestring, "contract_start_at");
            }}
          />
        </>
      </Form.Item>
      <Form.Item
        label="Akhir Kontrak"
        name={"contract_end_at"}
        rules={[
          {
            required: true,
            message: "Akhir kontrak wajib diisi",
          },
        ]}
      >
        <>
          <DatePicker
            name="contract_end_at"
            placeholder="Pilih tanggal akhir kontrak"
            className="w-full"
            value={
              moment(dataContract?.contract_end_at).isValid()
                ? moment(dataContract?.contract_end_at)
                : null
            }
            onChange={(value, datestring) => {
              onChangeDatePicker(datestring, "contract_end_at");
            }}
          />
        </>
      </Form.Item>
      <Form.Item
        label="Penempatan"
        name={"placement"}
        rules={[
          {
            required: true,
            message: "Penempatan wajib diisi",
          },
        ]}
      >
        <>
          <Select
            value={dataContract?.placement}
            onChange={(value) => onChangeSelect(value, "placement")}
            placeholder="Pilih penempatan"
          >
            {dataCompanyList?.map((option) => (
              <Select.Option key={option.id} value={option.name}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </>
      </Form.Item>
      <Form.Item label="Kantor Baru" name={"new_office"}>
        <div>
          <Input
            value={dataContract?.new_office}
            name={"new_office"}
            onChange={onChangeInput}
            placeholder="Masukkan kantor baru"
          />
        </div>
      </Form.Item>
      <Form.Item label="Cuti Tahunan" name={"annual_leave"}>
        <div>
          <InputNumber
            type={"number"}
            min={0}
            value={dataContract?.annual_leave}
            name={"annual_leave"}
            onChange={(value) => onChangeSelect(value, "annual_leave")}
            placeholder="Masukkan jumlah hari cuti"
            className="w-full"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Tanggal Resign"
        name={"resign_at"}
        rules={
          prevpath === "inactivate" && [
            {
              required: true,
              message: "Akhir kontrak wajib diisi",
            },
          ]
        }
      >
        <>
          <DatePicker
            name="resign_at"
            placeholder="Pilih tanggal resign"
            className="w-full"
            value={
              moment(dataContract?.resign_at).isValid()
                ? moment(dataContract?.resign_at)
                : null
            }
            onChange={(value, datestring) => {
              onChangeDatePicker(datestring, "resign_at");
            }}
          />
        </>
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
            <CurrencyFormat
              customInput={Input}
              placeholder="Masukkan gaji pokok"
              value={formattedNominal}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp"}
              suffix={",00"}
              onValueChange={(values) => {
                const { formattedValue, value } = values;
                // formattedValue = $2,223
                // value ie, 2223
                setFormattedNominal(formattedValue);
                setDataContract((prev) => ({
                  ...prev,
                  benefit: { ...prev.benefit, main_salary: value },
                }));
              }}
            />
          </div>
        </Form.Item>
        {/* TODO: Loop additional benefit */}
        <Form.Item label="Tunjangan Uang Makan" name={"meal_allowance"}>
          <div className="flex flex-row items-center space-x-2">
            <Input
              value={dataContract?.benefit?.meal_allowance}
              name={"meal_allowance"}
              // onChange={(e) => {
              //   setDataContract((prev) => ({
              //     ...prev,
              //     benefit: { ...prev.benefit, meal_allowance: e.target.value },
              //   }));
              // }}
              placeholder="Masukkan tunjangan uang makan"
              className="flex flex-row items-center space-x-2"
            />
            <Button
              icon={<TrashIconSvg color={"#CCCCCC"} size={22} />}
              className="border-0"
            />
          </div>
        </Form.Item>
      </div>

      <div className="flex flex-col space-y-3">
        <p className="mig-heading--5">BENEFIT PENGURANGAN</p>
        <Form.Item
          label="BPJS KS (5% Perusahaan)"
          name={"bpjs_ks"}
          rules={[
            {
              required: true,
              message: "BPJS KS wajib diisi",
            },
          ]}
        >
          <div>
            <Input
              // value={dataContract.benefit?.bpjs_ks}
              name={"bpjs_ks"}
              // onChange={(e) => {
              //   setDataPayslip((prev) => ({
              //     ...prev,
              //     benefit: { ...prev.benefit, bpjs_ks: e.target.value },
              //   }));
              // }}
              disabled
            />
          </div>
        </Form.Item>
        <Form.Item
          label="BPJS TK-JHT (5,7% Perusahaan)"
          name={"bpjs_tk_jht"}
          rules={[
            {
              required: true,
              message: "BPJS TK-JHT wajib diisi",
            },
          ]}
        >
          <div>
            <Input
              // value={dataPayslip?.benefit?.bpjs_tk_jht}
              name={"bpjs_tk_jht"}
              // onChange={(e) => {
              //   setDataPayslip((prev) => ({
              //     ...prev,
              //     benefit: { ...prev.benefit, bpjs_tk_jht: e.target.value },
              //   }));
              // }}
              disabled
            />
          </div>
        </Form.Item>
        <Form.Item
          label="BPJS TK-JKK (0,24% Perusahaan)"
          name={"bpjs_tk_jkk"}
          rules={[
            {
              required: true,
              message: "BPJS TK-JKK wajib diisi",
            },
          ]}
        >
          <div>
            <Input
              // value={dataPayslip?.benefit?.bpjs_tk_jkk}
              name={"bpjs_tk_jkk"}
              // onChange={(e) => {
              //   setDataPayslip((prev) => ({
              //     ...prev,
              //     benefit: { ...prev.benefit, bpjs_tk_jkk: e.target.value },
              //   }));
              // }}
              disabled
            />
          </div>
        </Form.Item>
        <Form.Item
          label="BPJS TK-JKM (0,3% Perusahaan)"
          name={"bpjs_tk_jkm"}
          rules={[
            {
              required: true,
              message: "BPJS TK-JKM wajib diisi",
            },
          ]}
        >
          <div>
            <Input
              // value={dataPayslip?.benefit?.bpjs_tk_jkm}
              name={"bpjs_tk_jkm"}
              // onChange={(e) => {
              //   setDataPayslip((prev) => ({
              //     ...prev,
              //     benefit: { ...prev.benefit, bpjs_tk_jkm: e.target.value },
              //   }));
              // }}
              disabled
            />
          </div>
        </Form.Item>
        <Form.Item
          label="BPJS TK-JP (3% Perusahaan)"
          name={"bpjs_tk_jp"}
          rules={[
            {
              required: true,
              message: "BPJS TK-JP wajib diisi",
            },
          ]}
        >
          <div>
            <Input
              // value={dataPayslip?.benefit?.bpjs_tk_jp}
              name={"bpjs_tk_jp"}
              // onChange={(e) => {
              //   setDataPayslip((prev) => ({
              //     ...prev,
              //     benefit: { ...prev.benefit, bpjs_tk_jp: e.target.value },
              //   }));
              // }}
              disabled
            />
          </div>
        </Form.Item>
        <Form.Item
          label="PPh 21"
          name={"income_tax"}
          rules={[
            {
              required: true,
              message: "PPh 21 wajib diisi",
            },
          ]}
        >
          <div>
            <Input
              // value={dataContract?.benefit?.income_tax}
              name={"income_tax"}
              // onChange={(e) => {
              //   setDataContract((prev) => ({
              //     ...prev,
              //     benefit: { ...prev.benefit, income_tax: e.target.value },
              //   }));
              // }}
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
        <ModalAddSalaryVar
          visible={modalSalaryVar}
          onvisible={setModalSalaryVar}
          loading={loadingSave}
          setInputVar={setInputVar}
          isInputVar={isInputVar}
          // onOk={}
          // disabled
        />
      </AccessControl>
    </Form>
  );
};

export default EmployeeContractForm;
