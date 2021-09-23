import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { ExclamationCircleOutlined, CalendarOutlined } from '@ant-design/icons'
import { notification, Button, Checkbox, Collapse, Timeline, Empty, Modal, Tooltip, Select } from 'antd'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'
import Sticky from 'wil-react-sticky'

const ItemDetail = ({ initProps, dataProfile, sidemenu, itemid }) => {
    //1. Init
    const rt = useRouter()
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Detail Item"
    const { Panel } = Collapse
    return (
        <Layout st={st} sidemenu={sidemenu} tok={initProps} pathArr={pathArr} dataProfile={dataProfile}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between py-2 px-4 border-t-2 border-b-2 bg-white">
                            <h1 className="font-semibold py-2 text-2xl mb-0">{itemid}</h1>
                            <div className="flex space-x-2 items-center">
                                {/* <Link href={`/admin/models/update2/${displaydata.id}`}> */}
                                <Button /*onClick={() => { window.location.href = `/admin/models/update2/${displaydata.id}` }}*/ type="primary">Ubah</Button>
                                {/* </Link> */}
                                <Button type="danger">Hapus</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const itemid = params.itemId
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

export default ItemDetail
