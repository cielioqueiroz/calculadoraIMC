import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nome === "") {
      alert("Digite Seu Nome!");
      return;
    }
    localStorage.setItem("nome", nome);
    navigate("/calculator");
  };

  return (
    <div>
      <h1>Bem Vindo a calculadora de IMC</h1>
      <h2>Insera seu nome para começarmos.</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
