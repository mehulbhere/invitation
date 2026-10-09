# Rahul & Anjali Engagement Invitation

A responsive, static engagement invitation website made with HTML, CSS, and JavaScript. No paid framework, build step, or backend is required.

## Preview locally
1. Extract this folder.
2. Open `index.html` in a browser.
3. For best results, publish it to a static host and test the published URL on your phone.

## Personalize before publishing
Open `script.js` and edit:
- `EVENT_DATE`: engagement date and time. Current default is 15 November 2026 at 5:00 PM India Standard Time.
- `VENUE_NAME` and `VENUE_ADDRESS`: replace the placeholder with the real venue and address.
- `WHATSAPP_NUMBER`: optional. Use country code and digits only, for example `919876543210`, to prefill the RSVP recipient.

In `index.html`, update any event wording and the displayed date/time if needed. The sample time is a placeholder.

### Add music
Add a legally usable MP3 file named `music.mp3` to this folder. Keep music opt-in: browsers generally block autoplay until a visitor taps Play Music. Only use music you have permission to share.

### Add your photos
The current gallery is made from decorative CSS placeholders. Replace the `.gallery-card` blocks in `index.html` with image elements, then add your own optimized photos to the folder. Example:
`<img src="images/photo-1.jpg" alt="Rahul and Anjali celebrating together">`
Keep image file names simple and use compressed JPG/WebP files.

## Free publishing option A: GitHub Pages
1. Create or sign in to a free account at https://github.com.
2. Create a new **public** repository, e.g. `rahul-anjali-invitation`.
3. Upload `index.html`, `styles.css`, `script.js`, and any images/music files to the repository root. You can upload README.md too.
4. Open the repository's **Settings → Pages**.
5. Under build/deployment, choose **Deploy from a branch**; choose `main` and `/(root)`, then Save.
6. Wait for the deployment to finish. GitHub will show a public URL, usually `https://YOUR-USERNAME.github.io/rahul-anjali-invitation/`.
7. Open the URL on your phone and test all links.

GitHub Pages is suitable for a static invitation. A public repository means the source files are publicly viewable, so do not put private phone numbers or sensitive information in the repository. If you prefer not to make source public, use option B.

## Free publishing option B: Netlify Drop
1. Open https://app.netlify.com/drop in your browser.
2. Sign in or create a free account if prompted.
3. Drag the extracted website folder (the folder containing `index.html`) into the drop area.
4. Wait for Netlify to publish it and provide a site URL.
5. Test the URL on your phone. You can adjust the site name in Netlify site settings if the name is available.

Hosting providers can change their free-plan limits and terms, so check their current plan details before publishing.

## Before you share the link
- Replace the venue name/address and set the correct event time.
- Add photos and `music.mp3` if wanted.
- Test the countdown, Maps button, WhatsApp sharing, RSVP button, and music toggle.
- Make sure the map search opens the correct venue.
- Share the final published URL through WhatsApp or turn it into a QR code.

## Files
- `index.html`: page structure and invitation copy
- `styles.css`: responsive design and styling
- `script.js`: countdown, music toggle, Maps links, WhatsApp sharing, RSVP
"# invitation" 
