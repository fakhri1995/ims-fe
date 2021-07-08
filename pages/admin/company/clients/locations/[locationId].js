import httpcookie from 'cookie'
import Layout from '../../../../../components/layout-dashboard'
import { useEffect, useState } from 'react'
import st from "../../../../../components/layout-dashboard.module.css"
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { Form, Input, notification, Button, message, Upload, DatePicker } from 'antd'
import { useRouter } from 'next/router'
import moment from 'moment'

function DetailLocationClients({ initProps, dataProfile, sidemenu, dataBranchDetail, companyid }) {
    const rt = useRouter()
    const { edit, cancel } = rt.query
    const tok = initProps
    const originPath = "Admin"
    const [updateLocationForm] = Form.useForm()
    const pathArr = ['admin', 'company', `clients`, 'Update client location']
    const [par, setPar] = useState()

    //flattening dataLocations
    // function flattenArr(dataassets) {
    //     const result = []
    //     dataassets.forEach((item, idx) => {
    //         const { id, title, key, value, children } = item
    //         result.push({
    //             id: id,
    //             title: title,
    //             key: key,
    //             value: value
    //         })
    //         if (children) {
    //             result.push(...flattenArr(children))
    //         }
    //     })
    //     return result
    // }
    // const flattenDataLocations = flattenArr(dataLocations.data)
    // var dataLocationsDetail = {}
    // flattenDataLocations.forEach(item => {
    //     if (item.id == companyid) {
    //         dataLocationsDetail = item
    //     }
    // })

    //useState
    if (dataBranchDetail.data.tanggal_pkp === null) {
        dataBranchDetail.data.tanggal_pkp = new Date()
    }
    const [dataupdate, setdataupdate] = useState({
        id: parseInt(companyid),
        company_name: dataBranchDetail.data.company_name,
        address: dataBranchDetail.data.address,
        phone_number: dataBranchDetail.data.phone_number,
        image_logo: dataBranchDetail.data.image_logo,
        singkatan: dataBranchDetail.data.singkatan,
        tanggal_pkp: moment(dataBranchDetail.data.tanggal_pkp),
        penanggung_jawab: dataBranchDetail.data.penanggung_jawab,
        npwp: dataBranchDetail.data.npwp,
        fax: dataBranchDetail.data.fax,
        email: dataBranchDetail.data.email,
        website: dataBranchDetail.data.website,
    })
    const [loadingupdate, setloadingupdate] = useState(false)
    const [loadingupload, setloadingupload] = useState(false)
    const [editable, seteditable] = useState(false)

    //Upload Image
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
            setloadingupload(true)
            return;
        }
        if (info.file.status === 'done') {
            console.log("isi upload: " + info.file.originFileObj.name)
            const formData = new FormData()
            formData.append('file', info.file.originFileObj)
            formData.append('upload_preset', 'migsys')
            return fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(res2 => {
                    setloadingupload(false)
                    setdataupdate({
                        ...dataupdate,
                        image_logo: res2.secure_url
                    })
                })
        }
    }
    const uploadButton = (
        <div>
            {loadingupload ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Unggah</div>
        </div>
    );

    //onChange
    const onChangeParent = (value) => {
        setPar(value)
        setdataupdate({
            ...dataupdate,
            parent_id: value
        })
    }
    const onChangeForm = (e) => {
        setdataupdate({
            ...dataupdate,
            [e.target.name]: e.target.value
        })
    }

    //Handler
    const handleUpdateLocationsMig = () => {
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateCompanyBranch`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataupdate)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingupdate(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/company/clients/${cancel}`)
                        // seteditable(false)
                    }, 800)
                }
                else if (!res2.success && res2.message) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                        style: {
                            zIndex: `1000`
                        }
                    })
                }
                else if (!res2.success) {
                    notification['error']({
                        message: "Error 404 dari Server",
                        duration: 3,
                        style: {
                            zIndex: `1000`
                        }
                    })
                }
            })
    }

    //useEffect
    useEffect(() => {
        edit === "1" ? seteditable(true) : seteditable(false)
    }, [])

    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} originPath={originPath} dataDetailCompany={dataBranchDetail} st={st}>
            <div className="w-full h-auto border-t border-opacity-30 border-gray-500 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-4">
                        <div className="p-2 md:p-5 border-b flex mb-5 justify-between">
                            <div>
                                <h1 className="mt-2 text-sm font-bold">Detail Client Location</h1>
                                <h1 className="mt-2 text-xs font-medium">{dataBranchDetail.data.company_name}</h1>
                            </div>
                            <div className="flex items-center mx-2">
                                {
                                    editable ?
                                        <>
                                            <Button type="default" onClick={() => { rt.push(`/admin/company/clients/${cancel}`) }} size="middle" style={{ marginRight: `1rem` }}>Batal</Button>
                                            <Button type="primary" size="middle" loading={loadingupdate} onClick={updateLocationForm.submit}>Simpan</Button>
                                        </>
                                        :
                                        <>
                                            <Button type="default" onClick={() => { rt.push(`/admin/company/clients/${cancel}`) }} size="middle" style={{ marginRight: `1rem` }}>Kembali</Button>
                                            <Button type="primary" onClick={() => { window.location.href = `/admin/company/clients/locations/${companyid}?edit=1&cancel=${cancel}` }}>Ubah</Button>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-5 grid grid-cols-1 md:grid-cols-5">
                        <div className="p-3 col-span-1 md:col-span-1 flex justify-center">
                            {
                                editable ?
                                    <Upload
                                        name="profile_image"
                                        listType="picture-card"
                                        className="profileImage text-center"
                                        showUploadList={false}
                                        beforeUpload={beforeUploadProfileImage}
                                        onChange={onChangeProfileImage}
                                    >
                                        {dataupdate.image_logo ? <img src={dataupdate.image_logo} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                    :
                                    <img src={dataupdate.image_logo} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full mb-4" />
                            }
                        </div>
                        <div className="p-2 md:p-5 col-span-1 md:col-span-4">
                            <Form layout="vertical" form={updateLocationForm} onFinish={handleUpdateLocationsMig} initialValues={dataupdate}>
                                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                                    {
                                        editable ?
                                            <Form.Item name="company_name" style={{ marginRight: `1rem` }} label="Nama Anak Perusahaan"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Nama Anak Perusahaan harus diisi',
                                                    },
                                                ]}
                                            >
                                                <Input defaultValue={dataupdate.company_name} name="company_name" id="company_name" allowClear onChange={onChangeForm} />
                                            </Form.Item>
                                            :
                                            <>
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">Nama Perusahaan:</h1>
                                                    <h1 className="text-sm font-normal text-black">{dataupdate.company_name}</h1>
                                                </div>
                                            </>
                                    }
                                    {
                                        editable ?
                                            <Form.Item name="address" style={{ marginRight: `1rem` }} label="Alamat Lengkap"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Alamat harus diisi',
                                                    },
                                                ]}
                                            >
                                                <Input defaultValue={dataupdate.address} name="address" id="address" allowClear onChange={onChangeForm} />
                                            </Form.Item>
                                            :
                                            <>
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">Alamat:</h1>
                                                    <h1 className="text-sm font-normal text-black">{dataupdate.address}</h1>
                                                </div>
                                            </>
                                    }
                                    {
                                        editable ?
                                            <Form.Item name="phone_number" style={{ marginRight: `1rem` }} label="No. Telepeon"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'No. Telepon harus diisi',
                                                    },
                                                ]}
                                            >
                                                <Input defaultValue={dataupdate.phone_number} name="phone_number" id="phone_number" allowClear onChange={onChangeForm} />
                                            </Form.Item>
                                            :
                                            <>
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">No. Telepon:</h1>
                                                    <h1 className="text-sm font-normal text-black">{dataupdate.phone_number}</h1>
                                                </div>
                                            </>
                                    }
                                    {
                                        editable ?
                                            <Form.Item name="singkatan" style={{ marginRight: `1rem` }} label="Singkatan">
                                                <Input defaultValue={dataupdate.singkatan} name="singkatan" id="singkatan" allowClear onChange={onChangeForm} />
                                            </Form.Item>
                                            :
                                            <>
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">Singkatan:</h1>
                                                    <h1 className="text-sm font-normal text-black">{dataupdate.singkatan}</h1>
                                                </div>
                                            </>
                                    }
                                    {
                                        editable ?
                                            <Form.Item name="tanggal_pkp" style={{ marginRight: `1rem` }} label="Tanggal PKP">
                                                <DatePicker onChange={(date, dateString) => { setdataupdate({ ...dataupdate, tanggal_pkp: moment(date) }) }} style={{ width: `100%` }} defaultValue={dataupdate.tanggal_pkp} />
                                            </Form.Item>
                                            :
                                            <>
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">Tanggal PKP:</h1>
                                                    <h1 className="text-sm font-normal text-black">{moment(dataupdate.tanggal_pkp).locale('id').format('LL')}</h1>
                                                </div>
                                            </>
                                    }
                                    {
                                        editable ?
                                            <Form.Item name="penanggung_jawab" style={{ marginRight: `1rem` }} label="Penanggung Jawab">
                                                <Input defaultValue={dataupdate.penanggung_jawab} name="penanggung_jawab" id="penanggung_jawab" allowClear onChange={onChangeForm} />
                                            </Form.Item>
                                            :
                                            <>
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">Penanggung Jawab:</h1>
                                                    <h1 className="text-sm font-normal text-black">{dataupdate.penanggung_jawab}</h1>
                                                </div>
                                            </>
                                    }
                                    {
                                        editable ?
                                            <Form.Item name="npwp" style={{ marginRight: `1rem` }} label="NPWP">
                                                <Input defaultValue={dataupdate.npwp} name="npwp" id="npwp" allowClear onChange={onChangeForm} />
                                            </Form.Item>
                                            :
                                            <>
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">NPWP:</h1>
                                                    <h1 className="text-sm font-normal text-black">{dataupdate.npwp}</h1>
                                                </div>
                                            </>
                                    }
                                    {
                                        editable ?
                                            <Form.Item name="fax" style={{ marginRight: `1rem` }} label="Fax">
                                                <Input defaultValue={dataupdate.fax} name="fax" id="fax" allowClear onChange={onChangeForm} />
                                            </Form.Item>
                                            :
                                            <>
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">Fax:</h1>
                                                    <h1 className="text-sm font-normal text-black">{dataupdate.fax}</h1>
                                                </div>
                                            </>
                                    }
                                    {
                                        editable ?
                                            <Form.Item name="email" style={{ marginRight: `1rem` }} label="Email">
                                                <Input defaultValue={dataupdate.email} name="email" id="email" allowClear onChange={onChangeForm} />
                                            </Form.Item>
                                            :
                                            <>
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">Email:</h1>
                                                    <h1 className="text-sm font-normal text-black">{dataupdate.email}</h1>
                                                </div>
                                            </>
                                    }
                                    {
                                        editable ?
                                            <Form.Item name="website" style={{ marginRight: `1rem` }} label="Website">
                                                <Input defaultValue={dataupdate.website} name="website" id="website" allowClear onChange={onChangeForm} />
                                            </Form.Item>
                                            :
                                            <>
                                                <div className="col-span-1 flex flex-col mb-5">
                                                    <h1 className="font-semibold text-sm">Website:</h1>
                                                    <h1 className="text-sm font-normal text-black">{dataupdate.website}</h1>
                                                </div>
                                            </>
                                    }
                                </div>
                                <h1 className="text-sm font-semibold">Address</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                                    <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Alamat 1">
                                        <Input name="owner" id="editOwner" allowClear disabled />
                                    </Form.Item>
                                    <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Alamat 2">
                                        <Input name="owner" id="editOwner" allowClear disabled />
                                    </Form.Item>
                                    <div className="grid grid-cols-2">
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Kota">
                                            <Input name="owner" id="editOwner" allowClear disabled />
                                        </Form.Item>
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Provinsi">
                                            <Input name="owner" id="editOwner" allowClear disabled />
                                        </Form.Item>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Negara">
                                            <Input name="owner" id="editOwner" allowClear disabled />
                                        </Form.Item>
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Kode POS">
                                            <Input name="owner" id="editOwner" allowClear disabled />
                                        </Form.Item>
                                    </div>
                                </div>
                                {/* <Form.Item name="parent" style={{ marginRight: `1rem` }} label="Parent Perusahaan"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Parent Perusahaan harus diisi',
                                            },
                                        ]}
                                    >
                                        <TreeSelect
                                            style={{ width: '100%' }}
                                            defaultValue={dataupdate.parent_id}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={dataloc}
                                            placeholder="Pilih parent"
                                            treeDefaultExpandAll
                                            onChange={(value) => { onChangeParent(value) }}
                                        />
                                    </Form.Item> */}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const companyid = params.locationId
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
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    if (![151, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/admin/company/clients' })
        res.end()
    }

    const resourcesBD = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyClientDetail`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBodyCompanyDetail)
    })
    const resjsonBD = await resourcesBD.json()
    const dataBranchDetail = resjsonBD
    if (!dataBranchDetail.success) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin/company/clients'
            }
        }
    }

    // const resourcesGL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //     },
    // })
    // const resjsonGL = await resourcesGL.json()
    // const dataLocations = resjsonGL

    return {
        props: {
            initProps,
            dataProfile,
            // dataLocations,
            dataBranchDetail,
            sidemenu: "4",
            companyid
        },
    }
}

export default DetailLocationClients