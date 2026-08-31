import Image from "next/image";
import api from "@/axios/api";
import BlogCard from "@/components/BlogCard";

const page = async ({ params }) => {
  const { id } = await params;
  let data;
  let relatedBlogs;
  try {
    const [blogResponse, relatedResponse] = await Promise.all([
      api.get(`/event/${id}`),
      api.get(`/events`),
    ]);
    data = blogResponse.data;

    relatedBlogs = relatedResponse.data.filter((blog) => blog.slug !== id);
  } catch (error) {
    console.log(error);
    return <div>Error loading blog</div>;
  }

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <section className="blog-page sec pt-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <div className="blog-page-content">
                <h1
                  className="blog-page-title sec-head"
                  dangerouslySetInnerHTML={{ __html: data?.title || "" }}
                />
                <div className="blog-page-img">
                  {data?.image && data?.image !== "" && (
                    <Image
                      src={data?.image}
                      width={500}
                      height={500}
                      className="w-100 h-auto"
                      alt="Blog Page"
                    />
                  )}
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <p className="blog-page-date mb-0">
                    <span>{data?.date}</span>
                  </p>
                  <p className="blog-page-date mb-0">
                    <span>{data?.venue || "venue name"}</span>
                  </p>
                </div>
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: data?.content || "" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {relatedBlogs?.length > 0 && relatedBlogs && (
        <section className="blog-page-related sec">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 col-12 text-center">
                <h2 className="sec-head">
                  Other <span>Events</span>
                </h2>
              </div>
            </div>
            <div className="row">
              {relatedBlogs?.length > 0 &&
                relatedBlogs &&
                relatedBlogs?.map((item, index) => (
                  <div className="col-lg-4 col-12" key={index}>
                    <BlogCard data={item} />
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default page;
