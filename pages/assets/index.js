import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import Tree from 'antd/lib/tree'
import Link from 'next/link'
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import Layout from '../../components/layout-dashboard-main'
import st from "../../components/layout-dashboard-main.module.css"

function AssetsAdmin({ initProps, dataProfile, sidemenu, dataAssetsList }) {
    console.log(dataAssetsList.data)

    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    const { originPath } = rt.query
    const treeData = dataAssetsList.data
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [hoverrowtree, setHoverrowtree] = useState("hidden")
    const [expandedKeys, setExpandedKeys] = useState([])
    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };
    return (
        <Layout tok={tok} pathArr={pathArr} sidemenu={sidemenu} dataProfile={dataProfile} st={st} originPath={originPath}>
            <div className="w-full h-auto border-t border-opacity-30 border-gray-500 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-3 flex flex-col">
                        <div className="p-2 md:p-5 mb-5 border-b flex justify-between">
                            <div className="text-xs md:text-sm font-semibold">
                                <h1 className="mt-2">Assets Types & Fields</h1>
                            </div>
                            <div className="w-auto h-auto p-2 text-white bg-blue-700 rounded-md cursor-pointer hover:bg-blue-900 text-xs md:text-sm font-semibold">
                                New Asset Type
                            </div>
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
                                                {/* <Link href={`/company/locations/new?originPath=Admin&parent=${nodeData.title}&companyId=${dataDetailCompany.data.company_id}`}> */}
                                                    <a className="mx-2 pb-1" alt="add"><PlusOutlined /></a>
                                                {/* </Link> */}
                                                {/* <Link href={`/company/locations/update/${dataDetailCompany.data.company_id}?originPath=Admin&parent=${nodeData.title}`}> */}
                                                    <a className="mx-2 pb-1" alt="update"><EditOutlined /></a>
                                                {/* </Link> */}
                                                {/* <Popconfirm title="Yakin hapus lokasi?" onConfirm={() => { message.success("berhasil dihapus") }} onCancel={() => { message.error("Gagal dihapus") }}> */}
                                                    <a className="mx-2 pb-1" alt="delete"><EyeInvisibleOutlined /></a>
                                                {/* </Popconfirm> */}
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
            sidemenu: "3"
        },
    }
}

export default AssetsAdmin