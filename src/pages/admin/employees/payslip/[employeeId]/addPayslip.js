import { CloseOutlined, ProfileOutlined } from "@ant-design/icons";
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
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CurrencyFormat from "react-currency-format";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_PAYSLIP_ADD,
  EMPLOYEE_PAYSLIP_DELETE,
  EMPLOYEE_PAYSLIP_GET,
  EMPLOYEE_PAYSLIP_UPDATE,
  EMPLOYEE_SALARY_COLUMNS_GET,
  EMPLOYEE_SALARY_COLUMN_ADD,
  EMPLOYEE_SALARY_COLUMN_DELETE,
  EMPLOYEE_SALARY_COLUMN_UPDATE,
} from "lib/features";

import ButtonSys from "../../../../../components/button";
import { CheckIconSvg } from "../../../../../components/icon";
import LayoutDashboard from "../../../../../components/layout-dashboard";
import st from "../../../../../components/layout-dashboard.module.css";
import { ModalUbah } from "../../../../../components/modal/modalCustom";
import ModalSalaryVarAdd, {
  defaultSalaryVar,
} from "../../../../../components/modal/payslips/modalSalaryVarAdd";
import CustomCurrencyInput from "../../../../../components/screen/employee/CustomCurrencyInput";
import {
  momentFormatDate,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import httpcookie from "cookie";

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
  const isAllowedToUpdatePayslip = hasPermission(EMPLOYEE_PAYSLIP_UPDATE);
  const isAllowedToDeletePayslip = hasPermission(EMPLOYEE_PAYSLIP_DELETE);

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
    pph21: 0,
    bpjs_ks: 0,
    bpjs_tk_jht: 0,
    bpjs_tk_jkk: 0,
    bpjs_tk_jkm: 0,
    bpjs_tk_jp: 0,
    total_gross_penerimaan: 0,
    total_gross_pengurangan: 0,
    take_home_pay: 0,
    year: 0,
    month: 0,
    salaries: [
      {
        id: 0,
        employee_salary_column_id: 0,
        employee_payslip_id: 0,
        value: 0,
        column: [],
      },
    ],
    show_all_benefit: false,
  });

  // Display selected variable list as fields in form
  const [receiveVarFields, setReceiveVarFields] = useState([]);
  const [reductionVarFields, setReductionVarFields] = useState([]);

  const [refresh, setRefresh] = useState(-1);
  const [isDraft, setIsDraft] = useState(false);

  // 1.2 Update
  const [oldMainSalary, setOldMainSalary] = useState(0);
  const [canUpdateMainSalary, setCanUpdateMainSalary] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [disablePublish, setDisablePublish] = useState(false);

  // 1.3 Delete
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 1.3. Modal salary variable
  const [modalSalaryVar, setModalSalaryVar] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [selectedMultipliers, setSelectedMultipliers] = useState([]);

  // 2. HELPER FUNCTION
  // Format string variable name. e.g. "tunjangan_transport"
  const formatVariableName = (name) => name?.toLowerCase().split(" ").join("_");

  // Count total gross penerimaan & pengurangan
  const sumValues = (arr) => {
    return arr?.reduce((a, b) => a + b, 0);
  };

  // Count BPJS value
  const countBPJSValue = (percent) => {
    // Get penerimaan field value which selected as multiplier (PENGALI NOMINAL BPJS)
    const selectedMultiplierValues = dataPayslip.salaries
      .filter((benefit) => benefit.is_amount_for_bpjs === 1)
      .map((b) => b.value);

    // Sum gaji pokok and multiplier values, then calculate final result
    const totalMultiplier =
      Number(dataPayslip?.gaji_pokok ?? 0) +
      sumValues(selectedMultiplierValues);

    let result = Math.round(totalMultiplier * (percent / 100) * 100) / 100;

    return result || 0;
  };

  // 3. USE EFFECT
  // 3.1 Get employee payslip detail for edit payslip (Payslip ID is available)
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
            const resData = response2.data;
            setDataPayslip(resData);
            setOldMainSalary(resData?.gaji_pokok);

            const receiveVariables = resData?.salaries?.filter(
              (variable) => variable?.column.type === 1
            );

            const reductionVariables = resData?.salaries?.filter(
              (variable) => variable?.column.type === 2
            );

            setReceiveVarFields(receiveVariables);
            setReductionVarFields(reductionVariables);

            // insert previously selected BPJS multiplier to state
            const prevSelectedMultipliers = response2.data.salaries?.filter(
              (variable) => variable.is_amount_for_bpjs
            );
            setSelectedMultipliers(prevSelectedMultipliers);
          } else {
            notification.error({
              message: `${response2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: err.response,
            duration: 3,
          });
        })
        .finally(() => setpraloading(false));
    }
  }, [isAllowedToGetPayslip, payslipId, refresh]);

  // 3.2. Disable "Terbitkan" button if any required field is empty
  useEffect(() => {
    // Check if all required dynamic benefit fields are available and filled
    const requiredBenefitIds = dataPayslip.salaries
      ?.filter((field) => field?.column?.required === 1)
      .map((field) => field?.employee_salary_column_id);
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
      dataPayslip.month &&
        dataPayslip.year &&
        dataPayslip.total_hari_kerja &&
        dataPayslip.tanggal_dibayarkan &&
        dataPayslip.total_gross_penerimaan &&
        dataPayslip.total_gross_pengurangan &&
        dataPayslip.take_home_pay &&
        dataPayslip.gaji_pokok &&
        Number(dataPayslip.pph21 !== null ? dataPayslip.pph21 : true) &&
        isAllRequiredBenefitFilled
    );

    if (!isAllRequiredPayslipFilled) {
      setDisablePublish(true);
    } else {
      setDisablePublish(false);
    }
  }, [dataPayslip]);

  // 3.3. Auto update total gross penerimaan, total gross pengurangan & take home pay
  // total gross penerimaan
  useEffect(() => {
    const receiveBenefits = dataPayslip?.salaries?.filter(
      (benefit) => benefit?.column?.type === 1
    );
    let receiveBenefitValues = receiveBenefits.map((benefit) => benefit.value);

    // if BPJS/Pph shown in Penerimaan, sum the value to Total Gross Penerimaan
    if (dataPayslip?.show_all_benefit) {
      let defaultReductionBenefitValues = defaultSalaryVar
        ?.filter((v) => dataPayslip[v.attrName] !== null)
        ?.map((v) => dataPayslip[v.attrName]);

      receiveBenefitValues = receiveBenefitValues.concat(
        defaultReductionBenefitValues
      );
    }

    let newTotalGrossPenerimaan =
      (dataPayslip?.gaji_pokok ?? 0) + sumValues(receiveBenefitValues);

    setDataPayslip((prev) => ({
      ...prev,
      total_gross_penerimaan: newTotalGrossPenerimaan,
    }));
  }, [
    receiveVarFields,
    dataPayslip?.gaji_pokok,
    dataPayslip?.show_all_benefit,
  ]);

  // total gross pengurangan
  useEffect(() => {
    const reductionBenefits = dataPayslip?.salaries?.filter(
      (benefit) => benefit?.column?.type === 2
    );
    let reductionBenefitValues = reductionBenefits.map(
      (benefit) => benefit.value
    );

    let newTotalGrossPengurangan =
      Number(dataPayslip?.pph21 ?? 0) +
      Number(dataPayslip?.bpjs_ks ?? 0) +
      Number(dataPayslip?.bpjs_tk_jht ?? 0) +
      Number(dataPayslip?.bpjs_tk_jkk ?? 0) +
      Number(dataPayslip?.bpjs_tk_jkm ?? 0) +
      Number(dataPayslip?.bpjs_tk_jp ?? 0) +
      sumValues(reductionBenefitValues);

    setDataPayslip((prev) => ({
      ...prev,
      total_gross_pengurangan: newTotalGrossPengurangan,
      take_home_pay:
        dataPayslip.total_gross_penerimaan - newTotalGrossPengurangan,
    }));
  }, [
    reductionVarFields,
    dataPayslip?.bpjs_ks,
    dataPayslip?.bpjs_tk_jht,
    dataPayslip?.bpjs_tk_jkk,
    dataPayslip?.bpjs_tk_jkm,
    dataPayslip?.bpjs_tk_jp,
    dataPayslip?.pph21,
  ]);

  // take home pay
  useEffect(() => {
    setDataPayslip((prev) => ({
      ...prev,
      take_home_pay:
        dataPayslip?.total_gross_penerimaan -
        dataPayslip?.total_gross_pengurangan,
    }));
  }, [
    dataPayslip?.total_gross_penerimaan,
    dataPayslip?.total_gross_pengurangan,
  ]);

  // 4. Handler
  // 4.1. Handle input change
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

  // 4.2. Handle Update Payslip Draft/Posted
  const handleUpdatePayslip = (isPosted) => {
    if (!isAllowedToUpdatePayslip) {
      permissionWarningNotification("Memperbarui", "Slip Gaji Karyawan");
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
              message: `Draft slip gaji berhasil diperbarui.`,
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
            message: `Gagal memperbarui slip gaji karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal memperbarui slip gaji karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  // 4.3. Handle Delete Payslip
  const handleDeletePayslip = () => {
    if (!isAllowedToDeletePayslip) {
      permissionWarningNotification("Menghapus", "Data Slip Gaji");
      setLoadingDelete(false);
      return;
    }

    if (payslipId) {
      setLoadingDelete(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteEmployeePayslip?id=${payslipId}`,
        {
          method: `DELETE`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            notification.success({
              message: "Slip gaji berhasil dihapus",
              duration: 3,
            });
            rt.back();
          } else {
            notification.error({
              message: "Gagal menghapus slip gaji",
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: "Gagal menghapus slip gaji",
            duration: 3,
          });
        })
        .finally(() => setLoadingDelete(false));
    }
  };

  // console.log({ dataPayslip });
  // console.log({ reductionVarFields });
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
                <CloseOutlined />
                <p>Batalkan</p>
              </div>
            </ButtonSys>
            <ButtonSys
              type={"default"}
              onClick={() => {
                setIsDraft(true);
                setModalUpdate(true);
              }}
              disabled={!isAllowedToUpdatePayslip}
            >
              <div className="flex flex-row space-x-2">
                {/* <ClipboardListIconSvg color={"#35763B"} size={16} /> */}
                <ProfileOutlined />
                <p>Simpan Draft</p>
              </div>
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              onClick={() => {
                setIsDraft(false);
                setModalUpdate(true);
              }}
              disabled={!isAllowedToUpdatePayslip || disablePublish}
            >
              <div className="flex flex-row space-x-2">
                <CheckIconSvg color={"white"} size={16} />
                <p>Terbitkan</p>
              </div>
            </ButtonSys>
          </div>
        </div>

        {/* Form Buat Slip Gaji */}
        <Spin spinning={praloading}>
          <Form
            layout="vertical"
            form={instanceForm}
            className="md:grid md:grid-cols-2 md:gap-x-8"
          >
            <Form.Item
              label="Periode"
              name={"periode"}
              className="col-span-2"
              rules={[
                {
                  required: true,
                  message: "Periode wajib diisi",
                },
              ]}
            >
              <>
                <DatePicker
                  name="periode"
                  placeholder="Pilih periode"
                  className="w-full"
                  picker="month"
                  value={
                    moment(
                      `${dataPayslip?.year}-${dataPayslip?.month}`,
                      "YYYY-M"
                    ).isValid()
                      ? moment(
                          `${dataPayslip?.year}-${dataPayslip?.month}`,
                          "YYYY-M"
                        )
                      : null
                  }
                  format={"YYYY-M"}
                  onChange={(value, datestring) => {
                    const monthYearArr = datestring.split("-");
                    setDataPayslip((prev) => ({
                      ...prev,
                      year: Number(monthYearArr[0]),
                      month: Number(monthYearArr[1]),
                    }));
                  }}
                />
              </>
            </Form.Item>
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
                  min={1}
                  max={31}
                  value={dataPayslip?.total_hari_kerja}
                  name={"total_hari_kerja"}
                  onChange={(value) =>
                    onChangeSelect(value, "total_hari_kerja")
                  }
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
                className="mb-2"
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
                onChange={(e) => {
                  setCanUpdateMainSalary(e.target.checked);
                  if (!e.target.checked) {
                    setDataPayslip((prev) => ({
                      ...prev,
                      gaji_pokok: oldMainSalary,
                    }));
                  }
                }}
              >
                Ubah gaji pokok
              </Checkbox>

              {/* Show copy of default "Pengurangan" salary variable field (BPJS, Pph21) 
              if toggle is checked in Modal Tambah Variabel Gaji */}
              {dataPayslip?.show_all_benefit && (
                <>
                  {defaultSalaryVar
                    ?.filter(
                      (v) =>
                        dataPayslip[v.attrName] !== null &&
                        v.attrName !== "pph21"
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
                            setDataForm={setDataPayslip}
                            value={countBPJSValue(item.percent)}
                            disabled
                          />
                        </div>
                      </Form.Item>
                    ))}

                  {dataPayslip?.pph21 !== null && (
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
                          value={Number(dataPayslip?.pph21 || 0)}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          prefix={"Rp"}
                          allowNegative={false}
                          disabled={true}
                          // onValueChange={(values) => {
                          //   const { formattedValue, value, floatValue } = values;
                          //   setDataPayslip((prev) => ({
                          //     ...prev,
                          //     pph21: Number(floatValue) || 0,
                          //   }));
                          // }}
                          renderText={(value) => <p>{value}</p>}
                        />
                      </>
                    </Form.Item>
                  )}
                </>
              )}

              {dataPayslip?.salaries
                ?.filter((variable) => variable?.column?.type === 1)
                .map((variable) => (
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
                        fieldLabel={`${variable?.column?.name.toLowerCase()}`}
                        dataForm={dataPayslip}
                        setDataForm={setDataPayslip}
                        value={variable.value}
                        dataColumn={variable.column}
                        payslipId={payslipId}
                        setVarFields={setReceiveVarFields}
                      />
                    </div>
                  </Form.Item>
                ))}
            </div>

            <div className="flex flex-col">
              <p className="mig-heading--5 mb-3">PENGURANGAN</p>

              {/* Default "Pengurangan" salary variable field (BPJS) */}
              {defaultSalaryVar
                ?.filter(
                  (v) =>
                    dataPayslip[v.attrName] !== null && v.attrName !== "pph21"
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
                        setDataForm={setDataPayslip}
                        value={countBPJSValue(item.percent)}
                        disabled
                      />
                    </div>
                  </Form.Item>
                ))}

              {/* Pph 21 field */}
              {dataPayslip?.pph21 !== null && (
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
                      value={Number(dataPayslip?.pph21 || 0)}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"Rp"}
                      allowNegative={false}
                      onValueChange={(values) => {
                        const { formattedValue, value, floatValue } = values;
                        setDataPayslip((prev) => ({
                          ...prev,
                          pph21: Number(floatValue) || 0,
                        }));
                      }}
                      renderText={(value) => <p>{value}</p>}
                    />
                  </>
                </Form.Item>
              )}

              {/* Variable list identical to the list in "Tambah Variabel Gaji" modal */}
              {dataPayslip?.salaries
                ?.filter((variable) => variable?.column?.type === 2)
                .map((variable) => {
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
                          fieldLabel={`${variable?.column?.name?.toLowerCase()}`}
                          dataForm={dataPayslip}
                          setDataForm={setDataPayslip}
                          value={variable?.value}
                          dataColumn={variable.column}
                          payslipId={payslipId}
                          setVarFields={setReductionVarFields}
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
        </Spin>
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
          isAllowedToUpdateSalaryColumn={isAllowedToUpdateSalaryColumn}
          isAllowedToDeleteSalaryColumn={isAllowedToDeleteSalaryColumn}
          onOk={() => setModalSalaryVar(false)}
          refresh={refresh}
          setRefresh={setRefresh}
          selectedTags={selectedMultipliers}
          setSelectedTags={setSelectedMultipliers}
          payslipId={payslipId}
          dataPayslip={dataPayslip}
          setDataPayslip={setDataPayslip}
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
            payslipId && isDraft
              ? handleUpdatePayslip(0)
              : handleUpdatePayslip(1);
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
                {momentFormatDate(
                  dataPayslip?.tanggal_dibayarkan,
                  "-",
                  "MMMM YYYY"
                )}
              </strong>
              ?
            </p>
          ) : (
            <p className="">
              Apakah Anda yakin ingin menerbitkan slip gaji untuk&nbsp;
              <strong>{dataPayslip?.employee?.name || "-"}</strong> periode{" "}
              <strong>
                {momentFormatDate(
                  dataPayslip?.tanggal_dibayarkan,
                  "-",
                  "MMMM YYYY"
                )}
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
