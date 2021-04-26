import Layout from '../../../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useState } from 'react'
import st from '../../../../components/layout-dashboard-mig.module.css'
import Link from 'next/link'
import { Tabs, Input, Form, Table, Tree, Drawer, notification, message, Modal, Select, Button, Popconfirm, DatePicker } from 'antd'
import moment from 'moment'

function MigIndexProfile({ dataDetailCompany, tok }) {
    const rt = useRouter()
    const [editable, setEditable] = useState(false)
    const [loadingbtn, setloadingbtn] = useState(false)
    const [instanceForm] = Form.useForm()
    const onClickEdit = () => {
        setEditable(true)
    }
    if (dataDetailCompany.data.data.tanggal_pkp === null) {
        dataDetailCompany.data.data.tanggal_pkp = new Date()
    }
    const [data1, setData1] = useState({
        // id: dataDetailCompany.data.data.company_id,
        company_name: dataDetailCompany.data.data.company_name,
        // role: dataDetailCompany.data.data.role,
        address: dataDetailCompany.data.data.address,
        phone_number: dataDetailCompany.data.data.phone_number,
        image_logo: dataDetailCompany.data.data.image_logo,
        singkatan: dataDetailCompany.data.data.singkatan,
        tanggal_pkp: moment(dataDetailCompany.data.data.tanggal_pkp)/*moment(new Date())*/,
        penanggung_jawab: dataDetailCompany.data.data.penanggung_jawab,
        npwp: dataDetailCompany.data.data.npwp,
        fax: dataDetailCompany.data.data.fax,
        email: dataDetailCompany.data.data.email,
        website: dataDetailCompany.data.data.website
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
                {/* <Sticky containerSelectorFocus="#profileeDetailMigWrapper"> */}
                <div className="flex space-x-2">
                    {editable ?
                        <Button type="default" onClick={() => { setEditable(false) }}>Cancel</Button>
                        // <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md" onClick={() => { setEditable(false) }}>Cancel</button>
                        :
                        null
                    }
                    {editable ?
                        <Button type="primary" onClick={instanceForm.submit} loading={loadingbtn}>Save</Button>
                        // <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md" onClick={handleEditProfile}>Save</button>
                        :
                        <Button type="primary" onClick={() => { setEditable(true) }}>Edit</Button>
                        // <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md w-40" onClick={() => { setEditable(true) }}>Edit</button>
                    }
                </div>
                {/* </Sticky> */}
            </div>
            <div className=" mb-2 md:mb-4 flex md:flex-row flex-col">
                <h1 className="font-semibold text-base mr-3 pt-1">{dataDetailCompany.data.data.company_name}</h1>
                <h1 className="mr-3 pt-1 hidden md:block">|</h1>
                <div className="flex">
                    {
                        dataDetailCompany.data.data.is_enabled ?
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
                        <div className="md:m-5 mb-5 md:mb-0 ">
                            <h1 className="font-semibold text-sm">ID Perusahaan:</h1>
                            <h1 className="text-sm font-normal text-black">{data1.id}</h1>
                        </div>
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

function MigIndexLocations({ dataLocations, dataDetailCompany, tok }) {
    const [expandedKeys, setExpandedKeys] = useState([dataLocations.data[0].key])
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [datalocations, setdatalocations] = useState(dataLocations.data)
    const [loadingtambah, setloadingtambah] = useState(false)
    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };
    return (
        <div id="locationssDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-8">
                <div className="flex space-x-2">
                    <Link href={`/admin/company/locations/new?companyId=${dataDetailCompany.data.data.company_id}&parent=`}>
                        <Button type="primary" size="middle" loading={loadingtambah} onClick={() => { setloadingtambah(true) }}>Tambah</Button>
                        {/* <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md w-24 md:w-40"> Create</button> */}
                    </Link>
                </div>
            </div>
            <div className="p-5">
                <h1 className="text-sm font-semibold">Pilih Parent terakhir</h1>
                {/* <Tree treeData={treeData} autoExpandParent={autoExpandParent} selectable selectedKeys={selectedtree} checkable checkedKeys={checkedtree} onCheck={() => { setEditable(true) }}>
                </Tree> */}
                <Tree
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    treeData={datalocations}
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
                                <div className="mr-20">
                                    {nodeData.title}
                                </div>
                                <div className={`hidden mx-2`} id={`node${nodeData.key}`}>
                                    <Link href={`/admin/company/locations/new?parent=${nodeData.id}&companyId=${dataDetailCompany.data.data.company_id}`}>
                                        <a className="mx-2 pb-1" alt="add"><PlusOutlined /></a>
                                    </Link>
                                    <Link href={`/admin/company/locations/update/${nodeData.id}?parent=${nodeData.title}`}>
                                        <a className="mx-2 pb-1" alt="update"><EditOutlined /></a>
                                    </Link>
                                    <Popconfirm title="Yakin hapus lokasi?" onConfirm={() => { message.success("berhasil dihapus") }} onCancel={() => { message.error("Gagal dihapus") }}>
                                        <a className="mx-2 pb-1" alt="delete"><DeleteOutlined /></a>
                                    </Popconfirm>
                                </div>
                            </div>
                        </>
                    )
                    }
                    blockNode={true}
                />
            </div>
        </div>
    )
}

function MigIndexBankAccount({ dataGetBanks, tok }) {
    if (!dataGetBanks.data) {
        dataGetBanks.data = []
    }
    const rt = useRouter()
    const { Option } = Select
    const [editable, setEditable] = useState(false)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [drawableedit, setDrawableedit] = useState(false)
    const [modaldel, setModaldel] = useState(false)
    const [modaldeldata, setModaldeldata] = useState({})
    const [loadingbtncreate, setloadingbtncreate] = useState(false)
    const [loadingbtnedit, setloadingbtnedit] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)
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
    for (var i = 0; i < dataGetBanks.data.length; i++) {
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
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
        console.log("isi bank data: " + bankdata.name)
    }
    const handleSubmitEditBA = () => {
        console.log("isidata2: " + recordrow)
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
        {
            title: 'ID',
            dataIndex: 'id',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.id}
                        </>
                }
            }
        },
        {
            title: 'Bank',
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
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
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
                                        <Button onClick={() => { setModaldel(true); setModaldeldata(record) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `0.4rem` }}>
                                            <DeleteOutlined />
                                        </Button>
                                        <Button onClick={() => { setDrawableedit(true); setRecordrow(record) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `0.4rem` }}>
                                            <EditOutlined />
                                        </Button>
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
    var datagetBanks = []
    dataGetBanks.data ?
        datagetBanks = dataGetBanks.data.map((doc, idx) => {
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
        :
        datagetBanks = []
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
                    <Button type="primary" onClick={() => { setDrawablecreate(true) }}>Add New</Button>
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
                                    <Button type="default" onClick={() => { setDrawableedit(false) }} style={{ marginRight: `1rem` }}>Cancel</Button>
                                    <Button htmlType="submit" type="primary" size="middle" loading={loadingbtnedit}>Save</Button>
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
                                    <Button type="default" onClick={() => { setDrawablecreate(false) }} style={{ marginRight: `1rem` }}>Cancel</Button>
                                    <Button htmlType="submit" type="primary" size="middle" loading={loadingbtncreate}>Save</Button>
                                </div>
                                {/* <button type="submit" className="bg-blue-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-blue-800">Submit</button> */}
                            </Form.Item>
                        </Form>
                    </Drawer>
                </div>
            </div>
            <div className="md:p-5">
                <Table pagination={{ pageSize: 6 }} scroll={{ x: 200 }}
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
                okButtonProps={{ disabled: loadingdelete }}>
                Apakah anda yakin ingin menghapus akun bank ini?
            </Modal>
        </div>
    )
}

function MigIndex({ initProps, dataProfile, sidemenu, dataDetailCompany, dataGetBanks, dataLocations }) {
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
                    <TabPane tab="Profile" key={`profile`}>
                        <MigIndexProfile dataDetailCompany={dataDetailCompany} tok={tok}></MigIndexProfile>
                    </TabPane>
                    <TabPane tab="Bank Account" key={`bankAccounts`}>
                        <MigIndexBankAccount dataGetBanks={dataGetBanks} tok={tok} />
                    </TabPane>
                    <TabPane tab="Locations" key={`locations`}>
                        <MigIndexLocations dataLocations={dataLocations} dataDetailCompany={dataDetailCompany} tok={tok} />
                    </TabPane>
                </Tabs>
            </div>
            <div className="p-5 bg-white block md:hidden">
                <Tabs tabPosition={`top`} defaultActiveKey={activeTab}>
                    <TabPane tab="Profile" key={`profile`}>
                        <MigIndexProfile dataDetailCompany={dataDetailCompany} tok={tok}></MigIndexProfile>
                    </TabPane>
                    <TabPane tab="Bank Account" key={`bankAccounts`}>
                        <MigIndexBankAccount dataGetBanks={dataGetBanks} tok={tok} />
                    </TabPane>
                    <TabPane tab="Locations" key={`locations`}>
                        <MigIndexLocations dataLocations={dataLocations} dataDetailCompany={dataDetailCompany} tok={tok} />
                    </TabPane>
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

    const resourcesGB = await fetch(`https://boiling-thicket-46501.herokuapp.com/getMainBanks`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
        },
    })
    const resjsonGB = await resourcesGB.json()
    const dataGetBanks = resjsonGB

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
            dataGetBanks,
            dataLocations,
            sidemenu: "4"
        },
    }
}


export default MigIndex