export const cyberStyles = `
  @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px var(--glow); } 50% { box-shadow: 0 0 40px var(--glow); } }
  @keyframes borderFlow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
  @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes textGlow { 0%, 100% { text-shadow: 0 0 10px currentColor; } 50% { text-shadow: 0 0 30px currentColor; } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes slideUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
  @keyframes slideIn { 0% { opacity: 0; transform: scale(0.9) translateY(-20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes blink { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0.5; } }
  @keyframes scanLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
  .wrapper-card { position: relative; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); animation: slideUp 0.5s ease-out backwards; }
  .wrapper-card:hover { transform: translateY(-8px) scale(1.02); z-index: 10; }
  .wrapper-card::before { content: ''; position: absolute; inset: -2px; border-radius: 18px; background: linear-gradient(45deg, var(--card-color), transparent, var(--card-color)); background-size: 200% 200%; animation: borderFlow 3s linear infinite; z-index: -1; opacity: 0; transition: opacity 0.3s; }
  .wrapper-card:hover::before { opacity: 1; }
  .cyber-btn { position: relative; overflow: hidden; transition: all 0.3s; }
  .cyber-btn:hover { transform: scale(1.05); filter: brightness(1.2); }
  .cyber-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float { animation: floatUp 3s ease-in-out infinite; }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  .modal-overlay { animation: fadeIn 0.2s ease-out; }
  .modal-content { animation: slideIn 0.3s ease-out; }
  .scan-line { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--scan-color), transparent); animation: scanLine 2s linear infinite; pointer-events: none; z-index: 10; }
  .live-preview { background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,20,40,0.8) 100%); }
`;
