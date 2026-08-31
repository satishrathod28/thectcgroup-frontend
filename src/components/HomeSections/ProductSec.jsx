"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ArrowBlack from "@/images/arrow-black.svg";

const ProductSec = ({ productCard }) => {
  const [key, setKey] = useState("home");

  useEffect(() => {
    setKey(productCard[0]?.id);
  }, [productCard]);

  return (
    <section className="sec pr-sec">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="sec-head">
              Precision-crafted solutions
              <br className="d-none d-lg-block" />
              <span>for every challenge</span>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Tabs
              id="controlled-tab-example "
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3 cc-tabs "
            >
              {productCard?.length > 0 &&
                productCard?.map((item, index) => (
                  <Tab eventKey={item?.id} title={item?.name} key={index}>
                    <div className="row row-gap-25 justify-content-center">
                      {item?.products?.length > 0 &&
                        item?.products?.map((product, index) => (
                          <div className="col-lg-4 col-12" key={index}>
                            <a
                              href={`/product/${product?.slug}`}
                              target="_blank"
                              className="wr-wrap style-2"
                            >
                              {product?.section1?.image &&
                              product?.section1?.image !== "" ? (
                                <Image
                                  src={product?.section1?.image}
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
                              </div>
                            </a>
                          </div>
                        ))}
                    </div>
                  </Tab>
                ))}
            </Tabs>
          </div>
          {/* <div className="col-12 pt-4">
            <Link href="" className="main-btn with-arrow center">
              <span>Download brochure</span>
              <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ProductSec;
