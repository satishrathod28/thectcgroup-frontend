import React, { useEffect, useRef, useState } from "react";
import nhimg1 from "@/images/nhimg1.png";
import nhimg2 from "@/images/nhimg2.png";
import nhimg3 from "@/images/nhimg3.png";
import nhimg4 from "@/images/nhimg4.png";
import ArrowBlack from "@/images/arrow-black.svg";
import Link from "next/link";
import Image from "next/image";
import icon from "@/images/icon.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TabSe = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef([]);
  const imagesRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    console.log("data home", data);
  }, [data]);

  useEffect(() => {
    // Only run animation on desktop (window width > 992px)
    if (window.innerWidth <= 992) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current;
    const images = imagesRef.current;

    cards.forEach((card, index) => {
      if (!card) return;

      ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        markers: false,
        onEnter: () => {
          setActiveIndex(index);

          // Animate images
          images.forEach((img, imgIndex) => {
            if (!img) return;

            gsap.to(img, {
              opacity: imgIndex === index ? 1 : 0,
              zIndex: imgIndex === index ? 1 : 0,
              duration: 0.5,
              ease: "power2.inOut",
            });
          });
        },
        onEnterBack: () => {
          setActiveIndex(index);

          // Animate images when scrolling back up
          images.forEach((img, imgIndex) => {
            if (!img) return;

            gsap.to(img, {
              opacity: imgIndex === index ? 1 : 0,
              zIndex: imgIndex === index ? 1 : 0,
              duration: 0.5,
              ease: "power2.inOut",
            });
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="sec pt-0" ref={sectionRef}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3
              className="sec-head"
              dangerouslySetInnerHTML={{ __html: data?.heading }}
            ></h3>
          </div>
        </div>
        <div className="row row-gap-25 nh-row mt-5">
          <div className="col-12">
            <div className="nh-card-row desk-el">
              <div className="row row-gap-25">
                <div className="col-lg-6 col-12">
                  <div className="nh-card-img-column">
                    <div className="nh-card-img-container">
                      {data?.length > 0 &&
                        data &&
                        data?.map((item, index) => (
                          <div
                            className="nh-card-img"
                            key={index}
                            ref={(el) => (imagesRef.current[index] = el)}
                            style={{
                              opacity: index === 0 ? 1 : 0,
                              position: "absolute",
                              top: "50%",
                              left: 0,
                              transform: "translateY(-50%)",
                              width: "100%",
                            }}
                          >
                            {item?.image && item?.image != "" && (
                              <Image
                                src={item?.image}
                                width={500}
                                height={500}
                                alt=""
                                className="w-100 h-100"
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  {data?.length > 0 &&
                    data &&
                    data?.map((item, index) => (
                      <div
                        className="nh-card style-2"
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                      >
                        {item?.icon && item?.icon != "" && (
                          <Image
                            src={item?.icon}
                            width={54}
                            height={54}
                            alt=""
                            className="h-auto"
                          />
                        )}
                        <div>
                          <h3
                            dangerouslySetInnerHTML={{ __html: item?.heading }}
                          ></h3>
                          <p
                            className="para"
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                          ></p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mob-el">
              {data?.length > 0 &&
                data &&
                data?.map((item, index) => (
                  <div className="row row-gap-25" key={index}>
                    <div className="col-12">
                      {item?.image && item?.image != "" && (
                        <Image
                          src={item?.image}
                          alt=""
                          width={500}
                          height={500}
                          className="w-100 h-auto"
                        />
                      )}
                    </div>
                    <div className="col-12">
                      <div className="nh-card style-2">
                        {item?.icon && item?.icon != "" && (
                          <Image
                            src={item?.icon}
                            alt=""
                            width={54}
                            height={54}
                            className="h-auto"
                          />
                        )}
                        <div>
                          <h3
                            dangerouslySetInnerHTML={{ __html: item?.heading }}
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
                ))}
            </div>
          </div>

          {/* <div className="col-12">
            <Link href={data?.ctaLink ? data?.ctaLink : '#'} className="main-btn center with-arrow">
              <span>{data?.ctb ? data?.ctb : 'text'}</span>
              <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
            </Link>
          </div> */}
        </div>
        <div className="row">
          <div className="col-12">
            <Link href={"#"} className="main-btn center with-arrow">
              <span>Explore</span>
              <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabSe;
