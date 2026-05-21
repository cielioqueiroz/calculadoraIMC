import { useState } from "react";
import { calculateBmi, getCategory } from "../utils/bmi";
import Field from "./Field";

// Dicionário que mapeia sexo + faixa de IMC para a ilustração do personagem.
// Caminhos locais genéricos — basta colocar os arquivos em /public/assets.
const CHARACTER_IMAGES = {
  masculino: {
    magreza: "/assets/masculino-magreza.svg",
    normal: "/assets/masculino-normal.svg",
    sobrepeso: "/assets/masculino-sobrepeso.svg",
    obesidade: "/assets/masculino-obesidade.svg",
  },
  feminino: {
    magreza: "/assets/feminino-magreza.svg",
    normal: "/assets/feminino-normal.svg",
    sobrepeso: "/assets/feminino-sobrepeso.svg",
    obesidade: "/assets/feminino-obesidade.svg",
  },
};

const GENDER_OPTIONS = [
  { value: "masculino", label: "Homem" },
  { value: "feminino", label: "Mulher" },
];

function Calculator() {
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [result, setResult] = useState(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sexo) {
      setError("Selecione o sexo para continuar.");
      setVisible(false);
      setResult(null);
      return;
    }

    const bmi = calculateBmi(altura, peso);

    if (bmi === null) {
      setError("Informe a altura e o peso com valores válidos para continuar.");
      setVisible(false);
      setResult(null);
      return;
    }

    setError("");
    const category = getCategory(bmi);
    setResult({
      value: bmi.toFixed(1),
      nome: nome.trim(),
      image: CHARACTER_IMAGES[sexo][category.key],
      ...category,
    });
    requestAnimationFrame(() => setVisible(true));
  };

  const handleClear = () => {
    setVisible(false);
    setError("");
    setNome("");
    setSexo("");
    setAltura("");
    setPeso("");
    setTimeout(() => setResult(null), 500);
  };

  const errorProps = {
    "aria-invalid": !!error,
    "aria-describedby": error ? "form-error" : undefined,
  };

  return (
    <div className="w-full max-w-md bg-surface/80 premium-blur border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-indigo-500/10">
      <div className="text-center mb-8 relative">
        <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
          Descubra seu IMC
        </h1>
        <p className="text-slate-400 text-sm mt-1.5">
          Descubra sua faixa de peso ideal em segundos.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5 relative">
        <Field
          label="Seu Nome (Opcional)"
          id="nome"
          type="text"
          placeholder="Digite seu nome aqui"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <div>
          <span className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Sexo
          </span>
          <div
            role="radiogroup"
            aria-label="Sexo"
            className="grid grid-cols-2 gap-4"
          >
            {GENDER_OPTIONS.map((option) => {
              const selected = sexo === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    setSexo(option.value);
                    setError("");
                  }}
                  className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                    selected
                      ? "bg-indigo-500/10 border-indigo-500 text-white ring-4 ring-indigo-500/10"
                      : "bg-base/90 border-gray-800 text-slate-400 hover:border-gray-600 hover:text-slate-200"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 transition-colors duration-300 ${
                      selected ? "text-indigo-400" : "text-slate-500"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {option.value === "masculino" ? (
                      <>
                        <circle cx="10" cy="14" r="5" />
                        <line x1="13.5" y1="10.5" x2="20" y2="4" />
                        <polyline points="15 4 20 4 20 9" />
                      </>
                    ) : (
                      <>
                        <circle cx="12" cy="9" r="5" />
                        <line x1="12" y1="14" x2="12" y2="22" />
                        <line x1="8.5" y1="19" x2="15.5" y2="19" />
                      </>
                    )}
                  </svg>
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Altura (cm)"
            id="altura"
            type="number"
            min="1"
            placeholder="Ex: 175"
            value={altura}
            onChange={(e) => {
              setAltura(e.target.value);
              setError("");
            }}
            {...errorProps}
          />
          <Field
            label="Peso (kg)"
            id="peso"
            type="number"
            min="1"
            placeholder="Ex: 74"
            value={peso}
            onChange={(e) => {
              setPeso(e.target.value);
              setError("");
            }}
            {...errorProps}
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-[2] bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm py-4 px-4 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-300"
          >
            Calcular meu IMC
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-[1] bg-gray-800/40 hover:bg-gray-800/80 text-slate-300 hover:text-white font-medium text-sm py-4 px-4 rounded-xl border border-gray-800 transition-all duration-300"
          >
            Refazer
          </button>
        </div>
      </form>

      {error && (
        <div
          id="form-error"
          role="alert"
          aria-live="assertive"
          className="mt-5 flex items-center gap-2.5 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 result-scale-transition"
        >
          <svg
            className="w-4 h-4 shrink-0 text-rose-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div
          className={`mt-8 pt-6 border-t border-gray-800/60 result-scale-transition ${
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-7">
            <div className="shrink-0">
              <img
                key={result.image}
                src={result.image}
                alt={`Ilustração ${result.text}`}
                className="character-enter w-32 h-48 object-contain drop-shadow-lg"
              />
            </div>
            <div className="flex-1 w-full text-center sm:text-left space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-medium tracking-wide">
                  {result.nome ? `Resultado de ${result.nome}` : "Seu Resultado"}
                </p>
                <h3 className="text-5xl font-black text-white mt-1 tracking-tight">
                  {result.value}
                </h3>
              </div>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${result.badge}`}
              >
                <span className={`w-2 h-2 rounded-full ${result.dot}`}></span>
                <span>{result.text}</span>
              </div>
              <div className="space-y-1.5 pt-2 text-left">
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider px-1">
                  <span>Magreza</span>
                  <span>Normal</span>
                  <span>Sobrepeso</span>
                  <span>Obesidade</span>
                </div>
                <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden relative border border-gray-800">
                  <div
                    className={`absolute top-0 bottom-0 w-1/4 rounded-full transition-all duration-500 ease-out ${result.pointer}`}
                    style={{ left: result.position }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-slate-400 bg-gray-900/40 border border-gray-800/40 rounded-xl p-3 mt-2 italic">
                {result.advice}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculator;
