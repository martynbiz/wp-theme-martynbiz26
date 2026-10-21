import { __ } from '@wordpress/i18n';
import {
  BlockControls,
  InspectorControls,
  MediaPlaceholder,
  MediaReplaceFlow,
  useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';

import { SIZE_CLASSES, filename, imageClasses, mediaTypeOf } from './classes.js';

const ACCEPT = 'image/*,video/webm,video/mp4';
const ALLOWED_TYPES = ['image', 'video'];

export default function Edit({ attributes, setAttributes }) {
  const { id, url, mediaType, autoplay, controls, alt, label, size, square, grayscale, offset } = attributes;
  const isVideo = mediaType === 'video';
  // Call useBlockProps once on every render (hooks can't be conditional); only
  // the class changes between the placeholder and the framed image.
  const blockProps = useBlockProps({
    className: url ? `terminal-image relative mx-auto ${SIZE_CLASSES[size] ?? SIZE_CLASSES.medium}` : undefined,
  });

  const onSelect = (media) =>
    setAttributes({
      id: media?.id,
      url: media?.url ?? '',
      mediaType: mediaTypeOf(media, media?.url),
      alt: media?.alt || alt,
    });
  const onSelectURL = (newUrl) => setAttributes({ id: undefined, url: newUrl, mediaType: mediaTypeOf(null, newUrl) });

  if (!url) {
    return (
      <div {...blockProps}>
        <MediaPlaceholder
          icon="format-image"
          labels={{
            title: __('Terminal image', 'martynbiz26'),
            instructions: __('Upload an image or a WebM/MP4 video, pick one from the media library, or paste a URL.', 'martynbiz26'),
          }}
          accept={ACCEPT}
          allowedTypes={ALLOWED_TYPES}
          onSelect={onSelect}
          onSelectURL={onSelectURL}
        />
      </div>
    );
  }

  return (
    <>
      <BlockControls group="other">
        <MediaReplaceFlow
          mediaId={id}
          mediaURL={url}
          accept={ACCEPT}
          allowedTypes={ALLOWED_TYPES}
          onSelect={onSelect}
          onSelectURL={onSelectURL}
        />
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Settings', 'martynbiz26')}>
          <TextControl
            __next40pxDefaultSize
            __nextHasNoMarginBottom
            label={__('Title bar label', 'martynbiz26')}
            help={__('Leave blank to use the file name.', 'martynbiz26')}
            placeholder={filename(url)}
            value={label}
            onChange={(value) => setAttributes({ label: value })}
          />
          <TextareaControl
            __nextHasNoMarginBottom
            label={isVideo ? __('Description (for screen readers)', 'martynbiz26') : __('Alternative text', 'martynbiz26')}
            value={alt}
            onChange={(value) => setAttributes({ alt: value })}
          />
          <SelectControl
            __next40pxDefaultSize
            __nextHasNoMarginBottom
            label={__('Width', 'martynbiz26')}
            value={size}
            options={[
              { label: __('Small (288px)', 'martynbiz26'), value: 'small' },
              { label: __('Medium (320px)', 'martynbiz26'), value: 'medium' },
            ]}
            onChange={(value) => setAttributes({ size: value })}
          />
          <ToggleControl
            __nextHasNoMarginBottom
            label={__('Crop to square', 'martynbiz26')}
            checked={square}
            onChange={(value) => setAttributes({ square: value })}
          />
          <ToggleControl
            __nextHasNoMarginBottom
            label={__('Grayscale until hover', 'martynbiz26')}
            checked={grayscale}
            onChange={(value) => setAttributes({ grayscale: value })}
          />
          <ToggleControl
            __nextHasNoMarginBottom
            label={__('Offset green border', 'martynbiz26')}
            checked={offset}
            onChange={(value) => setAttributes({ offset: value })}
          />
        </PanelBody>
        {isVideo && (
          <PanelBody title={__('Video', 'martynbiz26')}>
            <ToggleControl
              __nextHasNoMarginBottom
              label={__('Autoplay (muted, looping)', 'martynbiz26')}
              help={__('Plays like a GIF. Visitors who prefer reduced motion get a paused video with controls.', 'martynbiz26')}
              checked={autoplay}
              onChange={(value) => setAttributes({ autoplay: value })}
            />
            <ToggleControl
              __nextHasNoMarginBottom
              label={__('Show controls', 'martynbiz26')}
              checked={controls}
              onChange={(value) => setAttributes({ controls: value })}
            />
          </PanelBody>
        )}
      </InspectorControls>

      <div {...blockProps}>
        <div className="terminal-window">
          <div className="terminal-bar">
            <i className="bg-[#ff5f56]"></i>
            <i className="bg-[#ffbd2e]"></i>
            <i className="bg-[#27c93f]"></i>
            <span>{label || filename(url)}</span>
          </div>
          {isVideo ? (
            <video
              key={`${url}-${autoplay}`}
              src={url}
              className={imageClasses({ square, grayscale })}
              aria-label={alt || undefined}
              autoPlay={autoplay}
              muted={autoplay}
              loop={autoplay}
              playsInline
              controls={controls}
              preload="metadata"
            />
          ) : (
            <img src={url} alt={alt} className={imageClasses({ square, grayscale })} />
          )}
        </div>
        {offset && <div className="photo-offset"></div>}
      </div>
    </>
  );
}
