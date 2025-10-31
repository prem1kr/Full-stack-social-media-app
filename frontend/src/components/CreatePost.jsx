import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const fileChangeHandler = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const dataUrl = await readFileAsDataURL(selectedFile);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://social-media-msj4.onrender.com/api/v1/post/addpost",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
        setCaption("");
        setImagePreview("");
        setFile(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
        Create New Post
      </DialogTitle>
      <DialogContent>
        {/* User Info */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={user?.profilePicture}
            alt={user?.username}
            sx={{ width: 48, height: 48 }}
          >
            {user?.username?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Bio here...
            </Typography>
          </Box>
        </Box>

        {/* Caption Input */}
        <TextField
          fullWidth
          multiline
          minRows={2}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          variant="outlined"
          sx={{ mb: 2 }}
        />

        {/* Image Preview */}
        {imagePreview && (
          <Box
            sx={{
              width: "100%",
              height: 300,
              mb: 2,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <img
              src={imagePreview}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        {/* File Input */}
        <input
          type="file"
          ref={imageRef}
          onChange={fileChangeHandler}
          style={{ display: "none" }}
          accept="image/*"
        />
        <Button
          onClick={() => imageRef.current.click()}
          variant="contained"
          sx={{ backgroundColor: "#0095F6", mb: 2 }}
        >
          Select from computer
        </Button>

        {/* Post Button */}
        {imagePreview && (
          <Button
            onClick={createPostHandler}
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
                Please wait
              </>
            ) : (
              "Post"
            )}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
