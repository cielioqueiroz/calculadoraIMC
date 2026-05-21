function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-800/60 bg-surface/60 premium-blur">
      <div className="max-w-md mx-auto flex items-center gap-3 px-6 py-4">
        <img src="/icons8-balanca-96.png" alt="" className="w-7 h-7" />
        <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          Calculadora de IMC
        </span>
      </div>
    </header>
  );
}

export default Header;
