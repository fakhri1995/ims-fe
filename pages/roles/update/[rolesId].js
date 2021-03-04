import Layout from '../../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import st from '../../../components/layout-dashboard.module.css'
import Form from 'antd/lib/form'
import { Input, Tabs, Tree } from 'antd'
import Divider from 'antd/lib/divider'

function RolesUpdate({ initProps, dataProfile, sidemenu, dataDetailRole }) {
    console.log(dataDetailRole)
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const { TextArea } = Input;
    const { TabPane } = Tabs;

    //----------CreateGroup-------------
    const [editroles, setEditroles] = useState({
        name: dataDetailRole.name,
        description: dataDetailRole.description
    })
    const onChangeEditRoles = (e) => {
        var val = e.target.value
        setEditroles({
            ...editroles,
            [e.target.name]: val
        })
    }
    const treeData = [
        {
            title: 'parent 1',
            key: '0-0',
            children: [
                {
                    title: 'parent 1-0',
                    key: '0-0-0',
                    // disabled: true,
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-0-0',
                            // disableCheckbox: true,
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-1',
                        },
                    ],
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',
                    children: [
                        {
                            title: (
                                <span
                                    style={{
                                        color: '#1890ff',
                                    }}
                                >
                                    sss
                                </span>
                            ),
                            key: '0-0-1-0',
                        },
                    ],
                },
            ],
        },
    ];
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <Form layout="vertical" style={{ display: 'contents' }}>
                        <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                            <Sticky containerSelectorFocus="#formAgentsWrapper">
                                <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                    <h1 className="font-semibold text-base w-auto py-2">Edit Roles</h1>
                                    <div className="flex space-x-2">
                                        <Link href="/roles?originPath=Admin" >
                                            <div className=" text-black text-sm bg-white hover:bg-gray-300 border-2 border-gray-900 cursor-pointer rounded-md h-10 py-2 w-20 text-center" >
                                                <p>
                                                    Cancel
                                        </p>
                                            </div>
                                        </Link>
                                        <button type="submit" className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-20 text-center" >
                                            <p>Save</p>
                                        </button>
                                    </div>
                                </div>
                            </Sticky>

                            {/* <div className="w-120 h-auto p-0 "> */}
                            <div className="pb-4 md:mb-0 ">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama role harus diisi',
                                        },
                                    ]}
                                    initialValue={editroles.name}
                                >
                                    <Input placeholder="Group Name" name={`name`} onChange={onChangeEditRoles}></Input>
                                </Form.Item>
                            </div>

                            <div className="pb-4 md:mb-0">
                                <Form.Item name="description" style={{ marginRight: `1rem` }} label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Deskripsi role harus diisi',
                                        },
                                    ]}
                                    initialValue={editroles.description}
                                >
                                    <TextArea placeholder="Group Description" rows={2} name={`description`} onChange={onChangeEditRoles} />
                                </Form.Item>
                            </div>

                            {/* </div> */}
                            <Divider style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }} />
                            <h1 className="font-semibold text-base w-auto p-2">Permissions</h1>
                            {/* <div className="border-gray-300 p-4 border bg-white w-full h-auto "> */}
                            {/* <Tabs defaultActiveKey="1" tabPosition={'left'} style={{ }}>
                                {[...Array.from({ length: 10 }, (v, i) => i)].map(i => (
                                <TabPane tab={`Tab-${i}`} key={i} disabled={i === 5}>
                                    Content of tab {i}
                                </TabPane>
                                ))}
                            </Tabs> */}
                            <Tabs defaultActiveKey="1" tabPosition={'left'} style={{}}>
                                <TabPane tab={`Ticket`} key={1} >
                                    <Tree
                                        checkStrictly={true}
                                        checkable
                                        defaultExpandedKeys={['0-0-0', '0-0-1']}
                                        defaultSelectedKeys={['0-0-0', '0-0-1']}
                                        defaultCheckedKeys={['0-0-0', '0-0-1']}
                                        onSelect={onSelect}
                                        onCheck={onCheck}
                                        treeData={treeData}
                                    />
                                </TabPane>
                                <TabPane tab={`Problems`} key={2} >
                                    Content of tab 2
                                </TabPane>
                                <TabPane tab={`Changes`} key={3} >
                                    Content of tab 3
                                </TabPane>
                            </Tabs>
                            {/* </div> */}
                        </div>
                    </Form>
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

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const idrole = params.rolesId
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
    var dataDetailRole
    for (let index = 0; index < data.length; index++) {
        
        if(data[index].key==idrole){
            dataDetailRole = data[index]
            break
        }else{
            dataDetailRole = "gagal"
        }
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
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    return {
        props: {
            initProps,
            dataProfile,
            dataDetailRole,
            sidemenu: "4"
        },
    }
}

export default RolesUpdate