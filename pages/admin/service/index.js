import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import { DownOutlined, FolderOpenOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Button, Table, Dropdown, Menu, Form, Input, Select, notification, Modal } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'
import Sticky from 'wil-react-sticky'

function ServiceCatalog({ initProps, dataProfile, dataListServiceCategories, dataListServiceItem, sidemenu }) {
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    const { Option } = Select
    const { Search } = Input
    const tabnameArr = ["all"]
    const loop = ["block"]
    dataListServiceCategories.data.map((doc, idx) => {
        var nama = doc.nama_kategori.split(" ")[0]
        tabnameArr.push(nama)
    })
    for (var i = 0; i < dataListServiceCategories.data.length; i++) {
        loop.push("hidden")
    }

    //data Source
    const dataListServiceItemMap = dataListServiceItem.data.map((doc, idx) => {
        return ({
            id: doc.id,
            itemName: doc.nama_service_item,
            shortDesc: doc.deskripsi_singkat,
            categoryName: doc.nama_kategori,
            status: doc.is_publish
        })
    })
    const columns = [
        {
            title: 'Nama Item',
            dataIndex: 'itemName',
            key: 'itemName',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {
                                [188, 190, 191, 192, 193].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    <Link href={`/admin/service/${record.id}`}>
                                        <a href="#"><h1 className="font-semibold hover:text-gray-500">{record.itemName}</h1></a>
                                    </Link>
                                    :
                                    <h1 className="font-semibold hover:text-gray-500">{record.itemName}</h1>
                            }
                        </>
                }
            }
        },
        {
            title: 'Deskripsi',
            dataIndex: 'shortDesc',
            key: 'shortDesc',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {
                                [188, 190, 191, 192, 193].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    <Link href={`/admin/service/${record.id}`}>
                                        <a href="#"><h1 className="hover:text-gray-500 text-xs">{record.shortDesc}</h1></a>
                                    </Link>
                                    :
                                    <h1 className="hover:text-gray-500 text-xs">{record.shortDesc}</h1>
                            }
                        </>
                }
            }
        },
        {
            title: 'Kategori',
            dataIndex: 'categoryName',
            key: 'categoryName',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {
                                [188, 190, 191, 192, 193].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    <Link href={`/admin/service/${record.id}`}>
                                        <a href="#"><h1 className="hover:text-gray-500 text-sm">{record.categoryName}</h1></a>
                                    </Link>
                                    :
                                    <h1 className="hover:text-gray-500 text-sm">{record.categoryName}</h1>
                            }
                        </>
                }
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {
                                [188, 190, 191, 192, 193].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    <Link href={`/admin/service/${record.id}`}>
                                        <a href="#">
                                            {
                                                record.status ?
                                                    <div className="py-1 px-2 rounded-l-full rounded-r-full text-green-500 border border-green-500 bg-green-100 text-center text-xs">Published</div>
                                                    :
                                                    <div className="py-1 px-2 rounded-l-full rounded-r-full text-gray-500 border border-gray-500 bg-gray-100 text-center text-xs">Draft</div>
                                            }
                                        </a>
                                    </Link>
                                    :
                                    <>
                                        {
                                            record.status ?
                                                <div className="py-1 px-2 rounded-l-full rounded-r-full text-green-500 border border-green-500 bg-green-100 text-center text-xs">Published</div>
                                                :
                                                <div className="py-1 px-2 rounded-l-full rounded-r-full text-gray-500 border border-gray-500 bg-gray-100 text-center text-xs">Draft</div>
                                        }
                                    </>
                            }
                        </>
                }
            }
        },
    ]

    //useState
    const [datatable, setdatatable] = useState(dataListServiceItemMap)
    const [datacurrtable, setdatacurrtable] = useState(dataListServiceItemMap)
    const [dataeditkateg, setdataeditkateg] = useState({
        id: 0,
        nama_kategori: '',
        deskripsi: ''
    })
    const [datatambahkateg, setdatatambahkateg] = useState({
        nama_kategori: '',
        deskripsi: ''
    })
    const [tabnameArrVal, settabnameArrVal] = useState(loop)
    const [currentselectkateg, setcurrentselectkateg] = useState("all")
    const [defaultpub, setdefaultpub] = useState(1)
    const [idkateg, setidkateg] = useState(0)
    const [modaleditkateg, setmodaleditkateg] = useState(false)
    const [modaltambahkateg, setmodaltambahkateg] = useState(false)
    const [modalkonfhapuskateg, setmodalkonfhapuskateg] = useState(false)
    const [loadingbtneditkateg, setloadingbtneditkateg] = useState(false)
    const [loadingbtntambahkateg, setloadingbtntambahkateg] = useState(false)
    const [loadingbtnhapuskateg, setloadingbtnhapuskateg] = useState(false)

    //Menu
    const menu = (
        <Menu>
            {
                [184].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                <Menu.Item key="1" onClick={() => setmodaltambahkateg(true)}>
                    Service Category
                </Menu.Item>
            }
            {
                [189].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                <Menu.Item key="2" onClick={() => rt.push(`/admin/service/create`)}>
                    Service Item
                </Menu.Item>
            }
        </Menu>
    );

    //onChange
    const onChangeTab = (e, jenis, idxjenis, namakateg, deskripsi, id) => {
        setdefaultpub(1)
        setidkateg(id)
        if (idxjenis === 0) {
            const temp = tabnameArrVal
            temp[0] = "block"
            settabnameArrVal(temp)
            for (var i = 0; i < tabnameArrVal.length; i++) {
                if (i != 0) {
                    const temp2 = tabnameArrVal
                    temp2[i] = "hidden"
                    settabnameArrVal(temp2)
                }
            }
            setdatatable(dataListServiceItemMap)
            setdatacurrtable(dataListServiceItemMap)
        }
        else {
            const temp3 = tabnameArrVal
            temp3[idxjenis] = "block"
            settabnameArrVal(temp3)
            for (var i = 0; i < tabnameArrVal.length; i++) {
                if (i != idxjenis) {
                    const temp4 = tabnameArrVal
                    temp4[i] = "hidden"
                    settabnameArrVal(temp4)
                }
            }
            setdataeditkateg({
                id: id,
                nama_kategori: namakateg,
                deskripsi: deskripsi
            })
            setdatatable(dataListServiceItemMap)
            setdatatable(prev => {
                return prev.filter((doc, idx) => { return doc.categoryName == namakateg })
            })
            setdatacurrtable(dataListServiceItemMap)
            setdatacurrtable(prev => {
                return prev.filter((doc, idx) => { return doc.categoryName == namakateg })
            })
        }
    }
    const onChangeTabSmall = (namakateg) => {
        setcurrentselectkateg(namakateg)
        var variable = {}
        if (namakateg != 'all') {
            variable = dataListServiceCategories.data.filter(dataa => { return dataa.nama_kategori == namakateg }).map((doc, idx) => {
                return ({
                    idxjenis: idx + 1,
                    id: doc.id,
                    deskripsi: doc.deskripsi
                })
            })[0]
        }
        setdefaultpub(1)
        setidkateg(variable.id)
        if (namakateg == 'all') {
            const temp = tabnameArrVal
            temp[0] = "block"
            settabnameArrVal(temp)
            for (var i = 0; i < tabnameArrVal.length; i++) {
                if (i != 0) {
                    const temp2 = tabnameArrVal
                    temp2[i] = "hidden"
                    settabnameArrVal(temp2)
                }
            }
            setdatatable(dataListServiceItemMap)
            setdatacurrtable(dataListServiceItemMap)
        }
        else {
            const temp3 = tabnameArrVal
            temp3[variable.idxjenis] = "block"
            settabnameArrVal(temp3)
            for (var i = 0; i < tabnameArrVal.length; i++) {
                if (i != variable.idxjenis) {
                    const temp4 = tabnameArrVal
                    temp4[i] = "hidden"
                    settabnameArrVal(temp4)
                }
            }
            setdataeditkateg({
                id: variable.id,
                nama_kategori: namakateg,
                deskripsi: variable.deskripsi
            })
            setdatatable(dataListServiceItemMap)
            setdatatable(prev => {
                return prev.filter((doc, idx) => { return doc.categoryName == namakateg })
            })
            setdatacurrtable(dataListServiceItemMap)
            setdatacurrtable(prev => {
                return prev.filter((doc, idx) => { return doc.categoryName == namakateg })
            })
        }
    }
    const onChangeEditCategory = (e) => {
        setdataeditkateg({
            ...dataeditkateg,
            [e.target.name]: e.target.value
        })
    }
    const onChangeTambahCategory = (e) => {
        setdatatambahkateg({
            ...datatambahkateg,
            [e.target.name]: e.target.value
        })
    }
    const onSearchService = (val) => {
        if (val === "") {
            setdatatable(datacurrtable)
        }
        setdatatable(prev => {
            return prev.filter(dataa => {
                return dataa.itemName.toLowerCase().includes(val.toLowerCase())
            })
        })
    }
    const onCariService = (e) => {
        if (e.target.value === "") {
            setdatatable(datacurrtable)
        }
        else {
            setdatatable(prev => {
                return prev.filter(dataa => {
                    return dataa.itemName.toLowerCase().includes(e.target.value.toLowerCase())
                })
            })
        }
    }
    const onChangePublishment = (val) => {
        if (val === 1) {
            setdatatable(dataListServiceItemMap)
            setdatacurrtable(dataListServiceItemMap)
            setdefaultpub(1)
        }
        else if (val === true) {
            setdatatable(dataListServiceItemMap)
            setdatatable(prev => prev.filter(dataa => dataa.status === true))
            setdatacurrtable(dataListServiceItemMap)
            setdatacurrtable(prev => prev.filter(dataa => dataa.status === true))
            setdefaultpub(val)
        }
        else if (val === false) {
            setdatatable(dataListServiceItemMap)
            setdatatable(prev => prev.filter(dataa => dataa.status === false))
            setdatacurrtable(dataListServiceItemMap)
            setdatacurrtable(prev => prev.filter(dataa => dataa.status === false))
            setdefaultpub(val)
        }
    }

    //handler
    const handleHapusCategory = () => {
        setloadingbtnhapuskateg(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteServiceCategory`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idkateg
            })
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setloadingbtnhapuskateg(false)
                        setmodalkonfhapuskateg(false)
                        rt.push(`/admin/service`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                    setloadingbtnhapuskateg(false)
                    setmodalkonfhapuskateg(false)
                }
            })
    }
    const handleEditCategory = () => {
        setloadingbtneditkateg(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateServiceCategory`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataeditkateg)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setloadingbtneditkateg(false)
                        setmodaleditkateg(false)
                        rt.push(`/admin/service`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                    setloadingbtneditkateg(false)
                    setmodaleditkateg(false)
                }
            })
    }
    const handleTambahCategory = () => {
        setloadingbtntambahkateg(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addServiceCategory`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datatambahkateg)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setmodaltambahkateg(false)
                        setloadingbtntambahkateg(false)
                        if (process.env.NODE_ENV == "production") {
                            window.location.href = `https://migsys.herokuapp.com/admin/service`
                        }
                        else if (process.env.NODE_ENV == "development") {
                            window.location.href = `http://localhost:3000/admin/service`
                        }
                        // rt.push(`/admin/service`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                    setmodaltambahkateg(false)
                    setloadingbtntambahkateg(false)
                }
            })
    }
    return (
        <Layout tok={initProps} pathArr={pathArr} dataProfile={dataProfile} sidemenu={sidemenu} st={st}>
            <div id="containerListService" className="w-full border-t border-opacity-30 border-gray-500 bg-white">
                <Sticky containerSelectorFocus="#containerListService">
                    <div className="w-full flex justify-between p-3 bg-white">
                        <div>
                            <p className="font-semibold text-lg">Service Catalog</p>
                        </div>
                        {
                            [184, 189].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                            <div>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Button size="large" style={{ backgroundColor: `rgb(24,144,255)`, color: `white` }}>
                                        Add New <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                        }
                    </div>
                </Sticky>
                <div className="w-full grid grid-cols-8">
                    <div className="col-span-2 flex-col hidden md:flex">
                        <div className="p-3">
                            <p className=" text-base font-semibold">Service Categories</p>
                        </div>
                        <div>
                            {
                                tabnameArrVal[0] === "block" ?
                                    < div className={`p-2 cursor-pointer flex items-center text-sm font-semibold bg-primary text-white rounded`} onClick={(e) => { onChangeTab(e, 'all', 0, "all") }}>
                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                        Semua Service
                                    </div>
                                    :
                                    < div className={`p-2 cursor-pointer hover:text-gray-900 flex items-center text-sm font-semibold`} onClick={(e) => { onChangeTab(e, 'all', 0, "all") }}>
                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                        Semua Service
                                    </div>
                            }
                            <hr />
                            {
                                dataListServiceCategories.data.map((doc, idx) => {
                                    return (
                                        <>
                                            {
                                                tabnameArrVal[idx + 1] === "block" ?
                                                    <div className={`p-2 cursor-pointer flex items-center text-sm font-semibold bg-primary text-white rounded`}>
                                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                                        {doc.nama_kategori}
                                                    </div>
                                                    :
                                                    <div className={`p-2 cursor-pointer hover:text-gray-900 flex items-center text-sm font-semibold`} onClick={(e) => { onChangeTab(e, tabnameArr[idx + 1], (idx + 1), doc.nama_kategori, doc.deskripsi, doc.id) }}>
                                                        <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                                                        {doc.nama_kategori}
                                                    </div>
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className=" col-span-8 md:col-span-6">
                        {/* All */}
                        <div className={`${tabnameArrVal[0]} py-1 md:py-5 px-0 md:px-7 flex flex-col`}>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                                <div>
                                    <Select bordered={false} defaultValue={defaultpub} size="large" style={{ fontWeight: `bold` }} onChange={(value) => { onChangePublishment(value) }}>
                                        <Option value={1}>All Service Items</Option>
                                        <Option value={true}>Published</Option>
                                        <Option value={false}>Drafts</Option>
                                    </Select>
                                    <p className="text-xs text-gray-500 pl-3">Viewing all service items from all categories.</p>
                                </div>
                                <div>
                                    <Input prefix={<SearchOutlined />} placeholder="Cari Service Item" style={{ borderRadius: `0.1rem`, marginBottom: `1rem`, width: `100%` }} onChange={onCariService} allowClear />
                                    {/* <Search placeholder="Cari Nama Item" allowClear style={{ width: `100%` }} onSearch={(value) => { onSearchService(value) }} /> */}
                                </div>
                            </div>
                            <div className="w-full flex md:hidden mb-3">
                                <Select defaultValue={currentselectkateg} onChange={(value) => { onChangeTabSmall(value) }} style={{ width: `100%` }}>
                                    <Option value={'all'}>Semua Service</Option>
                                    {
                                        dataListServiceCategories.data.map((doc, idx) => {
                                            return (
                                                <Option value={doc.nama_kategori}>{doc.nama_kategori}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div>
                                <Table columns={columns} dataSource={datatable} pagination={{ pageSize: 8 }} scroll={{ x: 300 }} />
                            </div>
                        </div>

                        {dataListServiceCategories.data.map((doc, idx) => {
                            return (
                                <div className={`${tabnameArrVal[idx + 1]} py-5 px-7 flex flex-col`}>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
                                        <div className="flex flex-col justify-center">
                                            <div className="flex items-center mb-1">
                                                <div className="flex items-center mr-3">
                                                    {tabnameArrVal[idx + 1] === "block" && <p className="font-semibold m-0">{doc.nama_kategori}</p>}
                                                </div>
                                                {
                                                    [185].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                                    <div className="w-auto h-6 px-1 border rounded-sm cursor-pointer hover:border-blue-500 hover:text-blue-500 flex justify-center items-center" onClick={() => setmodaleditkateg(true)}><EditOutlined /></div>
                                                }
                                            </div>
                                            <p className="text-xs text-gray-500">{doc.deskripsi}</p>
                                        </div>
                                        <div>
                                            <Input prefix={<SearchOutlined />} placeholder="Cari Service Item" style={{ borderRadius: `0.1rem`, marginBottom: `1rem`, width: `100%` }} onChange={onCariService} allowClear />
                                            {/* <Search placeholder="Cari Nama Item" allowClear style={{ width: `100%` }} onSearch={(value) => { onSearchService(value) }} /> */}
                                        </div>
                                    </div>
                                    <div className="w-full flex md:hidden mb-3">
                                        <Select defaultValue={currentselectkateg} onChange={(value) => { onChangeTabSmall(value) }} style={{ width: `100%` }}>
                                            <Option value={'all'}>Semua Service</Option>
                                            {
                                                dataListServiceCategories.data.map((doc, idx) => {
                                                    return (
                                                        <Option value={doc.nama_kategori}>{doc.nama_kategori}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div>
                                        <Table columns={columns} dataSource={datatable} pagination={{ pageSize: 8 }} />
                                    </div>
                                </div>
                            )
                        })
                        }

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
                                    <Form.Item label="Nama Kategori" name="nama_kategori"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama Kategori wajib diisi',
                                            },
                                        ]}>
                                        <Input onChange={onChangeEditCategory} name="nama_kategori" defaultValue={dataeditkateg.nama_kategori} allowClear />
                                    </Form.Item>
                                    <Form.Item label="Deskripsi" name="deskripsi">
                                        <Input.TextArea onChange={onChangeEditCategory} defaultValue={dataeditkateg.deskripsi} name="deskripsi" allowClear />
                                    </Form.Item>
                                </div>
                                <div className="flex justify-between">
                                    {
                                        [186].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                        <Button onClick={() => { setmodaleditkateg(false); setmodalkonfhapuskateg(true) }} type="default">Delete</Button>
                                    }
                                    <div className="flex">
                                        <Button type="default" onClick={() => { setmodaleditkateg(false) }} style={{ marginRight: `1rem` }}>Cancel</Button>
                                        <Button htmlType="submit" loading={loadingbtneditkateg} type="primary">Save</Button>
                                    </div>
                                </div>
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
                            <Form layout="vertical" onFinish={handleTambahCategory} initialValues={datatambahkateg}>
                                <div className="flex flex-col mb-5">
                                    <Form.Item label="Nama Kategori" name="nama_kategori"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama Kategori wajib diisi',
                                            },
                                        ]}>
                                        <Input onChange={onChangeTambahCategory} name="nama_kategori" defaultValue={datatambahkateg.nama_kategori} allowClear />
                                    </Form.Item>
                                    <Form.Item label="Deskripsi" name="deskripsi">
                                        <Input.TextArea onChange={onChangeTambahCategory} name="deskripsi" defaultValue={datatambahkateg.deskripsi} allowClear />
                                    </Form.Item>
                                    <div className="flex justify-end">
                                        <Button type="default" onClick={() => { setmodaltambahkateg(false) }} style={{ marginRight: `1rem` }}>Cancel</Button>
                                        <Button htmlType="submit" loading={loadingbtntambahkateg} type="primary">Save</Button>
                                    </div>
                                </div>
                            </Form>
                        </Modal>
                        <Modal
                            title={`Konfirmasi hapus kategori`}
                            visible={modalkonfhapuskateg}
                            okButtonProps={{ disabled: loadingbtnhapuskateg }}
                            onCancel={() => { setmodalkonfhapuskateg(false) }}
                            onOk={handleHapusCategory}
                            maskClosable={false}
                            style={{ top: `3rem` }}
                            width={500}
                            destroyOnClose={true}
                        >
                            Yakin ingin hapus kategori ini?
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
            res.writeHead(302, { Location: '/login' })
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

    if (![183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    const resourcesGSI = await fetch(`https://boiling-thicket-46501.herokuapp.com/getServiceItems`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGSI = await resourcesGSI.json()
    const dataListServiceItem = resjsonGSI

    const resourcesGSC = await fetch(`https://boiling-thicket-46501.herokuapp.com/getServiceCategories`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGSC = await resourcesGSC.json()
    const dataListServiceCategories = resjsonGSC

    return {
        props: {
            initProps,
            dataProfile,
            dataListServiceCategories,
            dataListServiceItem,
            sidemenu: "4"
        },
    }
}

export default ServiceCatalog