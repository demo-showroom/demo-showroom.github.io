import { StrictMode, Component, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

declare global {
  interface Window {
    __SN_MOUNTED?: boolean;
  }
}

class ErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null as string | null };
  static getDerivedStateFromError(err: unknown) {
    return { error: err instanceof Error ? err.message : "Error desconocido" };
  }
  componentDidCatch() {
    window.__SN_MOUNTED = true;
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ background: "#0B0B0C", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
          <div style={{ background: "#141416", border: "1px solid rgba(255,210,31,.3)", borderRadius: 20, padding: 28, maxWidth: 380, textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#FFD21F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#000", margin: "0 auto 14px" }}>☀</div>
            <h2 style={{ color: "#FFD21F", fontSize: 17, margin: "0 0 8px" }}>Algo salió mal</h2>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 13, margin: "0 0 14px" }}>Recargá la página. Si persiste, escribinos por WhatsApp.</p>
            <a href="https://wa.me/595981126769?text=Hola,%20la%20p%C3%A1gina%20del%20showroom%20no%20carga" style={{ display: "inline-block", background: "#FFD21F", color: "#000", borderRadius: 12, padding: "12px 24px", fontWeight: 800, fontSize: 14, textDecoration: "none" }}>WhatsApp +595 981 126 769</a>
            <div style={{ marginTop: 12 }}>
              <button onClick={() => location.reload()} style={{ background: "rgba(255,255,255,.1)", color: "#fff", border: 0, borderRadius: 12, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Reintentar</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

try {
  const el = document.getElementById("root");
  if (!el) throw new Error("No se encontró #root");
  createRoot(el).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  window.__SN_MOUNTED = true;
} catch (e) {
  console.error("Error montando showroom:", e);
}
