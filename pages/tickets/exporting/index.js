import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Table, Input, DatePicker, Select, Checkbox } from 'antd'
import Layout from '../../../components/layout-dashboard2'
import moment from 'moment'
import st from '../../../components/layout-dashboard.module.css'


const TicketExporting = ({ initProps, dataProfile, sidemenu }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)

    //useState
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
            })
    }, [])

    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className=" w-full grid grid-cols-1 md:grid-cols-4 border-gray-400 bg-white mb-5 px-4 py-5">
                <div className=" col-span-1 md:col-span-3 flex items-center mb-2 md:mb-0">
                    <div className="font-bold text-2xl w-auto">Export Tickets</div>
                </div>
                <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                    <Button size="large" onClick={() => { rt.push(`/tickets`) }} type="default" style={{ marginRight: `1rem` }}>
                        Batal
                    </Button>
                    <Button size="large" type="primary" style={{ marginRight: `1rem` }}>
                        Unduh
                    </Button>
                </div>
            </div>
            <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
                <div className="md:col-span-5 col-span-1 flex flex-col py-3">
                    <h1 className="font-semibold text-base mb-3">Filter Ticket by</h1>
                    <div className="border shadow-md rounded-md flex flex-col p-5 mb-9 w-9/12">
                        <div className="flex flex-col mb-3">
                            <h1 className="text-sm font-semibold mb-0">Item</h1>
                            <DatePicker.RangePicker></DatePicker.RangePicker>
                        </div>
                        <div className="flex flex-col mb-3">
                            <p className="mb-0 font-semibold text-sm">Group</p>
                            <Select onChange={(value) => { setto(value) }}>
                                {
                                    ticketrelations.requesters.map((doc, idx) => {
                                        return (
                                            <Select.Option value={doc.user_id}>{doc.fullname}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="flex flex-col mb-3">
                            <p className="mb-0 font-semibold text-sm">Engineer</p>
                            <Select onChange={(value) => { setto(value) }}>
                                {
                                    ticketrelations.requesters.map((doc, idx) => {
                                        return (
                                            <Select.Option value={doc.user_id}>{doc.fullname}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-5 col-span-1 flex flex-col py-3">
                    <h1 className="font-semibold text-base mb-3">Export Field</h1>
                    <Checkbox style={{marginBottom:`0.5rem`}}>
                        Select All Field
                    </Checkbox>
                    <Checkbox.Group>
                        <div className=" w-9/12 grid grid-cols-1 md:grid-cols-3">
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Nama Pembuat</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Ticket Type</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Assign To</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Lokasi Pembuat</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Status Ticket</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Problem</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Data Raised Ticket</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Jenis Produk</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Lokasi Problem</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Data Closed Ticket</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>ID Produk</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Waktu Kejadian</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Resolved Time</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Nama PIC</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Deskripsi Kejadian</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Ticket Number</Checkbox>
                            <Checkbox style={{ marginBottom: `0.5rem`, marginLeft: `0rem` }}>Kontak PIC</Checkbox>
                        </div>
                    </Checkbox.Group>
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

export default TicketExporting
