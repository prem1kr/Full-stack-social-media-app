import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function UserAvatar({ src, alt, name, size = 40 }) {
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {src ? (
        <Avatar
          src={src}
          alt={alt || name}
          sx={{
            width: size,
            height: size,
            bgcolor: "primary.main",
          }}
        />
      ) : (
        <Avatar
          sx={{
            width: size,
            height: size,
            bgcolor: "grey.300",
            color: "text.primary",
          }}
        >
          <Typography variant="subtitle1">{initials}</Typography>
        </Avatar>
      )}
    </Box>
  );
}
