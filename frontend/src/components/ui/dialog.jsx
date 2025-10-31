import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * MUI replacement for Radix + Tailwind Dialog component
 */
export function AppDialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  maxWidth = "sm",
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          boxShadow: 8,
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, pt: 2 }}>
        <DialogTitle sx={{ m: 0, p: 0, fontWeight: 600 }}>{title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
            "&:hover": { color: (theme) => theme.palette.text.primary },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Description */}
      {description && (
        <Typography
          variant="body2"
          sx={{ px: 3, color: "text.secondary", mt: -1 }}
        >
          {description}
        </Typography>
      )}

      {/* Main Content */}
      <DialogContent sx={{ px: 3, py: 2 }}>{children}</DialogContent>

      {/* Footer / Actions */}
      {actions && (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}
