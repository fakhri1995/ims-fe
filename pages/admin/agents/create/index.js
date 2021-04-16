import Layout from '../../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import { LoadingOutlined } from '@ant-design/icons'
import { PlusOutlined } from '@ant-design/icons'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import st from '../../../../components/layout-dashboard.module.css'
import { Form, Upload, Input, notification, Button } from 'antd'

function AgentsCreate({ initProps, dataProfile, sidemenu }) {
    const rt = useRouter()
    const { originPath } = rt.query
    const tok = initProps
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr[pathArr.length - 1] = "Create"
    const [instanceForm] = Form.useForm();

    //useState
    const [newuser, setNewuser] = useState({
        fullname: '',
        email: '',
        // role: 2,
        phone_number: '',
        profile_image: '',
        company_id: 66
    })
    const [loadingupload, setLoadingupload] = useState(false)
    const [loadingsave, setLoadingsave] = useState(false)

    //handleCreateButton
    const handleCreateAgents = () => {
        setLoadingsave(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addAgentMember`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newuser)
        })
            .then(res => res.json())
            .then(res2 => {
                setLoadingsave(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/agents`)
                    }, 1000)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
        console.log("isi new user: " + newuser.profile_image)
    }
    const onChangeCreateAgents = (e) => {
        var val = e.target.value
        if (e.target.name === "role") {
            val = parseInt(e.target.value)
        }
        setNewuser({
            ...newuser,
            [e.target.name]: val
        })
    }

    const beforeUploadProfileImage = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const onChangeProfileImage = async (info) => {
        if (info.file.status === 'uploading') {
            setLoadingupload(true)
            return;
        }
        if (info.file.status === 'done') {
            console.log("isi upload: " + info.file.originFileObj.name)
            const formData = new FormData()
            formData.append('file', info.file.originFileObj)
            // fetch("/api/upload", {
            //     method: "POST",
            //     body: formData
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log(data);
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });
            formData.append('upload_preset', 'migsys')
            return fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(res2 => {
                    setNewuser({
                        ...newuser,
                        profile_image: res2.secure_url
                    })
                })
            //or
            // getBase64(info.file.originFileObj, (imageUrl) => {
            //     setNewuser({
            //         ...newuser,
            //         profile_image: imageUrl,
            //     })
            //     setLoadingupload(false)
            // }
            // );
        }
    }
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const uploadButton = (
        <div>
            {loadingupload ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Unggah</div>
        </div>
    );

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAgentsWrapper">
                <div className=" col-span-1 md:col-span-4">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2"></h1>
                            <div className="flex space-x-2">New agent
                                <Link href="/admin/agents">
                                    <Button type="default">Cancel</Button>
                                </Link>
                                <Button type="primary" loading={loadingsave} onClick={instanceForm.submit}>Save</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-3 flex flex-col">
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
                        <div className="border-b border-black p-4 font-semibold mb-5">
                            Detail Akun Pengguna
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-1">
                                <Upload
                                    name="profile_image"
                                    listType="picture-card"
                                    className="profileImage"
                                    showUploadList={false}
                                    beforeUpload={beforeUploadProfileImage}
                                    onChange={onChangeProfileImage}
                                >
                                    {newuser.profile_image ? <img src={newuser.profile_image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                            <div className="p-3 col-span-1 md:col-span-3">
                                <Form layout="vertical" form={instanceForm} className="createAgentsForm" onFinish={handleCreateAgents}>
                                    <Form.Item label="Nama Lengkap" required tooltip="Wajib diisi" name="fullname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama Lengkap harus diisi',
                                            },
                                        ]}>
                                        <Input value={newuser.fullname} name={`fullname`} onChange={onChangeCreateAgents} />
                                    </Form.Item>
                                    <Form.Item label="Email" required tooltip="Wajib diisi" name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Email harus diisi',
                                            },
                                        ]}>
                                        <Input value={newuser.email} name={`email`} onChange={onChangeCreateAgents} />
                                    </Form.Item>
                                    <Form.Item label="No. Handphone" name="phone_number"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'No.Handphone harus diisi',
                                            },
                                        ]}>
                                        <Input value={newuser.phone_number} name={`phone_number`} onChange={onChangeCreateAgents} />
                                    </Form.Item>
                                    {/* <Form.Item label="Role" name="role"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Role harus diisi',
                                            },
                                        ]}>
                                        <input type="number" value={newuser.role} name={'role'} onChange={onChangeCreateAgents} />
                                    </Form.Item> */}
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className=" col-span-1 md:col-span-1 hidden md:flex flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Agents</div>
                    <p className="font-normal text-xs">
                        When you add a new agent, you will have to provide the agent’s email, set their permission levels and access (full-time or occasional). Agents will receive an email with a confirmation link to activate their account after which they can be assigned to, or respond to tickets. Administrators can also edit an Agent’s profile to include the agent’s title, phone, profile picture, signature etc.
                    </p>
                    <div className="font-semibold text-base">Full-time vs Occasional Agents</div>
                    <p className=" font-normal text-xs">
                        You can choose whether your agents will need access to your support portal full-time, or will only be logging in occasionally. Occasional agents will use up a Day Pass for each day they login to your support, and you can purchase Day Passes in bulk from the Admin tab. Note that you will only be billed monthly for the number of full-time agents you add.
                    </p>
                    <div className="font-semibold text-base">Agent Groups</div>
                    <p className=" font-normal text-xs">
                        You can choose whether your agents will need access to your support portal full-time, or will only be logging in occasionally. Occasional agents will use up a Day Pass for each day they login to your support, and you can purchase Day Passes in bulk from the Admin tab. Note that you will only be billed monthly for the number of full-time agents you add.
                    </p>
                    <div className="font-semibold text-base">Agent Groups</div>
                    <p className=" font-normal text-xs">
                        Choose the tickets this agent can view and actions they can perform within the helpdesk by assigning one or more roles.
                        Note that you will not be able to modify your own roles, or delete yourself.
                    </p>
                </div> */}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    const reqBody = {
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
            initProps = cookiesJSON.token;
        }
    }

    const resources = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjson = await resources.json()
    const dataProfile = resjson

    // const resourcesGCL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyList`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(reqBody)
    // })
    // const resjsonGCL = await resourcesGCL.json()
    // const dataCompanyList = resjsonGCL

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "4"
        }
    }
}

export default AgentsCreate