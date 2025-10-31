import * as React from "react";
import Typography from "@mui/material/Typography";

const Label = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <Typography
      ref={ref}
      variant="body2"
      sx={{
        fontWeight: 500,
        lineHeight: 1.5,
        opacity: props.disabled ? 0.7 : 1,
        cursor: props.disabled ? "not-allowed" : "default",
      }}
      className={className}
      {...props}
    >
      {children}
    </Typography>
  );
});

Label.displayName = "Label";

export { Label };
