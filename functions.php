<?php
/**
 * Martynbiz 26 theme functions.
 *
 * @package martynbiz26
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const MARTYNBIZ26_FONTS_URL = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap';

/**
 * Theme supports and editor styles.
 */
function martynbiz26_setup() {
	add_theme_support( 'editor-styles' );
	add_editor_style( array( MARTYNBIZ26_FONTS_URL, 'build/style.css' ) );
}
add_action( 'after_setup_theme', 'martynbiz26_setup' );

/**
 * Front-end styles and scripts built by Vite (npm run build).
 */
function martynbiz26_enqueue_assets() {
	$dir = get_theme_file_path( 'build' );
	$uri = get_theme_file_uri( 'build' );

	wp_enqueue_style( 'martynbiz26-fonts', MARTYNBIZ26_FONTS_URL, array(), null );

	if ( file_exists( "$dir/style.css" ) ) {
		wp_enqueue_style( 'martynbiz26-style', "$uri/style.css", array(), filemtime( "$dir/style.css" ) );
	}

	if ( file_exists( "$dir/main.js" ) ) {
		wp_enqueue_script_module( 'martynbiz26-main', "$uri/main.js", array(), filemtime( "$dir/main.js" ) );
	}
}
add_action( 'wp_enqueue_scripts', 'martynbiz26_enqueue_assets' );

/**
 * Register the theme's blocks, built from src/blocks into build/blocks (npm run build).
 */
function martynbiz26_register_blocks() {
	foreach ( glob( get_theme_file_path( 'build/blocks/*/block.json' ) ) as $block_json ) {
		register_block_type( dirname( $block_json ) );
	}
}
add_action( 'init', 'martynbiz26_register_blocks' );

/**
 * Editor extensions (src/editor), e.g. the Button "Command text" toggle.
 */
function martynbiz26_enqueue_editor_assets() {
	$asset_file = get_theme_file_path( 'build/editor/index.asset.php' );
	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = require $asset_file;
	wp_enqueue_script(
		'martynbiz26-editor',
		get_theme_file_uri( 'build/editor/index.js' ),
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'martynbiz26_enqueue_editor_assets' );

/**
 * Register the Button "commandText" and Heading "number" attributes server-side so they survive REST/rendering.
 */
function martynbiz26_button_command_text_attribute( $args, $block_type ) {
	if ( 'core/button' === $block_type ) {
		$args['attributes']['commandText'] = array(
			'type'    => 'boolean',
			'default' => false,
		);
	}
	if ( 'core/heading' === $block_type ) {
		$args['attributes']['number'] = array(
			'type'    => 'string',
			'default' => '',
		);
	}
	return $args;
}
add_filter( 'register_block_type_args', 'martynbiz26_button_command_text_attribute', 10, 2 );

/**
 * Buttons with "Command text" on: "View projects" -> "./view-projects".
 * Text that already starts with "./" is left alone.
 */
function martynbiz26_button_command_text( $block_content, $block ) {
	if ( empty( $block['attrs']['commandText'] ) ) {
		return $block_content;
	}

	return preg_replace_callback(
		'#(<(a|button)\b[^>]*\bwp-block-button__link\b[^>]*>)(.*?)(</\2>)#s',
		function ( $m ) {
			$text = trim( html_entity_decode( wp_strip_all_tags( $m[3] ), ENT_QUOTES, 'UTF-8' ) );
			if ( '' === $text || str_starts_with( $text, './' ) ) {
				return $m[0];
			}
			return $m[1] . esc_html( './' . sanitize_title( $text ) ) . $m[4];
		},
		$block_content,
		1
	);
}
add_filter( 'render_block_core/button', 'martynbiz26_button_command_text', 10, 2 );

/**
 * Pages don't display their title (templates/page.html); each page has its own H1
 * Heading block instead, so it can take a Number. New pages start with one.
 */
function martynbiz26_page_starts_with_h1( $args, $post_type ) {
	if ( 'page' === $post_type ) {
		$args['template'] = array(
			array(
				'core/heading',
				array(
					'level'       => 1,
					'placeholder' => __( 'Page heading', 'martynbiz26' ),
				),
			),
		);
	}
	return $args;
}
add_filter( 'register_post_type_args', 'martynbiz26_page_starts_with_h1', 10, 2 );

/**
 * Headings with a Number ("03"): add data-number, which CSS draws as a green "03.".
 */
function martynbiz26_heading_number( $block_content, $block ) {
	$number = trim( (string) ( $block['attrs']['number'] ?? '' ) );
	if ( '' === $number ) {
		return $block_content;
	}

	$tags = new WP_HTML_Tag_Processor( $block_content );
	if ( $tags->next_tag() ) {
		$tags->set_attribute( 'data-number', $number );
	}
	return $tags->get_updated_html();
}
add_filter( 'render_block_core/heading', 'martynbiz26_heading_number', 10, 2 );

/**
 * Contact Form 7: output the form template as written (no auto <p>/<br>),
 * so the terminal-style markup from the form editor is kept intact.
 */
add_filter( 'wpcf7_autop_or_not', '__return_false' );

/**
 * Show the header site title as a slug, e.g. "Martyn Bissett" -> "martyn-bissett".
 * The "~/" prefix and "_" cursor are added in CSS (.site-logo).
 */
function martynbiz26_site_title_slug( $block_content, $block ) {
	if ( ! str_contains( $block['attrs']['className'] ?? '', 'site-logo' ) ) {
		return $block_content;
	}

	$name = get_bloginfo( 'name' );

	return str_replace( '>' . $name . '</a>', '>' . esc_html( sanitize_title( $name ) ) . '</a>', $block_content );
}
add_filter( 'render_block_core/site-title', 'martynbiz26_site_title_slug', 10, 2 );

/**
 * Preconnect to Google Fonts.
 */
function martynbiz26_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'martynbiz26_resource_hints', 10, 2 );
