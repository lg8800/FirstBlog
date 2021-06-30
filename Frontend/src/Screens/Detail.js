import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import BlogCard from "./BlogCard";

const Detail = (props) => {
  const token = useSelector((state) => state.ath.token);

  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const blogId = props.match.params;
  useEffect(() => {
    axios
      .get("http://localhost:5000/blog/" + blogId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (!response.status !== 200) throw new Error(response.data.message);
        setBlog(response.data.blog);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  });
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
    <div>
      <BlogCard
        key={blog._id}
        title={blog.title}
        message={blog.message}
        imageUrl={blog.imageUrl}
        blogId={blog._id.toString()}
      />
    </div>
  );
};

export default Detail;
