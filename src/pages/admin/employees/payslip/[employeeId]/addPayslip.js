import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
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
    employee_id: null,
    total_hari_kerja: 0,
    tanggal_dibayarkan: "",
    // benefit_receive: {},
    // benefit_reduce: {},
    total_gross_penerimaan: "",
    total_gross_pengurangan: "",
    take_home_pay: "",
    benefit: {},
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

  // 1.3. Delete
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 1.4. Modal salary variable
  const [modalSalaryVar, setModalSalaryVar] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // 1.5. Formatted currency field
  const [formattedGrossPenerimaan, setFormattedGrossPenerimaan] = useState(0);
  const [formattedGrossPengurangan, setFormattedGrossPengurangan] = useState(0);
  const [formattedTakeHomePay, setFormattedTakeHomePay] = useState(0);

  // 2. USE EFFECT
  // 2.1 Get employee payslip detail
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

  // 2.2. Disable "Terbitkan" button if any required field is empty
  useEffect(() => {
    let requiredPayslipField = Boolean(
      dataPayslip.total_hari_kerja &&
        dataPayslip.tanggal_dibayarkan &&
        dataPayslip.total_gross_penerimaan &&
        dataPayslip.total_gross_pengurangan &&
        dataPayslip.take_home_pay
    );

    if (!requiredPayslipField) {
      setDisablePublish(true);
    } else {
      setDisablePublish(false);
    }
  }, [dataPayslip]);

  // 2.3 Get salary variable list
  useEffect(() => {
    if (!isAllowedToGetSalaryColumns) {
      permissionWarningNotification("Mendapatkan", "Daftar Variabel Gaji");
      setpraloading(false);
      return;
    }

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
  }, [isAllowedToGetSalaryColumns, refresh]);

  // 3. Handler
  // 3.1. Handle input change
  const onChangeInput = (e) => {
    setDataPayslip({
      ...dataPayslip,
      [e.target.name]: e.target.value,
    });

    // if (debouncedApiCall) {
    //   debouncedApiCall({
    //     ...dataPayslip,
    //     [e.target.name]: e.target.value,
    //   });
    // }
  };

  const onChangeDatePicker = (datestring, attributeName) => {
    setDataPayslip((prev) => ({
      ...prev,
      [attributeName]: datestring,
    }));

    // use for auto save
    // if (debouncedApiCall) {
    //   debouncedApiCall({
    //     ...dataPayslip,
    //     [attributeName]: datestring,
    //   });
    // }
  };

  const onChangeSelect = (value, attributeName) => {
    setDataPayslip({
      ...dataPayslip,
      [attributeName]: value,
    });

    // use for auto save
    // if (debouncedApiCall) {
    //   debouncedApiCall({
    //     ...dataContract,
    //     [attributeName]: value,
    //   });
    // }
  };

  // 3.2. Handle Save Payslip Draft/Posted
  const handleSavePayslip = (isPosted) => {
    if (!isAllowedToUpdatePayslip) {
      permissionWarningNotification("Menyimpan", "Slip Gaji Karyawan");
      return;
    }

    const payloadFormData = objectToFormData({
      ...dataPayslip,
      is_posted: isPosted,
    });
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployeePayslip`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
      },
      body: payloadFormData,
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

          rt.push(`/admin/employees/${employeeId}`);
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

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="shadow-lg rounded-md bg-white md:py-7 md:px-5">
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
              disabled={!isAllowedToUpdatePayslip}
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
              name={"main_salary"}
              rules={[
                {
                  required: true,
                  message: "Gaji pokok wajib diisi",
                },
              ]}
            >
              <div>
                <CustomCurrencyInput
                  fieldLabel={"gaji pokok"}
                  fieldName={"gaji_pokok"}
                  setDataForm={setDataPayslip}
                  disabled={canUpdateMainSalary ? false : true}
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
            {receiveVarFields.map((variable, idx) => (
              <Form.Item
                key={idx}
                label={variable.name}
                name={`${variable.name}`}
                rules={[
                  {
                    required: variable.required,
                    message: `${variable.name} wajib diisi`,
                  },
                ]}
              >
                <div className="flex flex-row items-center space-x-2">
                  <CustomCurrencyInput
                    fieldLabel={`${variable.name.toLowerCase()}`}
                    fieldName={`${variable.name
                      .toLowerCase()
                      .split(" ")
                      .join("_")}`}
                    setDataForm={setDataPayslip}
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
                  setDataForm={setDataPayslip}
                  disabled
                  // value={dataPayslip?.benefit?.bpjs_ks}
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
                  setDataForm={setDataPayslip}
                  disabled
                  // value={dataPayslip?.benefit?.bpjs_tk_jht}
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
                  setDataForm={setDataPayslip}
                  disabled
                  // value={dataPayslip?.benefit?.bpjs_tk_jkk}
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
                  setDataForm={setDataPayslip}
                  disabled
                  // value={dataPayslip?.benefit?.bpjs_tk_jkm}
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
                  setDataForm={setDataPayslip}
                  disabled
                  // value={dataPayslip?.benefit?.bpjs_tk_jp}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="PPh 21"
              name={"pph"}
              rules={[
                {
                  required: true,
                  message: "PPh 21 wajib diisi",
                },
              ]}
            >
              <>
                <CustomCurrencyInput
                  fieldLabel={`PPh 21`}
                  fieldName={"pph"}
                  setDataForm={setDataPayslip}
                  disabled
                  // value={dataPayslip?.benefit?.pph}
                />
              </>
            </Form.Item>
            {/* Variable list identical to the list in "Tambah Variabel Gaji" modal */}
            {reductionVarFields.map((variable) => (
              <Form.Item
                label={variable.name}
                name={`${variable.name}`}
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
                    fieldName={`${variable.name
                      .toLowerCase()
                      .split(" ")
                      .join("_")}`}
                    setDataForm={setDataPayslip}
                    disabled={variable.required}
                    // value={dataPayslip?.benefit[`${variable.name}
                  />
                </div>
              </Form.Item>
            ))}
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
                value={formattedGrossPenerimaan}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"Rp"}
                suffix={",00"}
                disabled
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  // formattedValue = $2,223
                  // value ie, 2223
                  setFormattedGrossPenerimaan(formattedValue);
                  setDataPayslip((prev) => ({
                    ...prev,
                    total_gross_penerimaan: value,
                  }));
                }}
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
                value={formattedGrossPengurangan}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"Rp"}
                suffix={",00"}
                disabled
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setFormattedGrossPengurangan(formattedValue);
                  setDataPayslip((prev) => ({
                    ...prev,
                    total_gross_pengurangan: value,
                  }));
                }}
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
                value={formattedTakeHomePay}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"Rp"}
                suffix={",00"}
                disabled
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setFormattedTakeHomePay(formattedValue);
                  setDataPayslip((prev) => ({
                    ...prev,
                    take_home_pay: value,
                  }));
                }}
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
          isAllowedToUpdateSalaryColumn={isAllowedToUpdateSalaryColumn}
          onOk={() => setModalSalaryVar(false)}
          receiveVarFields={receiveVarFields}
          reductionVarFields={reductionVarFields}
          setReceiveVarFields={setReceiveVarFields}
          setReductionVarFields={setReductionVarFields}
          refresh={refresh}
          setRefresh={setRefresh}
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
            isDraft ? handleSavePayslip(0) : handleSavePayslip(1);
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
              <strong>John Doe</strong> periode <strong>Oktober 2022</strong>?
            </p>
          ) : (
            <p className="">
              Apakah Anda yakin ingin menerbitkan slip gaji untuk&nbsp;
              <strong>John Doe</strong> periode <strong>Oktober 2022</strong>?
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
