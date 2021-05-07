import { useRouter } from 'next/router'
import Layout from '../../../../components/layout-dashboard'
import httpcookie from 'cookie'
import EditOutlined from '@ant-design/icons/EditOutlined'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import Sticky from 'wil-react-sticky'
import { useState } from 'react'
import Link from 'next/link'
import st from '../../../../components/layout-dashboard.module.css'
import { Button, Form, Input, notification, Modal, Switch, Select } from 'antd'

function AgentsDetail({ initProps, dataProfile, dataDetailAgent, dataRoles, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr[pathArr.length - 1] = dataDetailAgent.data.fullname
    const [loadingfoto, setLoadingfoto] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visiblenon, setVisiblenon] = useState(false)
    const [visibleubahpass, setVisibleubahpass] = useState(false)
    const [loadingsave, setLoadingsave] = useState(false)
    const [loadingubahpass, setloadingubahpass] = useState(false)
    const [loadingubahaktif, setloadingubahaktif] = useState(false)
    const [loadingubahnonaktif, setloadingubahnonaktif] = useState(false)
    const [instanceForm] = Form.useForm();
    const { Option } = Select
    console.log(dataDetailAgent.data.feature_roles)
    const [datapass, setDatapass] = useState({
        user_id: dataDetailAgent.data.user_id,
        new_password: ''
    })
    const [data1, setData1] = useState({
        id: dataDetailAgent.data.user_id,
        fullname: dataDetailAgent.data.fullname,
        role: dataDetailAgent.data.role,
        phone_number: dataDetailAgent.data.phone_number,
        profile_image: dataDetailAgent.data.profile_image
    })
    const [datarole, setdatarole] = useState({
        account_id: dataDetailAgent.data.user_id,
        role_ids: [dataDetailAgent.data.feature_roles[0]]
    })
    const onChangeRole = (value) => {
        //multiple roles
        // const arr = datarole.role_ids
        //single roles
        const arr = []
        arr.push(value)
        setdatarole({
            ...datarole,
            role_ids: arr
        })
    }
    const onChangeEditAgents = (e) => {
        setData1({
            ...data1,
            [e.target.name]: e.target.value
        })
    }
    const onChangeEditFoto = async (e) => {
        setLoadingfoto(true)
        const foto = e.target.files
        const formdata = new FormData()
        formdata.append('file', foto[0])
        formdata.append('upload_preset', 'migsys')
        const fetching = await fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
            method: 'POST',
            body: formdata
        })
        const datajson = await fetching.json()
        setData1({
            ...data1,
            profile_image: datajson.secure_url
        })
        setLoadingfoto(false)
    }
    const handleSubmitEditAccount = () => {
        setLoadingsave(true)
        if (dataProfile.data.registered_feature.includes(132)) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/updateFeatureAgent`, {
                method: 'POST',
                headers: {
                    'Authorization': JSON.parse(tok),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datarole)
            })
                .then(res => res.json())
                .then(res2 => {
                    setLoadingsave(false)
                })
        }
        if (dataProfile.data.registered_feature.includes(110)) {
            fetch(`https://boiling-thicket-46501.herokuapp.com/updateAgentDetail`, {
                method: 'POST',
                headers: {
                    'Authorization': JSON.parse(tok),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data1)
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
                            rt.push(`/admin/agents/${dataDetailAgent.data.user_id}`)
                        }, 1000)
                    }
                    else if (!res2.success) {
                        notification['error']({
                            message: res2.message.errorInfo.status_detail,
                            duration: 3
                        })
                    }
                })
        }
    }
    const handleActivationAgents = (status) => {
        var keaktifan = false
        if (status === "aktif") {
            keaktifan = false
            setloadingubahaktif(true)
        }
        else if (status === "nonAktif") {
            keaktifan = true
            setloadingubahnonaktif(true)
        }
        fetch(`https://boiling-thicket-46501.herokuapp.com/agentActivation`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: dataDetailAgent.data.user_id,
                is_enabled: keaktifan
            })
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setVisible(false)
                    setVisiblenon(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        if (status === "aktif") {
                            setloadingubahaktif(false)
                        }
                        else if (status === "nonAktif") {
                            setloadingubahnonaktif(false)
                        }
                        rt.push(`/admin/agents/${dataDetailAgent.data.user_id}`)
                    }, 500)
                }
                else if (!res2.success) {
                    setVisible(false)
                    setVisiblenon(false)
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const handleUbahPassword = () => {
        setloadingubahpass(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/changeAgentPassword`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datapass)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setVisibleubahpass(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setloadingubahpass(false)
                        rt.push(`/admin/agents/${dataDetailAgent.data.user_id}`)
                    }, 500)
                }
                else if (!res2.success) {
                    setloadingubahpass(false)
                    setVisibleubahpass(false)
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} dataDetailAccount={dataDetailAgent} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="formAgentsWrapper">
                <div className=" col-span-1 md:col-span-4">
                    <Sticky containerSelectorFocus="#formAgentsWrapper">
                        <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">Edit Agents</h1>
                            <div className="flex space-x-2">
                                <Link href={`/admin/agents`}>
                                    <Button type="default">
                                        Cancel
                                    </Button>
                                </Link>
                                {
                                    [110, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                        <Button type="primary" loading={loadingsave} onClick={instanceForm.submit}>Save</Button>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className=" col-span-1 md:col-span-3 flex flex-col">
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-8">
                        <div className="border-b border-black p-4 font-semibold mb-5 flex">
                            <div className="md:mr-5 pt-1">Detail Akun Agents</div>
                            {/* {
                                dataDetailAccount.data.data.attribute.is_enabled ?
                                    <div className=" bg-blue-100 text-blue-600 border-blue-600 border py-1 px-3 rounded-md w-auto md:mr-5">AKUN AKTIF</div>
                                    :
                                    <div className=" bg-red-100 text-red-600 border-red-600 border py-1 px-3 rounded-md w-auto md:mr-5">AKUN NON-AKTIF</div>
                            } */}
                            {
                                [112].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    <div className="pt-1">
                                        {
                                            dataDetailAgent.data.attribute.is_enabled ?
                                                <Switch checked={true} onChange={() => { setVisible(true) }} checkedChildren={"AKTIF"}></Switch>
                                                :
                                                <Switch checked={false} onChange={() => { setVisiblenon(true) }} unCheckedChildren={"NON-AKTIF"}></Switch>
                                        }
                                    </div>
                                    :
                                    <div className="pt-1">
                                        {
                                            dataDetailAgent.data.attribute.is_enabled ?
                                                <Switch disabled checked={true} onChange={() => { setVisible(true) }} checkedChildren={"AKTIF"}></Switch>
                                                :
                                                <Switch disabled checked={false} onChange={() => { setVisiblenon(true) }} unCheckedChildren={"NON-AKTIF"}></Switch>
                                        }
                                    </div>
                            }
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-1 relative flex flex-col items-center">
                                <img src={data1.profile_image} className=" object-cover w-32 h-32 rounded-full mb-4" />
                                {
                                    [110].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                    <label className="custom-file-upload py-2 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3">
                                        <input type="file" style={{ display: `none` }} name="profile_image" onChange={onChangeEditFoto} />
                                        {loadingfoto ? <LoadingOutlined /> : <EditOutlined style={{ fontSize: `1.2rem` }} />}
                                        Ganti Foto
                                </label>
                                }
                                {
                                    [111].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                    <div className="w-full h-auto">
                                        <button className=" w-full h-auto py-2 text-center bg-primary hover:bg-secondary text-white rounded-sm" onClick={() => { setVisibleubahpass(true) }}>
                                            Ubah Password
                                        </button>
                                    </div>
                                }
                            </div>
                            <div className="p-3 col-span-1 md:col-span-3">
                                <h1 className="text-xs text-gray-600 mb-1">Email:</h1>
                                <h1 className="text-sm text-black mb-5">{dataDetailAgent.data.email}</h1>
                                <div className="flex flex-col mb-5">
                                    <h1 className="text-sm">ID</h1>
                                    <h1 className="text-sm font-semibold">{data1.id}</h1>
                                </div>
                                <Form layout="vertical" form={instanceForm} onFinish={handleSubmitEditAccount} initialValues={data1}>
                                    <Form.Item label="Nama Lengkap" name="fullname" required tooltip="Wajib diisi"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama Lengkap harus diisi',
                                            },
                                        ]}>
                                        {
                                            [110].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                                <Input defaultValue={data1.fullname} onChange={onChangeEditAgents} name="fullname" required />
                                                :
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">Nama Lengkap:</h1>
                                                    <h1 className="text-sm font-normal text-black">{data1.fullname}</h1>
                                                </div>
                                        }
                                    </Form.Item>
                                    <Form.Item label="No. Handphone" name="phone_number" required tooltip="Wajib diisi"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'No. Handphone harus diisi',
                                            },
                                        ]}>
                                        {
                                            [110].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                                <Input defaultValue={data1.phone_number} onChange={onChangeEditAgents} name="phone_number" />
                                                :
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">Nomor Telepon:</h1>
                                                    <h1 className="text-sm font-normal text-black">{data1.phone_number}</h1>
                                                </div>
                                        }
                                    </Form.Item>
                                    <h1 className="font-semibold">Role:</h1>
                                    {
                                        [132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                            <Select onChange={(value) => { onChangeRole(value) }} defaultValue={datarole.role_ids} style={{ width: `100%` }}>
                                                {
                                                    dataRoles.data.map((doc, idx) => {
                                                        return (
                                                            <Option key={idx} value={doc.id}>{doc.name}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            :
                                            <Select disabled onChange={(value) => { onChangeRole(value) }} defaultValue={datarole.role_ids} style={{ width: `100%` }}>
                                                {
                                                    dataRoles.data.map((doc, idx) => {
                                                        return (
                                                            <Option key={idx} value={doc.id}>{doc.name}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                    }
                                </Form>
                            </div>
                        </div>
                    </div>
                    <Modal
                        title="Konfirmasi untuk menon-aktifkan akun"
                        visible={visible}
                        onOk={() => { handleActivationAgents("aktif") }}
                        onCancel={() => setVisible(false)}
                        okButtonProps={{ disabled: loadingubahaktif }}
                    >
                        Apakah anda yakin ingin menon-aktifkan agent <strong>{dataDetailAgent.data.fullname}</strong>?
                    </Modal>
                    <Modal
                        title="Konfirmasi untuk mengakaktifkan akun"
                        visible={visiblenon}
                        onOk={() => { handleActivationAgents("nonAktif") }}
                        onCancel={() => setVisiblenon(false)}
                        okButtonProps={{ disabled: loadingubahnonaktif }}
                    >
                        Apakah anda yakin ingin melakukan aktivasi akun agent <strong>{dataDetailAgent.data.fullname}</strong>?`
                    </Modal>
                    <Modal
                        title="Ubah Password"
                        visible={visibleubahpass}
                        onOk={handleUbahPassword}
                        onCancel={() => setVisibleubahpass(false)}
                        destroyOnClose={true}
                        okButtonProps={{ disabled: loadingubahpass }}
                    >
                        <Input.Password name="new_password" value={datapass.new_password} placeholder="Password Baru" type="password" onChange={(e) => { setDatapass({ ...datapass, [e.target.name]: e.target.value }) }} style={{ marginBottom: `2rem` }} />
                    </Modal>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const userid = params.userId
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

    if (!([107, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    const resourcesDA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAgentDetail`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            account_id: userid
        })
    })
    const resjsonDA = await resourcesDA.json()
    const dataDetailAgent = resjsonDA

    const resourcesRoles = await fetch(`https://boiling-thicket-46501.herokuapp.com/getRoles`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
        },
    })
    const resjsonRoles = await resourcesRoles.json()
    const dataRoles = resjsonRoles

    return {
        props: {
            initProps,
            dataDetailAgent,
            dataProfile,
            dataRoles,
            sidemenu: "4"
        },
    }
}

export default AgentsDetail