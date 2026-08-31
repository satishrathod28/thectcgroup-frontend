import React from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/images/logo.png";
import ArrowBlack from "@/images/arrow-black.svg";

const Footer = () => {
  const footerLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Career",
      link: "/career",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
    {
      name: "Industry",
      link: "/industry",
    },
    // {
    //   name: "Industries",
    //   link: "/industries",
    // },
    {
      name: "Blogs",
      link: "/blogs",
    },
  ];

  const otherLinks = [
    {
      name: "Privacy Policy",
      link: "/privacy-policy",
    },
    // {
    //   name: "Disclaimer",
    //   link: "/disclaimer",
    // },
    {
      name: "Terms Of Use",
      link: "/terms-of-use",
    },
    // {
    //   name: "Cookie Policy",
    //   link: "/cookie-policy",
    // },
  ];

  const contactLinks = [
    {
      name: "CTC Group, E57, 58 EMC Plots, Auto Cluster, Adityapur Industrial Area, Jamshedpur, Jharkhand – 832 109",
      link: false,
    },
    {
      name: "+91 (657) 2200739",
      link: "tel:+916572200739",
    },
    {
      name: "info@ctcindia.co.in",
      link: "mailto:info@ctcindia.co.in",
    },
  ];

  return (
    <>
      <section className="pt-0">
        <div className="cta-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="cta-wrapper-inner">
                  <h3 className="sec-head white">
                    ENGINEERING <span>BEYOND TOMORROW</span>
                  </h3>
                  {/* <Link href="" className="main-btn with-arrow">
                                    <span>View Case Study</span>
                                    <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow"  />
                                </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-12">
              <div className="ft-col">
                <Link href="" className="ft-logo">
                  <Image src={logo} alt="Logo" className="w-100 h-auto" />
                </Link>
                <p className="para">
                  CTC Group, a global leader in precision cutting tools, unites
                  CTC India, CTC Praezision, and Kemmer Präzision. Founded in
                  1983, it has grown from producing 10,000 tungsten carbide
                  tools annually to a capacity of 23 million. Our precision
                  tools, ranging from 0.03mm to 32mm in diameter with various
                  shank configurations, serve industries including Automotive,
                  Aerospace, Dental, Medical, PCB, 3C, Energy, Watch-making, Die
                  & Mold, Beauty, and General Engineering
                </p>
                <div className="social-icons">
                  <Link
                    href="https://www.facebook.com/ctcindiatools/"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 320 512"
                    >
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://twitter.com/ctcindiatools"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 512 512"
                    >
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/ctc-india-private-limited/"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 448 512"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://instagram.com/ctcindiatools"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-1 col-6">
              <div className="ft-col">
                <h3 className="ft-head">Quick Links</h3>
                <ul className="ft-list">
                  {footerLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.link}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-2  col-6">
              <div className="ft-col">
                <h3 className="ft-head">Other Links</h3>
                <ul className="ft-list">
                  {otherLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.link}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-12">
              <div className="ft-col">
                <h3 className="ft-head">Contact us</h3>
                <ul className="ft-list">
                  {contactLinks.map((link, index) => (
                    <li key={index}>
                      {link.link ? (
                        <Link href={link.link}>{link.name}</Link>
                      ) : (
                        <p>{link.name}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="ft-btm text-center">
                <p className="para">
                  {new Date().getFullYear()} Copyright CTC Pvt Ltd | All Rights
                  Reserved
                </p>
                <p className="para">
                  <Link href="https://dimerse.com/" target="_blank">
                    Code & Design Credits
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
