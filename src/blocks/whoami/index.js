import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './edit.js';

// Dynamic block: markup comes from render.php, so nothing is saved but attributes.
registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null,
});
