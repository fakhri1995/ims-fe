import Layout from '../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Table from 'antd/lib/table'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import CopyOutlined from '@ant-design/icons/CopyOutlined'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import st from '../../components/layout-dashboard.module.css'


function Roles({ initProps, dataProfile, sidemenu }) {
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
                    children: <div><Link href={{
                        pathname: `/roles/update/${record.key}`,
                        query: {
                            originPath: 'Admin'
                        }
                    }}><a>{record.name}</a></Link>
                     <p style={{fontSize:'13px'}}>{record.description}</p></div>,
                    
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
            key: 1,
            name: 'Account Admin',
            description: 'Admin Tamvan',
            agent: '4 Agents',
            actionss: 'clone'
        },
        {
            key: 2,
            name: 'Admin',
            description: 'Saya Tamvan',
            agent: 'No Agents',
            actionss: 'clone'
        },
        {
            key: 3,
            name: 'SD Supervisor',
            description: 'Saya Tamvan Sekali',
            agent: 'No Agents',
            actionss: 'clone'
        },
    ];

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto py-2">Roles</h1>
                                <div className="flex space-x-2">
                                    <Link href="/roles/create">
                                        <Button type="primary" size="large">Tambah Role</Button>
                                        {/* <div className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-32 text-center" >New Role</div> */}
                                    </Link>
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
                        <div className="font-semibold text-sm">Understanding Roles</div>
                        <p className="font-normal text-sm">
                            Roles allow you to create and edit access permissions for agents. You can create new roles, specify what actions agents with these roles can perform within your help desk, and assign the role to agents.
                    </p>
                        <p className="font-normal text-sm">
                            For example, you can create a role for your Support Co-ordinators, allowing them to update fields and assign tickets, and even add notes internally, but not reply to customers.
                    </p>
                        <p className="font-normal text-sm">
                            Once you create and save a new Role you will be able to assign it to agents when you create or edit their profile by clicking on the Agents icon under the admin tab.
                    </p>
                        <br />
                        <div className="font-semibold text-sm">Admin Privileges</div>
                        <p className="font-normal text-sm">
                            You can nominate whether you want an agent to have access to settings under the Admin tab. Agents with admin access can be Operation Agents with limited access, or Super Admins with the ability to edit all configurations. You can have as many Super Admins with the ability to view and modify your billing details, or as few as one.
                    </p>
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
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
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
            sidemenu: "4"
        },
    }
}

export default Roles