document.addEventListener('DOMContentLoaded', () => {
  // Only run on specific pages if needed
  const currentSlug = document.documentElement.getAttribute('data-slug');
  
  // Optionally limit to specific pages:
  // if (!currentSlug?.includes('/guides/')) return;
  
  const images = document.querySelectorAll<HTMLImageElement>('.sl-markdown-content img[height]:not(.not-content *)');
  images.forEach(img => {
    const h = img.getAttribute('height');
    if (h) {
      img.style.height = `${h}px`;
    }
  });
});