import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Spin,
  notification,
} from "antd";
import parse from "html-react-parser";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CurrencyFormat from "react-currency-format";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_PAYSLIP_ADD,
  EMPLOYEE_PAYSLIP_GET,
  EMPLOYEE_PAYSLIP_UPDATE,
  EMPLOYEE_SALARY_COLUMNS_GET,
  EMPLOYEE_SALARY_COLUMN_ADD,
  EMPLOYEE_SALARY_COLUMN_DELETE,
  EMPLOYEE_SALARY_COLUMN_UPDATE,
} from "lib/features";

import ButtonSys from "../../../../../components/button";
import { CheckIconSvg, XIconSvg } from "../../../../../components/icon";
import { ClipboardListIconSvg } from "../../../../../components/icon";
import LayoutDashboard from "../../../../../components/layout-dashboard";
import st from "../../../../../components/layout-dashboard.module.css";
import {
  ModalAddSalaryVar,
  ModalUbah,
} from "../../../../../components/modal/modalCustom";
import CustomCurrencyInput from "../../../../../components/screen/employee/CustomCurrencyInput";
import EmployeeContractForm from "../../../../../components/screen/employee/create/contract";
import {
  objectToFormData,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import httpcookie from "cookie";

moment.locale("id");

const EmployeePayslipAddIndex = ({
  initProps,
  dataProfile,
  sidemenu,
  employeeId,
  employeeName,
}) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetPayslip = hasPermission(EMPLOYEE_PAYSLIP_GET);
  const isAllowedToAddPayslip = hasPermission(EMPLOYEE_PAYSLIP_ADD);
  const isAllowedToUpdatePayslip = hasPermission(EMPLOYEE_PAYSLIP_UPDATE);
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

  //INIT
  const rt = useRouter();
  const { id: payslipId } = rt.query;

  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 4);
  pathTitleArr.splice(
    1,
    4,
    "Daftar Karyawan",
    "Slip Gaji",
    employeeName,
    "Buat Slip Gaji"
  );

  const [instanceForm] = Form.useForm();

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [dataPayslip, setDataPayslip] = useState({
    id: null,
    employee_id: employeeId,
    employee: {
      name: employeeName,
    },
    total_hari_kerja: 0,
    tanggal_dibayarkan: "",
    gaji_pokok: 0,
    // pph: 0,
    bpjs: {},
    total_gross_penerimaan: 0,
    total_gross_pengurangan: 0,
    take_home_pay: 0,
    salaries: [
      {
        id: 0,
        employee_salary_column_id: 0,
        employee_payslip_id: 0,
        value: 0,
        column: [],
      },
    ],
  });

  // Use for selected variable list to show as fields in form
  const [receiveVarFields, setReceiveVarFields] = useState([]);
  const [reductionVarFields, setReductionVarFields] = useState([]);

  const [refresh, setRefresh] = useState(-1);
  const [isDraft, setIsDraft] = useState(false);

  // 1.2 Update
  const [canUpdateMainSalary, setCanUpdateMainSalary] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [disablePublish, setDisablePublish] = useState(false);

  // 1.3. Modal salary variable
  const [modalSalaryVar, setModalSalaryVar] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [selectedMultipliers, setSelectedMultipliers] = useState([]);

  // 2. HELPER FUNCTION
  // Format string variable name. e.g. "tunjangan_transport"
  const formatVariableName = (name) => name.toLowerCase().split(" ").join("_");

  // Count total gross penerimaan & pengurangan
  const sumValues = (arr) => {
    return arr?.reduce((a, b) => a + b, 0);
  };

  // Count BPJS value
  const countBenefitValue = (percent) => {
    // Get penerimaan field value which selected as multiplier
    const selectedMultiplierIds = selectedMultipliers.map(
      (multiplier) => multiplier.id
    );
    const selectedMultiplierValues = dataPayslip.salaries
      ?.filter((benefit) =>
        selectedMultiplierIds.includes(benefit.employee_salary_column_id)
      )
      ?.map((multiplier) => multiplier.value);

    // Sum with gaji pokok, then calculate final result
    const totalMultiplier =
      (dataPayslip?.gaji_pokok ?? 0) + sumValues(selectedMultiplierValues);
    let result = Math.round(totalMultiplier * (percent / 100) * 100) / 100;

    return result || 0;
  };

  // 3. USE EFFECT
  // 3.1 Get employee payslip detail
  useEffect(() => {
    if (!isAllowedToGetPayslip) {
      permissionWarningNotification("Mendapatkan", "Detail Slip Gaji Karyawan");
      setpraloading(false);
      return;
    }
    if (payslipId) {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeePayslip?id=${payslipId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            setDataPayslip(response2.data);
          } else {
            notification.error({
              message: `${response2.message}`,
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
        .finally(() => setpraloading(false));
    }
  }, [isAllowedToGetPayslip, payslipId, refresh]);

  // 3.2 Get salary variable list for new payslip form (ID not yet available)
  useEffect(() => {
    if (!isAllowedToGetSalaryColumns) {
      permissionWarningNotification("Mendapatkan", "Daftar Variabel Gaji");
      setpraloading(false);
      return;
    }

    if (!payslipId) {
      setpraloading(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeSalaryColumns`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            let dataVar = response2.data;
            const receiveVariables = dataVar.filter(
              (variable) => variable.type === 1
            );
            const reductionVariables = dataVar.filter(
              (variable) => variable.type === 2
            );

            // Set checked variables to show as fields in form
            const requiredReceiveVariables = receiveVariables.filter(
              (variable) => variable.required === 1
            );
            const requiredReductionVariables = reductionVariables.filter(
              (variable) => variable.required === 1
            );
            setReceiveVarFields(requiredReceiveVariables);
            setReductionVarFields(requiredReductionVariables);
          } else {
            notification.error({
              message: `${response2.message}`,
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
        .finally(() => setpraloading(false));
    }
  }, [isAllowedToGetSalaryColumns, refresh, payslipId]);

  // 3.3. Disable "Terbitkan" button if any required field is empty
  useEffect(() => {
    // Check if all required dynamic benefit fields are available and filled
    const requiredBenefitIds = receiveVarFields
      .concat(reductionVarFields)
      .filter((field) => field.required === 1)
      .map((field) => field.id);

    const salaryIds = dataPayslip?.salaries?.map(
      (salary) => salary.employee_salary_column_id
    );

    const isHaveAllRequiredBenefit = requiredBenefitIds.every((id) =>
      salaryIds?.includes(id)
    );

    const isFilled = dataPayslip?.salaries
      ?.filter((salary) => salary?.column?.required === 1)
      .every((salary) => salary?.value !== 0);

    const isAllRequiredBenefitFilled = isHaveAllRequiredBenefit && isFilled;

    // Check if all required fields are filled
    const isAllRequiredPayslipFilled = Boolean(
      dataPayslip.total_hari_kerja &&
        dataPayslip.tanggal_dibayarkan &&
        dataPayslip.total_gross_penerimaan &&
        dataPayslip.total_gross_pengurangan &&
        dataPayslip.take_home_pay &&
        dataPayslip.gaji_pokok &&
        // dataPayslip.pph &&
        isAllRequiredBenefitFilled
    );

    if (!isAllRequiredPayslipFilled) {
      setDisablePublish(true);
    } else {
      setDisablePublish(false);
    }
  }, [dataPayslip]);

  // 3.4. Auto update total gross penerimaan, pengurangan, take home pay
  useEffect(() => {
    const receiveBenefits = dataPayslip?.salaries?.filter(
      (benefit) => benefit?.column?.type === 1
    );
    const reductionBenefits = dataPayslip?.salaries?.filter(
      (benefit) => benefit?.column?.type === 2
    );

    // if (receiveBenefits.length !== 0) {
    let receiveBenefitValues = receiveBenefits.map((benefit) => benefit.value);
    let reductionBenefitValues = reductionBenefits.map(
      (benefit) => benefit.value
    );

    let newTotalGrossPenerimaan =
      (dataPayslip?.gaji_pokok ?? 0) + sumValues(receiveBenefitValues);

    let newTotalGrossPengurangan =
      // (dataPayslip?.pph ?? 0) +
      sumValues(Object.values(dataPayslip?.bpjs ?? {})) +
      sumValues(reductionBenefitValues);

    setDataPayslip((prev) => ({
      ...prev,
      total_gross_penerimaan: newTotalGrossPenerimaan,
      total_gross_pengurangan: newTotalGrossPengurangan,
      take_home_pay: newTotalGrossPenerimaan - newTotalGrossPengurangan,
    }));
    // }
  }, [dataPayslip?.salaries, dataPayslip?.gaji_pokok, dataPayslip?.bpjs]);

  // 4. Handler
  // 4.1. Handle input change
  const onChangeInput = (e) => {
    setDataPayslip({
      ...dataPayslip,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDatePicker = (datestring, attributeName) => {
    setDataPayslip((prev) => ({
      ...prev,
      [attributeName]: datestring,
    }));
  };

  const onChangeSelect = (value, attributeName) => {
    setDataPayslip({
      ...dataPayslip,
      [attributeName]: value,
    });
  };

  // 4.2. Handle Add Payslip Draft/Posted
  const handleAddPayslip = (isPosted) => {
    if (!isAllowedToAddPayslip) {
      permissionWarningNotification("Menambah", "Slip Gaji Karyawan");
      return;
    }

    const payload = {
      ...dataPayslip,
      is_posted: isPosted,
    };

    setLoadingSave(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addEmployeePayslip`, {
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
          setModalUpdate(false);
          if (isDraft) {
            notification.success({
              message: `Draft slip gaji berhasil dibuat.`,
              duration: 3,
            });
          } else {
            notification.success({
              message: `Slip gaji berhasil ditambahkan.`,
              duration: 3,
            });
          }

          rt.push(`/admin/employees/payslip/${employeeId}`);
        } else {
          notification.error({
            message: `Gagal menambahkan slip gaji karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan slip gaji karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingSave(false));
  };

  // 4.3. Handle Update Payslip Draft/Posted
  const handleSavePayslip = (isPosted) => {
    if (!isAllowedToUpdatePayslip) {
      permissionWarningNotification("Menyimpan", "Slip Gaji Karyawan");
      return;
    }

    const payload = {
      ...dataPayslip,
      is_posted: isPosted,
    };
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployeePayslip`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          setModalUpdate(false);
          if (isDraft) {
            notification.success({
              message: `Draft slip gaji berhasil dibuat.`,
              duration: 3,
            });
          } else {
            notification.success({
              message: `Slip gaji berhasil ditambahkan.`,
              duration: 3,
            });
          }

          rt.push(`/admin/employees/payslip/${employeeId}`);
        } else {
          notification.error({
            message: `Gagal menyimpan slip gaji karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menyimpan slip gaji karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  // console.log({ dataPayslip });
  // console.log({ receiveVarFields });
  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="shadow-lg rounded-md bg-white py-7 px-5">
        <div className="flex flex-row items-center justify-between mb-7">
          <h4 className="mig-heading--4">Buat Slip Gaji</h4>
          <div
            className="space-y-2 md:space-y-0 md:space-x-6 flex flex-col 
            md:flex-row items-end "
          >
            <ButtonSys
              color={"danger"}
              type={"default"}
              onClick={() => rt.back()}
            >
              <div className="flex flex-row space-x-2">
                <XIconSvg color={"#BF4A40"} size={16} />
                <p>Batalkan</p>
              </div>
            </ButtonSys>
            <ButtonSys
              type={"default"}
              onClick={() => {
                setIsDraft(true);
                setModalUpdate(true);
              }}
              disabled={!isAllowedToUpdatePayslip || !isAllowedToAddPayslip}
            >
              <div className="flex flex-row space-x-2">
                <ClipboardListIconSvg color={"#35763B"} size={16} />
                <p>Simpan Draft</p>
              </div>
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              onClick={() => {
                setIsDraft(false);
                setModalUpdate(true);
              }}
              disabled={
                !isAllowedToUpdatePayslip ||
                !isAllowedToAddPayslip ||
                disablePublish
              }
            >
              <div className="flex flex-row space-x-2">
                <CheckIconSvg color={"white"} size={16} />
                <p>Terbitkan</p>
              </div>
            </ButtonSys>
          </div>
        </div>

        {/* Form Buat Slip Gaji */}
        <Form
          layout="vertical"
          form={instanceForm}
          className="md:grid md:grid-cols-2 md:gap-x-8"
        >
          <Form.Item
            label="Total Hari Kerja"
            name={"total_hari_kerja"}
            rules={[
              {
                required: true,
                message: "Total hari kerja wajib diisi",
              },
            ]}
          >
            <div>
              <InputNumber
                value={dataPayslip?.total_hari_kerja}
                name={"total_hari_kerja"}
                onChange={(value) => onChangeSelect(value, "total_hari_kerja")}
                placeholder="Masukkan total hari kerja"
                className="w-full"
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Tanggal Dibayarkan"
            name={"tanggal_dibayarkan"}
            rules={[
              {
                required: true,
                message: "Tanggal dibayarkan wajib diisi",
              },
            ]}
          >
            <>
              <DatePicker
                name="tanggal_dibayarkan"
                placeholder="Pilih tanggal dibayarkan"
                className="w-full"
                value={
                  moment(dataPayslip?.tanggal_dibayarkan).isValid()
                    ? moment(dataPayslip?.tanggal_dibayarkan)
                    : null
                }
                format={"YYYY-MM-DD"}
                onChange={(value, datestring) => {
                  onChangeDatePicker(datestring, "tanggal_dibayarkan");
                }}
              />
            </>
          </Form.Item>
          <div className="flex flex-col">
            <p className="mig-heading--5 mb-3">PENERIMAAN</p>
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
                  value={dataPayslip?.gaji_pokok || 0}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp"}
                  allowNegative={false}
                  disabled={canUpdateMainSalary ? false : true}
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue } = values;
                    setDataPayslip((prev) => ({
                      ...prev,
                      gaji_pokok: floatValue || 0,
                    }));
                  }}
                  renderText={(value) => <p>{value}</p>}
                />
              </div>
            </Form.Item>
            <Checkbox
              className="mb-3"
              checked={canUpdateMainSalary}
              onChange={(e) => setCanUpdateMainSalary(e.target.checked)}
            >
              Ubah gaji pokok
            </Checkbox>

            {/* Variable list identical to the list in "Tambah Variabel Gaji" modal */}
            <Spin spinning={praloading}>
              {receiveVarFields.map((variable, idx) => (
                <Form.Item
                  key={idx}
                  label={variable?.name}
                  name={formatVariableName(variable?.name)}
                  rules={[
                    {
                      required: variable?.required,
                      message: `${variable?.name} wajib diisi`,
                    },
                  ]}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <CustomCurrencyInput
                      fieldLabel={`${variable?.name.toLowerCase()}`}
                      dataForm={dataPayslip}
                      setDataForm={setDataPayslip}
                      value={
                        dataPayslip.salaries.find(
                          (benefit) =>
                            benefit?.employee_salary_column_id === variable.id
                        )?.value
                      }
                      idx={idx}
                      dataColumn={variable}
                      payslipId={payslipId}
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
            </Spin>
          </div>

          <div className="flex flex-col">
            <p className="mig-heading--5 mb-3">PENGURANGAN</p>
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
                  benefitType={"bpjs"}
                  setDataForm={setDataPayslip}
                  value={countBenefitValue(5)}
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
                  benefitType={"bpjs"}
                  setDataForm={setDataPayslip}
                  disabled
                  value={countBenefitValue(5.7)}
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
                  benefitType={"bpjs"}
                  setDataForm={setDataPayslip}
                  disabled
                  value={countBenefitValue(0.24)}
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
                  benefitType={"bpjs"}
                  setDataForm={setDataPayslip}
                  disabled
                  value={countBenefitValue(0.3)}
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
                  benefitType={"bpjs"}
                  setDataForm={setDataPayslip}
                  disabled
                  value={countBenefitValue(3)}
                />
              </div>
            </Form.Item>
            {/* <Form.Item
              label="PPh 21"
              name={"pph"}
              rules={[
                {
                  required: true,
                  message: "PPh 21 wajib diisi",
                },
              ]}>
              <>
                <CurrencyFormat
                  customInput={Input}
                  placeholder={"Masukkan PPh 21"}
                  value={dataPayslip?.pph || 0}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp"}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue } = values;
                    setDataPayslip((prev) => ({
                      ...prev,
                      pph: floatValue || 0,
                    }));
                  }}
                  renderText={(value) => <p>{value}</p>}
                />
              </>
            </Form.Item> */}
            {/* Variable list identical to the list in "Tambah Variabel Gaji" modal */}
            {reductionVarFields.map((variable, idx) => {
              let reductionFieldId = receiveVarFields.length + idx;
              return (
                <Form.Item
                  key={reductionFieldId}
                  label={variable.name}
                  name={formatVariableName(variable.name)}
                  rules={[
                    {
                      required: variable.required,
                      message: `${variable.name} wajib diisi`,
                    },
                  ]}
                >
                  <div>
                    <CustomCurrencyInput
                      fieldLabel={`${variable.name.toLowerCase()}`}
                      dataForm={dataPayslip}
                      setDataForm={setDataPayslip}
                      value={
                        dataPayslip.salaries.find(
                          (benefit) =>
                            benefit?.employee_salary_column_id === variable.id
                        )?.value
                      }
                      idx={reductionFieldId}
                      dataColumn={variable}
                      payslipId={payslipId}
                    />
                  </div>
                </Form.Item>
              );
            })}
          </div>
          <div className="col-span-2 mb-6">
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

          <p className="mig-heading--5 col-span-2 mb-3">TOTAL</p>
          <Form.Item
            label="Total Gross Penerimaan"
            name={"total_gross_penerimaan"}
            rules={[
              {
                required: true,
                message: "Total gross penerimaan wajib diisi",
              },
            ]}
          >
            <>
              <CurrencyFormat
                customInput={Input}
                placeholder={"Masukkan total gross penerimaan"}
                value={dataPayslip?.total_gross_penerimaan || 0}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"Rp"}
                allowNegative={false}
                disabled={true}
                renderText={(value) => <p>{value}</p>}
              />
            </>
          </Form.Item>
          <Form.Item
            label="Total Gross Pengurangan"
            name={"total_gross_pengurangan"}
            rules={[
              {
                required: true,
                message: "Total gross pengurangan wajib diisi",
              },
            ]}
          >
            <>
              <CurrencyFormat
                customInput={Input}
                placeholder={"Masukkan total gross pengurangan"}
                value={dataPayslip?.total_gross_pengurangan || 0}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"Rp"}
                allowNegative={false}
                disabled={true}
                renderText={(value) => <p>{value}</p>}
              />
            </>
          </Form.Item>
          <Form.Item
            label="Take Home Pay"
            name={"take_home_pay"}
            rules={[
              {
                required: true,
                message: "Take home pay wajib diisi",
              },
            ]}
            className="col-span-2"
          >
            <>
              <CurrencyFormat
                customInput={Input}
                placeholder={"Masukkan take home pay"}
                value={dataPayslip?.take_home_pay || 0}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"Rp"}
                allowNegative={true}
                disabled={true}
                renderText={(value) => <p>{value}</p>}
              />
            </>
          </Form.Item>
        </Form>
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
          onOk={() => setModalSalaryVar(false)}
          receiveVarFields={receiveVarFields}
          reductionVarFields={reductionVarFields}
          setReceiveVarFields={setReceiveVarFields}
          setReductionVarFields={setReductionVarFields}
          refresh={refresh}
          setRefresh={setRefresh}
          selectedTags={selectedMultipliers}
          setSelectedTags={setSelectedMultipliers}
          payslipId={payslipId}
          dataPayslip={dataPayslip}
          // disabled
        />
      </AccessControl>

      {/* Modal save payslip */}
      <AccessControl hasPermission={EMPLOYEE_PAYSLIP_UPDATE}>
        <ModalUbah
          title={
            isDraft
              ? "Konfirmasi Penyimpanan Draft Slip Gaji"
              : "Konfirmasi Penerbitan Slip Gaji"
          }
          visible={modalUpdate}
          onvisible={setModalUpdate}
          onOk={() => {
            payslipId
              ? isDraft
                ? handleSavePayslip(0)
                : handleSavePayslip(1)
              : isDraft
              ? handleAddPayslip(0)
              : handleAddPayslip(1);
          }}
          onCancel={() => {
            setModalUpdate(false);
          }}
          loading={loadingUpdate}
          okButtonText={"Ya, saya yakin"}
          disabled={!isAllowedToUpdatePayslip}
        >
          {isDraft ? (
            <p className="">
              Apakah Anda yakin ingin menyimpan draft slip gaji untuk&nbsp;
              <strong>{dataPayslip?.employee?.name || "-"}</strong> periode{" "}
              <strong>
                {moment(dataPayslip?.tanggal_dibayarkan).isValid()
                  ? moment(dataPayslip?.tanggal_dibayarkan).format("MMMM YYYY")
                  : "-"}
              </strong>
              ?
            </p>
          ) : (
            <p className="">
              Apakah Anda yakin ingin menerbitkan slip gaji untuk&nbsp;
              <strong>{dataPayslip?.employee?.name || "-"}</strong> periode{" "}
              <strong>
                {moment(dataPayslip?.tanggal_dibayarkan).isValid()
                  ? moment(dataPayslip?.tanggal_dibayarkan).format("MMMM YYYY")
                  : "-"}
              </strong>
              ?
            </p>
          )}
        </ModalUbah>
      </AccessControl>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, query }) {
  const employeeId = query.employeeId;
  var initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  const resourcesGE = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployee?id=${employeeId}`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGE = await resourcesGE.json();
  const employeeName = resjsonGE?.data?.name || "-";

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "employee-payslip",
      employeeId,
      employeeName,
    },
  };
}

export default EmployeePayslipAddIndex;
