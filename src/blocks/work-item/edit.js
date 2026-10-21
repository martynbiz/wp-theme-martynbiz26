import { __ } from '@wordpress/i18n';
import { RichText, store as blockEditorStore, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

const ALLOWED_BLOCKS = ['core/paragraph', 'core/list', 'core/buttons'];
const TEMPLATE = [['core/paragraph', { placeholder: __('What you did there…', 'martynbiz26') }]];

export default function Edit({ attributes, setAttributes, clientId, isSelected }) {
  const { company, subtitle, period } = attributes;
  const blockProps = useBlockProps({ className: 'work-item' });
  const innerBlocksProps = useInnerBlocksProps(
    { className: 'work-item__body' },
    { allowedBlocks: ALLOWED_BLOCKS, template: TEMPLATE },
  );

  const hasSelectedInner = useSelect(
    (select) => select(blockEditorStore).hasSelectedInnerBlock(clientId, true),
    [clientId],
  );

  // Optional fields are only shown while editing this item or once filled in.
  const editing = isSelected || hasSelectedInner;
  const showSubtitle = editing || subtitle;
  const showPeriod = editing || period;

  return (
    <article {...blockProps}>
      <h3>
        <RichText
          tagName="span"
          className="text-term-amber"
          value={company}
          onChange={(value) => setAttributes({ company: value })}
          placeholder={__('Company', 'martynbiz26')}
          allowedFormats={[]}
          disableLineBreaks
        />
        {showSubtitle && (
          <>
            {' — '}
            <RichText
              tagName="span"
              value={subtitle}
              onChange={(value) => setAttributes({ subtitle: value })}
              placeholder={__('optional subtitle', 'martynbiz26')}
              allowedFormats={[]}
              disableLineBreaks
            />
          </>
        )}
      </h3>
      {showPeriod && (
        <RichText
          tagName="div"
          className="work-item__period"
          value={period}
          onChange={(value) => setAttributes({ period: value })}
          placeholder={__('optional period, e.g. 2019 – present', 'martynbiz26')}
          allowedFormats={[]}
          disableLineBreaks
        />
      )}
      <div {...innerBlocksProps} />
    </article>
  );
}
