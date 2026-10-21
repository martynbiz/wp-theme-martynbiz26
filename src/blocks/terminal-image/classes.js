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

const VIDEO_EXTENSIONS = /\.(webm|mp4|m4v|mov|ogv)$/i;

// "image" or "video", from a media library item or (for pasted URLs) the file extension.
export const mediaTypeOf = (media, url) => {
  const candidates = [media?.type, media?.mime?.split('/')[0], media?.mime_type?.split('/')[0]];
  const type = candidates.find((t) => t === 'video' || t === 'image');
  if (type) return type;
  return VIDEO_EXTENSIONS.test((url || '').split('?')[0]) ? 'video' : 'image';
};
