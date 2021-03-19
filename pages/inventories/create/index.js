import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import httpcookie from 'cookie'
import { Button, Form,Input,InputNumber,Select,DatePicker,TreeSelect,Checkbox,Spin,notification } from 'antd'
import Sticky from 'wil-react-sticky'
import Layout from '../../../components/layout-dashboard2'
import st from '../../../components/layout-dashboard.module.css'

function InventoryCreate({ initProps, dataProfile, dataAssetsList, dataVendorsList, sidemenu }) {
    const rt = useRouter()
    const { originPath } = rt.query
    const { Option } = Select
    const pathArr = rt.pathname.split("/").slice(1)
    const [createInventoryForm] = Form.useForm();
    if (!dataVendorsList.data) {
        dataVendorsList.data = []
    }
    const [isdynamic, setIsdynamic] = useState(false)
    const [loadingdynamic, setLoadingdynamic] = useState(false)
    const [datadynamic, setDatadynamic] = useState([])
    const [datadynamic2, setDatadynamic2] = useState([])
    const [datadynamic3, setDatadynamic3] = useState([])
    const [objdynamic, setobjdynamic] = useState({})
    const [loadingbtnsubmit, setloadingbtnsubmit] = useState(false)
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
    const [datanew, setDatanew] = useState({
        asset_id: 0,
        vendor_id: 0,
        asset_code: '',
        asset_name: '',
        mig_number: '',
        serial_number: '',
        model: '',
        invoice_label: '',
        status: '',
        kepemilikan: '',
        kondisi: '',
        tanggal_beli: new Date().toLocaleDateString(),
        harga_beli: 0,
        tanggal_efektif: new Date().toLocaleDateString(),
        depresiasi: 0,
        nilai_sisa: 0,
        nilai_buku: 0,
        masa_pakai: 0,
        lokasi: '',
        departmen: '',
        service_point: '',
        gudang: '',
        used_by: '',
        managed_by: '',
        inventory_values: datadynamic2
    })
    const onChangeInventory = (e) => {
        const val = e.target.value
        setDatanew({
            ...datanew,
            [e.target.name]: val
        })
    }
    const onChangeInventoryType = (value) => {
        setLoadingdynamic(true)
        var dataAssetDetail = {}
        flattenDataAsset.forEach(item => {
            if (item.value == value) {
                dataAssetDetail = item
            }
        })
        fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryColumns?id=${dataAssetDetail.id}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            }
        })
            .then(res => res.json())
            .then(res2 => {
                if (!res2.data || res2.data === typeof (undefined)) {
                    setLoadingdynamic(false)
                    setIsdynamic(false)
                }
                else {
                    setIsdynamic(true)
                    setDatadynamic(res2.data.inventory_columns)
                    setDatadynamic2(res2.data.inventory_columns.map((doc, idx) => (
                        {
                            inventory_column_id: doc.id,
                            value: doc.default
                        }
                    )))
                    setDatadynamic3(res2.data.inventory_columns.map((doc, idx) => (
                        {
                            inventory_column_id: doc.id,
                            value: doc.default
                        }
                    )))
                    setDatanew({
                        ...datanew,
                        asset_id: dataAssetDetail.id,
                        asset_code: value,
                        inventory_values: res2.data.inventory_columns.map((doc, idx) => (
                            {
                                inventory_column_id: doc.id,
                                value: doc.default
                            }
                        ))
                    })
                    res2.data.inventory_columns.map((doc, idx) => {
                        setobjdynamic({
                            ...objdynamic,
                            [doc.name]: doc.default
                        })
                    })
                    setLoadingdynamic(false)
                }
            })
    }
    const onChangeDynamic = (e, idInvCol) => {
        const idx = datadynamic2.map((doc, idx) => { return doc.inventory_column_id }).indexOf(idInvCol)
        var items = [...datadynamic2]
        items[idx] = {
            inventory_column_id: idInvCol,
            value: e.target.value
        }
        setDatadynamic2(items)
        setDatanew({
            ...datanew,
            inventory_values: items
        })
    }
    const onChangeDynamicAnt1 = (value, idInvCol) => {
        const idx = datadynamic2.map((doc, idx) => { return doc.inventory_column_id }).indexOf(idInvCol)
        var items = [...datadynamic2]
        items[idx] = {
            inventory_column_id: idInvCol,
            value: value
        }
        setDatadynamic2(items)
        setDatanew({
            ...datanew,
            inventory_values: items
        })
    }
    const handleSubmitInventory = () => {
        setloadingbtnsubmit(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/addInventory`, {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datanew)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingbtnsubmit(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/inventories?originPath=Inventories`)
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
    return (
        <Layout tok={initProps} pathArr={pathArr} dataProfile={dataProfile} dataAssetsList={dataAssetsList} sidemenu={sidemenu} originPath={originPath} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-4 border-r p-5" id="formWrappper">
                    <Sticky containerSelectorFocus="#formWrapper">
                        <div className="flex justify-between p-5 w-full h-auto bg-white border-b mb-8">
                            <div className=" font-semibold">Inventori Baru</div>
                            <div className="flex">
                                <Link href={`/inventories?originPath=Admin`}>
                                    <Button type="default" size="middle" style={{ marginRight: `1rem` }}>Batalkan</Button>
                                </Link>
                                <Button type="primary" size="middle" onClick={createInventoryForm.submit} loading={loadingbtnsubmit}>Submit</Button>
                            </div>
                        </div>
                    </Sticky>
                    <div className="flex flex-col">
                        <div className="mb-10 shadow-md rounded-md w-full h-auto bg-white p-5 relative border-2">
                            <div className="absolute w-auto px-5 h-10 bg-white font-semibold left-10 -top-3">Data Mandatory</div>
                            <Form layout="vertical" form={createInventoryForm} onFinish={handleSubmitInventory}>
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <Form.Item name="asset_type" style={{ marginRight: `1rem` }} label="Tipe Asset"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Tipe Asset harus diisi',
                                            },
                                        ]}>
                                        <TreeSelect
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={dataAssetsList.data}
                                            placeholder="Pilih Tipe Asset"
                                            treeDefaultExpandAll
                                            onChange={(value) => onChangeInventoryType(value)}
                                            allowClear
                                            required
                                        />
                                    </Form.Item>
                                    <Form.Item name="vendor" style={{ marginRight: `1rem` }} label="Vendor"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vendor harus diisi',
                                            },
                                        ]}>
                                        <Select onChange={(value) => { setDatanew({ ...datanew, vendor_id: value }) }} name="vendor" placeholder="Pilih Vendor" allowClear>
                                            {
                                                dataVendorsList.data.map((doc, idx) => {
                                                    return (
                                                        <Option value={doc.id}>{doc.name} {doc.singkatan_nama && <>({doc.singkatan_nama})</>}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="asset_name" style={{ marginRight: `1rem` }} label="Nama"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama inventory harus diisi',
                                            },
                                        ]}
                                    >
                                        <Input onChange={onChangeInventory} name="asset_name" id="assetName" allowClear />
                                    </Form.Item>
                                    <Form.Item name="mig_number" style={{ marginRight: `1rem` }} label="MIG Number">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, mig_number: value }) }} name="mig_number" id="mig_number" allowClear style={{ width: `100%` }} />
                                    </Form.Item>
                                    <Form.Item name="serial_number" style={{ marginRight: `1rem` }} label="Serial Number">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, serial_number: value }) }} name="serial_number" id="serial_number" allowClear style={{ width: `100%` }} />
                                    </Form.Item>
                                    <Form.Item name="model" style={{ marginRight: `1rem` }} label="Model">
                                        <Input onChange={onChangeInventory} name="model" id="model" allowClear />
                                    </Form.Item>
                                    <Form.Item name="invoice_label" style={{ marginRight: `1rem` }} label="Invoice Label">
                                        <Input onChange={onChangeInventory} name="invoice_label" id="invoiceLabel" allowClear />
                                    </Form.Item>
                                    <Form.Item name="status" style={{ marginRight: `1rem` }} label="Status"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Status harus diisi',
                                            },
                                        ]}>
                                        <Select onChange={(value) => { setDatanew({ ...datanew, status: value }) }} name="status" allowClear>
                                            <Option value="ready">Ready</Option>
                                            <Option value="leased">Leased</Option>
                                            <Option value="used">Used</Option>
                                            <Option value="return">Return</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="kepemilikan" style={{ marginRight: `1rem` }} label="Kepemilikan"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Kepemilikan harus diisi',
                                            },
                                        ]}>
                                        <Select onChange={(value) => { setDatanew({ ...datanew, kepemilikan: value }) }} name="kepemilikan" allowClear>
                                            <Option value="milikSendiri">Milik Sendiri</Option>
                                            <Option value="PT.MIG">PT. MIG</Option>
                                            <Option value="BankBukopin">Bank Bukopin</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="kondisi" style={{ marginRight: `1rem` }} label="Kondisi">
                                        <Select onChange={(value) => { setDatanew({ ...datanew, kondisi: value }) }} name="kondisi" allowClear>
                                            <Option value="baik">Baik</Option>
                                            <Option value="rusakRingan">Rusak ringan</Option>
                                            <Option value="rusakBerat">Rusak berat</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="tanggal_beli" style={{ marginRight: `1rem` }} label="Tanggal Beli">
                                        <DatePicker onChange={(date, dateString) => { setDatanew({ ...datanew, tanggal_beli: dateString }) }} name="tanggal_beli" allowClear format={'YYYY-MM-DD'} />
                                    </Form.Item>
                                    <Form.Item name="harga_beli" style={{ marginRight: `1rem` }} label="Harga Beli">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, harga_beli: value }) }} name="harga_beli" id="harga_beli" allowClear style={{ width: `100%` }} />
                                    </Form.Item>
                                    <Form.Item name="tanggal_efektif" style={{ marginRight: `1rem` }} label="Tanggal Efektif">
                                        <DatePicker onChange={(date, dateString) => { setDatanew({ ...datanew, tanggal_efektif: dateString }) }} name="tanggal_efektif" allowClear format={'YYYY-MM-DD'} />
                                    </Form.Item>
                                    <Form.Item name="depresiasi" style={{ marginRight: `1rem` }} label="Depresiasi">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, depresiasi: value }) }} name="depresiasi" id="depresiasi" allowClear style={{ width: `100%` }} />
                                    </Form.Item>
                                    <Form.Item name="nilai_sisa" style={{ marginRight: `1rem` }} label="Nilai Sisa">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, nilai_sisa: value }) }} name="nilai_sisa" id="nilai_sisa" allowClear style={{ width: `100%` }} />
                                    </Form.Item>
                                    <Form.Item name="nilai_buku" style={{ marginRight: `1rem` }} label="Nilai Buku">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, nilai_buku: value }) }} name="nilai_buku" id="nilai_buku" allowClear style={{ width: `100%` }} />
                                    </Form.Item>
                                    <Form.Item name="masa_pakai" style={{ marginRight: `1rem` }} label="Masa Pakai">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, masa_pakai: value }) }} name="masa_pakai" id="masa_pakai" allowClear style={{ width: `100%` }} />
                                    </Form.Item>
                                    <Form.Item name="lokasi" style={{ marginRight: `1rem` }} label="Lokasi">
                                        <Input onChange={onChangeInventory} name="lokasi" id="lokasi" allowClear />
                                    </Form.Item>
                                    <Form.Item name="departmen" style={{ marginRight: `1rem` }} label="Departmen">
                                        <Select onChange={(value) => { setDatanew({ ...datanew, departmen: value }) }} name="departmen" allowClear>
                                            <Option value="keuangan">Keuangan</Option>
                                            <Option value="penagihan">Penagihan</Option>
                                            <Option value="pajak">Pajak</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="service_point" style={{ marginRight: `1rem` }} label="Service Point">
                                        <Input onChange={onChangeInventory} name="service_point" id="service_point" allowClear />
                                    </Form.Item>
                                    <Form.Item name="gudang" style={{ marginRight: `1rem` }} label="Gudang">
                                        <Input onChange={onChangeInventory} name="gudang" id="gudang" allowClear />
                                    </Form.Item>
                                    <Form.Item name="used_by" style={{ marginRight: `1rem` }} label="Used_by">
                                        <Input onChange={onChangeInventory} name="used_by" id="used_by" allowClear />
                                    </Form.Item>
                                    <Form.Item name="managed_by" style={{ marginRight: `1rem` }} label="Managed_by">
                                        <Input onChange={onChangeInventory} name="managed_by" id="managed_by" allowClear />
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                        <div className="mb-5 shadow-md rounded-md w-full h-auto bg-white p-5 relative border-2">
                            <div className="absolute w-auto px-5 h-10 bg-white font-semibold left-10 -top-3">Data Turunan</div>
                            {
                                !isdynamic ?
                                    <Spin spinning={loadingdynamic}>
                                        <div id="emptyDynamic" className="h-20 flex justify-center items-center">
                                            <div className="text-gray-300 text-base">Pilih Tipe Asset terlebih dahulu untuk memunculkan input baru</div>
                                        </div>
                                    </Spin>
                                    :
                                    <>
                                        {
                                            datadynamic.map((doc, idx) => {
                                                return (
                                                    <div className="grid grid-cols-1 md:grid-cols-2" key={idx}>
                                                        {
                                                            doc.required ?
                                                                <Form.Item name={doc.name} style={{ marginRight: `1rem` }} label={doc.name}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: `${doc.name} harus diisi`,
                                                                        },
                                                                    ]} initialValue={objdynamic}
                                                                >
                                                                    {doc.data_type === "text" &&
                                                                        <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.default} required />}
                                                                    {doc.data_type === "number" &&
                                                                        <InputNumber name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} id={doc.name} allowClear style={{ width: `100%` }} defaultValue={doc.default} required />}
                                                                    {doc.data_type === "decimal" &&
                                                                        <InputNumber name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} id={doc.name} allowClear style={{ width: `100%` }} defaultValue={doc.default} required />}
                                                                    {doc.data_type === "textarea" &&
                                                                        <Input.TextArea step="" name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.default} required />}
                                                                    {doc.data_type === "checkbox" &&
                                                                        <div><Checkbox name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} allowClear defaultValue={doc.default} required /> {doc.name}</div>}
                                                                    {doc.data_type === "select" &&
                                                                        <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.default} required />
                                                                    }
                                                                    {doc.data_type === "tree" &&
                                                                        <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.default} required />
                                                                    }
                                                                    {doc.data_type === "date" &&
                                                                        <DatePicker name={doc.name} defaultValue={doc.default} onChange={(date, dateString) => { onChangeDynamicAnt1(date, doc.id) }} allowClear required />
                                                                    }
                                                                </Form.Item>
                                                                :
                                                                <Form.Item name={doc.name} style={{ marginRight: `1rem` }} label={doc.name}>
                                                                    {doc.data_type === "text" &&
                                                                        <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.default} required />}
                                                                    {doc.data_type === "number" &&
                                                                        <InputNumber name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} id={doc.name} allowClear style={{ width: `100%` }} defaultValue={doc.default} />}
                                                                    {doc.data_type === "decimal" &&
                                                                        <InputNumber name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} id={doc.name} allowClear style={{ width: `100%` }} defaultValue={doc.default} />}
                                                                    {doc.data_type === "textarea" &&
                                                                        <Input.TextArea step="" name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.default} />}
                                                                    {doc.data_type === "checkbox" &&
                                                                        <div><Checkbox name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} allowClear defaultValue={doc.default} /> {doc.name}</div>}
                                                                    {doc.data_type === "select" &&
                                                                        <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.default} />
                                                                    }
                                                                    {doc.data_type === "tree" &&
                                                                        <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.default} />
                                                                    }
                                                                    {doc.data_type === "date" &&
                                                                        <DatePicker name={doc.name} defaultValue={doc.default} onChange={(date, dateString) => { onChangeDynamicAnt1(date, doc.id) }} allowClear />
                                                                    }
                                                                </Form.Item>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
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

    const resourcesGV = await fetch(`https://boiling-thicket-46501.herokuapp.com/getVendors`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
        }
    })
    const resjsonGV = await resourcesGV.json()
    const dataVendorsList = resjsonGV

    return {
        props: {
            initProps,
            dataProfile,
            dataAssetsList,
            dataVendorsList,
            sidemenu: "4"
        }
    }
}

export default InventoryCreate