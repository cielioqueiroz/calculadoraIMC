// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import Calculator from "./pages/Calculator";
import "react-toastify/dist/ReactToastify.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 40px)", // Ajuste para caber o footer
  backgroundColor: "#f5f5f5",
  paddingBottom: "40px", // Espaço reservado para o footer
};

const appBarStyle = {
  backgroundColor: "#1976d2",
};

const buttonStyle = {
  mt: 2,
  backgroundColor: "#1976d2",
  color: "white",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
};

const footerStyle = {
  backgroundColor: "#1976d2",
  color: "white",
  padding: "10px 0",
  textAlign: "center",
  position: "fixed",
  bottom: 0,
  width: "100%",
};

function App() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleNameSubmit = () => {
    if (name.trim() === "") {
      setError(true);
    } else {
      setOpen(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.trim() !== "") {
      setError(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    }
  };

  return (
    <Router>
      <AppBar position="static" sx={appBarStyle}>
        <Toolbar>
          <Typography variant="h6">Calculadora de IMC</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={containerStyle}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Modal open={open} onClose={() => setOpen(true)}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              Por favor, insira seu nome:
            </Typography>
            <TextField
              label="Nome"
              fullWidth
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
              sx={{ mt: 2 }}
              error={error}
              helperText={error ? "Campo obrigatório" : ""}
            />
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={handleNameSubmit}
            >
              Confirmar
            </Button>
          </Box>
        </Modal>
        {!open && (
          <>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
              Bem-vindo à Calculadora de IMC
            </Typography>
            <Calculator userName={name} />
          </>
        )}
      </Container>
      <Box sx={footerStyle}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Todos os direitos reservados.
        </Typography>
      </Box>
    </Router>
  );
}

export default App;
