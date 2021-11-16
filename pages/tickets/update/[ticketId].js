import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { LoadingOutlined, UploadOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons'
import Sticky from 'wil-react-sticky'
import { Form, Input, notification, Button, Select, DatePicker, TreeSelect, Popconfirm, Spin } from 'antd'
import moment from 'moment'
import Layout from '../../../components/layout-dashboard2'
import st from '../../../components/layout-dashboard.module.css'

const TicketUpdate = ({ initProps, dataProfile, sidemenu, ticketid }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(1, 1)
    pathArr[pathArr.length - 1] = "Ubah Ticket"
    const [instanceForm] = Form.useForm();

    //2.useState
    const [updatedata, setupdatedata] = useState({
        id: Number(ticketid),
        requester_id: null,
        raised_at: null,
        closed_at: null,
        product_type: null,
        product_id: "",
        pic_name: "",
        pic_contact: "",
        location_id: null,
        problem: "",
        incident_time: null,
        files: [],
        description: ""
    })
    const [displaydata, setdisplaydata] = useState({
        ticket: {
            id: Number(ticketid),
            raised_at: "",
            closed_at: "",
            original_closed_at: "",
            resolve_time: "",
            type: {
                id: null,
                name: "",
                code: ""
            },
            status: {
                id: null,
                name: ""
            },
            requester: {
                id: null,
                name: "",
                company_id: null,
                company: {
                    id: null,
                    parent_id: null,
                    name: "",
                    image_logo: "-",
                    phone_number: "-",
                    address: "-",
                    role: null,
                    is_enabled: true,
                    singkatan: "-",
                    tanggal_pkp: "",
                    penanggung_jawab: "-",
                    npwp: "-",
                    fax: "-",
                    email: "-",
                    website: "-",
                    deleted_at: null
                }
            },
            ticketable: {
                id: null,
                product_type: null,
                product_id: "",
                pic_name: "",
                pic_contact: "",
                location_id: null,
                inventory_id: null,
                location: {
                    company_id: null,
                    company_name: ""
                },
                problem: "",
                incident_time: "",
                files: [
                    ""
                ],
                description: "",
                deleted_at: null
            },
            assignable: {
                id: null,
                name: ""
            }
        },
    })
    const [ticketrelations, setticketrelations] = useState({
        status_ticket: [],
        incident_type: [],
        requesters: [],
        requester_companies: [],
        companies: {
            data: [
                {
                    id: 0,
                    title: '',
                    key: '',
                    value: 0
                }
            ]
        },
    })
    const [users, setusers] = useState([])
    const [praloading, setpraloading] = useState(true)
    const [disabledfield, setdisabledfield] = useState(false)
    const [loadingupdate, setloadingupdate] = useState(false)
    //files
    const [filesupload, setfilesupload] = useState([])
    const [disabledupload, setdisabledupload] = useState("")
    const [loadingfoto, setloadingfoto] = useState(false)
    const [uploadtrigger, setuploadtrigger] = useState(-1)
    const [uploaddata, setuploaddata] = useState(null)
    const [reqlocation, setreqlocation] = useState(0)
    const [notclosed, setnotclosed] = useState(false)

    //handler
    const onChangeGambar = async (e) => {
        setloadingfoto(true)
        setdisabledupload("pointer-events-none")
        const foto = e.target.files
        const formdata = new FormData()
        formdata.append('file', foto[0])
        formdata.append('upload_preset', 'migsys')
        const fetching = await fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
            method: 'POST',
            body: formdata
        })
        const datajson = await fetching.json()
        setuploaddata(datajson.secure_url)
        setfilesupload([...filesupload, datajson.secure_url])
        setuploadtrigger(prev => prev + 1)
        setloadingfoto(false)
        setdisabledupload("")
    }
    const handleUpdateTicket = () => {
        setloadingupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateTicket`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...updatedata,
                ['location_id']: updatedata.location_id === null ? 0 : updatedata.location_id,
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingupdate(false)
                if (res2.success) {
                    notification['success']({
                        message: "Ticket berhasil diubah",
                        duration: 3
                    })
                    rt.push(`/tickets/detail/${ticketid}`)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getTicket?id=${ticketid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),

            }
        })
            .then(res => res.json())
            .then(res2 => {
                const updata = {
                    id: Number(ticketid),
                    requester_id: res2.data.ticket.requester.id === 0 ? null : res2.data.ticket.requester.id,
                    raised_at: res2.data.ticket.original_raised_at,
                    closed_at: res2.data.ticket.closed_at,
                    product_type: res2.data.ticket.ticketable.product_type.id,
                    product_id: res2.data.ticket.ticketable.product_id,
                    pic_name: res2.data.ticket.ticketable.pic_name,
                    pic_contact: res2.data.ticket.ticketable.pic_contact,
                    location_id: res2.data.ticket.ticketable.location_id === 0 ? null : res2.data.ticket.ticketable.location_id,
                    problem: res2.data.ticket.ticketable.problem,
                    incident_time: res2.data.ticket.ticketable.incident_time,
                    files: res2.data.ticket.ticketable.files,
                    description: res2.data.ticket.ticketable.description
                }
                setupdatedata(updata)
                setfilesupload(res2.data.ticket.ticketable.files)
                setnotclosed(res2.data.ticket.closed_at === null ? true : false)
                return res2.data.ticket.requester.company.id
            })
            .then((res3) => {
                fetch(`https://boiling-thicket-46501.herokuapp.com/getTicketRelation`, {
                    method: `GET`,
                    headers: {
                        'Authorization': JSON.parse(initProps),
                    }
                })
                    .then(res => res.json())
                    .then(res2 => {
                        setticketrelations(res2.data)
                        var lokasiPembuat = {}
                        const recursiveSearchLokasiPembuat = (doc, key) => {
                            for (var i = 0; i < doc.length; i++) {
                                if (doc[i].id === key) {
                                    lokasiPembuat = doc[i]
                                }
                                else {
                                    if (doc[i].children) {
                                        recursiveSearchLokasiPembuat(doc[i].children, key)
                                    }
                                }
                            }
                        }
                        recursiveSearchLokasiPembuat([res2.data.companies.data], res3)
                        setreqlocation(lokasiPembuat.title)
                        setpraloading(false)
                    })
            })
    }, [])
    useEffect(()=>{
        fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterUsers`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setusers(res2.data)
            })
    },[])
    useEffect(() => {
        if (uploadtrigger !== -1) {
            setupdatedata(prev => {
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
                                    <Button type="default" /*onClick={() => { console.log(updatedata); console.log(filesupload) }}*/>Batal</Button>
                                </Link>
                                <Button disabled={disabledfield} loading={loadingupdate} type="primary" onClick={() => {
                                    instanceForm.submit()
                                }}>Simpan</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4 mb-6 py-3 px-16">
                    {
                        praloading ?
                            <div className="flex justify-center">
                                <Spin />
                            </div>
                            :
                            <>
                                <div className="shadow-md border py-5 px-10 flex flex-col rounded-md mb-5">
                                    <div className="flex flex-col mb-5">
                                        <div className="flex mb-2">
                                            <span className="raisedBy"></span>
                                            <p className="mb-0 ml-1">Ticket Raised By</p>
                                        </div>
                                        <Select placeholder="Pilih Raised By" defaultValue={updatedata.requester_id} onChange={(value, option) => {
                                            setupdatedata({ ...updatedata, requester_id: Number(value) })
                                            setreqlocation(option.company_name)
                                        }}>
                                            {
                                                users.map((doc, idx) => {
                                                    return (
                                                        <Select.Option key={idx} value={doc.id} company_name={doc.company === null ? "-" : doc.company.name}>{doc.name}</Select.Option>
                                                    )
                                                })
                                            }
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
                                    <div className="flex flex-col mb-5">
                                        <div className="flex mb-2">
                                            <span className="raisedBy"></span>
                                            <p className="mb-0 ml-1">Lokasi Pembuat</p>
                                        </div>
                                        <div className="w-full rounded-sm flex items-center justify-between bg-gray-100 border p-2 h-8">
                                            <p className="mb-0">{reqlocation}</p>
                                            <DownOutlined style={{ color: `rgb(213,214,196)` }} />
                                        </div>
                                        <style jsx>
                                            {`
                                                .raisedBy::before{
                                                    content: '*';
                                                    color: red;
                                                }
                                            `}
                                        </style>
                                    </div>
                                    <div className="flex flex-col mb-5">
                                        <div className="flex mb-2">
                                            <span className="raisedBy"></span>
                                            <p className="mb-0 ml-1">Date Raised Ticket</p>
                                        </div>
                                        <DatePicker allowClear={false} value={updatedata.raised_at === "" ? null : moment(updatedata.raised_at)} defaultValue={moment(updatedata.raised_at)} showTime style={{ width: `100%` }} onChange={(date, datestring) => {
                                            setupdatedata({ ...updatedata, raised_at: datestring })
                                        }}></DatePicker>
                                        <style jsx>
                                            {`
                                                .raisedBy::before{
                                                    content: '*';
                                                    color: red;
                                                }
                                            `}
                                        </style>
                                    </div>
                                    <div className="flex flex-col mb-5">
                                        <div className="flex mb-2">
                                            <span className="closedBy"></span>
                                            <p className="mb-0 ml-1">Date Closed Ticket</p>
                                        </div>
                                        <DatePicker disabled={notclosed} disabledDate={(curr) => { return curr < moment(updatedata.raised_at) }} value={updatedata.closed_at === null || updatedata.closed_at === "" ? null : moment(updatedata.closed_at)} defaultValue={updatedata.closed_at === null ? null : moment(updatedata.closed_at)} placeholder="Masukkan Date Closed" showTime allowClear={false} style={{ width: `100%` }} onChange={(date, datestring) => {
                                            datestring === "" ? (setupdatedata({ ...updatedata, closed_at: "" }), setdisabledfield(true)) : (setupdatedata({ ...updatedata, closed_at: datestring }), setdisabledfield(false))
                                        }}></DatePicker>
                                        {
                                            notclosed ?
                                                <p className="mb-0 text-red-500">Date closed dapat dirubah jika status ticket telah <strong>closed</strong></p>
                                                :
                                                null
                                        }
                                        <style jsx>
                                            {`
                                                .closedBy::before{
                                                    content: '*';
                                                    color: red;
                                                }
                                            `}
                                        </style>
                                    </div>
                                </div>
                                <div className="shadow-md border py-5 px-10 flex flex-col rounded-md mb-5">
                                    <Form form={instanceForm} layout="vertical" onFinish={handleUpdateTicket} initialValues={updatedata}>
                                        <Form.Item name="product_type" label="Jenis Produk"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Jenis Produk wajib dipilih',
                                                },
                                            ]}>
                                            <Select defaultValue={updatedata.product_type} placeholder="Pilih Produk" onChange={(value) => {
                                                setupdatedata({ ...updatedata, product_type: value })
                                            }}>
                                                <Select.Option value={1}>UPS</Select.Option>
                                                <Select.Option value={2}>ATM</Select.Option>
                                                <Select.Option value={3}>PC</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="product_id" label={updatedata.product_type === 2 ? "Terminal ID" : "ID Produk"}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: `${updatedata.product_type === 2 ? 'Terminal ID' : 'ID Produk'} wajib diisi`,
                                                },
                                                {
                                                    pattern: /(\-)|(^\d*$)/,
                                                    message: `${updatedata.product_type === 2 ? 'Terminal ID' : 'ID Produk'} harus berisi angka`,
                                                },
                                            ]}>
                                            <Input defaultValue={updatedata.product_id} placeholder={`Masukkan ${updatedata.product_type === 2 ? "Terminal ID" : "ID Produk"}`} onChange={(e) => {
                                                setupdatedata({ ...updatedata, product_id: Number(e.target.value) })
                                            }}></Input>
                                        </Form.Item>
                                        <Form.Item name="pic_name" label="Nama PIC">
                                            <Input value={updatedata.pic_name} defaultValue={updatedata.pic_name} placeholder={`Masukkan Problem`} onChange={(e) => {
                                                setupdatedata({ ...updatedata, pic_name: e.target.value })
                                            }}></Input>
                                        </Form.Item>
                                        <Form.Item name="pic_contact" label="Kontak PIC"
                                            rules={[
                                                {
                                                    pattern: /(\-)|(^\d*$)/,
                                                    message: 'Kontak harus berisi angka',
                                                },
                                            ]}>
                                            <Input value={updatedata.pic_contact} defaultValue={updatedata.pic_contact} placeholder={`Masukkan Problem`} onChange={(e) => {
                                                setupdatedata({ ...updatedata, pic_contact: e.target.value })
                                            }}></Input>
                                        </Form.Item>
                                        <Form.Item name="location_id" label="Lokasi Problem">
                                            <TreeSelect value={updatedata.location_id} defaultValue={updatedata.location_id} placeholder="Pilih Lokasi Problem" treeData={[ticketrelations.companies.data]} treeDefaultExpandAll onChange={(value, label, extra) => {
                                                setupdatedata({ ...updatedata, location_id: extra.allCheckedNodes[0].node.props.id })
                                            }} />
                                        </Form.Item>
                                        <Form.Item name="problem" label="Problem">
                                            <Input value={updatedata.problem} defaultValue={updatedata.problem} placeholder={`Masukkan Problem`} onChange={(e) => {
                                                setupdatedata({ ...updatedata, problem: e.target.value })
                                            }}></Input>
                                        </Form.Item>
                                        {/* <Form.Item name="incident_time" label="Waktu Kejadian"> */}
                                        <div className="mb-5 flex flex-col">
                                            <div className="flex mb-2">
                                                <p className="mb-0 ml-1">Waktu Kejadian</p>
                                            </div>
                                            <DatePicker defaultValue={updatedata.incident_time === null ? null : moment(updatedata.incident_time)} name="incident_time" showTime placeholder="Masukkan Waktu Kejadian" style={{ width: `100%` }} onChange={(date, datestring) => {
                                                setupdatedata({ ...updatedata, incident_time: datestring === "" ? null : datestring })
                                            }}></DatePicker>
                                        </div>
                                        {/* </Form.Item> */}
                                        <Form.Item>
                                            <div className="flex flex-col">
                                                <p className="mb-2 ml-1">Bukti Incident (Support File: PNG/JPEG, PDF, dan Word)</p>
                                                <label className={`custom-file-upload py-2 w-52 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3 ${disabledupload}`}>
                                                    <input type="file" style={{ display: `none` }} name="urlgambarProduct" onChange={onChangeGambar} />
                                                    {loadingfoto ? <LoadingOutlined style={{ marginRight: `1rem` }} /> : <> <UploadOutlined style={{ marginRight: `1rem` }} /></>
                                                    }
                                                    Unggah File(Max: 25Mb)
                                                </label>
                                                <div className="flex flex-col">
                                                    {
                                                        filesupload.map((docfile, idxfile) => {
                                                            return (
                                                                <div key={idxfile} className="border border-dashed px-8 py-4 flex justify-between items-center w-6/12 mb-1 relative cursor-pointer hover:text-blue-500">
                                                                    <div className="mr-5 flex items-center">
                                                                        <img src={docfile} alt="imageProfile" className=" object-cover w-16 h-16 mr-10" />
                                                                        {/* <p className="mb-0 mr-3">{docfile}</p> */}
                                                                        {/* <div className="w-10 h-10 absolute z-10 left-0 top-0 bg-black opacity-50 flex items-center justify-center">
                                                                <DeleteOutlined style={{ color: `white`, cursor: `pointer` }} onClick={() => {
                                                                    setnewdata(prev => {
                                                                        var temp = prev
                                                                        temp.files.splice(idxfile, 1)
                                                                        return temp
                                                                    })
                                                                    setuploaddeleteidx(idxfile)
                                                                    setuploaddeletetrigger(prev => prev + 1)
                                                                }} />
                                                            </div> */}
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <Popconfirm
                                                                            title="Yakin ingin menghapus bukti incident ini?"
                                                                            onConfirm={() => {
                                                                                setfilesupload(prev => prev.filter((_, idxfilt) => idxfilt !== idxfile))
                                                                                setupdatedata(prev => {
                                                                                    var temp = prev
                                                                                    temp.files.splice(idxfile, 1)
                                                                                    return temp
                                                                                })
                                                                            }}
                                                                            okText="Ya"
                                                                            cancelText="Tidak"
                                                                        >
                                                                            <DeleteOutlined style={{ color: `red`, cursor: `pointer`, fontSize: `1.5rem` }} />
                                                                        </Popconfirm>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </Form.Item>
                                        <Form.Item name="description" label="Deskripsi Kerusakan">
                                            <Input.TextArea value={updatedata.description} defaultValue={updatedata.description} rows={4} placeholder={`Masukkan deskripsi kerusakan`} onChange={(e) => {
                                                setupdatedata({ ...updatedata, description: e.target.value })
                                            }}></Input.TextArea>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </>
                    }
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
            sidemenu: "2",
            ticketid
        },
    }
}

export default TicketUpdate
