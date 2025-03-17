import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { colors } from "../context/globals"; // Import colors

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: colors.primary, // Use color from globals
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" sx={{ color: colors.text, fontWeight: "bold" }}>
        FoodTrackAi
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 4,
          backgroundColor: colors.text, // White button
          color: colors.primary, // Blue text
          fontSize: "1.2rem",
          padding: "10px 40px",
          borderRadius: "20px",
          "&:hover": { backgroundColor: colors.background }, // Lighter hover effect
        }}
        onClick={() => navigate("/dashboard")}
      >
        Start
      </Button>
    </Box>
  );
};

export default Home;
