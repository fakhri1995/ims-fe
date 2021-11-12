import httpcookie from 'cookie'
import Layout from '../../../../../components/layout-dashboard'
import Link from 'next/link'
import st from "../../../../../components/layout-dashboard.module.css"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { Form, Input, Button, message, notification, TreeSelect, Upload } from 'antd'

function NewLocationsClients({ initProps, dataProfile, sidemenu, dataLocations }) {
    const rt = useRouter()
    const tok = initProps
    const { parent, frominduk, cancel } = rt.query
    const pathArr = ['admin', `clients`, parent !== "list" ? 'Buat Client Location' : 'Buat Client']
    const [createLocationForm] = Form.useForm()
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
    //     if (item.id == parent) {
    //         dataLocationsDetail = item
    //     }
    // })

    //useState
    const [datalocationclient, setdatalocationclient] = useState([])
    const [frominduk1, setfrominduk1] = useState(frominduk)
    const [datanew, setdatanew] = useState({
        name: '',
        address: '-',
        phone_number: '-',
        image_logo: '',
        parent_id: parent === "list" ? 1 : 0
    })
    const [loadingcreate, setloadingcreate] = useState(false)
    const [loadingupload, setloadingupload] = useState(false)
    const [tambahdata, settambahdata] = useState(false)
    const [expandedKeys, setExpandedKeys] = useState([])
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

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
                    setdatanew({
                        ...datanew,
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
        setdatanew({
            ...datanew,
            parent_id: value
        })
    }
    const onChangeForm = (e) => {
        setdatanew({
            ...datanew,
            [e.target.name]: e.target.value
        })
    }

    //Handler
    const handleCreateLocationsClients = () => {
        parent !== "list" ?
            setdatanew({
                ...datanew,
                parent_id: Number(parent)
            })
            :
            null
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanyClient`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datanew)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingcreate(false)
                if (res2.success) {
                    setdatanew({
                        name: '',
                        address: '',
                        phone_number: '',
                        image_logo: '',
                        parent_id: 0
                    })
                    notification['success']({
                        message: parent === "list" ? "Client berhasil ditambahkan" : (frominduk1 === "1" ? 'Location berhasil disimpan' : 'Location berhasil ditambahkan'),
                        duration: 3
                    })
                    setTimeout(() => {
                        parent !== "list" ?
                            rt.push(`/admin/clients/${cancel}?active=locations`)
                            :
                            rt.push(`/admin/clients`)
                        settambahdata(prev => !prev)
                    }, 800)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations${typeof (cancel) === 'undefined' ? "" : `?company_id=${cancel}`}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     company_id: Number(cancel)
            // })
        })
            .then(res => res.json())
            .then(res2 => {
                const comparr = [res2.data]
                setdatalocationclient(comparr)
                setExpandedKeys(comparr[0].key)
                setdatanew({ ...datanew, parent_id: parent === "list" ? 1 : Number(parent) })
            })
    }, [tambahdata])

    useEffect(() => {
        datanew.address === "" ? setdatanew({ ...datanew, address: "-" }) : ""
        datanew.phone_number === "" ? setdatanew({ ...datanew, phone_number: "-" }) : ""
    }, [datanew])

    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className="w-full h-auto border-t border-opacity-30 border-gray-500 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-4">
                        <div className="p-2 md:p-5 border-b flex mb-5 justify-between">
                            <div>
                                <h1 className="mt-2 text-sm font-bold">{parent !== 'list' ? 'Buat Client Location' : 'Buat Client'}</h1>
                                {/* <h1 className="mt-2 text-xs font-medium">{dataDetailCompany.data.company_name}</h1> */}
                            </div>
                            <div className="flex mx-2">
                                {
                                    parent !== "list" ?
                                        <Link href={`/admin/clients/${cancel}?active=locations`}>
                                            <Button type="default" size="middle" style={{ marginRight: `1rem` }}>Batal</Button>
                                        </Link>
                                        :
                                        // <Link href={`/admin/clients`}>
                                        <Button onClick={() => { console.log(datanew) }} type="default" size="middle" style={{ marginRight: `1rem` }}>Batal</Button>
                                    // </Link>
                                }
                                <Button type="primary" size="middle" loading={loadingcreate} onClick={createLocationForm.submit}>Simpan</Button>
                                {/* <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-5 rounded-md">Save</button> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-3 flex flex-col">
                        {
                            parent !== "list" ?
                                null
                                :
                                <div className="p-3 col-span-1 md:col-span-1">
                                    <Upload
                                        name="profile_image"
                                        listType="picture-card"
                                        className="profileImage"
                                        showUploadList={false}
                                        beforeUpload={beforeUploadProfileImage}
                                        onChange={onChangeProfileImage}
                                    >
                                        {datanew.image_logo ? <img src={datanew.image_logo} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </div>
                        }
                        <div className="p-2 md:p-5 shadow-md">
                            <Form layout="vertical" form={createLocationForm} onFinish={handleCreateLocationsClients}>
                                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                                    {
                                        frominduk1 === "1" ?
                                            <Form.Item name="parent_id" label="Induk Lokasi" style={{ marginRight: `1rem` }}>
                                                <TreeSelect
                                                    disabled
                                                    allowClear
                                                    defaultValue={Number(parent)}
                                                    style={{ width: '100%' }}
                                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                    treeData={datalocationclient}
                                                    treeDefaultExpandAll
                                                    value={Number(parent)}
                                                />
                                            </Form.Item>
                                            :
                                            <>
                                                {
                                                    parent === "list" ?
                                                        // <Form.Item name="parent_id" label="Induk Lokasi" style={{ marginRight: `1rem` }}
                                                        //     rules={[
                                                        //         {
                                                        //             required: true,
                                                        //             message: 'Induk Lokasi wajib diisi',
                                                        //         },
                                                        //     ]}>
                                                        //     <TreeSelect
                                                        //         allowClear
                                                        //         style={{ width: '100%' }}
                                                        //         dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                        //         treeData={datalocationclient}
                                                        //         placeholder="Tambah Induk Lokasi"
                                                        //         treeDefaultExpandAll
                                                        //         onChange={(value) => { setdatanew({ ...datanew, parent_id: value }) }}
                                                        //     />
                                                        // </Form.Item> 
                                                        null
                                                        :
                                                        <Form.Item name="parent_id" label="Induk Lokasi" style={{ marginRight: `1rem` }}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Induk Lokasi wajib diisi',
                                                                },
                                                            ]}>
                                                            <TreeSelect
                                                                allowClear
                                                                style={{ width: '100%' }}
                                                                defaultValue={parent === "list" ? 66 : null}
                                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                                treeData={datalocationclient}
                                                                placeholder="Tambah Induk Lokasi"
                                                                treeDefaultExpandAll
                                                                onChange={(value) => { setdatanew({ ...datanew, parent_id: value }) }}
                                                            />
                                                        </Form.Item>
                                                }
                                            </>
                                    }
                                    <Form.Item name="name" style={{ marginRight: `1rem` }} label="Nama Perusahaan"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama Perusahaan wajib diisi',
                                            },
                                        ]}
                                    >
                                        <Input name="name" id="name" allowClear onChange={onChangeForm} />
                                    </Form.Item>
                                    <Form.Item name="phone_number" style={{ marginRight: `1rem` }} label="No. Telepon"
                                        rules={[
                                            {
                                                pattern: /(\-)|(^\d*$)/,
                                                message: 'Nomor telepon harus berisi angka',
                                            },
                                        ]}
                                    >
                                        <Input name="phone_number" id="phone_number" allowClear onChange={onChangeForm} />
                                    </Form.Item>
                                    <Form.Item name="address" style={{ marginRight: `1rem` }} label="Alamat"
                                    >
                                        <Input.TextArea rows={4} name="address" id="address" allowClear onChange={onChangeForm} />
                                    </Form.Item>
                                    <Form.Item name="penanggung_jawab" style={{ marginRight: `1rem` }} label="PIC"
                                    >
                                        <Input disabled name="penanggung_jawab" id="penanggung_jawab" />
                                    </Form.Item>
                                    <Form.Item name="email" style={{ marginRight: `1rem` }} label="Email"
                                    >
                                        <Input disabled name="email" id="email" />
                                    </Form.Item>
                                </div>
                                {/* <h1 className="text-sm font-semibold">Address</h1>
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
                                </div> */}
                            </Form>
                        </div>
                    </div>
                    {/* <div className="col-span-1 md:col-span-1 flex flex-col p-2 md:p-5">
                        <h1 className="text-xs md:text-sm font-semibold mb-5">Locations</h1>
                        <p className="text-xs md:text-sm">
                            Freshservice lets you add location details into your service desk. You can create top level locations and add child locations under them. Like for example if your company operates out of multiple places, you could have the country name at the top level followed by the state, district and city.
                        <br /><br />
                        You can specify the location while creating a new asset and segregate them based on the location.
                        </p>
                    </div> */}
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
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

    // if (![152].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/admin/clients' })
    //     res.end()
    // }

    // const resourcesGC = await fetch(`https://boiling-thicket-46501.herokuapp.com/getBranchCompanyList`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(reqBodyCompanyDetail)
    // })
    // const resjsonGC = await resourcesGC.json()
    // const dataDetailCompany = resjsonGC

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
            // dataDetailCompany,
            // dataLocations,
            // parentt,
            // companyid,
            sidemenu: "52"
        },
    }
}

export default NewLocationsClients