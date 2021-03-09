import { useRouter } from 'next/router'
import Layout from '../../../components/layout-dashboard'
import httpcookie from 'cookie'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Sticky from 'wil-react-sticky'
import { useState } from 'react'
import Link from 'next/link'
import EditOutlined from '@ant-design/icons/EditOutlined'
import Modal from 'antd/lib/modal'
import Button from 'antd/lib/button'
import notification from 'antd/lib/notification'
import st from '../../../components/layout-dashboard.module.css'



function RequestersDetail({ initProps, dataProfile, dataDetailAccount, sidemenu }) {
    const rt = useRouter()
    const { userId, originPath } = rt.query
    const tok = initProps
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr[pathArr.length - 1] = userId
    const [instanceForm] = Form.useForm()

    const [loadingfoto, setLoadingfoto] = useState(false)
    const [data1, setData1] = useState({
        id: dataDetailAccount.data.user_id,
        fullname: dataDetailAccount.data.fullname,
        role: dataDetailAccount.data.role,
        phone_number: dataDetailAccount.data.phone_number,
        profile_image: dataDetailAccount.data.profile_image
    })
    const [visible, setVisible] = useState(false)
    const [visiblenon, setVisiblenon] = useState(false)
    const [visibleubahpass, setVisibleubahpass] = useState(false)
    const [loadingupdate, setLoadingupdate] = useState(false)

    const [datapass, setDatapass] = useState({
        user_id: dataDetailAccount.data.user_id,
        new_password: ''
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
        setLoadingupdate(true)
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
                setLoadingupdate(false)
                if (res2.data) {
                    notification['success']({
                        message: res2.data.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/requesters/update/${dataDetailAccount.data.user_id}?originPath=Admin`)
                    }, 300)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const handleActivationRequesters = (status) => {
        var keaktifan = false
        if (status === "aktif") {
            keaktifan = false
        }
        else if (status === "nonAktif") {
            keaktifan = true
        }
        fetch(`https://boiling-thicket-46501.herokuapp.com/accountActivation`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: dataDetailAccount.data.user_id,
                is_enabled: keaktifan
            })
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.data) {
                    setVisible(false)
                    setVisiblenon(false)
                    notification['success']({
                        message: res2.data.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/requesters/update/${dataDetailAccount.data.user_id}?originPath=Admin`)
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateAccountPassword`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datapass)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.data) {
                    setVisibleubahpass(false)
                    notification['success']({
                        message: res2.data.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/requesters/update/${dataDetailAccount.data.user_id}?originPath=Admin`)
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
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} dataDetailAccount={dataDetailAccount} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className=" col-span-1 md:col-span-1 flex md:hidden flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Requesters</div>
                    <p className="font-normal text-xs">
                        This page lets you handpick a set of requesters and add them to your help desk. These requesters will have selective privileges to submit requests to your helpdesk. You can restrict access such that only people who have been added here are allowed to login to your self-service portal and access your knowledge base. <br /> <br />
                        You can fill in the details of each of your new requesters manually or import a list of users from a CSV file. Once you have populated your list, your agents can open up each of your requesters and view their ticket history and contact information.
                    </p>
                </div>
                <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                    <Sticky containerSelectorFocus="#formAgentsWrapper">
                        <div className="flex justify-between p-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">Edit Requesters</h1>
                            <div className="flex space-x-2">
                                <Link href={`/requesters?originPath=Admin`}>
                                    <Button type="default" size="middle">Batalkan</Button>
                                    {/* <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md">Cancel</button> */}
                                </Link>
                                <Button type="primary" size="middle" loading={loadingupdate} onClick={instanceForm.submit}>Perbarui</Button>
                                {/* <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md" onClick={handleSubmitEditAccount}>Update</button> */}
                            </div>
                        </div>
                    </Sticky>
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
                        <div className="border-b border-black p-4 font-semibold mb-5 flex">
                            <div className="md:mr-5 pt-1">Detail Akun Requesters</div>
                            {
                                dataDetailAccount.data.attribute.is_enabled ?
                                    <div className=" bg-blue-100 text-blue-600 border-blue-600 border py-1 px-3 rounded-md w-auto">AKTIF AKUN</div>
                                    :
                                    <div className=" bg-red-100 text-red-600 border-red-600 border py-1 px-3 rounded-md w-auto">NON-AKTIF AKUN</div>
                            }
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-1">
                                <img src={data1.profile_image} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full mb-4" />
                                <label className="custom-file-upload p-2 border-2 inline-block cursor-pointer text-sm rounded-md hover:bg-gray-200">
                                    <input type="file" style={{ display: `none` }} name="profile_image" onChange={onChangeEditFoto} />
                                    {loadingfoto ? <LoadingOutlined /> : <EditOutlined style={{ fontSize: `1.5rem` }} />}
                                    Ganti Foto
                                </label>
                            </div>
                            <div className="p-3 col-span-1 md:col-span-3">
                                <Form layout="vertical" initialValues={data1} form={instanceForm} onFinish={handleSubmitEditAccount}>
                                    <div className="flex flex-col mb-5">
                                        <h1 className="text-sm">ID</h1>
                                        <h1 className="text-sm font-semibold">{data1.id}</h1>
                                    </div>
                                    {/* <Form.Item label="ID" required tooltip="Wajib diisi">
                                        <Input defaultValue={data1.id} onChange={onChangeEditAgents} name="id" />
                                    </Form.Item> */}
                                    <Form.Item label="Nama Lengkap" required tooltip="Wajib diisi" name="fullname" initialValue={data1.fullname}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama Lengkap harus diisi',
                                        },
                                    ]}>
                                        <Input defaultValue={data1.fullname} onChange={onChangeEditAgents} name="fullname"/>
                                    </Form.Item>
                                    <Form.Item label="No. Handphone" required tooltip="Wajib diisi" name="phone_number" initialValue={data1.phone_number}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'No. Handphone harus diisi',
                                        },
                                    ]}>
                                        <Input defaultValue={data1.phone_number} onChange={onChangeEditAgents} name="phone_number"/>
                                    </Form.Item>
                                    <Form.Item label="Role" required tooltip="Wajib diisi" name="role" initialValue={data1.role}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Role harus diisi',
                                        },
                                    ]}>
                                        <input type="number" defaultValue={data1.role} name={'role'} onChange={onChangeEditAgents} />
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
                        <div className="border-b border-black p-4 font-semibold mb-5">
                            Detail Perusahaan
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-1">
                                <img src={dataDetailAccount.data.company.image_logo} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full" />
                            </div>
                            <div className="col-span-1 md:col-span-3 p-3 space-y-4">
                                <div>
                                    <h1 className="font-semibold text-sm">ID Perusahaan:</h1>
                                    <h1 className="font-normal text-sm">{dataDetailAccount.data.company.company_id}</h1>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-sm">Nama Perusahaan:</h1>
                                    <h1 className="font-normal text-sm">{dataDetailAccount.data.company.company_name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-3 md:p-5 h-auto">
                        {
                            dataDetailAccount.data.attribute.is_enabled ?
                                <button className=" w-full h-auto py-2 text-center bg-red-600 text-white hover:bg-red-800 rounded-md" onClick={() => { setVisible(true) }}>
                                    Non Aktifkan Akun
                                </button>
                                :
                                <button className=" w-full h-auto py-2 text-center bg-blue-600 text-white hover:bg-blue-800 rounded-md" onClick={() => { setVisiblenon(true) }}>
                                    Aktifkan Akun
                                </button>
                        }
                    </div >
                    <div className="w-full p-3 md:p-5 h-auto">
                        <button className=" w-full h-auto py-2 text-center bg-white text-black hover:bg-blue-100 hover:text-blue-700 rounded-md" onClick={() => { setVisibleubahpass(true) }}>
                            Ubah Password
                        </button>
                    </div >
                    <Modal
                        title="Konfirmasi untuk menon-aktifkan akun"
                        visible={visible}
                        onOk={() => { handleActivationRequesters("aktif") }}
                        onCancel={() => setVisible(false)}
                    >
                        Apakah anda yakin ingin menon-aktifkan akun perusahaan <strong>{dataDetailAccount.data.fullname}</strong>?
                    </Modal>
                    <Modal
                        title="Konfirmasi untuk mengakaktifkan akun"
                        visible={visiblenon}
                        onOk={() => { handleActivationRequesters("nonAktif") }}
                        onCancel={() => setVisiblenon(false)}
                    >
                        Apakah anda yakin ingin melakukan aktivasi akun perusahaan <strong>{dataDetailAccount.data.fullname}</strong>?`
                    </Modal>
                    <Modal
                        title="Ubah Password"
                        visible={visibleubahpass}
                        onOk={handleUbahPassword}
                        onCancel={() => setVisibleubahpass(false)}
                    >
                        <Input.Password name="new_password" value={datapass.new_password} placeholder="Password Baru" type="password" onChange={(e) => { setDatapass({ ...datapass, [e.target.name]: e.target.value }) }} style={{ marginBottom: `2rem` }} />
                    </Modal>
                </div>
                <div className="col-span-1 md:col-span-1 hidden md:flex flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Requesters</div>
                    <p className="font-normal text-sm">
                        This page lets you handpick a set of requesters and add them to your help desk. These requesters will have selective privileges to submit requests to your helpdesk. You can restrict access such that only people who have been added here are allowed to login to your self-service portal and access your knowledge base. <br /> <br />
                        You can fill in the details of each of your new requesters manually or import a list of users from a CSV file. Once you have populated your list, your agents can open up each of your requesters and view their ticket history and contact information.
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
            login_id: userid
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

export default RequestersDetail
