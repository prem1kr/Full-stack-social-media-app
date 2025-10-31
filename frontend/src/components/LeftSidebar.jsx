import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Button,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  IconButton,
} from "@mui/material";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import CreatePost from "./CreatePost";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("https://social-media-msj4.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    }
  };

  const sidebarItems = [
    { icon: <Home size={20} />, text: "Home" },
    { icon: <MessageCircle size={20} />, text: "Messages" },
    { icon: <Heart size={20} />, text: "Notifications" },
    { icon: <PlusSquare size={20} />, text: "Create" },
    {
      icon: (
        <Avatar src={user?.profilePicture} alt="Profile" sx={{ width: 24, height: 24 }} />
      ),
      text: "Profile",
    },
    { icon: <LogOut size={20} />, text: "Logout" },
  ];

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      height="100vh"
      width="16%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"

    >
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={4} pl={1}>
          LOGO
        </Typography>

        <List sx={{ width: "100%" }}>
          {sidebarItems.map((item, index) => (
            <ListItem
              key={index}
              button
              onClick={() => sidebarHandler(item.text)}
              sx={{
                width: "100%",
                borderRadius: 2,
                mb: 1,
                px: 2,
                transition: "all 0.3s ease",
                justifyContent: "flex-start",
                "&:hover": {
                  bgcolor: "rgba(255, 192, 203, 0.2)",
                  "& .MuiListItemIcon-root, & svg": {
                    color: "#e91e63",
                  },
                  "& .MuiTypography-root": {
                    color: "#e91e63",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "#444",
                  transition: "all 0.3s ease",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  color: "#333",
                  transition: "color 0.3s ease",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
                sx={{ flexGrow: 1 }} 
              />

              {item.text === "Notifications" && likeNotification.length > 0 && (
                <>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    sx={{
                      position: "absolute",
                      right: 16,
                    }}
                  >
                    <Badge
                      badgeContent={likeNotification.length}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: 10,
                          height: 18,
                          minWidth: 18,
                        },
                      }}
                    />
                  </IconButton>

                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Box p={2} width={260}>
                      {likeNotification.length === 0 ? (
                        <Typography>No new notifications</Typography>
                      ) : (
                        likeNotification.map((notification) => (
                          <Box
                            key={notification.userId}
                            display="flex"
                            alignItems="center"
                            gap={1}
                            mb={1}
                          >
                            <Avatar
                              src={notification.userDetails?.profilePicture}
                              sx={{ width: 24, height: 24 }}
                            />
                            <Typography variant="body2">
                              <strong>{notification.userDetails?.username}</strong> liked your post
                            </Typography>
                          </Box>
                        ))
                      )}
                    </Box>
                  </Popover>
                </>
              )}
            </ListItem>
          ))}
        </List>


      </Box>

      <CreatePost open={open} setOpen={setOpen} />
    </Box>
  );
};

export default LeftSidebar;
