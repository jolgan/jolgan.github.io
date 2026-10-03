## jolgan.github.io

Portfolio website for Jolene Gan. Built with HTML, CSS, and JavaScript. No frameworks required.

## Site structure

```
/
├── index.html          Home
├── about.html          About
├── portfolio.html      Projects and credentials
├── learning.html       Learning and Development
├── css/
│   ├── global.css      Design system, navigation, buttons
│   ├── animations.css  Scroll fade-in
│   ├── home.css
│   ├── about.css
│   ├── portfolio.css
│   └── learning.css
├── js/
│   ├── main.js         Navigation, carousel, scroll
│   └── courses.js      Course data and interactive chart
└── media/
    ├── certs/          Certificate images
    ├── events/         Event photos
    └── video/          Video files
```

## Adding a new event

Events on learning.html sit in a folder-tab interface: three colour bands (categories), each with year tabs. Every year tab controls one panel, and each panel holds an `event-list` of entry cards.

| Band (category) | Section id | Colour | Year tabs |
|---|---|---|---|
| hackathons & workshops | `#events-hands-on` | gold | 2026 |
| speaking | `#events-speaking` | wine | 2026, 2025 |
| events attended | `#events-attended` | green | 2026, 2023-2025 |

**1. Pick the band.** Hackathons and hands-on workshops go in hands-on, talks you gave go in speaking, everything else you attended goes in events attended.

**2. Pick the year tab.** Find the panel whose id matches the band and the event's year, for example `ld-folder-panel-attended-2026`. Inside its `<div class="event-list">`, paste the card in date order, most recent first:

```html
<div class="event-card">
  <div class="event-img-slot">
    <img src="media/events/your-photo.jpg" alt="Event name" />
  </div>
  <div class="event-body">
    <p class="event-date">Month Year</p>
    <h3 class="event-title">Event Name</h3>
    <p class="event-desc">Brief description.</p>
  </div>
</div>
```

For an event you attended by private invitation, add the label at the end of the date line: `<p class="event-date">London, May 2026 <span class="tag tag--red">by invitation</span></p>`.

**3. Adding a new year tab.** When the first event of a new year arrives for a band (for example the first 2027 talk), add a tab and a panel for it. The newest year goes first:

- In the band's `<div class="ld-folder-tabs">`, add a button before the existing ones:
  `<button type="button" class="ld-folder-tab" id="ld-folder-tab-speaking-2027" aria-expanded="false" aria-controls="ld-folder-panel-speaking-2027">2027</button>`
- Directly after that tabs div, add the matching panel, copying an existing panel's wrapper and its intro line:

```html
<div class="ld-folder-panel" id="ld-folder-panel-speaking-2027" role="region" aria-labelledby="ld-folder-heading-speaking ld-folder-tab-speaking-2027">
  <div class="ld-folder-panel-inner">
    <p class="ld-folder-intro">Talks delivered at industry conferences.</p>
    <div class="event-list">
      <!-- event cards here -->
    </div>
  </div>
</div>
```

- Point the band's heading button (`ld-folder-label`) `aria-controls` at the new first panel, because clicking the band label and jump links open the band's first tab.

No JavaScript changes are needed; main.js picks up every `.ld-folder-tab` and `.ld-folder-panel` on load. Keep about four tabs or fewer per band. When older years grow thin, merge them into a range tab such as `2023-2025` rather than adding more tabs.

## Adding a new course

In js/courses.js, add to the COURSES array:

```javascript
{
  id: 17,
  name: "Course Name",
  category: "analytics",   // analytics | data-science | visualisation | foundations
  platform: "Platform",
  difficulty: 5,            // 1-10
  duration: 4,              // 1-10 (relative)
  desc: "What this course covered.",
  skills: ["Skill 1", "Skill 2"],
},
```

## Adding a new project

In portfolio.html, inside the relevant section, copy an existing `.project-card` block and update the content.

## Replacing a video

In the relevant HTML file, find the `<video>` or `<iframe>` tag and update the `src` attribute to the new file path or URL.
