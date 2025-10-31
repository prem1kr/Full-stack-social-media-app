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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://social-media-msj4.onrender.com/api/v1/user/login",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
        setInput({ email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
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
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 400,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          textAlign: "center",
        }}
      >
        {/* Logo / Header */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 1,
          }}
        >
          Connectify
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
          Welcome back! Please sign in to continue.
        </Typography>

        {/* Input Fields */}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={input.email}
          onChange={handleChange}
          fullWidth
          size="medium"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "rgba(255,255,255,0.7)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": {
              color: "white",
            },
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

        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={input.password}
          onChange={handleChange}
          fullWidth
          size="medium"
          variant="outlined"
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
            "& .MuiInputBase-root": {
              color: "white",
            },
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
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            py: 1.3,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: "1rem",
            background:
              "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background:
                "linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)",
              transform: "translateY(-2px)",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign In"
          )}
        </Button>

        {/* Footer */}
        <Typography variant="body2" sx={{ color: "#fff" }}>
          Don’t have an account?{" "}
          <MuiLink
            component={Link}
            to="/signup"
            underline="hover"
            sx={{ color: "#90caf9", fontWeight: 600 }}
          >
            Sign Up
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
