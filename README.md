# jolgan.github.io

Portfolio website for Jolene Gan — Data Science & Analytics.

## Structure

```
/
├── index.html          ← Home
├── about.html          ← About / career story
├── portfolio.html      ← Projects & credentials
├── learning.html       ← Learning & Development
├── css/
│   ├── global.css      ← Design system tokens, nav, buttons
│   ├── animations.css  ← Scroll fade-in
│   ├── home.css
│   ├── about.css
│   ├── portfolio.css
│   └── learning.css
├── js/
│   ├── main.js         ← Nav, carousel, scroll behaviour
│   └── courses.js      ← Course data & interactive chart
└── media/
    ├── certs/          ← Certificate images
    ├── events/         ← Event photos
    └── video/          ← Intro video
```

## Deploying to GitHub Pages

1. Create a new GitHub repository named exactly: `jolgan.github.io`
2. Upload all files (drag & drop in GitHub, or use Git)
3. Go to Settings → Pages → Source: Deploy from branch → main → / (root) → Save
4. Your site will be live at https://jolgan.github.io within a few minutes

## Connecting your custom domain (jolenegan.com via Wix)

1. In GitHub Pages settings, enter `jolenegan.com` in the Custom Domain field
2. Log into your Wix domain dashboard (manage.wix.com → Domains)
3. Find DNS settings for jolenegan.com
4. Add 4 A records pointing to GitHub's IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
5. Add a CNAME record: www → jolgan.github.io
6. Wait up to 24 hours for DNS to propagate (usually much faster)
7. Enable "Enforce HTTPS" in GitHub Pages settings once verified

## Adding media

Replace placeholder divs with real content:

**Certificate image:**
```html
<!-- Before -->
<div class="cred-img-placeholder">MSc<br/>Distinction</div>

<!-- After -->
<img src="media/certs/msc-distinction.jpg" alt="MSc Distinction Certificate" />
```

**Event photo:**
```html
<!-- Before -->
<div class="event-img-placeholder">📸</div>

<!-- After -->
<img src="media/events/event-name.jpg" alt="Event description" />
```

**Intro video:**
```html
<!-- In index.html, replace the video-placeholder div with: -->
<video autoplay muted loop playsinline poster="media/video/intro-thumb.jpg">
  <source src="media/video/intro.mp4" type="video/mp4" />
</video>
```

## Adding a new event

In `learning.html`, inside `#events-public` or `#events-private`, copy and paste:

```html
<div class="event-card">
  <div class="event-img-slot">
    <img src="media/events/your-photo.jpg" alt="Event name" />
  </div>
  <div class="event-body">
    <p class="event-date">Month Year</p>
    <h3 class="event-title">Event Name</h3>
    <p class="event-desc">Brief description of the event and what you took away from it.</p>
  </div>
</div>
```

## Adding a new course

In `js/courses.js`, add to the COURSES array:

```javascript
{
  id: 17,                        // next number
  name: "Course Name",
  category: "analytics",         // analytics | data-science | visualisation | foundations
  platform: "Platform Name",
  difficulty: 5,                 // 1–10
  duration: 4,                   // 1–10 (relative)
  desc: "What this course covered and why you did it.",
  skills: ["Skill 1", "Skill 2"],
},
```

## Updating CV link

Once CV is updated, the portfolio link in the nav or contact section can be swapped.
