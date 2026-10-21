import { __ } from '@wordpress/i18n';
import {
  BlockControls,
  InspectorControls,
  MediaPlaceholder,
  MediaReplaceFlow,
  useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';

import { SIZE_CLASSES, filename, imageClasses } from './classes.js';

export default function Edit({ attributes, setAttributes }) {
  const { id, url, alt, label, size, square, grayscale, offset } = attributes;
  const blockProps = useBlockProps({
    className: `terminal-image relative mx-auto ${SIZE_CLASSES[size] ?? SIZE_CLASSES.medium}`,
  });

  const onSelect = (media) =>
    setAttributes({ id: media?.id, url: media?.url ?? '', alt: media?.alt || alt });
  const onSelectURL = (newUrl) => setAttributes({ id: undefined, url: newUrl });

  if (!url) {
    return (
      <div {...useBlockProps()}>
        <MediaPlaceholder
          icon="format-image"
          labels={{ title: __('Terminal image', 'martynbiz26') }}
          accept="image/*"
          allowedTypes={['image']}
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
          accept="image/*"
          allowedTypes={['image']}
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
            label={__('Alternative text', 'martynbiz26')}
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
      </InspectorControls>

      <div {...blockProps}>
        <div className="terminal-window">
          <div className="terminal-bar">
            <i className="bg-[#ff5f56]"></i>
            <i className="bg-[#ffbd2e]"></i>
            <i className="bg-[#27c93f]"></i>
            <span>{label || filename(url)}</span>
          </div>
          <img src={url} alt={alt} className={imageClasses({ square, grayscale })} />
        </div>
        {offset && <div className="photo-offset"></div>}
      </div>
    </>
  );
}
