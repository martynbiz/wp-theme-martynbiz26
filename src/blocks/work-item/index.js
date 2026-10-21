import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Edit from './edit.js';

// The heading comes from render.php; only the inner (description) blocks are saved.
registerBlockType(metadata.name, {
  edit: Edit,
  save: () => <InnerBlocks.Content />,
});
