import Image from 'next/image'
import Navbarr from '@/app/components/Navbarr'
import Hero from '@/app/components/Hero'
import React from 'react'
import Footer from './components/Footer'

const page = () => {
  return (
    <>
      <Navbarr />
      <Hero />
      <Footer />
      
    </>
  )
}

export default page
