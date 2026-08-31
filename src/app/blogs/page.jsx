"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import abHeaderImg from "@/images/ab-banner.png";
import abBg from "@/images/ab-bg.svg";
import nhimg1 from "@/images/nhimg1.png";
import nhimg2 from "@/images/nhimg2.png";
import nhimg3 from "@/images/nhimg3.png";
import nhimg4 from "@/images/nhimg4.png";
import ArrowBlack from "@/images/arrow-black.svg";
import globe from "@/images/globe.png";
import pr from "@/images/pr.svg";

import nhBanner from "@/images/nh-banner.png";
import caImg from "@/images/ca-img.png";
import searchIcon from "@/images/search.svg";
import CareerGallery from "@/components/CareerGallery";

import ic1 from "@/images/ic1.svg";
import ic2 from "@/images/ic2.svg";
import ic3 from "@/images/ic3.svg";
import ic4 from "@/images/ic4.svg";
import ic5 from "@/images/ic5.svg";
import pdfIcon from "@/images/pdf-icon.svg";
import api from "@/axios/api";
import { useParams } from "next/navigation";
import TabSection from "@/components/product/TabSec";
import BlogCard from "@/components/BlogCard";
import PageHeader from "@/components/PageHeader";
const page = () => {
  const [blogs, setBlogs] = useState(null);
  const [allBlogs, setAllBlogs] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [banner, setBanner] = useState(null);
  useEffect(() => {
    const fetchBanner = async () => {
      const response = await api.get("/homebanner?page=blogs");
      setBanner(response.data);
    };
    fetchBanner();
  }, []);
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`/home/blogcategories`);
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch all blogs initially
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get(`/blogs`);
        setBlogs(response.data);
        setAllBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Handle category filtering
  const handleCategoryClick = (categoryId) => {
    let updatedSelected = [];
    if (selectedCategories.includes(categoryId)) {
      updatedSelected = selectedCategories.filter((id) => id !== categoryId);
    } else {
      updatedSelected = [...selectedCategories, categoryId];
    }
    setSelectedCategories(updatedSelected);

    // If no categories selected, show all blogs
    if (updatedSelected.length === 0) {
      setBlogs(allBlogs);
      return;
    }

    const filtered = allBlogs?.filter((blog) =>
      updatedSelected.includes(blog.category_id),
    );

    console.log("filtered blogs", filtered);

    setBlogs(filtered);
  };

  if (!blogs || (categories && categories.length === 0)) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <PageHeader banner={banner} />
      {/* <header className="ab-header inner-header">
     
        <div className="ab-header-container">
          <div className="container">
            <div className="row align-items-center justify-content-center text-center">
              <div className="col-lg-8 col-12">
                <div className="inner-header-content align-items-center justify-content-center">
                  <h1 className="ab-header-heading">
                    Latest <span> Blogs</span>
                  </h1>
                  <p className="para">
                    Precision micro tools driving seamless operations across
                    industries since 1983.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      <section className="sec ">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-12">
              <div className="blog-sidebar">
                <h4 style={{ color: "white" }}>Categories</h4>
                <ul className="categories">
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <li key={cat.id}>
                        <span>
                          <input
                            className="cat-input"
                            type="checkbox"
                            id={`cat${cat.id}`}
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => handleCategoryClick(cat.id)}
                          />
                          <label
                            htmlFor={`cat${cat.id}`}
                            style={{ color: "white" }}
                          >
                            {cat.name}
                          </label>
                        </span>
                      </li>
                    ))
                  ) : (
                    <li>No categories found.</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-lg-8 col-12">
              <div className="row row-gap-25">
                {blogs?.length > 0 ? (
                  blogs?.map((item, index) => (
                    <div className="col-lg-6 col-12 mb-4" key={index}>
                      <BlogCard data={item} />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p>No blogs found for the selected category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
