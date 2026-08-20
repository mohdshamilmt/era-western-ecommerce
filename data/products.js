/*
  HOW TO ADD A REAL PRODUCT
  --------------------------------
  1. Put the photo file in an "images" folder next to this index.html file
     (e.g. images/amara-wrap-dress.jpg).
  2. Add an "img" line to that product below, pointing at the file:
       img: "images/amara-wrap-dress.jpg",
  3. If a product has no "img" line, the site automatically falls back to the
     gradient line-art placeholder — so you can fill these in one at a time.
  4. To add a brand-new product, copy one whole { ... } block below, give it
     a new unique id, and edit the fields.
  5. To remove a product, delete its whole { ... } block.
*/
products = [
   { id: 1, name: "Amara Wrap Dress", cat: "Dresses", price: 2450, stock: "Only 2 left", desc: "A soft wrap-front midi in brushed viscose. Cinches at the waist, falls loose through the skirt. Imported in a single small run.", pattern: "stripe", img: "images/dress1.jpeg" },
   { id: 2, name: "Solene Co-ord Set", cat: "Co-ords", price: 2890, stock: "3 pieces left", desc: "Cropped shirt and wide-leg trouser set in matching linen-blend. Effortless, put-together in one move.", pattern: "grid", img: "images/dress2.jpeg" },
   { id: 3, name: "Marlowe Slip Dress", cat: "Dresses", price: 2150, stock: "Only 1 left", desc: "Bias-cut satin slip with adjustable straps. Sits just below the knee. Our most-requested silhouette this season.", pattern: "diagonal", img: "images/dress3.jpeg" },
   { id: 4, name: "Ivy Corset Top", cat: "Tops", price: 1490, stock: "4 pieces left", desc: "Structured corset top with boning detail and back lacing. Pairs with denim or the Solene trouser.", pattern: "dot", img: "images/dress4.jpeg" },
   { id: 5, name: "Noor Pleated Skirt", cat: "Skirts", price: 1690, stock: "Only 2 left", desc: "Knife-pleated midi skirt in a soft satin finish. Falls beautifully with movement.", pattern: "stripe", img: "images/dress5.jpeg" },
   { id: 6, name: "Celeste Maxi Dress", cat: "Dresses", price: 2990, stock: "Only 3 left", desc: "Floor-length maxi with a fitted bodice and flowing skirt. Made for golden-hour occasions.", pattern: "grid", img: "images/dress6.jpeg" },
   { id: 7, name: "Reina Halter Top", cat: "Tops", price: 1290, stock: "5 pieces left", desc: "Halter-neck top in stretch satin, fully lined. A quiet statement piece for evenings out.", pattern: "diagonal", img: "images/dress7.jpeg" },
   { id: 8, name: "Talia Denim Skirt", cat: "Skirts", price: 1790, stock: "Only 2 left", desc: "A-line raw-hem denim mini with front button placket. The one piece that goes with everything.", pattern: "dot", img: "images/dress8.jpeg" },
];
