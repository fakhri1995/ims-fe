import {
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

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_PAYSLIP_GET,
  EMPLOYEE_PAYSLIP_UPDATE,
  EMPLOYEE_PAYSLIP_VARIABLE_ADD,
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
import EmployeeContractForm from "../../../../../components/screen/employee/create/contract";
import {
  objectToFormData,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import httpcookie from "cookie";

moment.locale("id");

const EmployeePayslipAddIndex = ({ initProps, dataProfile, sidemenu }) => {
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

  //INIT
  const rt = useRouter();
  const { id: payslipId, employeeId } = rt.query;

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
    "Karyawan",
    // dataPayslip?.employee?.name,
    "Buat Slip Gaji"
  );

  const [instanceForm] = Form.useForm();

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [dataPayslip, setDataPayslip] = useState({
    id: null,
    employee_id: null,
    total_workdays: 0,
    date_paid: "",
    benefit_receive: {},
    benefit_reduce: {},
    total_gross_receive: "",
    total_gross_reduce: "",
    take_home_pay: "",
  });

  const [refresh, setRefresh] = useState(-1);
  const [isDraft, setIsDraft] = useState(false);

  // 1.2 Update
  const [canUpdateMainSalary, setCanUpdateMainSalary] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // 1.3. Delete
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 1.4. Modal salary variable
  const [modalSalaryVar, setModalSalaryVar] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeContract?id=${payslipId}`,
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
  const handleSavePayslip = () => {
    if (!isAllowedToUpdatePayslip) {
      permissionWarningNotification("Menyimpan", "Slip Gaji Karyawan");
      return;
    }

    const payloadFormData = objectToFormData(dataPayslip);
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployeeContract`, {
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
          notification.success({
            message: `Slip gaji berhasil ditambahkan.`,
            duration: 3,
          });
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
      <div className="shadow-lg rounded-md bg-white py-7 px-5">
        <div className="flex flex-row items-center justify-between mb-7">
          <h4 className="mig-heading--4">Buat Slip Gaji</h4>
          <div className="space-x-6">
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
              disabled={!isAllowedToUpdatePayslip}
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
          className="grid grid-cols-2 gap-x-8"
        >
          <Form.Item
            label="Total Hari Kerja"
            name={"total_workdays"}
            rules={[
              {
                required: true,
                message: "Total hari kerja wajib diisi",
              },
            ]}
          >
            <div>
              <InputNumber
                value={dataPayslip?.total_workdays}
                name={"total_workdays"}
                onChange={(value) => onChangeSelect(value, "total_workdays")}
                placeholder="Masukkan total hari kerja"
                className="w-full"
              />
            </div>
          </Form.Item>
          <Form.Item
            label="Tanggal Dibayarkan"
            name={"date_paid"}
            rules={[
              {
                required: true,
                message: "Tanggal dibayarkan wajib diisi",
              },
            ]}
          >
            <>
              <DatePicker
                name="date_paid"
                placeholder="Pilih tanggal dibayarkan"
                className="w-full"
                value={
                  moment(dataPayslip?.date_paid).isValid()
                    ? moment(dataPayslip?.date_paid)
                    : null
                }
                format={"YYYY-MM-DD"}
                onChange={(value, datestring) => {
                  onChangeDatePicker(datestring, "date_paid");
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
                <Input
                  value={dataPayslip?.benefit?.main_salary}
                  name={"main_salary"}
                  onChange={(e) => {
                    setDataPayslip((prev) => ({
                      ...prev,
                      benefit: { ...prev.benefit, main_salary: e.target.value },
                    }));
                  }}
                  placeholder="Masukkan gaji pokok"
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
            <Form.Item label="Tunjangan Uang Makan" name={"meal_allowance"}>
              <div>
                <Input
                  value={dataPayslip?.benefit?.meal_allowance}
                  name={"meal_allowance"}
                  onChange={(e) => {
                    setDataPayslip((prev) => ({
                      ...prev,
                      benefit: {
                        ...prev.benefit,
                        meal_allowance: e.target.value,
                      },
                    }));
                  }}
                  placeholder="Masukkan tunjangan uang makan"
                />
              </div>
            </Form.Item>
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
                <Input
                  value={dataPayslip?.benefit?.bpjs_ks}
                  name={"bpjs_ks"}
                  onChange={(e) => {
                    setDataPayslip((prev) => ({
                      ...prev,
                      benefit: { ...prev.benefit, bpjs_ks: e.target.value },
                    }));
                  }}
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
                  value={dataPayslip?.benefit?.bpjs_tk_jht}
                  name={"bpjs_tk_jht"}
                  onChange={(e) => {
                    setDataPayslip((prev) => ({
                      ...prev,
                      benefit: { ...prev.benefit, bpjs_tk_jht: e.target.value },
                    }));
                  }}
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
                  value={dataPayslip?.benefit?.bpjs_tk_jkk}
                  name={"bpjs_tk_jkk"}
                  onChange={(e) => {
                    setDataPayslip((prev) => ({
                      ...prev,
                      benefit: { ...prev.benefit, bpjs_tk_jkk: e.target.value },
                    }));
                  }}
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
                  value={dataPayslip?.benefit?.bpjs_tk_jkm}
                  name={"bpjs_tk_jkm"}
                  onChange={(e) => {
                    setDataPayslip((prev) => ({
                      ...prev,
                      benefit: { ...prev.benefit, bpjs_tk_jkm: e.target.value },
                    }));
                  }}
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
                  value={dataPayslip?.benefit?.bpjs_tk_jp}
                  name={"bpjs_tk_jp"}
                  onChange={(e) => {
                    setDataPayslip((prev) => ({
                      ...prev,
                      benefit: { ...prev.benefit, bpjs_tk_jp: e.target.value },
                    }));
                  }}
                  disabled
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
                <Input
                  value={dataPayslip?.benefit?.pph}
                  name={"pph"}
                  onChange={(e) => {
                    setDataPayslip((prev) => ({
                      ...prev,
                      benefit: { ...prev.benefit, pph: e.target.value },
                    }));
                  }}
                  placeholder="Masukkan pajak penghasilan"
                />
              </>
            </Form.Item>
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
            name={"total_gross_receive"}
            rules={[
              {
                required: true,
                message: "Total gross penerimaan wajib diisi",
              },
            ]}
          >
            <>
              <Input
                value={dataPayslip?.total_gross_receive}
                name={"total_gross_receive"}
                onChange={onChangeInput}
                placeholder="Masukkan total gross penerimaan"
                disabled
              />
            </>
          </Form.Item>
          <Form.Item
            label="Total Gross Pengurangan"
            name={"total_gross_reduce"}
            rules={[
              {
                required: true,
                message: "Total gross pengurangan wajib diisi",
              },
            ]}
          >
            <>
              <Input
                value={dataPayslip?.total_gross_reduce}
                name={"total_gross_reduce"}
                onChange={onChangeInput}
                placeholder="Masukkan total gross pengurangan"
                disabled
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
              <Input
                value={dataPayslip?.take_home_pay}
                name={"take_home_pay"}
                onChange={onChangeInput}
                placeholder="Masukkan take home pay"
                disabled
              />
            </>
          </Form.Item>
        </Form>
      </div>

      {/* Modal Add Salary Variable */}
      {/* TODO: change hasPermission */}
      <AccessControl hasPermission={EMPLOYEE_PAYSLIP_VARIABLE_ADD}>
        <ModalAddSalaryVar
          visible={modalSalaryVar}
          onvisible={setModalSalaryVar}
          loading={loadingSave}
          // onOk={}
          // disabled
        />
      </AccessControl>

      {/* Modal save payslip */}
      <AccessControl hasPermission={EMPLOYEE_PAYSLIP_UPDATE}>
        <ModalUbah
          title={`Konfirmasi Penerbitan Slip Gaji`}
          visible={modalUpdate}
          onvisible={setModalUpdate}
          onOk={handleSavePayslip}
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

export async function getServerSideProps({ req, res, params }) {
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

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "employee-payslip",
    },
  };
}

export default EmployeePayslipAddIndex;
