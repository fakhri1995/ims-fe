import {
  DeleteOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { React, useCallback, useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { MAX_FILE_UPLOAD_COUNT } from "lib/constants";
import {
  COMPANY_CLIENTS_GET,
  COMPANY_CLIENT_ADD,
  EMPLOYEE_CONTRACT_GET,
  EMPLOYEE_SALARY_COLUMNS_GET,
  EMPLOYEE_SALARY_COLUMN_ADD,
  EMPLOYEE_SALARY_COLUMN_DELETE,
  EMPLOYEE_SALARY_COLUMN_UPDATE,
  RECRUITMENT_ROLES_LIST_GET,
  RECRUITMENT_ROLE_ADD,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
} from "lib/features";

import {
  beforeUploadFileMaxSize,
  generateStaticAssetUrl,
  getFileName,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import { PaperclipIconSvg, UploadIconSvg } from "../../../../icon";
import { ModalAddCompany, ModalAddRole } from "../../../../modal/modalCustom";
import ModalSalaryVarAdd, {
  defaultSalaryVar,
} from "../../../../modal/payslips/modalSalaryVarAdd";
import CustomCurrencyInput from "../../CustomCurrencyInput";

const EmployeeContractForm = ({
  initProps,
  dataContract,
  setDataContract,
  debouncedApiCall,
  prevpath,
  contractId,
  employeeId,
  refreshContract,
  handleFormChange, // only used in create employee
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
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToAddCompanyClient = hasPermission(COMPANY_CLIENT_ADD);
  const isAllowedToAddRole = hasPermission(RECRUITMENT_ROLE_ADD);
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

  const [uploadDocumentLoading, setUploadDocumentLoading] = useState(false);
  const [removedFileIds, setRemovedFileIds] = useState([]);

  // Modal salary variable
  const [modalSalaryVar, setModalSalaryVar] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [selectedMultipliers, setSelectedMultipliers] = useState([]);

  //Modal add position role
  const [modalAddRole, setModalAddRole] = useState(false);
  const [loadingAddRole, setLoadingAddRole] = useState(false);

  // Modal add placement company
  const [modalAddCompany, setModalAddCompany] = useState(false);
  const [loadingAddCompany, setLoadingAddCompany] = useState(false);

  // 2. HELPER FUNCTION
  // 2.1. Format string variable name. e.g. "tunjangan_transport"
  const formatVariableName = (name) => name?.toLowerCase().split(" ").join("_");

  // 2.2. Count total gross penerimaan & pengurangan
  const sumValues = (arr) => {
    return Number(arr?.reduce((a, b) => Number(a) + Number(b), 0));
  };

  // 2.3. Count BPJS value
  const countBPJSValue = (percent) => {
    // Get penerimaan field value which selected as multiplier
    const selectedMultiplierValues = dataContract.salaries
      ?.filter((benefit) => benefit.is_amount_for_bpjs === 1)
      ?.map((b) => b.value);

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
  }, [isAllowedToGetRoleList, refresh]);

  // 3.2. Get Company Client List
  useEffect(() => {
    if (!isAllowedToGetCompanyClients) {
      permissionWarningNotification("Mendapatkan", "Daftar Company Client");
      setLoadingCompanyList(false);
      return;
    }

    setLoadingCompanyList(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList?with_mig=1`,
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
  }, [isAllowedToGetCompanyClients, refresh]);

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

            // Set contract active status based on previous path
            if (prevpath === "add" || prevpath === "agent") {
              setDataContract({
                ...requiredData,
                is_employee_active: 1,
              });
            } else if (prevpath === "inactivate") {
              setDataContract({
                ...requiredData,
                is_employee_active: 0,
              });
            } else {
              setDataContract(requiredData);
            }

            // clear removed file list
            setRemovedFileIds([]);

            // Insert default selected BPJS multiplier to state
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
  }, [isAllowedToGetEmployeeContract, contractId, refresh, refreshContract]);

  // 3.5. Update data contract when delete icon in file upload is clicked
  useEffect(() => {
    setDataContract((prev) => ({
      ...prev,
      removed_file_ids: removedFileIds,
    }));
  }, [removedFileIds]);

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

  // 4.2. Handle before upload file
  // const beforeUploadDocument = useCallback((file, fileList) => {
  //   const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
  //   const isReachedMaxFileSize =
  //     checkMaxFileSizeFilter(file, fileList) === Upload.LIST_IGNORE;
  //   const allowedFileTypes = "application/pdf";

  //   if (file.type !== allowedFileTypes) {
  //     notification.error({
  //       message: "File harus memiliki format .pdf",
  //     });
  //     return Upload.LIST_IGNORE;
  //   }

  //   if (isReachedMaxFileSize) {
  //     return Upload.LIST_IGNORE;
  //   }

  //   return file;
  // }, []);

  // 4.3. Handle upload file
  const onUploadChange = async (e) => {
    if (dataContract?.contract_files?.length === MAX_FILE_UPLOAD_COUNT) {
      notification.warning({
        message: `Jumlah unggahan sudah mencapai batas maksimum yaitu ${MAX_FILE_UPLOAD_COUNT} file.`,
      });
      return;
    }

    setUploadDocumentLoading(true);

    const blobFile = e.target.files[0];
    const newFiles = [...dataContract.contract_files, blobFile];

    setDataContract({
      ...dataContract,
      contract_files: newFiles,
    });

    handleFormChange && handleFormChange();
    setUploadDocumentLoading(false);
  };

  return (
    <Form
      layout="vertical"
      form={instanceForm}
      onValuesChange={handleFormChange && handleFormChange}
    >
      <div className={"px-6"}>
        <p className={"text-lg/6 text-[#424242] font-inter font-bold my-4"}>
          General Information
        </p>
        <div className="md:grid md:grid-cols-2 md:gap-x-8">
          <Form.Item
            label="Employee Status"
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
            label="Contract Document"
            name={"contract_file"}
            className="col-span-2 w-full"
            rules={[
              {
                required: true,
                message: "Contract Document must be filled",
              },
            ]}
          >
            <div className="">
              <ButtonSys
                type={`defaultInput`}
                // beforeUpload={beforeUploadDocument}
                onChangeGambar={onUploadChange}
                inputAccept=".pdf"
                disabled={uploadDocumentLoading}
              >
                {uploadDocumentLoading ? (
                  <LoadingOutlined style={{ marginRight: `0.5rem` }} />
                ) : (
                  <div className="mr-2">
                    <UploadIconSvg size={16} color={"#4D4D4D"} />
                  </div>
                )}
                <p
                  className={"text-sm/4 font-roboto font-medium text-[#4D4D4D]"}
                >
                  Upload File
                </p>
              </ButtonSys>
              <p className="text-[#808080] mr-10 font-inter font-semibold mt-4">
                Upload Files (Maximum 5 MB)
              </p>
            </div>
          </Form.Item>
          <div className="grid grid-cols-1 col-span-2 items-center space-y-2 mb-4">
            {dataContract?.contract_files?.map((doc, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-2 items-center p-2 border border-[#d9d9d9]"
              >
                <PaperclipIconSvg />
                {doc?.link ? (
                  <a
                    className="col-span-10"
                    href={generateStaticAssetUrl(doc?.link)}
                    target="_blank"
                  >
                    {getFileName(doc?.link)}
                  </a>
                ) : (
                  <p className="col-span-10">{doc?.name}</p>
                )}
                <div
                  className="text-right cursor-pointer  "
                  onClick={() => {
                    var tempFiles = [...dataContract?.contract_files];
                    tempFiles.splice(idx, 1);

                    setDataContract((prev) => ({
                      ...prev,
                      contract_files: tempFiles,
                    }));

                    setRemovedFileIds((prev) => [...prev, doc?.id || 0]);
                    handleFormChange && handleFormChange();
                  }}
                >
                  <DeleteOutlined className="text-[#00000045] hover:text-[#00000080] m-2 p-2" />
                </div>
              </div>
            ))}
          </div>
          <Form.Item
            label="Contract Name"
            name={"contract_name"}
            className="col-span-1"
          >
            <div>
              <Input
                value={dataContract?.contract_name}
                name={"contract_name"}
                onChange={onChangeInput}
                placeholder="Input contract name"
              />
            </div>
          </Form.Item>
          <div className="flex items-center space-x-2">
            <Form.Item
              label="Position"
              name={"role_id"}
              rules={[
                {
                  required: true,
                  message: "Position must be filled",
                },
              ]}
              className="w-full"
            >
              <>
                <Select
                  value={dataContract?.role_id && Number(dataContract?.role_id)}
                  onChange={(value) => onChangeSelect(value, "role_id")}
                  placeholder="Select position"
                >
                  <>
                    {dataPositionList?.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.role}
                      </Select.Option>
                    ))}
                  </>
                </Select>
              </>
            </Form.Item>
            <Button
              onClick={() => setModalAddRole(true)}
              disabled={!isAllowedToAddRole}
              className="px-4 py-2 whitespace-nowrap border-0 bg-transparent text-primary100 shadow-none hover:text-primary75 focus:text-primary100"
            >
              Add Position
            </Button>
          </div>
          <Form.Item
            label="Contract Status"
            name={"contract_status_id"}
            className="col-span-1"
            rules={[
              {
                required: true,
                message: "Contract status must be filled",
              },
            ]}
          >
            <>
              <Select
                value={
                  dataContract?.contract_status_id &&
                  Number(dataContract?.contract_status_id)
                }
                onChange={(value) =>
                  onChangeSelect(value, "contract_status_id")
                }
                placeholder="Select contract status"
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
            label="PKWT Reference"
            name={"pkwt_reference"}
            className="col-span-1"
          >
            <div>
              <Input
                value={dataContract?.pkwt_reference}
                name={"pkwt_reference"}
                onChange={onChangeInput}
                placeholder="Input PKWT"
              />
            </div>
          </Form.Item>
        </div>
        <div className={"md:grid md:grid-cols-3 md:gap-x-8"}>
          <Form.Item
            label="Start Contract"
            name={"contract_start_at"}
            rules={[
              {
                required: true,
                message: "Start Contract must be filled",
              },
            ]}
          >
            <>
              <DatePicker
                name="contract_start_at"
                placeholder="Select start contract"
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
            label="End Contract"
            name={"contract_end_at"}
            rules={[
              {
                // required: true,
                message: "End contract must be filled",
              },
            ]}
          >
            <>
              <DatePicker
                name="contract_end_at"
                placeholder="Select end contract"
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
          <div className="flex items-center space-x-2">
            <Form.Item
              label="Placement"
              name={"placement"}
              rules={[
                {
                  required: true,
                  message: "Placement must be filled",
                },
              ]}
              className="w-full"
            >
              <>
                <Select
                  value={dataContract?.placement}
                  onChange={(value) => onChangeSelect(value, "placement")}
                  placeholder="Select placement"
                >
                  {dataCompanyList?.map((option) => (
                    <Select.Option key={option.id} value={option.name}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </>
            </Form.Item>
            <Button
              onClick={() => setModalAddCompany(true)}
              className=" px-4 py-2 whitespace-nowrap border-0 bg-transparent text-primary100 shadow-none hover:text-primary75 focus:text-primary100"
            >
              Add Placement
            </Button>
          </div>
        </div>
        <div className={"md:grid md:grid-cols-2 md:gap-x-8"}>
          <Form.Item
            label="New Office"
            name={"new_office"}
            className={"col-span-1"}
          >
            <div>
              <Input
                value={dataContract?.new_office}
                name={"new_office"}
                onChange={onChangeInput}
                placeholder="Input new office"
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Resign Date"
            name={"resign_at"}
            className={"col-span-1"}
            rules={
              prevpath === "inactivate" && [
                {
                  required: true,
                  message: "Resign date must be filled",
                },
              ]
            }
          >
            <>
              <DatePicker
                name="resign_at"
                placeholder="Select resign date"
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
        </div>
        <div></div>
      </div>
      <div className={"border-b mb-4"}></div>
      <div className={"md:grid md:grid-cols-2 md:gap-x-8 px-6"}>
        <div className="flex flex-col space-y-3">
          <p className={"text-[#4D4D4D] font-inter font-medium text-sm/6"}>
            PENERIMAAN
          </p>
          <Form.Item
            label="Salary"
            name={"gaji_pokok"}
            rules={[
              {
                required: true,
                message: "Salary must be filled",
              },
            ]}
          >
            <div>
              <CurrencyFormat
                customInput={Input}
                placeholder={"Input salary"}
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

                  handleFormChange && handleFormChange();
                }}
                renderText={(value) => <p>{value}</p>}
              />
            </div>
          </Form.Item>

          {/* Show copy of default "Pengurangan" salary variable field (BPJS, Pph21) 
              if toggle is checked in Modal Tambah Variabel Gaji */}
          {Boolean(dataContract?.show_all_benefit) && (
            <>
              {defaultSalaryVar
                ?.filter(
                  (v) =>
                    dataContract[v.attrName] !== null &&
                    v.attrName !== "pph21" &&
                    dataContract[v.attrName] !== false
                )
                ?.map((item) => (
                  <Form.Item
                    key={item.attrName}
                    label={item.title}
                    name={item.attrName}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <div>
                      <CustomCurrencyInput
                        fieldLabel={item.attrName}
                        fieldName={item.attrName}
                        setDataForm={setDataContract}
                        value={countBPJSValue(item.percent)}
                        disabled
                      />
                    </div>
                  </Form.Item>
                ))}

              {dataContract?.pph21 !== null &&
                dataContract?.pph21 !== false && (
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
                        disabled={true}
                        renderText={(value) => <p>{value}</p>}
                      />
                    </>
                  </Form.Item>
                )}
            </>
          )}

          {dataContract?.salaries
            ?.filter((variable) => variable?.column?.type === 1)
            ?.map((variable) => (
              <Form.Item
                key={variable.employee_salary_column_id}
                label={variable?.column?.name}
                name={formatVariableName(variable?.column?.name)}
                rules={[
                  {
                    required: variable?.column?.required,
                    message: `${variable?.column?.name} wajib diisi`,
                  },
                ]}
              >
                <div className="flex flex-row items-center space-x-2">
                  <CustomCurrencyInput
                    fieldLabel={`${variable.column?.name?.toLowerCase()}`}
                    dataForm={dataContract}
                    setDataForm={setDataContract}
                    value={
                      dataContract?.salaries?.find(
                        (benefit) =>
                          benefit?.employee_salary_column_id ===
                          variable.column?.id
                      )?.value
                    }
                    dataColumn={variable.column}
                    payslipId={dataContract?.id}
                  />
                </div>
              </Form.Item>
            ))}
        </div>

        <div className="flex flex-col space-y-3 mt-5 md:mt-0">
          <p className={"text-[#4D4D4D] font-inter font-medium text-sm/6"}>
            PENGURANGAN
          </p>

          {/* Default "Pengurangan" salary variable field (BPJS) */}
          {defaultSalaryVar
            ?.filter(
              (v) =>
                dataContract[v.attrName] !== null &&
                v.attrName !== "pph21" &&
                dataContract[v.attrName] !== false
            )
            ?.map((item) => (
              <Form.Item
                key={item.attrName}
                label={item.title}
                name={item.attrName}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <div>
                  <CustomCurrencyInput
                    fieldLabel={item.attrName}
                    fieldName={item.attrName}
                    setDataForm={setDataContract}
                    value={countBPJSValue(item.percent)}
                    disabled
                  />
                </div>
              </Form.Item>
            ))}

          {/* Pph 21 field */}
          {dataContract?.pph21 !== null && dataContract?.pph21 !== false && (
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
                      pph21: Number(floatValue) || 0,
                    }));
                    handleFormChange && handleFormChange();
                  }}
                  renderText={(value) => <p>{value}</p>}
                />
              </>
            </Form.Item>
          )}

          {/* Variable list identical to the list in "Tambah Variabel Gaji" modal */}
          {dataContract?.salaries
            ?.filter((variable) => variable?.column?.type === 2)
            ?.map((variable) => {
              return (
                <Form.Item
                  key={variable.employee_salary_column_id}
                  label={variable?.column?.name}
                  name={formatVariableName(variable?.column?.name)}
                  rules={[
                    {
                      required: variable?.column?.required,
                      message: `${variable?.column?.name} wajib diisi`,
                    },
                  ]}
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
                      dataColumn={variable.column}
                      payslipId={dataContract?.id}
                    />
                  </div>
                </Form.Item>
              );
            })}
        </div>
      </div>
      <div className="col-span-2 mt-3">
        <ButtonSys
          type={"dashed"}
          onClick={() => {
            isAllowedToGetSalaryColumns && setModalSalaryVar(true);
          }}
          disabled={!isAllowedToGetSalaryColumns}
        >
          <p className="text-primary100 hover:text-primary75">
            + Tambah Variabel Gaji
          </p>
        </ButtonSys>
      </div>

      {/* Modal Add Salary Variable */}
      <AccessControl hasPermission={EMPLOYEE_SALARY_COLUMN_ADD}>
        <ModalSalaryVarAdd
          initProps={initProps}
          visible={modalSalaryVar}
          onvisible={setModalSalaryVar}
          loading={loadingSave}
          isAllowedToGetSalaryColumns={isAllowedToGetSalaryColumns}
          isAllowedToAddSalaryColumn={isAllowedToAddSalaryColumn}
          isAllowedToDeleteSalaryColumn={isAllowedToDeleteSalaryColumn}
          onOk={() => setModalSalaryVar(false)}
          refresh={refresh}
          setRefresh={setRefresh}
          selectedTags={selectedMultipliers}
          setSelectedTags={setSelectedMultipliers}
          payslipId={dataContract?.id}
          dataPayslip={dataContract}
          setDataPayslip={setDataContract}
        />
      </AccessControl>

      <AccessControl hasPermission={RECRUITMENT_ROLE_ADD}>
        <ModalAddRole
          initProps={initProps}
          visible={modalAddRole}
          onvisible={setModalAddRole}
          isAllowedToAddRole={isAllowedToAddRole}
          dataRoleTypeList={dataRoleTypeList}
          setRefresh={setRefresh}
        />
      </AccessControl>

      <AccessControl hasPermission={COMPANY_CLIENT_ADD}>
        <ModalAddCompany
          visible={modalAddCompany}
          onvisible={setModalAddCompany}
          isAllowedToAddCompany={isAllowedToAddCompanyClient}
          setRefresh={setRefresh}
        />
      </AccessControl>
    </Form>
  );
};

export default EmployeeContractForm;
