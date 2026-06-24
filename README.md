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

In learning.html, inside the `#events-public` or `#events-private` section, copy and paste:

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
