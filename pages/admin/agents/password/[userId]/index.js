import Layout from '../../../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import st from '../../../../../components/layout-dashboard.module.css'
import { Form, Input, Button, notification } from 'antd'

function AgentPassword({ initProps, dataProfile, sidemenu, userid }) {
    const rt = useRouter()
    const { name } = rt.query
    const tok = initProps
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(2,1)
    pathArr[pathArr.length - 1] = `Ubah Password Agent - ${name}`
    const [instanceForm] = Form.useForm()
    // dataCompanyList = dataCompanyList.data.members.filter(data => data.company_id !== 66)

    //useState
    const [datapass, setdatapass] = useState({
        user_id: Number(userid),
        new_password: ''
    })
    const [loadingubahpass, setloadingubahpass] = useState(false)
    const [konfirmpass, setkonfirmpass] = useState('')
    const [praloading, setpraloading] = useState(false)

    //handlePasswordUbahButton
    const handleUbahPassword = () => {
        if (datapass.new_password !== konfirmpass) {
            notification['error']({
                message: 'Konfirmasi password tidak sama dengan password',
                duration: 2
            })
        }
        else {
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
                        notification['success']({
                            message: res2.message,
                            duration: 3
                        })
                        setTimeout(() => {
                            setloadingubahpass(false)
                            rt.push(`/admin/agents/detail/${userid}`)
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
    }

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAgentsWrapper">
                <div className="col-span-1 md:col-span-4">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">Ubah Password Agent</h1>
                            <div className="flex space-x-2">
                                <Link href={`/admin/agents/detail/${userid}`}>
                                    <Button disabled={praloading} type="default">Batal</Button>
                                    {/* <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md">Cancel</button> */}
                                </Link>
                                <Button disabled={praloading} loading={loadingubahpass} onClick={instanceForm.submit} type="primary">Simpan</Button>
                                {/* <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md" onClick={handleCreateAgents}>Save</button> */}
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-3 flex flex-col">
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
                        <div className="border-b border-black p-4 font-semibold mb-5">
                            Akun Agent - {name}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-3">
                                <Form layout="vertical" className="createAgentsForm" onFinish={handleUbahPassword} form={instanceForm}>
                                    <Form.Item label="Password Baru" name="new_password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Password baru wajib diisi',
                                            },
                                            {
                                                pattern: /([A-z0-9]{8})/,
                                                message: 'Password minimal 8 karakter',
                                            },
                                        ]}>
                                        <Input.Password name={`new_password`} onChange={(e) => { setdatapass({ ...datapass, new_password: e.target.value }) }} />
                                    </Form.Item>
                                    <Form.Item label="Konfirmasi Password Baru" name="konfirmpass"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Konfirmasi Password baru wajib diisi',
                                            },
                                            {
                                                pattern: /([A-z0-9]{8})/,
                                                message: 'Password minimal 8 karakter',
                                            },
                                        ]}>
                                        <Input.Password name={`konfirmpass`} onChange={(e) => { setkonfirmpass(e.target.value) }} />
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const userid = params.userId
    const reqBody = {
        page: 1,
        rows: 50,
        order_by: "asc"
    }
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

    // if (![117].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/dashboard/admin' })
    //     res.end()
    // }

    // const resourcesGCL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getClientCompanyList`, {
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
            // dataCompanyList,
            sidemenu: "4",
            userid,
        }
    }
}

export default AgentPassword