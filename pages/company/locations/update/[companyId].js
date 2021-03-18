import httpcookie from 'cookie'
import Layout from '../../../../components/layout-dashboard'
import Link from 'next/link'
import st from "../../../../components/layout-dashboard.module.css"
import { useState } from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { Form, Input, TreeSelect, Button, Upload, message } from 'antd'

function UpdateLocations({ initProps, dataProfile, sidemenu, dataDetailCompany, dataLocations, companyid }) {
    const tok = initProps
    const originPath = "Admin"
    const [updateLocationForm] = Form.useForm()
    const pathArr = ['company', `${dataDetailCompany.data.data.company_id}`, 'update location']
    const [par, setPar] = useState()

    //flattening dataLocations
    function flattenArr(dataassets) {
        const result = []
        dataassets.forEach((item, idx) => {
            const { id, title, key, value, children } = item
            result.push({
                id: id,
                title: title,
                key: key,
                value: value
            })
            if (children) {
                result.push(...flattenArr(children))
            }
        })
        return result
    }
    const flattenDataLocations = flattenArr(dataLocations.data)
    var dataLocationsDetail = {}
    flattenDataLocations.forEach(item => {
        if (item.id == companyid) {
            dataLocationsDetail = item
        }
    })

    //useState
    const [dataloc, setdataloc] = useState(dataLocations.data)
    const [dataupdate, setdataupdate] = useState({
        name: dataDetailCompany.data.data.company_name,
        role: 2,
        address: dataDetailCompany.data.data.address,
        phone_number: dataDetailCompany.data.data.phone_number,
        image_logo: dataDetailCompany.data.data.image_logo,
        parent_id: dataLocationsDetail.id
    })
    const [loadingupdate, setloadingupdate] = useState(false)
    const [loadingupload, setloadingupload] = useState(false)

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
    // const treeData = [
    //     {
    //         title: 'Node1',
    //         value: '0-0',
    //         children: [
    //             {
    //                 title: 'Child Node1',
    //                 value: '0-0-1',
    //             },
    //             {
    //                 title: 'Child Node2',
    //                 value: '0-0-2',
    //             },
    //         ],
    //     },
    //     {
    //         title: 'Node2',
    //         value: '0-1',
    //     },
    // ];
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
        console.log("yy: "+dataupdate.parent_id)
        // setloadingupdate(true)
        // fetch(`https://boiling-thicket-46501.herokuapp.com/UpdateCompanyDetail`, {
        //     method: 'PUT',
        //     headers: {
        //         'Authorization': JSON.parse(tok),
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(dataupdate)
        // })
        //     .then((res) => res.json())
        //     .then(res2 => {
        //         setloadingupdate(false)
        //         if (res2.success) {
        //             notification['success']({
        //                 message: res2.message,
        //                 duration: 3
        //             })
        //             setnewclients({
        //                 name: '',
        //                 role: 0,
        //                 address: '',
        //                 phone_number: '',
        //                 image_logo: '',
        //                 parent_id: 0
        //             })
        //             setTimeout(() => {
        //                 rt.push(`/company/mig?originPath=Admin`)
        //             }, 800)
        //         }
        //         else if (!res2.success) {
        //             notification['error']({
        //                 message: res2.message.errorInfo.status_detail,
        //                 duration: 3,
        //                 style: {
        //                     zIndex: `1000`
        //                 }
        //             })
        //         }
        //     })
    }

    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} originPath={originPath} dataDetailCompany={dataDetailCompany} st={st}>
            <div className="w-full h-auto border-t border-opacity-30 border-gray-500 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-3 flex flex-col">
                        <div className="p-2 md:p-5 border-b flex mb-5 justify-between">
                            <div>
                                <h1 className="mt-2 text-sm font-bold">Update Lokasi</h1>
                                <h1 className="mt-2 text-xs font-medium">{dataDetailCompany.data.data.company_name}</h1>
                            </div>
                            <div className="flex mx-2">
                                <Link href={`/company/${dataDetailCompany.data.data.company_id}?originPath=Admin`}>
                                    <Button type="default" size="middle" style={{ marginRight: `1rem` }}>Batalkan</Button>
                                    {/* <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md mx-2">Cancel</button> */}
                                </Link>
                                <Button type="default" size="middle" style={{ marginRight: `1rem` }} onClick={handleUpdateLocationsMig}>cek</Button>
                                <Button type="primary" size="middle" loading={loadingupdate} onClick={updateLocationForm.submit}>Perbarui</Button>
                                {/* <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md">Save</button> */}
                            </div>
                        </div>
                        <div className="p-3 col-span-1 md:col-span-1">
                            <Upload
                                name="profile_image"
                                listType="picture-card"
                                className="profileImage"
                                showUploadList={false}
                                beforeUpload={beforeUploadProfileImage}
                                onChange={onChangeProfileImage}
                            >
                                {dataupdate.image_logo ? <img src={dataupdate.image_logo} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                        <div className="p-2 md:p-5 shadow-md">
                            <Form layout="vertical" form={updateLocationForm} onFinish={handleUpdateLocationsMig} initialValues={dataupdate}>
                                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                                    <Form.Item name="name" style={{ marginRight: `1rem` }} label="Nama Anak Perusahaan"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama Anak Perusahaan harus diisi',
                                            },
                                        ]}
                                    >
                                        <Input defaultValue={dataupdate.name} name="name" id="name" allowClear onChange={onChangeForm} />
                                    </Form.Item>
                                    <Form.Item name="parent" style={{ marginRight: `1rem` }} label="Parent Perusahaan"
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
                                    </Form.Item>
                                    <Form.Item name="address" style={{ marginRight: `1rem` }} label="Alamat Lengkap"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'ALamat harus diisi',
                                            },
                                        ]}
                                    >
                                        <Input defaultValue={dataupdate.address} name="address" id="address" allowClear onChange={onChangeForm} />
                                    </Form.Item>
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
                                </div>
                                <h1 className="text-sm font-semibold">Address</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                                    <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Alamat 1">
                                        <Input name="owner" id="editOwner" allowClear />
                                    </Form.Item>
                                    <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Alamat 2">
                                        <Input name="owner" id="editOwner" allowClear />
                                    </Form.Item>
                                    <div className="grid grid-cols-2">
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Kota">
                                            <Input name="owner" id="editOwner" allowClear />
                                        </Form.Item>
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Provinsi">
                                            <Input name="owner" id="editOwner" allowClear />
                                        </Form.Item>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Negara">
                                            <Input name="owner" id="editOwner" allowClear />
                                        </Form.Item>
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Kode POS">
                                            <Input name="owner" id="editOwner" allowClear />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-1 flex flex-col p-2 md:p-5">
                        <h1 className="text-xs md:text-sm font-semibold mb-5">Locations</h1>
                        <p className="text-xs md:text-sm">
                            Freshservice lets you add location details into your service desk. You can create top level locations and add child locations under them. Like for example if your company operates out of multiple places, you could have the country name at the top level followed by the state, district and city.
                        <br /><br />
                        You can specify the location while creating a new asset and segregate them based on the location.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const companyid = params.companyId
    const reqBodyCompanyDetail = {
        login_id: companyid
    }
    if (req && req.headers) {
        const cookies = req.headers.cookie;
        if (!cookies) {
            res.writeHead(302, { Location: '/' })
            res.end()
        }
        if (typeof cookies === 'string') {
            const cookiesJSON = httpcookie.parse(cookies);
            initProps = cookiesJSON.token
        }
    }

    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    const resourcesGC = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyDetail`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBodyCompanyDetail)
    })
    const resjsonGC = await resourcesGC.json()
    const dataDetailCompany = resjsonGC

    const resourcesGL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
        },
    })
    const resjsonGL = await resourcesGL.json()
    const dataLocations = resjsonGL

    return {
        props: {
            initProps,
            dataProfile,
            dataDetailCompany,
            dataLocations,
            sidemenu: "4",
            companyid
        },
    }
}

export default UpdateLocations