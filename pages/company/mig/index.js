import Layout from '../../../components/layout-dashboard-mig'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import Tabs from 'antd/lib/tabs'
import Input from 'antd/lib/input'
import Table from 'antd/lib/table'
import Tree from 'antd/lib/tree'
import Drawer from 'antd/lib/drawer'
import Popconfirm from 'antd/lib/popconfirm'
import message from 'antd/lib/message'
import { useState } from 'react'
import Sticky from 'wil-react-sticky'

function MigIndexProfile({ dataDetailCompany }) {
    const [editable, setEditable] = useState(false)
    const onClickEdit = () => {
        setEditable(true)
    }
    return (
        <div id="profileDetailMigWrapper">
            <div className="flex justify-end p-3 border-t-2 border-b-2 bg-white mb-8">
                <Sticky containerSelectorFocus="#profileDetailMigWrapper">
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
            <div className="w-full h-auto p-5 grid grid-cols-2">
                <div className="m-5">
                    <h1 className="font-semibold text-sm">Nama Perusahaan:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="m-5">
                    <h1 className="font-semibold text-sm">Singkatan:</h1>
                    <h1 className="font-normal text-sm">MIG</h1>
                </div>
                <div className="m-5">
                    <h1 className="font-semibold text-sm">Tanggal PKP:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="m-5">
                    <h1 className="font-semibold text-sm">NPWP:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="m-5">
                    <h1 className="font-semibold text-sm">Penanggung Jawab:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="m-5">
                    <h1 className="font-semibold text-sm">Alamat:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.address}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.address}></Input>
                    }
                </div>
                <div className="m-5">
                    <h1 className="font-semibold text-sm">Telepon:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.phone_number}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.phone_number}></Input>
                    }
                </div>
                <div className="m-5">
                    <h1 className="font-semibold text-sm">Fax:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="m-5">
                    <h1 className="font-semibold text-sm">Email:</h1>
                    {
                        editable ?
                            <Input defaultValue={dataDetailCompany.data.company_name}></Input>
                            :
                            <Input disabled defaultValue={dataDetailCompany.data.company_name}></Input>
                    }
                </div>
                <div className="m-5">
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
        <div id="locationsDetailMigWrapper">
            {/* <Sticky containerSelectorFocus="#locationsDetailMigWrapper"> */}
            <div className="flex justify-end p-3 border-t-2 border-b-2 bg-white mb-8">
                <div className="flex space-x-2">
                    {editable ?
                        <Popconfirm title="Yakin hapus lokasi?" onConfirm={() => { message.success("berhasil dihapus") }} onCancel={() => { message.error("Gagal dihapus") }}>
                            <button className=" bg-red-600 hover:bg-red-800 border text-white py-1 px-3 rounded-md w-40">
                                Delete
                                </button>
                        </Popconfirm>
                        :
                        null
                    }
                    <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md w-40" onClick={() => { setDrawablecreate(true) }}> Create</button>
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
            <div className="p-5">
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

function MigIndexBankAccount() {
    const [editable, setEditable] = useState(false)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [drawableedit, setDrawableedit] = useState(false)
    const [selectedrows, setSelectedrows] = useState([])
    const columnsDummy = [
        {
            title: 'No.',
            dataIndex: 'key'
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            filters: [
                {
                    text: 'Bukopin',
                    value: 'Bank Bukopin Kantor Pusat - Jakarta',
                },
            ],
            onFilter: (value, record) => record.bank.indexOf(value) === 0,
            sorter: (a, b) => a.bank.localeCompare(b.bank),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nomor Rekening',
            dataIndex: 'norek',
            sorter: (a, b) => a.norek - b.norek,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Atas Nama',
            dataIndex: 'an',
            sorter: (a, b) => a.an.localeCompare(b.an),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mata Uang',
            dataIndex: 'matauang',
            filters: [
                {
                    text: 'IDR',
                    value: 'IDR',
                },
            ],
            onFilter: (value, record) => record.matauang.indexOf(value) === 0,
        },
    ];
    const dataDummy = [
        {
            key: '1',
            bank: 'Bank Bukopin Kantor Pusat - Jakarta',
            norek: 12345,
            an: 'Test 1',
            matauang: 'IDR'
        },
        {
            key: '2',
            bank: 'Bank Syariah Bukopin - Jakarta',
            norek: 1234567,
            an: 'Test 2',
            matauang: 'IDR'
        },
    ];
    return (
        <div id="bankAccountDetailMigWrapper">
            {/* <Sticky containerSelectorFocus="#bankAccountDetailMigWrapper"> */}
            <div className="flex justify-end p-3 border-t-2 border-b-2 bg-white mb-8">
                <div className="flex space-x-2">
                    {
                        editable ?
                            <button className=" bg-gray-600 hover:bg-gray-800 border text-white py-1 px-3 rounded-md w-40" onClick={() => { setDrawableedit(true) }}>
                                Edit
                                </button>
                            :
                            null
                    }
                    <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-3 rounded-md w-40" onClick={() => { setDrawablecreate(true) }}> Create</button>
                    <Drawer title="Edit data Bank Account MIG" maskClosable={false} visible={drawableedit} onClose={() => { setDrawableedit(false) }} width={720} footer={
                        <div style={{ textAlign: 'right' }}>
                            <button onClick={() => { setDrawableedit(false) }} className="bg-white-700 hover:bg-gray-300 border text-black py-1 px-2 rounded-md w-20 mr-4">
                                Cancel
                                </button>
                            <button type="primary" className="bg-blue-700 hover:bg-blue-800 border text-white py-1 px-2 rounded-md w-20">
                                Submit
                                </button>
                        </div>
                    }></Drawer>
                    <Drawer title="Create data Bank Account MIG" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={720} footer={
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
            <div className="p-5">
                <Table rowSelection={{
                    selectedRowKeys: selectedrows, onChange: (selectedRowKeys) => {
                        setSelectedrows(selectedRowKeys)
                        setEditable(true)
                        if(selectedRowKeys.length === 0){
                            setEditable(false)
                        }
                    }
                }} columns={columnsDummy} dataSource={dataDummy} />
            </div>
        </div>
    )
}

function MigIndex({ initProps, dataProfile, sidemenu, dataDetailCompany }) {
    const rt = useRouter()
    const { TabPane } = Tabs;
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} originPath={originPath}>
            <div className="p-5">
                <Tabs tabPosition={`left`}>
                    <TabPane tab="Profile" key={`profile`}>
                        <MigIndexProfile dataDetailCompany={dataDetailCompany}></MigIndexProfile>
                    </TabPane>
                    <TabPane tab="Bank Accounts" key={`bankAccounts`}>
                        <MigIndexBankAccount />
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
    const resourcesGP = await fetch(`https://go.cgx.co.id/auth/v1/get-profile`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    const resourcesGC = await fetch(`https://go.cgx.co.id/admin/v1/get-company?id=${66}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGC = await resourcesGC.json()
    const dataDetailCompany = resjsonGC
    return {
        props: {
            initProps,
            dataProfile,
            dataDetailCompany,
            sidemenu: "4"
        },
    }
}


export default MigIndex