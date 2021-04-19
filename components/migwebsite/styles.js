// File components/style.js

import React from 'react'
// font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
//             Helvetica, sans-serif;
const Styles = (props) => (
  <div>
    <style jsx global>{`
        .section5advantages{
          height:300px;
          background:#93D9B5;
        }
        .section3advantages{
          background:#F4F4F4;
        }
        .section2advantages{

        }
        .section1advantages{
          background:#F4F4F4;
        }
        .section5landingpage{
          height:300px;
          background:#93D9B5;
        }
        .section4landingpage .flickity-page-dots{
          display:none;
        }
        .section4landingpage .flickity-prev-next-button{
          background:#188E4D;
          border-radius:0%;
          display: block;
        }
        .section4landingpage .flickity-button{
          color:white;
        }
        @media (max-width: 768px){
          .section4landingpage .flickity-page-dots{
            display:block;
            bottom:-70px;
          }
          .section4landingpage .flickity-page-dots .dot{
            background:#93D9B5;
          }
          .section4landingpage .flickity-prev-next-button{
            display: none;
          }
        }
        .section4landingpage{
          height:auto;
          margin:120px auto;
        }
        .section3landingpage{
          top: -50px;
        }
        .section2landingpage{
          margin: 0 auto 0;
          width: 60%;
          z-index: 10;
        }
        @media (max-width: 768px) {
          .section2landingpage{
            margin: 0 auto 0;
            width: 100%;
          }
        }
        .section1landingpage{
          margin: 0 2rem 0;
          padding-bottom: 3rem;
        }
        @media (max-width: 768px) {
          .section1landingpage{
            padding-bottom: 1rem;
          }
        }
        p {
          margin: 0rem;
        }
        .header{
          padding: 0 50px;
        }
        @media (max-width: 540px){
          .header{
            padding: 0 25px;
          }
        }
        .center {
          margin: auto;
          width: 90%;
          padding: 10px;
        }
        .menuToggle:checked + .menu {
          display: grid;
          margin: 1.5rem 0rem;
          padding: 1rem 0rem;
          background: white;
          border: 1px;
          width: inherit;
          place-items: flex-start;
        }
        
        body {
          margin: 0;
          
          font-family: Raleway;
        }
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .back {
          padding: 18px 18px 24px;
          width: 100px;
          display: block;
          margin: 0 auto;
          text-align: center;
          text-decoration: none;
          color: #434343;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: center;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        #components-layout-demo-fixed .logo {
          float: left;
          width: 120px;
          height: 31px;
          margin: 16px 24px 16px 0;
          background: rgba(255, 255, 255, 0.2);
        }
        .site-layout .site-layout-background {
          background: #fff;
        }
      `}</style>
  </div>
)

export default Styles