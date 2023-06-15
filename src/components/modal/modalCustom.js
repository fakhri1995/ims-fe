import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
          <div className="grid grid-cols-3 gap-2 items-center ">
            <ButtonSys
              type="default"
              onClick={() => {
                onvisible(false);
              }}
            >
              Batalkan
            </ButtonSys>
            <div className="col-span-2">
              <ButtonSys
                type={"primary"}
                color={"danger"}
                onClick={onOk}
                disabled={disabled}
              >
                <div className="flex flex-row space-x-2">
                  <DeleteOutlined />
                  {okButtonText ? (
                    <p>{okButtonText}</p>
                  ) : (
                    <p>Ya, saya yakin dan hapus {itemName}</p>
                  )}
                </div>
              </ButtonSys>
            </div>
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
  ModalDownloadPayslip,
  ModalAddRole,
  ModalAddCompany,
};
