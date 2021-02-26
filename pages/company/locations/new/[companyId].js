import httpcookie from 'cookie'
import Layout from '../../../../components/layout-dashboard'
import Link from 'next/link'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import TreeSelect from 'antd/lib/tree-select'
import st from "../../../../components/layout-dashboard.module.css"
import { useState } from 'react'

function NewLocations({ initProps, dataProfile, sidemenu, dataDetailCompany }) {
    const tok = initProps
    const pathArr = ['company', `${dataDetailCompany.data.company_id}`, 'new location']
    const originPath = "Admin"
    const [parent, setParent] = useState("")
    const onChangeParent = (value) => {
        setParent()
    }
    const treeData = [
        {
            title: 'Node1',
            value: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-1',
                },
                {
                    title: 'Child Node2',
                    value: '0-0-2',
                },
            ],
        },
        {
            title: 'Node2',
            value: '0-1',
        },
    ];
    return (
        <Layout tok={tok} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} originPath={originPath} dataDetailCompany={dataDetailCompany} st={st}>
            <div className="w-full h-auto border-t border-opacity-30 border-gray-500 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-3 flex flex-col">
                        <div className="p-2 md:p-5 border-b flex mb-5 justify-between">
                            <div className="text-sm font-bold">
                                <h1 className="mt-2">Lokasi Baru</h1>
                            </div>
                            <div className="flex mx-2">
                                <Link href={`/company/${dataDetailCompany.data.company_id}?originPath=Admin`}>
                                    <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md mx-2">Cancel</button>
                                </Link>
                                <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md">Save</button>
                            </div>
                        </div>
                        <div className="p-2 md:p-5 shadow-md">
                            <Form layout="vertical">
                                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                                    <Form.Item name="name" style={{ marginRight: `1rem` }} label="Nama Lokasi"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama lokasi harus diisi',
                                            },
                                        ]}
                                    >
                                        <Input name="name" id="editName" allowClear />
                                    </Form.Item>
                                    <Form.Item name="account_number" style={{ marginRight: `1rem` }} label="Parent Lokasi"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Parent lokasi harus diisi',
                                            },
                                        ]}
                                    >
                                        <TreeSelect
                                            style={{ width: '100%' }}
                                            value={parent}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={treeData}
                                            placeholder="Pilih parent"
                                            treeDefaultExpandAll
                                            onChange={(value) => { onChangeParent(value) }}
                                        />
                                    </Form.Item>
                                    <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Nama Kontak"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nama kontak harus diisi',
                                            },
                                        ]}
                                    >
                                        <Input name="owner" id="editOwner" allowClear />
                                    </Form.Item>
                                    <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Email harus diisi',
                                            },
                                        ]}
                                    >
                                        <Input name="owner" id="editOwner" allowClear />
                                    </Form.Item>
                                    <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Nomor Telepon"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nomor telepon harus diisi',
                                            },
                                        ]}
                                    >
                                        <Input name="owner" id="editOwner" allowClear />
                                    </Form.Item>
                                </div>
                                <h1 className="text-sm font-semibold">Address</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                                    <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Alamat 1">
                                        <Input name="owner" id="editOwner" allowClear />
                                    </Form.Item>
                                    <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Alamat 2">
                                        <Input name="owner" id="editOwner" allowClear />
                                    </Form.Item>
                                    <div className="grid grid-cols-2">
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Kota">
                                            <Input name="owner" id="editOwner" allowClear />
                                        </Form.Item>
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Provinsi">
                                            <Input name="owner" id="editOwner" allowClear />
                                        </Form.Item>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Negara">
                                            <Input name="owner" id="editOwner" allowClear />
                                        </Form.Item>
                                        <Form.Item name="owner" style={{ marginRight: `1rem` }} label="Kode POS">
                                            <Input name="owner" id="editOwner" allowClear />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-1 flex flex-col p-2 md:p-5">
                        <h1 className="text-xs md:text-sm font-semibold mb-5">Locations</h1>
                        <p className="text-xs md:text-sm">
                            Freshservice lets you add location details into your service desk. You can create top level locations and add child locations under them. Like for example if your company operates out of multiple places, you could have the country name at the top level followed by the state, district and city.
                        <br /><br />
                        You can specify the location while creating a new asset and segregate them based on the location.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }) {
    var initProps = {};
    const companyid = params.companyId
    const reqBodyCompanyDetail = {
        login_id: companyid
    }
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
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
    })
    const resjsonGP = await resourcesGP.json()
    const dataProfile = resjsonGP

    const resourcesGC = await fetch(`https://boiling-thicket-46501.herokuapp.com/getCompanyDetail`, {
        method: `POST`,
        headers: {
            'Authorization': JSON.parse(initProps),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBodyCompanyDetail)
    })
    const resjsonGC = await resourcesGC.json()
    const dataDetailCompany = resjsonGC

    return {
        props: {
            initProps,
            dataProfile,
            dataDetailCompany,
            sidemenu: "4"
        },
    }
}

export default NewLocations