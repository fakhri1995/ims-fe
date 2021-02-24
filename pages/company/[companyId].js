import Layout from '../../components/layout-dashboard-clients'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import { useState } from 'react'
import Tabs from 'antd/lib/tabs'
import Input from 'antd/lib/input'
import Table from 'antd/lib/table'
import Tree from 'antd/lib/tree'
import Drawer from 'antd/lib/drawer'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import notification from 'antd/lib/notification'
import Form from 'antd/lib/form'
import Popconfirm from 'antd/lib/popconfirm'
import Link from 'next/link'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import st from '../../components/layout-dashboard-clients.module.css'


function ClientsDetailProfile({ dataDetailCompany, tok }) {
    const rt = useRouter()
    const [editable, setEditable] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visiblenon, setVisiblenon] = useState(false)
    const [data1, setData1] = useState({
        id: dataDetailCompany.data.company_id,
        company_name: dataDetailCompany.data.company_name,
        role: dataDetailCompany.data.role,
        address: dataDetailCompany.data.address,
        phone_number: dataDetailCompany.data.phone_number,
        image_logo: dataDetailCompany.data.image_logo
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
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateCompanyDetail`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data1)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.data) {
                    notification['success']({
                        message: res2.data.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/company/${dataDetailCompany.data.company_id}?originPath=Admin`)
                    }, 1000)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const handleActivationClients = (status) => {
        var keaktifan = false
        if (status === "aktif") {
            keaktifan = false
        }
        else if (status === "nonAktif") {
            keaktifan = true
        }
        fetch(`https://boiling-thicket-46501.herokuapp.com/companyActivation`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_id: dataDetailCompany.data.company_id,
                is_enabled: keaktifan
            })
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.data) {
                    setVisible(false)
                    setVisiblenon(false)
                    notification['success']({
                        message: res2.data.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/company/${dataDetailCompany.data.company_id}?originPath=Admin`)
                    }, 500)
                }
                else if (!res2.success) {
                    setVisible(false)
                    setVisiblenon(false)
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    return (
        <div id="profileDetailMigWrapper">
            <div className="flex justify-start md:justify-end p-3 md:border-t-2 md:border-b-2 bg-white mb-4 md:mb-8">
                {/* <Sticky containerSelectorFocus="#profileDetailMigWrapper"> */}
                <div className="flex space-x-2">
                    {editable ?
                        <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md" onClick={() => { setEditable(false) }}>Cancel</button>
                        :
                        null
                    }
                    {editable ?
                        <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md" onClick={handleEditProfile}>Save</button>
                        :
                        <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md w-24 md:w-40" onClick={() => { setEditable(true) }}>Edit</button>
                    }
                </div>
                {/* </Sticky> */}
            </div>
            <div className=" mb-2 md:mb-4 flex md:flex-row flex-col">
                <h1 className="font-semibold text-base mr-3 pt-1">{dataDetailCompany.data.company_name}</h1>
                <h1 className="mr-3 pt-1 hidden md:block">|</h1>
                <div className="flex">
                    {
                        dataDetailCompany.data.is_enabled ?
                            <div className=" bg-blue-100 text-blue-600 border-blue-600 border py-1 px-3 rounded-md text-xs md:text-sm w-auto">AKTIF MODULE</div>
                            :
                            <div className=" bg-red-100 text-red-600 border-red-600 border py-1 px-3 rounded-md text-xs md:text-sm w-auto">NON-AKTIF MODULE</div>
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 mb-4">
                <div className="p-3 relative col-span-1 md:col-span-1 flex flex-col">
                    <img src={data1.image_logo} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full mb-4" />
                    {editable ?
                        <div>
                            <label className="custom-file-upload w-auto p-2 border-2 cursor-pointer text-sm rounded-md hover:bg-gray-200">
                                <input type="file" style={{ display: `none` }} name="profile_image" onChange={onChangeEditProfileFoto} />
                                {loadingfoto ? <LoadingOutlined /> : <EditOutlined style={{ fontSize: `1.5rem` }} />}
                                    Ganti Foto
                        </label>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="col-span-1 md:col-span-3 w-full h-auto p-3 md:p-5 grid grid-cols-1 md:grid-cols-2">
                    <div className="md:m-5 mb-5 md:mb-0 ">
                        <h1 className="font-semibold text-sm">ID Perusahaan:</h1>
                        {
                            editable ?
                                <Input defaultValue={data1.id} name="company_id" onChange={onChangeEditProfile}></Input>
                                :
                                <h1 className="text-sm font-normal text-black">{data1.id}</h1>

                        }
                    </div>
                    <div className="md:m-5 mb-5 md:mb-0 ">
                        <h1 className="font-semibold text-sm">Nama Perusahaan:</h1>
                        {
                            editable ?
                                <Input defaultValue={data1.company_name} name="company_name" onChange={onChangeEditProfile}></Input>
                                :
                                <h1 className="text-sm font-normal text-black">{data1.company_name}</h1>

                        }
                    </div>
                    <div className="md:m-5 mb-5 md:mb-0 ">
                        <h1 className="font-semibold text-sm">Role:</h1>
                        {
                            editable ?
                                <input type="number" value={data1.role} name={'role'} onChange={onChangeEditProfile} style={{ width: `15rem` }} />
                                :
                                <h1 className="text-sm font-normal text-black">{data1.role}</h1>

                        }
                    </div>
                    <div className="md:m-5 mb-5 md:mb-0">
                        <h1 className="font-semibold text-sm">Alamat:</h1>
                        {
                            editable ?
                                <Input defaultValue={data1.address} name="address" onChange={onChangeEditProfile}></Input>
                                :
                                <h1 className="text-sm font-normal text-black">{data1.address}</h1>

                        }
                    </div>
                    <div className="md:m-5 mb-5 md:mb-0">
                        <h1 className="font-semibold text-sm">Telepon:</h1>
                        {
                            editable ?
                                <Input defaultValue={data1.phone_number} name="phone_number" onChange={onChangeEditProfile}></Input>
                                :
                                <h1 className="text-sm font-normal text-black">{data1.phone_number}</h1>

                        }
                    </div>
                </div>
            </div>
            <div className="w-9/12 p-3 md:p-5 h-auto">
                {
                    dataDetailCompany.data.is_enabled ?
                        <button className=" w-full h-auto py-2 text-center bg-red-600 text-white hover:bg-red-800 rounded-md" onClick={() => { setVisible(true) }}>
                            Non Aktifkan Perusahaan
                        </button>
                        :
                        <button className=" w-full h-auto py-2 text-center bg-blue-600 text-white hover:bg-blue-800 rounded-md" onClick={() => { setVisiblenon(true) }}>
                            Aktifkan Perusahaan
                        </button>
                }
            </div >
            <Modal
                title="Konfirmasi untuk menon-aktifkan akun"
                visible={visible}
                onOk={() => { handleActivationClients("aktif") }}
                onCancel={() => setVisible(false)}
            >
                Apakah anda yakin ingin menon-aktifkan akun perusahaan <strong>{dataDetailCompany.data.company_name}</strong>?
            </Modal>
            <Modal
                title="Konfirmasi untuk mengakaktifkan akun"
                visible={visiblenon}
                onOk={() => { handleActivationClients("nonAktif") }}
                onCancel={() => setVisiblenon(false)}
            >
                Apakah anda yakin ingin melakukan aktivasi akun perusahaan <strong>{dataDetailCompany.data.company_name}</strong>?`
            </Modal>
        </div >
    )
}

function ClientsDetailLocations({ dataDetailCompany, tok }) {
    const [editable, setEditable] = useState(false)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [checkedtree, setCheckedtree] = useState([])
    const [selectedtree, setSelectedtree] = useState([])
    const [expandedKeys, setExpandedKeys] = useState([])
    const [hoverrowtree, setHoverrowtree] = useState("hidden")
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeys) => {
        console.log("checked: " + checkedKeys)
        setEditable(true)
        setCheckedtree(checkedKeys)
        if (checkedKeys.length === 0) {
            setEditable(false)
        }
    };

    const onSelect = (selectedKeys, info) => {
        console.log("selected: " + selectedKeys + " " + info)
        setSelectedtree(selectedKeys);
    };
    const treeData = [
        {
            title: 'HUB-1',
            key: 'hub1',
            children: [
                {
                    title: 'Jakarta',
                    key: '0-0-0',
                    children: [
                        {
                            title: 'Slipi',
                            key: '0-0-0-0',
                        },
                        {
                            title: 'Tebet',
                            key: '0-0-0-1',
                        },
                        {
                            title: 'Pancoran',
                            key: '0-0-0-2',
                        },
                        {
                            title: 'Pluit',
                            key: '0-0-0-3',
                        },
                    ],
                },
                {
                    title: 'Bogor',
                    key: '0-0-1',
                    children: [
                        {
                            title: 'Cibinong',
                            key: '0-0-1-0',
                        },
                        {
                            title: 'Parung',
                            key: '0-0-1-1',
                        },
                    ],
                },
                {
                    title: 'Depok',
                    key: '0-0-2',
                },
                {
                    title: 'Tangerang',
                    key: '0-0-3',
                },
                {
                    title: 'Banten',
                    key: '0-0-4',
                },
            ],
        },
        {
            title: 'HUB-2',
            key: '0-1',
            children: [
                {
                    title: '0-1-0-0',
                    key: '0-1-0-0',
                },
                {
                    title: '0-1-0-1',
                    key: '0-1-0-1',
                },
                {
                    title: '0-1-0-2',
                    key: '0-1-0-2',
                },
            ],
        },
        {
            title: 'HUB-3',
            key: '0-2',
        },
    ];
    return (
        <div id="locationsDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-8">
                <div className="flex space-x-2">
                    {editable ?
                        <Popconfirm title="Yakin hapus lokasi?" onConfirm={() => { message.success("berhasil dihapus") }} onCancel={() => { message.error("Gagal dihapus") }}>
                            <button className=" bg-red-600 hover:bg-red-800 border text-white py-1 px-3 rounded-md w-24 md:w-40">
                                Delete
                            </button>
                        </Popconfirm>
                        :
                        null
                    }
                    <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md w-24 md:w-40" onClick={() => { setDrawablecreate(true) }}> Create</button>
                    <Drawer title="Create Locations MIG" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={720} footer={
                        <div style={{ textAlign: 'right' }}>
                            <button onClick={() => { setDrawablecreate(false) }} className="bg-white-700 hover:bg-gray-300 border text-black py-1 px-2 rounded-md w-20 mr-4">
                                Cancel
                                </button>
                            <button type="primary" className="bg-blue-700 hover:bg-blue-800 border text-white py-1 px-2 rounded-md w-20">
                                Submit
                                </button>
                        </div>
                    }></Drawer>
                </div>
            </div>
            <div className="p-5">
                <h1 className="text-sm font-semibold">Pilih Parent terakhir untuk hapus</h1>
                {/* <Tree treeData={treeData} autoExpandParent={autoExpandParent} selectable selectedKeys={selectedtree} checkable checkedKeys={checkedtree} onCheck={() => { setEditable(true) }}>
                </Tree> */}
                <Tree
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onSelect={onSelect}
                    selectedKeys={selectedtree}
                    treeData={treeData}
                    selectable
                    titleRender={(nodeData) => (
                        <Link href={`/company/${dataDetailCompany.data.company_id}?originPath=Admin`}>
                            <div className="flex justify-between hover:text-blue-500 text-black">
                                <div className="mr-20">
                                    {nodeData.title}
                                </div>
                                <div className={`${hoverrowtree}`} onMouseOver={() => { setHoverrowtree("block"); console.log("hover: " + hoverrowtree) }} onMouseLeave={() => { setHoverrowtree("hidden"); console.log("leave: " + hoverrowtree) }}>
                                    <a><EditOutlined /></a>
                                </div>
                            </div>
                        </Link>
                    )
                    }
                    blockNode={true}
                />
            </div>
        </div>
    )
}

function ClientsDetailBankAccount({ dataGetBanks, tok, companyId }) {
    if (!dataGetBanks.data) {
        dataGetBanks.data = []
    }
    const rt = useRouter()
    const [editable, setEditable] = useState(false)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [drawableedit, setDrawableedit] = useState(false)
    // const [selectedrows, setSelectedrows] = useState([])
    const [recordrow, setRecordrow] = useState({
        id: 0,
        company_id: companyId,
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    const [bankdata, setBankdata] = useState({
        company_id: companyId,
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
    const handleDeleteBA = (rec) => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteBank?id=${rec.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
            },
            // body: JSON.stringify({
            //     id: rec.company_id
            // })
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/company/${companyId}?originPath=Admin`)
                    }, 3000)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const columnsgetBanks = [
        {
            title: 'No.',
            dataIndex: 'key'
        },
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Bank',
            dataIndex: 'name',
            sorter: (a, b) => a.bank.localeCompare(b.bank),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nomor Rekening',
            dataIndex: 'account_number',
            sorter: (a, b) => a.norek - b.norek,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Atas Nama',
            dataIndex: 'owner',
            sorter: (a, b) => a.an.localeCompare(b.an),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mata Uang',
            dataIndex: 'currency',
            filters: [
                {
                    text: 'IDR',
                    value: 'IDR',
                },
                {
                    text: 'USD',
                    value: 'USD',
                },
            ],
            onFilter: (value, record) => record.currency.indexOf(value) === 0,
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            render: (text, record, index) => (
                <>
                    {
                        actions[index] ?
                            <>{actions[index]}
                                <a onClick={() => handleDeleteBA(record)}><DeleteOutlined /></a>
                                <a onClick={() => { setDrawableedit(true); console.log("isi record: " + record.name); setRecordrow(record) }}><EditOutlined /></a>
                            </>
                            :
                            null
                    }
                </>
            )
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
    const onChangeBA = (e) => {
        setBankdata({
            ...bankdata,
            [e.target.name]: e.target.value
        })
    }
    const onChangeEditBA = (e) => {
        setRecordrow({
            ...recordrow,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmitCreateBA = () => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/addBank`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bankdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    setBankdata({
                        company_id: companyId,
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
                        rt.push(`/company/${companyId}?originPath=Admin`)
                    }, 3000)
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
        console.log("isidata2: " + recordrow)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateBank`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recordrow)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setRecordrow({
                        id: 0,
                        company_id: companyId,
                        name: '',
                        account_number: '',
                        owner: '',
                        currency: ''
                    })
                    setTimeout(() => {
                        setDrawableedit(false)
                        if (process.env.NODE_ENV == "production") {
                            window.location.href = `https://migsys.herokuapp.com/company/${companyId}?originPath=Admin`
                        }
                        else if (process.env.NODE_ENV == "development") {
                            window.location.href = `http://localhost:3000/company/${companyId}?originPath=Admin`
                        }
                        // rt.push(`/company/${companyId}?originPath=Admin`)
                    }, 3000)
                }
                else {
                    notification['error']({
                        message: res2.erroInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    return (
        <div id="bankAccountDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-8">
                <div className="flex space-x-2">
                    {
                        editable ?
                            <button className=" bg-gray-600 hover:bg-gray-800 border text-white py-1 px-2 rounded-md w-24 md:w-40" onClick={() => { setDrawableedit(true) }}>
                                Edit
                                </button>
                            :
                            null
                    }
                    <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-2 rounded-md w-24 md:w-40" onClick={() => { setDrawablecreate(true) }}> Create</button>
                    <Drawer title="Edit data Bank Account MIG" maskClosable={false} visible={drawableedit} onClose={() => { setDrawableedit(false) }} width={720}>
                        <Form layout="vertical" onFinish={handleSubmitEditBA}>
                            <div className="grid grid-cols-2">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Bank Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama bank harus diisi',
                                        },
                                    ]}
                                    initialValue={recordrow.name}
                                >
                                    <Input onChange={onChangeEditBA} name="name" id="editName" />
                                </Form.Item>
                                <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="Account Number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nomor rekening harus diisi',
                                        },
                                    ]}
                                    initialValue={recordrow.account_number}
                                >
                                    <Input onChange={onChangeEditBA} name="account_number" id="editAccountNumber" />
                                </Form.Item>
                                <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Owner"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama penanggung jawab harus diisi',
                                        },
                                    ]}
                                    initialValue={recordrow.owner}
                                >
                                    <Input onChange={onChangeEditBA} name="owner" id="editOwner" />
                                </Form.Item>
                                <Form.Item name="currency" style={{ marginRight: `1rem` }} label="Currency"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mata uang harus diisi',
                                        },
                                    ]}
                                    initialValue={recordrow.currency}
                                >
                                    <Input onChange={onChangeEditBA} name="currency" id="editCurrency" />
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <button type="submit" className="bg-gray-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-gray-800">Edit</button>
                            </Form.Item>
                        </Form>
                    </Drawer>
                    <Drawer title="Create data Bank Account MIG" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={720}>
                        <Form layout="vertical" onFinish={handleSubmitCreateBA}>
                            <div className="grid grid-cols-2">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Bank Name" rules={[
                                    {
                                        required: true,
                                        message: 'Nama bank harus diisi',
                                    },
                                ]}>
                                    <Input onChange={onChangeBA} name="name" value={bankdata.name} />
                                </Form.Item>
                                <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="Account Number" rules={[
                                    {
                                        required: true,
                                        message: 'Nomor rekening harus diisi',
                                    },
                                ]}>
                                    <Input onChange={onChangeBA} name="account_number" defaultValue={bankdata.account_number} />
                                </Form.Item>
                                <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Owner" rules={[
                                    {
                                        required: true,
                                        message: 'Nama penanggung jawab harus diisi',
                                    },
                                ]}>
                                    <Input onChange={onChangeBA} name="owner" value={bankdata.owner} />
                                </Form.Item>
                                <Form.Item name="currency" style={{ marginRight: `1rem` }} label="Currency"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mata uang harus diisi',
                                        },
                                    ]}
                                >
                                    <Input onChange={onChangeBA} name="currency" value={bankdata.currency} />
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <button type="submit" className="bg-blue-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-blue-800">Submit</button>
                            </Form.Item>
                        </Form>
                    </Drawer>
                </div>
            </div>
            <div className="md:p-5">
                <Table scroll={{ x: 200 }}
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
                    // rowSelection={{
                    //     selectedRowKeys: selectedrows, onChange: (selectedRowKeys) => {
                    //         setSelectedrows(selectedRowKeys)
                    //         setEditable(true)
                    //         if (selectedRowKeys.length === 0) {
                    //             setEditable(false)
                    //         }
                    //     }
                    // }} 
                    columns={columnsgetBanks} dataSource={datagetBanks} />
            </div>
        </div>
    )
}

function DetailClients({ initProps, dataProfile, sidemenu, dataDetailCompany, dataGetBanks }) {
    const rt = useRouter()
    const { TabPane } = Tabs;
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    // console.log("get banks: " + dataGetBanks.data[0].account_number)
    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} originPath={originPath} dataDetailCompany={dataDetailCompany} st={st}>
            <div className="p-5 bg-white hidden md:block">
                <Tabs tabPosition={`left`}>
                    <TabPane tab="Profile" key={`profile`}>
                        <ClientsDetailProfile dataDetailCompany={dataDetailCompany} tok={tok}></ClientsDetailProfile>
                    </TabPane>
                    <TabPane tab="Bank Accounts" key={`bankAccounts`}>
                        <ClientsDetailBankAccount dataGetBanks={dataGetBanks} tok={tok} companyId={dataDetailCompany.data.company_id} />
                    </TabPane>
                    <TabPane tab="Locations" key={`locations`}>
                        <ClientsDetailLocations dataDetailCompany={dataDetailCompany} tok={tok}></ClientsDetailLocations>
                    </TabPane>
                </Tabs>
            </div>
            <div className="p-5 bg-white block md:hidden">
                <Tabs tabPosition={`top`}>
                    <TabPane tab="Profile" key={`profile`}>
                        <ClientsDetailProfile dataDetailCompany={dataDetailCompany} tok={tok}></ClientsDetailProfile>
                    </TabPane>
                    <TabPane tab="Bank Accounts" key={`bankAccounts`}>
                        <ClientsDetailBankAccount dataGetBanks={dataGetBanks} tok={tok} companyId={dataDetailCompany.data.company_id} />
                    </TabPane>
                    <TabPane tab="Locations" key={`locations`}>
                        <ClientsDetailLocations dataDetailCompany={dataDetailCompany} tok={tok}></ClientsDetailLocations>
                    </TabPane>
                </Tabs>
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

    const resourcesGB = await fetch(`https://boiling-thicket-46501.herokuapp.com/getBanks?id=${dataDetailCompany.data.company_id}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
        },
    })
    const resjsonGB = await resourcesGB.json()
    const dataGetBanks = resjsonGB
    return {
        props: {
            initProps,
            dataProfile,
            dataDetailCompany,
            dataGetBanks,
            sidemenu: "4"
        },
    }
}

export default DetailClients