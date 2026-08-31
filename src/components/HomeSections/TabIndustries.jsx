"use client";
import React, { useRef } from "react";
import ArrowBlack from "@/images/arrow-black.svg";
import Link from "next/link";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";

// Import Swiper React components and modules using Swiper's recommended ES syntax
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const TabIndustries = ({ data }) => {
  // Support .heading as root, or as array of slides
  const slides = Array.isArray(data) ? data : data?.slides || [];
  const heading = data?.heading || "";

  // Swiper custom navigation refs
  const swiperRef = useRef(null);

  // Handlers for navigation
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section className="sec ">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3
              className="sec-head"
              dangerouslySetInnerHTML={{ __html: heading }}
            ></h3>
          </div>
        </div>
        <div className="row row-gap-25 nh-row mt-5">
          <div className="col-12 position-relative">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="tab-industries-swiper"
              ref={swiperRef}
            >
              {slides?.length > 0 &&
                slides.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="nh-card-row">
                      <div className="row row-gap-25 align-items-center">
                        <div className="col-lg-6 col-12 mb-3 mb-lg-0">
                          <div className="nh-card-img-column">
                            <div
                              className="nh-card-img-container"
                              style={{ position: "relative", minHeight: 350 }}
                            >
                              {item?.image && item?.image !== "" && (
                                <Image
                                  src={item?.image}
                                  width={500}
                                  height={500}
                                  alt=""
                                  className="w-100 h-100"
                                  style={{
                                    objectFit: "contain",
                                    position: "relative",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="nh-card style-2">
                            {item?.icon && item?.icon !== "" && (
                              <Image
                                src={item?.icon}
                                width={54}
                                height={54}
                                alt=""
                                className="h-auto mb-3"
                              />
                            )}
                            <div>
                              <h3
                                dangerouslySetInnerHTML={{
                                  __html: item?.heading,
                                }}
                              ></h3>
                              <p
                                className="para"
                                dangerouslySetInnerHTML={{
                                  __html: item?.description,
                                }}
                              ></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom navigation buttons */}
            <div
              className="sw-nav-wrapper"
              style={{
                position: "static",
                // right: 0,
                // bottom: "-55px",
                zIndex: 2,
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <button
                className="swiper-custom-prev"
                aria-label="Previous"
                onClick={handlePrev}
                style={{
                  background: "white",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
                tabIndex={0}
              >
                <span style={{ fontSize: 24, fontWeight: "bold" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 6L9 12L15 18"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <button
                className="swiper-custom-next"
                aria-label="Next"
                onClick={handleNext}
                style={{
                  background: "white",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
                tabIndex={0}
              >
                <span style={{ fontSize: 24, fontWeight: "bold" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <Link href={"/industry"} className="main-btn center with-arrow">
              <span>Explore</span>
              <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabIndustries;
