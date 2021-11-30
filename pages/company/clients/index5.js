import Layout from '../../../components/layout-dashboard'
import { useRouter } from 'next/router'
import httpcookie from 'cookie'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import st from '../../../components/layout-dashboard.module.css'
import { Tabs, Input, Table, Tree, Modal, notification, Button, Switch, Spin, Empty } from 'antd'
import moment from 'moment'

function ClientsDetailProfile({ dataProfile, tok, companyid }) {
    const rt = useRouter()
    const [editable, setEditable] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visiblenon, setVisiblenon] = useState(false)
    const [aktifdata, setaktifdata] = useState(false)
    const [loadingbtn, setloadingbtn] = useState(false)
    const [loadingubahaktif, setloadingubahaktif] = useState(false)
    const [loadingubahnonaktif, setloadingubahnonaktif] = useState(false)
    const [data1, setData1] = useState({
        id: "",
        company_name: "",
        address: "",
        phone_number: "",
        image_logo: "",
        singkatan: "",
        tanggal_pkp: "",
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "",
        website: ""
    })
    const [dataisenabled, setdataisenabled] = useState(false)
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


    //handler
    const handleEditProfile = () => {
        setloadingbtn(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateCompanyClient`, {
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
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/clients/${data1.id}`)
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
    const handleActivationClients = (status) => {
        var keaktifan = false
        if (status === "aktif") {
            keaktifan = false
            setloadingubahaktif(true)
        }
        else if (status === "nonAktif") {
            keaktifan = true
            setloadingubahnonaktif(true)
        }
        fetch(`https://boiling-thicket-46501.herokuapp.com/companyClientActivation`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_id: Number(data1.id),
                is_enabled: keaktifan
            })
        })
            .then(res => res.json())
            .then(res2 => {
                setVisible(false)
                setVisiblenon(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        if (status === "aktif") {
                            setloadingubahaktif(false)
                        }
                        else if (status === "nonAktif") {
                            setloadingubahnonaktif(false)
                        }
                        rt.push(`/admin/clients/${data1.id}`)
                        setaktifdata(prev => !prev)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message.errorInfo.status_detail,
                        duration: 3
                    })
                    setTimeout(() => {
                        if (status === "aktif") {
                            setloadingubahaktif(false)
                        }
                        else if (status === "nonAktif") {
                            setloadingubahnonaktif(false)
                        }
                    }, 500)
                }
            })
    }

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyClientDetail?id=${companyid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     company_id: companyid
            // })
        })
            .then(res => res.json())
            .then(res2 => {
                const temp = {
                    id: res2.data.id,
                    company_name: res2.data.name,
                    address: res2.data.address,
                    phone_number: res2.data.phone_number,
                    image_logo: res2.data.image_logo === "" || res2.data.image_logo === "-" ? '/default-users.jpeg' : res2.data.image_logo,
                    singkatan: res2.data.singkatan,
                    tanggal_pkp: res2.data.tanggal_pkp === null ? moment(new Date()) : res2.data.tanggal_pkp,
                    penanggung_jawab: res2.data.penanggung_jawab,
                    npwp: res2.data.npwp,
                    fax: res2.data.fax,
                    email: res2.data.email,
                    website: res2.data.website
                }
                setdataisenabled(res2.data.is_enabled)
                setData1(temp)
            })
    }, [aktifdata])
    return (
        <div id="profileDetailMigWrapper">
            <div className="flex justify-start md:justify-end p-3 md:border-t-2 md:border-b-2 bg-white mb-4 md:mb-8">
                <div className="flex space-x-2">
                    {editable ?
                        <Button type="default" onClick={() => { setEditable(false); }}>Batal</Button>
                        :
                        null
                    }
                    {editable ?
                        null
                        // <Button type="primary" onClick={instanceForm.submit} loading={loadingbtn}>Simpan</Button>
                        :
                        <>
                            {
                                // [158].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <Button type="primary" onClick={() => { rt.push(`/admin/clients/updateProfile/${data1.id}`) }}>Ubah</Button>
                            }
                        </>
                    }
                </div>
            </div>
            <div className=" mb-2 md:mb-4 flex md:flex-row flex-col">
                <h1 className="font-semibold text-base mr-3 pt-1">{data1.company_name}</h1>
                <h1 className="mr-3 pt-1 hidden md:block">|</h1>
                {
                    // [159].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                    <div className="pt-1">
                        {
                            dataisenabled ?
                                <Switch checked={true} onChange={() => { setVisible(true) }} checkedChildren={"AKTIF"}></Switch>
                                :
                                <Switch checked={false} onChange={() => { setVisiblenon(true) }} unCheckedChildren={"NON-AKTIF"}></Switch>
                        }
                    </div>
                    // :
                    // <div className="pt-1">
                    //     {
                    //         dataisenabled ?
                    //             <Switch disabled checked={true} onChange={() => { setVisible(true) }} checkedChildren={"AKTIF"}></Switch>
                    //             :
                    //             <Switch disabled checked={false} onChange={() => { setVisiblenon(true) }} unCheckedChildren={"NON-AKTIF"}></Switch>
                    //     }
                    // </div>
                }
            </div>
            <div className=" w-9/12 p-5 grid grid-cols-1 sm:grid-col-3 md:grid-cols-5 mb-4 rounded-md shadow-md border">
                <div className="p-3 relative col-span-1 sm:col-span-1 md:col-span-1 flex flex-col items-center">
                    <img src={data1.image_logo} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full mb-4" />
                    {editable ?
                        <>
                            <label className="custom-file-upload py-2 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3">
                                <input type="file" style={{ display: `none` }} name="profile_image" onChange={onChangeEditProfileFoto} />
                                {loadingfoto ? <LoadingOutlined /> : <EditOutlined style={{ fontSize: `1.2rem` }} />}
                                Ganti Foto
                            </label>
                        </>
                        :
                        null
                    }
                </div>
                <div className="col-span-1 sm:col-span-2 md:col-span-4 w-full h-auto p-3 md:p-5 flex">
                    {/* <Form layout="vertical" form={instanceForm} onFinish={handleEditProfile} initialValues={data1} style={{ width: `100%` }}> */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="md:m-5 mb-5 md:mb-0">
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
                                        {
                                            data1.tanggal_pkp === null ?
                                                <h1 className="text-sm font-normal text-black">-</h1>
                                                :
                                                <h1 className="text-sm font-normal text-black">{moment(data1.tanggal_pkp).locale('id').format('LL')}</h1>

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
            <Modal
                title="Konfirmasi untuk menon-aktifkan akun"
                visible={visible}
                onOk={() => { handleActivationClients("aktif") }}
                onCancel={() => setVisible(false)}
                okText="Ya"
                cancelText="Tidak"
                okButtonProps={{ loading: loadingubahaktif }}
            >
                Apakah anda yakin ingin menon-aktifkan akun perusahaan <strong>{data1.company_name}</strong>?
            </Modal>
            <Modal
                title="Konfirmasi untuk mengakaktifkan akun"
                visible={visiblenon}
                onOk={() => { handleActivationClients("nonAktif") }}
                okText="Ya"
                cancelText="Tidak"
                onCancel={() => setVisiblenon(false)}
                okButtonProps={{ loading: loadingubahnonaktif }}
            >
                Apakah anda yakin ingin melakukan aktivasi akun perusahaan <strong>{data1.company_name}</strong>?`
            </Modal>
        </div >
    )
}

function ClientsDetailLocations({ dataProfile, dataDetailCompany, data1, tok }) {
    const rt = useRouter()

    //useState
    const [tambahdata, settambahdata] = useState(false)
    const [datalocationclient, setdatalocationclient] = useState([])
    const [expandedKeys, setExpandedKeys] = useState([])
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [searchValue, setSearchValue] = useState("");
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
    const [praloading, setpraloading] = useState(true)
    const [drawablecreate, setdrawablecreate] = useState(false)
    const [defvalparent, setdefvalparent] = useState("")
    const [frominduk, setfrominduk] = useState(false)
    const [loadingtambah, setloadingtambah] = useState(false)
    const [loadingimage, setloadingimage] = useState(false)
    const [visiblehapus, setvisiblehapus] = useState(false)
    const [loadinghapus, setloadinghapus] = useState(false)
    const [hapustrigger, sethapustrigger] = useState(-1)
    const [datahapus, setdatahapus] = useState({
        title: "",
        id: ""
    })

    //components
    const uploadButton = (
        <div>
            {loadingimage ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Unggah</div>
        </div>
    );
    const beforeUploadProfileImage = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const onChangeProfileImage = async (info) => {
        if (info.file.status === 'uploading') {
            setloadingimage(true)
            return;
        }
        if (info.file.status === 'done') {
            const formData = new FormData()
            formData.append('file', info.file.originFileObj)
            formData.append('upload_preset', 'migsys')
            return fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(res2 => {
                    setloadingimage(false)
                    setdatanew({
                        ...datanew,
                        image_logo: res2.secure_url
                    })
                })
        }
    }
    //Handler
    const handleCreateLocationsClient = () => {
        setdatanew({
            ...datanew,
            parent_id: defvalparent
        })
        if (datanew.address === "") {
            setdatanew({
                ...datanew,
                address: '-',
            })
        }
        if (datanew.phone_number === "") {
            setdatanew({
                ...datanew,
                phone_number: '-',
            })
        }
        setloadingtambah(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addCompanyClient`, {
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
                        rt.push(`/admin/clients/${data1.id}`)
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
    const handleDeleteLocationClient = () => {
        setloadinghapus(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteCompanyClient`, {
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
                        message: 'Location Client berhasil dihapus',
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
    generateList(datalocationclient);
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
                    return getParentKey(item.key, datalocationclient);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        if (value) {
            setExpandedKeys(expandedKeys);
            setSearchValue(value);
            setAutoExpandParent(true);
        } else {
            setExpandedKeys([datalocationclient[0].key]);
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
                        <div className="w-full" onClick={() => { rt.push(`/admin/clients/locations/${item.id}?parent=${item.id_parent}&edit=&cancel=${data1.id}`) }}>
                            {beforeStr}
                            <span className=" text-blue-500">{searchValue}</span>
                            {afterStr}
                        </div>
                        <div className={`hidden mx-2`} id={`node${item.key}`}>
                            {
                                // [152].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <a className="mx-2 pb-1" onClick={(e) => { rt.push(`/admin/clients/locations/new?parent=${item.id}&frominduk=1&cancel=${data1.id}`) }} alt="add"><PlusOutlined /></a>
                            }
                            {
                                // [151, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <Link href={`/admin/clients/locations/${item.id}?parent=${item.id_parent}&edit=1&cancel=${data1.id}`}>
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

    //useEffect
    useEffect(() => {
        data1.id !== "" ?
            fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations?company_id=${data1.id}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(tok),
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({
                //     company_id: data1.id
                // })
            })
                .then(res => res.json())
                .then(res2 => {
                    res2.data.children ? setdatalocationclient(res2.data.children) : setdatalocationclient([])
                    const expandkeyArr = res2.data.children ? res2.data.children.map(doc => doc.key) : []
                    res2.data.children ? setExpandedKeys(expandkeyArr) : setExpandedKeys([])
                    setpraloading(false)
                })
            :
            null
    }, [data1, hapustrigger])
    return (
        <div id="locationsDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-5">
                <div className="flex space-x-2">
                    {/* <Link href={`/admin/company/locations/new?parent=&companyId=${dataDetailCompany.data.company_id}`}> */}
                    {/* <Button type="primary" size="middle" onClick={() => { setdrawablecreate(true); setfrominduk(false) }}>Tambah</Button> */}
                    <Button type="primary" size="middle" onClick={() => { rt.push(`/admin/clients/locations/new?parent=${data1.id}&frominduk=0&cancel=${data1.id}`) }}>Tambah</Button>
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
                        datalocationclient.length === 0 ?
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
                                    treeData={loop(datalocationclient)}
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
                                                {/* <div className={`hidden mx-2`} id={`node${nodeData.key}`}> */}
                                                {/* <Link href={`/admin/company/locations/new?parent=${nodeData.id}&companyId=${dataDetailCompany.data.company_id}`}> */}
                                                {
                                                    // [152].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                                    //                                                 <a className="mx-2 pb-1" onClick={(e) => { rt.push(`/admin/company/clients/locations/new?parent=${nodeData.id}&frominduk=1`) }} alt="add"><PlusOutlined /></a>
                                                    // <a className="mx-2 pb-1" onClick={(e) => { setdrawablecreate(true); setdefvalparent(nodeData.id); setfrominduk(true) }} alt="add"><PlusOutlined /></a>
                                                }
                                                {/* </Link> */}
                                                {/* {
                                                [151, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                                <Link href={`/admin/company/clients/locations/${nodeData.id}?parent=${nodeData.title}&edit=1&cancel=${dataDetailCompany.data.company_id}`}>
                                                    <a className="mx-2 pb-1" alt="update"><EditOutlined /></a>
                                                </Link>
                                            } */}
                                                {/* <Popconfirm title="Yakin hapus lokasi?" onConfirm={() => { message.success("API is not available") }} onCancel={() => { message.error("Gagal dihapus") }}>
                                        <a className="mx-2 pb-1" alt="delete"><DeleteOutlined /></a>
                                    </Popconfirm> */}
                                                {/* </div> */}
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
                title="Konfirmasi untuk menghapus Location Client"
                visible={visiblehapus}
                onOk={handleDeleteLocationClient}
                onCancel={() => setvisiblehapus(false)}
                okText="Ya"
                cancelText="Tidak"
                okButtonProps={{ loading: loadinghapus }}
            >
                Apakah anda yakin ingin menghapus Location <strong>{datahapus.title}</strong>?`
            </Modal>
            {/* <Drawer title="Buat Clients" maskClosable={false} destroyOnClose={true} visible={drawablecreate} onClose={() => {
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
                    <Form layout="vertical" className="createClientsForm" onFinish={handleCreateLocationsClient} form={instanceForm}>
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
                                            treeData={datalocationclient}
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
                                            treeData={datalocationclient}
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

function ClientsDetailBankAccount({ dataProfile, data1, tok, companyId }) {
    const rt = useRouter()
    const [editable, setEditable] = useState(false)
    const [tambahdata, settambahdata] = useState(false)
    const [editdata, seteditdata] = useState(false)
    const [deldata, setdeldata] = useState(false)
    const [drawablecreate, setDrawablecreate] = useState(false)
    const [drawableedit, setDrawableedit] = useState(false)
    const [modaldel, setModaldel] = useState(false)
    const [loadingbtncreate, setloadingbtncreate] = useState(false)
    const [loadingbtnedit, setloadingbtnedit] = useState(false)
    const [loadingbtndelete, setloadingbtndelete] = useState(false)
    const [modaldeldata, setModaldeldata] = useState({})
    const [datagetbanks, setdatagetbanks] = useState([])
    const [loadingdatagetbanks, setloadingdatagetbanks] = useState(false)
    const [recordrow, setRecordrow] = useState({
        id: 0,
        company_id: companyId,
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    const [bankdata, setBankdata] = useState({
        company_id: companyId,
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    var actionsArr = []
    for (var i = 0; i < datagetbanks.length; i++) {
        actionsArr.push(false)
    }
    const [actions, setActions] = useState(actionsArr)
    const [action, setAction] = useState(false)
    const columnsgetBanks = [
        {
            title: 'No.',
            dataIndex: 'key',
            render: (text, record, index) => {
                return {

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
                    children:
                        <>
                            {record.name}
                        </>
                }
            }
            // sorter: (a, b) => a.bank.localeCompare(b.bank),
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nomor Rekening',
            dataIndex: 'account_number',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.account_number}
                        </>
                }
            }
            // sorter: (a, b) => a.norek - b.norek,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Atas Nama',
            dataIndex: 'owner',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.owner}
                        </>
                }
            }
            // sorter: (a, b) => a.an.localeCompare(b.an),
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mata Uang',
            dataIndex: 'currency',
            render: (text, record, index) => {
                return {
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
            title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
            dataIndex: 'actionss',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {
                                actions[index] ?
                                    <>{actions[index]}
                                        {
                                            // [162].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                            <Button onClick={() => { rt.push(`/admin/clients/bank/${record.id}?companyid=${companyId}&name=${data1.company_name}`) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `0.4rem` }}>
                                                <EditOutlined />
                                            </Button>
                                            // <Button onClick={() => { setDrawableedit(true); setRecordrow(record) }} style={{ paddingTop: `0`, paddingBottom: `0.3rem`, marginRight: `0.4rem` }}>
                                            //     <EditOutlined />
                                            // </Button>
                                        }
                                        {
                                            // [163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
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
    // var datagetBanks = []
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
    const handleSubmitCreateBA = () => {
        setloadingbtncreate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addClientBank`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bankdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                if (res2.success) {
                    setloadingbtncreate(false)
                    setBankdata({
                        company_id: companyId,
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
                        rt.push(`/admin/clients/${companyId}`)
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
        console.log("isidata2: " + recordrow)
        setloadingbtnedit(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateClientBank`, {
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
                        company_id: companyId,
                        name: '',
                        account_number: '',
                        owner: '',
                        currency: ''
                    })
                    setTimeout(() => {
                        setDrawableedit(false)
                        rt.push(`/admin/clients/${companyId}`)
                        seteditdata(prev => !prev)
                    }, 500)
                }
                else {
                    notification['error']({
                        message: res2.errorInfo.status_detail,
                        duration: 3
                    })
                }
            })
    }
    const handleDeleteBA = (rec) => {
        setloadingbtndelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteClientBank?id=${rec.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    setloadingbtndelete(false)
                    setModaldel(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        // rt.push(`/admin/company/clients/${companyId}`)
                        setdeldata(prev => !prev)
                    }, 3000)
                }
                else {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }

    //useEffect
    useEffect(() => {
        setloadingdatagetbanks(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getClientBanks?id=${companyId}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                if (res2.success) {
                    const temp = res2.data.map((doc, idx) => {
                        return ({
                            key: idx + 1,
                            id: doc.id,
                            company_id: companyId,
                            name: doc.name,
                            account_number: doc.account_number,
                            owner: doc.owner,
                            currency: doc.currency
                        })
                    })
                    setdatagetbanks(temp)
                }
                else {
                    setdatagetbanks([])
                }
                setloadingdatagetbanks(false)
            })
    }, [tambahdata, editdata, deldata, companyId])
    return (
        <div id="bankAccountDetailMigWrapper">
            <div className="flex justify-start md:justify-end md:p-3 md:border-t-2 md:border-b-2 bg-white my-4 md:mb-8">
                <div className="flex space-x-2">
                    {
                        editable ?
                            <button className=" bg-gray-600 hover:bg-gray-800 border text-white py-1 px-2 rounded-md w-24 md:w-40" onClick={() => { setDrawableedit(true) }}>
                                Edit
                            </button>
                            :
                            null
                    }
                    {
                        // [161].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <Button type="primary" onClick={() => { rt.push(`/admin/clients/bank/create?origin=${companyId}&name=${data1.company_name}`) }}>Tambah</Button>
                        // <Button type="primary" onClick={() => { setDrawablecreate(true) }}>Tambah</Button>
                    }
                    {/* <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-2 rounded-md w-24 md:w-40 hidden md:block" onClick={() => { setDrawablecreate(true) }}> Create</button>
                    <button className=" bg-blue-700 hover:bg-blue-800 border text-white py-1 px-2 rounded-md w-24 md:w-40 block md:hidden" onClick={() => { setDrawablecreatesmall(true) }}> Create</button> */}

                    {/* <Drawer title="Edit data Rekening Bank" maskClosable={false} visible={drawableedit} onClose={() => { setDrawableedit(false) }} width={370} destroyOnClose={true}>
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
                                    <Input onChange={onChangeEditBA} name="name" id="editName" defaultValue={recordrow.name} allowClear />
                                </Form.Item>
                                <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="No.Rekening"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nomor rekening harus diisi',
                                        },
                                    ]}
                                >
                                    <Input onChange={onChangeEditBA} name="account_number" id="editAccountNumber" defaultValue={recordrow.account_number} allowClear />
                                </Form.Item>
                                <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Atas Nama"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nama penanggung jawab harus diisi',
                                        },
                                    ]}
                                >
                                    <Input onChange={onChangeEditBA} name="owner" id="editOwner" defaultValue={recordrow.owner} allowClear />
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
                            <div className="flex justify-end">
                                <Button type="default" onClick={() => { setDrawableedit(false) }} style={{ marginRight: `1rem` }} size="middle">Batal</Button>
                                <Form.Item>
                                    <Button htmlType="submit" type="primary" size="middle" loading={loadingbtnedit}>Simpan</Button>
                                </Form.Item>
                            </div>

                        </Form>
                    </Drawer> */}

                    {/* <Drawer title="Buat data Rekening Bank" maskClosable={false} visible={drawablecreate} onClose={() => { setDrawablecreate(false) }} width={370} destroyOnClose={true}>
                        <Form layout="vertical" onFinish={handleSubmitCreateBA} initialValues={bankdata}>
                            <div className="grid grid-cols-1 mb-5">
                                <Form.Item name="name" style={{ marginRight: `1rem` }} label="Bank" rules={[
                                    {
                                        required: true,
                                        message: 'Nama bank harus diisi',
                                    },
                                ]}>
                                    <Input onChange={onChangeBA} name="name" defaultValue={bankdata.name} allowClear />
                                </Form.Item>
                                <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="No.Rekening" rules={[
                                    {
                                        required: true,
                                        message: 'Nomor rekening harus diisi',
                                    },
                                ]}>
                                    <Input onChange={onChangeBA} name="account_number" defaultValue={bankdata.account_number} allowClear />
                                </Form.Item>
                                <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Atas Nama" rules={[
                                    {
                                        required: true,
                                        message: 'Nama penanggung jawab harus diisi',
                                    },
                                ]}>
                                    <Input onChange={onChangeBA} name="owner" defaultValue={bankdata.owner} allowClear />
                                </Form.Item>
                                <Form.Item name="currency" style={{ marginRight: `1rem` }} label="Mata Uang" rules={[
                                    {
                                        required: true,
                                        message: 'Mata Uang harus diisi',
                                    },
                                ]}
                                >
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
                            <div className="flex justify-end">
                                <Button type="default" onClick={() => { setDrawablecreate(false) }} style={{ marginRight: `1rem` }} size="middle">Batal</Button>
                                <Form.Item>
                                    <Button htmlType="submit" type="primary" size="middle" loading={loadingbtncreate}>Simpan</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </Drawer> */}
                </div>
            </div>
            <div className="md:p-5">
                <Table
                    pagination={{ pageSize: 6 }}
                    scroll={{ x: 200 }}
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
                    columns={columnsgetBanks} dataSource={datagetbanks} loading={loadingdatagetbanks} />
            </div>
            <Modal
                title="Hapus Bank Account"
                visible={modaldel}
                onOk={() => { handleDeleteBA(modaldeldata) }}
                onCancel={() => setModaldel(false)}
                okText="Ya"
                okButtonProps={{ loading: loadingbtndelete }}
                cancelText="Tidak">
                Apakah anda yakin ingin menghapus <strong>{modaldeldata.name} - {modaldeldata.account_number}</strong>?
            </Modal>
        </div>
    )
}

function ClientsRelationship({ dataProfile, tok, companyid }) {
    //useState
    const [praloadingrel, setpraloadingrel] = useState(true)
    const [datatable, setdatatable] = useState([])
    const [datatable2, setdatatable2] = useState([])
    const [datatable3, setdatatable3] = useState([])
    const [namasearchact, setnamasearchact] = useState(false)
    const [namavalue, setnamavalue] = useState("")

    //helper
    const columns = [
        {
            title: 'Relationship Type',
            dataIndex: 'relationship_name',
            key: 'relationship_name',
        },
        {
            title: 'Nama Item',
            dataIndex: 'connected_detail_name',
            key: 'connected_detail_name',
        },
        {
            title: 'Tipe',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Lokasi',
            dataIndex: 'subject_detail_name',
            key: 'subject_detail_name',
        },
    ]

    //handler
    //search nama
    const onChangeSearch = (e) => {
        if (e.target.value === "") {
            setdatatable(datatable3)
            setnamasearchact(false)
        }
        else {
            setnamasearchact(true)
            setnamavalue(e.target.value)
        }
    }
    //finalClick
    const onFinalClick = () => {
        var datatemp = datatable2
        if (namasearchact) {
            datatemp = datatemp.filter(flt => {
                return flt.connected_detail_name.toLowerCase().includes(namavalue.toLowerCase())
            })
        }
        setdatatable(datatemp)
    }

    //useEffect
    useEffect(() => {
        setpraloadingrel(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventory?id=${companyid}&type_id=-3`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                setdatatable(res2.data.from_inverse.concat(res2.data.not_from_inverse))
                setdatatable2(res2.data.from_inverse.concat(res2.data.not_from_inverse))
                setdatatable3(res2.data.from_inverse.concat(res2.data.not_from_inverse))
                setpraloadingrel(false)
            })
    }, [])

    return (
        <div className="flex flex-col">
            <div className="border-b flex justify-between p-5 mb-8">
                <h1 className="font-bold text-xl my-auto">Relationship</h1>
            </div>
            <div className="flex mb-5">
                {
                    praloadingrel ?
                        null
                        :
                        <div className=" w-full mr-1 grid grid-cols-12">
                            <div className="col-span-11 mr-1">
                                <Input style={{ width: `100%`, marginRight: `0.5rem` }} placeholder="Cari Nama Item" onChange={e => onChangeSearch(e)} allowClear></Input>
                            </div>
                            <div className=" col-span-1">
                                <Button type="primary" style={{ width: `100%` }} onClick={onFinalClick}><SearchOutlined /></Button>
                            </div>
                        </div>
                }
            </div>
            <Table loading={praloadingrel} pagination={{ pageSize: 9 }} scroll={{ x: 200 }} dataSource={datatable} columns={columns}></Table>
        </div>
    )
}

function DetailClients({ initProps, dataProfile, sidemenu, dataDetailCompany, dataGetBanks, companyid }) {
    const rt = useRouter()
    const { TabPane } = Tabs;
    const tok = initProps
    var activeTab = "profile"
    const { active } = rt.query
    if (active) {
        activeTab = active
    }

    //useState
    const [aktifdata, setaktifdata] = useState(false)
    const [data1, setData1] = useState({
        id: "",
        company_name: "",
        address: "",
        phone_number: "",
        image_logo: "",
        singkatan: "",
        tanggal_pkp: "",
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "",
        website: ""
    })
    const [dataisenabled, setdataisenabled] = useState(false)

    const pathArr = rt.pathname.split("/").slice(1)
    pathArr[pathArr.length - 1] = data1.company_name === "" ? "Clients" : data1.company_name

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyClientDetail?id=${companyid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     company_id: companyid
            // })
        })
            .then(res => res.json())
            .then(res2 => {
                const temp = {
                    id: res2.data.id,
                    company_name: res2.data.name,
                    address: res2.data.address,
                    phone_number: res2.data.phone_number,
                    image_logo: res2.data.image_logo === "" || res2.data.image_logo === "-" ? '/default-users.jpeg' : res2.data.image_logo,
                    singkatan: res2.data.singkatan,
                    tanggal_pkp: res2.data.tanggal_pkp === null ? moment(new Date()) : res2.data.tanggal_pkp,
                    penanggung_jawab: res2.data.penanggung_jawab,
                    npwp: res2.data.npwp,
                    fax: res2.data.fax,
                    email: res2.data.email,
                    website: res2.data.website
                }
                setdataisenabled(res2.data.is_enabled)
                setData1(temp)
            })
    }, [])

    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} data1={data1} st={st}>
            <div className="px-5 pt-5 pb-0 bg-white hidden md:block">
                <Tabs tabPosition={`left`} defaultActiveKey={activeTab}>
                    {
                        // [156, 158, 159].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Profile" key={`profile`}>
                            <ClientsDetailProfile dataProfile={dataProfile} tok={tok} companyid={companyid}></ClientsDetailProfile>
                        </TabPane>
                    }
                    {
                        // [160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Bank Account" key={`bankAccounts`}>
                            <ClientsDetailBankAccount dataProfile={dataProfile} data1={data1} tok={tok} companyId={data1.id} />
                        </TabPane>
                    }
                    <TabPane tab="Locations" key={`locations`}>
                        <ClientsDetailLocations dataProfile={dataProfile} data1={data1} tok={tok}></ClientsDetailLocations>
                    </TabPane>
                    <TabPane tab="Relationship" key={`relationship`}>
                        <ClientsRelationship dataProfile={dataProfile} tok={tok} companyid={companyid}></ClientsRelationship>
                    </TabPane>
                </Tabs>
            </div>
            <div className="pt-5 pb-0 bg-white block md:hidden" >
                <Tabs tabPosition={`top`} defaultActiveKey={activeTab}>
                    {
                        // [156, 158, 159].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Profile" key={`profile`}>
                            <ClientsDetailProfile dataProfile={dataProfile} tok={tok} companyid={companyid}></ClientsDetailProfile>
                        </TabPane>
                    }
                    {
                        // [160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                        <TabPane tab="Bank Account" key={`bankAccounts`}>
                            <ClientsDetailBankAccount dataProfile={dataProfile} data1={data1} tok={tok} companyId={data1.id} />
                        </TabPane>
                    }
                    <TabPane tab="Locations" key={`locations`}>
                        <ClientsDetailLocations dataProfile={dataProfile} data1={data1} tok={tok}></ClientsDetailLocations>
                    </TabPane>
                    <TabPane tab="Relationship" key={`relationship`}>
                        <ClientsRelationship dataProfile={dataProfile} tok={tok} companyid={companyid}></ClientsRelationship>
                    </TabPane>
                </Tabs>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const companyid = params.companyId
    const reqBodyCompanyDetail = {
        company_id: companyid
    }
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
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    // if (![156, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
    //     res.writeHead(302, { Location: '/admin/company' })
    //     res.end()
    // }

    // const resourcesGC = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyClientDetail`, {
    //     method: `POST`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(reqBodyCompanyDetail)
    // })
    // const resjsonGC = await resourcesGC.json()
    // const dataDetailCompany = resjsonGC

    // const resourcesGB = await fetch(`https://boiling-thicket-46501.herokuapp.com/getClientBanks?id=${dataDetailCompany.data.company_id}`, {
    //     method: `GET`,
    //     headers: {
    //         'Authorization': JSON.parse(initProps),
    //     },
    // })
    // const resjsonGB = await resourcesGB.json()
    // const dataGetBanks = resjsonGB
    return {
        props: {
            initProps,
            dataProfile,
            // dataDetailCompany,
            // dataGetBanks,
            sidemenu: "52",
            companyid
        },
    }
}

export default DetailClients


    // const treeData = [
    //     {
    //         title: 'HUB-1',
    //         key: 'hub1',
    //         children: [
    //             {
    //                 title: 'Jakarta',
    //                 key: '0-0-0',
    //                 children: [
    //                     {
    //                         title: 'Slipi',
    //                         key: '0-0-0-0',
    //                     },
    //                     {
    //                         title: 'Tebet',
    //                         key: '0-0-0-1',
    //                     },
    //                     {
    //                         title: 'Pancoran',
    //                         key: '0-0-0-2',
    //                     },
    //                     {
    //                         title: 'Pluit',
    //                         key: '0-0-0-3',
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'Bogor',
    //                 key: '0-0-1',
    //                 children: [
    //                     {
    //                         title: 'Cibinong',
    //                         key: '0-0-1-0',
    //                     },
    //                     {
    //                         title: 'Parung',
    //                         key: '0-0-1-1',
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'Depok',
    //                 key: '0-0-2',
    //             },
    //             {
    //                 title: 'Tangerang',
    //                 key: '0-0-3',
    //             },
    //             {
    //                 title: 'Banten',
    //                 key: '0-0-4',
    //             },
    //         ],
    //     },
    //     {
    //         title: 'HUB-2',
    //         key: '0-1',
    //         children: [
    //             {
    //                 title: '0-1-0-0',
    //                 key: '0-1-0-0',
    //             },
    //             {
    //                 title: '0-1-0-1',
    //                 key: '0-1-0-1',
    //             },
    //             {
    //                 title: '0-1-0-2',
    //                 key: '0-1-0-2',
    //             },
    //         ],
    //     },
    //     {
    //         title: 'HUB-3',
    //         key: '0-2',
    //     },
    // ];