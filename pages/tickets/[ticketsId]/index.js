import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import { useState } from 'react'
import Link from 'next/link'
import { EditOutlined, PlusCircleTwoTone } from '@ant-design/icons'
import { Select, Collapse, Button, Form, Empty, Timeline, DatePicker, notification } from 'antd'
import Layout from '../../../components/layout-dashboard-tickets'
import st from '../../../components/layout-dashboard.module.css'
import moment from 'moment'

function TicketsDetail({ initProps, dataProfile, dataIncidentList, dataTicketsList, dataSRList, type, subject_type_id, sidemenu }) {
    //Initialization
    const rt = useRouter()
    const { ticketsId } = rt.query
    const { Option, OptGroup } = Select;
    const { Panel } = Collapse
    const [updateTicketsForm] = Form.useForm()
    const pathArr = ['tickets', ticketsId]
    var incidentDetail = {}
    incidentDetail = dataIncidentList.data.filter(dataa => {
        return dataa.id == subject_type_id
    })[0]
    var ticketsDetail = {}
    ticketsDetail = dataTicketsList.data.tickets.filter(dataa => {
        return dataa.id == ticketsId
    })[0]
    var defaultduetime = ""
    var defaultdateduetime = ""
    if (ticketsDetail.due_to === null) {
        defaultduetime = Math.floor(((new Date().getTime() + (14 * 24 * 60 * 60 * 1000)) - new Date().getTime()) / (1000 * 3600 * 24))
        defaultdateduetime = new Date((new Date().getTime() + (14 * 24 * 60 * 60 * 1000))).toLocaleString()
    }
    else {
        defaultduetime = Math.floor((+ new Date(ticketsDetail.due_to).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
        defaultdateduetime = new Date(ticketsDetail.due_to).toLocaleString()
    }

    //useState
    const [tab, settab] = useState({
        requested: "block",
        child: "hidden",
        tasks: "hidden",
        assets: "hidden",
        assoc: "hidden",
        approval: "hidden",
        activities: "hidden"
    })
    const [changeduetime, setchangeduetime] = useState(false)
    const [dataduetime, setdataduetime] = useState("")
    const [loadingduetime, setloadingduetime] = useState(false)

    //onChange
    const onChangeTab = (e, jenis) => {
        if (jenis === "requested") {
            settab({ requested: "block", child: 'hidden', tasks: "hidden", assets: "hidden", assoc: "hidden", approval: "hidden", activities: "hidden" })
        }
        else if (jenis === "child") {
            settab({ requested: "hidden", child: 'block', tasks: "hidden", assets: "hidden", assoc: "hidden", approval: "hidden", activities: "hidden" })
        }
        else if (jenis === "tasks") {
            settab({ requested: "hidden", child: 'hidden', tasks: "block", assets: "hidden", assoc: "hidden", approval: "hidden", activities: "hidden" })
        }
        else if (jenis === "assets") {
            settab({ requested: "hidden", child: 'hidden', tasks: "hidden", assets: "block", assoc: "hidden", approval: "hidden", activities: "hidden" })
        }
        else if (jenis === "assoc") {
            settab({ requested: "hidden", child: 'hidden', tasks: "hidden", assets: "hidden", assoc: "block", approval: "hidden", activities: "hidden" })
        }
        else if (jenis === "approval") {
            settab({ requested: "hidden", child: 'hidden', tasks: "hidden", assets: "hidden", assoc: "hidden", approval: "block", activities: "hidden" })
        }
        else if (jenis === "activities") {
            settab({ requested: "hidden", child: 'hidden', tasks: "hidden", assets: "hidden", assoc: "hidden", approval: "hidden", activities: "block" })
        }
    }


    //handler
    const handleChangeDueTime = () => {
        const dataupdateduetime = {
            id: ticketsId,
            due_to: moment(dataduetime, 'YYYY-MM-DD')
        }
        setloadingduetime(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateTicket`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataupdateduetime)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingduetime(false)
                setchangeduetime(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/tickets/${ticketsId}?subject_type_id=${subject_type_id}&type=${type}`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }

    return (
        <Layout tok={initProps} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-7 border-t">
                <div className="col-span-5 p-5 bg-indigo-100">
                    <div className="bg-white rounded-sm w-full border border-blue-200 mb-5">
                        <div className="w-full bg-blue-100 flex justify-between items-center border-b border-blue-200 mb-5">
                            <div className="p-5 flex items-center">
                                <div className="w-10 h-10 rounded-full bg-purple-500 text-white mr-5 flex items-center justify-center">Y</div>
                                <div className="flex flex-col">
                                    {type === "Service Request" && <h1 className="text-lg font-semibold">Request dari: Andi Darussalam - <span className="text-blue-700">New CRM Account</span></h1>}
                                    {type === "Incident" && <h1 className="text-lg font-semibold">#INC {incidentDetail.id} - {incidentDetail.subject}</h1>}
                                    <h1 className="text-sm"><a href="#">Andi Darussalam</a> melaporkan 4 hari yang lalu (Sun, 7 Maret 2021 11:00 PM) via Portal</h1>
                                    <h1 className="text-sm">Request untuk: diri sendiri</h1>
                                </div>
                            </div>
                            <div className="p-5 flex justify-center">
                                <button className="w-auto h-auto border rounded px-2 pb-2 bg-white border-gray-300 hover:bg-gray-200"><EditOutlined /></button>
                            </div>
                        </div>
                        <div className="w-full p-5">
                            <div className="flex flex-wrap mb-5">
                                {tab.requested === "block" ?
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-white border-2 font-bold bg-indigo-900 cursor-pointer mr-5 mb-3">Requested Items</div>
                                    :
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-indigo-900 border-2 font-bold hover:border-gray-300 cursor-pointer mr-5 mb-3" onClick={(e) => { onChangeTab(e, "requested") }}>Requested Items</div>
                                }
                                {tab.child === "block" ?
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-white border-2 font-bold bg-indigo-900 cursor-pointer mr-5 mb-3">Child Tickets</div>
                                    :
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-indigo-900 border-2 font-bold hover:border-gray-300 cursor-pointer mr-5 mb-3" onClick={(e) => { onChangeTab(e, "child") }}>Child Tickets</div>
                                }
                                {tab.tasks === "block" ?
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-white border-2 font-bold bg-indigo-900 cursor-pointer mr-5 mb-3">Tasks</div>
                                    :
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-indigo-900 border-2 font-bold hover:border-gray-300 cursor-pointer mr-5 mb-3" onClick={(e) => { onChangeTab(e, "tasks") }}>Tasks</div>
                                }
                                {tab.assets === "block" ?
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-white border-2 font-bold bg-indigo-900 cursor-pointer mr-5 mb-3">Assets</div>
                                    :
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-indigo-900 border-2 font-bold hover:border-gray-300 cursor-pointer mr-5 mb-3" onClick={(e) => { onChangeTab(e, "assets") }}>Assets</div>
                                }
                                {tab.assoc === "block" ?
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-white border-2 font-bold bg-indigo-900 cursor-pointer mr-5 mb-3">Associations</div>
                                    :
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-indigo-900 border-2 font-bold hover:border-gray-300 cursor-pointer mr-5 mb-3" onClick={(e) => { onChangeTab(e, "assoc") }}>Associations</div>
                                }
                                {tab.approval === "block" ?
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-white border-2 font-bold bg-indigo-900 cursor-pointer mr-5 mb-3">Approval</div>
                                    :
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-indigo-900 border-2 font-bold hover:border-gray-300 cursor-pointer mr-5 mb-3" onClick={(e) => { onChangeTab(e, "approval") }}>Approval</div>
                                }
                                {tab.activities === "block" ?
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-white border-2 font-bold bg-indigo-900 cursor-pointer mr-5 mb-3">Activities</div>
                                    :
                                    <div className="w-auto h-auto px-3 py-1 rounded-r-full rounded-l-full text-indigo-900 border-2 font-bold hover:border-gray-300 cursor-pointer mr-5 mb-3" onClick={(e) => { onChangeTab(e, "activities") }}>Activities</div>
                                }
                            </div>

                            {/* Requested Items */}
                            <div className={`${tab.requested} border-2 p-5 rounded`}>
                                <div className="grid grid-cols-7 justify-items-center mb-3">
                                    <h1 className="col-span-2 font-semibold">New CRM Account</h1>
                                    <div className="col-span-2">
                                        <h1 className="text-xs">Jumlah</h1>
                                        <h1 className="text-sm">1</h1>
                                    </div>
                                    <div className="col-span-2">
                                        <h1 className="text-xs">Tahapan</h1>
                                        <Select bordered={false} defaultValue={"requested"} style={{ fontWeight: `bold` }}>
                                            <Option value="requested">Requested</Option>
                                            <Option value="delivered">Delivered</Option>
                                            <Option value="canceled">Canceled</Option>
                                            <Option value="fulfilled">Fulfilled</Option>
                                            <Option value="partialyFulfilled">Partially Fulfilled</Option>
                                        </Select>
                                    </div>
                                    <div className="col-span-1 flex justify-end">
                                        <div className="rounded-full border border-gray-50 hover:border-gray-500 w-7 h-7 flex justify-center items-center cursor-pointer">:</div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-xs font-semibold text-gray-400">Deskripsi: </h1>
                                    <div className="mb-3">
                                        Raise a request for a new username and password for access to the CRM account. If the request can be linked to any of the employee's other accounts, authorization needs to be provided.
                                    </div>
                                    <div><strong>Kapan akan menggunakan service ini?:</strong> Tue, 9 Mar, 2021 at 10:45 AM</div>
                                </div>
                            </div>

                            {/* Child Tickets */}
                            <div className={`${tab.child} grid grid-cols-2 divide-x-2`}>
                                <div className="flex justify-center items-center mr-3">
                                    <p className="text-gray-400 mb-0">Child ticket masih kosong</p>
                                </div>
                                <div className="pl-3 flex items-center">
                                    <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center"><PlusCircleTwoTone style={{ marginRight: `0.2rem`, marginTop: `0.1rem` }} /> Child baru</button>
                                </div>
                            </div>

                            {/* Tasks */}
                            <div className={`${tab.tasks} grid grid-cols-1`}>
                                <div className="flex justify-center items-center mr-3">
                                    <p className="text-gray-400 mb-0">Task masih kosong. <a href="#">Tambah baru</a></p>
                                </div>
                            </div>

                            {/* Assets */}
                            <div className={`${tab.assets} grid grid-cols-1`}>
                                <div className="flex justify-center items-center mr-3">
                                    <p className="text-gray-400 mb-0">Assets masih kosong. <a href="#">Associate Asset</a></p>
                                </div>
                            </div>

                            {/* Associations */}
                            <div className={`${tab.assoc} grid grid-cols-1`}>
                                <div className="flex flex-col justify-center items-center mr-3">
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                    <p className="text-gray-400">Associations masih kosong</p>
                                    <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center"><PlusCircleTwoTone style={{ marginRight: `0.2rem`, marginTop: `0.1rem` }} /> Tambah Associations</button>
                                </div>
                            </div>

                            {/* Approval */}
                            <div className={`${tab.approval} grid grid-cols-1`}>
                                <div className="flex justify-center items-center mr-3">
                                    <p className="text-gray-400 mb-0">Approval masih kosong. <a href="#">Request Approval</a></p>
                                </div>
                            </div>

                            {/* Activities */}
                            <div className={`${tab.activities} grid grid-cols-1`}>
                                <div className="flex items-center mr-3">
                                    <Timeline mode="alternate">
                                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                        <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                                        <Timeline.Item>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                                            beatae vitae dicta sunt explicabo.
                                        </Timeline.Item>
                                        <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                        <Timeline.Item>
                                            Technical testing 2015-09-01
                                        </Timeline.Item>
                                    </Timeline>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-span-2 bg-white">
                    <div className="px-3 py-5 flex flex-col">
                        <div className="grid grid-cols-3 mb-3">
                            <p className=" col-span-1 font-semibold">Status</p>
                            <p>Open</p>
                        </div>
                        <div className="grid grid-cols-3 mb-3">
                            <p className=" col-span-1 font-semibold">Prioritas</p>
                            <p className="flex items-center"><div className="w-3 h-3 bg-blue-500 mr-2" /> Medium</p>
                        </div>
                        <div className="grid grid-cols-3 mb-3">
                            <p className=" col-span-1 font-semibold">Approval</p>
                            <p>Not Requested</p>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className=" col-span-1 font-semibold">Batas Waktu</p>
                            <p className=" w-auto">{defaultduetime} hari lagi <br />{defaultdateduetime}</p>
                        </div>
                        <button className=" text-blue-500" onClick={() => { setchangeduetime(true) }}>Ubah</button>
                        {changeduetime ?
                            <div className="flex flex-col divide-y-2 space-y-2 shadow-md p-3">
                                <div className="flex flex-col">
                                    <p className="mb-0">Batas waktu?</p>
                                    <div>
                                        <DatePicker defaultValue={moment(ticketsDetail.due_to, "YYYY-MM-DD")} onChange={(date, dateString) => { setdataduetime(dateString) }} name="due_time" allowClear format={'YYYY-MM-DD'}></DatePicker>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-3">
                                    <Button type="default" size="middle" onClick={() => { setchangeduetime(false) }} style={{ marginRight: `0.5rem` }}>Batalkan</Button>
                                    <Button type="primary" size="middle" loading={loadingduetime} onClick={handleChangeDueTime}>Simpan</Button>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className="flex flex-col">
                        <Collapse bordered={false} defaultActiveKey={['2']}>
                            <Panel header="REQUESTER INFO" key="1">
                                <div className="flex items-center mb-2">
                                    <div className="w-10 h-10 rounded-full bg-purple-500 text-white mr-5 flex items-center justify-center">Y</div>
                                    <p className="pt-3"><a href="#">Andi Darussalam (Me)</a></p>
                                </div>
                                <p className="mb-0"><strong>Email</strong></p>
                                <p>andi@mail.com</p>
                            </Panel>
                            <Panel header="PROPERTIES" key="2">
                                <div className="flex flex-col">
                                    <div className="flex justify-end">
                                        <Button type="primary" size="middle">Update</Button>
                                    </div>
                                    <Form layout="vertical" form={updateTicketsForm}>
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <Form.Item style={{ marginRight: `0.5rem` }} label="Prioritas" name="priority" rules={[
                                                {
                                                    required: true,
                                                    message: 'Prioritas diisi!',
                                                },
                                            ]}>
                                                <Select
                                                    placeholder="Prioritas"
                                                    size="small"
                                                    defaultValue="sedang"
                                                >
                                                    <Option value="rendah"><div className="flex items-center"><div className="w-3 h-3 bg-green-600 mr-1" />Rendah</div></Option>
                                                    <Option value="sedang"><div className="flex items-center"><div className="w-3 h-3 bg-blue-600 mr-1" />Sedang</div></Option>
                                                    <Option value="tinggi"><div className="flex items-center"><div className="w-3 h-3 bg-yellow-600 mr-1" />Tinggi</div></Option>
                                                    <Option value="darurat"><div className="flex items-center"><div className="w-3 h-3 bg-red-600 mr-1" />Darurat</div></Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item style={{ marginRight: `0.5rem` }} label="Status" name="status" rules={[
                                                {
                                                    required: true,
                                                    message: 'Status diisi!',
                                                },
                                            ]}>
                                                <Select
                                                    placeholder="Pilih Status"
                                                    size="small"
                                                    defaultValue="open"
                                                >
                                                    <Option value="open">Open</Option>
                                                    <Option value="pending">Pending</Option>
                                                    <Option value="resolved">Resolved</Option>
                                                    <Option value="closed">Closed</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item style={{ marginRight: `0.5rem` }} label="Tipe" name="type" rules={[
                                                {
                                                    required: true,
                                                    message: 'Tipe diisi!',
                                                },
                                            ]}>
                                                <Select
                                                    placeholder="Pilih Tipe"
                                                    size="small"
                                                    defaultValue="serviceRequest"
                                                >
                                                    <Option value="serviceRequest">Service Request</Option>
                                                    <Option value="incident">Incident</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item style={{ marginRight: `0.5rem` }} label="Urgensi" name="urgency">
                                                <Select
                                                    placeholder="Pilih Urgensi"
                                                    size="small"
                                                >
                                                    <Option value="low">Rendah</Option>
                                                    <Option value="medium">Sedang</Option>
                                                    <Option value="high">Tinggi</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item style={{ marginRight: `0.5rem` }} label="Impact" name="impact">
                                                <Select
                                                    placeholder="Pilih Impact"
                                                    size="small"
                                                >
                                                    <Option value="low">Rendah</Option>
                                                    <Option value="medium">Sedang</Option>
                                                    <Option value="high">Tinggi</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div className="grid grid-cols-1">
                                            <Form.Item style={{ marginRight: `0.5rem` }} label="Agent" name="agent">
                                                <Select
                                                    placeholder="Pilih Agents"
                                                    size="small"
                                                >
                                                    <Option value="low">Rendah</Option>
                                                    <Option value="medium">Sedang</Option>
                                                    <Option value="high">Tinggi</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, query }) {
    const type = query.type
    const subject_type_id = query.subject_type_id
    var initProps = {};
    if (req && req.headers) {
        const cookies = req.headers.cookie;
        if (!cookies) {
            res.writeHead(302, { Location: '/' })
            res.end()
        }
        if (typeof cookies === 'string') {
            const cookiesJSON = httpcookie.parse(cookies);
            initProps = cookiesJSON.token
        }
    }
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    var dataIncidentList = []
    const dataSRList = []
    if (type === "Incident") {
        const resourcesGI = await fetch(`https://boiling-thicket-46501.herokuapp.com/getIncidents`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
        const resjsonGI = await resourcesGI.json()
        dataIncidentList = resjsonGI
    }
    // else if(type === "Service Request"){
    //     const resourcesGSR = await fetch(`https://boiling-thicket-46501.herokuapp.com/getTickets`, {
    //         method: `GET`,
    //         headers: {
    //             'Authorization': JSON.parse(initProps)
    //         }
    //     })
    //     const resjsonGSR = await resourcesGSR.json()
    //     dataIncidentList = resjsonGSR
    // }

    const resourcesGT = await fetch(`https://boiling-thicket-46501.herokuapp.com/getTickets`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGT = await resourcesGT.json()
    const dataTicketsList = resjsonGT

    return {
        props: {
            initProps,
            dataProfile,
            dataIncidentList,
            dataTicketsList,
            dataSRList,
            type,
            subject_type_id,
            sidemenu: "4"
        },
    }
}

export default TicketsDetail