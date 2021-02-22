import Layout from '../../components/layout-dashboard-groups'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Table from 'antd/lib/table'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import Drawer from 'antd/lib/drawer'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import Tabs from 'antd/lib/tabs'
import DownOutlined from '@ant-design/icons/DownOutlined'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'

function Groups({ initProps, dataProfile, dataGroups, sidemenu, dataDetailGroup }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    // console.log(dataGroups)

    const groups = dataGroups.data.map((doc, idx) => {
        return ({
            key: doc.id,
            name: doc.name,
            description: doc.description
        })
    })

    const [drawablecreate, setDrawablecreate] = useState(false)

    const { TabPane } = Tabs;
    function callback(key) {
        console.log(key);
      }
    const columnsDD = [
        {
            title: 'role',
            dataIndex: 'name',
            key: 'role',
            width: 800,
            render(text, record) {
                return {
                    props: {
                    style: { background: record.key%2 == 1 ? '#f2f2f2' : '#fff' },
                  },
                    children: <div><Link href={{
                            pathname: `/groups/update/agents/${record.key}`,
                            query: {
                                originPath: 'Admin'
                            }
                        }}><a>{record.name}</a></Link>
                         <p style={{fontSize:'13px'}}>{record.description}</p></div>,
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
                        style: { background: record.key%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: 
                    <Button>
                        <Link href={{
                            pathname: `/groups/update/agents/${record.key}`,
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
                        style: { background: record.key%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <Tooltip placement="topLeft" title={"Delete"}>
                    {/* {actions[index]} */}
                    <Button>
                        <Link href={{
                            pathname: `/delete/${record.key}`,
                            query: {
                                originPath: 'Admin'
                            }
                        }}><a><DeleteOutlined /></a></Link>
                    </Button>
                </Tooltip>
                }
            }
        }
    ];

    const dataAgent = [
        {
            key: '1',
            name: 'Capacity Management Team',
            agent: '4 Agents',
            actionss: 'clone'
        },
        {
            key: '2',
            name: 'Change Team',
            agent: 'No Agents',
            actionss: 'clone'
        },
        {
            key: '3',
            name: 'Database Team',
            agent: 'No Agents',
            actionss: 'clone'
        },
    ];
    const dataRequester = [
        {
            key: '1',
            name: 'Change Requesters',
            agent: '4 Agents',
            actionss: 'clone'
        },
        {
            key: '2',
            name: 'Finance Team',
            agent: 'No Agents',
            actionss: 'clone'
        },
        {
            key: '3',
            name: 'HR Team',
            agent: 'No Agents',
            actionss: 'clone'
        },
    ];

    const menu = () =>{
        return (
        <Menu style={{padding:"10px 5px"}}>
          <Menu.Item  key="0">
            <Link href={{
                                pathname: '/groups/create/agents',
                                query: {
                                    originPath: "Admin"
                                }
                            }}>Agent Group</Link>
            
          </Menu.Item>
          <Menu.Item key="1">
            <Link href="create/group-requester">Requester Group</Link>
          </Menu.Item>
        </Menu>
        )
    }
      
    return (
        <Layout tok={tok} dataDetailGroup={dataDetailGroup} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto py-2">Groups</h1>
                                <div className="flex space-x-2">
                                    <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
                                        <div className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-32 text-center" >
                                            <p onClick={e => e.preventDefault()}>
                                            Create New &nbsp;<DownOutlined style={{verticalAlign:'0.2em'}} />
                                            </p>
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>
                        </Sticky>

                        <div className="col-span-3 flex flex-col space-y-3">
                        <Tabs onChange={callback} type="card">
                            <TabPane tab="Agent Groups" key="1">
                                <Table showHeader={false} scroll={{ x: 400 }} dataSource={groups} columns={columnsDD} onRow={(record, rowIndex) => {
                                }}></Table>
                            </TabPane>
                            <TabPane tab="Requester Groups" key="2">
                                <Table showHeader={false} scroll={{ x: 400 }} dataSource={groups} columns={columnsDD} onRow={(record, rowIndex) => {
                                }}></Table>
                            </TabPane>
                        </Tabs>
                        
                        </div>


                    </div>
                    <div className="flex flex-col space-y-3 px-4">
                        <div className="font-semibold text-sm">Groups</div>
                        <p className="font-normal text-sm">
                            You can organize your agents into specific Groups like “Sales” and “Product Management”. Segmenting them into divisions lets you easily assign tickets, create specific canned responses, manage workflows and generate group-level reports. Note that the same agent can be a member of multiple groups as well
                        </p>
                        <br />
                        <div className="font-semibold text-sm">Auto-ticket Assignment</div>
                        <p className="font-normal text-sm">
                            Once you create homogeneous agent groups, you can choose to automatically assign new tickets in this group to the next agent in Round Robin. Learn more about automatic ticket assignment
                        </p>
                        <br />
                        <div className="font-semibold text-sm">Working Hours</div>
                        <p className="font-normal text-sm">
                        You can assign a different set of business hours and holidays to each Group. For example, you can separate agents by shifts and assign them different business hours, or create separate groups for each time zone your agents work at
                        </p>
                    </div>
                </div>

                <Drawer title="New Groups" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={720} footer={
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
    const resourcesGetGroups = await fetch(`https://boiling-thicket-46501.herokuapp.com/getGroups`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGetGroups = await resourcesGetGroups.json()
    const dataGroups = resjsonGetGroups

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
            dataGroups,
            dataDetailGroup,
            sidemenu: "4"
        },
    }
}

export default Groups