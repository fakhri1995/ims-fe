import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'
import httpcookie from 'cookie'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import { Input, Tabs, Empty, Button, notification, Form, Divider, Checkbox } from 'antd'

function RolesCreate({ initProps, dataProfile, dataListModules, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const { TextArea } = Input;
    const { TabPane } = Tabs;
    const [instanceForm] = Form.useForm()
    const [loadingcreate, setloadingcreate] = useState(false)

    //----------CreateGroup-------------
    const [newroles, setNewroles] = useState({
        name: '',
        description: '',
        feature_ids: []
    })
    const onChangeCreateRoles = (e) => {
        var val = e.target.value
        setNewroles({
            ...newroles,
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
    const onChangeCreateCheckbox = (e, id) => {
        if (e.target.checked) {
            const temp = newroles.feature_ids
            temp.push(id)
            setNewroles({
                ...newroles,
                feature_ids: temp
            })
        }
        else {
            var temp = newroles.feature_ids
            var idx = temp.indexOf(id)
            temp.splice(idx, 1)
            setNewroles({
                ...newroles,
                feature_ids: temp
            })
        }
    }
    const handleCreateRoles = () => {
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addRole`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newroles)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setNewroles({
                        name: '',
                        description: '',
                        feature_ids: []
                    })
                    setTimeout(() => {
                        setloadingcreate(false)
                        rt.push(`/roles`)
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                    })
                    setloadingcreate(false)
                }
            })
    }
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="formAgentsWrapper">
                    <div className="col-span-1 md:col-span-4">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto ">New Role</h1>
                                <div className="flex space-x-2">
                                    <Link href="/roles?originPath=Admin" >
                                        <Button type="default" size="middle">Cancel</Button>
                                    </Link>
                                    <Button type="primary" size="middle" onClick={instanceForm.submit} loading={loadingcreate}>Save</Button>
                                </div>
                            </div>
                        </Sticky>
                    </div>
                    <Form layout="vertical" style={{ display: 'contents' }} form={instanceForm} onFinish={handleCreateRoles} initialValues={newroles}>
                        <div className=" col-span-1 md:col-span-3 flex flex-col">
                            <div className="pb-4 md:mb-0 ">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama role harus diisi',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Group Name" name={`name`} onChange={onChangeCreateRoles}></Input>
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
                                >
                                    <TextArea placeholder="Group Description" rows={2} name={`description`} onChange={onChangeCreateRoles} />
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

                            <Tabs defaultActiveKey="1" tabPosition="left">
                                {
                                    dataListModules.data.map((doc, idx) => {
                                        return (
                                            <TabPane tab={doc.name} key={idx + 1}>
                                                <div className="mb-5">
                                                    {
                                                        doc.feature !== null ?
                                                            <>
                                                                {
                                                                    doc.feature.map((doc, idx) => {
                                                                        return (
                                                                            <div key={idx} className="flex items-center hover:bg-gray-300 p-3">
                                                                                <Checkbox style={{ marginRight: `1rem` }} onChange={(e) => { onChangeCreateCheckbox(e, doc.id) }} /> {doc.name}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                                            </>
                                                    }
                                                </div>
                                            </TabPane>
                                        )
                                    })
                                }
                            </Tabs>

                            {/* <Tabs defaultActiveKey="1" tabPosition={'left'} style={{}}>
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
                            </Tabs> */}


                            {/* </div> */}
                        </div>
                    </Form>
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

    if (![176].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    const resourcesGM = await fetch(`https://boiling-thicket-46501.herokuapp.com/getModules`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGM = await resourcesGM.json()
    const dataListModules = resjsonGM

    return {
        props: {
            initProps,
            dataProfile,
            dataListModules,
            sidemenu: "4"
        },
    }
}

export default RolesCreate