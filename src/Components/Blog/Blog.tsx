import { FaRegCalendarAlt, FaRegUser, FaTags } from "react-icons/fa";
import PrimaryLink from "../../Shared/PrimaryLink";

const Blog = () => {
  return (
    <div className="fixed-w pt-10 pb-20">
      <h3 className="text-center heading my-6">Leatest Blogs</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <BlogCard
          author={"Admin"}
          tag={"Decorate"}
          title={"10 Brilliant Ways To Decorate Your Home"}
          image={
            "https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/blog/1.jpg"
          }
          date={"June 24, 2024"}
          link={"/"}
        />
        <BlogCard
          author={"Admin"}
          tag={"Interior"}
          title={"Recent Commercial Real Estate Transactions"}
          image={
            "https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/blog/2.jpg"
          }
          date={"June 29, 2024"}
          link={"/"}
        />
        <BlogCard
          author={"Admin"}
          tag={"Estate"}
          title={"The Most Inspiring Interior Design Of 2021"}
          image={
            "https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/blog/3.jpg"
          }
          date={"June 27, 2024"}
          link={"/"}
        />
      </div>
    </div>
  );
};

export default Blog;

const BlogCard = ({ image, title, link, date, tag, author }: any) => {
  return (
    <div className="shadow-md">
      <img src={image} className="w-full" alt="" />
      <div className="p-5">
        <div className="flex items-center gap-6">
          <p className="flex items-center gap-2 font-medium">
            <FaRegUser className="text-primary" />
            by: {author}
          </p>
          <p className="flex items-center gap-2">
            <FaTags className="text-primary" />
            {tag}
          </p>
        </div>
        <h4 className=" mt-3 text-lg md:text-xl lf font-semibold text-secondary font-josefin">
          {title}
        </h4>
        <hr className="my-4" />
        <div className="flex  justify-between items-center gap-6">
          <p className="flex items-center gap-2 font-questrial font-semibold text-primary">
            <FaRegCalendarAlt className="text-primary" />
            {date}
          </p>
          <PrimaryLink address={link} level={"Read More"} />
        </div>
      </div>
    </div>
  );
};
