"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import abHeaderImg from "@/images/ab-bn.png";
import abBg from "@/images/ab-bg.svg";
import abSec2Img from "@/images/globe.png";
// import abSec2Img from '@/images/ab2.png'
import ArrowBlack from "@/images/arrow-black.svg";
import msImg from "@/images/msss.png";
import GlobalSection from "@/components/GlobalSection";
import PageHeader from "@/components/PageHeader";
import api from "@/axios/api";
import WArrow from "@/images/w-arrow.svg";
const page = () => {
  const [banner, setBanner] = useState(null);
  const [services, setServices] = useState(null);
  useEffect(() => {
    const fetchBanner = async () => {
      const response = await api.get("/homebanner?page=about-us");
      setBanner(response.data);
    };
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data);
        // const data = [
        //     {
        //         "slug": "ctc-india",
        //         "title": "CTC <br className='d-sm-block d-none'/> India",
        //         "image": "https://techmatrick.com/ctc-group/uploads/images/img2529.jpg",
        //         "extr_link": "https://www.ctcindiatools.com/",
        //         "description": "Precision tools driving seamless operations across industries since 38 years",
        //         "url": "https://techmatrick.com/ctc-group/service/ctc-india"
        //     },
        //     {
        //         "slug": "ctc-praezision",
        //         "title": "CTC <br className='d-sm-block d-none'/>Praezision",
        //         "image": "https://techmatrick.com/ctc-group/uploads/images/img2530.jpg",
        //         "description": "Powering Industries with Precision <br className='d-sm-block d-none'/>Micro Tools",
        //         "url": "https://techmatrick.com/ctc-group/service/ctc-praezision"
        //     },
        //     {
        //         "slug": "kemmer-prazision",
        //         "title": "Kemmer Prazision",
        //         "extr_link": "https://www.kemmer-praezision.com/en/home/",
        //         "image": "https://techmatrick.com/ctc-group/uploads/images/img2532.jpg",
        //         "description": "A leader in the manufacture of high-precision carbide tools for more than 60 years.",
        //         "url": "https://techmatrick.com/ctc-group/service/kemmer-prazision"
        //     }
        // ]
        // setServices(data);
      } catch (error) {
        console.error("Error fetching home card data:", error);
      }
    };
    fetchBanner();
    fetchServices();
  }, []);
  return (
    <>
      <PageHeader banner={banner} />
      {/* <header className="ab-header inner-header">
        <Image src={abBg} className="" alt="About Header" />
        <div className="ab-header-container">
          <div className="container">
            <div className="row align-items-center text-center ">
              <motion.div
                className="col-lg-12 col-12"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inner-header-content align-items-center">
                  <h4 className="sec-sub-head">Precision in Motion</h4>
                  <h1 className="ab-header-heading">
                    Powering Industries
                    <br className="d-none d-lg-block" />
                    <span> with Every Tool</span>
                  </h1>
                  <p className="para">
                    Delivering high-performance tools that ensure durability,
                    precision, and seamless operations across industries
                    worldwide.
                  </p>
                </div>
              </motion.div>
              
            </div>
          </div>
        </div>
      </header> */}
      <GlobalSection />
      {/* <section className="sec about-sec2">
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-5 col-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={abSec2Img}
                className="w-100 h-auto"
                alt="About Section 2"
              />
            </motion.div>
            <motion.div
              className="col-lg-6 offset-lg-1 col-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="about-sec2-content">
                <h3 className="sec-sub-head with-bg">About CTC Group</h3>
                <h2 className="sec-head">
                  Excellence <br className="d-none d-lg-block" />
                  <span>Across Borders</span>
                </h2>
                <p className="para">
                  CTC Group unites the expertise of CTC India and CTC
                  Praezision, delivering advanced tools for industries like
                  automotive, aerospace, medical, and more. With a footprint in
                  21 countries, we bring global innovation and local impact to
                  every project.
                </p>
                <Link href="/contact" className="main-btn with-arrow">
                  <span>Contact us</span>
                  <Image
                    src={ArrowBlack}
                    className="w-auto h-auto"
                    alt="Arrow"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {services && (
        <section className="sec ctc-sec">
          <div className="container">
            <div className="row row-gap-25">
              {services?.map((item, index) => (
                <div className="col-lg-4 col-12" key={index}>
                  {/* {
                                    item?.title == "CTC Praezision " ?
                                    <h3 className="sec-head blue"  dangerouslySetInnerHTML={{ __html: item?.title }} />
                                    :
                                    <h3 className="sec-head blue" dangerouslySetInnerHTML={{ __html: item?.title }} />
                                } */}

                  {item?.logoimage && (
                    <Image
                      src={item?.logoimage}
                      width={200}
                      height={100}
                      className="mb-4 logo-img-co"
                      style={{ borderRadius: "8px" }}
                      alt="CTC Praezision"
                    />
                  )}

                  <p
                    className="para faded"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  />
                  {item?.extr_link ? (
                    <Link
                      href={item?.extr_link}
                      target="_blank"
                      className="text-btn"
                    >
                      <span>Learn More</span>
                      <Image src={WArrow} alt="Arrow" />
                    </Link>
                  ) : (
                    <Link href={`/service/${item?.slug}`} className="text-btn">
                      <span>Learn More</span>
                      <Image src={WArrow} alt="Arrow" />
                    </Link>
                  )}
                  {item?.image && item?.image != "0" && (
                    <Image
                      src={item?.image}
                      width={500}
                      height={500}
                      style={{ borderRadius: "22px" }}
                      className=" w-100 mt-4 h-auto d-block"
                      alt="CTC India"
                    />
                  )}
                </div>
              ))}
              {/* <div className="col-lg-6 col-12">
                            <h3 className="sec-head white">
                                CTC Praezision
                            </h3>
                            <p className="para faded">
                                A leader in cutting tools, ensuring seamless, long-lasting performance in industries like aerospace, automotive, and medical manufacturing.
                            </p>
                            <Link href="" className="text-btn">
                                <span>Learn More</span>
                                <Image src={WArrow} className="w-auto h-auto" alt="Arrow" />
                            </Link>
                            <Image src={Im1} className="w-100 mt-4 d-block" alt="CTC Praezision"  />
                        </div> */}
            </div>
          </div>
        </section>
      )}

      <section className="ms-sec sec pb-0">
        <div className="container">
          <motion.div
            className="row"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="col-lg-12 text-center col-12">
              <h2 className="sec-head">
                Driving Innovation, <span>Shaping the Future</span>
              </h2>
            </div>
          </motion.div>
          <div className="row mt-5 flex-lg-row-reverse">
            <motion.div
              className="col-lg-5 offset-lg-1 col-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={msImg}
                className="w-100 h-auto"
                alt="Mission Section"
              />
            </motion.div>
            <motion.div
              className="col-lg-6 col-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ul className="ms-list">
                <li>
                  <h3>Mission</h3>
                  <p className="para">
                   <b style={{color: 'white'}}>To Engineer Precision Solutions That Improve Manufacturing Performance </b>
                   <br /><br />
We strive to deliver cutting tool technologies that enhance productivity, improve machining
reliability, and enable manufacturers to operate with confidence in increasingly demanding
environments.
                  </p>
                </li>
                <li>
                  <h3>Vision</h3>
                  <p className="para">
                   <b style={{color: 'white'}}>To Be Recognised as a Global Benchmark in Precision Tool Engineering</b>
                   <br /><br />
We aim to continuously expand our technological capabilities while maintaining the
consistency and discipline that define trusted manufacturing partners worldwide.
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="sec timeline-sec">
        <div className="container">
          <div className="row">
            <motion.div
              className="col-lg-6 col-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="timeline-con">
                <h2 className="sec-head">
                  A Legacy of <br className="d-sm-block d-none" />
                  <span>Innovation</span>
                </h2>
              </div>
            </motion.div>
            <motion.div
              className="col-lg-6 col-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ul className="timeline">
  <li>
    <h3>1983</h3>
    <p className="para">
      Company Incorporated; First Commercial PCB Router Production
    </p>
  </li>

  <li>
    <h3>1986</h3>
    <p className="para">
      Began PCB Drill Manufacturing
    </p>
  </li>

  <li>
    <h3>1993</h3>
    <p className="para">
      Major Capacity Expansion; Rollomatic CNC Introduced
    </p>
  </li>

  <li>
    <h3>1999</h3>
    <p className="para">
      Manufacturing Capacity Doubled; New Facility Added
    </p>
  </li>

  <li>
    <h3>2010</h3>
    <p className="para">
      Kemmer Praezision GmbH Acquired; Industrial Tool Line Launched
    </p>
  </li>

  <li>
    <h3>2014</h3>
    <p className="para">
      Burrs and Medical/Dental Tools Introduced
    </p>
  </li>

  <li>
    <h3>2018</h3>
    <p className="para">
      MIT Capacity Expanded; Design Team Scaled Up
    </p>
  </li>

  <li>
    <h3>2021-22</h3>
    <p className="para">
      In-house R&amp;D and Coating Facility Established; Surface Finish
      Technology Introduced
    </p>
  </li>

  <li>
    <h3>2023-24</h3>
    <p className="para">
      Metal Cutting Division Expanded
    </p>
  </li>

  <li>
    <h3>2025-26</h3>
    <p className="para">
      Alignment Tools (Singapore) &amp; GCT (Germany) Acquired; PCD Line
      Introduced
    </p>
  </li>
</ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="sec pt-0">
        <div className="container">
          <motion.div
            className="row"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="col-12 text-center">
              <h2 className="sec-head">
                At the Core of <br className="d-sm-block d-none" />
                <span>Everything We Do</span>
              </h2>
              <p className="para text-center">
                Precision is not simply a feature of our products - it is the responsibility we carry toward every customer relying on our tools.  <br /> <br /> Our philosophy is built around
              </p>
            </div>
          </motion.div>
          <motion.div
            className="row mt-3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="col-12">
              <div className="box-grid">
                <Tilt className="box-wrap">
                  <div className="con">
                    <h3>Innovation</h3>
                    <p className="para">
                      Guided by application insight
                    </p>
                  </div>
                </Tilt>

                <Tilt className="box-wrap">
                  <div className="con">
                    <h3>Accuracy</h3>
                    <p className="para">
                      That remains consistent over time
                    </p>
                  </div>
                </Tilt>

                <Tilt className="box-wrap">
                  <div className="con">
                    <h3>Reliability</h3>
                    <p className="para">
                      That reduces production risk
                    </p>
                  </div>
                </Tilt>

                <Tilt className="box-wrap">
                  <div className="con">
                    <h3>Engineering</h3>
                    <p className="para">
                      That solves real machining challenges
                    </p>
                  </div>
                </Tilt>

                <Tilt className="box-wrap">
                  <div className="con">
                    <h3>Performance</h3>
                    <p className="para">
                      Proven through real-world usage
                    </p>
                  </div>
                </Tilt>
              </div>
            </div>
            <div className="col-12">
              <p className="para text-center mt-4">We believe that long-term trust is built through performance that can be measured - not
promises that cannot.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default page;
