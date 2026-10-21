<?php
/**
 * Project card block markup (matches .project-card in index.html).
 *
 * @package martynbiz26
 *
 * @var array $attributes Block attributes.
 */

$martynbiz26_url   = $attributes['url'] ?? '';
// Titles display repo-style: "Solid Server" -> "solid-server".
$martynbiz26_title = wp_kses( $attributes['title'] ?? '', array() );
$martynbiz26_title = preg_replace( '/\s+/u', '-', mb_strtolower( trim( html_entity_decode( $martynbiz26_title, ENT_QUOTES, 'UTF-8' ) ) ) );
$martynbiz26_desc  = wp_kses( $attributes['description'] ?? '', array() );
$martynbiz26_stars = isset( $attributes['stars'] ) ? (int) $attributes['stars'] : 0;
$martynbiz26_badge = trim( $attributes['badge'] ?? '' );
$martynbiz26_tags  = array_values( array_filter( array_map( 'trim', (array) ( $attributes['tags'] ?? array() ) ) ) );

// The whole card is the link; without a URL it's a plain box.
$martynbiz26_tag   = '' !== $martynbiz26_url ? 'a' : 'div';
$martynbiz26_attrs = array( 'class' => 'project-card h-full' );
if ( 'a' === $martynbiz26_tag ) {
	$martynbiz26_attrs['href'] = esc_url( $martynbiz26_url );
	if ( ! empty( $attributes['newTab'] ) ) {
		$martynbiz26_attrs['target'] = '_blank';
		$martynbiz26_attrs['rel']    = 'noopener';
	}
}
?>
<<?php echo $martynbiz26_tag; ?> <?php echo get_block_wrapper_attributes( $martynbiz26_attrs ); ?>>
	<div class="project-head">
		<span class="folder" aria-hidden="true">&#128193;</span>
		<span class="flex items-center gap-3">
			<?php if ( $martynbiz26_stars > 0 ) : ?>
				<span class="stars">&#9733; <?php echo esc_html( number_format_i18n( $martynbiz26_stars ) ); ?></span>
			<?php endif; ?>
			<?php if ( '' !== $martynbiz26_badge ) : ?>
				<span class="badge"><?php echo esc_html( $martynbiz26_badge ); ?></span>
			<?php endif; ?>
		</span>
	</div>
	<h3><?php echo esc_html( $martynbiz26_title ); ?></h3>
	<p><?php echo $martynbiz26_desc; // phpcs:ignore WordPress.Security.EscapeOutput -- sanitised by wp_kses. ?></p>
	<?php if ( $martynbiz26_tags ) : ?>
		<ul class="tags">
			<?php foreach ( $martynbiz26_tags as $martynbiz26_t ) : ?>
				<li><?php echo esc_html( $martynbiz26_t ); ?></li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
</<?php echo $martynbiz26_tag; ?>>
