"use client";

import { useState } from "react";

export default function CreateWrapperModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    level: string;
    content: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("CUSTOM");
  const [content, setContent] = useState("");

  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={title}>➕ Create Wrapper</h3>

        <input
          placeholder="Wrapper name (e.g. SIGMA_V2)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={input}
        >
          <option>CUSTOM</option>
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>

        <textarea
          placeholder="Paste wrapper definition here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textarea}
        />

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={btnGhost}>
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit({ name, level, content });
              setName("");
              setContent("");
            }}
            style={btnPrimary}
          >
            Save Wrapper
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── styles ───────── */

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(6px)",
  zIndex: 999,
};

const modal = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 600,
  background: "linear-gradient(135deg,#0a1a2e,#050b14)",
  borderRadius: 16,
  padding: 24,
  border: "1px solid rgba(0,212,255,0.2)",
  boxShadow: "0 0 40px rgba(0,212,255,0.2)",
};

const title = {
  marginBottom: 16,
  fontFamily: "Orbitron, sans-serif",
  color: "#00d4ff",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  fontFamily: "monospace",
};

const textarea = {
  ...input,
  minHeight: 160,
  resize: "vertical" as const,
};

const btnPrimary = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  background: "linear-gradient(135deg,#00d4ff,#00a8cc)",
  color: "#021018",
  fontWeight: 700,
  cursor: "pointer",
};

const btnGhost = {
  ...btnPrimary,
  background: "transparent",
  color: "rgba(255,255,255,0.5)",
  border: "1px solid rgba(255,255,255,0.2)",
};
