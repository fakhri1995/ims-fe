import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import Tree from 'antd/lib/tree'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form/Form'
import Input from 'antd/lib/input'
import TreeSelect from 'antd/lib/tree-select'
import notification from 'antd/lib/notification'
import message from 'antd/lib/message'
import Popconfirm from 'antd/lib/popconfirm'
import Link from 'next/link'
import Layout from '../../components/layout-dashboard'
import st from '../../components/layout-dashboard.module.css'

function AssetsIndex({ initProps, dataProfile, sidemenu, dataAssetsList }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const treeData = dataAssetsList.data
    const onChangeParent = (value) => {
        setDatanew({
            ...datanew,
            parent: value
        })
    }
    const [newmodal, setNewmodal] = useState(false)
    const [newmodalparent, setNewmodalparent] = useState(false)
    const [parentadd, setParentadd] = useState("")
    const [parenttitle, setParenttitle] = useState("")
    const [datanew, setDatanew] = useState({
        name: '',
        parent: '',
    })
    const onChangeAddAssets = (e) => {
        setDatanew({
            ...datanew,
            [e.target.name]: e.target.value
        })
    }
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [expandedKeys, setExpandedKeys] = useState([])
    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    }
    const handleAddAssets = () => {
        // rt.push(`/assets/update/${datanew.name}?originPath=Admin&title=${datanew.name}&parent=${datanew.parent}&create=true`)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addAsset`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datanew)
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setNewmodal(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/assets/update/${datanew.name}?originPath=Admin&title=${datanew.name}&parent=${datanew.parent}&create=true`)
                    }, 500)
                }
                else if (!res2.success) {
                    setNewmodal(false)
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const handleDeleteAssets = (idAssets) => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteAsset`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idAssets
            })
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setNewmodal(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/assets?originPath=Admin`)
                    }, 500)
                }
                else if (!res2.success) {
                    setNewmodal(false)
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    return (
        <Layout tok={tok} pathArr={pathArr} sidemenu={sidemenu} dataProfile={dataProfile} st={st} originPath={originPath}>
            <div className="w-full h-auto border-t border-opacity-30 border-gray-500 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-3 flex flex-col">
                        <div className="p-2 md:p-5 mb-5 border-b flex justify-between">
                            <div className="text-xs md:text-sm font-semibold">
                                <h1 className="mt-2">Assets Types & Fields</h1>
                            </div>
                            <div className="w-auto h-auto p-2 text-white bg-blue-700 rounded-md cursor-pointer hover:bg-blue-900 text-xs md:text-sm font-semibold" onClick={() => { setNewmodal(true) }}>
                                New Asset Type
                            </div>
                            <Modal
                                title="Tambah Assets Type & Field"
                                visible={newmodal}
                                onCancel={() => setNewmodal(false)}
                                maskClosable={false}
                                footer={null}
                                style={{ top: `3rem` }}
                                width={800}
                                destroyOnClose
                            >
                                <Form layout="vertical" onFinish={handleAddAssets}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 mb-5">
                                        <div className="flex flex-col mx-3">
                                            <h1 className="text-sm">Nama:</h1>
                                            <Input onChange={onChangeAddAssets} name="name" value={datanew.name} allowClear required />
                                        </div>
                                        <div className="flex flex-col mx-3">
                                            <h1 className="text-sm">Deskripsi:</h1>
                                            <Input name="description" allowClear />
                                        </div>
                                        <div className="flex flex-col mx-3">
                                            <h1 className="text-sm">Parent:</h1>
                                            <TreeSelect
                                                style={{ width: '100%' }}
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeData={treeData}
                                                placeholder="Pilih parent"
                                                treeDefaultExpandAll
                                                onChange={(value) => { onChangeParent(value) }}
                                                allowClear
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-blue-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-blue-800">Submit</button>
                                </Form>
                            </Modal>
                            <Modal
                                title={`Tambah Assets Type & Field dari parent ${parenttitle}`}
                                visible={newmodalparent}
                                onCancel={() => { setNewmodalparent(false); setParentadd("") }}
                                maskClosable={false}
                                footer={null}
                                style={{ top: `3rem` }}
                                width={800}
                                destroyOnClose
                            >
                                <Form layout="vertical" onFinish={handleAddAssets}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 mb-5">
                                        <div className="flex flex-col mx-3">
                                            <h1 className="text-sm">Nama:</h1>
                                            <Input onChange={onChangeAddAssets} name="name" value={datanew.name} allowClear required />
                                        </div>
                                        <div className="flex flex-col mx-3">
                                            <h1 className="text-sm">Deskripsi:</h1>
                                            <Input name="description" allowClear />
                                        </div>
                                        <div className="flex flex-col mx-3">
                                            <h1 className="text-sm">Parent:</h1>
                                            <TreeSelect
                                                style={{ width: '100%' }}
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                defaultValue={parentadd}
                                                treeData={treeData}
                                                placeholder="Pilih parent"
                                                treeDefaultExpandAll
                                                onChange={(value) => { onChangeParent(value) }}
                                                allowClear
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-blue-600 w-auto h-auto py-1 px-3 text-white rounded-md hover:to-blue-800">Submit</button>
                                </Form>
                            </Modal>
                        </div>
                        <div className="p-2 md:p-5">
                            <Tree
                                onExpand={onExpand}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                                treeData={treeData}
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
                                                <a className="mx-2 pb-1" alt="add" onClick={() => { setNewmodalparent(true); setParentadd(nodeData.value); setParenttitle(nodeData.title) }}><PlusOutlined /></a>
                                                <Link href={`/assets/update/${nodeData.title}?originPath=Admin&parent=${nodeData.value}&id=${nodeData.id}`}>
                                                    <a className="mx-2 pb-1" alt="update"><EditOutlined /></a>
                                                </Link>
                                                <Popconfirm onConfirm={() => { handleDeleteAssets(nodeData.id) }} onCancel={() => { message.error("Gagal dihapus") }}>
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
                    <div className="col-span-1 md:col-span-1 flex flex-col p-2 md:p-5">
                        <h1 className="text-xs md:text-sm font-semibold mb-5">Asset Types & Fields</h1>
                        <p className="text-xs md:text-sm">
                            Freshservice lets you maintain a repository of assets by creating a structure of configuration types in your help desk. You can add asset types at the root level or within another asset type, and have several items mapped to those types.You can also disable the default asset types so that only the ones you need are visible.
                        <br /><br />
                        When you open an asset, you can find out whether it is currently being used, its business impact and the employee it’s assigned to in your team. In addition you will also be able to pull out specifications, relationship details etc. about the asset without switching between different pages.
                        </p>
                    </div>
                </div>
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
    const resources = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjson = await resources.json()
    const dataProfile = resjson

    const resourcesGA = await fetch(`https://boiling-thicket-46501.herokuapp.com/getAssets`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
        }
    })
    const resjsonGA = await resourcesGA.json()
    const dataAssetsList = resjsonGA

    return {
        props: {
            initProps,
            dataProfile,
            dataAssetsList,
            sidemenu: "4"
        },
    }
}

export default AssetsIndex