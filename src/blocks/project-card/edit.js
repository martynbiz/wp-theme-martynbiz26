import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import {
  FormTokenField,
  PanelBody,
  TextControl,
  ToggleControl,
  __experimentalNumberControl as NumberControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { url, newTab, title, description, stars, badge, tags } = attributes;
  // Same classes as render.php, but a <div> here so clicks don't follow the link.
  const blockProps = useBlockProps({ className: 'project-card h-full' });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Link', 'martynbiz26')}>
          <TextControl
            __next40pxDefaultSize
            __nextHasNoMarginBottom
            type="url"
            label={__('URL', 'martynbiz26')}
            placeholder="https://github.com/…"
            value={url}
            onChange={(value) => setAttributes({ url: value })}
          />
          <div style={{ height: 16 }} />
          <ToggleControl
            __nextHasNoMarginBottom
            label={__('Open in new tab', 'martynbiz26')}
            checked={newTab}
            onChange={(value) => setAttributes({ newTab: value })}
          />
        </PanelBody>
        <PanelBody title={__('Details', 'martynbiz26')}>
          <NumberControl
            __next40pxDefaultSize
            label={__('Stars', 'martynbiz26')}
            help={__('Leave blank to hide.', 'martynbiz26')}
            min={0}
            value={stars ?? ''}
            onChange={(value) => setAttributes({ stars: value === '' || value == null ? undefined : Number(value) })}
          />
          <div style={{ height: 16 }} />
          <TextControl
            __next40pxDefaultSize
            __nextHasNoMarginBottom
            label={__('Badge', 'martynbiz26')}
            help={__('Short label such as "new". Leave blank to hide.', 'martynbiz26')}
            value={badge}
            onChange={(value) => setAttributes({ badge: value })}
          />
          <div style={{ height: 16 }} />
          <FormTokenField
            __next40pxDefaultSize
            __nextHasNoMarginBottom
            label={__('Tags', 'martynbiz26')}
            value={tags}
            onChange={(value) => setAttributes({ tags: value.map((t) => (typeof t === 'string' ? t : t.value)) })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="project-head">
          <span className="folder" aria-hidden="true">
            📁
          </span>
          <span className="flex items-center gap-3">
            {stars > 0 && <span className="stars">★ {stars}</span>}
            {badge && <span className="badge">{badge}</span>}
          </span>
        </div>
        {/* Front end also hyphenates spaces ("Solid Server" -> "solid-server"); see render.php. */}
        <RichText
          tagName="h3"
          className="lowercase"
          value={title}
          onChange={(value) => setAttributes({ title: value })}
          placeholder={__('project-name', 'martynbiz26')}
          allowedFormats={[]}
          disableLineBreaks
        />
        <RichText
          tagName="p"
          value={description}
          onChange={(value) => setAttributes({ description: value })}
          placeholder={__('What it does…', 'martynbiz26')}
          allowedFormats={[]}
        />
        {tags.length > 0 && (
          <ul className="tags">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
