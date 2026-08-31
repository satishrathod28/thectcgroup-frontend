"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import abHeaderImg from "@/images/ab-banner.png";
import abBg from "@/images/ab-bg.svg";
import abSec2Img from "@/images/ab2.png";
import ArrowBlack from "@/images/arrow-black.svg";
import msImg from "@/images/ms-img.png";
import { useFormik } from "formik";
import * as Yup from "yup";

import caBanner from "@/images/ca-banner.png";
import caImg from "@/images/ca-img.png";
import searchIcon from "@/images/search.svg";
import CareerGallery from "@/components/CareerGallery";
import api from "@/axios/api";
import { Modal, Button } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

const page = () => {
  const [jobs, setJobs] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [success, setSuccess] = useState(false);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs data:", error);
      }
    };
    const fetchBanner = async () => {
      const response = await api.get("/homebanner?page=career");
      setBanner(response.data);
    };
    fetchJobs();
    fetchBanner();
  }, []);

  const handleKnowMoreClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleCloseApplyModal = () => {
    setShowApplyModal(false);
    setSelectedJob(null);
    setSuccess(false);
    formik.resetForm();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = jobs?.filter(
    (job) =>
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      resume: null,
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      resume: Yup.mixed().required("Resume is required"),
      message: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("resume", values.resume);
        formData.append("message", values.message);
        formData.append("position", selectedJob.id);

        await api.post("/career", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            // 'Access-Control-Allow-Credentials': true
          },
        });

        setSuccess(true);
        setTimeout(() => {
          handleCloseApplyModal();
        }, 3000);
      } catch (error) {
        console.error("Error submitting application:", error);
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <PageHeader banner={banner} />
      <section className="sec about-sec2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-12">
              <Image
                src={caImg}
                className="w-100 h-auto"
                alt="About Section 2"
              />
            </div>
            <div className="col-lg-6 offset-lg-1 col-12">
              <div className="about-sec2-content">
                <h3 className="sec-head">Why CTC Group?</h3>
                <p className="para mb-0">
                  At CTC Group, we believe in fostering innovation and
                  excellence. We offer exciting career opportunities across
                  functions like engineering, R&D, production, and sales. Become
                  a part of a global leader in precision engineering, where your
                  talent will drive cutting-edge solutions for industries
                  worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-best-place-sec sec">
        <div className="container">
          <h3 className="sec-head text-center mb-5">
            Why we are the best place to work
          </h3>
          <div className="row row-gap-25 justify-content-center">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="why-box">
                <h3 className="why-title">We Create Value</h3>
                <p className="para">
                  Understanding clients’ needs, long-term commitment and speedy
                  delivery make us one of the most award winning tech firms in
                  the industry.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="why-box">
                <h3 className="why-title">We Innovate Everyday</h3>
                <p className="para">
                  Our global team of experts is continuously creating new
                  technology solutions to enable our clients to stay ahead of
                  the competition.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="why-box">
                <h3 className="why-title">We Love Technology</h3>
                <p className="para">
                  Technology has the power to change lives. Making our love for
                  it eternal and at CTC, we always use technology in a creative
                  and ethical manner.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="why-box">
                <h3 className="why-title">
                  We Embrace Integrity, Respect, and Commitment
                </h3>
                <p className="para">
                  We mean what we say, we respect our colleagues, clients, and
                  business partners and strive to meet commitments. We are
                  upfront, honest, ethical, and sincere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cur-op-sec sec pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h3 className="sec-head white">Current Openings</h3>
              <div className="ca-search-inp">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Image src={searchIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="row row-gap-25 mt-5">
            {filteredJobs &&
              filteredJobs.map((item, index) => (
                <div className="col-lg-4 col-12" key={index}>
                  <div className="job-card">
                    <div>
                      <h3 dangerouslySetInnerHTML={{ __html: item?.role }} />
                      <p
                        className="para"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />
                    </div>
                    <div className="job-card-btn">
                      <button
                        className="main-btn with-arrow"
                        onClick={() => handleApplyClick(item)}
                      >
                        <span>Apply Now</span>
                        <Image
                          src={ArrowBlack}
                          className="w-auto h-auto"
                          alt="Arrow"
                        />
                      </button>
                      <button
                        className="main-btn only-text"
                        onClick={() => handleKnowMoreClick(item)}
                      >
                        <span>Know More</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <CareerGallery />

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="career-modal cc-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob?.role}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="para">Experience: {selectedJob?.experience}</p>
            <div dangerouslySetInnerHTML={{ __html: selectedJob?.content }} />
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showApplyModal}
        onHide={handleCloseApplyModal}
        className="career-modal cc-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Apply for {selectedJob?.role}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="form-control"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="form-control"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="form-control"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error">{formik.errors.phone}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={(event) => {
                  formik.setFieldValue("resume", event.currentTarget.files[0]);
                }}
                className="form-control"
              />
              {formik.touched.resume && formik.errors.resume && (
                <div className="error">{formik.errors.resume}</div>
              )}
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Additional Message (Optional)"
                onChange={formik.handleChange}
                value={formik.values.message}
                className="form-control"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="main-btn with-arrow"
              disabled={formik.isSubmitting}
            >
              <span>
                {formik.isSubmitting ? "Submitting..." : "Submit Application"}
              </span>
              <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
            </button>

            {success && (
              <div className="success-msg mt-3">
                <p>Your application has been submitted successfully!</p>
              </div>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default page;
