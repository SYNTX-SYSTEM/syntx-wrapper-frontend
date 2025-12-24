// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   ✨ SYNTX ALCHEMY - ANIMATIONS                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

export const KEYFRAMES = `
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes modalSlideIn { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
@keyframes iconPulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 20px currentColor; } 50% { transform: scale(1.05); box-shadow: 0 0 40px currentColor; } }
@keyframes iconFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes iconBounce { 0% { transform: scale(0) rotate(-180deg); } 50% { transform: scale(1.2) rotate(10deg); } 100% { transform: scale(1) rotate(0); } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 10% { transform: translateX(-8px); } 20% { transform: translateX(8px); } 30% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 50% { transform: translateX(-4px); } 60% { transform: translateX(4px); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes particleFly { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); } }
@keyframes rotateBorder { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;
