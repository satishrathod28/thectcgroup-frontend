'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import abHeaderImg from '@/images/ab-banner.png'
import abBg from '@/images/ab-bg.svg'
import nhimg1 from '@/images/nhimg1.png'
import nhimg2 from '@/images/nhimg2.png'
import nhimg3 from '@/images/nhimg3.png'
import nhimg4 from '@/images/nhimg4.png'
import ArrowBlack from '@/images/arrow-black.svg'
import globe from '@/images/globe.png'

import nhBanner from '@/images/nh-banner.png'
import caImg from '@/images/ca-img.png'
import searchIcon from '@/images/search.svg'
import CareerGallery from '@/components/CareerGallery'
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import api from '@/axios/api';
import ServiceScrollSec from '@/components/ServiceScrollSec';

import Tilt from 'react-parallax-tilt'

const page = () => {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    // const router = useRouter();

    useEffect(() => {
        const fetchService = async () => {
            const res = await api.get(`/service/${slug}`);
            const data = await res.data;
            setService(data);
        };
        fetchService();
    }, [slug]);

    // if (!service) {
    //     router.push('/');
    // }
    if(!service){
        return <div>Loading...</div>
    }
    return (
    <>
        <header className='ab-header inner-header only-text-header'>
            <Image src={abBg} className='' alt='About Header' />
            <div className='ab-header-container'>
                <div className='container'>
                    <div className='row align-items-center justify-content-center'>
                        <div className='col-lg-8 col-12'>
                            <div className='inner-header-content text-center'>
                                <h1 className='ab-header-heading' dangerouslySetInnerHTML={{ __html: service?.section1?.heading }}>
                                    {/* Powering Industries
                                    <br className='d-none d-lg-block' />
                                    <span> with Precision Tools</span> */}
                                </h1>
                                <p className="para" dangerouslySetInnerHTML={{ __html: service?.section1?.description }}>
                                {/* Precision tools driving seamless operations<br className='d-sm-block d-none' /> across industries since 1990. */}
                                </p>

                                {
                                    service?.section1?.buttonLink ?
                                    <Link href={service?.section1?.buttonLink ? service?.section1?.buttonLink : '#'} className='main-btn'>
                                        <span>{service?.section1?.buttonText}</span>
                                    </Link>
                                    : ''
                                }
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 d-none'>
                            <div className='ab-header-img'>
                            {
                                service?.section1?.image ?
                                <Image src={service?.section1?.image} width={500} height={500} className='w-100 h-auto' alt='About Header' />
                                : <Image src={nhBanner} className='w-100 h-auto' alt='About Header' />
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section className='sec about-sec2'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-lg-5 col-12'>
                    {
                        service?.section2?.image ?
                        <Image src={service?.section2?.image} width={500} height={500} className='w-100 h-auto' alt='About Section 2' />
                        : <Image src={globe} className='w-100 h-auto' alt='About Section 2' />
                    }
                    </div>
                    <div className='col-lg-6 offset-lg-1 col-12'>
                        <div className='about-sec2-content'>
                                    
                            <h2 className='sec-head' dangerouslySetInnerHTML={{ __html: service?.section2?.heading }}>
                            {/* Innovating Through <br className='d-none d-lg-block' />
                                <span>Advanced Manufacturing</span> */}
                            </h2>
                            <p className='para mb-0' dangerouslySetInnerHTML={{ __html: service?.section2?.description }}>
                            {/* Our state-of-the-art production facilities and cutting-edge R&D capabilities enable us to design tools that meet evolving industry demands. By integrating precision, durability, and innovation, we provide solutions that ensure reliability and performance. */}
                            </p>
                            {
                                service?.section2?.buttonLink ?
                                <Link href={service?.section2?.buttonLink ? service?.section2?.buttonLink : '#'} className="main-btn with-arrow">
                                    <span>{service?.section2?.buttonText}</span>
                                    <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
                                </Link>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* jkbjk */}
        {
            service?.section3 &&
            <ServiceScrollSec data={service?.section3} />
        }
    

        <section className="sec pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3 className="sec-head" dangerouslySetInnerHTML={{ __html: service?.section4?.heading }}>
                        {/* Innovation in Every <br className='d-sm-block d-none' />
                            <span>Tool We Manufacture</span> */}
                        </h3>
                    </div>
                </div>
                <div className="row nh-box-row justify-content-center mt-5">
                {
                    service?.section4?.json?.length > 0 &&
                    service?.section4?.json?.map((card, index) => (
                        <Tilt className="col-lg-4 col-12" key={index}>
                            <div className="box-wrap style-2">
                            <div className="con">
                                <h3 dangerouslySetInnerHTML={{ __html: card?.heading }} >
                                {/* In-House <br className='d-sm-block d-none' />Excellence */}
                                </h3>
                                <p className="para" dangerouslySetInnerHTML={{ __html: card?.description }}>
                                {/* Superior quality control with reduced cycle times and cost-efficiency. */}
                                </p>
                                </div>
                            </div>
                        </Tilt>
                    ))
                }
                    {/* <div className="col-lg-5 col-12">
                        <div className="box-wrap style-2">
                            <div className="con">
                                <h3>Customized <br className='d-sm-block d-none' />Solutions</h3>
                                <p className="para">
                                Tailor-made designs developed by our expert R&D team.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-12">
                        <div className="box-wrap style-2">
                            <div className="con">
                                <h3>Global <br className='d-sm-block d-none' />Standards</h3>
                                <p className="para">
                                Tools that meet the requirements of industries worldwide, ensuring durability and precision.
                                </p>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-12">
                        {
                            service?.section4?.buttonLink ?
                        <Link href={service?.section4?.buttonLink ? service?.section4?.buttonLink : '#'} className="main-btn center with-arrow">
                            <span>{service?.section4?.buttonText}</span>
                            <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
                        </Link>
                        : ''
                    }
                    </div>
                </div>
            </div>
        </section>

    </>
  )
}

export default page