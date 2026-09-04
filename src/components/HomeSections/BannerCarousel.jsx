"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Simple image/banner carousel with prev/next circular arrows and
// auto-play. Pass `banners` as an array of { image, alt } objects.
// `autoPlayInterval` is in milliseconds (set to 0 to disable auto-play).
const BannerCarousel = ({ banners = [], autoPlayInterval = 4000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  if (!banners.length) return null;

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance the carousel; restarts the timer whenever the slide
  // changes (including manual prev/next clicks) so the interval stays
  // consistent instead of double-advancing right after a manual click.
  useEffect(() => {
    if (!autoPlayInterval || banners.length <= 1) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(timerRef.current);
  }, [activeIndex, autoPlayInterval, banners.length]);

  const handlePrev = () => {
    clearInterval(timerRef.current);
    goPrev();
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    goNext();
  };

  return (
    <section className="home-banner-carousel">
      <div className="hbc-track">
        {banners.map((item, idx) => (
          <div
            key={idx}
            className={`hbc-slide ${idx === activeIndex ? "active" : ""}`}
          >
            <Image
              src={item.image}
              alt={item.alt || `Banner ${idx + 1}`}
              fill
              className="hbc-slide-img"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            className="hbc-arrow hbc-arrow-left"
            onClick={handlePrev}
            aria-label="Previous banner"
          >
            ‹
          </button>
          <button
            type="button"
            className="hbc-arrow hbc-arrow-right"
            onClick={handleNext}
            aria-label="Next banner"
          >
            ›
          </button>
        </>
      )}
    </section>
  );
};

export default BannerCarousel;