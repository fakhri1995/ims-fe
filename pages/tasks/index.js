import Layout from '../../components/layout-dashboardNew'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import st from '../../components/layout-dashboard.module.css'
import Link from 'next/link'
import { Progress, Input } from 'antd'
import Buttonsys from '../../components/button'
import { H1, H2, Label, Text } from '../../components/typography'
import { AlerttriangleIconSvg, CalendartimeIconSvg, ClipboardcheckIconSvg, ClockIconSvg, EditIconSvg, ListcheckIconSvg, MappinIconSvg } from '../../components/icon'
import { Chart, ArcElement, Tooltip, CategoryScale, LinearScale, LineElement, BarElement, PointElement } from 'chart.js'
Chart.register(ArcElement, Tooltip, CategoryScale, LinearScale, LineElement, BarElement, PointElement);
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import moment from 'moment'

const TaskIndex = ({ initProps, dataProfile, sidemenu }) => {
    //1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //2. columns table
    const datadummies = [
        {
            task_id: `T-00001`,
            task_type: `Insiden Aset`,
            task_title: `Perbaikan ATM H2VLL`,
            task_deadline: moment(new Date()).locale('id').format("LL"),
            task_staff: [`Bintang`],
            task_loc: `Wilayah 1`,
            task_status: `Overdue`
        },
        {
            task_id: `T-00002`,
            task_type: `Insiden Aset 2`,
            task_title: `Perbaikan ATM HGNKK`,
            task_deadline: moment(new Date()).locale('id').format("LL"),
            task_staff: [`Bintang`,`Yues`],
            task_loc: `Wilayah 1`,
            task_status: `Overdue`
        },
        {
            task_id: `T-00001`,
            task_type: `Insiden Aset`,
            task_title: `Perbaikan ATM H2VLL`,
            task_deadline: moment(new Date()).locale('id').format("LL"),
            task_staff: [`Bintang`],
            task_loc: `Wilayah 1`,
            task_status: `Overdue`
        }
    ]
    const columns1 = [
        {
            title: 'No',
            dataIndex: 'num',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {/* {datarawrelasi.from + index} */}
                            {index+1}
                        </>
                }
            }
        },
        {
            title: 'Nomor Task',
            dataIndex: 'task_id',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.model_name}
                        </>
                }
            },
            sorter: (a, b) => a.mig_id - b.mig_id,
        },
        {
            title: 'Lokasi',
            dataIndex: 'location_inventory',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.location_name}
                        </>
                }
            }
        },
    ]

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className="flex flex-col" id="mainWrapper">
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
                                                '#E5C471',
                                                '#BF4A40',
                                                '#ED962F',
                                                '#2F80ED',
                                                '#6AAA70',
                                                '#EE6DD9',
                                            ],
                                            borderColor: [
                                                '#E5C471',
                                                '#BF4A40',
                                                '#ED962F',
                                                '#2F80ED',
                                                '#6AAA70',
                                                '#EE6DD9',
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
                            <div className="flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2">
                                <div className="flex p-1 bg-primary10 rounded mr-3">
                                    <ClipboardcheckIconSvg size={35} color={`#35763B`} />
                                </div>
                                <div className="flex flex-col">
                                    <H2>Tambah Task</H2>
                                    <Label>Error, PM, Instalasi, Perbaikan, Upgrade Sistem, dll. </Label>
                                </div>
                            </div>
                            <div className="flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2">
                                <div className="flex p-1 bg-primary10 rounded mr-3">
                                    <ListcheckIconSvg size={35} color={`#35763B`} />
                                </div>
                                <div className="flex flex-col">
                                    <H2>Tambah Tipe Task</H2>
                                    <Label>Tambah tipe task baru</Label>
                                </div>
                            </div>
                            <div className="flex items-center mb-4 cursor-pointer hover:bg-backdrop p-2">
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

                        </div>
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

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "20",
        },
    }
}

export default TaskIndex
