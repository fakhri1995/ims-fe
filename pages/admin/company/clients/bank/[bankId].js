import React, { useState, useEffect } from 'react'
import httpcookie from 'cookie'
import Layout from '../../../../../components/layout-dashboard'
import Link from 'next/link'
import st from "../../../../../components/layout-dashboard.module.css"
import { useRouter } from 'next/router'
import { Form, Input, Button, notification, Select, Spin } from 'antd'

const BankUpdateClient = ({ initProps, dataProfile, sidemenu, bankid }) => {
    //initial
    const rt = useRouter()
    const { companyid, name } = rt.query
    const pathArr = ['admin', 'company', `clients`, 'Update Bank Account']
    const [editBankForm] = Form.useForm()
    const { Option } = Select

    //useState
    const [bankdata, setBankdata] = useState({
        id: bankid,
        company_id: companyid,
        name: '',
        account_number: '',
        owner: '',
        currency: ''
    })
    const [loadingbtnedit, setloadingbtnedit] = useState(false)
    const [loading, setloaading] = useState(true)
    // const [datagetBanks, setdatagetBanks] = useState([])
    // const [loadingdatagetBanks, setloadingdatagetBanks] = useState(false)

    //onChange
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

    //handler
    const handleSubmitEditBA = () => {
        setloadingbtnedit(true)
        fetch(`https://boiling-thicket-46501.herokuapp.com/updateClientBank`, {
            method: 'PUT',
            headers: {
                'Authorization': JSON.parse(initProps),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bankdata)
        })
            .then((res) => res.json())
            .then(res2 => {
                setloadingbtnedit(false)
                if (res2.success) {
                    notification['success']({
                        message: res2.message,
                        duration: 3
                    })
                    setTimeout(() => {
                        rt.push(`/admin/company/clients/${companyid}`)
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

    //useEffect
    useEffect(() => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/getClientBanks?id=${Number(companyid)}`, {
            method: `GET`,
            headers: {
                'Authorization': JSON.parse(initProps),
            },
        })
            .then(res => res.json())
            .then(res2 => {
                const tempdata = res2.data.map((doc, idx) => {
                    return ({
                        // key: idx + 1,
                        id: doc.id,
                        company_id: doc.company_id,
                        name: doc.name,
                        account_number: doc.account_number,
                        owner: doc.owner,
                        currency: doc.currency
                    })
                }).filter(dataa => dataa.id === Number(bankid))[0]
                setBankdata(tempdata)
                setloaading(false)
            })
    }, [])

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className="w-full h-auto border-t border-opacity-30 border-gray-500 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className=" col-span-1 md:col-span-4">
                        <div className="p-2 md:p-5 border-b flex mb-5 justify-between">
                            <div>
                                <h1 className="mt-2 text-sm font-bold">Update Bank Account | {loading ? "" : `${name}`}</h1>
                                {/* <h1 className="mt-2 text-xs font-medium">{dataDetailCompany.data.company_name}</h1> */}
                            </div>
                            <div className="flex mx-2">
                                <Link href={`/admin/company/clients/${companyid}`}>
                                    <Button type="default" size="middle" style={{ marginRight: `1rem` }}>Batal</Button>
                                    {/* <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-5 rounded-md mx-2">Cancel</button> */}
                                </Link>
                                <Button type="primary" htmlType="submit" size="middle" loading={loadingbtnedit} onClick={editBankForm.submit}>Simpan</Button>
                                {/* <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-5 rounded-md">Save</button> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-3 flex flex-col">
                        <div className="p-2 md:p-5 shadow-md">
                            {
                                loading ?
                                    <Spin />
                                    :
                                    <Form layout="vertical" onFinish={handleSubmitEditBA} form={editBankForm} initialValues={bankdata}>
                                        <div className="grid grid-cols-1 mb-5">
                                            <Form.Item name="name" style={{ marginRight: `1rem` }} label="Nama Bank"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Nama bank harus diisi',
                                                    },
                                                ]}>
                                                <Input onChange={onChangeBA} name="name" defaultValue={bankdata.name} />
                                            </Form.Item>
                                            <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="Nomor Rekening"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Nomor rekening harus diisi',
                                                    },
                                                    {
                                                        pattern: /(\-)|(^\d*$)/,
                                                        message: 'Nomor rekening harus diisi dengan angka',
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
                                                <select name="currency" onChange={onChangeBA} defaultValue={bankdata.currency} style={{ width: `100%`, borderRadius: `5px` }}>
                                                    <option value="IDR">IDR</option>
                                                    <option value="USD">USD</option>
                                                </select>
                                            </Form.Item>
                                        </div>
                                    </Form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const bankid = params.bankId
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
        method: `POST`,
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
            bankid,
            // dataDetailCompany,
            // dataGetBanks,
            // dataLocations,
            // dataBranchList,
            sidemenu: "4"
        },
    }
}

export default BankUpdateClient
