import Layout from '../../../../../components/layout-dashboard2'
import st from '../../../../../components/layout-dashboard.module.css'
import httpcookie from 'cookie'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import Link from 'next/link'
import Sticky from 'wil-react-sticky'
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import {DatePicker,Table,Drawer,Input,Select,Button,notification,Form} from 'antd'
import moment from 'moment'

function UpdateContract({ initProps, dataProfile, contractData, contractInputData, sidemenu }) {
    const rt = useRouter()
    const tok = initProps
    const pathArr = rt.pathname.split("/").slice(1)
    pathArr.splice(2,1)
    pathArr[pathArr.length - 1] = contractData.data.contract.nomor_kontrak
    // const pathArr = ['admin','contracts', "update "+contractData.data.contract.nomor_kontrak]
    const { originPath } = rt.query
    const { TextArea } = Input;
    const { Option } = Select;
    const [instanceForm] = Form.useForm()
    const [loadingbtn, setLoadingbtn] = useState(false)
    const [opendrawer, setOpendrawer] = useState(false)
    const contract = contractData.data.contract
    const [dataServiceItems, setDataServiceItems] = useState([])
    const [validation,setValidation] = useState({
        harga: true,
        id_terms_of_payment: true
    })
    //----------Create Contract Parameter-------------
    const [updatecontract, setUpdatecontract] = useState({
        id: contract.id,
        id_client_company: contract.id_client_company,
        id_tipe_kontrak: contract.id_tipe_kontrak,
        nomor_kontrak: contract.nomor_kontrak,
        deskripsi: contract.deskripsi,
        tanggal_mulai: moment(contract.tanggal_mulai,'YYYY-MM-DD'),
        tanggal_selesai: moment(contract.tanggal_selesai,'YYYY-MM-DD'),
        service_items: dataServiceItems
    })
    const onChangeCreateContract = (e) => {
        var val = e.target.value
        setUpdatecontract({
            ...updatecontract,
            [e.target.name]: val
        })
    }
    const onAddService = () => {
        setSelectedServiceItemTemp(serviceItemTemp.serviceItemValues)
        var items = serviceItemTemp.serviceItemValues
        setDataServiceItems(items)
        setUpdatecontract({
            ...updatecontract,
            service_items: items
        })
        const validationHarga = items.every(item => item.harga);
        const validationTerms = items.every(item => item.id_terms_of_payment);
        setValidation({...validation,harga:validationHarga,id_terms_of_payment:validationTerms})
    }
    const onChangeServicePriceItems = (e,id) => {
        var val = e.target.value
        const idx = serviceItemTemp.serviceItemValues.map(item=>item.id_service_item).indexOf(id)
        // console.log(idx,id)
        var items = [...dataServiceItems]
        items[idx].id_service_item = id
        items[idx].harga = val
        setDataServiceItems(items)
        setUpdatecontract({
            ...updatecontract,
            service_items: items
        })
        const validationHarga = items.every(item => item.harga);
        setValidation({...validation,harga:validationHarga})
    }

    const onChangeServiceTermsofPaymentItems = (val,id) => {
        const idx = serviceItemTemp.serviceItemValues.map(item=>item.id_service_item).indexOf(id)
        // console.log(idx)
        var items = [...dataServiceItems]
        items[idx].id_terms_of_payment = val
        setDataServiceItems(items)
        setUpdatecontract({
            ...updatecontract,
            service_items: items
        })
        const validationTerms = items.every(item => item.id_terms_of_payment);
        setValidation({...validation,id_terms_of_payment:validationTerms})
    }
    const DynamicComponent = () => {
        return (
        <>
            {
                selectedServiceItemTemp.length > 0 ?
                <>
                <div className="col-span-1 hidden md:col-span-1 md:flex flex-col pr-2">
                    <h3>Nama Service Item</h3>
                </div>
                <div className="col-span-1 hidden md:col-span-1 md:flex flex-col px-2">
                    <h3>Harga</h3>
                </div>
                <div className="col-span-1 hidden md:col-span-1 md:flex flex-col pl-2">
                    <h3>Terms of Payment</h3>
                </div>
                </>
                : <></>
            }
            {
                selectedServiceItemTemp.map((item,idx)=>{
                    return (
                        <>
                            <div className="col-span-1 md:col-span-1 flex flex-col md:pr-2 py-2">
                                <Input className={''} defaultValue={item.nama} readOnly></Input>
                            </div>
                            <div className="col-span-1 md:col-span-1 flex flex-col md:px-2 py-2">
                                <Input name={"harga"+item.key} key={"harga"+item.key} type="number" defaultValue={dataServiceItems[idx].harga} onBlur={(e)=>{ onChangeServicePriceItems(e,item.id_service_item)}} prefix="IDR" suffix="Rupiah" allowClear ></Input>
                            </div>
                            <div className="col-span-1 md:col-span-1 flex flex-col md:pl-2 py-2">
                                <Select name={"terms"+item.key} key={"terms"+item.key} className={''} defaultValue={dataServiceItems[idx].id_terms_of_payment} allowClear onChange={(val)=>{onChangeServiceTermsofPaymentItems(val,item.id_service_item)}}>
                                    {
                                        contractInputData.data.term_of_payments.map((item,idx)=>{
                                            return (<Option key={item.id} value={item.id}>{item.nama}</Option>)
                                        })
                                    }
                                </Select>
                            </div>
                            <div className={'block md:hidden'}>
                                <br></br>
                                <hr className=""></hr>
                                <br></br>
                            </div>
                        </>
                    )
                })
            }
        </>
        )
    }
    //----------state untuk selected row dan temp row-------------
    const[selectedServiceItemTemp, setSelectedServiceItemTemp] = useState([])
    
    // console.log(selectedServiceItemTemp)
    //-----------------ketika memilih sementara----------------
    const [serviceItemTemp, setServiceItemTemp] = useState({
        serviceItemValues: []
    })
    const [selectedRowKeys, setSelectedRowKeys] = useState([]) //untuk menyimpan data yang di cheklist atau dipilih
    const onChangeRowSelection = (selectedRowKeys,selectedRows) => {
        // var lah = dataServiceItems.map((item,idx)=>{return item.id_service_item})
        const a3 = selectedRows.map(t1 => ({...t1, ...dataServiceItems.find(t2 => t2.id_service_item === t1.key)}))
        a3.map((obj)=>{
            if(obj.harga == null){
                obj.harga = ""
            }
            if(obj.id_terms_of_payment == null){
                obj.id_terms_of_payment = ""
            }
            obj.id_service_item = obj.key
        })
        setSelectedRowKeys(selectedRowKeys)
        setServiceItemTemp({
            ...serviceItemTemp,
            serviceItemValues: a3
        })
        // console.log(a3)
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
    //---------------- table list service--------------
    const columnsTableListService = [
        {
          title: 'Nama',
          dataIndex: 'nama',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Deskripsi Singkat',
          dataIndex: 'deskripsi',
        },
      ];
    const rowSelection = {
        selectedRowKeys,
        onChange: onChangeRowSelection,
        getCheckboxProps: (record) => ({
            // disabled: record.nama === 'Adobe Illustrator', // Column configuration not to be checked
            // nama: record.nama,
        }),
    };
    //-------------populate list service---------------
    const [populateListService, setPopulateListService] = useState(
        contractInputData.data.service_items.map((doc, idx) => {
        return ({
            key: doc.id,
            nama: doc.nama_service_item,
            deskripsi: doc.deskripsi_singkat,
        })
    }))
    const [idCategory, setIdCategory] = useState(null)
    const onChangeCategory = (val) => {
        setIdCategory(val)
        const listServiceByCategory = contractInputData.data.service_items.map((doc, idx) => {
            return ({
                id_service_kategori: doc.id_service_kategori,
                key: doc.id,
                nama: doc.nama_service_item,
                deskripsi: doc.deskripsi_singkat,
            })
        }).filter((doc)=>{
            return doc.id_service_kategori == val
        })
        setPopulateListService(listServiceByCategory)
        // console.log(listServiceByCategory)
    }
    const [defaultCategory, setDefaultCategory] = useState(null)
    const clearFilterCategory = () => {
        setDefaultCategory(null)
        setIdCategory(null)
        setPopulateListService(contractInputData.data.service_items.map((doc, idx) => {
            return ({
                key: doc.id,
                nama: doc.nama_service_item,
                deskripsi: doc.deskripsi_singkat,
            })
        }))
    }
    const searchServiceItem = (e) => {
        // console.log(e.target.value)
        var val = e.target.value
        const listServiceByCategory = contractInputData.data.service_items.map((doc, idx) => {
            return ({
                id_service_kategori: doc.id_service_kategori,
                key: doc.id,
                nama: doc.nama_service_item,
                deskripsi: doc.deskripsi_singkat,
            })
        }).filter((doc)=>{
            if(idCategory != null){
                return doc.id_service_kategori == idCategory && doc.nama.toLowerCase().includes(val)
            }
            else{
                return doc.nama.toLowerCase().includes(val)
            }
        })
        setPopulateListService(listServiceByCategory)
        // console.log(listServiceByCategory)
    }
    // const populateListService = contractInputData.data.service_items.map((doc, idx) => {
    //     return ({
    //         key: doc.id,
    //         nama: doc.nama_service_item,
    //         deskripsi: doc.deskripsi_singkat,
    //     })
    // })
    //--------------populate list company ------------
    const populateListCompany = contractInputData.data.companies.filter((doc,idx)=>(doc.id!==66)).map((doc, idx) => {
        return ({
            value: doc.id,
            label: doc.company_name,
        })
    })
    //-----------------Handle create contract-----------------------------
    const handleUpdateContract = () => {
        setLoadingbtn(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateContract`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(tok),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatecontract)
        })
            .then(res => res.json())
            .then(res2 => {
                setLoadingbtn(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/contracts/${contractData.data.contract.id}`)
                    }, 100)
                }
                else if (!res2.success) {
                    console.log(res2)
                    notification['error']({
                        message: res2.message.errorInfo[2],
                        // message: res2.message,
                        duration: 3
                    })
                }
            })
    }
    //------------------------------------------
    useEffect(() => {
        setDataServiceItems(contractData.data.service_item_kontraks)
        setSelectedServiceItemTemp(contractData.data.service_item_kontraks)
        setSelectedRowKeys(contractData.data.service_item_kontraks.map((item,idx)=>{return item.id_service_item}))
        setServiceItemTemp({
            ...serviceItemTemp,
            serviceItemValues: contractData.data.service_item_kontraks
        })
        setUpdatecontract({
            ...updatecontract,
            service_items: contractData.data.service_item_kontraks
        })
    }, [])
    //----------------------------------------------
    const[flag,setFlag] = useState({
        ket1: false,
        ket2: false
    })
    const checkFile = () => {
        // var abc = dataServiceItems.map((item,idx)=>{return item.id})
        // setSelectedRowKeys(abc) 
        // updatecontract.service_items.map((obj,idx)=>{
        //     if(obj.harga == "" || obj.harga == null || obj.harga == undefined){
        //        setFlag({...flag,ket1:true})
        //     }
        //     if(obj.id_terms_of_payment == null || obj.id_terms_of_payment == "" || obj.id_terms_of_payment == undefined){
        //         setFlag({...flag,ket2:true})
        //     }
        // })      
        console.log(validation)
        // console.log(validation.every(item=>item.harga && item.id_terms_of_payment))
        // updatecontract.service_items.values
        // console.log (serviceItemTemp)
        // console.log(selectedRowKeys)
        // console.log (dataServiceItems)
        // console.log (updatecontract)
        // var satu = selectedServiceItemTemp.map(item=>item.key)
        // var dua = dataServiceItems.map(item=>item.id_service_item)
        // // console.log (updatecontract,selectedServiceItemTemp,dataServiceItems)
        // var tiga = selectedServiceItemTemp.map(item=>item.key).filter(value => (dataServiceItems.map(item=>item.id_service_item).includes(value)))
        // // var empat = dataServiceItems.map(item=>item.id_service_item).filter(value => (selectedServiceItemTemp.map(item=>item.key).includes(value)))
        // console.log ("selected item: ",satu,"data service item: ",dua,"array intersect :",tiga)
        // // var lah = dataServiceItems.filter((obj)=>{tiga.includes(obj.id_service_item)})
        // // setDataServiceItems(dataServiceItems.filter((obj)=>{tiga.includes(obj.id_service_item)}))
        // console.log (dataServiceItems)
    }
    const check = () => {
        console.log(updatecontract.service_items)
    }
    const [widthDrawer, setWidthDrawer] = useState(600)
    useEffect(() => {
        var w = window.innerWidth
        if(w < 414){
            setWidthDrawer(300)
        }
        else if(w < 640){
            setWidthDrawer(400)
        }
        // console.log(w)
    }, [])
    
    return (
        <Layout tok={tok} dataProfile={dataProfile} pathArr={pathArr} sidemenu={sidemenu} originPath={originPath} st={st}>
            <>
                <div className="w-full h-auto">
                    <Form layout="vertical" onFinish={handleUpdateContract} style={{ display: 'contents' }} form={instanceForm}>
                        <div className=" col-span-1 md:col-span-3 flex flex-col" id="formAgentsWrapper">
                            <Sticky containerSelectorFocus="#formAgentsWrapper">
                                <div className="flex justify-between p-4 border-gray-400 border-t border-b bg-white mb-8">
                                    <h1 className="font-semibold text-base w-auto">Update Contracts</h1>
                                    <div className="flex space-x-2">
                                        <Link href="/admin/contracts" >
                                            <Button type="default" size="middle">Cancel</Button>
                                        </Link>
                                        <Button disabled={!(validation.harga && validation.id_terms_of_payment) } type="primary" size="middle" onClick={instanceForm.submit} loading={loadingbtn}>Save</Button>
                                    </div>
                                </div>
                            </Sticky>
                            <p className="text-red-600 float-right ml-auto">
                                {
                                    validation.harga?"":"Harga pada item service harus terisi semua"
                                }
                            </p>
                            <p className="text-red-600 float-right ml-auto">
                                {
                                    validation.id_terms_of_payment?"":"Terms of Payment pada item service harus terisi semua"
                                }
                            </p>
                            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-3">
                                <div className=" col-span-1 md:col-span-1 flex flex-col" >
                                    <div className="pb-4 md:mb-0 ">
                                        <Form.Item name="nomor_kontrak" style={{ marginRight: `1rem` }} label="Nomor"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nomor harus diisi',
                                                },
                                            ]}
                                            initialValue={updatecontract.nomor_kontrak}
                                        >
                                            <Input placeholder="Nomor" name={`nomor_kontrak`} onChange={onChangeCreateContract} allowClear></Input>
                                        </Form.Item>
                                    </div>

                                    <div className="pb-4 md:mb-0 ">
                                        <Form.Item name="tanggal_mulai" style={{ marginRight: `1rem` }} label="Tanggal Mulai"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tanggal Mulai harus diisi',
                                                },
                                            ]}
                                            initialValue={updatecontract.tanggal_mulai}
                                        >
                                            <DatePicker defaultValue={updatecontract.tanggal_mulai} style={{width:"100%"}} placeholder="Tanggal Mulai" name={`tanggal_mulai`} onChange={(date, dateString) => {setUpdatecontract({...updatecontract,tanggal_mulai: dateString})}} allowClear></DatePicker>
                                        </Form.Item>
                                    </div>

                                    <div className="pb-1 md:mb-0">
                                        <Form.Item name="deskripsi" style={{ marginRight: `1rem` }} label="Description"
                                            rules={[
                                                {
                                                    required: false,
                                                    // message: 'Deskripsi harus diisi',
                                                },
                                            ]}
                                            initialValue={updatecontract.deskripsi}
                                        >
                                            <TextArea placeholder="Description" rows={2} name={`deskripsi`} onChange={onChangeCreateContract} allowClear />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className=" col-span-1 md:col-span-1 flex flex-col" >
                                    <div className="pb-4 md:mb-0 ">
                                        <Form.Item name="id_client_company" style={{ }} label="Klien"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Klien harus diisi',
                                                },
                                            ]}
                                            initialValue={updatecontract.id_client_company}
                                        >
                                            <Select showSearch optionFilterProp="label" placeholder="Klien" name={`id_client_company`} onChange={(value) => {setUpdatecontract({...updatecontract,id_client_company: value})}} options={populateListCompany} allowClear/>
                                        </Form.Item>
                                    </div>

                                    <div className="pb-4 md:mb-0 ">
                                        <Form.Item name="tanggal_selesai" style={{ }} label="Tanggal Selesai"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tanggal Selesai harus diisi',
                                                },
                                            ]}
                                            initialValue={updatecontract.tanggal_selesai}
                                        >
                                            <DatePicker defaultValue={updatecontract.tanggal_selesai} style={{width:"100%"}} placeholder="Tanggal Selesai" name={`tanggal_selesai`} onChange={(date, dateString) => {setUpdatecontract({...updatecontract,tanggal_selesai: dateString})}} allowClear></DatePicker>
                                        </Form.Item>
                                    </div>

                                    <div className="pb-4 md:mb-0 ">
                                        <Form.Item name="id_tipe_kontrak" style={{ }} label="Tipe"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tipe harus diisi',
                                                },
                                            ]}
                                            initialValue={updatecontract.id_tipe_kontrak}
                                        >
                                            <Select placeholder="Tipe" name={`id_tipe_kontrak`} onChange={(value) => {setUpdatecontract({...updatecontract,id_tipe_kontrak: value})}} allowClear>
                                                {
                                                    contractInputData.data.contract_types.map((doc,index)=>{
                                                        return(
                                                            <Option key={doc.id} value={doc.id}>{doc.nama}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div>

                                    
                                </div>
                            </div>
                            <div className="pb-4 md:mb-0">
                                <a onClick={()=>{setOpendrawer(true)}}> <PlusSquareOutlined style={{verticalAlign:'2px'}}/> Daftar Service Item</a>
                            </div>
                            <div className={'w-full h-auto grid grid-cols-1 md:grid-cols-3'}>
                                <DynamicComponent></DynamicComponent>
                            </div>
                            
                            <Drawer title="Add Service Item" maskClosable={false} visible={opendrawer} onClose={() => { setOpendrawer(false),setServiceItemTemp({...serviceItemTemp,serviceItemValues:selectedServiceItemTemp}),setSelectedRowKeys(selectedServiceItemTemp.map(item=>item.id_service_item))}} destroyOnClose={true}
                                width={widthDrawer}
                                footer={
                                <div style={{ textAlign: 'right' }}>
                                        <button onClick={() => { setOpendrawer(false),setServiceItemTemp({...serviceItemTemp,serviceItemValues:selectedServiceItemTemp}),setSelectedRowKeys(selectedServiceItemTemp.map(item=>item.id_service_item))}} className="bg-white-700 hover:bg-gray-300 border text-black py-1 px-2 rounded-md w-20 mr-4">
                                            Cancel
                                            </button>
                                        <Button type="primary" onClick={()=>{onAddService(),setOpendrawer(false)}} className=" bg-blue-500 hover:bg-blue-700 border text-white py-1 px-2 rounded-md w-20">
                                            Tambah
                                            </Button>
                                    </div>
                                }
                                >
                                    <div className={'flex flex-row justify-between'}>
                                        <div className={'pb-6 flex'}>
                                            <Select value={defaultCategory} placeholder="Service Category" className={'w-48'} onChange={(value)=>{onChangeCategory(value),setDefaultCategory(value)}} name={`service_categories`}>
                                                        {
                                                            contractInputData.data.service_categories.map((doc,index)=>{
                                                                return(
                                                                    <Option key={doc.id} value={doc.id}>{doc.nama_kategori}</Option>
                                                                    )
                                                                })
                                                            }
                                            </Select>
                                            <div className={'pl-2'}>
                                                <Button className={''} onClick={clearFilterCategory}>Clear Filter</Button>
                                            </div>
                                        </div>
                                        
                                            <div className={'pl-2 hidden sm:block'}>
                                                <Input allowClear onChange={(e)=>(searchServiceItem(e))} prefix={<SearchOutlined />} placeholder="Search"></Input>
                                            </div>
                                                            
                                    </div>
                                    <div className={'py-2 block sm:hidden'}>
                                        <Input allowClear onChange={(e)=>(searchServiceItem(e))} prefix={<SearchOutlined />} placeholder="Search"></Input>
                                    </div>
                                    <Table
                                        rowSelection={rowSelection}
                                        columns={columnsTableListService}
                                        dataSource={populateListService}
                                    />
                            </Drawer>
                                {/* <Button onClick={checkFile}>Check Data</Button>
                                <Button onClick={check}>Check Data 2</Button> */}
                        </div>
                    </Form>
                </div>
            </>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    var contractId = params.contractId
    if (req && req.headers) {
        const cookies = req.headers.cookie;
        if (!cookies) {
            res.writeHead(302, { Location: '/' })
            res.end()
        }
        if (typeof cookies === 'string') {
            const cookiesJSON = httpcookie.parse(cookies);
            initProps = cookiesJSON.token
        }
    }

    const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps)
        }
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    if (![197].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
        res.writeHead(302, { Location: '/dashboard/admin' })
        res.end()
    }
    
    const getContractInputData = await fetch(`https://boiling-thicket-46501.herokuapp.com/getContractInputData`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
    })
    const responseContractInputData = await getContractInputData.json()
    const contractInputData = responseContractInputData
    
    const getContractData = await fetch(`https://boiling-thicket-46501.herokuapp.com/getContract?id=${contractId}`, {
        method: `GET`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
    })
    const responseContractData = await getContractData.json()
    const contractData = responseContractData
    
    return {
        props: {
            initProps,
            dataProfile,
            contractInputData,
            contractData,
            sidemenu: "4"
        },
    }
}

export default UpdateContract