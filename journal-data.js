import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.js';

const configured = !!SUPABASE_URL && !SUPABASE_URL.includes('YOUR_') && !!SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('YOUR_');
export const isBackendConfigured = configured;

const REST = SUPABASE_URL + '/rest/v1';
const STORAGE = SUPABASE_URL + '/storage/v1';
const authHeaders = { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY };
async function rest(path, opts = {}) {
  const res = await fetch(REST + path, { ...opts, headers: { ...authHeaders, ...(opts.headers || {}) } });
  const text = await res.text();
  if (!res.ok) throw new Error('DB ' + res.status + ': ' + text.slice(0, 200));
  return text ? JSON.parse(text) : null;
}

const iss = ['Vol. 1 · Spring 2025', 'Vol. 1 · Fall 2025', 'Vol. 2 · Spring 2026'];
let n = 0;
const P = (disc, tag, title, author, abstract, issue, pages) => ({
  id: 'd' + (++n), discipline: disc, tag, title, author, abstract,
  issue: iss[issue], pages, date: issue === 2 ? 'May 2026' : issue === 1 ? 'Nov 2025' : 'May 2025', pdf: null, pdfName: '',
});
export const defaultPapers = [
  P('Mathematics', 'Biosecurity', 'An Improved Epidemic Model for Interconnected Networks', 'Alex Chen', 'We extend SIR-type epidemic models to interconnected transit networks, showing that hub-targeted intervention reduces peak infection by up to 34% in simulation.', 2, 'pp. 1–18'),
  P('Computer Science', 'Artificial Intelligence', 'Understanding In-Context Learning: Unraveling Affine Recurrences in GPT-style Models', 'Riley Kim', 'We unravel affine recurrence structures in GPT-style models to explain in-context learning behavior on algorithmic tasks.', 2, 'pp. 19–41'),
  P('Policy', 'Artificial Intelligence', 'A Risk-Based Licensing System for Public Release of Frontier AI Models', 'Morgan Patel', 'A risk-based licensing framework for public release of frontier AI models, drawing on precedents from biosafety and aviation.', 2, 'pp. 42–60'),
  P('Biology', 'Biosecurity', 'Accelerating Platform Technology Development for Pandemic Preparedness', 'Casey Rodriguez', 'We survey platform vaccine technologies and identify bottlenecks where targeted funding accelerates pandemic response timelines.', 2, 'pp. 61–77'),
  P('Philosophy', 'Artificial Intelligence', 'Proposals for Quantitative Measures of Consciousness in AI Systems', 'Quinn Davis', 'We survey candidate quantitative measures of consciousness and assess their applicability to artificial systems.', 2, 'pp. 78–92'),
  P('Mathematics', 'Global Health & Wellbeing', 'Developing the First Mechanistic Forecast for Future Dengue Prevalence', 'Jordan Lee', 'The first mechanistic forecast of future dengue prevalence, coupling climate projections with vector population dynamics.', 1, 'pp. 1–22'),
  P('Computer Science', 'Neurodegenerative Disease', 'Kinematic Integrated Gait Analysis for Alzheimer\u2019s Diagnosis', 'Taylor Wong', 'A kinematic gait-analysis pipeline using commodity depth cameras achieves 89% accuracy in early-stage Alzheimer\u2019s screening.', 1, 'pp. 23–39'),
  P('Physics', 'Climate Change', 'Stratospheric Aerosol Removal Technology', 'Avery Martinez', 'A feasibility study of stratospheric aerosol removal technology and its governance implications.', 1, 'pp. 40–55'),
  P('Social Science', 'Improving Decision Making', 'Developing a Psychological Scale to Measure Scout Mindset', 'Dakota Brown', 'We develop and validate a psychological scale measuring scout mindset — the disposition to seek accurate beliefs over comfortable ones.', 1, 'pp. 56–71'),
  P('Policy', 'Nuclear War', 'New Technologies and the Future of Nuclear Deterrence', 'Sage Garcia', 'How emerging technologies reshape nuclear deterrence, and what stability-preserving policy looks like.', 1, 'pp. 72–88'),
  P('Biology', 'Animal Welfare', 'Mapping Determinants of Zoonotic Spillover', 'Parker Johnson', 'Mapping ecological and economic determinants of zoonotic spillover across 40 years of outbreak data.', 1, 'pp. 89–104'),
  P('Mathematics', 'Improving Decision Making', 'Democratic Reform via Mathematical Analysis', 'Phoenix Anderson', 'A mathematical analysis of ranked-choice and approval voting under strategic behavior, with proposals for reform grounded in social choice theory.', 0, 'pp. 1–16'),
  P('Mathematics', 'Nuclear War', 'Location Modelling for Post-Nuclear Refuge Bunkers', 'Alex Garcia', 'We apply facility-location optimization to identify candidate sites for post-nuclear refuge bunkers, balancing population coverage against fallout exposure.', 0, 'pp. 17–30'),
  P('Computer Science', 'Climate Change', 'Modelling to Maximise the Carbon Sequestration Potential of Seagrass', 'Jordan Chen', 'We model seagrass meadow placement to maximize carbon sequestration, finding coastal-current alignment matters more than total area.', 0, 'pp. 31–47'),
  P('Computer Science', 'Misinformation', 'An Anti-Misinformation Content Recommendation Algorithm', 'Casey Kim', 'A content recommendation algorithm that demotes misinformation while preserving engagement, evaluated on a 12k-post corpus.', 0, 'pp. 48–63'),
  P('Physics', 'Climate Change', 'Greenhouse Effect for Good in Industrial Production', 'Morgan Lee', 'Repurposing the greenhouse effect for industrial process heat, cutting fossil inputs in low-temperature manufacturing.', 0, 'pp. 64–78'),
  P('Physics', 'Space Governance', 'Proposal to Amend the OST for Autonomous Satellites', 'Riley Patel', 'A proposal to amend the Outer Space Treaty to cover autonomous satellite operations and on-orbit liability.', 0, 'pp. 79–92'),
  P('Biology', 'Global Health & Wellbeing', 'Maternal Mortality: Where Can Resources Go Farthest?', 'Taylor Davis', 'A cost-effectiveness analysis of maternal mortality interventions across low-resource health systems.', 0, 'pp. 93–108'),
  P('Social Science', 'Global Health & Wellbeing', 'Designing a Clean Cookstove Intervention Template', 'Avery Wong', 'A field-tested template for clean cookstove interventions, synthesizing evidence from 14 deployment studies.', 0, 'pp. 109–121'),
  P('Social Science', 'Animal Welfare', 'The Impact of Ethical Argument on Moral Attitudes towards Animals', 'Quinn Martinez', 'An experimental study of how ethical argument shifts moral attitudes toward animals, with effects persisting at 30-day follow-up.', 0, 'pp. 122–137'),
  P('Philosophy', 'Space Governance', 'A Foundation for Ethical Space Expansion', 'Dakota Rodriguez', 'A normative foundation for ethical space expansion, weighing existential opportunity against governance risk.', 0, 'pp. 138–150'),
  P('Policy', 'Biosecurity', 'A New Model for DNA Synthesis Screening: Policy Proposal', 'Sage Brown', 'A policy proposal for universal DNA synthesis screening with privacy-preserving verification.', 0, 'pp. 151–166'),
];

const STORAGE_KEY = 'papers_journal_data';
const TABLE = 'papers';
const BUCKET = 'papers-pdfs';

// ── row <-> app-shape mapping ──
function fromRow(r) {
  return { id: r.id, discipline: r.discipline, tag: r.tag, title: r.title, author: r.author, abstract: r.abstract, issue: r.issue, pages: r.pages, date: r.date, pdf: r.pdf_url || null, pdfName: r.pdf_name || '' };
}
function toRow(p) {
  return { title: p.title, author: p.author, discipline: p.discipline, tag: p.tag, issue: p.issue, pages: p.pages, date: p.date, abstract: p.abstract, pdf_url: p.pdf || null, pdf_name: p.pdfName || '' };
}

// ── local-storage fallback (used until backend is configured) ──
function loadLocal() {
  try { const s = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (Array.isArray(s) && s.length) return s; } catch (e) {}
  return defaultPapers;
}
function saveLocal(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

// ── public API (all async so callers work with or without a backend) ──
export async function fetchPapers() {
  if (!configured) return loadLocal();
  try {
    let data = await rest('/' + TABLE + '?select=*&order=created_at.asc');
    if (!data || !data.length) {
      try { await rest('/' + TABLE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(defaultPapers.map(toRow)) }); } catch (e) { console.warn('[journal] seed failed:', e.message); }
      data = await rest('/' + TABLE + '?select=*&order=created_at.asc');
    }
    return (data || []).map(fromRow);
  } catch (e) {
    console.warn('[journal] fetch failed, using local fallback:', e.message);
    return loadLocal();
  }
}

export async function uploadPdf(file) {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = Date.now() + '-' + safe;
  if (!configured) { // local: keep as data URL
    return await new Promise((res) => { const r = new FileReader(); r.onload = () => res({ url: r.result, name: file.name }); r.readAsDataURL(file); });
  }
  const res = await fetch(STORAGE + '/object/' + BUCKET + '/' + encodeURIComponent(path), {
    method: 'POST', headers: { ...authHeaders, 'Content-Type': 'application/pdf' }, body: file,
  });
  if (!res.ok) throw new Error('Upload ' + res.status + ': ' + (await res.text()).slice(0, 200));
  return { url: STORAGE + '/object/public/' + BUCKET + '/' + encodeURIComponent(path), name: file.name };
}

export async function addPaper(p) {
  if (!configured) { const list = loadLocal(); const rec = { id: 'u' + Date.now(), ...p }; saveLocal([...list, rec]); return rec; }
  const data = await rest('/' + TABLE, { method: 'POST', headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify(toRow(p)) });
  return fromRow(data[0]);
}

export async function updatePaper(id, p) {
  if (!configured) { const list = loadLocal().map(x => x.id === id ? { ...x, ...p } : x); saveLocal(list); return list.find(x => x.id === id); }
  const data = await rest('/' + TABLE + '?id=eq.' + encodeURIComponent(id), { method: 'PATCH', headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify(toRow(p)) });
  return fromRow(data[0]);
}

export async function deletePaper(id) {
  if (!configured) { saveLocal(loadLocal().filter(x => x.id !== id)); return; }
  await rest('/' + TABLE + '?id=eq.' + encodeURIComponent(id), { method: 'DELETE' });
}

export async function resetToDefaults() {
  if (!configured) { localStorage.removeItem(STORAGE_KEY); return; }
  await rest('/' + TABLE + '?id=neq.00000000-0000-0000-0000-000000000000', { method: 'DELETE' });
  await rest('/' + TABLE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(defaultPapers.map(toRow)) });
}

// legacy sync helper kept for any older callers
export function loadPapers() { return loadLocal(); }
