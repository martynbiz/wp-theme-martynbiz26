import { __, sprintf } from '@wordpress/i18n';
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, Flex, FlexBlock, PanelBody, TextControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

export default function Edit({ attributes, setAttributes }) {
  const { prompt, name, phrases } = attributes;
  const [siteName] = useEntityProp('root', 'site', 'title');
  const blockProps = useBlockProps({ className: 'whoami' });

  const setPhrases = (next) => setAttributes({ phrases: next });
  const updatePhrase = (index, value) => setPhrases(phrases.map((p, i) => (i === index ? value : p)));
  const removePhrase = (index) => setPhrases(phrases.filter((_, i) => i !== index));
  const movePhrase = (index, by) => {
    const next = [...phrases];
    [next[index], next[index + by]] = [next[index + by], next[index]];
    setPhrases(next);
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Ticker phrases', 'martynbiz26')}>
          <p className="components-base-control__help">
            {__('Typed out one after another, in this order.', 'martynbiz26')}
          </p>
          {phrases.map((phrase, index) => (
            <Flex key={index} align="flex-end" style={{ marginBottom: 8 }}>
              <FlexBlock>
                <TextControl
                  __next40pxDefaultSize
                  __nextHasNoMarginBottom
                  label={sprintf(__('Phrase %d', 'martynbiz26'), index + 1)}
                  hideLabelFromVision
                  value={phrase}
                  onChange={(value) => updatePhrase(index, value)}
                />
              </FlexBlock>
              <Button
                size="small"
                icon="arrow-up-alt2"
                label={__('Move up', 'martynbiz26')}
                disabled={index === 0}
                onClick={() => movePhrase(index, -1)}
              />
              <Button
                size="small"
                icon="arrow-down-alt2"
                label={__('Move down', 'martynbiz26')}
                disabled={index === phrases.length - 1}
                onClick={() => movePhrase(index, 1)}
              />
              <Button
                size="small"
                icon="no-alt"
                label={__('Remove', 'martynbiz26')}
                isDestructive
                onClick={() => removePhrase(index)}
              />
            </Flex>
          ))}
          <Button variant="secondary" onClick={() => setPhrases([...phrases, ''])}>
            {__('Add phrase', 'martynbiz26')}
          </Button>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <RichText
          tagName="p"
          className="text-term-green mb-4"
          value={prompt}
          onChange={(value) => setAttributes({ prompt: value })}
          placeholder="$ whoami"
          allowedFormats={[]}
          disableLineBreaks
        />
        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
          <RichText
            tagName="span"
            value={name}
            onChange={(value) => setAttributes({ name: value })}
            placeholder={siteName || __('Your name', 'martynbiz26')}
            allowedFormats={[]}
            disableLineBreaks
          />
          <span className="text-term-green">.</span>
        </h1>
        <p className="mt-3 text-xl sm:text-2xl text-term-dim">
          <span className="text-term-cyan">
            {phrases.find((p) => p.trim()) || __('Add ticker phrases in the sidebar', 'martynbiz26')}
          </span>
          <span className="cursor">|</span>
        </p>
      </div>
    </>
  );
}
