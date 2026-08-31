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
import BlogCard from "@/components/BlogCard";

const page = () => {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get(`/events`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      }
    };
    fetchBlogs();
  }, []);
  if (!blogs) {
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
                  <h1 className="ab-header-heading">
                    Powering Industries <span>with Precision micro Tools</span>
                  </h1>
                  <p className="para">
                    Precision micro tools driving seamless operations across
                    industries since 1983.
                  </p>

                  {/* <Link href='#' className='main-btn'>
                                    <span>Discover our Brands</span>
                                </Link> */}
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="ab-header-img">
                  <Image
                    src={nhBanner}
                    width={500}
                    height={500}
                    className="w-100 h-auto"
                    alt="About Header"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="sec pt-0">
        <div className="container">
          <div className="row row-gap-25">
            {blogs?.length > 0 &&
              blogs &&
              blogs?.map((item, index) => (
                <div className="col-lg-4 col-12" key={index}>
                  <BlogCard type="event" data={item} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
