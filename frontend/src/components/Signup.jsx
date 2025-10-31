import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Visibility, VisibilityOff, Email, Lock, Person } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://social-media-msj4.onrender.com/api/v1/user/register",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
        setInput({ username: "", email: "", password: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: isMobile ? 2 : 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: isMobile ? 3 : 5,
          width: isMobile ? "90%" : 420,
          borderRadius: 4,
          backdropFilter: "blur(14px)",
          backgroundColor: "rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 2.5 : 3,
          textAlign: "center",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header */}
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 1,
          }}
        >
          Join Connectify
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.85)",
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
        >
          Create your account and start connecting with friends.
        </Typography>

        {/* Username */}
        <TextField
          label="Username"
          name="username"
          value={input.username}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: "rgba(255,255,255,0.7)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.4)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255,255,255,0.7)",
            },
          }}
        />

        {/* Email */}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={input.email}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "rgba(255,255,255,0.7)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.4)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255,255,255,0.7)",
            },
          }}
        />

        {/* Password */}
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={input.password}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "rgba(255,255,255,0.7)" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.4)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255,255,255,0.7)",
            },
          }}
        />

        {/* Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={signupHandler}
          disabled={loading}
          sx={{
            py: 1.3,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: "1rem",
            background: "linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #ff5e62 0%, #ff9966 100%)",
              transform: "translateY(-2px)",
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>

        {/* Footer */}
        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            mt: isMobile ? 1 : 2,
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
        >
          Already have an account?{" "}
          <MuiLink
            component={Link}
            to="/login"
            underline="hover"
            sx={{
              color: "#bbdefb",
              fontWeight: 600,
              fontSize: isMobile ? "0.9rem" : "1rem",
            }}
          >
            Login
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
