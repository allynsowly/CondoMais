import { useState } from "react";
import MoradorDashboard from "./pages/MoradorDashboard";
import SindicoDashboard from "./pages/SindicoDashboard";
import "./App.css";

function App() {

  const [tipoUsuario, setTipoUsuario] = useState("morador");

  return (
    <>
      <button
        onClick={() =>
          setTipoUsuario(
            tipoUsuario === "morador" ? "sindico" : "morador"
          )
        }
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 9999,
          padding: "10px 15px",
          cursor: "pointer"
        }}
      >
        Trocar para {tipoUsuario === "morador" ? "Síndico" : "Morador"}
      </button>

      {tipoUsuario === "morador" ? (
        <MoradorDashboard />
      ) : (
        <SindicoDashboard />
      )}
    </>
  );
}

export default App;