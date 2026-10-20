#!/usr/bin/env bash
# Runs inside the wp-env CLI container after `npm run env:start`.
set -e

wp theme activate wp-theme-martynbiz26
wp option update blogname 'Martyn Bissett'
wp option update blogdescription 'Developer'

# Static "Home" page as the front page (rendered by templates/front-page.html).
home_id=$(wp post list --post_type=page --name=home --field=ID --format=ids)
if [ -z "$home_id" ]; then
  home_id=$(wp post create --post_type=page --post_status=publish --post_title='Home' --post_name=home --porcelain)
fi
wp option update show_on_front page
wp option update page_on_front "$home_id"
