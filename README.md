# jolgan.github.io

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

## Deploying changes

Upload changed files directly to this repository via "Add file > Upload files" and commit.

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

## Connecting a custom domain (jolenegan.com)

1. In GitHub Pages settings, enter jolenegan.com in the Custom Domain field
2. Log into Wix domain dashboard and find DNS settings for jolenegan.com
3. Add 4 A records pointing to: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
4. Add CNAME record: www pointing to jolgan.github.io
5. Wait up to 24 hours for DNS propagation
6. Enable Enforce HTTPS in GitHub Pages settings once verified

## How to update the live site

You do NOT need to re-upload every file each time. Only upload the specific file(s) that changed:

1. Go to github.com/jolgan/jolgan.github.io
2. Navigate to the file you want to update (e.g. learning.html)
3. Click the pencil (edit) icon
4. Paste in the new content
5. Click Commit changes

For adding new media files (photos/videos), go to the relevant folder and use Add file > Upload files.

The site updates within 1-2 minutes of each commit.

When Claude provides a new zip file, you only need to upload the files that were changed, not the entire zip. Claude will tell you which files were updated in each round.
