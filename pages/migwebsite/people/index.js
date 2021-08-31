import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import {Button, Form, Input} from 'antd'

function People({ }) {
    const [softwareForm] = Form.useForm()
    const { TextArea } = Input;
    return (
        <Layout>
            <section className={'section1advantages hidden md:block fixed w-full z-50 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} style={{background:'#F4F4F4'}}>
                <div className={'block md:flex'}>
                    <div className={'flex py-4'}>
                        <Link href={{pathname: '/advantages'}}><p className={'cursor-pointer flex-col text-base font-semibold pr-4'} style={{}}>Advantages
                            </p></Link>
                        <Link href={{pathname: '/hardware'}}><p className={'cursor-pointer flex-col text-base font-semibold px-4'}>Hardware
                            </p></Link>
                        <Link href={{pathname: '/software'}}><p className={'cursor-pointer flex-col text-base font-semibold px-4'}>Software
                            </p></Link>
                        <Link href={{pathname: '/people'}}><p className={'cursor-pointer flex-col text-base font-semibold px-4'}>People
                            </p></Link>
                    </div>
                </div>
            </section>
            <section className={'section2advantages h-12 hidden md:block'}></section>
            {/* <section className={'section2people px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 py-8 text-center justify-center'}>
                <div className={'pb-8'}>
                    <p className={'text-2xl md:text-3xl font-bold'}>People</p>
                </div>
                <div className={'pb-12'}>
                    <p className={'text-base w-full font-bold'}>We help you reduce complexity in talent sourcing and management through staff augmentation. In typical cases, our talents have but not limited to the following specifications and deliverable</p>
                </div>
                <Button type="text" className={'button-hover mx-2 px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>Get a quote</p></Button>
            </section> */}
            <section className={'section2people py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} style={{backgroundColor:'#D9E5F9'}}>
                <div className={'hidden md:flex'}>
                    <div className={'flex-row my-auto'}>
                        <p className={'text-4xl font-bold pb-4 gilroy-bold'}>People solution</p>
                        <p className={'mr-20 pb-4 gilroy-medium text-xl'} style={{letterSpacing:'1.5px'}}>We help you reduce complexity in talent sourcing and management</p>
                        <button className={'px-4 py-2 text-white'} style={{backgroundColor:'#2A8452'}}> Tombol </button>
                    </div>
                        <div className={'flex-row pt-8 pb-8 w-1/2 ml-8'}>
                            <img src="/image/people/People-Solution.png"></img>
                        </div>
                </div>
                <div className={'block md:hidden'}>
                    <div className={'my-auto'}>
                        <p className={'text-4xl font-bold pb-4 gilroy-bold'}>People solution</p>
                        <div className={'my-auto'}>
                            <img src="/image/people/People-Solution.png"></img>
                        </div>
                        <p className={'pb-4 gilroy-medium text-xl'} style={{letterSpacing:'1.5px'}}>We help you reduce complexity in talent sourcing and management</p>
                        <button className={'px-4 py-2 text-white'} style={{backgroundColor:'#2A8452'}}> Tombol </button>
                    </div>
                </div>
            </section>
            <section className={'section2hardware py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'text-center py-16'}>
                    <p className={'text-4xl font-bold pb-4 gilroy-bold'}>Hassle free solution to build your team</p>
                </div>
                <div className={'flex'}>
                    <div className={'pt-8 pb-8 w-1/2 my-auto'}>
                        <p className={'text-4xl font-bold pb-4 gilroy-bold'}>Custom matched with your needs</p>
                        <p className={'w-2/3 pb-4 gilroy-medium text-xl'} style={{letterSpacing:'1.5px'}}>Amount of talent and their working period can be tailored as per required by project.</p>
                    </div>
                    <div className={'pt-8 pb-8 w-1/2 ml-8'}>
                        <img src="/image/landingpage/image-section2.png"></img>
                    </div>
                </div>
                <div className={'flex'}>
                    <div className={'pt-8 pb-8 w-1/2 mr-8'}>
                        <img src="/image/landingpage/image-section2.png"></img>
                    </div>
                    <div className={'pt-8 pb-8 w-1/2 my-auto'}>
                        <p className={'text-4xl font-bold pb-4 gilroy-bold'}>Risk free talent acquisition</p>
                        <p className={'w-2/3 pb-4 gilroy-medium text-xl'} style={{letterSpacing:'1.5px'}}>You have full flexibility to rotate/rematch your talent to ensure your talent quality criteria fullfiled.</p>
                    </div>
                </div>
                <div className={'flex'}>
                    <div className={'pt-8 pb-8 w-full my-auto'}>
                        <p className={'text-4xl font-bold pb-4 gilroy-bold'}>Our talents</p>
                        <p className={'w-full pb-4 gilroy-medium text-xl'} style={{letterSpacing:'1.5px'}}>We help you reduce complexity in talent sourcing and management through staff augmentation. In typical cases, our talents have but not limited to the following specifications and deliverable</p>
                    </div>
                </div>
            </section>
            <section className={'section3people justify-center px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'} >
                <div className={'border-2 rounded-sm py-8 px-8'}>
                    <p className={'font-bold text-xl'}>Software engineer</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8 mb-12'}>
                    <p className={'font-bold text-xl'}>Typical Skills:</p>
                    <p className={'py-4 text-xl'}>Bachelor's degree in Computer Science, Knowledge of primary coding languages including C++, HTML5, and JavaScript, PHP Java, Spring, Laravel,Tibco, etc., Basic programming experience, Knowledge of databases and operating systems, ability to learn new software and technologies quickly, Detail-oriented.</p>
                    <p className={'font-bold text-xl'}>Typical deliverable:</p>
                    <p className={'py-4 text-xl'}>Integration of user-facing elements developed by front-end developers, provide support in building efficient, testable, and reusable software modules, provide assistance in solving performance problems and architectural challenges, integration of data storage solutions.</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8'}>
                    <p className={'font-bold text-xl'}>Data Analyst</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8 mb-12'}>
                    <p className={'font-bold text-xl'}>Typical Skills:</p>
                    <p className={'py-4 text-xl'}>Skills: A high level of mathematical ability, Programming languages, such as SQL, Oracle and Python, The ability to analyze, model and interpret data, Problem-solving skills, A systematic and logical approach, Written and verbal communication skills.</p>
                    <p className={'font-bold text-xl'}>Typical deliverable:</p>
                    <p className={'py-4 text-xl'}>Examines information using data analysis tools. Generate meaningful results that pulled from the raw data and help make decisions by identifying various facts and trends. Typical duties includes removing corrupted data, performing initial analysis to assess the quality of the data, preparing reports based on analysis and presenting to management.</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8'}>
                    <p className={'font-bold text-xl'}>Software Quality Assurance</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8 mb-12'}>
                    <p className={'font-bold text-xl'}>Typical Skills:</p>
                    <p className={'py-4 text-xl'}>Proven experience as a Quality Assurance Tester or similar role, Experience in project management and QA methodology, ability to document and troubleshoot errors, Working Knowledge of test management software and SQL, Excellent communication skills, attention to detail, BSc/BA in Computer Science, Engineering or a related field.</p>
                    <p className={'font-bold text-xl'}>Typical deliverable:</p>
                    <p className={'py-4 text-xl'}>Reviewing and analyzing system specifications, Executing test scripts and reviewing results, Reporting and documenting technical issues, Create logs to document testing phases and defects.</p>
                </div>
                <div className={'text-center mb-12'}>
                    <p className={'font-bold text-xl'} style={{color:'#188E4D'}}>Didn't find what you are looking for? Inform us your specification, and we'll work it out for you</p>
                </div>
            </section>
            <section className={'section4people py-8 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div>
                    <p className={'text-4xl font-bold pb-4 gilroy-bold'}>Start now. Let’s be better together</p>
                    <p className={'pb-4 gilroy-medium text-xl'}>A sales expert will contact you within 24 hours</p>
                    <div className={'flex'}>
                        <img className={'w-1/2 flex-row py-4 pr-4'} src="/image/hardware/rectangle.png"></img>
                        <img className={'w-1/2 flex-row py-4 pl-4'} src="/image/hardware/rectangle.png"></img>
                    </div>
                    <div className={'flex'}>
                        <img className={'w-1/2 flex-row py-4 pr-4'} src="/image/hardware/rectangle.png"></img>
                        <img className={'w-1/2 flex-row py-4 pl-4'} src="/image/hardware/rectangle.png"></img>
                    </div>
                    <div className={'flex justify-end'}>
                        <button className={'text-black flex border-2 text-base md:text-lg border-black px-4 mt-1 focus:outline-none gilroy-medium'}>Get quote &nbsp;
                            <ArrowRightOutlined className={'pt-1'}/>
                        </button>
                    </div>
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

export default People