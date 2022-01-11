import React, { useEffect, useState } from 'react'
import { AlertIconSvg, TrashIconSvg } from '../icon'
import { TextAreaRequired, TreeSelectRequired } from '../input'
import { Text } from '../typography'
import ModalCore from './modalCore'
import { Spin } from 'antd'
import ButtonSys from '../button'

function ModalEdit({ title, visible, onOk, onCancel, footer, loading, level, children }) {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={footer}
            loading={loading}
        >
            Apakah anda yakin ingin mengubah {level === 2 ? `Sub Lokasi` : `Profil Perusahaan`} ini?`
        </ModalCore>
    )
}

function ModalStatus({ title, visible, onOk, onCancel, footer, loading, checked, children }) {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={footer}
            loading={loading}
        >
            Apakah anda yakin ingin merubah status perusahaan ini menjadi {checked ? `Aktif` : `Non-Aktif`}?`
        </ModalCore>
    )
}

function ModalHapus({ title, visible, onOk, onCancel, footer, loading, namabank, children }) {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={footer}
            loading={loading}
        >
            Apakah Anda yakin ingin melanjutkan penghapusan Bank <strong>{namabank}</strong>?
        </ModalCore>
    )
}

function ModalHapusLokasiCekChild({ title, visible, onOk, onCancel, footer, loading, rawdata, children }) {
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
                        {
                            rawdata.level === 1 ?
                                rawdata.induk_level_1_count === 0 && rawdata.induk_level_2_count === 0 && rawdata.induk_level_3_count === 0 && rawdata.sub_location_level_1_count === 0 && rawdata.sub_location_level_2_count === 0 ?
                                    ``
                                    :
                                    <div className="mb-2">
                                        <Text>
                                            {rawdata.level === 1 ? `Lokasi` : `Sublokasi`} <strong>{rawdata.name}</strong> memiliki:
                                        </Text>
                                    </div>
                                :
                                <div className="mb-2">
                                    <Text>
                                        {rawdata.level === 1 ? `Lokasi` : `Sublokasi`} <strong>{rawdata.name}</strong> memiliki:
                                    </Text>
                                </div>
                        }
                        {
                            rawdata.level === 1 ?
                                <>
                                    {rawdata.induk_level_1_count > 0 && <li><strong>- {rawdata.induk_level_1_count} Lokasi Level 1</strong></li>}
                                    {rawdata.induk_level_2_count > 0 && <li><strong>- {rawdata.induk_level_2_count} Lokasi Level 2</strong></li>}
                                    {rawdata.induk_level_3_count > 0 && <li><strong>- {rawdata.induk_level_3_count} Lokasi Level 3</strong></li>}
                                    <li><strong>{rawdata.sub_location_level_1_count !== 0 && `- ${rawdata.sub_location_level_1_count} Sublokasi Level 1`}</strong></li>
                                    <li><strong>{rawdata.sub_location_level_2_count !== 0 && `- ${rawdata.sub_location_level_2_count} Sublokasi Level 2`}</strong></li>
                                </>
                                :
                                <>
                                    {
                                        rawdata.sub_location_level_1_count !== 0 ?
                                            <>
                                                <li><strong>{rawdata.sub_location_level_1_count !== 0 && `- ${rawdata.sub_location_level_1_count} Sublokasi Level 1`}</strong></li>
                                                <li><strong>{rawdata.sub_location_level_2_count !== 0 && `- ${rawdata.sub_location_level_2_count} Sublokasi Level 2`}</strong></li>
                                            </>
                                            :
                                            <strong>-</strong>
                                    }
                                </>
                        }
                    </ul>
                </div>
                <div className="mb-3">
                    {
                        rawdata.level === 1 ?

                            rawdata.induk_level_1_count === 0 && rawdata.induk_level_2_count === 0 && rawdata.induk_level_3_count === 0 && rawdata.sub_location_level_1_count === 0 && rawdata.sub_location_level_2_count === 0 ?
                                <Text>
                                    Tidak ada sublokasi yang terhubung dengan lokasi induk <strong>{rawdata.name}</strong>. Anda dapat menghapus lokasi ini. Apakah Anda yakin ingin melanjutkan penghapusan?
                                </Text>
                                :
                                <Text>
                                    Kami sarankan Anda untuk memindahkan inventori tersebut ke {rawdata.level === 1 ? `Lokasi` : `Sublokasi`} induk lain terlebih dahulu. {rawdata.level === 1 && <>Namun, Anda dapat memilih untuk ikut <strong>menghapus semua lokasi</strong> tersebut.</>}
                                </Text>
                            :
                            <Text>
                                Kami sarankan Anda untuk memindahkan inventori {rawdata.level === 1 ? `tersebut` : <>pada <strong>{rawdata.name}</strong></>} ke {rawdata.level === 1 ? `Lokasi` : `Sublokasi`} induk lain terlebih dahulu. {rawdata.level === 1 && <>Namun, Anda dapat memilih untuk ikut <strong>menghapus semua lokasi</strong> tersebut.</>}
                            </Text>
                    }
                </div>
            </div>
        </ModalCore>
    )
}

function ModalHapusLokasiMoveChild({ initProps, title, visible, footer, rawdata, deletedata, setdeletedata, rawlocations, children }) {
    const [subloc, setsubloc] = useState([])
    useEffect(() => {
        if (rawdata.level !== -1) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getSubLocations?${rawdata.top_parent_id === null ? `` : `company_id=${rawdata.top_parent_id}`}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                }
            })
                .then(res => res.json())
                .then(res2 => {
                    setsubloc([res2.data])
                })
        }
    }, [])
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
                {
                    rawdata.level === 1 &&
                    <div className="mb-2">
                        <Text>
                            Masih terdapat inventori di {rawdata.name}. Silahkan pindahkan inventori terlebih dahulu.
                        </Text>
                    </div>
                }
                <TreeSelectRequired value={deletedata.new_parent} allowClear={true} name="new_parent" onChangeTreeselect={(value, label, extra) => { typeof (value) === 'undefined' ? setdeletedata({ ...deletedata, new_parent: null }) : setdeletedata({ ...deletedata, new_parent: value }) }} label="Pindahkan Ke" treeData={rawdata.level === 1 ? rawlocations : subloc} />
            </div>
        </ModalCore>
    )
}

function ModalHapusLokasiConfirm({ title, visible, footer, rawdata, deletedata, children }) {
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
                    Jika masih terdapat inventori di sublokasi yang akan dihapus, Inventori akan otomatis dipindahkan ke Lokasi induk <strong>{rawdata.name}</strong>. Anda <strong>tidak dapat mengembalikan</strong> sublokasi setelah penghapusan. Apakah Anda yakin ingin melanjutkan penghapusan?
                </Text>
            </div>
        </ModalCore>
    )
}

function ModalHapusInventoryExist({ title, visible, footer, invexistdata, children }) {
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
                    <Text>
                        Masih terdapat inventori yang terhubung ke lokasi :
                    </Text>
                </div>
                <div className="mb-3">
                    <ul>
                        {
                            invexistdata.map((doc, idx) => (
                                <li key={idx}><strong>{idx + 1}. {doc.full_name}</strong></li>
                            ))
                        }
                    </ul>
                </div>
                <div className="mb-3">
                    <Text>
                        Silahkan pindahkan atau hapus inventori terlebih dahulu.
                    </Text>
                </div>
            </div>
        </ModalCore>
    )
}

//TASK
const ModalHapusTipeTask = ({ title, visible, onvisible, onOk, onCancel, loading, datadelete, children }) => {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onCancel={onCancel}
            footer={
                <Spin spinning={loading}>
                    <div className="flex justify-between items-center">
                        <ButtonSys type="default" color="danger" onClick={() => { onvisible(false) }}>
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
            Apakah Anda yakin ingin melanjutkan penghapusan Tipe Task <strong>{datadelete.name}</strong>?
        </ModalCore>
    )
}

const ModalHapusTask = ({ title, visible, onvisible, onOk, onCancel, loading, datadelete, children }) => {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onCancel={onCancel}
            closeIcon={<AlertIconSvg size={20} color={`#BF4A40`} />}
            footer={
                <Spin spinning={loading}>
                    <div className="flex justify-between items-center">
                        <ButtonSys type="default" color="danger" onClick={() => { onvisible(false) }}>
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
            Apakah Anda yakin ingin melanjutkan penghapusan Task <strong>{datadelete.name}</strong>?
        </ModalCore>
    )
}

const ModalHapusTaskDetail = ({ title, visible, onvisible, onOk, onCancel, loading, datadelete, children }) => {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onCancel={onCancel}
            closeIcon={<AlertIconSvg size={20} color={`#DDB44A`} />}
            footer={
                <Spin spinning={loading}>
                    <div className="flex justify-between items-center">
                        <ButtonSys type="default" color="danger" onClick={() => { onvisible(false) }}>
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
            Apakah Anda yakin ingin melanjutkan penghapusan Detail Task <strong>{datadelete.name}</strong>?
        </ModalCore>
    )
}

const ModalUbahOnHoldTask = ({ title, visible, onvisible, onOk, onCancel, loading, datastatustoggle, setdatastatustoggle, displaytask, children }) => {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onCancel={onCancel}
            closeIcon={<AlertIconSvg size={20} color={`#DDB44A`} />}
            footer={
                <Spin spinning={loading}>
                    <div className="flex justify-between items-center">
                        <ButtonSys type="default" onClick={() => { onvisible(false) }}>
                            Batalkan
                        </ButtonSys>
                        <ButtonSys type="primary" onClick={onOk}>
                            <TrashIconSvg size={15} color={`#ffffff`} />
                            Ubah
                        </ButtonSys>
                    </div>
                </Spin>
            }
            loading={loading}
        >
            {
                displaytask.status !== 4 ?
                    <TextAreaRequired label={`Silahkan cantumkan keterangan`} onChangeInput={(e) => { setdatastatustoggle({ ...datastatustoggle, notes: e.target.value }) }}></TextAreaRequired>
                    :
                    <>
                        Apakah Anda yakin ingin melanjutkan Task <strong>{displaytask.name}</strong>?
                    </>
            }
        </ModalCore>
    )
}

const ModalHapusTipeTiket = ({ title, visible, onvisible, onOk, onCancel, loading, datadelete, children }) => {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onCancel={onCancel}
            footer={
                <Spin spinning={loading}>
                    <div className="flex justify-between items-center">
                        <ButtonSys type="default" color="danger" onClick={() => { onvisible(false) }}>
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
            Apakah Anda yakin ingin melanjutkan penghapusan Pengaturan <strong>{datadelete.name}</strong>?
        </ModalCore>
    )
}

export {
    ModalEdit, ModalHapus, ModalHapusLokasiCekChild, ModalHapusLokasiMoveChild, ModalHapusLokasiConfirm, ModalHapusInventoryExist, ModalStatus, ModalHapusTipeTask, ModalHapusTask, ModalHapusTaskDetail, ModalUbahOnHoldTask, ModalHapusTipeTiket
}
