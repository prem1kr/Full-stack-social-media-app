import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Hide sidebar on mobile

  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      minHeight="100vh"
      sx={{
        bgcolor: "#fafafa",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          width: isMobile ? "100%" : "80%",
          px: { xs: 1, sm: 2, md: 3 },
          py: 2,
        }}
      >
        <Feed />
        <Outlet />
      </Box>

      {!isMobile && (
        <Box
          sx={{
            width: "20%",
            minWidth: 280,
            borderLeft: "1px solid rgba(0,0,0,0.1)",
            bgcolor: "#fff",
            height: "100vh",
            position: "sticky",
            top: 0,
            overflowY: "auto",
            p: 2,
          }}
        >
          <RightSidebar />
        </Box>
      )}
    </Box>
  );
};

export default Home;
