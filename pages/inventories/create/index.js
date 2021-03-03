import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import httpcookie from 'cookie'

import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'

function InventoryCreate({ initProps, dataProfile, dataAssetsList, sidemenu }) {
    const rt = useRouter()
    const { originPath } = rt.query
    const pathArr = rt.pathname.split("/").slice(1)
    return (
        <Layout tok={initProps} pathArr={pathArr} dataProfile={dataProfile} dataAssetsList={dataAssetsList} sidemenu={sidemenu} originPath={originPath} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-3 border-r p-5">
                    <div className="flex justify-between p-5 w-full h-auto bg-white border-b mb-8">
                        <div className=" font-semibold">New Inventory</div>
                        <div className="flex">
                            <Link href={`/inventory?originPath=Admin`}>
                                <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md mr-5">Cancel</button>
                            </Link>
                            <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md">Submit</button>
                        </div>
                    </div>
                    <div className="flex flex-col">

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
            initProps = cookiesJSON.token;
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
        }
    }
}

export default InventoryCreate