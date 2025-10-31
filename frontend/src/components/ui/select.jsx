import * as React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Check, ExpandMore } from "lucide-react";

export const CustomSelect = ({
  label,
  value,
  onChange,
  options = [],
  helperText,
  disabled = false,
  size = "small",
  variant = "outlined",
  sx,
  ...props
}) => {
  return (
    <FormControl
      fullWidth
      size={size}
      disabled={disabled}
      sx={{ minWidth: 160, ...sx }}
    >
      {label && <InputLabel>{label}</InputLabel>}

      <Select
        value={value}
        onChange={onChange}
        label={label}
        variant={variant}
        IconComponent={ExpandMore}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 3,
              bgcolor: "background.paper",
              "& .MuiMenuItem-root": {
                display: "flex",
                alignItems: "center",
                gap: 1,
              },
            },
          },
        }}
        {...props}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {value === opt.value && (
              <Check size={16} style={{ marginRight: 6 }} />
            )}
            {opt.label}
          </MenuItem>
        ))}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
