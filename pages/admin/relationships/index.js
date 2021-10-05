import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Empty, notification, Spin, Table } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'

const Relationships = ({ dataProfile, sidemenu, initProps }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //2.useState
    const [displaydata, setdisplaydata] = useState([])
    const [displaydata2, setdisplaydata2] = useState([])
    const [displaydata3, setdisplaydata3] = useState([])
    const [displaytrigger, setdisplaytrigger] = useState(0)
    const [praloading, setpraloading] = useState(true)
    const [namasearchact, setnamasearchact] = useState(false)
    const [namavalue, setnamavalue] = useState("")
    const [events, setevents] = useState("")
    //Tambah
    const [dataadd, setdataadd] = useState({
        relationship_type: "",
        inverse_relationship_type: "",
        description: ""
    })
    const [modaladd, setmodaladd] = useState(false)
    const [loadingadd, setloadingadd] = useState(false)
    const [disabledadd, setdisabledadd] = useState(true)
    //Ubah
    const [dataupdate, setdataupdate] = useState({
        id: "",
        relationship_type: "",
        inverse_relationship_type: "",
        description: ""
    })
    const [modalupdate, setmodalupdate] = useState(false)
    const [loadingupdate, setloadingupdate] = useState(false)
    const [disabledupdate, setdisabledupdate] = useState(true)
    //Hapus
    const [datadelete, setdatadelete] = useState({
        id: "",
    })
    const [modaldelete, setmodaldelete] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)

    //3.Helper
    //columns
    const columns = [
        {
            title: 'Relationship Type',
            dataIndex: 'relationship_type',
            key: 'relationship_type',
        },
        {
            title: 'Inverse Relationship Type',
            dataIndex: 'inverse_relationship_type',
            key: 'inverse_relationship_type',
        },
        {
            title: 'Deskripsi',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {
                                events === record.id ?
                                    <>
                                        <EditOutlined onClick={() => { setdataupdate({ id: record.id, relationship_type: record.relationship_type, inverse_relationship_type: record.inverse_relationship_type, description: record.description }); setmodalupdate(true); setdisabledupdate(false) }} style={{ fontSize: `1.2rem`, color: `rgb(15,146,255)`, cursor: `pointer`, marginRight: `1rem` }} />
                                        <DeleteOutlined onClick={() => { setdatadelete({ id: record.id }); setdataupdate({ id: record.id, relationship_type: record.relationship_type }); setmodaldelete(true); }} style={{ fontSize: `1.2rem`, color: `red`, cursor: `pointer` }} />
                                    </>
                                    :
                                    null
                            }
                        </>
                }
            }
        }
    ]

    //3.onChange
    //search nama
    const onChangeSearch = (e) => {
        if (e.target.value === "") {
            setdisplaydata(displaydata3)
            setnamasearchact(false)
        }
        else {
            setnamasearchact(true)
            setnamavalue(e.target.value)
        }
    }
    const onFinalClick = () => {
        var datatemp = displaydata2
        if (namasearchact) {
            datatemp = datatemp.filter(flt => {
                return flt.relationship_type.toLowerCase().includes(namavalue.toLowerCase())
            })
        }
        setdisplaydata(datatemp)
    }

    //4.handler
    const handleAddRelationships = () => {
        setloadingadd(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addRelationship`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataadd)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingadd(false)
                setmodaladd(false)
                if (res2.success) {
                    notification['success']({
                        message: "Relationship Type berhasil ditambahkan",
                        duration: 2
                    })
                    setdataadd({
                        ...dataadd,
                        name: ""
                    })
                    setdisplaytrigger(prev => prev + 1)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleUpdateRelationships = () => {
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateRelationship`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataupdate)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingupdate(false)
                setmodalupdate(false)
                if (res2.success) {
                    notification['success']({
                        message: "Relationship Type berhasil diubah",
                        duration: 2
                    })
                    setdataupdate({
                        ...dataupdate,
                        name: ""
                    })
                    setdisplaytrigger(prev => prev + 1)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleDeleteRelationships = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteRelationship`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datadelete)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingdelete(false)
                setmodaldelete(false)
                if (res2.success) {
                    notification['success']({
                        message: "Relationship Type berhasil dihapus",
                        duration: 2
                    })
                    setdisplaytrigger(prev => prev + 1)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

    //5.useEffect
    useEffect(() => {
        setpraloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationships`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplaydata(res2.data)
                setdisplaydata2(res2.data)
                setdisplaydata3(res2.data)
                setpraloading(false)
            })
    }, [displaytrigger])


    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-b bg-white mb-5 p-4">
                <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
                    <div className="font-semibold text-base w-auto">Relationship Type</div>
                </div>
                <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                    <Button onClick={() => { setmodaladd(true) }} size="large" type="primary">
                        Tambah
                    </Button>
                </div>
            </div>
            <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
                <div className="md:col-span-5 col-span-1 flex flex-col py-3 px-10">
                    <div className="flex mb-8">
                        <div className=" w-full mr-1 grid grid-cols-12">
                            <div className="col-span-11 mr-1">
                                <Input style={{ width: `100%`, marginRight: `0.5rem` }} placeholder="Cari Relationship Type" onChange={onChangeSearch} allowClear></Input>
                            </div>
                            <div className=" col-span-1">
                                <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
                            </div>
                        </div>
                    </div>
                    <Table loading={praloading} pagination={{ pageSize: 9 }} scroll={{ x: 200 }} dataSource={displaydata} columns={columns}
                        onRow={(record, rowIndex) => {
                            return {
                                onMouseOver: (event) => {
                                    setevents(record.id)
                                },
                                onMouseLeave: (event) => {
                                    setevents(0)
                                }
                            }
                        }}></Table>
                </div>
            </div>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Form Tambah Relationship Type</h1>
                    <div className="flex">
                        <>
                            <Button type="danger" onClick={() => { setmodaladd(false); setdataadd({ ...dataadd, relationship_type: "" }) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={disabledadd} onClick={handleAddRelationships} loading={loadingadd}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modaladd}
                onCancel={() => { setmodaladd(false) }}
                footer={null}
                width={700}
            >
                <div className="flex flex-col mb-3">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Nama Relationship Type <span className="namamanu"></span></p>
                        <Input value={dataadd.relationship_type} placeholder="Masukkan Relationship Type" onChange={(e => {
                            e.target.value === "" ? setdisabledadd(true) : setdisabledadd(false)
                            setdataadd({ ...dataadd, relationship_type: e.target.value })
                        })}></Input>
                        <style jsx>
                            {`
                                .namamanu::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Nama Inverse Relationship Type <span className="namainversemanu"></span></p>
                        <Input value={dataadd.inverse_relationship_type} placeholder="Masukkan Inverse Relationship Type" onChange={(e => {
                            e.target.value === "" ? setdisabledadd(true) : setdisabledadd(false)
                            setdataadd({ ...dataadd, inverse_relationship_type: e.target.value })
                        })}></Input>
                        <style jsx>
                            {`
                                .namainversemanu::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Deskripsi</p>
                        <Input.TextArea rows={4} value={dataadd.description} placeholder="Masukkan Deskripsi" onChange={(e => {
                            setdataadd({ ...dataadd, description: e.target.value })
                        })}></Input.TextArea>
                    </div>
                </div>
            </Modal>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Form Ubah Relationship Type</h1>
                    <div className="flex">
                        <>
                            <Button type="danger" onClick={() => { setmodalupdate(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={disabledupdate} onClick={handleUpdateRelationships} loading={loadingupdate}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalupdate}
                onCancel={() => { setmodalupdate(false) }}
                footer={null}
                width={700}
            >
                <div className="flex flex-col mb-3">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Nama Relationship Type <span className="namamanu"></span></p>
                        <Input value={dataupdate.relationship_type} defaultValue={dataupdate.relationship_type} placeholder="Masukkan Relationship Type" onChange={(e => {
                            e.target.value === "" ? setdisabledupdate(true) : setdisabledupdate(false)
                            setdataupdate({ ...dataupdate, relationship_type: e.target.value })
                        })}></Input>
                        <style jsx>
                            {`
                                .namamanu::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Nama Inverse Relationship Type <span className="namainversemanu"></span></p>
                        <Input value={dataupdate.inverse_relationship_type} defaultValue={dataupdate.inverse_relationship_type} placeholder="Masukkan Inverse Relationship Type" onChange={(e => {
                            e.target.value === "" ? setdisabledupdate(true) : setdisabledupdate(false)
                            setdataupdate({ ...dataupdate, inverse_relationship_type: e.target.value })
                        })}></Input>
                        <style jsx>
                            {`
                                .namainversemanu::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Deskripsi</p>
                        <Input.TextArea rows={4} value={dataupdate.description} defaultValue={dataupdate.description} placeholder="Masukkan Deskripsi" onChange={(e => {
                            setdataupdate({ ...dataupdate, description: e.target.value })
                        })}></Input.TextArea>
                    </div>
                </div>
            </Modal>
            <Modal title="Konfirmasi Hapus Relationship Type"
                visible={modaldelete}
                onCancel={() => { setmodaldelete(false) }}
                okText="Ya"
                cancelText="Tidak"
                onOk={handleDeleteRelationships}
                okButtonProps={{ loading: loadingdelete }}
            >
                Apakah Anda yakin ingin menghapus Relationship Type "<strong>{dataupdate.relationship_type}</strong>"?
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    if (!req.headers.cookie) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
    if (!cookiesJSON1.token) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    initProps = cookiesJSON1.token
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    // if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/dashboard/admin' })
    //     res.end()
    // }

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "4"
        },
    }
}

export default Relationships
