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
    courseType: "certification",
    category: "data-science",
    platform: "SAS Academy",
    difficulty: 9,
    duration: 8,
    desc: "Accreditation earned through the MSc at Regent's University London. Statistical analysis, data manipulation, and model building in SAS JMP.",
    skills: ["SAS", "Statistical Analysis", "Data Mining"],
  },
  {
    id: 2,
    name: "Reporting and Analytics",
    courseType: "practical",
    category: "analytics",
    platform: "HandShake Academy",
    difficulty: 3,
    duration: 2.5,
    desc: "Platform-native analytics for student placement tracking. Dashboard creation, automated report scheduling, and data export for Power BI integration.",
    skills: ["Reporting", "Analytics", "Dashboarding"],
  },
  {
    id: 3,
    name: "Data Science by KNIME",
    courseType: "pathway",
    category: "data-science",
    platform: "KNIME via LinkedIn Learning",
    difficulty: 8,
    duration: 7,
    desc: "Six-course path: data science fundamentals, low-code data literacy, AI, classification modelling, and generative AI.",
    skills: ["KNIME", "Data Pipelines", "Machine Learning", "Generative AI"],
  },
  {
    id: 4,
    name: "Adobe InDesign",
    courseType: "pathway",
    category: "visualisation",
    platform: "Adobe via LinkedIn Learning",
    difficulty: 7,
    duration: 5,
    desc: "Professional certificate. Data presentation and layout design applied to 130+ reports at Legal 500 via InDesign Data Merge pipelines.",
    skills: ["InDesign", "Layout Design", "Data Merge", "Print Production"],
  },
  {
    id: 5,
    name: "Intro to AI, ML & LLMs",
    courseType: "course",
    category: "data-science",
    platform: "Sololearn",
    difficulty: 6,
    duration: 7,
    desc: "Introductory overview of AI, ML concepts, and LLMs. Theory, use cases, and practical limitations.",
    skills: ["AI", "Machine Learning", "LLMs"],
  },
  {
    id: 6,
    name: "Data Visualisation Basics",
    courseType: "course",
    category: "visualisation",
    platform: "Sololearn",
    difficulty: 5,
    duration: 2,
    desc: "Chart selection, visual encoding principles, and communicating data clearly to non-technical audiences.",
    skills: ["Data Visualisation", "Chart Design", "Data Storytelling"],
  },
  {
    id: 7,
    name: "Analytics with AI",
    courseType: "course",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 5,
    duration: 7,
    desc: "AI tools augmenting analytics: AI-assisted insight generation, significance testing, and workflow automation.",
    skills: ["AI", "Analytics", "A/B Testing", "Statistics"],
  },
  {
    id: 8,
    name: "Python Intermediate",
    courseType: "practical",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 5,
    duration: 5,
    desc: "Intermediate Python: OOP, data structures, higher-order functions, and lambda expressions.",
    skills: ["Python", "OOP", "Data Structures", "Functions"],
  },
  {
    id: 9,
    name: "Python AI Development",
    courseType: "practical",
    category: "data-science",
    platform: "Mimo",
    difficulty: 8,
    duration: 8,
    desc: "Applied Python for AI: scripts, modules, APIs, and working with LLMs.",
    skills: ["Python", "AI Development", "APIs", "LLMs"],
  },
  {
    id: 10,
    name: "SQL Intermediate",
    courseType: "practical",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 6,
    duration: 8,
    desc: "Intermediate SQL: text functions, CASE/WHEN logic, UNION, and data integrity constraints.",
    skills: ["SQL", "Database Design", "Data Manipulation"],
  },
  {
    id: 11,
    name: "SQL",
    courseType: "practical",
    category: "analytics",
    platform: "Encode",
    difficulty: 3,
    duration: 7,
    desc: "SQL fundamentals: SELECT, filtering, aggregation, JOINs, and relational database concepts.",
    skills: ["SQL", "Databases", "Query Writing", "JOINs"],
  },
  {
    id: 12,
    name: "AI-Powered A/B Testing",
    courseType: "practical",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 6,
    duration: 6,
    desc: "A/B experiment design: p-values, statistical significance, and AI-assisted conversion rate analysis.",
    skills: ["A/B Testing", "Statistics", "p-values", "AI Tools"],
  },
  {
    id: 13,
    name: "Coding for Data",
    courseType: "practical",
    category: "analytics",
    platform: "Sololearn",
    difficulty: 7,
    duration: 7,
    desc: "Python and SQL for data: loops, conditionals, aggregation, filtering, and relational database concepts.",
    skills: ["Python", "SQL", "Data Analysis", "Debugging"],
  },
  {
    id: 14,
    name: "Intro to Probability",
    courseType: "practical",
    category: "mathematics",
    platform: "University of Zurich via Coursera",
    difficulty: 8,
    duration: 3,
    desc: "Probability theory: classical and empirical probability, naive Bayes, binomials, and Q-Q plots.",
    skills: ["Probability", "Statistics", "Bayes", "Excel"],
  },
  {
    id: 15,
    name: "R (Programming)",
    courseType: "practical",
    category: "data-science",
    platform: "Encode",
    difficulty: 9,
    duration: 6,
    desc: "R for data analysis: tidyverse, dplyr, data wrangling, and visualisation with graphs.",
    skills: ["R", "tidyverse", "dplyr", "Data Wrangling"],
  },
  {
    id: 16,
    name: "Data Analytics Essentials",
    courseType: "practical",
    category: "analytics",
    platform: "IBM via edX",
    difficulty: 4,
    duration: 6,
    desc: "IBM/edX. Full analytics workflow: databases, ETL, data wrangling, dashboarding, and storytelling.",
    skills: ["Data Analytics", "ETL", "Databases", "Visualisation"],
  },
  {
    id: 17,
    name: "How Generative AI Will Transform Healthcare",
    shortName: "Gen AI for Healthcare",
    courseType: "course",
    category: "data-science",
    platform: "LinkedIn Learning",
    difficulty: 5,
    duration: 6,
    desc: "Generative AI applications in diagnostics, genomics, and personalised therapies. Covers AI in drug discovery and clinical decision support.",
    skills: ["Generative AI", "Healthcare AI", "Genomics", "Precision Medicine"],
  },
  {
    id: 18,
    name: "Practice It: Python Data Structures",
    shortName: "Python Data Structures",
    courseType: "practical",
    category: "data-science",
    platform: "LinkedIn Learning",
    difficulty: 4.5,
    duration: 5.5,
    desc: "Hands-on practice using Python with a business dataset. Collections modules applied: Counter, deque, namedtuple, defaultdict, and lambda functions.",
    skills: ["Python", "Data Structures", "collections", "Lambda Functions"],
  },
  {
    id: 19,
    name: "Applied AI Fluency and Claude Code",
    shortName: "Anthropic Academy",
    courseType: "course",
    category: "data-science",
    platform: "Anthropic Academy",
    difficulty: 3,
    duration: 5,
    desc: "Three online courses covering generative AI behaviour, the 4D prompting framework, and practical Claude usage including agentic workflows and Claude Code.",
    skills: ["Prompt Engineering", "Agentic AI", "Generative AI", "Claude Code"],
  }
];

/* Dot colours by course type, not category */
const COURSE_TYPE_COLORS = {
  "pathway":       "#c9a84c",   /* gold - structured multi-course programme */
  "certification": "#7d1d3f",   /* burgundy - industry or platform certification */
  "course":        "#1B3A6B",   /* navy - theory/conceptual course */
  "practical":     "#2D6A4F",   /* green - hands-on practical course */
};

/* Still used for category tags in the detail panel */
const CATEGORY_TAG_CLASS = {
  "analytics":     "tag--navy",
  "data-science":  "tag--red",
  "mathematics":   "tag--navy",
  "visualisation": "tag--gold",
};

/* Quadrant label display names */
const QUADRANT_LABELS = {
  "analytics":     "Analytics",
  "data-science":  "Data Science",
  "mathematics":   "Mathematics",
  "visualisation": "Visualisation",
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


  const PAD = 16;
  const mapX = d => PAD + ((d - 1) / 9) * (W - PAD * 2);
  const mapY = d => H - PAD - ((d - 1) / 9) * (H - PAD * 2);

  courses.forEach(c => {
    const x = mapX(c.difficulty);
    const y = mapY(c.duration);
    const isActive  = c.id === activeId;
    const isHovered = c.id === hoverId;
    const col = COURSE_TYPE_COLORS[c.courseType] || '#7da3c8';
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
    const col = COURSE_TYPE_COLORS[c.courseType] || '#7da3c8';
    li.innerHTML = `
      <span class="course-num">${c.id}.</span>
      <span class="course-dot" style="background:${col};box-shadow:0 0 5px ${col}80"></span>
      <span class="course-name">${c.shortName || c.name}</span>
    `;
    li.addEventListener('click', () => selectCourse(c.id));
    list.appendChild(li);
  });
}

/* ── Detail panel ── */
function renderDetail(course) {
  /* Render course-type legend */
  const legend = document.getElementById('courseTypeLegend');
  if (legend && !legend.dataset.built) {
    legend.dataset.built = '1';
    legend.innerHTML = Object.entries(COURSE_TYPE_COLORS).map(([type, col]) => {
      const label = type === 'pathway' ? 'Learning Pathway' : type === 'certification' ? 'Industry Certification' : type === 'practical' ? 'Practical Course' : 'Theory Course';
      return `<span class="ql"><span class="ql-dot" style="background:${col}"></span>${label}</span>`;
    }).join('');
  }

  const panel = document.getElementById('courseDetailPanel');
  if (!panel) return;
  if (!course) {
    panel.innerHTML = `<div class="course-detail-empty"><span>select a course to see details</span></div>`;
    return;
  }
  const typeColor = COURSE_TYPE_COLORS[course.courseType] || '#1B3A6B';
  const typeLabel = course.courseType === 'pathway' ? 'Learning Pathway' : course.courseType === 'certification' ? 'Industry Certification' : course.courseType === 'practical' ? 'Practical Course' : 'Theory Course';
  const catLabel = course.category.replace('-', ' ');
  const skillTags = (course.skills || []).map(s => `<span class="tag tag--navy">${s}</span>`).join('');

  panel.innerHTML = `
    <div class="course-detail-content">
      <div class="cd-type-row"><span class="cd-type-dot" style="background:${typeColor}"></span><span class="cd-type-label">${typeLabel}</span><span class="cd-cat-label">${catLabel}</span></div>
      <h3 class="cd-title">${course.name}</h3>
      <p class="cd-platform">${course.platform}</p>
      <p class="cd-desc"><span class="cd-desc-label">brief summary</span>${course.desc}</p>
      <div class="project-tags">${skillTags}</div>
      <div class="cd-meta">
        <span class="cd-meta-item"><strong>difficulty</strong> ${course.difficulty}/10</span>
        <span class="cd-meta-item"><strong>duration (relative)</strong> ${course.duration}/10</span>
      </div>
    </div>
  `;
}

/* ── Tooltip ── */
function showTooltip(course, canvasX, canvasY) {
  hideTooltip();
  const canvas    = document.getElementById('courseChart');
  const container = canvas.parentElement;
  container.style.position = 'relative';

  const t = document.createElement('div');
  t.id        = 'chart-tooltip';
  t.className = 'chart-tooltip';
  t.textContent = course.name + ' (click to see details below)';

  /* Append off-screen first to measure width */
  t.style.visibility = 'hidden';
  container.appendChild(t);

  /* canvasX/canvasY are relative to the canvas element.
     We need them relative to the container. */
  const canvasOffsetLeft = canvas.offsetLeft;
  const canvasOffsetTop  = canvas.offsetTop;

  const tipW = t.offsetWidth;
  let left = canvasOffsetLeft + canvasX - tipW / 2;
  let top  = canvasOffsetTop  + canvasY - t.offsetHeight - 14;

  /* Keep tooltip within container bounds */
  const containerW = container.offsetWidth;
  left = Math.max(4, Math.min(left, containerW - tipW - 4));

  t.style.left       = left + 'px';
  t.style.top        = top  + 'px';
  t.style.visibility = 'visible';
  t.style.opacity    = '1';
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
    if (!tooltip || !tooltip.textContent.startsWith(hit.name)) {
      drawChart(COURSES, hit.id);
      showTooltip(hit, mx, my);
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
