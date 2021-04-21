import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import {Button, Form, Input} from 'antd'

function Software({ }) {
    const [softwareForm] = Form.useForm()
    const { TextArea } = Input;
    return (
        <Layout>
            <section className={'section1advantages hidden md:block'}>
                <div className={'block md:flex'}>
                    <div className={'flex center'}>
                        <Link href={{pathname: '/advantages'}}><p className={'flex-col text-base font-semibold pr-4'} style={{}}>Advantages
                            </p></Link>
                        <Link href={{pathname: '/hardware'}}><p className={'flex-col text-base font-semibold px-4'}>Hardware
                            </p></Link>
                        <Link href={{pathname: '/software'}}><p className={'flex-col text-base font-semibold px-4'}>Software
                            </p></Link>
                        <Link href={{pathname: '/people'}}><p className={'flex-col text-base font-semibold px-4'}>People
                            </p></Link>
                    </div>
                </div>
            </section>
            <section className={'section2software px-4 md:px-20 py-8 text-center justify-center'}>
                <div className={'pb-8'}>
                    <p className={'text-2xl md:text-3xl font-bold'}>Software</p>
                </div>
                <div className={'pb-12'}>
                    <p className={'text-base w-full'}>We support your companies to simplify and automate the process through digitalization</p>
                </div>
                <img className={'m-auto px-2 md:px-2'} src='/image-software.png'></img>
            </section>
            <section className={'section3software justify-center px-2 md:px-20'} >
                <Form layout={'vertical'} form={softwareForm}>
                    <div className={''}>
                        <div className={'w-full h-auto grid grid-cols-1 md:grid-cols-2'}>
                            <div className=" col-span-1 md:col-span-1 flex flex-col px-6" >
                                <div className="pb-4 md:mb-0 ">
                                    <Form.Item name="companyName" label="Company Name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Company Name is required',
                                            },
                                        ]}
                                    >
                                        <Input name={`companyName`} allowClear placeholder="Your company name" />
                                    </Form.Item>
                                </div>
                                <div className="pb-4 md:mb-0 ">
                                    <Form.Item name="email" label="Email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Email is required',
                                            },
                                        ]}
                                    >
                                        <Input name={`email`} allowClear placeholder="Your email" />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className=" col-span-1 md:col-span-1 flex flex-col px-6" >
                                <div className="pb-4 md:mb-0 ">
                                    <Form.Item name="contactName" label="Contact Name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Contact Name is required',
                                            },
                                        ]}
                                    >
                                        <Input name={`contactName`} allowClear placeholder="Your name" />
                                    </Form.Item>
                                </div>
                                <div className="pb-4 md:mb-0 ">
                                    <Form.Item name="phoneNumber" label="Phone Number"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Phone Number is required',
                                            },
                                        ]}
                                    >
                                        <Input name={`phoneNumber`} allowClear placeholder="Your phone number" />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className=" col-span-1 md:col-span-2 flex flex-col px-6" >
                                <div className="pb-4 md:mb-0 ">
                                    <Form.Item name="project" label="Tell us about your project"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <TextArea rows={4} name={`project`} allowClear placeholder="Type your project here" />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        <div className={'w-full flex justify-center pb-8'}>
                            <Button onClick={softwareForm.submit} type="text" className={'mx-2 px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>Submit</p></Button>
                        </div>
                    </div>
                </Form>
            </section>
            <section className={'section5landingpage'}>
                <div className={' md:flex relative justify-between px-8 md:px-32 lg:px-64'}style={{top:'40%'}}>
                    <div className={'flex-col text-2xl md:text-3xl text-white font-bold -top-4 md:top-0 relative'} style={{}}>
                        <p>Let’s be better together</p>
                    </div>
                    <div className={'flex-col w-auto'}>
                        <button className={'text-white flex border-2 text-base md:text-lg border-white px-4 mt-1 focus:outline-none'}>Contact Sales &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>

                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default Software