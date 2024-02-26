import { useState } from "react";
import "../App.css";

function Calculator() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularImc = () => {
    const alt = altura / 100;
    const imc = peso / (alt * alt);
    const storagedName = localStorage.getItem("nome");

    if (imc < 18.6) {
      setResultado(
        `${storagedName}, você esta abaixo do peso! Seu IMC é: ${imc.toFixed(
          2
        )}`
      );
    } else if (imc >= 18.6 && imc < 24.9) {
      setResultado(
        `${storagedName}, você esta no peso ideal! Seu IMC é: ${imc.toFixed(2)}`
      );
    } else if (imc >= 24.9 && imc < 34.9) {
      setResultado(
        `${storagedName}, você esta levemente acima do peso! Seu IMC é: ${imc.toFixed(
          2
        )}`
      );
    } else if (imc > 34.9) {
      setResultado(
        `${storagedName}, cuidado você esta com OBESIDADE! Seu IMC é: ${imc.toFixed(
          2
        )}`
      );
    }
  };

  return (
    <div>
      <h1>Calculadora de IMC</h1>
      <p>Adicione seus dados abaixo</p>
      <div>
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Digite seu peso Ex: (kg)70"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Digite aqui sua altura Ex: (cm)170"
        />
        <button onClick={calcularImc}>Calcular</button>
      </div>
      <h2>{resultado}</h2>
    </div>
  );
}

export default Calculator;
