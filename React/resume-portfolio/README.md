# Resume Portfolio - Mandar Vyas

A modern, responsive portfolio website built with React and TypeScript, featuring an interactive game center.

## Features

- **Responsive Design**: Works perfectly on all devices (mobile, tablet, desktop)
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Games**: Built-in game center with 4 different games
- **Performance Optimized**: Fast loading with Framer Motion animations
- **TypeScript**: Type-safe development experience
- **Accessibility**: WCAG compliant with proper focus management

## Sections

1. **Hero**: Introduction with profile card and stats
2. **About**: Personal information and career highlights
3. **Experience**: Professional work history with timeline
4. **Skills**: Technical skills organized by category
5. **Contact**: Contact information and links
6. **Game Center**: Interactive games including:
   - Tic Tac Toe (vs AI)
   - Rock Paper Scissors
   - Snake Game
   - Typing Speed Test

## Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: CSS3 with CSS Custom Properties
- **Animations**: Framer Motion
- **Build Tool**: Create React App
- **Font**: Inter (UI) + JetBrains Mono (code)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
cd React/resume-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Header/              # Navigation header
│   ├── Hero/                # Hero section
│   ├── About/               # About section
│   ├── Experience/          # Work experience
│   ├── Skills/              # Technical skills
│   ├── Contact/             # Contact information
│   ├── Footer/              # Footer
│   ├── GameCenter/          # Game center hub
│   └── Games/               # Individual games
│       ├── TicTacToe/
│       ├── RockPaperScissors/
│       ├── Snake/
│       └── TypingTest/
├── data/
│   └── portfolio.ts         # Portfolio content
├── types/
│   └── index.ts             # TypeScript types
├── App.tsx                  # Main app component
├── index.tsx               # Entry point
└── index.css               # Global styles
```

## Customization

To customize the portfolio for your own use:

1. Update the content in `src/data/portfolio.ts`
2. Replace personal information, experience, and skills
3. Modify colors in `src/index.css` CSS custom properties
4. Update the favicon and logo in the `public/` folder

## Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- Mobile-first responsive design
- Optimized animations with Framer Motion
- Lazy loading for game components
- Efficient re-renders with React.memo and useCallback

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Mandar Vyas - [mandar.vyas@example.com](mailto:mandar.vyas@example.com)

Project Link: [https://github.com/mandarvyas/resume-portfolio](https://github.com/mandarvyas/resume-portfolio)
