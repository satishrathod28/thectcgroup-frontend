"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import abHeaderImg from "@/images/ab-banner.png";
import abBg from "@/images/ab-bg.svg";
import nhimg1 from "@/images/nhimg1.png";
import nhimg2 from "@/images/nhimg2.png";
import nhimg3 from "@/images/nhimg3.png";
import nhimg4 from "@/images/nhimg4.png";
import ArrowBlack from "@/images/arrow-black.svg";
import globe from "@/images/globe.png";
import pr from "@/images/pr.svg";

import nhBanner from "@/images/nh-banner.png";
import caImg from "@/images/ca-img.png";
import searchIcon from "@/images/search.svg";
import CareerGallery from "@/components/CareerGallery";

import ic1 from "@/images/ic1.svg";
import ic2 from "@/images/ic2.svg";
import ic3 from "@/images/ic3.svg";
import ic4 from "@/images/ic4.svg";
import ic5 from "@/images/ic5.svg";
import pdfIcon from "@/images/pdf-icon.svg";
import api from "@/axios/api";
import { useParams } from "next/navigation";
import TabSection from "@/components/product/TabSec";
import Tilt from "react-parallax-tilt";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [id]);
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <header className="ab-header inner-header">
        <Image src={abBg} className="" alt="About Header" />
        <div className="ab-header-container">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-12">
                <div className="inner-header-content">
                  <h1
                    className="ab-header-heading"
                    dangerouslySetInnerHTML={{
                      __html: product?.section1?.heading,
                    }}
                  >
                    {/* Micro End Mills - Engineered for 
                                    
                                    <span> Precision and Performance</span> */}
                  </h1>
                  <p
                    className="para"
                    dangerouslySetInnerHTML={{
                      __html: product?.section1?.description,
                    }}
                  >
                    {/* CTC's Micro End Mills are crafted to deliver <br className='d-sm-block d-none' />exceptional performance, handling the most intricate machining <br className='d-sm-block d-none' />challenges with unmatched accuracy and durability
                     */}
                  </p>

                  {/* <Link href='#' className='main-btn'>
                                    <span>Discover our Brands</span>
                                </Link> */}
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="ab-header-img">
                  {product?.section1?.image != "" && (
                    <Image
                      src={product?.section1?.image}
                      width={500}
                      height={500}
                      className="w-100 h-auto"
                      alt="About Header"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="sec about-sec2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-12">
              {product?.section2?.image != "" && (
                <Image
                  src={product?.section2?.image}
                  width={500}
                  height={500}
                  className="w-100 h-auto"
                  alt="About Section 2"
                />
              )}
            </div>
            <div className="col-lg-6 offset-lg-1 col-12">
              <div className="about-sec2-content">
                {/* <h3 className='sec-sub-head with-bg'>About CTC Group</h3> */}
                <h2
                  className="sec-head"
                  dangerouslySetInnerHTML={{
                    __html: product?.section2?.heading,
                  }}
                >
                  {/* Where Precision
                             <br className='d-none d-lg-block' />
                                <span>Meets Performance</span> */}
                </h2>
                <p
                  className="para mb-0"
                  dangerouslySetInnerHTML={{
                    __html: product?.section2?.description,
                  }}
                >
                  {/* CTC's Micro End Mills are engineered to achieve fine cuts, sharp corners, and smooth finishes. Built with controlled tolerances, these tools excel in machining high-precision parts across industries such as:
                            <br /><br />
                            They perform flawlessly on materials like steel up to 55 HRc, ensuring superior durability and results. */}
                </p>
                {/* <Link href="" className="main-btn with-arrow">
                                <span>Explore Our Innovations</span>
                                <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
                            </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ft-sec sec pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h3
                className="sec-head"
                dangerouslySetInnerHTML={{ __html: product?.section3?.heading }}
              >
                {/* Features That <br className='d-sm-block d-none' />
                            <span>Empower Every Cut</span> */}
              </h3>
            </div>
          </div>
          <div className="row row-gap-25 justify-content-center mt-5">
            {product?.section3?.json &&
              product?.section3?.json?.map((item, index) => (
                <div className="col-lg-4 col-md-6 col-12" key={index}>
                  <Tilt className="ft-card">
                    {item?.image != "" && (
                      <Image
                        src={item?.image}
                        width={500}
                        height={500}
                        className="w-100 h-auto"
                        alt=""
                      />
                    )}
                    <h3
                      dangerouslySetInnerHTML={{ __html: item?.heading }}
                    ></h3>
                    <p
                      className="para"
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    ></p>
                  </Tilt>
                </div>
              ))}
            {/* <div className="col-lg-4 col-md-6 col-12">
                        <div className="ft-card">
                            <Image src={ic1} alt="" />
                            <h3>High Precision</h3>
                            <p className="para">
                                Controlled tolerance ensures uniform performance.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="ft-card">
                            <Image src={ic2} alt="" />
                            <h3>Multi-Application Use</h3>
                            <p className="para">
                            Perfect for intricate work in critical industries.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="ft-card">
                            <Image src={ic3} alt="" />
                            <h3>Durability</h3>
                            <p className="para">
                            Performs seamlessly on steel up to 55 HRc.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="ft-card">
                            <Image src={ic4} alt="" />
                            <h3>Exceptional Results</h3>
                            <p className="para">
                            Delivers smooth finishes, sharp edges, and fine detailing.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="ft-card">
                            <Image src={ic5} alt="" />
                            <h3>Versatility</h3>
                            <p className="para">
                            Engineered for aerospace, medical, electronics, and diemold applications.
                            </p>
                        </div>
                    </div> */}
            <div className="col-12 mt-3">
              <Link
                href={product?.section3?.ctl ? product?.section3?.ctl : "#"}
                className="main-btn with-arrow center"
              >
                <span>{product?.section3?.ctb}</span>
                {/* <span>Download the Features (PDF)</span> */}
                <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {product?.section4 && <TabSection data={product?.section4} />}

      <section className="sec pt-0 d-none">
        <div className="container">
          <div className="row row-gap-25 align-items-center">
            <div className="col-lg-8 text-center col-12">
              <div className="vr-con">
                <h3 className="sec-head">
                  Variants Built to Meet{" "}
                  <br className="d-sm-block d-none d-md-block" />
                  <span>Every Challenge</span>
                </h3>
                <p className="para">
                  Explore the range of Micro End Mills to find the perfect fit
                  for your needs:
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="dwn-wrap">
                <div className="dwn-img"></div>
                <Link href="" className="main-btn with-arrow center dwn-btn">
                  <span>Download Specifications</span>
                  <Image src={pdfIcon} className="w-auto h-auto" alt="Arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2
                className="sec-head"
                dangerouslySetInnerHTML={{ __html: product?.section5?.heading }}
              >
                {/* Empowering Industries <br className='d-sm-block d-none' />
                            <span>One Precise Cut at a Time.</span> */}
              </h2>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              {product?.section5?.json && (
                <div className="box-grid grid-4">
                  {product?.section5?.json?.map((item, index) => (
                    <Tilt className="box-wrap" key={index}>
                      <div className="con">
                        <h3
                          dangerouslySetInnerHTML={{ __html: item?.heading }}
                        ></h3>
                        <p className="para">
                          Built for intricate detailing with consistent results.
                        </p>
                      </div>
                    </Tilt>
                  ))}
                  {/* <div className="box-wrap">
                                <div className="con">
                                    <h3>Built to Last</h3>
                                    <p className="para">
                                    Exceptional tool life, performing seamlessly on demanding materials.
                                    </p>
                                </div>
                            </div>
                            <div className="box-wrap">
                                <div className="con">
                                    <h3>Trusted Across Industries</h3>
                                    <p className="para">
                                    Preferred by aerospace, medical, and diemold manufacturers globally.
                                    </p>
                                </div>
                            </div>
                            <div className="box-wrap">
                                <div className="con">
                                    <h3>Versatility at Its Core</h3>
                                    <p className="para">
                                    A range of solutions for multiple applications.
                                    </p>
                                </div>
                            </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
