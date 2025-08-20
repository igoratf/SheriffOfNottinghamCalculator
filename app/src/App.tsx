import "./App.css";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <main>
      <Navbar />
      <HomePage />
      <Analytics />
    </main>
  );
}

export default App;
