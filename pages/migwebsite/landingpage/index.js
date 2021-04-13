// File pages/index.js

import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import {Typography, Space, Button,Row,Col } from 'antd'

function LandingPage({}) {
    const { Title } = Typography;
    // const tok = initProps
    // const cook = jscookie.get('token')
    // console.log("cookie di dashboard: " + cook)
    return (
        <Layout>
            <div className={'section1'}>
                {/* <div className={'center'}>
                    <Title className={''}>Your One Stop,<br></br>
                        Cost Efficient IT Solutions
                    </Title>
                    <Title level={4}>Improving efficiencies by supporting you with staff <br></br>
                        augmentation, software and hardware managed services.
                    </Title>
                </div>
                <div className="top-3 " >
                        <img width={'auto'} height={'auto'} src='/image-section1.png'/>
                    </div> */}
                    {/* <div className="space-align-container">
                        <div className="space-align-block">
                        <Space size={10} align="center">
                        <div className={''}>
                            <Title className={''}>Your One Stop,<br></br>
                                Cost Efficient IT Solutions
                            </Title>
                            <Title level={4}>Improving efficiencies by supporting you with staff <br></br>
                                augmentation, software and hardware managed services.
                            </Title>
                        </div>
                            <span className="mock-block">
                                <img style={{minWidth:'400px', height:'auto'}} src='/image-section1.png'/>
                            </span>
                        </Space>
                        </div>
                    </div> */}
            </div>
            <div className={'section2'}>
                    <div className={'block md:flex'}>
                        <div className={'flex-col center'}>
                            <div className={''}>
                                <p className={'text-3xl md:text-4xl'} style={{fontWeight: 'bold'}}>Your One Stop,
                                    Cost Efficient IT Solutions
                                </p>
                                <p className={' text-sm md:text-base font-bold'}>Improving efficiencies by supporting you with staff 
                                    augmentation, software and hardware managed services.
                                </p>
                            </div>
                        </div>
                        <div className={'flex-col'}>
                            <img style={{width:'1500px', height:'auto'}} src='/image-section1.png'/>
                        </div>
                    </div>
            </div>

        </Layout>
    )
}

export default LandingPage