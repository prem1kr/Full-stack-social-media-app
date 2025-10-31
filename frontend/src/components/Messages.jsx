import React from "react";
import {
  Box,
  Avatar,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  return (
    <Box
      flex={1}
      p={3}
      sx={{
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* User Info Section */}
      <Box display="flex" justifyContent="center" mb={3}>
        <Stack alignItems="center" spacing={1}>
          <Avatar
            src={selectedUser?.profilePicture}
            alt={selectedUser?.username}
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="subtitle1" fontWeight="medium">
            {selectedUser?.username}
          </Typography>
          <Button
            component={Link}
            to={`/profile/${selectedUser?._id}`}
            variant="outlined"
            size="small"
          >
            View Profile
          </Button>
        </Stack>
      </Box>

      {/* Messages Section */}
      <Stack spacing={1.5}>
        {messages &&
          messages.map((msg) => {
            const isOwnMessage = msg.senderId === user?._id;
            return (
              <Box
                key={msg._id}
                display="flex"
                justifyContent={isOwnMessage ? "flex-end" : "flex-start"}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    maxWidth: "60%",
                    wordBreak: "break-word",
                    bgcolor: isOwnMessage ? "primary.main" : "grey.200",
                    color: isOwnMessage ? "white" : "text.primary",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">{msg.message}</Typography>
                </Paper>
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
};

export default Messages;
