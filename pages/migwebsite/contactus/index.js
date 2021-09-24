import {React, useState} from 'react'
import Link from 'next/link'
import {Form, Input, Select, Button, Checkbox } from 'antd'
import Layout from '../../../components/migwebsite/layout.js'

function Privacy({ }) {

    const [form] = Form.useForm();
    const { Option } = Select
    const [submit, setSubmit] = useState(true)
    const onChangeSubmit = () => {
        console.log(submit)
        setSubmit(!submit)
    }
    return (
        <Layout>
            <section className={'px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto flex'}>
                    <div className={'w-1/2'}>
                        <p className={'text-3xl font-bold pb-8 pt-10'}>We’d love to hear from you</p>
                        <p className={'text-lg pb-4'}>Have questions about our products, features, or company? Our teams will help you.</p>
                        <div className={'flex flex-row'}>
                            <p className={'font-semibold'}>Location: </p>
                            <p>Tebet raya no. 42 South Jakarta, DKI Jakarta,12820</p>
                        </div>
                        <div className={'flex flex-row'}>
                            <p className={'font-semibold'}>Contact: </p>
                            <p>+62-21-831-4522</p>
                        </div>
                        <div className={'flex flex-row'}>
                            <p className={'font-semibold'}>Email: </p>
                            <p>help@mitrasolusi.group</p>
                        </div>
                    </div>
                    <div className={'w-1/2'}>
                        <p className={'text-3xl font-bold pb-8 pt-10'}>Send us your questions</p>
                        <p className={'text-lg pb-4'}>Fill in your contact information, and our sales team will contact you shortly.</p>
                        <Form
                            layout={'vertical'}
                            form={form}
                            
                        >
                            <div className={'flex'}>
                                <div className={'w-1/2 mr-2'}>
                                    <Form.Item name={'company_name'} className={'font-semibold'} label="Company Name" rules={[{required: true,},]}>
                                        <Input name={'company_name'} placeholder="" />
                                    </Form.Item>
                                    <Form.Item name={'company_email'} className={'font-semibold'} label="Email" rules={[{required: true,},]}>
                                        <Input name={'company_email'} placeholder="" />
                                    </Form.Item>
                                </div>
                                <div className={'w-1/2 ml-2'}>
                                    <Form.Item name={'name'} className={'font-semibold'} label="Contact Name" rules={[{required: true,},]}>
                                        <Input name={'name'} placeholder="" />
                                    </Form.Item>
                                    <Form.Item name={'phone_number'} className={'font-semibold'} label="Phone Number" rules={[{required: true,},]}>
                                        <Input name={'phone_number'} placeholder="" />
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item name="interested_in" className={'font-semibold'} label="Interest" rules={[{required: true,},]}>
                                <Select name="interested_in" allowClear>
                                    <Option value="ready">Hardware</Option>
                                    <Option value="leased">Software</Option>
                                    <Option value="used">People</Option>
                                    <Option value="return">Other</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="message" className={'font-semibold'} label="Message" rules={[{required: true,},]}>
                                <Input.TextArea />
                            </Form.Item>
                            <Checkbox onChange={()=>{onChangeSubmit()}}>By proceeding, I agree that MIG's representative may contact me by email, phone, or SMS (including by automatic telephone dialing system) at the email address or number I provide, including for marketing purposes.*</Checkbox>
                            <div className={'w-full flex justify-center pt-8 pb-8'}>
                                <Button hidden={!submit} disabled={submit} type="primary" className={''} style={{backgroundColor:'white', color:'grey', fontWeight:'600'}} key="3"><p>Submit</p></Button>
                                <Button hidden={submit} type="primary" className={'button-hover px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>Submit</p></Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Privacy