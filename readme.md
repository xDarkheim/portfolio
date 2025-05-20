<!-- 
Copyright (c) 2024 Dmytro Hovenko
All rights reserved.
-->
# Portfolio Website

A modern, responsive portfolio website for showcasing professional skills and projects.

## Features

- Responsive design with mobile optimization
- Dark/light theme toggle
- Multi-language support (English, Russian, Ukrainian, Polish)
- Optimized loading and rendering performance
- Google Analytics integration

## Project Structure

```
Portfolio/
├── css/                 # Modular CSS files
│   ├── base.css         # Base styles, variables, and resets
│   ├── components.css   # Reusable component styles
│   ├── layout.css       # Layout and grid styling
│   ├── main.css         # Main CSS file that imports all others
│   ├── sections.css     # Section-specific styles
│   ├── themes.css       # Theme variables and styles
│   └── utilities.css    # Utility classes and responsive styles
│
├── js/                  # JavaScript modules
│   ├── core/            # Core functionality
│   │   ├── animations.js # Animation effects
│   │   ├── navigation.js # Navigation functionality
│   │   └── theme.js     # Theme switching
│   │
│   ├── lang/            # Internationalization
│   │   ├── index.js     # Language module entry point
│   │   ├── lang-core.js # Language switching functionality
│   │   └── translations/ # Language translations
│   │       ├── en.json  # English translations
│   │       ├── ru.json  # Russian translations
│   │       ├── uk.json  # Ukrainian translations
│   │       └── pl.json  # Polish translations
│   │
│   └── main.js          # Main JavaScript entry point
│
├── images/              # Image assets
│   ├── backgrounds/     # Background images
│   ├── flags/           # Language flag icons
│   └── icons/           # General icons
│
├── index.htm            # Main HTML file
└── readme.md            # Project documentation
```

## Usage

1. Clone the repository
2. Customize the content in the HTML and translations
3. Update the personal information and projects
4. Deploy to a web hosting service

## Customization

### Adding a New Language

1. Create a new JSON file for the language in the `js/lang/translations/` directory (e.g., `es.json` for Spanish). Ensure the JSON structure matches existing translation files.
2. Add the language flag icon (e.g., `es.png`) to the `images/flags/` directory.
3. Update the language selector in the `index.htm` file by adding a new button for the language, similar to existing ones:
   ```html
   <button class="lang-btn" data-lang="es" title="Español" aria-label="Switch to Spanish">
       <img src="images/flags/es.png" alt="Español" width="24" height="18">
   </button>
   ```
   The `lang-core.js` module will automatically handle loading the new JSON file based on the `data-lang` attribute.

### Adding New Projects

1. Duplicate the project card structure in the HTML
2. Update the content and images
3. Add any project-specific translations

## Performance Optimizations

- Lazy loading for images
- CSS and JS minification (in production)
- Font optimization
- Mobile-specific performance improvements

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

All rights reserved.
