import {React, useState} from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import {Form, Input, Button, Checkbox, notification, Collapse} from 'antd'
import Flickity from 'react-flickity-component'

function Talents({ }) {
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
        setSubmit(!checkbox)
    }
    const handleSubmit = () => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/addMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPeople)
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
    const [dataPeople, setDataPeople] = useState({
        company_name: null,
        company_email: null,
        name: null,
        phone_number: null,
        interested_in: 'talents',
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
                    Enabling you to assemble the best team
                    </p>
                </div>
            </section>
            <section className={'section2people py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'hidden md:flex container mx-auto'}>
                    <div className={'flex-row w-1/2 my-auto'}>
                        <p className={'text-3xl pb-4 gilroy-bold'}>Building team takes massive <span style={{borderBottom:'solid 3px #188E4D',paddingBottom:'2.5px'}}>effort</span></p>
                        <p className={'mr-20 pb-4 gilroy-medium text-xl'}>Large quantity of profiles coming in with widely different qualities. Your turnover rate is high and you have to do it all over again.</p>
                        <p className={'mr-20 gilroy-medium text-xl'}>Let us streamline your process with:</p>
                        <ul className={'list-inside list-disc'}>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>On-demand</span> expertise</li>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>Flexible</span> talent head counts and working period</li>
                        </ul>
                    </div>
                        <div className={'flex-row pt-8 pb-8 w-1/2 ml-8'}>
                            <img src="/image/people/People-Solution.png"></img>
                        </div>
                </div>
                <div className={'block md:hidden'}>
                    <div className={'my-auto'}>
                        <p className={'text-2xl pb-8 gilroy-bold'}>Building team takes massive <span style={{borderBottom:'solid 3px #188E4D',paddingBottom:'2.5px'}}>effort</span></p>
                        <div className={'my-auto'}>
                            <img src="/image/people/People-Solution.png"></img>
                        </div>
                        <p className={'mr-20 pb-4 gilroy-medium text-xl'}>Large quantity of profiles coming in with widely different qualities. Your turnover rate is high and you have to do it all over again.</p>
                        <p className={'mr-20 gilroy-medium text-xl'}>Let us streamline your process with:</p>
                        <ul className={'list-inside list-disc'}>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>On-demand</span> expertise</li>
                            <li className={'gilroy-medium text-xl'}><span className={'gilroy-bold'}>Flexible</span> talent head counts and working period</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className={'section2hardware py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
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
                        <div className={' min-h-full w-4/5 px-4 mx-4 bg-gray-200 rounded-xl'}>
                            <div className={'py-4 my-auto'}>
                                <p className={'text-2xl font-bold pb-4 gilroy-bold min-h-full'}>Custom matched with your needs</p>
                                {/* <div className={'pt-8 pb-8'}>
                                    <img src="/image/landingpage/image-section2.png"></img>
                                </div> */}
                                <p className={'pb-4 gilroy-medium text-lg'}>Numbers of talent and their working period can be tailored as per required by project.</p>
                            </div>
                        </div>
                        <div className={' min-h-full w-4/5 px-4 mx-4 bg-gray-200 rounded-xl'}>
                            <div className={'py-4 my-auto'}>
                                <p className={'text-2xl font-bold pb-4 gilroy-bold min-h-full'}>Risk free talent acquisition</p>
                                {/* <div className={'pt-8 pb-8'}>
                                    <img src="/image/landingpage/image-section2.png"></img>
                                </div> */}
                                <p className={'pb-4 gilroy-medium text-lg'}>You have full flexibility to rotate and rematch your talent to ensure your quality criteria is fullfiled.</p>
                            </div>
                        </div>
                        <div className={' min-h-full w-4/5 px-4 mx-4 bg-gray-200 rounded-xl'}>
                            <div className={'py-4 my-auto'}>
                                <p className={'text-2xl font-bold pb-4 gilroy-bold min-h-full'}>Get qualified talent for your team</p>
                                {/* <div className={'pt-8 pb-8'}>
                                    <img src="/image/landingpage/image-section2.png"></img>
                                </div> */}
                                <p className={'pb-4 gilroy-medium text-lg'}>Top talents take our extensive tests and interview process covering tech stacks, coding algorithm, systems design, and soft skills.</p>
                            </div>
                        </div>
                    </Flickity>
                    <div className={'hidden md:block container'}>
                        <div className={'flex'}>
                            <div className={'pt-8 pb-8 w-1/3 pr-2'}>
                                <p className={'text-3xl pb-4 gilroy-bold md:h-32 lg:h-20'}>Custom matched with your needs</p>
                                <p className={'pb-4 gilroy-medium text-xl'}>Numbers of talent and their working period can be tailored as per required by project.</p>
                            </div>
                            <div className={'pt-8 pb-8 w-1/3 px-2'}>
                                <p className={'text-3xl pb-4 gilroy-bold md:h-32 lg:h-20'}>Risk free talent acquisition</p>
                                <p className={'pb-4 gilroy-medium text-xl'}>You have full flexibility to rotate and rematch your talent to ensure your quality criteria is fullfiled.</p>
                            </div>
                            <div className={'pt-8 pb-8 w-1/3 pl-2'}>
                                <p className={'text-3xl pb-4 gilroy-bold md:h-32 lg:h-20'}>Get qualified talent for your team</p>
                                <p className={'pb-4 gilroy-medium text-xl'}>Top talents take our extensive tests and interview process covering tech stacks, coding algorithm, systems design, and soft skills.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={'section4hardware py-4 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto block md:flex'}>
                    <div className={'w-full md:w-1/3 pr-0 md:pr-4'}>
                        <p className={'text-3xl md:text-4xl font-bold pb-4 gilroy-bold'}>Our talents profile</p>
                        <p className={'pb-4 gilroy-medium text-lg md:text-xl'}>In typical cases, our talents have but not limited to the following specifications and deliverable</p>
                    </div>
                    <div className={'pb-0 md:pb-8 w-full md:w-1/3 pr-0 md:pr-4'}>
                        <div className={'pb-8'}>
                            <Collapse
                            accordion
                            // defaultActiveKey={['0']}
                            // expandIconPosition={'right'}
                            >
                                <Panel className={'gilroy-medium text-lg'} header={'Software Engineer'} showArrow={false}>
                                    <div className={'py-4 px-4'}>
                                        <p className={'gilroy-bold text-lg md:text-xl text-center'}>Typical Skills:</p>
                                        <p className={'py-4 gilroy-medium text-lg md:text-xl'}>Bachelor's degree in Computer Science, Knowledge of primary coding languages including C++, HTML5, and JavaScript, PHP Java, Spring, Laravel,Tibco, etc., Basic programming experience, Knowledge of databases and operating systems, ability to learn new software and technologies quickly, Detail-oriented.</p>
                                        <p className={'gilroy-bold text-lg md:text-xl text-center'}>Typical deliverable:</p>
                                        <p className={'py-4 gilroy-medium text-lg md:text-xl'}>Integration of user-facing elements developed by front-end developers, provide support in building efficient, testable, and reusable software modules, provide assistance in solving performance problems and architectural challenges, integration of data storage solutions.</p>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                        <div className={'pb-8'}>
                            <Collapse
                            accordion
                            >
                                <Panel className={'gilroy-medium text-lg'} header={'Data Analyst'} showArrow={false}>
                                    <div className={'py-4 px-4'}>
                                        <p className={'gilroy-bold text-lg md:text-xl text-center'}>Typical Skills:</p>
                                        <p className={'py-4 gilroy-medium text-lg md:text-xl'}>Skills: A high level of mathematical ability, Programming languages, such as SQL, Oracle and Python, The ability to analyze, model and interpret data, Problem-solving skills, A systematic and logical approach, Written and verbal communication skills.</p>
                                        <p className={'gilroy-bold text-lg md:text-xl text-center'}>Typical deliverable:</p>
                                        <p className={'py-4 gilroy-medium text-lg md:text-xl'}>Examines information using data analysis tools. Generate meaningful results that pulled from the raw data and help make decisions by identifying various facts and trends. Typical duties includes removing corrupted data, performing initial analysis to assess the quality of the data, preparing reports based on analysis and presenting to management.</p>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                    <div className={'pb-0 md:pb-8 w-full md:w-1/3 pr-0 md:pr-4'}>
                        <div className={'pb-8'}>
                            <Collapse
                            accordion
                            // defaultActiveKey={['0']}
                            // expandIconPosition={'right'}
                            >
                                <Panel className={'gilroy-medium text-lg'} header={'Quality Assurance'} showArrow={false}>
                                    <div className={'py-4 px-4'}>
                                        <p className={'gilroy-bold text-lg md:text-xl text-center'}>Typical Skills:</p>
                                        <p className={'py-4 gilroy-medium text-lg md:text-xl'}>Proven experience as a Quality Assurance Tester or similar role, Experience in project management and QA methodology, ability to document and troubleshoot errors, Working Knowledge of test management software and SQL, Excellent communication skills, attention to detail, BSc/BA in Computer Science, Engineering or a related field.</p>
                                        <p className={'gilroy-bold text-lg md:text-xl text-center'}>Typical deliverable:</p>
                                        <p className={'py-4 gilroy-medium text-lg md:text-xl'}>Reviewing and analyzing system specifications, Executing test scripts and reviewing results, Reporting and documenting technical issues, Create logs to document testing phases and defects.</p>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                        <div className={'pb-8'}>
                            <Collapse
                            accordion
                            >
                                <Panel className={'gilroy-medium text-lg'} header={'Product'} showArrow={false}>
                                    <p className={'gilroy-medium'}>
                                        Lorem Ipsunm
                                    </p>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className={'section3people justify-center px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} >
                <div className={'border-2 rounded-sm py-8 px-8'}>
                    <p className={'font-bold text-lg md:text-xl'}>Software engineer</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8 mb-12'}>
                    <p className={'font-bold text-lg md:text-xl'}>Typical Skills:</p>
                    <p className={'py-4 text-lg md:text-xl'}>Bachelor's degree in Computer Science, Knowledge of primary coding languages including C++, HTML5, and JavaScript, PHP Java, Spring, Laravel,Tibco, etc., Basic programming experience, Knowledge of databases and operating systems, ability to learn new software and technologies quickly, Detail-oriented.</p>
                    <p className={'font-bold text-lg md:text-xl'}>Typical deliverable:</p>
                    <p className={'py-4 text-lg md:text-xl'}>Integration of user-facing elements developed by front-end developers, provide support in building efficient, testable, and reusable software modules, provide assistance in solving performance problems and architectural challenges, integration of data storage solutions.</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8'}>
                    <p className={'font-bold text-lg md:text-xl'}>Data Analyst</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8 mb-12'}>
                    <p className={'font-bold text-lg md:text-xl'}>Typical Skills:</p>
                    <p className={'py-4 text-lg md:text-xl'}>Skills: A high level of mathematical ability, Programming languages, such as SQL, Oracle and Python, The ability to analyze, model and interpret data, Problem-solving skills, A systematic and logical approach, Written and verbal communication skills.</p>
                    <p className={'font-bold text-lg md:text-xl'}>Typical deliverable:</p>
                    <p className={'py-4 text-lg md:text-xl'}>Examines information using data analysis tools. Generate meaningful results that pulled from the raw data and help make decisions by identifying various facts and trends. Typical duties includes removing corrupted data, performing initial analysis to assess the quality of the data, preparing reports based on analysis and presenting to management.</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8'}>
                    <p className={'font-bold text-lg md:text-xl'}>Software Quality Assurance</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8 mb-12'}>
                    <p className={'font-bold text-lg md:text-xl'}>Typical Skills:</p>
                    <p className={'py-4 text-lg md:text-xl'}>Proven experience as a Quality Assurance Tester or similar role, Experience in project management and QA methodology, ability to document and troubleshoot errors, Working Knowledge of test management software and SQL, Excellent communication skills, attention to detail, BSc/BA in Computer Science, Engineering or a related field.</p>
                    <p className={'font-bold text-lg md:text-xl'}>Typical deliverable:</p>
                    <p className={'py-4 text-lg md:text-xl'}>Reviewing and analyzing system specifications, Executing test scripts and reviewing results, Reporting and documenting technical issues, Create logs to document testing phases and defects.</p>
                </div>
                <div className={'text-center mb-12'}>
                    <p className={'font-bold text-lg md:text-xl'} style={{color:'#188E4D'}}>Didn't find what you are looking for? Inform us your specification, and we'll work it out for you</p>
                </div>
            </section> */}
            {/* <section className={'section4people py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div>
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
                        <button className={'text-black flex border-2 text-lg md:text-xl border-black px-4 mt-1 focus:outline-none gilroy-medium'}>Get quote &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>
                    </div>
                </div>
            </section> */}
            <section className={'py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto'}>
                    <p className={'text-3xl gilroy-bold pb-8 pt-4 md:pt-10'}>Build your team now</p>
                    <p className={'gilroy-medium text-lg pb-4'}>Fill in your contact information, and our sales team will contact you shortly.</p>
                    <Form
                        layout={'vertical'}
                        onFinish={handleSubmit}
                        form={form}
                    >
                        <div className={'flex'}>
                            <div className={'w-1/2 mr-2'}>
                                <Form.Item name={'Company Name'} className={'gilroy-medium text-xl'} label="Company Name" rules={[{required: true,},]}>
                                    <Input name={'Company Name'} onChange={(e)=>{setDataPeople({...dataPeople, company_name: e.target.value})}} placeholder="" />
                                </Form.Item>
                                <Form.Item name={'Email'} className={'gilroy-medium text-xl'} label="Email" rules={[{required: true,type:'email'},]}>
                                    <Input name={'Email'} onChange={(e)=>{setDataPeople({...dataPeople, company_email: e.target.value})}} placeholder="" />
                                </Form.Item>
                            </div>
                            <div className={'w-1/2 ml-2'}>
                                <Form.Item name={'Contact Name'} className={'gilroy-medium text-xl'} label="Contact Name" rules={[{required: true,},]}>
                                    <Input name={'Contact Name'} onChange={(e)=>{setDataPeople({...dataPeople, name: e.target.value})}}  placeholder="" />
                                </Form.Item>
                                <Form.Item name={'Phone Number'} className={'gilroy-medium text-xl'} label="Phone Number" rules={[{required: true,pattern: new RegExp('^[0-9]*$'), message:"Please input valid phone number",},]}>
                                    <Input name={'Phone Number'} onChange={(e)=>{setDataPeople({...dataPeople, phone_number: parseInt(e.target.value)})}} placeholder="" />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item name="Message" className={'gilroy-medium text-xl'} label="Message" rules={[{required: true,},]}>
                            <Input.TextArea name="Message" onChange={(e)=>{setDataPeople({...dataPeople, message: e.target.value})}} />
                        </Form.Item >
                        <Form.Item name="checkbox">
                            <Checkbox name="checkbox" className={'gilroy-regular text-xl'} onChange={()=>{onChangeCheckBox()}}>By proceeding, I agree that MIG's representative may contact me by email, phone, or SMS (including by automatic telephone dialing system) at the email address or number I provide, including for marketing purposes.*</Checkbox>
                        </Form.Item >
                        <Form.Item>
                        <div className={'w-full flex justify-center pt-8 pb-8'}>
                            <Button hidden={!checkbox} disabled={checkbox} type="primary" className={''} style={{backgroundColor:'white', color:'grey'}} key="3"><p>Submit</p></Button>
                            {/* <Button hidden={checkbox} type="primary" htmlType="submit" className={'button-hover px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white'}} key="3"><p>Submit</p></Button> */}
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

export default Talents