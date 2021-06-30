import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";

const CommentComponent = (props) => {
  const token = useSelector((state) => state.ath.token);
  const [updateComment, setUpdateComment] = useState(false);
  const [text, setText] = useState("");

  const updateHandler = () => {
    axios
      .patch(
        "http://localhost:5000/comments/" + props.comment._id,
        { comment: text, blogId: props.blogId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (!response.data) throw new Error(response.data.message);
        console.log(response.message);
        window.alert("Comment successfully updated!");
      })
      .catch((error) => {
        window.alert(error.message);
        console.log("comment Not Updated");
      });
  };
  const deleteHandler = () => {
    axios
      .delete("http://localhost:5000/comments/" + props.comment._id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (!response.data) throw new Error(response.data.message);
        console.log(response.message);
        window.alert("Comment successfully deleted!");
      })
      .catch((error) => {
        window.alert(error.message);
        console.log("Comment Not Deleted");
      });
  };
  return (
    <div>
      <>
        <div key={props.comment._id.toString()}>
        <div>
          <Image src={"http://localhost:5000/" + props.comment.userId.image} roundedCircle style={{ width: "50px", height: "35px" }}/>
          <b>{props.comment.userId.name}</b>: {props.comment.comment}
        </div>
          <FaTrash
            style={{ color: "red", marginLeft: "10px" }}
            onClick={deleteHandler}
          />
          <FaEdit
            style={{ color: "red", marginLeft: "10px" }}
            onClick={() => setUpdateComment(!updateComment)}
          />
        </div>
        <div>
          {updateComment && (
            <Form>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="text"
                  placeholder="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Form.Group>
              <Button variant="outline-success" onClick={updateHandler}>
                Update
              </Button>
            </Form>
          )}
        </div>
      </>
    </div>
  );
};

export default CommentComponent;
