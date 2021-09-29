import {React, useState} from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import {Button, Form, Input, Checkbox, notification} from 'antd'
import Flickity from 'react-flickity-component'

function Software({ }) {
    const flickityOptions = {
        initialIndex: 0,
        // wrapAround: 'true',
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        prevNextButtons: false,
    }
    const [form] = Form.useForm();
    const [checkbox, setSubmit] = useState(true)
    const onChangeCheckBox = () => {
        setSubmit(!checkbox)
    }
    const handleSubmit = () => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/addMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataHardware)
        })
        .then(res => res.json())
        .then(res2 => {
            if (res2.success) {
                notification['success']({
                    message: res2.message,
                    duration: 3
                })
            form.resetFields()
            }
            else if (!res2.success) {
                notification['error']({
                    message: res2.message.errorInfo.status_detail,
                    duration: 3
                })
            }
        })
    }
    const [dataSoftware, setDataSoftware] = useState({
        company_name: null,
        company_email: null,
        name: null,
        phone_number: null,
        interested_in: 'software',
        message: null,
    })
    return (
        <Layout>
            <section className={'section1advantages hidden md:block fixed w-full z-50 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} style={{background:'#F4F4F4'}}>
                <div className={'block md:flex container mx-auto'}>
                    <div className={'flex py-4'}>
                        {/* <Link href={{pathname: '/advantages'}}><p className={'cursor-pointer flex-col text-base font-semibold pr-4'} style={{}}>Advantages
                            </p></Link> */}
                        <Link href={{pathname: '/hardware'}}><p className={'cursor-pointer flex-col text-lg gilroy-medium pr-4'}>Hardware
                            </p></Link>
                        <Link href={{pathname: '/software'}}><p className={'cursor-pointer flex-col text-lg gilroy-medium px-4'}>Software
                            </p></Link>
                        <Link href={{pathname: '/talents'}}><p className={'cursor-pointer flex-col text-lg gilroy-medium px-4'}>Talents
                            </p></Link>
                    </div>
                </div>
            </section>
            <section className={'section2advantages h-12 hidden md:block'}></section>
            <section className={'md:pt-60 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center'}>
                <div className={'container mx-auto'}>
                    <p className={'text-3xl md:text-4xl gilroy-bold py-8 md:py-0'}>
                    Simplify and automate the process through digitalization
                    </p>
                </div>
            </section>
            <section className={'section2software py-8 md:py-0 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'hidden md:flex container mx-auto'}>
                    <div className={'flex-col w-1/2 my-auto'}>
                        <p className={'text-3xl pb-4 gilroy-bold'}>Manual business processes <span style={{borderBottom:'solid 3px #188E4D',paddingBottom:'2.5px'}}>hamper</span> performance.</p>
                        <p className={'mr-20 pb-4 gilroy-medium text-xl'}>High competition, need transformation, and slow operations force you to be more effective and efficient in order to grow rapidly.</p>
                        <p className={'mr-20 gilroy-medium text-xl'}>Let us help you to achieve business goals with :</p>
                        <ul className={'list-inside list-disc'}>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>customized</span> software solutions</li>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>digitalized</span> your business</li>
                        </ul>
                    </div>
                        <div className={'flex-col w-1/2 my-auto'}>
                            <img src="/image/hardware/Hardware-Solution.png"></img>
                        </div>
                </div>
                <div className={'block md:hidden'}>
                    <div className={'my-auto'}>
                        <p className={'text-2xl pb-4 gilroy-bold'}>Manual business processes <span style={{borderBottom:'solid 3px #188E4D',paddingBottom:'2.5px'}}>hamper</span> performance.</p>
                        <div className={'my-auto'}>
                            <img src="/image/hardware/Hardware-Solution.png"></img>
                        </div>
                        <p className={'mr-20 pb-4 pt-2 gilroy-medium text-xl'}>High competition, need transformation, and slow operations force you to be more effective and efficient in order to grow rapidly.</p>
                        <p className={'mr-20 gilroy-medium text-xl'}>Let us help you to achieve business goals with :</p>
                        <ul className={'list-inside list-disc'}>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>customized</span> software solutions</li>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>digitalized</span> your business</li>
                        </ul>
                    </div>
                        
                </div>
            </section>
            <section className={'section3software py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto'}>
                    <div className={'text-center py-8 md:py-16'}>
                        <p className={'text-3xl md:text-4xl font-bold pb-4 gilroy-bold'}>Bringing you the advantages</p>
                    </div>
                    <Flickity
                    className={'carousel block md:hidden'}
                    elementType={'div'}
                    options={flickityOptions}
                    disableImagesLoaded={false}
                    reloadOnUpdate
                    static
                    >
                        <div className={'min-h-full w-4/5 px-4 mx-4 bg-gray-200 rounded-xl'}>
                            <div className={'py-4 my-auto'}>
                                <p className={'text-2xl font-bold pb-4 gilroy-bold min-h-full'}>IT Software with your needs</p>
                                <p className={'pb-4 gilroy-medium text-lg'}>Giving you customization software to simplify and automate your business.</p>
                            </div>
                        </div>
                        <div className={'min-h-full w-4/5 px-4 mx-4 bg-gray-200 rounded-xl'}>
                            <div className={'py-4 my-auto'}>
                                <p className={'text-2xl font-bold pb-4 gilroy-bold min-h-full'}>Increase your business process</p>
                                <p className={'pb-4 gilroy-medium text-lg'}>We develops software to help you achieve business process automation with our IT talent pool.</p>
                            </div>
                        </div>
                        <div className={'min-h-full w-4/5 px-4 mx-4 bg-gray-200 rounded-xl'}>
                            <div className={'py-4 my-auto'}>
                                <p className={'text-2xl font-bold pb-4 gilroy-bold min-h-full'}>Project discussion with the best agreement</p>
                                <p className={'pb-4 gilroy-medium text-lg'}>we can discuss about project also provide the best cost with a mutual agreement based on time, and complexity.</p>
                            </div>
                        </div>
                    </Flickity>
                    <section className={'hidden md:block container'}>
                        <div className={'flex'}>
                            <div className={'pt-8 pb-8 w-1/3 pr-2'}>
                                <p className={'text-3xl pb-4 gilroy-bold md:h-32 lg:h-20'}>IT Software with your needs</p>
                                <p className={'pb-4 gilroy-medium text-xl'}>Giving you customization software to simplify and automate your business.</p>
                            </div>
                            <div className={'pt-8 pb-8 w-1/3 px-2'}>
                                <p className={'text-3xl pb-4 gilroy-bold md:h-32 lg:h-20'}>Increase your business process</p>
                                <p className={'pb-4 gilroy-medium text-xl'}>We develops software to help you achieve business process automation with our IT talent pool.</p>
                            </div>
                            <div className={'pt-8 pb-8 w-1/3 pl-2'}>
                                <p className={'text-3xl pb-4 gilroy-bold md:h-32 lg:h-20'}>Project discussion with the best agreement</p>
                                <p className={'pb-4 gilroy-medium text-xl'}>we can discuss about project also provide the best cost with a mutual agreement based on time, and complexity.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <section className={'px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto text-center'}>
                    <div className={'pb-12'}>
                        <p className={'text-lg w-full gilroy-medium'}>We support your companies to simplify and automate the process through digitalization with all framework that you want.</p>
                    </div>
                    <img className={'m-auto w-full'} src='/image-software.png'></img>
                </div>
            </section>
            <section className={'section3software py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} >
                <div className={'container mx-auto'}>
                    <p className={'text-3xl gilroy-bold pb-8 pt-4 md:pt-10'}>Build now</p>
                    <p className={'gilroy-medium text-xl pb-4'}>Fill in your contact information, and our sales team will contact you shortly.</p>
                    <Form
                        layout={'vertical'}
                        onFinish={handleSubmit}
                        form={form}
                    >
                        <div className={'flex'}>
                            <div className={'w-1/2 mr-2'}>
                                <Form.Item name={'Company Name'} className={'gilroy-medium text-xl'} label="Company Name" rules={[{required: true,},]}>
                                    <Input name={'Company Name'} onChange={(e)=>{setDataSoftware({...dataSoftware, company_name: e.target.value})}} placeholder="" />
                                </Form.Item>
                                <Form.Item name={'Email'} className={'gilroy-medium text-xl'} label="Email" rules={[{required: true,type:'email'},]}>
                                    <Input name={'Email'} onChange={(e)=>{setDataSoftware({...dataSoftware, company_email: e.target.value})}} placeholder="" />
                                </Form.Item>
                            </div>
                            <div className={'w-1/2 ml-2'}>
                                <Form.Item name={'Contact Name'} className={'gilroy-medium text-xl'} label="Contact Name" rules={[{required: true,},]}>
                                    <Input name={'Contact Name'} onChange={(e)=>{setDataSoftware({...dataSoftware, name: e.target.value})}}  placeholder="" />
                                </Form.Item>
                                <Form.Item name={'Phone Number'} className={'gilroy-medium text-xl'} label="Phone Number" rules={[{required: true,pattern: new RegExp('^[0-9]*$'), message:"Please input valid phone number",},]}>
                                    <Input name={'Phone Number'} onChange={(e)=>{setDataSoftware({...dataSoftware, phone_number: parseInt(e.target.value)})}} placeholder="" />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item name="Message" className={'gilroy-medium text-xl'} label="Message" rules={[{required: true,},]}>
                            <Input.TextArea name="Message" onChange={(e)=>{setDataSoftware({...dataSoftware, message: e.target.value})}} />
                        </Form.Item >
                        <Form.Item name="checkbox">
                            <Checkbox name="checkbox" className={'gilroy-regular text-xl'} onChange={()=>{onChangeCheckBox()}}>By proceeding, I agree that MIG's representative may contact me by email, phone, or SMS (including by automatic telephone dialing system) at the email address or number I provide, including for marketing purposes.*</Checkbox>
                        </Form.Item >
                        <Form.Item>
                        <div className={'w-full flex justify-center pt-8 pb-8'}>
                            <Button hidden={!checkbox} disabled={checkbox} type="primary" className={''} style={{backgroundColor:'white', color:'grey'}} key="3"><p>Submit</p></Button>
                            {/* <Button hidden={checkbox} type="primary" htmlType="submit" className={'border-black border px-4 text-white'} style={{backgroundColor:'white', color:'black'}} key="3"><p>Submit</p></Button> */}
                            <button hidden={checkbox} type={'submit'} className={'text-black border border-black px-4 py-1 focus:outline-none gilroy-medium hover:text-white hover:bg-black'}>
                                Submit
                            </button>
                            
                        </div>
                        </Form.Item>
                    </Form>
                </div>
            </section>
            {/* <section className={'section5landingpage'}>
                <div className={' md:flex relative justify-between px-4 md:px-20 lg:px-28 xl:px-40'}style={{top:'40%'}}>
                    <div className={'flex-col text-2xl md:text-3xl text-white font-bold -top-4 md:top-0 relative'} style={{}}>
                        <p>Let’s be better together</p>
                    </div>
                    <div className={'flex-col w-auto'}>
                        <button className={'text-white flex border-2 text-base md:text-lg border-white px-4 mt-1 focus:outline-none'}>Contact Sales &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>

                    </div>
                </div>
            </section> */}

        </Layout>
    )
}

export default Software