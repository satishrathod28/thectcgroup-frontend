"use client";
import React from "react";
import Image from "next/image";

// Shows the first 5 products found across all categories in `productCard`
// (the same data already fetched for ProductSec via /categories).
const TopProducts = ({ productCard }) => {
  const topFive = (productCard || [])
    .flatMap((category) => category?.products || [])
    .slice(0, 5);

  if (!topFive.length) return null;

  return (
    <section className="sec pr-sec top-products-sec">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="sec-head">
              Top 5 <span>Products</span>
            </h3>
          </div>
        </div>
        <div className="row row-gap-25 justify-content-center">
          {topFive.map((product, index) => (
            <div className="col-lg-4 col-12" key={product?.slug || index}>
              <a
                href={`/product/${product?.slug}`}
                target="_blank"
                className="wr-wrap style-2"
              >
                {product?.section1?.image && product?.section1?.image !== "" ? (
                  <Image
                    src={product?.section1?.image}
                    width={500}
                    height={500}
                    alt="Product"
                    className="tab-image"
                  />
                ) : (
                  ""
                )}
                <div className="con">
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: product?.title,
                    }}
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
