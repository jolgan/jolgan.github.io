/* ============================================================
   COURSE DATA & INTERACTIVE CHART
   All 16 courses from the Gartner-style chart, with positions
   mapped as closely as possible to the original.
   ============================================================ */

const COURSES = [
  {
    id: 1,
    name: "SAS for Data Analysis",
    category: "data-science",
    platform: "SAS",
    difficulty: 8,   // x: 1-10
    duration: 8,     // y: 1-10
    desc: "In-depth data analysis course using SAS software, covering statistical methods and data manipulation techniques. Completed as part of MSc SAS accreditation.",
    skills: ["SAS", "Statistical Analysis", "Data Mining"],
  },
  {
    id: 2,
    name: "Reporting and Analytics",
    category: "analytics",
    platform: "Online course",
    difficulty: 3,
    duration: 3,
    desc: "Foundational course covering principles of reporting and analytics, including structuring data narratives and producing meaningful summaries.",
    skills: ["Reporting", "Analytics", "Data Storytelling"],
  },
  {
    id: 3,
    name: "Data Science by KNIME",
    category: "data-science",
    platform: "KNIME",
    difficulty: 8,
    duration: 7,
    desc: "Hands-on data science course using the KNIME Analytics Platform - a visual, no-code/low-code tool for building data pipelines and ML workflows.",
    skills: ["KNIME", "Data Pipelines", "Machine Learning"],
  },
  {
    id: 4,
    name: "Adobe InDesign",
    category: "visualisation",
    platform: "Adobe / Online",
    difficulty: 7,
    duration: 2,
    desc: "Professional desktop publishing and layout design course. Directly applied at Legal 500 for data report production via InDesign Data Merge pipelines.",
    skills: ["InDesign", "Layout Design", "Data Merge", "Print Production"],
  },
  {
    id: 5,
    name: "Intro to AI, ML & LLMs",
    category: "data-science",
    platform: "Online course",
    difficulty: 6,
    duration: 4,
    desc: "Introductory overview of artificial intelligence, machine learning concepts, and large language models - covering theory, use cases, and limitations.",
    skills: ["AI", "Machine Learning", "LLMs"],
  },
  {
    id: 6,
    name: "Data Visualisation Basics",
    category: "visualisation",
    platform: "Mimo",
    difficulty: 5,
    duration: 2,
    desc: "Foundations of data visualisation: chart selection, visual encoding principles, and communicating data clearly to non-technical audiences.",
    skills: ["Data Visualisation", "Chart Design", "Communication"],
  },
  {
    id: 7,
    name: "Analytics with AI",
    category: "analytics",
    platform: "Online course",
    difficulty: 6,
    duration: 5,
    desc: "Explores how AI tools and techniques can augment traditional analytics workflows - including AI-assisted insight generation and automation.",
    skills: ["AI", "Analytics", "Automation"],
  },
  {
    id: 8,
    name: "Python Intermediate",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 5,
    duration: 5,
    desc: "Intermediate Python programming: object-oriented concepts, data structures, file handling, and an introduction to data-relevant libraries.",
    skills: ["Python", "OOP", "Data Structures"],
  },
  {
    id: 9,
    name: "Python AI Development",
    category: "data-science",
    platform: "Mimo",
    difficulty: 8,
    duration: 8,
    desc: "Applied course covering Python for AI development - including working with ML libraries, APIs, and building AI-powered scripts.",
    skills: ["Python", "AI Development", "ML Libraries"],
  },
  {
    id: 10,
    name: "SQL Intermediate",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 6,
    duration: 8,
    desc: "Intermediate SQL: complex joins, subqueries, window functions, query optimisation, and working with relational databases.",
    skills: ["SQL", "Database Queries", "Window Functions"],
  },
  {
    id: 11,
    name: "SQL",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 3,
    duration: 7,
    desc: "Foundation SQL course covering CRUD operations, filtering, aggregation, and basic relational database concepts.",
    skills: ["SQL", "Databases", "Query Writing"],
  },
  {
    id: 12,
    name: "AI-Powered A/B Testing",
    category: "analytics",
    platform: "Online course",
    difficulty: 6,
    duration: 6,
    desc: "Covers experimental design, statistical significance, and how AI tools can accelerate and improve A/B testing workflows.",
    skills: ["A/B Testing", "Statistics", "AI Tools", "Experimentation"],
  },
  {
    id: 13,
    name: "Coding for Data",
    category: "analytics",
    platform: "Online course",
    difficulty: 6,
    duration: 7,
    desc: "Introduces coding specifically in the context of data tasks - Python scripting, data wrangling, and basic automation for analysts.",
    skills: ["Python", "Data Wrangling", "Automation"],
  },
  {
    id: 14,
    name: "Intro to Probability",
    category: "data-science",
    platform: "Online course",
    difficulty: 7,
    duration: 6,
    desc: "Mathematical foundations of probability theory - essential underpinning for machine learning, statistical inference, and data science.",
    skills: ["Probability", "Statistics", "Mathematics"],
  },
  {
    id: 15,
    name: "R (Programming)",
    category: "data-science",
    platform: "Online course",
    difficulty: 9,
    duration: 4,
    desc: "Introduction to R programming for statistical computing and data analysis - covering data frames, visualisation with ggplot2, and statistical modelling.",
    skills: ["R", "Statistical Computing", "ggplot2"],
  },
  {
    id: 16,
    name: "Data Analytics Essentials",
    category: "analytics",
    platform: "Online course",
    difficulty: 4,
    duration: 6,
    desc: "Foundational course covering the core data analytics workflow: data collection, cleaning, analysis, and communication of findings.",
    skills: ["Data Analytics", "Data Cleaning", "Communication"],
  },
];

const CATEGORY_COLORS = {
  "analytics":     "#7da3c8",
  "data-science":  "#a3274f",
  "foundations":   "#5c5550",
  "visualisation": "#c9a84c",
};

const CATEGORY_TAG_CLASS = {
  "analytics":     "tag--navy",
  "data-science":  "tag--red",
  "foundations":   "tag--navy",
  "visualisation": "tag--gold",
};

/* ── Draw Chart ── */
function drawChart(courses, activeId = null) {
  const canvas = document.getElementById('courseChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;

  // Background
  ctx.fillStyle = 'rgba(26,25,23,0.6)';
  ctx.fillRect(0, 0, W, H);

  // Quadrant divider lines
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Axes
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, H); ctx.lineTo(W, H); // x axis
  ctx.moveTo(0, 0); ctx.lineTo(0, H); // y axis
  ctx.stroke();

  const PAD = 16;
  const mapX = d => PAD + ((d - 1) / 9) * (W - PAD * 2);
  const mapY = d => H - PAD - ((d - 1) / 9) * (H - PAD * 2);

  courses.forEach(c => {
    const x = mapX(c.difficulty);
    const y = mapY(c.duration);
    const isActive = c.id === activeId;
    const color = CATEGORY_COLORS[c.category] || '#888';
    const radius = isActive ? 14 : 12;

    // Glow
    if (isActive) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
    }

    // Circle fill
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = isActive ? color : color + '80';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = isActive ? 2 : 1;
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Number label
    ctx.fillStyle = '#f0ede8';
    ctx.font = `${isActive ? 600 : 400} 9px 'DM Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(c.id, x, y);
  });
}

/* ── Render course list ── */
function renderCourseList(courses, activeId = null) {
  const list = document.getElementById('courseList');
  if (!list) return;
  list.innerHTML = '';
  courses.forEach(c => {
    const li = document.createElement('li');
    li.className = 'course-list-item' + (c.id === activeId ? ' active' : '');
    li.setAttribute('data-id', c.id);

    const color = CATEGORY_COLORS[c.category] || '#888';
    li.innerHTML = `
      <span class="course-num">${c.id}.</span>
      <span class="course-dot" style="background:${color};box-shadow:0 0 5px ${color}80"></span>
      <span class="course-name">${c.name}</span>
    `;
    li.addEventListener('click', () => selectCourse(c.id));
    list.appendChild(li);
  });
}

/* ── Render detail panel ── */
function renderDetail(course) {
  const panel = document.getElementById('courseDetailPanel');
  if (!panel) return;
  if (!course) {
    panel.innerHTML = `<div class="course-detail-empty"><span>← Select a course to see details</span></div>`;
    return;
  }
  const tagClass = CATEGORY_TAG_CLASS[course.category] || 'tag--navy';
  const categoryLabel = course.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const skillTags = (course.skills || []).map(s => `<span class="tag tag--navy">${s}</span>`).join('');

  panel.innerHTML = `
    <div class="course-detail-content">
      <span class="tag ${tagClass} cd-category">${categoryLabel}</span>
      <h3 class="cd-title">${course.name}</h3>
      <p class="cd-platform">${course.platform}</p>
      <p class="cd-desc">${course.desc}</p>
      <div class="project-tags">${skillTags}</div>
      <div class="cd-meta">
        <span class="cd-meta-item"><strong>Difficulty</strong> ${course.difficulty}/10</span>
        <span class="cd-meta-item"><strong>Duration (relative)</strong> ${course.duration}/10</span>
      </div>
    </div>
  `;
}

/* ── Select course ── */
let activeId = null;
function selectCourse(id) {
  activeId = activeId === id ? null : id;
  const course = activeId ? COURSES.find(c => c.id === activeId) : null;
  renderCourseList(COURSES, activeId);
  renderDetail(course);
  resizeAndDraw();

  // scroll detail panel into view on mobile
  if (window.innerWidth < 900 && course) {
    document.getElementById('courseDetailPanel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ── Click on canvas ── */
function handleChartClick(e) {
  const canvas = document.getElementById('courseChart');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const W = rect.width, H = rect.height;
  const PAD = 16;
  const mapX = d => PAD + ((d - 1) / 9) * (W - PAD * 2);
  const mapY = d => H - PAD - ((d - 1) / 9) * (H - PAD * 2);

  let hit = null;
  COURSES.forEach(c => {
    const cx = mapX(c.difficulty);
    const cy = mapY(c.duration);
    const dist = Math.hypot(mouseX - cx, mouseY - cy);
    if (dist < 14) hit = c.id;
  });
  if (hit !== null) selectCourse(hit);
}

/* ── Resize & redraw ── */
function resizeAndDraw() {
  const canvas = document.getElementById('courseChart');
  if (!canvas) return;
  // Force layout recalc
  canvas.style.width = '100%';
  canvas.style.height = '';
  const w = canvas.parentElement.clientWidth - 100;
  canvas.style.height = w + 'px';
  drawChart(COURSES, activeId);
}

/* ── Init ── */
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('courseChart');
  if (!canvas) return;

  renderCourseList(COURSES, null);
  renderDetail(null);

  // Initial size
  setTimeout(() => {
    resizeAndDraw();
    canvas.addEventListener('click', handleChartClick);
  }, 100);

  window.addEventListener('resize', () => {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(resizeAndDraw, 150);
  });
});
