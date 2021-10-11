import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../../../components/layout-dashboard'
import st from '../../../../../components/layout-dashboard.module.css'
import httpcookie from 'cookie'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import { Modal, Button, notification, Switch } from 'antd'

function AgentDetail({ initProps, dataProfile, dataDetailRequester, userid, sidemenu }) {
    const rt = useRouter()
    const tok = initProps

    const [loadingfoto, setLoadingfoto] = useState(false)
    const [data1, setData1] = useState({
        id: "",
        fullname: "",
        role: "",
        phone_number: "",
        profile_image: `/default-users.jpeg`
    })
    const [dataemail, setdataemail] = useState("")
    const [idrole, setidrole] = useState(0)
    const [namarole, setnamarole] = useState("")
    const [patharr, setpatharr] = useState([])
    const [isenabled, setisenabled] = useState(false)
    const [origincomp, setorigincomp] = useState("")
    const [ubahstatus, setubahstatus] = useState(false)
    // const [datarole, setdatarole] = useState({
    //     account_id: dataDetailRequester.data.user_id,
    //     role_ids: [dataDetailRequester.data.feature_roles[0]]
    // })
    const [datarole, setdatarole] = useState({
        account_id: 0,
        role_ids: 0
    })
    const [datapass, setDatapass] = useState({
        user_id: data1.id,
        new_password: ''
    })
    const [visible, setVisible] = useState(false)
    const [visiblenon, setVisiblenon] = useState(false)
    const [visiblehapus, setvisiblehapus] = useState(false)
    const [loadinghapus, setloadinghapus] = useState(false)
    const [visibleubahpass, setVisibleubahpass] = useState(false)
    const [loadingupdate, setLoadingupdate] = useState(false)
    const [loadingubahpass, setloadingubahpass] = useState(false)
    const [loadingubahaktif, setloadingubahaktif] = useState(false)
    const [loadingubahnonaktif, setloadingubahnonaktif] = useState(false)
    const [dataraw1, setdataraw1] = useState({ data: [] })
    const [praloading, setpraloading] = useState(true)

    const handleActivationRequesters = (status) => {
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
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: data1.id,
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
                    setubahstatus(prev => !prev)
                    setTimeout(() => {
                        if (status === "aktif") {
                            setloadingubahaktif(false)
                        }
                        else if (status === "nonAktif") {
                            setloadingubahnonaktif(false)
                        }
                    }, 500)
                }
                else if (!res2.success) {
                    setVisible(false)
                    setVisiblenon(false)
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                    setTimeout(() => {
                        if (status === "aktif") {
                            setloadingubahaktif(false)
                        }
                        else if (status === "nonAktif") {
                            setloadingubahnonaktif(false)
                        }
                    }, 500)
                }
            })
    }
    const handleDeleteAgent = () => {
        setloadinghapus(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteAgent`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(userid)
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setvisiblehapus(false)
                setloadinghapus(false)
                if (res2.success) {
                    notification['success']({
                        message: 'Akun Agent berhasil dihapus',
                        duration: 3
                    })
                    rt.push(`/admin/agents`)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAgentDetail?account_id=${userid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     account_id: userid
            // })
        })
            .then(res => res.json())
            .then(res2 => {
                var temp = {
                    id: res2.data.user_id,
                    fullname: res2.data.fullname,
                    role: res2.data.role,
                    phone_number: res2.data.phone_number,
                    profile_image: res2.data.profile_image === "" ? `/default-users.jpeg` : res2.data.profile_image
                }
                setisenabled(res2.data.is_enabled)
                setData1(temp)
                setdataemail(res2.data.email)
                setidrole(res2.data.feature_roles[0])
                var pathArr = rt.pathname.split("/").slice(1)
                pathArr.splice(2, 1)
                pathArr[pathArr.length - 1] = `Detail Profil Agent - ` + res2.data.fullname
                setpatharr(pathArr)
                setorigincomp(res2.data.company.company_name)
                return res2.data.feature_roles[0]
            })
            .then(val => {
                fetch(`https://boiling-thicket-46501.herokuapp.com/getRoles`, {
                    method: `GET`,
                    headers: {
                        'Authorization': JSON.parse(initProps)
                    }
                })
                    .then(res => res.json())
                    .then(res2 => {
                        const selectedrole = res2.data.filter((dataa) => {
                            return dataa.id === val
                        })[0]
                        setnamarole(selectedrole ? selectedrole.name : "-")
                        setpraloading(false)
                    })
            })
    }, [ubahstatus])

    // useEffect(() => {
    //     fetch(`https://boiling-thicket-46501.herokuapp.com/getRoles`, {
    //         method: `GET`,
    //         headers: {
    //             'Authorization': JSON.parse(initProps)
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(res2 => {
    //             const selectedrole = res2.data.filter((dataa) => {
    //                 return dataa.id === Number(idrole)
    //             })[0]
    //             setnamarole(selectedrole ? selectedrole.name : "-")
    //         })
    // }, [])
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={patharr} sidemenu={sidemenu} dataDetailAccount={data1} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                {/* <div className=" col-span-1 md:col-span-1 flex md:hidden flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Requesters</div>
                    <p className="font-normal text-xs">
                        This page lets you handpick a set of requesters and add them to your help desk. These requesters will have selective privileges to submit requests to your helpdesk. You can restrict access such that only people who have been added here are allowed to login to your self-service portal and access your knowledge base. <br /> <br />
                        You can fill in the details of each of your new requesters manually or import a list of users from a CSV file. Once you have populated your list, your agents can open up each of your requesters and view their ticket history and contact information.
                    </p>
                </div> */}
                <div className="col-span-1 md:col-span-4">
                    <Sticky containerSelectorFocus="#formAgentsWrapper">
                        <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">Detail Profil Agent</h1>
                            <div className="flex space-x-2">
                                <Link href={`/admin/agents`}>
                                    <Button type="default">Kembali</Button>
                                </Link>
                                {
                                    // [116, 133].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                    <Button disabled={praloading} type="primary" onClick={() => { rt.push(`/admin/agents/update/${data1.id}`) }}>Ubah Profil</Button>
                                    // <Button type="primary" loading={loadingupdate} onClick={instanceForm.submit}>Save</Button>
                                }
                                {
                                    // [115].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                    <div className="w-full h-auto">
                                        <Button disabled={praloading} type="primary" onClick={() => { rt.push(`/admin/agents/password/${data1.id}?name=${data1.fullname}`) }}>Ubah Password</Button>
                                    </div >
                                }
                                {
                                    <div className="w-full h-auto">
                                        <Button type="danger" onClick={() => { setvisiblehapus(true) }}>Hapus</Button>
                                    </div >
                                }
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-5">
                        <div className="border-b border-black p-4 font-semibold mb-5 flex">
                            <div className=" mr-3 md:mr-5 pt-1">{data1.fullname}</div>
                            {
                                // [114].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    <div className="pt-1">
                                        {
                                            isenabled ?
                                                <Switch disabled={praloading} checked={true} onChange={() => { setVisible(true) }} checkedChildren={"AKTIF"}></Switch>
                                                :
                                                <Switch disabled={praloading} checked={false} onChange={() => { setVisiblenon(true) }} unCheckedChildren={"NON-AKTIF"}></Switch>
                                        }
                                    </div>
                                    // :
                                    // <div className="pt-1">
                                    //     {
                                    //         isenabled ?
                                    //             <Switch disabled checked={true} onChange={() => { setVisible(true) }} checkedChildren={"AKTIF"}></Switch>
                                    //             :
                                    //             <Switch disabled checked={false} onChange={() => { setVisiblenon(true) }} unCheckedChildren={"NON-AKTIF"}></Switch>
                                    //     }
                                    // </div>
                            }
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-1 flex flex-col items-center">
                                <img src={data1.profile_image} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full mb-4" />
                                {/* {
                                    [116].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                    <label className="custom-file-upload py-2 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3">
                                        <input type="file" style={{ display: `none` }} name="profile_image" onChange={onChangeEditFoto} />
                                        {loadingfoto ? <LoadingOutlined /> : <EditOutlined style={{ fontSize: `1.2rem` }} />}
                                        Ganti Foto
                                    </label>
                                } */}
                                {/* {
                                    [115].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                    <div className="w-full h-auto">
                                        <button className="w-full h-auto py-2 text-center bg-primary hover:bg-secondary text-white rounded-sm" onClick={() => { setVisibleubahpass(true) }}>
                                            Ubah Password
                                        </button>
                                    </div >
                                } */}
                            </div>
                            <div className="p-3 col-span-1 md:col-span-3">
                                {/* <Form layout="vertical" initialValues={data1} form={instanceForm} onFinish={handleSubmitEditAccount}> */}
                                {/* <div className="flex flex-col mb-5">
                                        <h1 className="text-sm">ID</h1>
                                        <h1 className="text-sm font-semibold">{data1.id}</h1>
                                    </div> */}
                                {/* <Form.Item label="Nama Lengkap" required tooltip="Wajib diisi" name="fullname" initialValue={data1.fullname}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama Lengkap harus diisi',
                                            },
                                        ]}>
                                        {
                                            [116].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                                <Input defaultValue={data1.fullname} onChange={onChangeEditAgents} name="fullname" />
                                                : */}
                                <div className="col-span-1 flex flex-col mb-5">
                                    <h1 className="font-semibold text-sm">Nama Lengkap:</h1>
                                    <h1 className="text-sm font-normal text-black">{data1.fullname}</h1>
                                </div>
                                {/* }
                                    </Form.Item> */}
                                <div className="col-span-1 flex flex-col mb-5">
                                    <h1 className="text-sm font-semibold">Email:</h1>
                                    <h1 className="text-sm font-normal text-black">{dataemail}</h1>
                                </div>
                                {/* <Form.Item label="No. Handphone" required tooltip="Wajib diisi" name="phone_number" initialValue={data1.phone_number}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'No. Handphone harus diisi',
                                            },
                                        ]}>
                                        {
                                            [116].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                                <Input defaultValue={data1.phone_number} onChange={onChangeEditAgents} name="phone_number" />
                                                : */}
                                <div className="col-span-1 flex flex-col mb-5">
                                    <h1 className="font-semibold text-sm">No. Handphone:</h1>
                                    <h1 className="text-sm font-normal text-black">{data1.phone_number}</h1>
                                </div>
                                {/* }
                                    </Form.Item> */}
                                <div className="col-span-1 flex flex-col mb-5">
                                    <h1 className="font-semibold text-sm">Role:</h1>
                                    <h1 className="text-sm font-normal text-black">{namarole}</h1>
                                </div>
                                <div className="col-span-1 flex flex-col mb-5">
                                    <h1 className="font-semibold text-sm">Asal Lokasi:</h1>
                                    <h1 className="text-sm font-normal text-black">{origincomp}</h1>
                                </div>
                                {/* {
                                        [133].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                            <Select onChange={(value) => { onChangeRole(value) }} defaultValue={datarole.role_ids} style={{ width: `100%` }}>
                                                {
                                                    dataraw1.data.map((doc, idx) => {
                                                        return (
                                                            <Option key={idx} value={doc.id}>{doc.name}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            :
                                            <Select disabled onChange={(value) => { onChangeRole(value) }} defaultValue={datarole.role_ids} style={{ width: `100%` }}>
                                                {
                                                    dataraw1.data.map((doc, idx) => {
                                                        return (
                                                            <Option key={idx} value={doc.id}>{doc.name}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                    } */}
                                {/* <Form.Item label="Role" required tooltip="Wajib diisi" name="role" initialValue={data1.role}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Role harus diisi',
                                            },
                                        ]}>
                                        <input type="number" defaultValue={data1.role} name={'role'} onChange={onChangeEditAgents} />
                                    </Form.Item> */}
                                {/* </Form> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
                        <div className="border-b border-black p-4 font-semibold mb-5">
                            Detail Perusahaan
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-1">
                                <img src={dataDetailAccount.data.data.company.image_logo} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full" />
                            </div>
                            <div className="col-span-1 md:col-span-3 p-3 space-y-4">
                                <div>
                                    <h1 className="font-semibold text-sm">ID Perusahaan:</h1>
                                    <h1 className="font-normal text-sm">{dataDetailAccount.data.data.company.company_id}</h1>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-sm">Nama Perusahaan:</h1>
                                    <h1 className="font-normal text-sm">{dataDetailAccount.data.data.company.company_name}</h1>
                                </div>
                            </div>
                        </div>
                    </div> */}
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
                        onOk={() => { handleActivationRequesters("aktif") }}
                        onCancel={() => setVisible(false)}
                        okText="Ya"
                        cancelText="Tidak"
                        okButtonProps={{ loading: loadingubahaktif }}
                    >
                        Apakah anda yakin ingin menon-aktifkan akun agent <strong>{data1.fullname}</strong>?
                    </Modal>
                    <Modal
                        title="Konfirmasi untuk mengakaktifkan akun"
                        visible={visiblenon}
                        onOk={() => { handleActivationRequesters("nonAktif") }}
                        onCancel={() => setVisiblenon(false)}
                        okText="Ya"
                        cancelText="Tidak"
                        okButtonProps={{ loading: loadingubahnonaktif }}
                    >
                        Apakah anda yakin ingin mengaktifkan akun agent <strong>{data1.fullname}</strong>?`
                    </Modal>
                    <Modal
                        title="Konfirmasi untuk menghapus akun Agent"
                        visible={visiblehapus}
                        onOk={handleDeleteAgent}
                        onCancel={() => setvisiblehapus(false)}
                        okText="Ya"
                        cancelText="Tidak"
                        okButtonProps={{ loading: loadinghapus }}
                    >
                        Apakah anda yakin ingin menghapus akun agent <strong>{data1.fullname}</strong>?`
                    </Modal>
                    {/* <Modal
                        title="Ubah Password"
                        visible={visibleubahpass}
                        onOk={handleUbahPassword}
                        onCancel={() => setVisibleubahpass(false)}
                        destroyOnClose={true}
                        okButtonProps={{ disabled: loadingubahpass }}
                    >
                        <Input.Password name="new_password" value={datapass.new_password} placeholder="Password Baru" type="password" onChange={(e) => { setDatapass({ ...datapass, [e.target.name]: e.target.value }) }} style={{ marginBottom: `2rem` }} />
                    </Modal> */}
                </div>
                {/* <div className="col-span-1 md:col-span-1 hidden md:flex flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Requesters</div>
                    <p className="font-normal text-sm">
                        This page lets you handpick a set of requesters and add them to your help desk. These requesters will have selective privileges to submit requests to your helpdesk. You can restrict access such that only people who have been added here are allowed to login to your self-service portal and access your knowledge base. <br /> <br />
                        You can fill in the details of each of your new requesters manually or import a list of users from a CSV file. Once you have populated your list, your agents can open up each of your requesters and view their ticket history and contact information.
                    </p>
                </div> */}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const userid = params.userId
    var initProps = {};
    if (!req.headers.cookie) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
    if (!cookiesJSON1.token) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    initProps = cookiesJSON1.token
    const resources = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjson = await resources.json()
    const dataProfile = resjson

    // if (!([114, 115, 116, 118, 133].every((curr) => dataProfile.data.registered_feature.includes(curr)))) {
    //     res.writeHead(302, { Location: '/dashboard/admin' })
    //     res.end()
    // }

    // const resourcesDA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getRequesterDetail`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         account_id: userid
    //     })
    // })
    // const resjsonDA = await resourcesDA.json()
    // if (!resjsonDA) {
    //     res.writeHead(302, { Location: '/admin/requesters' })
    //     res.end()
    // }
    // const dataDetailRequester = resjsonDA

    // const resourcesRoles = await fetch(`https://boiling-thicket-46501.herokuapp.com/getRoles`, {
    //     method: `GET`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps)
    //     }
    // })
    // const resjsonRoles = await resourcesRoles.json()
    // const dataRoles = resjsonRoles

    return {
        props: {
            initProps,
            // dataDetailRequester,
            dataProfile,
            // dataRoles,
            sidemenu: "4",
            userid
        },
    }
}

export default AgentDetail
