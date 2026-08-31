import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import api from "@/axios/api";
import Link from "next/link";
import Image from "next/image";
import ArrowBlack from "@/images/arrow-black.svg";
const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="sec up-ev-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h3 className="sec-head">Upcoming Events</h3>
          </div>
        </div>
        <div className="row row-gap-25 mt-5">
          {events.map((item, index) => (
            <div className="col-lg-3 col-12" key={index}>
              <BlogCard type="event" data={item} />
            </div>
          ))}
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <Link href={`/events/`} className="main-btn with-arrow center">
              <span>View All</span>
              <Image src={ArrowBlack} className="w-auto h-auto" alt="Arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
