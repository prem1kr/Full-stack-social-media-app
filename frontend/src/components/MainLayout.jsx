import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import LeftSidebar from "./LeftSidebar";

const drawerWidth = 260;

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Sidebar content
  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(180deg, #f9f9f9 0%, #e6e6e6 100%)",
        boxShadow: "inset 0 0 15px rgba(0,0,0,0.05)",
        p: 0,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header inside sidebar for mobile */}
      {isMobile && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          borderBottom="1px solid rgba(0,0,0,0.1)"
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#333" }}>
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <LeftSidebar />
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#fafafa",
      }}
    >
      {/* AppBar for mobile */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: "100%",
            background: "linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%)",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: 700, letterSpacing: 1 }}
            >
              Connectify
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar (Desktop) */}
      {!isMobile && (
        <Box
          component="aside"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            height: "100vh",
            borderRight: "1px solid rgba(0,0,0,0.1)",
            background: "linear-gradient(180deg, #ffffff 0%, #f4f4f4 100%)",
            boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
            overflowY: "auto",
          }}
        >
          {drawer}
        </Box>
      )}

      {/* Sidebar (Mobile) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            border: "none",
            borderRadius: "0px 12px 12px 0px",
            boxShadow: "4px 0 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
          overflowY: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          transition: "all 0.3s ease",
        
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
