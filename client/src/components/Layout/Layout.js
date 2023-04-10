import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from "react-helmet"
import { Toaster } from 'react-hot-toast'
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
        <Helmet>
          <meta charSet='utf-8'/>
          <meta name='description' content={description} />
          <meta name='keywords' content={keywords} />
          <meta name='author' content={author} />
          <title>{title}</title>
        </Helmet>
        <Header/>
        <main style={{minHeight:"70vh",marginTop:"75px"}}>
          <Toaster/>
            {children}
        </main>
        <Footer/>
    </div>
    
  )
}

Layout.defaultProps={
  title:"ECommerce App",
  description:"full stack project",
  keyword:"react node mongodb express",
  author:"Prajwal A k"
}

export default Layout
