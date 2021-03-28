import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import { PlusCircleTwoTone } from '@ant-design/icons'
import Link from 'next/link'
import { Button, Dropdown, Form, Input, Select, notification, Modal } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'

function Financial({ initProps, dataProfile, sidemenu }) {
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    const { Option } = Select

    //useState
    const [tambahbtn, settambahbtn] = useState(true)
    const [tambahform, settambahform] = useState(false)

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className="w-full h-80 grid grid-cols-5 border-t border-opacity-30 border-gray-500 bg-white">
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
                                        <Form layout="vertical">
                                            <div className="grid grid-cols-3">
                                                <Form.Item label="Nama" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Nama wajib diisi',
                                                    },
                                                ]} style={{ marginRight: `1rem` }}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item label="Tipe" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Wajib diisi',
                                                    },
                                                ]} style={{ marginRight: `1rem` }}>
                                                    <Select defaultValue={1}>
                                                        <Option value={1}>Declining Balance</Option>
                                                        <Option value={2}>Staright Line</Option>
                                                        <Option value={3}>Sum of Years Digit</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label="Daya Tahan (tahun)" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Wajib diisi',
                                                    },
                                                ]} style={{ marginRight: `1rem` }}>
                                                    <Input />
                                                </Form.Item>
                                            </div>
                                            <div className="mb-2">
                                                <Form.Item label="Deskripsi">
                                                    <Input.TextArea style={{ width: `100%` }}></Input.TextArea>
                                                </Form.Item>
                                            </div>
                                            <div className="flex justify-end items-center">
                                                <Button type="default" onClick={() => { settambahbtn(true) }} size="middle" style={{ marginRight: `1rem` }}>Batalkan</Button>
                                                <Button type="primary" onClick={() => { settambahbtn(true) }} size="middle">Simpan</Button>
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
                            <div id="thead" className="grid grid-cols-8 justify-center items-center border-b-2 border-gray-600 p-2">
                                <div className=" col-span-2 font-semibold text-sm">Nama</div>
                                <div className=" col-span-2 font-semibold text-sm">Tipe</div>
                                <div className=" col-span-1 font-semibold text-sm">Daya Tahan</div>
                                <div className=" col-span-3 font-semibold text-sm">Deskripsi</div>
                            </div>
                            <div id="tbody">
                                <div className="grid grid-cols-8 justify-center items-center p-4">
                                    <div className=" col-span-2 font-semibold text-sm">SL-5</div>
                                    <div className=" col-span-2 text-sm">Straight Line</div>
                                    <div className=" col-span-1 text-sm">5 Tahun</div>
                                    <div className=" col-span-3 text-sm">Straight Line 5 Tahun</div>
                                </div>
                                <div className="grid grid-cols-8 justify-center items-center p-4">
                                    <div className=" col-span-2 font-semibold text-sm">SL-5</div>
                                    <div className=" col-span-2 text-sm">Straight Line</div>
                                    <div className=" col-span-1 text-sm">5 Tahun</div>
                                    <div className=" col-span-3 text-sm">Straight Line 5 Tahun</div>
                                </div>
                                <div className="grid grid-cols-8 justify-center items-center p-4">
                                    <div className=" col-span-2 font-semibold text-sm">SL-5</div>
                                    <div className=" col-span-2 text-sm">Straight Line</div>
                                    <div className=" col-span-1 text-sm">5 Tahun</div>
                                    <div className=" col-span-3 text-sm">Straight Line 5 Tahun</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default Financial