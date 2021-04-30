import Layout from '../../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import EditOutlined from '@ant-design/icons/EditOutlined'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import Link from 'next/link'
import { useState } from 'react'
import st from '../../../components/layout-dashboard-clients.module.css'
import { Input, Form, Table, Upload, notification, Drawer, Button, TreeSelect, Select } from 'antd'

function ClientsIndex({ initProps, dataProfile, sidemenu, dataCompanyList, dataLocations }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [loadingupload, setLoadingupload] = useState(false)
    const [loadingbtn, setloadingbtn] = useState(false)
    const [instanceForm] = Form.useForm()
    const { Option } = Select
    const [newclients, setnewclients] = useState({
        name: '',
        role: 2,
        address: '',
        phone_number: '',
        image_logo: '',
        parent_id: 0
    })
    var dataTable = []
    if (!dataCompanyList.data) {
        dataTable = []
        notification['error']({
            message: dataCompanyList.message.errorInfo.status_detail,
            duration: 3
        })
        rt.push('/admin/company')
    }
    else {
        dataTable = dataCompanyList.data.filter(dataa => dataa.company_id != 66).map((doc, idx) => {
            return ({
                image_logo: doc.image_logo,
                company_id: doc.company_id,
                company_name: doc.company_name,
                is_enabled: doc.is_enabled
            })
        })
    }
    const eventsArr = []
    for (var i = 0; i < dataTable.length; i++) {
        eventsArr.push(false)
    }
    const [events, setEvents] = useState(eventsArr)
    const [event, setEvent] = useState(false)
    const [colorhover, setColorhover] = useState("")
    const columnsTable = [
        {
            title: 'Logo',
            dataIndex: 'image_logo',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            <Link href={`/admin/company/${record.company_id}`}>
                                <a><img src={record.image_logo} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full" /></a>
                            </Link>
                        </>
                }
            }
        },
        {
            title: 'ID',
            dataIndex: 'company_id',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            <Link href={`/admin/company/${record.company_id}`}>
                                <a><h1>{record.company_id}</h1></a>
                            </Link>
                        </>
                }
            },
            // sorter: (a, b) => a.company_id - b.company_id,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nama Perusahaan',
            dataIndex: 'company_name',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            <Link href={`/admin/company/${record.company_id}`}>
                                <a><h1>{record.company_name}</h1></a>
                            </Link>
                        </>
                }
            },
            // sorter: (a, b) => a.company_name.localeCompare(b.company_name),
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Status',
            dataIndex: 'is_enabled',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            <Link href={`/admin/company/${record.company_id}`}>
                                {
                                    record.is_enabled ?
                                        <a><div className=" bg-blue-100 text-blue-600 border-blue-600 border py-1 px-3 rounded-md text-center w-40">AKTIF MODULE</div></a>
                                        :
                                        <a><div className=" bg-red-100 text-red-600 border-red-600 border py-1 px-3 rounded-md text-center w-52">NON-AKTIF MODULE</div></a>
                                }
                            </Link>
                        </>
                }
            },
            // filters: [
            //     {
            //         text: 'Aktif',
            //         value: true,
            //     },
            //     {
            //         text: 'Non-aktif',
            //         value: false,
            //     },
            // ],
            // onFilter: (value, record) => record.is_enabled === value,
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            align: `center`,
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:

                        <>
                            {/* {
                                events[index] ?
                                    <> */}
                                        <Button onClick={() => { rt.push(`/admin/company/${record.company_id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `1rem` }}>
                                            <EditOutlined />
                                        </Button>
                                        {/* <Link href={`/admin/company/${record.company_id}`}> */}
                                        {/* {events[index]} */}
                                        {/* <Link href={`/company/${record.company_id}?originPath=Admin`}> */}
                                        {/* <a><EditOutlined /></a> */}
                                        {/* </Link> */}
                                        {/* </Link> */}
                                    {/* </>
                                    :
                                    null
                            } */}
                        </>
                }
            }
        }
    ]
    const closeClientsDrawer = () => {
        setnewclients({
            name: '',
            role: 0,
            address: '',
            phone_number: '',
            image_logo: '',
            parent_id: null
        })
    }

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
            setLoadingupload(true)
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
                    setLoadingupload(false)
                    setnewclients({
                        ...newclients,
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
    const onChangeCreateClients = (e) => {
        var val = e.target.value
        if (e.target.name === "role") {
            val = parseInt(e.target.value)
        }
        setnewclients({
            ...newclients,
            [e.target.name]: val
        })
    }
    const onChangeParent = (value) => {
        setnewclients({
            ...newclients,
            parent_id: value
        })
    }
    const handleSubmitCreateClients = () => {
        setloadingbtn(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanyClient`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newclients)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingbtn(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setnewclients({
                        name: '',
                        role: 0,
                        address: '',
                        phone_number: '',
                        image_logo: '',
                        parent_id: null
                    })
                    setTimeout(() => {
                        setDrawablecreate(false)
                        rt.push(`/admin/company`)
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
        console.log("isi bank data: " + newclients.name)
    }
    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className="flex justify-start md:justify-end p-3 md:border-t-2 md:border-b-2 bg-white mb-4 md:mb-8">
                <div className=" w-full flex justify-between items-center px-2">
                    <h1 className="font-bold">Clients</h1>
                    <Button type="primary" size="large" onClick={() => { setDrawablecreate(true) }}>Add New</Button>
                </div>
            </div>
            <div className="p-5 mt-5 flex flex-col space-y-5 rounded-md w-full h-auto bg-white">
                <Table
                    pagination={{ pageSize: 6 }}
                    scroll={{ x: 200 }}
                    // onRow={(record, rowIndex) => {
                    //     return {
                    //         onMouseOver: (event) => {
                    //             var eventscopy = events
                    //             eventscopy[rowIndex] = true
                    //             setEvents(eventscopy)
                    //             setEvent("block")
                    //             setColorhover("bg-blue-100")
                    //         },
                    //         onMouseLeave: (event) => {
                    //             var eventscopy = events
                    //             eventscopy[rowIndex] = false
                    //             setEvents(eventscopy)
                    //             setEvent("hidden")
                    //             setColorhover("")
                    //         }
                    //     }
                    // }}
                    columns={columnsTable}
                    dataSource={dataTable}
                />
                {/* {
                    dataCompanyList.data.companies.map((doc, idx) => {
                        return (
                            <div className="p-4 grid grid-col hover:bg-blue-100" onMouseOver={() => onMouseOverCells(idx)} onMouseLeave={() => onMouseLeaveCells(idx)}>
                                <img src={doc.image_logo} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full mr-8" />
                                <div className="mr-14 w-40 text-xs md:text-sm">
                                    {doc.company_name}
                                </div>
                                {
                                    events[idx] ?
                                        <> {events[idx]}
                                            <Link href={{
                                                pathname: `/company/${doc.company_id}`,
                                                query: {
                                                    originPath: 'Admin'
                                                }
                                            }}>
                                                <EditOutlined />
                                            </Link>
                                        </>
                                        :
                                        null
                                }
                            </div>
                        )
                    })
                } */}
            </div>
            <Drawer title="Buat Perusahaan Clients" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false); closeClientsDrawer(); instanceForm.resetFields() }} width={370} destroyOnClose={true}>
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
                                {newclients.image_logo ? <img src={newclients.image_logo} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
                    </div>
                    <Form layout="vertical" className="createClientsForm" onFinish={handleSubmitCreateClients} form={instanceForm}>
                        <div className="md:m-4 mb-5 md:mb-0 ">
                            <Form.Item name="name" label="Nama Perusahaan"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nama perusahaan wajib diisi',
                                    },
                                ]}
                            >
                                <Input name="name" onChange={onChangeCreateClients}></Input>
                            </Form.Item>
                        </div>
                        <div className="md:m-4 mb-5 md:mb-0 ">
                            <Form.Item name="address" label="Alamat"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Alamat wajib diisi',
                                    },
                                ]}
                            >
                                <Input name="address" onChange={onChangeCreateClients}></Input>
                            </Form.Item>
                        </div>
                        <div className="md:m-4 mb-5 md:mb-0 ">
                            <Form.Item name="phone_number" label="Telepon"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nomor telepon wajib diisi',
                                    },
                                ]}
                            >
                                <Input name="phone_number" onChange={onChangeCreateClients}></Input>
                            </Form.Item>
                        </div>
                        <div className="mb:m-4 mb-5 md:mb-0">
                            <Form.Item name="parent_id" label="Parent Perusahaan"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nomor telepon wajib diisi',
                                    },
                                ]}>
                                <TreeSelect

                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={dataLocations.data}
                                    placeholder="Pilih parent"
                                    treeDefaultExpandAll
                                    onChange={(value) => { onChangeParent(value) }}
                                />
                            </Form.Item>
                        </div>
                        <div className="mb:m-4 mb-5 md:mb-0">
                            <Form.Item label="Role" name="role" rules={[
                                {
                                    required: true,
                                    message: 'Role Wajib diisi',
                                },
                            ]}>
                                <Select placeholder="Pilih role" onChange={(value) => { setnewclients({ ...newclients, role: value }) }}>
                                    <Option value={2}>Klien</Option>
                                    <Option value={3}>Cabang</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="flex justify-end">
                        <Button type='default' onClick={()=>{setDrawablecreate(false)}} style={{marginRight:`1rem`}}>Cancel</Button>
                        <Button type="primary" size="middle" onClick={instanceForm.submit} loading={loadingbtn} style={{ marginBottom: `1rem` }}>Save</Button>
                        </div>
                    </Form>
                </div>
            </Drawer>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    const reqBody = {
        page: 1,
        rows: 50,
        order_by: "asc"
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

    const resourcesGCL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getClientCompanyList`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(reqBody)
    })
    const resjsonGCL = await resourcesGCL.json()
    const dataCompanyList = resjsonGCL

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
            dataCompanyList,
            dataLocations,
            sidemenu: "4"
        }
    }
}

export default ClientsIndex