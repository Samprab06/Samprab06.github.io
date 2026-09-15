# Personal Portfolio Website - Design Documentation

## Overview
A premium, single-page personal portfolio website for **Samridh Prabhakar**, a Computer Engineering student at Purdue University specializing in embedded systems and semiconductors. Built as a static site for GitHub Pages - pure HTML/CSS/JS, no build tools.

## Design Direction: "Hardware & Deep Tech"
Deep dark mode palette inspired by oscilloscope interfaces and cleanroom environments. The signature visual identity is rooted in the photolithography process - specifically the amber safelight glow of a fab cleanroom.

---

## Design Decisions (Interview Log)

### 1. Accent Color - Photolith Amber (`#E8960A`)
- Inspired by the amber safelight glow in photolithography cleanrooms
- A blend between golden yellow (#EED202) and orange trending toward red
- Chosen over standard teal/blue to create a unique identity rooted in the subject's actual work environment
- On a midnight-dark background, it appears to emit light rather than just sit on a surface

### 2. Typography
| Role | Typeface | Weight | Usage |
|------|----------|--------|-------|
| Display | Space Grotesk | 700 | Name, section titles |
| Body | IBM Plex Sans | 400, 500 | Paragraphs, descriptions |
| Utility | IBM Plex Mono | 400 | Tech tags, captions, dates |

**Rationale:** Space Grotesk provides geometric, engineered precision for headings. IBM Plex Sans carries semiconductor/computing heritage (designed by IBM). IBM Plex Mono for technical labels maintains the industrial lineage.

### 3. Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0B0F19` | Page background (deep midnight blue-black) |
| `--surface` | `#141A2A` | Card backgrounds, timeline content |
| `--surface-hover` | `#1C2438` | Interactive element hover states |
| `--border` | `#1E293B` | Dividers, card borders |
| `--text-primary` | `#F5F5F5` | Headers, emphasis text |
| `--text-body` | `#9CA3AF` | Body paragraphs |
| `--text-muted` | `#6B7280` | Captions, secondary info |
| `--accent` | `#E8960A` | CTAs, active states, glow effects |
| `--accent-hover` | `#F0A020` | Button/link hover |
| `--accent-glow` | `rgba(232, 150, 10, 0.3)` | Box-shadow glow effects |
| `--timeline-inactive` | `#374151` | Past timeline markers |

### 4. Page Sections (Final Order)
1. **Hero** - Name, title, intro, CTAs, wafer photo (desktop only, hidden on mobile)
2. **Experience** - Vertical timeline, most recent first. MMH Labs is Oct-Dec 2025 (past, not present).
3. **Projects** - Text-based cards with hover/tap overlay, sorted by status (Completed / In Progress)
4. **Footer** - Education, contact links, copyright

**Removed:** Skills section - experience and projects demonstrate skills more effectively than a list.

**Layout Fix (v2):** Hero shifted up - removed `min-height: 100vh`, reduced padding so experience section peeks into view on initial load.

### 5. Hero Layout
- **Desktop (≥768px):** Split layout - text left (55%), photo right (40%)
- **Mobile (<768px):** Name leads. Photo is hidden entirely. Full-width stacked CTAs.
- Photo: User will provide a photo of themselves with a wafer. Placeholder div with initials "SP" until photo is added.

### 6. Experience Section
- Vertical timeline, newest first
- Amber dots for active/current positions ("Present")
- Gray dots for past positions
- Each entry: role, organization, date range, 1-2 line description
- Scroll-triggered reveal animation (fade up via IntersectionObserver)

### 7. Project Cards (v3 - Featured Work & More Projects)
- Dual-tier project hierarchy designed for rapid recruiter evaluation:
  - **Featured Work:** Top 2x2 grid highlighting the 4 core pillars: Robotics Systems Leadership (TARS), IoT/Embedded ML (TidalGate), Custom Cryptographic Hardware (RP2354 FIDO2), and Cleanroom Processing & Advanced Packaging (Birck Nanotechnology Center).
  - **More Projects:** 3-column catalog of embedded, Linux driver, analog audio, and operating systems projects.
- Cards show project name + tags on the face; clicking any card opens the modal overlay with complete technical descriptions, links, and multi-asset galleries.

### 7b. Project Inventory
**Featured Work:**
1. **TARS: Autonomous Mobile Robot** - Multidisciplinary engineering & leadership (15-member team, Interstellar-inspired robotics)
2. **TidalGate: Predictive Tidal Energy** - Telemetry buoy & embedded ML (🏆 DataHacks '26 @ UCSD)
3. **RP2354 FIDO2 Security Key** - Custom RP2354 PCB & hardware authenticator with integrated FIDO2 firmware
4. **Semiconductor Fabrication & Advanced Packaging** - DRIE TSV development, ALD automation for TMD transistors, cleanroom photolithography & SPC metrology (with research poster link)

**More Projects:**
1. Embedded Multiplayer Tetris System - ESP32 handheld with dynamic heuristic ranking engine
2. Location-Based Digital Compass - Raspberry Pi GPS navigator with OLED
3. KDE Custom Touchpad Drivers - Plasma 6 gesture daemon for precision Linux touchpads
4. Analog Audio Equalizer - Active 3-band RC filter equalizer with LM324 and LM386 power amp
5. Electronic Dice - 555 and 4017 IC digital logic circuit
6. ESP32Slim Dev Board - High-density breadboard development platform with USB OTG
7. 74-Series 4-Bit ALU - Discrete 74HC logic hexadecimal calculator paired with Arduino
8. Keti OS - 32-bit x86 Operating System (contributing libraries & bug fixes)

### 8. Navigation
- Minimal fixed header, top-right corner
- Contact icons: Email, LinkedIn, GitHub (monochrome, amber on hover)
- Resume pill button (outlined, amber border)
- Mobile: Icons hidden, replaced by a floating action button (FAB) that expands to reveal links

### 9. Signature Element - Photolithography Exposure Reveal
- On first page load, a dark curtain covers the page
- An amber glow line sweeps left-to-right, revealing content like UV light through a photomask
- Duration: ~1.5s with cubic-bezier easing
- Hero content stagger-fades-in after the sweep
- Plays once per session (sessionStorage)
- Respects `prefers-reduced-motion` (skipped entirely)

### 10. Footer
- Contact links repeated (email, LinkedIn, GitHub, resume) with a prominent "Get in Touch" call to action heading.
- © 2026 Samridh Prabhakar

---

## File Structure
```
Samprab06.github.io/
├── index.html          # Main single-page HTML
├── styles.css          # Complete CSS with design tokens
├── script.js           # Interactions and animations
├── DESIGN.md           # This documentation file
├── IMG_0773.heic       # Original wafer photo (HEIC source)
└── assets/
    └── photo.jpg       # Converted wafer photo (hero section)
```

---

## How to Update

### Adding a New Project
1. In `index.html`, locate the appropriate projects group (`Completed` or `In Progress`)
2. Replace a `project-placeholder` card with a full `project-card` element
3. Add the project image to `assets/`
4. Fill in: image src, project name, tech tags, description, and GitHub URL
5. Example card structure is documented in the existing completed project cards

### Changing a Project's Status
1. Move the project card HTML from one `projects-group` div to the other
2. Update the `data-status` attribute if used

### Adding Your Photo
1. Place your photo at `assets/photo.jpg`
2. The hero section already references this path with an `<img>` tag
3. The CSS `.photo-placeholder` (initials fallback) will be hidden when the image loads
4. Best results with square or portrait crop

### Changing the Accent Color
1. In `styles.css`, update the `--accent` custom property on `:root`
2. Also update `--accent-glow` and `--accent-hover` to match
3. The exposure overlay animation color in the `::after` pseudo-element may need updating

---

## Technical Notes
- **No build tools** - pure HTML/CSS/JS for GitHub Pages compatibility
- **Responsive** - breakpoint at 768px, tested down to 320px width
- **Accessible** - keyboard focus indicators, aria-labels on all icon links, semantic HTML5
- **Reduced motion** - `@media (prefers-reduced-motion: reduce)` disables all animations
- **Session-aware** - exposure reveal plays once per browser session via `sessionStorage`
- **External links** - open in new tab with `target="_blank" rel="noopener noreferrer"`
- **Google Fonts** - loaded via `<link>` tags (Space Grotesk, IBM Plex Sans, IBM Plex Mono)

---

## Content Reference (from Resume)
The following content was extracted from the user's LaTeX resume and adapted (not copied) for the website:

### Experience Entries
1. Undergraduate Researcher - Appenzeller-Chen Group, Birck Nanotechnology Center (Aug 2026 - Present) **[active]**
2. Undergraduate Researcher - Purdue VIP, Semiconductors @ Birck (Jan 2026 - Present) **[active]**
3. Project Manager, TARS Robotics Team - Embedded Systems @ Purdue (Aug 2026 - Present) **[active]**
4. Student Researcher - Purdue VIP, Virtual Twins @ Birck (Aug - Dec 2025) **[past]**
5. Research Intern - University of Delhi / CERN (Apr 2023 - Jan 2024) **[past]**

### Featured Projects
1. TARS: Autonomous Mobile Robot (Robotics, Systems Architecture, Leadership)
2. TidalGate: Predictive Tidal Energy (Arduino Uno Q, IMU, Qualcomm ML) - 🏆 DataHacks '26 @ UCSD
3. RP2354 FIDO2 Security Key (RP2354 Custom Hardware, USB-C, CTAP2)
4. Semiconductor Fabrication & Advanced Packaging (DRIE TSVs, ALD Automation, Photolithography, SPC Metrology)

### Additional Projects
1. Embedded Multiplayer Tetris System (C++, ESP32, SPI, ESP-NOW)
2. Location-Based Digital Compass (Python, Raspberry Pi Zero W, Google Maps APIs)
3. KDE Custom Touchpad Drivers (Linux, KDE Plasma 6, Python)
4. Analog Audio Equalizer (LM324 Op-Amp, LM386 Power Amp, Active RC Filters)
5. Electronic Dice (555 Timer, CD4017 IC, Digital Logic)
6. ESP32Slim Dev Board (PCB Design, KiCad, USB OTG)
7. 74-Series 4-Bit ALU (74HC ICs, Arduino, Digital Logic)
8. Keti OS (x86 Assembly, C, 32-Bit Kernel development)

### Education
- B.S. Computer Engineering, Purdue University
- Certificate in Semiconductors and Microelectronics
- Graduating 2028

### Contact
- Email: prabhakarsamridh@gmail.com
- LinkedIn: linkedin.com/in/samridh-prabhakar
- GitHub: github.com/Samprab06
