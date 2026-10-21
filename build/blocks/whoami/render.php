<?php
/**
 * Whoami block markup.
 *
 * The ticker is animated by src/main.js, which reads the phrases from data-typed.
 *
 * @package martynbiz26
 *
 * @var array $attributes Block attributes.
 */

$martynbiz26_prompt  = wp_kses( $attributes['prompt'] ?? '', array() );
$martynbiz26_name    = wp_kses( $attributes['name'] ?? '', array() );
$martynbiz26_name    = '' !== trim( $martynbiz26_name ) ? $martynbiz26_name : esc_html( get_bloginfo( 'name' ) );
$martynbiz26_phrases = array_values( array_filter( array_map( 'trim', (array) ( $attributes['phrases'] ?? array() ) ) ) );
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'whoami' ) ); ?>>
	<?php if ( '' !== trim( $martynbiz26_prompt ) ) : ?>
		<p class="text-term-green mb-4"><?php echo $martynbiz26_prompt; // phpcs:ignore WordPress.Security.EscapeOutput -- sanitised by wp_kses. ?></p>
	<?php endif; ?>

	<h1 class="text-4xl sm:text-6xl font-bold text-white leading-tight">
		<?php echo $martynbiz26_name; // phpcs:ignore WordPress.Security.EscapeOutput -- sanitised above. ?><span class="text-term-green">.</span>
	</h1>

	<?php if ( $martynbiz26_phrases ) : ?>
		<p class="mt-3 text-xl sm:text-2xl text-term-dim">
			<span class="text-term-cyan" data-typed="<?php echo esc_attr( wp_json_encode( $martynbiz26_phrases ) ); ?>"><?php echo esc_html( $martynbiz26_phrases[0] ); ?></span><span class="cursor" aria-hidden="true">|</span>
		</p>
	<?php endif; ?>
</div>
