
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import AnimatedSquareButton from "../components/buttons/AnimatedSquareButton";

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    { title: "Ingredients", path: "/ingredients" },
    { title: "Build Meals", path: "/meals" },
    { title: "Statistics", path: "/statistics" },
    { title: "Upload Image", path: "/upload" },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#2196F3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={3} sx={{ width: "60%" }}>
        {features.map((feature, index) => (
          <Grid item xs={6} key={index}>
            <AnimatedSquareButton title={feature.title} onClick={() => navigate("/features" + feature.path)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
