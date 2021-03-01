import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import notification from 'antd/lib/notification'
import Sticky from 'wil-react-sticky'
import Link from 'next/link'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard-main.module.css'


function AssetsNew({ initProps, dataProfile, dataAssetsList, sidemenu, assetsTitle, assetsParent }) {
    const originPath = "Admin"
    function flattenArr(dataassets) {
        const result = []
        dataassets.forEach((item, idx) => {
            const { id, title, key, value, children } = item
            result.push({
                id: id,
                title: title,
                key: key,
                value: value
            })
            if (children) {
                result.push(...flattenArr(children))
            }
        })
        return result
    }
    const flattenDataAsset = flattenArr(dataAssetsList.data)
    var dataAssetDetail = {}
    var dataAssetParentDetail = {}
    flattenDataAsset.forEach(item => {
        if (item.title == assetsTitle) {
            dataAssetDetail = item
        }
    })
    flattenDataAsset.forEach(item => {
        if (item.key == assetsParent) {
            dataAssetParentDetail = item
        }
    })
    const pathArr = ['assets', 'new asset']
    notification['success']({
        message: `Asset ${dataAssetDetail.title} berhasil ditambahkan`,
        duration: 4
    })
    return (
        <Layout tok={initProps} pathArr={pathArr} dataProfile={dataProfile} dataAssetsList={dataAssetsList} sidemenu={sidemenu} originPath={originPath} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                    <Sticky containerSelectorFocus="#formAgentsWrapper">
                        <div className="flex justify-between p-4 border-t-2 border-b-2 bg-white mb-8">
                            <h1 className="font-semibold py-2">{dataAssetDetail.title}</h1>
                            <div className="flex space-x-2">
                                <Link href={`/assets?originPath=Admin`}>
                                    <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md">Cancel</button>
                                </Link>
                                <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md">Update</button>
                            </div>
                        </div>
                    </Sticky>
                    <div className="p-4 mb-4">
                        <div className="w-full h-auto border border-black pb-2">
                            <div className="h-auto w-full p-2 bg-gray-500 text-white mb-2">{dataAssetParentDetail.title} Properties</div>
                            <div className=" text-center">{dataAssetParentDetail.title} Properties akan ditampilkan disini</div>
                        </div>
                    </div>
                    <div className="p-4 mb-4">
                        <div className="w-full h-auto border border-dashed border-opacity-20 border-black pb-2">
                            <div className="h-auto w-full p-2 bg-gray-700 text-white mb-2">{dataAssetDetail.title} Properties</div>
                            <div className="h-32 flex justify-center items-center">
                                <div className="text-gray-300 text-base">Drag and Drop the custom field to build your own custom Form</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-1 hidden md:flex flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Tambah Custom Field</div>
                    <p className="font-normal text-sm">
                        Drag and drop any field type into the "Asset Type Field" form, to add a new custom field
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-2 space-x-1 space-y-1">
                        <div id="singleLineText" className="text-center pt-4 border rounded-md h-16 text-xs">Text</div>
                        <div id="number" className="text-center pt-4 border rounded-md h-16 text-xs">Number</div>
                        <div id="decimal" className="text-center pt-4 border rounded-md h-16 text-xs">Decimal</div>
                        <div id="textarea" className="text-center pt-4 border rounded-md h-16 text-xs">TextArea</div>
                        <div id="checkbox" className="text-center pt-4 border rounded-md h-16 text-xs">Checkbox</div>
                        <div id="select" className="text-center pt-4 border rounded-md h-16 text-xs">Dropdown</div>
                        <div id="tree" className="text-center pt-4 border rounded-md h-16 text-xs">Tree</div>
                        <div id="date" className="text-center pt-4 border rounded-md h-16 text-xs">Date</div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, query }) {
    var initProps = {};
    const assetsTitle = query.title
    const assetsParent = query.parent
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
            sidemenu: "4",
            assetsTitle,
            assetsParent
        },
    }
}

export default AssetsNew