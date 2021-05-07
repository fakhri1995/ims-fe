import React from 'react'
import Layout from '../../../components/migwebsite/layout.js'
import Link from 'next/link'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import { Button, Collapse } from 'antd'
import Flickity from 'react-flickity-component'

function Careers({ }) {
    const flickityOption1={
        prevNextButtons: false,
        pageDots: true,
        draggable: true,
        initialIndex: 0,
    }
    const flickityOption2={
        prevNextButtons: true,
        pageDots: false,
        draggable: true,
        initialIndex: 0,
    }
    const flickityOption3={
        prevNextButtons: false,
    }
    const { Panel } = Collapse;
    return (
        <Layout>
            <section className={'section1careers py-4 md:py-20 px-4 md:px-20 lg:px-28 xl:px-40'}>
                <div className={'block md:flex'}>
                    <div className={'flex-col m-auto'}>
                        <div className={''}>
                            <p className={'text-3xl md:text-4xl pb-6 text-center md:text-left'} style={{ fontWeight: 'bold' }}>Careers at MIG
                                </p>
                            <div className={'flex-col block md:hidden pb-6'}>
                                <img style={{ width: '1000px', height: 'auto' }} src='/image-careers.png' />
                            </div>
                            <p className={' text-sm md:text-base font-bold pb-4'}>We are currently looking to expand our team! Our team comprises of highly motivated, positive and hardworking individuals.
                                </p>
                            <Button type="text" className={'button-hover px-4 border-green-800 text-white'} style={{backgroundColor:'#188E4D', color:'white', fontWeight:'600'}} key="3"><p>See open positions</p></Button>
                        </div>
                    </div>
                    <div className={'flex-col hidden md:flex ml-4'}>
                        <img style={{ width: '1000px', height: 'auto' }} src='/image-careers.png' />
                    </div>
                </div>
            </section>
            <section className={'section2careers hidden md:block px-4 md:px-20 lg:px-28 xl:px-40'} style={{background:'#F4F4F4'}}>
                <div className={'block md:flex'}>
                    <div className={'flex py-4'}>
                        <a href='/careers/#ourvalues'><p className={'text-black cursor-pointer flex-col text-base font-semibold pr-12'} style={{}}>Our Values
                            </p></a>
                        <a href='/careers/#lifeatmig'><p className={'text-black cursor-pointer flex-col text-base font-semibold pr-12'} style={{}}>Life at MIG
                            </p></a>
                        <a href='/careers/#employeestories'><p className={'text-black cursor-pointer flex-col text-base font-semibold pr-12'} style={{}}>Employee Stories
                            </p></a>
                        <a href='/careers/#benefits'><p className={'text-black cursor-pointer flex-col text-base font-semibold pr-12'} style={{}}>Benefits
                            </p></a>
                        <a href='/careers/#vacancies'><p className={'text-black cursor-pointer flex-col text-base font-semibold pr-12'} style={{}}>Vacancies
                            </p></a>
                    </div>
                </div>
            </section>
            <section className={'section3careers h-8 hidden md:block'}></section>
            <section className={'section4careers py-10 px-4 md:px-20 lg:px-28 xl:px-40'} style={{background:'#F4F4F4'}} id='ourvalues'>
                <div>
                    <p className={'text-2xl font-bold'}>Our Values</p>
                </div>
                <div className={'hidden md:flex justify-beetwen'}>
                    <div className={'w-1/3 flex-col'}>
                        <div className={'py-8'}>
                            <img src={'/avatar.png'}></img>
                        </div>
                        <div>
                            <p className={'text-xl'}>Lorem Ipsum 1</p>
                            <p className={''}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel mollis risus.</p>
                        </div>
                    </div>
                    <div className={'w-1/3 flex-col'}>
                        <div className={'py-8'}>
                            <img src={'/avatar.png'}></img>
                        </div>
                        <div>
                            <p className={'text-xl'}>Lorem Ipsum 2</p>
                            <p className={''}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel mollis risus.</p>
                        </div>
                    </div>
                    <div className={'w-1/3 flex-col'}>
                        <div className={'py-8'}>
                            <img src={'/avatar.png'}></img>
                        </div>
                        <div>
                            <p className={'text-xl'}>Lorem Ipsum 3</p>
                            <p className={''}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel mollis risus.</p>
                        </div>
                    </div>
                </div>
                <Flickity
                className={'block md:hidden carousel'}
                options={flickityOption1}
                elementType={'div'}
                disableImagesLoaded={false} 
                reloadOnUpdate 
                static
                >
                    <div className={'w-full'}>
                        <div className={'py-8'}>
                            <img className={'block m-auto'} src={'/avatar.png'}></img>
                        </div>
                        <div className={'pb-4'}>
                            <p className={'text-xl pb-4 text-center'}>Lorem Ipsum 1</p>
                            <p className={'text-left'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel mollis risus.</p>
                        </div>
                    </div>
                    <div className={'w-full'}>
                        <div className={'py-8'}>
                            <img className={'block m-auto'} src={'/avatar.png'}></img>
                        </div>
                        <div  className={'pb-4'}className={''}>
                            <p className={'text-xl pb-4 text-center'}>Lorem Ipsum 2</p>
                            <p className={'text-left'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel mollis risus.</p>
                        </div>
                    </div>
                    <div className={'w-full'}>
                        <div className={'py-8'}>
                            <img className={'block m-auto'} src={'/avatar.png'}></img>
                        </div>
                        <div className={'pb-4'}>
                            <p className={'text-xl pb-4 text-center'}>Lorem Ipsum 3</p>
                            <p className={'text-left'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel mollis risus.</p>
                        </div>
                    </div>
                </Flickity>
            </section>
            <section className={'section4careers py-10 px-4 md:px-20 lg:px-28 xl:px-40 h-auto'}>
                <div>
                    <p className={'text-2xl font-bold text-center pb-8'}>What is it like to work at Mitramas Solusi?</p>
                    <Flickity
                    className={'carousel section4careersflickity'}
                    options={flickityOption2}
                    elementType={'div'}
                    disableImagesLoaded={false} 
                    reloadOnUpdate 
                    static
                    >
                        <div className={'w-full px-0 md:overflow-hidden'}>
                            <div className={' -bottom-40 md:bottom-0 bg-white z-10 p-8 w-72 md:w-96 h-64 md:h-96 m-auto md:my-10 md:mx-3 text-center relative '} style={{boxShadow:'0 0px 20px rgb(0 0 0 / 20%)'}}>
                                <p className={'text-2xl font-bold pb-4'}>Rapid Advancement in the Tech Industry</p>
                                <p>With a growing client base, we are constantly looking for new opportunities to excel in the tech world.</p>
                            </div>
                            <div className={'z-0 top-0 left-0 md:left-48 absolute w-auto'} style={{width:'100%', height:'100%'}}>
                                <img src="/tes.jpg" className={'w-full'}></img>
                            </div>
                        </div>
                        <div className={'w-full px-0 md:overflow-hidden'}>
                            <div className={' -bottom-40 md:bottom-0 bg-white z-10 p-8 w-72 md:w-96 h-64 md:h-96 m-auto md:my-10 md:mx-3 text-center relative '} style={{boxShadow:'0 0px 20px rgb(0 0 0 / 20%)'}}>
                                <p className={'text-2xl font-bold pb-4'}>Rapid Advancement in the Tech Industry</p>
                                <p>With a growing client base, we are constantly looking for new opportunities to excel in the tech world.</p>
                            </div>
                            <div className={'z-0 top-0 left-0 md:left-48 absolute w-auto'} style={{width:'100%', height:'100%'}}>
                                <img src="/tes.jpg" className={'w-full'}></img>
                            </div>
                        </div>
                        
                    </Flickity>
                </div>
            </section>
            <section className={'section5careers py-10 md:p-20 h-auto'} style={{background:'#188E4D'}}>
                <Flickity
                className={'carousel'}
                options={flickityOption3}
                elementType={'div'}
                disableImagesLoaded={false} 
                reloadOnUpdate 
                static
                >
                    <div className={'w-full text-center'}>
                        <div>
                            <p className={'text-2xl font-bold text-white pb-8 px-10'}>I gained the professional skills of project management, problem solving, flexibility, time management, mediation, efficiency and collaboration. </p>
                        </div>
                        <div>
                            <img className={'m-auto pb-4'} src="/avatar.png"></img>
                            <p className={'text-white text-base'}>Lorem Ipsum 1</p>
                            <p className={'text-white text-lg'}>Middleware Engineer</p>
                        </div>
                    </div>
                    <div className={'w-full text-center'}>
                        <div>
                            <p className={'text-2xl font-bold text-white pb-8 px-10'}>I gained the professional skills of project management, problem solving, flexibility, time management, mediation, efficiency and collaboration. </p>
                        </div>
                        <div>
                            <img className={'m-auto pb-4'} src="/avatar.png"></img>
                            <p className={'text-white text-base'}>Lorem Ipsum 2</p>
                            <p className={'text-white text-lg'}>Middleware Engineer</p>
                        </div>
                    </div>
                </Flickity>
            </section>
            <section className={'section6careers py-10 px-4 md:px-20 lg:px-28 xl:px-40 h-auto'}>
                <div>
                    <p className={'text-center font-bold text-3xl pb-8'}>Benefits</p>
                    <p className={'pb-8'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis sapien ac dapibus aliquet. Cras tempus mauris nibh, in feugiat ipsum tristique quis. In neque velit, fermentum eget auctor nec, ultricies nec nulla. Sed ut odio sapien. Vestibulum at eros dignissim.
                    </p>
                    <div className={'block md:flex justify-between'}>
                        <div className={'pb-6 flex-row flex justify-center'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                            Lorem ipsum dolor sit amet 1
                            </p>
                        </div>
                        <div className={'pb-6 flex-row flex justify-center'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                            Lorem ipsum dolor sit amet 4
                            </p>
                        </div>
                    </div>
                    <div className={'block md:flex justify-between'}>
                        <div className={'pb-6 flex-row flex justify-center'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                            Lorem ipsum dolor sit amet 2
                            </p>
                        </div>
                        <div className={'pb-6 flex-row flex justify-center'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                            Lorem ipsum dolor sit amet 5
                            </p>
                        </div>
                    </div>
                    <div className={'block md:flex justify-between'}>
                        <div className={'pb-6 flex-row flex justify-center'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                            Lorem ipsum dolor sit amet 3
                            </p>
                        </div>
                        <div className={'pb-6 flex-row flex justify-center'}>
                            <img className={'flex-row'} src='/avatar.png'></img>
                            <p className={' text-base flex-row my-auto pl-4'}>
                            Lorem ipsum dolor sit amet 6
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={'section7careers pb-10 md:pb-20 px-4 md:px-20 lg:px-28 xl:px-40 h-auto'}>
                <div className={'block md:flex justify-between'}>
                    <div className={'flex-row left-column-section7careers pr-0 md:pr-8'}>
                        <p className={'text-3xl font-bold pb-8'}>Careers at MIG</p>
                        <p className={'pb-8'}>Want to advance your career with us ? See our job openings below for our current financial services and government projects.</p>
                        <div className={'w-5/12 border-t-8 border-green-700 pb-8'}></div>
                        <p className={'pb-8'}>Didn't find the role that best describes your skills ? Send your CV to <span className={'font-bold'}>recruitment@mitrasolusi.group</span> for potential opportunities</p>
                    </div>
                    <div className={'flex-row w-full'}>
                    <Collapse
                    accordion
                    defaultActiveKey={['1']}
                    expandIconPosition={'right'}
                    >
                        <Panel header="Account Executive" key="1">
                            <div>
                                <div className={'pb-4'}>
                                    <p className={'font-bold'}>Location:</p>
                                    <p>Yogyakarta  Jakarta  Malang  Semarang  Tangerang</p>
                                </div>
                                <div className={'pb-4'}>
                                    <p className={'font-bold'}>Requirements:</p>
                                    <p>-Min. Bachelor Degree in Business/Management.</p>
                                    <p>-At least 1-2 years of working experience in the related background. Startup experience is a plus.</p>
                                    <p>-Proficient in English.</p>
                                    <p>-Excellent interpersonal skills with attitude in building relationships with clients.</p>
                                    <p>-Excellent verbal and written communication skills, be a listener and presenter.</p>
                                    <p>-Ability in problem solving and negotiation.</p>
                                    <p>-Adaptability, curiosity and energetic attitude.</p>
                                </div>
                                <div className={'pb-4'}>
                                    <p className={'font-bold'}>Job Description:</p>
                                    <p>-Build and acquire new sales leads and grow existing property owners (cold calling, client meeting,etc).</p>
                                    <p>-Engage and maintain strong relationships with the client.</p>
                                    <p>-Keep up with the market trends and grasp sales opportunities to achieve targets.</p>
                                    <p>-Analyzing key account performance to identify the problem to develop initiatives and propose solutions.</p>
                                    <p>-Conduct a business presentation for clients and discuss further expansion.</p>
                                    <p>-Working closely with the internal departments to support the account’s business needs and requirements through cross-functional efforts.</p>
                                    <p>-Data-Driven and Update to Market: Should be able to read and communicate data on the chart, graphs, etc. Keep updated with the market trends, and be able to predict upcoming trend.</p>
                                </div>
                                <a className={'text-base'}>Apply Now<ArrowRightOutlined className={'pl-2 relative -top-0.5'}/></a>
                            </div>
                        </Panel>
                        <Panel header="Backend Developer" key="2">
                            isi apanih
                        </Panel>
                        <Panel header="Business Developtment" key="3">
                            isi apanih
                        </Panel>
                        <Panel header="Commercial Analyst Intern" key="4">
                            isi apanih
                        </Panel>
                        <Panel header="Data Engineer" key="5">
                            isi apanih
                        </Panel>
                        <Panel header="Data Scientist" key="6">
                            isi apanih
                        </Panel>
                        <Panel header="Senior Product Manager" key="7">
                            isi apanih
                        </Panel>
                    </Collapse>
                    </div>
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

export default Careers