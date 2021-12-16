import Layout from '../../../components/layout-dashboardNew'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import st from '../../../components/layout-dashboard.module.css'
import { Select, Spin } from 'antd'
import Buttonsys from '../../../components/button'
import { H1, H2, Label, Text } from '../../../components/typography'
import { AlerttriangleIconSvg, ArrowsSortIconSvg, AssetIconSvg, BackIconSvg, CalendartimeIconSvg, CheckIconSvg, CircleXIconSvg, ClipboardcheckIconSvg, ClockIconSvg, EditIconSvg, ForbidIconSvg, ListcheckIconSvg, MappinIconSvg, PlayerPauseIconSvg, PlayerPlayIconSvg, SortAscendingIconSvg, SortDescendingIconSvg, TrashIconSvg, UserPlusIconSvg } from '../../../components/icon'
import { Chart, ArcElement, Tooltip, CategoryScale, LinearScale, LineElement, BarElement, PointElement } from 'chart.js'
Chart.register(ArcElement, Tooltip, CategoryScale, LinearScale, LineElement, BarElement, PointElement);
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { TableCustomTask, TableCustomTipeTask } from '../../../components/table/tableCustom'
import { ModalHapusTipeTask } from '../../../components/modal/modalCustom'
import DrawerTaskTypesCreate from '../../../components/drawer/tasks/drawerTaskTypesCreate'
import DrawerTaskTypesUpdate from '../../../components/drawer/tasks/drawerTaskTypesUpdate'
import DrawerTaskCreate from '../../../components/drawer/tasks/drawerTaskCreate'
import moment from 'moment'

const TaskDetail = ({ initProps, dataProfile, sidemenu, taskid }) => {
    //1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(2, 1)
    pathArr.push(`Task ${taskid}`)

    //USESTATE
    const [displaytask, setdisplaytask] = useState({
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
        users: [],
        group: [],
        inventories: [],
        task_details: [],
        reference: []
    })
    const [users2, setusers2] = useState([])
    const [praloadingtask, setpraloadingtask] = useState(false)
    const [timeleft, settimeleft] = useState({
        d: 0,
        h: 0,
        m: 0,
        s: 0
    })
    const [colorstatus, setcolorstatus] = useState({
        text: "",
        bg: "",
        border: ""
    })
    const [colorhexastatus, setcolorhexastatus] = useState("")
    //staff
    const [sortstate, setsortstate] = useState(0)
    //task detail
    //4(matriks)
    const [datatype4, setdatatype4] = useState([])
    const [datatype42, setdatatype42] = useState([])
    const [sort4state, setsort4state] = useState(0)


    //USEEFFECT
    useEffect(() => {
        setpraloadingtask(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getTask?id=${taskid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplaytask(res2.data)
                setusers2(res2.data.users)
                const data4map = res2.data.task_details.filter((docfil) => docfil.component.type === 4).map((docmap, idxmap) => {
                    var tasklistItem = docmap.component.rows.map((docmap2, idxmap2) => {
                        var colattr = {}
                        for (var i = 0; i < docmap.component.columns.length; i++) {
                            colattr[docmap.component.columns[i]] = docmap.component.values[i][idxmap2]
                        }
                        return ({
                            id: docmap.id,
                            model: docmap2,
                            ...colattr
                        })
                    })
                    return ([...tasklistItem])
                })
                setdatatype4(data4map)
                setdatatype42(data4map)
                settimeleft({
                    ...timeleft,
                    // d: Math.abs((moment.utc().diff(moment().add(res2.data.time_left.y, 'y').locale('id').format(), 'days'))) + Math.abs((moment.utc().diff(moment().add(res2.data.time_left.m, 'M').locale('id').format(), 'days'))) + res2.data.time_left.d,
                    d: res2.data.time_left.days,
                    h: res2.data.time_left.h,
                    m: res2.data.time_left.i,
                    s: res2.data.time_left.s
                })
                if (displaytask.status === 1) {
                    setcolorstatus({ text: "text-overdue", bg: "bg-overdue", border: "border-overdue" })
                    setcolorhexastatus("#BF4A40")
                }
                else if (displaytask.status === 2) {
                    setcolorstatus({ text: "text-open", bg: "bg-open", border: "border-open" })
                    setcolorhexastatus("#2F80ED")

                }
                else if (displaytask.status === 3) {
                    setcolorstatus({ text: "text-onprogress", bg: "bg-onprogress", border: "border-onprogress" })
                    setcolorhexastatus("#ED962F")

                }
                else if (displaytask.status === 4) {
                    setcolorstatus({ text: "text-onhold", bg: "bg-onhold", border: "border-onhold" })
                    setcolorhexastatus("#E5C471")

                }
                else if (displaytask.status === 5) {
                    setcolorstatus({ text: "text-completed", bg: "bg-completed", border: "border-completed" })
                    setcolorhexastatus("#6AAA70")

                }
                else if (displaytask.status === 6) {
                    setcolorstatus({ text: "text-closed", bg: "bg-closed", border: "border-closed" })
                    setcolorhexastatus("#808080")

                }
                setpraloadingtask(false)
            })
    }, [])

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className='grid grid-cols-12 px-5'>
                <div className=' col-span-9 flex flex-col'>
                    <div className='shadow-md rounded-md bg-white p-5 mb-6 mr-3 flex flex-col'>
                        <div className='flex justify-between items-center mb-10'>
                            <div className='flex items-center'>
                                <div className='mr-3 cursor-pointer' onClick={() => { rt.push(`/tasks`) }}>
                                    <BackIconSvg size={20} color={`#000000`} />
                                </div>
                                <div className='ml-3'>
                                    <H1>{displaytask.name}</H1>
                                </div>
                            </div>
                            <div className="p-2 rounded bg-red-50 text-state1 text-xs flex">
                                <div className="mr-1 flex items-center">
                                    <ClockIconSvg size={15} color={`#BF4A40`} />
                                </div>
                                Berakhir {moment(displaytask.deadline).locale('id').format('lll')}
                            </div>
                        </div>
                        <div className='flex flex-col mb-10'>
                            <div className='mb-2'>
                                <Label>Deskripsi</Label>
                            </div>
                            <div>
                                <p className='mb-0 text-sm text-gray-600'>{displaytask.description}</p>
                            </div>
                        </div>
                        <div className='flex flex-col mb-7'>
                            <div className='mb-3'>
                                <Label>Daftar Staff</Label>
                            </div>
                            <div className=' border rounded-md mb-3'>
                                <div className="grid grid-cols-12 mb-3">
                                    <div className=' col-span-1 flex items-center p-2'>
                                        <H2>No.</H2>
                                    </div>
                                    <div className=' col-span-5 flex items-center p-2'>
                                        <div className='mr-1 flex items-center cursor-pointer' onClick={() => {
                                            var temp = [...displaytask.users]
                                            var temp2 = []
                                            if (sortstate === 0)
                                                temp2 = temp.sort((a, b) => a.name > b.name ? 1 : -1)
                                            else if (sortstate === 1)
                                                temp2 = temp.sort((a, b) => a.name < b.name ? 1 : -1)
                                            else if (sortstate === -1)
                                                temp2 = users2
                                            setdisplaytask(prev => ({
                                                ...prev,
                                                users: temp2
                                            }))
                                            var tempsort = sortstate
                                            tempsort === 0 ? setsortstate(1) : null
                                            tempsort === 1 ? setsortstate(-1) : null
                                            tempsort === -1 ? setsortstate(0) : null
                                        }}>
                                            {sortstate === -1 && <SortDescendingIconSvg size={15} color={`#8f8f8f`} />}
                                            {sortstate === 0 && <ArrowsSortIconSvg size={15} color={`#CCCCCC`} />}
                                            {sortstate === 1 && <SortAscendingIconSvg size={15} color={`#8f8f8f`} />}
                                        </div>
                                        <div className='flex items-center'>
                                            <H2>Staf</H2>
                                        </div>
                                    </div>
                                    <div className=' col-span-3 flex items-center p-2'>
                                        <H2>Check In</H2>
                                    </div>
                                    <div className=' col-span-3 flex items-center p-2'>
                                        <H2>Check Out</H2>
                                    </div>
                                    {
                                        displaytask.users.map((docusers, idxusers) => (
                                            <>
                                                <div className=' col-span-1 flex items-center py-2 pl-3'>
                                                    <Text>{idxusers + 1}</Text>
                                                </div>
                                                <div className=' col-span-5 flex items-center p-2'>
                                                    <div className='mr-1 flex items-center w-10 h-10 rounded-full'>
                                                        <img src={docusers.profile_image === "-" || docusers.profile_image === "" ? "/image/staffTask.png" : docusers.profile_image} className=' object-contain' alt="" />
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <Text>{docusers.name}</Text>
                                                    </div>
                                                </div>
                                                <div className=' col-span-3 flex items-center p-2'>
                                                    <Text>{docusers.check_in === null ? `-` : moment(docusers.check_in).locale('id').format('lll')}</Text>
                                                </div>
                                                <div className=' col-span-3 flex items-center p-2'>
                                                    <Text>{docusers.check_out === null ? `-` : moment(docusers.check_out).locale('id').format('lll')}</Text>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className=' flex justify-end'>
                                <Buttonsys type={`primary`}>
                                    <div className='mb-1'>
                                        <UserPlusIconSvg size={15} color={`#ffffff`} />
                                    </div>
                                    Tambah Staff
                                </Buttonsys>
                            </div>
                        </div>
                        <div className='flex flex-col mb-7'>
                            {
                                praloadingtask ?
                                    <>
                                        <Spin />
                                    </>
                                    :
                                    displaytask.task_details.map((doctask, idxtask) => {
                                        return (
                                            <div className='flex flex-col mb-5'>
                                                <div className='mb-3'>
                                                    <p className={`font-bold text-lg text-gray-600 mb-0`}>{doctask.component.name}</p>
                                                </div>
                                                <div className='mb-3'>
                                                    <p className='mb-0 text-sm text-gray-500'>{doctask.component.description === "" ? `-` : doctask.component.description}</p>
                                                </div>
                                                <div className='mb-3 flex items-center'>
                                                    <div className='flex items-center'>
                                                        {
                                                            doctask.users.map((doctaskuser, idxtaskuser) => (
                                                                <div className=' bg-primary100 bg-opacity-10 rounded p-1 flex items-center mr-2'>
                                                                    <div className='w-6 h-6 rounded-full mr-1'>
                                                                        <img src={doctaskuser.profile_image === "-" ? "/image/staffTask.png" : doctaskuser.profile_image} alt="" className=' object-contain' />
                                                                    </div>
                                                                    <p className='mb-0 text-primary100 mr-1'>{doctaskuser.name}</p>
                                                                    <div className=' cursor-pointer flex items-center'>
                                                                        <CircleXIconSvg size={15} color={`#BF4A40`} />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div onClick={() => { }}>
                                                        <p className='mb-0 font-semibold text-sm text-primary100 hover:text-primary75 cursor-pointer'>+ Assign Staff</p>
                                                    </div>
                                                </div>
                                                {
                                                    doctask.component.type === 1 &&
                                                    <div className='mb-3 flex flex-col'>
                                                        <p className='mb-2 font-bold text-sm'>Catatan Pekerjaan</p>
                                                        <div className=' w-full rounded-md h-28 flex overflow-hidden p-2 text-gray-600 border '>
                                                            {doctask.component.values}
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    doctask.component.type === 2 &&
                                                    <div className='mb-3 flex flex-col'>
                                                        <p className='mb-2 font-bold text-sm'>Catatan Pekerjaan</p>
                                                        <div className=' w-full rounded-md flex overflow-hidden p-3 text-gray-600 border '>
                                                            {doctask.component.values}
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    doctask.component.type === 3 &&
                                                    <div className=' border rounded-md mb-3 w-full p-2'>
                                                        <div className="grid grid-cols-12 w-full">
                                                            <div className=' col-span-5 flex items-center p-2'>
                                                                <H2>Pekerjaan</H2>
                                                            </div>
                                                            <div className=' col-span-7 flex items-center p-2'>
                                                                <H2>Staf</H2>
                                                            </div>
                                                            {
                                                                doctask.component.lists.map((doc3, idx3) => (
                                                                    <>
                                                                        <div className=' col-span-5 flex items-center py-2 px-2'>
                                                                            <p className=' mb-0 text-sm text-gray-700'>{doc3}</p>
                                                                        </div>
                                                                        <div className=' col-span-7 flex items-center py-2 px-2'>
                                                                            <div className='mr-1 flex items-center'>
                                                                                {
                                                                                    doctask.component.values[idx3] ?
                                                                                        <CheckIconSvg size={18} color={`#35763B`} />
                                                                                        :
                                                                                        <ForbidIconSvg size={18} color={`#CCCCCC`} />
                                                                                }
                                                                            </div>
                                                                            <div className='flex items-center'>
                                                                                {
                                                                                    doctask.component.values[idx3] ?
                                                                                        <p className=' mb-0 text-sm text-gray-500'>Telah diceklis</p>
                                                                                        :
                                                                                        <p className=' mb-0 text-sm text-gray-500'>Belum diceklis</p>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    doctask.component.type === 4 &&
                                                    <div className=' border rounded-md mb-3 w-full p-2'>
                                                        <div className={`grid grid-cols-12 w-full`}>
                                                            <div className=' col-span-4 flex items-center p-2'>
                                                                <div className='mr-1 flex items-center cursor-pointer' onClick={() => {
                                                                    var awaltemp = datatype4.filter((docfil, idxfil) => docfil[0].id === doctask.id)[0]
                                                                    var temp = [...awaltemp]
                                                                    var temp2 = []
                                                                    if (sort4state === 0)
                                                                        temp2 = temp.sort((a, b) => a.model > b.model ? 1 : -1)
                                                                    else if (sort4state === 1)
                                                                        temp2 = temp.sort((a, b) => a.model < b.model ? 1 : -1)
                                                                    else if (sort4state === -1)
                                                                        temp2 = datatype42.filter((docfil, idxfil) => docfil[0].id === doctask.id)[0]
                                                                    setdatatype4([...[temp2]])
                                                                    var tempsort = sort4state
                                                                    tempsort === 0 ? setsort4state(1) : null
                                                                    tempsort === 1 ? setsort4state(-1) : null
                                                                    tempsort === -1 ? setsort4state(0) : null
                                                                }}>
                                                                    {sort4state === -1 && <SortDescendingIconSvg size={15} color={`#8f8f8f`} />}
                                                                    {sort4state === 0 && <ArrowsSortIconSvg size={15} color={`#CCCCCC`} />}
                                                                    {sort4state === 1 && <SortAscendingIconSvg size={15} color={`#8f8f8f`} />}
                                                                </div>
                                                                <div className='flex items-center'>
                                                                    <H2>Model</H2>
                                                                </div>
                                                            </div>
                                                            {
                                                                doctask.component.columns.map((doccol, idxcol) => (
                                                                    <div className=' col-span-1 flex items-center justify-center p-2'>
                                                                        <H2>{doccol}</H2>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        {
                                                            datatype4.filter((docfil, idxfil) => docfil[0].id === doctask.id)[0].map((doc4, idx4) => (
                                                                <div className='grid grid-cols-12'>
                                                                    <div className=' col-span-4 flex items-center py-2 px-2'>
                                                                        <p className=' mb-0 text-sm text-gray-700'>{doc4.model}</p>
                                                                    </div>
                                                                    {
                                                                        doctask.component.columns.map((doc41, idx41) => (
                                                                            <div className=' col-span-1 flex items-center justify-center py-2 px-2'>
                                                                                {
                                                                                    doc4[doc41] ?
                                                                                        <CheckIconSvg size={18} color={`#35763B`} />
                                                                                        :
                                                                                        <CheckIconSvg size={18} color={`#CCCCCC`} />
                                                                                }
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                                {
                                                    doctask.component.type === 5 &&
                                                    <div className=' border rounded-md mb-3 w-full p-2'>
                                                        <div className="grid grid-cols-12 w-full">
                                                            <div className=' col-span-4 flex items-center p-2'>
                                                                <H2>Keterangan</H2>
                                                            </div>
                                                            <div className=' col-span-2 flex items-center p-2'>
                                                                <H2>Nilai</H2>
                                                            </div>
                                                            <div className=' col-span-2 flex items-center p-2'>
                                                                <H2>Satuan</H2>
                                                            </div>
                                                        </div>
                                                        {
                                                            doctask.component.lists.map((doc3, idx3) => (
                                                                <div className='grid grid-cols-12'>
                                                                    <div className=' col-span-4 flex items-center py-2 px-2'>
                                                                        <p className=' mb-0 text-sm text-gray-700'>{doc3.description}</p>
                                                                    </div>
                                                                    <div className=' col-span-2 flex items-center py-2 px-2'>
                                                                        <p className=' mb-0 text-sm text-gray-700'>{doc3.values}</p>
                                                                    </div>
                                                                    <div className=' col-span-2 flex items-center py-2 px-2'>
                                                                        <p className=' mb-0 text-sm font-semibold text-gray-700'>{doc3.type}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                                {
                                                    doctask.component.type === 6 &&
                                                    <div className=' mb-3 flex flex-col'>
                                                        <p className=' mb-2 text-sm text-gray-800'>{doctask.component.dropdown_name}</p>
                                                        <Select style={{ width: `100%` }} placeholder="Nilai masih kosong" defaultValue={doctask.component.values === "-" ? null : doctask.component.values}>
                                                            {
                                                                doctask.component.lists.map(docmap => (
                                                                    <Select.Option>{docmap}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </div>
                                                }
                                                <div className='mb-3 flex justify-end items-center px-4'>
                                                    <div className='mr-2 cursor-pointer'>
                                                        <EditIconSvg size={20} color={`#000000`} />
                                                    </div>
                                                    <div className='ml-2 cursor-pointer'>
                                                        <TrashIconSvg size={20} color={`#000000`} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
                <div className=' col-span-3 flex flex-col'>
                    <div className={`shadow-md rounded-md ${colorstatus.bg} p-4 mb-3 ml-3 flex items-center flex-col`}>
                        <div className=' my-2 text-white'>
                            <H2>Waktu Tersisa</H2>
                        </div>
                        <div className='my-4 flex flex-col items-center'>
                            <p className='mb-1 text-4xl font-bold text-white'>
                                {timeleft.d}
                            </p>
                            <p className='text-sm mb-0 text-white'>
                                Hari
                            </p>
                        </div>
                        <div className=' my-2 flex justify-around'>
                            <div className='flex flex-col mx-3 items-center'>
                                <p className='mb-1 text-xl font-bold text-white'>
                                    {timeleft.h}
                                </p>
                                <p className='text-sm mb-0 text-white'>
                                    Jam
                                </p>
                            </div>
                            <div className='flex flex-col mx-3 items-center'>
                                <p className='mb-1 text-xl font-bold text-white'>
                                    {timeleft.m}
                                </p>
                                <p className='text-sm mb-0 text-white'>
                                    Menit
                                </p>
                            </div>
                            <div className='flex flex-col mx-3 items-center'>
                                <p className='mb-1 text-xl font-bold text-white'>
                                    {timeleft.s}
                                </p>
                                <p className='text-sm mb-0 text-white'>
                                    Detik
                                </p>
                            </div>
                        </div>
                        <div className={`mt-2 mb-3 ${colorstatus.text}`}>
                            <Buttonsys type={`primary`} color={`white`}>
                                {
                                    displaytask.status === 4 ?
                                        <>
                                            <div className='mr-1'>
                                                <PlayerPlayIconSvg size={25} color={colorhexastatus} />
                                            </div>
                                            <p className='mb-0 text-onhold'>Lanjutkan Task</p>
                                        </>
                                        :
                                        <>
                                            <div className='mr-1'>
                                                <PlayerPauseIconSvg size={25} color={colorhexastatus} />
                                            </div>
                                            <p className={`mb-0 ${colorstatus.text}`}>Lanjutkan Task</p>
                                        </>
                                }
                            </Buttonsys>
                        </div>
                    </div>
                    <div className='shadow-md rounded-md bg-white p-4 my-3 ml-3 flex flex-col'>
                        <div className='my-3 flex flex-col'>
                            <div className='mb-2'>
                                <Label>Tipe Task</Label>
                            </div>
                            <p className='mb-0 text-sm text-gray-500'>-</p>
                        </div>
                        <div className='my-3 flex flex-col'>
                            <div className='mb-2'>
                                <Label>Nomor Task</Label>
                            </div>
                            <p className='mb-0 text-sm text-gray-500'>T-000{displaytask.id}</p>
                        </div>
                        <div className='my-3 flex flex-col'>
                            <div className='mb-2'>
                                <Label>Lokasi Task</Label>
                            </div>
                            <p className='mb-0 text-sm text-gray-500'>{displaytask.location === null ? `-` : displaytask.location.full_location}</p>
                        </div>
                        <div className='my-3 flex flex-col'>
                            <div className='mb-2'>
                                <Label>Referensi Tiket (Jika ada)</Label>
                            </div>                            {
                                displaytask.reference_id === null ?
                                    `-`
                                    :
                                    <ul>
                                        {
                                            displaytask.reference.map((doc, idx) => (
                                                <li>{doc.name}</li>
                                            ))
                                        }
                                    </ul>
                            }
                        </div>
                        <div className='my-3 flex flex-col'>
                            <div className='mb-2'>
                                <Label>Pembuat Task</Label>
                            </div>
                            <div className=' flex items-center'>
                                <div className=' rounded-full w-8 h-8'>
                                    <img src={`/image/staffTask.png`} className=' object-contain' alt="" />
                                </div>
                                <p className='mb-0 text-sm text-gray-500 ml-1'>{displaytask.created_by}</p>
                            </div>
                        </div>
                        <div className='my-3 flex flex-col'>
                            <div className='mb-2'>
                                <Label>Tanggal Pembuatan</Label>
                            </div>
                            <p className='mb-0 text-sm text-gray-500'>{moment(displaytask.created_at).locale('id').format('lll')}</p>
                        </div>
                        <div className='my-5 flex flex-col items-center'>
                            <div className=' mb-3'>
                                <Buttonsys type={`default`}>
                                    <div className='mr-1 flex items-center'>
                                        <EditIconSvg size={15} color={`#35763B`} />
                                        Edit Task
                                    </div>
                                </Buttonsys>
                            </div>
                            <div className=' mb-3'>
                                <Buttonsys type={`primary`} color={`danger`}>
                                    <div className='mr-1 flex items-center'>
                                        <TrashIconSvg size={15} color={`#ffffff`} />
                                        Hapus Task
                                    </div>
                                </Buttonsys>
                            </div>
                            <div className=' mb-3'>
                                <Buttonsys type={`primary`}>
                                    <div className='mr-1 flex items-center'>
                                        <ClipboardcheckIconSvg size={15} color={`#ffffff`} />
                                        Cetak Task
                                    </div>
                                </Buttonsys>
                            </div>
                        </div>
                    </div>
                    <div className='shadow-md rounded-md bg-white p-4 mt-3 ml-3 flex flex-col'>
                        <div className='mb-3'>
                            <H1>Aset</H1>
                        </div>
                        {
                            displaytask.inventories.filter(doc => doc.is_from_task === true).map((doc, idx) => (
                                <div className='my-3 flex items-center'>
                                    <div className='mr-2 flex items-center'>
                                        <AssetIconSvg size={50} />
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <div className='mb-1 flex'>
                                            <div className='mr-1'>
                                                <H2>{doc.model_name}</H2>
                                            </div>
                                        </div>
                                        <div>
                                            <Label>{doc.mig_id} - {doc.asset_name}</Label>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <p className='my-2 text-sm text-gray-500 ml-1'>Masuk</p>
                        {
                            displaytask.inventories.filter(doc => doc.is_in !== null).length === 0 ?
                                `-`
                                :
                                displaytask.inventories.filter(doc => doc.is_in !== null).map((doc, idx) => (
                                    <div className='my-3 flex items-center'>
                                        <div className='mr-2 flex items-center'>
                                            <AssetIconSvg size={50} />
                                        </div>
                                        <div className='flex flex-col justify-center'>
                                            <div className='mb-1 flex'>
                                                <div className='mr-1'>
                                                    <H2>{doc.model_name}</H2>
                                                </div>
                                            </div>
                                            <div>
                                                <Label>{doc.mig_id} - {doc.asset_name}</Label>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                        <p className='my-2 text-sm text-gray-500 ml-1'>Keluar</p>
                        {
                            displaytask.inventories.filter(doc => doc.is_in === null && doc.is_from_task === false).length === 0 ?
                                `-`
                                :
                                displaytask.inventories.filter(doc => doc.is_in === null && doc.is_from_task === false ).map((doc, idx) => (
                                    <div className='my-3 flex items-center'>
                                        <div className='mr-2 flex items-center'>
                                            <AssetIconSvg size={50} />
                                        </div>
                                        <div className='flex flex-col justify-center'>
                                            <div className='mb-1 flex'>
                                                <div className='mr-1'>
                                                    <H2>{doc.model_name}</H2>
                                                </div>
                                            </div>
                                            <div>
                                                <Label>{doc.mig_id} - {doc.asset_name}</Label>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const taskid = params.taskId
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
            taskid
        },
    }
}

export default TaskDetail
