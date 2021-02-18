import Layout from '../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Table from 'antd/lib/table'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import Drawer from 'antd/lib/drawer'
import CopyOutlined from '@ant-design/icons/CopyOutlined'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'


function Roles({ initProps, dataProfile, dataListAccount, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query

    const [drawablecreate, setDrawablecreate] = useState(false)

    const columnsDD = [
        {
            title: 'role',
            dataIndex: 'name',
            key: 'role',
            render(text, record) {
                return {
                    props: {
                    style: { background: record.key%2 == 1 ? '#f2f2f2' : '#fff' },
                  },
                    children: <div>{text}</div>,
                };
            },
            // sorter: (a, b) => a.user_id - b.user_id,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'nama',
            dataIndex: 'agent',
            key: 'nama',
            render(text, record) {
                return {
                    props: {
                        style: { background: record.key%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{text}</div>,
                };
            },
            // render: agent => (

            //   ),
            // sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            // sortDirections: ['descend', 'ascend'],
            // responsive: ['lg'],
        },
        {
            title: 'action', // Non-breakable space is char 0xa0 (160 dec)
            dataIndex: 'actionss',
            key: 'action',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { background: record.key%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <Tooltip placement="topLeft" title={"Clone"}>
                    {/* {actions[index]} */}
                    <Button>
                        <Link href={{
                            pathname: `/clone/${record.key}`,
                            query: {
                                originPath: 'Admin'
                            }
                        }}><a><CopyOutlined /></a></Link>
                    </Button>
                </Tooltip>
                }
            }
        }
    ];

    const data = [
        {
            key: '1',
            name: 'Account Admin',
            agent: '4 Agents',
            actionss: 'clone'
        },
        {
            key: '2',
            name: 'Admin',
            agent: 'No Agents',
            actionss: 'clone'
        },
        {
            key: '3',
            name: 'SD Supervisor',
            agent: 'No Agents',
            actionss: 'clone'
        },
    ];

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto py-2">Roles</h1>
                                <div className="flex space-x-2">
                                    <div className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-32 text-center" onClick={() => { setDrawablecreate(true) }}>New Role</div>
                                </div>
                            </div>
                        </Sticky>

                        <div className="col-span-3 flex flex-col space-y-3">

                            <Table showHeader={false} scroll={{ x: 400 }} dataSource={data} columns={columnsDD} onRow={(record, rowIndex) => {
                                // return {
                                //     onMouseOver: (event) => {
                                //         var actionsCopy = actions
                                //         actionsCopy[rowIndex] = true
                                //         setActions(actionsCopy)
                                //         setAction("block")
                                //         // console.log("row: " + actions[rowIndex] + " " + rowIndex)
                                //     },
                                //     onMouseLeave: (event) => {
                                //         var actionsCopy = actions
                                //         actionsCopy[rowIndex] = false
                                //         setActions(actionsCopy)
                                //         setAction("hidden")
                                //         // console.log("row leave: " + actions[rowIndex] + " " + rowIndex)
                                //     }
                                // }
                            }}></Table>
                        </div>


                    </div>
                    <div className="flex flex-col space-y-3 px-4">
                        <div className="font-semibold text-base">Understanding Roles</div>
                        <p className="font-normal text-base">
                            Roles allow you to create and edit access permissions for agents. You can create new roles, specify what actions agents with these roles can perform within your help desk, and assign the role to agents.
                    </p>
                        <p className="font-normal text-base">
                            For example, you can create a role for your Support Co-ordinators, allowing them to update fields and assign tickets, and even add notes internally, but not reply to customers.
                    </p>
                        <p className="font-normal text-base">
                            Once you create and save a new Role you will be able to assign it to agents when you create or edit their profile by clicking on the Agents icon under the admin tab.
                    </p>
                        <br />
                        <div className="font-semibold text-base">Admin Privileges</div>
                        <p className="font-normal text-base">
                            You can nominate whether you want an agent to have access to settings under the Admin tab. Agents with admin access can be Operation Agents with limited access, or Super Admins with the ability to edit all configurations. You can have as many Super Admins with the ability to view and modify your billing details, or as few as one.
                    </p>
                    </div>
                </div>

                <Drawer title="New Role" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={720} footer={
                    <div style={{ textAlign: 'right' }}>
                        <button onClick={() => { setDrawablecreate(false) }} className="bg-white-700 hover:bg-gray-300 border text-black py-1 px-2 rounded-md w-20 mr-4">
                            Cancel
                        </button>
                        <button type="primary" className="bg-blue-700 hover:bg-blue-800 border text-white py-1 px-2 rounded-md w-20">
                            Submit
                        </button>
                    </div>
                }>
                </Drawer>


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
    const resourcesGP = await fetch(`https://go.cgx.co.id/auth/v1/get-profile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    const resourcesLA = await fetch(`https://go.cgx.co.id/admin/v1/get-list-account?page=1&rows=50&order_by=asc`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonLA = await resourcesLA.json()
    const dataListAccount = resjsonLA
    return {
        props: {
            initProps,
            dataProfile,
            dataListAccount,
            sidemenu: "4"
        },
    }
}

export default Roles