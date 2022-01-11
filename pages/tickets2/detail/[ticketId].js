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

const TicketDetail = ({ dataProfile, sidemenu, initProps, ticketid }) => {
    //1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //2.useState


    //3.Handler


    //4.useEffect
    

    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const ticketid = params.ticketId
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
            sidemenu: "2",
            ticketid
        },
    }
}

export default TicketDetail
