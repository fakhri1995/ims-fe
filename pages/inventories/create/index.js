import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import httpcookie from 'cookie'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
import TreeSelect from 'antd/lib/tree-select'
import Layout from '../../../components/layout-dashboard'
import st from '../../../components/layout-dashboard.module.css'

function InventoryCreate({ initProps, dataProfile, dataAssetsList, sidemenu }) {
    const rt = useRouter()
    const { originPath } = rt.query
    const { Option } = Select
    const pathArr = rt.pathname.split("/").slice(1)
    const [valuetype, setValuetype] = useState("")
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
    // var dataAssetDetail = {}
    // flattenDataAsset.forEach(item => {
    //     if (item.value == valuetype) {
    //         dataAssetDetail = item
    //     }
    // })
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
        tanggal_beli: '',
        harga_beli: '',
        tanggal_efektif: '',
        depresiasi: 0,
        nilai_sisa: 0,
        nilai_buku: 0,
        masa_pakai: 0,
        lokasi: '',
        departmen: '',
        service_point: '',
        gudang: '',
        used_by: '',
        managed_by: ''
    })
    const onChangeInventory = (e) => {
        const val = e.target.value
        setDatanew({
            ...datanew,
            [e.target.name]: val
        })
    }
    const onChangeInventoryType = (value) => {
        setDatanew({
            ...datanew,
            asset_code: value
        })
        console.log("isi change type: "+ datanew.asset_code)
        setValuetype(value)
        var dataAssetDetail = {}
        flattenDataAsset.forEach(item => {
            if (item.value == valuetype) {
                dataAssetDetail = item
            }
        })
        setDatanew({
            ...datanew,
            asset_id: dataAssetDetail.id
        })
    }
    const handleSubmitInventory = () => {
        console.log("isi:: " + datanew.asset_code)
    }
    // useEffect(()=>{
    // if (valuetype !== "") {
    //     setDatanew({
    //         ...datanew,
    //         asset_id: dataAssetDetail.id
    //     })
    // }
    // })
    return (
        <Layout tok={initProps} pathArr={pathArr} dataProfile={dataProfile} dataAssetsList={dataAssetsList} sidemenu={sidemenu} originPath={originPath} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-4 border-r p-5">
                    <div className="flex justify-between p-5 w-full h-auto bg-white border-b mb-8">
                        <div className=" font-semibold">New Inventory</div>
                        <div className="flex">
                            <Link href={`/inventory?originPath=Admin`}>
                                <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md mr-5">Cancel</button>
                            </Link>
                            <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md" onClick={handleSubmitInventory}>Submit</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-5 shadow-md rounded-md w-full h-auto bg-white p-5">
                            <Form layout="vertical">
                                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                                    <Form.Item name="asset_type" style={{ marginRight: `1rem` }} label="Tipe Asset">
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
                                        {/* <Input onChange={onChangeInventory} name="status" id="status" allowClear /> */}
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
                                        {/* <Input onChange={onChangeInventory} name="kepemilikan" id="kepemilikan" allowClear /> */}
                                    </Form.Item>
                                    <Form.Item name="kondisi" style={{ marginRight: `1rem` }} label="Kondisi">
                                        <Select onChange={(value) => { setDatanew({ ...datanew, kondisi: value }) }} name="kondisi" allowClear>
                                            <Option value="baik">Baik</Option>
                                            <Option value="rusakRingan">Rusak ringan</Option>
                                            <Option value="rusakBerat">Rusak berat</Option>
                                        </Select>
                                        {/* <Input onChange={onChangeInventory} name="kepemilikan" id="kepemilikan" allowClear /> */}
                                    </Form.Item>
                                    <Form.Item name="tanggal_beli" style={{ marginRight: `1rem` }} label="Tanggal Beli">
                                        <DatePicker onChange={(date, dateString) => { setDatanew({ ...datanew, tanggal_beli: date }) }} name="tanggal_beli" allowClear />
                                    </Form.Item>
                                    <Form.Item name="harga_beli" style={{ marginRight: `1rem` }} label="Harga Beli">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, harga_beli: value }) }} name="harga_beli" id="harga_beli" allowClear style={{ width: `100%` }} />
                                    </Form.Item>
                                    <Form.Item name="tanggal_efektif" style={{ marginRight: `1rem` }} label="Tanggal Efektif">
                                        <DatePicker onChange={(date, dateString) => { setDatanew({ ...datanew, tanggal_efektif: date }) }} name="tanggal_efektif" allowClear />
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
                                        {/* <Input onChange={onChangeInventory} name="departmen" id="departmen" allowClear /> */}
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