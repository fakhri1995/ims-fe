import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, TreeSelect, Table, Input, Select, Tooltip, DatePicker } from 'antd'
import Layout from '../../components/layout-dashboard2'
import moment from 'moment'
import st from '../../components/layout-dashboard.module.css'

const TicketsIndex = ({ dataProfile, sidemenu, initProps }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //2.useState
    const [displaydata, setdisplaydata] = useState({
        total_tickets: 0,
        open_tickets_count: 0,
        on_progress_tickets_count: 0,
        pending_tickets_count: 0,
        resolved_tickets_count: 0,
        tickets: []
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
    const [displaydata1, setdisplaydata1] = useState([])
    const [displaydata2, setdisplaydata2] = useState([])
    const [namasearchact, setnamasearchact] = useState(false)
    const [namavalue, setnamavalue] = useState("")
    const [lokasifilteract, setlokasifilteract] = useState(false)
    const [lokasivalue, setlokasivalue] = useState("")
    const [rangedatefilteract, setrangedatefilteract] = useState(false)
    const [rangedatevalue, setrangedatevalue] = useState("")
    const [statusfilteract, setstatusfilteract] = useState(false)
    const [statusvalue, setstatusvalue] = useState("")
    const [namaasset, setnamaasset] = useState("")
    const [rowstate, setrowstate] = useState(0)
    const [praloading, setpraloading] = useState(true)
    const [dummies, setdummies] = useState([])

    //declaration
    const datatableDummies = [
        {
            id: 100,
            ticket_type: 1,
            raised_by: 1,
            location_problem: 1,
            date_raised: "2021-10-19T08:00:46.384Z",
            assign_to: 2,
            status: 1
        },
        {
            id: 200,
            ticket_type: 1,
            raised_by: 1,
            location_problem: 1,
            date_raised: "2021-02-19T16:00:46.384Z",
            assign_to: 3,
            status: 2
        },
        {
            id: 300,
            ticket_type: 1,
            raised_by: 1,
            location_problem: 1,
            date_raised: "2019-11-19T23:00:50.384Z",
            assign_to: 4,
            status: 3
        }
    ]
    const columnDummies = [
        {
            title: 'No Ticket',
            dataIndex: 'num',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.ticket_type === 1 && "#INC - "}{record.id}
                        </>
                }
            }
        },
        {
            title: 'Raised By',
            dataIndex: 'raised_by',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {ticketrelations.requesters.filter(docfil => docfil.user_id === record.raised_by)[0].fullname}
                        </>
                }
            }
        },
        {
            title: 'Lokasi Problem',
            dataIndex: 'location_problem',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {ticketrelations.companies.filter(docfil => docfil.company_id === record.location_problem)[0].company_name}
                        </>
                }
            }
        },
        {
            title: 'Date Raised',
            dataIndex: 'date_raised',
            render: (text, record, index) => {
                // var hariTerakhir = new Date(new Date(record.tanggal).getTime() + (props.durasi * 24 * 60 * 60 * 1000));
                var jumlahHari = Math.floor((new Date().getTime() - new Date(record.date_raised).getTime()) / (1000 * 3600 * 24))
                var jumlahJam = ""
                if (jumlahHari < 1) {
                    jumlahJam = Math.floor((new Date().getTime() - new Date(record.date_raised).getTime()) / (1000 * 3600))
                }
                return {
                    children:
                        <>
                            {moment(record.date_raised).locale('id').format('L')} ({jumlahHari < 1 ? `${jumlahJam} jam` : `${jumlahHari} hari`} yang lalu)
                        </>
                }
            }
        },
        {
            title: 'Assign To',
            dataIndex: 'assign_to',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {ticketrelations.requesters.filter(docfil => docfil.user_id === record.assign_to)[0].fullname}
                        </>
                }
            }
        },
        {
            title: 'Status',
            dataIndex: 'assign_to',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {ticketrelations.status_ticket.filter(docfil => docfil.id === record.status)[0].name}
                        </>
                }
            }
        },
    ]

    //3.onChange
    //search nama
    const onChangeSearch = (e) => {
        if (e.target.value === "") {
            setdisplaydata(displaydata2)
            setnamasearchact(false)
        }
        else {
            setnamasearchact(true)
            setnamavalue(e.target.value)
        }
    }
    //search lokasi
    const onChangeLokasi = (idlokasi) => {
        if (typeof (idlokasi) === 'undefined') {
            setdisplaydata(displaydata2)
            setlokasifilteract(false)
        }
        else {
            setlokasifilteract(true)
            setlokasivalue(idlokasi)
        }
    }
    //search range date
    const onChangeRangeDate = (datestrings) => {
        if (typeof (datestrings) === 'undefined') {
            setdisplaydata(displaydata2)
            setrangedatefilteract(false)
        }
        else {
            setrangedatefilteract(true)
            setrangedatevalue(datestrings)
        }
    }
    //search status
    const onChangeStatus = (idstatus) => {
        if (typeof (idstatus) === 'undefined') {
            setdisplaydata(displaydata2)
            setstatusfilteract(false)
        }
        else {
            setstatusfilteract(true)
            setstatusvalue(idstatus)
        }
    }
    const onFinalClick = () => {
        var datatemp = displaydata1
        if (rangedatefilteract) {
            datatemp = datatemp.filter(flt => {
                return flt.asset_name.toLowerCase() === rangedatevalue.toLowerCase()
                // return (flt.asset_name.toLowerCase().includes(assettypevalue.toLowerCase())) || (flt.asset_name.replaceAll(/\s+\/\s+/g, "/").split("/")[0] === namaasset)
            })
        }
        if (lokasifilteract) {
            datatemp = datatemp.filter(flt => flt.model_id === lokasivalue)
        }
        if (statusfilteract) {
            datatemp = datatemp.filter(flt => flt.status_condition === statusvalue)
        }
        if (namasearchact) {
            datatemp = datatemp.filter(flt => {
                return flt.inventory_name.toLowerCase().includes(namavalue.toLowerCase())
            })
        }
        setdisplaydata(datatemp)
    }

    //5.useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getClientTickets`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplaydata(res2.data)
                setdisplaydata1(res2.data)
                setdisplaydata2(res2.data)
                setpraloading(false)
            })
    }, [])
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
                setdummies(datatableDummies)
            })
    }, [])

    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className=" w-full grid grid-cols-1 md:grid-cols-4 border-gray-400 md:border-t md:border-b bg-white mb-5 px-4 py-5">
                <div className=" col-span-1 md:col-span-3 flex items-center mb-2 md:mb-0">
                    <div className="font-bold text-2xl w-auto mr-14">Tickets</div>
                    <div className="flex flex-col mr-10">
                        <div className="flex items-center mb-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                            <p className="mb-0">Open</p>
                        </div>
                        <div className=" text-lg text-center">{displaydata.open_tickets_count}</div>
                    </div>
                    <div className="flex flex-col mr-10">
                        <div className="flex items-center mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                            <p className="mb-0">On Progress</p>
                        </div>
                        <div className=" text-lg text-center">{displaydata.on_progress_tickets_count}</div>
                    </div>
                    <div className="flex flex-col mr-10">
                        <div className="flex items-center mb-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                            <p className="mb-0">Cancel</p>
                        </div>
                        <div className=" text-lg text-center">{displaydata.pending_tickets_count}</div>
                    </div>
                    <div className="flex flex-col mr-12">
                        <div className="flex items-center mb-2">
                            <div className="w-2 h-2 rounded-full bg-gray-500 mr-1"></div>
                            <p className="mb-0">Closed</p>
                        </div>
                        <div className=" text-lg text-center">{displaydata.total_tickets}</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                            <p className="mb-0 font-bold text-lg">Total Tiket</p>
                        </div>
                        <div className=" font-bold text-xl text-center">{displaydata.resolved_tickets_count}</div>
                    </div>
                </div>
                <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                    <Link href={'/tickets/histories'}>
                        <Button size="large" type="primary" style={{ marginRight: `1rem` }}>
                            History
                        </Button>
                    </Link>
                    <Link href={'/tickets/exporting'}>
                        <Button style={{ backgroundColor: `gray`, borderColor: `gray`, marginRight: `1rem` }} size="large" type="primary">
                            Export
                        </Button>
                    </Link>
                    <Link href={'/tickets/create'}>
                        <Button size="large" type="primary">
                            Buat Tiket
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
                <div className="md:col-span-5 col-span-1 flex flex-col py-3">
                    <div className="flex mb-8">
                        <div className=" w-full mr-1 grid grid-cols-12">
                            <div className="col-span-4 mr-1">
                                <Input style={{ width: `100%`, marginRight: `0.5rem` }} placeholder="Cari Ticket Number" onChange={onChangeSearch} allowClear></Input>
                            </div>
                            <div className="col-span-3 mr-1">
                                <Select placeholder="Lokasi Problem" style={{ width: `100%` }} allowClear onChange={(value) => {
                                    if (typeof (value) === 'undefined') {
                                        onChangeLokasi()
                                    }
                                    else {
                                        onChangeLokasi(value)
                                    }
                                }}>
                                    {
                                        ticketrelations.companies.map((docmodels, idxmodels) => {
                                            return (
                                                <Select.Option value={docmodels.company_id}>{docmodels.company_name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="col-span-3 mr-1">
                                <DatePicker.RangePicker placeholder={["Tanggal Awal", "Tanggal Akhir"]} onChange={(date, datestrings) => {
                                    if (datestrings === '') {
                                        onChangeRangeDate()
                                    }
                                    else {
                                        onChangeRangeDate(datestrings)
                                    }
                                }}>

                                </DatePicker.RangePicker>
                            </div>
                            <div className="col-span-1 mr-1">
                                <Select placeholder="Status" style={{ width: `100%` }} allowClear onChange={(value) => {
                                    if (typeof (value) === 'undefined') {
                                        onChangeStatus()
                                    }
                                    else {
                                        onChangeStatus(value)
                                    }
                                }}>
                                    {
                                        ticketrelations.status_ticket.map((docconds, idxconds) => {
                                            return (
                                                <Select.Option value={docconds.id}>{docconds.name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className=" col-span-1">
                                <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-10">
                        <Table pagination={{ pageSize: 9 }} scroll={{ x: 200 }} dataSource={dummies} columns={columnDummies} loading={praloading}
                            onRow={(record, rowIndex) => {
                                return {
                                    onMouseOver: (event) => {
                                        setrowstate(record.id)
                                    },
                                    onClick: (event) => {
                                        // {
                                        //     [107, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                        rt.push(`/tickets/detail/${record.id}`)
                                        //         :
                                        //         null
                                        // }
                                    }
                                }
                            }}
                            rowClassName={(record, idx) => {
                                return (
                                    record.id === rowstate ? `cursor-pointer` : ``
                                )
                            }}
                        ></Table>
                    </div>
                </div>
            </div>
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
            sidemenu: "3"
        },
    }
}

export default TicketsIndex
