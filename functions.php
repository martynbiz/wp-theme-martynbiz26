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
