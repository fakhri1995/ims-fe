import React from 'react'
import { AlertIconSvg } from '../icon'
import { TreeSelectRequired } from '../input'
import { Text } from '../typography'
import ModalCore from './modalCore'
import { Spin } from 'antd'

function ModalEdit({ title, visible, onOk, onCancel, footer, loading, children }) {
    return (
        <ModalCore
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={footer}
            loading={loading}
        >
            Apakah anda yakin ingin menghapus Perusahan ini?`
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
                    <Text>
                        Lokasi Kantor Cabang Tebet memiliki:
                    </Text>
                </div>
                <div className="mb-3">
                    <ul>
                        <li><strong>{rawdata.sub_location_level_1_count !== 0 && `1. ${rawdata.sub_location_level_1_count} Lokasi Level 1`}</strong></li>
                        <li><strong>{rawdata.sub_location_level_2_count !== 0 && `2. ${rawdata.sub_location_level_2_count} Lokasi Level 2`}</strong></li>
                    </ul>
                </div>
                <div className="mb-3">
                    <Text>
                        Kami sarankan Anda untuk memindahkan sublokasi tersebut ke lokasi induk lain terlebih dahulu. Namun, Anda dapat memilih untuk ikut <strong>menghapus semua lokasi</strong> tersebut.
                    </Text>
                </div>
            </div>
        </ModalCore>
    )
}

function ModalHapusLokasiMoveChild({ title, visible, footer, rawdata, deletedata, setdeletedata, rawlocations, children }) {
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
                <TreeSelectRequired value={deletedata.new_parent} allowClear={true} name="new_parent" onChangeTreeselect={(value, label, extra) => { typeof (value) === 'undefined' ? setdeletedata({ ...deletedata, new_parent: null }) : setdeletedata({ ...deletedata, new_parent: value }) }} label="Pindahkan Ke" treeData={rawlocations} />
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
                {
                    deletedata.new_parent === null && rawdata.sub_children.length > 0 &&
                    <Text>
                        Masih terdapat sublokasi pada <strong>{rawdata.name}</strong>. Anda <strong>tidak dapat mengembalikan</strong> sublokasi setelah penghapusan. Apakah Anda yakin ingin melanjutkan penghapusan?
                    </Text>
                }
                {
                    deletedata.new_parent !== null &&
                    <Text>
                        Tidak ada sublokasi yang terhubung dengan lokasi induk <strong>{rawdata.name}</strong>. Anda dapat menghapus lokasi ini. Apakah Anda yakin ingin melanjutkan penghapusan?
                    </Text>
                }
                {
                    rawdata.sub_children.length < 1 &&
                    <Text>
                        Tidak ada sublokasi yang terhubung dengan lokasi induk <strong>{rawdata.name}</strong>. Anda dapat menghapus lokasi ini. Apakah Anda yakin ingin melanjutkan penghapusan?
                    </Text>
                }
            </div>
        </ModalCore>
    )
}

export {
    ModalEdit, ModalHapus, ModalHapusLokasiCekChild, ModalHapusLokasiMoveChild, ModalHapusLokasiConfirm
}
