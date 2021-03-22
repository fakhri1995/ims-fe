import { useRouter } from 'next/router'
import { useState } from 'react'
import httpcookie from 'cookie'
import { DownOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Button, Anchor, Dropdown, Menu, Upload, Form, Input, message, Select } from 'antd'
import Layout from '../../../../components/layout-dashboard'
import st from '../../../../components/layout-dashboard.module.css'
import Modal from 'antd/lib/modal/Modal'

function ServiceCreate({ initProps, dataProfile, sidemenu }) {
    const rt = useRouter()
    const pathArr = rt.pathname.split("/").slice(1)
    const { Link } = Anchor
    const { Option } = Select

    //useState
    const [datanew, setdatanew] = useState({
        image_logo: '',
        name: '',
        categoryService: '',
        shortDescription: '',
        description: ''
    })
    const [loadingupload, setloadingupload] = useState(false)

    //Render Components
    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => setmodaltambahkateg(true)}>
                Save & Publish
          </Menu.Item>
            <Menu.Item key="2">
                Save As Draft
          </Menu.Item>
        </Menu>
    );
    const uploadButton = (
        <div>
            {loadingupload ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Unggah</div>
        </div>
    );

    return (
        <Layout tok={initProps} dataProfile={dataProfile} sidemenu={sidemenu} pathArr={pathArr} st={st}>
            <div className="w-full h-80 border-t border-opacity-30 border-gray-500 bg-white">
                <div className="w-full flex justify-between p-3">
                    <div>
                        <p className="font-semibold text-lg">Tambah Service Item</p>
                    </div>
                    <div>
                        <Button type="default" size="middle" style={{ marginRight: `1rem` }} onClick={() => { rt.push('/admin/service') }}>Batalkan</Button>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button style={{ backgroundColor: `rgb(24,144,255)`, color: `white` }}>
                                Simpan <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                <div className="w-full grid grid-cols-7">
                    <div className="col-span-1 flex flex-col">
                        <Anchor>
                            <Link href="#generalDetail" title="General Detail" />
                            <Link href="#customFields" title="Custom Fields" />
                            <Link href="#additionalFields" title="Addtional Fields" />
                            <Link href="#settings" title="Settings" />
                        </Anchor>
                        {/* <div className={`p-2 cursor-pointer flex items-center text-sm font-semibold bg-blue-700 text-white rounded`}>
                            <FolderOpenOutlined style={{ marginRight: `0.7rem` }} />
                            General Detail
                        </div> */}
                    </div>
                    <div className="col-span-6 flex flex-col">
                        <div id="generalDetail" className="mb-5 flex flex-col">
                            <div className="flex justify-between items-center p-3">
                                <div>
                                    <p className="font-semibold text-base">General Detail</p>
                                </div>
                                <div>
                                    <a href="#">Help</a>
                                </div>
                            </div>
                            <div className="flex p-3">
                                <div className="mr-5">
                                    <div>
                                        <Upload
                                            name="profile_image"
                                            listType="picture-card"
                                            className="profileImage"
                                            showUploadList={false}
                                        // beforeUpload={beforeUploadProfileImage}
                                        // onChange={onChangeProfileImage}
                                        >
                                            {datanew.image_logo ? <img src={datanew.image_logo} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                        </Upload>
                                    </div>
                                </div>
                                <div className=" w-7/12">
                                    <Form layout="vertical">
                                        <Form.Item label="Item Name" name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nama Item wajib diisi',
                                                },
                                            ]}>
                                            <Input name="name"></Input>
                                        </Form.Item>
                                        <Form.Item label="Service Category" name="categoryService"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Service Category wajib diisi',
                                                },
                                            ]}>
                                            <Select placeholder="Pilih Service Category">
                                                <Option value="hardware">Hardware Provisioning</Option>
                                                <Option value="software">Software Installation</Option>
                                                <Option value="hrd">HR Management</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Short Description" name="shortDescription">
                                            <Input name="shortDescription"></Input>
                                        </Form.Item>
                                        <Form.Item label="Description" name="description">
                                            <Input.TextArea name="shortDescription" />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div id="customFields" className=" h-96 mb-5">
                            <div className="flex justify-between items-center p-3">
                                <div>
                                    <p className="font-semibold text-base">Custom Fields</p>
                                </div>
                            </div>
                        </div>
                        <div id="additionalFields" className=" h-96 mb-5">
                            <div className="flex justify-between items-center p-3">
                                <div>
                                    <p className="font-semibold text-base">Additional Fields</p>
                                </div>
                            </div>
                        </div>
                        <div id="settings" className=" h-96 mb-5">
                            <div className="flex justify-between items-center p-3">
                                <div>
                                    <p className="font-semibold text-base">Settings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
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
            initProps = cookiesJSON.token
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

    return {
        props: {
            initProps,
            dataProfile,
            sidemenu: "4"
        },
    }
}

export default ServiceCreate