import React from "react";
import ManufacturingMap from "./ManufacturingMap";
import CustomersMap from "./CustomersMap";
import { Tab, Tabs, Modal, Form } from "react-bootstrap";
import ArrowBlack from "@/images/arrow-black.svg";
import Image from "next/image";

const GlobalSection = () => (
  <section
    className="sec global-section pt-0"
    // style={{ background: "#f9f9f9", padding: "60px 0" }}
  >
    <div className="container">
      <div className="row pt-5">
        <div className="col-12">
          <div className="row align-items-center py-5 row-gap-25">
            <div className="col-lg-6 col-12 ">
              <h3 className="sec-sub-head with-bg ">About CTC Group</h3>
              <h2 className="sec-head">
                PRECISION THAT PERFORMS. <br className="d-none d-lg-block" />
                ENGINEERING THAT ENDURES.
                {/* Excellence <br className="d-none d-lg-block" />
                <span>Across Borders</span> */}
              </h2>
              <p className="para">
               CTC Group is a global precision engineering organisation dedicated to designing,
                manufacturing, and advancing high-performance cutting tool solutions for industries where
                accuracy is non-negotiable and reliability is mission-critical.
                <br /><br />
                Founded in 1983, CTC began with a singular focus - manufacturing precision tungsten
                carbide tools with uncompromising consistency. Over four decades, that focused discipline
                evolved into a multi-brand global engineering ecosystem, bringing together specialised
                expertise across tooling design, micro-machining, advanced coatings, and high-performance
                manufacturing.
                <br /><br />
                Today, CTC Group supports manufacturers across aerospace, automotive, electronics,
                medical, and advanced engineering industries delivering tools that do more than cut
                materials. They enable performance, repeatability, and confidence on the shop floor
              </p>
              <a href="/contact" className="main-btn with-arrow">
                <span>Contact us</span>
                <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
              </a>
            </div>

            <div className="col-lg-6 col-12 ">
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/18c5P7QNiIE?si=6tf9Y_ziJecC3Twg"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="">
            <Tabs defaultActiveKey="manufacturing" className="mb-4 cc-tabs">
              <Tab eventKey="manufacturing" title="Customers">
                <ManufacturingMap />
              </Tab>
              <Tab eventKey="customers" title="Manufacturing">
                <CustomersMap />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default GlobalSection;
