import Layout from '../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import Form from 'antd/lib/form'
// import Button from 'antd/lib/button'
import Select from 'antd/lib/select'
import Upload from 'antd/lib/upload'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import Input from 'antd/lib/input'
import Sticky from 'wil-react-sticky'
import { useState, useEffect } from 'react'

function AgentsCreate({ initProps, dataProfile, sidemenu, dataCompanyList }) {
    const rt = useRouter()
    const { originPath } = rt.query
    const tok = initProps
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr[pathArr.length - 1] = "Create"

    //useEffect
    // useEffect(() => {
    //     var d = document.getElementById("widget")
    //     d.addEventListener('click', (e) => {
    //         const widget = window.Cloudinary.createUploadWidget(
    //             {
    //                 cloudName: 'aqlpeduli',
    //                 uploadPreset: 'dbmjwdin',
    //             },
    //             (error, result) => {
    //                 if (result.event === 'success') {
    //                     setNewuser({
    //                         ...newuser,
    //                         profile_image: result.info.secure_url
    //                     })
    //                 }
    //             },
    //         );
    //         widget.open()
    //     })
    // })

    //useState
    const [newuser, setNewuser] = useState({
        fullname: '',
        email: '',
        role: 0,
        phone_number: '',
        profile_image: '',
        company_id: 0
    })
    const [loadingupload, setLoadingupload] = useState(false)

    //handleCreateButton
    const handleCreateAgents = () => {
        console.log("isi new user: " + newuser.profile_image)
    }
    const onChangeCreateAgents = (e) => {
        setNewuser({
            ...newuser,
            [e.target.name]: e.target.value
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
            console.log("isi upload: " + info.fileList[0].name)
            const formData = new FormData()
            formData.append('file', info.fileList[0])
            fetch("/api/upload", {
                method: "POST",
                // headers: {
                //   "Content-Type": "multipart/form-data"
                // },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
            // const API_key = 254366153328835
            // const secret_key = 'dDZ_jO2RPnTYZ1bNA-WaFCKa2ic'
            // formData.append('upload_preset', 'dbmjwdin')
            // return fetch(`https://api.Cloudinary.com/v1_1/:aqlpeduli/image/upload?API_key=${API_key}&API_secret=${secret_key}`, {
            //     method: 'POST',
            //     body: formData
            // })
            //     .then(res => res.json())
            //     .then(res2 => {
            //         setNewuser({
            //             ...newuser,
            //             profile_image: res2.secure_url
            //         })
            //     })
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
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    // const handleUpload = (e) => {
    //     const url = `https://api.cloudinary.com/v1_1/aqlpeduli/image/upload`
    //     var img = document.querySelector('[type=file]').files[0]
    //     console.log(img.name)
    // }

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className=" col-span-1 md:col-span-1 flex md:hidden flex-col space-y-4 p-4">
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
                </div>
                <div className="col-span-1 md:col-span-3 flex flex-col" id="createAgentsWrapper">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className="flex justify-between p-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">New Agent</h1>
                            <div className="flex space-x-2">
                                <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md">Cancel</button>
                                <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md" onClick={handleCreateAgents}>Save</button>
                            </div>
                        </div>
                    </Sticky>
                    <div className="p-4 mb-14">
                        <h1 className="font-semibold mb-2">Agent type</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="md:mr-20 col-span-1 md:col-span-1">
                                <input type="radio" id="fulltime" name="agentType" /> <label htmlFor="fulltime" className="font-semibold text-xs">Full-Time</label>
                                <br />
                                <p className="text-sm">
                                    Consumes an requesters license.
                                </p>
                            </div>
                            <div className=" col-span-1 md:col-span-1">
                                <input type="radio" id="occasional" name="agentType" /> <label htmlFor="occasional" className="font-semibold text-xs">Occasional</label>
                                <br />
                                <p className="text-sm">
                                    Consumes a day pass for each day that they login.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
                        <div className="border-b border-black p-4 font-semibold mb-5">
                            Detail Akun Pengguna
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <Form layout="vertical" className="createAgentsForm" onFinish={handleCreateAgents}>
                                <div className="p-3 col-span-1 md:col-span-1">
                                    <Form.Item name="profile_image">
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
                                    </Form.Item>
                                </div>
                                <div className="p-3 col-span-1 md:col-span-3">
                                    {/* <div id="widget" className="w-28 h-28 mb-5 border-dashed border border-blue-500 rounded-md flex justify-center items-center relative cursor-pointer">
                                        <input type="file" name="uploadimg" style={{ opacity: 0, zIndex: 100, position: `absolute`, width: `100%`, height: `100%`, top: 0, left: 0, cursor: 'pointer' }} />
                                        <button onClick={handleUpload}>
                                            + Upload
                                        </button>
                                    </div> */}
                                    <Form.Item label="Nama Lengkap" required tooltip="Wajib diisi" name="fullname">
                                        <Input value={newuser} name={`fullname`} onChange={onChangeCreateAgents} style={{ width: `30rem` }} />
                                    </Form.Item>
                                    <Form.Item label="Email" required tooltip="Wajib diisi" name="email">
                                        <Input value={newuser} name={`email`} onChange={onChangeCreateAgents} style={{ width: `30rem` }} />
                                    </Form.Item>
                                    <Form.Item label="No. Handphone" name="phone_number">
                                        <Input value={newuser} name={`phone_number`} onChange={onChangeCreateAgents} style={{ width: `30rem` }} />
                                    </Form.Item>
                                    <Form.Item label="Role" name="role">
                                        <Input value={newuser} name={`role`} onChange={onChangeCreateAgents} style={{ width: `30rem` }} />
                                    </Form.Item>
                                    <Form.Item label="Company" name="company_id">
                                        <Select onChange={(value) => { setNewuser({ ...newuser, company_id: value }) }} name={`company_id`} style={{ width: `30rem` }} allowClear>
                                            <Select.Option >Choose company</Select.Option>
                                            {
                                                dataCompanyList.data.companies.map((doc, idx) => {
                                                    return (
                                                        <Select.Option title={doc.company_name} key={idx} value={doc.company_id}>{doc.company_name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                        {/* <select
                                            as="select"
                                            className="custom-select mr-sm-2 wajib selectJK"
                                            id="inlineFormCustomSelect"
                                            custom
                                            name="company_id"
                                            value={newuser.company_id} onChange={onChangeCreateAgents}
                                            style={{ color: `rgb(107, 110, 140)`, fontSize: `medium`, paddingLeft: `1rem` }}
                                        >
                                            {
                                                dataCompanyList.data.companies.map((doc, idx) => {
                                                    return (
                                                        <option key={idx} value={newuser.company_id}>{doc.company_name}</option>
                                                    )
                                                })
                                            }
                                        </select> */}
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className=" col-span-1 md:col-span-1 hidden md:flex flex-col space-y-4 p-4">
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
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    const reqBody = {
        page: 1,
        rows: 10,
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

    const resourcesGCL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyList`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const resjsonGCL = await resourcesGCL.json()
    const dataCompanyList = resjsonGCL

    return {
        props: {
            initProps,
            dataProfile,
            dataCompanyList,
            sidemenu: "4"
        }
    }
}

export default AgentsCreate