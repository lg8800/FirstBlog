import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import baseUrl from "../Constants/baseurl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FaComment } from "react-icons/fa";
import CommentComponent  from "./CommentComponent";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const token = localStorage.getItem("token");
  // const userId = useSelector((state) => state.ath.userId);

  const { title, message, imageUrl, blogId } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [postComment, setPostComment] = useState(false);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = () => {
    axios
      .get("http://localhost:5000/comments/" + blogId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (!response.data) throw new Error(response.data.message);
        console.log(response.data);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.log(error.message);
        console.log("comment Not fetched");
      });
  };

  const likeHandler = () => {
    setIsLiked(true);
    setLikes((prevState) => prevState + 1);
    axios
      .post(
        "http://localhost:5000/like/like",
        { blogId: blogId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        setIsLiked(false);
        setLikes((prevState) => prevState - 1);
        console.log(error.message);
      });
  };

  const unlikeHandler = () => {
    setIsLiked(false);
    setLikes((prevState) => prevState - 1);
    axios
      .delete("http://localhost:5000/like/unlike/" + blogId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {})
      .catch((error) => {
        setIsLiked(true);
        console.log(error.message);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/like/likes/" + blogId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (!response.data.count) throw new Error(response.data.message);
        setLikes(response.data.count);
        fetchComments();
      })
      .catch((error) => {
        console.log(error.message);
      });
    axios
      .get("http://localhost:5000/like/isliked/" + blogId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (!response.data.isLiked) throw new Error(response.data.message);
        setIsLiked(response.data.isLiked);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [token, blogId]);

  const commentHandler = () => {
    axios
      .post(
        "http://localhost:5000/comments/",
        { blogId: blogId, comment: comment },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        window.alert(response.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const toggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  let modifiedImageUrl;

  if (imageUrl && imageUrl.trim().length > 0) {
    modifiedImageUrl = baseUrl + imageUrl;
  } else {
    modifiedImageUrl = imageUrl;
  }

  return (
    <div
      style={{
        borderRadius: 5,
        border: "1px solid #ccc",
        margin: 30,
      }}
    >
      <div style={{ padding: 10 }}>
        <h4 style={{ margin: 0 }}>{title}</h4>
      </div>
      {imageUrl && imageUrl.trim().length > 0 && (
        <img
          src={modifiedImageUrl}
          alt="default"
          style={{
            width: "100%",
            height: 400,
            objectFit: "cover",
            borderTop: "0.5px solid #ccc",
            borderBottom: "0.5px solid #ccc",
          }}
        />
      )}
      <div style={{ padding: 10 }}>
        <h5>{message}</h5>
      </div>
      <div style={{ width: "100%", padding: 10, display: "flex" }}>
        {isLiked ? (
          <div style={{ marginRight: 5 }}>
            <FontAwesomeIcon
              icon={faHeart}
              size="lg"
              color="#ff6347"
              onClick={unlikeHandler}
            />
          </div>
        ) : (
          <div style={{ marginRight: 5 }}>
            <FontAwesomeIcon
              icon={faHeart}
              size="lg"
              color="#ccc"
              onClick={likeHandler}
            />
          </div>
        )}
        <div>{likes}</div>
        <div>
          <div>
            {/* <Link to={"/blog/" + props.blogId}> read more </Link> */}
            <FaComment
              onClick={toggleComments}
              style={{ margin: "5px", color: "red", width: "40px", size: "50" }}
            />
            {showComments &&
              comments.map((comment) => {
                return <CommentComponent comment={comment} blogId={blogId} />;
              })}
            <Form>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="comment"
                  placeholder="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button variant="outline-success" onClick={commentHandler}>
                Post
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
