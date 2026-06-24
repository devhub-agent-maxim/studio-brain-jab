/* ============================================================
   Studio Brain — demo console
   Zero-dependency. Reskin per client via the BRAND object.
   ============================================================ */

const BRAND = {
  company: "JAB Design",
  mark: "J",
  product: "Studio Brain",
  owner: "Justin",
  ownerInitials: "JT",
  domain: "jab.sg",
};

/* ---------- tiny icon set (stroke svg) ---------- */
const I = {
  grid:'<path d="M4 4h7v7H4zM13 4h7v7h-7zM13 13h7v7h-7zM4 13h7v7H4z"/>',
  brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 5 2.5 2.5 0 0 0 5 .5V5a2 2 0 0 0-3-1z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 5 2.5 2.5 0 0 1-5 .5"/>',
  plug:'<path d="M9 3v6M15 3v6M7 9h10v3a5 5 0 0 1-10 0z M12 17v4"/>',
  robot:'<rect x="4" y="8" width="16" height="11" rx="2"/><path d="M12 8V4M9 13h.01M15 13h.01M2 12v3M22 12v3"/>',
  flow:'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7l3 9M16 7l-3 9"/>',
  inbox:'<path d="M4 13l2-8h12l2 8M4 13v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5M4 13h5l1 2h4l1-2h5"/>',
  arrow:'<path d="M7 17L17 7M9 7h8v8"/>',
  check:'<path d="M5 12l5 5L20 7"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  clock:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  bolt:'<path d="M13 3L4 14h7l-1 7 9-11h-7z"/>',
  send:'<path d="M4 12l16-7-7 16-2-7z"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  msg:'<path d="M4 5h16v11H9l-5 4z"/>',
  link:'<path d="M9 15l6-6M8 12l-2 2a3 3 0 0 0 4 4l2-2M16 12l2-2a3 3 0 0 0-4-4l-2 2"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/>',
  trend:'<path d="M4 16l5-5 4 3 6-7M19 7h-4M19 7v4"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  chevron:'<path d="M6 9l6 6 6-6"/>',
};
function ic(name, cls){ return `<svg class="ico ${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${I[name]||''}</svg>`; }
window.I = I;

/* ---------- state ---------- */
const state = {
  route: 'dashboard',
  connectors: [
    { id:'notion', name:'Notion', bg:'#0f1722', letter:'N', desc:'Pages, wikis and project docs your team writes in.', on:true, count:142, unit:'pages' },
    { id:'gmail', name:'Gmail', bg:'#d9483b', letter:'M', desc:'Client threads, proposals and quotes you have sent.', on:true, count:124, unit:'emails' },
    { id:'drive', name:'Google Drive', bg:'#2f6fed', letter:'D', desc:'Decks, brand guides and contracts in your folders.', on:true, count:64, unit:'files' },
    { id:'slack', name:'Slack', bg:'#5b3d8a', letter:'S', desc:'Internal decisions and context buried in channels.', on:false, count:0, unit:'messages' },
    { id:'whatsapp', name:'WhatsApp', bg:'#0e9f6e', letter:'W', desc:'Approve drafts and get nudges straight on your phone.', on:false, count:0, unit:'chats' },
    { id:'calendar', name:'Calendar', bg:'#c4881a', letter:'C', desc:'Meetings and deadlines the agents schedule around.', on:false, count:0, unit:'events' },
  ],
  agents: [
    { id:'a1', name:'Proposal Drafter', role:'Writes client proposals', color:'green', voice:'Warm, confident, never salesy. Leads with the client’s goal, then scope and a phased budget.', connectors:['Notion','Gmail','Drive'], runs:38 },
    { id:'a2', name:'Pitch Follow-up', role:'Chases quiet leads', color:'blue', voice:'Light, human, low-pressure. A nudge that sounds like Justin, not a CRM.', connectors:['Gmail'], runs:21 },
    { id:'a3', name:'Client Update Writer', role:'Weekly project updates', color:'violet', voice:'Clear and reassuring. Progress, next steps, one honest risk.', connectors:['Slack','Notion'], runs:14 },
  ],
  drafts: [
    { id:'d1', agent:'Proposal Drafter', to:'sarah@stamfordtyres.com', subject:'Rebrand & campaign proposal', preview:'Thanks for the brief, this is exactly the kind of work we love…',
      body:'Hi Sarah,\n\nThanks for the brief, this is exactly the kind of work we love. From what you shared, the heart of it is making a 40 year old name feel current without losing the trust it has earned.\n\nWe would start with a positioning sprint, move into identity, then roll it across your retail and digital touchpoints. I have sketched scope, timeline and a phased budget below so you can see where the value sits.\n\nHappy to walk the team through it whenever suits.\n\nJustin' },
    { id:'d2', agent:'Pitch Follow-up', to:'hello@kopitiamgroup.sg', subject:'Following up on the brand refresh', preview:'No rush at all, just keeping this on your radar…',
      body:'Hi Adeline,\n\nNo rush at all, just keeping this on your radar. You mentioned the new outlet opens in August, so if a refreshed look would help the launch, now is the moment to start.\n\nWant me to put together a quick mood direction so you have something concrete to react to?\n\nJustin' },
    { id:'d3', agent:'Client Update Writer', to:'team@novena-clinic.sg', subject:'Week 3 update: website & brand system', preview:'Quick one on where things stand this week…',
      body:'Hi Dr Tan,\n\nQuick one on where things stand. The brand system is locked and the team loved the warmer palette. The website build is on track, homepage and services pages are in review.\n\nNext week we wire up the booking flow. One honest risk: the photography shoot needs confirming by Friday to keep us on schedule.\n\nJustin' },
  ],
  activity: [
    { ico:'send', tint:'tint-green', text:'<b>Proposal Drafter</b> sent a proposal to Stamford Tyres', t:'12 minutes ago' },
    { ico:'brain', tint:'tint-violet', text:'Brain indexed <b>18 new documents</b> from Notion', t:'1 hour ago' },
    { ico:'check', tint:'tint-green', text:'You approved a follow-up to <b>Kopitiam Group</b>', t:'3 hours ago' },
    { ico:'plug', tint:'tint-blue', text:'<b>Google Drive</b> sync completed, 64 files', t:'Yesterday' },
    { ico:'robot', tint:'tint-amber', text:'<b>Pitch Follow-up</b> drafted 4 nudges for review', t:'Yesterday' },
  ],
};

/* ---------- helpers ---------- */
const $ = (s, r=document) => r.querySelector(s);
function countUp(node, to, suffix=''){
  const dur=900, start=performance.now(); const from=0;
  function step(now){ const p=Math.min(1,(now-start)/dur); const e=1-Math.pow(1-p,3);
    node.textContent = Math.round(from+(to-from)*e).toLocaleString()+suffix;
    if(p<1) requestAnimationFrame(step); }
  requestAnimationFrame(step);
}
function toast(msg){
  let t=$('#toast'); t.innerHTML = ic('check')+`<span>${msg}</span>`; t.classList.add('show');
  clearTimeout(t._tm); t._tm=setTimeout(()=>t.classList.remove('show'), 2600);
}
const connColor = { Notion:'#0f1722', Gmail:'#d9483b', Drive:'#2f6fed', Slack:'#5b3d8a', WhatsApp:'#0e9f6e', Calendar:'#c4881a' };
const agentTint = { green:'tint-green', blue:'tint-blue', violet:'tint-violet', amber:'tint-amber' };

/* ============================================================
   Knowledge graph (canvas)
   ============================================================ */
class KnowledgeGraph {
  constructor(canvas, opts={}){
    this.c = canvas; this.ctx = canvas.getContext('2d');
    this.opts = Object.assign({ height:300, density:1 }, opts);
    this.nodes = []; this.t0 = performance.now();
    this.palette = { core:'#16c98a', Notion:'#cfd6e0', Gmail:'#ff8a7a', Drive:'#7fb0ff', Slack:'#b9a3ee' };
    this.build(); this.resize(); this.loop = this.loop.bind(this);
    window.addEventListener('resize', ()=>this.resize());
    requestAnimationFrame(this.loop);
  }
  build(){
    const cats = ['Notion','Notion','Notion','Gmail','Gmail','Drive','Slack'];
    const n = Math.round(34*this.opts.density);
    this.nodes.push({ core:true, x:0,y:0, tx:0,ty:0, r:13, cat:'core' });
    for(let i=0;i<n;i++){
      const cat = cats[i % cats.length];
      const ang = (i/n)*Math.PI*2 + (Math.random()-.5)*0.5;
      const rad = 70 + Math.random()*120;
      this.nodes.push({
        cat, ang, rad,
        tx: Math.cos(ang)*rad, ty: Math.sin(ang)*rad,
        x: Math.cos(ang)*rad*3, y: Math.sin(ang)*rad*3,
        r: 2.4+Math.random()*3.2, ph: Math.random()*Math.PI*2, sp: .4+Math.random()*.6,
        born: this.t0 + i*38,
      });
    }
  }
  addBurst(cat, k=6){
    const t=performance.now();
    for(let i=0;i<k;i++){
      const ang=Math.random()*Math.PI*2, rad=70+Math.random()*120;
      this.nodes.push({ cat, ang, rad, tx:Math.cos(ang)*rad, ty:Math.sin(ang)*rad,
        x:Math.cos(ang)*rad*3, y:Math.sin(ang)*rad*3, r:2.4+Math.random()*3, ph:Math.random()*6, sp:.5, born:t+i*60 });
    }
  }
  resize(){
    const dpr=window.devicePixelRatio||1; const w=this.c.clientWidth; const h=this.opts.height;
    this.c.width=w*dpr; this.c.height=h*dpr; this.c.style.height=h+'px';
    this.ctx.setTransform(dpr,0,0,dpr,0,0); this.w=w; this.h=h;
  }
  loop(now){
    const ctx=this.ctx, cx=this.w/2, cy=this.h/2;
    ctx.clearRect(0,0,this.w,this.h);
    for(const nd of this.nodes){
      if(nd.core){ nd.x=0; nd.y=0; continue; }
      const live = Math.min(1, Math.max(0,(now-nd.born)/1300));
      const e = 1-Math.pow(1-live,3);
      const drift = live>=1 ? Math.sin(now*0.0006*nd.sp+nd.ph)*6 : 0;
      const driftY = live>=1 ? Math.cos(now*0.0006*nd.sp+nd.ph)*6 : 0;
      nd.x = nd.tx*e + (nd.x*(0)) ; // settle toward target
      nd.x = (nd.tx+drift)*e + (nd.x)*(1-e)*0; nd.x = nd.tx*e + drift;
      nd.y = nd.ty*e + driftY;
      nd.live = live;
    }
    // edges
    ctx.lineWidth=1;
    for(const nd of this.nodes){
      if(nd.core||nd.live<0.15) continue;
      const a=(nd.live)*0.16;
      ctx.strokeStyle=`rgba(120,150,180,${a})`;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+nd.x,cy+nd.y); ctx.stroke();
    }
    // core glow
    const g=ctx.createRadialGradient(cx,cy,2,cx,cy,42);
    g.addColorStop(0,'rgba(22,201,138,.55)'); g.addColorStop(1,'rgba(22,201,138,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,42,0,7); ctx.fill();
    // nodes
    for(const nd of this.nodes){
      if(nd.core){
        ctx.fillStyle='#16c98a'; ctx.beginPath(); ctx.arc(cx,cy,13,0,7); ctx.fill();
        ctx.fillStyle='#04130d'; ctx.font='600 13px Inter'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText('AI',cx,cy+.5);
        continue;
      }
      if(nd.live<=0) continue;
      ctx.globalAlpha=nd.live; ctx.fillStyle=this.palette[nd.cat]||'#cfd6e0';
      ctx.beginPath(); ctx.arc(cx+nd.x,cy+nd.y,nd.r,0,7); ctx.fill(); ctx.globalAlpha=1;
    }
    requestAnimationFrame(this.loop);
  }
}
let GRAPH=null;

/* ============================================================
   Views
   ============================================================ */
function metric(ico,tint,val,lab,trend){
  return `<div class="metric">
    <div class="m-ico ${tint}">${ic(ico)}</div>
    <div class="m-val" data-count="${val}">0</div>
    <div class="m-lab">${lab}</div>
    ${trend?`<div class="m-trend up">${ic('trend')}${trend}</div>`:''}
  </div>`;
}

function viewDashboard(){
  const activeConn = state.connectors.filter(c=>c.on).length;
  const docs = state.connectors.reduce((s,c)=>s+(c.on?c.count:0),0);
  return `
  <div class="view-head row-between">
    <div><h1>Good morning, ${BRAND.owner}</h1><p>Here is what your brain and agents did while you were out.</p></div>
    <button class="btn btn-accent" data-act="new-draft">${ic('spark')} Draft something</button>
  </div>
  <div class="grid cards-4 stagger" style="margin-bottom:18px">
    ${metric('doc','tint-violet',docs,'Documents in your brain','+18 today')}
    ${metric('clock','tint-green',38,'Hours saved this month','+12%')}
    ${metric('inbox','tint-amber',state.drafts.length,'Drafts awaiting you','')}
    ${metric('plug','tint-blue',activeConn,'Connectors active','')}
  </div>
  <div class="grid cards-2" style="grid-template-columns: 1.5fr 1fr;">
    <div class="card card-pad">
      <div class="card-title"><h3>Your knowledge base, live</h3><span class="ti-link">${ic('brain')} self-maintaining</span></div>
      <div class="graph-wrap">
        <canvas id="kg"></canvas>
        <div class="graph-legend">
          <div class="lg"><i style="background:#16c98a"></i> Brain core</div>
          <div class="lg"><i style="background:#cfd6e0"></i> Notion</div>
          <div class="lg"><i style="background:#ff8a7a"></i> Gmail</div>
          <div class="lg"><i style="background:#7fb0ff"></i> Drive</div>
        </div>
        <div class="graph-stat" id="kg-stat">indexing…</div>
      </div>
    </div>
    <div class="card card-pad">
      <div class="card-title"><h3>Recent activity</h3></div>
      <div class="feed">
        ${state.activity.map(a=>`<div class="feed-item">
          <div class="feed-dot ${a.tint}">${ic(a.ico)}</div>
          <div><p>${a.text}</p><div class="t">${a.t}</div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function viewKnowledge(){
  return `
  <div class="view-head row-between">
    <div><h1>Knowledge base</h1><p>Everything ${BRAND.company} knows, pulled together and kept current. This is the memory your agents reason from.</p></div>
    <button class="btn" data-act="goto-connectors">${ic('plus')} Add a source</button>
  </div>
  <div class="card card-pad" style="margin-bottom:16px">
    <div class="card-title"><h3>The brain</h3><span class="ti-link" id="kg-stat2"></span></div>
    <div class="graph-wrap">
      <canvas id="kg"></canvas>
      <div class="graph-legend">
        <div class="lg"><i style="background:#16c98a"></i> Brain core</div>
        <div class="lg"><i style="background:#cfd6e0"></i> Notion</div>
        <div class="lg"><i style="background:#ff8a7a"></i> Gmail</div>
        <div class="lg"><i style="background:#7fb0ff"></i> Drive</div>
      </div>
    </div>
  </div>
  <div class="card card-pad">
    <div class="card-title"><h3>Sources feeding the brain</h3></div>
    ${state.connectors.filter(c=>c.on).map(c=>`
      <div class="src">
        <div class="src-ico" style="background:${c.bg}">${ic('plug')}</div>
        <div class="src-meta">
          <div class="n">${c.name}</div>
          <div class="s">${c.count} ${c.unit} indexed</div>
          <div class="bar"><i data-bar="${70+Math.random()*28}"></i></div>
        </div>
        <div class="src-count">${c.count}</div>
      </div>`).join('')}
  </div>`;
}

function viewConnectors(){
  return `
  <div class="view-head"><h1>Connectors</h1><p>Plug in the tools you already use. Claude reads them to help, it never moves or changes anything without your one-tap approval.</p></div>
  <div class="card card-pad" style="display:flex;gap:12px;align-items:center;margin-bottom:18px;background:var(--accent-wash);border-color:#cdeede">
    ${ic('shield','')}<div style="font-size:13.5px;color:var(--accent-deep);line-height:1.5"><b>Scoped & reversible.</b> Access is permissioned and often read-only. Every outgoing action is approved by you. Revoke any connector in one click.</div>
  </div>
  <div class="grid cards-3 stagger">
    ${state.connectors.map(c=>`
      <div class="conn" data-conn="${c.id}">
        <div class="conn-top">
          <div class="conn-logo" style="background:${c.bg}">${c.letter}</div>
          <button class="switch ${c.on?'on':''}" data-toggle="${c.id}" aria-label="toggle ${c.name}"></button>
        </div>
        <h4>${c.name}</h4>
        <div class="desc">${c.desc}</div>
        <div class="status ${c.on?'on':'off'}" data-status="${c.id}">
          <span class="dot"></span><span class="lbl">${c.on?`Active · ${c.count} ${c.unit}`:'Not connected'}</span>
        </div>
      </div>`).join('')}
  </div>`;
}

function viewAgents(){
  return `
  <div class="view-head row-between">
    <div><h1>Agents</h1><p>Each agent is a role that drafts in ${BRAND.company}’s voice, then routes to you for one-tap approval.</p></div>
    <button class="btn btn-accent" data-act="build-agent">${ic('plus')} Build an agent</button>
  </div>
  <div class="grid cards-3 stagger" id="agent-grid">
    ${state.agents.map(a=>agentCard(a)).join('')}
    <div class="add-card" data-act="build-agent">
      <div class="plus">${ic('plus')}</div>
      <div style="font-weight:550">Build an agent</div>
      <div style="font-size:12.5px;margin-top:3px">in a few questions</div>
    </div>
  </div>`;
}
function agentCard(a){
  return `<div class="agent">
    <div class="agent-head">
      <div class="agent-ava ${agentTint[a.color]}">${ic('robot')}</div>
      <div><h4>${a.name}</h4><div class="role">${a.role}</div></div>
    </div>
    <div class="voice">“${a.voice}”</div>
    <div class="chips">${a.connectors.map(c=>`<span class="chip">${ic('plug')}${c}</span>`).join('')}</div>
    <div class="agent-foot"><span>${ic('bolt')} ${a.runs} runs</span><span>${ic('check')} in ${BRAND.company}’s voice</span></div>
  </div>`;
}

function viewWorkflows(){
  const node=(tag,ico,tint,title,sub)=>`<div class="flow-node"><div class="fn-tag">${tag}</div><div class="fn-row"><div class="fn-ico ${tint}">${ic(ico)}</div><div><h5>${title}</h5><small>${sub}</small></div></div></div>`;
  const arrow=`<div class="flow-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${I.arrow}</svg></div>`;
  return `
  <div class="view-head row-between">
    <div><h1>Workflows</h1><p>Chain a trigger, an agent and an approval step. Nothing reaches a client until you tap approve.</p></div>
    <button class="btn" data-act="toast-soon">${ic('plus')} New workflow</button>
  </div>
  <div class="card card-pad" style="margin-bottom:16px">
    <div class="card-title"><h3>New enquiry → proposal</h3><span class="status on"><span class="dot"></span>Running</span></div>
    <div class="flow">
      ${node('Trigger','mail','tint-blue','New enquiry email','Gmail label: Leads')}
      ${arrow}
      ${node('Brain','brain','tint-violet','Pull context','Past proposals + brand')}
      ${arrow}
      ${node('Agent','robot','tint-green','Proposal Drafter','Drafts in your voice')}
      ${arrow}
      ${node('Approval','user','tint-amber','You approve','One tap on WhatsApp')}
      ${arrow}
      ${node('Action','send','tint-green','Send via Gmail','Logged to brain')}
    </div>
  </div>
  <div class="card card-pad">
    <div class="card-title"><h3>Quiet lead → follow-up nudge</h3><span class="status on"><span class="dot"></span>Running</span></div>
    <div class="flow">
      ${node('Trigger','clock','tint-amber','No reply in 4 days','Watches sent mail')}
      ${arrow}
      ${node('Agent','robot','tint-blue','Pitch Follow-up','Soft, human nudge')}
      ${arrow}
      ${node('Approval','user','tint-amber','You approve','Edit or send')}
      ${arrow}
      ${node('Action','send','tint-green','Send via Gmail','')}
    </div>
  </div>`;
}

function viewApprovals(){
  return `
  <div class="view-head"><h1>Approvals</h1><p>Drafts your agents have prepared. Read, tweak, and send in your voice, or approve from your phone.</p></div>
  <div class="approve-list" id="approve-list">
    ${state.drafts.map(d=>draftRow(d)).join('') || '<div class="empty">All caught up. Nothing waiting for you.</div>'}
  </div>`;
}
function draftRow(d){
  return `<div class="draft-row" data-draft="${d.id}">
    <div class="draft-top"><span class="tag">${d.agent}</span><span class="to">to ${d.to}</span></div>
    <h4>${d.subject}</h4>
    <div class="prev">${d.preview}</div>
  </div>`;
}

const VIEWS = { dashboard:viewDashboard, knowledge:viewKnowledge, connectors:viewConnectors, agents:viewAgents, workflows:viewWorkflows, approvals:viewApprovals };

/* ============================================================
   Router + post-render wiring
   ============================================================ */
function go(route){
  state.route = route;
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.route===route));
  const v = $('#view'); v.classList.remove('view-enter'); void v.offsetWidth;
  v.innerHTML = VIEWS[route](); v.classList.add('view-enter');
  afterRender(route);
}
function afterRender(route){
  // count-up metrics
  document.querySelectorAll('[data-count]').forEach(el=>{
    const to=parseInt(el.dataset.count,10); countUp(el, to);
  });
  // progress bars
  setTimeout(()=>document.querySelectorAll('[data-bar]').forEach(b=>b.style.width=b.dataset.bar+'%'),120);
  // graph
  const kg = $('#kg');
  if(kg){
    const h = route==='knowledge' ? 360 : 300;
    GRAPH = new KnowledgeGraph(kg, { height:h, density: route==='knowledge'?1.3:1 });
    const stat = $('#kg-stat')||$('#kg-stat2');
    const total = state.connectors.filter(c=>c.on).reduce((s,c)=>s+c.count,0);
    if(stat){ let i=0; const tick=setInterval(()=>{ stat.textContent = i<total? `indexing… ${Math.min(total,i)} / ${total}` : `${total} nodes · synced`; i+=Math.ceil(total/30); if(i>total){clearInterval(tick); stat.textContent=`${total} nodes · synced`;} },45); }
  }
}

/* ---------- global click handling ---------- */
document.addEventListener('click', e=>{
  const nav = e.target.closest('.nav-item'); if(nav){ go(nav.dataset.route); return; }
  const act = e.target.closest('[data-act]'); if(act){ handleAct(act.dataset.act); return; }
  const tog = e.target.closest('[data-toggle]'); if(tog){ toggleConnector(tog.dataset.toggle); return; }
  const dr = e.target.closest('[data-draft]'); if(dr){ openDraft(dr.dataset.draft); return; }
  if(e.target.closest('[data-close-drawer]') || e.target.classList.contains('drawer-scrim')) closeDrawer();
});
function handleAct(a){
  if(a==='goto-connectors') return go('connectors');
  if(a==='new-draft' || a==='build-draft') return go('approvals');
  if(a==='build-agent') return openAgentBuilder();
  if(a==='toast-soon') return toast('Workflow builder is in the full build');
}

/* ---------- connectors ---------- */
function toggleConnector(id){
  const c = state.connectors.find(x=>x.id===id); if(!c) return;
  const card = document.querySelector(`[data-conn="${id}"]`);
  const sw = card.querySelector('.switch'); const st = card.querySelector('[data-status]');
  if(c.on){
    c.on=false; c.count=0; sw.classList.remove('on');
    st.className='status off'; st.querySelector('.lbl').textContent='Not connected';
    return;
  }
  // connecting animation
  sw.classList.add('on'); st.className='status connecting'; st.querySelector('.lbl').textContent='Connecting…';
  setTimeout(()=>{
    c.on=true; c.count = c.id==='slack'?86 : c.id==='whatsapp'?1 : c.id==='calendar'?37 : 40;
    st.className='status on'; st.querySelector('.lbl').textContent=`Active · ${c.count} ${c.unit}`;
    toast(`${c.name} connected · indexing into your brain`);
    if(GRAPH) GRAPH.addBurst(c.name==='Slack'?'Slack':'Notion', 7);
  }, 1500);
}

/* ============================================================
   Drawer: agent builder + draft viewer
   ============================================================ */
function openDrawer(title, bodyHTML, footHTML){
  $('#drawer-title').textContent = title;
  $('#drawer-body').innerHTML = bodyHTML;
  $('#drawer-foot').innerHTML = footHTML||'';
  $('#scrim').classList.add('open'); $('#drawer').classList.add('open');
}
function closeDrawer(){ $('#scrim').classList.remove('open'); $('#drawer').classList.remove('open'); }

function openAgentBuilder(){
  const conns = ['Notion','Gmail','Drive','Slack','WhatsApp','Calendar'];
  openDrawer('Build an agent', `
    <div class="field"><label>What should we call it?</label><input id="ab-name" placeholder="e.g. Invoice Chaser" value="Invoice Chaser"></div>
    <div class="field"><label>What is its job?</label><input id="ab-role" placeholder="e.g. Politely chases unpaid invoices" value="Politely chases unpaid invoices"></div>
    <div class="field"><label>Describe its voice</label><textarea id="ab-voice" placeholder="How should it sound?">Friendly but firm. Never awkward about money. Short, with a clear ask and an easy way to pay.</textarea></div>
    <div class="field"><label>Which tools can it use?</label>
      <div class="select-chips" id="ab-conns">
        ${conns.map((c,i)=>`<button class="select-chip ${i<2?'sel':''}" data-pick="${c}">${ic('plug')}${c}</button>`).join('')}
      </div>
    </div>
    <div class="field"><label>How should it reach you?</label>
      <div class="select-chips">
        <button class="select-chip sel">${ic('msg')}WhatsApp approval</button>
        <button class="select-chip">${ic('mail')}Email digest</button>
      </div>
    </div>
  `, `
    <button class="btn" data-close-drawer style="flex:1">Cancel</button>
    <button class="btn btn-accent" id="ab-create" style="flex:1">${ic('spark')} Create agent</button>
  `);
  $('#ab-conns').addEventListener('click', e=>{ const p=e.target.closest('[data-pick]'); if(p) p.classList.toggle('sel'); });
  $('#ab-create').addEventListener('click', createAgent);
}
function createAgent(){
  const name=$('#ab-name').value.trim()||'New Agent';
  const role=$('#ab-role').value.trim()||'Custom agent';
  const voice=$('#ab-voice').value.trim();
  const picks=[...document.querySelectorAll('#ab-conns .select-chip.sel')].map(p=>p.dataset.pick);
  const colors=['amber','blue','violet','green'];
  state.agents.push({ id:'a'+Date.now(), name, role, voice, color:colors[state.agents.length%4], connectors:picks, runs:0 });
  closeDrawer();
  if(state.route==='agents') go('agents');
  toast(`${name} is live and learning your voice`);
}

/* ---------- draft viewer with simulated generation ---------- */
function openDraft(id){
  const d = state.drafts.find(x=>x.id===id); if(!d) return;
  openDrawer('Draft preview', `
    <div class="draft-top" style="margin-bottom:14px"><span class="tag">${d.agent}</span><span class="to">to ${d.to}</span></div>
    <div style="font-weight:600;font-size:15px;margin-bottom:4px">${d.subject}</div>
    <div style="color:var(--muted);font-size:12.5px;margin-bottom:14px">${ic('spark')} drafted in ${BRAND.company}’s voice from 247 documents</div>
    <div class="draft-canvas" id="dc"><div class="thinking"><span class="spin"></span> Reading past proposals and brand voice…</div></div>
    <div class="phone" style="margin-top:18px">
      <div class="phone-screen">
        <div style="font-size:11.5px;color:var(--faint);margin-bottom:7px">${ic('msg')} WhatsApp</div>
        <div class="phone-bubble">Draft for <b>${d.to.split('@')[0]}</b> is ready in your voice. Reply <b>YES</b> to send or <b>EDIT</b> to tweak.</div>
        <div class="phone-actions"><span style="background:var(--line-soft);color:var(--muted)">edit</span><span style="background:var(--accent);color:#fff">yes</span></div>
      </div>
    </div>
  `, `
    <button class="btn" id="dc-edit" style="flex:1">${ic('edit')} Edit first</button>
    <button class="btn btn-accent" id="dc-send" style="flex:1.4" disabled style="opacity:.5">${ic('send')} Approve & send</button>
  `);
  // simulate generation then typewrite
  setTimeout(()=>typewrite($('#dc'), d.body, ()=>{
    const send=$('#dc-send'); send.disabled=false; send.style.opacity='1';
    send.addEventListener('click', ()=>approveDraft(d.id));
    $('#dc-edit').addEventListener('click', ()=>{ $('#dc').setAttribute('contenteditable','true'); $('#dc').focus(); toast('Editing — tweak anything, then approve'); });
  }), 1300);
}
function typewrite(node, text, done){
  node.innerHTML=''; node.classList.add('caret'); let i=0;
  const speed=12;
  (function tick(){
    if(i<=text.length){ node.textContent=text.slice(0,i); i+=2; setTimeout(tick, speed); }
    else { node.classList.remove('caret'); done&&done(); }
  })();
}
function approveDraft(id){
  state.drafts = state.drafts.filter(d=>d.id!==id);
  closeDrawer();
  toast('Sent in your voice · logged to the brain');
  if(state.route==='approvals') go('approvals');
}

/* ============================================================
   Boot
   ============================================================ */
function boot(){
  $('#brand-name').textContent = BRAND.product;
  $('#brand-sub').textContent = BRAND.company;
  $('#brand-mark').textContent = BRAND.mark;
  $('#ws-name').textContent = BRAND.company;
  $('#ws-dot').textContent = BRAND.mark;
  $('#owner-name').textContent = BRAND.owner;
  $('#owner-init').textContent = BRAND.ownerInitials;
  $('#owner-domain').textContent = BRAND.domain;
  // approvals badge
  const badge=$('#approvals-badge'); if(badge) badge.textContent = state.drafts.length;
  go('dashboard');
}
document.addEventListener('DOMContentLoaded', boot);
