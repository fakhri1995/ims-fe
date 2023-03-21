import moment from "moment";
import "moment/locale/id";
import { NextQueryParamProvider } from "next-query-params";
import Head from "next/head";
import Router from "next/router";
import { useRouter } from "next/router";
import Script from "next/script";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import ReactGA from "react-ga";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AccessControlProvider } from "contexts/access-control";

import * as gtag from "../components/migwebsite/gtag";
import "../styles/globals.scss";

moment.locale("id");

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const rt = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      // console.log("url ", url);
      gtag.pageview(url);
    };
    rt.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      rt.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [rt.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0ECV928BTL', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/flickity@2/dist/flickity.min.css"
        ></link>
        <title>MIGSys</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <NextQueryParamProvider>
          <AccessControlProvider>
            <Component {...pageProps} />
          </AccessControlProvider>
        </NextQueryParamProvider>

        {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
