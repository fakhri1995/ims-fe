import Layout from '../../components/layout-dashboard-clients'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import EditOutlined from '@ant-design/icons/EditOutlined'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import Link from 'next/link'
import { useState } from 'react'
import st from '../../components/layout-dashboard-clients.module.css'
import {Input,Form,Table,Upload,notification,Drawer,Button} from 'antd'

function ClientsIndex({ initProps, dataProfile, sidemenu, dataCompanyList }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [loadingupload, setLoadingupload] = useState(false)
    const [loadingbtn, setloadingbtn] = useState(false)
    const [instanceForm] = Form.useForm()
    const [newclients, setnewclients] = useState({
        name: '',
        role: 2,
        address: '',
        phone_number: '',
        image_logo: '',
        parent_id: null
    })
    var dataTable = []
    if (!dataCompanyList.data.data) {
        dataTable = []
        notification['error']({
            message: dataCompanyList.message.errorInfo.status_detail,
            duration: 3
        })
        rt.push('/dashboard/admin')
    }
    else {
        dataTable = dataCompanyList.data.data.companies.map((doc, idx) => {
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
            dataIndex: 'image_logo',
            render: (text, record, index) => (
                <>
                    <Link href={`/company/${record.company_id}?originPath=Admin`}>
                        <a><img src={record.image_logo} alt="imageProfile" className=" object-cover w-10 h-10 rounded-full" /></a>
                    </Link>
                </>
            )
        },
        {
            title: 'ID',
            dataIndex: 'company_id',
            render: (text, record, index) => (
                <>
                    <Link href={`/company/${record.company_id}?originPath=Admin`}>
                        <a><h1>{record.company_id}</h1></a>
                    </Link>
                </>
            ),
            sorter: (a, b) => a.company_id - b.company_id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nama Perusahaan',
            dataIndex: 'company_name',
            render: (text, record, index) => (
                <>
                    <Link href={`/company/${record.company_id}?originPath=Admin`}>
                        <a><h1>{record.company_name}</h1></a>
                    </Link>
                </>
            ),
            sorter: (a, b) => a.company_name.localeCompare(b.company_name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Status',
            dataIndex: 'is_enabled',
            render: (text, record, index) => (
                <>
                    <Link href={`/company/${record.company_id}?originPath=Admin`}>
                        {
                            record.is_enabled ?
                                <a><div className=" bg-blue-100 text-blue-600 border-blue-600 border py-1 px-3 rounded-md text-center w-40">AKTIF MODULE</div></a>
                                :
                                <a><div className=" bg-red-100 text-red-600 border-red-600 border py-1 px-3 rounded-md text-center w-52">NON-AKTIF MODULE</div></a>
                        }
                    </Link>
                </>
            ),
            filters: [
                {
                    text: 'Aktif',
                    value: true,
                },
                {
                    text: 'Non-aktif',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.is_enabled === value,
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            render: (text, record, index) => (
                <>
                    {
                        events[index] ?
                            <>
                                <Link href={`/company/${record.company_id}?originPath=Admin`}>
                                    {/* {events[index]} */}
                                    {/* <Link href={`/company/${record.company_id}?originPath=Admin`}> */}
                                    <a><EditOutlined /></a>
                                    {/* </Link> */}
                                </Link>
                            </>
                            :
                            null
                    }
                </>
            )
        }
    ]
    const closeClientsDrawer = () => {
        setnewclients({
            name: '',
            role: 2,
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
    const handleSubmitCreateClients = () => {
        setloadingbtn(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanyMember`, {
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
                        rt.push(`/company?originPath=Admin`)
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
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} originPath={originPath} st={st}>
            <div className="flex justify-start md:justify-end p-3 md:border-t-2 md:border-b-2 bg-white mb-4 md:mb-8">
                <div className="flex space-x-2">
                    <Button type="primary" size="large" onClick={() => { setDrawablecreate(true) }}>Tambah Perusahaan</Button>
                    {/* <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md w-40" onClick={() => { setDrawablecreate(true) }}> Create</button> */}
                    <Drawer title="Buat Perusahaan Clients" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false); closeClientsDrawer(); instanceForm.resetFields() }} width={420} destroyOnClose={true}>
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
                                {/* <div className="md:m-4 mb-5 md:mb-0 ">
                                    <Form.Item name="role" label="Role"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Role wajib diisi',
                                            },
                                        ]}
                                    >
                                        <input type="number" value={newclients.role} name={'role'} onChange={onChangeCreateClients} style={{ width: `20rem` }} />
                                    </Form.Item>
                                </div> */}
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
                                <Button type="primary" size="middle" onClick={instanceForm.submit} loading={loadingbtn} style={{ marginBottom: `1rem` }}>Simpan</Button>
                            </Form>
                        </div>
                        {/* <button className="bg-blue-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-blue-800" onClick={handleSubmitCreateClients}>Simpan</button> */}
                    </Drawer>
                </div>
            </div>
            <div className="p-5 mt-5 flex flex-col space-y-5 shadow-md rounded-md w-full h-auto bg-white">
                <Table
                    pagination={{ pageSize: 6 }}
                    scroll={{ x: 200 }}
                    onRow={(record, rowIndex) => {
                        return {
                            onMouseOver: (event) => {
                                var eventscopy = events
                                eventscopy[rowIndex] = true
                                setEvents(eventscopy)
                                setEvent("block")
                                setColorhover("bg-blue-100")
                            },
                            onMouseLeave: (event) => {
                                var eventscopy = events
                                eventscopy[rowIndex] = false
                                setEvents(eventscopy)
                                setEvent("hidden")
                                setColorhover("")
                            }
                        }
                    }}
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

    const resourcesGCL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyList`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const resjsonGCL = await resourcesGCL.json()
    const dataCompanyList = resjsonGCL
    return {
        props: {
            initProps,
            dataProfile,
            dataCompanyList,
            sidemenu: "4"
        }
    }
}

export default ClientsIndex