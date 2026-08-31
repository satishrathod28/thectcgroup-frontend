import React from 'react'
import nhimg1 from '@/images/nhimg1.png'
import nhimg2 from '@/images/nhimg2.png'
import nhimg3 from '@/images/nhimg3.png'
import nhimg4 from '@/images/nhimg4.png'
import ArrowBlack from '@/images/arrow-black.svg'
import Link from 'next/link'
import Image from 'next/image'


const ServiceScrollSec = () => {
  return (
    <section className="sec pt-0">
    <div className="container">
        <div className="row">
            <div className="col-12 text-center">
                <h3 className="sec-head" >
                Tools Designed for <br className='d-sm-block d-none' />
                    <span>Industry-Specific Needs</span>
                </h3>
            </div>
        </div>
        <div className="row row-gap-25 nh-row mt-5">
            <div className="col-lg-6 col-12">
                <div className="nh-card">
                <div>                        
                    <h3>Aerospace</h3>
                    <p className="para">
                    Precision-engineered tools for critical aerospace applications.
                    </p>
                </div>
                    <Image src={nhimg2} alt="" className='w-100 h-auto mt-4' />
                </div>
            </div>
            <div className="col-lg-6 col-12">
                <div className="nh-card">
                    <Image src={nhimg3} alt="" className='w-100 h-auto mb-4' />
                    <div>
                        <h3>Automotive</h3>
                        <p className="para">
                            High-performance tools built to meet modern manufacturing standards.
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-12">
                <div className="nh-card">
                    <div>
                        <h3>Aerospace</h3>
                        <p className="para">
                        Precision-engineered tools for critical aerospace applications.
                        </p>
                    </div>
                    <Image src={nhimg4} alt="" className='w-100 h-auto mt-4' />
                </div>
            </div>
            <div className="col-12">
                <Link href={'#'} className="main-btn center with-arrow">
                    <span>{'text'}</span>
                    <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
                </Link>
            </div>
        </div>
    </div>
</section>
  )
}

export default ServiceScrollSec