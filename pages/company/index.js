import Layout from '../../components/layout-dashboard-clients'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
// import Tabs from 'antd/lib/tabs'
// import Input from 'antd/lib/input'
// import Table from 'antd/lib/table'
// import Tree from 'antd/lib/tree'
// import Drawer from 'antd/lib/drawer'
// import Popconfirm from 'antd/lib/popconfirm'
// import message from 'antd/lib/message'
// import { useState } from 'react'
import EditOutlined from '@ant-design/icons/EditOutlined'
import Drawer from 'antd/lib/drawer'
import Link from 'next/link'
import { useState } from 'react'

function ClientsIndex({ initProps, dataProfile, sidemenu, dataCompanyList }) {
    const rt = useRouter()
    // const { TabPane } = Tabs;
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const eventsArr = []
    for (var i = 0; i < dataCompanyList.data.total; i++) {
        eventsArr.push(false)
    }
    const [events, setEvents] = useState(eventsArr)
    const [action, setAction] = useState(false)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const onMouseOverCells = (idx) => {
        const ev = events
        ev[idx] = true
        setEvents(ev)
        setAction("block")
        console.log("rows over: " + events[idx] + " " + idx)

    }
    const onMouseLeaveCells = (idx) => {
        const ev = events
        ev[idx] = false
        setEvents(ev)
        setAction("hidden")
        console.log("rows leave: " + events[idx] + " " + idx)
    }
    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} originPath={originPath}>
            <div className="flex justify-start md:justify-end p-3 md:border-t-2 md:border-b-2 bg-white mb-4 md:mb-8">
                <div className="flex space-x-2">
                    <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md w-40" onClick={() => { setDrawablecreate(true) }}> Create</button>
                    <Drawer title="Create Company MIG" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={720} footer={
                        <div style={{ textAlign: 'right' }}>
                            <button onClick={() => { setDrawablecreate(false) }} className="bg-white-700 hover:bg-gray-300 border text-black py-1 px-2 rounded-md w-20 mr-4">
                                Cancel
                                </button>
                            <button type="primary" className="bg-blue-700 hover:bg-blue-800 border text-white py-1 px-2 rounded-md w-20">
                                Submit
                                </button>
                        </div>
                    }></Drawer>
                </div>
            </div>
            <div className="p-5 mt-5 flex flex-col space-y-5 shadow-md rounded-md w-full h-auto bg-white">
                {
                    dataCompanyList.data.companies.map((doc, idx) => {
                        return (
                            <div className="p-4 flex items-center" onMouseOver={() => onMouseOverCells(idx)} onMouseLeave={() => onMouseLeaveCells(idx)}>
                                <img src={doc.image_logo} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full mr-8" />
                                <div className="mr-14 w-40 text-xs md:text-sm">
                                    {doc.company_name}
                                </div>
                                {
                                    events[idx] ?
                                        <> {events[idx]}
                                            <Link href={{
                                                pathname: `/company/${doc.company_id}`,
                                                query: {
                                                    originPath: 'Admin'
                                                }
                                            }}>
                                                <EditOutlined />
                                            </Link>
                                        </>
                                        :
                                        null
                                }
                            </div>
                        )
                    })
                }
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    const reqBody = {
        page: 1,
        rows: 10,
        order_by: "asc"
    }
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
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    const resourcesGCL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyList`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const resjsonGCL = await resourcesGCL.json()
    const dataCompanyList = resjsonGCL
    return {
        props: {
            initProps,
            dataProfile,
            dataCompanyList,
            sidemenu: "4"
        }
    }
}

export default ClientsIndex