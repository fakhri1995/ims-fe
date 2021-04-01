import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Button, Table, Dropdown, Menu, Form, Input, Select, notification, Modal, Drawer, Checkbox } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'

const ModulesIndex = ({ initProps, dataProfile, sidemenu }) => {
    //dataSource
    const datajson = {
        "success": true,
        "message": "Data Berhasil Diambil",
        "data": [
            {
                "id": 38,
                "nama_kategori": "Tickets",
                "deskripsi": "",
                "deleted_at": null
            },
            {
                "id": 37,
                "nama_kategori": "Problems",
                "deskripsi": "Deskripsi layanan data yang ditawarkan",
                "deleted_at": null
            },
            {
                "id": 54,
                "nama_kategori": "Changes",
                "deskripsi": "Penjelasannyaa Facilities Managemen",
                "deleted_at": null
            },
        ]
    }
    const datafeatures = []
    for (var i = 0; i < 10; i++) {
        datafeatures.push("feature- " + (i + 1))
    }

    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    const { Option } = Select
    const { Search } = Input
    const tabnameArr = []
    const loop = []
    datajson.data.map((doc, idx) => {
        var nama = doc.nama_kategori.split(" ")[0]
        tabnameArr.push(nama)
    })
    for (var i = 0; i < datajson.data.length; i++) {
        if (i === 0) {
            loop.push("block")
        }
        else {
            loop.push("hidden")
        }
    }

    //useState
    const [tabnameArrVal, settabnameArrVal] = useState(loop)
    const [idmodule, setidmodule] = useState(0)
    const [modulselected, setmodulselected] = useState(datajson.data[0].nama_kategori)
    const [datafeature, setdatafeature] = useState()
    const [datacurrfeature, setdatacurrfeature] = useState()
    const [dataeditmodule, setdataeditmodule] = useState({
        id: 0,
        nama_kategori: '',
        deskripsi: ''
    })
    const [datatambahmodule, setdatatambahmodule] = useState({
        nama_kategori: '',
        deskripsi: ''
    })
    const [drawableedit, setdrawableedit] = useState(false)
    const [drawablecreate, setdrawablecreate] = useState(false)
    const [modaldelete, setmodaldelete] = useState(false)

    //event
    const onChangeTab = (e, jenis, idxjenis, namakateg, deskripsi, id) => {
        setmodulselected(namakateg)
        setidmodule(id)
        // if (idxjenis === 0) {
        //     const temp = tabnameArrVal
        //     temp[0] = "block"
        //     settabnameArrVal(temp)
        //     for (var i = 0; i < tabnameArrVal.length; i++) {
        //         if (i != 0) {
        //             const temp2 = tabnameArrVal
        //             temp2[i] = "hidden"
        //             settabnameArrVal(temp2)
        //         }
        //     }
        //     setdatafeature()
        //     setdatacurrfeature()
        // }
        // else {
        const temp3 = tabnameArrVal
        temp3[idxjenis] = "block"
        settabnameArrVal(temp3)
        for (var i = 0; i < tabnameArrVal.length; i++) {
            if (i != idxjenis) {
                const temp4 = tabnameArrVal
                temp4[i] = "hidden"
                settabnameArrVal(temp4)
            }
        }
        setdataeditmodule({
            id: id,
            nama_kategori: namakateg,
            deskripsi: deskripsi
        })
        setdatafeature()
        setdatafeature(
            // prev => {
            //     return prev.filter((doc, idx) => { return doc.categoryName == namakateg })
            // }
        )
        setdatacurrfeature()
        setdatacurrfeature(
            // prev => {
            //     return prev.filter((doc, idx) => { return doc.categoryName == namakateg })
            // }
        )
        // }
    }


    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} st={st} pathArr={pathArr}>
            <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
                <div className="col-span-5 border-b border-opacity-30 border-gray-400 flex items-center justify-between p-4 mb-5">
                    <h1 className="font-bold">Modules</h1>
                    <Button type="primary" size="large" onClick={() => { setdrawablecreate(true) }}>Tambah Module</Button>
                </div>
                <div className="col-span-5">
                    <div className="w-full grid grid-cols-9">
                        <div className="col-span-2 flex flex-col border-r pr-2">
                            <div>
                                {
                                    datajson.data.map((doc, idx) => {
                                        return (
                                            <>
                                                {
                                                    tabnameArrVal[idx] === "block" ?
                                                        <div className={`p-2 cursor-pointer flex items-center text-sm font-semibold bg-blue-700 text-white rounded`}>
                                                            {/* <FolderOpenOutlined style={{ marginRight: `0.7rem` }} /> */}
                                                            {doc.nama_kategori}
                                                        </div>
                                                        :
                                                        <div className={`p-2 cursor-pointer hover:text-gray-900 flex items-center text-sm font-semibold`} onClick={(e) => { onChangeTab(e, tabnameArr[idx], (idx), doc.nama_kategori, doc.deskripsi, doc.id) }}>
                                                            {/* <FolderOpenOutlined style={{ marginRight: `0.7rem` }} /> */}
                                                            {doc.nama_kategori}
                                                        </div>
                                                }
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-span-7">
                            {datajson.data.map((doc, idx) => {
                                return (
                                    <div className={`${tabnameArrVal[idx]} py-5 px-7 flex flex-col`}>
                                        <div className="flex justify-between items-center mb-5">
                                            <div className="flex flex-col justify-center">
                                                <div className="flex items-center mb-1">
                                                    <div className="flex items-center mr-3">
                                                        {tabnameArrVal[idx] === "block" && <p className="font-semibold m-0">{doc.nama_kategori}</p>}
                                                    </div>
                                                    <div className="w-auto h-6 px-1 border-2 rounded-sm cursor-pointer hover:bg-gray-200 flex justify-center items-center mr-3" onClick={() => setdrawableedit(true)}><EditOutlined /></div>
                                                    <div className="w-auto h-6 px-1 border-2 rounded-sm cursor-pointer hover:bg-gray-200 flex justify-center items-center mr-3" onClick={() => setmodaldelete(true)}><DeleteOutlined /></div>
                                                </div>
                                                <p className="text-xs text-gray-500">{doc.deskripsi}</p>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                datafeatures.map((doc, idx) => {
                                                    return (
                                                        <div className="border-b mb-3 p-3">
                                                            <p className="mb-0 text-sm">{doc}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Drawer title={`Tambah Module`} maskClosable={false} visible={drawablecreate} onClose={() => { setdrawablecreate(false); /*closeClientsDrawer(); instanceForm.resetFields()*/ }} width={420} destroyOnClose={true}>
                <div className="flex flex-col">
                    <Form layout="vertical">
                        <Form.Item label="Nama Module" rules={[
                            {
                                required: true,
                                message: 'Nama module wajib diisi',
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Deskripsi" rules={[
                            {
                                required: true,
                                message: 'Deskripsi wajib diisi',
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                        <Input prefix={<SearchOutlined />} placeholder="Cari Fitur" style={{ borderRadius: `0.5rem`, marginBottom: `1rem` }} />
                        <div className=" overflow-y-auto h-80 mb-5">
                            {
                                datafeatures.map((doc, idx) => {
                                    return (
                                        <div className="flex items-center hover:bg-gray-300 p-3">
                                            <Checkbox style={{ marginRight: `1rem` }} /> {doc}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex justify-end">
                            <Button type="default" onClick={() => { setdrawableedit(false) }} style={{ marginRight: `1rem` }}>Batalkan</Button>
                            <Button type="primary" onClick={() => { setdrawableedit(false) }}>Simpan</Button>
                        </div>
                    </Form>
                </div>
            </Drawer>
            <Drawer title={`Edit Module ${modulselected}`} maskClosable={false} visible={drawableedit} onClose={() => { setdrawableedit(false); /*closeClientsDrawer(); instanceForm.resetFields()*/ }} width={420} destroyOnClose={true}>
                <div className="flex flex-col">
                    <Form layout="vertical">
                        <Form.Item label="Nama Module" rules={[
                            {
                                required: true,
                                message: 'Nama module wajib diisi',
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Deskripsi" rules={[
                            {
                                required: true,
                                message: 'Deskripsi wajib diisi',
                            },
                        ]} style={{ marginBottom: `3rem` }}>
                            <Input />
                        </Form.Item>
                        <Input prefix={<SearchOutlined />} placeholder="Cari Fitur" style={{ borderRadius: `0.5rem`, marginBottom: `1rem` }} />
                        <div className=" overflow-y-auto h-80 mb-5">
                            {
                                datafeatures.map((doc, idx) => {
                                    return (
                                        <div className="flex items-center hover:bg-gray-300 p-3">
                                            <Checkbox style={{ marginRight: `1rem` }} /> {doc}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex justify-end">
                            <Button type="default" onClick={() => { setdrawableedit(false) }} style={{ marginRight: `1rem` }}>Batalkan</Button>
                            <Button type="primary" onClick={() => { setdrawableedit(false) }}>Simpan</Button>
                        </div>
                    </Form>
                </div>
            </Drawer>
            <Modal
                title={`Konfirmasi Hapus Module`}
                visible={modaldelete}
                onCancel={() => { setmodaldelete(false) }}
                style={{ top: `3rem` }}
                width={500}
                destroyOnClose={true}
            >
                <h1>Yakin ingin hapus module {modulselected} ini?</h1>
            </Modal>
        </Layout>
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

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "4"
        },
    }
}

export default ModulesIndex
