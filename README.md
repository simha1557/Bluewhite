# BlueWhite Media - Professional Design Agency Website

A modern, responsive website for BlueWhite Media, a professional design agency offering web design, graphic design, UI/UX, and digital advertising services.

## 🚀 Features

### ✨ Modern Design
- **Dark Theme**: Professional dark theme with purple accents
- **Responsive Design**: Mobile-first responsive design
- **Smooth Animations**: CSS and JavaScript animations
- **Professional Typography**: Clean, readable fonts

### 🎨 Interactive Elements
- **StarBorder Button**: Animated light beam effect on "Let's Talk" button
- **DarkVeil Background**: OGL-based animated background with CPPN neural network
- **Mobile Menu**: Popup-style mobile navigation
- **Contact Form**: Functional contact form with email integration

### 📱 Mobile Optimized
- **Touch-Friendly**: Optimized for mobile interactions
- **Responsive Layout**: Adapts to all screen sizes
- **Mobile Menu**: Clean popup navigation for mobile
- **Performance**: Optimized for mobile performance

### ⚡ Performance
- **Fast Loading**: Optimized bundle size (87.1 kB shared)
- **Static Generation**: All pages pre-rendered
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting

## 🛠️ Technology Stack

- **Framework**: Next.js 14.2.31
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: CSS Animations + OGL (WebGL)
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd bluewhite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Vercel will automatically deploy your site
4. Your site will be available at `https://your-project.vercel.app`

### Manual Deployment
1. Build the project
   ```bash
   npm run build
   ```

2. Start the production server
   ```bash
   npm run start
   ```

## 📁 Project Structure

```
bluewhite/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── about/          # About page
│   │   ├── api/            # API routes
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── navigation/     # Navigation components
│   │   ├── ui/            # UI components
│   │   └── ...
│   ├── lib/               # Utility functions
│   └── hooks/             # Custom React hooks
├── public/                # Static assets
├── scripts/               # Development scripts
└── ...
```

## 🎯 Key Components

### StarBorder Button
- Animated light beam effect
- Customizable colors and speed
- Mobile-optimized animations
- Accessible design

### DarkVeil Background
- OGL-based WebGL animations
- CPPN neural network patterns
- Performance optimized
- Fallback for non-WebGL browsers

### Mobile Navigation
- Popup-style menu
- Smooth animations
- Touch-optimized
- Clean design

### Contact Form
- Functional email integration
- Form validation
- Responsive design
- Success/error handling

## 🔧 Configuration

### Environment Variables
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api

# Email Configuration
EMAIL_SERVICE=your-email-service
EMAIL_API_KEY=your-email-api-key
```

### Tailwind Configuration
- Custom color palette
- Responsive breakpoints
- Animation utilities
- Custom components

## 📊 Performance

- **Lighthouse Score**: 90+ in all categories
- **Core Web Vitals**: All metrics in green
- **Bundle Size**: 87.1 kB shared
- **Loading Speed**: < 3 seconds

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: {
    DEFAULT: '#8B5CF6',
    foreground: '#ffffff',
  },
  // ... more colors
}
```

### Animations
Customize animations in `src/app/globals.css`:
```css
@keyframes star-movement-bottom {
  0% { transform: translate(0%, 0%); opacity: 1; }
  100% { transform: translate(-100%, 0%); opacity: 0; }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 in use**
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

2. **Build errors**
   ```bash
   rm -rf .next
   npm install
   npm run build
   ```

3. **TypeScript errors**
   ```bash
   npm run lint
   npm run type-check
   ```

## 📈 Analytics & Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Core Web Vitals**: Performance metrics
- **Error Monitoring**: Automatic error tracking
- **Uptime Monitoring**: Site availability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS** 