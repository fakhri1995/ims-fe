import Layout from '../../../../components/layout-dashboardNew'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import st from '../../../../components/layout-dashboard.module.css'
import { Tree, Input, Form, Spin, notification, Empty, DatePicker } from 'antd'
import Buttonsys from '../../../../components/button'
import { H1, Text, Label, LabelDark } from '../../../../components/typography'
import { EditIconSvg, PhoneIconSvg, SortingIconSvg, TrashIconSvg, CheckIconSvg, LocationIconSvg, CameraIconSvg, ExternalLinkIconSvg, MoveIconSvg, BackIconSvg, FaxIconSvg, RefreshIconSvg, SquarePlusIconSvg, PkpIconSvg, NotesIconSvg, WebIconSvg, EmailIconSvg } from '../../../../components/icon'
import moment from 'moment'
import { ModalEdit, ModalHapusInventoryExist, ModalHapusLokasiCekChild, ModalHapusLokasiConfirm, ModalHapusLokasiMoveChild } from '../../../../components/modal/modalCustom'
import { DrawerSublokasi } from '../../../../components/drawer/drawerCustom'
import { TableCustom } from '../../../../components/table/tableCustom'
import { DownOutlined, LoadingOutlined } from '@ant-design/icons'
import { InputNotRequired, DateNotRequired } from '../../../../components/input'

function modifData(dataa) {
    for (var i = 0; i < dataa.length; i++) {
        dataa[i]['children'] = dataa[i].sub_children
        delete dataa[i].sub_children
        if (dataa[i].children) [
            modifData(dataa[i].children)
        ]
    }
    return dataa
}
function modifForIndukSubLokasi(rawdata, modifdata) {
    const temp = [
        {
            id: rawdata.id,
            title: rawdata.name,
            key: rawdata.id,
            value: rawdata.id,
            children: modifdata
        }
    ]
    return temp
}

const ClientLocationDetail = ({ initProps, dataProfile, sidemenu, locid }) => {
    const rt = useRouter()
    const [instanceForm] = Form.useForm();
    var pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(2, 1)
    pathArr[pathArr.length - 1] = "Detail Lokasi"

    //useState
    const [rawdata, setrawdata] = useState({
        id: "",
        top_parent_id: "",
        name: "",
        image_logo: "",
        phone_number: "",
        address: "",
        role: "",
        singkatan: "",
        tanggal_pkp: moment(new Date()),
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "",
        website: "",
        induk_level_1_count: "",
        induk_level_2_count: "",
        induk_level_3_count: "",
        sub_location_level_1_count: "",
        sub_location_level_2_count: "",
        level: "",
        parent: null,
        sub_children: []
    })
    const [displaydata, setdisplaydata] = useState({
        id: "",
        name: "",
        address: "",
        phone_number: "",
        image_logo: "",
        singkatan: "",
        tanggal_pkp: null,
        penanggung_jawab: "",
        npwp: "",
        fax: "",
        email: "",
        website: ""
    })
    const [isenabled, setisenabled] = useState(false)
    const [rawlocations, setrawlocations] = useState([])
    //EDIT PROFILE
    const [editable, seteditable] = useState(false)
    const [modaledit, setmodaledit] = useState(false)
    const [praloadingedit, setpraloadingedit] = useState(true)
    const [editloading, seteditloading] = useState(false)
    const [loadingfoto, setloadingfoto] = useState(false)
    const [dynamicattr, setdynamicattr] = useState({
        email: false,
        website: false,
        npwp: false,
        fax: false,
        tanggal_pkp: false
    })
    //ITEMS
    const [rawitems, setrawitems] = useState({
        current_page: "",
        data: [],
        first_page_url: "",
        from: null,
        last_page: null,
        last_page_url: "",
        next_page_url: "",
        path: "",
        per_page: null,
        prev_page_url: null,
        to: null,
        total: null
    })
    const [items, setitems] = useState([])
    const [page, setpage] = useState(1)
    const [rows, setrows] = useState(6)
    const [praloadingitem, setpraloadingitem] = useState(true)
    //SUB LOKASI
    const [subloc, setsubloc] = useState([])
    const [induksubloc, setinduksubloc] = useState([])
    const [sortedname, setsortedname] = useState("A-Z")
    const [sorted, setsorted] = useState(-1)
    const [sortedbtn, setsortedbtn] = useState(false)
    const [loadingsorted, setloadingsorted] = useState(true)
    const [expandedkeys, setexpandedkeys] = useState([])
    const [selectedsubloc, setselectedsubloc] = useState(false)
    const [selectedsublocdata, setselectedsublocdata] = useState({})
    const [sublokasidrawer, setsublokasidrawer] = useState(false)
    //SEARCH TREE
    const [searchvalue, setsearchvalue] = useState('')
    const [autoexpandparent, setautoexpandparent] = useState(true)
    //DELETE
    const [deletedata, setdeletedata] = useState({
        id: Number(locid),
        new_parent: null
    })
    const [tipe, settipe] = useState(1)
    const [loadingdelete, setloadingdelete] = useState(false)
    //1. cek
    const [modalcheckchild, setmodalcheckchild] = useState(false)
    const [modalchecksubchild, setmodalchecksubchild] = useState(false)
    //2. move sublokasi
    const [modalmove, setmodalmove] = useState(false)
    const [modalsubmove, setmodalsubmove] = useState(false)
    //3. konfirmasi
    const [modalconfirm, setmodalconfirm] = useState(false)
    const [modalsubconfirm, setmodalsubconfirm] = useState(false)
    //4. inventory exist
    const [datainvexist, setdatainvexist] = useState([])
    const [modalinvexist, setmodalinvexist] = useState(false)
    const [modalsubinvexist, setmodalsubinvexist] = useState(false)




    //columns table items
    const columnitems = [
        {
            title: 'No',
            dataIndex: 'num',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {index + 1}
                        </>
                }
            }
        },
        {
            title: 'MIG ID',
            dataIndex: 'mig_id',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.mig_id}
                        </>
                }
            },
            sorter: (a, b) => a.mig_id - b.mig_id,
        },
        {
            title: 'Tipe Aset',
            dataIndex: 'asset_name',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.model_inventory.asset.asset_name}
                        </>
                }
            }
        },
        {
            title: 'Model',
            dataIndex: 'model_name',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.model_inventory.name}
                        </>
                }
            }
        },
        {
            title: 'Sublokasi',
            dataIndex: 'full_location',
            render: (text, record, index) => {
                return {
                    children:
                        <>
                            {record.full_location}
                        </>
                }
            }
        },
    ]

    //handler
    const onChangeInput = (e) => {
        setdisplaydata({
            ...displaydata,
            [e.target.name]: e.target.value
        })
    }
    const onChangeInputNotRequired = (e) => {
        setdisplaydata({
            ...displaydata,
            [e.target.name]: e.target.value
        })
    }
    const onchangeDate = (date, datestring) => {
        setdisplaydata({ ...displaydata, tanggal_pkp: datestring })
    }
    const onChangeGambar = async (e) => {
        setloadingfoto(true)
        const foto = e.target.files
        const formdata = new FormData()
        formdata.append('file', foto[0])
        formdata.append('upload_preset', 'migsys')
        const fetching = await fetch(`https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`, {
            method: 'POST',
            body: formdata
        })
        const datajson = await fetching.json()
        setdisplaydata({ ...displaydata, image_logo: datajson.secure_url })
        setloadingfoto(false)
    }
    const onSortSubLoc = async (value) => {
        setloadingsorted(true)
        sorted === -1 ? setsorted(true) : setsorted(value)
        setsortedbtn(true)
        if (value === true) {
            var temp = await subloc.sort((a, b) => a.title > b.title ? 1 : -1)
            setsubloc(temp)
            setsortedname("A-Z")
        }
        else {
            fetch(`https://boiling-thicket-46501.herokuapp.com/getSubCompanyDetail?id=${locid}`, {
                method: `GET`,
                headers: {
                    'Authorization': JSON.parse(initProps),
                },
            })
                .then(res => res.json())
                .then(res2 => {
                    if (res2.data.sub_children) {
                        const childmap = modifData(res2.data.sub_children)
                        var temp = childmap.sort((a, b) => a.title < b.title ? 1 : -1)
                        setsubloc(temp)
                        setsortedname("Z-A")
                    }
                    else {
                        setsubloc([])
                    }
                })
        }
        setloadingsorted(false)
    }
    const onSearchItems = (e) => {
        setpraloadingitem(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyInventories?id=${locid}&page=${page}&rows=${rows}&keyword=${e.target.value}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setitems(res2.data.data)
                setpraloadingitem(false)
            })
    }
    const handleEdit = () => {
        seteditloading(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateCompany`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(displaydata)
        })
            .then(res => res.json())
            .then(res2 => {
                setmodaledit(false)
                seteditloading(false)
                if (res2.success) {
                    seteditable(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/company/clients/locations/${locid}`)
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    const handleDelete = () => {
        setloadingdelete(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/deleteCompany`, {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deletedata)
        })
            .then(res => res.json())
            .then(res2 => {
                setmodalconfirm(false)
                setmodalmove(false)
                setloadingdelete(false)
                if (res2.success) {
                    setmodalcheckchild(false)
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rawdata.top_parent_id === null ?
                            rt.push(`/company/clients/locations`)
                            :
                            window.location.href = `/company/clients/locations/${rawdata.top_parent_id}`
                    }, 500)
                }
                else if (!res2.success) {
                    notification['error']({
                        message: res2.inventories ? `Masih terdapat inventori` : res2.message,
                        duration: 3
                    })
                    if (res2.inventories) {
                        setdatainvexist(res2.inventories)
                        setmodalinvexist(true)
                    }
                }
            })
    }

    //FILTER TREE
    //filterAsset
    const onExpand = (expandedKeys) => {
        setexpandedkeys(expandedKeys);
        setautoexpandparent(false);
    }
    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { id, key, value, parent_id, title, sub_child_count } = node;
            dataList.push({ id, key, value, parent_id, title, sub_child_count });
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    generateList(subloc);
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
    const onChangeFilterSubLoc = (e) => {
        const { value } = e.target;
        const expandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, subloc);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        if (value) {
            setexpandedkeys(expandedKeys);
            setsearchvalue(value);
            setautoexpandparent(true);
        } else {
            setexpandedkeys(subloc.map(doc => doc.key));
            setsearchvalue("");
            setautoexpandparent(false);
        }
    };
    const filterTreeNode = (node) => {
        const title = node.title.props.children[0].props ? node.title.props.children[0].props.children[2] : node.title.props.children[2];
        const result = title ? (title.indexOf(searchvalue) !== -1 ? true : false) : false
        return result;
    };
    const loop = (data) =>
        data.map((item) => {
            const index = item.title.indexOf(searchvalue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchvalue.length);
            const title =
                index > -1 ?
                    (
                        <div
                            id={`wrap${item.key}`}
                            className={`flex items-start w-full py-2 rounded-md px-2`}
                            onMouseOver={() => {
                                var d = document.getElementById(`text${item.key}`)
                                d.classList.add("text-primary100"); d.classList.remove("text-gray-400")
                                var dd = document.getElementById(`wrap${item.key}`)
                                dd.classList.add("bg-primary10");
                                var ddd = document.getElementById(`badge${item.key}`)
                                ddd.classList.add("bg-primary100"); ddd.classList.remove("bg-gray-300");
                            }}
                            onMouseLeave={() => {
                                var e = document.getElementById(`text${item.key}`)
                                e.classList.add("text-gray-400"); e.classList.remove("text-primary100")
                                var ee = document.getElementById(`wrap${item.key}`)
                                ee.classList.remove("bg-primary10");
                                var eee = document.getElementById(`badge${item.key}`)
                                eee.classList.add("bg-gray-300"); eee.classList.remove("bg-primary100");
                            }}
                            onClick={() => { setselectedsubloc(true); setselectedsublocdata(item) }}
                        >
                            <div className="mr-3 flex items-start">
                                <LocationIconSvg id={`icon${item.key}`} size={15} color={`#808080`} />
                            </div>
                            <div className="mr-3">
                                <LabelDark id={`text${item.key}`}>
                                    {beforeStr}
                                    <span className=" text-primary100">{searchvalue}</span>
                                    {afterStr}
                                </LabelDark>
                            </div>
                            <div id={`badge${item.key}`} className="w-5 h-5 rounded-full bg-gray-400 text-white text-2xs flex items-center justify-center">{item.sub_child_count}</div>
                        </div>
                    )
                    :
                    (
                        <div
                            id={`wrap${item.key}`}
                            className={`flex items-start w-full py-2 rounded-md px-2`}
                            onMouseOver={() => {
                                var d = document.getElementById(`text${item.key}`)
                                d.classList.add("text-primary100"); d.classList.remove("text-gray-400")
                                var dd = document.getElementById(`wrap${item.key}`)
                                dd.classList.add("bg-primary10");
                                var ddd = document.getElementById(`badge${item.key}`)
                                ddd.classList.add("bg-primary100"); ddd.classList.remove("bg-gray-300");
                            }}
                            onMouseLeave={() => {
                                var e = document.getElementById(`text${item.key}`)
                                e.classList.add("text-gray-400"); e.classList.remove("text-primary100")
                                var ee = document.getElementById(`wrap${item.key}`)
                                ee.classList.remove("bg-primary10");
                                var eee = document.getElementById(`badge${item.key}`)
                                eee.classList.add("bg-gray-300"); eee.classList.remove("bg-primary100");
                            }}
                            onClick={() => { setselectedsubloc(true); setselectedsublocdata(item) }}
                        >
                            <div className="mr-3 flex items-start">
                                <LocationIconSvg id={`icon${item.key}`} size={15} color={`#808080`} />
                            </div>
                            <div className="mr-3">
                                <LabelDark id={`text${item.key}`}>{item.title}</LabelDark>
                            </div>
                            <div id={`badge${item.key}`} className="w-5 h-5 rounded-full bg-gray-400 text-white text-2xs flex items-center justify-center">{item.sub_child_count}</div>
                        </div>
                    );
            if (item.children) {
                return { title, key: item.key, children: loop(item.children) };
            }
            return {
                title,
                key: item.key
            };
        });

    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getSubCompanyDetail?id=${locid}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setrawdata(res2.data)
                const childmap = modifData(res2.data.sub_children)
                setsubloc(childmap)
                const childmapforinduksublokasi = modifForIndukSubLokasi(res2.data, childmap)
                setinduksubloc(childmapforinduksublokasi)
                res2.data.sub_children.length > 0 ? setexpandedkeys(res2.data.sub_children.map(doc => doc.key)) : setexpandedkeys([])
                setdisplaydata({
                    id: res2.data.id,
                    name: res2.data.name,
                    address: res2.data.address,
                    phone_number: res2.data.phone_number,
                    image_logo: res2.data.image_logo === "-" || res2.data.image_logo === "" ? '/default-users.jpeg' : res2.data.image_logo,
                    singkatan: res2.data.singkatan,
                    tanggal_pkp: res2.data.tanggal_pkp === null ? null : moment(res2.data.tanggal_pkp),
                    penanggung_jawab: res2.data.penanggung_jawab,
                    npwp: res2.data.npwp,
                    fax: res2.data.fax,
                    email: res2.data.email,
                    website: res2.data.website,
                })
                setdynamicattr({
                    email: res2.data.email !== "-" ? true : false,
                    website: res2.data.website !== "-" ? true : false,
                    npwp: res2.data.npwp !== "-" ? true : false,
                    fax: res2.data.fax !== "-" ? true : false,
                    tanggal_pkp: res2.data.tanggal_pkp !== "-" ? true : false,
                })
                settipe(res2.data.level)
                setisenabled(res2.data.is_enabled)
                setpraloadingedit(false)
                setloadingsorted(false)
            })
    }, [sublokasidrawer])

    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyInventories?id=${locid}&page=${page}&rows=${rows}&keyword=`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setrawitems(res2.data)
                setitems(res2.data.data)
                setpraloadingitem(false)
            })
    }, [])

    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getLocations`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                setrawlocations([res2.data])
            })
    }, [])

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className="grid grid-cols-12">
                {
                    praloadingedit ?
                        null
                        :
                        <div className="col-span-3 flex flex-col shadow-md rounded bg-white m-4">
                            <Spin spinning={editloading}>
                                <Form form={instanceForm} initialValues={displaydata}>
                                    <div className="max-h-24 relative">
                                        <img src={`/image/Rectangle.png`} alt="" className="object-fit max-h-24 w-full rounded-t" />
                                        <div className="absolute -bottom-1/2 bg-white left-24 rounded-full">
                                            <img src={displaydata.image_logo} alt="" className="object-contain w-24 h-24 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="mt-14 flex flex-col justify-center text-center">
                                        {
                                            editable &&
                                            <div className="flex mx-auto mb-5">
                                                <Buttonsys type="primaryInput" onChangeGambar={onChangeGambar}>
                                                    {loadingfoto ? <LoadingOutlined style={{ marginRight: `0.5rem` }} /> : <RefreshIconSvg size={15} color={`#ffffff`} />}
                                                    Atur Ulang
                                                </Buttonsys>
                                            </div>
                                        }
                                        {
                                            editable ?
                                                <div className={`flex flex-col px-5`}>
                                                    <div className="flex justify-center">
                                                        <Label>Nama {tipe === 1 ? `Lokasi` : `Sublokasi`}</Label>
                                                        <span className="namaField"></span>
                                                        <style jsx>
                                                            {`
                                                                .namaField::before{
                                                                    content: '*';
                                                                    color: red;
                                                                }
                                                            `}
                                                        </style>
                                                    </div>
                                                    <Form.Item name="name"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Nama Perusahaan wajib diisi',
                                                            },
                                                        ]}>
                                                        <Input name="name" onChange={onChangeInput}></Input>
                                                    </Form.Item>
                                                </div>
                                                :
                                                <H1>{displaydata.name ?? "-"}</H1>
                                        }
                                        <Label>{rawdata.parent.name}</Label>
                                    </div>
                                    {
                                        editable ?
                                            <div className="flex justify-center items-center mt-5">
                                                <div className="mx-1" onClick={() => { seteditable(false) }}>
                                                    <Buttonsys type="default">
                                                        X Batalkan
                                                    </Buttonsys>
                                                </div>
                                                <div className="mx-1" onClick={() => { }}>
                                                    <Buttonsys type="primary" submit={true} onClick={() => { instanceForm.submit(); setmodaledit(true) }}>
                                                        <CheckIconSvg size={15} color={`#ffffff`} />
                                                        Simpan
                                                    </Buttonsys>
                                                </div>
                                            </div>
                                            :
                                            <div className="mt-5 flex justify-center items-center cursor-pointer" onClick={() => { seteditable(true) }}>
                                                <div className="mr-1 mb-1">
                                                    <EditIconSvg size={20} color={`#35763B`} />
                                                </div>
                                                <Label color="green">Sunting Profil</Label>
                                            </div>
                                    }
                                    <div className="mt-7 flex flex-col px-5">
                                        <div className={`flex flex-col mb-5`}>
                                            <Label>Tipe Lokasi</Label>
                                            <p className="mb-0">Level {rawdata.level}</p>
                                        </div>
                                        <div className="flex flex-col mb-5">
                                            <Label>Alamat Perusahaan</Label>
                                            {
                                                editable ?
                                                    <Input name="address" onChange={onChangeInput} defaultValue={displaydata.address ?? "-"}></Input>
                                                    :
                                                    <p className="mb-0">{displaydata.address ?? "-"}</p>
                                            }
                                        </div>
                                        <div className="flex flex-col mb-5">
                                            <Label>Penanggung Jawab (PIC)</Label>
                                            {
                                                editable ?
                                                    <Input name="penanggung_jawab" onChange={onChangeInput} defaultValue={displaydata.penanggung_jawab ?? "-"}></Input>
                                                    :
                                                    <p className="mb-0">{displaydata.penanggung_jawab ?? "-"}</p>
                                            }
                                        </div>
                                        <div className="flex flex-col mb-5">
                                            <Label>No.Telp</Label>
                                            {
                                                editable ?
                                                    <Input name="phone_number" onChange={onChangeInput} prefix={<PhoneIconSvg size={15} color={`#35763B`} />} defaultValue={displaydata.phone_number ?? "-"}></Input>
                                                    :
                                                    <div className="flex">
                                                        <div className="mr-1">
                                                            <PhoneIconSvg size={20} color={`#35763B`} />
                                                        </div>
                                                        <a href={`tel:${displaydata.phone_number}`} className="text-primary100 hover:text-primary75">{displaydata.phone_number}</a>
                                                    </div>
                                            }
                                        </div>
                                        {
                                            displaydata.npwp !== "-" &&
                                            <div className="flex flex-col mb-5">
                                                {
                                                    !editable &&
                                                    <>
                                                        <Label>NPWP</Label>
                                                        <p className="mb-0">{displaydata.npwp ?? "-"}</p>
                                                    </>
                                                }
                                            </div>
                                        }
                                        {
                                            displaydata.tanggal_pkp !== "-" &&
                                            <div className="flex flex-col mb-5">
                                                {
                                                    !editable &&
                                                    <>
                                                        <Label>Tanggal PKP</Label>
                                                        <p className="mb-0">{displaydata.tanggal_pkp === "-" ? "-" : moment(displaydata.tanggal_pkp).locale("id").format("LL")}</p>
                                                    </>
                                                }
                                            </div>
                                        }
                                        {
                                            displaydata.email !== "-" &&
                                            <div className="flex flex-col mb-5">
                                                {
                                                    !editable &&
                                                    <>
                                                        <Label>Email</Label>
                                                        <div className="flex">
                                                            <div className="mr-1">
                                                                <EmailIconSvg size={20} color={`#35763B`} />
                                                            </div>
                                                            <a href={`mailto:${displaydata.email}`} className="text-primary100 hover:text-primary75">{displaydata.email}</a>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        }
                                        {
                                            displaydata.fax !== "-" &&
                                            <div className="flex flex-col mb-5">
                                                {
                                                    !editable &&
                                                    <>
                                                        <Label>Fax</Label>
                                                        <div className="flex">
                                                            <div className="mr-1">
                                                                <FaxIconSvg size={20} color={`#35763B`} />
                                                            </div>
                                                            <a href={`${displaydata.fax}`} className="text-primary100 hover:text-primary75">{displaydata.fax}</a>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        }
                                        {
                                            displaydata.website !== "-" &&
                                            <div className="flex flex-col mb-5">
                                                {
                                                    !editable &&
                                                    <>
                                                        <Label>Website</Label>
                                                        <div className="flex">
                                                            <div className="mr-1">
                                                                <WebIconSvg size={20} color={`#35763B`} />
                                                            </div>
                                                            <a href={`${displaydata.website}`} className="text-primary100 hover:text-primary75">{displaydata.website}</a>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        }
                                        {
                                            editable &&
                                            <>
                                                {dynamicattr.email && <InputNotRequired name="email" onChangeInput={onChangeInputNotRequired} defaultValue={displaydata.email} label="Email"></InputNotRequired>}
                                                {dynamicattr.website && <InputNotRequired name="website" onChangeInput={onChangeInputNotRequired} defaultValue={displaydata.website} label="Website"></InputNotRequired>}
                                                {dynamicattr.npwp && <InputNotRequired name="npwp" onChangeInput={onChangeInputNotRequired} defaultValue={displaydata.npwp} label="NPWP"></InputNotRequired>}
                                                {dynamicattr.fax && <InputNotRequired name="fax" onChangeInput={onChangeInputNotRequired} defaultValue={displaydata.fax} label="Fax"></InputNotRequired>}
                                                {dynamicattr.tanggal_pkp && <DateNotRequired name="tanggal_pkp" onChangeDate={onchangeDate} label="Tanggal PKP" defaultValue={displaydata.tanggal_pkp === null ? null : moment(displaydata.tanggal_pkp)}></DateNotRequired>}
                                            </>
                                        }
                                        {
                                            editable &&
                                            <div className="mb-5 flex flex-col">
                                                <div className="mb-3">
                                                    <Label>Informasi Tambahan</Label>
                                                </div>
                                                {!dynamicattr.email &&
                                                    <div className="flex justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <div className="mr-2">
                                                                <EmailIconSvg size={18} color={`#808080`} />
                                                            </div>
                                                            Email
                                                        </div>
                                                        <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, email: true }) }}>
                                                            <SquarePlusIconSvg size={18} color={`#808080`} />
                                                        </div>
                                                    </div>
                                                }
                                                {!dynamicattr.website &&
                                                    <div className="flex justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <div className="mr-2">
                                                                <WebIconSvg size={18} color={`#808080`} />
                                                            </div>
                                                            Website
                                                        </div>
                                                        <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, website: true }) }}>
                                                            <SquarePlusIconSvg size={18} color={`#808080`} />
                                                        </div>
                                                    </div>
                                                }
                                                {!dynamicattr.npwp &&
                                                    <div className="flex justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <div className="mr-2">
                                                                <NotesIconSvg size={18} color={`#808080`} />
                                                            </div>
                                                            NPWP
                                                        </div>
                                                        <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, npwp: true }) }}>
                                                            <SquarePlusIconSvg size={18} color={`#808080`} />
                                                        </div>
                                                    </div>
                                                }
                                                {!dynamicattr.fax &&
                                                    <div className="flex justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <div className="mr-2">
                                                                <FaxIconSvg size={18} color={`#808080`} />
                                                            </div>
                                                            Fax
                                                        </div>
                                                        <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, fax: true }) }}>
                                                            <SquarePlusIconSvg size={18} color={`#808080`} />
                                                        </div>
                                                    </div>
                                                }
                                                {!dynamicattr.tanggal_pkp &&
                                                    <div className="flex justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <div className="mr-2">
                                                                <PkpIconSvg size={18} color={`#808080`} />
                                                            </div>
                                                            Tanggal PKP
                                                        </div>
                                                        <div className="cursor-pointer" onClick={() => { setdynamicattr({ ...dynamicattr, tanggal_pkp: true }) }}>
                                                            <SquarePlusIconSvg size={18} color={`#808080`} />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                                        <div className={`flex flex-col mb-5`}>
                                            <Label>Total Sub-Location Level 1</Label>
                                            <p className="mb-0">{rawdata.sub_location_level_1_count}</p>
                                        </div>
                                        <div className={`flex flex-col mb-5`}>
                                            <Label>Total Sub-Location Level 2</Label>
                                            <p className="mb-0">{rawdata.sub_location_level_2_count}</p>
                                        </div>
                                        <div className={`flex flex-col mb-5`}>
                                            <Label>Total Sub-Location Level 2</Label>
                                            <p className="mb-0">{rawdata.sub_location_level_2_count}</p>
                                        </div>
                                        {
                                            editable &&
                                            <div className="flex justify-center items-center mb-10">
                                                <Buttonsys /*disabled={rawdata.induk_level_1_count > 0 ? true : false}*/ type="primary" color="danger" onClick={() => {
                                                    // if (tipe === 1) {
                                                    setmodalcheckchild(true)
                                                    // }
                                                }}>
                                                    <div className="mr-1">
                                                        <TrashIconSvg size={18} color={"#FFFFFF"} />
                                                    </div>
                                                    Hapus Lokasi
                                                </Buttonsys>
                                            </div>
                                        }
                                    </div>
                                </Form>
                                <ModalEdit
                                    title={`Konfirmasi Edit Perusahaan`}
                                    visible={modaledit}
                                    onCancel={() => { setmodaledit(false) }}
                                    footer={
                                        <div className="flex justify-between items-center">
                                            <Buttonsys type="default" onClick={() => { setmodaledit(false) }}>
                                                Batalkan
                                            </Buttonsys>
                                            <Buttonsys type="primary" onClick={handleEdit}>
                                                <CheckIconSvg size={15} color={`#ffffff`} />
                                                Simpan
                                            </Buttonsys>
                                        </div>
                                    }
                                ></ModalEdit>
                                <ModalHapusLokasiCekChild
                                    title={<strong>Sebelum menghapus {tipe === 1 ? `lokasi induk` : `Sublokasi`}...</strong>}
                                    visible={modalcheckchild}
                                    onCancel={() => { setmodalcheckchild(false) }}
                                    footer={
                                        <Spin spinning={loadingdelete}>
                                            <div className="flex justify-between items-center">
                                                <Buttonsys type="default" onClick={() => { setdeletedata({ ...deletedata, new_parent: null }); setmodalcheckchild(false) }}>
                                                    Batalkan
                                                </Buttonsys>
                                                <div className="flex items-center justify-end">
                                                    <div className="mr-5">
                                                        <Buttonsys /*disabled={rawdata.induk_level_1_count > 0 ? true : false}*/ type="primary" onClick={() => { setmodalcheckchild(false); setmodalmove(true) }}>
                                                            <MoveIconSvg size={15} />
                                                            Pindahkan Inventori
                                                        </Buttonsys>
                                                    </div>
                                                    <Buttonsys /*disabled={rawdata.induk_level_1_count > 0 ? true : false}*/ type="primary" color="danger" onClick={() => {
                                                        if (tipe === 1) {
                                                            handleDelete()
                                                        }
                                                        else {
                                                            setmodalcheckchild(false)
                                                            setmodalconfirm(true)
                                                        }
                                                    }}>
                                                        <TrashIconSvg size={15} color={`#ffffff`} />
                                                        Hapus Lokasi
                                                    </Buttonsys>
                                                </div>
                                            </div>
                                        </Spin>
                                    }
                                    subloc={subloc}
                                    rawdata={rawdata}
                                ></ModalHapusLokasiCekChild>
                                <ModalHapusLokasiMoveChild
                                    title={<strong>{rawdata.level === 1 ? `Peringatan` : `Pemindahan Inventori`}</strong>}
                                    visible={modalmove}
                                    footer={
                                        <Spin spinning={loadingdelete}>
                                            <div className="flex justify-between items-center">
                                                <Buttonsys type="default" onClick={() => { setdeletedata({ ...deletedata, new_parent: null }); setmodalmove(false); setmodalcheckchild(true) }}>
                                                    Batalkan
                                                </Buttonsys>
                                                <div className="flex items-center">
                                                    <Buttonsys disabled={deletedata.new_parent === null ? true : false} type="primary" color="danger" onClick={handleDelete}>
                                                        <TrashIconSvg size={15} color={`#ffffff`} />
                                                        Lanjutkan penghapusan
                                                    </Buttonsys>
                                                </div>
                                            </div>
                                        </Spin>
                                    }
                                    rawdata={rawdata}
                                    rawlocations={rawlocations}
                                    deletedata={deletedata}
                                    setdeletedata={setdeletedata}
                                    initProps={initProps}
                                ></ModalHapusLokasiMoveChild>
                                {/* Hanya untuk Lokasi */}
                                <ModalHapusInventoryExist
                                    title={<strong>Tidak dapat menghapus Lokasi</strong>}
                                    visible={modalinvexist}
                                    footer={
                                        <div className="flex justify-end items-center">
                                            <Buttonsys type="primary" onClick={() => { setmodalinvexist(false); setmodalcheckchild(true) }}>
                                                <div className="mr-2">
                                                    <BackIconSvg size={15} color={`#ffffff`} />
                                                </div>
                                                Kembali
                                            </Buttonsys>
                                        </div>
                                    }
                                    invexistdata={datainvexist}
                                ></ModalHapusInventoryExist>
                                {/* Hanya untuk Sublokasi */}
                                <ModalHapusLokasiConfirm
                                    title={<strong>Peringatan</strong>}
                                    visible={modalconfirm}
                                    footer={
                                        <Spin spinning={loadingdelete}>
                                            <div className="flex justify-between items-center">
                                                <Buttonsys type="default" onClick={() => { setdeletedata({ ...deletedata, new_parent: null }); setmodalconfirm(false); setmodalcheckchild(true) }}>
                                                    Batalkan
                                                </Buttonsys>
                                                <div className="flex items-center">
                                                    <Buttonsys type="primary" color="danger" onClick={handleDelete}>
                                                        <TrashIconSvg size={15} color={`#ffffff`} />
                                                        Ya, saya yakin dan hapus lokasi
                                                    </Buttonsys>
                                                </div>
                                            </div>
                                        </Spin>
                                    }
                                    rawdata={rawdata}
                                    deletedata={deletedata}
                                ></ModalHapusLokasiConfirm>
                            </Spin>
                        </div>
                }
                <div className="col-span-9 flex flex-col">
                    <div className="flex flex-col shadow-md rounded-md bg-white p-5 m-4">
                        <div className="flex mb-5">
                            <div className="w-4/12">
                                <H1>Semua Aset</H1>
                            </div>
                            <div className="w-8/12 flex justify-end">
                                <div className="mx-2">
                                    <Input style={{ width: `20rem` }} placeholder="Cari ID, Tipe Aset, Model" onChange={onSearchItems} allowClear />
                                </div>
                            </div>
                        </div>
                        <div>
                            <TableCustom
                                dataSource={items}
                                setDataSource={setitems}
                                columns={columnitems}
                                loading={praloadingitem}
                                setloading={setpraloadingitem}
                                pageSize={rows}
                                total={rawitems.total}
                                initProps={initProps}
                                setpage={setpage}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-7">
                        <div className=" col-span-5 flex flex-col shadow-md rounded-md bg-white p-5 mt-4 ml-4 mb-4 mr-2">
                            <div className=" mb-3">
                                <H1>Daftar Sublokasi</H1>
                            </div>
                            <div className="flex justify-around mb-5">
                                <div className="mx-0">
                                    <Input placeholder="Cari Sublokasi" style={{ backgroundColor: `transparent` }} onChange={onChangeFilterSubLoc} />
                                </div>
                                <div className="mx-0">
                                    <Buttonsys type="ghost" selected={sortedbtn === true ? true : false} onClick={() => { onSortSubLoc(sorted === -1 ? true : !sorted) }}>
                                        <SortingIconSvg size={12} color={`#35763B`} />
                                        Urutkan: {sortedname}
                                    </Buttonsys>
                                </div>
                                <div className="mx-0">
                                    <Buttonsys type="primary" onClick={() => { setsublokasidrawer(true) }}>
                                        + Tambah Sublokasi
                                    </Buttonsys>
                                </div>
                            </div>
                            <div className="mb-5">
                                {
                                    loadingsorted ?
                                        <>
                                            <Spin />
                                        </>
                                        :
                                        subloc.length === 0 ?
                                            <>
                                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                            </>
                                            :
                                            <Tree
                                                onExpand={onExpand}
                                                className="treeClientSublokasi"
                                                showIcon
                                                filterTreeNode={filterTreeNode}
                                                autoExpandParent={true}
                                                expandedKeys={expandedkeys}
                                                treeData={loop(subloc)}
                                                switcherIcon={<DownOutlined />}
                                                style={{ background: `white` }}
                                                blockNode={true}
                                            >
                                            </Tree>
                                }
                            </div>
                        </div>
                        {
                            selectedsubloc ?
                                <div className=" col-span-2 flex flex-col shadow-md rounded-md bg-white p-5 mt-2 ml-2 mb-4 mr-4">
                                    <div className=" mb-5 flex justify-center">
                                        {
                                            selectedsublocdata.image_logo === "" ?
                                                <div className="w-30 h-30 rounded-full bg-gray-400 flex justify-center items-center">
                                                    <CameraIconSvg size={25} color={`#ffffff`} />
                                                </div>
                                                :
                                                <img src={selectedsublocdata.image_logo} className="object-contain w-20 h-20 rounded-full" alt="" />
                                        }
                                    </div>
                                    <div className="flex flex-col items-center mb-5">
                                        <div className="mb-2">
                                            <H1>{selectedsublocdata.title}</H1>
                                        </div>
                                        <div className="mb-4">
                                            <Label>{selectedsublocdata.parent_name}</Label>
                                        </div>
                                        <a href={`/company/clients/locations/${selectedsublocdata.id}`} target="_blank">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <Label color="green" cursor="pointer">Lihat Detail</Label>
                                                </div>
                                                <ExternalLinkIconSvg size={15} color={`#35763B`} />
                                            </div>
                                        </a>
                                    </div>
                                    <div className="flex flex-col mb-5">
                                        <div className="mb-2">
                                            <Label>Tipe Sublokasi</Label>
                                            <Text>Level {selectedsublocdata.level}</Text>
                                        </div>
                                        <div className="mb-2">
                                            <Label>Jumlah Aset</Label>
                                            <Text>{selectedsublocdata.inventories_count}</Text>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        }
                        <DrawerSublokasi
                            title={"Tambah Sublokasi"}
                            visible={sublokasidrawer}
                            onClose={() => { setsublokasidrawer(false) }}
                            buttonOkText={"Simpan Sublokasi"}
                            initProps={initProps}
                            onvisible={setsublokasidrawer}
                            subchildren={induksubloc}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const locid = params.locId
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

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "52",
            locid
        },
    }
}

export default ClientLocationDetail
