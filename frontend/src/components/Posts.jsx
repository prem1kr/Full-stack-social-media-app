import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import { Box, Typography, Stack } from "@mui/material";

const Posts = () => {
  const { posts } = useSelector((store) => store.post);

  if (!posts || posts.length === 0) {
    return (
      <Box textAlign="center" mt={4} px={2}>
        <Typography variant="body1" color="text.secondary">
          No posts available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: {
          xs: "100%",
          sm: "100%",
          md: "80%",
        },
        px: { xs: 1, sm: 2, md: 3 },
        pt: { xs: 5, sm: 3, md: 0 }, 
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Stack>
    </Box>
  );
};

export default Posts;
