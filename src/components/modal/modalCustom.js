import { Checkbox, Form, Input, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";

import { createKeyPressHandler } from "../../lib/helper";
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

const ModalAddSalaryVar = ({
  isManageVar,
  visible,
  onvisible,
  onOk,
  loading,
  disabled,
  // setInputVar,
  // isInputVar,
}) => {
  const [isInputReceiveVar, setInputReceiveVar] = useState(false);
  const [isInputReductionVar, setInputReductionVar] = useState(false);
  const receiveVarList = [
    {
      label: "Gaji Pokok",
      value: "Gaji Pokok",
    },
    {
      label: "Tunjangan Uang Makan",
      value: "Tunjangan Uang Makan",
    },
    {
      label: "Tunjangan Transport",
      value: "Tunjangan Transport",
    },
  ];
  const reductionVarList = [
    {
      label: "PPh 21",
      value: "PPh 21",
    },
    {
      label: "BPJS KS",
      value: "BPJS KS",
    },
    {
      label: "BPJS TK-JHT",
      value: "BPJS TK-JHT",
    },
  ];

  const onAddVariable = (e) => {
    console.log(e);
  };
  const { onKeyPressHandler } = createKeyPressHandler(onAddVariable, "Enter");
  return (
    <Modal
      title={
        <div className="flex flex-row justify-between items-center">
          {isManageVar ? (
            <p>Kelola Variabel Gaji</p>
          ) : (
            <p>Tambah Variabel Gaji</p>
          )}
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
        {isManageVar && (
          <p className="col-span-2 mb-5">
            Pilih variabel gaji yang ingin ditampilkan atau tambah variabel
            baru.
          </p>
        )}
        <div className="">
          <h5 className="mig-heading--5 mb-2">PENERIMAAN</h5>
          <Checkbox.Group
            options={receiveVarList}
            defaultValue={["Gaji Pokok"]}
            className="space-y-2 mb-2"
          />
          {isInputReceiveVar ? (
            <div className="flex flex-row items-center -ml-1 space-x-2">
              <button
                onClick={() => {
                  setInputReceiveVar(false);
                }}
                className="bg-transparent hover:opacity-75"
              >
                <SquarePlusIconSvg color={"#35763B"} size={24} />
              </button>

              <Input
                size="small"
                placeholder="Masukkan variabel"
                autoFocus
                onKeyPress={onKeyPressHandler}
              />
            </div>
          ) : (
            <button
              className="flex flex-row items-center -ml-1 bg-transparent hover:opacity-75 space-x-1"
              onClick={() => setInputReceiveVar(true)}
            >
              <SquarePlusIconSvg color={"#35763B"} size={24} />
              <p className="text-primary100 ">Tambah</p>
            </button>
          )}
        </div>

        <div className="">
          <h5 className="mig-heading--5 mb-2">PENGURANGAN</h5>
          <Checkbox.Group
            options={reductionVarList}
            defaultValue={["PPh 21"]}
            className="space-y-2 mb-2 flex flex-col"
          />
          {isInputReductionVar ? (
            <div className="flex flex-row items-center -ml-1 space-x-2">
              <button
                onClick={() => {
                  setInputReductionVar(false);
                }}
                className="bg-transparent hover:opacity-75"
              >
                <SquarePlusIconSvg color={"#35763B"} size={24} />
              </button>

              <Input
                size="small"
                placeholder="Masukkan variabel"
                autoFocus
              ></Input>
            </div>
          ) : (
            <button
              className="flex flex-row items-center -ml-1 bg-transparent hover:opacity-75 space-x-1"
              onClick={() => setInputReductionVar(true)}
            >
              <SquarePlusIconSvg color={"#35763B"} size={24} />
              <p className="text-primary100 ">Tambah</p>
            </button>
          )}
        </div>
      </div>
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
  instanceForm,
  monthOfPayslip,
}) => {
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
            <ButtonSys type={"default"} onClick={() => onvisible(false)}>
              Batalkan
            </ButtonSys>
            <ButtonSys type={"primary"} onClick={onOk} disabled={disabled}>
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
      <Form layout="vertical" form={instanceForm}>
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
          <Input
            value={downloadPass}
            name={"password"}
            onChange={(e) => setDownloadPass(e.target.value)}
            placeholder="Masukkan kata sandi"
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
  ModalAddSalaryVar,
  ModalDownloadPayslip,
};
