import React from "react";
import { Button } from "@mui/material";

const AnimatedSquareButton = ({ title, onClick }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        height: "150px",
        fontSize: "1.2rem",
        backgroundColor: "white",
        color: "#2196F3",
        fontWeight: "bold",
        borderRadius: "15px",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "#f5f5f5",
          transform: "scale(1.05)",
        },
        "&:active": {
          transform: "scale(0.95)",
        },
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default AnimatedSquareButton;
