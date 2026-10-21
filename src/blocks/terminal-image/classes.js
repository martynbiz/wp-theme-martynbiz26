// Tailwind classes shared by edit.js; keep in sync with render.php.
export const SIZE_CLASSES = {
  small: 'w-64 sm:w-72',
  medium: 'w-64 sm:w-80',
};

export const imageClasses = ({ square, grayscale }) =>
  [
    square ? 'w-full aspect-square object-cover' : 'block w-full h-auto',
    grayscale && 'grayscale hover:grayscale-0 transition duration-500',
  ]
    .filter(Boolean)
    .join(' ');

export const filename = (url) => (url ? decodeURIComponent(url.split('?')[0].split('/').pop()) : '');
