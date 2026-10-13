import React, { useEffect, useRef, useState } from 'react';

const SYMBOLS = [
  { icon: '🐯', name: 'Tigre', value: 10, weight: 1 },
  { icon: '🪙', name: 'Lingote', value: 6, weight: 2 },
  { icon: '🧧', name: 'Envelope da sorte', value: 4, weight: 3 },
  { icon: '💰', name: 'Saco de moedas', value: 3, weight: 3 },
  { icon: '🧨', name: 'Fogos', value: 2, weight: 4 },
  { icon: '🍊', name: 'Laranja', value: 1.5, weight: 5 },
];
const INITIAL_BALANCE = 100;
const fmt = n => Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const styles = `
:root{--graphite:#1a222d;--orange:#f47321;--gold:#ffd875;--gold2:#b86a17;--red:#a50e20;--deep:#31050d}
*{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;background:#0d1219;color:#fff;font-family:Inter,Arial,sans-serif}
button{font:inherit;cursor:pointer;touch-action:manipulation}button:disabled{opacity:.6;cursor:wait}
.vx-app{min-height:100dvh;background:radial-gradient(ellipse at top,#242d39,#0d1219 56%);padding-bottom:78px}
.vx-header{height:64px;background:var(--graphite);display:flex;align-items:center;justify-content:space-between;padding:0 14px;gap:10px;border-bottom:1px solid #34404e;box-shadow:0 4px 18px #0005}
.vx-brand{display:flex;align-items:center;gap:8px;font-weight:1000;font-size:20px;letter-spacing:-.8px;white-space:nowrap}
.vx-mark{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:var(--orange);color:white;font-weight:1000}
.vx-brand b{color:var(--orange)}.vx-wallet{font-size:10px;color:#b7c0cb;text-align:right;white-space:nowrap}.vx-wallet strong{display:block;font-size:14px;color:white;margin-top:3px}
.vx-add{border:0;background:var(--orange);color:white;border-radius:7px;padding:10px 11px;font-weight:900;font-size:12px}
.vx-header-right{display:flex;align-items:center;gap:10px}
.vx-shell{max-width:1080px;margin:auto;padding:12px 12px 22px}
.vx-notice{text-align:center;font-size:10px;line-height:1.4;color:#ffdda1;background:#2c201a;border:1px solid #6c462a;border-radius:7px;padding:7px;margin-bottom:12px}
.vx-layout{display:flex;justify-content:center}
.vx-device{position:relative;width:min(100%,420px);aspect-ratio:9/16;min-height:600px;max-height:calc(100dvh - 166px);overflow:hidden;border-radius:18px;border:1px solid #d6a443;background:radial-gradient(ellipse at 50% 36%,#f6531e 0%,#b30d1b 38%,#510711 72%,#1d040a 100%);box-shadow:0 22px 60px #0009,inset 0 0 0 3px #6e3217}
.vx-temple{position:absolute;inset:0;pointer-events:none;opacity:.34;background:linear-gradient(180deg,#23050c 0%,transparent 28%,#f04a1d 50%,#2c0309 100%)}
.vx-temple:before{content:"";position:absolute;top:9%;left:-12%;width:124%;height:25%;border-top:10px ridge #ffdc72;border-bottom:5px solid #c88723;border-radius:50%;filter:drop-shadow(0 0 9px #ffcb4d)}
.vx-temple:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 12%,#ffd25b22 12.4% 13.4%,transparent 13.8% 26%);mix-blend-mode:screen}
.vx-sound{position:absolute;z-index:10;top:12px;right:10px;border:1px solid #ffdc75;border-radius:20px;background:#440a10cc;color:#fff1c0;font-size:11px;padding:7px 10px}
.vx-game-title{position:absolute;top:3%;width:100%;text-align:center;z-index:2}
.vx-kicker{font-size:8px;letter-spacing:3px;font-weight:900;color:#ffe7a0}
.vx-title{font-size:clamp(27px,7vw,40px);font-weight:1000;line-height:1.05;margin-top:4px;letter-spacing:-1px;color:#fff0b2;-webkit-text-stroke:1px #9a4109;text-shadow:0 3px #a6350c,0 5px #4b1009,0 0 18px #ffca44}
.vx-tiger{position:absolute;z-index:4;top:12%;left:50%;transform:translateX(-50%);width:30%;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;border:4px ridge #ffdc75;background:radial-gradient(circle at 35% 25%,#fff5bb,#ffb92c 46%,#9b250b 78%);box-shadow:0 0 22px #ffcc3eaa,inset 0 0 16px #fff7a4}
.vx-tiger-face{font-size:clamp(56px,15vw,83px);filter:drop-shadow(0 5px 2px #57120c);animation:vx-float 2s ease-in-out infinite}
@keyframes vx-float{50%{transform:translateY(-5px) rotate(2deg)}}@keyframes vx-anticipate{to{transform:translateY(-6px) scale(1.08) rotate(-4deg)}}@keyframes vx-celebrate{to{transform:translateY(-10px) scale(1.16) rotate(8deg)}}
.vx-device.spinning .vx-tiger-face{animation:vx-anticipate .28s infinite alternate}.vx-device.winner .vx-tiger-face{animation:vx-celebrate .22s infinite alternate}
.vx-frame{position:absolute;top:29%;left:4%;width:92%;height:39%;padding:7px;border-radius:15px;border:5px ridge #ffda70;background:linear-gradient(135deg,#fff0a4,#b86a11 20%,#ffe68b 38%,#8e410b 60%,#ffd96b 85%,#9a4b0d);box-shadow:0 0 0 2px #5b1609,0 0 24px #ffca45aa,inset 0 0 12px #542007}
.vx-reels{height:100%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;padding:4px;border-radius:7px;background:#5a1011}
.vx-reel{display:grid;grid-template-rows:repeat(3,minmax(0,1fr));gap:3px;min-width:0;overflow:hidden;border-radius:4px;background:#681a16}
.vx-cell{display:grid;place-items:center;overflow:hidden;min-height:0;border:1px solid #ffdf83;border-radius:5px;background:linear-gradient(145deg,#fff1bc,#f4b64b 55%,#a94d13);box-shadow:inset 0 0 10px #fff7c2}
.vx-symbol{font-size:clamp(28px,8vw,45px);line-height:1;filter:drop-shadow(0 3px 1px #7b300a);user-select:none}
.vx-reel.rolling .vx-cell{filter:blur(2px);animation:vx-blur .07s linear infinite alternate}
@keyframes vx-blur{to{transform:translateY(5px);opacity:.72}}.vx-reel.stopped .vx-cell{animation:vx-bounce .32s cubic-bezier(.2,1.6,.4,1)}
@keyframes vx-bounce{0%{transform:translateY(-16px) scale(.94)}100%{transform:translateY(0) scale(1)}}
.vx-status{position:absolute;top:69%;width:100%;height:5%;padding:0 10px;text-align:center;font-size:clamp(10px,2.8vw,14px);font-weight:1000;letter-spacing:1px;color:#ffe8a1;text-shadow:0 2px 3px #4b0707}
.vx-controls{position:absolute;left:5%;width:90%;top:75%;display:flex;flex-direction:column;align-items:center;gap:9px}
.vx-bet-row{display:flex;align-items:center;justify-content:center;gap:14px;width:100%}
.vx-small{width:34px;height:31px;border-radius:50%;border:1px solid #ffdb7b;background:#5a1510;color:#fff4b0;font-size:20px;font-weight:bold}
.vx-bet{text-align:center;min-width:110px;font-size:10px;color:#ffe3a1}.vx-bet strong{display:block;font-size:17px;color:white;margin-top:2px}
.vx-spin{width:75%;height:53px;border-radius:30px;border:3px solid #fff0a1;color:#641508;font-size:18px;font-weight:1000;letter-spacing:1px;background:linear-gradient(180deg,#fff5a0,#ffcd36 40%,#ed7818 75%,#ba410b);box-shadow:0 5px 0 #74210c,0 0 22px #ffb82f88,inset 0 2px 3px white;text-shadow:0 1px #fff0a0;transition:transform .1s}
.vx-spin:active{transform:translateY(3px);box-shadow:0 2px 0 #74210c}
.vx-footnote{position:absolute;bottom:2%;width:100%;text-align:center;font-size:9px;color:#ffdaa0;letter-spacing:1px}
.vx-win-line{position:absolute;left:8%;width:84%;height:3px;z-index:6;background:#fff7a1;box-shadow:0 0 10px #fff,0 0 24px #ffb000;animation:vx-flash .3s infinite alternate;pointer-events:none}
@keyframes vx-flash{to{opacity:.25}}.vx-toast{position:absolute;z-index:8;left:5%;right:5%;top:48%;text-align:center;color:#fff6bf;font-weight:1000;font-size:clamp(21px,6vw,29px);text-shadow:0 3px #a3330b,0 0 18px #ffdf56;pointer-events:none;animation:vx-toast 1.2s ease-out forwards}
@keyframes vx-toast{0%{opacity:0;transform:scale(.5)}20%{opacity:1;transform:scale(1.12)}75%{opacity:1}100%{opacity:0;transform:scale(1.1)}}
.vx-spark{position:absolute;z-index:7;pointer-events:none;font-size:21px;animation:vx-burst 1.15s ease-out forwards}
@keyframes vx-burst{0%{transform:translate(0,0) scale(.4);opacity:0}15%{opacity:1}100%{transform:translate(var(--x),var(--y)) scale(1.25) rotate(180deg);opacity:0}}
.vx-splash{position:absolute;inset:0;z-index:20;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;background:radial-gradient(circle,#bd281b,#490711 70%,#170309);transition:opacity .45s}
.vx-splash.hidden{opacity:0;pointer-events:none}.vx-splash-tiger{font-size:86px;animation:vx-float 1s infinite}
.vx-splash-logo{font-size:clamp(32px,9vw,48px);font-weight:1000;color:#ffe7a0;text-align:center;text-shadow:0 4px #8d280a,0 0 20px #ffc84d}
.vx-loader{width:130px;height:5px;border-radius:9px;background:#61201a;overflow:hidden}.vx-loader:after{content:"";display:block;width:40%;height:100%;background:#ffda70;animation:vx-loading .7s ease-in-out infinite alternate}
@keyframes vx-loading{to{transform:translateX(230%)}}
.vx-nav{position:fixed;z-index:30;bottom:0;left:0;right:0;height:70px;display:flex;justify-content:space-around;align-items:center;background:#1a222d;border-top:1px solid #394451;padding-bottom:env(safe-area-inset-bottom)}
.vx-nav-item{border:0;background:transparent;color:#aeb8c5;font-size:10px;display:flex;flex-direction:column;align-items:center;gap:5px;min-width:62px}
.vx-nav-item span{font-size:21px;line-height:1}.vx-nav-item.active{color:var(--orange)}
@media(min-width:700px){.vx-shell{padding-top:22px}.vx-device{width:min(420px,calc((100dvh - 180px)*.5625));min-height:0;max-height:calc(100dvh - 180px)}}
@media(max-height:720px){.vx-shell{padding-top:5px}.vx-device{min-height:0;max-height:calc(100dvh - 154px)}.vx-header{height:58px}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important}}
`;

function pickSymbol() {
  const total = SYMBOLS.reduce((sum, s) => sum + s.weight, 0);
  let value = Math.random() * total;
  for (const symbol of SYMBOLS) { value -= symbol.weight; if (value < 0) return symbol; }
  return SYMBOLS[0];
}
function makeGrid() { return Array.from({ length: 3 }, () => Array.from({ length: 3 }, pickSymbol)); }
function evaluate(grid) {
  const wins = [];
  for (let row = 0; row < 3; row += 1) {
    const a = grid[0][row], b = grid[1][row], c = grid[2][row];
    if (a.icon === b.icon && b.icon === c.icon) wins.push({ row, symbol: a, multiplier: a.value });
  }
  return wins;
}

function App() {
  const [balance, setBalance] = useState(() => {
    try { const stored = window.localStorage.getItem('venix-fortune-demo-balance'); return stored === null ? INITIAL_BALANCE : Math.max(0, Number(stored) || 0); }
    catch (_) { return INITIAL_BALANCE; }
  });
  const [bet, setBet] = useState(2);
  const [grid, setGrid] = useState(makeGrid);
  const [spinning, setSpinning] = useState(false);
  const [stoppedColumns, setStoppedColumns] = useState([]);
  const [soundOn, setSoundOn] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState('TOQUE EM GIRAR PARA COMEÇAR');
  const [toast, setToast] = useState('');
  const [winRows, setWinRows] = useState([]);
  const [activeNav, setActiveNav] = useState('Início');
  const audioRef = useRef(null);
  const timersRef = useRef([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    try { window.localStorage.setItem('venix-fortune-demo-balance', String(balance)); } catch (_) {}
  }, [balance]);
  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
    mountedRef.current = false;
    timersRef.current.forEach(window.clearTimeout);
    if (audioRef.current) audioRef.current.close().catch(() => {});
    };
  }, []);

  function getAudio() {
    if (!soundOn) return null;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      if (!audioRef.current || audioRef.current.state === 'closed') audioRef.current = new AudioContextClass();
      if (audioRef.current.state === 'suspended') audioRef.current.resume();
      return audioRef.current;
    } catch (_) { return null; }
  }
  function tone(freq, duration = .08, type = 'sine', volume = .025, delay = 0) {
    const ctx = getAudio(); if (!ctx) return;
    const oscillator = ctx.createOscillator(), gain = ctx.createGain();
    const at = ctx.currentTime + delay;
    oscillator.type = type; oscillator.frequency.setValueAtTime(freq, at);
    gain.gain.setValueAtTime(.0001, at);
    gain.gain.exponentialRampToValueAtTime(volume, at + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
    oscillator.connect(gain); gain.connect(ctx.destination);
    oscillator.start(at); oscillator.stop(at + duration + .02);
  }
  function sound(kind) {
    if (kind === 'spin') for (let i = 0; i < 7; i += 1) tone(240 + i * 48, .12, 'sawtooth', .008, i * .1);
    else if (kind === 'stop') tone(330 + Math.random() * 250, .1, 'triangle', .025);
    else if (kind === 'win') [523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, .28, 'sine', .04, i * .1));
    else tone(230, .15, 'triangle', .015);
  }
  function burst() {
    const symbols = ['✦', '✧', '✨', '🪙', '★'];
    for (let i = 0; i < 36; i += 1) {
      const element = document.createElement('span');
      element.className = 'vx-spark'; element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      element.style.left = (8 + Math.random() * 84) + '%'; element.style.top = (27 + Math.random() * 42) + '%';
      element.style.setProperty('--x', (Math.random() * 220 - 110) + 'px');
      element.style.setProperty('--y', (Math.random() * 240 - 120) + 'px');
      element.style.animationDelay = (Math.random() * .2) + 's';
      const device = document.querySelector('.vx-device'); if (device) device.appendChild(element);
      window.setTimeout(() => element.remove(), 1500);
    }
  }
  function spin() {
    if (spinning) return;
    if (!Number.isFinite(bet) || bet < 1 || bet > 100) { setStatus('APOSTA DEMO ENTRE R$ 1 E R$ 100'); return; }
    if (balance < bet) { setStatus('CRÉDITOS DEMO INSUFICIENTES'); return; }
    // A aposta é descontada uma vez, e o resultado final é fixado antes da animação.
    const nextGrid = makeGrid();
    if (Math.random() < .18) {
      const row = Math.floor(Math.random() * 3), chosen = pickSymbol();
      for (let col = 0; col < 3; col += 1) nextGrid[col][row] = chosen;
    }
    const nextWins = evaluate(nextGrid);
    setBalance(value => Math.max(0, +(value - bet).toFixed(2)));
    setSpinning(true); setStoppedColumns([]); setWinRows([]); setToast(''); setStatus('BOA SORTE!'); sound('spin');
    const rollingGrid = makeGrid(); setGrid(rollingGrid);
    timersRef.current.forEach(window.clearTimeout); timersRef.current = [];
    for (let col = 0; col < 3; col += 1) {
      const timer = window.setTimeout(() => {
        if (!mountedRef.current) return;
        setGrid(current => current.map((column, index) => index === col ? nextGrid[col] : column));
        setStoppedColumns(current => current.includes(col) ? current : [...current, col]);
        sound('stop');
        if (col === 2) {
          const finishTimer = window.setTimeout(() => {
            if (!mountedRef.current) return;
            setSpinning(false);
            if (nextWins.length) {
              const payout = +(bet * nextWins.reduce((sum, win) => sum + win.multiplier, 0)).toFixed(2);
              setBalance(value => +(value + payout).toFixed(2));
              setWinRows(nextWins.map(win => win.row)); setStatus('COMBINAÇÃO PREMIADA!');
              setToast('+' + fmt(payout)); sound('win'); burst();
            } else { setStatus('TENTE NOVAMENTE'); sound('lose'); }
          }, 340);
          timersRef.current.push(finishTimer);
        }
      }, 850 + col * 430);
      timersRef.current.push(timer);
    }
  }

  const gridRows = [0, 1, 2];
  return <div className="vx-app"><style>{styles}</style>
    <header className="vx-header">
      <div className="vx-brand"><span className="vx-mark">V</span><span>VENIX <b>PLAY</b></span></div>
      <div className="vx-header-right">
        <div className="vx-wallet">SALDO DEMO<strong>{fmt(balance)}</strong></div>
        <button className="vx-add" onClick={() => { setBalance(value => +(value + 50).toFixed(2)); setStatus('+ R$ 50,00 EM CRÉDITOS DEMO'); sound('click'); }}>+ Créditos</button>
      </div>
    </header>
    <main className="vx-shell">
      <div className="vx-notice"><b>DEMO • SEM DINHEIRO REAL.</b> Créditos fictícios salvos neste navegador. Sem depósitos ou saques reais.</div>
      <div className="vx-layout"><section className={'vx-device' + (spinning ? ' spinning' : '') + (winRows.length ? ' winner' : '')}>
        <div className="vx-temple" />
        <button className="vx-sound" onClick={() => { setSoundOn(value => !value); if (!soundOn) tone(620, .05); }}>{soundOn ? '♫ SOM ON' : '♫ SOM OFF'}</button>
        <div className="vx-game-title"><div className="vx-kicker">LUCK • FORTUNE • PROSPERITY</div><div className="vx-title">FORTUNE TIGER</div></div>
        <div className="vx-tiger"><span className="vx-tiger-face">🐯</span></div>
        <div className="vx-frame"><div className="vx-reels">
          {grid.map((column, col) => <div className={'vx-reel' + (spinning && !stoppedColumns.includes(col) ? ' rolling' : ' stopped')} key={col}>
            {gridRows.map(row => <div className="vx-cell" key={row}><span className="vx-symbol">{column[row].icon}</span></div>)}
          </div>)}
        </div></div>
        {winRows.map(row => <div key={row} className="vx-win-line" style={{ top: (29 + 7 + ((row + .5) / 3) * 39) + '%' }} />)}
        {toast && <div className="vx-toast" key={toast}>{toast}</div>}
        <div className="vx-status" role="status">{status}</div>
        <div className="vx-controls">
          <div className="vx-bet-row">
            <button className="vx-small" disabled={spinning} onClick={() => setBet(value => Math.max(1, value - 1))}>−</button>
            <div className="vx-bet">APOSTA DEMO<strong>{fmt(bet)}</strong></div>
            <button className="vx-small" disabled={spinning} onClick={() => setBet(value => Math.min(100, value + 1))}>+</button>
          </div>
          <button className="vx-spin" disabled={spinning || !loaded} onClick={spin}>{spinning ? 'GIRANDO…' : 'GIRAR ✦'}</button>
        </div>
        <div className="vx-footnote">SIMULAÇÃO • SEM VALOR MONETÁRIO</div>
        {!loaded && <div className="vx-splash"><div className="vx-splash-tiger">🐯</div><div className="vx-splash-logo">FORTUNE<br/>TIGER</div><div style={{fontSize:10,letterSpacing:3,color:'#ffdf8b'}}>CARREGANDO DEMO</div><div className="vx-loader" /></div>}
      </section></div>
    </main>
    <nav className="vx-nav">{[['Início','⌂'],['Esportes','⚽'],['Cassino','♛'],['Perfil','♙']].map(([label, icon]) => <button key={label} className={'vx-nav-item' + (activeNav === label ? ' active' : '')} onClick={() => setActiveNav(label)}><span>{icon}</span>{label}</button>)}</nav>
  </div>;
}
export default App;
