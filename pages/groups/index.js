import Layout from '../../components/layout-dashboard-groups'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import Tabs from 'antd/lib/tabs'
import DownOutlined from '@ant-design/icons/DownOutlined'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import st from '../../components/layout-dashboard-groups.module.css'
import notification from 'antd/lib/notification'
import Modal from 'antd/lib/modal'

function Groups({ initProps, dataProfile, dataGroupsAgents, dataGroupsRequesters, sidemenu, dataDetailGroup }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const { TabPane } = Tabs;
    // console.log(dataGroups)
    //--------hook modal delete group-------------
    const [warningDelete, setWarningDelete] = useState({
        istrue: false,
        key: null,
        name: ""
    })
    const onClickModalDeleteGroup = (istrue, record) => {
        setWarningDelete({
            ...warningDelete,
            ["istrue"]: istrue,
            ["key"]: record.key,
            ["name"]: record.name
        })
    }
    //-------------------------------------------

    //------------get agents groups------------------
    const groupsAgents = dataGroupsAgents.data.map((doc, idx) => {
        return ({
            idx: idx,
            key: doc.id,
            name: doc.name,
            description: doc.description
        })
    })
    //----------------------------------------------

    //----------------get requesters groups---------------
    const groupsRequesters = dataGroupsRequesters.data.map((doc, idx) => {
        return ({
            idx: idx,
            key: doc.id,
            name: doc.name,
            description: doc.description
        })
    })
    //-----------------------------------------------------

    //------------------handle delete groups-------------------
    const handleDeleteGroup = (key) => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteGroup?id=${key}`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setWarningDelete(false, null)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/groups?originPath=Admin`)
                    }, 500)
                }
                else if (!res2.success) {
                    setWarningDelete(false, null)
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

    function columns(variabel) {
        var columnsDD = []
        return (
            columnsDD = [
                {
                    title: 'role',
                    dataIndex: 'name',
                    key: 'role',
                    width: 800,
                    render(text, record) {
                        return {
                            props: {
                                style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                            },
                            children: <div><Link href={{
                                pathname: `/groups/update/` + variabel + `/${record.key}`,
                                query: {
                                    originPath: 'Admin'
                                }
                            }}><a>{record.name}</a></Link>
                                <p style={{ fontSize: '13px' }}>{record.description}</p></div>,
                        };
                    },
                },
                {
                    title: 'action', // Non-breakable space is char 0xa0 (160 dec)
                    dataIndex: 'actionss',
                    key: 'action',
                    width: 50,
                    render: (text, record, index) => {
                        return {
                            props: {
                                style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                            },
                            children:
                                <Button>
                                    <Link href={{
                                        pathname: `/groups/update/` + variabel + `/${record.key}`,
                                        query: {
                                            originPath: 'Admin'
                                        }
                                    }}><a>Edit</a></Link>
                                </Button>
                        }
                    }
                },
                {
                    title: 'action', // Non-breakable space is char 0xa0 (160 dec)
                    dataIndex: 'actionss',
                    key: 'action',
                    width: 100,
                    render: (text, record, index) => {
                        return {


                            props: {
                                style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                            },
                            children:
                                <>
                                    {/* <Tooltip placement="topLeft" title={"Delete"}> */}
                                    <Button onClick={() => { onClickModalDeleteGroup(true, record) }}>
                                        <a><DeleteOutlined /></a>
                                    </Button>

                                    {/* </Tooltip> */}
                                </>
                        }
                    }
                }
            ]
        )
    }
    const menu = () => {
        return (
            <Menu style={{ padding: "10px 5px" }}>
                <Menu.Item key="0">
                    <Link href={{
                        pathname: '/groups/create/agents',
                        query: {
                            originPath: "Admin"
                        }
                    }}>Agent Group</Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link href={{
                        pathname: '/groups/create/requesters',
                        query: {
                            originPath: "Admin"
                        }
                    }}>Requester Group</Link>
                </Menu.Item>
            </Menu>
        )
    }
    console.log
    return (
        <Layout tok={tok} dataDetailGroup={dataDetailGroup} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto py-2">Groups</h1>
                                <div className="flex space-x-2">
                                    <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
                                        {/* <div className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-32 text-center" > */}
                                        {/* <p onClick={e => e.preventDefault()}> */}
                                        <Button type="primary" size="large">
                                            Buat Groups&nbsp;<DownOutlined style={{ verticalAlign: '0.2em' }} />
                                        </Button>
                                        {/* </p> */}
                                        {/* </div> */}
                                    </Dropdown>
                                </div>
                            </div>
                        </Sticky>

                        <div className="col-span-3 flex flex-col space-y-3">
                            <Tabs type="card">
                                <TabPane tab="Agent Groups" key="1">
                                    <Table showHeader={false} scroll={{ x: 400 }} dataSource={groupsAgents} columns={columns('agents')} onRow={(record, rowIndex) => {
                                    }}></Table>
                                </TabPane>
                                <TabPane tab="Requester Groups" key="2">
                                    <Table showHeader={false} scroll={{ x: 400 }} dataSource={groupsRequesters} columns={columns('requesters')} onRow={(record, rowIndex) => {
                                    }}></Table>
                                </TabPane>
                            </Tabs>
                        </div>

                        <Modal
                            title="Konfirmasi untuk menghapus grup"
                            visible={warningDelete.istrue}
                            onOk={() => { handleDeleteGroup(warningDelete.key) }}
                            onCancel={() => setWarningDelete(false, null)}
                        >
                            Apakah anda yakin ingin menghapus grup <strong>{warningDelete.name}</strong>?
                            </Modal>
                    </div>
                    <div className="flex flex-col space-y-3 px-4">
                        <div className="font-semibold text-sm">Groups</div>
                        <p className="font-normal text-sm">
                            You can organize your agents into specific Groups like “Sales” and “Product Management”. Segmenting them into divisions lets you easily assign tickets, create specific canned responses, manage workflows and generate group-level reports. Note that the same agent can be a member of multiple groups as well
                        </p>
                        {/* <br />
                        <div className="font-semibold text-sm">Auto-ticket Assignment</div>
                        <p className="font-normal text-sm">
                            Once you create homogeneous agent groups, you can choose to automatically assign new tickets in this group to the next agent in Round Robin. Learn more about automatic ticket assignment
                        </p>
                        <br />
                        <div className="font-semibold text-sm">Working Hours</div>
                        <p className="font-normal text-sm">
                        You can assign a different set of business hours and holidays to each Group. For example, you can separate agents by shifts and assign them different business hours, or create separate groups for each time zone your agents work at
                        </p> */}
                    </div>
                </div>
            </>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
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
    const resourcesGetGroupsAgents = await fetch(`https://boiling-thicket-46501.herokuapp.com/getGroups`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGetGroupsAgents = await resourcesGetGroupsAgents.json()
    const dataGroupsAgents = resjsonGetGroupsAgents

    const resourcesGetGroupsRequesters = await fetch(`https://boiling-thicket-46501.herokuapp.com/getGroups?is_agent=false`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGetGroupsRequesters = await resourcesGetGroupsRequesters.json()
    const dataGroupsRequesters = resjsonGetGroupsRequesters

    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    const dataDetailGroup = []
    return {
        props: {
            initProps,
            dataProfile,
            dataGroupsAgents,
            dataGroupsRequesters,
            dataDetailGroup,
            sidemenu: "4"
        },
    }
}

export default Groups