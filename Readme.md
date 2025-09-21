--- FILE: README.md ---
# Tour & Travel — Local Website

This package contains a working single-page website (HTML/CSS/JS) plus a PHP endpoint and SQL schema to store contact messages.

## Files
- `main.html` — the homepage (entry point). Rename to `index.html` if you like.
- `styles.css` — styling
- `script.js` — carousel, filters, AJAX contact handler
- `contact.php` — server endpoint to persist contact form submissions
- `db.sql` — SQL to create the `tour_travel` database and `contacts` table
- `images/` — a folder where you should place slide and package images.

## Quick start (local PHP environment)
1. Put all files into a single folder (e.g. `tour-travel/`) and create an `images/` folder with sample images.
2. Edit `contact.php` and set your database credentials.
3. Import `db.sql` into your MySQL server: `mysql -u root -p < db.sql` or use phpMyAdmin.
4. Run the PHP built-in server from the folder: `php -S localhost:8000`.
5. Open `http://localhost:8000/main.html` in your browser.

## Notes & Next steps
- The package cards are static for now; you can convert them to dynamic templates by adding a small PHP router or JSON data source.
- Improve security: add CSRF protection, server-side rate limiting and sanitize/validate inputs.
- Add dedicated package pages (PDF mentions Issue #9) by creating `package.php?id=...` and route logic to fetch details from a new `packages` table.
- To deploy: host on any LAMP/LEMP stack; ensure HTTPS and secure DB credentials.

