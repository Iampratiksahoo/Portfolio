# Game Developer Portfolio: Asset Guidelines

To ensure your "Funky Polaroid" portfolio looks its best, follow these guidelines for your project images, videos, and GIFs.

## 1. Project Posters (The Polaroid View)
These are the primary images or videos seen in the main grid.
- **Aspect Ratio:** **1:1 (Square)** is highly recommended.
- **Recommended Size:** **800x800px**.
- **Format:** `.webp` or `.jpg` for images. `.mp4` for videos (muted, loop).
- **Tip:** Since these cards are tilted, a square image ensures no important content is cropped when framed.

## 2. Modal Media (The Detailed View)
These appear in the project details popup.
- **Aspect Ratio:** **16:9 (Widescreen)** is best for game trailers and screenshots.
- **Recommended Size:** **1920x1080px**.
- **Format:** `.mp4` for high-quality gameplay.
- **GIFs:** If using GIFs, keep them under **10MB** to ensure the "Loading..." state doesn't stay too long.

## 3. Thumbnails
- **Aspect Ratio:** **16:9** or **3:2**.
- **Recommended Size:** **400x225px**.
- **Tip:** 11ty automatically optimizes these, but starting with the right ratio prevents stretching.

## 4. Favicon
- **Recommended:** A simple, high-contrast doodle or character icon.
- **Size:** **32x32px** and **512x512px** (for PWA/Mobile).

---

## Technical Notes
- **Image Optimization:** The project uses `@11ty/eleventy-img`. Any image added to `src/assets/images` will be automatically converted to optimized WebP/AVIF formats during build.
- **Dark Mode:** The site supports dark mode. Ensure your transparent PNGs look good on both warm white (`#fdfbf7`) and dark grey (`#121212`) backgrounds.
