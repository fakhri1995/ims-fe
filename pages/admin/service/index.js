import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import { DownOutlined, FolderOpenOutlined, EditOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Button, Table, Dropdown, Menu, Form, Input, message, Select } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'
import Modal from 'antd/lib/modal/Modal'


function ServiceCatalog({ initProps, dataProfile, sidemenu }) {
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    const { Option } = Select
    const { Search } = Input

    //dataDummies
    const dataSource = [
        {
            key: '1',
            itemName: 'Adobe Illustrator',
            categoryName: 'Software Installation',
            usageType: 'Permanent',
            status: 'Published'
        },
        {
            key: '2',
            itemName: 'Adobe Photoshop CS6',
            categoryName: 'Software Installation',
            usageType: 'Permanent',
            status: 'Published'
        },
        {
            key: '3',
            itemName: 'Microsoft Outlook',
            categoryName: 'Software Installation',
            usageType: 'Permanent',
            status: 'Published'
        },
        {
            key: '4',
            itemName: 'Microsoft Excel',
            categoryName: 'Software Installation',
            usageType: 'Permanent',
            status: 'Published'
        },
        {
            key: '5',
            itemName: 'Apple Macbook',
            categoryName: 'Hardware Provisioning',
            usageType: 'Permanent',
            status: 'Published'
        },
        {
            key: '6',
            itemName: 'Scan Printer Epson',
            categoryName: 'Hardware Provisioning',
            usageType: 'Permanent',
            status: 'Published'
        },
        {
            key: '7',
            itemName: 'Employement Verification Letter',
            categoryName: 'HR Management',
            usageType: 'Permanent',
            status: 'Published'
        },
    ];
    const columns = [
        {
            title: 'Nama Item',
            dataIndex: 'itemName',
            key: 'itemName',
            render: (text, record, index) => (
                <>
                    <Link href="#">
                        <a href="#"><h1 className="font-semibold hover:text-gray-500">{record.itemName}</h1></a>
                    </Link>
                </>
            )
        },
        {
            title: 'Kategori',
            dataIndex: 'categoryName',
            key: 'categoryName',
            render: (text, record, index) => (
                <>
                    <Link href="#">
                        <a href="#"><h1 className="hover:text-gray-500">{record.categoryName}</h1></a>
                    </Link>
                </>
            )
        },
        {
            title: 'Tipe Penggunaan',
            dataIndex: 'usageType',
            key: 'usageType',
            render: (text, record, index) => (
                <>
                    <Link href="#">
                        <a href="#"><h1 className="hover:text-gray-500">{record.usageType}</h1></a>
                    </Link>
                </>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => (
                <>
                    <Link href="#">
                        <a href="#">
                            <div className="py-1 px-2 rounded-l-full rounded-r-full text-green-500 border border-green-500 bg-green-100 text-center text-xs">{record.status}</div>
                        </a>
                    </Link>
                </>
            )
        },
    ]

    //Menu
    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => setmodaltambahkateg(true)}>
                Service Category
          </Menu.Item>
            <Menu.Item key="2" onClick={()=> rt.push(`/admin/service/create`)}>
                Service Item
          </Menu.Item>
        </Menu>
    );

    //onChange
    const onChangeTab = (e, jenis) => {
        if (jenis === "all") {
            settab({ all: "block", hardware: 'hidden', software: "hidden", hrd: "hidden" })
            setdatatable(dataSource)
        }
        else if (jenis === "hardware") {
            settab({ all: "hidden", hardware: 'block', software: "hidden", hrd: "hidden" })
            setdataeditkateg({
                ...dataeditkateg,
                name: "Hardware Provisioning"
            })
            setdatatable(dataSource)
            setdatatable(prev => {
                return prev.filter((doc, idx) => { return doc.categoryName == "Hardware Provisioning" })
            })
        }
        else if (jenis === "software") {
            settab({ all: "hidden", hardware: 'hidden', software: "block", hrd: "hidden" })
            setdataeditkateg({
                ...dataeditkateg,
                name: "Software Installation"
            })
            setdatatable(dataSource)
            setdatatable(prev => {
                return prev.filter((doc, idx) => { return doc.categoryName == "Software Installation" })
            })
        }
        else if (jenis === "hrd") {
            settab({ all: "hidden", hardware: 'hidden', software: "hidden", hrd: "block" })
            setdataeditkateg({
                ...dataeditkateg,
                name: "HR Management"
            })
            setdatatable(dataSource)
            setdatatable(prev => {
                return prev.filter((doc, idx) => { return doc.categoryName == "HR Management" })
            })
        }
    }
    const onChangeEditCategory = (e) => {

    }
    const onChangeTambahCategory = (e) => {

    }

    //useState
    const [tab, settab] = useState({
        all: "block",
        hardware: "hidden",
        software: "hidden",
        hrd: "hidden",
    })
    const [datatable, setdatatable] = useState(dataSource)
    const [dataeditkateg, setdataeditkateg] = useState({
        name: '',
        description: ''
    })
    const [datatambahkateg, setdatatambahkateg] = useState({
        name: '',
        description: ''
    })
    const [modaleditkateg, setmodaleditkateg] = useState(false)
    const [modaltambahkateg, setmodaltambahkateg] = useState(false)
    const [loadingbtneditkateg, setloadingbtneditkateg] = useState(false)
    const [loadingbtntambahkateg, setloadingbtntambahkateg] = useState(false)

    //handler
    const handleEditCategory = () => {
        message.info("belum nyambung ke API")
    }
    const handleTambahCategory = () => {
        message.info("belum nyambung ke API")
    }
    return (
        <Layout tok={initProps} pathArr={pathArr} dataProfile={dataProfile} sidemenu={sidemenu} st={st}>
            <div className="w-full h-80 border-t border-opacity-30 border-gray-500 bg-white">
                <div className="w-full flex justify-between p-3">
                    <div>
                        <p className="font-semibold text-lg">Service Catalog</p>
                    </div>
                    <div>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button style={{ backgroundColor: `rgb(24,144,255)`, color: `white` }}>
                                Tambah Baru <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                <div className="w-full grid grid-cols-8">
                    <div className="col-span-2 flex flex-col">
                        <div className="p-3">
                            <p className=" text-base font-semibold">Service Categories</p>
                        </div>
                        <div>
                            {
                                tab.all === "block" ?
                                    < div className={`p-2 cursor-pointer flex items-center text-sm font-semibold bg-blue-700 text-white rounded`}>
                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                        Semua Service
                                    </div>
                                    :
                                    < div className={`p-2 cursor-pointer hover:text-gray-900 flex items-center text-sm font-semibold`} onClick={(e) => { onChangeTab(e, 'all') }}>
                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                        Semua Service
                                    </div>
                            }
                            <hr />
                            {
                                tab.hardware === "block" ?
                                    <div className={`p-2 cursor-pointer flex items-center text-sm font-semibold bg-blue-700 text-white rounded`}>
                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                        Hardware Provisioning
                                    </div>
                                    :
                                    <div className={`p-2 cursor-pointer hover:text-gray-900 flex items-center text-sm font-semibold`} onClick={(e) => { onChangeTab(e, 'hardware') }}>
                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                        Hardware Provisioning
                                    </div>
                            }
                            {
                                tab.software === "block" ?
                                    <div className={`p-2 cursor-pointer flex items-center text-sm font-semibold bg-blue-700 text-white rounded`}>
                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                        Software Installation
                                    </div>
                                    :
                                    <div className={`p-2 cursor-pointer hover:text-gray-900 flex items-center text-sm font-semibold`} onClick={(e) => { onChangeTab(e, 'software') }}>
                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                        Software Installation
                                    </div>
                            }
                            {
                                tab.hrd === "block" ?
                                    <div className={`p-2 cursor-pointer flex items-center text-sm font-semibold bg-blue-700 text-white rounded`}>
                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                        HR Management
                                    </div>
                                    :
                                    <div className={`p-2 cursor-pointer hover:text-gray-900 flex items-center text-sm font-semibold`} onClick={(e) => { onChangeTab(e, 'hrd') }}>
                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                        HR Management
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="col-span-6">
                        {/* All */}
                        <div className={`${tab.all} py-5 px-7 flex flex-col`}>
                            <div className="flex justify-between items-center mb-5">
                                <div>
                                    <Select bordered={false} defaultValue={`1`} size="large" style={{ fontWeight: `bold` }}>
                                        <Option value={`1`}>All Service Items</Option>
                                        <Option value={`published`}>Published</Option>
                                        <Option value={`drafts`}>Drafts</Option>
                                    </Select>
                                    <p className="text-xs text-gray-500 pl-3">Viewing all service items from all categories.</p>
                                </div>
                                <div>
                                    <Search placeholder="input search text" allowClear style={{ width: `100%` }} />
                                </div>
                            </div>
                            <div>
                                <Table columns={columns} dataSource={datatable} rowSelection={{ type: 'checkbox' }} />
                            </div>
                        </div>

                        {/* Hardware, Software, HR */}
                        <div className={`py-5 px-7 flex flex-col`}>
                            <div className="flex justify-between items-center mb-5">
                                <div className="flex items-center">
                                    <div className="flex items-center mr-3">
                                        {tab.hardware === "block" && <p className="font-semibold m-0">Hardware Provisioning</p>}
                                        {tab.software === "block" && <p className="font-semibold m-0">Software Installation</p>}
                                        {tab.hrd === "block" && <p className="font-semibold m-0">HR Management</p>}
                                    </div>
                                    <div className="w-auto h-6 px-1 border-2 rounded-sm cursor-pointer hover:bg-gray-200 flex justify-center items-center" onClick={() => setmodaleditkateg(true)}><EditOutlined /></div>
                                </div>
                                <div>
                                    <Search placeholder="input search text" allowClear style={{ width: `100%` }} />
                                </div>
                            </div>
                            <div>
                                <Table columns={columns} dataSource={datatable} rowSelection={{ type: 'checkbox' }} />
                            </div>
                        </div>

                        {/* Modal */}
                        <Modal
                            title={`Edit Service Category`}
                            visible={modaleditkateg}
                            onCancel={() => { setmodaleditkateg(false) }}
                            maskClosable={false}
                            footer={null}
                            style={{ top: `3rem` }}
                            width={800}
                            destroyOnClose={true}
                        >
                            <Form layout="vertical" onFinish={handleEditCategory} initialValues={dataeditkateg}>
                                <div className="flex flex-col mb-5">
                                    <Form.Item label="Nama Kategori" name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama Kategori wajib diisi',
                                            },
                                        ]}>
                                        <Input onChange={onChangeEditCategory} name="name" defaultValue={dataeditkateg.name} allowClear />
                                    </Form.Item>
                                    <Form.Item label="Deskripsi" name="description">
                                        <Input.TextArea onChange={onChangeEditCategory} defaultValue={dataeditkateg.description} name="description" allowClear />
                                    </Form.Item>
                                </div>
                                <Button loading={loadingbtneditkateg} type="primary" size="large">Edit</Button>
                            </Form>
                        </Modal>

                        <Modal
                            title={`Tambah Service Category`}
                            visible={modaltambahkateg}
                            onCancel={() => { setmodaltambahkateg(false) }}
                            maskClosable={false}
                            footer={null}
                            style={{ top: `3rem` }}
                            width={800}
                            destroyOnClose={true}
                        >
                            <Form layout="vertical" onFinish={handleTambahCategory}>
                                <div className="flex flex-col mb-5">
                                    <Form.Item label="Nama Kategori" name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama Kategori wajib diisi',
                                            },
                                        ]}>
                                        <Input onChange={onChangeTambahCategory} name="name" allowClear />
                                    </Form.Item>
                                    <Form.Item label="Deskripsi" name="description">
                                        <Input.TextArea onChange={onChangeTambahCategory} name="description" allowClear />
                                    </Form.Item>
                                </div>
                                <Button loading={loadingbtntambahkateg} type="primary" size="large">Tambah</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
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
    const resources = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjson = await resources.json()
    const dataProfile = resjson

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "4"
        },
    }
}

export default ServiceCatalog