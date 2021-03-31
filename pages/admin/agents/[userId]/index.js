import { useRouter } from 'next/router'
import Layout from '../../../../components/layout-dashboard'
import httpcookie from 'cookie'
import EditOutlined from '@ant-design/icons/EditOutlined'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import Sticky from 'wil-react-sticky'
import { useState } from 'react'
import Link from 'next/link'
import st from '../../../../components/layout-dashboard.module.css'
import { Button, Form, Input, notification, Modal, Switch } from 'antd'

function AgentsDetail({ initProps, dataProfile, dataDetailAccount, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr[pathArr.length - 1] = dataDetailAccount.data.data.fullname
    const [loadingfoto, setLoadingfoto] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visiblenon, setVisiblenon] = useState(false)
    const [visibleubahpass, setVisibleubahpass] = useState(false)
    const [loadingsave, setLoadingsave] = useState(false)
    const [loadingubahpass, setloadingubahpass] = useState(false)
    const [loadingubahaktif, setloadingubahaktif] = useState(false)
    const [loadingubahnonaktif, setloadingubahnonaktif] = useState(false)
    const [instanceForm] = Form.useForm();
    const [datapass, setDatapass] = useState({
        user_id: dataDetailAccount.data.data.user_id,
        new_password: ''
    })
    const [data1, setData1] = useState({
        id: dataDetailAccount.data.data.user_id,
        fullname: dataDetailAccount.data.data.fullname,
        role: dataDetailAccount.data.data.role,
        phone_number: dataDetailAccount.data.data.phone_number,
        profile_image: dataDetailAccount.data.data.profile_image
    })
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateAccountDetail`, {
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/accountActivation`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: dataDetailAccount.data.data.user_id,
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
                        rt.push(`/admin/agents/${dataDetailAccount.data.data.user_id}`)
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/changeAccountPassword`, {
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
                        rt.push(`/admin/agents/${dataDetailAccount.data.data.user_id}`)
                    }, 500)
                }
                else if (!res2.success) {
                    setVisibleubahpass(false)
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} dataDetailAccount={dataDetailAccount} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className=" col-span-1 md:col-span-1 flex md:hidden flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Agents</div>
                    <p className="font-normal text-xs">
                        When you add a new agent, you will have to provide the agent’s email, set their permission levels and access (full-time or occasional). Agents will receive an email with a confirmation link to activate their account after which they can be assigned to, or respond to tickets. Administrators can also edit an Agent’s profile to include the agent’s title, phone, profile picture, signature etc.
                    </p>
                </div>
                <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                    <Sticky containerSelectorFocus="#formAgentsWrapper">
                        <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">Edit Agents</h1>
                            <div className="flex space-x-2">
                                <Link href={`/admin/agents`}>
                                    <Button type="default" size="middle">
                                        Batalkan
                                    </Button>
                                </Link>
                                <Button type="primary" size="middle" loading={loadingsave} onClick={instanceForm.submit}>Perbarui</Button>
                            </div>
                        </div>
                    </Sticky>
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-8">
                        <div className="border-b border-black p-4 font-semibold mb-5 flex">
                            <div className="md:mr-5 pt-1">Detail Akun Agents</div>
                            {
                                dataDetailAccount.data.data.attribute.is_enabled ?
                                    <div className=" bg-blue-100 text-blue-600 border-blue-600 border py-1 px-3 rounded-md w-auto md:mr-5">AKUN AKTIF</div>
                                    :
                                    <div className=" bg-red-100 text-red-600 border-red-600 border py-1 px-3 rounded-md w-auto md:mr-5">AKUN NON-AKTIF</div>
                            }
                            <div className="pt-1">
                                {
                                    dataDetailAccount.data.data.attribute.is_enabled ?
                                        <Switch checked={true} onChange={() => { setVisible(true) }}></Switch>
                                        :
                                        <Switch checked={false} onChange={() => { setVisiblenon(true) }}></Switch>
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-1 relative flex flex-col items-center">
                                <img src={data1.profile_image} className=" object-cover w-32 h-32 rounded-full mb-4" />
                                <label className="custom-file-upload p-2 border-2 inline-block cursor-pointer text-sm rounded-md hover:bg-gray-200">
                                    <input type="file" style={{ display: `none` }} name="profile_image" onChange={onChangeEditFoto} />
                                    {loadingfoto ? <LoadingOutlined /> : <EditOutlined style={{ fontSize: `1.5rem` }} />}
                                    Ganti Foto
                                </label>
                            </div>
                            <div className="p-3 col-span-1 md:col-span-3">
                                <h1 className="text-xs text-gray-600 mb-1">Email:</h1>
                                <h1 className="text-sm text-black mb-5">{dataDetailAccount.data.data.email}</h1>
                                <div className="flex flex-col mb-5">
                                    <h1 className="text-sm">ID</h1>
                                    <h1 className="text-sm font-semibold">{data1.id}</h1>
                                </div>
                                <Form layout="vertical" form={instanceForm} onFinish={handleSubmitEditAccount} initialValues={data1}>
                                    <Form.Item label="Nama Lengkap" name="fullname" required tooltip="Wajib diisi" initialValue={data1.fullname}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama Lengkap harus diisi',
                                            },
                                        ]}>
                                        <Input defaultValue={data1.fullname} onChange={onChangeEditAgents} name="fullname" required />
                                    </Form.Item>
                                    <Form.Item label="No. Handphone" name="phone_number" required tooltip="Wajib diisi" initialValue={data1.phone_number}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'No. Handphone harus diisi',
                                            },
                                        ]}>
                                        <Input defaultValue={data1.phone_number} onChange={onChangeEditAgents} name="phone_number" />
                                    </Form.Item>
                                    {/* <Form.Item label="Role" name="role" required tooltip="Wajib diisi" initialValue={data1.role}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Role harus diisi',
                                            },
                                        ]}>
                                        <input type="number" defaultValue={data1.role} name={'role'} onChange={onChangeEditAgents} />
                                    </Form.Item> */}
                                </Form>
                                <div className="w-full h-auto">
                                    <button className=" w-full h-auto py-2 text-center bg-blue-500 hover:bg-blue-700 text-white rounded-md" onClick={() => { setVisibleubahpass(true) }}>
                                        <strong>Ubah Password</strong>
                                    </button>
                                </div >
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-full p-3 md:p-5 h-auto">
                        {
                            dataDetailAccount.data.data.attribute.is_enabled ?
                                <button className=" w-full h-auto py-2 text-center bg-red-600 text-white hover:bg-red-800 rounded-md" onClick={() => { setVisible(true) }}>
                                    Non Aktifkan Akun
                                </button>
                                :
                                <button className=" w-full h-auto py-2 text-center bg-blue-600 text-white hover:bg-blue-800 rounded-md" onClick={() => { setVisiblenon(true) }}>
                                    Aktifkan Akun
                                </button>
                        }
                    </div > */}
                    <Modal
                        title="Konfirmasi untuk menon-aktifkan akun"
                        visible={visible}
                        onOk={() => { handleActivationAgents("aktif") }}
                        onCancel={() => setVisible(false)}
                        okButtonProps={{ disabled: loadingubahaktif }}
                    >
                        Apakah anda yakin ingin menon-aktifkan akun perusahaan <strong>{dataDetailAccount.data.data.fullname}</strong>?
                    </Modal>
                    <Modal
                        title="Konfirmasi untuk mengakaktifkan akun"
                        visible={visiblenon}
                        onOk={() => { handleActivationAgents("nonAktif") }}
                        onCancel={() => setVisiblenon(false)}
                        okButtonProps={{ disabled: loadingubahnonaktif }}
                    >
                        Apakah anda yakin ingin melakukan aktivasi akun perusahaan <strong>{dataDetailAccount.data.data.fullname}</strong>?`
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
                <div className="col-span-1 md:col-span-1 hidden md:flex flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Agents</div>
                    <p className="font-normal text-sm">
                        When you add a new agent, you will have to provide the agent’s email, set their permission levels and access (full-time or occasional). Agents will receive an email with a confirmation link to activate their account after which they can be assigned to, or respond to tickets. Administrators can also edit an Agent’s profile to include the agent’s title, phone, profile picture, signature etc.
                    </p>
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

    const resourcesDA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAccountDetail`, {
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
    const dataDetailAccount = resjsonDA

    return {
        props: {
            initProps,
            dataDetailAccount,
            dataProfile,
            sidemenu: "4"
        },
    }
}

export default AgentsDetail