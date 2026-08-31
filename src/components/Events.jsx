"use client";
import React, { useState, useEffect } from "react";
import { Tab, Tabs, Modal, Form } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import api from "@/axios/api";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { Pagination } from "swiper/modules";

/**
 * Helper to determine the default active tab (returns string eventKey or null)
 */
const getDefaultActiveTab = (event) => {
  if (Array.isArray(event.videos) && event.videos.length > 0) return "videos";
  if (Array.isArray(event.images) && event.images.length > 0) return "photos";
  if (Array.isArray(event.pdfs) && event.pdfs.length > 0) return "documents";
  return null;
};

const eventSwiperProps = {
  slidesPerView: 1,
  spaceBetween: 20,
  modules: [Pagination],
  pagination: { clickable: true },
  observer: true,
  observeParents: true,
  className: "swiper-pag",
  breakpoints: {
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
  },
};

const EventsGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    designation: "",
  });
  const [errors, setErrors] = useState({});
  const [events, setEvents] = useState([]);

  const [photoIndex, setPhotoIndex] = useState(-1);
  const [photoSlides, setPhotoSlides] = useState([]);

  // Track each event's active tab - use index as key
  const [activeTabs, setActiveTabs] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/allevents");
        setEvents(res.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Whenever events change, recalculate default active tabs for each event
  useEffect(() => {
    // Only set once (if already set, do not reset to avoid disrupting user selections)
    setActiveTabs((prev) => {
      const next = { ...prev };
      events.forEach((event, idx) => {
        if (
          typeof next[idx] !== "string" ||
          !["videos", "photos", "documents"].includes(next[idx])
        ) {
          next[idx] = getDefaultActiveTab(event);
        }
      });
      return next;
    });
  }, [events]);

  const handleTabSelect = (eIdx, tabKey) => {
    setActiveTabs((prev) => ({
      ...prev,
      [eIdx]: tabKey,
    }));
  };

  const handleDownload = (doc) => {
    setSelectedDoc(doc);
    setShowModal(true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await api.post("/download-request", formData);
      if (selectedDoc && selectedDoc.file_url) {
        const link = document.createElement("a");
        link.href = selectedDoc.file_url;
        link.download = selectedDoc.title || "document.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        designation: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="sec video-gallery-sec">
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            {events.length ? (
              events.map((event, eIdx) => {
                // Determine which tabs exist
                const hasVideos =
                  Array.isArray(event.videos) && event.videos.length > 0;
                const hasPhotos =
                  Array.isArray(event.images) && event.images.length > 0;
                const hasDocuments =
                  Array.isArray(event.pdfs) && event.pdfs.length > 0;

                // Only render Tabs if at least one type exists
                if (!hasVideos && !hasPhotos && !hasDocuments) return null;

                const defaultActiveKey = getDefaultActiveTab(event);

                // Which tab is active for this event
                const activeKey = activeTabs[eIdx] || defaultActiveKey;

                return (
                  <div className="event-section mb-5" key={event.id || eIdx}>
                    <h2 className="mb-4" style={{ color: "#fff" }}>
                      {event.title}
                    </h2>
                    <Tabs
                      id={`events-tabs-${eIdx}`}
                      className="mb-4 cc-tabs"
                      activeKey={activeKey}
                      onSelect={(k) => handleTabSelect(eIdx, k)}
                      // defaultActiveKey for first render
                      defaultActiveKey={defaultActiveKey}
                    >
                      {hasVideos && (
                        <Tab eventKey="videos" title="Videos">
                          <Swiper {...eventSwiperProps}>
                            {event.videos.map((video, idx) => (
                              <SwiperSlide key={idx}>
                                <div className="video-card">
                                  {video.file ? (
                                    <div
                                      className="video-card-video"
                                      dangerouslySetInnerHTML={{
                                        __html: video.file,
                                      }}
                                    />
                                  ) : (
                                    <div className="no-video text-center">
                                      No video found
                                    </div>
                                  )}
                                  <h3
                                    className="mt-2"
                                    style={{ color: "#fff" }}
                                  >
                                    {video.title}
                                  </h3>
                                  <p className="mt-2" style={{ color: "#fff" }}>
                                    {video.description}
                                  </p>
                                  {video.external_link && (
                                    <a
                                      href={video.external_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="main-btn"
                                    >
                                      <span>View More</span>
                                    </a>
                                  )}
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </Tab>
                      )}
                      {hasPhotos && (
                        <Tab eventKey="photos" title="Photos">
                          <Swiper {...eventSwiperProps}>
                            {event.images.map((img, idx) => (
                              <SwiperSlide key={idx}>
                                {img.file_url ? (
                                  <div className="gal-card">
                                    <div className="gal-img">
                                      <img
                                        src={img.file_url?.trimStart()}
                                        alt={img.title}
                                        className="img-fluid"
                                        style={{
                                          borderRadius: "8px",
                                          width: "100%",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          setPhotoSlides(
                                            event.images.map((i) => ({
                                              src: i.file_url,
                                              title: i.title,
                                              description: i.description,
                                            })),
                                          );
                                          setPhotoIndex(idx);
                                        }}
                                      />
                                    </div>
                                    <h3
                                      className="mt-2"
                                      style={{ color: "#fff" }}
                                    >
                                      {img.title}
                                    </h3>
                                    <p
                                      className="mt-2"
                                      style={{ color: "#fff" }}
                                    >
                                      {img.description}
                                    </p>

                                    {img.external_link && (
                                      <a
                                        href={img.external_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="main-btn"
                                      >
                                        <span>View More</span>
                                      </a>
                                    )}
                                  </div>
                                ) : (
                                  <div className="no-photo text-center">
                                    No image found
                                  </div>
                                )}
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </Tab>
                      )}
                      {hasDocuments && (
                        <Tab eventKey="documents" title="Documents">
                          <Swiper {...eventSwiperProps}>
                            {event.pdfs.map((doc, idx) => (
                              <SwiperSlide key={idx}>
                                <div className="pdf-card">
                                  <div className="thumb">
                                    {/* {JSON.stringify(doc.pdfthumb)} */}
                                    <Image
                                      src={doc.pdfthumb}
                                      alt={doc.title}
                                      width={500}
                                      height={500}
                                      style={{
                                        marginBottom: "10px",
                                      }}
                                    />
                                  </div>
                                  <h3 style={{ color: "#fff" }}>{doc.title}</h3>
                                  <p style={{ color: "#fff" }}>
                                    {doc.description}
                                  </p>
                                  {doc.external_link ? (
                                    <a
                                      href={doc.external_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="main-btn"
                                    >
                                      <span>View More</span>
                                    </a>
                                  ) : (
                                    <button
                                      className="main-btn"
                                      onClick={() => handleDownload(doc)}
                                    >
                                      <span>Download</span>
                                    </button>
                                  )}
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </Tab>
                      )}
                    </Tabs>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center">
                <p>No events found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Lightbox ONLY for photos */}
      <Lightbox
        open={photoIndex >= 0}
        close={() => setPhotoIndex(-1)}
        index={photoIndex}
        slides={photoSlides}
      />
      <Modal
        show={showModal}
        className="cc-modal"
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>Download Document</Modal.Title>
          <button
            style={{
              border: "1px solid #0C76D8",
              borderRadius: "100px",
              background: "transparent",
              padding: "5px",
              margin: 0,
              marginLeft: "auto",
            }}
            className="close-btn"
            onClick={() => setShowModal(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#0C76D8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#0C76D8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 form-group">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                isInvalid={!!errors.company}
              />
              <Form.Control.Feedback type="invalid">
                {errors.company}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 form-group">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                isInvalid={!!errors.designation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.designation}
              </Form.Control.Feedback>
            </Form.Group>
            <button className="main-btn" type="submit">
              <span>Submit & Download</span>
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default EventsGallery;
