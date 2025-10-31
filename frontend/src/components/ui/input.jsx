import * as React from "react";
import TextField from "@mui/material/TextField";

const Input = React.forwardRef(({ type = "text", label, variant = "outlined", ...props }, ref) => {
  return (
    <TextField
      type={type}
      label={label}
      variant={variant}
      fullWidth
      inputRef={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
