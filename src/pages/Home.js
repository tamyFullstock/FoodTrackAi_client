import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#2196F3", // Nice blue background
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" sx={{ color: "white", fontWeight: "bold" }}>
        FoodTrackAi
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 4,
          backgroundColor: "white",
          color: "#2196F3",
          fontSize: "1.2rem",
          padding: "10px 40px",
          borderRadius: "20px",
          "&:hover": { backgroundColor: "#f5f5f5" },
        }}
        onClick={() => navigate("/dashboard")}
      >
        Start
      </Button>
    </Box>
  );
};

export default Home;
