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
            <section className={'section1advantages hidden md:block fixed w-full z-50 px-4 md:px-20 lg:px-28 xl:px-40'} style={{background:'#F4F4F4'}}>
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
            <section className={'section2people px-4 md:px-20 lg:px-28 xl:px-40 py-8 text-center justify-center'}>
                <div className={'pb-8'}>
                    <p className={'text-2xl md:text-3xl font-bold'}>People</p>
                </div>
                <div className={'pb-12'}>
                    <p className={'text-base w-full font-bold'}>We help you reduce complexity in talent sourcing and management through staff augmentation. In typical cases, our talents have but not limited to the following specifications and deliverable</p>
                </div>
                <Button type="text" className={'button-hover mx-2 px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>Get a quote</p></Button>
            </section>
            <section className={'section3people justify-center px-4 md:px-24 lg:px-28 xl:px-40'} >
                <div className={'border-2 rounded-sm py-8 px-8'}>
                    <p className={'font-bold text-lg'}>Software engineer</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8 mb-12'}>
                    <p className={'font-bold'}>Typical Skills:</p>
                    <p className={'py-4'}>Bachelor's degree in Computer Science, Knowledge of primary coding languages including C++, HTML5, and JavaScript, PHP Java, Spring, Laravel,Tibco, etc., Basic programming experience, Knowledge of databases and operating systems, ability to learn new software and technologies quickly, Detail-oriented.</p>
                    <p className={'font-bold'}>Typical deliverable:</p>
                    <p className={'py-4'}>Integration of user-facing elements developed by front-end developers, provide support in building efficient, testable, and reusable software modules, provide assistance in solving performance problems and architectural challenges, integration of data storage solutions.</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8'}>
                    <p className={'font-bold text-lg'}>Data Analyst</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8 mb-12'}>
                    <p className={'font-bold'}>Typical Skills:</p>
                    <p className={'py-4'}>Skills: A high level of mathematical ability, Programming languages, such as SQL, Oracle and Python, The ability to analyze, model and interpret data, Problem-solving skills, A systematic and logical approach, Written and verbal communication skills.</p>
                    <p className={'font-bold'}>Typical deliverable:</p>
                    <p className={'py-4'}>Examines information using data analysis tools. Generate meaningful results that pulled from the raw data and help make decisions by identifying various facts and trends. Typical duties includes removing corrupted data, performing initial analysis to assess the quality of the data, preparing reports based on analysis and presenting to management.</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8'}>
                    <p className={'font-bold text-lg'}>Software Quality Assurance</p>
                </div>
                <div className={'border-2 rounded-sm py-8 px-8 mb-12'}>
                    <p className={'font-bold'}>Typical Skills:</p>
                    <p className={'py-4'}>Proven experience as a Quality Assurance Tester or similar role, Experience in project management and QA methodology, ability to document and troubleshoot errors, Working Knowledge of test management software and SQL, Excellent communication skills, attention to detail, BSc/BA in Computer Science, Engineering or a related field.</p>
                    <p className={'font-bold'}>Typical deliverable:</p>
                    <p className={'py-4'}>Reviewing and analyzing system specifications, Executing test scripts and reviewing results, Reporting and documenting technical issues, Create logs to document testing phases and defects.</p>
                </div>
                <div className={'text-center mb-12'}>
                    <p className={'font-bold text-base'} style={{color:'#188E4D'}}>Didn't find what you are looking for? Inform us your specification, and we'll work it out for you</p>
                </div>
            </section>
            <section className={'section5landingpage'}>
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
            </section>

        </Layout>
    )
}

export default People