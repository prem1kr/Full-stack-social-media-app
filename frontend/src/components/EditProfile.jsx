import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "@/redux/authSlice";

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    bio: user?.bio || "",
    gender: user?.gender || "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePhoto: file });
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://social-media-msj4.onrender.com/api/v1/user/profile/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedUserData = {
          ...user,
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture,
          gender: res.data.user?.gender,
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Edit Profile
      </Typography>

      {/* Profile Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#f5f5f5",
          borderRadius: 2,
          p: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={
              input.profilePhoto instanceof File
                ? URL.createObjectURL(input.profilePhoto)
                : user?.profilePicture
            }
            alt="profile"
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {user?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {input.bio || "Bio here..."}
            </Typography>
          </Box>
        </Box>
        <input
          ref={imageRef}
          type="file"
          onChange={fileChangeHandler}
          hidden
          accept="image/*"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => imageRef.current.click()}
          sx={{ textTransform: "none" }}
        >
          Change photo
        </Button>
      </Box>

      {/* Bio Section */}
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Bio
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        value={input.bio}
        onChange={(e) => setInput({ ...input, bio: e.target.value })}
        placeholder="Write something about yourself..."
        variant="outlined"
        margin="normal"
      />

      {/* Gender Section */}
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Gender
      </Typography>
      <Select
        fullWidth
        value={input.gender}
        onChange={(e) => setInput({ ...input, gender: e.target.value })}
        displayEmpty
        sx={{ mb: 3 }}
      >
        <MenuItem value="">Select gender</MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </Select>

      {/* Submit Button */}
      <Box display="flex" justifyContent="flex-end">
        {loading ? (
          <Button variant="contained" disabled>
            <CircularProgress size={22} sx={{ mr: 1 }} /> Please wait
          </Button>
        ) : (
          <Button
            onClick={editProfileHandler}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Submit
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default EditProfile;
