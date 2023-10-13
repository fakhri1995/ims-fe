import { PlusOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Tag,
  notification,
} from "antd";
import CheckableTag from "antd/lib/tag/CheckableTag";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../lib/helper";
import ButtonSys from "../../button";
import { CircleCheckIconSvg, SquarePlusIconSvg, XIconSvg } from "../../icon";
import { defaultSalaryVar } from "./modalSalaryVarAdd";

const ModalSalaryVarManage = ({
  initProps,
  visible,
  onvisible,
  onOk,
  loading,
  disabled,
  isAllowedToGetSalaryColumns,
  isAllowedToAddSalaryColumn,
  isAllowedToDeleteSalaryColumn,
  isAllowedToUpdateSalaryColumn,
}) => {
  const [praLoading, setPraLoading] = useState(false);
  const [refresh, setRefresh] = useState(-1);

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

  const handleUpdateVariable = (variableData) => {
    if (!isAllowedToUpdateSalaryColumn) {
      permissionWarningNotification("Mengubah", "Variabel Gaji");
      setPraLoading(false);
      return;
    }

    setPraLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployeeSalaryColumn`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variableData),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          setRefresh((prev) => prev + 1);
          notification.success({
            message: `Variabel gaji berhasil diubah.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal mengubah variabel gaji. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah variabel gaji. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setPraLoading(false);
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
    checked
      ? handleUpdateVariable({
          ...tag,
          is_amount_for_bpjs: 1,
        })
      : handleUpdateVariable({
          ...tag,
          is_amount_for_bpjs: 0,
        });
  };

  // hapus semua variabel gaji
  // useEffect(() => {
  //   if (dataVariables.length > 1) {
  //     for (let i = 1; i < dataVariables.length; i++) {
  //       handleDeleteVariable(dataVariables[i].id);
  //     }
  //   }
  // }, [dataVariables]);

  return (
    <Modal
      title={
        <div className="flex flex-row justify-between items-center">
          <p>Kelola Variabel Gaji</p>

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
      <div className="grid grid-cols-2 gap-x-8">
        <p className="col-span-2 mb-5">
          Pilih variabel gaji yang ingin ditampilkan atau tambah variabel baru.
        </p>

        <div className="">
          <h5 className="mig-heading--5 mb-2">PENERIMAAN</h5>
          <div className="flex flex-col space-y-2 space-x-0 mb-2">
            <div className="flex flex-row items-center justify-between">
              <Checkbox checked={true} disabled={true}>
                Gaji Pokok
              </Checkbox>
              <Tag color="#35763B" className="rounded text-white m-0">
                BPJS
              </Tag>
            </div>
            {receiveVarOptions?.map((option, idx) => (
              <div
                key={idx}
                className="flex flex-row justify-between items-center"
              >
                <Checkbox
                  value={option.id}
                  checked={option.required}
                  onChange={(e) => {
                    handleUpdateVariable({
                      ...option,
                      is_amount_for_bpjs: false,
                      required: e.target.checked,
                    });
                  }}
                >
                  {option.name}
                </Checkbox>

                <div className="flex flex-row items-center space-x-1">
                  {/* Show tag "BPJS" if the variable is selected as multiplier */}
                  {Boolean(option.is_amount_for_bpjs) && (
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

        <div className="">
          <h5 className="mig-heading--5 mb-2">PENGURANGAN</h5>
          <div className="flex flex-col space-y-2 space-x-0 mb-2">
            {defaultSalaryVar?.map((item) => (
              <Checkbox
                key={item.attrName}
                defaultChecked={true}
                disabled={true}
              >
                {item.title}
              </Checkbox>
            ))}

            {reductionVarOptions?.map((option, idx) => (
              <div
                key={idx}
                className="flex flex-row justify-between items-center"
              >
                <Checkbox
                  value={option.id}
                  checked={option.required}
                  onChange={(e) => {
                    handleUpdateVariable({
                      ...option,
                      required: e.target.checked,
                    });
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
                <PlusOutlined rev={""} />
                <p>Gaji Pokok</p>
              </div>
            </Tag>
            {receiveVarOptions
              .filter((option) => option.required === 1)
              ?.map((tag, idx) => (
                <CheckableTag
                  key={idx}
                  className="border border-primary100 py-1 px-3 rounded mb-2"
                  checked={tag?.is_amount_for_bpjs}
                  onChange={(checked) => handleClickTag(tag, checked)}
                >
                  <div className="flex flex-row items-center space-x-1">
                    <PlusOutlined rev={""} />
                    <p>{tag.name}</p>
                  </div>
                </CheckableTag>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSalaryVarManage;
