import Layout from '../../components/layout-dashboardNew'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import st from '../../components/layout-dashboard.module.css'
import { Progress, Input, notification } from 'antd'
import Buttonsys from '../../components/button'
import { H1, H2, Label, Text } from '../../components/typography'
import { AlerttriangleIconSvg, BackIconSvg, CalendartimeIconSvg, ClipboardcheckIconSvg, ClockIconSvg, EditIconSvg, ListcheckIconSvg, MappinIconSvg, TrashIconSvg } from '../../components/icon'
import { Chart, ArcElement, Tooltip, CategoryScale, LinearScale, LineElement, BarElement, PointElement } from 'chart.js'
Chart.register(ArcElement, Tooltip, CategoryScale, LinearScale, LineElement, BarElement, PointElement);
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { TableCustomTask, TableCustomTipeTask } from '../../components/table/tableCustom'
import { ModalHapusTipeTask } from '../../components/modal/modalCustom'
import DrawerTaskTypesCreate from '../../components/drawer/tasks/drawerTaskTypesCreate'
import DrawerTaskTypesUpdate from '../../components/drawer/tasks/drawerTaskTypesUpdate'
import DrawerTaskCreate from '../../components/drawer/tasks/drawerTaskCreate'
import moment from 'moment'

const TaskIndex = ({ initProps, dataProfile, sidemenu }) => {
    //1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //useState
    //tipe task
    const [datarawtipetask, setdatarawtipetask] = useState({
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
    const [currenttipetask, setcurrenttipetask] = useState({
        id: null,
        name: "",
        description: "",
        works: []
    })
    const [datatipetasks, setdatatipetasks] = useState([])
    const [loadingtipetasks, setloadingtipetasks] = useState(false)
    const [viewdetailtipetask, setviewdetailtipetask] = useState(false)
    const [pagetipetask, setpagetipetask] = useState(1)
    const [rowstipetask, setrowstipetask] = useState(6)
    //create
    //create - task type
    const [drawertasktypecreate, setdrawertasktypecreate] = useState(false)
    //create - task
    const [drawertaskcreate, setdrawertaskcreate] = useState(false)
    //update
    const [triggertasktypupdate, settriggertasktypupdate] = useState(-1)
    const [idtasktypupdate, setidtasktypupdate] = useState(-1)
    const [drawertasktypupdate, setdrawertasktypupdate] = useState(false)
    const [loadingdetailtipetaskupdate, setloadingdetailtipetaskupdate] = useState(false)
    //delete
    const [datatipetaskdelete, setdatatipetaskdelete] = useState({
        id: null,
        name: ""
    })
    const [modaltipetaskdelete, setmodaltipetaskdelete] = useState(false)
    const [loadingtipetaskdelete, setloadingtipetaskdelete] = useState(false)
    //Tasks
    const [datarawtask, setdatarawtask] = useState({
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
    const [currenttask, setcurrenttask] = useState({
        id: null,
        name: "",
        description: "",
        task_type_id: null,
        location_id: null,
        reference_id: null,
        created_by: null,
        group_id: null,
        created_at: null,
        on_hold_at: null,
        deadline: null,
        status: null,
        is_replaceable: null,
        deleted_at: null,
        task_type: {
            id: null,
            name: "",
            deleted_at: null
        },
        location: {
            id: null,
            name: "",
            full_location: ""
        },
        users: []
    })
    const [datatasks, setdatatasks] = useState([])
    const [loadingtasks, setloadingtasks] = useState(false)
    const [viewdetailtask, setviewdetailtask] = useState(false)
    const [pagetask, setpagetask] = useState(1)
    const [rowstask, setrowstask] = useState(6)

    //2. columns table
    const columnsTipetask = [
        {
            title: 'No',
            dataIndex: 'num',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {datarawtipetask.from + index}
                        </>
                }
            }
        },
        {
            title: 'Tipe Task',
            dataIndex: 'name',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.name}
                        </>
                }
            },
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Deskripsi',
            dataIndex: 'description',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.description}
                        </>
                }
            }
        },
        {
            title: 'Jumlah Task',
            dataIndex: 'task_count',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.tasks_count}
                        </>
                }
            }
        },
        {
            title: 'Opsi',
            dataIndex: 'option',
            render: (text, record, index) => {
                return {
                    children:
                        <div className="flex items-center">
                            <div className="mx-1">
                                <Buttonsys type="default" onClick={() => {
                                    settriggertasktypupdate(record.id)
                                    setdrawertasktypupdate(true)
                                }}>
                                    <EditIconSvg size={15} color={`#35763B`} />
                                </Buttonsys>
                            </div>
                            <div className="mx-1">
                                <Buttonsys type="default" color="danger" onClick={() => { setdatatipetaskdelete({ id: record.id, name: record.name }); setmodaltipetaskdelete(true) }}>
                                    <TrashIconSvg size={15} color={`#BF4A40`} />
                                </Buttonsys>
                            </div>
                        </div>
                }
            }
        },
    ]
    const columnsTask = [
        {
            title: 'No',
            dataIndex: 'num',
            render: (text, record, index) => {
                return {
                    children:
                        <div className={record.status === 6 && `bg-bgBackdropOverdue`}>
                            {datarawtask.from + index}
                        </div>
                }
            }
        },
        {
            title: 'Nomor Task',
            dataIndex: 'id',
            render: (text, record, index) => {
                return {
                    children:
                        <div className={record.status === 6 && `bg-bgBackdropOverdue`}>
                            T-000{record.id}
                        </div>
                }
            },
            sorter: (a, b) => a.id < b.id,
        },
        {
            title: 'Tipe Task',
            dataIndex: 'name',
            render: (text, record, index) => {
                return {
                    children:
                        <div className={record.status === 6 && `bg-bgBackdropOverdue`}>
                            {record.task_type === null ? `-` : record.task_type.name}
                        </div>
                }
            },
            sorter: (a, b) => a.task_type.name.localeCompare(b.task_type.name),
        },
        {
            title: 'Judul Task',
            dataIndex: 'name',
            render: (text, record, index) => {
                return {
                    children:
                        <div className={record.status === 6 && `bg-bgBackdropOverdue`}>
                            {record.name === "" || record.name === "-" ? `-` : record.name}
                        </div>
                }
            }
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            render: (text, record, index) => {
                return {
                    children:
                        <div className={record.status === 6 && `bg-bgBackdropOverdue`}>
                            {record.deadline === null ? `-` : moment(record.deadline).locale('id').format('lll')}
                        </div>
                }
            }
        },
        {
            title: 'Staff',
            dataIndex: 'users',
            render: (text, record, index) => {
                return {
                    children:
                        <div className={record.status === 6 && `bg-bgBackdropOverdue`}>
                            {record.users.length === 0 ? `-` : record.users.map(docmap => docmap.name).join(", ")}
                        </div>
                }
            }
        },
        {
            title: 'Lokasi',
            dataIndex: 'location',
            render: (text, record, index) => {
                return {
                    children:
                        <div className={record.status === 6 && `bg-bgBackdropOverdue`}>
                            {record.location === null ? `-` : record.location.full_location}
                        </div>
                }
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: `center`,
            render: (text, record, index) => {
                return {
                    children:
                        <div className={record.status === 6 && ` bg-bgBackdropOverdue`}>
                            {
                                record.status === 1 &&
                                <div className="rounded-md h-auto px-1 text-center py-1 bg-open bg-opacity-10 border border-open text-open">Open</div>
                            }
                            {
                                record.status === 2 &&
                                <div className="rounded-md h-auto px-1 text-center py-1 bg-onprogress bg-opacity-10 border border-onprogress text-onprogress">On-Progress</div>
                            }
                            {
                                record.status === 3 &&
                                <div className="rounded-md h-auto px-1 text-center py-1 bg-onhold bg-opacity-10 border border-onhold text-onhold">On-Hold</div>
                            }
                            {
                                record.status === 4 &&
                                <div className="rounded-md h-auto px-1 text-center py-1 bg-completed bg-opacity-10 border border-completed text-completed">Completed</div>
                            }
                            {
                                record.status === 5 &&
                                <div className="rounded-md h-auto px-1 text-center py-1 bg-closed bg-opacity-10 border border-closed text-closed">Closed</div>
                            }
                            {
                                record.status === 6 &&
                                <div className="rounded-md h-auto px-1 text-center py-1 bg-overdue bg-opacity-10 border border-overdue text-overdue">Overdue</div>
                            }
                        </div>
                }
            }
        },
    ]

    //HANDLER
    const handleDeleteTipeTask = () => {
        setloadingtipetaskdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteTaskType`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: datatipetaskdelete.id
            })
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingtipetaskdelete(false)
                if (res2.success) {
                    setmodaltipetaskdelete(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

    //USEEFFECT
    useEffect(() => {
        if (viewdetailtipetask === true) {
            setloadingtipetasks(true)
            fetch(`https://boiling-thicket-46501.herokuapp.com/getTaskTypes?page=${pagetipetask}&rows=${rowstipetask}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                },
            })
                .then(res => res.json())
                .then(res2 => {
                    setdatarawtipetask(res2.data)
                    setdatatipetasks(res2.data.data)
                    setloadingtipetasks(false)
                })
        }
    }, [viewdetailtipetask, drawertasktypecreate, modaltipetaskdelete])
    useEffect(() => {
        setloadingtasks(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getTasks?page=${pagetask}&rows=${rowstask}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdatarawtask(res2.data)
                setdatatasks(res2.data.data)
                setloadingtasks(false)
            })
    }, [drawertaskcreate])
    useEffect(() => {
        if (triggertasktypupdate !== -1) {
            setidtasktypupdate(triggertasktypupdate)
        }
    }, [triggertasktypupdate])

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className="flex flex-col" id="mainWrapper">
                {
                    viewdetailtipetask ?
                        <div className='px-5'>
                            <div className='flex flex-col shadow-md rounded-lg bg-white p-5 mb-6 mx-3'>
                                <div className="flex justify-between items-center mb-5">
                                    <div className="flex">
                                        <div className="mr-2 cursor-pointer" onClick={() => { setviewdetailtipetask(false) }}>
                                            <BackIconSvg size={15} color={`#000000`} />
                                        </div>
                                        <H1>Semua Tipe Task</H1>
                                    </div>
                                    <div>
                                        <Buttonsys type="primary" onClick={() => { setdrawertasktypecreate(true) }}>
                                            + Tambah Tipe Task
                                        </Buttonsys>
                                    </div>
                                </div>
                                <div>
                                    <TableCustomTipeTask
                                        dataSource={datatipetasks}
                                        setDataSource={setdatatipetasks}
                                        columns={columnsTipetask}
                                        loading={loadingtipetasks}
                                        setpraloading={setloadingtipetasks}
                                        pageSize={rowstipetask}
                                        total={datarawtipetask.total}
                                        initProps={initProps}
                                        setpage={setpagetipetask}
                                        setdataraw={setdatarawtipetask}
                                    />
                                </div>
                            </div>
                            <ModalHapusTipeTask
                                title={"Konfirmasi Hapus Tipe Task"}
                                visible={modaltipetaskdelete}
                                onvisible={setmodaltipetaskdelete}
                                onCancel={() => { setmodaltipetaskdelete(false) }}
                                loading={loadingtipetaskdelete}
                                datadelete={datatipetaskdelete}
                                onOk={handleDeleteTipeTask}
                            />
                        </div>
                        :
                        <div className="grid grid-cols-11 px-5" id="wrapper1">
                            {/* SEGERA BERAKHIR */}
                            <div className=" col-span-5 flex flex-col shadow-md rounded-md bg-gray-50 p-5 mb-6 mr-3">
                                <div className="flex items-center justify-between mb-4">
                                    <H1>Segera Berakhir</H1>
                                    <div className="p-2 rounded bg-red-50 text-state1 text-xs flex">
                                        <div className="mr-1 flex items-center">
                                            <ClockIconSvg size={15} color={`#BF4A40`} />
                                        </div>
                                        Jumat, 10 November 2021
                                    </div>
                                </div>
                                <div className="rounded bg-state1 shadow text-white p-5 flex justify-between mb-8 cursor-pointer">
                                    <div className="flex flex-col">
                                        <div>
                                            <ClipboardcheckIconSvg size={50} color={`#ffffff`} />
                                        </div>
                                        <div className="flex flex-col mt-2">
                                            <Text color={`white`}>Berakhir 11 Nov</Text>
                                            <Progress trailColor={`#4D4D4D`} strokeColor={`#ffffff`} percent={50} showInfo={false} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col text-right">
                                            <p className={`font-bold text-xl mb-0 text-white`}>Perbaikan ATM H2VLL</p>
                                            <Label>T-00001</Label>
                                        </div>
                                        <div className="flex flex-col mt-4 text-right">
                                            <H2 color={`white`}>Sisa 1 Jam 21 Menit</H2>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded bg-white shadow p-5 flex justify-between cursor-pointer">
                                    <div className="flex flex-col">
                                        <div>
                                            <ClipboardcheckIconSvg size={50} color={`#35763B`} />
                                        </div>
                                        <div className="flex flex-col mt-2">
                                            <Text>Berakhir hari ini</Text>
                                            <Progress trailColor={`#d8e8da`} strokeColor={`#35763B`} percent={50} showInfo={false} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col text-right">
                                            <H1>Perbaikan ATM H2VLL</H1>
                                            <Label>T-00001</Label>
                                        </div>
                                        <div className="flex flex-col mt-4 text-right">
                                            <H2 color={`primary`}>Sisa 1 Jam 21 Menit</H2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* STATUS TASK */}
                            <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mx-3">
                                <div className="flex items-center justify-between mb-4">
                                    <H1>Status Task</H1>
                                    <div className="flex items-center">
                                        <div className="mx-1">
                                            <MappinIconSvg color={`#000000`} size={25} />
                                        </div>
                                        <div className="mx-1">
                                            <CalendartimeIconSvg color={`#000000`} size={25} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <Doughnut
                                        data={{
                                            labels: [`Open`, `Overdue`, `On-Progress`, `On-Hold`, `Completed`, `Closed`],
                                            datasets: [
                                                {
                                                    data: [5, 4, 1, 2, 23, 138],
                                                    backgroundColor: [
                                                        '#2F80ED',
                                                        '#BF4A40',
                                                        '#ED962F',
                                                        '#E5C471',
                                                        '#6AAA70',
                                                        '#808080',
                                                    ],
                                                    borderColor: [
                                                        '#2F80ED',
                                                        '#BF4A40',
                                                        '#ED962F',
                                                        '#E5C471',
                                                        '#6AAA70',
                                                        '#808080',
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
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <div className=" w-1 bg-open mr-1"></div>
                                            <Text>Open</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>5</H2>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <div className=" w-1 bg-overdue mr-1"></div>
                                            <Text>Overdue</Text>
                                            <AlerttriangleIconSvg size={15} color={`#BF4A40`} />
                                        </div>
                                        <div className="flex">
                                            <H2>4</H2>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <div className=" w-1 bg-onprogress mr-1"></div>
                                            <Text>On-Progress</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>1</H2>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <div className=" w-1 bg-onhold mr-1"></div>
                                            <Text>On-Hold</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>2</H2>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <div className=" w-1 bg-completed mr-1"></div>
                                            <Text>Completed</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>23</H2>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <div className=" w-1 bg-closed mr-1"></div>
                                            <Text>Closed</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>138</H2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* TIPE TASK */}
                            <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mx-3">
                                <div className="flex items-center justify-between mb-4">
                                    <H1>Tipe Task Terbanyak</H1>
                                    <div className="flex items-center">
                                        <div className="mx-1">
                                            <MappinIconSvg color={`#000000`} size={25} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <Bar
                                        data={{
                                            labels: [`PM1`, `PM2`, `SUP`, `INC`],
                                            datasets: [
                                                {
                                                    data: [5, 4, 1, 2],
                                                    backgroundColor: [
                                                        '#2F80ED',
                                                        '#E5C471',
                                                        '#BF4A40',
                                                        '#6AAA70',
                                                    ],
                                                    borderColor: [
                                                        '#2F80ED',
                                                        '#E5C471',
                                                        '#BF4A40',
                                                        '#6AAA70',
                                                    ],
                                                    barPercentage: 0.5,
                                                    barThickness: 15,
                                                    maxBarThickness: 8,
                                                    minBarLength: 2,
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
                                            scales: {
                                                x: {
                                                    grid: {
                                                        display: false
                                                    }
                                                },
                                                y: {
                                                    grid: {
                                                        display: false
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <Text>PM1</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>5</H2>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <Text>PM2</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>4</H2>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <Text>SUP</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>1</H2>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <Text>INC</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>2</H2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* DEADLINE TASK */}
                            <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mr-3">
                                <div className="flex items-center justify-between mb-4">
                                    <H1>Deadline Task</H1>
                                    <div className="flex items-center">
                                        <div className="mx-1">
                                            <MappinIconSvg color={`#000000`} size={25} />
                                        </div>
                                        <div className="mx-1">
                                            <CalendartimeIconSvg color={`#000000`} size={25} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <Line
                                        data={{
                                            labels: [`1-10 Nov`, `11-20 Nov`, `21-30 Nov`],
                                            datasets: [
                                                {
                                                    data: [8, 4, 12],
                                                    borderColor: '#35763B',
                                                    tension: 0.5,
                                                    fill: false
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
                                            scales: {
                                                x: {
                                                    grid: {
                                                        display: false
                                                    }
                                                },
                                                y: {
                                                    grid: {
                                                        display: false
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <Text>Berakhir hari ini</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>4</H2>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <Text>Berakhir besok</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>12</H2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* STAFF TASK */}
                            <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mr-3">
                                <div className="flex items-center justify-between mb-4">
                                    <H1>Staff</H1>
                                    <div className="flex items-center">
                                        <div>
                                            <Label color="green" cursor="pointer">Lihat Semua</Label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mb-4 h-36">
                                    <Progress
                                        type="dashboard"
                                        percent={80}
                                        strokeColor={{
                                            from: `#65976a`,
                                            to: `#35763B`
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <Text>Total Staff</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>100</H2>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex">
                                            <Text>Staff tidak memiliki task</Text>
                                        </div>
                                        <div className="flex">
                                            <H2>10</H2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* KELOLA TASK */}
                            <div className="col-span-5 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mr-3">
                                <div className="flex items-center justify-between mb-4">
                                    <H1>Kelola Task</H1>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2" onClick={() => { setdrawertaskcreate(true) }}>
                                        <div className="flex p-1 bg-primary10 rounded mr-3">
                                            <ClipboardcheckIconSvg size={35} color={`#35763B`} />
                                        </div>
                                        <div className="flex flex-col">
                                            <H2>Tambah Task</H2>
                                            <Label>Error, PM, Instalasi, Perbaikan, Upgrade Sistem, dll. </Label>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2" onClick={() => { setdrawertasktypecreate(true) }}>
                                        <div className="flex p-1 bg-primary10 rounded mr-3">
                                            <ListcheckIconSvg size={35} color={`#35763B`} />
                                        </div>
                                        <div className="flex flex-col">
                                            <H2>Tambah Tipe Task</H2>
                                            <Label>Tambah tipe task baru</Label>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2" onClick={() => { setviewdetailtipetask(true) }}>
                                        <div className="flex p-1 bg-primary10 rounded mr-3">
                                            <EditIconSvg size={35} color={`#35763B`} />
                                        </div>
                                        <div className="flex flex-col">
                                            <H2>Kelola Tipe Task</H2>
                                            <Label>Hapus, ubah, lihat daftar tipe task</Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* TABLE DAFTAR TASK */}
                            <div className="col-span-11 flex flex-col shadow-md rounded-md bg-white p-5 mb-6 mr-3">
                                <div className="flex items-center justify-between mb-4">
                                    <H1>Semua Task</H1>
                                    <div className="w-8/12 flex justify-end">
                                        <div className="mx-2">
                                            <Input style={{ width: `20rem` }} placeholder="Cari Task" allowClear />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <TableCustomTask
                                        dataSource={datatasks}
                                        setDataSource={setdatatasks}
                                        columns={columnsTask}
                                        loading={loadingtasks}
                                        setpraloading={setloadingtasks}
                                        pageSize={rowstask}
                                        total={datarawtask.total}
                                        initProps={initProps}
                                        setpage={setpagetask}
                                        setdataraw={setdatarawtask}
                                    />
                                </div>
                            </div>
                        </div>
                }
            </div>
            <DrawerTaskTypesCreate
                title={"Tambah Tipe Task"}
                visible={drawertasktypecreate}
                onClose={() => { setdrawertasktypecreate(false) }}
                buttonOkText={"Simpan Tipe Task"}
                initProps={initProps}
                onvisible={setdrawertasktypecreate}
            />
            <DrawerTaskTypesUpdate
                title={"Ubah Tipe Task"}
                visible={drawertasktypupdate}
                onClose={() => { setdrawertasktypupdate(false) }}
                buttonOkText={"Simpan Tipe Task"}
                initProps={initProps}
                onvisible={setdrawertasktypupdate}
                dataDisplay={currenttipetask}
                loading={loadingtipetasks}
                id={idtasktypupdate}
            />
            <DrawerTaskCreate
                title={"Tambah Task"}
                visible={drawertaskcreate}
                onClose={() => { setdrawertaskcreate(false) }}
                buttonOkText={"Simpan Task"}
                initProps={initProps}
                onvisible={setdrawertaskcreate}
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

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "20",
        },
    }
}

export default TaskIndex
