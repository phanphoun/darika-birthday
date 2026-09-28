# Darika's Birthday Surprise

A romantic, mobile-first birthday experience made for Darika — no build tools or dependencies required.

## 1. Run the website

For the most reliable local preview, open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000). You can also double-click `index.html`; the site is designed to work that way too.

## 2. Add Darika's photo

Put her portrait here:

```text
assets/images/darika.jpg
```

A vertical portrait works best. The site crops it automatically and shows an elegant “D” placeholder until the file is added.

## 3. Add memory photos

Add up to six photos using these exact names:

```text
assets/images/memory-1.jpg
assets/images/memory-2.jpg
assets/images/memory-3.jpg
assets/images/memory-4.jpg
assets/images/memory-5.jpg
assets/images/memory-6.jpg
```

Portrait or square photos work especially well. Missing photos automatically keep the styled numbered placeholders, so the page never shows broken-image icons.

## 4. Add birthday music

Place an MP3 at:

```text
assets/music/birthday.mp3
```

Music begins only after “Open Your Surprise” is pressed, which follows browser autoplay rules. The small control in the top-right pauses and resumes playback. If there is no MP3, the rest of the experience still works normally.

Use music you created or have permission to share.

## 5. Change the birthday message

Open `index.html` in any text editor. The letter is inside:

```html
<article class="love-letter"> ... </article>
```

The final birthday message is inside:

```html
<section class="section finale"> ... </section>
```

Edit only the text between the HTML tags. Keep the tags themselves in place so the animations and styling continue to work.

## 6. Customize the memories

In `index.html`, search for `memory-card`. Each card has a date and caption:

```html
<time datetime="2026">A day to remember</time>
<p>One of my favorite memories ❤️</p>
```

Replace those phrases with the real date and story for each photo. You can use a date such as `May 14, 2025` and set `datetime="2025-05-14"`.

## 7. Deploy with GitHub Pages

1. Create a new GitHub repository, for example `darika-birthday`.
2. Upload everything in this folder, keeping the `assets` folders and filenames unchanged.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then click **Save**.
6. GitHub will show the public link after the site finishes publishing.

Before sharing the link, open it once on your phone and confirm the photos and music are loading. The site contains no tracking, backend, or stored personal data.

## Quick checklist

- Add `darika.jpg`
- Add the memory photos you want to use
- Add `birthday.mp3`
- Personalize the memory dates and captions
- Read the letter once and adjust any wording you want
- Test the final link on a phone
