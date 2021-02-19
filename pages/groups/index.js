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
import Tabs from 'antd/lib/tabs'
import DownOutlined from '@ant-design/icons/DownOutlined'

function Groups({ initProps, dataProfile, dataListAccount, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query

    const text = <span>Clone</span>;
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
            render(text, record) {
                return {
                    props: {
                    style: { background: record.key%2 == 1 ? '#f2f2f2' : '#fff' },
                  },
                    children: <div>{text}</div>,
                };
            },
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
                    children: <Tooltip placement="topLeft" title={text}>
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

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto py-2">Groups</h1>
                                <div className="flex space-x-2">
                                    <div className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-32 text-center" onClick={() => { setDrawablecreate(true) }}>Create New&nbsp;<DownOutlined style={{verticalAlign:'0.05em'}}/></div>
                                </div>
                            </div>
                        </Sticky>

                        <div className="col-span-3 flex flex-col space-y-3">
                        <Tabs onChange={callback} type="card">
                            <TabPane tab="Agent Groups" key="1">
                                <Table showHeader={false} scroll={{ x: 400 }} dataSource={dataAgent} columns={columnsDD} onRow={(record, rowIndex) => {
                                }}></Table>
                            </TabPane>
                            <TabPane tab="Requester Groups" key="2">
                                <Table showHeader={false} scroll={{ x: 400 }} dataSource={dataRequester} columns={columnsDD} onRow={(record, rowIndex) => {
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

export default Groups