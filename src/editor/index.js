/**
 * Editor extensions for core blocks.
 *
 * core/button gets a "Command text" toggle: "View projects" is shown as
 * "./view-projects". The real text change happens in functions.php on render;
 * in the editor a class previews it with CSS.
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

const BUTTON = 'core/button';

addFilter('blocks.registerBlockType', 'martynbiz26/button-command-text/attribute', (settings, name) => {
  if (name !== BUTTON) return settings;

  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      commandText: { type: 'boolean', default: false },
    },
  };
});

const withCommandTextControl = createHigherOrderComponent(
  (BlockEdit) => (props) => {
    if (props.name !== BUTTON) return <BlockEdit {...props} />;

    const { attributes, setAttributes } = props;

    return (
      <>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody title={__('Terminal', 'martynbiz26')}>
            <ToggleControl
              __nextHasNoMarginBottom
              label={__('Command text', 'martynbiz26')}
              help={__('Shows "View projects" as "./view-projects".', 'martynbiz26')}
              checked={!!attributes.commandText}
              onChange={(value) => setAttributes({ commandText: value })}
            />
          </PanelBody>
        </InspectorControls>
      </>
    );
  },
  'withCommandTextControl',
);

addFilter('editor.BlockEdit', 'martynbiz26/button-command-text/control', withCommandTextControl);

const withCommandTextClass = createHigherOrderComponent(
  (BlockListBlock) => (props) => {
    if (props.name !== BUTTON || !props.attributes.commandText) return <BlockListBlock {...props} />;

    const className = [props.className, 'has-command-text'].filter(Boolean).join(' ');
    return <BlockListBlock {...props} className={className} />;
  },
  'withCommandTextClass',
);

addFilter('editor.BlockListBlock', 'martynbiz26/button-command-text/class', withCommandTextClass);
