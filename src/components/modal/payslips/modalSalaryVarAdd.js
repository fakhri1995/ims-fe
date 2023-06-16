import { PlusOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Switch,
  Tag,
  notification,
} from "antd";
import CheckableTag from "antd/lib/tag/CheckableTag";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../lib/helper";
import ButtonSys from "../../button";
import { CircleCheckIconSvg, SquarePlusIconSvg, XIconSvg } from "../../icon";

export const defaultSalaryVar = [
  {
    title: "BPJS KS (5% Perusahaan)",
    attrName: "bpjs_ks",
    percent: 5,
  },
  {
    title: "BPJS TK-JHT (5,7% Perusahaan)",
    attrName: "bpjs_tk_jht",
    percent: 5.7,
  },
  {
    title: "BPJS TK-JKK (0,24% Perusahaan)",
    attrName: "bpjs_tk_jkk",
    percent: 0.24,
  },
  {
    title: "BPJS TK-JKM (0,3% Perusahaan)",
    attrName: "bpjs_tk_jkm",
    percent: 0.3,
  },
  {
    title: "BPJS TK-JP (3% Perusahaan)",
    attrName: "bpjs_tk_jp",
    percent: 3,
  },
  {
    title: "PPh 21",
    attrName: "pph21",
    percent: 0,
  },
];

const ModalSalaryVarAdd = ({
  initProps,
  visible,
  onvisible,
  onOk,
  loading,
  refresh,
  setRefresh,
  selectedTags,
  setSelectedTags,
  isAllowedToGetSalaryColumns,
  isAllowedToAddSalaryColumn,
  isAllowedToDeleteSalaryColumn,
  payslipId,
  dataPayslip,
  setDataPayslip,
}) => {
  // 1. Use State
  const [praLoading, setPraLoading] = useState(false);

  const [isInputReceiveVar, setInputReceiveVar] = useState(false);
  const [isInputReductionVar, setInputReductionVar] = useState(false);
  const [dataVariable, setDataVariable] = useState({
    name: "",
    percent: 0,
    type: 0,
    required: false,
    is_amount_for_bpjs: false,
  });
  const [receiveVarOptions, setReceiveVarOptions] = useState([]);
  const [reductionVarOptions, setReductionVarOptions] = useState([]);

  const [currentVariableIds, setCurrentVariableIds] = useState(-1);

  // 2. Use Effect
  // 2.1. Get salary variable list
  useEffect(() => {
    if (!isAllowedToGetSalaryColumns) {
      permissionWarningNotification("Mendapatkan", "Daftar Variabel Gaji");
      setPraLoading(false);
      return;
    }
    if (visible === true) {
      setPraLoading(true);
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
            // Set checkbox list of variables
            const receiveVariables = dataVar.filter(
              (variable) => variable.type === 1
            );
            const reductionVariables = dataVar.filter(
              (variable) => variable.type === 2
            );
            setReceiveVarOptions(receiveVariables);
            setReductionVarOptions(reductionVariables);
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
        .finally(() => setPraLoading(false));
    }
  }, [isAllowedToGetSalaryColumns, refresh, visible]);

  /**
   * If form already has payslip Id, then checked variable in modal &
   * penerimaan/pengurangan fields come from dataPayslip (API getEmployeePayslip)
   * */
  useEffect(() => {
    if (payslipId) {
      const dataVarIds = dataPayslip?.salaries?.map(
        (variable) => variable.employee_salary_column_id
      );

      setCurrentVariableIds(dataVarIds);
    }
  }, [payslipId, dataPayslip?.salaries]);

  // Triggered if any variable option is deleted
  useEffect(() => {
    let newSalaries = dataPayslip?.salaries?.filter((salary) => salary.column);
    setDataPayslip((prev) => ({
      ...prev,
      salaries: newSalaries,
    }));
  }, [receiveVarOptions, reductionVarOptions]);

  // 3. Event
  const handleAddVariable = () => {
    if (!isAllowedToAddSalaryColumn) {
      permissionWarningNotification("Menambah", "Variabel Gaji");
      setPraLoading(false);
      return;
    }

    const payload = {
      ...dataVariable,
      required: 0,
    };

    setPraLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addEmployeeSalaryColumn`, {
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
          setRefresh((prev) => prev + 1);
          notification.success({
            message: `Variabel gaji berhasil ditambahkan`,
            duration: 3,
          });
          setInputReceiveVar(false);
        } else {
          notification.error({
            message: `Gagal menambah variabel gaji. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambah variabel gaji. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setPraLoading(false);
        setDataVariable({ ...dataVariable, name: "" });
      });
  };

  const handleDeleteVariable = (variableId) => {
    if (!isAllowedToDeleteSalaryColumn) {
      permissionWarningNotification("Menghapus", "Variabel Gaji");
      setPraLoading(false);
      return;
    }
    setPraLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteEmployeeSalaryColumn?id=${variableId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setRefresh((prev) => prev + 1);
          notification.success({
            message: res2.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus variabel gaji. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setPraLoading(false));
  };

  const handleClickTag = (tag, checked) => {
    const newSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(
          (t) => t.employee_salary_column_id !== tag.employee_salary_column_id
        );

    setSelectedTags(newSelectedTags);

    const selectedMultiplierIds = newSelectedTags.map(
      (multiplier) => multiplier?.column?.id
    );

    // Adjust is_amount_for_bpjs with selected variable for BPJS multiplier
    for (let idx in dataPayslip?.salaries) {
      if (
        selectedMultiplierIds.includes(
          dataPayslip?.salaries[idx]?.employee_salary_column_id
        )
      ) {
        dataPayslip.salaries[idx]["is_amount_for_bpjs"] = 1;
      } else {
        dataPayslip.salaries[idx]["is_amount_for_bpjs"] = 0;
      }
    }
  };

  return (
    <Modal
      title={
        <div className="flex flex-row justify-between items-center">
          <p>Tambah Variabel Gaji</p>
          <CircleCheckIconSvg size={32} color={"#35763B"} />
        </div>
      }
      visible={visible}
      closable={false}
      footer={
        <Spin spinning={loading}>
          <div className="flex flex-row justify-between my-2">
            <ButtonSys type={"default"} onClick={() => onvisible(false)}>
              Batalkan
            </ButtonSys>
            <ButtonSys type={"primary"} onClick={onOk}>
              Simpan
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <Spin spinning={praLoading}>
        <Switch
          checked={dataPayslip?.show_all_benefit}
          onChange={(checked) =>
            setDataPayslip((prev) => ({ ...prev, show_all_benefit: checked }))
          }
          className="mb-3"
        ></Switch>
        <div className="grid grid-cols-2 gap-x-8">
          {/* Variabel penerimaan */}
          <div className="">
            <h5 className="mig-heading--5 mb-2">PENERIMAAN</h5>
            <div className="flex flex-col space-y-2 space-x-0 mb-2">
              {/* Default "Penerimaan" salary variable checkboxes (Gaji pokok, BPJS, Pph21) */}
              <div className="flex flex-row items-center justify-between">
                <Checkbox checked={true} disabled={true}>
                  Gaji Pokok
                </Checkbox>
                <Tag color="#35763B" className="rounded text-white m-0">
                  BPJS
                </Tag>
              </div>

              {dataPayslip?.show_all_benefit &&
                defaultSalaryVar
                  .filter((v) => dataPayslip[v.attrName] !== null)
                  ?.map((item) => (
                    <Checkbox
                      key={item.attrName}
                      checked={dataPayslip[item.attrName] !== null}
                      disabled={true}
                    >
                      {item.title}
                    </Checkbox>
                  ))}

              {/* Additional "Penerimaan" salary variable checkboxes */}
              {receiveVarOptions?.map((option, idx) => (
                <div
                  key={idx}
                  className="flex flex-row justify-between items-center"
                >
                  <Checkbox
                    defaultChecked={
                      currentVariableIds?.includes(option.id) ? true : false
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        let newSalaryVar = {
                          column: option,
                          employee_salary_column_id: option.id,
                          is_amount_for_bpjs: 0,
                          value: 0,
                        };

                        // deep clone salaries
                        let updatedSalaryVars = JSON.parse(
                          JSON.stringify(dataPayslip.salaries)
                        );

                        let updatedSalaryVarsId = updatedSalaryVars.map(
                          (v) => v.employee_salary_column_id
                        );

                        // update salaries
                        if (!updatedSalaryVarsId.includes(option.id)) {
                          updatedSalaryVars.push(newSalaryVar);
                        }

                        setDataPayslip({
                          ...dataPayslip,
                          salaries: updatedSalaryVars,
                        });
                      } else {
                        // Remove attribute in dataPaylip's salaries
                        const updatedSalaryVars = dataPayslip?.salaries?.filter(
                          (variable) => variable.column?.id !== option?.id
                        );
                        setDataPayslip({
                          ...dataPayslip,
                          salaries: updatedSalaryVars,
                        });

                        // use for removing BPJS tag if uncheck
                        const newSelectedTags = selectedTags.filter(
                          (tag) => tag.column?.id !== option.id
                        );
                        setSelectedTags(newSelectedTags);
                      }
                    }}
                  >
                    {option.name}
                  </Checkbox>

                  <div className="flex flex-row items-center space-x-1">
                    {/* Show tag "BPJS" if the variable is selected as multiplier */}
                    {selectedTags.some(
                      (tag) => tag.column?.name == option.name
                    ) && (
                      <Tag color="#35763B" className="rounded text-white m-0">
                        BPJS
                      </Tag>
                    )}
                    <Popconfirm
                      title={
                        <p className="w-40">
                          Apakah Anda yakin ingin menghapus variabel{" "}
                          <strong>{option.name}</strong>?
                        </p>
                      }
                      okText={"Ya"}
                      cancelText={"Tidak"}
                      onConfirm={() => handleDeleteVariable(option.id)}
                    >
                      <button className="flex items-center bg-transparent hover:opacity-70">
                        <XIconSvg color={"#BF4A40"} size={16} />
                      </button>
                    </Popconfirm>
                  </div>
                </div>
              ))}
            </div>

            {isInputReceiveVar ? (
              <div className="flex flex-row items-center -ml-1 space-x-2">
                <button
                  onClick={() => {
                    dataVariable.name?.length
                      ? handleAddVariable()
                      : setInputReceiveVar(false);
                  }}
                  className="bg-transparent hover:opacity-75"
                >
                  <SquarePlusIconSvg color={"#35763B"} size={24} />
                </button>

                <Input
                  size="small"
                  placeholder="Masukkan variabel"
                  autoFocus
                  onPressEnter={() => {
                    dataVariable.name?.length
                      ? handleAddVariable()
                      : setInputReceiveVar(false);
                  }}
                  value={dataVariable.name}
                  onChange={(e) =>
                    setDataVariable({ ...dataVariable, name: e.target.value })
                  }
                  onFocus={() => setDataVariable({ ...dataVariable, type: 1 })}
                />
              </div>
            ) : (
              <button
                className="flex flex-row items-center -ml-1 bg-transparent hover:opacity-75 space-x-1"
                onClick={() => {
                  setDataVariable({ ...dataVariable, name: "" });
                  setInputReceiveVar(true);
                  setInputReductionVar(false);
                }}
              >
                <SquarePlusIconSvg color={"#35763B"} size={24} />
                <p className="text-primary100 ">Tambah</p>
              </button>
            )}
          </div>

          {/* Variabel pengurangan */}
          <div className="">
            <h5 className="mig-heading--5 mb-2">PENGURANGAN</h5>
            <div className="flex flex-col space-y-2 space-x-0 mb-2">
              {/* Default "Pengurangan" salary variable checkboxes (BPJS, Pph21) */}
              {defaultSalaryVar.map((item) => (
                <Checkbox
                  key={item.attrName}
                  checked={dataPayslip[item.attrName] !== null}
                  onChange={(e) => {
                    setDataPayslip((prev) => ({
                      ...prev,
                      [item.attrName]: e.target?.checked ? 0 : null,
                    }));
                  }}
                >
                  {item.title}
                </Checkbox>
              ))}

              {/* Additional "Pengurangan" salary variable checkboxes */}
              {reductionVarOptions?.map((option, idx) => (
                <div key={idx}>
                  <div className="flex flex-row justify-between items-center">
                    <Checkbox
                      defaultChecked={
                        currentVariableIds?.includes(option.id) ? true : false
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          let newSalaryVar = {
                            column: option,
                            employee_salary_column_id: option.id,
                            is_amount_for_bpjs: 0,
                            value: 0,
                          };

                          // deep clone salaries
                          let updatedSalaryVars = JSON.parse(
                            JSON.stringify(dataPayslip.salaries)
                          );

                          let updatedSalaryVarsId = updatedSalaryVars.map(
                            (v) => v.employee_salary_column_id
                          );

                          // update salaries
                          if (!updatedSalaryVarsId.includes(option.id)) {
                            updatedSalaryVars.push(newSalaryVar);
                          }

                          setDataPayslip({
                            ...dataPayslip,
                            salaries: updatedSalaryVars,
                          });
                        } else {
                          // Remove attribute in dataPaylip's salaries
                          const updatedSalaryVars =
                            dataPayslip?.salaries?.filter(
                              (variable) => variable.column?.id !== option?.id
                            );

                          setDataPayslip({
                            ...dataPayslip,
                            salaries: updatedSalaryVars,
                          });
                        }
                      }}
                    >
                      {option.name}
                    </Checkbox>
                    <Popconfirm
                      title={
                        <p className="w-40">
                          Apakah Anda yakin ingin menghapus variabel{" "}
                          <strong>{option.name}</strong>?
                        </p>
                      }
                      okText={"Ya"}
                      cancelText={"Tidak"}
                      onConfirm={() => handleDeleteVariable(option.id)}
                    >
                      <button className="flex items-center bg-transparent hover:opacity-70">
                        <XIconSvg color={"#BF4A40"} size={16} />
                      </button>
                    </Popconfirm>
                  </div>
                </div>
              ))}
            </div>

            {isInputReductionVar ? (
              <div className="flex flex-row items-center -ml-1 space-x-2">
                <button
                  onClick={() => {
                    dataVariable.name?.length
                      ? handleAddVariable()
                      : setInputReductionVar(false);
                  }}
                  className="bg-transparent hover:opacity-75"
                >
                  <SquarePlusIconSvg color={"#35763B"} size={24} />
                </button>

                <Input
                  size="small"
                  placeholder="Masukkan variabel"
                  autoFocus
                  onPressEnter={() => {
                    dataVariable.name?.length
                      ? handleAddVariable()
                      : setInputReductionVar(false);
                  }}
                  value={dataVariable.name}
                  onChange={(e) =>
                    setDataVariable({ ...dataVariable, name: e.target.value })
                  }
                  onFocus={() => setDataVariable({ ...dataVariable, type: 2 })}
                />
              </div>
            ) : (
              <button
                className="flex flex-row items-center -ml-1 bg-transparent hover:opacity-75 space-x-1"
                onClick={() => {
                  setDataVariable({ ...dataVariable, name: "" });
                  setInputReductionVar(true);
                  setInputReceiveVar(false);
                }}
              >
                <SquarePlusIconSvg color={"#35763B"} size={24} />
                <p className="text-primary100 ">Tambah</p>
              </button>
            )}
          </div>

          <div className="col-span-2 mt-5">
            <p className="mig-heading--5 mb-2">
              PILIH PENERIMAAN YANG TERMASUK PENGALI NOMINAL BPJS
            </p>
            <div className="flex flex-wrap">
              <Tag color="#35763B" className="py-1 px-3 rounded mb-2">
                <div className="flex flex-row items-center space-x-1">
                  <PlusOutlined />
                  <p>Gaji Pokok</p>
                </div>
              </Tag>
              {dataPayslip?.salaries
                ?.filter((variable) => variable.column?.type === 1)
                .map((tag, idx) => (
                  <CheckableTag
                    key={idx}
                    className="border border-primary100 py-1 px-3 rounded mb-2"
                    checked={tag?.is_amount_for_bpjs}
                    onChange={(checked) => handleClickTag(tag, checked)}
                  >
                    <div className="flex flex-row items-center space-x-1">
                      <PlusOutlined />
                      <p>{tag.column?.name}</p>
                    </div>
                  </CheckableTag>
                ))}
            </div>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default ModalSalaryVarAdd;
