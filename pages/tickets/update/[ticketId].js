import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { LoadingOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import Sticky from 'wil-react-sticky'
import { Form, Input, notification, Button, Select, DatePicker, Popconfirm } from 'antd'
import Layout from '../../../components/layout-dashboard2'
import st from '../../../components/layout-dashboard.module.css'

const TicketUpdate = ({ initProps, dataProfile, sidemenu, ticketid }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Ubah Ticket"
    const [instanceForm] = Form.useForm();

    //2.useState
    const [updatedata, setupdatedata] = useState({
        type: 1,
        due_to: null,
        requester_location: dataProfile.data.company.company_id,
        requester: dataProfile.data.user_id,
        incident_place_id: null,
        asset_id: null,
        incident_time: null,
        description: "",
        files: [],
        product_type: null,
        product_id: null,
        pic: null,
        problem: ""
    })
    const [ticketrelations, setticketrelations] = useState({
        status_ticket: [],
        incident_type: [],
        requesters: [],
        requester_companies: [],
        companies: [],
    })
    const [filesupload, setfilesupload] = useState([])
    const [modeldata, setmodeldata] = useState([])
    const [columnsmodeldata, setcolumnsmodeldata] = useState([])
    const [partmodeldata, setpartmodeldata] = useState([])
    const [assetnameitem, setassetnameitem] = useState("")
    const [snitem, setsnitem] = useState(false)
    const [disabledfielditem, setdisabledfielditem] = useState(true)
    const [manuffielditem, setmanuffielditem] = useState(true)
    const [dynamicfielditem, setdynamicfielditem] = useState([])
    const [praloading, setpraloading] = useState(true)
    const [loadingspec, setloadingspec] = useState(false)
    const [modalfinal, setmodalfinal] = useState(false)
    const [loadingupdate, setloadingupdate] = useState(false)
    const [disabledfield, setdisabledfield] = useState(false)
    const [loadingfoto, setloadingfoto] = useState(false)
    const [uploadtrigger, setuploadtrigger] = useState(-1)
    const [uploaddata, setuploaddata] = useState(null)

    //handler
    const onChangeGambar = (e) => {
        setloadingfoto(true)
        const foto = e.target.files
        setuploaddata(foto[0])
        setloadingfoto(false)
        setfilesupload(prev => {
            var temp = prev
            temp.push(foto[0])
            return temp
        })
        setuploadtrigger(prev => prev + 1)
    }
    const handleUpdateTicket = () => {
        // setloadingcreate(true)
        // fetch(`https://boiling-thicket-46501.herokuapp.com/updateTicket`, {
        //     method: 'PUT',
        //     headers: {
        //         'Authorization': JSON.parse(initProps),
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(updatedata)
        // })
        //     .then(res => res.json())
        //     .then(res2 => {
        //         setloadingcreate(false)
        //         if (res2.success) {
        //             notification['success']({
        //                 message: "Ticket berhasil diubah",
        //                 duration: 3
        //             })
        //             setmodalfinal(false)
        //             rt.push(`/tickets`)
        //         }
        //         else if (!res2.success) {
        //             notification['error']({
        //                 message: res2.message,
        //                 duration: 3
        //             })
        //         }
        //     })
    }

    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getClientTicketRelation`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setticketrelations(res2.data)
                setpraloading(false)
            })
    }, [])
    useEffect(() => {
        if (uploadtrigger !== -1) {
            setnewdata(prev => {
                var temp = prev
                temp.files.push(uploaddata)
                return temp
            })
        }
    }, [uploadtrigger])

    return (
        <Layout dataProfile={dataProfile} sidemenu={sidemenu} tok={initProps} st={st} pathArr={pathArr}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4" id="createAssetsWrapper">
                <div className=" col-span-1 md:col-span-4 mb-8 p-3 z-20">
                    <Sticky containerSelectorFocus="#createAgentsWrapper">
                        <div className=" col-span-4 flex justify-between pt-4 border-t-2 border-b-2 bg-white">
                            <h1 className="font-semibold py-2">Form Ubah Ticket</h1>
                            <div className="flex space-x-2">
                                <Link href={`/tickets/detail/${ticketid}`}>
                                    <Button type="default" /*onClick={() => { console.log(newdata); console.log(filesupload) }}*/>Batal</Button>
                                </Link>
                                <Button disabled={disabledfield} loading={loadingupdate} type="primary" onClick={() => {
                                    instanceForm.submit()
                                }}>Simpan</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4 mb-6 py-3 px-16">
                    <div className="shadow-md border py-5 px-10 flex flex-col rounded-md mb-5">
                        <div className="flex mb-2">
                            <span className="raisedBy"></span>
                            <p className="mb-0 ml-1">Raised By</p>
                        </div>
                        <Select value={updatedata.type} defaultValue={1}>
                            <Select.Option value={1}>Incident</Select.Option>
                        </Select>
                        <style jsx>
                            {`
                                .raisedBy::before{
                                    content: '*';
                                    color: red;
                                }
                            `}
                        </style>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const ticketid = params.ticketId
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
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    // if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/dashboard/admin' })
    //     res.end()
    // }

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "21",
            ticketid
        },
    }
}

export default TicketUpdate
