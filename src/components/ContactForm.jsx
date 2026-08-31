"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import ArrowBlack from "@/images/arrow-black.svg";
import api from "@/axios/api";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [pageUrl, setPageUrl] = useState("");

  // Grab the current page URL for the hidden field
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
    // eslint-disable-next-line
  }, []);

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
    enableReinitialize: true, // So page_url gets set on client side after hydrate
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
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("companyName", values.companyName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("message", values.message);
      formData.append("page_url", values.page_url || pageUrl);

      try {
        const response = await api.post("/contact", formData, {
          withCredentials: true,
        });
        if (response.status === 200) {
          router.push("/thankyou");
          setSuccess(true);
        }
      } catch (error) {
        // Optionally handle error
      } finally {
        setSubmitting(false);
      }
    },
  });

  // In case form is mounted on server, set page URL on mount
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      formik.values.page_url !== window.location.href
    ) {
      formik.setFieldValue("page_url", window.location.href);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <form className="con-form" onSubmit={formik.handleSubmit}>
      {/* Hidden input for page_url */}
      <input
        type="hidden"
        name="page_url"
        value={formik.values.page_url || ""}
        readOnly
      />

      <div className="form-group">
        <div className="inp-grp">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
          {formik.isSubmitting ? "Sending..." : "Start Your Journey with Us"}
        </span>
        <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
      </button>
      {success && (
        <div className="success-msg">
          <p>Thank you for contacting us. We will get back to you soon.</p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
