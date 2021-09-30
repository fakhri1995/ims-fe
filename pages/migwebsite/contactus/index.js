import {React, useState} from 'react'
import Link from 'next/link'
import {Form, Input, Select, Button, Checkbox, notification } from 'antd'
import Layout from '../../../components/migwebsite/layout.js'

function ContactUs({ }) {
    const [form] = Form.useForm();
    const { Option } = Select
    const [checkbox, setSubmit] = useState(true)
    const onChangeCheckBox = () => {
        // console.log(checkbox)
        setSubmit(!checkbox)
    }
    const handleSubmit = () => {
        // console.log("awal")
        fetch(`https://boiling-thicket-46501.herokuapp.com/addMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataContactUs)
        })
        .then(res => res.json())
        .then(res2 => {
            if (res2.success) {
                notification['success']({
                    message: res2.message,
                    duration: 5
                })
            form.resetFields()
            }
            else if (!res2.success) {
                notification['error']({
                    message: res2.message.errorInfo.status_detail,
                    duration: 5
                })
            }
        })
        // console.log("akhir")
    }
    const [dataContactUs, setDataContactUs] = useState({
        company_name: null,
        company_email: null,
        name: null,
        phone_number: null,
        interested_in: null,
        message: null,
    })
    return (
        <Layout>
            <section className={'px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto block md:flex'}>
                    <div className={'w-full md:w-1/2'}>
                        <p className={'text-3xl font-bold pb-8 pt-10'}>We’d love to hear from you</p>
                        <p className={'text-lg pb-4'}>Have questions about our products, features, or company? Our teams will help you.</p>
                        <div className={'flex flex-row'}>
                            <p className={'font-semibold'}>Location:&nbsp;</p>
                            <p>Tebet raya no. 42 South Jakarta, DKI Jakarta,12820</p>
                        </div>
                        <div className={'flex flex-row'}>
                            <p className={'font-semibold'}>Contact:&nbsp;</p>
                            <p>+62-21-831-4522</p>
                        </div>
                        <div className={'flex flex-row'}>
                            <p className={'font-semibold'}>Email:&nbsp;</p>
                            <a href="mailto:help@mitrasolusi.group" className={'text-black'}>help@mitrasolusi.group</a>
                        </div>
                    </div>
                    <div className={'w-full md:w-1/2'}>
                        <p className={'text-3xl font-bold pb-8 pt-10'}>Send us your questions</p>
                        <p className={'text-lg pb-4'}>Fill in your contact information, and our sales team will contact you shortly.</p>
                        <Form
                            layout={'vertical'}
                            onFinish={handleSubmit}
                            form={form}
                        >
                            <div className={'flex'}>
                                <div className={'w-1/2 mr-2'}>
                                    <Form.Item name={'Company Name'} className={'gilroy-medium text-xl'} label="Company Name" rules={[{required: true,},]}>
                                        <Input name={'Company Name'} onChange={(e)=>{setDataContactUs({...dataContactUs, company_name: e.target.value})}} placeholder="" />
                                    </Form.Item>
                                    <Form.Item name={'Email'} className={'gilroy-medium text-xl'} label="Email" rules={[{required: true,type:'email'},]}>
                                        <Input name={'Email'} onChange={(e)=>{setDataContactUs({...dataContactUs, company_email: e.target.value})}} placeholder="" />
                                    </Form.Item>
                                </div>
                                <div className={'w-1/2 ml-2'}>
                                    <Form.Item name={'Contact Name'} className={'gilroy-medium text-xl'} label="Contact Name" rules={[{required: true,},]}>
                                        <Input name={'Contact Name'} onChange={(e)=>{setDataContactUs({...dataContactUs, name: e.target.value})}}  placeholder="" />
                                    </Form.Item>
                                    <Form.Item name={'Phone Number'} className={'gilroy-medium text-xl'} label="Phone Number" rules={[{required: true,pattern: new RegExp('^[0-9]*$'), message:"Please input valid phone number",},]}>
                                        <Input name={'Phone Number'} onChange={(e)=>{setDataContactUs({...dataContactUs, phone_number: parseInt(e.target.value)})}} placeholder="" />
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item name="Interest" className={'gilroy-medium text-xl'} label="Interest" rules={[{required: true,},]}>
                                <Select name="Interest" onChange={(value)=>{setDataContactUs({...dataContactUs, interested_in: value})}} allowClear>
                                    <Option value="hardware">Hardware</Option>
                                    <Option value="software">Software</Option>
                                    <Option value="talents">Talents</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="Message" className={'gilroy-medium text-xl'} label="Message" rules={[{required: true,},]}>
                                <Input.TextArea name="Message" onChange={(e)=>{setDataContactUs({...dataContactUs, message: e.target.value})}} />
                            </Form.Item >
                            <Form.Item name="checkbox" valuePropName='checked' 
                            rules={[
                                {
                                    validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}>
                                <Checkbox name="checkbox" onChange={()=>{onChangeCheckBox()}}>By proceeding, I agree that MIG's representative may contact me by email, phone, or SMS (including by automatic telephone dialing system) at the email address or number I provide, including for marketing purposes.*</Checkbox>
                            </Form.Item >
                            <Form.Item>
                            <div className={'w-full flex justify-center pt-8 pb-8'}>
                                {/* <Button hidden={!checkbox} disabled={checkbox} type="primary" className={''} style={{backgroundColor:'white', color:'grey', fontWeight:'600'}} key="3"><p>Submit</p></Button> */}
                                {/* <Button hidden={checkbox} type="primary" htmlType="submit" className={'button-hover px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>Submit</p></Button> */}
                                <button type={'submit'} className={'text-black border border-black px-4 py-1 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>
                                    Submit
                                </button>
                            </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default ContactUs