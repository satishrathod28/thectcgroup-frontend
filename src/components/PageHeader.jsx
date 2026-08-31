import React from "react";
import Image from "next/image";
import Link from "next/link";

const PageHeader = ({ banner }) => {
  if (!banner) {
    return null;
  }
  return (
    <header className="main-header">
      {banner?.type == "video" ? (
        <video
          src={banner?.image}
          autoPlay
          loop
          muted
          playsInline
          className="w-100 h-auto"
          alt="Header"
        />
      ) : (
        <Image
          src={banner?.image}
          width={1920}
          height={1080}
          className="w-100 h-100"
          style={{
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 5,
          }}
          alt="Header"
        />
      )}
      {banner?.heading && (
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-12">
              <div className="banner-con">
                <h1 dangerouslySetInnerHTML={{ __html: banner?.heading }}></h1>
                <p
                  className="para"
                  // style={{ color: "#0C76D8" }}
                  dangerouslySetInnerHTML={{ __html: banner?.description }}
                ></p>
                {
                  banner.link &&
                <Link
                  href={banner.link ? banner?.link : "#"}
                  className="main-btn"
                >
                  <span dangerouslySetInnerHTML={{ __html: banner?.btn }} />
                </Link>
                }
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1 col-12">
              {/* <div className="hero-img d-none">
                          {
                              banner?.type == 'image' &&
                              <Image src={banner?.image} width={500} height={500} className="w-100 h-100" alt="Header"  />
                          }
                          {
                              banner?.type == 'video' &&
                              <video src={banner?.image} autoPlay loop muted playsInline className="w-100 h-auto" alt="Header"  />
                          }
                          </div> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PageHeader;
