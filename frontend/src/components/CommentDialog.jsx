import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice";
import Comment from "./Comment";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments || []);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `https://social-media-msj4.onrender.com/api/v1/post/${selectedPost?._id}/comment`,
        { text },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
      <DialogContent sx={{ p: 0, display: "flex", height: "80vh" }}>
        {/* LEFT SIDE: Image */}
        <Box sx={{ width: "50%", height: "100%" }}>
          <img
            src={selectedPost?.image}
            alt="post"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
          />
        </Box>

        {/* RIGHT SIDE: Comments Section */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Link>
                <Avatar
                  src={selectedPost?.author?.profilePicture}
                  alt={selectedPost?.author?.username}
                >
                  {selectedPost?.author?.username?.[0]?.toUpperCase() || "U"}
                </Avatar>
              </Link>
              <Box>
                <Link
                  style={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {selectedPost?.author?.username}
                </Link>
              </Box>
            </Stack>

            <IconButton>
              <MoreHoriz />
            </IconButton>
          </Box>

          <Divider />

          {/* Comments List */}
          <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            {comment.map((c) => (
              <Comment key={c._id} comment={c} />
            ))}
          </Box>

          {/* Input Section */}
          <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Add a comment..."
                value={text}
                onChange={changeEventHandler}
              />
              <Button
                variant="contained"
                onClick={sendMessageHandler}
                disabled={!text.trim()}
              >
                Send
              </Button>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
