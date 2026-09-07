"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";

import HeaderImg from "@/images/header.png";
import Img2 from "@/images/ab-imm.png";
import ArrowBlack from "@/images/arrow-black.svg";
import AeroBg from "@/images/aero-bg.jpg";
import logo from "@/images/logo.png";
import WArrow from "@/images/w-arrow.svg";
import Im1 from "@/images/im1.png";

import TabSection from "@/components/HomeSections/TabSection";
import BannerCarousel from "@/components/HomeSections/BannerCarousel";
import { PatternAnim } from "@/components/PatternAnim";
import api from "@/axios/api";
import ProductSec from "@/components/HomeSections/ProductSec";
import TopProducts from "@/components/HomeSections/TopProducts";
// import TabSection from '@/components/HomeSections/TabSection'
// import Tab from 'react-bootstrap/Tab'
import BlogCard from "@/components/BlogCard";
import UpcomingEvents from "@/components/UpcomingEvents";
import VideoGallerySec from "@/components/VideoGallerySec";
// import video from '@/images/header-vid.mp4'
import TabIndustries from "@/components/HomeSections/TabIndustries";

export default function Home() {
  const [homeCard, setHomeCard] = useState(null);
  const [counters, setCounters] = useState(null);
  const [services, setServices] = useState(null);
  const [productCard, setProductCard] = useState(null);

  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get(`/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      }
    };
    fetchBlogs();
  }, []);
  useEffect(() => {
    const fetchHomeCard = async () => {
      try {
        const response = await api.get("/homecards");
        setHomeCard(response.data);
      } catch (error) {
        console.error("Error fetching home card data:", error);
      }
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

    const fetchCounters = async () => {
      try {
        const response = await api.get("/counters");
        setCounters(response.data);
      } catch (error) {
        console.error("Error fetching counters data:", error);
      }
    };

    const fetchProductCard = async () => {
      try {
        const response = await api.get("/categories");
        setProductCard(response.data);
      } catch (error) {
        console.error("Error fetching product card data:", error);
      }
    };

    fetchHomeCard();
    fetchCounters();
    fetchServices();
    fetchProductCard();
  }, []);

  return (
    <>
      {/* Image/banner carousel shown right below the navbar.
          Replace the images below with real banner images (or wire this
          up to an API) whenever they're ready. */}
      <BannerCarousel
        banners={[
          { image: HeaderImg, alt: "CTC Group banner 1" },
          { image: Img2, alt: "CTC Group banner 2" },
          { image: AeroBg, alt: "CTC Group banner 3" },
        ]}
      />

      <section className="sec sc-2">
        <div className="container">
          <div className="row row-gap-25 align-items-center">
            <div className="col-lg-5 col-12">
              <h3 className="sec-head">
                More than <br className="d-sm-block d-none" />
                <span>40 years of CTC</span>
              </h3>
              <h4 className="sec-sub-head">
                Crafting the Future of Engineering
              </h4>
              <p className="para">
                CTC Group is a leading manufacturer of solid carbide cutting
                tools, meeting the growing demand for superior precision and
                cutting performance across industries that require advanced
                machining solutions worldwide.
                <br />
                <br />
                With an unwavering commitment to quality and innovation, CTC
                Group continues to invest in advanced technology, R&D, and the
                expansion of our global footprint. Our mission is to deliver
                precision-engineered solutions that shape the future of
                industries worldwide
              </p>
              {counters && (
                <div className="counter-container">
                  {counters?.map((item, index) => (
                    <div className="count-wrap" key={index}>
                      <h3 dangerouslySetInnerHTML={{ __html: item?.heading }} />
                      <p
                        className="para"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />
                    </div>
                  ))}
                </div>
              )}
              <Link href="/about" className="main-btn with-arrow">
                <span>Know More</span>
                <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
              </Link>
            </div>
            <div className="col-lg-6 offset-lg-1 col-12">
              <Image src={Img2} className="w-100 h-auto" alt="Image" />
              {/* <Image src={HeaderImg} style={{mixBlendMode: 'screen'}} className="w-100 h-auto sc-img" alt="Image"  /> */}
              {/* <iframe className='w-100' height="450" src="https://www.youtube.com/embed/18c5P7QNiIE?si=NT0Ks8Xyj03trtPw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}
            </div>
          </div>
        </div>
      </section>
      {productCard && <ProductSec productCard={productCard} />}
      {productCard && <TopProducts productCard={productCard} />}
      {/* {homeCard && <TabSection data={homeCard} />} */}
      {homeCard && <TabIndustries data={homeCard} />}
      {/* <TabSection data={homeCard} /> */}

      <section className="big-sec pt-0  sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <div className="ctc-con text-center">
                <h3>
                  the power of <br />
                  <span>precision</span>
                </h3>
                <p className="para">
                  Combining the expertise of its brands, CTC India and CTC
                  Praezision, CTC Group delivers cutting-edge solutions in solid
                  carbide tooling. With over four decades of experience, CTC
                  group has consistently delivered high-performance cutting
                  tools, backed by advanced technology and a commitment to
                  innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="sec pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="text-center sec-head">Blogs</h3>
            </div>
          </div>
          <div className="row row-gap-25 mt-4">
            {blogs?.length > 0 &&
              blogs &&
              blogs?.map((item, index) => (
                <div className="col-lg-4 col-12" key={index}>
                  <BlogCard data={item} />
                </div>
              ))}
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <Link href={`/blogs/`} className="main-btn with-arrow center">
                <span>View All</span>
                <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <UpcomingEvents />
      {/* <VideoGallerySec /> */}
    </>
  );
}