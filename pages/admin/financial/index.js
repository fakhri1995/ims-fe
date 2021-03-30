import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import { PlusCircleTwoTone, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Button, Empty, Form, Input, Select, notification, Modal } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'

function Financial({ initProps, dataProfile, dataGetDepreciations, sidemenu }) {
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    const { Option } = Select

    //useState
    const [recordrow, setrecordrow] = useState({})
    const [datacreate, setdatacreate] = useState({
        nama: '',
        jenis: '',
        tahun_penggunaan: 0,
        deskripsi: ''
    })
    const [dataedit, setdataedit] = useState({
        id: recordrow.id,
        nama: recordrow.nama,
        jenis: recordrow.jenis,
        tahun_penggunaan: recordrow.tahun_penggunaan,
        deskripsi: recordrow.deskripsi
    })
    var datacell = []
    for (var i = 0; i < dataGetDepreciations.data.length; i++) {
        datacell.push(false)
    }
    const [tambahbtn, settambahbtn] = useState(true)
    const [hoverbtn, sethoverbtn] = useState(datacell)
    const [editarea, seteditarea] = useState(datacell)
    const [iddelete, setiddelete] = useState(0)
    const [loadingcreate, setloadingcreate] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)
    const [loadingedit, setloadingedit] = useState(false)
    const [modaldelete, setmodaldelete] = useState(false)
    const [modaledit, setmodaledit] = useState(false)

    //events
    const onHoverCell = (e, idx) => {
        console.log("over:" + idx + hoverbtn[idx])
        const temp = hoverbtn
        temp[idx] = true
        sethoverbtn(temp)
    }
    const onLeaveCell = (e, idx) => {
        console.log("leave:" + idx + hoverbtn[idx])
        const temp = hoverbtn
        temp[idx] = false
        sethoverbtn(temp)
    }
    const onChangeCreate = (e) => {
        setdatacreate({
            ...datacreate,
            [e.target.name]: e.target.value
        })
    }
    const onChangeEdit = (e) => {
        setdataedit({
            ...dataedit,
            [e.target.name]: e.target.value
        })
    }

    //handler
    const handleCancelUpdate = (index) => {
        var temp = editarea
        temp[index] = false
        seteditarea(temp)
        console.log("cancel " + editarea[index])
    }
    const handleCreate = () => {
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addDepreciation`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datacreate)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingcreate(false)
                settambahbtn(true)
                setdatacreate({
                    nama: '',
                    jenis: '',
                    tahun_penggunaan: 0,
                    deskripsi: ''
                })
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/financial`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })

    }
    const handleDelete = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteDepreciation`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: iddelete
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingdelete(false)
                setmodaldelete(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/financial`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const handleEdit = () => {
        setloadingedit(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateDepreciation`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataedit)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingedit(false)
                setmodaledit(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/financial`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
                <div className=" col-span-4 flex flex-col">
                    <div className="border-b border-opacity-30 border-gray-400 flex items-center p-4 mb-5">
                        <h1 className="font-semibold">Financial</h1>
                    </div>
                    <div className="flex flex-col">
                        <div className="border-b w-full mb-3">
                            <div className=" border-b-4 border-gray-400 p-1 w-24">
                                Depresiasi
                            </div>
                        </div>
                        {
                            !tambahbtn ?
                                <div className="flex flex-col mb-4">
                                    <div className="flex items-center font-bold mb-3">Tambah Depresiasi Baru</div>
                                    <div className=" flex flex-col">
                                        <Form layout="vertical" onFinish={handleCreate} initialValues={datacreate}>
                                            <div className="grid grid-cols-3">
                                                <Form.Item label="Nama" name="nama" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Nama wajib diisi',
                                                    },
                                                ]} style={{ marginRight: `1rem` }}>
                                                    <Input name="nama" onChange={onChangeCreate} defaultValue={datacreate.nama} />
                                                </Form.Item>
                                                <Form.Item label="Tipe" name="jenis" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Wajib diisi',
                                                    },
                                                ]} style={{ marginRight: `1rem` }}>
                                                    <Select defaultValue={datacreate.jenis} onChange={(value) => { setdatacreate({ ...datacreate, jenis: value }) }}>
                                                        <Option value={"Declining Balance"}>Declining Balance</Option>
                                                        <Option value={'Staright Line'}>Staright Line</Option>
                                                        <Option value={'Sum of Years Digit'}>Sum of Years Digit</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label="Daya Tahan (tahun)" name="tahun_penggunaan" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Wajib diisi',
                                                    },
                                                ]} style={{ marginRight: `1rem` }}>
                                                    <Input name="tahun_penggunaan" onChange={onChangeCreate} defaultValue={datacreate.tahun_penggunaan} />
                                                </Form.Item>
                                            </div>
                                            <div className="mb-2">
                                                <Form.Item label="Deskripsi" name="deskripsi">
                                                    <Input.TextArea name="deskripsi" onChange={onChangeCreate} defaultValue={datacreate.deskripsi} style={{ width: `100%` }}></Input.TextArea>
                                                </Form.Item>
                                            </div>
                                            <div className="flex justify-end items-center">
                                                <Button type="default" onClick={() => { settambahbtn(true) }} size="middle" style={{ marginRight: `1rem` }}>Batalkan</Button>
                                                <Button type="primary" htmlType="submit" loading={loadingcreate} size="middle">Simpan</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                                :
                                null
                        }
                        <div className="flex items-center justify-between mb-3">
                            <div className=" font-semibold text-gray-400">
                                Semua Depresiasi
                            </div>
                            {
                                tambahbtn ?
                                    <button className={`${tambahbtn} text-blue-500 hover:text-blue-700 text-sm flex items-center`} onClick={() => { settambahbtn(false) }}>
                                        <PlusCircleTwoTone style={{ marginRight: `0.2rem`, marginTop: `0.1rem` }} /> Tambah Baru
                                    </button>
                                    :
                                    null
                            }

                        </div>

                        <div id="tabel" className="flex flex-col">
                            <div id="thead" className="grid grid-cols-9 justify-center items-center border-b-2 border-gray-600 p-2 bg-gray-100">
                                <div className=" col-span-2 font-semibold text-sm">Nama</div>
                                <div className=" col-span-2 font-semibold text-sm">Tipe</div>
                                <div className=" col-span-1 font-semibold text-sm">Tahun Penggunaan</div>
                                <div className=" col-span-3 font-semibold text-sm">Deskripsi</div>
                                <div className=" col-span-1"></div>
                            </div>
                            <div id="tbody">
                                {
                                    dataGetDepreciations.data.length === 0 ?
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                        :
                                        <>
                                            {
                                                dataGetDepreciations.data.map((doc, idx) => {
                                                    return (
                                                        <div className="grid grid-cols-9 justify-center items-center p-4 hover:bg-gray-100" onMouseOver={(e) => { onHoverCell(e, idx) }} onMouseLeave={(e) => { onLeaveCell(e, idx) }}>
                                                            <div className=" col-span-2 font-semibold text-sm">{doc.nama}</div>
                                                            <div className=" col-span-2 text-sm">{doc.jenis}</div>
                                                            <div className=" col-span-1 text-sm">{doc.tahun_penggunaan} Tahun</div>
                                                            <div className=" col-span-3 text-sm">{doc.deskripsi}</div>
                                                            <div className="col-span-1 flex">
                                                                <div className=" h-6 px-1 border-2 rounded-sm cursor-pointer hover:bg-gray-200 flex justify-center items-center mr-3" onClick={() => {
                                                                    var temp = editarea
                                                                    temp[idx] = true
                                                                    seteditarea(temp)
                                                                    setdataedit({
                                                                        id: doc.id,
                                                                        nama: doc.nama,
                                                                        jenis: doc.jenis,
                                                                        tahun_penggunaan: doc.tahun_penggunaan,
                                                                        deskripsi: doc.deskripsi
                                                                    })
                                                                    setmodaledit(true)
                                                                }}>
                                                                    <EditOutlined />
                                                                </div>
                                                                <div className=" h-6 px-1 border-2 rounded-sm cursor-pointer hover:bg-gray-200 flex justify-center items-center" onClick={() => { setmodaldelete(true); setiddelete(doc.id) }}><DeleteOutlined /></div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                }

                                {/* <div className="grid grid-cols-9 justify-center items-center p-4 hover:bg-gray-200">
                                    <div className=" col-span-2 font-semibold text-sm">SL-5</div>
                                    <div className=" col-span-2 text-sm">Straight Line</div>
                                    <div className=" col-span-1 text-sm">5 Tahun</div>
                                    <div className=" col-span-3 text-sm">Straight Line 5 Tahun</div>
                                    <div className="col-span-1">
                                        {

                                        }
                                        <button></button>
                                        <button></button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-9 justify-center items-center p-4 hover:bg-gray-200">
                                    <div className=" col-span-2 font-semibold text-sm">SL-5</div>
                                    <div className=" col-span-2 text-sm">Straight Line</div>
                                    <div className=" col-span-1 text-sm">5 Tahun</div>
                                    <div className=" col-span-3 text-sm">Straight Line 5 Tahun</div>
                                    <div className="col-span-1">
                                        {

                                        }
                                        <button></button>
                                        <button></button>
                                    </div>
                                </div> */}
                            </div>
                            <Modal
                                title={`Konfirmasi hapus depresiasi`}
                                visible={modaldelete}
                                okButtonProps={{ disabled: loadingdelete }}
                                onCancel={() => { setmodaldelete(false) }}
                                onOk={handleDelete}
                                maskClosable={false}
                                style={{ top: `3rem` }}
                                width={500}
                                destroyOnClose={true}
                            >
                                Yakin ingin hapus depresiasi ini?
                            </Modal>
                            <Modal
                                title={`Edit Depresiasi`}
                                visible={modaledit}
                                onCancel={() => { setmodaledit(false) }}
                                footer={null}
                                maskClosable={false}
                                style={{ top: `3rem` }}
                                width={700}
                                destroyOnClose={true}>
                                <div className="flex flex-col mb-4">
                                    <div className="flex items-center font-bold mb-3">Edit Depresiasi</div>
                                    <div className=" flex flex-col">
                                        <Form layout="vertical" onFinish={handleEdit} initialValues={dataedit}>
                                            <div className="grid grid-cols-3">
                                                <Form.Item label="Nama" name="nama" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Nama wajib diisi',
                                                    },
                                                ]} style={{ marginRight: `1rem` }}>
                                                    <Input name="nama" onChange={onChangeEdit} defaultValue={dataedit.nama} />
                                                </Form.Item>
                                                <Form.Item label="Tipe" name="jenis" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Wajib diisi',
                                                    },
                                                ]} style={{ marginRight: `1rem` }}>
                                                    <Select defaultValue={dataedit.jenis} onChange={(value) => { setdataedit({ ...dataedit, jenis: value }) }}>
                                                        <Option value={"Declining Balance"}>Declining Balance</Option>
                                                        <Option value={'Staright Line'}>Staright Line</Option>
                                                        <Option value={'Sum of Years Digit'}>Sum of Years Digit</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label="Daya Tahan (tahun)" name="tahun_penggunaan" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Wajib diisi',
                                                    },
                                                ]} style={{ marginRight: `1rem` }}>
                                                    <Input name="tahun_penggunaan" onChange={onChangeEdit} defaultValue={dataedit.tahun_penggunaan} />
                                                </Form.Item>
                                            </div>
                                            <div className="mb-2">
                                                <Form.Item label="Deskripsi" name="deskripsi">
                                                    <Input.TextArea name="deskripsi" onChange={onChangeEdit} defaultValue={dataedit.deskripsi} style={{ width: `100%` }}></Input.TextArea>
                                                </Form.Item>
                                            </div>
                                            <div className="flex justify-end items-center">
                                                <Button type="default" onClick={() => {
                                                    setmodaledit(false)
                                                }} size="middle" style={{ marginRight: `1rem` }}>Batalkan</Button>
                                                <Button type="primary" htmlType="submit" loading={loadingedit} size="middle">Update</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )

}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    if (req && req.headers) {
        const cookies = req.headers.cookie;
        if (!cookies) {
            res.writeHead(302, { Location: '/' })
            res.end()
        }
        if (typeof cookies === 'string') {
            const cookiesJSON = httpcookie.parse(cookies);
            initProps = cookiesJSON.token
        }
    }
    const resources = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjson = await resources.json()
    const dataProfile = resjson

    const resourcesGD = await fetch(`https://boiling-thicket-46501.herokuapp.com/getDepreciations`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGD = await resourcesGD.json()
    const dataGetDepreciations = resjsonGD
    return {
        props: {
            initProps,
            dataProfile,
            dataGetDepreciations,
            sidemenu: "4"
        },
    }
}

export default Financial