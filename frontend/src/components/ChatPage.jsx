import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { setSelectedUser } from "@/redux/authSlice";
import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import Messages from "./Messages";

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  const showSidebar = !isMobile || !selectedUser;
  const showChat = !isMobile || selectedUser;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        bgcolor: "#fafafa",
        ml: { md: "-2%" },
        overflow: "hidden",
        mt:-3
      }}
    >
      {/* ===== Left Sidebar ===== */}
      {showSidebar && (
        <Paper
          elevation={2}
          sx={{
            width: { xs: "100%", md: "20%" },
            p: 2,
            borderRight: { md: 1 },
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            {user?.username}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <List sx={{ overflowY: "auto", flex: 1 }}>
            {suggestedUsers.map((suggestedUser) => {
              const isOnline = onlineUsers.includes(suggestedUser?._id);
              return (
                <ListItem
                  key={suggestedUser._id}
                  button
                  onClick={() => dispatch(setSelectedUser(suggestedUser))}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={suggestedUser?.profilePicture}>
                      {suggestedUser?.username?.[0]?.toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={suggestedUser?.username}
                    secondary={
                      <Typography
                        variant="caption"
                        sx={{
                          color: isOnline ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {isOnline ? "online" : "offline"}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      )}

      {/* ===== Main Chat Area ===== */}
      {showChat && (
        <Stack
          direction="column"
          sx={{
            flex: 1,
            borderLeft: { md: 1 },
            borderColor: "divider",
            height: "100vh",
            bgcolor: "#fff",
          }}
        >
          {selectedUser ? (
            <>
              {/* ===== Chat Header ===== */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  p: 2,
                  borderBottom: 1,
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  {isMobile && (
                    <IconButton
                      onClick={() => dispatch(setSelectedUser(null))}
                      size="small"
                    >
                      <ArrowLeft size={22} />
                    </IconButton>
                  )}
                  <Avatar src={selectedUser?.profilePicture}>
                    {selectedUser?.username?.[0]?.toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography fontWeight="500">
                      {selectedUser?.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {onlineUsers.includes(selectedUser?._id)
                        ? "Online"
                        : "Offline"}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              {/* ===== Messages Area ===== */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  bgcolor: "#f0f2f5",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Messages selectedUser={selectedUser} />
              </Box>

              {/* ===== Message Input ===== */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  p: 2,
                  borderTop: 1,
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              >
                <TextField
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                  fullWidth
                  placeholder="Type a message..."
                  variant="outlined"
                  size="small"
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 3,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { border: "none" },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => sendMessageHandler(selectedUser?._id)}
                  disabled={!textMessage.trim()}
                  sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    px: 3,
                    fontWeight: 500,
                  }}
                >
                  Send
                </Button>
              </Stack>
            </>
          ) : (
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              color="text.secondary"
            >
              <MessageCircle size={90} style={{ opacity: 0.4 }} />
              <Typography mt={2}>Select a chat to start messaging</Typography>
            </Box>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default ChatPage;
