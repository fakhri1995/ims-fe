import Layout from '../../../components/layout-dashboardNew'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import st from '../../../components/layout-dashboard.module.css'
import { Progress, Input, notification } from 'antd'
import Buttonsys from '../../../components/button'
import { H1, H2, Label, Text } from '../../../components/typography'
import { AlerttriangleIconSvg, BackIconSvg, CalendartimeIconSvg, ClipboardcheckIconSvg, ClockIconSvg, EditIconSvg, ListcheckIconSvg, MappinIconSvg, TrashIconSvg } from '../../../components/icon'
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
    pathArr.splice(2,1)
    pathArr.push(`Task ${taskid}`)
    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            Halo ini task detail id {taskid}
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
