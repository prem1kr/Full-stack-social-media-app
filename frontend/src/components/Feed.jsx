import React from "react";
import { Box } from "@mui/material";
import Posts from "./Posts";

const Feed = () => {
  return (
    <Box
      sx={{
        flex: 1,
        my: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pl: { xs: 0, md: "0%" }, 
        
      }}
    >
      <Posts />
    </Box>
  );
};

export default Feed;
