import '../styles/globals.css'
import 'antd/dist/antd.css';
import '../components/index.css'
import Head from 'next/head'
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import "react-datepicker/dist/react-datepicker.css";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css"></link>
        {/* <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script> */}
        <title>MIGSys</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
