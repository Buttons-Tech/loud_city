import Image from 'next/image'
import React from 'react'

const Navbarr = () => {
  return (
    <>
    
        <nav
          className="h-48 w-screen rounded-lg grid grid-cols-3 items-center text-white font-bold text-xl shadow-lg px-8"
          aria-label="Loud City logo"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, #8B0000 25%, #800B2C 45%, #1A0209 80%)',
          }}
        >
          <div className="flex justify-start">LOUD</div>

          <div className="flex justify-center">
            <Image
              src="/loud_house_logo.png"
              alt="Loud City Logo"
              width={140}
              height={140}
              priority
            />
          </div>

          <div className="flex justify-end">CITY</div>
        </nav>
    </>
  )
}

export default Navbarr
