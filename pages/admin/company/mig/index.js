import Layout from '../../../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useEffect, useState } from 'react'
import st from '../../../../components/layout-dashboard-mig.module.css'
import Link from 'next/link'
import { Tabs, Input, Form, Table, Tree, Drawer, notification, message, Modal, Select, Button, TreeSelect, DatePicker, Upload } from 'antd'
import moment from 'moment'

function MigIndexProfile({ dataProfile, dataDetailCompany, tok }) {
    const rt = useRouter()
    const [editable, setEditable] = useState(false)
    const [loadingbtn, setloadingbtn] = useState(false)
    const [instanceForm] = Form.useForm()
    const onClickEdit = () => {
        setEditable(true)
    }
    if (dataDetailCompany.data.tanggal_pkp === null) {
        dataDetailCompany.data.tanggal_pkp = new Date()
    }
    const [data1, setData1] = useState({
        // id: dataDetailCompany.data.data.company_id,
        company_name: dataDetailCompany.data.company_name,
        // role: dataDetailCompany.data.data.role,
        address: dataDetailCompany.data.address,
        phone_number: dataDetailCompany.data.phone_number,
        image_logo: dataDetailCompany.data.image_logo,
        singkatan: dataDetailCompany.data.singkatan,
        tanggal_pkp: moment(dataDetailCompany.data.tanggal_pkp)/*moment(new Date())*/,
        penanggung_jawab: dataDetailCompany.data.penanggung_jawab,
        npwp: dataDetailCompany.data.npwp,
        fax: dataDetailCompany.data.fax,
        email: dataDetailCompany.data.email,
        website: dataDetailCompany.data.website
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
    const handleEditProfile = () => {
        setloadingbtn(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateMainCompany`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data1)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingbtn(false)
                if (res2.success) {
                    setEditable(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/company/mig`)
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
    return (
        <div id="profileeDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-6">
                <div className="flex space-x-2">
                    {editable ?
                        <Button type="default" onClick={() => { setEditable(false) }}>Batal</Button>
                        :
                        null
                    }
                    {editable ?
                        <Button type="primary" onClick={instanceForm.submit} loading={loadingbtn}>Simpan</Button>
                        :
                        <>
                            {
                                [145].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <Button type="primary" onClick={() => { setEditable(true) }}>Ubah</Button>
                            }
                        </>
                    }
                </div>
            </div>
            <div className=" mb-2 md:mb-4 flex md:flex-row flex-col">
                <h1 className="font-semibold text-base mr-3 pt-1">{dataDetailCompany.data.company_name}</h1>
                <h1 className="mr-3 pt-1 hidden md:block">|</h1>
                <div className="flex">
                    {
                        dataDetailCompany.data.is_enabled ?
                            <div className=" bg-blue-100 text-blue-600 border-blue-600 border pt-2 px-3 rounded-md text-xs md:text-sm w-auto">AKTIF</div>
                            :
                            <div className=" bg-red-100 text-red-600 border-red-600 border pt-1 px-3 rounded-md text-xs md:text-sm w-auto">NON-AKTIF</div>
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-col-3 md:grid-cols-5 mb-4">
                <div className="p-3 relative col-span-1 sm:col-span-1 md:col-span-1 flex flex-col items-center">
                    <img src={data1.image_logo} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full mb-4" />
                    {editable ?
                        <div>
                            <label className="custom-file-upload py-2 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3">
                                <input type="file" style={{ display: `none` }} name="profile_image" onChange={onChangeEditProfileFoto} />
                                {loadingfoto ? <LoadingOutlined /> : <EditOutlined style={{ fontSize: `1.2rem` }} />}
                                    Ganti Foto
                        </label>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="w-full h-auto p-3 md:p-5 col-span-1 sm:col-span-2 md:col-span-4 flex">
                    <Form layout="vertical" form={instanceForm} onFinish={handleEditProfile} initialValues={data1} style={{ width: `100%` }}>
                        {/* <div className="md:m-5 mb-5 md:mb-0 ">
                            <h1 className="font-semibold text-sm">ID Perusahaan:</h1>
                            <h1 className="text-sm font-normal text-black">{data1.id}</h1>
                        </div> */}
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="md:m-5 mb-5 md:mb-0 ">
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
                                        <Form.Item name="address" label="Alamat"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Alamat wajib diisi',
                                                },
                                            ]}>
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
                                        <Form.Item name="phone_number" label="Telepon"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Telepon wajib diisi',
                                                },
                                            ]}>
                                            <Input defaultValue={data1.phone_number} name="phone_number" onChange={onChangeEditProfile}></Input>
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
                                        <Form.Item name="tanggal_pkp" label="Tanggal PKP"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tanggal PKP wajib diisi',
                                                },
                                            ]}>
                                            <DatePicker onChange={(date, dateString) => { setData1({ ...data1, tanggal_pkp: moment(date) }) }} style={{ width: `100%` }} defaultValue={data1.tanggal_pkp}></DatePicker>
                                        </Form.Item>
                                        :
                                        <>
                                            <h1 className="font-semibold text-sm">Tanggal PKP:</h1>
                                            {/* <h1 className="text-sm font-normal text-black">{data1.tanggal_pkp.locale('id').format('LL')}</h1> */}
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
                                        <Form.Item name="penanggung_jawab" label="Penanggung Jawab">
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
                                        <Form.Item name="fax" label="Fax">
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
                                        <Form.Item name="email" label="Email">
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
        </div>
    )
}

function MigIndexLocations({ dataProfile, tok, dataBranchList }) {
    const rt = useRouter()
    const [expandedKeys, setExpandedKeys] = useState([dataBranchList.data[0].key])
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [databranchlist, setdatabranchlist] = useState(dataBranchList.data)
    const [tambahdata, settambahdata] = useState(false)
    const [editdata, seteditdata] = useState(false)
    const [deldata, setdeldata] = useState(false)
    const [defvalparent, setdefvalparent] = useState("")
    const [frominduk, setfrominduk] = useState(false)
    const [loadingtambah, setloadingtambah] = useState(false)
    const [loadingimage, setloadingimage] = useState(false)
    const [instanceForm] = Form.useForm()
    const [drawablecreate, setdrawablecreate] = useState(false)
    const { Search } = Input;
    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };
    const [datanew, setdatanew] = useState({
        name: '',
        address: '',
        phone_number: '',
        image_logo: '',
        parent_id: 0
    })
    const uploadButton = (
        <div>
            {loadingimage ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Unggah</div>
        </div>
    );
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
            setloadingimage(true)
            return;
        }
        if (info.file.status === 'done') {
            const formData = new FormData()
            formData.append('file', info.file.originFileObj)
            formData.append('upload_preset', 'migsys')
            return fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(res2 => {
                    setloadingimage(false)
                    setdatanew({
                        ...datanew,
                        image_logo: res2.secure_url
                    })
                })
        }
    }
    //Handler
    const handleCreateLocationsMig = () => {
        setdatanew({
            ...datanew,
            parent_id: defvalparent
        })
        if (datanew.address === "" || datanew.phone_number === "") {
            setdatanew({
                ...datanew,
                address: '-',
                phone_number: '-'
            })
        }
        setloadingtambah(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanyBranch`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datanew)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingtambah(false)
                if (res2.success) {
                    setdatanew({
                        name: '',
                        address: '',
                        phone_number: '',
                        image_logo: '',
                        parent_id: 0
                    })
                    setdrawablecreate(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/company/mig`)
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/getBranchCompanyList`, {
            method: `POST`,
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setdatabranchlist(res2.data)
            })
    }, [tambahdata])
    return (
        <div id="locationssDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-8">
                <div className="flex space-x-2">
                    {/* <Link href={`/admin/company/locations/new?companyId=${dataDetailCompany.data.data.company_id}&parent=`}> */}
                    {
                        [152].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <Button type="primary" size="middle" onClick={() => { setdrawablecreate(true); setfrominduk(false) }}>Tambah</Button>
                    }
                    {/* </Link> */}
                </div>
            </div>
            <div className="p-5">
                <h1 className="text-sm font-semibold">Pilih Parent terakhir</h1>
                <Search style={{ marginBottom: 8 }} placeholder="Cari Lokasi" />
                <Tree
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    treeData={databranchlist}
                    titleRender={(nodeData) => (
                        <>
                            <div className={`flex justify-between hover:bg-blue-100 text-black`}
                                onMouseOver={() => {
                                    var d = document.getElementById(`node${nodeData.key}`)
                                    d.classList.add("flex")
                                    d.classList.remove("hidden")
                                }}
                                onMouseLeave={() => {
                                    var e = document.getElementById(`node${nodeData.key}`)
                                    e.classList.add("hidden")
                                    e.classList.remove("flex")
                                }}
                            >
                                <div className=" w-full" onClick={() => { rt.push(`/admin/company/locations/${nodeData.id}?parent=${nodeData.id_parent}&edit=`) }}>
                                    {nodeData.title}
                                </div>
                                <div className={`hidden mx-2`} id={`node${nodeData.key}`}>
                                    {/* <Link href={`/admin/company/locations/new?parent=${nodeData.id}&companyId=${dataDetailCompany.data.company_id}`}> */}
                                    {
                                        [152].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                        <a className="mx-2 pb-1" onClick={(e) => { setdrawablecreate(true); setdefvalparent(nodeData.id); setfrominduk(true) }} alt="add"><PlusOutlined /></a>
                                    }
                                    {/* </Link> */}
                                    {
                                        [151, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                        <Link href={`/admin/company/locations/${nodeData.id}?parent=${nodeData.title}&edit=1`}>
                                            <a className="mx-2 pb-1" alt="update"><EditOutlined /></a>
                                        </Link>
                                    }
                                    {/* <Popconfirm title="Yakin hapus lokasi?" onConfirm={() => { message.success("API is not available") }} onCancel={() => { message.error("Gagal dihapus") }}>
                                        <a className="mx-2 pb-1" alt="delete"><DeleteOutlined /></a>
                                    </Popconfirm> */}
                                </div>
                            </div>
                        </>
                    )
                    }
                    blockNode={true}
                />
            </div>
            <Drawer title="Buat Branch" maskClosable={false} destroyOnClose={true} visible={drawablecreate} onClose={() => {
                setdrawablecreate(false);
                setdatanew({
                    name: '',
                    role: 3,
                    address: '',
                    phone_number: '',
                    image_logo: '',
                    parent_id: null
                });
                instanceForm.resetFields()
            }} width={370} destroyOnClose={true}>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-1">
                    <div className="px-3 pt-3 pb-0 col-span-1 md:col-span-1">
                        <Form.Item name="profile_image">
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
                        </Form.Item>
                    </div>
                    <Form layout="vertical" className="createClientsForm" onFinish={handleCreateLocationsMig} form={instanceForm}>
                        <div className="md:m-4 mb-5 md:mb-0 ">
                            <Form.Item name="name" label="Nama Perusahaan"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nama perusahaan wajib diisi',
                                    },
                                ]}
                            >
                                <Input name="name" allowClear onChange={(e) => { setdatanew({ ...datanew, name: e.target.value }) }}></Input>
                            </Form.Item>
                        </div>
                        <div className="md:m-4 mb-5 md:mb-0 ">
                            <Form.Item name="address" label="Alamat">
                                <Input name="address" allowClear onChange={(e) => { setdatanew({ ...datanew, address: e.target.value }) }}></Input>
                            </Form.Item>
                        </div>
                        <div className="md:m-4 mb-5 md:mb-0 ">
                            <Form.Item name="phone_number" label="Telepon">
                                <Input name="phone_number" allowClear onChange={(e) => { setdatanew({ ...datanew, phone_number: e.target.value }) }}></Input>
                            </Form.Item>
                        </div>
                        <div className="md:m-4 mb-5 md:mb-0">
                            {
                                frominduk ?
                                    <Form.Item label="Induk Lokasi">
                                        <TreeSelect
                                            disabled
                                            allowClear
                                            defaultValue={defvalparent}
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={databranchlist}
                                            treeDefaultExpandAll
                                            value={defvalparent}
                                        />
                                    </Form.Item>
                                    :
                                    <Form.Item name="parent_id" label="Induk Lokasi"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Parent Perusahaan wajib diisi',
                                            },
                                        ]}>
                                        {/* <Select onChange={(value) => { setdatanew({ ...datanew, parent_id: value }) }}>
                                    {
                                        databranchlist.map((doc, idx) => {
                                            return (
                                                <Option key={idx} value={doc.company_id}>{doc.company_name}</Option>
                                            )
                                        })
                                    }
                                </Select> */}
                                        <TreeSelect
                                            allowClear
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={databranchlist}
                                            placeholder="Tambah Induk Lokasi"
                                            treeDefaultExpandAll
                                            onChange={(value) => { setdatanew({ ...datanew, parent_id: value }) }}
                                        />
                                    </Form.Item>
                            }
                        </div>
                        <div className="flex justify-end">
                            <Button type='default' onClick={() => { setdrawablecreate(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type="primary" size="middle" onClick={instanceForm.submit} loading={loadingtambah} style={{ marginBottom: `1rem` }}>Simpan</Button>
                        </div>
                    </Form>
                </div>
            </Drawer>
        </div>
    )
}

function MigIndexBankAccount({ dataProfile, tok }) {
    // if (!dataGetBanks.data) {
    //     dataGetBanks.data = []
    // }
    const rt = useRouter()
    const { Option } = Select
    const [editable, setEditable] = useState(false)
    const [tambahdata, settambahdata] = useState(false)
    const [editdata, seteditdata] = useState(false)
    const [deldata, setdeldata] = useState(false)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [drawableedit, setDrawableedit] = useState(false)
    const [modaldel, setModaldel] = useState(false)
    const [modaldeldata, setModaldeldata] = useState({
        id: 0,
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    const [loadingbtncreate, setloadingbtncreate] = useState(false)
    const [loadingbtnedit, setloadingbtnedit] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)
    const [datagetBanks, setdatagetBanks] = useState([])
    const [loadingdatagetBanks, setloadingdatagetBanks] = useState(false)
    // const [selectedrows, setSelectedrows] = useState([])
    const [recordrow, setRecordrow] = useState({
        id: 0,
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    const [bankdata, setBankdata] = useState({
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    var actionsArr = []
    for (var i = 0; i < datagetBanks.length; i++) {
        actionsArr.push(false)
    }
    const [actions, setActions] = useState(actionsArr)
    const [action, setAction] = useState(false)
    const onChangeBA = (e) => {
        setBankdata({
            ...bankdata,
            [e.target.name]: e.target.value
        })
    }
    const onChangeBACurrency = (data) => {
        setBankdata({
            ...bankdata,
            currency: data.value
        })
    }
    const onChangeEditBA = (e) => {
        setRecordrow({
            ...recordrow,
            [e.target.name]: e.target.value
        })
    }
    const handleDeleteBA = (rec) => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteMainBank?id=${rec.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingdelete(false)
                if (res2.success) {
                    setModaldel(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/company/mig`)
                        setdeldata(prev => !prev)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleSubmitCreateBA = () => {
        setloadingbtncreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addMainBank`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bankdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingbtncreate(false)
                if (res2.success) {
                    setBankdata({
                        company_id: 66,
                        name: '',
                        account_number: '',
                        owner: '',
                        currency: ''
                    })
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setDrawablecreate(false)
                        rt.push(`/admin/company/mig?active=bankAccounts`)
                        settambahdata(prev => !prev)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const handleSubmitEditBA = () => {
        setloadingbtnedit(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateMainBank`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recordrow)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingbtnedit(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setRecordrow({
                        id: 0,
                        company_id: 66,
                        name: '',
                        account_number: '',
                        owner: '',
                        currency: ''
                    })
                    setTimeout(() => {
                        setDrawableedit(false)
                        rt.push(`/admin/company/mig?active=bankAccounts`)
                        seteditdata(prev => !prev)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.erroInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const columnsgetBanks = [
        {
            title: 'No.',
            dataIndex: 'key',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.key}
                        </>
                }
            }
        },
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     render: (text, record, index) => {
        //         return {
        //             props: {
        //                 style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
        //             },
        //             children:
        //                 <>
        //                     {record.id}
        //                 </>
        //         }
        //     }
        // },
        {
            title: 'Nama Bank',
            dataIndex: 'name',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.name}
                        </>
                }
            }
            // sorter: (a, b) => a.name.localeCompare(b.name),
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nomor Rekening',
            dataIndex: 'account_number',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.account_number}
                        </>
                }
            }
            // sorter: (a, b) => a.account_number - b.account_number,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Atas Nama',
            dataIndex: 'owner',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.owner}
                        </>
                }
            }
            // sorter: (a, b) => a.owner.localeCompare(b.owner),
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mata Uang',
            dataIndex: 'currency',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.currency}
                        </>
                }
            }
            // filters: [
            //     {
            //         text: 'IDR',
            //         value: 'IDR',
            //     },
            //     {
            //         text: 'USD',
            //         value: 'USD',
            //     },
            // ],
            // onFilter: (value, record) => record.currency.indexOf(value) === 0,
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            align: 'center',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {
                                actions[index] ?
                                    <>{actions[index]}
                                        {
                                            [149].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                            <Button onClick={() => { setModaldel(true); setModaldeldata(record) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `0.4rem` }}>
                                                <DeleteOutlined />
                                            </Button>
                                        }
                                        {
                                            [148].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                            <Button onClick={() => { setDrawableedit(true); setRecordrow(record) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `0.4rem` }}>
                                                <EditOutlined />
                                            </Button>
                                        }
                                        {/* <a onClick={() => { setModaldel(true); setModaldeldata(record) }}><DeleteOutlined /></a>
                                        <a className="inline" onClick={() => { setDrawableedit(true); setRecordrow(record) }}><EditOutlined /></a> */}
                                    </>
                                    :
                                    null
                            }
                        </>
                }
            }
        }
    ];
    // dataGetBanks.data ?
    //     datagetBanks = dataGetBanks.data.map((doc, idx) => {
    //         return ({
    //             key: idx + 1,
    //             id: doc.id,
    //             company_id: doc.company_id,
    //             name: doc.name,
    //             account_number: doc.account_number,
    //             owner: doc.owner,
    //             currency: doc.currency
    //         })
    //     })
    //     :
    //     datagetBanks = []

    useEffect(() => {
        setloadingdatagetBanks(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getMainBanks`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingdatagetBanks(false)
                const tempdata = res2.data.map((doc, idx) => {
                    return ({
                        key: idx + 1,
                        id: doc.id,
                        company_id: doc.company_id,
                        name: doc.name,
                        account_number: doc.account_number,
                        owner: doc.owner,
                        currency: doc.currency
                    })
                })
                setdatagetBanks(tempdata)
            })
    }, [tambahdata, editdata, deldata])
    return (
        <div id="bankAccountDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-8">
                <div className="flex space-x-2">
                    {
                        editable ?
                            <button className=" bg-gray-600 hover:bg-gray-800 border text-white py-1 px-3 rounded-md w-24 md:w-40" onClick={() => { setDrawableedit(true) }}>
                                Edit
                            </button>
                            :
                            null
                    }
                    {
                        [147].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <Button type="primary" onClick={() => { setDrawablecreate(true) }}>Tambah</Button>
                    }
                    {/* <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md w-24 md:w-40" onClick={() => { setDrawablecreate(true) }}> Create</button> */}
                    <Drawer title="Edit data Rekening Bank Perusahan MIG" maskClosable={false} visible={drawableedit} onClose={() => { setDrawableedit(false); }} width={370} destroyOnClose={true}>
                        <Form layout="vertical" onFinish={handleSubmitEditBA} initialValues={recordrow}>
                            <div className="grid grid-cols-1 mb-5">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Bank"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama bank harus diisi',
                                        },
                                    ]}
                                >
                                    <Input onChange={onChangeEditBA} name="name" defaultValue={recordrow.name} allowClear />
                                </Form.Item>
                                <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="No.Rekening"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nomor rekening harus diisi',
                                        },
                                    ]}
                                >
                                    <Input onChange={onChangeEditBA} name="account_number" defaultValue={recordrow.account_number} allowClear />
                                </Form.Item>
                                <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Atas Nama"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama penanggung jawab harus diisi',
                                        },
                                    ]}
                                >
                                    <Input onChange={onChangeEditBA} name="owner" defaultValue={recordrow.owner} allowClear />
                                </Form.Item>
                                <Form.Item name="currency" style={{ marginRight: `1rem` }} label="Mata Uang"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mata uang harus diisi',
                                        },
                                    ]}
                                >
                                    <select name="currency" onChange={onChangeEditBA} defaultValue={recordrow.currency} style={{ width: `100%`, borderRadius: `5px` }}>
                                        <option value="IDR">IDR</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <div className="flex justify-end">
                                    <Button type="default" onClick={() => { setDrawableedit(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                                    <Button htmlType="submit" type="primary" size="middle" loading={loadingbtnedit}>Simpan</Button>
                                </div>
                                {/* <button type="submit" className="bg-gray-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-gray-800">Save</button> */}
                            </Form.Item>
                        </Form>
                    </Drawer>
                    <Drawer title="Tambah data Rekening Bank Perusahan MIG" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={370} destroyOnClose={true}>
                        <Form layout="vertical" onFinish={handleSubmitCreateBA} initialValues={bankdata}>
                            <div className="grid grid-cols-1 mb-5">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Bank"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama bank harus diisi',
                                        },
                                    ]}>
                                    <Input onChange={onChangeBA} name="name" defaultValue={bankdata.name} />
                                </Form.Item>
                                <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="No.Rekening"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nomor rekening harus diisi',
                                        },
                                    ]}>
                                    <Input onChange={onChangeBA} name="account_number" defaultValue={bankdata.account_number} />
                                </Form.Item>
                                <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Atas Nama"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama penanggung jawab harus diisi',
                                        },
                                    ]}>
                                    <Input onChange={onChangeBA} name="owner" defaultValue={bankdata.owner} />
                                </Form.Item>
                                <Form.Item name="currency" style={{ marginRight: `1rem` }} label="Mata Uang"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mata uang harus diisi',
                                        },
                                    ]}>
                                    <Select
                                        labelInValue
                                        defaultValue={{ value: "IDR" }}
                                        onChange={(value) => { onChangeBACurrency(value) }}
                                        name="currency"

                                    >
                                        <Option value="IDR">IDR</Option>
                                        <Option value="USD">USD</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <div className="flex justify-end">
                                    <Button type="default" onClick={() => { setDrawablecreate(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                                    <Button htmlType="submit" type="primary" size="middle" loading={loadingbtncreate}>Simpan</Button>
                                </div>
                                {/* <button type="submit" className="bg-blue-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-blue-800">Submit</button> */}
                            </Form.Item>
                        </Form>
                    </Drawer>
                </div>
            </div>
            <div className="md:p-5">
                <Table pagination={{ pageSize: 6 }} scroll={{ x: 200 }} loading={loadingdatagetBanks}
                    onRow={(record, rowIndex) => {
                        return {
                            onMouseOver: (event) => {
                                var actionsCopy = actions
                                actionsCopy[rowIndex] = true
                                setActions(actionsCopy)
                                setAction("block")
                            },
                            onMouseLeave: (event) => {
                                var actionsCopy = actions
                                actionsCopy[rowIndex] = false
                                setActions(actionsCopy)
                                setAction("hidden")
                            }
                        }
                    }}
                    columns={columnsgetBanks} dataSource={datagetBanks} />
            </div>
            <Modal
                title="Hapus Bank Account"
                visible={modaldel}
                onOk={() => { handleDeleteBA(modaldeldata) }}
                onCancel={() => setModaldel(false)}
                okText="Ya"
                cancelText="Tidak"
                okButtonProps={{ disabled: loadingdelete }}>
                Apakah anda yakin ingin menghapus <strong>{modaldeldata.name} - {modaldeldata.account_number}</strong>?
            </Modal>
        </div>
    )
}

function MigIndex({ initProps, dataProfile, sidemenu, dataDetailCompany, dataBranchList }) {
    const rt = useRouter()
    const { TabPane } = Tabs;
    const tok = initProps
    // const pathArr = rt.pathname.split("/").slice(1)
    const pathArr = ['admin', "company", 'mig', "MIG"]
    var activeTab = "profile"
    const { active } = rt.query
    if (active) {
        activeTab = active
    }
    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className="p-5 bg-white hidden md:block">
                <Tabs tabPosition={`left`} defaultActiveKey={activeTab}>
                    {
                        [144, 145].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Profile" key={`profile`}>
                            <MigIndexProfile dataProfile={dataProfile} dataDetailCompany={dataDetailCompany} tok={tok}></MigIndexProfile>
                        </TabPane>
                    }
                    {
                        [146, 147, 148, 149].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Bank Account" key={`bankAccounts`}>
                            <MigIndexBankAccount dataProfile={dataProfile} tok={tok} />
                        </TabPane>
                    }
                    {
                        [150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Locations" key={`locations`}>
                            <MigIndexLocations dataProfile={dataProfile} dataBranchList={dataBranchList} dataDetailCompany={dataDetailCompany} tok={tok} />
                        </TabPane>
                    }
                </Tabs>
            </div>
            <div className="p-5 bg-white block md:hidden">
                <Tabs tabPosition={`top`} defaultActiveKey={activeTab}>
                    {
                        [144, 145].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Profile" key={`profile`}>
                            <MigIndexProfile dataProfile={dataProfile} dataDetailCompany={dataDetailCompany} tok={tok}></MigIndexProfile>
                        </TabPane>
                    }
                    {
                        [146, 147, 148, 149].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Bank Account" key={`bankAccounts`}>
                            <MigIndexBankAccount dataProfile={dataProfile} tok={tok} />
                        </TabPane>
                    }
                    {
                        [150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Locations" key={`locations`}>
                            <MigIndexLocations dataProfile={dataProfile} dataBranchList={dataBranchList} dataDetailCompany={dataDetailCompany} tok={tok} />
                        </TabPane>
                    }
                </Tabs>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    const reqBodyMigDetail = {
        company_id: 66
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
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    if (![144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    const resourcesGC = await fetch(`https://boiling-thicket-46501.herokuapp.com/getMainCompanyDetail`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify(reqBodyMigDetail)
    })
    const resjsonGC = await resourcesGC.json()
    const dataDetailCompany = resjsonGC

    // const resourcesGB = await fetch(`https://boiling-thicket-46501.herokuapp.com/getMainBanks`, {
    //     method: `GET`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //     },
    // })
    // const resjsonGB = await resourcesGB.json()
    // const dataGetBanks = resjsonGB

    // const resourcesGL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //     },
    // })
    // const resjsonGL = await resourcesGL.json()
    // const dataLocations = resjsonGL

    const resourcesBL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getBranchCompanyList`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
        },
    })
    const resjsonBL = await resourcesBL.json()
    const dataBranchList = resjsonBL
    return {
        props: {
            initProps,
            dataProfile,
            dataDetailCompany,
            // dataGetBanks,
            // dataLocations,
            dataBranchList,
            sidemenu: "4"
        },
    }
}


export default MigIndex