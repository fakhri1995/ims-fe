import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons'
import { notification, Button, Spin, Empty, Modal, Tooltip, Select, Tabs, Input, TreeSelect, Alert } from 'antd'
import Layout from '../../../components/layout-dashboard2'
import moment from 'moment'
import st from '../../../components/layout-dashboard.module.css'
import Sticky from 'wil-react-sticky'

const Overview = ({ ticketid, initProps, praloading, maindata, ticketrelations }) => {
    //init
    const rt = useRouter()
    var selisihWaktu = ""
    maindata.ticket.closed_at ? (Math.floor((new Date(maindata.ticket.closed_at).getTime() - new Date(maindata.ticket.original_raised_at).getTime()) / (1000 * 3600 * 24)) > 1 ? selisihWaktu = Math.floor((new Date(maindata.ticket.closed_at).getTime() - new Date(maindata.ticket.original_raised_at).getTime()) / (1000 * 3600 * 24)) + " hari" : selisihWaktu = Math.floor((new Date(maindata.ticket.closed_at).getTime() - new Date(maindata.ticket.original_raised_at).getTime()) / (1000 * 3600)) + " jam") : null

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
                            <Button type="default" onClick={(e) => { rt.push(`/tickets/update/${ticketid}`) }} style={{ marginRight: `1rem` }} size="large">Edit</Button>
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
                                {/* <p className="mb-0 text-sm">{ticketrelations.requesters.filter(docfil => docfil.user_id === maindata.ticket.requester_id)[0] ? ticketrelations.requesters.filter(docfil => docfil.user_id === maindata.ticket.requester_id)[0].fullname : ""}</p> */}
                                <p className="mb-0 text-sm">{maindata.ticket.requester.fullname}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Lokasi Pembuat:</h1>
                                <p className="mb-0 text-sm">Belum ada</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Date Raised Ticket:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.original_raised_at ? moment(maindata.ticket.original_raised_at).locale('id').format("LL") : "-"}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Date Closed Ticket:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.closed_at === null ? "-" : moment(maindata.ticket.closed_at).locale('id').format("LL")}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Resolved Time:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.closed_at === null ? "-" : `${selisihWaktu}`}</p>
                            </div>
                        </div>
                        <div className="border shadow-md rounded-md flex flex-col p-5">
                            <h1 className=" text-lg font-semibold">Problem Detail:</h1>
                            <hr />
                            <div className="flex flex-col mt-3 mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Jenis Produk:</h1>
                                <p className="mb-0 text-sm">
                                    {maindata.ticket.ticketable.product_type === 1 && "UPS"}
                                    {maindata.ticket.ticketable.product_type === 2 && "ATM"}
                                    {maindata.ticket.ticketable.product_type === 3 && "PC"}
                                </p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">{maindata.ticket.ticketable.product_type === 2 ? "Terminal ID" : "ID Produk"}:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.ticketable.product_id === "" ? "-" : maindata.ticket.ticketable.product_id}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Nama PIC:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.ticketable.pic_name === "" ? "-" : maindata.ticket.ticketable.pic_name}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Kontak PIC:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.ticketable.pic_contact === "" ? "-" : maindata.ticket.ticketable.pic_contact}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Problem:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.ticketable.problem === "" ? "-" : maindata.ticket.ticketable.problem}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Lokasi Problem:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.ticketable.location.company_name === "" ? "-" : maindata.ticket.ticketable.location.company_name}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Waktu Kejadian:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.ticketable.incident_time ? moment(maindata.ticket.ticketable.incident_time).locale('id').format("L") + moment(maindata.ticket.ticketable.incident_time).locale('id').format("LT") : "-"}</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-2">Bukti Kejadian:</h1>
                                {
                                    maindata.ticket.ticketable.files.map((doc, idx) => {
                                        return (
                                            <div className="border px-8 py-4 flex justify-between items-center w-9/12 mb-1 relative cursor-pointer hover:text-blue-500">
                                                <div className="mr-5 flex items-center">
                                                    <img src={doc} alt="selected images" className="object-contain w-16 h-16 mr-10" />
                                                    {/* <p className="mb-0 mr-3">{maindata.incident.data.incident.files}</p> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex flex-col mb-5">
                                <h1 className=" text-sm font-semibold mb-0">Deskripsi Kerusakan:</h1>
                                <p className="mb-0 text-sm">{maindata.ticket.ticketable.description === "" ? "-" : maindata.ticket.ticketable.description}</p>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

const DetailItem = ({ ticketid, initProps, connecteditem, setconnecteditem, maindata }) => {
    //init
    const rt = useRouter()

    //useState
    const [praloadingconnected, setpraloadingconnected] = useState(true)
    const [connecteditemdata, setconnecteditemdata] = useState({
        id: null,
        model_id: null,
        vendor_id: null,
        inventory_name: "",
        status_condition: null,
        status_usage: null,
        location: null,
        is_exist: null,
        deskripsi: null,
        manufacturer_id: null,
        mig_id: "",
        serial_number: null,
        created_at: "",
        updated_at: "",
        deleted_at: null,
        model_inventory: {
            id: null,
            name: "",
            asset_id: null,
            deleted_at: null,
            asset: {
                id: null,
                name: "",
                deleted_at: null
            }
        },
        location_inventory: {
            company_id: null,
            company_name: ""
        },
        additional_attributes: [
            {
                id: null,
                name: "",
                value: ""
            },
            {
                id: null,
                name: "",
                value: ""
            }
        ],
        inventory_parts: []
    })
    const [itemactivity, setitemactivity] = useState(true)
    const [modalconnecteditem, setmodalconnecteditem] = useState(false)
    const [loadingconnecteditem, setloadingconnecteditem] = useState(false)
    const [disabledconnecteditem, setdisabledconnecteditem] = useState(true)
    //1.asset
    const [assetdata, setassetdata] = useState([])
    const [selectedasset, setselectedasset] = useState(null)
    const [selectedassetcode, setselectedassetcode] = useState("")
    //2. Item
    const [itemdata, setitemdata] = useState([])
    const [selecteditem, setselecteditem] = useState(null)

    //handler
    const handleSetItem = () => {
        setloadingconnecteditem(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/setItemTicket`, {
            method: `PUT`,
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(ticketid),
                inventory_id: selecteditem
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingconnecteditem(false)
                setmodalconnecteditem(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    window.location.href = `/tickets/detail/${ticketid}`
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

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
        if (selectedasset !== null) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getInventories?asset_id=${selectedasset === null ? "" : selectedasset}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                },
            })
                .then(res => res.json())
                .then(res2 => {
                    // const datafilter = res2.data.filter(docfil => docfil.asset_id === selectedasset)
                    // setitemdata(datafilter.length === 0 ? res2.data : datafilter)
                    setitemdata(res2.data.data)
                }, [])
        }
    }, [selectedasset])
    useEffect(() => {
        if (connecteditem !== null) {
            setpraloadingconnected(true)
            fetch(`https://boiling-thicket-46501.herokuapp.com/getInventory?id=${connecteditem}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                },
            })
                .then(res => res.json())
                .then(res2 => {
                    setconnecteditemdata(res2.data)
                    setpraloadingconnected(false)
                    setitemactivity(false)
                }, [])
        }
        else {
            setconnecteditemdata(null)
        }
    }, [])

    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between px-5 pb-5 pt-3 mb-8">
                <h1 className="font-bold text-xl my-auto">Detail Item</h1>
                {
                    // praloading ?
                    //     null
                    //     :
                    <div className="flex">
                        <Button type="primary" disabled={itemactivity} onClick={(e) => { rt.push(`/items/detail/${connecteditemdata.id}?active=activity`) }} size="large">Activity Item</Button>
                        {/* <Button type="primary" className="buttonExport" onClick={(e) => { setmodalexporting(true) }} size="large">Export</Button> */}
                    </div>
                }
            </div>
            {
                maindata.ticket.status.id === 5 &&
                <div className=" mb-5 w-10/12">
                    <Alert
                        style={{padding:`0.5rem`}}
                        message=""
                        description={
                            <p className="mb-0">Berikut ini tampilan detail item yang di  <strong>closed</strong> pada <strong>{maindata.ticket.closed_at === null ? "" : moment(maindata.ticket.closed_at).locale('id').format("LL")}</strong> </p>
                        }
                        type="info"
                        showIcon
                    />
                </div>
            }
            {
                praloadingconnected ?
                    <>
                        <Spin />
                    </>
                    :
                    connecteditemdata === null ?
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
                        :
                        <div className="mb-8 w-10/12 flex flex-col">
                            <div className="border shadow-md rounded-md flex flex-col p-5 mb-3">
                                <div className="flex justify-between">
                                    <div className="flex flex-col mt-3 mb-5">
                                        <h1 className=" text-sm font-semibold mb-0">Item:</h1>
                                        <p className="mb-0 text-sm">{connecteditemdata.inventory_name ?? ""}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Button onClick={() => { setmodalconnecteditem(true) }}>Ganti Item</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="border shadow-md rounded-md flex flex-col p-5 mb-5">
                                <div className="flex flex-col mt-3 mb-5">
                                    <h1 className=" text-sm font-semibold mb-0">Model:</h1>
                                    <p className="mb-0 text-sm">{connecteditemdata.model_name ?? "-"}</p>
                                </div>
                                <div className="flex flex-col mt-3 mb-5">
                                    <h1 className=" text-sm font-semibold mb-0">Asset Type:</h1>
                                    <p className="mb-0 text-sm">{connecteditemdata.asset_name ?? "-"}</p>
                                </div>
                                <div className="flex flex-col mt-3 mb-5">
                                    <h1 className=" text-sm font-semibold mb-0">MIG ID:</h1>
                                    <p className="mb-0 text-sm">{connecteditemdata.mig_id ?? "-"}</p>
                                </div>
                                <div className="flex flex-col mt-3 mb-5">
                                    <h1 className=" text-sm font-semibold mb-2">Status Pemakaian:</h1>
                                    {
                                        connecteditemdata.status_usage ?
                                            <>
                                                {connecteditemdata.status_usage === 1 && <div className="rounded-md w-40 h-auto px-1 text-center py-1 bg-blue-100 border border-blue-200 text-blue-600">In Used</div>}
                                                {connecteditemdata.status_usage === 2 && <div className="rounded-md w-40 h-auto px-1 text-center py-1 bg-green-100 border border-green-200 text-green-600">In Stock</div>}
                                                {connecteditemdata.status_usage === 3 && <div className="rounded-md w-40 h-auto px-1 text-center py-1 bg-red-100 border border-red-200 text-red-600">Replacement</div>}
                                            </>
                                            :
                                            "-"
                                    }
                                </div>
                                <div className="flex flex-col mt-3 mb-5">
                                    <h1 className=" text-sm font-semibold mb-2">Status Kondisi:</h1>
                                    {
                                        connecteditemdata.status_condition ?
                                            <>
                                                {
                                                    connecteditemdata.status_condition === 1 &&
                                                    <div className="p-1 flex w-full items-center">
                                                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                                        <p className="mb-0 font-semibold">Good</p>
                                                    </div>
                                                }
                                                {
                                                    connecteditemdata.status_condition === 2 &&
                                                    <div className="p-1 flex w-full items-center">
                                                        <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                                                        <p className="mb-0 font-semibold">Grey</p>
                                                    </div>
                                                }
                                                {
                                                    connecteditemdata.status_condition === 3 &&
                                                    <div className="p-1 flex w-full items-center">
                                                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                                        <p className="mb-0 font-semibold">Bad</p>
                                                    </div>
                                                }
                                            </>
                                            :
                                            "-"
                                    }
                                </div>
                                <div className="flex flex-col mt-3 mb-5">
                                    <h1 className=" text-sm font-semibold mb-0">Serial Number:</h1>
                                    <p className="mb-0 text-sm">{connecteditemdata.serial_number ?? "-"}</p>
                                </div>
                                <div className="flex flex-col mt-3 mb-5">
                                    <h1 className=" text-sm font-semibold mb-0">Location:</h1>
                                    <p className="mb-0 text-sm">{connecteditemdata.location_name ?? "-"}</p>
                                </div>
                                <div className="flex flex-col mt-3 mb-5">
                                    <h1 className=" text-sm font-semibold mb-0">Deskripsi:</h1>
                                    <p className="mb-0 text-sm">{connecteditemdata.deskripsi ?? "-"}</p>
                                </div>
                            </div>
                        </div>
            }
            <Modal title={
                <div className="flex justify-between p-5 mt-5">
                    <h1 className="font-bold text-xl">Hubungkan Item ke Ticket</h1>
                    <div className="flex">
                        <>
                            <Button type="default" onClick={() => { setmodalconnecteditem(false); setselectedassetcode(""); setselectedasset(null); setselecteditem(null) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' loading={loadingconnecteditem} disabled={disabledconnecteditem} loading={loadingconnecteditem} onClick={handleSetItem}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalconnecteditem}
                onCancel={() => { setmodalconnecteditem(false); setselectedassetcode(""); setselectedasset(null); setselecteditem(null) }}
                footer={null}
                width={720}
            >
                <div className="flex flex-col mb-5">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Asset Type <span className="assetitem"></span></p>
                        <TreeSelect treeDefaultExpandAll value={selectedassetcode} treeData={assetdata} onChange={(value, label, extra) => {
                            setselectedasset(extra.allCheckedNodes[0].node.props.id)
                            setselectedassetcode(value)
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
                        <Select disabled={selectedasset === null} value={selecteditem} showSearch optionFilterProp="children" placeholder="Cari Item" filterOption={(input, opt) => (
                            opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        )} onChange={(value) => { setselecteditem(value); setdisabledconnecteditem(false) }}>
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
            raised_at: "",
            closed_at: "",
            original_closed_at: "",
            resolve_time: "",
            type: {
                id: null,
                name: "",
                code: ""
            },
            status: {
                id: null,
                name: ""
            },
            requester: {
                user_id: null,
                fullname: ""
            },
            ticketable: {
                id: null,
                product_type: null,
                product_id: "",
                pic_name: "",
                pic_contact: "",
                location_id: null,
                inventory_id: null,
                location: {
                    company_id: null,
                    company_name: ""
                },
                problem: "",
                incident_time: "",
                files: [
                    ""
                ],
                description: "",
                deleted_at: null
            },
            assignable: {
                id: null,
                name: ""
            }
        },
    })
    const [ticketrelations, setticketrelations] = useState({
        status_ticket: [
            {
                id: 0,
                name: ""
            }
        ],
        ticket_types: [
            {
                id: '',
                name: ''
            }
        ],
        requesters: [
            {
                user_id: 0,
                fullname: "",
                company_id: 0
            },
        ],
        companies: {
            data: [
                {
                    id: 0,
                    title: '',
                    key: '',
                    value: 0
                }
            ]
        },
    })
    const [praloading, setpraloading] = useState(true)
    //notes
    const [notes, setnotes] = useState("")
    const [modalnotes, setmodalnotes] = useState(false)
    const [loadingnotes, setloadingnotes] = useState(false)
    //status
    const [status, setstatus] = useState("")
    const [namestatus, setnamestatus] = useState("")
    const [notestatus, setnotestatus] = useState("")
    const [modalstatus, setmodalstatus] = useState(false)
    const [displaystatus, setdisplaystatus] = useState(true)
    const [loadingstatus, setloadingstatus] = useState(false)
    //asignto
    const [to, setto] = useState(null)
    const [assignto, setassignto] = useState(null)
    const [nameassignto, setnameassignto] = useState("")
    const [defaultnameassignto, setdefaultnameassignto] = useState("")
    const [modalassignto, setmodalassignto] = useState(false)
    const [loadingassignto, setloadingassignto] = useState(false)
    const [disabledassignto, setdisabledassignto] = useState(true)
    const [displayassignto, setdisplayassignto] = useState(true)
    //connected item
    const [connecteditem, setconnecteditem] = useState(null)

    //handler
    const handleSetStatus = () => {
        setloadingstatus(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/changeStatusTicket`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(ticketid),
                notes: notestatus,
                status_id: status
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingstatus(false)
                setmodalstatus(false)
                if (res2.success) {
                    notification['success']({
                        message: "Status berhasil diubah",
                        duration: 2
                    })
                    window.location.href = `/tickets/detail/${ticketid}`
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleNotes = () => {
        setloadingnotes(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addInventoryNotes`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(ticketid),
                notes: notes
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingnotes(false)
                if (res2.success) {
                    notification['success']({
                        message: "Notes berhasil ditambahkan",
                        duration: 3
                    })
                    setmodalnotes(false)
                    window.location.href = `/items/detail/${itemid}?active=activity`
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleAssignTo = () => {
        setloadingassignto(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/assignTicket`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(ticketid),
                assignable_type: to,
                assignable_id: assignto
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingassignto(false)
                setmodalassignto(false)
                if (res2.success) {
                    notification['success']({
                        message: "Assign To berhasil diubah",
                        duration: 3
                    })
                    window.location.href = `/tickets/detail/${ticketid}`
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }


    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getTicket?id=${ticketid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setmaindata(res2.data)
                setstatus(res2.data.ticket.status.id)
                res2.data.ticket.assignable.user_id ? (setassignto(res2.data.ticket.assignable.user_id), setnameassignto(res2.data.ticket.assignable.fullname), setdefaultnameassignto(res2.data.ticket.assignable.fullname)) : setassignto(null)
                res2.data.ticket.ticketable.inventory_id === null ? setconnecteditem(null) : setconnecteditem(res2.data.ticket.ticketable.inventory_id)
            })
            .then(() => {
                fetch(`https://boiling-thicket-46501.herokuapp.com/getTicketRelation`, {
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
                                                    <Select defaultValue={maindata.ticket.type.id} placeholder="Masukkan Tipe Ticket" style={{ width: `10rem` }} bordered={true} defaultValue={1} onChange={(value) => {
                                                    }}>
                                                        {
                                                            ticketrelations.ticket_types.map((doc, idx) => {
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
                                                        <Select defaultValue={maindata.ticket.status.id} value={status} placeholder="Masukkan Status" style={{ width: `10rem` }} bordered={true} defaultValue={1} onChange={(value, option) => {
                                                            setstatus(value)
                                                            setnamestatus(option.name)
                                                            setmodalstatus(true)
                                                            setdisplaystatus(false)
                                                        }}>
                                                            {
                                                                ticketrelations.status_ticket.map((doc, idx) => {
                                                                    return (
                                                                        <Select.Option key={idx} value={doc.id} name={doc.name}><strong>{doc.name}</strong></Select.Option>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                        :
                                                        null
                                                }
                                            </div>
                                            <div className="flex flex-col cursor-pointer" onClick={() => { setmodalassignto(true); setdisplayassignto(false) }}>
                                                <p className="mb-1">Assign To:</p>
                                                {
                                                    displayassignto ?
                                                        <div className="py-1 px-3 border flex items-center justify-between">
                                                            <h1 className="font-semibold mb-0 mr-5">{assignto === null ? 'None' : `${nameassignto}`}</h1>
                                                            <DownOutlined />
                                                        </div>
                                                        :
                                                        null
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
                                <Overview ticketid={ticketid} initProps={initProps} praloading={praloading} maindata={maindata} ticketrelations={ticketrelations} />
                            </TabPane>
                            <TabPane tab={
                                <div className="flex items-center">
                                    <p className="mb-0 mr-2">Detail Item</p>
                                    {
                                        connecteditem === null ?
                                            <Tooltip placement="right" title="Ticket Incident belum terhubung dengan Item">
                                                <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                            </Tooltip>
                                            :
                                            null
                                    }
                                </div>
                            } key="detailItem">
                                <DetailItem ticketid={ticketid} initProps={initProps} connecteditem={connecteditem} setconnecteditem={setconnecteditem} maindata={maindata}></DetailItem>
                            </TabPane>
                            <TabPane /*disabled={praloading2}*/ tab="Activity" key={`activity`}>
                                <Activity ticketid={ticketid} initProps={initProps} />
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className=" block md:hidden" >
                        <Tabs tabPosition={`top`} defaultActiveKey={activeTab}>
                            <TabPane tab="Overview" key={`overview`}>
                                <Overview ticketid={ticketid} initProps={initProps} praloading={praloading} maindata={maindata} ticketrelations={ticketrelations} />
                            </TabPane>
                            <TabPane tab={
                                <div className="flex items-center">
                                    <p className="mb-0 mr-2">Detail Item</p>
                                    {
                                        connecteditem === null ?
                                            <Tooltip placement="right" title="Ticket Incident belum terhubung dengan Item">
                                                <ExclamationCircleOutlined style={{ color: `brown` }}></ExclamationCircleOutlined>
                                            </Tooltip>
                                            :
                                            null
                                    }
                                </div>
                            } key="detailItem">
                                <DetailItem ticketid={ticketid} initProps={initProps} connecteditem={connecteditem} setconnecteditem={setconnecteditem} maindata={maindata}></DetailItem>
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
                            <Button type='primary' disabled={status === ""} loading={loadingstatus} onClick={handleSetStatus}>Simpan</Button>
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
                            <Button type="default" onClick={() => { setmodalassignto(false); setdisplayassignto(true); setnameassignto(defaultnameassignto) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type='primary' disabled={disabledassignto} onClick={handleAssignTo} loading={loadingassignto}>Simpan</Button>
                        </>
                    </div>
                </div>
            }
                visible={modalassignto}
                onCancel={() => { setmodalassignto(false); setdisplayassignto(true); setnameassignto(defaultnameassignto) }}
                footer={null}
                width={720}
            >
                <div className="flex flex-col mb-5">
                    <div className="flex flex-col mb-3">
                        <p className="mb-0">Assigned To <span className="assto"></span></p>
                        <Select onChange={(value) => { setto(value) }}>
                            <Select.Option value={true}>Engineer</Select.Option>
                            <Select.Option value={false}>Group</Select.Option>
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
                            to === true &&
                            <Select disabled={to === null} onChange={(value, option) => { setassignto(value); setdisabledassignto(false); setnameassignto(option.name) }}>
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
                            to === false &&
                            <Select disabled={to === null} onChange={(value, option) => { setassignto(value); setdisabledassignto(false); setnameassignto(option.name) }}>
                                {
                                    ticketrelations.requesters.map((doc, idx) => {
                                        return (
                                            <Select.Option value={doc.user_id} name={doc.fullname}>{doc.fullname}</Select.Option>
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
