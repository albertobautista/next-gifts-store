import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 200px)"
    >
      <CircularProgress thickness={2} size={80} />
    </Box>
  );
};
