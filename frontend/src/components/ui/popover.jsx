import * as React from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";

const CustomPopover = ({ anchorEl, open, onClose, children, sx, ...props }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{
        sx: {
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: 3,
          bgcolor: "background.paper",
          p: 2,
          width: 300, // ~ w-72
          ...sx,
        },
      }}
      {...props}
    >
      <Box>{children}</Box>
    </Popover>
  );
};

export { CustomPopover };
