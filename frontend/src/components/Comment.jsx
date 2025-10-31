import React from "react";
import { Avatar, Box, Typography, Stack } from "@mui/material";

const Comment = ({ comment }) => {
  return (
    <Box my={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={comment?.author?.profilePicture}
          alt={comment?.author?.username}
          sx={{ width: 40, height: 40 }}
        >
          {comment?.author?.username?.[0]?.toUpperCase() || "C"}
        </Avatar>

        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {comment?.author?.username}
          <Typography
            component="span"
            variant="body2"
            sx={{ fontWeight: "normal", pl: 1 }}
          >
            {comment?.text}
          </Typography>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Comment;
