import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../../components/layout-dashboard'
import st from '../../../../components/layout-dashboard.module.css'
import httpcookie from 'cookie'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import { Input, Tabs, Button, notification, Form, Divider, Checkbox, Empty, Modal } from 'antd'

function RolesUpdate({ initProps, dataProfile, sidemenu, dataRolesDetail, dataListModules, idrole }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr[pathArr.length - 1] = dataRolesDetail.data.role_detail.name
    const { originPath } = rt.query
    const { TextArea } = Input;
    const { TabPane } = Tabs;
    const [instanceForm] = Form.useForm()
    const [loadingupdate, setloadingupdate] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)
    const [modaldelete, setmodaldelete] = useState(false)
    const featureMap = dataRolesDetail.data.role_features.map((doc, idx) => {
        return (doc.feature_id)
    })

    //----------CreateGroup-------------
    const [editroles, setEditroles] = useState({
        id: dataRolesDetail.data.role_detail.id,
        name: dataRolesDetail.data.role_detail.name,
        description: dataRolesDetail.data.role_detail.description,
        feature_ids: featureMap
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
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-0-0',
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
    const onChangeUpdateCheckbox = (e, id) => {
        if (e.target.checked) {
            const temp = editroles.feature_ids
            temp.push(id)
            setEditroles({
                ...editroles,
                feature_ids: temp
            })
        }
        else {
            var temp = editroles.feature_ids
            var idx = temp.indexOf(id)
            temp.splice(idx, 1)
            setEditroles({
                ...editroles,
                feature_ids: temp
            })
        }
    }
    const handleUpdateRoles = () => {
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateRole`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editroles)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setEditroles({
                        id: 0,
                        name: '',
                        description: '',
                        feature_ids: []
                    })
                    setTimeout(() => {
                        setloadingupdate(false)
                        rt.push(`/admin/roles/${idrole}`)
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                    })
                    setloadingupdate(false)
                }
            })
    }
    const handleDeleteRoles = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteRole`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editroles.id
            })
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setloadingdelete(false)
                        rt.push(`/admin/roles`)
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                    })
                    setloadingdelete(false)
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
                                <h1 className="font-semibold text-base w-auto ">Edit Roles</h1>
                                <div className="flex space-x-2">
                                    {
                                        [178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                        <Button type="default" size="middle" onClick={() => { setmodaldelete(true) }} loading={loadingdelete} danger>Delete</Button>
                                    }
                                    <Link href="/admin/roles" >
                                        <Button type="default" size="middle">Cancel</Button>
                                    </Link>
                                    {
                                        [177].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                        <Button type="primary" size="middle" onClick={instanceForm.submit} loading={loadingupdate}>Save</Button>
                                    }
                                </div>
                            </div>
                        </Sticky>
                    </div>
                    <Form layout="vertical" style={{ display: 'contents' }} form={instanceForm} onFinish={handleUpdateRoles} initialValues={editroles}>
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
                                    {
                                        [177].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                            <Input placeholder="Role Name" name={`name`} onChange={onChangeEditRoles} defaultValue={editroles.name}></Input>
                                            :
                                            <div className="col-span-1 flex flex-col mb-5">
                                                <h1 className="font-semibold text-sm">Role Name:</h1>
                                                <h1 className="text-sm font-normal text-black">{editroles.name}</h1>
                                            </div>
                                    }
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
                                    {
                                        [177].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                            <TextArea placeholder="Description" rows={2} name={`description`} defaultValue={editroles.description} onChange={onChangeEditRoles} />
                                            :
                                            <div className="col-span-1 flex flex-col mb-5">
                                                <h1 className="font-semibold text-sm">Description:</h1>
                                                <h1 className="text-sm font-normal text-black">{editroles.description}</h1>
                                            </div>
                                    }
                                </Form.Item>
                            </div>

                            {/* </div> */}
                            <Divider style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }} />
                            {
                                [177].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    <>
                                        <h1 className="font-semibold text-base w-auto p-2">Permissions</h1>
                                        <Tabs defaultActiveKey="1" tabPosition="left">
                                            {
                                                dataListModules.data.map((doc, idx) => {
                                                    return (
                                                        <TabPane tab={doc.name} key={idx + 1}>
                                                            <div className=" overflow-y-auto h-80 mb-5">
                                                                {
                                                                    doc.feature !== null ?
                                                                        <>
                                                                            {
                                                                                doc.feature.map((doc, idx) => {
                                                                                    const checkedStatus = editroles.feature_ids.includes(doc.id)
                                                                                    return (
                                                                                        <div key={idx} className="flex items-center hover:bg-gray-300 p-3">
                                                                                            <Checkbox style={{ marginRight: `1rem` }} onChange={(e) => { onChangeUpdateCheckbox(e, doc.id) }} defaultChecked={checkedStatus} /> {doc.name}
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
                                    </>
                                    :
                                    <>
                                        <h1 className="font-semibold text-base w-auto p-2">Permissions</h1>
                                        <Tabs defaultActiveKey="1" tabPosition="left">
                                            {
                                                dataListModules.data.map((doc, idx) => {
                                                    return (
                                                        <TabPane tab={doc.name} key={idx + 1}>
                                                            <div className=" overflow-y-auto h-80 mb-5">
                                                                {
                                                                    doc.feature !== null ?
                                                                        <>
                                                                            {
                                                                                doc.feature.map((doc, idx) => {
                                                                                    const checkedStatus = editroles.feature_ids.includes(doc.id)
                                                                                    return (
                                                                                        <div key={idx} className="flex items-center hover:bg-gray-300 p-3">
                                                                                            <Checkbox disabled style={{ marginRight: `1rem` }} onChange={(e) => { onChangeUpdateCheckbox(e, doc.id) }} defaultChecked={checkedStatus} /> {doc.name}
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
                                    </>
                            }

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
                    <Modal
                        title={`Konfirmasi Hapus Role`}
                        visible={modaldelete}
                        onCancel={() => { setmodaldelete(false) }}
                        onOk={handleDeleteRoles}
                        okButtonProps={{ disabled: loadingdelete }}
                        style={{ top: `3rem` }}
                        width={500}
                        destroyOnClose={true}
                    >
                        <h1>Yakin ingin hapus module {editroles.name} ini?</h1>
                    </Modal>
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

        if (data[index].key == idrole) {
            dataDetailRole = data[index]
            break
        } else {
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

    if (![174, 177].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    const resourcesGR = await fetch(`https://boiling-thicket-46501.herokuapp.com/getRole?id=${idrole}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGR = await resourcesGR.json()
    const dataRolesDetail = resjsonGR

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
            dataRolesDetail,
            dataListModules,
            idrole,
            sidemenu: "4"
        },
    }
}

export default RolesUpdate