const pptxgen = require("/home/claude/.npm-global/lib/node_modules/pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "skillsXchange Business Plan";

// ── Color Palette ──
const C = {
  navy:    "0D1B4B",
  teal:    "0D9488",
  tealLt:  "14B8A6",
  mint:    "CCFBF1",
  white:   "FFFFFF",
  offWhite:"F8FAFC",
  slate:   "475569",
  slateXL: "64748B",
  dark:    "1E293B",
  accent:  "F59E0B",
  red:     "EF4444",
  green:   "10B981",
  purple:  "7C3AED",
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.10 });

// ════════════════════════════════════
// SLIDE 1 — TITLE
// ════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Left accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.teal }, line: { color: C.teal } });

  // Tagline badge
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.1, w: 3.8, h: 0.38, fill: { color: C.teal }, line: { color: C.teal }, rectRadius: 0.05 });
  s.addText("PEER-TO-PEER SKILL EXCHANGE PLATFORM", { x: 0.5, y: 1.1, w: 3.8, h: 0.38, fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  // Title
  s.addText("skillsXchange", { x: 0.4, y: 1.65, w: 6.5, h: 1.1, fontSize: 54, bold: true, color: C.white, fontFace: "Arial Black", margin: 0 });

  // Subtitle
  s.addText("Learn Anything. Teach Everything. Exchange Value.", { x: 0.4, y: 2.8, w: 6.5, h: 0.55, fontSize: 18, color: C.tealLt, italic: true, margin: 0 });

  // Divider line
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.45, w: 4.5, h: 0.04, fill: { color: C.slateXL }, line: { color: C.slateXL } });

  // Meta info
  s.addText("Business Plan 2026  |  Confidential", { x: 0.4, y: 3.6, w: 5, h: 0.35, fontSize: 11, color: C.slateXL, margin: 0 });

  // Right side — big stat cards
  const stats = [
    { val: "500M+", lbl: "Target Market" },
    { val: "FREE",  lbl: "Cost to Learn" },
    { val: "₹85 Cr", lbl: "Year 5 Revenue" },
  ];
  stats.forEach((st, i) => {
    const cx = 7.2, cy = 1.2 + i * 1.4;
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 2.5, h: 1.1, fill: { color: "122366" }, line: { color: C.teal, pt: 1 }, shadow: makeShadow() });
    s.addText(st.val, { x: cx, y: cy + 0.05, w: 2.5, h: 0.55, fontSize: 26, bold: true, color: C.tealLt, align: "center", fontFace: "Arial Black", margin: 0 });
    s.addText(st.lbl, { x: cx, y: cy + 0.6, w: 2.5, h: 0.35, fontSize: 11, color: C.slateXL, align: "center", margin: 0 });
  });

  // Footer
  s.addText("© 2026 skillsXchange  |  All rights reserved", { x: 0.4, y: 5.2, w: 9.2, h: 0.28, fontSize: 9, color: "334155", align: "center", margin: 0 });
}

// ════════════════════════════════════
// SLIDE 2 — INTRODUCTION & OBJECTIVE
// ════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };

  // Header bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("INTRODUCTION & OBJECTIVE", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 13, bold: true, color: C.white, valign: "middle", charSpacing: 3, margin: 0 });

  // Mission card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 0.95, w: 9.4, h: 0.85, fill: { color: C.teal }, line: { color: C.teal }, shadow: makeShadow() });
  s.addText([
    { text: "Mission: ", options: { bold: true } },
    { text: "Empower students to learn and teach skills peer-to-peer — making quality education accessible, social, and free of financial barriers." }
  ], { x: 0.3, y: 0.95, w: 9.4, h: 0.85, fontSize: 13, color: C.white, valign: "middle", margin: [0, 12, 0, 12] });

  // Two-column: What & Why
  const leftX = 0.3, rightX = 5.1;

  s.addText("What is skillsXchange?", { x: leftX, y: 2.0, w: 4.5, h: 0.38, fontSize: 14, bold: true, color: C.navy, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: leftX, y: 2.4, w: 4.5, h: 2.5, fill: { color: C.white }, line: { color: "E2E8F0", pt: 1 }, shadow: makeShadow() });
  s.addText([
    { text: "A mobile-first platform where students exchange skills via barter", options: { bullet: true, breakLine: true } },
    { text: "Teach what you know → Learn what you need", options: { bullet: true, breakLine: true } },
    { text: "AI-powered smart matching in under 60 seconds", options: { bullet: true, breakLine: true } },
    { text: "Built-in HD video studio — no third-party tools needed", options: { bullet: true, breakLine: true } },
    { text: "Verified skill badges build real credibility", options: { bullet: true } },
  ], { x: leftX + 0.15, y: 2.5, w: 4.2, h: 2.25, fontSize: 12, color: C.dark, paraSpaceAfter: 4 });

  s.addText("Why does it matter?", { x: rightX, y: 2.0, w: 4.5, h: 0.38, fontSize: 14, bold: true, color: C.navy, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: rightX, y: 2.4, w: 4.5, h: 2.5, fill: { color: C.white }, line: { color: "E2E8F0", pt: 1 }, shadow: makeShadow() });
  s.addText([
    { text: "Premium courses cost ₹500–5,000+ per student", options: { bullet: true, breakLine: true } },
    { text: "73% of online learners feel isolated; 90%+ drop MOOCs", options: { bullet: true, breakLine: true } },
    { text: "Teaching a concept boosts knowledge retention to 90%", options: { bullet: true, breakLine: true } },
    { text: "Students have skills to offer but no structured way to exchange", options: { bullet: true, breakLine: true } },
    { text: "500M+ students globally underserved by existing platforms", options: { bullet: true } },
  ], { x: rightX + 0.15, y: 2.5, w: 4.2, h: 2.25, fontSize: 12, color: C.dark, paraSpaceAfter: 4 });

  // Footer
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.37, w: 10, h: 0.25, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("skillsXchange  |  Business Plan 2026", { x: 0, y: 5.37, w: 10, h: 0.25, fontSize: 8, color: "94A3B8", align: "center", valign: "middle", margin: 0 });
}

// ════════════════════════════════════
// SLIDE 3 — MARKET OPPORTUNITY (Data Insight)
// ════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("DATA INSIGHT 1  |  MARKET OPPORTUNITY", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 13, bold: true, color: C.white, valign: "middle", charSpacing: 3, margin: 0 });

  // TAM / SAM / SOM funnel visual (bar chart)
  s.addChart(pres.charts.BAR, [{
    name: "Addressable Users (Millions)",
    labels: ["TAM — Global Students", "SAM — English 16-28 India/SEA", "SOM — Early Adopters"],
    values: [500, 100, 1.5]
  }], {
    x: 0.3, y: 0.9, w: 5.8, h: 3.6,
    barDir: "bar",
    chartColors: [C.teal, C.tealLt, C.accent],
    chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.slate,
    valAxisLabelColor: C.slate,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: C.dark,
    showLegend: false,
    showTitle: true,
    title: "Market Size (Millions of Users)",
    titleColor: C.navy,
    titleFontSize: 12,
  });

  // Right side stat callouts
  const cards = [
    { val: "$254B", lbl: "Global EdTech Market (2025)", color: C.teal },
    { val: "16%", lbl: "Annual CAGR Growth Rate", color: C.purple },
    { val: "250M+", lbl: "Online Learners in India", color: C.accent },
    { val: "900M+", lbl: "Smartphone Users in India", color: C.green },
  ];
  cards.forEach((c, i) => {
    const cx = 6.4, cy = 0.95 + i * 0.88;
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 3.3, h: 0.72, fill: { color: C.white }, line: { color: "E2E8F0", pt: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 0.08, h: 0.72, fill: { color: c.color }, line: { color: c.color } });
    s.addText(c.val, { x: cx + 0.15, y: cy + 0.04, w: 1.2, h: 0.35, fontSize: 20, bold: true, color: c.color, fontFace: "Arial Black", margin: 0 });
    s.addText(c.lbl, { x: cx + 0.15, y: cy + 0.37, w: 3.0, h: 0.28, fontSize: 10, color: C.slate, margin: 0 });
  });

  // Caption
  s.addText("skillsXchange targets the underserved peer-learning niche within a booming EdTech market.", {
    x: 0.3, y: 4.65, w: 9.4, h: 0.4, fontSize: 11, color: C.slate, italic: true, align: "center", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.37, w: 10, h: 0.25, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("skillsXchange  |  Business Plan 2026", { x: 0, y: 5.37, w: 10, h: 0.25, fontSize: 8, color: "94A3B8", align: "center", valign: "middle", margin: 0 });
}

// ════════════════════════════════════
// SLIDE 4 — FINANCIAL PROJECTIONS (Data Insight)
// ════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("DATA INSIGHT 2  |  FINANCIAL PROJECTIONS (3-YEAR)", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 13, bold: true, color: C.white, valign: "middle", charSpacing: 3, margin: 0 });

  // Revenue bar chart (in Lakhs)
  s.addChart(pres.charts.BAR, [
    {
      name: "Total Revenue (₹ Lakhs)",
      labels: ["Year 1", "Year 2", "Year 3"],
      values: [14.35, 150, 700]
    }
  ], {
    x: 0.3, y: 0.9, w: 5.5, h: 3.3,
    barDir: "col",
    chartColors: [C.teal, C.tealLt, C.navy],
    chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.slate,
    valAxisLabelColor: C.slate,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: C.dark,
    showLegend: false,
    showTitle: true,
    title: "Revenue Growth (₹ Lakhs)",
    titleColor: C.navy,
    titleFontSize: 12,
  });

  // Right: key metrics table
  s.addText("Key Metrics at a Glance", { x: 6.0, y: 0.95, w: 3.7, h: 0.38, fontSize: 13, bold: true, color: C.navy, margin: 0 });

  const rows = [
    [{ text: "Metric", options: { bold: true, color: C.white, fill: { color: C.navy } } },
     { text: "Year 1", options: { bold: true, color: C.white, fill: { color: C.navy } } },
     { text: "Year 3", options: { bold: true, color: C.white, fill: { color: C.navy } } }],
    ["Total Users", "1,00,000", "20,00,000"],
    ["MAU", "30,000", "6,00,000"],
    ["Premium Subscribers", "2,400", "72,000"],
    ["Gross Margin", "~83%", "~96%"],
    ["Break-even", "Month 18", "Profitable"],
  ];
  s.addTable(rows, {
    x: 6.0, y: 1.4, w: 3.7, h: 2.5,
    border: { pt: 0.5, color: "E2E8F0" },
    fill: { color: C.white },
    fontSize: 10,
    color: C.dark,
    align: "center",
    valign: "middle",
    rowH: 0.37,
  });

  // Revenue streams donut
  s.addChart(pres.charts.DOUGHNUT, [{
    name: "Revenue Mix (Year 3)",
    labels: ["Premium (₹149/mo)", "Business Tier", "Commission"],
    values: [432, 179, 85]
  }], {
    x: 5.9, y: 3.85, w: 3.8, h: 1.5,
    chartColors: [C.teal, C.navy, C.accent],
    showLegend: true,
    legendPos: "r",
    legendFontSize: 9,
    showPercent: true,
    holeSize: 55,
    showTitle: true,
    title: "Year 3 Revenue Mix (₹ Lakhs)",
    titleColor: C.navy,
    titleFontSize: 10,
    chartArea: { fill: { color: C.offWhite } },
  });

  s.addText("Break-even projected at Month 18, with 96% gross margin by Year 3.", {
    x: 0.3, y: 4.3, w: 5.5, h: 0.38, fontSize: 11, color: C.slate, italic: true, align: "center", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.37, w: 10, h: 0.25, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("skillsXchange  |  Business Plan 2026", { x: 0, y: 5.37, w: 10, h: 0.25, fontSize: 8, color: "94A3B8", align: "center", valign: "middle", margin: 0 });
}

// ════════════════════════════════════
// SLIDE 5 — COMPETITIVE LANDSCAPE (Data Insight)
// ════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("DATA INSIGHT 3  |  COMPETITIVE LANDSCAPE", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 13, bold: true, color: C.white, valign: "middle", charSpacing: 3, margin: 0 });

  // Feature comparison radar-like using grouped bar
  s.addChart(pres.charts.BAR, [
    { name: "Udemy/Coursera", labels: ["Zero Cost", "Peer Interaction", "Skill Earn", "AI Matching", "India Focus"], values: [0, 0, 0, 0, 1] },
    { name: "Chegg Tutors",   labels: ["Zero Cost", "Peer Interaction", "Skill Earn", "AI Matching", "India Focus"], values: [0, 1, 1, 0, 0] },
    { name: "skillsXchange",  labels: ["Zero Cost", "Peer Interaction", "Skill Earn", "AI Matching", "India Focus"], values: [1, 1, 1, 1, 1] },
  ], {
    x: 0.3, y: 0.85, w: 5.8, h: 3.5,
    barDir: "bar",
    barGrouping: "clustered",
    chartColors: ["CBD5E1", "94A3B8", C.teal],
    chartArea: { fill: { color: C.white }, roundedCorners: true },
    catAxisLabelColor: C.slate,
    valAxisLabelColor: C.slateXL,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    legendFontSize: 9,
    showTitle: true,
    title: "Feature Availability (1 = Yes, 0 = No)",
    titleColor: C.navy,
    titleFontSize: 12,
    valAxisMaxVal: 1,
  });

  // Right: unique advantage callout
  s.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 0.85, w: 3.4, h: 1.25, fill: { color: C.teal }, line: { color: C.teal }, shadow: makeShadow() });
  s.addText("Unique Position", { x: 6.3, y: 0.87, w: 3.4, h: 0.38, fontSize: 13, bold: true, color: C.white, align: "center", margin: 0 });
  s.addText("The ONLY platform where every student is both a teacher AND a learner.", {
    x: 6.3, y: 1.25, w: 3.4, h: 0.78, fontSize: 11, color: C.white, align: "center", italic: true, valign: "middle", margin: [0, 8, 0, 8]
  });

  // Comparison mini-table
  const compRows = [
    [{ text: "Platform", options: { bold: true, color: C.white, fill: { color: C.navy } } },
     { text: "Cost/Course", options: { bold: true, color: C.white, fill: { color: C.navy } } },
     { text: "Model", options: { bold: true, color: C.white, fill: { color: C.navy } } }],
    ["Udemy", "₹500–5,000", "Course Sales"],
    ["Chegg Tutors", "₹800–2,000/hr", "Commission"],
    ["Discord", "Free (informal)", "None"],
    [{ text: "skillsXchange", options: { bold: true, color: C.teal } }, { text: "FREE (Barter)", options: { bold: true, color: C.teal } }, { text: "Freemium", options: { bold: true, color: C.teal } }],
  ];
  s.addTable(compRows, {
    x: 6.3, y: 2.25, w: 3.4, h: 2.1,
    border: { pt: 0.5, color: "E2E8F0" },
    fill: { color: C.white },
    fontSize: 10,
    color: C.dark,
    align: "center",
    valign: "middle",
    rowH: 0.38,
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.37, w: 10, h: 0.25, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("skillsXchange  |  Business Plan 2026", { x: 0, y: 5.37, w: 10, h: 0.25, fontSize: 8, color: "94A3B8", align: "center", valign: "middle", margin: 0 });
}

// ════════════════════════════════════
// SLIDE 6 — KEY FINDINGS & ANALYSIS
// ════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("KEY FINDINGS & ANALYSIS", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 13, bold: true, color: C.white, valign: "middle", charSpacing: 3, margin: 0 });

  // SWOT as 4-quadrant grid
  const quads = [
    { label: "STRENGTHS", color: C.teal,   x: 0.3,  y: 0.9,  items: ["Zero-cost barter model drives mass adoption", "Network effects: more users = better matches", "Science-backed: teaching boosts retention to 90%", "Both sides of market on one platform"] },
    { label: "WEAKNESSES", color: "EF4444", x: 5.1,  y: 0.9,  items: ["Chicken-and-egg cold start challenge", "Session quality depends on user ability", "Early stage — limited brand recognition", "Barter credit system open to gaming"] },
    { label: "OPPORTUNITIES", color: "10B981", x: 0.3, y: 3.05, items: ["EdTech CAGR of 16% globally", "India's NEP 2020 promotes peer learning", "Expansion: SE Asia, MENA, Africa (Year 3+)", "Corporate upskilling market (Year 3)"] },
    { label: "THREATS", color: C.accent,  x: 5.1,  y: 3.05, items: ["LinkedIn Learning may copy barter model", "Low willingness to pay in student segment", "Data privacy & DPDPA compliance risks", "Seasonal drop during exam periods"] },
  ];

  quads.forEach(q => {
    s.addShape(pres.shapes.RECTANGLE, { x: q.x, y: q.y, w: 4.6, h: 2.0, fill: { color: "0F2452" }, line: { color: q.color, pt: 1.5 } });
    s.addShape(pres.shapes.RECTANGLE, { x: q.x, y: q.y, w: 4.6, h: 0.38, fill: { color: q.color }, line: { color: q.color } });
    s.addText(q.label, { x: q.x, y: q.y, w: 4.6, h: 0.38, fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", charSpacing: 2, margin: 0 });
    s.addText(q.items.map(i => ({ text: i, options: { bullet: true, breakLine: true } })), {
      x: q.x + 0.1, y: q.y + 0.44, w: 4.35, h: 1.45, fontSize: 10, color: "CBD5E1", paraSpaceAfter: 2
    });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.37, w: 10, h: 0.25, fill: { color: "0A1232" }, line: { color: "0A1232" } });
  s.addText("skillsXchange  |  Business Plan 2026", { x: 0, y: 5.37, w: 10, h: 0.25, fontSize: 8, color: "334155", align: "center", valign: "middle", margin: 0 });
}

// ════════════════════════════════════
// SLIDE 7 — PRODUCT & GTM ROADMAP
// ════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("KEY FINDINGS  |  PRODUCT ROADMAP & GTM STRATEGY", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 13, bold: true, color: C.white, valign: "middle", charSpacing: 3, margin: 0 });

  // 3-phase timeline
  const phases = [
    {
      label: "Phase 1",
      period: "Months 1–3",
      title: "Seed & Validate",
      color: C.teal,
      items: ["MVP: 20+ skill categories", "Basic AI matching + video studio", "Closed beta at 5 partner colleges", "Target: 5,000 active users"]
    },
    {
      label: "Phase 2",
      period: "Months 4–8",
      title: "Content-Led Growth",
      color: C.purple,
      items: ["Verified Skill Badges via assessments", "Group sessions (up to 6)", "Premium launch at ₹149/month", "Target: 50,000 MAU, ₹30 Lac revenue"]
    },
    {
      label: "Phase 3",
      period: "Months 9–18",
      title: "Scale & Monetise",
      color: C.accent,
      items: ["Institutional accounts for colleges", "Commission marketplace (10% cut)", "AI personalised learning paths", "Target: 2,00,000 MAU, ₹1.2 Cr ARR"]
    }
  ];

  // Timeline connector bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.52, y: 2.4, w: 8.9, h: 0.06, fill: { color: "CBD5E1" }, line: { color: "CBD5E1" } });

  phases.forEach((ph, i) => {
    const cx = 0.4 + i * 3.15;

    // Phase card
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 0.9, w: 2.9, h: 4.15, fill: { color: C.white }, line: { color: "E2E8F0", pt: 1 }, shadow: makeShadow() });

    // Phase header
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 0.9, w: 2.9, h: 0.75, fill: { color: ph.color }, line: { color: ph.color } });
    s.addText(ph.label, { x: cx, y: 0.9, w: 2.9, h: 0.38, fontSize: 14, bold: true, color: C.white, align: "center", fontFace: "Arial Black", margin: 0 });
    s.addText(ph.period, { x: cx, y: 1.28, w: 2.9, h: 0.35, fontSize: 10, color: C.white, align: "center", margin: 0 });

    // Circle on timeline
    s.addShape(pres.shapes.OVAL, { x: cx + 1.25, y: 2.3, w: 0.25, h: 0.25, fill: { color: ph.color }, line: { color: ph.color } });

    // Title
    s.addText(ph.title, { x: cx + 0.1, y: 1.72, w: 2.7, h: 0.38, fontSize: 12, bold: true, color: ph.color, align: "center", margin: 0 });

    // Items
    s.addText(ph.items.map(it => ({ text: it, options: { bullet: true, breakLine: true } })), {
      x: cx + 0.12, y: 2.65, w: 2.65, h: 2.25, fontSize: 10, color: C.dark, paraSpaceAfter: 5
    });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.37, w: 10, h: 0.25, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("skillsXchange  |  Business Plan 2026", { x: 0, y: 5.37, w: 10, h: 0.25, fontSize: 8, color: "94A3B8", align: "center", valign: "middle", margin: 0 });
}

// ════════════════════════════════════
// SLIDE 8 — CONCLUSION & RECOMMENDATIONS
// ════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("CONCLUSION & RECOMMENDATIONS", { x: 0.4, y: 0, w: 9, h: 0.75, fontSize: 13, bold: true, color: C.white, valign: "middle", charSpacing: 3, margin: 0 });

  // Summary statement
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 0.9, w: 9.4, h: 0.72, fill: { color: "0F2452" }, line: { color: C.teal, pt: 1 } });
  s.addText("skillsXchange is positioned to disrupt the ₹8,000 Cr+ Indian EdTech market with a zero-cost, network-driven, peer-first learning model that no major platform currently offers.", {
    x: 0.3, y: 0.9, w: 9.4, h: 0.72, fontSize: 12, color: "CBD5E1", italic: true, valign: "middle", align: "center", margin: [0, 10, 0, 10]
  });

  // 5-year vision stats
  const visions = [
    { val: "1 Cr+",  lbl: "Users by Year 5",       color: C.teal },
    { val: "₹85 Cr", lbl: "Revenue by Year 5",      color: C.accent },
    { val: "10",     lbl: "Countries by Year 5",    color: C.purple },
    { val: "500+",   lbl: "University Partnerships", color: C.green },
  ];
  visions.forEach((v, i) => {
    const cx = 0.3 + i * 2.38;
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.78, w: 2.2, h: 1.1, fill: { color: "0F2452" }, line: { color: v.color, pt: 1 }, shadow: makeShadow() });
    s.addText(v.val, { x: cx, y: 1.82, w: 2.2, h: 0.55, fontSize: 24, bold: true, color: v.color, align: "center", fontFace: "Arial Black", margin: 0 });
    s.addText(v.lbl, { x: cx, y: 2.35, w: 2.2, h: 0.38, fontSize: 10, color: "94A3B8", align: "center", margin: 0 });
  });

  // Recommendations
  s.addText("Recommendations", { x: 0.3, y: 3.05, w: 9.4, h: 0.38, fontSize: 14, bold: true, color: C.tealLt, margin: 0 });

  const recs = [
    { num: "01", title: "Prioritise Cold-Start Fix", body: "Pre-seed platform by recruiting 1,000 skilled founding students before public launch to ensure match quality from Day 1." },
    { num: "02", title: "Invest in AI Matching Early", body: "The matching engine is the core IP — allocate engineering resources to ML pipeline from Month 1, not as an afterthought." },
    { num: "03", title: "Campus Partnerships as Moat", body: "Secure MoUs with 50+ colleges in Year 1. Institutional accounts create switching costs and defend against copycats." },
    { num: "04", title: "Drive Premium Conversion", body: "Contextual upsell after 5 free sessions — show users the value before asking them to pay. Target 8% conversion rate." },
  ];

  recs.forEach((r, i) => {
    const col = i < 2 ? 0 : 1;
    const row = i % 2;
    const cx = 0.3 + col * 4.8;
    const cy = 3.55 + row * 0.82;
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 4.5, h: 0.72, fill: { color: "0F2452" }, line: { color: "1E3A6E", pt: 0.5 } });
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 0.5, h: 0.72, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText(r.num, { x: cx, y: cy, w: 0.5, h: 0.72, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(r.title, { x: cx + 0.55, y: cy + 0.05, w: 3.85, h: 0.28, fontSize: 11, bold: true, color: C.tealLt, margin: 0 });
    s.addText(r.body, { x: cx + 0.55, y: cy + 0.33, w: 3.85, h: 0.35, fontSize: 9, color: "94A3B8", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.37, w: 10, h: 0.25, fill: { color: "0A1232" }, line: { color: "0A1232" } });
  s.addText("© 2026 skillsXchange  |  All Rights Reserved  |  Confidential", { x: 0, y: 5.37, w: 10, h: 0.25, fontSize: 8, color: "334155", align: "center", valign: "middle", margin: 0 });
}

// ── Write file ──
pres.writeFile({ fileName: "/home/claude/skillsXchange_Presentation.pptx" })
  .then(() => console.log("DONE"))
  .catch(e => { console.error(e); process.exit(1); });