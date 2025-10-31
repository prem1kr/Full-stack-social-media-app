import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert, useTheme } from "@mui/material";

// Context to manage global toasts
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  const theme = useTheme();

  const showToast = useCallback((message, severity = "info") => {
    setToast({ open: true, message, severity });
  }, []);

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          variant="filled"
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[900]
                : theme.palette.background.paper,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[100]
                : theme.palette.text.primary,
            boxShadow: 3,
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[200]
            }`,
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

// Custom hook to trigger toast
export const useToast = () => {
  return useContext(ToastContext);
};
