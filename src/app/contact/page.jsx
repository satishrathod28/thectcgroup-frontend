"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { Tab, Tabs } from "react-bootstrap";
import abHeaderImg from "@/images/ab-banner.png";
import abBg from "@/images/ab-bg.svg";
import abSec2Img from "@/images/ab2.png";
import ArrowBlack from "@/images/arrow-black.svg";
import msImg from "@/images/ms-img.png";

import conBanner from "@/images/con-banner.png";
import caImg from "@/images/ca-img.png";
import searchIcon from "@/images/search.svg";
import CareerGallery from "@/components/CareerGallery";

import address from "@/images/address.svg";
import phone from "@/images/phone.svg";
import email from "@/images/email.svg";
import office from "@/images/office.svg";
import api from "@/axios/api";
import { useRouter } from "next/navigation";

import lgg1 from "@/images/lgg1.png";
import lgg2 from "@/images/lgg2.png";
import lgg3 from "@/images/lgg3.png";
import lgg4 from "@/images/ats.png";
import PageHeader from "@/components/PageHeader";

const page = () => {
  const [success, setSuccess] = useState(false);
  const [key, setKey] = useState("ctc");
  const [banner, setBanner] = useState(null);
  const [pageUrl, setPageUrl] = useState("");

  // Grab the current page URL for the hidden field
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchBanner = async () => {
      const response = await api.get("/homebanner?page=contact");
      setBanner(response.data);
    };
    fetchBanner();
  }, []);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      companyName: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      page_url: pageUrl,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      companyName: Yup.string().required("Company Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      address: Yup.string().required("Address is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("companyName", values.companyName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("message", values.message);
      formData.append("page_url", pageUrl);
      console.log("Form data", formData);

      try {
        const response = await api.post("/contact", formData, {
          withCredentials: true,
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //     "Access-Control-Allow-Origin": "*",
          //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          //     "Access-Control-Allow-Headers": "Content-Type, Authorization",
          //     "Access-Control-Allow-Credentials": true,
          //   },
        });
        console.log("API response", response);
        if (response.status === 200) {
          router.push("/thankyou");
          setSuccess(true);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <>
      <PageHeader banner={banner} />
      {/* <header className="ab-header inner-header">
        <Image src={abBg} className="" alt="About Header" />
        <div className="ab-header-container">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-12">
                <div className="inner-header-content">
                  <h1 className="ab-header-heading">
                    Let's Build Your
                    <br className="d-none d-lg-block" />
                    <span>Future Together</span>
                  </h1>
                  <p className="para">
                    We believe collaboration drives innovation. Whether you're
                    looking for precision tools, custom solutions, or expert
                    advice, we're ready to partner with you. Let's connect and
                    explore how CTC Group can empower your operations and take
                    them to the next level.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="ab-header-img">
                  <Image
                    src={conBanner}
                    className="w-100 h-auto"
                    alt="About Header"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}
      <section className="con-sec sec ">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h3 className="sec-head">
                Reach Out for <br className="d-sm-block d-none" />
                <span>Tailored Solutions</span>
              </h3>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-7 col-12">
              <form className="con-form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <div className="inp-grp">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="error">{formik.errors.name}</div>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="inp-grp">
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      onChange={formik.handleChange}
                      value={formik.values.companyName}
                    />
                    {formik.touched.companyName && formik.errors.companyName ? (
                      <div className="error">{formik.errors.companyName}</div>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="inp-grp">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="inp-grp">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="error">{formik.errors.phone}</div>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="inp-grp">
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <div className="error">{formik.errors.address}</div>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="inp-grp">
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows="5"
                      onChange={formik.handleChange}
                      value={formik.values.message}
                    ></textarea>
                    {formik.touched.message && formik.errors.message ? (
                      <div className="error">{formik.errors.message}</div>
                    ) : null}
                  </div>
                </div>
                <button
                  type="submit"
                  className="main-btn with-arrow center"
                  disabled={formik.isSubmitting}
                >
                  <span>
                    {formik.isSubmitting
                      ? "Sending..."
                      : "Start Your Journey with Us"}
                  </span>
                  <Image
                    src={ArrowBlack}
                    className="w-auto h-auto"
                    alt="Arrow"
                  />
                </button>
                {success && (
                  <div className="success-msg">
                    <p>
                      Thank you for contacting us. We will get back to you soon.
                    </p>
                  </div>
                )}
              </form>
            </div>
            <div className="col-lg-5 offset-lg-1 d-none col-12">
              <div className="con-dets">
                <Tabs
                  id="contact-tabs"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3 con-tabs"
                >
                  <Tab
                    eventKey="ctc"
                    title={
                      <Image
                        src={lgg1}
                        style={{ width: "120px", height: "auto" }}
                        alt="CTC"
                      />
                    }
                  >
                    <ul className="con-dets">
                      <li>
                        <Image src={address} alt="" />
                        <div>
                          <h3>Address</h3>
                          <p className="para">
                            CTC Praezision, E57, 58 EMC Plots, Auto Cluster,
                            Adityapur Industrial Area, Jamshedpur, Jharkhand –
                            832 109
                          </p>
                        </div>
                      </li>
                      <li>
                        <Image src={phone} alt="" />
                        <div>
                          <h3>Phone Number</h3>
                          <Link href="tel:+916572200739">+916572200739</Link>
                        </div>
                      </li>
                      <li>
                        <Image src={email} alt="" />
                        <div>
                          <h3>Email Address</h3>
                          <Link href="mailto:info@ctcindia.co.in">
                            info@ctcindia.co.in
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </Tab>
                  <Tab
                    eventKey="praezision"
                    title={
                      <Image
                        src={lgg2}
                        style={{ width: "120px", height: "auto" }}
                        alt="Praezision"
                      />
                    }
                  >
                    <ul className="con-dets">
                      <li>
                        <Image src={address} alt="" />
                        <div>
                          <h3>Address</h3>
                          <p className="para">
                            CTC India Pvt Ltd, M2, (part), Phase VII Adityapur
                            Industrial Area, Gamharia, Jamshedpur, Jharkhand
                            832108, IN
                          </p>
                        </div>
                      </li>
                      <li>
                        <Image src={phone} alt="" />
                        <div>
                          <h3>Phone Number</h3>
                          <Link href="tel:+91 (657) 2200800">
                            +91 (657) 2200800
                          </Link>
                        </div>
                      </li>
                      <li>
                        <Image src={email} alt="" />
                        <div>
                          <h3>Email Address</h3>
                          <Link href="mailto:info@ctcindia.co.in">
                            info@ctcindia.co.in
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </Tab>
                  <Tab
                    eventKey="kemmer"
                    title={
                      <Image
                        src={lgg3}
                        style={{ width: "120px", height: "auto" }}
                        alt="Kemmer"
                      />
                    }
                  >
                    <ul className="con-dets">
                      <li>
                        <Image src={address} alt="" />
                        <div>
                          <h3>Address</h3>
                          <p className="para">
                            Kemmer Präzision, Melitta-Bentz-Straße 3 D-73529
                            Schwäbisch Gmünd, Germany
                          </p>
                        </div>
                      </li>
                      <li>
                        <Image src={phone} alt="" />
                        <div>
                          <h3>Phone Number</h3>
                          <Link href="tel:+49-(0)-7171-1047-0">
                            +49-(0)-7171-1047-0
                          </Link>
                        </div>
                      </li>
                      <li>
                        <Image src={email} alt="" />
                        <div>
                          <h3>Email Address</h3>
                          <Link href="mailto:info@kemmer-praezision.com">
                            info@kemmer-praezision.com
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </Tab>
                </Tabs>
                <div className="office-hours mt-4">
                  <li>
                    <Image src={office} alt="" />
                    <div>
                      <h3>Office Hours</h3>
                      <Link href="#">Mon - Sat: 9 AM - 5 PM IST</Link>
                    </div>
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-lg-3 col-12">
              <div className="con-data-ad">
                <Image
                  src={lgg1}
                  style={{
                    width: "150px",
                    height: "auto",
                    marginBottom: "40px",
                    borderRadius: "10px",
                  }}
                  alt="CTC"
                />
                <ul className="con-dets">
                  <li>
                    <Image src={address} alt="" />
                    <div>
                      <h3>Address</h3>
                      <p className="para">
                        CTC Praezision, E57, 58 EMC Plots, Auto Cluster,
                        Adityapur Industrial Area, Jamshedpur, Jharkhand – 832
                        109
                      </p>
                    </div>
                  </li>
                  <li>
                    <Image src={phone} alt="" />
                    <div>
                      <h3>Phone Number</h3>
                      <Link href="tel:+916572200739">+916572200739</Link>
                    </div>
                  </li>
                  <li>
                    <Image src={email} alt="" />
                    <div>
                      <h3>Email Address</h3>
                      <Link href="mailto:info@ctcindia.co.in">
                        info@ctcindia.co.in
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-12">
              <div className="con-data-ad">
                <Image
                  src={lgg2}
                  style={{
                    width: "150px",
                    height: "auto",
                    marginBottom: "40px",
                    borderRadius: "10px",
                  }}
                  alt="Praezision"
                />
                <ul className="con-dets">
                  <li>
                    <Image src={address} alt="" />
                    <div>
                      <h3>Address</h3>
                      <p className="para">
                        CTC India Pvt Ltd, M2, (part), Phase VII Adityapur
                        Industrial Area, Gamharia, Jamshedpur, Jharkhand 832108,
                        IN
                      </p>
                    </div>
                  </li>
                  <li>
                    <Image src={phone} alt="" />
                    <div>
                      <h3>Phone Number</h3>
                      <Link href="tel:+91 (657) 2200800">
                        +91 (657) 2200800
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Image src={email} alt="" />
                    <div>
                      <h3>Email Address</h3>
                      <Link href="mailto:info@ctcindia.co.in">
                        info@ctcindia.co.in
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-12">
              <div className="con-data-ad">
                <Image
                  src={lgg3}
                  style={{
                    width: "150px",
                    height: "auto",
                    marginBottom: "40px",
                    borderRadius: "10px",
                  }}
                  alt="Kemmer"
                />
                <ul className="con-dets">
                  <li>
                    <Image src={address} alt="" />
                    <div>
                      <h3>Address</h3>
                      <p className="para">
                        Kemmer Präzision, Melitta-Bentz-Straße 3 D-73529
                        Schwäbisch Gmünd, Germany
                      </p>
                    </div>
                  </li>
                  <li>
                    <Image src={phone} alt="" />
                    <div>
                      <h3>Phone Number</h3>
                      <Link href="tel:+49-(0)-7171-1047-0">
                        +49-(0)-7171-1047-0
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Image src={email} alt="" />
                    <div>
                      <h3>Email Address</h3>
                      <Link href="mailto:info@kemmer-praezision.com">
                        info@kemmer-praezision.com
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-12">
              <div className="con-data-ad">
                <Image
                  src={lgg4}
                  style={{
                    width: "150px",
                    height: "auto",
                    marginBottom: "40px",
                    borderRadius: "10px",
                  }}
                  alt="Kemmer"
                />
                <ul className="con-dets">
                  <li>
                    <Image src={address} alt="" />
                    <div>
                      <h3>Address</h3>
                      <p className="para">
                        60 Lorong 23 Geylang #07-02 D’Innova, Singapore 388384
                      </p>
                    </div>
                  </li>
                  <li>
                    <Image src={phone} alt="" />
                    <div>
                      <h3>Phone Number</h3>
                      <Link href="tel:+[65] 6744 7589">+[65] 6744 7589</Link>
                    </div>
                  </li>
                  <li>
                    <Image src={email} alt="" />
                    <div>
                      <h3>Email Address</h3>
                      <Link href="mailto:ats@alignmenttool.com.sg">
                        ats@alignmenttool.com.sg
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
