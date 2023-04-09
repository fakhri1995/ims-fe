import { UploadOutlined } from "@ant-design/icons";
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
  EMPLOYEE_CONTRACT_GET,
  EMPLOYEE_SALARY_COLUMNS_GET,
  EMPLOYEE_SALARY_COLUMN_ADD,
  EMPLOYEE_SALARY_COLUMN_DELETE,
  EMPLOYEE_SALARY_COLUMN_UPDATE,
  RECRUITMENT_ROLES_LIST_GET,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
} from "lib/features";

import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import { ModalAddSalaryVar } from "../../../../modal/modalCustom";
import CustomCurrencyInput from "../../CustomCurrencyInput";

const EmployeeContractForm = ({
  initProps,
  dataContract,
  setDataContract,
  debouncedApiCall,
  prevpath,
  contractId,
  employeeId,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployeeContract = hasPermission(EMPLOYEE_CONTRACT_GET);
  const isAllowedToGetCompanyList = hasPermission(COMPANY_LISTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);
  const isAllowedToGetRoleTypeList = hasPermission(
    RECRUITMENT_ROLE_TYPES_LIST_GET
  );

  const isAllowedToGetSalaryColumns = hasPermission(
    EMPLOYEE_SALARY_COLUMNS_GET
  );
  const isAllowedToAddSalaryColumn = hasPermission(EMPLOYEE_SALARY_COLUMN_ADD);
  const isAllowedToDeleteSalaryColumn = hasPermission(
    EMPLOYEE_SALARY_COLUMN_DELETE
  );
  const isAllowedToUpdateSalaryColumn = hasPermission(
    EMPLOYEE_SALARY_COLUMN_UPDATE
  );

  // INIT
  const rt = useRouter();
  const [instanceForm] = Form.useForm();

  // 1. USE STATE
  const [praLoading, setPraLoading] = useState(false);
  const [refresh, setRefresh] = useState(-1);

  const [loadingPositonList, setLoadingPositionList] = useState(false);
  const [dataPositionList, setDataPositionList] = useState([]);

  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
  const [dataCompanyList, setDataCompanyList] = useState([]);

  const [loadingRoleTypeList, setLoadingRoleTypeList] = useState(false);
  const [dataRoleTypeList, setDataRoleTypeList] = useState([]);

  const [fileList, setFileList] = useState([]);
  const [uploadDocumentLoading, setUploadDocumentLoading] = useState(false);

  // Use for selected variable list to show as fields in form
  const [receiveVarFields, setReceiveVarFields] = useState([]);
  const [reductionVarFields, setReductionVarFields] = useState([]);

  // Modal salary variable
  const [modalSalaryVar, setModalSalaryVar] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [selectedMultipliers, setSelectedMultipliers] = useState([]);

  // 2. HELPER FUNCTION
  // 2.1. Format string variable name. e.g. "tunjangan_transport"
  const formatVariableName = (name) => name?.toLowerCase().split(" ").join("_");

  // 2.2. Count total gross penerimaan & pengurangan
  const sumValues = (arr) => {
    return arr?.reduce((a, b) => a + b, 0);
  };

  // 2.3. Count BPJS value
  const countBPJSValue = (percent) => {
    // Get penerimaan field value which selected as multiplier
    const selectedMultiplierValues = dataContract.salaries
      .filter((benefit) => benefit.is_amount_for_bpjs === 1)
      .map((b) => b.value);

    // Sum with gaji pokok, then calculate final result
    const totalMultiplier =
      Number(dataContract?.gaji_pokok ?? 0) +
      sumValues(selectedMultiplierValues);

    let result = Math.round(totalMultiplier * (percent / 100) * 100) / 100;
    return result || 0;
  };

  // 3. USE EFFECT
  // 3.1. Get Position List
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

  // 3.2. Get Company Client List
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

  // 3.3. Get Role/Position Type List
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

  // 3.4. Get Employee Contract
  useEffect(() => {
    if (!isAllowedToGetEmployeeContract) {
      permissionWarningNotification("Mendapatkan", "Data Employee Contract");
      setPraLoading(false);
      return;
    }

    // if (currentTab == "2") {
    if (contractId) {
      setPraLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeContract?id=${contractId}`,
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
            const resData = res2.data;
            const requiredData = {
              ...resData,
              id: contractId,
              employee_id: employeeId,
              gaji_pokok: resData.gaji_pokok ?? 0,
              salaries: resData.salaries || null,
            };
            if (prevpath === "add") {
              setDataContract({
                ...requiredData,
                is_employee_active: 1,
              });
            } else {
              setDataContract(requiredData);
            }

            // Set checked variables to show as fields in form
            const receiveVariables = resData.salaries?.filter(
              (v) => v?.column.type === 1
            );
            const reductionVariables = resData.salaries?.filter(
              (v) => v?.column.type === 2
            );

            setReceiveVarFields(receiveVariables);
            setReductionVarFields(reductionVariables);

            // insert default selected BPJS multiplier to state
            const defaultSelectedMultipliers = resData?.salaries?.filter(
              (variable) => variable?.is_amount_for_bpjs
            );
            setSelectedMultipliers(defaultSelectedMultipliers);
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
          setPraLoading(false);
        });
    }
    // }
  }, [isAllowedToGetEmployeeContract, refresh]);

  // 3.5. Display contract file when available
  useEffect(() => {
    if (dataContract?.contract_file?.link) {
      const currentFileName = dataContract?.contract_file?.link?.split("/")[2];
      setFileList([{ name: currentFileName }]);
    } else {
      setFileList([]);
    }
  }, [dataContract?.contract_file]);

  // 4. HANDLER
  // 4.1. Handle input change and auto save in "Tambah Karyawan"
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

  // 4.2. Handle upload file
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

  // console.log({ dataContract });
  return (
    <Form
      layout="vertical"
      form={instanceForm}
      className="md:grid md:grid-cols-2 md:gap-x-8"
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
              className="btn-sm btn font-semibold px-6 border
              text-primary100 hover:bg-primary75 border-primary100 
              hover:border-primary75 hover:text-white bg-white space-x-2
              focus:border-primary75 focus:text-primary100"
            >
              <UploadOutlined />
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

      <div className="flex flex-col space-y-3">
        <p className="mig-heading--5">BENEFIT PENERIMAAN</p>
        <Form.Item
          label="Gaji Pokok"
          name={"gaji_pokok"}
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
              placeholder={"Masukkan gaji pokok"}
              value={dataContract?.gaji_pokok || 0}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp"}
              allowNegative={false}
              onValueChange={(values) => {
                const { formattedValue, value, floatValue } = values;
                setDataContract((prev) => ({
                  ...prev,
                  gaji_pokok: floatValue || 0,
                }));

                if (debouncedApiCall) {
                  debouncedApiCall({
                    ...dataContract,
                    gaji_pokok: floatValue || 0,
                  });
                }
              }}
              renderText={(value) => <p>{value}</p>}
            />
          </div>
        </Form.Item>

        {receiveVarFields.map((variable, idx) => (
          <Form.Item
            key={idx}
            label={variable?.column?.name}
            name={formatVariableName(variable?.column?.name)}
          >
            <div className="flex flex-row items-center space-x-2">
              <CustomCurrencyInput
                fieldLabel={`${variable.column?.name?.toLowerCase()}`}
                dataForm={dataContract}
                setDataForm={setDataContract}
                value={
                  dataContract?.salaries?.find(
                    (benefit) =>
                      benefit?.employee_salary_column_id === variable.column?.id
                  )?.value
                }
                idx={idx}
                dataColumn={variable.column}
                payslipId={dataContract?.id}
              />
              {/* {!variable.required && (
                    <Button
                      icon={<TrashIconSvg color={"#CCCCCC"} size={22} />}
                      className="border-0 hover:opacity-60"
                      onClick={() => {
                        const temp = [...receiveVarFields];
                        temp.splice(idx, 1);
                        setReceiveVarFields(temp);
                      }}
                    />
                  )} */}
            </div>
          </Form.Item>
        ))}
      </div>

      <div className="flex flex-col space-y-3 mt-5 md:mt-0">
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
            <CustomCurrencyInput
              fieldLabel={`bpjs ks`}
              fieldName={"bpjs_ks"}
              setDataForm={setDataContract}
              value={countBPJSValue(5)}
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
            <CustomCurrencyInput
              fieldLabel={`bpjs tk jht`}
              fieldName={"bpjs_tk_jht"}
              setDataForm={setDataContract}
              value={countBPJSValue(5.7)}
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
            <CustomCurrencyInput
              fieldLabel={`bpjs tk jkk`}
              fieldName={"bpjs_tk_jkk"}
              setDataForm={setDataContract}
              value={countBPJSValue(0.24)}
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
            <CustomCurrencyInput
              fieldLabel={`bpjs tk jkm`}
              fieldName={"bpjs_tk_jkm"}
              setDataForm={setDataContract}
              value={countBPJSValue(0.3)}
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
            <CustomCurrencyInput
              fieldLabel={`bpjs tk jp`}
              fieldName={"bpjs_tk_jp"}
              setDataForm={setDataContract}
              value={countBPJSValue(3)}
              disabled
            />
          </div>
        </Form.Item>

        <Form.Item
          label="PPh 21"
          name={"pph21"}
          rules={[
            {
              required: true,
              message: "PPh 21 wajib diisi",
            },
          ]}
        >
          <>
            <CurrencyFormat
              customInput={Input}
              placeholder={"Masukkan PPh 21"}
              value={Number(dataContract?.pph21 || 0)}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp"}
              allowNegative={false}
              onValueChange={(values) => {
                const { formattedValue, value, floatValue } = values;
                setDataContract((prev) => ({
                  ...prev,
                  pph21: floatValue || 0,
                }));
              }}
              renderText={(value) => <p>{value}</p>}
            />
          </>
        </Form.Item>
        {/* Variable list identical to the list in "Tambah Variabel Gaji" modal */}
        {reductionVarFields.map((variable, idx) => {
          let reductionFieldId = receiveVarFields.length + idx;
          return (
            <Form.Item
              key={reductionFieldId}
              label={variable?.column?.name}
              name={formatVariableName(variable?.column?.name)}
            >
              <div>
                <CustomCurrencyInput
                  fieldLabel={`${variable?.name?.toLowerCase()}`}
                  dataForm={dataContract}
                  setDataForm={setDataContract}
                  value={
                    dataContract?.salaries?.find(
                      (benefit) =>
                        benefit?.employee_salary_column_id ===
                        variable?.column?.id
                    )?.value
                  }
                  idx={reductionFieldId}
                  dataColumn={variable.column}
                  payslipId={dataContract?.id}
                />
              </div>
            </Form.Item>
          );
        })}
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
      <AccessControl hasPermission={EMPLOYEE_SALARY_COLUMN_ADD}>
        <ModalAddSalaryVar
          initProps={initProps}
          visible={modalSalaryVar}
          onvisible={setModalSalaryVar}
          loading={loadingSave}
          isAllowedToGetSalaryColumns={isAllowedToGetSalaryColumns}
          isAllowedToAddSalaryColumn={isAllowedToAddSalaryColumn}
          isAllowedToDeleteSalaryColumn={isAllowedToDeleteSalaryColumn}
          isAllowedToUpdateSalaryColumn={isAllowedToUpdateSalaryColumn}
          onOk={() => setModalSalaryVar(false)}
          receiveVarFields={receiveVarFields}
          reductionVarFields={reductionVarFields}
          setReceiveVarFields={setReceiveVarFields}
          setReductionVarFields={setReductionVarFields}
          refresh={refresh}
          setRefresh={setRefresh}
          selectedTags={selectedMultipliers}
          setSelectedTags={setSelectedMultipliers}
          payslipId={dataContract?.id}
          dataPayslip={dataContract}
          setDataPayslip={setDataContract}
          // disabled
        />
      </AccessControl>
    </Form>
  );
};

export default EmployeeContractForm;
