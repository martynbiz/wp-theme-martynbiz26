<?php
/**
 * Terminal window block markup (matches the contact form box in index.html).
 *
 * @package martynbiz26
 *
 * @var array  $attributes Block attributes.
 * @var string $content    Inner blocks.
 */

$martynbiz26_prompt = wp_kses( $attributes['prompt'] ?? '', array() );
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'terminal-window p-6 sm:p-8' ) ); ?>>
	<?php if ( '' !== trim( $martynbiz26_prompt ) ) : ?>
		<p class="terminal-window__prompt text-term-green"><?php echo $martynbiz26_prompt; // phpcs:ignore WordPress.Security.EscapeOutput -- sanitised by wp_kses. ?></p>
	<?php endif; ?>
	<div class="terminal-window__body"><?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- rendered inner blocks. ?></div>
</div>
