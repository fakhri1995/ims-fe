import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Spin, Empty, Select, TreeSelect, DatePicker, Input } from 'antd'
import Layout from '../../components/layout-dashboardNew'
import moment from 'moment'
import st from '../../components/layout-dashboard.module.css'
import { AdjusmentsHorizontalIconSvg, AlerttriangleIconSvg, HistoryIconSvg, MappinIconSvg, SearchIconSvg, TableExportIconSvg, TicketIconSvg, UserIconSvg } from '../../components/icon'
import { Chart, ArcElement, Tooltip, CategoryScale, LinearScale, LineElement, BarElement, PointElement } from 'chart.js'
Chart.register(ArcElement, Tooltip, CategoryScale, LinearScale, LineElement, BarElement, PointElement);
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { H1, H2, Text, Label } from '../../components/typography'
import ButtonSys from '../../components/button'
import { TableCustomTickets } from '../../components/table/tableCustom'
import DrawerTicketCreate from '../../components/drawer/tickets/drawerTicketCreate'
import DrawerTicketExports from '../../components/drawer/tickets/drawerTicketExports'


const TicketIndex2 = ({ dataProfile, sidemenu, initProps }) => {
    //1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //2.useState
    //2.1.PENYELESAIAN TIKET
    const [dataresolvedtimesticket, setdataresolvedtimesticket] = useState([])
    const [loadingdataresolvedtimes, setloadingdataresolvedtimes] = useState(true)
    //2.2.STATUS TIKET
    const [datastatusticket, setdatastatusticket] = useState([])
    //2.3.JUMLAH TIKET
    const [datacountsticket, setdatacountsticket] = useState("")
    //2.4.TAMBAH TIKET
    const [drawerticketscreate, setdrawerticketscreate] = useState(false)
    const [loadingticketscreate, setloadingticketscreate] = useState(false)
    const [refreshcreateticketscreate, setrefreshcreateticketscreate] = useState(-1)
    //2.5.EKSPOR TIKET
    const [drawerticketexports, setdrawerticketexports] = useState(false)
    //2.6.TABLE TIKET
    const [datatickets, setdatatickets] = useState([])
    const [datarawtickets, setdatarawtickets] = useState({
        current_page: "",
        data: [],
        first_page_url: "",
        from: null,
        last_page: null,
        last_page_url: "",
        next_page_url: "",
        path: "",
        per_page: null,
        prev_page_url: null,
        to: null,
        total: null
    })
    const [dataticketrelation, setdatatickrelation] = useState({
        status_ticket: [
            {
                id: 0,
                name: ""
            }
        ],
        ticket_types: [],
        incident_type: [],
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
        ticket_task_types: [],
        resolved_times: []
    })
    const [loadingtickets, setloadingtickets] = useState(false)
    const [pagetickets, setpagetickets] = useState(1)
    const [rowstickets, setrowstickets] = useState(10)
    const [sortingtickets, setsortingtickets] = useState({
        sort_by: "",
        sort_type: ""
    })
    //Filter
    const [datafilterttickets, setdatafilterttickets] = useState([])
    const [searcingfiltertickets, setsearcingfiltertickets] = useState("")
    const [tickettypefiltertickets, settickettypefiltertickets] = useState("")
    const [fromfiltertickets, setfromfiltertickets] = useState("")
    const [tofiltertickets, settofiltertickets] = useState("")
    const [locfiltertickets, setlocfiltertickets] = useState("")
    const [statusfiltertickets, setstatusfiltertickets] = useState("")

    //3.Columns
    const columnsTickets = [
        {
            title: 'No',
            dataIndex: 'num',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {datarawtickets.from + index}
                        </>
                }
            }
        },
        {
            title: 'No. Tiket',
            dataIndex: 'id',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.full_name}
                        </>
                }
            },
            sorter: (a, b) => a.id > b.id,
        },
        {
            title: 'Tipe Tiket',
            dataIndex: 'type',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.type_name}
                        </>
                }
            },
            sorter: (a, b) => a.type_name.localeCompare(b.type_name),
        },
        {
            title: 'Diajukan Oleh',
            dataIndex: 'requested_by',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.task.creator.name}
                        </>
                }
            },
        },
        {
            title: 'Lokasi Problem',
            dataIndex: 'location_id',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.task.location.full_location}
                        </>
                }
            },
        },
        {
            title: 'Tanggal Pengajuan',
            dataIndex: 'raised_at',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.raised_at}
                        </>
                }
            },
            sorter: (a, b) => a.raised_at.localeCompare(b.raised_at),
        },
        {
            title: 'Di-assign Ke',
            dataIndex: 'assignable',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {
                                record.task.users.length === 0 ?
                                    <div className=' flex items-center bg-onhold bg-opacity-10'>
                                        <div className=' mr-2'><UserIconSvg /></div>
                                        <div>Belum di-assign</div>
                                    </div>
                                    :
                                    <div>
                                        {record.task.users.map(user => user.name).join(", ")}
                                    </div>
                            }
                        </>
                }
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {
                                record.status === 1 &&
                                <div className="rounded-md h-auto px-3 text-center py-1 bg-overdue bg-opacity-10 text-overdue">Overdue</div>
                            }
                            {
                                record.status === 2 &&
                                <div className="rounded-md h-auto px-3 text-center py-1 bg-open bg-opacity-10 text-open">Open</div>
                            }
                            {
                                record.status === 3 &&
                                <div className="rounded-md h-auto px-3 text-center py-1 bg-onprogress bg-opacity-10 text-onprogress">On-Progress</div>
                            }
                            {
                                record.status === 4 &&
                                <div className="rounded-md h-auto px-3 text-center py-1 bg-onhold bg-opacity-10 text-onhold">On-Hold</div>
                            }
                            {
                                record.status === 5 &&
                                <div className="rounded-md h-auto px-3 text-center py-1 bg-completed bg-opacity-10 text-completed">Completed</div>
                            }
                            {
                                record.status === 6 &&
                                <div className="rounded-md h-auto px-3 text-center py-1 bg-closed bg-opacity-10 text-closed">Closed</div>
                            } 
                            {
                                record.status === 7 &&
                                <div className="rounded-md h-auto px-3 text-center py-1 bg-canceled bg-opacity-10 text-canceled">Canceled</div>
                            }                            
                            </>
                }
            },
            sorter: (a, b) => a.status_name.localeCompare(b.status_name),
        },
    ]

    //4.Handler
    const onFilterTickets = () => {
        setloadingtickets(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/${dataProfile.data.role === 1 ? `getTickets` : `getClientTickets`}?page=${pagetickets}&rows=${rowstickets}&ticket_id=${searcingfiltertickets}&type_id=${tickettypefiltertickets}&from=${fromfiltertickets}&to=${tofiltertickets}&location_id=${locfiltertickets}&status_id=${statusfiltertickets}&sort_by=${sortingtickets.sort_by}&sort_type=${sortingtickets.sort_type}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdatarawtickets(res2.data)
                setdatatickets(res2.data.data)
                setdatafilterttickets(res2.data.data)
                setloadingtickets(false)
            })
    }

    //5.useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/${dataProfile.data.role === 1 ? `getTicketStatusCounts` : `getClientTicketStatusCounts`}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                if (dataProfile.data.role === 1) {
                    var tempresolvedtimes = []
                    for (var times in res2.data.counts) {
                        if (times !== "total_counts") {
                            tempresolvedtimes.push({ counts: res2.data.counts[times].counts, percentage: res2.data.counts[times].percentage, name: times })
                        }
                    }
                    setdataresolvedtimesticket(tempresolvedtimes)
                    setdatacountsticket(res2.data.sum_ticket)
                }
                setdatastatusticket(res2.data.statuses)
                setloadingdataresolvedtimes(false)
            })
    }, [])
    useEffect(() => {
        setloadingtickets(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/${dataProfile.data.role === 1 ? `getTickets` : `getClientTickets`}?page=${pagetickets}&rows=${rowstickets}&ticket_id=${searcingfiltertickets}&type_id=${tickettypefiltertickets}&from=${fromfiltertickets}&to=${tofiltertickets}&location_id=${locfiltertickets}&status_id=${statusfiltertickets}&sort_by=${sortingtickets.sort_by}&sort_type=${sortingtickets.sort_type}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdatarawtickets(res2.data)
                setdatatickets(res2.data.data)
                setdatafilterttickets(res2.data.data)
                setloadingtickets(false)
            })
    }, [refreshcreateticketscreate])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/${dataProfile.data.role === 1 ? "getTicketRelation" : "getClientTicketRelation"}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdatatickrelation(res2.data)
            })
    }, [])

    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className="flex flex-col" id="mainWrapper">
                <div className=' grid grid-cols-10 px-5'>
                    {
                        dataProfile.data.role === 1 ?
                            <>
                                {/* PENYELESAIAN TIKETt */}
                                <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mx-3">
                                    <div className="flex items-center justify-between mb-4">
                                        <H1>Penyelesaian Tiket</H1>
                                    </div>
                                    {
                                        loadingdataresolvedtimes ?
                                            <>
                                                <Spin />
                                            </>
                                            :
                                            <div className=' flex flex-col'>
                                                {
                                                    dataresolvedtimesticket.every(docevery => docevery.counts === 0) ?
                                                        <div className=' w-full flex items-center justify-center'>
                                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                        </div>
                                                        :
                                                        <div className=" w-full flex justify-center">
                                                            <Doughnut
                                                                data={{
                                                                    labels: dataresolvedtimesticket.map((doc) => doc.name),
                                                                    datasets: [
                                                                        {
                                                                            data: dataresolvedtimesticket.map((doc) => doc.counts),
                                                                            backgroundColor: [
                                                                                '#2F80ED',
                                                                                '#BF4A40',
                                                                                '#ED962F',
                                                                                '#E5C471',
                                                                                '#6AAA70',
                                                                            ],
                                                                            borderColor: [
                                                                                '#2F80ED',
                                                                                '#BF4A40',
                                                                                '#ED962F',
                                                                                '#E5C471',
                                                                                '#6AAA70',
                                                                            ],
                                                                            borderWidth: 1,
                                                                        },
                                                                    ]
                                                                }}
                                                                options={{
                                                                    title: {
                                                                        display: false,

                                                                    },
                                                                    legend: {
                                                                        display: false,
                                                                    },
                                                                    maintainAspectRatio: false,
                                                                    cutout: 55,
                                                                    spacing: 5
                                                                }}
                                                            />
                                                        </div>
                                                }
                                                <div className="flex flex-col w-full">
                                                    {
                                                        dataresolvedtimesticket.map((doc, idx) => {
                                                            return (
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <div className="flex">
                                                                        <div className={`w-1 mr-1 ${doc.name === 'three_hours' && `bg-open`} ${doc.name === 'three_to_twelve_hours' && `bg-overdue`} ${doc.name === 'twelve_to_thirty_hours' && `bg-onprogress`} ${doc.name === 'thirty_hours_to_three_days' && `bg-onhold`} ${doc.name === 'three_days' && `bg-completed`}`}></div>
                                                                        <Text>{doc.name === 'three_hours' && `Kurang dari 3 jam`} {doc.name === 'three_to_twelve_hours' && `3 - 12 jam`} {doc.name === 'twelve_to_thirty_hours' && `12 - 30 jam`} {doc.name === 'thirty_hours_to_three_days' && `30 jam - 3 hari`} {doc.name === 'three_days' && `Lebih dari 3 hari`}</Text>
                                                                    </div>
                                                                    <div className="flex">
                                                                        <H2>{doc.counts}</H2>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                    }
                                </div>
                                {/* STATUS DAN JUMLAH TIKET */}
                                {
                                    loadingdataresolvedtimes ?
                                        <>
                                            <Spin />
                                        </>
                                        :
                                        <div className='col-span-3 flex flex-col mb-6'>
                                            <div className=' mb-3 grid grid-cols-2'>
                                                <div className=' col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between ml-2 mr-1 mb-2'>
                                                    <div><TicketIconSvg size={30} color={`#BF4A40`} /></div>
                                                    <div className=' flex flex-col'>
                                                        <div className=' flex items-center justify-end'>
                                                            <p className='mb-0 text-overdue font-semibold text-base mr-1'>{datastatusticket[0].status_count}</p>
                                                            <div><AlerttriangleIconSvg size={15} color={`#BF4A40`} /></div>
                                                        </div>
                                                        <div className=' justify-end flex'><Label>{datastatusticket[0].status_name}</Label></div>
                                                    </div>
                                                </div>
                                                <div className=' col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between ml-1 mr-2 mb-2'>
                                                    <div><TicketIconSvg size={30} color={`#2F80ED`} /></div>
                                                    <div className=' flex flex-col'>
                                                        <div className=' flex items-center justify-end'>
                                                            <p className='mb-0 text-open font-semibold text-base mr-1'>{datastatusticket[1].status_count}</p>
                                                        </div>
                                                        <div className=' justify-end flex'><Label>{datastatusticket[1].status_name}</Label></div>
                                                    </div>
                                                </div>
                                                <div className=' col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between ml-2 mr-1 my-2'>
                                                    <div><TicketIconSvg size={30} color={`#ED962F`} /></div>
                                                    <div className=' flex flex-col'>
                                                        <div className=' flex items-center justify-end'>
                                                            <p className='mb-0 text-onprogress font-semibold text-base mr-1'>{datastatusticket[2].status_count}</p>
                                                        </div>
                                                        <div className=' justify-end flex'><Label>{datastatusticket[2].status_name}</Label></div>
                                                    </div>
                                                </div>
                                                <div className=' col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between ml-1 mr-2 my-2'>
                                                    <div><TicketIconSvg size={30} color={`#E5C471`} /></div>
                                                    <div className=' flex flex-col'>
                                                        <div className=' flex items-center justify-end'>
                                                            <p className='mb-0 text-onhold font-semibold text-base mr-1'>{datastatusticket[3].status_count}</p>
                                                        </div>
                                                        <div className=' justify-end flex'><Label>{datastatusticket[3].status_name}</Label></div>
                                                    </div>
                                                </div>
                                                <div className=' col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between ml-2 mr-1 mt-2'>
                                                    <div><TicketIconSvg size={30} color={`#808080`} /></div>
                                                    <div className=' flex flex-col'>
                                                        <div className=' flex items-center justify-end'>
                                                            <p className='mb-0 text-closed font-semibold text-base mr-1'>{datastatusticket[4].status_count}</p>
                                                        </div>
                                                        <div className=' justify-end flex'><Label>{datastatusticket[4].status_name}</Label></div>
                                                    </div>
                                                </div>
                                                <div className=' col-span-1 shadow-md rounded-md bg-white p-5 flex justify-between ml-1 mr-2 mt-2'>
                                                    <div><TicketIconSvg size={30} color={`#F46780`} /></div>
                                                    <div className=' flex flex-col'>
                                                        <div className=' flex items-center justify-end'>
                                                            <p className='mb-0 text-canceled font-semibold text-base mr-1'>{datastatusticket[5].status_count}</p>
                                                        </div>
                                                        <div className=' justify-end flex'><Label>{datastatusticket[5].status_name}</Label></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='shadow-md rounded-md bg-white p-5 mx-2 flex justify-between items-center h-full'>
                                                <div><H1>Total Tiket</H1></div>
                                                <div><p className=' mb-0 text-5xl font-light text-primary100'>{datacountsticket}</p></div>
                                            </div>
                                        </div>
                                }
                                <div className=' col-span-4 flex flex-col mb-6'>
                                    {/* BUAT TIKET */}
                                    <div className='shadow-md rounded-md bg-gradient-to-br from-primary100 to-state4 transition ease-in-out hover:from-primary75 cursor-pointer p-5 mx-3 flex items-center mb-2'
                                        onClick={() => {
                                            setdrawerticketscreate(true)
                                        }}
                                    >
                                        <div className=' mr-5'>
                                            <TicketIconSvg size={40} color={`#ffffff`} />
                                        </div>
                                        <div className=' flex flex-col'>
                                            <p className=' mb-1 text-lg text-white font-semibold'>Buat Tiket</p>
                                            <p className=' mb-0 text-sm text-white text-opacity-60'>{moment(new Date()).locale('id').format('dddd, LL')}</p>
                                        </div>
                                    </div>
                                    {/* KELOLA TIKET */}
                                    <div className="col-span-4 flex flex-col shadow-md rounded-md bg-white p-5 mt-2 mx-3 h-full">
                                        <div className="flex flex-col justify-center h-full">
                                            <div className=" h-2/6 flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2" onClick={() => { setdrawerticketexports(true) }}>
                                                <div className="flex p-1 bg-primary10 rounded mr-3">
                                                    <TableExportIconSvg size={35} color={`#35763B`} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <H2>Expor Tiket</H2>
                                                    <Label>Download daftar tiket dalam bentuk spreadsheet/excel</Label>
                                                </div>
                                            </div>
                                            <div className=" h-2/6 flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2" onClick={() => { rt.push(`/tickets/histories`) }}>
                                                <div className="flex p-1 bg-primary10 rounded mr-3">
                                                    <HistoryIconSvg size={35} color={`#35763B`} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <H2>Riwayat Tiket</H2>
                                                    <Label>Lihat seluruh tiket yang berstatus closed berikut durasi</Label>
                                                </div>
                                            </div>
                                            <div className=" h-2/6 flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2" onClick={() => { rt.push(`/tickets/tickettypes`) }}>
                                                <div className="flex p-1 bg-primary10 rounded mr-3">
                                                    <AdjusmentsHorizontalIconSvg size={35} color={`#35763B`} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <H2>Atur Tiket</H2>
                                                    <Label>Hubungkan tiket dengan task yang akan dijalankan</Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <div className=" col-span-10 grid grid-cols-12">
                                <div className="col-span-8 flex mb-6">
                                    <div className=' col-span-2 shadow-md rounded-md bg-white p-5 flex justify-between ml-2 mr-1 mb-2'>
                                        <div><TicketIconSvg size={30} color={`#ED962F`} /></div>
                                        <div className=' flex flex-col'>
                                            <div className=' flex items-center justify-end'>
                                                <p className='mb-0 text-onprogress font-semibold text-base mr-1'>{datastatusticket[0].status_count}</p>
                                                <div><AlerttriangleIconSvg size={15} color={`#BF4A40`} /></div>
                                            </div>
                                            <div className=' justify-end flex'><Label>{datastatusticket[0].status_name}</Label></div>
                                        </div>
                                    </div>
                                    <div className=' col-span-2 shadow-md rounded-md bg-white p-5 flex justify-between ml-1 mr-2 mb-2'>
                                        <div><TicketIconSvg size={30} color={`#2F80ED`} /></div>
                                        <div className=' flex flex-col'>
                                            <div className=' flex items-center justify-end'>
                                                <p className='mb-0 text-open font-semibold text-base mr-1'>{datastatusticket[1].status_count}</p>
                                            </div>
                                            <div className=' justify-end flex'><Label>{datastatusticket[1].status_name}</Label></div>
                                        </div>
                                    </div>
                                    <div className=' col-span-2 shadow-md rounded-md bg-white p-5 flex justify-between ml-2 mr-1 mb-2'>
                                        <div><TicketIconSvg size={30} color={`#808080`} /></div>
                                        <div className=' flex flex-col'>
                                            <div className=' flex items-center justify-end'>
                                                <p className='mb-0 text-closed font-semibold text-base mr-1'>{datastatusticket[2].status_count}</p>
                                            </div>
                                            <div className=' justify-end flex'><Label>{datastatusticket[2].status_name}</Label></div>
                                        </div>
                                    </div>
                                    <div className=' col-span-2 shadow-md rounded-md bg-white p-5 flex justify-between ml-1 mr-2 mb-2'>
                                        <div><TicketIconSvg size={30} color={`#BF4A40`} /></div>
                                        <div className=' flex flex-col'>
                                            <div className=' flex items-center justify-end'>
                                                <p className='mb-0 text-overdue font-semibold text-base mr-1'>{datastatusticket[3].status_count}</p>
                                            </div>
                                            <div className=' justify-end flex'><Label>{datastatusticket[3].status_name}</Label></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4 shadow-md rounded-md bg-gradient-to-br from-primary100 to-state4 transition ease-in-out hover:from-primary75 cursor-pointer p-5 mx-3 flex items-center mb-6"
                                    onClick={() => {
                                        setdrawerticketscreate(true)
                                    }}
                                >
                                    <div className=' mr-5'>
                                        <TicketIconSvg size={40} color={`#ffffff`} />
                                    </div>
                                    <div className=' flex flex-col'>
                                        <p className=' mb-1 text-lg text-white font-semibold'>Buat Tiket</p>
                                        <p className=' mb-0 text-sm text-white text-opacity-60'>{moment(new Date()).locale('id').format('dddd, LL')}</p>
                                    </div>
                                </div>
                            </div>
                    }
                    {/* TABLE TIKET */}
                    <div className="col-span-10 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mx-2">
                        <div className="flex items-center justify-between mb-4">
                            <H1>Semua Tiket</H1>
                        </div>
                        <div className=' flex items-center mb-4'>
                            <div className="mx-1 w-2/12">
                                <Input value={searcingfiltertickets === "" ? null : searcingfiltertickets} style={{ width: `100%` }} placeholder="Kata Kunci.." allowClear onChange={(e) => {
                                    if (e.target.value === "") {
                                        setsearcingfiltertickets("")
                                    }
                                    else {
                                        setsearcingfiltertickets(e.target.value)
                                    }
                                }} />
                            </div>
                            <div className='mx-1 w-2/12'>
                                <Select
                                    value={tickettypefiltertickets === "" ? null : tickettypefiltertickets}
                                    placeholder="Semua Tipe Tiket"
                                    style={{ width: `100%` }}
                                    allowClear
                                    name={`task_type`}
                                    onChange={(value) => { typeof (value) === 'undefined' ? settickettypefiltertickets("") : settickettypefiltertickets(value) }}
                                >
                                    {
                                        dataticketrelation.ticket_types.map((doc, idx) => (
                                            <Select.Option key={idx} value={doc.id}>{doc.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className=' w-3/12 mx-1'>
                                <DatePicker.RangePicker allowEmpty className="datepickerStatus" value={fromfiltertickets === "" ? [null, null] : [moment(fromfiltertickets), moment(tofiltertickets)]} onChange={(dates, datestrings) => {
                                    setfromfiltertickets(datestrings[0])
                                    settofiltertickets(datestrings[1])
                                }}
                                />
                            </div>
                            <div className=' mx-1 w-2/12'>
                                <TreeSelect
                                    style={{ width: `100%` }}
                                    allowClear
                                    placeholder="Semua Lokasi"
                                    showSearch
                                    suffixIcon={<SearchOutlined />}
                                    showArrow
                                    name={`locations_id`}
                                    onChange={(value) => { typeof (value) === 'undefined' ? setlocfiltertickets("") : setlocfiltertickets(value) }}
                                    treeData={[dataticketrelation.companies]}
                                    treeDefaultExpandAll
                                    value={locfiltertickets === "" ? null : locfiltertickets}
                                ></TreeSelect >
                            </div>
                            <div className='mx-1 w-2/12'>
                                <Select
                                    value={statusfiltertickets === "" ? null : statusfiltertickets}
                                    placeholder="Status"
                                    style={{ width: `100%` }}
                                    allowClear
                                    name={`status`}
                                    onChange={(value, option) => { typeof (value) === 'undefined' ? (setstatusfiltertickets('')) : (setstatusfiltertickets(value)) }}
                                >
                                    {
                                        dataticketrelation.status_ticket.map((doc, idx) => {
                                            if (doc.id === 1)
                                                return (
                                                    <Select.Option key={idx} value={doc.id}><div className=' flex items-center'><div className='mr-1 w-3 h-3 rounded-full bg-overdue'></div> {doc.name}</div></Select.Option>
                                                )
                                            else if (doc.id === 2)
                                                return (
                                                    <Select.Option key={idx} value={doc.id}><div className=' flex items-center'><div className='mr-1 w-3 h-3 rounded-full bg-open'></div> {doc.name}</div></Select.Option>
                                                )
                                            else if (doc.id === 3)
                                                return (
                                                    <Select.Option key={idx} value={doc.id}><div className=' flex items-center'><div className='mr-1 w-3 h-3 rounded-full bg-onprogress'></div> {doc.name}</div></Select.Option>
                                                )
                                            else if (doc.id === 4)
                                                return (
                                                    <Select.Option key={idx} value={doc.id}><div className=' flex items-center'><div className='mr-1 w-3 h-3 rounded-full bg-onhold'></div> {doc.name}</div></Select.Option>
                                                )
                                            else if (doc.id === 5)
                                                return (
                                                    <Select.Option key={idx} value={doc.id}><div className=' flex items-center'><div className='mr-1 w-3 h-3 rounded-full bg-completed'></div> {doc.name}</div></Select.Option>
                                                )
                                            else if (doc.id === 6)
                                                return (
                                                    <Select.Option key={idx} value={doc.id}><div className=' flex items-center'><div className='mr-1 w-3 h-3 rounded-full bg-closed'></div> {doc.name}</div></Select.Option>
                                                )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className='mx-1 w-1/12'>
                                <ButtonSys type={`primary`} onClick={onFilterTickets}>
                                    <div className='mr-1'>
                                        <SearchIconSvg size={15} color={`#ffffff`} />
                                    </div>
                                    Cari
                                </ButtonSys>
                            </div>
                        </div>
                        <div>
                            <TableCustomTickets
                                dataSource={datatickets}
                                setDataSource={setdatatickets}
                                columns={columnsTickets}
                                loading={loadingtickets}
                                setpraloading={setloadingtickets}
                                pageSize={rowstickets}
                                total={datarawtickets.total}
                                initProps={initProps}
                                setpage={setpagetickets}
                                pagefromsearch={pagetickets}
                                setdataraw={setdatarawtickets}
                                setsorting={setsortingtickets}
                                sorting={sortingtickets}
                                searching={searcingfiltertickets}
                                tickettype={tickettypefiltertickets}
                                fromdate={fromfiltertickets}
                                todate={tofiltertickets}
                                location={locfiltertickets}
                                status={statusfiltertickets}
                                dataprofile={dataProfile}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <DrawerTicketCreate
                title={"Tiket Baru"}
                visible={drawerticketscreate}
                onClose={() => { setdrawerticketscreate(false) }}
                buttonOkText={"Simpan"}
                initProps={initProps}
                onvisible={setdrawerticketscreate}
                refreshtickets={refreshcreateticketscreate}
                setrefreshtickets={setrefreshcreateticketscreate}
                dataprofile={dataProfile}
            />
            <DrawerTicketExports
                title={"Ekspor Tiket"}
                visible={drawerticketexports}
                onClose={() => { setdrawerticketexports(false) }}
                buttonOkText={"Ekspor Tiket"}
                initProps={initProps}
                onvisible={setdrawerticketexports}
            />
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
            sidemenu: "2"
        },
    }
}

export default TicketIndex2
