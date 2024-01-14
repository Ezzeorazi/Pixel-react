import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarEn from '../components/NavbarEn'
import FooterEn from '../components/FooterEn'
 

export const LayoutPublicEn = () => {
  return (
    <>
    
    
<NavbarEn/>
<Outlet/>
<FooterEn/>



    </>
  )

}