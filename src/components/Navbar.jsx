"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/images/logo.png";
import menu from "@/images/menu.svg";
import close from "@/images/close.svg";
import { PatternAnim } from "@/components/PatternAnim";
import api from "@/axios/api";
import lgg1 from "@/images/lgg1.png";
import lgg2 from "@/images/lgg2.png";
import lgg3 from "@/images/lgg3.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [menuLinks, setMenuLinks] = useState([]);
  const [brands, setBrands] = useState([]);
  // const [brands, setBrands] = useState([
  //     {
  //         title: 'CTC India',
  //         link:'https://www.ctcindiatools.com/',
  //         image: lgg1,
  //     },
  //     {
  //         title: 'CTC Praezision',
  //         link:'/service/ctc-praezision',
  //         image: lgg2,
  //     },
  //     {
  //         title: 'Kemmer Prazision',
  //         link:'https://www.kemmer-praezision.com/en/home/',
  //         image: lgg3,
  //     },
  // ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDrop, setShowDrop] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/categories");
        setProducts(res.data);
        console.log("res", res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();

    const fetchBrands = async () => {
      try {
        const res = await api.get("/services");
        setBrands(res.data);
        console.log("res", res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (products) {
      console.log("products", products);
      setMenuLinks([
        {
          name: "Home",
          link: "/",
          mega: false,
        },
        {
          name: "Our Brands",
          link: null,
          hasDropdown: brands,
          mega: true,
        },
        {
          name: "About Us",
          link: "/about",
          mega: false,
        },

        {
          name: "Product",
          link: null,
          hasDropdown: products,
          mega: false,
        },
        {
          name: "Industry",
          link: "/industry",
          mega: false,
        },

        {
          name: "Resources",
          link: null,
          mega: false,
          hasDropdown: [
            {
              name: "Gallery",
              link: "/gallery",
            },
            {
              name: "Blogs",
              link: "/blogs",
            },
            {
              name: "Career",
              link: "/career",
            },
            {
              name: "Downloads",
              link: "/downloads",
            },
          ],
        },
      ]);
    }
  }, [products]);

  return (
    <>
      <PatternAnim />
      <nav className="main-nav">
        <div className="container">
          <div className="inner-nav">
            <div className="l-part">
              <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                <Image src={menu} alt="Menu" width={24} height={24} />
              </button>
              <Link href="/" className="logo">
                <Image src={logo} alt="Logo" className="w-100 h-auto" />
              </Link>
            </div>
            <div className="m-part">
              <ul className="nav-list">
                {menuLinks &&
                  menuLinks.map((link, index) => (
                    <li key={index}>
                      {link.hasDropdown ? (
                        <div className="has-drop">
                          <Link href={link.link ? link.link : "#"}>
                            {link.name}
                          </Link>

                          <div
                            className={`drop-mega ${
                              link.mega ? "mega-brand" : ""
                            }`}
                          >
                            {link.name === "Product" ? (
                              <ul>
                                {products.map((category, idx) => (
                                  <li key={idx} className="sub-link">
                                    <Link href={"#"}>{category.name}</Link>
                                    {category.products &&
                                      category.products.length > 0 && (
                                        <div className={`submenu`}>
                                          <ul>
                                            {category.products.map(
                                              (product, subIdx) => (
                                                <li key={subIdx}>
                                                  <Link
                                                    href={`/product/${product.slug}`}
                                                    dangerouslySetInnerHTML={{
                                                      __html: product.title,
                                                    }}
                                                  ></Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )}
                                  </li>
                                ))}
                              </ul>
                            ) : link.name === "Our Brands" ? (
                              <ul>
                                {link.hasDropdown.map((item, idx) => (
                                  <li key={idx} className="sub-link">
                                    <Link
                                      href={
                                        item?.extr_link
                                          ? item?.extr_link
                                          : `/service/${item?.slug}`
                                      }
                                    >
                                      {item.logoimage && (
                                        <Image
                                          width={100}
                                          height={100}
                                          src={item.logoimage}
                                          alt={item.title}
                                        />
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <ul>
                                {link.hasDropdown.map((item, idx) => (
                                  <li key={idx} className="sub-link">
                                    <Link href={item.link || "#"}>
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ) : (
                        <Link href={link.link || "#"}>{link.name}</Link>
                      )}
                    </li>
                  ))}
              </ul>
              <ul className="ot-list">
                <li>
                  <Link href="/contact" className="main-btn white-btn">
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
        <div className="menu-head">
          <Link href="" className="logo">
            <Image src={logo} alt="Logo" width={100} height={100} />
          </Link>
          <button className="menu-close" onClick={() => setIsOpen(!isOpen)}>
            <Image src={close} alt="Close" width={24} height={24} />
          </button>
        </div>
        <ul className="nav-list">
          {menuLinks &&
            menuLinks.map((link, index) => (
              <li key={index}>
                {link.hasDropdown ? (
                  <>
                    <Link
                      href="#"
                      onClick={() =>
                        setShowDropdown((prev) =>
                          prev === link?.name ? null : link?.name
                        )
                      }
                    >
                      {link.name}
                    </Link>
                    {showDropdown === link?.name && (
                      <div className={`drop-mega `}>
                        {link.name === "Product" ? (
                          <ul>
                            {products.map((category, idx) => (
                              <li key={idx}>
                                <Link
                                  href={`#`}
                                  onClick={() =>
                                    setShowDrop((prev) =>
                                      prev === idx ? null : idx
                                    )
                                  }
                                >
                                  {category.name}
                                </Link>
                                {showDrop === idx &&
                                  category.products &&
                                  category.products.length > 0 && (
                                    <ul className="submenu">
                                      {category.products.map(
                                        (product, subIdx) => (
                                          <li key={subIdx}>
                                            <Link
                                              href={`/product/${product.slug}`}
                                              onClick={() => setIsOpen(false)}
                                            >
                                              {product.title}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                              </li>
                            ))}
                          </ul>
                        ) : link.name === "Our Brands" ? (
                          <ul>
                            {/* {JSON.stringify(link)} */}
                            {link.hasDropdown.map((item, idx) => {
                              {
                                /* console.log('item', item); */
                              }
                              return (
                                <li key={idx} className="sub-link">
                                  <Link
                                    href={
                                      item?.extr_link
                                        ? item?.extr_link
                                        : `/service/${item?.slug}`
                                    }
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {item.logoimage && (
                                      <Image
                                        width={100}
                                        height={100}
                                        src={item.logoimage}
                                        className=" brand-logo-img"
                                        alt={item.title}
                                      />
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <ul>
                            {link.hasDropdown.map((item, idx) => (
                              <li
                                key={idx}
                                className="sub-link"
                                onClick={() => setIsOpen(false)}
                              >
                                <Link href={item.link || "#"}>{item.name}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={link.link} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
