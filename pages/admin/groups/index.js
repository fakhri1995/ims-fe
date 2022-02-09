import Layout from '../../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import { Tabs, Dropdown, Menu, notification, Modal, Button, Table } from 'antd'
import st from '../../../components/layout-dashboard.module.css'

function Groups({ initProps, dataProfile, dataGroupsAgents, dataGroupsRequesters, sidemenu, dataDetailGroup }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    // const { originPath } = rt.query
    const { TabPane } = Tabs;
    // console.log(dataGroups)
    //--------hook modal delete group-------------
    const [loadingdelete, setloadingdelete] = useState(false)
    const [warningDelete, setWarningDelete] = useState({
        istrue: false,
        key: null,
        name: ""
    })
    const [warningDeleteRequester, setWarningDeleteRequester] = useState({
        istrue: false,
        key: null,
        name: ""
    })
    const onClickModalDeleteGroup = (istrue, record, type) => {
        if (type === 'agents') {
            setWarningDelete({
                ...warningDelete,
                ["istrue"]: istrue,
                ["key"]: record.key,
                ["name"]: record.name
            })
        }
        else if (type === 'requesters') {
            setWarningDeleteRequester({
                ...warningDeleteRequester,
                ["istrue"]: istrue,
                ["key"]: record.key,
                ["name"]: record.name
            })
        }
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
    const handleDeleteGroupAgent = (key) => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteAgentGroup?id=${key}`, {
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
                    setloadingdelete(false)
                    setTimeout(() => {
                        rt.push(`/admin/groups`)
                    }, 500)
                }
                else if (!res2.success) {
                    setWarningDelete(false, null)
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                    setloadingdelete(false)
                }
            })
    }
    const handleDeleteGroupRequester = (key) => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteRequesterGroup?id=${key}`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setWarningDeleteRequester(false, null)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setloadingdelete(false)
                    setTimeout(() => {
                        rt.push(`/admin/groups`)
                    }, 500)
                }
                else if (!res2.success) {
                    setWarningDeleteRequester(false, null)
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                    setloadingdelete(false)
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
                    width: 700,
                    render(text, record) {
                        return {
                            props: {
                                style: { background: record.idx % 2 == 1 ? '#f2f2f2' : '#fff' },
                            },
                            children: <div><Link href={{
                                pathname: `/admin/groups/update/` + variabel + `/${record.key}`,
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
                                <>
                                    {
                                        variabel === "agents" ?
                                            <>
                                                {
                                                    // [136, 137].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                                    <Button>
                                                        <Link href={{
                                                            pathname: `/admin/groups/update/` + "agents" + `/${record.key}`,
                                                            query: {
                                                                originPath: 'Admin'
                                                            }
                                                        }}><EditOutlined /></Link>
                                                    </Button>
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    // [141, 142].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                                    <Button>
                                                        <Link href={{
                                                            pathname: `/admin/groups/update/` + "requesters" + `/${record.key}`,
                                                            query: {
                                                                originPath: 'Admin'
                                                            }
                                                        }}><EditOutlined /></Link>
                                                    </Button>
                                                }
                                            </>
                                    }
                                </>
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
                                    {
                                        variabel === "agents"
                                            ?
                                            <>
                                                {
                                                    // [138].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                                    <Button onClick={() => { onClickModalDeleteGroup(true, record, "agents") }}>
                                                        <a><DeleteOutlined /></a>
                                                    </Button>
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    // [143].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                                    <Button onClick={() => { onClickModalDeleteGroup(true, record, "requesters") }}>
                                                        <a><DeleteOutlined /></a>
                                                    </Button>
                                                }
                                            </>
                                    }
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
                {
                    // [135].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                    <Menu.Item key="0">
                        <Link href={{
                            pathname: '/admin/groups/create/agents',
                        }}>Agent Group</Link>
                    </Menu.Item>
                }
                {
                    // [140].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                    <Menu.Item key="1">
                        <Link href={{
                            pathname: '/admin/groups/create/requesters',
                        }}>Requester Group</Link>
                    </Menu.Item>
                }
            </Menu>
        )
    }
    return (
        <Layout tok={tok} dataDetailGroup={dataDetailGroup} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-4 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-2 pt-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto py-2">Groups</h1>
                                {
                                    // [135, 140].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                    <div className="flex space-x-2">
                                        <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
                                            <Button type="primary" size="large">
                                                Add New&nbsp;<DownOutlined style={{ verticalAlign: '0.2em' }} />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                }
                            </div>
                        </Sticky>

                        {
                            // [134, 139].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                            <div className="col-span-3 flex flex-col space-y-3">
                                <Tabs type="card">
                                    {
                                        // [134].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                        <TabPane tab="Agent Groups" key="1">
                                            <Table showHeader={false} scroll={{ x: 400 }} dataSource={groupsAgents} columns={columns('agents')} onRow={(record, rowIndex) => {
                                            }}></Table>
                                        </TabPane>
                                    }
                                    {
                                        // [139].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                        <TabPane tab="Requester Groups" key="2">
                                            <Table showHeader={false} scroll={{ x: 400 }} dataSource={groupsRequesters} columns={columns('requesters')} onRow={(record, rowIndex) => {
                                            }}></Table>
                                        </TabPane>
                                    }
                                </Tabs>
                            </div>
                        }
                        <Modal
                            title="Konfirmasi untuk menghapus grup agent"
                            visible={warningDelete.istrue}
                            okButtonProps={{ disabled: loadingdelete }}
                            onOk={() => { handleDeleteGroupAgent(warningDelete.key) }}
                            onCancel={() => setWarningDelete(false, null)}
                        >
                            Apakah anda yakin ingin menghapus grup agent <strong>{warningDelete.name}</strong>?
                            </Modal>
                        <Modal
                            title="Konfirmasi untuk menghapus grup requester"
                            visible={warningDeleteRequester.istrue}
                            okButtonProps={{ disabled: loadingdelete }}
                            onOk={() => { handleDeleteGroupRequester(warningDeleteRequester.key) }}
                            onCancel={() => setWarningDeleteRequester(false, null)}
                        >
                            Apakah anda yakin ingin menghapus grup requester <strong>{warningDeleteRequester.name}</strong>?
                            </Modal>
                    </div>
                    <div className="flex flex-col space-y-3 px-4">
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
            res.writeHead(302, { Location: '/login' })
            res.end()
        }
        if (typeof cookies === 'string') {
            const cookiesJSON = httpcookie.parse(cookies);
            initProps = cookiesJSON.token
        }
    }

    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    // if (![134, 135, 136, 137, 138, 139, 140, 141, 142, 143].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/dashboard/admin' })
    //     res.end()
    // }

    const resourcesGetGroupsAgents = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAgentGroups`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGetGroupsAgents = await resourcesGetGroupsAgents.json()
    const dataGroupsAgents = resjsonGetGroupsAgents

    const resourcesGetGroupsRequesters = await fetch(`https://boiling-thicket-46501.herokuapp.com/getRequesterGroups`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGetGroupsRequesters = await resourcesGetGroupsRequesters.json()
    const dataGroupsRequesters = resjsonGetGroupsRequesters

    const dataDetailGroup = []
    return {
        props: {
            initProps,
            dataProfile,
            dataGroupsAgents,
            dataGroupsRequesters,
            dataDetailGroup,
            sidemenu: "63"
        },
    }
}

export default Groups