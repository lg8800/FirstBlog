import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
// import { withRouter } from "react-router-dom";
import BlogCard from "../Components/BlogCard";

const Home = (props) => {
  const token = useSelector((state) => state.ath.token);

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = (token) => {
    axios
      .get("http://localhost:5000/blog", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (!response.data.blogs) throw new Error(response.data.message);
        setBlogs(response.data.blogs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs(token);
  }, [token]);

  if (!token) {
    return <Redirect to="/login" />;
  }

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginLeft: "48%", marginTop: "20%" }}>
          <Spinner
            animation="border"
            variant="dark"
            size="lg"
            style={{ margin: "auto" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      {/* <div
        style={{
          width: "20%",
          display: "inline",
        }}
      ></div> */}
      <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
        {blogs.map((blog) => {
          return (
            <BlogCard
              key={blog._id}
              title={blog.title}
              message={blog.message}
              imageUrl={blog.imageUrl}
              blogId={blog._id.toString()}
            />
          );
        })}
      </div>
      {/* <div style={{ width: "20%", display: "inline" }}></div> */}
    </div>
  );
};

export default Home;
