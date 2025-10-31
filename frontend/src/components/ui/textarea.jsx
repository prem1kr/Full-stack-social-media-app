import * as React from "react";
import { TextField } from "@mui/material";

const Textarea = React.forwardRef(({ label, rows = 4, variant = "outlined", ...props }, ref) => {
  return (
    <TextField
      label={label}
      multiline
      rows={rows}
      variant={variant}
      fullWidth
      inputRef={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
