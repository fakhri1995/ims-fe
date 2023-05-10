import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Spin,
  Tag,
  Upload,
  notification,
} from "antd";
import CheckableTag from "antd/lib/tag/CheckableTag";
import React, { useCallback, useEffect, useState } from "react";

import { useAxiosClient } from "hooks/use-axios-client";

import { CompanyService } from "apis/company";

import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../lib/helper";
import ButtonSys from "../button";
import {
  AlertIconSvg,
  CheckIconSvg,
  CircleCheckIconSvg,
  DownloadIconSvg,
  SquarePlusIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../icon";
import {
  TextAreaNotRequired,
  TextAreaRequired,
  TreeSelectRequired,
} from "../input";
import { Text } from "../typography";
import ModalCore from "./modalCore";

function ModalEdit({
  title,
  visible,
  onOk,
  onCancel,
  footer,
  loading,
  level,
  children,
}) {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      loading={loading}
    >
      Apakah anda yakin ingin mengubah{" "}
      {level === 2 ? `Sub Lokasi` : `Profil Perusahaan`} ini?`
    </ModalCore>
  );
}

function ModalStatus({
  title,
  visible,
  onOk,
  onCancel,
  footer,
  loading,
  checked,
  children,
}) {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      loading={loading}
    >
      Apakah anda yakin ingin merubah status perusahaan ini menjadi{" "}
      {checked ? `Aktif` : `Non-Aktif`}?`
    </ModalCore>
  );
}

function ModalHapus({
  title,
  visible,
  onOk,
  onCancel,
  footer,
  loading,
  namabank,
  children,
}) {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      loading={loading}
    >
      Apakah Anda yakin ingin melanjutkan penghapusan Bank{" "}
      <strong>{namabank}</strong>?
    </ModalCore>
  );
}

function ModalHapusLokasiCekChild({
  title,
  visible,
  onOk,
  onCancel,
  footer,
  loading,
  rawdata,
  children,
}) {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      loading={loading}
      width={650}
      closeIcon={<AlertIconSvg size={20} color={`#BF4A40`} />}
    >
      <div className="flex flex-col">
        <div className="mb-3">
          <ul>
            {rawdata.level === 1 ? (
              rawdata.induk_level_1_count === 0 &&
              rawdata.induk_level_2_count === 0 &&
              rawdata.induk_level_3_count === 0 &&
              rawdata.sub_location_level_1_count === 0 &&
              rawdata.sub_location_level_2_count === 0 ? (
                ``
              ) : (
                <div className="mb-2">
                  <Text>
                    {rawdata.level === 1 ? `Lokasi` : `Sublokasi`}{" "}
                    <strong>{rawdata.name}</strong> memiliki:
                  </Text>
                </div>
              )
            ) : (
              <div className="mb-2">
                <Text>
                  {rawdata.level === 1 ? `Lokasi` : `Sublokasi`}{" "}
                  <strong>{rawdata.name}</strong> memiliki:
                </Text>
              </div>
            )}
            {rawdata.level === 1 ? (
              <>
                {rawdata.induk_level_1_count > 0 && (
                  <li>
                    <strong>
                      - {rawdata.induk_level_1_count} Lokasi Level 1
                    </strong>
                  </li>
                )}
                {rawdata.induk_level_2_count > 0 && (
                  <li>
                    <strong>
                      - {rawdata.induk_level_2_count} Lokasi Level 2
                    </strong>
                  </li>
                )}
                {rawdata.induk_level_3_count > 0 && (
                  <li>
                    <strong>
                      - {rawdata.induk_level_3_count} Lokasi Level 3
                    </strong>
                  </li>
                )}
                <li>
                  <strong>
                    {rawdata.sub_location_level_1_count !== 0 &&
                      `- ${rawdata.sub_location_level_1_count} Sublokasi Level 1`}
                  </strong>
                </li>
                <li>
                  <strong>
                    {rawdata.sub_location_level_2_count !== 0 &&
                      `- ${rawdata.sub_location_level_2_count} Sublokasi Level 2`}
                  </strong>
                </li>
              </>
            ) : (
              <>
                {rawdata.sub_location_level_1_count !== 0 ? (
                  <>
                    <li>
                      <strong>
                        {rawdata.sub_location_level_1_count !== 0 &&
                          `- ${rawdata.sub_location_level_1_count} Sublokasi Level 1`}
                      </strong>
                    </li>
                    <li>
                      <strong>
                        {rawdata.sub_location_level_2_count !== 0 &&
                          `- ${rawdata.sub_location_level_2_count} Sublokasi Level 2`}
                      </strong>
                    </li>
                  </>
                ) : (
                  <strong>-</strong>
                )}
              </>
            )}
          </ul>
        </div>
        <div className="mb-3">
          {rawdata.level === 1 ? (
            rawdata.induk_level_1_count === 0 &&
            rawdata.induk_level_2_count === 0 &&
            rawdata.induk_level_3_count === 0 &&
            rawdata.sub_location_level_1_count === 0 &&
            rawdata.sub_location_level_2_count === 0 ? (
              <Text>
                Tidak ada sublokasi yang terhubung dengan lokasi induk{" "}
                <strong>{rawdata.name}</strong>. Anda dapat menghapus lokasi
                ini. Apakah Anda yakin ingin melanjutkan penghapusan?
              </Text>
            ) : (
              <Text>
                Kami sarankan Anda untuk memindahkan inventori tersebut ke{" "}
                {rawdata.level === 1 ? `Lokasi` : `Sublokasi`} induk lain
                terlebih dahulu.{" "}
                {rawdata.level === 1 && (
                  <>
                    Namun, Anda dapat memilih untuk ikut{" "}
                    <strong>menghapus semua lokasi</strong> tersebut.
                  </>
                )}
              </Text>
            )
          ) : (
            <Text>
              Kami sarankan Anda untuk memindahkan inventori{" "}
              {rawdata.level === 1 ? (
                `tersebut`
              ) : (
                <>
                  pada <strong>{rawdata.name}</strong>
                </>
              )}{" "}
              ke {rawdata.level === 1 ? `Lokasi` : `Sublokasi`} induk lain
              terlebih dahulu.{" "}
              {rawdata.level === 1 && (
                <>
                  Namun, Anda dapat memilih untuk ikut{" "}
                  <strong>menghapus semua lokasi</strong> tersebut.
                </>
              )}
            </Text>
          )}
        </div>
      </div>
    </ModalCore>
  );
}

function ModalHapusLokasiMoveChild({
  initProps,
  title,
  visible,
  footer,
  rawdata,
  deletedata,
  setdeletedata,
  rawlocations,
  children,
}) {
  const [subloc, setsubloc] = useState([]);
  useEffect(() => {
    if (rawdata.level !== -1) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getSubLocations?${
          rawdata.top_parent_id === null
            ? ``
            : `company_id=${rawdata.top_parent_id}`
        }`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setsubloc([res2.data]);
        });
    }
  }, []);
  return (
    <ModalCore
      title={title}
      visible={visible}
      footer={footer}
      width={650}
      closeIcon={null}
      maskClosable={false}
    >
      <div className="flex flex-col">
        {rawdata.level === 1 && (
          <div className="mb-2">
            <Text>
              Masih terdapat inventori di {rawdata.name}. Silahkan pindahkan
              inventori terlebih dahulu.
            </Text>
          </div>
        )}
        <TreeSelectRequired
          value={deletedata.new_parent}
          allowClear={true}
          name="new_parent"
          onChangeTreeselect={(value, label, extra) => {
            typeof value === "undefined"
              ? setdeletedata({ ...deletedata, new_parent: null })
              : setdeletedata({ ...deletedata, new_parent: value });
          }}
          label="Pindahkan Ke"
          treeData={rawdata.level === 1 ? rawlocations : subloc}
        />
      </div>
    </ModalCore>
  );
}

function ModalHapusLokasiConfirm({
  title,
  visible,
  footer,
  rawdata,
  deletedata,
  children,
}) {
  return (
    <ModalCore
      title={title}
      visible={visible}
      footer={footer}
      width={650}
      closeIcon={null}
      maskClosable={false}
    >
      <div className="flex flex-col">
        <Text>
          Jika masih terdapat inventori di sublokasi yang akan dihapus,
          Inventori akan otomatis dipindahkan ke Lokasi induk{" "}
          <strong>{rawdata.name}</strong>. Anda{" "}
          <strong>tidak dapat mengembalikan</strong> sublokasi setelah
          penghapusan. Apakah Anda yakin ingin melanjutkan penghapusan?
        </Text>
      </div>
    </ModalCore>
  );
}

function ModalHapusInventoryExist({
  title,
  visible,
  footer,
  invexistdata,
  children,
}) {
  return (
    <ModalCore
      title={title}
      visible={visible}
      footer={footer}
      width={650}
      closeIcon={<AlertIconSvg size={20} color={`#BF4A40`} />}
      maskClosable={false}
    >
      <div className="flex flex-col">
        <div className="mb-3">
          <Text>Masih terdapat inventori yang terhubung ke lokasi :</Text>
        </div>
        <div className="mb-3">
          <ul>
            {invexistdata.map((doc, idx) => (
              <li key={idx}>
                <strong>
                  {idx + 1}. {doc.full_name}
                </strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-3">
          <Text>Silahkan pindahkan atau hapus inventori terlebih dahulu.</Text>
        </div>
      </div>
    </ModalCore>
  );
}

//TASK
const ModalHapusTipeTask = ({
  title,
  visible,
  onvisible,
  onOk,
  onCancel,
  loading,
  datadelete,
  children,
}) => {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={
        <Spin spinning={loading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              color="danger"
              onClick={() => {
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys type="primary" color="danger" onClick={onOk}>
              <TrashIconSvg size={15} color={`#ffffff`} />
              Hapus
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      Apakah Anda yakin ingin melanjutkan penghapusan Tipe Task{" "}
      <strong>{datadelete.name}</strong>?
    </ModalCore>
  );
};

const ModalHapusTask = ({
  title,
  visible,
  onvisible,
  onOk,
  onCancel,
  loading,
  datadelete,
  children,
}) => {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={onCancel}
      closeIcon={<AlertIconSvg size={20} color={`#BF4A40`} />}
      footer={
        <Spin spinning={loading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              color="danger"
              onClick={() => {
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys type="primary" color="danger" onClick={onOk}>
              <TrashIconSvg size={15} color={`#ffffff`} />
              Ya, Saya yakin dan hapus task
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      Apakah Anda yakin ingin melanjutkan penghapusan Task{" "}
      <strong>{datadelete.name}</strong>?
    </ModalCore>
  );
};

const ModalHapusTaskDetail = ({
  title,
  visible,
  onvisible,
  onOk,
  onCancel,
  loading,
  datadelete,
  children,
}) => {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={onCancel}
      closeIcon={<AlertIconSvg size={20} color={`#DDB44A`} />}
      footer={
        <Spin spinning={loading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              color="danger"
              onClick={() => {
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys type="primary" color="danger" onClick={onOk}>
              <TrashIconSvg size={15} color={`#ffffff`} />
              Hapus Task Detail
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      Apakah Anda yakin ingin melanjutkan penghapusan Detail Task{" "}
      <strong>{datadelete.name}</strong>?
    </ModalCore>
  );
};

const ModalUbahOnHoldTask = ({
  title,
  visible,
  onvisible,
  onOk,
  onCancel,
  loading,
  datastatustoggle,
  setdatastatustoggle,
  displaytask,
  children,
}) => {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={onCancel}
      closeIcon={<AlertIconSvg size={20} color={`#DDB44A`} />}
      footer={
        <Spin spinning={loading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              onClick={() => {
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys type="primary" onClick={onOk}>
              Ubah
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      {displaytask.status !== 4 ? (
        <TextAreaRequired
          label={`Silahkan cantumkan keterangan`}
          onChangeInput={(e) => {
            setdatastatustoggle({ ...datastatustoggle, notes: e.target.value });
          }}
        ></TextAreaRequired>
      ) : (
        <>
          Apakah Anda yakin ingin melanjutkan Task{" "}
          <strong>{displaytask.name}</strong>?
        </>
      )}
    </ModalCore>
  );
};

const ModalHapusTipeTiket = ({
  title,
  visible,
  onvisible,
  onOk,
  onCancel,
  loading,
  datadelete,
  children,
}) => {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={
        <Spin spinning={loading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              color="danger"
              onClick={() => {
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys type="primary" color="danger" onClick={onOk}>
              <TrashIconSvg size={15} color={`#ffffff`} />
              Hapus
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      Apakah Anda yakin ingin melanjutkan penghapusan Pengaturan{" "}
      <strong>{datadelete.name}</strong>?
    </ModalCore>
  );
};

const ModalNoteTiket = ({
  title,
  visible,
  onvisible,
  onOk,
  onCancel,
  loading,
  datanoteticket,
  setdatanoteticket,
  ticketid,
  children,
}) => {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={() => {
        setdatanoteticket({ id: Number(ticketid), notes: "" });
        onvisible(false);
      }}
      footer={
        <Spin spinning={loading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              onClick={() => {
                setdatanoteticket({ id: Number(ticketid), notes: "" });
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys type="primary" onClick={onOk}>
              <CheckIconSvg size={15} color={`#ffffff`} />
              Simpan Catatan
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <TextAreaNotRequired
        value={datanoteticket.notes}
        label={`Catatan`}
        onChangeInput={(e) => {
          setdatanoteticket({ ...datanoteticket, notes: e.target.value });
        }}
      ></TextAreaNotRequired>
    </ModalCore>
  );
};

const ModalCancelTiket = ({
  title,
  visible,
  onvisible,
  onOk,
  onCancel,
  loading,
  data,
  setdata,
  ticketid,
  children,
}) => {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={() => {
        setdata({ id: Number(ticketid), notes: "", name: "" });
        onvisible(false);
      }}
      footer={
        <Spin spinning={loading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              onClick={() => {
                setdata({ id: Number(ticketid), notes: "", name: "" });
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys type="primary" color={`danger`} onClick={onOk}>
              <XIconSvg size={15} color={`#ffffff`} />
              Ya, saya yakin dan batalkan tiket
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <div className=" flex">
        <Text>
          Apakah Anda yakin ingin membatalkan tiket <strong>{data.name}</strong>
          ? Anda tidak dapat mengembalikan tiket yang sudah terhapus
        </Text>
      </div>
    </ModalCore>
  );
};

const ModalReleaseItemTiket = ({
  title,
  visible,
  onvisible,
  onOk,
  onCancel,
  loading,
  data,
  setdata,
  ticketid,
  children,
}) => {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={() => {
        onvisible(false);
      }}
      footer={
        <Spin spinning={loading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              onClick={() => {
                setdata({ ...data, id: Number(ticketid), inventory_id: "" });
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys type="primary" color={`danger`} onClick={onOk}>
              <XIconSvg size={15} color={`#ffffff`} />
              Ya, pisahkan Aset dengan Tiket
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <div className=" flex">
        <Text>
          Apakah Anda yakin ingin memisahkan Aset <strong>{data.name}</strong>{" "}
          dengan Tiket?
        </Text>
      </div>
    </ModalCore>
  );
};

const ModalHapus2 = ({
  title,
  visible,
  onvisible,
  onOk,
  onCancel,
  loading,
  itemName,
  disabled,
  children,
  okButtonText,
}) => {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={
        <Spin spinning={loading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              // color="danger"
              onClick={() => {
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              color={"danger"}
              onClick={onOk}
              disabled={disabled}
            >
              <div className="flex flex-row space-x-2">
                <TrashIconSvg size={16} color={`white`} />
                {okButtonText ? (
                  <p>{okButtonText}</p>
                ) : (
                  <p>Ya, saya yakin dan hapus {itemName}</p>
                )}
              </div>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      {children}
    </ModalCore>
  );
};

const ModalUbah = ({
  title,
  visible,
  onvisible,
  onOk,
  onCancel,
  loading,
  itemName,
  disabled,
  children,
  okButtonText,
  closable,
}) => {
  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={onCancel}
      closable={closable}
      footer={
        <Spin spinning={loading}>
          <div className="flex justify-between items-center">
            <ButtonSys
              type="default"
              onClick={() => {
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <ButtonSys type={"primary"} onClick={onOk} disabled={disabled}>
              <div className="flex flex-row space-x-2">
                <CheckIconSvg size={16} color={`white`} />
                {okButtonText ? (
                  <p>{okButtonText}</p>
                ) : (
                  <p>Ya, saya yakin dan akan menyimpan perubahan</p>
                )}
              </div>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      {children}
    </ModalCore>
  );
};

const ModalManageSalaryVar = ({
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
  const [dataVariables, setDataVariables] = useState([]);

  const [isInputReceiveVar, setInputReceiveVar] = useState(false);
  const [isInputReductionVar, setInputReductionVar] = useState(false);
  const [dataVariable, setDataVariable] = useState({
    name: "",
    percent: 0,
    type: 0,
    required: false,
    is_amount_for_bpjs: false,
  });
  const [inputField, setInputField] = useState("");
  const [varType, setVarType] = useState(0);
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

            // let newReceiveVarArr = receiveVariables.map((receiveVar) => {
            //   return {
            //     label: receiveVar.name,
            //     value: receiveVar.id,
            //     disabled: receiveVar.required,
            //   };
            // });

            // setDataVariables(dataVar);
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
            <Checkbox defaultChecked={true} disabled={true}>
              BPJS KS (5% Perusahaan)
            </Checkbox>
            <Checkbox defaultChecked={true} disabled={true}>
              BPJS TK-JHT (5,7% Perusahaan)
            </Checkbox>
            <Checkbox defaultChecked={true} disabled={true}>
              BPJS TK-JKK (0,24% Perusahaan)
            </Checkbox>
            <Checkbox defaultChecked={true} disabled={true}>
              BPJS TK-JKM (0,3% Perusahaan)
            </Checkbox>
            <Checkbox defaultChecked={true} disabled={true}>
              BPJS TK-JP (3% Perusahaan)
            </Checkbox>
            <Checkbox defaultChecked={true} disabled={true}>
              PPh 21
            </Checkbox>

            {reductionVarOptions?.map((option, idx) => (
              <div
                key={idx}
                className="flex flex-row justify-between items-center"
              >
                <Checkbox
                  value={option.id}
                  checked={option.required}
                  onChange={(e) => {
                    handleUpdateVariable(option, e.target.checked);
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
                <PlusOutlined />
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
                    <PlusOutlined />
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

const ModalAddSalaryVar = ({
  initProps,
  visible,
  onvisible,
  onOk,
  loading,
  disabled,
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
        <div className="grid grid-cols-2 gap-x-8">
          {/* Variabel penerimaan */}
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
              <Checkbox defaultChecked={true} disabled={true}>
                BPJS KS (5% Perusahaan)
              </Checkbox>
              <Checkbox defaultChecked={true} disabled={true}>
                BPJS TK-JHT (5,7% Perusahaan)
              </Checkbox>
              <Checkbox defaultChecked={true} disabled={true}>
                BPJS TK-JKK (0,24% Perusahaan)
              </Checkbox>
              <Checkbox defaultChecked={true} disabled={true}>
                BPJS TK-JKM (0,3% Perusahaan)
              </Checkbox>
              <Checkbox defaultChecked={true} disabled={true}>
                BPJS TK-JP (3% Perusahaan)
              </Checkbox>
              <Checkbox defaultChecked={true} disabled={true}>
                PPh 21
              </Checkbox>
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

const ModalDownloadPayslip = ({
  visible,
  onvisible,
  onOk,
  loading,
  disabled,
  downloadPass,
  setDownloadPass,
  monthOfPayslip,
}) => {
  const handleModalClose = () => {
    setDownloadPass("");
    onvisible(false);
  };
  return (
    <Modal
      title={
        <div className="flex flex-row items-center justify-between">
          <p>Konfirmasi</p>
          <CircleCheckIconSvg color={"#35763B"} size={24} />
        </div>
      }
      visible={visible}
      closable={false}
      footer={
        <Spin spinning={loading}>
          <div className="flex flex-row justify-between my-2">
            <ButtonSys type={"default"} onClick={handleModalClose}>
              Batalkan
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              onClick={onOk}
              disabled={disabled || !downloadPass}
            >
              <div className="flex flex-row space-x-2 items-center">
                <DownloadIconSvg color={"white"} size={16} />
                <p>Unduh Slip Gaji</p>
              </div>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical">
        <p className="mb-4">
          Silahkan masukkan kata sandi Anda untuk mengunduh slip gaji{" "}
          <strong>{monthOfPayslip}</strong>
        </p>
        <Form.Item
          label="Kata Sandi"
          name={"password"}
          rules={[
            {
              required: true,
              message: "Kata sandi wajib diisi",
            },
          ]}
        >
          <>
            <Input.Password
              name={"password"}
              placeholder="Masukkan kata sandi"
              type="password"
              value={downloadPass}
              onChange={(e) => setDownloadPass(e.target.value)}
            />
          </>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalAddRole = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddRole,
  dataRoleTypeList,
  setRefresh,
}) => {
  const [dataRole, setDataRole] = useState({
    name: "",
    alias: "",
    recruitment_role_type_id: null,
  });
  const [loading, setLoading] = useState(false);

  const clearData = () => {
    setDataRole({
      name: "",
      alias: "",
      recruitment_role_type_id: null,
    });
  };

  const handleAddRole = () => {
    if (!isAllowedToAddRole) {
      permissionWarningNotification("Menambah", "Role Rekrutmen");
      return;
    }
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitmentRole`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRole),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          onvisible(false);
          notification.success({
            message: `Role berhasil ditambahkan.`,
            duration: 3,
          });
          setRefresh((prev) => prev + 1);
          setTimeout(() => {
            clearData();
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan role. ${response2.message}`,
            duration: 3,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan role. ${err.response}`,
          duration: 3,
        });
        setLoading(false);
      });
  };

  return (
    <Modal
      title={
        <div className="flex flex-col space-y-2 ">
          <p>Tambah Role</p>
          <p className="text-warning text-[12px] italic">
            * Informasi ini harus diisi
          </p>
        </div>
      }
      visible={visible}
      onCancel={() => {
        clearData();
        onvisible(false);
      }}
      footer={
        <Spin spinning={loading}>
          <ButtonSys
            type={"primary"}
            onClick={handleAddRole}
            disabled={
              !isAllowedToAddRole ||
              !dataRole.name ||
              !dataRole.alias ||
              !dataRole.recruitment_role_type_id
            }
          >
            <div className="flex flex-row space-x-2 items-center">
              <CheckIconSvg color={"white"} size={16} />
              <p>Simpan Role</p>
            </div>
          </ButtonSys>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical">
        <Form.Item
          label="Nama Role"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nama role wajib diisi",
            },
          ]}
        >
          <Input
            name={"name"}
            placeholder="Masukkan nama role"
            value={dataRole.name}
            onChange={(e) =>
              setDataRole((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          label="Alias"
          name={"alias"}
          rules={[
            {
              required: true,
              message: "Alias role wajib diisi",
            },
          ]}
        >
          <Input
            name={"alias"}
            placeholder="Masukkan alias"
            value={dataRole.alias}
            onChange={(e) =>
              setDataRole((prev) => ({ ...prev, alias: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          label="Tipe"
          name={"recruitment_role_type_id"}
          rules={[
            {
              required: true,
              message: "Tipe role wajib diisi",
            },
          ]}
        >
          <Select
            value={dataRole?.recruitment_role_type_id}
            onChange={(value) =>
              setDataRole((prev) => ({
                ...prev,
                recruitment_role_type_id: value,
              }))
            }
            placeholder="Pilih tipe..."
          >
            <>
              {dataRoleTypeList?.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalAddCompany = ({
  visible,
  onvisible,
  isAllowedToAddCompany,
  setRefresh,
}) => {
  const axiosClient = useAxiosClient();

  /** Hardcoded company ID untuk Mitramas Infosys Global */
  const MIG_COMPANY_ID = 1;

  // 1. USE STATE
  const [dataCompany, setDataCompany] = useState({
    parent_id: MIG_COMPANY_ID,
    name: "",
    address: "",
    phone_number: "",
    company_logo: null, // File | null
    singkatan: "",
    penanggung_jawab: "",
  });
  const [loading, setLoading] = useState(false);

  // Upload image state
  const [fileList, setFileList] = useState([]);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  // 2. HANDLER
  const clearData = () => {
    setDataCompany({
      parent_id: MIG_COMPANY_ID,
      name: "",
      address: "",
      phone_number: "",
      company_logo: null, // File | null
      singkatan: "",
      penanggung_jawab: "",
    });
  };

  const handleAddCompany = () => {
    if (!isAllowedToAddCompany) {
      permissionWarningNotification("Menambah", "Perusahaan Penempatan");
      return;
    }
    setLoading(true);
    CompanyService.addCompany(axiosClient, dataCompany, "client")
      .then((response) => {
        const resData = response.data;
        if (resData.success) {
          onvisible(false);
          notification.success({
            message: resData.message,
            duration: 3,
          });
          setRefresh((prev) => prev + 1);
          setTimeout(() => {
            clearData();
          }, 500);
        } else {
          notification.error({
            message: resData.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan penempatan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  // Handle upload image
  const beforeUploadImage = useCallback((uploadedFile) => {
    const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
    const isReachedMaxFileSize =
      checkMaxFileSizeFilter(uploadedFile) === Upload.LIST_IGNORE;
    const allowedFileTypes = [`image/png`, `image/jpg`, `image/jpeg`];

    if (!allowedFileTypes.includes(uploadedFile.type)) {
      notification.error({
        message: "File harus berupa gambar",
      });
      return Upload.LIST_IGNORE;
    }

    if (isReachedMaxFileSize) {
      return Upload.LIST_IGNORE;
    }

    setDataCompany((prev) => ({
      ...prev,
      company_logo: uploadedFile,
    }));
  }, []);

  const onUploadChange = useCallback(({ file }) => {
    setUploadImageLoading(file.status === "uploading");
    if (file.status !== "removed") {
      setFileList([file]);
    }
  }, []);

  const onUploadRemove = useCallback(() => {
    setFileList([]);
    setDataCompany((prev) => ({
      ...prev,
      company_logo: null,
    }));
  }, []);

  return (
    <Modal
      title={
        <div className="flex flex-col space-y-2 ">
          <p>Tambah Penempatan</p>
          <p className="text-warning text-[12px] italic">
            * Informasi ini harus diisi
          </p>
        </div>
      }
      visible={visible}
      onCancel={() => {
        clearData();
        onvisible(false);
      }}
      footer={
        <Spin spinning={loading}>
          <ButtonSys
            type={"primary"}
            onClick={handleAddCompany}
            disabled={
              !isAllowedToAddCompany ||
              !dataCompany.name ||
              !dataCompany.singkatan ||
              !dataCompany.address ||
              !dataCompany.phone_number ||
              !dataCompany.penanggung_jawab
            }
          >
            <div className="flex flex-row space-x-2 items-center">
              <CheckIconSvg color={"white"} size={16} />
              <p>Simpan</p>
            </div>
          </ButtonSys>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical">
        <Form.Item
          label="Foto Profil Perusahaan"
          name={"company_logo"}
          className="col-span-2 w-full"
        >
          <div className="relative">
            <em className="text-mono50 mr-10">
              Unggah File JPEG/PNG (Maksimal 5 MB)
            </em>
            <Upload
              accept=".png, .jpg, .jpeg"
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUploadImage}
              onChange={onUploadChange}
              onRemove={onUploadRemove}
              disabled={uploadImageLoading}
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
          label="Nama"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nama perusahaan wajib diisi",
            },
          ]}
        >
          <Input
            name={"name"}
            placeholder="Masukkan nama perusahaan"
            value={dataCompany.name}
            onChange={(e) =>
              setDataCompany((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          label="Singkatan"
          name={"singkatan"}
          rules={[
            {
              required: true,
              message: "Singkatan wajib diisi",
            },
          ]}
        >
          <Input
            name={"singkatan"}
            placeholder="Masukkan singkatan"
            value={dataCompany.singkatan}
            onChange={(e) =>
              setDataCompany((prev) => ({
                ...prev,
                singkatan: e.target.value,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          label="Alamat Lokasi"
          name={"address"}
          rules={[
            {
              required: true,
              message: "Alamat lokasi wajib diisi",
            },
          ]}
        >
          <Input
            name={"address"}
            placeholder="Masukkan alamat lokasi"
            value={dataCompany.address}
            onChange={(e) =>
              setDataCompany((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          label="Nomor Telepon"
          name={"phone_number"}
          rules={[
            {
              required: true,
              message: "Nomor telepon wajib diisi",
            },
            {
              pattern: /[0-9]+/,
              message: "Nomor telepon hanya boleh diisi dengan angka",
            },
          ]}
        >
          <Input
            name={"phone_number"}
            placeholder="Masukkan nomor telepon"
            value={dataCompany.phone_number}
            onChange={(e) =>
              setDataCompany((prev) => ({
                ...prev,
                phone_number: e.target.value,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          label="Penanggung Jawab (PIC)"
          name={"penanggung_jawab"}
          rules={[
            {
              required: true,
              message: "Penanggung jawab wajib diisi",
            },
          ]}
        >
          <Input
            name={"penanggung_jawab"}
            placeholder="Masukkan penanggung jawab"
            value={dataCompany.penanggung_jawab}
            onChange={(e) =>
              setDataCompany((prev) => ({
                ...prev,
                penanggung_jawab: e.target.value,
              }))
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export {
  ModalEdit,
  ModalHapus,
  ModalHapusLokasiCekChild,
  ModalHapusLokasiMoveChild,
  ModalHapusLokasiConfirm,
  ModalHapusInventoryExist,
  ModalStatus,
  ModalHapusTipeTask,
  ModalHapusTask,
  ModalHapusTaskDetail,
  ModalUbahOnHoldTask,
  ModalHapusTipeTiket,
  ModalNoteTiket,
  ModalCancelTiket,
  ModalReleaseItemTiket,
  ModalHapus2,
  ModalUbah,
  ModalManageSalaryVar,
  ModalAddSalaryVar,
  ModalDownloadPayslip,
  ModalAddRole,
  ModalAddCompany,
};
