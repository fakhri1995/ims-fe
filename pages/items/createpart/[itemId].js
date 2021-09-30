import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, TreeSelect, Table, Input, Select, Modal } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'


const CreateItemPart = ({ dataProfile, sidemenu, initProps, itemid }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(2, 1)
    pathArr[pathArr.length - 1] = "Tambah Item Part"
    const { name, asset_id } = rt.query

    //useState
    const [displaydata, setdisplaydata] = useState([])
    const [displaydata2, setdisplaydata2] = useState([])
    const [displaydata3, setdisplaydata3] = useState([])
    const [newpartdata, setnewpartdata] = useState({
        id: Number(itemid),
        inventory_part_ids: [],
        notes: ""
    })
    const [invrelations, setinvrelations] = useState({
        models: [
            {
                id: "",
                name: "",
                deleted_at: null
            }
        ],
        assets: [
            {
                id: "",
                name: "",
                deleted_at: null
            }
        ],
        manufacturers: [
            {
                id: "",
                name: "",
                deleted_at: null
            }
        ],
        status_condition: [],
        status_usage: [],
        vendors: [],
        companies: []
    })
    const [listselectedpart, setlistselectedpart] = useState([])
    const [namasearchact, setnamasearchact] = useState(false)
    const [namavalue, setnamavalue] = useState("")
    const [assettypefilteract, setassettypefilteract] = useState(false)
    const [assettypevalue, setassettypevalue] = useState("")
    const [modelfilteract, setmodelfilteract] = useState(false)
    const [modelvalue, setmodelvalue] = useState("")
    const [assetdata, setassetdata] = useState([])
    const [rowstate, setrowstate] = useState(0)
    const [praloading, setpraloading] = useState(true)
    const [modaladd, setmodaladd] = useState(false)
    const [loadingadd, setloadingadd] = useState(false)
    const [disabledadd, setdisabledadd] = useState(true)

    //3.Define
    const columnsTable = [
        {
            title: 'Nama Item',
            dataIndex: 'inventory_name',
            key: 'inventory_name',
        },
        {
            title: 'Serial Number',
            dataIndex: 'serial_number',
            key: 'serial_number',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Asset Type',
            dataIndex: 'asset_name',
            key: 'asset_name',
        },
    ]
    const dummiesColumn = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '12%',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '30%',
            key: 'address',
        },
    ];
    const dummies = [
        {
            key: 1,
            id: 23,
            name: 'John Brown sr.',
            age: 60,
            address: 'New York No. 1 Lake Park',
            children: [
                {
                    key: 11,
                    id: 29,
                    name: 'John Brown',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    key: 12,
                    id: 30,
                    name: 'John Brown jr.',
                    age: 30,
                    address: 'New York No. 3 Lake Park',
                    children: [
                        {
                            key: 121,
                            id: 37,
                            name: 'Jimmy Brown',
                            age: 16,
                            address: 'New York No. 3 Lake Park',
                        },
                    ],
                },
                {
                    key: 13,
                    id: 39,
                    name: 'Jim Green sr.',
                    age: 72,
                    address: 'London No. 1 Lake Park',
                    children: [
                        {
                            key: 131,
                            id: 44,
                            name: 'Jim Green',
                            age: 42,
                            address: 'London No. 2 Lake Park',
                            children: [
                                {
                                    key: 1311,
                                    id: 45,
                                    name: 'Jim Green jr.',
                                    age: 25,
                                    address: 'London No. 3 Lake Park',
                                },
                                {
                                    key: 1312,
                                    id: 50,
                                    name: 'Jimmy Green sr.',
                                    age: 18,
                                    address: 'London No. 4 Lake Park',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            key: 2,
            id: 78,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ];
    const recursiveGetParentId = (id, tree) => {
        let parentId;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some((item) => item.id === id)) {
                    parentId = node.id;
                } else if (recursiveGetParentId(id, node.children)) {
                    parentId = recursiveGetParentId(id, node.children);
                }
            }
        }
        return parentId;
    };
    const recursiveGetParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some((item) => item.key === key)) {
                    parentKey = node.key;
                } else if (recursiveGetParentKey(key, node.children)) {
                    parentKey = recursiveGetParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    };
    var selectedPart = {}
    const recursiveSearchPart = (doc, key) => {
        for (var i = 0; i < doc.length; i++) {
            if (doc[i].key === key) {
                selectedPart = doc[i]
            }
            else{
                if(doc[i].children){
                    recursiveSearchPart(doc[i].children, key)
                }
            }
        }
    }

    //handler
    //1.onChange
    //search nama
    const onChangeSearch = (e) => {
        if (e.target.value === "") {
            setdisplaydata(displaydata2)
            setnamasearchact(false)
        }
        else {
            setnamasearchact(true)
            setnamavalue(e.target.value)
        }
    }
    //search asset type
    const onChangeAssetType = (id) => {
        if (typeof (id) === 'undefined') {
            setdisplaydata(displaydata2)
            setassettypefilteract(false)
        }
        else {
            setassettypefilteract(true)
            setassettypevalue(id)
        }
    }
    //search model
    const onChangeModel = (idmodel) => {
        if (typeof (idmodel) === 'undefined') {
            setdisplaydata(displaydata2)
            setmodelfilteract(false)
        }
        else {
            setmodelfilteract(true)
            setmodelvalue(idmodel)
        }
    }
    const onFinalClick = () => {
        var datatemp = displaydata1
        if (assettypefilteract) {
            datatemp = datatemp.filter(flt => {
                return (flt.asset_name.toLowerCase().includes(assettypevalue.toLowerCase())) || (flt.asset_name.replaceAll(/\s+\/\s+/g, "/").split("/")[0] === namaasset)
            })
        }
        if (modelfilteract) {
            datatemp = datatemp.filter(flt => flt.modelid === modelvalue)
        }
        if (namasearchact) {
            datatemp = datatemp.filter(flt => {
                return flt.model_name.toLowerCase().includes(namavalue.toLowerCase())
            })
        }
        setdisplaydata(datatemp)
    }
    const handleAddItemPart = () => {
        // setloadingadd(true)
        // fetch(`https://boiling-thicket-46501.herokuapp.com/addInventoryParts`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': JSON.parse(initProps),
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newpartdata)
        // })
        //     .then(res => res.json())
        //     .then(res2 => {
        //         setloadingadd(false)
        //         if (res2.success) {
        //             notification['success']({
        //                 message: "Item Part berhasil ditambahkan",
        //                 duration: 3
        //             })
        //             setmodaladd(false)
        //         }
        //         else if (!res2.success) {
        //             notification['error']({
        //                 message: res2.message,
        //                 duration: 3
        //             })
        //         }
        //     })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryReplacements?id=${asset_id}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdisplaydata(res2.data)
                setdisplaydata2(res2.data)
                setdisplaydata3(res2.data)
                setpraloading(false)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getAssets`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setassetdata(res2.data)
            })
    }, [])
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryRelations`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setinvrelations(res2.data)
            })
    }, [])
    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className="h-20 w-full grid grid-cols-1 md:grid-cols-3 bg-white mb-5 p-4">
                <div className=" col-span-1 md:col-span-2 flex items-center mb-2 md:mb-0">
                    <div className="font-semibold text-xl w-auto">Form Tambah Item Part "{name}"</div>
                </div>
                <div className=" col-span-1 md:col-span-1 flex md:justify-end items-center">
                    <Button onClick={() => { rt.push(`/items/detail/${itemid}?active=konfigurasiPart`) }} style={{ marginRight: `1rem` }} size="middle" type="danger">
                        Batal
                    </Button>
                    <Button disabled={disabledadd} onClick={()=>{setmodaladd(true)}} size="middle" type="primary">
                        Simpan
                    </Button>
                </div>
            </div>
            <div className="h-auto w-full grid grid-cols-1 md:grid-cols-5 mb-5 bg-white rounded-md">
                <div className="md:col-span-5 col-span-1 flex flex-col py-3">
                    <div className="flex mb-8">
                        <div className=" w-full mr-1 grid grid-cols-12">
                            <div className="col-span-5 mr-1">
                                <Input style={{ width: `100%`, marginRight: `0.5rem` }} placeholder="Cari Nama Model" onChange={onChangeSearch} allowClear></Input>
                            </div>
                            <div className="col-span-3 mr-1">
                                <Select placeholder="Model" style={{ width: `100%` }} allowClear onChange={(value) => {
                                    if (typeof (value) === 'undefined') {
                                        onChangeModel()
                                    }
                                    else {
                                        onChangeModel(value)
                                    }
                                }}>
                                    {
                                        invrelations.models.map((docmodels, idxmodels) => {
                                            return (
                                                <Select.Option value={docmodels.id}>{docmodels.name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="col-span-3 mr-1">
                                <TreeSelect allowClear
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={assetdata}
                                    placeholder="Cari Asset Type"
                                    treeDefaultExpandAll
                                    style={{ width: `100%` }}
                                    onChange={(value, label, extra) => {
                                        if (typeof (value) === 'undefined') {
                                            onChangeAssetType()
                                        }
                                        else {
                                            onChangeAssetType(extra.allCheckedNodes[0].node.props.title)
                                            setnamaasset(extra.allCheckedNodes[0].node.props.title)
                                        }
                                    }}
                                />
                            </div>
                            <div className=" col-span-1">
                                <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
                            </div>
                        </div>
                    </div>
                    <Table
                        rowSelection={{
                            onChange: (selectedRowKeys, selectedRows) => {
                                if(selectedRows.length > 0){
                                    setdisabledadd(false)
                                }
                                else{
                                    setdisabledadd(true)
                                }
                                setnewpartdata({...newpartdata, inventory_part_ids: selectedRows.map(doc=>doc.id)})
                                var listarr = []
                                selectedRows.forEach((doc, idx) => {
                                    const a = recursiveGetParentKey(doc.key, dummies)
                                    if(typeof(a) !== 'undefined'){
                                        recursiveSearchPart(dummies ,a)
                                        listarr.push({ name: doc.name, parent: selectedPart })
                                    }
                                    else{
                                        listarr.push({ name: doc.name, parent: "" })
                                    }
                                })
                                setlistselectedpart(listarr)
                            },
                            onSelectAll: (selected, selectedRows, changeRows) => {
                                console.log(selected, selectedRows, changeRows);
                            },
                            checkStrictly: true
                        }}
                        pagination={{ pageSize: 9 }} scroll={{ x: 200 }} dataSource={dummies} columns={dummiesColumn} loading={praloading}
                        onRow={(record, rowIndex) => {
                            return {
                                onMouseOver: (event) => {
                                    setrowstate(record.id)
                                },
                                onClick: (event) => {
                                    // {
                                    //     [107, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    // rt.push(`/items/detail/${record.id}`)
                                    //         :
                                    //         null
                                    // }
                                }
                            }
                        }}
                        rowClassName={(record, idx) => {
                            return (
                                record.id === rowstate ? `cursor-pointer` : ``
                            )
                        }}
                    ></Table>
                </div>
            </div>
            <Modal title={<h1 className="font-semibold">Apakah anda yakin untuk menambahkan Item berikut ini menjadi Item Part "{name}"?</h1>}
                visible={modaladd}
                onCancel={() => { setmodaladd(false) }}
                okText="Ya"
                cancelText="Tidak"
                onOk={handleAddItemPart}
                okButtonProps={{ loading: loadingadd }}
                width={760}
            >
                <div className="flex flex-col">
                    <div className="flex flex-col mb-4">
                        {
                            listselectedpart.map((doc,idx)=>{
                                if(doc.parent !== ""){
                                    return(
                                        <p className="mb-0 text-xs font-semibold">- {doc.name}, sedang menjadi Item Part dari "{doc.parent.name}"</p>
                                    )
                                }
                                else{
                                    return(
                                        <p className="mb-0 text-xs font-semibold">- {doc.name}</p>
                                    )
                                }
                            })
                        }
                    </div>
                    {
                        listselectedpart.some(doc2 => doc2.parent !== "") &&
                        <div className="flex flex-col mb-3">
                        <p className="text-red-500 mb-0">Dengan menyetujui hal ini, anda akan mengeluarkan item part diatas dari item utama-nya!</p>
                    </div>
                    }
                    <div className="flex flex-col">
                        <p className="mb-0">Notes</p>
                        <Input.TextArea rows={4} placeholder="Masukkan Notes" onChange={(e => {
                            setnewpartdata({ ...newpartdata, notes: e.target.value })
                        })}></Input.TextArea>
                    </div>
                </div>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const itemid = params.itemId
    var initProps = {};
    if (!req.headers.cookie) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
    if (!cookiesJSON1.token) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    initProps = cookiesJSON1.token
    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "3",
            itemid
        },
    }
}

export default CreateItemPart
