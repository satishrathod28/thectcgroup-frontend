"use client";
import React, { useState, useEffect, useRef } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import ArrowBlack from "@/images/arrow-black.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

const TabSection = ({ data }) => {
  const [key, setKey] = useState("home");
  const [activeImages, setActiveImages] = useState({});
  // Store refs for each Swiper instance for custom navigation
  const swiperRefs = useRef({});

  useEffect(() => {
    setKey(data[0]?.category);

    // Initialize active images with the first image for each product
    const initialActiveImages = {};
    data?.json?.forEach((item) => {
      item?.cards?.forEach((product, productIndex) => {
        if (product?.images) {
          initialActiveImages[`${item.category}-${productIndex}`] =
            product.images[0];
        }
      });
    });
    setActiveImages(initialActiveImages);
  }, [data]);

  const handleThumbnailClick = (productKey, image) => {
    setActiveImages((prev) => ({
      ...prev,
      [productKey]: image,
    }));
  };

  // Custom navigation button handlers
  const handlePrev = (tabKey) => {
    if (swiperRefs.current[tabKey]) {
      swiperRefs.current[tabKey].slidePrev();
    }
  };

  const handleNext = (tabKey) => {
    if (swiperRefs.current[tabKey]) {
      swiperRefs.current[tabKey].slideNext();
    }
  };

  return (
    <section className="sec">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-12 text-center">
            <h3
              className="sec-head"
              dangerouslySetInnerHTML={{ __html: data?.heading }}
            />
            <p
              className="sec-sub-head"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3 cc-tabs"
            >
              {data?.json.length > 0 &&
                data?.json &&
                data?.json?.map((item, index) => {
                  const tabKey = item?.category;
                  return (
                    <Tab eventKey={tabKey} title={tabKey} key={index}>
                      <div className="swiper-custom-nav-wrap position-relative">
                        <Swiper
                          modules={[Navigation]}
                          // Remove default navigation, use custom
                          navigation={false}
                          slidesPerView={1}
                          className="swiper-nav mt-5"
                          onSwiper={(swiper) => {
                            swiperRefs.current[tabKey] = swiper;
                          }}
                        >
                          {item?.cards?.length > 0 &&
                            item?.cards &&
                            item?.cards?.map((product, productIndex) => {
                              const productKey = `${item.category}-${productIndex}`;
                              return (
                                <SwiperSlide key={productIndex}>
                                  <div className="wr-wrap style-2 d-none">
                                    {product?.image ? (
                                      <Image
                                        src={product?.image}
                                        width={500}
                                        height={500}
                                        alt="Aerospace Industry"
                                        className="tab-image"
                                      />
                                    ) : (
                                      ""
                                    )}
                                    <div className="con">
                                      <h3
                                        dangerouslySetInnerHTML={{
                                          __html: product?.title,
                                        }}
                                      />
                                      <Link
                                        href={
                                          product?.cta_link
                                            ? product?.cta_link
                                            : "#"
                                        }
                                        target={
                                          product?.cta_link ? "_blank" : ""
                                        }
                                        className="main-btn with-arrow mt-2"
                                      >
                                        <span>{product?.cta_label}</span>
                                        <Image
                                          src={ArrowBlack}
                                          className="w-auto h-auto"
                                          alt="Arrow"
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                  <>
                                    <div className="row row-gap-25">
                                      <div className="col-lg-5 col-12">
                                        {(product?.image ||
                                          (product?.images &&
                                            product?.images.length > 0)) && (
                                          <div className="product-gallery">
                                            <div className="main-image-container mb-3">
                                              <Image
                                                src={
                                                  activeImages[productKey] ||
                                                  product?.image ||
                                                  (product?.images &&
                                                    product?.images[0])
                                                }
                                                width={500}
                                                height={500}
                                                alt={
                                                  product?.title ||
                                                  "Product Image"
                                                }
                                                className="w-100 h-auto main-product-image"
                                              />
                                            </div>

                                            {((product?.image &&
                                              product?.images &&
                                              product?.images.length > 0) ||
                                              (product?.images &&
                                                product?.images.length >
                                                  1)) && (
                                              <Swiper
                                                modules={[
                                                  Navigation,
                                                  Pagination,
                                                ]}
                                                navigation={true}
                                                slidesPerView={4}
                                                spaceBetween={10}
                                                className="thumbnail-swiper swiper-pag"
                                                breakpoints={{
                                                  0: {
                                                    slidesPerView: 2,
                                                  },
                                                  320: {
                                                    slidesPerView: 3,
                                                  },
                                                  576: {
                                                    slidesPerView: 4,
                                                  },
                                                  768: {
                                                    slidesPerView: 6,
                                                  },
                                                }}
                                              >
                                                {product?.image && (
                                                  <SwiperSlide>
                                                    <div
                                                      className={`thumbnail-item ${
                                                        activeImages[
                                                          productKey
                                                        ] === product?.image
                                                          ? "active"
                                                          : ""
                                                      }`}
                                                    >
                                                      <Image
                                                        src={product?.image}
                                                        width={100}
                                                        height={100}
                                                        alt={
                                                          product?.title ||
                                                          "Product Thumbnail"
                                                        }
                                                        className="w-100 h-auto cursor-pointer"
                                                        onClick={() =>
                                                          handleThumbnailClick(
                                                            productKey,
                                                            product?.image
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </SwiperSlide>
                                                )}

                                                {product?.images &&
                                                  product?.images.map(
                                                    (image, imgIndex) => (
                                                      <SwiperSlide
                                                        key={imgIndex}
                                                      >
                                                        <div
                                                          className={`thumbnail-item ${
                                                            activeImages[
                                                              productKey
                                                            ] === image
                                                              ? "active"
                                                              : ""
                                                          }`}
                                                        >
                                                          <Image
                                                            src={image}
                                                            width={100}
                                                            height={100}
                                                            alt={`${
                                                              product?.title ||
                                                              "Product"
                                                            } - Image ${
                                                              imgIndex + 1
                                                            }`}
                                                            className="w-100 h-auto cursor-pointer"
                                                            onClick={() =>
                                                              handleThumbnailClick(
                                                                productKey,
                                                                image
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                      </SwiperSlide>
                                                    )
                                                  )}
                                              </Swiper>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-lg-6 offset-lg-1 col-12">
                                        <h3
                                          className="sec-head sm"
                                          dangerouslySetInnerHTML={{
                                            __html: product?.heading,
                                          }}
                                        />
                                        <div
                                          className="para html-para"
                                          dangerouslySetInnerHTML={{
                                            __html: product?.description,
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="row row-gap-25 d-none">
                                      {product?.image1 ? (
                                        <div className="col-lg-6 col-12">
                                          <Image
                                            src={product?.image1}
                                            width={500}
                                            height={500}
                                            alt="Aerospace Industry"
                                            className="tab-image w-100 h-auto"
                                          />
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {product?.image2 ? (
                                        <div className="col-lg-6 col-12">
                                          <Image
                                            src={product?.image2}
                                            width={500}
                                            height={500}
                                            alt="Aerospace Industry"
                                            className="tab-image w-100 h-auto"
                                          />
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </>
                                </SwiperSlide>
                              );
                            })}
                        </Swiper>

                        <div
                          className="sw-nav-wrapper "
                          style={{
                            // position: "absolute",
                            // bottom: 0,
                            // transform: "translateY(100%)",
                            // right: 0,
                            zIndex: 2,
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 10,
                            alignItems: "center",
                          }}
                        >
                          {/* Custom Navigation Buttons */}
                          <button
                            className="swiper-custom-prev"
                            aria-label="Previous"
                            onClick={() => handlePrev(tabKey)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              background: "white",
                              borderRadius: "50%",
                              width: "50px",
                              height: "50px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
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
                            onClick={() => handleNext(tabKey)}
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
                            }}
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
                      {item?.cta_link ? (
                        <div>
                          <Link
                            href={item?.cta_link ? item?.cta_link : "#"}
                            target="_blank"
                            className="main-btn with-arrow center"
                          >
                            <span>{item?.cta_label}</span>
                            {/* <span>Download the Features (PDF)</span> */}
                            <Image
                              src={ArrowBlack}
                              className="w-auto h-auto"
                              alt="Arrow"
                            />
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </Tab>
                  );
                })}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabSection;
