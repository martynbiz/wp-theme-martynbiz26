<?php
/**
 * Terminal image block markup. Classes mirror classes.js (used by the editor).
 *
 * @package martynbiz26
 *
 * @var array $attributes Block attributes.
 */

$martynbiz26_url = $attributes['url'] ?? '';
if ( '' === $martynbiz26_url && empty( $attributes['id'] ) ) {
	return;
}

$martynbiz26_sizes = array(
	'small'  => 'w-64 sm:w-72',
	'medium' => 'w-64 sm:w-80',
);
$martynbiz26_size  = $martynbiz26_sizes[ $attributes['size'] ?? 'medium' ] ?? $martynbiz26_sizes['medium'];

$martynbiz26_img_class = ! empty( $attributes['square'] ) ? 'w-full aspect-square object-cover' : 'block w-full h-auto';
if ( ! empty( $attributes['grayscale'] ) ) {
	$martynbiz26_img_class .= ' grayscale hover:grayscale-0 transition duration-500';
}

$martynbiz26_alt   = $attributes['alt'] ?? '';
$martynbiz26_label = trim( $attributes['label'] ?? '' );
if ( '' === $martynbiz26_label ) {
	$martynbiz26_label = rawurldecode( wp_basename( strtok( $martynbiz26_url, '?' ) ) );
}

// Media library images get srcset/sizes; external URLs are output as-is.
$martynbiz26_img = ! empty( $attributes['id'] )
	? wp_get_attachment_image(
		$attributes['id'],
		'large',
		false,
		array(
			'class' => $martynbiz26_img_class,
			'alt'   => $martynbiz26_alt,
			'sizes' => '(min-width: 640px) 320px, 256px',
		)
	)
	: '';

if ( ! $martynbiz26_img ) {
	$martynbiz26_img = sprintf(
		'<img src="%s" alt="%s" class="%s" loading="lazy" decoding="async" />',
		esc_url( $martynbiz26_url ),
		esc_attr( $martynbiz26_alt ),
		esc_attr( $martynbiz26_img_class )
	);
}
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'terminal-image relative mx-auto ' . $martynbiz26_size ) ); ?>>
	<div class="terminal-window">
		<div class="terminal-bar">
			<i class="bg-[#ff5f56]"></i><i class="bg-[#ffbd2e]"></i><i class="bg-[#27c93f]"></i>
			<span><?php echo esc_html( $martynbiz26_label ); ?></span>
		</div>
		<?php echo $martynbiz26_img; // phpcs:ignore WordPress.Security.EscapeOutput -- built from escaped parts. ?>
	</div>
	<?php if ( ! empty( $attributes['offset'] ) ) : ?>
		<div class="photo-offset"></div>
	<?php endif; ?>
</div>
