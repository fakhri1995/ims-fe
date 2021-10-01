import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Empty, notification, Spin } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'

const ManufacturersIndex = ({ dataProfile, sidemenu, initProps }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //2.useState
    const [displaydata, setdisplaydata] = useState([])
    const [displaydata2, setdisplaydata2] = useState([])
    const [displaydata3, setdisplaydata3] = useState([])
    const [displaytrigger, setdisplaytrigger] = useState(0)
    const [praloading, setpraloading] = useState(true)
    //Tambah
    const [dataadd, setdataadd] = useState({
        name: ""
    })
    const [modaladd, setmodaladd] = useState(false)
    const [loadingadd, setloadingadd] = useState(false)
    const [disabledadd, setdisabledadd] = useState(true)
    //Ubah
    const [dataupdate, setdataupdate] = useState({
        id: "",
        name: ""
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
    const [namasearchact, setnamasearchact] = useState(false)
    const [namavalue, setnamavalue] = useState("")
    const [hover, sethover] = useState("")

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
                return flt.name.toLowerCase().includes(namavalue.toLowerCase())
            })
        }
        setdisplaydata(datatemp)
    }

    //4.handler
    const handleAddManufacturer = () => {
        setloadingadd(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addManufacturer`, {
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
                        message: "Manufacturer berhasil ditambahkan",
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
    const handleUpdateManufacturer = () => {
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateManufacturer`, {
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
                        message: "Manufacturer berhasil diubah",
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
    const handleDeleteManufacturer = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteManufacturer`, {
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
                        message: "Manufacturer berhasil dihapus",
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/getManufacturers`, {
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
            <div className="w-full grid grid-cols-1 md:grid-cols-3 bg-white mb-5 p-4">
                <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
                    <div className="font-semibold text-base w-auto">Manufacturer</div>
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
                                <Input style={{ width: `100%`, marginRight: `0.5rem` }} placeholder="Cari Nama Manufacturer" onChange={onChangeSearch} allowClear></Input>
                            </div>
                            <div className=" col-span-1">
                                <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col rounded shadow border">
                        <div className="flex w-full p-4 font-semibold items-center text-base border-b bg-gray-100">Nama Manufacturer</div>
                        {
                            praloading ?
                                <div className="h-20 flex justify-center items-center">
                                    <Spin />
                                </div>
                                :
                                <>
                                    {
                                        displaydata.length > 0 ?
                                            displaydata.map((doc, idx) => {
                                                return (
                                                    <div className="flex justify-between w-full p-4 items-center text-sm border-b"
                                                        onMouseOver={() => {
                                                            sethover(idx)
                                                        }}
                                                        onMouseLeave={() => {
                                                            sethover("")
                                                        }}
                                                    >
                                                        <p className="mb-0">{doc.name}</p>
                                                        {
                                                            idx === hover &&
                                                            <div className="flex items-center pr-5">
                                                                <EditOutlined onClick={() => { setdataupdate({ id: doc.id, name: doc.name }); setmodalupdate(true); setdisabledupdate(false) }} style={{ fontSize: `1.2rem`, color: `rgb(15,146,255)`, cursor: `pointer`, marginRight: `1rem` }} />
                                                                <DeleteOutlined onClick={() => { setdatadelete({ id: doc.id }); setdataupdate({ id: doc.id, name: doc.name }); setmodaldelete(true); }} style={{ fontSize: `1.2rem`, color: `red`, cursor: `pointer` }} />
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                            :
                                            <div className="w-full">
                                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                            </div>
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Form Tambah Manufacturer</h1>
                    <div className="flex">
                        <>
                            <Button type="danger" onClick={() => { setmodaladd(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={disabledadd} onClick={handleAddManufacturer} loading={loadingadd}>Simpan</Button>
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
                        <p className="mb-0">Nama Manufacturer <span className="namamanu"></span></p>
                        <Input placeholder="Masukkan Nama Manufacturer" onChange={(e => {
                            e.target.value === "" ? setdisabledadd(true) : setdisabledadd(false)
                            setdataadd({ name: e.target.value })
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
                </div>
            </Modal>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Form Ubah Manufacturer</h1>
                    <div className="flex">
                        <>
                            <Button type="danger" onClick={() => { setmodalupdate(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={disabledupdate} onClick={handleUpdateManufacturer} loading={loadingupdate}>Simpan</Button>
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
                        <p className="mb-0">Nama Manufacturer <span className="namamanu"></span></p>
                        <Input placeholder="Masukkan Nama Manufacturer" value={dataupdate.name} defaultValue={dataupdate.name} onChange={(e => {
                            e.target.value === "" ? setdisabledupdate(true) : setdisabledupdate(false)
                            setdataupdate({ ...dataupdate, name: e.target.value })
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
                </div>
            </Modal>
            <Modal title="Konfirmasi Hapus Manufacturer"
                visible={modaldelete}
                onCancel={() => { setmodaldelete(false) }}
                okText="Ya"
                cancelText="Tidak"
                onOk={handleDeleteManufacturer}
                okButtonProps={{ loading: loadingdelete }}
            >
                Apakah Anda yakin ingin menghapus Manufacturer "<strong>{dataupdate.name}</strong>"?
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
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "3"
        },
    }
}

export default ManufacturersIndex
