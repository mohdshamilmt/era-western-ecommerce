# Western Era — Website Files

## Folder structure
```
western-era/
├── index.html          → the page itself, open this in a browser
├── css/
│   └── style.css       → all styling (colors, fonts, layout)
├── js/
│   └── script.js       → all site behaviour (cart, filters, WhatsApp checkout)
├── data/
│   └── products.js     → the list of products — edit this to add/change items
└── images/
    └── (put product photos here)
```

## To add real products and photos
1. Drop photo files into `images/` — e.g. `images/amara-wrap-dress.jpg`.
2. Open `data/products.js` in any text editor.
3. Find the product you want to update and change its `img` field:
   `img: "images/amara-wrap-dress.jpg"`
4. Edit `name`, `price` (number only, no ₹), `cat` (must be exactly
   `Dresses`, `Co-ords`, `Tops`, or `Skirts`), and `desc` to match the
   real item.
5. To add a new product: copy one whole `{ ... }` block, give it a new
   unique `id`, and fill in the fields.
6. To remove a product: delete its whole `{ ... }` block.

## Before going live
Open `js/script.js` and find this line near the top:
```
const WHATSAPP_NUMBER = "911234567890";
```
Replace it with the real WhatsApp number — country code first, digits
only, no `+`, spaces, or dashes.

## To preview locally
Just double-click `index.html` to open it in a browser. Because the
site now loads separate CSS/JS/data files, some browsers block that
when opening the file directly (a security rule for local files) — if
the page looks unstyled or the products don't show up, run a tiny local
server instead from inside the `western-era` folder:
```
python3 -m http.server 8000
```
then visit `http://localhost:8000` in your browser. This isn't needed
once the files are uploaded to real web hosting — only for local
testing on some browsers.

## To publish
Upload the entire `western-era` folder (keeping the folder structure
intact) to any static web host — Netlify, Vercel, GitHub Pages, or
your hosting provider's file manager all work. `index.html` is the
file that should load at the root of the site.
