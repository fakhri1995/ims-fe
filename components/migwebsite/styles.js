// File components/style.js

import React from 'react'
// font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
//             Helvetica, sans-serif;
const Styles = (props) => (
  <div>
      <style jsx global>{`
      .row:after { clear: both; }

      .row:before, .row:after {
        content: " ";
        display: table; }
      
      @media (min-width: 768px) {
        .col { 
          float: left;
          width: 33.33333333%; }
      
        .alignImgRight { text-align: right; }
      }
      .header{
        padding: 0 50px;
      }
      @media (max-width: 540px){
        .header{
          padding: 0 25px;
        }
      }
      h1 {
        display: block;
        font-size: 3em;
        margin-top: 0.67em;
        margin-bottom: 0.67em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
      }
      h4 {
        display: block;
        font-size: 1em;
        margin-top: 1.33em;
        margin-bottom: 1.33em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
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
          width: -webkit-fill-available;
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