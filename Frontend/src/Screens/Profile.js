import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Form, Button, Modal, Container, Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import BlogCard from "../Components/BlogCard";

const Profile = () => {
  const token = useSelector((state) => state.ath.token);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [work, setWork] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showBlogs, setShowBlogs] = useState(false);
  const [image, setImage] = useState();
  const [blogs, setBlogs] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setUploadImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  const updateHandler = () => {
    const profileData = new FormData();
    profileData.append("name", name);
    profileData.append("email", email);
    profileData.append("phone", phone);
    profileData.append("work", work);
    profileData.append("image", image);
    axios
      .patch("http://localhost:5000/update", profileData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (!response.data) throw new Error(response.data.message);
        window.alert("User profile successfully updated!");
      })
      .catch((err) => {
        window.alert(err.message);
        console.log("Profile Not Updated");
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/about", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data.user);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setWork(response.data.user.work);
        setPhone(response.data.user.phone);
        setImage(response.data.user.image);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    axios.get("http://localhost:5000/userBlogs", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      setBlogs(response.data.blogs);
    }).catch((err) => {
      window.alert(err.message)
    });
  }, [token]);

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
      <Container>
        <Row>
          <Col xs={6} md={6}>
            <Image
              src={"http://localhost:5000/" + image}
              alt="Default Image"
              roundedCircle
              style={{ width: "500px", height: "200px" }}
              fluid
            />
          </Col>
          <Col
            xs={6}
            md={6}
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <h4>{name}</h4>
            <h4>{work}</h4>
            <h4>{email}</h4>
            <h4>{phone}</h4>
          </Col>
        </Row>
      </Container>
      <Button
        variant="outline-success"
        onClick={handleShow}
        style={{ margin: "20px" }}
      >
        Edit profile
      </Button>
      <Button
        variant="outline-success"
        onClick={() => setShowBlogs(!showBlogs)}
        style={{ margin: "20px" }}
      >
        Show Blogs
      </Button>
      {showBlogs && (
        <div>
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
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST">
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicWork">
              <Form.Label>Profession</Form.Label>
              <Form.Control
                name="work"
                type="text"
                placeholder="Enter your profession"
                value={work}
                onChange={(e) => setWork(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                id="custom-file"
                label="Custom file input"
                custom
                onChange={(e) => setUploadImage(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-success" onClick={updateHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
