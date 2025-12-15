"use client";

import { useState } from "react";
import WrapperControl from "@/components/wrappers/WrapperControl";

export default function Page() {
  const [activeWrapper, setActiveWrapper] = useState("CYBERDARK");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #030b15, #0a1628)",
        color: "white",
        padding: 32,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* HEADER */}
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0 }}>SYNTX</h1>
        <p style={{ opacity: 0.6 }}>Field Resonance System</p>
      </header>

      {/* WRAPPER CONTROL */}
      <section style={{ marginBottom: 32 }}>
        <WrapperControl
          active={activeWrapper}
          onChange={setActiveWrapper}
        />
      </section>

      {/* PLACEHOLDER CONTENT */}
      <section>
        <p>Active Wrapper:</p>
        <pre>{activeWrapper}</pre>
      </section>
    </main>
  );
}
