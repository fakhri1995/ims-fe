import Layout from '../../components/layout-dashboard-vendors'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Table from 'antd/lib/table'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import EditOutlined from '@ant-design/icons/EditOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { useState } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import st from '../../components/layout-dashboard-vendors.module.css'
import Drawer from 'antd/lib/drawer'
import Form from 'antd/lib/form'
import { Input } from 'antd'
import notification from 'antd/lib/notification'
import { comment } from 'postcss'
import Modal from 'antd/lib/modal'

function Vendor({ initProps, dataProfile, sidemenu, dataVendors }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query

    const [drawablecreate, setDrawablecreate] = useState(false)
    const [drawableedit, setDrawableedit] = useState(false)
    const [createVendorForm] = Form.useForm();
    const [editVendorForm] = Form.useForm();
    
    // console.log(dataVendor)
    
    //----------CreateVendor-------------
    const [newvendor, setNewvendor] = useState({
        name: '',
        singkatan_nama: '',
        npwp: '',
        pic: '',
        jabatan_pic: '',
        alamat: '',
        provinsi: '',
        kab_kota: '',
        kode_pos: '',
        telepon: '',
        fax: '',
        email: '',
        website: '',
    })

    const closeDrawer = () => {
        setNewvendor({
            name: '',
            singkatan_nama: '',
            npwp: '',
            pic: '',
            jabatan_pic: '',
            alamat: '',
            provinsi: '',
            kab_kota: '',
            kode_pos: '',
            telepon: '',
            fax: '',
            email: '',
            website: '',
        })
    }
      
    const onChangeCreateVendor = (e) => {
        var val = e.target.value
        setNewvendor({
            ...newvendor,
            [e.target.name]: val
        })
    }
    const handleCreateVendor = () => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/addVendor`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newvendor)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    createVendorForm.resetFields()
                    closeDrawer()
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setDrawablecreate(false)
                        rt.push(`/vendors?originPath=Admin`)
                    }, 100)
                }
                else if (!res2.success) {
                    notification['error']({
                        // message: res2.message.errorInfo[3],
                        message: res2.message,
                        duration: 3
                    })
                }
            })
        }
    //---------------------------------------------------------

    //------------------handle delete vendor-------------------
    const [warningDelete, setWarningDelete] = useState({
        istrue: false,
        key: null,
        name: ""
    })
    const onClickModalDeleteVendor = (istrue, record) => {
        setWarningDelete({
            ...warningDelete,
            ["istrue"]: istrue,
            ["key"]: record.key,
            ["name"]: record.name
        })
    }
    const handleDeleteVendor = (key) => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteVendor?id=${key}`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setWarningDelete(false,null)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/vendors?originPath=Admin`)
                    }, 100)
                }
                else if (!res2.success) {
                    setWarningDelete(false,null)
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    //----------------------------------------------
    const [editvendor, setEditvendor] = useState({
        id: '',
        name: '',
        singkatan_nama: '',
        npwp: '',
        pic: '',
        jabatan_pic: '',
        alamat: '',
        provinsi: '',
        kab_kota: '',
        kode_pos: '',
        telepon: '',
        fax: '',
        email: '',
        website: '',
    })

    const closeDrawerEdit = () => {
        setEditvendor({
            id: '',
            name: '',
            singkatan_nama: '',
            npwp: '',
            pic: '',
            jabatan_pic: '',
            alamat: '',
            provinsi: '',
            kab_kota: '',
            kode_pos: '',
            telepon: '',
            fax: '',
            email: '',
            website: '',
        })
    }

    const onChangeEditVendor = (e) => {
        var val = e.target.value
        setEditvendor({
            ...editvendor,
            [e.target.name]: val
        })
    }
    const handleEditVendor = () => {
        // console.log("isidata2: " + editvendor)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateVendor`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editvendor)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    editVendorForm.resetFields()
                    closeDrawer()
                    setTimeout(() => {
                        setDrawableedit(false)
                        rt.push(`/vendors?originPath=Admin`)
                    }, 100)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    var vendors
    if(dataVendors.data == null){
        vendors=[]
    }
    else{
        vendors = dataVendors.data.map((doc, idx) => {
            return ({
                idx: idx,
                key: doc.id,
                id: doc.id,
                name: doc.name,
                singkatan_nama: doc.singkatan_nama,
                npwp: doc.npwp,
                pic: doc.pic,
                jabatan_pic: doc.jabatan_pic,
                alamat: doc.alamat,
                provinsi: doc.provinsi,
                kab_kota: doc.kab_kota,
                kode_pos: doc.kode_pos,
                telepon: doc.telepon,
                fax: doc.fax,
                email: doc.email,
                website: doc.website
            })
        })
    }
    var actionsArr = []
    for (var i = 0; i < vendors.length; i++) {
        actionsArr.push(false)
    }
    const [actions, setActions] = useState(actionsArr)
    const [action, setAction] = useState(false)
    const columnsDD = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            render(text, record) {
                return {
                    props: {
                    style: { background: record.idx%2 == 1 ? '#f2f2f2' : '#fff' },
                  },
                    children: <Link href={{
                        pathname: `/vendors/update/${record.key}`,
                        query: {
                            originPath: 'Admin'
                        }
                    }}><a>{text}</a></Link>
                };
            },
        },
        {
            title: 'PIC',
            dataIndex: 'pic',
            key: 'pic',
            width: 200,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{text}</div>,
                };
            },
        },
        {
            title: 'Phone',
            dataIndex: 'telepon',
            key: 'telepon',
            width: 200,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{text}</div>,
                };
            },
        },
        {
            title: 'Address',
            dataIndex: 'alamat',
            key: 'alamat',
            width: 150,
            render(text, record) {
                return {
                    props: {
                        style: { background: record.idx%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: <div>{text}</div>,
                };
            },
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0', // Non-breakable space is char 0xa0 (160 dec)
            dataIndex: 'actions',
            width: 80,
            render: (text, record, index) => {
                return {
                    props: {
                        style: { background: record.idx%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: 
                    <>
                        {actions[index] ?
                        <>
                            <Tooltip placement="topLeft" title={"Edit"}>
                            <Button size="medium" shape="square" onClick={() => { editVendorForm.resetFields();setDrawableedit(true); console.log(record); setEditvendor(record) }}><EditOutlined /></Button>
                            </Tooltip>
                            </>
                        :
                        null
                        }
                    </>
                }
            }
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0', // Non-breakable space is char 0xa0 (160 dec)
            dataIndex: 'actions',
            width: 130,
            render: (text, record, index) => {
                return {
                    props: {
                        style: { background: record.idx%2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children: 
                    <>
                        {actions[index] ?
                        <>
                            <Tooltip placement="topLeft" title={"Delete"}>
                            <Button size="medium" shape="square" onClick={() => { onClickModalDeleteVendor(true,record) }}>
                                <a><DeleteOutlined /></a>
                            </Button>
                            </Tooltip>
                            </>
                        :
                        null
                        }
                    </>
                }
            }
        }
    ];

    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                        <Sticky containerSelectorFocus="#formAgentsWrapper">
                            <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                <h1 className="font-semibold text-base w-auto py-2">Vendors</h1>
                                <div className="flex space-x-2">
                                    {/* <Link href="/roles/create"> */}
                                        <button className=" text-white text-sm bg-gray-700 hover:bg-gray-900 cursor-pointer rounded-md h-10 py-2 w-32 text-center" onClick={() => { setDrawablecreate(true) }}>New Vendor</button>
                                    {/* </Link> */}
                                </div>
                            </div>
                        </Sticky>

                        <div className="col-span-3 flex flex-col space-y-3">

                            <Table className={`${st.customTable}`} size="large" scroll={{ x: 400 }} dataSource={vendors} columns={columnsDD} onRow={(record, rowIndex) => {
                                return {
                                    onMouseOver: (event) => {
                                        var actionsCopy = actions
                                        actionsCopy[rowIndex] = true
                                        setActions(actionsCopy)
                                        setAction("block")
                                        // console.log("row: " + actions[rowIndex] + " " + rowIndex)
                                    },
                                    onMouseLeave: (event) => {
                                        var actionsCopy = actions
                                        actionsCopy[rowIndex] = false
                                        setActions(actionsCopy)
                                        setAction("hidden")
                                        // console.log("row leave: " + actions[rowIndex] + " " + rowIndex)
                                    }
                                }
                            }}></Table>
                        </div>

                        <Modal
                            title="Konfirmasi untuk menghapus vendor"
                            visible={warningDelete.istrue}
                            onOk={() => { handleDeleteVendor(warningDelete.key)}}
                            onCancel={() => setWarningDelete(false,null)}
                        >
                            Apakah anda yakin ingin menghapus vendor <strong>{warningDelete.name}</strong>?
                        </Modal>

                    </div>
                    <div className="flex flex-col space-y-3 px-4">
                        <div className="font-semibold text-sm">Vendors</div>
                        <p className="font-normal text-sm">
                        Migsys lets you manage products and vendors side by side with your help desk. You can add multiple vendors to each of 
                        your products and access contact information and details such as price, warranty and address alongside your product. 
                        When you are managing your products, you can easily gather basic information such as cost, see how any of the other vendors 
                        are priced and check to see if it’s still covered under a warranty. You can also quickly contact the vendor for troubleshooting 
                        and fixing service issues.
                    </p>
                    </div>
                </div>
                <Drawer title="New Vendor" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false), closeDrawer(),createVendorForm.resetFields() }} destroyOnClose={true} width={700} 
                    footer={
                    <div style={{ textAlign: 'right' }}>
                            <button onClick={() => { setDrawablecreate(false), closeDrawer(),createVendorForm.resetFields()  }} className="bg-white-700 hover:bg-gray-300 border text-black py-1 px-2 rounded-md w-20 mr-4">
                                Cancel
                                </button>
                            <button type="submit" onClick={createVendorForm.submit} className="bg-gray-700 hover:bg-gray-900 border text-white py-1 px-2 rounded-md w-20">
                                Submit
                                </button>
                        </div>
                    }
                    >
                            <Form form={createVendorForm} layout="vertical" onFinish={handleCreateVendor} style={{display:'contents'}}>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Nama Vendor"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama vendor harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Nama Vendor" name={`name`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="singkatan_nama" style={{ marginRight: `1rem` }} label="Singkatan Nama"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'Nama vendor harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Singkatan Nama Perusahaan" name={`singkatan_nama`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="npwp" style={{ marginRight: `1rem` }} label="NPWP"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'Nama vendor harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="NPWP" name={`npwp`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="pic" style={{ marginRight: `1rem` }} label="Penanggung Jawab"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama penanggung jawab harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Penanggung Jawab" name={`pic`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="jabatan_pic" style={{ marginRight: `1rem` }} label="Jabatan Penanggung Jawab"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Jabatan penanggung jawab harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Jabatan Penanggung Jawab" name={`jabatan_pic`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="alamat" style={{ marginRight: `1rem` }} label="Alamat"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Alamat harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Alamat" name={`alamat`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="provinsi" style={{ marginRight: `1rem` }} label="Provinsi"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'Alamat penanggung jawab harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Provinsi" name={`provinsi`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="kab_kota" style={{ marginRight: `1rem` }} label="Kab/Kota"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'Alamat penanggung jawab harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Kab/Kota" name={`kab_kota`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="kode_pos" style={{ marginRight: `1rem` }} label="Kode Pos"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'Alamat penanggung jawab harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Kode Pos" name={`kode_pos`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="telepon" style={{ marginRight: `1rem` }} label="Telepon"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'No Telepon harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Telepon" name={`telepon`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="fax" style={{ marginRight: `1rem` }} label="Fax"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'No Fax harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Fax" name={`fax`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="email" style={{ marginRight: `1rem` }} label="Email"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'No Email harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Email" name={`email`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="website" style={{ marginRight: `1rem` }} label="Website"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'No Email harus diisi',
                                        },
                                    ]}
                                >
                                <Input placeholder="Website" name={`website`} onChange={onChangeCreateVendor}></Input>
                                </Form.Item>
                            </div>
                        </Form>
                </Drawer>
                <Drawer title="Edit Vendor" maskClosable={true} visible={drawableedit} onClose={() => { setDrawableedit(false),closeDrawerEdit(),editVendorForm.resetFields() }} destroyOnClose={true} width={700} 
                    footer={
                    <div style={{ textAlign: 'right' }}>
                            <button onClick={() => { setDrawableedit(false),editVendorForm.resetFields() }} className="bg-white-700 hover:bg-gray-300 border text-black py-1 px-2 rounded-md w-20 mr-4">
                                Cancel
                                </button>
                            <button type="submit" onClick={editVendorForm.submit} className="bg-gray-700 hover:bg-gray-900 border text-white py-1 px-2 rounded-md w-20">
                                Submit
                                </button>
                        </div>
                    }
                    >
                            <Form form={editVendorForm} layout="vertical" onFinish={handleEditVendor} style={{display:'contents'}} >
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Nama Vendor"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama vendor harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.name}
                                >
                                <Input placeholder="Nama Vendor" name={`name`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="singkatan_nama" style={{ marginRight: `1rem` }} label="Singkatan Nama"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'Nama vendor harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.singkatan_nama}
                                >
                                <Input placeholder="Singkatan Nama Perusahaan" name={`singkatan_nama`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="npwp" style={{ marginRight: `1rem` }} label="NPWP"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'Nama vendor harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.npwp} 
                                >
                                <Input placeholder="NPWP" name={`npwp`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="pic" style={{ marginRight: `1rem` }} label="Penanggung Jawab"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama penanggung jawab harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.pic}
                                >
                                <Input placeholder="Penanggung Jawab" name={`pic`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="jabatan_pic" style={{ marginRight: `1rem` }} label="Jabatan Penanggung Jawab"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Jabatan penanggung jawab harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.jabatan_pic}
                                >
                                <Input placeholder="Jabatan Penanggung Jawab" name={`jabatan_pic`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="alamat" style={{ marginRight: `1rem` }} label="Alamat"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Alamat harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.alamat} 
                                >
                                <Input placeholder="Alamat" name={`alamat`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="provinsi" style={{ marginRight: `1rem` }} label="Provinsi"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'Alamat penanggung jawab harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.provinsi} 
                                >
                                <Input placeholder="Provinsi" name={`provinsi`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="kab_kota" style={{ marginRight: `1rem` }} label="Kab/Kota"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'Alamat penanggung jawab harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.kab_kota} 
                                >
                                <Input placeholder="Kab/Kota" name={`kab_kota`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="kode_pos" style={{ marginRight: `1rem` }} label="Kode Pos"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'Alamat penanggung jawab harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.kode_pos}
                                >
                                <Input placeholder="Kode Pos" name={`kode_pos`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="telepon" style={{ marginRight: `1rem` }} label="Telepon"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'No Telepon harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.telepon}
                                >
                                <Input placeholder="Telepon" name={`telepon`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="fax" style={{ marginRight: `1rem` }} label="Fax"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'No Fax harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.fax} 
                                >
                                <Input placeholder="Fax" name={`fax`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="email" style={{ marginRight: `1rem` }} label="Email"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'No Email harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.email} 
                                >
                                <Input placeholder="Email" name={`email`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                            <div className="pb-0 md:mb-0 ">
                                <Form.Item name="website" style={{ marginRight: `1rem` }} label="Website"
                                    rules={[
                                        {
                                            required: false,
                                            // message: 'No Email harus diisi',
                                        },
                                    ]}
                                    initialValue={editvendor.website} 
                                >
                                <Input placeholder="Website" name={`website`} onChange={onChangeEditVendor}></Input>
                                </Form.Item>
                            </div>
                        </Form>
                </Drawer>
            </>
        </Layout>
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
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP
    
    const resourcesGetVendor = await fetch(`https://boiling-thicket-46501.herokuapp.com/getVendors`, {
        method: `GET`,
        headers: {
            'Authorization' : JSON.parse(initProps),
            'Content-Type' : 'application/json'
        }
    })
    const resjsonDataVendor = await resourcesGetVendor.json()
    const dataVendors = resjsonDataVendor

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "sub31",
            dataVendors
        },
    }
}

export default Vendor