import Layout from '../../../components/layout-dashboard-mig'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Tabs from 'antd/lib/tabs'
import Input from 'antd/lib/input'
import Form from 'antd/lib/form'
import Table from 'antd/lib/table'
import Tree from 'antd/lib/tree'
import Drawer from 'antd/lib/drawer'
import Popconfirm from 'antd/lib/popconfirm'
import notification from 'antd/lib/notification'
import message from 'antd/lib/message'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import { useState } from 'react'
import Sticky from 'wil-react-sticky'

function MigIndexProfile({ dataDetailCompany }) {
    const [editable, setEditable] = useState(false)
    const onClickEdit = () => {
        setEditable(true)
    }
    return (
        <div id="profileeDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-8">
                <Sticky containerSelectorFocus="#profileeDetailMigWrapper">
                    <div className="flex space-x-2">
                        {editable ?
                            <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md" onClick={() => { setEditable(false) }}>Cancel</button>
                            :
                            null
                        }
                        {editable ?
                            <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md" onClick={onClickEdit}>Save</button>
                            :
                            <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md w-40" onClick={onClickEdit}>Edit</button>
                        }
                    </div>
                </Sticky>
            </div>
            <div className="w-full h-auto p-3 md:p-5 grid  grid-cols-1 md:grid-cols-2">
                <div className="md:m-5 mb-5 md:mb-0 ">
                    <h1 className="font-semibold text-sm">Nama Perusahaan:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="md:m-5 mb-5 md:mb-0">
                    <h1 className="font-semibold text-sm">Singkatan:</h1>
                    {/* <h1 className="font-normal text-sm">MIG</h1> */}
                    {
                        editable ?
                            <Input defaultValue="MIG"></Input>
                            :
                            <Input disabled defaultValue="MIG"></Input>
                    }
                </div>
                <div className="md:m-5 mb-5 md:mb-0">
                    <h1 className="font-semibold text-sm">Tanggal PKP:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="md:m-5 mb-5 md:mb-0">
                    <h1 className="font-semibold text-sm">NPWP:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="md:m-5 mb-5 md:mb-0">
                    <h1 className="font-semibold text-sm">Penanggung Jawab:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="md:m-5 mb-5 md:mb-0">
                    <h1 className="font-semibold text-sm">Alamat:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.address}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.address}></Input>
                    }
                </div>
                <div className="md:m-5 mb-5 md:mb-0">
                    <h1 className="font-semibold text-sm">Telepon:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.phone_number}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.phone_number}></Input>
                    }
                </div>
                <div className="md:m-5 mb-5 md:mb-0">
                    <h1 className="font-semibold text-sm">Fax:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="md:m-5 mb-5 md:mb-0">
                    <h1 className="font-semibold text-sm">Email:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="md:m-5 mb-5 md:mb-0">
                    <h1 className="font-semibold text-sm">Website:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
            </div>
        </div>
    )
}

function MigIndexLocations() {
    const [editable, setEditable] = useState(false)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [checkedtree, setCheckedtree] = useState([])
    const [selectedtree, setSelectedtree] = useState([])
    const [expandedKeys, setExpandedKeys] = useState([])
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeys) => {
        setEditable(true)
        setCheckedtree(checkedKeys)
        if (checkedKeys.length === 0) {
            setEditable(false)
        }
    };

    const onSelect = (selectedKeys, info) => {
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
        <div id="locationssDetailMigWrapper">
            {/* <Sticky containerSelectorFocus="#locationsDetailMigWrapper"> */}
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
            {/* </Sticky> */}
            <div className="md:p-5">
                <h1 className="text-sm font-semibold">Pilih Parent terakhir untuk hapus</h1>
                {/* <Tree treeData={treeData} autoExpandParent={autoExpandParent} selectable selectedKeys={selectedtree} checkable checkedKeys={checkedtree} onCheck={() => { setEditable(true) }}>
                </Tree> */}
                <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedtree}
                    onSelect={onSelect}
                    selectedKeys={selectedtree}
                    treeData={treeData}
                />
            </div>
        </div>
    )
}

function MigIndexBankAccount({ dataGetBanks, tok }) {
    const rt = useRouter()
    const [editable, setEditable] = useState(false)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [drawableedit, setDrawableedit] = useState(false)
    // const [selectedrows, setSelectedrows] = useState([])
    const [recordrow, setRecordrow] = useState({
        id: 0,
        company_id: 66,
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    const [bankdata, setBankdata] = useState({
        company_id: 66,
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
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/company/mig?originPath=Admin`)
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
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setBankdata({
                        company_id: 66,
                        name: '',
                        account_number: '',
                        owner: '',
                        currency: ''
                    })
                    setTimeout(() => {
                        setDrawablecreate(false)
                        rt.push(`/company/mig?originPath=Admin`)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
        console.log("isi bank data: " + bankdata.name)
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
                        company_id: 66,
                        name: '',
                        account_number: '',
                        owner: '',
                        currency: ''
                    })
                    setTimeout(() => {
                        setDrawableedit(false)
                        rt.push(`/company/mig?originPath=Admin`)
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
            // filters: [
            //     {
            //         text: 'Bukopin',
            //         value: 'Bank Bukopin Kantor Pusat - Jakarta',
            //     },
            // ],
            // onFilter: (value, record) => record.bank.indexOf(value) === 0,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nomor Rekening',
            dataIndex: 'account_number',
            sorter: (a, b) => a.account_number - b.account_number,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Atas Nama',
            dataIndex: 'owner',
            sorter: (a, b) => a.owner.localeCompare(b.owner),
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
                                <Popconfirm title="Yakin hapus data bank account?" onConfirm={() => { handleDeleteBA(record) }} onCancel={() => { message.error("Gagal dihapus") }}>
                                    <a><DeleteOutlined /></a>
                                </Popconfirm>
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
                    <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md w-24 md:w-40" onClick={() => { setDrawablecreate(true) }}> Create</button>
                    <Drawer title="Edit data Bank Account MIG" maskClosable={false} visible={drawableedit} onClose={() => { setDrawableedit(false) }} width={720}
                    // footer={
                    // <div style={{ textAlign: 'right' }}>
                    //     <button onClick={() => { setDrawableedit(false) }} className="bg-white-700 hover:bg-gray-300 border text-black py-1 px-2 rounded-md w-20 mr-4">
                    //         Cancel
                    //         </button>
                    //     <button type="primary" className="bg-blue-700 hover:bg-blue-800 border text-white py-1 px-2 rounded-md w-20">
                    //         Submit
                    //         </button>
                    // </div>
                    // }
                    >
                        <Form layout="vertical">
                            <div className="grid grid-cols-2">
                                {/* record: {recordrow.name} */}
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Bank Name"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Please input your bank name!',
                                //     },
                                // ]}
                                >
                                    <Input onChange={onChangeEditBA} name="name" defaultValue={recordrow.name} />
                                </Form.Item>
                                <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="Account Number"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Please input your account number!',
                                //     },
                                // ]}
                                >
                                    <Input onChange={onChangeEditBA} name="account_number" defaultValue={recordrow.account_number} />
                                </Form.Item>
                                <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Owner"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Please input the owner!',
                                //     },
                                // ]}
                                >
                                    <Input onChange={onChangeEditBA} name="owner" defaultValue={recordrow.owner} />
                                </Form.Item>
                                <Form.Item name="currency" style={{ marginRight: `1rem` }} label="Currency">
                                    <Input onChange={onChangeEditBA} name="currency" defaultValue={recordrow.currency} />
                                </Form.Item>
                            </div>
                            <button className="bg-gray-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-gray-800" onClick={handleSubmitEditBA}>Edit</button>
                        </Form>
                    </Drawer>
                    <Drawer title="Create data Bank Account MIG" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={720}
                    // footer={
                    // <div style={{ textAlign: 'right' }}>
                    //     <button onClick={() => { setDrawablecreate(false) }} className="bg-white-700 hover:bg-gray-300 border text-black py-1 px-2 rounded-md w-20 mr-4">
                    //         Cancel
                    //         </button>
                    //     <button type="primary" className="bg-blue-700 hover:bg-blue-800 border text-white py-1 px-2 rounded-md w-20">
                    //         Submit
                    //         </button>
                    // </div>
                    // }
                    >
                        <Form layout="vertical">
                            <div className="grid grid-cols-2">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Bank Name" rules={[
                                    {
                                        required: true,
                                        message: 'Please input your bank name!',
                                    },
                                ]}>
                                    <Input onChange={onChangeBA} name="name" value={bankdata.name} />
                                </Form.Item>
                                <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="Account Number" rules={[
                                    {
                                        required: true,
                                        message: 'Please input your account number!',
                                    },
                                ]}>
                                    <Input onChange={onChangeBA} name="account_number" value={bankdata.account_number} />
                                </Form.Item>
                                <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Owner" rules={[
                                    {
                                        required: true,
                                        message: 'Please input the owner!',
                                    },
                                ]}>
                                    <Input onChange={onChangeBA} name="owner" value={bankdata.owner} />
                                </Form.Item>
                                <Form.Item name="currency" style={{ marginRight: `1rem` }} label="Currency">
                                    <Input onChange={onChangeBA} name="currency" value={bankdata.currency} />
                                </Form.Item>
                            </div>
                            <button className="bg-blue-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-blue-800" onClick={handleSubmitCreateBA}>Submit</button>
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

function MigIndex({ initProps, dataProfile, sidemenu, dataDetailCompany, dataGetBanks }) {
    const rt = useRouter()
    const { TabPane } = Tabs;
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} originPath={originPath}>
            <div className="p-5 bg-white hidden md:block">
                <Tabs tabPosition={`left`}>
                    <TabPane tab="Profile" key={`profile`}>
                        <MigIndexProfile dataDetailCompany={dataDetailCompany}></MigIndexProfile>
                    </TabPane>
                    <TabPane tab="Bank Accounts" key={`bankAccounts`}>
                        <MigIndexBankAccount dataGetBanks={dataGetBanks} tok={tok} />
                    </TabPane>
                    <TabPane tab="Locations" key={`locations`}>
                        <MigIndexLocations></MigIndexLocations>
                    </TabPane>
                </Tabs>
            </div>
            <div className="p-5 bg-white block md:hidden">
                <Tabs tabPosition={`top`}>
                    <TabPane tab="Profile" key={`profile`}>
                        <MigIndexProfile dataDetailCompany={dataDetailCompany}></MigIndexProfile>
                    </TabPane>
                    <TabPane tab="Bank Accounts" key={`bankAccounts`}>
                        <MigIndexBankAccount dataGetBanks={dataGetBanks} tok={tok} />
                    </TabPane>
                    <TabPane tab="Locations" key={`locations`}>
                        <MigIndexLocations></MigIndexLocations>
                    </TabPane>
                </Tabs>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
    var initProps = {};
    const reqBodyMigDetail = {
        login_id: 66
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

    const resourcesGC = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyDetail`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBodyMigDetail)
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


export default MigIndex