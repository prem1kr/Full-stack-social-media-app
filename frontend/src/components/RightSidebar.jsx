import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <Box
      sx={{
        width: 400,
        pr: 6,
        position: "sticky",
        display: { xs: "none", md: "block" }, 
      }}
    >
      {/* User Info */}
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <Link to={`/profile/${user?._id}`} style={{ textDecoration: "none" }}>
          <Avatar
            src={user?.profilePicture}
            alt={user?.username}
            sx={{ width: 48, height: 48 }}
          />
        </Link>

        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component={MuiLink}
            to={`/profile/${user?._id}`}
            color="inherit"
            underline="hover"
            sx={{ textDecoration: "none" }}
            as={Link}
          >
            {user?.username}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {user?.bio || "Bio here..."}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <SuggestedUsers />
    </Box>
  );
};

export default RightSidebar;
