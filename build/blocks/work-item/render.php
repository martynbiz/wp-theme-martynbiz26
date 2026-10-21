<?php
/**
 * Work item block markup (matches .work-item in index.html).
 *
 * @package martynbiz26
 *
 * @var array  $attributes Block attributes.
 * @var string $content    Inner blocks (the description).
 */

$martynbiz26_company  = wp_kses( $attributes['company'] ?? '', array() );
$martynbiz26_subtitle = wp_kses( $attributes['subtitle'] ?? '', array() );
$martynbiz26_period   = wp_kses( $attributes['period'] ?? '', array() );
?>
<article <?php echo get_block_wrapper_attributes( array( 'class' => 'work-item' ) ); ?>>
	<h3>
		<span class="text-term-amber"><?php echo $martynbiz26_company; // phpcs:ignore WordPress.Security.EscapeOutput -- sanitised by wp_kses. ?></span>
		<?php if ( '' !== trim( $martynbiz26_subtitle ) ) : ?>
			&mdash; <?php echo $martynbiz26_subtitle; // phpcs:ignore WordPress.Security.EscapeOutput -- sanitised by wp_kses. ?>
		<?php endif; ?>
	</h3>
	<?php if ( '' !== trim( $martynbiz26_period ) ) : ?>
		<div class="work-item__period"><?php echo $martynbiz26_period; // phpcs:ignore WordPress.Security.EscapeOutput -- sanitised by wp_kses. ?></div>
	<?php endif; ?>
	<div class="work-item__body"><?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- rendered inner blocks. ?></div>
</article>
