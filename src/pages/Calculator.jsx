import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const containerStyle = {
  width: "100%",
  maxWidth: 600,
  textAlign: "center",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  marginBottom: "20px", 
};

const textFieldStyle = {
  marginBottom: 2,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000000",
    },
    "&:hover fieldset": {
      borderColor: "#1565c0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1565c0",
    },
  },
};

const buttonStyle = {
  mt: 2,
  backgroundColor: "#1976d2",
  color: "white",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
};

function Calculator({ userName }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const calculateBmi = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (
      !isNaN(heightInMeters) &&
      !isNaN(weightInKg) &&
      heightInMeters > 0 &&
      weightInKg > 0
    ) {
      const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(
        2
      );
      const { category, color, emoticon } = getBmiCategory(bmiValue);

      toast(
        <Box>
          <Typography variant="h6">
            {userName}, seu IMC é: {bmiValue}
          </Typography>
          <Typography variant="h6">
            {emoticon} Você está {category}
          </Typography>
        </Box>,
        {
          style: { borderLeft: `5px solid ${color}`, backgroundColor: "white" },
        }
      );
    } else {
      toast.error("Dados inválidos", {
        style: { backgroundColor: "white", color: "red" },
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      calculateBmi();
    }
  };

  const handleReset = () => {
    setHeight("");
    setWeight("");
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5)
      return { category: "com magreza", color: "lightblue", emoticon: "🟦 😢" };
    if (bmi < 24.9)
      return {
        category: "com peso normal",
        color: "lightgreen",
        emoticon: "✅ 😊",
      };
    if (bmi < 29.9)
      return { category: "com sobrepeso", color: "yellow", emoticon: "⚠️ 🤔" };
    if (bmi < 39.9)
      return { category: "com obesidade", color: "orange", emoticon: "🟧 😟" };
    return { category: "com obesidade grave", color: "red", emoticon: "🛑 😱" };
  };

  return (
    <Box sx={containerStyle}>
      <TextField
        label="Altura (cm)"
        variant="outlined"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        sx={textFieldStyle}
      />
      <TextField
        label="Peso (kg)"
        variant="outlined"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        sx={textFieldStyle}
      />
      <Button variant="contained" sx={buttonStyle} onClick={calculateBmi}>
        Calcular IMC
      </Button>
      <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={handleReset}>
        Refazer Cálculo
      </Button>
    </Box>
  );
}

Calculator.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default Calculator;
