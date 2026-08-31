"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/axios/api";

const IndustriesPage = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

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
        {industries.map((industry) => (
          <div className="industry-block mb-5" key={industry.id}>
            <h3 className="sec-head sm-head mb-2">{industry.heading}</h3>
            <p className="para mb-4">{industry.description}</p>
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
        ))}
      </div>
    </section>
  );
};

export default IndustriesPage;
