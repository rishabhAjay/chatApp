import React from "react";
import { Box, Typography } from "@mui/material";
const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Typography variant="h4" sx={{ color: "text.primary" }}>
        404 NOT FOUND
      </Typography>
    </Box>
  );
};

export default NotFound;
