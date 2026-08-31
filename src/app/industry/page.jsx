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

import nhBanner from "@/images/nh-banner.png";
import caImg from "@/images/ca-img.png";
import searchIcon from "@/images/search.svg";
import CareerGallery from "@/components/CareerGallery";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import api from "@/axios/api";
import ServiceScrollSec from "@/components/ServiceScrollSec";
import TabSection from "@/components/HomeSections/TabSection";
import TabIndustries from "@/components/HomeSections/TabIndustries";
import Industries from "@/components/Industries";
import PageHeader from "@/components/PageHeader";
import Tilt from "react-parallax-tilt";
import ContactForm from "@/components/ContactForm";

const page = () => {
  const [homeCard, setHomeCard] = useState(null);
  const [banner, setBanner] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    const fetchHomeCard = async () => {
      try {
        const response = await api.get("/homecards");
        setHomeCard(response.data);
      } catch (error) {
        console.error("Error fetching home card data:", error);
      }
    };
    const fetchBanner = async () => {
      const response = await api.get("/homebanner?page=industry");
      setBanner(response.data);
    };
    fetchHomeCard();
    fetchBanner();
  }, []);

  return (
    <>
      <PageHeader banner={banner} />
      <header className="ab-header inner-header ">
        <Image src={abBg} className="" alt="About Header" />
        <div className="ab-header-container">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 col-12">
                <div className="inner-header-content ">
                  <h1 className="ab-header-heading">
                    Powering Industries
                    <br className="d-none d-lg-block" />
                    <span> with Precision Tools</span>
                  </h1>
                  <p className="para">
                    Precision tools driving seamless operations
                    <br className="d-sm-block d-none" /> across industries since
                    1990.
                  </p>

                  {/* <Link href="#" className='main-btn'>
                                        <span>ddd</span>
                                    </Link> */}
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="ab-header-img">
                  <Image
                    src={nhBanner}
                    className="w-100 h-auto"
                    alt="About Header"
                  />
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
              <Image
                src={globe}
                className="w-100 h-auto"
                alt="About Section 2"
              />
            </div>
            <div className="col-lg-6 offset-lg-1 col-12">
              <div className="about-sec2-content">
                <h2 className="sec-head">
                  Innovating Through <br className="d-none d-lg-block" />
                  <span>Advanced Manufacturing</span>
                </h2>
                <p className="para mb-0">
                  Our state-of-the-art production facilities and cutting-edge
                  R&D capabilities enable us to design tools that meet evolving
                  industry demands. By integrating precision, durability, and
                  innovation, we provide solutions that ensure reliability and
                  performance.
                </p>

                {/* <Link href="#" className="main-btn with-arrow mt-4">
                                    <span>ddd</span>
                                    <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
                                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {homeCard && <TabSection data={homeCard} />} */}
      {/* {homeCard && <TabIndustries data={homeCard} />} */}

      <Industries />
      <section className="sec">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="sec-head">
                Contact <span>Us</span>
              </h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
