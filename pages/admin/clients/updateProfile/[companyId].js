import Layout from '../../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import { LoadingOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import st from '../../../../components/layout-dashboard.module.css'
import { EditOutlined } from '@ant-design/icons'
import { Form, DatePicker, Input, notification, Button } from 'antd'
import moment from 'moment'


function ClientUpdateProfile({ initProps, dataProfile, sidemenu, companyid }) {
    const rt = useRouter()
    // const pathArr = rt.pathname.split("/").slice(1)
    // pathArr.splice(3, 1)
    const [editable, setEditable] = useState(true)
    const [visible, setVisible] = useState(false)
    const [visiblenon, setVisiblenon] = useState(false)
    const [tampildata, settampildata] = useState(false)
    const [loadingbtn, setloadingbtn] = useState(false)
    const [praloading, setpraloading] = useState(true)
    const [patharr, setpatharr] = useState([])
    const [loadingubahaktif, setloadingubahaktif] = useState(false)
    const [loadingubahnonaktif, setloadingubahnonaktif] = useState(false)
    const [instanceForm] = Form.useForm()
    // if (dataDetailCompany.data.tanggal_pkp === null) {
    //     dataDetailCompany.data.tanggal_pkp = new Date()
    // }
    const [data1, setData1] = useState({
        id: "",
        company_name: "",
        address: "",
        phone_number: "",
        image_logo: "",
        singkatan: "",
        tanggal_pkp: moment(new Date()),
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "",
        website: ""
    })
    const [loadingfoto, setLoadingfoto] = useState(false)

    const onChangeEditProfile = (e) => {
        var val = e.target.value
        if (e.target.name === "role") {
            val = parseInt(e.target.value)
        }
        setData1({
            ...data1,
            [e.target.name]: val
        })
    }
    const onChangeEditProfileFoto = async (e) => {
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
            image_logo: datajson.secure_url
        })
        setLoadingfoto(false)
    }


    //handler
    const handleEditProfile = () => {
        setloadingbtn(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateCompanyClient`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data1)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingbtn(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/clients/${data1.id}`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyClientDetail?id=${companyid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     company_id: Number(companyid)
            // })
        })
            .then(res => res.json())
            .then(res2 => {
                const temp = {
                    id: res2.data.company_id,
                    company_name: res2.data.company_name,
                    address: res2.data.address,
                    phone_number: res2.data.phone_number,
                    image_logo: res2.data.image_logo === "" ? '/default-users.jpeg' : res2.data.image_logo,
                    singkatan: res2.data.singkatan,
                    tanggal_pkp: res2.data.tanggal_pkp === null ? moment(new Date()) : moment(res2.data.tanggal_pkp),
                    penanggung_jawab: res2.data.penanggung_jawab,
                    npwp: res2.data.npwp,
                    fax: res2.data.fax,
                    email: res2.data.email,
                    website: res2.data.website
                }
                setData1(temp)
                setpraloading(false)
                var temp2 = rt.pathname.split("/").slice(1)
                temp2.splice(3, 1)
                temp2[temp2.length - 1] = res2.data.company_name
                setpatharr(temp2)
            })
    }, [])
    return (
        <Layout tok={initProps} dataProfile={dataProfile} pathArr={patharr} sidemenu={sidemenu} st={st}>
            <div id="profileDetailMigWrapper">
                <div className="flex justify-start md:justify-between p-3 md:border-t-2 md:border-b-2 bg-white mb-4 md:mb-8">
                    <div>
                        <h1 className="mt-2 text-sm font-bold">Update Profile Client</h1>
                    </div>
                    <div className="flex space-x-2">
                        {editable ?
                            <Button type="default" onClick={() => { rt.push(`/admin/clients/${data1.id}`); }}>Batal</Button>
                            :
                            null
                        }
                        <>
                            {
                                // [158].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <Button type="primary" onClick={instanceForm.submit} loading={loadingbtn}>Simpan</Button>
                            }
                        </>
                    </div>
                </div>
                <div className=" mb-2 md:mb-4 flex md:flex-row flex-col">
                    <h1 className="font-semibold text-base mr-3 pt-1">{data1.company_name}</h1>
                </div>
                {
                    praloading ?
                        null
                        :
                        <div className="grid grid-cols-1 sm:grid-col-3 md:grid-cols-5 mb-4">
                            <div className="p-3 relative col-span-1 sm:col-span-1 md:col-span-1 flex flex-col items-center">
                                <img src={data1.image_logo} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full mb-4" />
                                {editable ?
                                    <>
                                        <label className="custom-file-upload py-2 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3">
                                            <input type="file" style={{ display: `none` }} name="profile_image" onChange={onChangeEditProfileFoto} />
                                            {loadingfoto ? <LoadingOutlined /> : <EditOutlined style={{ fontSize: `1.2rem` }} />}
                                            Ganti Foto
                                        </label>
                                    </>
                                    :
                                    null
                                }
                            </div>
                            <div className="col-span-1 sm:col-span-2 md:col-span-4 w-full h-auto p-3 md:p-5 flex">
                                <Form layout="vertical" form={instanceForm} onFinish={handleEditProfile} initialValues={data1} style={{ width: `100%` }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <div className="md:m-5 mb-5 md:mb-0">
                                            {
                                                editable ?
                                                    <Form.Item name="company_name" label="Nama Perusahaan"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Nama Perusahaan wajib diisi',
                                                            },
                                                        ]}>
                                                        <Input defaultValue={data1.company_name} name="company_name" onChange={onChangeEditProfile}></Input>
                                                    </Form.Item>
                                                    :
                                                    <>
                                                        <h1 className="font-semibold text-sm">Nama Perusahaan:</h1>
                                                        <h1 className="text-sm font-normal text-black">{data1.company_name}</h1>
                                                    </>

                                            }
                                        </div>
                                        <div className="md:m-5 mb-5 md:mb-0">
                                            {
                                                editable ?
                                                    <Form.Item name="address" label="Alamat">
                                                        <Input defaultValue={data1.address} name="address" onChange={onChangeEditProfile}></Input>
                                                    </Form.Item>
                                                    :
                                                    <>
                                                        <h1 className="font-semibold text-sm">Alamat:</h1>
                                                        <h1 className="text-sm font-normal text-black">{data1.address}</h1>
                                                    </>
                                            }
                                        </div>
                                        <div className="md:m-5 mb-5 md:mb-0">
                                            {
                                                editable ?
                                                    <Form.Item name="phone_number" label="No. Telepon"
                                                        rules={[
                                                            {
                                                                pattern: /(\-)|(^\d*$)/,
                                                                message: 'Nomor telepon harus berisi angka',
                                                            },
                                                        ]}>
                                                        <Input defaultValue={data1.phone_number} name="phone_number" onChange={onChangeEditProfile}></Input>
                                                        {/* <InputNumber defaultValue={data1.phone_number} name="phone_number" onChange={(val) => { setData1({ ...data1, phone_number: `0${val}` }) }} style={{ width: `100%` }} /> */}
                                                    </Form.Item>
                                                    :
                                                    <>
                                                        <h1 className="font-semibold text-sm">Telepon:</h1>
                                                        <h1 className="text-sm font-normal text-black">{data1.phone_number}</h1>
                                                    </>
                                            }
                                        </div>
                                        <div className="md:m-5 mb-5 md:mb-0">
                                            {
                                                editable ?
                                                    <Form.Item name="singkatan" label="Singkatan">
                                                        <Input defaultValue={data1.singkatan} name="singkatan" onChange={onChangeEditProfile}></Input>
                                                    </Form.Item>
                                                    :
                                                    <>
                                                        <h1 className="font-semibold text-sm">Singkatan:</h1>
                                                        <h1 className="text-sm font-normal text-black">{data1.singkatan}</h1>
                                                    </>
                                            }
                                        </div>
                                        <div className="md:m-5 mb-5 md:mb-0">
                                            {
                                                editable ?
                                                    <Form.Item name="tanggal_pkp" label="Tanggal PKP">
                                                        <DatePicker onChange={(date, dateString) => { setData1({ ...data1, tanggal_pkp: moment(date) }) }} style={{ width: `100%` }}></DatePicker>
                                                    </Form.Item>
                                                    :
                                                    <>
                                                        <h1 className="font-semibold text-sm">Tanggal PKP:</h1>
                                                        {
                                                            data1.tanggal_pkp === null ?
                                                                <h1 className="text-sm font-normal text-black">-</h1>
                                                                :
                                                                <h1 className="text-sm font-normal text-black">{data1.tanggal_pkp.locale('id').format('LL')}</h1>

                                                        }
                                                    </>
                                            }
                                        </div>
                                        <div className="md:m-5 mb-5 md:mb-0">
                                            {
                                                editable ?
                                                    <Form.Item name="penanggung_jawab" label="PIC">
                                                        <Input defaultValue={data1.penanggung_jawab} name="penanggung_jawab" onChange={onChangeEditProfile}></Input>
                                                    </Form.Item>
                                                    :
                                                    <>
                                                        <h1 className="font-semibold text-sm">Penanggung Jawab:</h1>
                                                        <h1 className="text-sm font-normal text-black">{data1.penanggung_jawab}</h1>
                                                    </>
                                            }
                                        </div>
                                        <div className="md:m-5 mb-5 md:mb-0">
                                            {
                                                editable ?
                                                    <Form.Item name="npwp" label="NPWP">
                                                        <Input defaultValue={data1.npwp} name="npwp" onChange={onChangeEditProfile}></Input>
                                                    </Form.Item>
                                                    :
                                                    <>
                                                        <h1 className="font-semibold text-sm">NPWP:</h1>
                                                        <h1 className="text-sm font-normal text-black">{data1.npwp}</h1>
                                                    </>
                                            }
                                        </div>
                                        <div className="md:m-5 mb-5 md:mb-0">
                                            {
                                                editable ?
                                                    <Form.Item name="fax" label="Fax"
                                                        rules={[
                                                            {
                                                                pattern: /(\-)|(^\d*$)/,
                                                                message: 'Fax harus berisi angka',
                                                            },
                                                        ]}>
                                                        <Input defaultValue={data1.fax} name="fax" onChange={onChangeEditProfile}></Input>
                                                    </Form.Item>
                                                    :
                                                    <>
                                                        <h1 className="font-semibold text-sm">Fax:</h1>
                                                        <h1 className="text-sm font-normal text-black">{data1.fax}</h1>
                                                    </>
                                            }
                                        </div>
                                        <div className="md:m-5 mb-5 md:mb-0">
                                            {
                                                editable ?
                                                    <Form.Item name="email" label="Email"
                                                        rules={[
                                                            {
                                                                pattern: /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                                                                message: 'Email belum diisi dengan benar'
                                                            }
                                                        ]}>
                                                        <Input defaultValue={data1.email} name="email" onChange={onChangeEditProfile}></Input>
                                                    </Form.Item>
                                                    :
                                                    <>
                                                        <h1 className="font-semibold text-sm">Email:</h1>
                                                        <h1 className="text-sm font-normal text-black">{data1.email}</h1>
                                                    </>
                                            }
                                        </div>
                                        <div className="md:m-5 mb-5 md:mb-0">
                                            {
                                                editable ?
                                                    <Form.Item name="website" label="Website">
                                                        <Input defaultValue={data1.website} name="website" onChange={onChangeEditProfile}></Input>
                                                    </Form.Item>
                                                    :
                                                    <>
                                                        <h1 className="font-semibold text-sm">Website:</h1>

                                                        <h1 className="text-sm font-normal text-black">{data1.website}</h1>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                }
                {/* <Modal
                    title="Konfirmasi untuk menon-aktifkan akun"
                    visible={visible}
                    onOk={() => { handleActivationClients("aktif") }}
                    onCancel={() => setVisible(false)}
                    okButtonProps={{ disabled: loadingubahaktif }}
                >
                    Apakah anda yakin ingin menon-aktifkan akun perusahaan <strong>{dataDetailCompany.data.company_name}</strong>?
                </Modal>
                <Modal
                    title="Konfirmasi untuk mengakaktifkan akun"
                    visible={visiblenon}
                    onOk={() => { handleActivationClients("nonAktif") }}
                    onCancel={() => setVisiblenon(false)}
                    okButtonProps={{ disabled: loadingubahnonaktif }}
                >
                    Apakah anda yakin ingin melakukan aktivasi akun perusahaan <strong>{dataDetailCompany.data.company_name}</strong>?`
            </Modal> */}
            </div >
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const companyid = params.companyId
    const reqBodyCompanyDetail = {
        company_id: companyid
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

    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    // if (![156, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/admin/clients' })
    //     res.end()
    // }

    // const resourcesGC = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyClientDetail`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(reqBodyCompanyDetail)
    // })
    // const resjsonGC = await resourcesGC.json()
    // const dataDetailCompany = resjsonGC

    return {
        props: {
            initProps,
            dataProfile,
            // dataDetailCompany,
            sidemenu: "4",
            companyid
        }
    }
}

export default ClientUpdateProfile