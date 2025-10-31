import React from "react";
import { Chip } from "@mui/material";

/**
 * Material UI replacement for Tailwind + CVA Badge
 * Variants: default | secondary | destructive | outline
 */
export function Badge({ label, variant = "default", ...props }) {
  const variantStyles = {
    default: {
      backgroundColor: "#0f172a", // slate-900
      color: "#f8fafc", // slate-50
      "&:hover": { backgroundColor: "rgba(15, 23, 42, 0.8)" },
    },
    secondary: {
      backgroundColor: "#f1f5f9", // slate-100
      color: "#0f172a", // slate-900
      "&:hover": { backgroundColor: "rgba(241, 245, 249, 0.8)" },
    },
    destructive: {
      backgroundColor: "#ef4444", // red-500
      color: "#f8fafc",
      "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.8)" },
    },
    outline: {
      border: "1px solid #0f172a",
      backgroundColor: "transparent",
      color: "#0f172a",
    },
  };

  return (
    <Chip
      label={label}
      sx={{
        fontSize: "0.75rem",
        fontWeight: 600,
        px: 1.5,
        py: 0.5,
        borderRadius: "9999px",
        transition: "background-color 0.2s",
        ...variantStyles[variant],
      }}
      {...props}
    />
  );
}
