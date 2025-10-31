import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  Chip,
  TextField,
  Stack,
} from "@mui/material";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import CommentDialog from "./CommentDialog";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const inputText = e.target.value.trim();
    setText(inputText);
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/${action}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setLiked(!liked);
        setPostLike((prev) => (liked ? prev - 1 : prev + 1));

        const updatedPosts = posts.map((p) =>
          p._id === post._id
            ? {
              ...p,
              likes: liked
                ? p.likes.filter((id) => id !== user._id)
                : [...p.likes, user._id],
            }
            : p
        );
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedComments = [...comment, res.data.comment];
        setComment(updatedComments);

        const updatedPosts = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedComments } : p
        );

        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedPosts = posts.filter((p) => p._id !== post._id);
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        my: 0,
        mx: "auto",
        width: "100%",
        borderBottom: "1px solid #e0e0e0",
        pb: 2,


      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar src={post.author?.profilePicture} alt={post.author?.username} />
          <Typography fontWeight={500}>{post.author?.username}</Typography>
          {user?._id === post.author._id && (
            <Chip label="Author" size="small" variant="outlined" />
          )}
        </Stack>

        <IconButton onClick={() => setMenuOpen(true)}>
          <MoreHorizIcon />
        </IconButton>
      </Box>

      {/* Post Image */}
      <Box
        component="img"
        src={post.image}
        alt="Post"
        sx={{
          width: "100%",
          height: 380,
          borderRadius: 1,
          objectFit: "cover",
          my: 1,
        }}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton onClick={likeOrDislikeHandler} color={liked ? "error" : "default"}>
            {liked ? <FaHeart /> : <FaRegHeart />}
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
          >
            <MessageCircle />
          </IconButton>
          <IconButton>
            <Send />
          </IconButton>
        </Stack>
        <IconButton onClick={bookmarkHandler}>
          <Bookmark />
        </IconButton>
      </Box>

      {/* Likes and Caption */}
      <Typography fontWeight={600}>{postLike} likes</Typography>
      <Typography variant="body2">
        <strong>{post.author?.username}</strong> {post.caption}
      </Typography>

      {/* Comments */}
      {comment.length > 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ cursor: "pointer", mt: 1 }}
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
        >
          View all {comment.length} comments
        </Typography>
      )}

      <CommentDialog open={open} setOpen={setOpen} />

      {/* Comment Input */}
      <Box display="flex" alignItems="center" mt={1}>
        <TextField
          fullWidth
          placeholder="Add a comment..."
          size="small"
          variant="standard"
          value={text}
          onChange={changeEventHandler}
          InputProps={{ disableUnderline: true }}
        />
        {text && (
          <Button
            onClick={commentHandler}
            size="small"
            sx={{ color: "#0095F6", fontWeight: 600 }}
          >
            Post
          </Button>
        )}
      </Box>

      {/* Dialog for post menu */}
      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DialogTitle>Post Options</DialogTitle>
        <DialogContent>
          {post.author._id !== user?._id && (
            <Button color="error" variant="text" fullWidth>
              Unfollow
            </Button>
          )}
          <Button variant="text" fullWidth>
            Add to favorites
          </Button>
          {user?._id === post.author._id && (
            <Button color="error" variant="text" fullWidth onClick={deletePostHandler}>
              Delete
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMenuOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Post;
