import React, { useState } from 'react';
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Blog = () => {
  const token = localStorage.getItem("token");

  // input fields
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();

  const submitBlog = async (e) => {
    try {
      e.preventDefault();

      const blogData = new FormData();
      blogData.append('title', title);
      blogData.append('message', message);
      blogData.append('image', image);
      console.log('blogData :',blogData);

      const response = await axios.post(
        "http://localhost:5000/blog",
        blogData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.blog) throw new Error("ERRR");

      window.alert("Blog submitted!");
    } catch (error) {
      window.alert("Blog not submitted!");
      console.log(error);
    }
  };


  const setUploadedImage = (event) => {
      const file = event.target.files[0];
      setImage(file);
  }

  return (
    <div>
      <div
        style={{
          alignSelf: "center",
          background: "#fff",
          marginBottom: "25%",
          marginTop: "5%",
          marginLeft: "25%",
          marginRight: "25%",
          padding: "5%",
          borderRadius: 5,
          border: "0.5px solid #ccc",
        }}
      >
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          Create Your Blog
        </h2>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.File
              id="custom-file"
              label="Custom file input"
              custom
              onChange={(e) => setUploadedImage(e)}
            />
          </Form.Group>
          <Button variant="outline-success" type="submit" onClick={submitBlog}>
            Post
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Blog;
