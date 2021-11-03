import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Table, Input } from 'antd'
import Layout from '../../../components/layout-dashboard2'
import moment from 'moment'
import st from '../../../components/layout-dashboard.module.css'


const TicketHistories = ({ initProps, dataProfile, sidemenu }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //useState
    //2.useState
    const [displaydata, setdisplaydata] = useState([])
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
    const [displayentiredata, setdisplayentiredata] = useState({
        current_page: 0,
        data: [],
        first_page_url: "",
        from: 0,
        last_page: 0,
        last_page_url: "",
        next_page_url: null,
        path: "",
        per_page: "",
        prev_page_url: "",
        to: 0,
        total: 0
    })
    const [namasearchact, setnamasearchact] = useState(false)
    const [namavalue, setnamavalue] = useState("")
    const [rowstate, setrowstate] = useState(0)
    const [praloading, setpraloading] = useState(true)
    const [dummies, setdummies] = useState([])

    //declaration
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
    const column = [
        {
            title: 'No Ticket',
            dataIndex: 'ticket_type',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.type.id === 1 && `#${record.type.code} - `}{record.ticketable.id}
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
                            {/* {ticketrelations.requesters.filter(docfil => docfil.user_id === record.raised_by)[0].fullname} */}
                            {record.requester.fullname}
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
                            {/* {ticketrelations.companies.filter(docfil => docfil.company_id === record.location_problem)[0].company_name} */}
                            {record.ticketable.location.company_name}
                        </>
                }
            }
        },
        {
            title: 'Date Raised',
            dataIndex: 'date_raised',
            render: (text, record, index) => {
                // var jumlahHari = Math.floor((new Date().getTime() - new Date(record.date_raised).getTime()) / (1000 * 3600 * 24))
                // var jumlahJam = ""
                // if (jumlahHari < 1) {
                //     jumlahJam = Math.floor((new Date().getTime() - new Date(record.date_raised).getTime()) / (1000 * 3600))
                // }
                return {
                    children:
                        <>
                            {/* {moment(record.date_raised).locale('id').format('L')} ({jumlahHari < 1 ? `${jumlahJam} jam` : `${jumlahHari} hari`} yang lalu) */}
                            {record.raised_at}
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
                            {/* {ticketrelations.requesters.filter(docfil => docfil.user_id === record.assign_to)[0].fullname} */}
                            {record.assignable.fullname}
                        </>
                }
            }
        },
    ]

    //handler
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
    const onFinalClick = () => {
        // var datatemp = displaydata1
        // if (namasearchact) {
        //     datatemp = datatemp.filter(flt => {
        //         return flt.id === namavalue
        //     })
        // }
        // setdisplaydata(datatemp)
        setpraloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getClosedTickets?ticket_id=${namasearchact ? namavalue : ""}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                res2.data.tickets.data.length === 0 ? setdisplaydata([]) : setdisplaydata(res2.data.tickets.data)
                setpraloading(false)
            })
    }

    //5.useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getClosedTickets`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplayentiredata(res2.data.tickets)
                setdisplaydata(res2.data.tickets.data)
                setdisplaydata1(res2.data.tickets.data)
                setdisplaydata2(res2.data.tickets.data)
                setpraloading(false)
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
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className=" w-full grid grid-cols-1 md:grid-cols-4 border-gray-400 bg-white mb-5 px-4 py-5">
                <div className=" col-span-1 md:col-span-3 flex items-center mb-2 md:mb-0">
                    <div className="font-bold text-2xl w-auto mr-14">History Tickets Closed</div>
                </div>
                <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                    <Link href={'/tickets/histories'}>
                        <Button size="large" type="primary" style={{ marginRight: `1rem` }}>
                            Export
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
                            <div className=" col-span-1">
                                <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-10">
                        <Table
                            pagination={{
                                pageSize: 10, total: displayentiredata.total, onChange: (page, pageSize) => {
                                    setpraloading(true)
                                    fetch(`https://boiling-thicket-46501.herokuapp.com/getClosedTickets?page=${page}&rows=10`, {
                                        method: `GET`,
                                        headers: {
                                            'Authorization': JSON.parse(initProps),
                                        },
                                    })
                                        .then(res => res.json())
                                        .then(res2 => {
                                            setdisplayentiredata(res2.data.tickets)
                                            setdisplaydata(res2.data.tickets.data)
                                            setdisplaydata1(res2.data.tickets.data)
                                            setdisplaydata2(res2.data.tickets.data)
                                            setpraloading(false)
                                        })
                                }
                            }} 
                            scroll={{ x: 200 }} dataSource={displaydata} columns={column} loading={praloading}
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
            sidemenu: "21"
        },
    }
}

export default TicketHistories
