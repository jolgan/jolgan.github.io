/* ============================================================
   COURSE DATA & INTERACTIVE CHART
   Clickable numbered dots with tooltip callouts.
   Clicking a dot OR a list item highlights both and
   opens the detail panel.
   ============================================================ */

const COURSES = [
  {
    id: 1,
    name: "SAS for Data Analysis",
    category: "data-science",
    platform: "SAS Academy",
    difficulty: 8,
    duration: 8,
    desc: "In-depth data analysis using SAS software. Completed as part of the MSc SAS Academy accreditation at Regent's University London.",
    skills: ["SAS", "Statistical Analysis", "Data Mining"],
  },
  {
    id: 2,
    name: "Reporting and Analytics",
    category: "analytics",
    platform: "HandShake Academy",
    difficulty: 3,
    duration: 3,
    desc: "Principles of reporting and analytics including dashboard creation, automated report scheduling, and report customisation. Completed during internship involvement with HandShake.",
    skills: ["Reporting", "Analytics", "Dashboarding"],
  },
  {
    id: 3,
    name: "Data Science by KNIME",
    category: "data-science",
    platform: "KNIME via LinkedIn Learning",
    difficulty: 8,
    duration: 7,
    desc: "Six-course professional learning path accredited by KNIME. Covers data science fundamentals, low code/no-code data literacy, AI, classification modelling, generative AI, and non-technical skills of effective data scientists.",
    skills: ["KNIME", "Data Pipelines", "Machine Learning", "Generative AI"],
  },
  {
    id: 4,
    name: "Adobe InDesign",
    category: "visualisation",
    platform: "Adobe via LinkedIn Learning",
    difficulty: 7,
    duration: 2,
    desc: "Professional data presentation and layout design for print and digital publishing. Directly applied at Legal 500 for data report production via InDesign Data Merge pipelines.",
    skills: ["InDesign", "Layout Design", "Data Merge", "Print Production"],
  },
  {
    id: 5,
    name: "Intro to AI, ML & LLMs",
    category: "data-science",
    platform: "Sololearn",
    difficulty: 6,
    duration: 4,
    desc: "Introductory overview of artificial intelligence, machine learning concepts, and large language models. Covers theory, use cases, and practical limitations.",
    skills: ["AI", "Machine Learning", "LLMs"],
  },
  {
    id: 6,
    name: "Data Visualisation Basics",
    category: "visualisation",
    platform: "Sololearn",
    difficulty: 5,
    duration: 2,
    desc: "Foundations of data visualisation: chart selection, visual encoding principles, and communicating data clearly to non-technical audiences using AI-assisted tools.",
    skills: ["Data Visualisation", "Chart Design", "Data Storytelling"],
  },
  {
    id: 7,
    name: "Analytics with AI",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 6,
    duration: 5,
    desc: "How AI tools and techniques augment traditional analytics workflows, including AI-assisted insight generation, significance testing, and automation.",
    skills: ["AI", "Analytics", "A/B Testing", "Statistics"],
  },
  {
    id: 8,
    name: "Python Intermediate",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 5,
    duration: 5,
    desc: "Intermediate Python: object-oriented programming, data structures, higher-order functions, lambda expressions, and data hiding for secure code.",
    skills: ["Python", "OOP", "Data Structures", "Functions"],
  },
  {
    id: 9,
    name: "Python AI Development",
    category: "data-science",
    platform: "Mimo",
    difficulty: 8,
    duration: 8,
    desc: "Applied Python for AI development covering Python essentials, functional and object-oriented programming paradigms, building scripts, working with modules and APIs, and working with LLMs.",
    skills: ["Python", "AI Development", "APIs", "LLMs"],
  },
  {
    id: 10,
    name: "SQL Intermediate",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 6,
    duration: 8,
    desc: "Intermediate SQL: text manipulation functions, CASE/WHEN logic, AUTO_INCREMENT, UNION vs UNION ALL, and SQL constraints for data integrity.",
    skills: ["SQL", "Database Design", "Data Manipulation"],
  },
  {
    id: 11,
    name: "SQL",
    category: "analytics",
    platform: "Encode",
    difficulty: 3,
    duration: 7,
    desc: "Hands-on SQL fundamentals: SELECT, filtering, aggregation, JOINs, INSERT, DELETE, and foreign key relationships. Practical refresher course.",
    skills: ["SQL", "Databases", "Query Writing", "JOINs"],
  },
  {
    id: 12,
    name: "AI-Powered A/B Testing",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 6,
    duration: 6,
    desc: "Statistical significance testing for A/B experiments. p-values, the 5% industry standard threshold, and using AI to calculate conversion rates and drive product decisions. Completed as preparatory self-learning for the 2025 UX Design Conference.",
    skills: ["A/B Testing", "Statistics", "p-values", "AI Tools"],
  },
  {
    id: 13,
    name: "Coding for Data",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 6,
    duration: 7,
    desc: "Python and SQL for data analysis: data type conversion, loops, conditionals, list operations, SQL aggregation, filtering, sorting, and relational database concepts.",
    skills: ["Python", "SQL", "Data Analysis", "Debugging"],
  },
  {
    id: 14,
    name: "Intro to Probability",
    category: "data-science",
    platform: "University of Zurich via Coursera",
    difficulty: 7,
    duration: 6,
    desc: "Mathematical foundations of probability. Classical, empirical, and subjective probabilities, probability trees, naive Bayes, binomials, Q-Q plots, and Excel statistical functions.",
    skills: ["Probability", "Statistics", "Bayes", "Excel"],
  },
  {
    id: 15,
    name: "R (Programming)",
    category: "data-science",
    platform: "Encode",
    difficulty: 9,
    duration: 4,
    desc: "Data analysis techniques using R: objects, vectors, packages (tidyverse, dplyr), reading CSVs, data wrangling, and data visualisation with graphs.",
    skills: ["R", "tidyverse", "dplyr", "Data Wrangling"],
  },
  {
    id: 16,
    name: "Data Analytics Essentials",
    category: "analytics",
    platform: "IBM via edX",
    difficulty: 4,
    duration: 6,
    desc: "Foundational data analytics: data file formats, relational databases, NoSQL, ETL, data wrangling, dashboarding, visualisation, and storytelling. Authorised by IBM.",
    skills: ["Data Analytics", "ETL", "Databases", "Visualisation"],
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

/* ── Tooltip state ── */
let tooltip = null;
let activeId = null;

/* ── Draw chart ── */
function drawChart(courses, hoverId = null) {
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

  ctx.fillStyle = 'rgba(26,25,23,0.6)';
  ctx.fillRect(0, 0, W, H);

  /* Quadrant dividers */
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, H/2); ctx.lineTo(W, H/2); ctx.stroke();
  ctx.setLineDash([]);

  const PAD = 16;
  const mapX = d => PAD + ((d - 1) / 9) * (W - PAD * 2);
  const mapY = d => H - PAD - ((d - 1) / 9) * (H - PAD * 2);

  courses.forEach(c => {
    const x = mapX(c.difficulty);
    const y = mapY(c.duration);
    const isActive  = c.id === activeId;
    const isHovered = c.id === hoverId;
    const col = CATEGORY_COLORS[c.category] || '#888';
    const r = (isActive || isHovered) ? 14 : 11;

    if (isActive || isHovered) {
      ctx.shadowColor = col;
      ctx.shadowBlur  = 16;
    }

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = (isActive || isHovered) ? col : col + '70';
    ctx.fill();
    ctx.strokeStyle = col;
    ctx.lineWidth   = (isActive || isHovered) ? 2 : 1;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#f0ede8';
    ctx.font = `${(isActive || isHovered) ? '600' : '400'} 8.5px 'DM Mono', monospace`;
    ctx.textAlign     = 'center';
    ctx.textBaseline  = 'middle';
    ctx.fillText(c.id, x, y);
  });
}

/* ── Course list ── */
function renderCourseList(courses) {
  const list = document.getElementById('courseList');
  if (!list) return;
  list.innerHTML = '';
  courses.forEach(c => {
    const li = document.createElement('li');
    li.className = 'course-list-item' + (c.id === activeId ? ' active' : '');
    li.setAttribute('data-id', c.id);
    const col = CATEGORY_COLORS[c.category] || '#888';
    li.innerHTML = `
      <span class="course-num">${c.id}.</span>
      <span class="course-dot" style="background:${col};box-shadow:0 0 5px ${col}80"></span>
      <span class="course-name">${c.name}</span>
    `;
    li.addEventListener('click', () => selectCourse(c.id));
    list.appendChild(li);
  });
}

/* ── Detail panel ── */
function renderDetail(course) {
  const panel = document.getElementById('courseDetailPanel');
  if (!panel) return;
  if (!course) {
    panel.innerHTML = `<div class="course-detail-empty"><span>select a course to see details</span></div>`;
    return;
  }
  const tagClass = CATEGORY_TAG_CLASS[course.category] || 'tag--navy';
  const catLabel = course.category.replace('-', ' ');
  const skillTags = (course.skills || []).map(s => `<span class="tag tag--navy">${s}</span>`).join('');

  panel.innerHTML = `
    <div class="course-detail-content">
      <span class="tag ${tagClass} cd-category">${catLabel}</span>
      <h3 class="cd-title">${course.name}</h3>
      <p class="cd-platform">${course.platform}</p>
      <p class="cd-desc">${course.desc}</p>
      <div class="project-tags">${skillTags}</div>
      <div class="cd-meta">
        <span class="cd-meta-item"><strong>difficulty</strong> ${course.difficulty}/10</span>
        <span class="cd-meta-item"><strong>duration (relative)</strong> ${course.duration}/10</span>
      </div>
    </div>
  `;
}

/* ── Tooltip ── */
function showTooltip(course, canvasX, canvasY, canvasRect) {
  hideTooltip();
  const t = document.createElement('div');
  t.id = 'chart-tooltip';
  t.className = 'chart-tooltip';
  t.textContent = course.name;

  const container = document.getElementById('courseChart').parentElement;
  container.style.position = 'relative';
  container.appendChild(t);

  /* Position above the dot */
  const scaleX = canvasRect.width  / (parseFloat(document.getElementById('courseChart').style.width)  || canvasRect.width);
  t.style.left   = (canvasX - t.offsetWidth / 2) + 'px';
  t.style.top    = (canvasY - 32) + 'px';
  t.style.opacity = '1';
  tooltip = t;
}

function hideTooltip() {
  if (tooltip) { tooltip.remove(); tooltip = null; }
}

/* ── Select course ── */
function selectCourse(id) {
  activeId = (activeId === id) ? null : id;
  const course = activeId ? COURSES.find(c => c.id === activeId) : null;
  renderCourseList(COURSES);
  renderDetail(course);
  resizeAndDraw();

  if (window.innerWidth < 900 && course) {
    document.getElementById('courseDetailPanel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ── Canvas mouse events ── */
function getHitCourse(e) {
  const canvas = document.getElementById('courseChart');
  if (!canvas) return null;
  const rect  = canvas.getBoundingClientRect();
  const mx    = e.clientX - rect.left;
  const my    = e.clientY - rect.top;
  const W = rect.width, H = rect.height;
  const PAD = 16;
  const mapX = d => PAD + ((d - 1) / 9) * (W - PAD * 2);
  const mapY = d => H - PAD - ((d - 1) / 9) * (H - PAD * 2);

  let hit = null;
  COURSES.forEach(c => {
    if (Math.hypot(mx - mapX(c.difficulty), my - mapY(c.duration)) < 14) hit = c;
  });
  return { hit, mx, my, rect };
}

let hoverCourse = null;

function handleChartMouseMove(e) {
  const { hit, mx, my, rect } = getHitCourse(e);
  const canvas = document.getElementById('courseChart');

  if (hit) {
    canvas.style.cursor = 'pointer';
    if (!tooltip || tooltip.textContent !== hit.name) {
      drawChart(COURSES, hit.id);
      showTooltip(hit, mx, my, rect);
      hoverCourse = hit;
    }
  } else {
    canvas.style.cursor = 'default';
    if (hoverCourse) {
      hoverCourse = null;
      hideTooltip();
      drawChart(COURSES, null);
    }
  }
}

function handleChartClick(e) {
  const { hit } = getHitCourse(e);
  if (hit) {
    hideTooltip();
    selectCourse(hit.id);
  }
}

function handleChartMouseLeave() {
  hoverCourse = null;
  hideTooltip();
  drawChart(COURSES, null);
}

/* ── Resize and redraw ── */
function resizeAndDraw() {
  const canvas = document.getElementById('courseChart');
  if (!canvas) return;
  canvas.style.width = '100%';
  canvas.style.height = '';
  const w = canvas.parentElement.clientWidth - 80;
  canvas.style.height = w + 'px';
  drawChart(COURSES, null);
}

/* ── Init ── */
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('courseChart');
  if (!canvas) return;

  renderCourseList(COURSES);
  renderDetail(null);

  setTimeout(() => {
    resizeAndDraw();
    canvas.addEventListener('click',      handleChartClick);
    canvas.addEventListener('mousemove',  handleChartMouseMove);
    canvas.addEventListener('mouseleave', handleChartMouseLeave);
  }, 100);

  window.addEventListener('resize', () => {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(resizeAndDraw, 150);
  });
});
