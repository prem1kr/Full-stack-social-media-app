import React from "react";
import Button from "@mui/material/Button";

/**
 * Material UI replacement for Tailwind + CVA Button
 * Variants: default | destructive | outline | secondary | ghost | link
 * Sizes: default | sm | lg | icon
 */
export const AppButton = React.forwardRef(
  ({ variant = "default", size = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: {
        backgroundColor: "#0f172a", // slate-900
        color: "#f8fafc", // slate-50
        "&:hover": { backgroundColor: "rgba(15, 23, 42, 0.9)" },
      },
      destructive: {
        backgroundColor: "#ef4444", // red-500
        color: "#f8fafc",
        "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.9)" },
      },
      outline: {
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0", // slate-200
        color: "#0f172a",
        "&:hover": { backgroundColor: "#f1f5f9" }, // slate-100
      },
      secondary: {
        backgroundColor: "#f1f5f9", // slate-100
        color: "#0f172a",
        "&:hover": { backgroundColor: "rgba(241, 245, 249, 0.8)" },
      },
      ghost: {
        backgroundColor: "transparent",
        color: "#0f172a",
        "&:hover": { backgroundColor: "#f1f5f9" },
      },
      link: {
        backgroundColor: "transparent",
        color: "#0f172a",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        "&:hover": { textDecoration: "underline" },
      },
    };

    const sizeStyles = {
      default: { height: 40, px: 2, py: 1, fontSize: "0.875rem" },
      sm: { height: 36, px: 1.5, fontSize: "0.75rem", borderRadius: "6px" },
      lg: { height: 44, px: 3, fontSize: "1rem", borderRadius: "6px" },
      icon: { height: 40, width: 40, borderRadius: "6px", minWidth: 0, p: 0 },
    };

    return (
      <Button
        ref={ref}
        disableRipple
        sx={{
          fontWeight: 500,
          borderRadius: "6px",
          textTransform: "none",
          transition: "background-color 0.2s",
          ...variantStyles[variant],
          ...sizeStyles[size],
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
