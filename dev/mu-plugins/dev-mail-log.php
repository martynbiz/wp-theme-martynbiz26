<?php
/**
 * Plugin Name: Dev mail log (wp-env only)
 * Description: wp-env has no mail server, so log outgoing mail to wp-content/debug.log and report success.
 *
 * Mapped in by .wp-env.json; not part of the theme.
 */

add_filter(
	'pre_wp_mail',
	function ( $return, $atts ) {
		error_log(
			sprintf(
				"[dev-mail] To: %s\nSubject: %s\nHeaders: %s\n\n%s\n",
				implode( ', ', (array) $atts['to'] ),
				$atts['subject'],
				implode( ' | ', (array) $atts['headers'] ),
				$atts['message']
			)
		);
		return true;
	},
	10,
	2
);
