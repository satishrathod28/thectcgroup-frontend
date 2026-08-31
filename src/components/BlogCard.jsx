import React from "react";
import Image from "next/image";
import ArrowBlack from "@/images/arrow-black.svg";
import Link from "next/link";
const BlogCard = ({ data, type = "blog" }) => {
  if (!data) return <div>Loading...</div>;
  return (
    <article className="blog-card">
      <div className="blog-card-img">
        <Image
          src={data?.image}
          width={500}
          height={500}
          className="w-100 h-auto"
          alt="Blog Card"
        />
      </div>
      <div className="blog-card-content">
        {data?.category && (
          <span className="mb-2 d-inline-block" style={{ color: "white" }}>
            {data?.category}
          </span>
        )}
        {type == "event" && (
          <div className="tp d-flex align-items-center justify-content-between mb-2">
            <span>{data?.date}</span>
            <span>{data?.venue}</span>
          </div>
        )}
        <h3
          className="blog-card-title"
          dangerouslySetInnerHTML={{ __html: data?.title }}
          style={{ color: "white" }}
        />
        <p
          className="blog-card-date"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
        <Link
          href={`/${type == "event" ? "events" : "blogs"}/${data?.slug}`}
          className="main-btn with-arrow"
        >
          <span>{type == "event" ? "View Event" : "Read More"}</span>
          <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
