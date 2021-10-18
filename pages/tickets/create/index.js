import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import httpcookie from 'cookie'
import Link from 'next/link'
import { QuestionCircleOutlined, LoadingOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import Sticky from 'wil-react-sticky'
import { Form, Input, notification, Button, Modal, Select, Spin, InputNumber, DatePicker, Empty, Popconfirm } from 'antd'
import Layout from '../../../components/layout-dashboard2'
import st from '../../../components/layout-dashboard.module.css'
import moment from 'moment'

const TicketCreate = ({ initProps, sidemenu, dataProfile }) => {
    // 1.Init
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(3, 1)
    pathArr[pathArr.length - 1] = "Tambah Item"
    const [instanceForm] = Form.useForm();
    const [instanceForm2] = Form.useForm();

    //2.useState
    const [newdata, setnewdata] = useState({
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
    const [loadingcreate, setloadingcreate] = useState(false)
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
        // const formdata = new FormData()
        // formdata.append('file', foto[0])
        // const fetching = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
        //     method: 'POST',
        //     body: formdata
        // })
        // const datajson = await fetching.json()
        // var temp = gambarlistcreate
        // temp[curridxgambar] = datajson.secure_url
        // setgambarlistcreate(temp)
        // setcreatechange({
        //     ...createchange,
        //     urlgambarProduct: gambarlistcreate
        // })
        // setcurridxgambar(prev => prev + 1)
        // setcreategambar(true)
        // setloadingfoto(false)
    }

    const handleCreateTicket = () => {
        setloadingcreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addTicket`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newdata)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingcreate(false)
                if (res2.success) {
                    notification['success']({
                        message: "Ticket berhasil ditambahkan",
                        duration: 3
                    })
                    setmodalfinal(false)
                    rt.push(`/tickets`)
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
                            <h1 className="font-semibold py-2">Form Tambah Ticket</h1>
                            <div className="flex space-x-2">
                                <Link href={`/tickets`}>
                                    <Button type="default" /*onClick={() => { console.log(newdata); console.log(filesupload) }}*/>Batal</Button>
                                </Link>
                                <Button disabled={disabledfield} loading={loadingcreate} type="primary" onClick={() => {
                                    instanceForm.submit()
                                }}>Simpan</Button>
                            </div>
                        </div>
                    </Sticky>
                </div>
                <div className="col-span-1 md:col-span-4 mb-6 py-3 px-16">
                    <div className="shadow-md border py-5 px-10 flex flex-col rounded-md mb-5">
                        <div className="flex mb-2">
                            <span className="judulField"></span>
                            <p className="mb-0 ml-1">Ticket Type</p>
                        </div>
                        <Select value={newdata.type} defaultValue={1}>
                            <Select.Option value={1}>Incident</Select.Option>
                        </Select>
                        <style jsx>
                            {`
                                        .judulField::before{
                                            content: '*';
                                            color: red;
                                        }
                                    `}
                        </style>
                    </div>
                    <div className="shadow-md border py-5 px-10 flex flex-col rounded-md mb-5">
                        <Form form={instanceForm} layout="vertical" onFinish={handleCreateTicket}>
                            <Form.Item name="product_type" label="Jenis Produk"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Jenis Produk wajib dipilih',
                                    },
                                ]}>
                                <Select placeholder="Pilih Produk" onChange={(value) => {
                                    setnewdata({ ...newdata, product_type: value })
                                }}>
                                    <Select.Option value={1}>UPS</Select.Option>
                                    <Select.Option value={2}>ATM</Select.Option>
                                    <Select.Option value={3}>PC</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="product_id" label={newdata.product_type === 2 ? "Terminal ID" : "ID Produk"}
                                rules={[
                                    {
                                        required: true,
                                        message: `${newdata.product_type === 2 ? 'Terminal ID' : 'ID Produk'} wajib diisi`,
                                    },
                                ]}>
                                <Input placeholder={`Masukkan ${newdata.product_type === 2 ? "Terminal ID" : "ID Produk"}`} onChange={(e) => {
                                    setnewdata({ ...newdata, product_id: e.target.value })
                                }}></Input>
                            </Form.Item>
                            <Form.Item name="pic" label="Nama PIC">
                                <Select placeholder="Pilih Nama PIC" onChange={(value) => {
                                    setnewdata({ ...newdata, pic: value })
                                }}>
                                    {
                                        ticketrelations.requesters.map((doc, idx) => {
                                            return (
                                                <Select.Option value={doc.user_id}>{doc.fullname}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="incident_place_id" label="Lokasi Problem">
                                <Select placeholder="Pilih Lokasi Problem" onChange={(value) => {
                                    setnewdata({ ...newdata, incident_place_id: value })
                                }}>
                                    {
                                        ticketrelations.companies.map((doc, idx) => {
                                            return (
                                                <Select.Option value={doc.company_id}>{doc.company_name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="problem" label="Problem">
                                <Input placeholder={`Masukkan Problem`} onChange={(e) => {
                                    setnewdata({ ...newdata, problem: e.target.value })
                                }}></Input>
                            </Form.Item>
                            <Form.Item name="incident_time" label="Waktu Kejadian">
                                <DatePicker placeholder="Masukkan Waktu Kejadian" style={{ width: `100%` }} onChange={(date, datestring) => {
                                    setnewdata({ ...newdata, incident_time: datestring })
                                }}></DatePicker>
                            </Form.Item>
                            <Form.Item>
                                <div className="flex flex-col">
                                    <p className="mb-2 ml-1">Bukti Incident (Support File: PNG/JPEG, PDF, dan Word)</p>
                                    <label className="custom-file-upload py-2 w-52 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3">
                                        <input type="file" style={{ display: `none` }} name="urlgambarProduct" onChange={onChangeGambar} />
                                        {loadingfoto ? <LoadingOutlined style={{ marginRight: `1rem` }} /> : <> <UploadOutlined style={{ marginRight: `1rem` }} /></>
                                        }
                                        Unggah File(Max: 25Mb)
                                        </label>
                                    <div className="flex flex-col">
                                        {
                                            filesupload.map((docfile, idxfile) => {
                                                return (
                                                    <div key={idxfile} className="border px-8 py-4 flex justify-between items-center w-9/12 mb-1 relative">
                                                        <div className="mr-5 flex items-center">
                                                            {docfile.type === "application/pdf" && <img src="/image/pdfIcon.png" alt="selected images" className="object-contain w-16 h-16 mr-10" />}
                                                            {docfile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && <img src="/image/wordIcon.png" alt="selected image" className="object-contain w-16 h-16 mr-10" />}
                                                            {docfile.type === "image/jpeg" && <img src={URL.createObjectURL(docfile)} alt="selected image" className="object-contain w-16 h-16 mr-10" />}
                                                            <p className="mb-0 mr-3 cursor-pointer hover:text-blue-500">{docfile.name}</p>
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
                                                                    setnewdata(prev => {
                                                                        var temp = prev
                                                                        temp.files.splice(idxfile, 1)
                                                                        return temp
                                                                    })
                                                                }}
                                                                okText="Ya"
                                                                cancelText="Tidak"
                                                            >
                                                                <DeleteOutlined style={{ color: `red`, cursor: `pointer` }} />
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
                                <Input.TextArea rows={4} placeholder={`Masukkan deskripsi kerusakan`} onChange={(e) => {
                                    setnewdata({ ...newdata, description: e.target.value })
                                }}></Input.TextArea>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res }) {
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
            sidemenu: "3"
        },
    }
}

export default TicketCreate
