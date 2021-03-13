import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import { useState } from 'react'
import Link from 'next/link'
import { TableOutlined, BarsOutlined } from '@ant-design/icons'
import { Select, Checkbox, Pagination, Empty } from 'antd'
import Layout from '../../components/layout-dashboard-tickets'
import st from '../../components/layout-dashboard.module.css'

function TicketsIndex({ initProps, dataProfile, dataTicketList, sidemenu }) {
    //Initialization
    const rt = useRouter()
    const { Option, OptGroup } = Select;
    const pathArr = ['tickets']

    //States
    const [tampilan, settampilan] = useState({
        card: true,
        table: false
    })

    //Handler

    return (
        <Layout tok={initProps} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} st={st}>
            <div className="w-full">
                <div className="border-b-2 border-t-2 px-5 py-3 justify-end w-full flex">
                    <h1 className="mr-3">Tampilan: </h1>
                    {tampilan.card ?
                        <button className="border px-2 pb-2 bg-gray-800 rounded mr-3" ><BarsOutlined style={{ color: `white` }} /></button>
                        :
                        <button className="border px-2 pb-2 rounded mr-3" onClick={() => { settampilan({ card: true, table: false }) }}><BarsOutlined style={{ color: `black` }} /></button>
                    }
                    {tampilan.table ?
                        <button className="border px-2 pb-2 bg-gray-800 rounded" ><TableOutlined style={{ color: `white` }} /></button>
                        :
                        <button className="border px-2 pb-2 rounded" onClick={() => { settampilan({ card: false, table: true }) }}><TableOutlined style={{ color: `black` }} /></button>
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5">
                    <div className="col-span-1 md:col-span-4 p-3">
                        <div className="flex flex-col md:flex-row justify-between p-3">
                            <div className="divide-x-2 flex pl-3">
                                <Checkbox style={{ marginTop: `0.3rem` }}>Pilih Semua</Checkbox>
                                <div className="pl-2">
                                    Urut Berdasarkan:
                                    <Select bordered={false} defaultValue={"dateCreated"} style={{ fontWeight: `bold` }}>
                                        <Option value="dueByTime">Jatuh Tempo</Option>
                                        <Option value="dateCreated">Tanggal Dibuat</Option>
                                        <Option value="lastModified">Edit Terakhir</Option>
                                        <Option value="priority">Prioritas</Option>
                                        <Option value="status">Status</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="divide-x-2 flex">
                                <div className="pr-4 pt-1">
                                    <Link href="#">
                                        Export
                                    </Link>
                                </div>
                                <div className="pl-4">
                                    <Pagination size="small" defaultCurrent={1} total={50}></Pagination>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-auto border rounded-md p-3">
                            {/* Ini list per item*/}
                            {
                                dataTicketList.data.length !== 0 ?
                                    <>
                                        <div className="flex flex-col md:flex-row justify-between divide-x-2 w-full mb-5 border-b">
                                            <Link href={`/tickets/${0}`}>
                                                <div className="w-9/12 p-3 flex items-center">
                                                    <div className="mr-3">
                                                        <Checkbox style={{ marginTop: `0.3rem` }}></Checkbox>
                                                    </div>
                                                    <div className="flex justify-between w-full">
                                                        <div>
                                                            <h1><a href="#">Request dari Andi Darussalam: Adobe Premiere</a> #SR-8</h1>
                                                            <h1>Dari: <strong>Andi Darussalam</strong></h1>
                                                            <h1>Dibuat: 4 hari yang lalu | Batas waktu sisa: 1 hari</h1>
                                                        </div>
                                                        <div className="flex justify-center items-center">
                                                            <div className="rounded-md w-auto h-auto px-2 py-1 bg-red-100 border border-red-200 text-red-600">Lewat</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="flex flex-col w-3/12 p-3">
                                                <div className="w-full text-sm mb-1">
                                                    Dilimpahkan ke:
                                                    <Select
                                                        bordered={false}
                                                        placeholder="Cari"
                                                        style={{ width: `100%`, fontWeight: `bold` }}
                                                        size="small"
                                                    >
                                                        <Option value="none">None</Option>
                                                        <OptGroup label="Groups">
                                                            <Option value="keuangan">Divisi Keuangan</Option>
                                                            <Option value="sdm">Divisi SDM</Option>
                                                        </OptGroup>
                                                        <OptGroup label="Agents">
                                                            <Option value="Ardi Wijaya">Ardi Wijaya</Option>
                                                            <Option value="Bono Samsuddin">Bono Samsuddin</Option>
                                                        </OptGroup>
                                                    </Select>
                                                </div>
                                                <div className="w-full text-sm mb-1">
                                                    Status:
                                                    <Select
                                                        bordered={false}
                                                        placeholder="Pilih Status"
                                                        style={{ fontWeight: `bold` }}
                                                        size="small"
                                                    >
                                                        <Option value="open">Open</Option>
                                                        <Option value="pending">Pending</Option>
                                                        <Option value="resolved">Resolved</Option>
                                                        <Option value="closed">Closed</Option>
                                                    </Select>
                                                </div>
                                                <div className="w-full text-sm mb-1">
                                                    Prioritas:
                                                    <Select
                                                        bordered={false}
                                                        placeholder="Pilih Status"
                                                        style={{ fontWeight: `bold` }}
                                                        size="small"
                                                        defaultValue="sedang"
                                                    >
                                                        <Option value="rendah"><div className="flex items-center"><div className="w-3 h-3 bg-green-600 mr-1" />Rendah</div></Option>
                                                        <Option value="sedang"><div className="flex items-center"><div className="w-3 h-3 bg-blue-600 mr-1" />Sedang</div></Option>
                                                        <Option value="tinggi"><div className="flex items-center"><div className="w-3 h-3 bg-yellow-600 mr-1" />Tinggi</div></Option>
                                                        <Option value="darurat"><div className="flex items-center"><div className="w-3 h-3 bg-red-600 mr-1" />Darurat</div></Option>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row justify-between divide-x-2 w-full mb-5 border-b">
                                            <div className="w-9/12 p-3 flex items-center">
                                                <div className="mr-3">
                                                    <Checkbox style={{ marginTop: `0.3rem` }}></Checkbox>
                                                </div>
                                                <div className="flex justify-between w-full">
                                                    <div>
                                                        <h1><a href="#">Request dari Andi Darussalam: Adobe Premiere</a> #SR-8</h1>
                                                        <h1>Dari: <strong>Andi Darussalam</strong></h1>
                                                        <h1>Dibuat: 4 hari yang lalu | Batas waktu sisa: 1 hari</h1>
                                                    </div>
                                                    <div className="flex justify-center items-center">
                                                        <div className="rounded-md w-auto h-auto px-2 py-1 bg-red-100 border border-red-200 text-red-600">Lewat</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-3/12 p-3">
                                                <div className="w-full text-sm mb-1">
                                                    Dilimpahkan ke:
                                                    <Select
                                                        bordered={false}
                                                        placeholder="Cari"
                                                        style={{ width: `100%`, fontWeight: `bold` }}
                                                        size="small"
                                                    >
                                                        <Option value="none">None</Option>
                                                        <OptGroup label="Groups">
                                                            <Option value="keuangan">Divisi Keuangan</Option>
                                                            <Option value="sdm">Divisi SDM</Option>
                                                        </OptGroup>
                                                        <OptGroup label="Agents">
                                                            <Option value="Ardi Wijaya">Ardi Wijaya</Option>
                                                            <Option value="Bono Samsuddin">Bono Samsuddin</Option>
                                                        </OptGroup>
                                                    </Select>
                                                </div>
                                                <div className="w-full text-sm mb-1">
                                                    Status:
                                                    <Select
                                                        bordered={false}
                                                        placeholder="Pilih Status"
                                                        style={{ fontWeight: `bold` }}
                                                        size="small"
                                                    >
                                                        <Option value="open">Open</Option>
                                                        <Option value="pending">Pending</Option>
                                                        <Option value="resolved">Resolved</Option>
                                                        <Option value="closed">Closed</Option>
                                                    </Select>
                                                </div>
                                                <div className="w-full text-sm mb-1">
                                                    Prioritas:
                                                    <Select
                                                        bordered={false}
                                                        placeholder="Pilih Status"
                                                        style={{ fontWeight: `bold` }}
                                                        size="small"
                                                        defaultValue="sedang"
                                                    >
                                                        <Option value="rendah"><div className="flex items-center"><div className="w-3 h-3 bg-green-600 mr-1" />Rendah</div></Option>
                                                        <Option value="sedang"><div className="flex items-center"><div className="w-3 h-3 bg-blue-600 mr-1" />Sedang</div></Option>
                                                        <Option value="tinggi"><div className="flex items-center"><div className="w-3 h-3 bg-yellow-600 mr-1" />Tinggi</div></Option>
                                                        <Option value="darurat"><div className="flex items-center"><div className="w-3 h-3 bg-red-600 mr-1" />Darurat</div></Option>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                            }
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
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    const resourcesGT = await fetch(`https://boiling-thicket-46501.herokuapp.com/getTickets`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGT = await resourcesGT.json()
    const dataTicketList = resjsonGT

    return {
        props: {
            initProps,
            dataProfile,
            dataTicketList,
            sidemenu: "4"
        },
    }
}

export default TicketsIndex