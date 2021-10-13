import Layout from '../../../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Form, Input, Button, notification } from 'antd'
import st from '../../../../../components/layout-dashboard.module.css'

const FeatureUpdate = ({ initProps, sidemenu, dataProfile, idfeature }) => {
    //1. Init
    const rt = useRouter()
    const { feature, module } = rt.query
    const [instanceForm] = Form.useForm();

    //useState
    //1. Basic
    const [patharr, setpatharr] = useState([])
    const [datadisplay, setdatadisplay] = useState({
        id: '',
        feature_id: '',
        feature_key: '',
        name: '',
        description: '',
    })
    //2. Create
    const [updatedata, setupdatedata] = useState({
        id: Number(idfeature),
        name: '',
        description: []
    })
    const [loadingupdate, setloadingupdate] = useState(false)
    const [praloading, setpraloading] = useState(true)

    //handleCreate
    const handleUpdateFeature = () => {
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateFeature`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedata)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: 'Fitur berhasil diubah',
                        duration: 3
                    })
                    setTimeout(() => {
                        setloadingupdate(false)
                        rt.push(`/admin/modules?module=&featuredisplay=&feature=${feature}`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                    setloadingupdate(false)
                }
            })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getFeatures`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                const detaildata = res2.data.filter(flt => {
                    return flt.id === Number(idfeature)
                })[0]
                setdatadisplay(detaildata)
                setupdatedata({
                    ...updatedata,
                    name: detaildata.name,
                    description: detaildata.description
                })
                var pathArr = rt.pathname.split("/").slice(1)
                pathArr.splice(2, 2)
                pathArr[pathArr.length - 1] = `Ubah Feature - ${detaildata.name}`
                setpatharr(pathArr)
                setpraloading(false)
            })
    }, [])

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={patharr} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAgentsWrapper">
                <div className=" col-span-1 md:col-span-4">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">Ubah Feature - {datadisplay.name}</h1>
                            <div className="flex space-x-2">
                                <Link href={`/admin/modules?feature=${feature}`}>
                                    <Button type="default" onClick={() => { window.location.href = `/admin/modules?module=&featuredisplay=&feature=${feature}` }}>Batal</Button>
                                </Link>
                                <Button type="primary" loading={loadingupdate} onClick={instanceForm.submit}>Simpan</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-3 flex flex-col">
                    <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
                        <div className="border-b border-black p-4 font-semibold mb-5">
                            Ubah Feature
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            {
                                praloading ?
                                    null
                                    :
                                    <div className="p-3 col-span-1 md:col-span-3">
                                        <Form layout="vertical" form={instanceForm} onFinish={handleUpdateFeature} initialValues={datadisplay} className="createAgentsForm">
                                            <Form.Item label="Nama Modul" required name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Nama Fitur wajib diisi',
                                                    },
                                                ]}>
                                                <Input defaultValue={datadisplay.name} name={`name`} onChange={(e) => {
                                                    setupdatedata({
                                                        ...updatedata,
                                                        name: e.target.value
                                                    })
                                                }} />
                                            </Form.Item>
                                            <Form.Item label="Deskripsi" required name="description"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Deskripsi wajib diisi',
                                                    },
                                                ]}>
                                                <Input.TextArea rows={4} defaultValue={datadisplay.description} name={`description`} onChange={(e) => {
                                                    setupdatedata({
                                                        ...updatedata,
                                                        description: e.target.value
                                                    })
                                                }} />
                                            </Form.Item>
                                        </Form>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const idfeature = params.featureId
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

    // if (![179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/dashboard/admin' })
    //     res.end()
    // }

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "4",
            idfeature
        },
    }
}

export default FeatureUpdate
