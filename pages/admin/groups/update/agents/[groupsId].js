import Layout from '../../../../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import st from '../../../../../components/layout-dashboard-groups.module.css'
import { Divider, Input, Select, Radio, Row, Col, Button, notification, Form } from 'antd'

function GroupsAgentsDetail({ initProps, dataProfile, dataListAccount, dataDetailGroup, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(2, 2)
    pathArr[pathArr.length - 1] = 'Edit Agents Group'
    const { originPath } = rt.query
    const [instanceForm] = Form.useForm()
    const [loadingbtn, setLoadingbtn] = useState(false)

    const [editgroup, setEditgroup] = useState({
        id: dataDetailGroup.data.group_detail.id,
        name: dataDetailGroup.data.group_detail.name,
        description: dataDetailGroup.data.group_detail.description,
        group_head: dataDetailGroup.data.group_detail.group_head,
        user_ids: dataDetailGroup.data.group_user
    })
    const onChangeEditGroup = (e) => {
        var val = e.target.value
        setEditgroup({
            ...editgroup,
            [e.target.name]: val
        })
    }
    const onChangeEditGroupHeadGroup = (value) => {
        setEditgroup({
            ...editgroup,
            ["group_head"]: value
        })
    }
    const handleChangeEditAgent = (value) => {
        setEditgroup({
            ...editgroup,
            ["user_ids"]: value
        })
    }
    function handleClick() {
        console.log(editgroup)
    }
    const handleEditGroup = () => {
        setLoadingbtn(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateAgentGroup`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editgroup)
        })
            .then(res => res.json())
            .then(res2 => {
                setLoadingbtn(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/groups/update/agents/${dataDetailGroup.data.group_detail.id}`)
                    }, 100)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    //------------------------------------------

    //----------------radio button--------------
    const [value, setValue] = useState(1);
    const onChange = e => {
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    //------------------------------------------

    //------------populate list account-------------
    const dataDD = dataListAccount.data.map((doc, idx) => {
        return ({
            value: doc.user_id,
            label: doc.fullname,
        })
    })

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    //----------------------------------------------
    const { TextArea } = Input;

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} dataDetailGroup={dataDetailGroup} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="formAgentsWrapper">
                    <div className="col-span-1 md:col-span-4">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto">Edit Group Agents</h1>
                                <div className="flex space-x-2">
                                    <Link href="/admin/groups" >
                                        <Button type="default" size="middle">Cancel</Button>
                                    </Link>
                                    {
                                        // [137].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                        <Button type="primary" size="middle" onClick={instanceForm.submit} loading={loadingbtn}>Save</Button>
                                    }
                                </div>
                            </div>
                        </Sticky>
                    </div>
                    <Form layout="vertical" onFinish={handleEditGroup} style={{ display: 'contents' }} form={instanceForm}>
                        <div className=" col-span-1 md:col-span-3 flex flex-col">
                            {/* <div className="w-120 h-auto p-0 "> */}
                            <div className="pb-4 md:mb-0 ">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Group Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama grup harus diisi',
                                        },
                                    ]}
                                    initialValue={editgroup.name}
                                >
                                    {
                                        // [137].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                            <Input placeholder="Group Name" name={`name`} onChange={onChangeEditGroup}></Input>
                                            // :
                                            // <div className="col-span-1 flex flex-col mb-5">
                                            //     <h1 className="font-semibold text-sm">Group Name:</h1>
                                            //     <h1 className="text-sm font-normal text-black">{editgroup.name}</h1>
                                            // </div>
                                    }
                                </Form.Item>
                            </div>

                            <div className="pb-4 md:mb-0">
                                <Form.Item name="description" style={{ marginRight: `1rem` }} label="Group Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Deskripsi grup harus diisi',
                                        },
                                    ]}
                                    initialValue={editgroup.description}
                                >
                                    {
                                        // [137].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                            <TextArea placeholder="Group Description" rows={2} name={`description`} onChange={onChangeEditGroup} />
                                            // :
                                            // <div className="col-span-1 flex flex-col mb-5">
                                            //     <h1 className="font-semibold text-sm">Group Description:</h1>
                                            //     <h1 className="text-sm font-normal text-black">{editgroup.description}</h1>
                                            // </div>
                                    }
                                </Form.Item>
                            </div>

                            <div className="pb-4 md:mb-0 ">
                                <Form.Item name="group_head" style={{ marginRight: `1rem` }} label="Group Head"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Ketua grup harus diisi',
                                        },
                                    ]}
                                    initialValue={editgroup.group_head}
                                >
                                    {
                                        // [137].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                            <Select showSearch placeholder="Add Group Head" name={`group_head`} showArrow options={dataDD} optionFilterProp="label" onChange={onChangeEditGroupHeadGroup} style={{ width: '100%', lineHeight: '2.4' }} />
                                            // :
                                            // <div className="col-span-1 flex flex-col mb-5">
                                            //     <h1 className="font-semibold text-sm">Group Head:</h1>
                                            //     <h1 className="text-sm font-normal text-black">{editgroup.group_head}</h1>
                                            // </div>
                                    }
                                </Form.Item>
                            </div>

                            {/* </div> */}
                            <Divider style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }} />
                            {
                                // [137].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    <>
                                        <h1 className="font-semibold text-base w-auto py-2">Agents</h1>
                                        <div className="border-gray-300 md:px-4 px-0 py-4 mb-5 border bg-white w-full h-auto ">
                                            <Radio.Group className="flex flex-col md:flex-row" row onChange={onChange} value={value}>
                                                <Radio className="flex-initial font-bold " value={1}>Add as a Member
                                                    <p className="pl-6 whitespace-normal font-normal" style={{ width: 'min-content', minWidth: '15rem' }}>Members can be assigned tickets, tasks and other items that belong to this group.</p>
                                                </Radio>
                                                <Radio disabled className="flex-initial font-bold" value={2}>Add as an Observer
                                                    <p className="pl-6 whitespace-normal font-normal" style={{ width: 'min-content', minWidth: '15rem' }}>Members can be assigned tickets, tasks and other items that belong to this group.</p>
                                                </Radio>
                                            </Radio.Group>
                                            <Row>
                                                <Col flex="auto">
                                                    <Select placeholder="Add an Agent" showArrow mode="multiple" optionFilterProp="label" onChange={handleChangeEditAgent} defaultValue={editgroup.user_ids} options={dataDD} style={{ width: '100%', padding: '0 5px', lineHeight: '2.4' }} />
                                                </Col>
                                            </Row>
                                        </div>
                                    </>
                                    // :
                                    // <Row>
                                    //     <Col flex="auto">
                                    //         <Select disabled placeholder="Add an Agent" showArrow mode="multiple" optionFilterProp="label" onChange={handleChangeEditAgent} defaultValue={editgroup.user_ids} options={dataDD} style={{ width: '100%', padding: '0 5px', lineHeight: '2.4' }} />
                                    //     </Col>
                                    // </Row>
                            }
                        </div>
                    </Form>
                    <div className={`${st.grupdesc} flex flex-col space-y-3 px-4`}>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const groupsid = params.groupsId
    const reqBodyAccountList = {
        page: 1,
        rows: 50,
        order_by: "asc"
    }
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

    //get detail profil yang login
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    // if (![136, 137].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/dashboard/admin' })
    //     res.end()
    // }

    //get data detail group
    const resourcesGetDetailGroup = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAgentGroup?id=${groupsid}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        },
    })
    const resjsonGetDetailGroup = await resourcesGetDetailGroup.json()
    const dataDetailGroup = resjsonGetDetailGroup

    //get data list akun
    const resourcesLA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAgentList`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(reqBodyAccountList)
    })
    const resjsonLA = await resourcesLA.json()
    const dataListAccount = resjsonLA

    return {
        props: {
            initProps,
            dataProfile,
            dataListAccount,
            dataDetailGroup,
            sidemenu: "423"
        },
    }
}

export default GroupsAgentsDetail