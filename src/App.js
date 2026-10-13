import React, { useMemo, useState } from 'react';

const matches = [
  { id: 1, league: 'BRASIL • SÉRIE A', time: 'AO VIVO 62′', home: 'Flamengo', away: 'Palmeiras', homeShort: 'FLA', awayShort: 'PAL', score: '1 : 1', color: 'red', odds: ['2.45', '2.10', '3.20'], live: true },
  { id: 2, league: 'INGLATERRA • PREMIER LEAGUE', time: 'Hoje, 16:00', home: 'Arsenal', away: 'Liverpool', homeShort: 'ARS', awayShort: 'LIV', score: '— : —', odds: ['2.25', '3.40', '2.85'] },
  { id: 3, league: 'ESPANHA • LALIGA', time: 'Hoje, 17:00', home: 'Real Madrid', away: 'Barcelona', homeShort: 'RMA', awayShort: 'BAR', score: '— : —', odds: ['2.05', '3.65', '3.10'] },
  { id: 4, league: 'BRASIL • SÉRIE A', time: 'Hoje, 19:30', home: 'Botafogo', away: 'Fluminense', homeShort: 'BOT', awayShort: 'FLU', score: '— : —', odds: ['1.95', '3.25', '3.75'] },
  { id: 5, league: 'CHAMPIONS LEAGUE', time: 'Amanhã, 15:45', home: 'PSG', away: 'Bayern', homeShort: 'PSG', awayShort: 'BAY', score: '— : —', odds: ['2.70', '3.50', '2.30'] },
];
const sports = [{icon:'⚽',name:'Futebol',count:'128'},{icon:'🏀',name:'Basquete',count:'24'},{icon:'🎾',name:'Tênis',count:'36'},{icon:'🏐',name:'Vôlei',count:'18'},{icon:'🏒',name:'Hóquei',count:'12'}];
const fmt = n => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const teamLogo = code => 'https://media.api-sports.io/football/teams/' + ({FLA:127,PAL:121,ARS:42,LIV:40,RMA:541,BAR:529,BOT:120,FLU:124,PSG:85,BAY:157}[code] || 0) + '.png';

function App() {
  const [sport, setSport] = useState('Futebol');
  const [section, setSection] = useState('Para você');
  const [slip, setSlip] = useState([]);
  const [stake, setStake] = useState('20');
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const filtered = useMemo(() => matches.filter(m => (section === 'Ao vivo' ? m.live : true) && (m.home+' '+m.away+' '+m.league).toLowerCase().includes(search.toLowerCase())), [section, search]);
  const totalOdds = slip.reduce((a,b)=>a*Number(b.odd),1);
  const addPick = (match, label, odd) => {
    setSlip(prev => {
      const exists = prev.some(p=>p.id===match.id);
      if (exists) return prev.map(p=>p.id===match.id?{...p,label,odd}:p);
      return [...prev,{id:match.id,match:match.home+' x '+match.away,label,odd}];
    });
    setNotice('Seleção adicionada ao bilhete');
    window.setTimeout(()=>setNotice(''),2200);
  };
  const removePick = id => setSlip(prev=>prev.filter(p=>p.id!==id));
  return <div className="app-shell">
    <div className="demo-banner"><span className="pulse-dot"/> AMBIENTE DE DEMONSTRAÇÃO <span>•</span> Jogos, odds e saldo ilustrativos — sem apostas ou transações reais.</div>
    <header className="topbar">
      <button className="menu-toggle" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Abrir menu">☰</button>
      <a className="brand" href="#inicio" aria-label="Five Bet início"><span className="brand-mark">5</span><span>FIVE<span className="brand-light">BET</span></span></a>
      <div className="top-search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar time, campeonato..." aria-label="Buscar partidas"/></div>
      <div className="top-actions"><button className="text-button" onClick={()=>setNotice('Login estará disponível quando a autenticação for conectada.')}>Entrar</button><button className="primary-button" onClick={()=>setNotice('Cadastro demonstrativo: a API será conectada depois.')}>Criar conta <span>↗</span></button><button className="avatar" title="Perfil" onClick={()=>setNotice('Perfil demonstrativo')}>M</button></div>
    </header>
    <div className="layout">
      <aside className={'sidebar '+(mobileMenu?'sidebar-open':'')}>
        <div className="side-label">MENU PRINCIPAL</div>
        {[['⌂','Para você'],['◉','Ao vivo'],['▤','Competições'],['☆','Favoritos']].map(([icon,name])=><button key={name} className={'side-link '+(section===name?'active':'')} onClick={()=>{setSection(name);setMobileMenu(false)}}><span className="side-icon">{icon}</span>{name}{name==='Ao vivo'&&<span className="live-count">12</span>}</button>)}
        <div className="side-label sport-label">ESPORTES</div>
        {sports.map(s=><button key={s.name} className={'side-link sport-link '+(sport===s.name?'sport-active':'')} onClick={()=>{setSport(s.name);setMobileMenu(false);if(s.name!=='Futebol')setNotice('A lista de '+s.name+' será conectada na próxima etapa.')}}><span className="sport-icon">{s.icon}</span><span>{s.name}</span><span className="sport-count">{s.count}</span></button>)}
        <div className="sidebar-promo"><div className="promo-icon">✦</div><strong>O jogo começa aqui.</strong><p>Uma nova experiência esportiva, feita para você.</p><button onClick={()=>setNotice('Promoções serão configuradas após a integração.')}>Explorar <span>→</span></button></div>
        <div className="side-footer"><span className="shield">✓</span><div><b>Jogue com responsabilidade</b><small>18+ • Protótipo de interface</small></div></div>
      </aside>
      <main className="main-content" id="inicio">
        <section className="hero">
          <div className="hero-copy"><div className="eyebrow"><span/> PAIXÃO PELO JOGO</div><h1>O esporte acontece.<br/><em>Você vive cada momento.</em></h1><p>Acompanhe os confrontos, explore mercados e monte seu bilhete em uma experiência feita para torcer junto.</p><button className="hero-button" onClick={()=>{setSection('Ao vivo');window.scrollTo({top:0,behavior:'smooth'})}}>Ver jogos ao vivo <span>↗</span></button><div className="hero-stats"><div><b>128</b><small>eventos hoje</small></div><div><b>12</b><small>ao vivo agora</small></div><div><b>24/7</b><small>esporte no ar</small></div></div></div>
          <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-glow"/><div className="hero-ball">⚽</div><div className="floating-card card-live"><span className="live-indicator"/> AO VIVO <b>62:14</b></div><div className="floating-card card-score"><img className="mini-crest" src={teamLogo("FLA")} alt="Flamengo" /><b>1 — 1</b><img className="mini-crest green-crest" src={teamLogo("PAL")} alt="Palmeiras" /></div><div className="hero-number">05</div></div>
        </section>
        <section className="ticker"><div className="ticker-label"><span className="live-indicator"/> DESTAQUES</div><div className="ticker-match"><img className="ticker-logo" src={teamLogo("FLA")} alt="Flamengo"/><span>1 : 1</span><img className="ticker-logo" src={teamLogo("PAL")} alt="Palmeiras"/><small>62′</small></div><div className="ticker-divider"/><div className="ticker-match"><img className="ticker-logo" src={teamLogo("ARS")} alt="Arsenal"/><span>HOJE</span><img className="ticker-logo" src={teamLogo("LIV")} alt="Liverpool"/><small>16:00</small></div><div className="ticker-divider"/><div className="ticker-match"><img className="ticker-logo" src={teamLogo("RMA")} alt="Real Madrid"/><span>HOJE</span><img className="ticker-logo" src={teamLogo("BAR")} alt="Barcelona"/><small>17:00</small></div><span className="ticker-end">PLACARES ILUSTRATIVOS ↗</span></section>
        <section className="section-heading"><div><div className="section-kicker">NÃO PERCA NADA</div><h2>{section==='Ao vivo'?'Jogos ao vivo':section==='Favoritos'?'Seus favoritos':'Partidas em destaque'} <span className="heading-count">{filtered.length.toString().padStart(2,'0')}</span></h2><p>Escolha uma cotação para adicionar ao seu bilhete demonstrativo.</p></div><div className="section-tabs"><button className={section==='Para você'?'tab-active':''} onClick={()=>setSection('Para você')}>Para você</button><button className={section==='Ao vivo'?'tab-active':''} onClick={()=>setSection('Ao vivo')}><span className="live-indicator"/> Ao vivo</button></div></section>
        <div className="sport-pills">{sports.slice(0,4).map(s=><button key={s.name} onClick={()=>{setSport(s.name);if(s.name!=='Futebol')setNotice('Conteúdo de '+s.name+' em breve.')}} className={sport===s.name?'pill-selected':''}>{s.icon} {s.name}</button>)}</div>
        <div className="match-list">{filtered.map(m=><article className="match-card" key={m.id}>
          <div className="match-meta"><span className="league-icon">✦</span><span>{m.league}</span>{m.live&&<span className="live-tag"><i/> {m.time}</span>}{!m.live&&<span className="match-time">{m.time}</span>}<button className="star-button" title="Favoritar" onClick={()=>setNotice('Favoritos estarão disponíveis após o login.')}>☆</button></div>
          <div className="match-body"><div className="teams"><div className="team-row"><img className="team-crest" src={teamLogo(m.homeShort)} alt={m.home} loading="lazy" /><b>{m.home}</b>{m.live&&<strong className="team-score">{m.score.split(':')[0].trim()}</strong>}</div><div className="team-row"><img className="team-crest" src={teamLogo(m.awayShort)} alt={m.away} loading="lazy" /><b>{m.away}</b>{m.live&&<strong className="team-score">{m.score.split(':')[1].trim()}</strong>}</div></div><div className="odds-area"><div className="odds-heading"><span>1</span><span>X</span><span>2</span></div><div className="odds-grid">{m.odds.map((odd,i)=><button key={i} className={'odd-button '+(slip.some(p=>p.id===m.id&&p.odd===odd)?'odd-selected':'')} onClick={()=>addPick(m,['Vitória '+m.home,'Empate','Vitória '+m.away][i],odd)}><small>{i===0?'Casa':i===1?'Empate':'Fora'}</small><b>{odd}</b></button>)}</div></div></div>
          <div className="match-card-footer"><span>{m.live?'● Partida em andamento':'◷ Pré-jogo'}</span><button onClick={()=>addPick(m,'Mais de 1.5 gols','1.45')}>Mais de 1.5 gols <b>1.45</b> <span>＋</span></button><button className="all-markets" onClick={()=>setNotice('Mercados adicionais serão carregados após integração de dados.')}>+ 18 mercados</button></div>
        </article>)}
        {filtered.length===0&&<div className="empty-state"><span>⌕</span><h3>Nenhuma partida encontrada</h3><p>Tente outro termo ou volte para os destaques.</p><button onClick={()=>{setSearch('');setSection('Para você')}}>Ver todas as partidas</button></div>}
        </div>
        <div className="bottom-note"><span>ⓘ</span> Interface em modo de demonstração. Cotações e resultados não são reais.</div>
        <footer className="main-footer"><a className="brand footer-brand" href="#inicio"><span className="brand-mark">5</span><span>FIVE<span className="brand-light">BET</span></span></a><span>© 2026 Five Bet • Protótipo visual</span><div><a href="#responsabilidade">Jogo responsável</a><a href="#privacidade">Privacidade</a><a href="#termos">Termos</a></div></footer>
      </main>
      <aside className="bet-slip">
        <div className="slip-heading"><div><span className="slip-icon">▤</span><h3>Seu bilhete</h3><span className="slip-count">{slip.length}</span></div><button className="clear-slip" onClick={()=>setSlip([])} disabled={!slip.length}>Limpar</button></div>
        <div className="slip-tabs"><button className="slip-tab-active">Simples / Múltipla</button><button onClick={()=>setNotice('A opção de sistema será implementada depois.')}>Sistema</button></div>
        {slip.length===0?<div className="slip-empty"><div className="empty-ticket">＋</div><b>Seu bilhete está vazio</b><p>Escolha uma cotação em qualquer partida para começar.</p><div className="slip-tip"><span>↖</span> Toque em uma odd para adicioná-la aqui.</div></div>:<div className="slip-picks">{slip.map(p=><div className="pick" key={p.id}><div className="pick-top"><span>{p.match}</span><button onClick={()=>removePick(p.id)} aria-label="Remover seleção">×</button></div><div className="pick-bottom"><span>{p.label}</span><b>{p.odd}</b></div></div>)}</div>}
        <div className="slip-calculation"><div className="calc-row"><span>Cota total</span><b>{slip.length?totalOdds.toFixed(2):'—'}</b></div><label htmlFor="stake">Valor ilustrativo (R$)</label><div className="stake-input"><span>R$</span><input id="stake" value={stake} onChange={e=>setStake(e.target.value.replace(/[^0-9.,]/g,''))} inputMode="decimal" aria-label="Valor ilustrativo"/></div><div className="quick-stakes">{['10','20','50','100'].map(v=><button key={v} className={stake===v?'stake-active':''} onClick={()=>setStake(v)}>R$ {v}</button>)}</div><div className="return-row"><span>Retorno potencial*</span><b>{slip.length&&Number(stake.replace(',','.'))>0?fmt(Number(stake.replace(',','.'))*totalOdds):fmt(0)}</b></div><button className="place-bet" onClick={()=>setNotice('Bilhete apenas demonstrativo. Nenhuma aposta ou transação foi realizada.')} disabled={!slip.length}>Revisar bilhete <span>→</span></button><p className="slip-disclaimer">*Simulação visual, sem valor financeiro. Nenhuma aposta será enviada.</p></div>
        <div className="responsible-box"><span>✓</span><div><b>Jogue com consciência</b><p>18+ • Defina limites e jogue com responsabilidade.</p></div></div>
      </aside>
    </div>
    {notice&&<div className="toast" role="status"><span>✓</span>{notice}<button onClick={()=>setNotice('')}>×</button></div>}
  </div>;
}
export default App;