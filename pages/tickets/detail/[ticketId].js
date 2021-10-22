import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons'
import { notification, Button, Spin, Empty, Modal, Tooltip, Select, Tabs, Input, TreeSelect } from 'antd'
import Layout from '../../../components/layout-dashboard2'
import moment from 'moment'
import st from '../../../components/layout-dashboard.module.css'
import Sticky from 'wil-react-sticky'

const Overview = ({ ticketid, initProps, praloading, maindata }) => {
    //init
    const rt = useRouter()

    //useState
    //export
    const [exporting, setexporting] = useState("")
    const [nameexporting, setnameexporting] = useState("")
    const [noteexporting, setnoteexporting] = useState("")
    const [modalexporting, setmodalexporting] = useState(false)
    const [displayexporting, setdisplayexporting] = useState(true)
    const [loadingexporting, setloadingexporting] = useState(false)

    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between px-5 pb-5 pt-3 mb-8">
                <h1 className="font-bold text-xl my-auto">Overview</h1>
                {
                    praloading ?
                        null
                        :
                        <div className="flex">
                            <Button type="default" onClick={(e) => { rt.push(`/tickets`) }} style={{ marginRight: `1rem` }} size="large">Edit</Button>
                            <Button type="primary" className="buttonExport" onClick={(e) => { setmodalexporting(true) }} size="large">Export</Button>
                        </div>
                }
            </div>
            {
                praloading ?
                    <Spin />
                    :
                    <div className="mb-8 mx-5 p-5 w-9/12 flex flex-col">
                        <div className="border shadow-md rounded-md flex flex-col p-5 mb-6">
                            <h1 className=" text-lg font-semibold">Ticket Detail:</h1>
                            <hr />
                            <div className="flex flex-col mt-3 mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Ticket Raised By:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.requester_name}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Lokasi Pembuat:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.requester_location_name}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Date Raised Ticket:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.created_at ? moment(maindata.ticket.created_at).locale('id').format("LL") : "-"}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Date Closed Ticket:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.due_to ? moment(maindata.ticket.due_to).locale('id').format("LL") : "-"}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Resolved Time:</h1>
                                <p className="mb-0 text-sm">-</p>
                            </div>
                        </div>
                        <div className="border shadow-md rounded-md flex flex-col p-5">
                            <h1 className=" text-lg font-semibold">Problem Detail:</h1>
                            <hr />
                            <div className="flex flex-col mt-3 mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Jenis Produk:</h1>
                                <p className="mb-0 text-sm">{maindata.incident.data.incident.product_type === 2 ? "ATM" : "-"}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">{maindata.incident.product_type === 2 ? "Terminal ID" : "ID Produk"}:</h1>
                                <p className="mb-0 text-sm">{maindata.incident.data.incident.product_id}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Nama PIC:</h1>
                                <p className="mb-0 text-sm">Bintang Agung Nusantara</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Kontak PIC:</h1>
                                <p className="mb-0 text-sm">0829192129</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Problem:</h1>
                                <p className="mb-0 text-sm">Card Reader</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Lokasi Problem:</h1>
                                <p className="mb-0 text-sm">{maindata.incident.data.incident.incident_place_name}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Waktu Kejadian:</h1>
                                <p className="mb-0 text-sm">{maindata.incident.data.incident.incident_time ? moment(maindata.incident.data.incident.incident_time).locale('id').format("L") + moment(maindata.incident.data.incident.incident_time).locale('id').format("LT") : "-"}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-2">Bukti Kejadian:</h1>
                                <div className="border px-8 py-4 flex justify-between items-center w-9/12 mb-1 relative cursor-pointer hover:text-blue-500">
                                    <div className="mr-5 flex items-center">
                                        <img src="/image/pdfIcon.png" alt="selected images" className="object-contain w-16 h-16 mr-10" />
                                        <p className="mb-0 mr-3">{maindata.incident.data.incident.files}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Deskripsi Kerusakan:</h1>
                                <p className="mb-0 text-sm">{maindata.incident.data.incident.description}</p>
                            </div>
                        </div>
                    </div>
            }
            <Modal title={<h1 className="font-semibold">Membuka Dokumen_1.pdf</h1>}
                visible={modalexporting}
                onCancel={() => { setmodalexporting(false) }}
                okText="Ya"
                cancelText="Tidak"
                okButtonProps={{ loading: loadingexporting }}
            >
                <div className="flex flex-col mb-5">
                    <div className="flex flex-col mb-4">
                        <p className="mb-2 text-xs font-semibold">Kamu memilih untuk membuka:</p>
                        <div className="mb-2 text-xs flex flex-col">

                        </div>
                    </div>
                    <hr />
                </div>
            </Modal>
        </div>
    )
}

const DetailItem = ({ ticketid, initProps }) => {
    //useState
    const [connecteditem, setconnecteditem] = useState("")
    const [modalconnecteditem, setmodalconnecteditem] = useState(false)
    const [loadingconnecteditem, setloadingconnecteditem] = useState(false)
    const [disabledconnecteditem, setdisabledconnecteditem] = useState(true)
    //1.asset
    const [assetdata, setassetdata] = useState([])
    const [selectedasset, setselectedasset] = useState(-10)
    //2. Item
    const [itemdata, setitemdata] = useState([])

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAssets`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setassetdata(res2.data)
            })
    }, [])
    useEffect(() => {
        if (selectedasset !== -10) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getInventories`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                },
            })
                .then(res => res.json())
                .then(res2 => {
                    const datafilter = res2.data.filter(docfil => docfil.asset_id === selectedasset)
                    setitemdata(datafilter)
                }, [])
        }
    }, [selectedasset])

    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between px-5 pb-5 pt-3 mb-8">
                <h1 className="font-bold text-xl my-auto">Detail Item</h1>
                {
                    // praloading ?
                    //     null
                    //     :
                    <div className="flex">
                        <Button type="default" disabled onClick={(e) => { rt.push(`/items`) }} size="large">Activity Item</Button>
                        {/* <Button type="primary" className="buttonExport" onClick={(e) => { setmodalexporting(true) }} size="large">Export</Button> */}
                    </div>
                }
            </div>
            <div className=" border rounded-lg py-10 w-10/12 mx-auto flex flex-col">
                <Empty description={
                    <p className="mb-0">
                        Hubungkan <span className=" text-blue-500">Item</span><span className="connectItem"></span>
                        <style jsx>
                            {`
                                        .connectItem::before{
                                            content: '*';
                                            color: red;
                                        }
                                    `}
                        </style>
                    </p>
                } image={Empty.PRESENTED_IMAGE_DEFAULT}>
                    <Button type="primary" onClick={() => { setmodalconnecteditem(true) }}>Pilih Item</Button>
                </Empty>
            </div>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Hubungkan Item ke Ticket</h1>
                    <div className="flex">
                        <>
                            <Button type="default" onClick={() => { setmodalconnecteditem(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={disabledconnecteditem} loading={loadingconnecteditem}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalconnecteditem}
                onCancel={() => { setmodalconnecteditem(false) }}
                footer={null}
                width={720}
            >
                <div className="flex flex-col mb-5">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Asset Type <span className="assetitem"></span></p>
                        <TreeSelect treeDefaultExpandAll treeData={assetdata} onChange={(value, label, extra) => {
                            setselectedasset(extra.allCheckedNodes[0].node.props.id)
                        }}></TreeSelect>
                        <style jsx>
                            {`
                                .assetitem::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Item <span className="itemitem"></span></p>
                        <Select disabled={selectedasset === -10} showSearch optionFilterProp="children" placeholder="Cari Item" filterOption={(input, opt) => (
                            opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        )}>
                            {
                                itemdata.map((doc, idx) => {
                                    return (
                                        <Select.Option value={doc.id}>{doc.inventory_name}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                        <style jsx>
                            {`
                                .itemitem::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const Activity = ({ ticketid, initProps }) => {
    return (
        <>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Under Development"></Empty>
        </>
    )
}

const TicketDetail = ({ initProps, dataProfile, sidemenu, ticketid }) => {
    //1. Init
    const rt = useRouter()
    var activeTab = "overview"
    const { active } = rt.query
    if (active) {
        activeTab = active
    }
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(2, 2)
    pathArr[pathArr.length - 1] = "Detail Ticket"
    const { TabPane } = Tabs

    //useState
    const [maindata, setmaindata] = useState({
        ticket: {
            id: Number(ticketid),
            sub_id: 10,
            subject_id: 13,
            type: 1,
            status: 4,
            created_at: "2021-02-19T16:00:46.384Z",
            due_to: "2021-09-29T13:00:46.384Z",
            asign_to: 3,
            asign_to_name: "Bintang Agung Nusantara",
            requester_location: 1,
            requester: 1,
            requester_name: "Narendra Hanif",
            deleted_at: null,
            requester_location_name: "mitramas infosys global"
        },
        incident: {
            success: true,
            data: {
                incident: {
                    id: 1,
                    incident_place_id: 1,
                    product_type: 2,
                    product_id: 29012,
                    asset_id: 4,
                    inventory_id: 5,
                    description: "test123",
                    files: "\"no_file.jpg\"",
                    incident_time: "2021-01-13T13:00:46.384Z",
                    deleted_at: null,
                    incident_place_name: "mitramas infosys global"
                },
            }
        }
    })
    const [ticketrelations, setticketrelations] = useState({
        status_ticket: [
            {
                id: 0,
                name: ""
            }
        ],
        incident_type: [],
        requesters: [
            {
                user_id: 0,
                fullname: "",
                company_id: 0
            },
        ],
        requester_companies: [],
        companies: [
            {
                company_id: 0,
                company_name: "",
                parent_id: null
            },
        ],
    })
    const [manuf, setmanuf] = useState("")
    const [vendor, setvendor] = useState("")
    const [praloading, setpraloading] = useState(true)
    const [praloading2, setpraloading2] = useState(true)
    //notes
    const [notes, setnotes] = useState("")
    const [modalnotes, setmodalnotes] = useState(false)
    const [loadingnotes, setloadingnotes] = useState(false)
    //delete
    const [modaldelete, setmodaldelete] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)
    //status
    const [status, setstatus] = useState("")
    const [namestatus, setnamestatus] = useState("")
    const [notestatus, setnotestatus] = useState("")
    const [modalstatus, setmodalstatus] = useState(false)
    const [displaystatus, setdisplaystatus] = useState(true)
    const [loadingstatus, setloadingstatus] = useState(false)
    //asignto
    const [to, setto] = useState(-10)
    const [assignto, setassignto] = useState(null)
    const [nameassignto, setnameassignto] = useState("")
    const [modalassignto, setmodalassignto] = useState(false)
    const [disabledassignto, setdisabledassignto] = useState(true)

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getClientTicketRelation`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setticketrelations(res2.data)
                setpraloading(false)
            })
    }, [])

    return (
        <Layout st={st} sidemenu={sidemenu} tok={initProps} pathArr={pathArr} dataProfile={dataProfile}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between py-4 px-4 border-t border-b bg-white">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <p className=" text-gray-400 mb-0">Ticket Number:</p>
                                    <h1 className="font-semibold py-2 text-2xl mb-0 mr-20">#INC-{ticketid}</h1>
                                </div>
                                {
                                    praloading ?
                                        null
                                        :
                                        <>
                                            <div className="flex flex-col mr-7 p-2">
                                                <p className="mb-1">Ticket Type:</p>
                                                {
                                                    // displayusage ?
                                                    <Select placeholder="Masukkan Status Pemakaian" style={{ width: `10rem` }} bordered={true} defaultValue={1} onChange={(value) => {
                                                        // setdisabledusage(prev => {
                                                        //     if (value !== 1) {
                                                        //         return false
                                                        //     }
                                                        //     else {
                                                        //         return true
                                                        //     }
                                                        // })
                                                        // setchangeusage({
                                                        //     ...changeusage,
                                                        //     status_usage: value
                                                        // });
                                                        // setmodalusage(true)
                                                        // setdisplayusage(false)
                                                    }}>
                                                        {
                                                            ticketrelations.incident_type.map((doc, idx) => {
                                                                return (
                                                                    <Select.Option value={doc.id}><strong>{doc.name}</strong></Select.Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    // :
                                                    // null
                                                }
                                            </div>
                                            <div className="flex flex-col p-2 mr-7">
                                                <p className="mb-1">Status:</p>
                                                {
                                                    displaystatus ?
                                                        <Select placeholder="Masukkan Status" style={{ width: `10rem` }} bordered={true} defaultValue={1} onChange={(value, option) => {
                                                            setstatus(value)
                                                            setnamestatus(option.name)
                                                            setmodalstatus(true)
                                                            setdisplaystatus(false)
                                                            // setkondisi(value);
                                                            // setmodalkondisi(true)
                                                            // setdisplaykondisi(false)
                                                        }}>
                                                            {
                                                                ticketrelations.status_ticket.map((doc, idx) => {
                                                                    return (
                                                                        <Select.Option value={doc.id} name={doc.name}><strong>{doc.name}</strong></Select.Option>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                        :
                                                        null
                                                }
                                            </div>
                                            <div className="flex flex-col w-40 cursor-pointer" onClick={() => { setmodalassignto(true) }}>
                                                <p className="mb-1">Assign To:</p>
                                                {
                                                    <div className="py-1 px-3 border flex items-center justify-between">
                                                        <h1 className="font-semibold mb-0">{assignto === null ? 'None' : `${nameassignto}`}</h1>
                                                        <DownOutlined />
                                                    </div>
                                                }
                                            </div>
                                        </>
                                }
                            </div>
                            <div className="flex items-center">
                                <Button onClick={() => { setmodalnotes(true) }} size="large">Tambah Notes</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4 mb-8">
                    <div className=" hidden md:block">
                        <Tabs tabPosition={`left`} defaultActiveKey={activeTab}>
                            <TabPane tab="Overview" key={`overview`}>
                                <Overview ticketid={ticketid} initProps={initProps} praloading={praloading} maindata={maindata} />
                            </TabPane>
                            <TabPane tab={
                                <div className="flex items-center">
                                    <p className="mb-0 mr-2">Detail Item</p>
                                    <Tooltip placement="right" title="Ticket Incident belum terhubung dengan Item">
                                        <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                    </Tooltip>
                                </div>
                            } key="detailItem">
                                <DetailItem ticketid={ticketid} initProps={initProps}></DetailItem>
                            </TabPane>
                            <TabPane /*disabled={praloading2}*/ tab="Activity" key={`activity`}>
                                <Activity ticketid={ticketid} initProps={initProps} />
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className=" block md:hidden" >
                        <Tabs tabPosition={`top`} defaultActiveKey={activeTab}>
                            <TabPane tab="Overview" key={`overview`}>
                                <Overview ticketid={ticketid} initProps={initProps} praloading={praloading} maindata={maindata} />
                            </TabPane>
                            <TabPane tab={
                                <div className="flex items-center">
                                    <p className="mb-0 mr-2">Detail Item</p>
                                    <Tooltip placement="right" title="Ticket Incident belum terhubung dengan Item">
                                        <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                    </Tooltip>
                                </div>
                            } key="detailItem">
                                <DetailItem ticketid={ticketid} initProps={initProps}></DetailItem>
                            </TabPane>
                            <TabPane /*disabled={praloading2}*/ tab="Activity" key={`activity`}>
                                <Activity ticketid={ticketid} initProps={initProps} />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Form Tambah Notes ticket #INC-{maindata.ticket.id}</h1>
                    <div className="flex">
                        <>
                            <Button type="default" onClick={() => { setmodalnotes(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={notes === ""} loading={loadingnotes}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalnotes}
                onCancel={() => { setmodalnotes(false) }}
                footer={null}
                width={720}
            >
                <div className="flex flex-col mb-5">
                    <p className="mb-0">Notes</p>
                    <Input.TextArea rows={3} placeholder="Masukkan Notes" onChange={(e => {
                        setnotes(e.target.value)
                    })}></Input.TextArea>
                </div>
            </Modal>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Ubah Status Ticket Menjadi {namestatus}</h1>
                    <div className="flex">
                        <>
                            <Button type="default" onClick={() => { setmodalstatus(false); setdisplaystatus(true) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={status === ""} loading={loadingstatus}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalstatus}
                onCancel={() => { setmodalstatus(false); setdisplaystatus(true) }}
                footer={null}
                width={720}
            >
                <div className="flex flex-col mb-5">
                    <div className="flex mb-2">
                        <span className="judulField"></span>
                        <p className="mb-0">Notes</p>
                        <style jsx>
                            {`
                                .judulField::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <Input.TextArea rows={3} placeholder="Masukkan Notes" onChange={(e => {
                        setnotestatus(e.target.value)
                    })}></Input.TextArea>
                </div>
            </Modal>
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Assigned To</h1>
                    <div className="flex">
                        <>
                            <Button type="default" onClick={() => { setmodalassignto(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={disabledassignto}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalassignto}
                onCancel={() => { setmodalassignto(false) }}
                footer={null}
                width={720}
            >
                <div className="flex flex-col mb-5">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Assigned To <span className="assto"></span></p>
                        <Select onChange={(value) => { setto(value) }}>
                            <Select.Option value={1}>Engineer</Select.Option>
                            <Select.Option value={2}>Group</Select.Option>
                        </Select>
                        <style jsx>
                            {`
                                .assto::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Assigned To <span className="engineer"></span></p>
                        {
                            to === 1 &&
                            <Select disabled={to === -10} onChange={(value, option) => { setassignto(value); setdisabledassignto(false); setnameassignto(option.name) }}>
                                {
                                    ticketrelations.requesters.map((doc, idx) => {
                                        return (
                                            <Select.Option value={doc.user_id} name={doc.fullname}>{doc.fullname}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        }
                        {
                            to === 2 &&
                            <Select disabled={to === -10} onChange={(value, option) => { setassignto(value); setdisabledassignto(false); setnameassignto(option.name) }}>
                                {
                                    ticketrelations.requester_companies.map((doc, idx) => {
                                        return (
                                            <Select.Option value={doc.id} name={doc.name}>{doc.name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        }
                        <style jsx>
                            {`
                                .engineer::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                </div>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const ticketid = params.ticketId
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
            sidemenu: "21",
            ticketid
        },
    }
}

export default TicketDetail
