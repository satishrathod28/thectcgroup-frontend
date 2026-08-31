"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowBlack from "@/images/arrow-black.svg";
import api from "@/axios/api";

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const toggleProducts = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await api.get("/home/industries_with_products"); // Adjust endpoint as needed
        setIndustries(response.data);
      } catch (error) {
        console.error("Failed to fetch industries", error);
        setIndustries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchIndustries();
  }, []);

  if (loading) {
    return (
      <section className="sec industries-section">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (industries.length === 0) {
    return (
      <section className="sec industries-section">
        <div className="container">
          <p>No industries found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="sec industries-section">
      <div className="container">
        {industries.map((industry, index) => {
          const hasProducts = industry.products?.length > 0;
          const isReversed = index % 2 === 1;

          return (
          <div className="industry-block mb-5" key={industry.id}>
            <div className="row align-items-center mb-5">
              <div
                className={`col-12 col-lg-6 order-1 ${isReversed ? "order-lg-2" : "order-lg-1"}`}
              >
                {industry?.image && industry?.image !== "" && (
                  <img
                    src={industry?.image}
                    alt={industry.heading}
                    className="img-fluid w-100 h-auto"
                  />
                )}
              </div>
              <div
                className={`col-12 col-lg-6 order-2 ${isReversed ? "order-lg-1" : "order-lg-2"}`}
              >
                <h3 className="sec-head sm-head mb-2">{industry.heading}</h3>
                <p className="para mb-4">{industry.description}</p>
                {hasProducts && (
                <button
                  type="button"
                  className={`main-btn with-arrow${expandedId === industry.id ? " is-active" : ""}`}
                  onClick={() => toggleProducts(industry.id)}
                  aria-expanded={expandedId === industry.id}
                >
                  <span>Related Products</span>
                  <Image
                    src={ArrowBlack}
                    className="w-auto h-auto"
                    alt="Arrow"
                  />
                </button>
                )}
              </div>
            </div>
            {/* <h3 className="sec-head sm-head mb-2">{industry.heading}</h3>
            <p className="para mb-4">{industry.description}</p> */}
            {hasProducts && (
            <div
              className={`collapsable-product-wrapper${expandedId === industry.id ? " is-expanded" : ""}`}
            >
              <div className="row g-4">
                {industry.products.map((product) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={product.id}>
                    <Link
                      href={`/product/${product?.slug}`}
                      className="industry-product-card h-100 text-center"
                    >
                      <div className="industry-product-img mb-3">
                        <img
                          src={product.image}
                          alt={product.alt_text || product.title}
                          className="img-fluid"
                        />
                      </div>
                      <h5 className="product-title">{product.title}</h5>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>
          );
        })}
      </div>
    </section>
  );
};

export default Industries;
