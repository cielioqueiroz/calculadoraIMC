export const CATEGORIES = {
  magreza: {
    key: "magreza",
    text: "Magreza",
    badge: "bg-sky-500/10 text-sky-400",
    dot: "bg-sky-400",
    pointer: "bg-sky-500",
    position: "0%",
    advice: "Seu peso está abaixo do ideal. Considere uma avaliação nutricional.",
  },
  normal: {
    key: "normal",
    text: "Peso Normal",
    badge: "bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
    pointer: "bg-emerald-500",
    position: "25%",
    advice: "Parabéns! Seu peso está dentro da faixa saudável. Mantenha os hábitos.",
  },
  sobrepeso: {
    key: "sobrepeso",
    text: "Sobrepeso",
    badge: "bg-amber-500/10 text-amber-400",
    dot: "bg-amber-400",
    pointer: "bg-amber-500",
    position: "50%",
    advice: "Atenção: você está acima do peso ideal. Pequenos ajustes fazem diferença.",
  },
  obesidade: {
    key: "obesidade",
    text: "Obesidade",
    badge: "bg-red-500/10 text-red-400",
    dot: "bg-red-400",
    pointer: "bg-red-500",
    position: "75%",
    advice: "Recomenda-se acompanhamento médico para cuidar da sua saúde.",
  },
};

export const getCategory = (bmi) => {
  if (bmi < 18.5) return CATEGORIES.magreza;
  if (bmi < 25) return CATEGORIES.normal;
  if (bmi < 30) return CATEGORIES.sobrepeso;
  return CATEGORIES.obesidade;
};

const parseNumber = (value) => parseFloat(String(value).replace(",", "."));

export const calculateBmi = (heightCm, weightKg) => {
  const heightInMeters = parseNumber(heightCm) / 100;
  const weightInKg = parseNumber(weightKg);

  if (
    isNaN(heightInMeters) ||
    isNaN(weightInKg) ||
    heightInMeters <= 0 ||
    weightInKg <= 0
  ) {
    return null;
  }

  return weightInKg / (heightInMeters * heightInMeters);
};
