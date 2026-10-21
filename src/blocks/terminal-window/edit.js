import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const TEMPLATE = [['core/paragraph', { placeholder: __('Add blocks, e.g. a contact form…', 'martynbiz26') }]];

export default function Edit({ attributes, setAttributes }) {
  const { prompt } = attributes;
  const blockProps = useBlockProps({ className: 'terminal-window p-6 sm:p-8' });
  const innerBlocksProps = useInnerBlocksProps({ className: 'terminal-window__body' }, { template: TEMPLATE });

  return (
    <div {...blockProps}>
      <RichText
        tagName="p"
        className="terminal-window__prompt text-term-green"
        value={prompt}
        onChange={(value) => setAttributes({ prompt: value })}
        placeholder={__('$ prompt (optional)', 'martynbiz26')}
        allowedFormats={[]}
        disableLineBreaks
      />
      <div {...innerBlocksProps} />
    </div>
  );
}
