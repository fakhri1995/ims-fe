import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/migwebsite/layout.js'
import {Collapse} from 'antd'
import Head from "next/head";

function TermOfUse({ }) {
    const { Panel } = Collapse;
    return (
        <Layout>
            <Head>
                <title>Term Of Use</title>
            </Head>
            <section className={'px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20'}>
                <div className={'container mx-auto'}>
                    <div>
                        <p className={'text-3xl gilroy-bold pb-8 pt-10'}>Term Of Use</p>
                    </div>
                    <div className={'gilroy-medium text-base'}>
                        <p className={'pb-8'}>
                            The following are the terms of an agreement between you and MIG. By accessing or using this and any related MIG Web site (Mitramas Infosys Global Web sites), 
                            you acknowledge that you have read, understand, and agree to be bound by these terms and to comply with all applicable laws and regulations, including export 
                            and re-export control laws and regulations. If you do not agree to these terms, please do not use the MIG Web sites.
                        </p>
                        <p className={'pb-8'}>
                            MIG may, without notice to you, at any time, revise these Terms of Use and any other information contained in the MIG Web sites. MIG may also make improvements or 
                            changes in the products, services, or programs described in the MIG Web sites at any time without notice.
                        </p>
                    </div>
                    <div className={'pb-8'}>
                        <Collapse
                        accordion
                        defaultActiveKey={['0']}
                        expandIconPosition={'right'}
                        >
                            <Panel className={'gilroy-bold text-base'} header={'General'}>
                                <p className={'gilroy-medium pb-8'}>
                                    This Web site contains proprietary notices and copyright information, the terms of which must be observed and followed. Please see the tab entitled “Copyright and 
                                    trademark information” for related information.
                                </p>
                                <p className={'gilroy-medium pb-8'}>
                                    MIG grants you a non-exclusive, non-transferable, limited permission to access and display the Web pages within the MIG Web sites as a customer or potential customer 
                                    of MIG, provided you comply with these Terms of Use and all copyright, trademark, and other proprietary notices remain intact. You may only use a crawler to crawl a 
                                    MIG Web site as permitted by the Web site’s robots.txt protocol and MIG may block any crawlers in its sole discretion. The use authorized under this agreement is 
                                    non-commercial in nature (e.g., you may not sell the content you access on or through this Web site). All other use of the MIG Web sites is prohibited.
                                </p>
                                <p className={'gilroy-medium pb-8'}>
                                    Except for the limited permission in the preceding paragraph, MIG does not grant you any express or implied rights or licenses under any patents, trademarks, copyrights, 
                                    or other proprietary or intellectual property rights. You may not mirror any of the content from a MIG Website on another Web site or in any other media. Any software and 
                                    other materials that are made available for downloading, access, or other use from a MIG Web site with their own license terms will be governed by such terms, conditions, 
                                    and notices. Your failure to comply with such terms or any of the terms on a MIG Web site will result in automatic termination of any rights granted to you, without prior 
                                    notice, and you must immediately destroy all copies of downloaded materials in your possession, custody or control.
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className={'pb-8'}>
                        <Collapse
                        accordion
                        defaultActiveKey={['0']}
                        expandIconPosition={'right'}
                        >
                            <Panel className={'gilroy-bold text-base'} header={'Rules of conduct'}>
                                <p className={'gilroy-medium pb-8'}>
                                    Your use of MIG.com and any other MIG Web site is subject to all applicable local, state, national and international laws and regulations, and you agree not to violate such laws 
                                    and regulations. Any attempt by any person to deliberately damage any MIG Web site is a violation of criminal and civil laws. MIG reserves the right to seek damages from any such 
                                    person to the fullest extent permitted by law.
                                </p>
                                <p className={'gilroy-medium pb-8'}>
                                    You agree not to post or transmit through any MIG Web site any material or content that violates or infringes in any way the rights of others or solicits, encourages or promotes 
                                    the use of illegal substances or activities, which is unlawful, threatening, abusive, harassing, defamatory, libelous, derogatory, invasive of privacy or publicity rights, 
                                    vulgar, obscene, bigoted or hateful, profane, scandalous, pornographic, indecent or otherwise objectionable, gives rise to civil or criminal liability or otherwise violates 
                                    any applicable law.
                                </p>
                                <p className={'gilroy-medium pb-8'}>
                                    You may not impersonate another user, use another user’s MIG ID, permit someone else to use your MIG ID, attempt to capture or guess other users’ passwords, forge headers or 
                                    otherwise manipulate identifiers for the purpose of disguising the origin of any content you transmit, conduct fraudulent business operations or practices, or promote or conceal 
                                    unlawful conduct.
                                </p>
                                <p className={'gilroy-medium pb-8'}>
                                    You may not engage in any activity on a MIG Web site which restrict or inhibit any other user from using or enjoying a MIG Web site by any means, including “hacking,” “cracking,” 
                                    “spoofing,” or defacing any portion of a MIG Website. You may not use a MIG Web site to stalk or harass another person or entity. You may not post or transmit through any MIG Web 
                                    site advertising or commercial solicitations, promotional materials relating to website or online services which are competitive with MIG and/or a MIG Web site, software or other 
                                    materials that contain viruses, worms, time bombs, Trojan horses, or other harmful or disruptive components, political campaign materials, chain letters; mass mailings, spam mail, 
                                    any robot, spider, site search/retrieval application, or other manual or automatic device or process to retrieve, index, “data mine,” or in any way reproduce or circumvent the 
                                    navigational structure or presentation of a MIG Web site or its contents. You may not harvest or collect information about any MIG Web site visitor without their express written consent.
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className={'pb-8'}>
                        <Collapse
                        accordion
                        defaultActiveKey={['0']}
                        expandIconPosition={'right'}
                        >
                            <Panel className={'gilroy-bold text-base'} header={'Disclaimer'}>
                                <p className={'gilroy-medium pb-8'}>
                                    From time to time, this Web site may contain technical inaccuracies or typographical errors, and we do not warrant the accuracy of any posted information. Please confirm you are 
                                    using the most up-to-date pages on this Web site and confirm the accuracy and completeness of information before using it to make decisions relating to services, products, or 
                                    other matters described in this Web site.
                                </p>
                                <p className={'gilroy-medium pb-8'}>
                                    If any term in these Terms of Use is found by competent judicial authority to be unenforceable in any respect, the validity of the remainder of these Terms of Use will be unaffected, 
                                    provided that such unenforceability does not materially affect the parties’ rights under these Terms of Use.
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className={'pb-8'}>
                        <Collapse
                        accordion
                        defaultActiveKey={['0']}
                        expandIconPosition={'right'}
                        >
                            <Panel className={'gilroy-bold text-base'} header={'Forward-looking and cautionary statements'}>
                                <p className={'gilroy-medium pb-8'}>
                                    Forward-looking and cautionary statements<br/>
                                    Except for historical information and discussions, statements set forth throughout this website may constitute forward-looking statements within the meaning obedient with applicable 
                                    laws in Indonesia. These statements involve a number of risks, uncertainties, and other factors that could cause actual results to differ materially, as discussed in the company’s filings. 
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className={'pb-8'}>
                        <Collapse
                        accordion
                        defaultActiveKey={['0']}
                        expandIconPosition={'right'}
                        >
                            <Panel className={'gilroy-bold text-base'} header={'Business relationships'}>
                                <p className={'gilroy-medium pb-8'}>
                                    Business relationships<br/>
                                    MIG Web sites may provide links or references to non-MIG Web sites and resources. MIG makes no representations, warranties, or other commitments or endorsements whatsoever about any non-MIG 
                                    Web site or third-party resource that may be referenced, accessible from, or linked to any MIG site. In addition, MIG is not a party to or responsible for any transactions you may enter 
                                    into with third parties, even if you learn of such parties (or use a link to such parties) from a MIG site. When you access a non-MIG Web site, even one that may contain the MIG logo, please 
                                    understand that it is independent from MIG, and that MIG does not control the content on that Web site. It is up to you to take precautions to protect yourself from viruses, worms, Trojan 
                                    horses, and other potentially destructive programs, and to protect your information.
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className={'pb-8'}>
                        <Collapse
                        accordion
                        defaultActiveKey={['0']}
                        expandIconPosition={'right'}
                        >
                            <Panel className={'gilroy-bold text-base'} header={'Disclaimer of warranty'}>
                                <p className={'gilroy-medium pb-8'}>
                                    Disclaimer of warranty<br/>
                                    Use of MIG websites is at your sole risk. all materials, information, products, software, programs, and services are provided “as is,” with no warranties or guarantees whatsoever. MIG expressly 
                                    disclaims to the fullest extent permitted by law all express, implied, statutory, and other warranties, guarantees, or representations, including, without limitation, the warranties of 
                                    merchantability, fitness for a particular purpose, and non-infringement of proprietary and intellectual property rights. Without limitation, MIG makes no warranty or guarantee that any MIG 
                                    website will be uninterrupted, timely, secure, or error-free.
                                </p>
                                <p className={'gilroy-medium pb-8'}>
                                    You understand and agree that if you download or otherwise obtain materials, information, products, software, programs, or services from a MIG website, you do so at your own discretion and risk 
                                    and that you will be solely responsible for any damages that may result, including loss of data or damage to your computer system. Some jurisdictions do not allow the exclusion of warranties, so 
                                    the above exclusions may not apply to you.
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className={'pb-8'}>
                        <Collapse
                        accordion
                        defaultActiveKey={['0']}
                        expandIconPosition={'right'}
                        >
                            <Panel className={'gilroy-bold text-base'} header={'Limitation of liability'}>
                                <p className={'gilroy-medium pb-8'}>
                                    Limitation of liability<br/>
                                    to the fullest extent permitted by applicable law, in no event will MIG be liable to any party for any direct, indirect, incidental, special, exemplary or consequential damages of any type 
                                    whatsoever related to or arising from a MIG website or any use of a MIG web site, or of any site or resource linked to, referenced, or accessed through a MIG web site, or for the use or 
                                    downloading of, or access to, any materials, information, products, or services, including, without limitation, any lost profits, business interruption, lost savings or loss of programs or 
                                    other data, even if MIG is expressly advised of the possibility of such damages. This exclusion and waiver of liability apply to all causes of action, whether based on contract, warranty, 
                                    tort, or any other legal theories.
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default TermOfUse