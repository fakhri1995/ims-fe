import Layout from '../../../../components/layout-dashboard-groups'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import Divider from 'antd/lib/divider'
import { Input } from 'antd'
import { Select } from 'antd'
import { Radio } from 'antd'
import Button from 'antd/lib/button'
import { Row, Col } from 'antd'
import notification from 'antd/lib/notification'
import st from '../../../../components/layout-dashboard-groups.module.css'
import Form from 'antd/lib/form'

function GroupsRequestersCreate({ initProps, dataProfile, dataListAccount, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const dataDetailGroup = []
    const [instanceForm] = Form.useForm()
    const [loadingbtn, setLoadingbtn] = useState(false)

    //----------CreateGroup-------------
    const [newgroup, setNewgroup] = useState({
        name: '',
        description: '',
        group_head: dataProfile.data.user_id,
        is_agent: false,
        user_ids: []
    })
    const onChangeCreateGroup = (e) => {
        var val = e.target.value
        setNewgroup({
            ...newgroup,
            [e.target.name]: val
        })
    }
    const onChangeCreateGroupHeadGroup = (value) => {
        setNewgroup({
            ...newgroup,
            ["group_head"]: value
        })
    }
    //------------add agent---------------
    const handleChangeAddAgent = (value) => {
        setNewgroup({
            ...newgroup,
            ["user_ids"]: value
        })
    }
    function handleClick() {
        console.log(newgroup)
        // console.log(`selected ${value}`);
    }
    //----------------------------------------------
    const handleCreateGroup = () => {
        setLoadingbtn(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addGroup`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newgroup)
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
                        rt.push(`/groups?originPath=Admin`)
                    }, 100)
                }
                else if (!res2.success) {
                    notification['error']({
                        // message: res2.message.errorInfo[3],
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
    const dataDD = dataListAccount.data.accounts.map((doc, idx) => {
        return ({
            value: doc.user_id,
            label: doc.fullname,
        })
    })
    //----------------------------------------------
    const { TextArea } = Input;

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} dataDetailGroup={dataDetailGroup} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <Form layout="vertical" onFinish={handleCreateGroup} style={{ display: 'contents' }} form={instanceForm}>
                        <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                            <Sticky containerSelectorFocus="#formAgentsWrapper">
                                <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                    <h1 className="font-semibold text-base w-auto py-2">Group Requesters Baru</h1>
                                    <div className="flex space-x-2">
                                        <Link href="/groups?originPath=Admin" >
                                            <Button type="default" size="middle">Batalkan</Button>
                                            {/* <div className=" text-black text-sm bg-white hover:bg-gray-300 border-2 border-gray-900 cursor-pointer rounded-md h-10 py-2 w-20 text-center" >
                                        <p>Cancel</p>
                                    </div> */}
                                        </Link>
                                        <Button type="primary" size="middle" onClick={instanceForm.submit} loading={loadingbtn}>Simpan</Button>
                                        {/* <button type="submit" className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-20 text-center" >
                                            <p>Save</p>
                                        </button> */}
                                    </div>
                                </div>
                            </Sticky>

                            {/* <div className="w-120 h-auto p-0 "> */}
                            <div className="pb-4 md:mb-0 ">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Group Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama grup harus diisi',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Group Name" value={newgroup.name} name={`name`} onChange={onChangeCreateGroup}></Input>
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
                                >
                                    <TextArea placeholder="Group Description" rows={2} value={newgroup.description} name={`description`} onChange={onChangeCreateGroup} />
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
                                    initialValue={newgroup.group_head}
                                >
                                    <Select showSearch placeholder="Add Group Head" name={`group_head`} showArrow options={dataDD} onChange={onChangeCreateGroupHeadGroup} style={{ width: '100%', lineHeight: '2.4' }} />
                                </Form.Item>
                            </div>

                            {/* </div> */}
                            <Divider style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }} />
                            <h1 className="font-semibold text-base w-auto py-2">Agents</h1>
                            <div className="border-gray-300 p-4 border bg-white w-full h-auto ">
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
                                        <Select showSearch placeholder="Add an Agent" showArrow mode="multiple" options={dataDD} onChange={handleChangeAddAgent} style={{ width: '100%', padding: '0 5px', lineHeight: '2.4' }} />
                                    </Col>
                                    {/* <Col flex="100px">
                                    <div className=" text-black text-sm bg-white hover:bg-gray-300 border border-gray-900 cursor-pointer rounded-md h-10 py-2 w-20 text-center" >
                                        <p onClick={handleClick}>
                                        Add
                                        </p>
                                    </div>
                                </Col> */}
                                </Row>
                            </div>
                        </div>
                    </Form>
                    <div className={`${st.grupdesc} flex flex-col space-y-3 px-4`}>
                        <div className="font-semibold text-base">Groups</div>
                        <p className="font-normal text-base">
                            You can organize your agents into specific Groups like “Sales” and “Product Management”. Segmenting them into divisions lets you easily assign tickets, create specific canned responses, manage workflows and generate group-level reports. Note that the same agent can be a member of multiple groups as well
                        </p>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    const reqBodyAccountList = {
        page: 1,
        rows: 50,
        order_by: "asc"
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

    const resourcesLA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAccountList`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBodyAccountList)
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

export default GroupsRequestersCreate