import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import httpcookie from 'cookie'
import { Button, notification, Checkbox, Form, Input, InputNumber, Select, DatePicker, TreeSelect } from 'antd'
import Sticky from 'wil-react-sticky'
import moment from 'moment'
import Layout from '../../../components/layout-dashboard2'
import st from '../../../components/layout-dashboard.module.css'

function InventoryUpdate({ initProps, dataProfile, dataAssetsList, dataDetailInventory, sidemenu, invId }) {
    const rt = useRouter()
    const { originPath } = rt.query
    const { Option } = Select
    const pathArr = ['inventories', dataDetailInventory.data.inventory.asset_name]
    // const pathArr = rt.pathname.split("/").slice(1)
    const [createInventoryForm] = Form.useForm();
    const dataInv = dataDetailInventory.data.inventory
    if (dataDetailInventory.data.inventory.additional_attributes === "Inventory Column Name of an Inventory Value not Found") {
        dataDetailInventory.data.inventory.additional_attributes = []
    }
    const dataInvDynamic = dataDetailInventory.data.inventory.additional_attributes
    const dataMapInvDynamic = dataInvDynamic.map((doc, idx) => {
        return ({
            id: doc.id,
            value: doc.value
        })
    })
    var objDynamic = {}
    dataInvDynamic.map((doc, idx) => {
        objDynamic = {
            ...objDynamic,
            [doc.name]: doc.value
        }
    })

    const [isdynamic, setIsdynamic] = useState(false)
    const [loadingdynamic, setLoadingdynamic] = useState(false)
    const [datadynamic, setDatadynamic] = useState([])
    const [datadynamic2, setDatadynamic2] = useState(dataInvDynamic)
    const [loadingbtnupdate, setloadingbtnupdate] = useState(false)
    const [datanew, setDatanew] = useState({
        id: dataInv.id,
        asset_id: dataInv.asset_id,
        vendor_id: dataInv.vendor_id,
        asset_code: dataInv.asset_code,
        asset_name: dataInv.asset_name,
        mig_number: dataInv.mig_number,
        serial_number: dataInv.serial_number,
        model: dataInv.model,
        invoice_label: dataInv.invoice_label,
        status: dataInv.status,
        kepemilikan: dataInv.kepemilikan,
        kondisi: dataInv.kondisi,
        tanggal_beli: moment(dataInv.tanggal_beli, 'YYYY-MM-DD'),
        harga_beli: dataInv.harga_beli,
        tanggal_efektif: moment(dataInv.tanggal_efektif, 'YYYY-MM-DD'),
        depresiasi: dataInv.depresiasi,
        nilai_sisa: dataInv.nilai_sisa,
        nilai_buku: dataInv.nilai_buku,
        masa_pakai: dataInv.masa_pakai,
        lokasi: dataInv.lokasi,
        departmen: dataInv.departmen,
        service_point: dataInv.service_point,
        gudang: dataInv.gudang,
        used_by: dataInv.used_by,
        managed_by: dataInv.managed_by,
        inventory_values: dataMapInvDynamic
    })

    const onChangeUpdateInventory = (e) => {
        const val = e.target.value
        setDatanew({
            ...datanew,
            [e.target.name]: val
        })
    }
    const onChangeDynamic = (e, idInvCol) => {

        const idx = datanew.inventory_values.map((doc, idx) => { return doc.id }).indexOf(idInvCol)
        console.log("idx: " + idx)
        var items = [...datanew.inventory_values]
        items[idx] = {
            id: idInvCol,
            value: e.target.value
        }
        setDatadynamic2(items)
        setDatanew({
            ...datanew,
            inventory_values: items
        })
    }
    const onChangeDynamicAnt1 = (value, idInvCol) => {
        const idx = datanew.inventory_values.map((doc, idx) => { return doc.id }).indexOf(idInvCol)
        var items = [...datanew.inventory_values]
        items[idx] = {
            id: idInvCol,
            value: value
        }
        setDatadynamic2(items)
        setDatanew({
            ...datanew,
            inventory_values: items
        })
    }
    const handleUpdateInventory = () => {
        setloadingbtnupdate(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateInventory`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datanew)
        })
            .then(res => res.json())
            .then(res2 => {
                setloadingbtnupdate(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/inventories/update/${invId}?originPath=Inventories`)
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
    return (
        <Layout tok={initProps} pathArr={pathArr} dataProfile={dataProfile} dataAssetsList={dataAssetsList} sidemenu={sidemenu} originPath={originPath} st={st}>
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-4 border-r p-5" id="updateInvWrappper">
                    <Sticky containerSelectorFocus="#formWrapper">
                        <div className="flex justify-between p-5 w-full h-auto bg-white border-b mb-8">
                            <div className=" font-semibold">Update Inventori</div>
                            <div className="flex">
                                <Link href={`/inventories?originPath=Admin`}>
                                    <Button type="default" size="middle" style={{ marginRight: `1rem` }}>Batalkan</Button>
                                </Link>
                                <Button type="primary" size="middle" onClick={createInventoryForm.submit} loading={loadingbtnupdate}>Perbarui</Button>
                            </div>
                        </div>
                    </Sticky>
                    <div className="flex flex-col">
                        <Form layout="vertical" form={createInventoryForm} onFinish={handleUpdateInventory} initialValues={datanew}>

                            <div className="mb-10 shadow-md rounded-md w-full h-auto bg-white p-5 relative border-2">
                                <div className="absolute w-auto px-5 h-10 bg-white font-semibold left-10 -top-3">Data Mandatory</div>
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <Form.Item name="asset_type" style={{ marginRight: `1rem` }} label="Tipe Asset">
                                        <TreeSelect
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            defaultValue={datanew.asset_code}
                                            treeData={dataAssetsList.data}
                                            placeholder="Pilih Tipe Asset"
                                            treeDefaultExpandAll
                                            onChange={(value) => onChangeInventoryType(value)}
                                            allowClear
                                            required
                                            disabled
                                        />
                                    </Form.Item>
                                    <Form.Item name="vendor" style={{ marginRight: `1rem` }} label="Vendor"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vendor harus diisi',
                                            },
                                        ]} initialValue={datanew.vendor_id}>
                                        <Select onChange={(value) => { setDatanew({ ...datanew, vendor_id: value }) }} defaultValue={datanew.vendor_id} name="vendor" placeholder="Pilih Vendor" allowClear>
                                            {
                                                dataDetailInventory.data.vendors.map((doc, idx) => {
                                                    return (
                                                        <Option value={doc.id}>{doc.name}</Option>
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
                                        <Input onChange={onChangeUpdateInventory} defaultValue={datanew.asset_name} name="asset_name" id="assetName" allowClear />
                                    </Form.Item>
                                    <Form.Item name="mig_number" style={{ marginRight: `1rem` }} label="MIG Number">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, mig_number: value }) }} defaultValue={datanew.mig_number} name="mig_number" id="mig_number" allowClear style={{ width: `100%` }} />
                                    </Form.Item>
                                    <Form.Item name="serial_number" style={{ marginRight: `1rem` }} label="Serial Number">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, serial_number: value }) }} defaultValue={datanew.serial_number} name="serial_number" id="serial_number" allowClear style={{ width: `100%` }} />
                                    </Form.Item>
                                    <Form.Item name="model" style={{ marginRight: `1rem` }} label="Model">
                                        <Input onChange={onChangeUpdateInventory} name="model" id="model" allowClear defaultValue={datanew.model} />
                                    </Form.Item>
                                    <Form.Item name="invoice_label" style={{ marginRight: `1rem` }} label="Invoice Label">
                                        <Input onChange={onChangeUpdateInventory} name="invoice_label" id="invoiceLabel" allowClear defaultValue={datanew.invoice_label} />
                                    </Form.Item>
                                    <Form.Item name="status" style={{ marginRight: `1rem` }} label="Status"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Status harus diisi',
                                            },
                                        ]}>
                                        <Select onChange={(value) => { setDatanew({ ...datanew, status: value }) }} name="status" allowClear defaultValue={datanew.status}>
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
                                        <Select onChange={(value) => { setDatanew({ ...datanew, kepemilikan: value }) }} name="kepemilikan" allowClear defaultValue={datanew.kepemilikan}>
                                            <Option value="milikSendiri">Milik Sendiri</Option>
                                            <Option value="PT.MIG">PT. MIG</Option>
                                            <Option value="BankBukopin">Bank Bukopin</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="kondisi" style={{ marginRight: `1rem` }} label="Kondisi">
                                        <Select onChange={(value) => { setDatanew({ ...datanew, kondisi: value }) }} name="kondisi" allowClear defaultValue={datanew.kondisi}>
                                            <Option value="baik">Baik</Option>
                                            <Option value="rusakRingan">Rusak ringan</Option>
                                            <Option value="rusakBerat">Rusak berat</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="tanggal_beli" style={{ marginRight: `1rem` }} label="Tanggal Beli">
                                        <DatePicker onChange={(date, dateString) => { setDatanew({ ...datanew, tanggal_beli: dateString }) }} name="tanggal_beli" allowClear defaultValue={moment(datanew.tanggal_beli, 'YYYY-MM-DD')} format={'YYYY-MM-DD'} />
                                    </Form.Item>
                                    <Form.Item name="harga_beli" style={{ marginRight: `1rem` }} label="Harga Beli">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, harga_beli: value }) }} name="harga_beli" id="harga_beli" allowClear style={{ width: `100%` }} defaultValue={datanew.harga_beli} />
                                    </Form.Item>
                                    <Form.Item name="tanggal_efektif" style={{ marginRight: `1rem` }} label="Tanggal Efektif">
                                        <DatePicker onChange={(date, dateString) => { setDatanew({ ...datanew, tanggal_efektif: dateString }) }} name="tanggal_efektif" allowClear defaultValue={moment(datanew.tanggal_efektif, 'YYYY-MM-DD')} format={'YYYY-MM-DD'} />
                                    </Form.Item>
                                    <Form.Item name="depresiasi" style={{ marginRight: `1rem` }} label="Depresiasi">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, depresiasi: value }) }} name="depresiasi" id="depresiasi" allowClear style={{ width: `100%` }} defaultValue={datanew.depresiasi} />
                                    </Form.Item>
                                    <Form.Item name="nilai_sisa" style={{ marginRight: `1rem` }} label="Nilai Sisa">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, nilai_sisa: value }) }} name="nilai_sisa" id="nilai_sisa" allowClear style={{ width: `100%` }} defaultValue={datanew.nilai_sisa} />
                                    </Form.Item>
                                    <Form.Item name="nilai_buku" style={{ marginRight: `1rem` }} label="Nilai Buku">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, nilai_buku: value }) }} name="nilai_buku" id="nilai_buku" allowClear style={{ width: `100%` }} defaultValue={datanew.nilai_buku} />
                                    </Form.Item>
                                    <Form.Item name="masa_pakai" style={{ marginRight: `1rem` }} label="Masa Pakai">
                                        <InputNumber onChange={(value) => { setDatanew({ ...datanew, masa_pakai: value }) }} name="masa_pakai" id="masa_pakai" allowClear style={{ width: `100%` }} defaultValue={datanew.masa_pakai} />
                                    </Form.Item>
                                    <Form.Item name="lokasi" style={{ marginRight: `1rem` }} label="Lokasi">
                                        <Input onChange={onChangeUpdateInventory} name="lokasi" id="lokasi" allowClear defaultValue={datanew.lokasi} />
                                    </Form.Item>
                                    <Form.Item name="departmen" style={{ marginRight: `1rem` }} label="Departmen">
                                        <Select onChange={(value) => { setDatanew({ ...datanew, departmen: value }) }} name="departmen" allowClear defaultValue={datanew.departmen}>
                                            <Option value="keuangan">Keuangan</Option>
                                            <Option value="penagihan">Penagihan</Option>
                                            <Option value="pajak">Pajak</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="service_point" style={{ marginRight: `1rem` }} label="Service Point">
                                        <Input onChange={onChangeUpdateInventory} name="service_point" id="service_point" allowClear defaultValue={datanew.service_point} />
                                    </Form.Item>
                                    <Form.Item name="gudang" style={{ marginRight: `1rem` }} label="Gudang">
                                        <Input onChange={onChangeUpdateInventory} name="gudang" id="gudang" allowClear defaultValue={datanew.gudang} />
                                    </Form.Item>
                                    <Form.Item name="used_by" style={{ marginRight: `1rem` }} label="Used_by">
                                        <Input onChange={onChangeUpdateInventory} name="used_by" id="used_by" allowClear defaultValue={datanew.used_by} />
                                    </Form.Item>
                                    <Form.Item name="managed_by" style={{ marginRight: `1rem` }} label="Managed_by">
                                        <Input onChange={onChangeUpdateInventory} name="managed_by" id="managed_by" allowClear defaultValue={datanew.managed_by} />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="mb-5 shadow-md rounded-md w-full h-auto bg-white p-5 relative border-2">
                                <div className="absolute w-auto px-5 h-10 bg-white font-semibold left-10 -top-3">Data Turunan</div>
                                {
                                    dataInvDynamic.map((doc, idx) => {
                                        return (
                                            <div className="grid grid-cols-1 md:grid-cols-2" key={idx}>
                                                {
                                                    doc.required ?
                                                        <Form.Item name={doc.name} style={{ marginRight: `1rem` }} label={doc.name} initialValue={objDynamic}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: `${doc.name} harus diisi`,
                                                                },
                                                            ]}
                                                        >
                                                            {doc.data_type === "text" &&
                                                                <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} defaultValue={doc.value} allowClear required />}
                                                            {doc.data_type === "number" &&
                                                                <InputNumber name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} id={doc.name} allowClear style={{ width: `100%` }} defaultValue={doc.value} required />}
                                                            {doc.data_type === "decimal" &&
                                                                <InputNumber name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} id={doc.name} allowClear style={{ width: `100%` }} defaultValue={doc.value} required />}
                                                            {doc.data_type === "textarea" &&
                                                                <Input.TextArea step="" name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.value} required />}
                                                            {doc.data_type === "checkbox" &&
                                                                <div><Checkbox name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} allowClear defaultValue={doc.value} required /> {doc.name}</div>}
                                                            {doc.data_type === "select" &&
                                                                <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.value} required />
                                                            }
                                                            {doc.data_type === "tree" &&
                                                                <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.value} required />
                                                            }
                                                            {doc.data_type === "date" &&
                                                                <DatePicker name={doc.name} defaultValue={moment(doc.value, 'YYYY-MM-DD')} format={'YYYY-MM-DD'} onChange={(date, dateString) => { onChangeDynamicAnt1(dateString, doc.id) }} allowClear required />
                                                            }
                                                        </Form.Item>
                                                        :
                                                        <Form.Item name={doc.name} style={{ marginRight: `1rem` }} label={doc.name}>
                                                            {doc.data_type === "text" &&
                                                                <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} defaultValue={doc.value} allowClear required />}
                                                            {doc.data_type === "number" &&
                                                                <InputNumber name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} id={doc.name} allowClear style={{ width: `100%` }} defaultValue={doc.value} />}
                                                            {doc.data_type === "decimal" &&
                                                                <InputNumber name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} id={doc.name} allowClear style={{ width: `100%` }} defaultValue={doc.value} />}
                                                            {doc.data_type === "textarea" &&
                                                                <Input.TextArea step="" name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.value} />}
                                                            {doc.data_type === "checkbox" &&
                                                                <div><Checkbox name={doc.name} onChange={(value) => { onChangeDynamicAnt1(value, doc.id) }} allowClear defaultValue={doc.value} /> {doc.name}</div>}
                                                            {doc.data_type === "select" &&
                                                                <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.value} />
                                                            }
                                                            {doc.data_type === "tree" &&
                                                                <Input name={doc.name} onChange={(e) => { onChangeDynamic(e, doc.id) }} allowClear defaultValue={doc.value} />
                                                            }
                                                            {doc.data_type === "date" &&
                                                                <DatePicker name={doc.name} defaultValue={moment(doc.value, 'YYYY-MM-DD')} format={'YYYY-MM-DD'} onChange={(date, dateString) => { onChangeDynamicAnt1(dateString, doc.id) }} allowClear />
                                                            }
                                                        </Form.Item>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    var invId = params.inventoryId
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

    const resourcesGI = await fetch(`https://boiling-thicket-46501.herokuapp.com/getInventory?id=${invId}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
        }
    })
    const resjsonGI = await resourcesGI.json()
    const dataDetailInventory = resjsonGI

    return {
        props: {
            initProps,
            dataProfile,
            dataAssetsList,
            dataDetailInventory,
            sidemenu: "4",
            invId
        }
    }
}

export default InventoryUpdate