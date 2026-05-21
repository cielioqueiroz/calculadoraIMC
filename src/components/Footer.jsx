function Footer() {
  return (
    <footer className="w-full border-t border-gray-800/60 bg-surface/60 premium-blur">
      <div className="max-w-md mx-auto px-6 py-5 text-center">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Calculadora de IMC. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
