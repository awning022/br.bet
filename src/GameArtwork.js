import React from 'react';

/**
 * Original, locally-rendered Venix illustrations.
 * These are custom SVG artworks, not screenshots or assets from commercial providers.
 */
const ART = {
  tiger: {kind:'slot', symbol:'✦', label:'LUCKY REELS', accents:['#ffcf70','#ff7c45']},
  rabbit: {kind:'slot', symbol:'✿', label:'LUCKY BLOOM', accents:['#ffb7d5','#bd82ff']},
  ox: {kind:'slot', symbol:'◆', label:'GOLDEN REELS', accents:['#ffd16d','#b86a37']},
  mouse: {kind:'slot', symbol:'★', label:'STAR REELS', accents:['#a8e4ff','#648bff']},
  dragonSlot: {kind:'slot', symbol:'✧', label:'DRAGON FIRE', accents:['#ffad6d','#ff4f57']},
  mines: {kind:'mines', symbol:'✦', label:'MINEFIELD', accents:['#68f0bd','#20a87c']},
  aviator: {kind:'aviator', symbol:'✈', label:'SKY RUNNER', accents:['#ffb5be','#ff4d6d']},
  crash: {kind:'flight', symbol:'↗', label:'CRASH CURVE', accents:['#ff91d4','#b34cff']},
  balloon: {kind:'balloon', symbol:'◉', label:'UP & UP', accents:['#8ce9ff','#398cff']},
  plinko: {kind:'plinko', symbol:'●', label:'DROP ZONE', accents:['#d0a7ff','#8556ff']},
  roulette: {kind:'roulette', symbol:'0', label:'GRAND ROULETTE', accents:['#ffe18a','#3ad7a0']},
  blackjack: {kind:'cards', symbol:'A', label:'BLACKJACK CLUB', accents:['#ffe1a0','#55d6a2']},
  hilo: {kind:'cards', symbol:'K', label:'HIGH OR LOW', accents:['#b5d4ff','#678bff']},
  dragon: {kind:'duel', symbol:'VS', label:'DRAGON TIGER', accents:['#ff9b7b','#7eaaff']},
  dice: {kind:'dice', symbol:'⚄', label:'DICE LAB', accents:['#a7d8ff','#5e94ff']},
  keno: {kind:'keno', symbol:'7', label:'NUMBER DRAW', accents:['#e2b0ff','#9c61ff']},
  tower: {kind:'tower', symbol:'◆', label:'TOWER CLIMB', accents:['#d2b5ff','#7954e8']},
  penalty: {kind:'sport', symbol:'⚽', label:'PENALTY ARENA', accents:['#9af4c1','#22b876']},
  goal: {kind:'sport', symbol:'★', label:'GOAL ARENA', accents:['#b7f5d8','#44d69a']},
  limbo: {kind:'chart', symbol:'↗', label:'LIMBO X', accents:['#c1adff','#8b68ff']},
};

function GameArtwork({game, variant='card'}) {
  const art = ART[game?.id] || ART.tiger;
  const uid = String(game?.id || 'venix').replace(/[^a-z0-9]/gi, '');
  const stage = variant === 'stage';
  const [a,b] = art.accents;
  return (
    <div className={'venix-art venix-art--'+variant+' venix-art--'+art.kind} style={{'--art-a':a,'--art-b':b}} aria-label={'Arte original Venix: '+(game?.name || art.label)} role="img">
      <svg viewBox="0 0 360 220" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={'bg-'+uid} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={a} stopOpacity=".34"/><stop offset="100%" stopColor={b} stopOpacity=".04"/></linearGradient>
          <linearGradient id={'metal-'+uid} x1="0" y1="0" x2="0.9" y2="1"><stop offset="0%" stopColor="#ffffff" stopOpacity=".92"/><stop offset="48%" stopColor="#d7e2f4" stopOpacity=".72"/><stop offset="100%" stopColor="#71829f" stopOpacity=".8"/></linearGradient>
          <radialGradient id={'glow-'+uid}><stop stopColor={a} stopOpacity=".8"/><stop offset="1" stopColor={a} stopOpacity="0"/></radialGradient>
          <filter id={'shadow-'+uid} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7"/></filter>
        </defs>
        <rect width="360" height="220" rx="18" fill={'url(#bg-'+uid+')'}/>
        <circle cx="265" cy="78" r="112" fill={'url(#glow-'+uid+')'} opacity=".5"/>
        <g fill="none" stroke="#ffffff" strokeOpacity=".09">
          <path d="M0 178 L120 58 L240 178 L360 58"/><path d="M0 198 L140 58 L280 198 L360 118"/>
          <circle cx="280" cy="80" r="62"/><circle cx="280" cy="80" r="84"/>
        </g>
        <g className="art-sparkles" fill={a}>
          <circle cx="43" cy="43" r="2.4"/><circle cx="316" cy="32" r="2"/><circle cx="305" cy="168" r="2.5"/><circle cx="75" cy="160" r="1.8"/>
          <path d="M94 28 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z"/><path d="M324 125 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z"/>
        </g>
        {art.kind === 'slot' && <g className="art-object">
          <ellipse cx="181" cy="183" rx="111" ry="15" fill="#000" opacity=".35" filter={'url(#shadow-'+uid+')'}/>
          <path d="M78 48 Q78 36 92 36 H268 Q282 36 282 50 V170 Q282 182 268 182 H92 Q78 182 78 170Z" fill="#101624" stroke={a} strokeOpacity=".8" strokeWidth="2"/>
          <path d="M90 52 H270 V166 H90Z" fill="#050a13" stroke="#ffffff" strokeOpacity=".18"/>
          {[0,1,2].map((n)=><g key={n}><rect x={98+n*57} y="58" width="50" height="102" rx="8" fill={'url(#metal-'+uid+')'} opacity=".95"/><rect x={103+n*57} y="63" width="40" height="92" rx="5" fill="#19263b"/><text x={123+n*57} y="119" fontSize="36" textAnchor="middle" fill={n===1?a:'#fff'}>{n===1?art.symbol:['✦','♦','✧'][n]}</text></g>)}
          <path d="M88 110 H272" stroke={a} strokeWidth="2" strokeOpacity=".85"/><path d="M87 45 H273" stroke="#fff" strokeOpacity=".7"/>
          <path d="M160 28 L180 18 L200 28 L196 38 H164Z" fill={a}/><text x="180" y="32" textAnchor="middle" fontSize="8" fontWeight="900" fill="#121521">V</text>
        </g>}
        {art.kind === 'mines' && <g className="art-object">{Array.from({length:25},(_,i)=>{const x=94+(i%5)*37,y=45+Math.floor(i/5)*31;return <g key={i}><rect x={x} y={y} width="30" height="25" rx="5" fill={i===7||i===16?'#a63755':'#1a3441'} stroke={i===7||i===16?'#ff8eaa':'#6cf0bf'} strokeOpacity=".7"/>{i===7||i===16?<text x={x+15} y={y+18} fontSize="17" textAnchor="middle" fill="#ffd8e1">✹</text>:<path d={'M'+(x+15)+' '+(y+7)+' l3 5 5 3 -5 3 -3 5 -3 -5 -5 -3 5 -3z'} fill="#8bffce"/>}</g>})}<circle cx="180" cy="108" r="74" fill="none" stroke={a} strokeOpacity=".15" strokeWidth="3"/></g>}
        {art.kind === 'flight' && <g className="art-object"><path d="M28 180 Q98 166 151 123 T329 40" fill="none" stroke={a} strokeWidth="3" strokeDasharray="5 8" opacity=".8"/><path d="M26 198 Q110 184 170 148 T333 85" fill="none" stroke={b} strokeWidth="1" opacity=".4"/><g transform="translate(202 92) rotate(-22)"><path d="M-72 5 L-12 -5 L14 -42 L29 -43 L20 -3 L67 10 Q77 16 67 20 L17 15 L0 42 L-13 40 L-10 13 L-65 18Z" fill={'url(#metal-'+uid+')'} stroke={a} strokeWidth="1.5"/><path d="M-40 8 L10 7" stroke={b} strokeWidth="3"/></g><circle cx="270" cy="53" r="24" fill={a} opacity=".1"/><circle cx="270" cy="53" r="10" fill={a} opacity=".24"/></g>}
        {art.kind === 'aviator' && <g>
          <path d="M24 190 Q85 181 129 146 T210 100 T334 27" fill="none" stroke={a} strokeWidth="4" strokeLinecap="round" strokeDasharray="7 8" opacity=".9"/>
          <path d="M24 207 Q88 197 137 164 T218 120 T338 51" fill="none" stroke={b} strokeWidth="1.5" opacity=".42"/>
          <path d="M24 190 Q85 181 129 146 T210 100 T334 27 L334 208 L24 208Z" fill={a} opacity=".07"/>
          <circle cx="290" cy="52" r="44" fill={'url(#glow-'+uid+')'} opacity=".55"/>
          <g className="aviator-plane">
            <animateMotion dur="4.8s" repeatCount="indefinite" rotate="auto" path="M 34 186 Q 92 178 137 143 T 218 98 T 326 31"/>
            <g transform="scale(.46)">
              <path d="M-72 5 L-12 -5 L14 -42 L29 -43 L20 -3 L67 10 Q77 16 67 20 L17 15 L0 42 L-13 40 L-10 13 L-65 18Z" fill={'url(#metal-'+uid+')'} stroke={a} strokeWidth="3"/>
              <path d="M-40 8 L10 7" stroke={b} strokeWidth="6"/>
              <path d="M-69 7 L-108 15 L-72 18Z" fill={a} opacity=".75"/>
            </g>
          </g>
          <text x="26" y="35" fontSize="11" fontWeight="900" letterSpacing="2" fill={a}>TAKE OFF</text>
          <text x="333" y="196" textAnchor="end" fontSize="10" fontWeight="900" letterSpacing="1.5" fill="#fff" opacity=".7">CASH OUT IN TIME</text>
        </g>
        {art.kind === 'balloon' && <g className="art-object"><path d="M180 140 L176 170 L185 170" fill="none" stroke="#dbe8ff" strokeWidth="2"/><path d="M180 38 C139 38 129 80 146 112 C156 132 171 139 180 139 C189 139 204 132 214 112 C231 80 221 38 180 38Z" fill={'url(#glow-'+uid+')'} stroke={a} strokeWidth="2"/><ellipse cx="166" cy="67" rx="10" ry="18" fill="#fff" opacity=".3" transform="rotate(-25 166 67)"/><path d="M174 139 L180 147 L186 139" fill={b}/>{[0,1,2,3,4].map(i=><circle key={i} cx={70+i*55} cy={178-(i%2)*20} r={3+i%2} fill={a} opacity=".65"/>)}<text x="180" y="99" fontSize="28" fontWeight="900" textAnchor="middle" fill="#fff">×</text></g>}
        {art.kind === 'plinko' && <g className="art-object">{Array.from({length:7},(_,row)=>Array.from({length:row+1},(_,col)=>{const x=180-row*21+col*42,y=45+row*19;return <circle key={row+'-'+col} cx={x} cy={y} r="3.4" fill="#e9d7ff" opacity=".8"/>}))}<path d="M58 180 H302" stroke="#fff" strokeOpacity=".2" strokeWidth="2"/>{[-2,-1,0,1,2].map((n,i)=><path key={n} d={'M'+(92+i*44)+' 180 l-10 18 h20z'} fill={i===2?a:b} opacity=".9"/>)}<circle className="art-bouncing-ball" cx="180" cy="36" r="10" fill="#fff" stroke={a} strokeWidth="4"/><path d="M180 49 L159 78 L201 102 L180 130 L201 155" fill="none" stroke={a} strokeWidth="2" strokeDasharray="4 6" opacity=".5"/></g>}
        {art.kind === 'roulette' && <g className="art-object"><circle cx="180" cy="111" r="76" fill="#111821" stroke={a} strokeWidth="5"/><circle cx="180" cy="111" r="64" fill="#193d31" stroke="#f3d88b" strokeWidth="3"/>{Array.from({length:18},(_,i)=><path key={i} d="M180 48 L180 174" stroke={i%2?'#e4c97c':'#d94358'} strokeWidth="12" transform={'rotate('+(i*20)+' 180 111)'} />)}<circle cx="180" cy="111" r="28" fill="#d4b46b" stroke="#fff0b7" strokeWidth="3"/><circle cx="180" cy="111" r="17" fill="#183b30"/><text x="180" y="118" fontSize="21" textAnchor="middle" fontWeight="900" fill="#fbe6a0">0</text><path d="M180 21 l-9 17 h18z" fill="#fff1bd" stroke={a}/></g>}
        {art.kind === 'cards' && <g className="art-object"><g transform="translate(112 46) rotate(-15 54 70)"><rect width="104" height="142" rx="10" fill="#f5f0e5" stroke={a} strokeWidth="2"/><text x="14" y="29" fontSize="22" fontWeight="900" fill="#bd314a">{art.symbol}</text><text x="52" y="89" textAnchor="middle" fontSize="54" fill="#bd314a">{art.symbol==='A'?'♠':'♥'}</text></g><g transform="translate(163 39) rotate(12 54 70)"><rect width="104" height="142" rx="10" fill="#f5f0e5" stroke="#d5e1f5" strokeWidth="2"/><text x="14" y="29" fontSize="22" fontWeight="900" fill="#15253e">K</text><text x="52" y="89" textAnchor="middle" fontSize="54" fill="#15253e">♣</text></g><path d="M40 187 H320" stroke={a} strokeOpacity=".3"/></g>}
        {art.kind === 'duel' && <g className="art-object"><path d="M65 55 L139 37 L157 110 L111 167 L65 139Z" fill={a} fillOpacity=".35" stroke={a} strokeWidth="2"/><path d="M295 55 L221 37 L203 110 L249 167 L295 139Z" fill={b} fillOpacity=".35" stroke={b} strokeWidth="2"/><path d="M88 73 l20 -15 20 15 -8 40 -12 20 -12 -20z" fill={a}/><path d="M272 73 l-20 -15 -20 15 8 40 12 20 12 -20z" fill={b}/><circle cx="180" cy="104" r="39" fill="#121a29" stroke="#fff" strokeOpacity=".6" strokeWidth="2"/><text x="180" y="112" textAnchor="middle" fontSize="24" fontWeight="1000" fill="#fff">VS</text><path d="M104 173 L155 154 M256 173 L205 154" stroke="#fff" strokeOpacity=".5" strokeWidth="3"/></g>}
        {art.kind === 'dice' && <g className="art-object">{[0,1,2].map((n)=><g key={n} transform={'translate('+(95+n*64)+' '+(65+(n%2)*18)+') rotate('+(n*13-10)+' 35 35)'}><rect width="62" height="62" rx="11" fill={'url(#metal-'+uid+')'} stroke={a} strokeWidth="2"/>{[[16,16],[46,16],[31,31],[16,46],[46,46]].slice(0,n+2).map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="5" fill="#243249"/>)}</g>)}</g>}
        {art.kind === 'keno' && <g className="art-object">{Array.from({length:15},(_,i)=>{const x=65+(i%5)*58,y=50+Math.floor(i/5)*48;return <g key={i}><circle cx={x} cy={y} r="20" fill={i===2||i===8||i===11?a:'#202d43'} stroke={i===2||i===8||i===11?'#fff':b} strokeOpacity=".75"/><text x={x} y={y+5} fontSize="14" fontWeight="900" textAnchor="middle" fill={i===2||i===8||i===11?'#141a25':'#e7efff'}>{[7,12,3,22,9,18,4,15,21,6,11,24,2,19,8][i]}</text></g>})}</g>}
        {art.kind === 'tower' && <g className="art-object">{[0,1,2,3,4].map((n)=><g key={n} transform={'translate('+(100+n*9)+' '+(157-n*24)+')'}><path d="M0 0 H142 L126 -20 H16Z" fill={n%2?a:b} fillOpacity={.75}/><path d="M8 -3 H134" stroke="#fff" strokeOpacity=".7"/><rect x="14" y="-17" width="114" height="12" rx="3" fill="#fff" fillOpacity=".12"/></g>)}<path d="M180 24 l-13 18 h26z" fill="#fff2b0"/><path d="M180 42 V62" stroke="#fff2b0" strokeWidth="2"/></g>}
        {art.kind === 'sport' && <g className="art-object"><path d="M65 53 H295 V169 H65Z" fill="#123c30" stroke={a} strokeWidth="3"/>{[0,1,2,3,4,5,6,7].map(i=><path key={i} d={'M'+(65+i*32)+' 53 V169'} stroke="#b3ffdb" strokeOpacity=".15"/>)}{[0,1,2,3].map(i=><path key={i} d={'M65 '+(53+i*29)+' H295'} stroke="#b3ffdb" strokeOpacity=".15"/>)}<rect x="112" y="73" width="136" height="96" fill="none" stroke="#f2fff8" strokeWidth="3"/><circle cx="180" cy="119" r="30" fill="none" stroke="#f2fff8" strokeOpacity=".65" strokeWidth="2"/><circle className="art-sport-ball" cx="180" cy="124" r="13" fill="#f7fbff" stroke="#d1d9e6" strokeWidth="2"/><path d="M180 114 l7 5 -3 8 h-8 l-3 -8z" fill="#24334b"/></g>}
        {art.kind === 'chart' && <g className="art-object"><path d="M55 174 H320 M55 40 V174" stroke="#ffffff" strokeOpacity=".25" strokeWidth="2"/>{[0,1,2,3,4].map(i=><path key={i} d={'M55 '+(60+i*27)+' H320'} stroke="#ffffff" strokeOpacity=".08" strokeDasharray="3 7"/>)}<path d="M62 157 C95 152 92 131 121 138 S158 119 180 103 S222 115 240 76 S280 71 311 38" fill="none" stroke={a} strokeWidth="5" strokeLinecap="round"/><path d="M62 157 C95 152 92 131 121 138 S158 119 180 103 S222 115 240 76 S280 71 311 38 L311 174 L62 174Z" fill={a} fillOpacity=".12"/><path d="M293 40 L312 36 L310 56" fill="none" stroke="#fff" strokeWidth="3"/></g>}
        <text x="18" y="205" fontSize="9" letterSpacing="2.5" fontWeight="800" fill="#fff" opacity=".58">{art.label}</text>
        <text x="341" y="205" textAnchor="end" fontSize="9" letterSpacing="1.5" fontWeight="800" fill={a} opacity=".9">VENIX / ORIGINAL</text>
      </svg>
      {stage && <div className="art-stage-caption"><span className="art-live-dot" /> VISUALIZAÇÃO DO JOGO <b>DEMO</b></div>}
    </div>
  );
}

export default GameArtwork;
