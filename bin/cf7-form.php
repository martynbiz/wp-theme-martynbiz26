<?php
/**
 * Creates the terminal-styled Contact Form 7 form if it doesn't exist yet.
 * Run by bin/env-setup.sh via `wp eval-file`. Edit the form afterwards in
 * wp-admin → Contact → Contact Forms.
 */

if ( ! class_exists( 'WPCF7_ContactForm' ) ) {
	WP_CLI::warning( 'Contact Form 7 is not active; skipping form setup.' );
	return;
}

$title = 'Contact (terminal)';

/**
 * Form template matching the contact form in index.html.
 */
function martynbiz26_cf7_template() {
	return implode(
		"\n",
		array(
			'<label class="field"><span>&#45;&#45;name</span>[text* your-name autocomplete:name placeholder "Ada Lovelace"]</label>',
			'<label class="field"><span>&#45;&#45;email</span>[email* your-email autocomplete:email placeholder "ada@example.com"]</label>',
			'<label class="field"><span>&#45;&#45;message</span>[textarea* your-message x5 placeholder "Hello Martyn..."]</label>',
			'<div class="flex items-center gap-4 flex-wrap"><button type="submit" class="wpcf7-form-control wpcf7-submit has-spinner btn btn-primary">[ enter ] send</button></div>',
		)
	);
}

$existing = get_posts(
	array(
		'post_type'   => 'wpcf7_contact_form',
		'title'       => $title,
		'post_status' => 'any',
		'numberposts' => 1,
	)
);
if ( $existing ) {
	WP_CLI::log( "Contact form \"$title\" already exists (ID {$existing[0]->ID})." );
	return;
}

$form  = WPCF7_ContactForm::get_template( array( 'title' => $title ) );
$props = $form->get_properties();

// "&#45;&#45;" so WordPress doesn't turn "--" into an en dash; a plain <button>
// because "[ ]" in a [submit] label would break CF7's tag parsing (CF7 still
// submits it with JavaScript).
$props['form'] = martynbiz26_cf7_template();

$props['mail']['subject']            = 'Website enquiry from [your-name]';
$props['mail']['body']               = "[your-message]\n\n— [your-name] <[your-email]>";
$props['mail']['additional_headers'] = 'Reply-To: [your-email]';

// Flamingo inbox title (the default refers to a [your-subject] field this form doesn't have).
$props['additional_settings'] = 'flamingo_subject: "Website enquiry from [your-name]"';

$props['messages']['mail_sent_ok']     = 'ok: message sent — thanks!';
$props['messages']['mail_sent_ng']     = "error: couldn't send, please try again later";
$props['messages']['validation_error'] = 'error: please fill in all fields correctly';

$form->set_properties( $props );
$form->save();

WP_CLI::success( "Created contact form \"$title\" (ID {$form->id()})." );
