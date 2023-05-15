// File components/style.js
import React from "react";

// font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
//             Helvetica, sans-serif;
const Styles = (props) => (
  <div>
    <style jsx global>
      {` 
    .shadow{
      box-shadow:0 5px 20px rgba(0,0,0,.15)
    }
    .animateBounce:hover{
      animation: bounce 1s infinite;

      @keyframes bounce {
        0%, 100% {
          transform: translateY(-15%);
          animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
          transform: translateY(0);
          animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
      }
    }
    .slick-current .parent .child{
      border-bottom: 2px solid green;
      color: green !important;
    }
    .menu-underlined :hover{
      border-bottom: 2px solid #10B981;
      color: green !important;
    }
    .jot-underlined :focus{
      font-family: 'Gilroy-Bold', sans-serif;
      display:inline-block;
      border-bottom:2px solid #10B981;
    }
    .flex-important{
      display: flex !important;
    }
    .section2careers{
      position: -webkit-sticky; /* Safari & IE */
      position: sticky;
      top: 80px;
    }
    .section3careers .flickity-page-dots .dot{
      background:#93D9B5;
    }
    .section4careersflickity .flickity-viewport{
      height:320px;
    }
    @media (max-width: 768px){
      .section4careersflickity .flickity-viewport{
        height: 490px !important;
      }
    }
    .section5careers .flickity-page-dots .dot{
      background:white;
    }

    .section4advantages .flickity-page-dots{
      display:none;
    }
    @media (max-width: 768px){
      .section4advantages .flickity-page-dots{
        display:block;
        bottom:-25px;
      }
      .section4advantages .flickity-page-dots .dot{
        background:#93D9B5;
      }
    }
    .left-column-section7careers{
      max-width:50%
    }
    @media (max-width: 768px){
      .left-column-section7careers{
        max-width:100%
      }
    }
    .coverage-list {
        height: auto; /*your fixed height*/
        -webkit-column-count: 3;
          -moz-column-count: 3;
                column-count: 3;
    }
    @media (max-width: 768px){
      .coverage-list {
          height: auto; /*your fixed height*/
          -webkit-column-count: 2;
            -moz-column-count: 2;
                  column-count: 2;
      }
    }
    .button-hover:hover {
      background:#1cad5d!important;
    }
    .item-hardware{
      background:#E8E6EE;
      flex: 0 1 calc(33.3333333333334% - 18vw);
      margin: 0 9vw 9vw 9vw;
      width: 12vw;
      height: 11vw;
    }
    @media (max-width: 768px){
      .item-hardware{
        flex: 0 1 calc(50% - 4vw);
        margin: 0 2vw 2vw 2vw;
        width: 10vw;
        height: 30vw;
      }
    }
    .section5landingpage{
      height:170px;
      // background:#93D9B5;
      background:white;
    }
    .section4landingpage .flickity-page-dots{
      display:none;
    }
    .section4landingpage .flickity-prev-next-button{
      background:#188E4D;
      border-radius:0%;
      display: block;
      margin: 0 30px;
    }
    .section4landingpage .flickity-button{
      color:white;
    }
    @media (max-width: 768px){
      .section4landingpage .flickity-page-dots{
        display:block;
        bottom:-20px;
      }
      .section4landingpage .flickity-page-dots .dot{
        background:#93D9B5;
      }
      .section4landingpage .flickity-prev-next-button{
        display: none;
      }
    }
    .section3landingpage{
      // top: -50px;
    }
    // .section2landingpage{
    //   margin: 0 auto 0;
    //   width: 60%;
    //   z-index: 10;
    // }
    // @media (max-width: 768px) {
    //   .section2landingpage{
    //     margin: 0 auto 0;
    //     width: 100%;
    //   }
    // }
    p {
      margin: 0rem;
    }
    .header{
      padding: 0 3rem;
      z-index: 50;
      height: 80px !important;
    }
    @media (max-width: 1280px){
      .header{
        padding: 0 3rem;
        height: 56px !important;
      }
    }
    @media (max-width: 1024px){
      .header{
        padding: 0 3rem;
        height: 56px !important;
      }
    }
    @media (max-width: 768px){
      .header{
        padding: 0 1rem;
      }
    }
    
    .center {
      margin: auto;
      width: 90%;
      padding: 10px;
    }
    .menu2{
      z-index: 30;
      position: fixed;
      // display: grid;
      // margin: 1.5rem 0rem;
      // padding: 1rem 0rem;
      background: white;
      border: 1px;
      width: inherit;
      place-items: flex-start;
      height: 0;
      transition: height 1s;
      overflow: hidden;
    }
    .menuToggle:checked ~ section .menu2 {
      height: 95%;
    }
    .menu-navbar :hover{
      color: green !important;
    }
    body {
      margin: 0;
      font-family: 'Gilroy-Regular', sans-serif;
    }
    .gilroy-bold{
      font-family: 'Gilroy-Bold', sans-serif;
    }
    .gilroy-heavy{
      font-family: 'Gilroy-Heavy', sans-serif;
    }
    .gilroy-light{
      font-family: 'Gilroy-Light', sans-serif;
    }
    .gilroy-medium{
      font-family: 'Gilroy-Medium', sans-serif;
    }
    .gilroy-regular{
      font-family: 'Gilroy-Regular', sans-serif;
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
    
    .footer-custom{
      // padding: 2rem 10rem;
      padding: 24px 20px;
    }
    h1{
      font-size: 22px;
      font-weight: bold;
  }
  h2 {
      font-size: 20px;
      font-weight: bold;
  }
  h3 {
    font-size: 18px;
    font-weight: bold;
}
p {
  font-size:16px;
}
a:link {
  text-decoration: underline;
}
    // @media (min-width: 1280px){
    //   .footer-custom{
    //     padding: 2rem 35rem;
    //   }
    // }
    // @media (max-width: 1280px){
    //   .footer-custom{
    //     padding: 2rem 7rem;
    //   }
    // }
    // @media (max-width: 1024px){
    //   .footer-custom{
    //     padding: 2rem 5rem;
    //   }
    // }
    // @media (max-width: 768px){
    //   .footer-custom{
    //     padding: 2rem 1rem;
    //   }
    // }
    `}
    </style>
  </div>
);

export default Styles;
