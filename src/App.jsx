import Header from "./components/Header";
import Calculator from "./components/Calculator";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 my-8">
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
