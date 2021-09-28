import {React, useState} from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import {Form, Input, Button, Checkbox, notification, Collapse} from 'antd'
import Flickity from 'react-flickity-component'

function Hardware({ }) {
    const { Panel } = Collapse;
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
        // console.log(checkbox)
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
    const [dataHardware, setDataHardware] = useState({
        company_name: null,
        company_email: null,
        name: null,
        phone_number: null,
        interested_in: 'hardware',
        message: null,
    })
    return (
        <Layout>
            <section className={'section1advantages hidden md:block fixed w-full z-50 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} style={{background:'#F4F4F4'}}>
                <div className={'block md:flex container mx-auto'}>
                    <div className={'flex py-4'}>
                        {/* <Link href={{pathname: '/advantages'}}><p className={'cursor-pointer flex-col text-base font-semibold pr-4'} style={{}}>Advantages
                            </p></Link> */}
                        <Link href={{pathname: '/hardware'}}><p className={'cursor-pointer flex-col gilroy-bold text-lg pr-4'}>Hardware
                            </p></Link>
                        <Link href={{pathname: '/software'}}><p className={'cursor-pointer flex-col gilroy-bold text-lg px-4'}>Software
                            </p></Link>
                        <Link href={{pathname: '/people'}}><p className={'cursor-pointer flex-col gilroy-bold text-lg px-4'}>People
                            </p></Link>
                    </div>
                </div>
            </section>
            <section className={'section2advantages h-12 hidden md:block'}></section>
            <section className={'md:pt-60 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 md:relative md:bottom-32 text-center'}>
                    <div className={'container mx-auto'}>
                        <p className={'text-3xl md:text-4xl gilroy-bold py-8 md:py-0'}>
                        Nation-wide managed service model for your IT hardwares
                        </p>
                    </div>
                </section>
            <section className={'section2hardware py-8 md:py-0 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'hidden md:flex container mx-auto'}>
                    <div className={'flex-col w-1/2 my-auto'}>
                        <p className={'text-3xl pb-4 gilroy-bold'}>Managing IT infrastructures is <span style={{borderBottom:'solid 3px #188E4D',paddingBottom:'2.5px'}}>challenging.</span></p>
                        <p className={'mr-20 pb-4 gilroy-medium text-xl'}>Rapid pace of change, uncertainty on scalability, and heavy capital requirements might break your focus from executing your core business.</p>
                        <p className={'mr-20 gilroy-medium text-xl'}>Let us help you to scale and manage your IT infrastructure with :</p>
                        <ul className={'list-inside list-disc'}>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>predictable</span> monthly cost </li>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>guaranteed</span> service level</li>
                        </ul>
                    </div>
                        <div className={'flex-col w-1/2 my-auto'}>
                            <img src="/image/hardware/Hardware-Solution.png"></img>
                        </div>
                </div>
                <div className={'block md:hidden'}>
                    <div className={'my-auto'}>
                        <p className={'text-2xl pb-4 gilroy-bold'}>Managing IT infrastructures is challenging. </p>
                        <div className={'my-auto'}>
                            <img src="/image/hardware/Hardware-Solution.png"></img>
                        </div>
                        <p className={'mr-20 pb-4 pt-2 gilroy-medium text-xl'}>Rapid pace of change, uncertainty on scalability, and heavy capital requirements might break your focus from executing your core business.</p>
                        <p className={'mr-20 gilroy-medium text-xl'}>Let us help you to scale and manage your IT infrastructure with :</p>
                        <ul className={'list-inside list-disc'}>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>predictable</span> monthly cost </li>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>guaranteed</span> service level</li>
                        </ul>
                        {/* <button className={'px-4 py-2 text-white'} style={{backgroundColor:'#2A8452'}}> Tombol </button> */}
                    </div>
                        
                </div>
            </section>
            {/* <section className={'section3hardware justify-center'} >
                <div className={'flex relative justify-start pt-4 md:pt-16 pb-4 md:pb-0 px-4 md:px-20'} style={{flexFlow:'wrap'}}>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet1</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet2</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet3</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet4</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet5</p></div>
                    <div style={{borderRadius:'10px'}} className={'relative item-hardware'}><p className={'text-center w-full absolute bottom-2'}>Tablet6</p></div>
                </div>
            </section> */}
            <section className={'section3hardware py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto'}>
                    <div className={'text-center py-8 md:py-16'}>
                        <p className={'text-3xl md:text-4xl font-bold pb-4 gilroy-bold'}>Bringing you the advantages</p>
                    </div>
                    <Flickity
                    className={'carousel block md:hidden'} // default ''
                    elementType={'div'} // default 'div'
                    options={flickityOptions} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false
                    // centerMode={true}
                    // centerPadding={'30px'}
                    >
                        <div className={'min-h-full w-4/5 px-4 mx-4 bg-gray-200 rounded-xl'}>
                            <div className={'py-4 my-auto'}>
                                <p className={'text-2xl font-bold pb-4 gilroy-bold min-h-full'}>Cost efficient solution</p>
                                {/* <div className={'pt-8 pb-8 w-full'}>
                                    <img src="/image/landingpage/image-section2.png"></img>
                                </div> */}
                                <p className={'pb-4 gilroy-medium text-lg'}>We transform a heavy capital IT hardware infrastructure, that requires large upfront investment into managed services model.</p>
                            </div>
                        </div>
                        <div className={'min-h-full w-4/5 px-4 mx-4 bg-gray-200 rounded-xl'}>
                            <div className={'py-4 my-auto'}>
                                <p className={'text-2xl font-bold pb-4 gilroy-bold min-h-full'}>Reliable IT service provider</p>
                                {/* <div className={'pt-8 pb-8 w-full'}>
                                    <img src="/image/landingpage/image-section2.png"></img>
                                </div> */}
                                <p className={'pb-4 gilroy-medium text-lg'}>We provide guaranteed level of IT operation services to support your business.</p>
                            </div>
                        </div>
                        <div className={'min-h-full w-4/5 px-4 mx-4 bg-gray-200 rounded-xl'}>
                            <div className={'py-4 my-auto'}>
                                <p className={'text-2xl font-bold pb-4 gilroy-bold min-h-full'}>Extensive network in Indonesia</p>
                                {/* <div className={'pt-8 pb-8 w-full'}>
                                    <img src="/image/landingpage/image-section2.png"></img>
                                </div> */}
                                <p className={'pb-4 gilroy-medium text-lg'}>Having operated over the past decades in Indonesia with 45 service points in Indonesia, we can provide strong local knowledge and network to help you strive.</p>
                            </div>
                        </div>
                    </Flickity>
                    <section className={'hidden md:block container'}>
                        <div className={'flex'}>
                            <div className={'pt-8 pb-8 w-1/3 pr-2'}>
                                <p className={'text-3xl pb-4 gilroy-bold md:h-32 lg:h-20'}>Cost efficient solution</p>
                                <p className={'pb-4 gilroy-medium text-xl'}>We transform a heavy capital IT hardware infrastructure, that requires large upfront investment into managed services model.</p>
                            </div>
                            <div className={'pt-8 pb-8 w-1/3 px-2'}>
                                <p className={'text-3xl pb-4 gilroy-bold md:h-32 lg:h-20'}>Reliable IT service provider</p>
                                <p className={'pb-4 gilroy-medium text-xl'}>We provide guaranteed level of IT operation services to support your business.</p>
                            </div>
                            <div className={'pt-8 pb-8 w-1/3 pl-2'}>
                                <p className={'text-3xl pb-4 gilroy-bold md:h-32 lg:h-20'}>Extensive network in Indonesia</p>
                                <p className={'pb-4 gilroy-medium text-xl'}>Having operated over the past decades in Indonesia with 45 service points in Indonesia, we can provide strong local knowledge and network to help you strive.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <section className={'section4hardware py-4 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto flex'}>
                    <div className={'w-1/3 pr-4'}>
                        <p className={'text-3xl md:text-4xl font-bold pb-4 gilroy-bold'}>Products selection</p>
                        <p className={'pb-4 gilroy-medium text-lg md:text-xl'}>We leasing and maintaining a variety of IT hardwares</p>
                    </div>
                    <div className={'pb-8 w-1/3 pr-4'}>
                        <div className={'pb-8'}>
                            <Collapse
                            accordion
                            // defaultActiveKey={['0']}
                            // expandIconPosition={'right'}
                            >
                                <Panel className={'gilroy-medium text-center'} header={'ATM/CRM'} showArrow={false}>
                                    <p className={'font-medium'}>
                                        Lorem Ipsunm
                                    </p>
                                </Panel>
                            </Collapse>
                        </div>
                        <div className={'pb-8'}>
                            <Collapse
                            accordion
                            >
                                <Panel className={'gilroy-medium text-center'} header={'UPS'} showArrow={false}>
                                    <p className={'font-medium'}>
                                        Lorem Ipsunm
                                    </p>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                    <div className={'pb-8 w-1/3 pl-4'}>
                        <div className={'pb-8'}>
                            <Collapse
                            accordion
                            // defaultActiveKey={['0']}
                            // expandIconPosition={'right'}
                            >
                                <Panel className={'gilroy-medium text-center'} header={'Laptop/desktop'} showArrow={false}>
                                    <p className={'font-medium'}>
                                        Lorem Ipsunm
                                    </p>
                                </Panel>
                            </Collapse>
                        </div>
                        <div className={'pb-8'}>
                            <Collapse
                            accordion
                            >
                                <Panel className={'gilroy-medium text-center'} header={'Server'} showArrow={false}>
                                    <p className={'font-medium'}>
                                        Lorem Ipsunm
                                    </p>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                    {/* <p className={'pb-4 gilroy-medium text-lg md:text-xl'}>Desktop & Laptop</p>
                    <p className={'pb-4 gilroy-medium text-lg md:text-xl'}>UPS</p>
                    <p className={'pb-4 gilroy-medium text-lg md:text-xl'}>Server</p>
                    <p className={'pb-4 gilroy-medium text-lg md:text-xl'}>ATM</p>
                    <p className={'pb-4 gilroy-medium text-lg md:text-xl'}>CRM</p> */}
                </div>
            </section>
            {/* <section className={'section5hardware py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto'}>
                    <p className={'text-3xl md:text-4xl font-bold pb-4 gilroy-bold'}>Start now. Let’s be better together</p>
                    <p className={'pb-4 gilroy-medium text-lg md:text-xl'}>A sales expert will contact you within 24 hours</p>
                    <div className={'flex'}>
                        <img className={'w-1/2 flex-row py-4 pr-4'} src="/image/hardware/rectangle.png"></img>
                        <img className={'w-1/2 flex-row py-4 pl-4'} src="/image/hardware/rectangle.png"></img>
                    </div>
                    <div className={'flex'}>
                        <img className={'w-1/2 flex-row py-4 pr-4'} src="/image/hardware/rectangle.png"></img>
                        <img className={'w-1/2 flex-row py-4 pl-4'} src="/image/hardware/rectangle.png"></img>
                    </div>
                    <div className={'flex justify-end'}>
                        <button className={'text-black flex border-2 md:text-lg border-black px-4 mt-1 focus:outline-none gilroy-medium text-lg'}>Get quote &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>
                    </div>
                </div>
            </section> */}
            <section className={'py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto'}>
                    <p className={'text-3xl gilroy-bold pb-8 pt-10'}>Get yours</p>
                    <p className={'text-lg pb-4'}>Fill in your contact information, and our sales team will contact you shortly.</p>
                    <Form
                        layout={'vertical'}
                        onFinish={handleSubmit}
                        form={form}
                    >
                        <div className={'flex'}>
                            <div className={'w-1/2 mr-2'}>
                                <Form.Item name={'Company Name'} className={'font-semibold'} label="Company Name" rules={[{required: true,},]}>
                                    <Input name={'Company Name'} onChange={(e)=>{setDataHardware({...dataHardware, company_name: e.target.value})}} placeholder="" />
                                </Form.Item>
                                <Form.Item name={'Email'} className={'font-semibold'} label="Email" rules={[{required: true,type:'email'},]}>
                                    <Input name={'Email'} onChange={(e)=>{setDataHardware({...dataHardware, company_email: e.target.value})}} placeholder="" />
                                </Form.Item>
                            </div>
                            <div className={'w-1/2 ml-2'}>
                                <Form.Item name={'Contact Name'} className={'font-semibold'} label="Contact Name" rules={[{required: true,},]}>
                                    <Input name={'Contact Name'} onChange={(e)=>{setDataHardware({...dataHardware, name: e.target.value})}}  placeholder="" />
                                </Form.Item>
                                <Form.Item name={'Phone Number'} className={'font-semibold'} label="Phone Number" rules={[{required: true,pattern: new RegExp('^[0-9]*$'), message:"Please input valid phone number",},]}>
                                    <Input name={'Phone Number'} onChange={(e)=>{setDataHardware({...dataHardware, phone_number: parseInt(e.target.value)})}} placeholder="" />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item name="Message" className={'font-semibold'} label="Message" rules={[{required: true,},]}>
                            <Input.TextArea name="Message" onChange={(e)=>{setDataHardware({...dataHardware, message: e.target.value})}} />
                        </Form.Item >
                        <Form.Item name="checkbox">
                            <Checkbox name="checkbox" onChange={()=>{onChangeCheckBox()}}>By proceeding, I agree that MIG's representative may contact me by email, phone, or SMS (including by automatic telephone dialing system) at the email address or number I provide, including for marketing purposes.*</Checkbox>
                        </Form.Item >
                        <Form.Item>
                        <div className={'w-full flex justify-center pt-8 pb-8'}>
                            <Button hidden={!checkbox} disabled={checkbox} type="primary" className={''} style={{backgroundColor:'white', color:'grey', fontWeight:'600'}} key="3"><p>Submit</p></Button>
                            {/* <Button hidden={checkbox} type="primary" htmlType="submit" className={'border-black border px-4 text-white'} style={{backgroundColor:'white', color:'black', fontWeight:'600'}} key="3"><p>Submit</p></Button> */}
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

export default Hardware