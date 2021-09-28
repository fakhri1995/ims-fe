import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'

function Privacy({ }) {
   
    return (
        <Layout>
            <section className={'px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto'}>
                    <div>
                        <p className={'text-3xl gilroy-bold pb-8 pt-10'}>Privacy Statement</p>
                    </div>
                    <div className={''}>
                        <p className={'pb-8 gilroy-medium text-base'}>
                            Mitramas Infosys Global(MIG) including its subsidiaries and affiliates (collectively, "MIG," "we," or "us") 
                            respects the privacy of its customers, business partners, event attendees, job applicants and Website (as 
                            defined below) visitors. The following Privacy Statement explains who we are and the different ways in which 
                            we collect, use, and share personal information about you, and how you can exercise your privacy rights. 
                            Please take the time to read this Privacy Statement and the related statements in their entirety to ensure 
                            you are fully informed. To access a specific policy, you may click on the relevant link below. Note that we 
                            may provide additional information about our privacy practices that are specific to one of our websites, 
                            events, products, or services.
                        </p>
                        <p className={'pb-8 gilroy-medium text-base'}>
                            If you have any questions or concerns about our use of your personal information, please contact us using the 
                            contact details provided at the bottom of this Privacy Statement.
                        </p>
                        <p className={'gilroy-bold text-base'}>
                            Privacy Statement
                        </p>
                        <p className={'pb-8 gilroy-medium text-base'}>
                            Our Privacy Statement covers our privacy practices with respect to the collection, use, and disclosure of 
                            information obtained: (i) through the MIG websites that link to this Privacy Statement (our "Website"); and 
                            (ii) events hosted by MIG or our business partners and sponsors where we collect information from attendees 
                            (“Events”).
                        </p>
                        <p className={'gilroy-bold text-base'}>
                            Cookies Policy
                        </p>
                        <p className={'pb-8 gilroy-medium text-base'}>
                            Our Cookies Policy addresses how we use cookies and other similar tracking technologies when you visit our 
                            websites or use our products, services, and mobile applications.
                        </p>
                        <p className={'gilroy-bold text-base'}>
                            Services Privacy Statement
                        </p>
                        <p className={'pb-8 gilroy-medium text-base'}>
                            Our Services Privacy Statement covers our privacy practices in connection with the use of our hosted software 
                            applications and related support services, as well as expert services, including professional services, 
                            trainings and certifications that we provide to customers. This Services Privacy Statement also describes our 
                            privacy practices with respect to customer and partner contact information we process in connection with the 
                            purchase and use of our products and services or services or technology provided by our partners to our 
                            customers.
                        </p>
                        <p className={'gilroy-bold text-base'}>
                            Applicant Privacy Statement
                        </p>
                        <p className={'pb-8 gilroy-medium text-base'}>
                            Our Applicant Privacy Statement covers our privacy practices in connection with an individual’s application 
                            for employment at Mitramas Infosys Global.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Privacy