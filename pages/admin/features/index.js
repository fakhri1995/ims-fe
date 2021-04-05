import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import { SearchOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Button, Form, Input, Drawer, Table } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'

const FeaturesIndex = ({ initProps, dataProfile, sidemenu }) => {
    //Definisi table
    const dataRaw = []
    for (var i = 0; i < 10; i++) {
        dataRaw.push({
            feature_id: i + 1,
            nama: `feature local ${i + 1}`,
            deskripsi: `ini deskripsi fari feature local ${i + 1}`,
            key: `009090990-${i + 1}`
        })
    }
    const columnsFeature = [
        {
            title: 'Feature ID',
            dataIndex: 'feature_id',
            key: 'feature_id',
            render: (text, record, index) => (
                <>
                    {/* <Link href={`/admin/service/${record.id}`}> */}
                    <a href="#" onClick={() => {
                        setdrawedit(true); setdataedit({
                            nama: record.nama,
                            deskripsi: record.deskripsi
                        })
                    }}>
                        <h1 className="font-semibold hover:text-gray-500">{record.feature_id}</h1>
                    </a>
                    {/* </Link> */}
                </>
            )
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            render: (text, record, index) => (
                <>
                    {/* <Link href={`/admin/service/${record.id}`}> */}
                    <a href="#" onClick={() => {
                        setdrawedit(true); setdataedit({
                            nama: record.nama,
                            deskripsi: record.deskripsi
                        })
                    }}>
                        <h1 className="hover:text-gray-500 text-xs">{record.nama}</h1>
                    </a>
                    {/* </Link> */}
                </>
            )
        },
        {
            title: 'Deskripsi',
            dataIndex: 'deskripsi',
            key: 'deskripsi',
            render: (text, record, index) => (
                <>
                    {/* <Link href={`/admin/service/${record.id}`}> */}
                    <a href="#" onClick={() => {
                        setdrawedit(true); setdataedit({
                            nama: record.nama,
                            deskripsi: record.deskripsi
                        })
                    }}>
                        <h1 className="hover:text-gray-500 text-xs">{record.deskripsi}</h1>
                    </a>
                    {/* </Link> */}
                </>
            )
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: (text, record, index) => (
                <>
                    <a href="#" onClick={() => {
                        setdrawedit(true); setdataedit({
                            nama: record.nama,
                            deskripsi: record.deskripsi
                        })
                    }}>
                        <h1 className="hover:text-gray-500 text-xs">{record.key}</h1>
                    </a>
                </>
            )
        },
    ]

    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    const { Search } = Input


    //useState
    const [datatable, setdatatable] = useState(dataRaw)
    const [drawcreate, setdrawcreate] = useState(false)
    const [drawedit, setdrawedit] = useState(false)
    const [datacreate, setdatacreate] = useState({
        nama: '',
        deskripsi: ''
    })
    const [dataedit, setdataedit] = useState({
        nama: '',
        deskripsi: ''
    })


    //event
    const onSearchService = (val) => {
        if (val === "") {
            setdatatable(datatable)
        }
        setdatatable(prev => {
            return prev.filter(dataa => {
                return dataa.nama.toLowerCase().includes(val.toLowerCase())
            })
        })
    }
    const onCariFeature = (e) => {
        console.log("asa: " + e.target.value)
        if (e.target.value === "") {
            setdatatable(dataRaw)
        }
        else {
            setdatatable(dataRaw)
            setdatatable(prev => {
                return prev.filter(dataa => {
                    return dataa.nama.toLowerCase().includes(e.target.value.toLowerCase())
                })
            })
        }
    }
    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} st={st} pathArr={pathArr}>
            <div className="w-full grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
                <div className="col-span-5 border-b border-opacity-30 border-gray-400 flex items-center justify-between px-0 py-4 md:p-4 mb-5">
                    <h1 className="font-bold">Features</h1>
                    <Button type="primary" size="large" onClick={() => { setdrawcreate(true) }}>Tambah Feature</Button>
                </div>
                <div className="col-span-5 p-0 md:p-5 flex flex-col">
                    {/* <Search placeholder="Cari Nama Feature" allowClear style={{ width: `40%`, marginBottom: `1rem` }} onSearch={(value) => { onSearchService(value) }} /> */}
                    <div className="w-full md:w-5/12">
                        <Input prefix={<SearchOutlined />} placeholder="Cari Fitur" style={{ borderRadius: `0.5rem`, marginBottom: `1rem`, width: `100%` }} onChange={onCariFeature} allowClear />
                    </div>
                    <Table columns={columnsFeature} dataSource={datatable} pagination={{ pageSize: 8 }} scroll={{ x: 300 }}></Table>
                </div>
            </div>
            <Drawer title={`Tambah Feature`} maskClosable={false} visible={drawcreate} onClose={() => { setdrawcreate(false); /*closeClientsDrawer(); instanceForm.resetFields()*/ }} width={380} destroyOnClose={true}>
                <div className="flex flex-col">
                    <Form layout="vertical" initialValues={datacreate}>
                        <Form.Item label="Nama Feature" name="nama" rules={[
                            {
                                required: true,
                                message: 'Nama feature wajib diisi',
                            },
                        ]}>
                            <Input defaultValue={datacreate.nama} />
                        </Form.Item>
                        <Form.Item label="Deskripsi" name="deskripsi" rules={[
                            {
                                required: true,
                                message: 'Deskripsi wajib diisi',
                            },
                        ]}>
                            <Input.TextArea defaultValue={datacreate.deskripsi} />
                        </Form.Item>
                        <div className="flex justify-end">
                            <Button type="default" onClick={() => { setdrawcreate(false) }} style={{ marginRight: `1rem` }}>Batalkan</Button>
                            <Button htmlType="submit" type="primary" onClick={() => { setdrawcreate(false) }}>Simpan</Button>
                        </div>
                    </Form>
                </div>
            </Drawer>
            <Drawer title={`Edit Feature`} maskClosable={false} visible={drawedit} onClose={() => { setdrawedit(false); /*closeClientsDrawer(); instanceForm.resetFields()*/ }} width={380} destroyOnClose={true}>
                <div className="flex flex-col">
                    <Form layout="vertical" initialValues={dataedit}>
                        <Form.Item label="Nama Feature" rules={[
                            {
                                required: true,
                                message: 'Nama feature wajib diisi',
                            },
                        ]} name="nama">
                            <Input defaultValue={dataedit.nama} />
                        </Form.Item>
                        <Form.Item label="Deskripsi" name="deskripsi" rules={[
                            {
                                required: true,
                                message: 'Deskripsi wajib diisi',
                            },
                        ]} style={{ marginBottom: `3rem` }}>
                            <Input.TextArea defaultValue={dataedit.deskripsi} />
                        </Form.Item>
                        <div className="flex justify-end">
                            <Button type="default" onClick={() => { setdrawedit(false) }} style={{ marginRight: `1rem` }}>Batalkan</Button>
                            <Button htmlType="submit" type="primary" onClick={() => { setdrawedit(false) }}>Simpan</Button>
                        </div>
                    </Form>
                </div>
            </Drawer>
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

export default FeaturesIndex
