const themeConfigs = {
  modern: {
    style: 'modern, clean, minimal with subtle gradients and shadows',
    colors: 'neutral tones with accent colors, white space dominant'
  },
  dark: {
    style: 'dark theme with deep blacks, dark grays, and vibrant accents',
    colors: '#1a1a1a, #2d2d2d, #ffffff, with neon or bright accent colors'
  },
  light: {
    style: 'light, airy, bright with soft colors and plenty of white space',
    colors: '#ffffff, #f5f5f5, soft pastels or warm tones'
  },
  corporate: {
    style: 'professional, corporate, trustworthy with clean lines',
    colors: 'navy blue, white, gray, with professional accent colors'
  },
  glassmorphism: {
    style: 'glassmorphism with frosted glass effects, blur backgrounds, and depth',
    colors: 'transparent overlays, white/light text, with vibrant background gradients'
  }
};

const categoryConfigs = {
  portfolio: 'personal portfolio showcasing work, skills, and achievements',
  restaurant: 'restaurant website with menu, reservations, and ambiance',
  gym: 'gym or fitness center with classes, trainers, and membership info',
  hospital: 'hospital or healthcare with services, doctors, and appointments',
  ecommerce: 'e-commerce store with products, cart, and checkout',
  education: 'educational institution with courses, faculty, and admissions',
  startup: 'startup or SaaS company with product features and pricing',
  agency: 'creative agency or consultancy with services and portfolio',
  general: 'general business or personal website'
};

exports.buildPrompt = (userPrompt, theme = 'modern', category = 'general') => {
  const themeConfig = themeConfigs[theme] || themeConfigs.modern;
  const categoryDesc = categoryConfigs[category] || categoryConfigs.general;

  return `Create a ${categoryDesc} website.

Design Requirements:
- Theme: ${themeConfig.style}
- Color Palette: ${themeConfig.colors}
- Style: Premium, modern, and professional
- Responsive: Mobile-first design
- Interactive: Include hover effects and animations

Content Requirements:
${userPrompt}

Technical Requirements:
- Use CSS custom properties for theming
- Include at least 4 sections (header, main content, features/services, footer)
- Add navigation menu
- Include call-to-action buttons
- Use Font Awesome or Material Icons
- Add smooth scrolling
- Ensure all interactive elements work

The website should look like a real, production-ready site that could be deployed immediately.`;
};