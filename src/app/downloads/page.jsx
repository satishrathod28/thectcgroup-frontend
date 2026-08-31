'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import abBg from '@/images/ab-bg.svg'


import nhBanner from '@/images/nh-banner.png'
import VideoGallerySec from '@/components/VideoGallerySec'


const page = () => {
    
    return (
    <>
        {/* <header className='ab-header inner-header only-text-header'>
            <Image src={abBg} className='' alt='About Header' />
            <div className='ab-header-container'>
                <div className='container'>
                    <div className='row align-items-center justify-content-center'>
                        <div className='col-lg-8 col-12'>
                            <div className='inner-header-content text-center'>
                                <h1 className='ab-header-heading'>
                                    Gallery
                                </h1>
                             
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 d-none'>
                            <div className='ab-header-img'>
                            
                                <Image src={nhBanner} className='w-100 h-auto' alt='About Header' />
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header> */}
        <VideoGallerySec document={true} />

    </>
  )
}

export default page