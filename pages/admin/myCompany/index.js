import Layout from '../../../components/layout-dashboard'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useEffect, useState } from 'react'
import st from '../../../components/layout-dashboard.module.css'
import Link from 'next/link'
import { Tabs, Input, Table, Tree, notification, Modal, Button, Spin, Empty } from 'antd'
import moment from 'moment'

function MigIndexProfile({ dataProfile, dataDetailCompany, tok }) {
    const rt = useRouter()
    const [editable, setEditable] = useState(false)
    const [loadingbtn, setloadingbtn] = useState(false)
    const onClickEdit = () => {
        setEditable(true)
    }
    // if (dataDetailCompany.data.tanggal_pkp === null) {
    //     dataDetailCompany.data.tanggal_pkp = new Date()
    // }
    // const [data1, setData1] = useState({
    //     company_name: dataDetailCompany.data.company_name,
    //     address: dataDetailCompany.data.address,
    //     phone_number: dataDetailCompany.data.phone_number,
    //     image_logo: dataDetailCompany.data.image_logo,
    //     singkatan: dataDetailCompany.data.singkatan,
    //     tanggal_pkp: moment(dataDetailCompany.data.tanggal_pkp),
    //     penanggung_jawab: dataDetailCompany.data.penanggung_jawab,
    //     npwp: dataDetailCompany.data.npwp,
    //     fax: dataDetailCompany.data.fax,
    //     email: dataDetailCompany.data.email,
    //     website: dataDetailCompany.data.website
    // })
    const [data1, setData1] = useState({
        company_name: "",
        address: "",
        phone_number: "",
        image_logo: "",
        singkatan: "",
        tanggal_pkp: moment(new Date()),
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "",
        website: ""
    })
    const [id, setid] = useState(0)
    const [isenabled, setisenabled] = useState(false)
    const [loadingfoto, setLoadingfoto] = useState(false)

    const onChangeEditProfile = (e) => {
        var val = e.target.value
        if (e.target.name === "role") {
            val = parseInt(e.target.value)
        }
        setData1({
            ...data1,
            [e.target.name]: val
        })
    }
    const onChangeEditProfileFoto = async (e) => {
        setLoadingfoto(true)
        const foto = e.target.files
        const formdata = new FormData()
        formdata.append('file', foto[0])
        formdata.append('upload_preset', 'migsys')
        const fetching = await fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
            method: 'POST',
            body: formdata
        })
        const datajson = await fetching.json()
        setData1({
            ...data1,
            image_logo: datajson.secure_url
        })
        setLoadingfoto(false)
    }
    const handleEditProfile = () => {
        setloadingbtn(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateMainCompany`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data1)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingbtn(false)
                if (res2.success) {
                    setEditable(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/myCompany`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getMainCompanyDetail`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setData1({
                    company_name: res2.data.name,
                    address: res2.data.address,
                    phone_number: res2.data.phone_number,
                    image_logo: res2.data.image_logo === "-" || res2.data.image_logo === '' ? `/default-users.jpeg` : res2.data.image_logo,
                    singkatan: res2.data.singkatan,
                    tanggal_pkp: moment(res2.data.tanggal_pkp),
                    penanggung_jawab: res2.data.penanggung_jawab,
                    npwp: res2.data.npwp,
                    fax: res2.data.fax,
                    email: res2.data.email,
                    website: res2.data.website
                })
                setisenabled(res2.data.is_enabled)
                setid(res2.data.id)
            })
    }, [])
    return (
        <div id="profileeDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-6">
                <div className="flex space-x-2">
                    {editable ?
                        <Button type="default" onClick={() => { setEditable(false) }}>Batal</Button>
                        :
                        null
                    }
                    {editable ?
                        null
                        // <Button type="primary" onClick={instanceForm.submit} loading={loadingbtn}>Simpan</Button>
                        :
                        <>
                            {
                                // [145].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <Button type="primary" onClick={() => { rt.push(`/admin/myCompany/updateProfile/${id}`) }}>Ubah</Button>
                            }
                        </>
                    }
                </div>
            </div>
            <div className=" mb-2 md:mb-4 flex md:flex-row flex-col">
                <h1 className="font-semibold text-base mr-3 pt-1">{data1.company_name}</h1>
                <h1 className="mr-3 pt-1 hidden md:block">|</h1>
                <div className="flex">
                    {
                        isenabled ?
                            <div className=" bg-blue-100 text-blue-600 border-blue-600 border pt-2 px-3 rounded-md text-xs md:text-sm w-auto">AKTIF</div>
                            :
                            <div className=" bg-red-100 text-red-600 border-red-600 border pt-1 px-3 rounded-md text-xs md:text-sm w-auto">NON-AKTIF</div>
                    }
                </div>
            </div>
            <div className=" w-9/12 p-5 grid grid-cols-1 sm:grid-col-3 md:grid-cols-5 mb-4 rounded-md shadow-md border">
                <div className="p-3 relative col-span-1 sm:col-span-1 md:col-span-1 flex flex-col items-center">
                    <img src={data1.image_logo} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full mb-4" />
                    {editable ?
                        <div>
                            <label className="custom-file-upload py-2 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3">
                                <input type="file" style={{ display: `none` }} name="profile_image" onChange={onChangeEditProfileFoto} />
                                {loadingfoto ? <LoadingOutlined /> : <EditOutlined style={{ fontSize: `1.2rem` }} />}
                                Ganti Foto
                            </label>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="w-full h-auto p-3 md:p-5 col-span-1 sm:col-span-2 md:col-span-4 flex">
                    {/* <Form layout="vertical" form={instanceForm} onFinish={handleEditProfile} initialValues={data1} style={{ width: `100%` }}> */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="md:m-5 mb-5 md:mb-0 ">
                            {
                                editable ?
                                    null
                                    // <Form.Item name="company_name" label="Nama Perusahaan"
                                    //     rules={[
                                    //         {
                                    //             required: true,
                                    //             message: 'Nama Perusahaan wajib diisi',
                                    //         },
                                    //     ]}>
                                    //     <Input defaultValue={data1.company_name} name="company_name" onChange={onChangeEditProfile}></Input>
                                    // </Form.Item>
                                    :
                                    <>
                                        <h1 className="font-semibold text-sm">Nama Perusahaan:</h1>
                                        <h1 className="text-sm font-normal text-black">{data1.company_name}</h1>
                                    </>
                            }
                        </div>
                        <div className="md:m-5 mb-5 md:mb-0">
                            {
                                editable ?
                                    null
                                    // <Form.Item name="address" label="Alamat"
                                    //     rules={[
                                    //         {
                                    //             required: true,
                                    //             message: 'Alamat wajib diisi',
                                    //         },
                                    //     ]}>
                                    //     <Input defaultValue={data1.address} name="address" onChange={onChangeEditProfile}></Input>
                                    // </Form.Item>
                                    :
                                    <>
                                        <h1 className="font-semibold text-sm">Alamat:</h1>
                                        <h1 className="text-sm font-normal text-black">{data1.address}</h1>
                                    </>
                            }
                        </div>
                        <div className="md:m-5 mb-5 md:mb-0">
                            {
                                editable ?
                                    null
                                    // <Form.Item name="phone_number" label="Telepon"
                                    //     rules={[
                                    //         {
                                    //             required: true,
                                    //             message: 'Telepon wajib diisi',
                                    //         },
                                    //     ]}>
                                    //     <Input defaultValue={data1.phone_number} name="phone_number" onChange={onChangeEditProfile}></Input>
                                    // </Form.Item>
                                    :
                                    <>
                                        <h1 className="font-semibold text-sm">No. Telepon:</h1>
                                        <h1 className="text-sm font-normal text-black">{data1.phone_number}</h1>
                                    </>
                            }
                        </div>
                        <div className="md:m-5 mb-5 md:mb-0">
                            {
                                editable ?
                                    null
                                    // <Form.Item name="singkatan" label="Singkatan">
                                    //     <Input defaultValue={data1.singkatan} name="singkatan" onChange={onChangeEditProfile}></Input>
                                    // </Form.Item>
                                    :
                                    <>
                                        <h1 className="font-semibold text-sm">Singkatan:</h1>
                                        <h1 className="text-sm font-normal text-black">{data1.singkatan}</h1>
                                    </>
                            }
                        </div>
                        <div className="md:m-5 mb-5 md:mb-0">
                            {
                                editable ?
                                    null
                                    // <Form.Item name="tanggal_pkp" label="Tanggal PKP"
                                    //     rules={[
                                    //         {
                                    //             required: true,
                                    //             message: 'Tanggal PKP wajib diisi',
                                    //         },
                                    //     ]}>
                                    //     <DatePicker onChange={(date, dateString) => { setData1({ ...data1, tanggal_pkp: moment(date) }) }} style={{ width: `100%` }} defaultValue={data1.tanggal_pkp}></DatePicker>
                                    // </Form.Item>
                                    :
                                    <>
                                        <h1 className="font-semibold text-sm">Tanggal PKP:</h1>
                                        {/* <h1 className="text-sm font-normal text-black">{data1.tanggal_pkp.locale('id').format('LL')}</h1> */}
                                        {
                                            data1.tanggal_pkp === null ?
                                                <h1 className="text-sm font-normal text-black">-</h1>
                                                :
                                                <h1 className="text-sm font-normal text-black">{data1.tanggal_pkp.locale('id').format('LL')}</h1>

                                        }
                                    </>
                            }
                        </div>
                        <div className="md:m-5 mb-5 md:mb-0">
                            {
                                editable ?
                                    null
                                    // <Form.Item name="penanggung_jawab" label="Penanggung Jawab">
                                    //     <Input defaultValue={data1.penanggung_jawab} name="penanggung_jawab" onChange={onChangeEditProfile}></Input>
                                    // </Form.Item>
                                    :
                                    <>
                                        <h1 className="font-semibold text-sm">PIC:</h1>
                                        <h1 className="text-sm font-normal text-black">{data1.penanggung_jawab}</h1>
                                    </>
                            }
                        </div>
                        <div className="md:m-5 mb-5 md:mb-0">
                            {
                                editable ?
                                    null
                                    // <Form.Item name="npwp" label="NPWP">
                                    //     <Input defaultValue={data1.npwp} name="npwp" onChange={onChangeEditProfile}></Input>
                                    // </Form.Item>
                                    :
                                    <>
                                        <h1 className="font-semibold text-sm">NPWP:</h1>
                                        <h1 className="text-sm font-normal text-black">{data1.npwp}</h1>
                                    </>
                            }
                        </div>
                        <div className="md:m-5 mb-5 md:mb-0">
                            {
                                editable ?
                                    null
                                    // <Form.Item name="fax" label="Fax">
                                    //     <Input defaultValue={data1.fax} name="fax" onChange={onChangeEditProfile}></Input>
                                    // </Form.Item>
                                    :
                                    <>
                                        <h1 className="font-semibold text-sm">Fax:</h1>
                                        <h1 className="text-sm font-normal text-black">{data1.fax}</h1>
                                    </>
                            }
                        </div>
                        <div className="md:m-5 mb-5 md:mb-0">
                            {
                                editable ?
                                    null
                                    // <Form.Item name="email" label="Email">
                                    //     <Input defaultValue={data1.email} name="email" onChange={onChangeEditProfile}></Input>
                                    // </Form.Item>
                                    :
                                    <>
                                        <h1 className="font-semibold text-sm">Email:</h1>
                                        <h1 className="text-sm font-normal text-black">{data1.email}</h1>
                                    </>
                            }
                        </div>
                        <div className="md:m-5 mb-5 md:mb-0">
                            {
                                editable ?
                                    null
                                    // <Form.Item name="website" label="Website">
                                    //     <Input defaultValue={data1.website} name="website" onChange={onChangeEditProfile}></Input>
                                    // </Form.Item>
                                    :
                                    <>
                                        <h1 className="font-semibold text-sm">Website:</h1>

                                        <h1 className="text-sm font-normal text-black">{data1.website}</h1>
                                    </>
                            }
                        </div>
                    </div>
                    {/* </Form> */}
                </div>
            </div>
        </div>
    )
}

function MigIndexLocations({ dataProfile, tok, dataBranchList }) {
    const rt = useRouter()
    const [praloading, setpraloading] = useState(true)
    const [visiblehapus, setvisiblehapus] = useState(false)
    const [loadinghapus, setloadinghapus] = useState(false)
    const [hapustrigger, sethapustrigger] = useState(-1)
    const [datahapus, setdatahapus] = useState({
        title: "",
        id: ""
    })
    const [expandedKeys, setExpandedKeys] = useState([dataBranchList[0].key])
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [databranchlist, setdatabranchlist] = useState(dataBranchList)
    const [searchValue, setSearchValue] = useState("");
    const [tambahdata, settambahdata] = useState(false)
    const [editdata, seteditdata] = useState(false)
    const [deldata, setdeldata] = useState(false)
    const [detaildata, setdetaildata] = useState(false)
    const [defvalparent, setdefvalparent] = useState("")
    const [frominduk, setfrominduk] = useState(false)
    const [loadingtambah, setloadingtambah] = useState(false)
    const [loadingimage, setloadingimage] = useState(false)
    const [drawablecreate, setdrawablecreate] = useState(false)
    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };
    const [datanew, setdatanew] = useState({
        name: '',
        address: '',
        phone_number: '',
        image_logo: '',
        parent_id: 0
    })
    const uploadButton = (
        <div>
            {loadingimage ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Unggah</div>
        </div>
    );
    // const beforeUploadProfileImage = (file) => {
    //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    //     if (!isJpgOrPng) {
    //         message.error('You can only upload JPG/PNG file!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //         message.error('Image must smaller than 2MB!');
    //     }
    //     return isJpgOrPng && isLt2M;
    // }
    // const onChangeProfileImage = async (info) => {
    //     if (info.file.status === 'uploading') {
    //         setloadingimage(true)
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         const formData = new FormData()
    //         formData.append('file', info.file.originFileObj)
    //         formData.append('upload_preset', 'migsys')
    //         return fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
    //             method: 'POST',
    //             body: formData
    //         })
    //             .then(res => res.json())
    //             .then(res2 => {
    //                 setloadingimage(false)
    //                 setdatanew({
    //                     ...datanew,
    //                     image_logo: res2.secure_url
    //                 })
    //             })
    //     }
    // }

    //filter Locations
    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { id, key, value, id_parent, title } = node;
            dataList.push({ id, key, value, id_parent, title });
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    generateList(databranchlist);
    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some((item) => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    };
    const onChangeFilterLoc = (e) => {
        const { value } = e.target;
        const expandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, dataBranchList);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        if (value) {
            setExpandedKeys(expandedKeys);
            setSearchValue(value);
            setAutoExpandParent(true);
        } else {
            setExpandedKeys([dataBranchList[0].key]);
            setSearchValue("");
            setAutoExpandParent(false);
        }
    };
    const filterTreeNode = (node) => {
        const title = node.title.props.children[0].props ? node.title.props.children[0].props.children[2] : node.title.props.children[2];
        const result = title.indexOf(searchValue) !== -1 ? true : false;
        return result;
    };
    const loop = (data) =>
        data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title =
                index > -1 ? (
                    <div className="flex justify-between"
                        onMouseOver={() => {
                            var d = document.getElementById(`node${item.key}`)
                            d.classList.add("flex")
                            d.classList.remove("hidden")
                        }}
                        onMouseLeave={() => {
                            var e = document.getElementById(`node${item.key}`)
                            e.classList.add("hidden")
                            e.classList.remove("flex")
                        }}
                    >
                        <div className="w-full" onClick={() => { rt.push(`/admin/myCompany/locations/${item.id}?parent=${item.id_parent}&edit=`) }}>
                            {beforeStr}
                            <span className=" text-blue-500">{searchValue}</span>
                            {afterStr}
                        </div>
                        <div className={`hidden mx-2`} id={`node${item.key}`}>
                            {
                                // [152].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <a className="mx-2 pb-1" onClick={(e) => { rt.push(`/admin/myCompany/locations/new?parent=${item.id}&frominduk=1`) }} alt="add"><PlusOutlined /></a>
                            }
                            {
                                // [151, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <Link href={`/admin/myCompany/locations/${item.id}?parent=${item.title}&edit=1`}>
                                    <a className="mx-2 pb-1" alt="update"><EditOutlined /></a>
                                </Link>
                            }
                            {
                                <a className="mx-2 pb-1" onClick={() => { setvisiblehapus(true); setdatahapus({ id: item.id, title: item.title }) }}><DeleteOutlined /></a>
                            }
                        </div>
                    </div>
                ) : (
                    <span>{item.title}</span>
                );
            if (item.children) {
                return { title, key: item.key, children: loop(item.children) };
            }
            return {
                title,
                key: item.key
            };
        });

    //Handler
    const handleCreateLocationsMig = () => {
        setdatanew({
            ...datanew,
            parent_id: defvalparent
        })
        if (datanew.address === "" || datanew.phone_number === "") {
            setdatanew({
                ...datanew,
                address: '-',
                phone_number: '-'
            })
        }
        setloadingtambah(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanyBranch`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datanew)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingtambah(false)
                if (res2.success) {
                    setdatanew({
                        name: '',
                        address: '',
                        phone_number: '',
                        image_logo: '',
                        parent_id: 0
                    })
                    setdrawablecreate(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/myCompany`)
                        settambahdata(prev => !prev)
                    }, 800)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3,
                        style: {
                            zIndex: `1000`
                        }
                    })
                }
            })
    }
    const handleDeleteLocationMyCompany = () => {
        setloadinghapus(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteCompanyBranch`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: datahapus.id
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setvisiblehapus(false)
                setloadinghapus(false)
                if (res2.success) {
                    notification['success']({
                        message: 'Location My Company berhasil dihapus',
                        duration: 3
                    })
                    sethapustrigger(prev => prev + 1)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/${dataProfile.data.company.role !== 2 ? `getBranchCompanyList` : `getLocations?company_id=${dataProfile.data.company.company_id}`}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                res2.data.children ? setdatabranchlist(res2.data.children) : setdatabranchlist([])
                const expandkeyArr = res2.data.children.map(doc => doc.key)
                res2.data.children ? setExpandedKeys(expandkeyArr) : setExpandedKeys([])
                setpraloading(false)
            })
    }, [tambahdata, hapustrigger])
    return (
        <div id="locationssDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-5">
                <div className="flex space-x-2">
                    {/* <Link href={`/admin/company/locations/new?companyId=${dataDetailCompany.data.data.company_id}&parent=`}> */}
                    {
                        // [152].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        // <Button type="primary" size="middle" onClick={() => { setdrawablecreate(true); setfrominduk(false) }}>Tambah</Button>
                        <Button type="primary" size="middle" onClick={() => { rt.push(`/admin/myCompany/locations/new?parent=&frominduk=0`) }}>Tambah</Button>
                    }
                    {/* </Link> */}
                </div>
            </div>
            <div className="p-5">
                {/* <h1 className="text-sm font-semibold">Pilih Parent terakhir</h1> */}
                <Input style={{ marginBottom: `1.25rem` }} placeholder="Cari Lokasi" onChange={onChangeFilterLoc} allowClear />
                {
                    praloading ?
                        <>
                            <Spin />
                        </>
                        :
                        databranchlist.length === 0 ?
                            <>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </>
                            :
                            <div className="w-9/12 border rounded-md shadow-md p-5">
                                <Tree
                                    showLine={{
                                        showLeafIcon: false
                                    }}
                                    onExpand={onExpand}
                                    expandedKeys={expandedKeys}
                                    autoExpandParent={autoExpandParent}
                                    treeData={loop(databranchlist)}
                                    filterTreeNode={filterTreeNode}
                                    titleRender={(nodeData) => (
                                        <>
                                            <div className={`flex justify-between hover:bg-blue-100 text-black`}
                                            // onMouseOver={() => {
                                            //     var d = document.getElementById(`node${nodeData.key}`)
                                            //     d.classList.add("flex")
                                            //     d.classList.remove("hidden")
                                            // }}
                                            // onMouseLeave={() => {
                                            //     var e = document.getElementById(`node${nodeData.key}`)
                                            //     e.classList.add("hidden")
                                            //     e.classList.remove("flex")
                                            // }}
                                            >
                                                <div className=" w-full">
                                                    {nodeData.title}
                                                </div>
                                                <div className={`hidden mx-2`} id={`node${nodeData.key}`}>
                                                    {/* <Link href={`/admin/company/locations/new?parent=${nodeData.id}&companyId=${dataDetailCompany.data.company_id}`}> */}
                                                    {/* {
                                                [152].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                                // <a className="mx-2 pb-1" onClick={(e) => { setdrawablecreate(true); setdefvalparent(nodeData.id); setfrominduk(true) }} alt="add"><PlusOutlined /></a>
                                                <a className="mx-2 pb-1" onClick={(e) => { rt.push(`/admin/company/mig/locations/new?parent=${nodeData.id}&frominduk=1`) }} alt="add"><PlusOutlined /></a>
                                            } */}
                                                    {/* </Link> */}
                                                    {/* {
                                                [151, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                                <Link href={`/admin/company/mig/locations/${nodeData.id}?parent=${nodeData.title}&edit=1`}>
                                                    <a className="mx-2 pb-1" alt="update"><EditOutlined /></a>
                                                </Link>
                                            } */}
                                                    {/* <Popconfirm title="Yakin hapus lokasi?" onConfirm={() => { message.success("API is not available") }} onCancel={() => { message.error("Gagal dihapus") }}>
                                        <a className="mx-2 pb-1" alt="delete"><DeleteOutlined /></a>
                                    </Popconfirm> */}
                                                </div>
                                            </div>
                                        </>
                                    )
                                    }
                                    blockNode={true}
                                />
                            </div>
                }
            </div>
            <Modal
                title="Konfirmasi untuk menghapus Location MyCompany"
                visible={visiblehapus}
                onOk={handleDeleteLocationMyCompany}
                onCancel={() => setvisiblehapus(false)}
                okText="Ya"
                cancelText="Tidak"
                okButtonProps={{ loading: loadinghapus }}
            >
                Apakah anda yakin ingin menghapus Location <strong>{datahapus.title}</strong>?`
            </Modal>
            {/* <Drawer title="Buat Branch" maskClosable={false} destroyOnClose={true} visible={drawablecreate} onClose={() => {
                setdrawablecreate(false);
                setdatanew({
                    name: '',
                    role: 3,
                    address: '',
                    phone_number: '',
                    image_logo: '',
                    parent_id: null
                });
                instanceForm.resetFields()
            }} width={370} destroyOnClose={true}>
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-1">
                    <div className="px-3 pt-3 pb-0 col-span-1 md:col-span-1">
                        <Form.Item name="profile_image">
                            <Upload
                                name="profile_image"
                                listType="picture-card"
                                className="profileImage"
                                showUploadList={false}
                                beforeUpload={beforeUploadProfileImage}
                                onChange={onChangeProfileImage}
                            >
                                {datanew.image_logo ? <img src={datanew.image_logo} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
                    </div>
                    <Form layout="vertical" className="createClientsForm" onFinish={handleCreateLocationsMig} form={instanceForm}>
                        <div className="md:m-4 mb-5 md:mb-0 ">
                            <Form.Item name="name" label="Nama Perusahaan"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nama perusahaan wajib diisi',
                                    },
                                ]}
                            >
                                <Input name="name" allowClear onChange={(e) => { setdatanew({ ...datanew, name: e.target.value }) }}></Input>
                            </Form.Item>
                        </div>
                        <div className="md:m-4 mb-5 md:mb-0 ">
                            <Form.Item name="address" label="Alamat">
                                <Input name="address" allowClear onChange={(e) => { setdatanew({ ...datanew, address: e.target.value }) }}></Input>
                            </Form.Item>
                        </div>
                        <div className="md:m-4 mb-5 md:mb-0 ">
                            <Form.Item name="phone_number" label="Telepon">
                                <Input name="phone_number" allowClear onChange={(e) => { setdatanew({ ...datanew, phone_number: e.target.value }) }}></Input>
                            </Form.Item>
                        </div>
                        <div className="md:m-4 mb-5 md:mb-0">
                            {
                                frominduk ?
                                    <Form.Item label="Induk Lokasi">
                                        <TreeSelect
                                            disabled
                                            allowClear
                                            defaultValue={defvalparent}
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={databranchlist}
                                            treeDefaultExpandAll
                                            value={defvalparent}
                                        />
                                    </Form.Item>
                                    :
                                    <Form.Item name="parent_id" label="Induk Lokasi"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Parent Perusahaan wajib diisi',
                                            },
                                        ]}>
                                        <TreeSelect
                                            allowClear
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={databranchlist}
                                            placeholder="Tambah Induk Lokasi"
                                            treeDefaultExpandAll
                                            onChange={(value) => { setdatanew({ ...datanew, parent_id: value }) }}
                                        />
                                    </Form.Item>
                            }
                        </div>
                        <div className="flex justify-end">
                            <Button type='default' onClick={() => { setdrawablecreate(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                            <Button type="primary" size="middle" onClick={instanceForm.submit} loading={loadingtambah} style={{ marginBottom: `1rem` }}>Simpan</Button>
                        </div>
                    </Form>
                </div>
            </Drawer> */}
        </div>
    )
}

function MigIndexBankAccount({ dataProfile, tok }) {
    // if (!dataGetBanks.data) {
    //     dataGetBanks.data = []
    // }
    const rt = useRouter()
    const [editable, setEditable] = useState(false)
    const [tambahdata, settambahdata] = useState(false)
    const [editdata, seteditdata] = useState(false)
    const [deldata, setdeldata] = useState(false)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [drawableedit, setDrawableedit] = useState(false)
    const [modaldel, setModaldel] = useState(false)
    const [modaldeldata, setModaldeldata] = useState({
        id: 0,
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    const [loadingbtncreate, setloadingbtncreate] = useState(false)
    const [loadingbtnedit, setloadingbtnedit] = useState(false)
    const [loadingdelete, setloadingdelete] = useState(false)
    const [datagetBanks, setdatagetBanks] = useState([])
    const [loadingdatagetBanks, setloadingdatagetBanks] = useState(false)
    // const [selectedrows, setSelectedrows] = useState([])
    const [recordrow, setRecordrow] = useState({
        id: 0,
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    const [bankdata, setBankdata] = useState({
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    var actionsArr = []
    for (var i = 0; i < datagetBanks.length; i++) {
        actionsArr.push(false)
    }
    const [actions, setActions] = useState(actionsArr)
    const [action, setAction] = useState(false)
    const onChangeBA = (e) => {
        setBankdata({
            ...bankdata,
            [e.target.name]: e.target.value
        })
    }
    const onChangeBACurrency = (data) => {
        setBankdata({
            ...bankdata,
            currency: data.value
        })
    }
    const onChangeEditBA = (e) => {
        setRecordrow({
            ...recordrow,
            [e.target.name]: e.target.value
        })
    }
    const handleDeleteBA = (rec) => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteMainBank?id=${rec.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingdelete(false)
                if (res2.success) {
                    setModaldel(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/myCompany`)
                        setdeldata(prev => !prev)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleSubmitCreateBA = () => {
        setloadingbtncreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addMainBank`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bankdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingbtncreate(false)
                if (res2.success) {
                    setBankdata({
                        company_id: 66,
                        name: '',
                        account_number: '',
                        owner: '',
                        currency: ''
                    })
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        setDrawablecreate(false)
                        rt.push(`/admin/myCompany?active=bankAccounts`)
                        settambahdata(prev => !prev)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const handleSubmitEditBA = () => {
        setloadingbtnedit(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateMainBank`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recordrow)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingbtnedit(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setRecordrow({
                        id: 0,
                        company_id: 66,
                        name: '',
                        account_number: '',
                        owner: '',
                        currency: ''
                    })
                    setTimeout(() => {
                        setDrawableedit(false)
                        rt.push(`/admin/myCompany?active=bankAccounts`)
                        seteditdata(prev => !prev)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.erroInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const columnsgetBanks = [
        {
            title: 'No.',
            dataIndex: 'key',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.key}
                        </>
                }
            }
        },
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     render: (text, record, index) => {
        //         return {
        //             props: {
        //                 style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
        //             },
        //             children:
        //                 <>
        //                     {record.id}
        //                 </>
        //         }
        //     }
        // },
        {
            title: 'Nama Bank',
            dataIndex: 'name',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.name}
                        </>
                }
            }
            // sorter: (a, b) => a.name.localeCompare(b.name),
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nomor Rekening',
            dataIndex: 'account_number',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.account_number}
                        </>
                }
            }
            // sorter: (a, b) => a.account_number - b.account_number,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Atas Nama',
            dataIndex: 'owner',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.owner}
                        </>
                }
            }
            // sorter: (a, b) => a.owner.localeCompare(b.owner),
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mata Uang',
            dataIndex: 'currency',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {record.currency}
                        </>
                }
            }
            // filters: [
            //     {
            //         text: 'IDR',
            //         value: 'IDR',
            //     },
            //     {
            //         text: 'USD',
            //         value: 'USD',
            //     },
            // ],
            // onFilter: (value, record) => record.currency.indexOf(value) === 0,
        },
        {
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            align: 'center',
            render: (text, record, index) => {
                return {
                    props: {
                        style: { backgroundColor: index % 2 == 1 ? '#f2f2f2' : '#fff' },
                    },
                    children:
                        <>
                            {
                                actions[index] ?
                                    <>{actions[index]}
                                        {
                                            // [148].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                            // <Button onClick={() => { setDrawableedit(true); setRecordrow(record) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `0.4rem` }}>
                                            //     <EditOutlined />
                                            // </Button>
                                            <Button onClick={() => { rt.push(`/admin/myCompany/bank/${record.id}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `0.4rem` }}>
                                                <EditOutlined />
                                            </Button>
                                        }
                                        {
                                            // [149].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                            <Button type="danger" onClick={() => { setModaldel(true); setModaldeldata(record) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `0.4rem` }}>
                                                <DeleteOutlined />
                                            </Button>
                                        }
                                        {/* <a onClick={() => { setModaldel(true); setModaldeldata(record) }}><DeleteOutlined /></a>
                                        <a className="inline" onClick={() => { setDrawableedit(true); setRecordrow(record) }}><EditOutlined /></a> */}
                                    </>
                                    :
                                    null
                            }
                        </>
                }
            }
        }
    ];
    // dataGetBanks.data ?
    //     datagetBanks = dataGetBanks.data.map((doc, idx) => {
    //         return ({
    //             key: idx + 1,
    //             id: doc.id,
    //             company_id: doc.company_id,
    //             name: doc.name,
    //             account_number: doc.account_number,
    //             owner: doc.owner,
    //             currency: doc.currency
    //         })
    //     })
    //     :
    //     datagetBanks = []

    useEffect(() => {
        setloadingdatagetBanks(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getMainBanks`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingdatagetBanks(false)
                const tempdata = res2.data.map((doc, idx) => {
                    return ({
                        key: idx + 1,
                        id: doc.id,
                        company_id: doc.company_id,
                        name: doc.name,
                        account_number: doc.account_number,
                        owner: doc.owner,
                        currency: doc.currency
                    })
                })
                setdatagetBanks(tempdata)
            })
    }, [tambahdata, editdata, deldata])
    return (
        <div id="bankAccountDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-8">
                <div className="flex space-x-2">
                    {
                        editable ?
                            <button className=" bg-gray-600 hover:bg-gray-800 border text-white py-1 px-3 rounded-md w-24 md:w-40" onClick={() => { setDrawableedit(true) }}>
                                Edit
                            </button>
                            :
                            null
                    }
                    {
                        // [147].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        // <Button type="primary" onClick={() => { setDrawablecreate(true) }}>Tambah</Button>
                        <Button type="primary" onClick={() => { rt.push(`/admin/myCompany/bank/create`) }}>Tambah</Button>
                    }
                    {/* <Drawer title="Edit data Rekening Bank Perusahan MIG" maskClosable={false} visible={drawableedit} onClose={() => { setDrawableedit(false); }} width={370} destroyOnClose={true}>
                        <Form layout="vertical" onFinish={handleSubmitEditBA} initialValues={recordrow}>
                            <div className="grid grid-cols-1 mb-5">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Bank"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama bank harus diisi',
                                        },
                                    ]}
                                >
                                    <Input onChange={onChangeEditBA} name="name" defaultValue={recordrow.name} allowClear />
                                </Form.Item>
                                <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="No.Rekening"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nomor rekening harus diisi',
                                        },
                                    ]}
                                >
                                    <Input onChange={onChangeEditBA} name="account_number" defaultValue={recordrow.account_number} allowClear />
                                </Form.Item>
                                <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Atas Nama"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama penanggung jawab harus diisi',
                                        },
                                    ]}
                                >
                                    <Input onChange={onChangeEditBA} name="owner" defaultValue={recordrow.owner} allowClear />
                                </Form.Item>
                                <Form.Item name="currency" style={{ marginRight: `1rem` }} label="Mata Uang"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mata uang harus diisi',
                                        },
                                    ]}
                                >
                                    <select name="currency" onChange={onChangeEditBA} defaultValue={recordrow.currency} style={{ width: `100%`, borderRadius: `5px` }}>
                                        <option value="IDR">IDR</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <div className="flex justify-end">
                                    <Button type="default" onClick={() => { setDrawableedit(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                                    <Button htmlType="submit" type="primary" size="middle" loading={loadingbtnedit}>Simpan</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Drawer>
                    <Drawer title="Tambah data Rekening Bank Perusahan MIG" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={370} destroyOnClose={true}>
                        <Form layout="vertical" onFinish={handleSubmitCreateBA} initialValues={bankdata}>
                            <div className="grid grid-cols-1 mb-5">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Bank"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama bank harus diisi',
                                        },
                                    ]}>
                                    <Input onChange={onChangeBA} name="name" defaultValue={bankdata.name} />
                                </Form.Item>
                                <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="No.Rekening"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nomor rekening harus diisi',
                                        },
                                    ]}>
                                    <Input onChange={onChangeBA} name="account_number" defaultValue={bankdata.account_number} />
                                </Form.Item>
                                <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Atas Nama"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama penanggung jawab harus diisi',
                                        },
                                    ]}>
                                    <Input onChange={onChangeBA} name="owner" defaultValue={bankdata.owner} />
                                </Form.Item>
                                <Form.Item name="currency" style={{ marginRight: `1rem` }} label="Mata Uang"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mata uang harus diisi',
                                        },
                                    ]}>
                                    <Select
                                        labelInValue
                                        defaultValue={{ value: "IDR" }}
                                        onChange={(value) => { onChangeBACurrency(value) }}
                                        name="currency"

                                    >
                                        <Option value="IDR">IDR</Option>
                                        <Option value="USD">USD</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <div className="flex justify-end">
                                    <Button type="default" onClick={() => { setDrawablecreate(false) }} style={{ marginRight: `1rem` }}>Batal</Button>
                                    <Button htmlType="submit" type="primary" size="middle" loading={loadingbtncreate}>Simpan</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Drawer> */}
                </div>
            </div>
            <div className="md:p-5">
                <Table pagination={{ pageSize: 6 }} scroll={{ x: 200 }} loading={loadingdatagetBanks}
                    onRow={(record, rowIndex) => {
                        return {
                            onMouseOver: (event) => {
                                var actionsCopy = actions
                                actionsCopy[rowIndex] = true
                                setActions(actionsCopy)
                                setAction("block")
                            },
                            onMouseLeave: (event) => {
                                var actionsCopy = actions
                                actionsCopy[rowIndex] = false
                                setActions(actionsCopy)
                                setAction("hidden")
                            }
                        }
                    }}
                    columns={columnsgetBanks} dataSource={datagetBanks} />
            </div>
            <Modal
                title="Hapus Bank Account"
                visible={modaldel}
                onOk={() => { handleDeleteBA(modaldeldata) }}
                onCancel={() => setModaldel(false)}
                okText="Ya"
                cancelText="Tidak"
                okButtonProps={{ loading: loadingdelete }}>
                Apakah anda yakin ingin menghapus <strong>{modaldeldata.name} - {modaldeldata.account_number}</strong>?
            </Modal>
        </div>
    )
}

function MigIndex({ initProps, dataProfile, sidemenu, dataDetailCompany, dataBranchList }) {
    const rt = useRouter()
    const { TabPane } = Tabs;
    const tok = initProps
    // const pathArr = rt.pathname.split("/").slice(1)
    // const pathArr = ['admin', "company", 'mig', ""]
    var activeTab = "profile"
    const { active } = rt.query
    if (active) {
        activeTab = active
    }

    //useState
    const [patharr, setpatharr] = useState([])

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getMainCompanyDetail`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                var temp2 = rt.pathname.split("/").slice(1)
                temp2[temp2.length - 1] = res2.data.name
                setpatharr(temp2)
            })
    }, [])
    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={patharr} st={st}>
            <div className="p-5 bg-white hidden md:block">
                <Tabs tabPosition={`left`} defaultActiveKey={activeTab}>
                    {
                        // [144, 145].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Profile" key={`profile`}>
                            <MigIndexProfile dataProfile={dataProfile} dataDetailCompany={dataDetailCompany} tok={tok}></MigIndexProfile>
                        </TabPane>
                    }
                    {
                        // [146, 147, 148, 149].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Bank Account" key={`bankAccounts`}>
                            <MigIndexBankAccount dataProfile={dataProfile} tok={tok} />
                        </TabPane>
                    }
                    {
                        // [150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Locations" key={`locations`}>
                            <MigIndexLocations dataProfile={dataProfile} dataBranchList={dataBranchList} tok={tok} />
                        </TabPane>
                    }
                </Tabs>
            </div>
            <div className="p-5 bg-white block md:hidden">
                <Tabs tabPosition={`top`} defaultActiveKey={activeTab}>
                    {
                        // [144, 145].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Profile" key={`profile`}>
                            <MigIndexProfile dataProfile={dataProfile} dataDetailCompany={dataDetailCompany} tok={tok}></MigIndexProfile>
                        </TabPane>
                    }
                    {
                        // [146, 147, 148, 149].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Bank Account" key={`bankAccounts`}>
                            <MigIndexBankAccount dataProfile={dataProfile} tok={tok} />
                        </TabPane>
                    }
                    {
                        // [150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Locations" key={`locations`}>
                            <MigIndexLocations dataProfile={dataProfile} dataBranchList={dataBranchList} tok={tok} />
                        </TabPane>
                    }
                </Tabs>
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

    // if (![144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/dashboard/admin' })
    //     res.end()
    // }

    // const resourcesGC = await fetch(`https://boiling-thicket-46501.herokuapp.com/getMainCompanyDetail`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //     },
    // })
    // const resjsonGC = await resourcesGC.json()
    // const dataDetailCompany = resjsonGC

    // const resourcesGB = await fetch(`https://boiling-thicket-46501.herokuapp.com/getMainBanks`, {
    //     method: `GET`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //     },
    // })
    // const resjsonGB = await resourcesGB.json()
    // const dataGetBanks = resjsonGB

    // const resourcesGL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //     },
    // })
    // const resjsonGL = await resourcesGL.json()
    // const dataLocations = resjsonGL
    var dataBranchList = {}
    if (dataProfile.data.company.role !== 2) {
        const resourcesBL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getBranchCompanyList`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
        const resjsonBL = await resourcesBL.json()
        dataBranchList = [resjsonBL.data]
    }
    else {
        const resourcesBL = await fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations?company_id=${dataProfile.data.company.company_id}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
        const resjsonBL = await resourcesBL.json()
        dataBranchList = [resjsonBL.data]
    }
    return {
        props: {
            initProps,
            dataProfile,
            // dataDetailCompany,
            // dataGetBanks,
            // dataLocations,
            dataBranchList,
            sidemenu: "441"
        },
    }
}


export default MigIndex


//Trash
{/* <div className="md:m-5 mb-5 md:mb-0 ">
                            <h1 className="font-semibold text-sm">ID Perusahaan:</h1>
                            <h1 className="text-sm font-normal text-black">{data1.id}</h1>
                        </div> */}

{/* <Select onChange={(value) => { setdatanew({ ...datanew, parent_id: value }) }}>
                                    {
                                        databranchlist.map((doc, idx) => {
                                            return (
                                                <Option key={idx} value={doc.company_id}>{doc.company_name}</Option>
                                            )
                                        })
                                    }
                                </Select> */}