/* ============================================================
   G&R LANDMARK — images.config.js
   ============================================================
   HOW TO ADD PHOTOS:
   1. Drop your image file into the correct folder inside /images/
      e.g.  images/kitchen/my-new-kitchen.jpg
   2. Add the filename to the matching array below
   3. Fill in a title and caption — that's it!
   
   The gallery will automatically rebuild itself on page load.
   
   SUPPORTED FILE TYPES: .jpg  .jpeg  .png  .webp
   ============================================================ */

const GALLERY_CONFIG = {

    kitchen: {
        label: "Kitchens",
        folder: "images/kitchen/", 
        images: [
            { file: "1.jpeg",   title: "White Shaker Kitchen",    caption: "Concord, NC — Quartz countertops & custom cabinets" },
            { file: "2.jpeg",     title: "Dark & Modern Kitchen",   caption: "Charlotte, NC — Waterfall island & under-cabinet lighting" },
            { file: "3.jpeg",     title: "Dark & Modern Kitchen",   caption: "Charlotte, NC — Waterfall island & under-cabinet lighting" },
            { file: "4.jpeg",     title: "Dark & Modern Kitchen",   caption: "Charlotte, NC — Waterfall island & under-cabinet lighting" },
            { file: "5.jpeg",     title: "Dark & Modern Kitchen",   caption: "Charlotte, NC — Waterfall island & under-cabinet lighting" },
            { file: "6.jpeg",     title: "Dark & Modern Kitchen",   caption: "Charlotte, NC — Waterfall island & under-cabinet lighting" },
            { file: "7.jpeg",     title: "Dark & Modern Kitchen",   caption: "Charlotte, NC — Waterfall island & under-cabinet lighting" },
            { file: "8.jpeg",     title: "Dark & Modern Kitchen",   caption: "Charlotte, NC — Waterfall island & under-cabinet lighting" },
            { file: "9.jpeg",     title: "Dark & Modern Kitchen",   caption: "Charlotte, NC — Waterfall island & under-cabinet lighting" },
        ]
    },

    bathroom: {
        label: "Bathrooms",
        folder: "images/bathroom/",
        images: [
             { file: "1.jpeg",   title: "Spa-Style Bathroom",   caption: "Charlotte, NC — Walk-in shower with custom tile" },
             { file: "2.jpeg",  title: "Master Bath Suite",    caption: "Kannapolis, NC — Double vanity & soaking tub" },
             { file: "3.jpeg",  title: "Master Bath Suite",    caption: "Kannapolis, NC — Double vanity & soaking tub" },
             { file: "4.jpeg",  title: "Master Bath Suite",    caption: "Kannapolis, NC — Double vanity & soaking tub" },
             { file: "5.jpeg",  title: "Master Bath Suite",    caption: "Kannapolis, NC — Double vanity & soaking tub" },
        ]
    },


    outdoor: {
        label: "Decks & Outdoor",
        folder: "images/outdoor/",
        images: [
            { file: "1.jpeg",  title: "Composite Deck Build",  caption: "Concord, NC — 400 sq ft Trex composite deck" },
        ]
    },

    flooring: {
        label: "Flooring",
        folder: "images/flooring/",
        images: [
            { file: "1.jpeg",      title: "LVP Throughout Home",    caption: "Charlotte, NC — Full first-floor LVP install" },
            { file: "2.jpeg", title: "Hardwood Refinish",     caption: "Mooresville, NC — Refinished original oak hardwood" },
        ]
    },

    painting: {
        label: "Painting",
        folder: "images/painting/",
        images: [
             { file: "1.jpeg",   title: "Full Exterior Paint",    caption: "Concord, NC — Two-tone exterior repaint" },
             { file: "2.jpeg",    title: "Cabinet Refinishing",    caption: "Charlotte, NC — Kitchen cabinet spray finish" },
        ]
    },

    

};

/* ============================================================
   FALLBACK IMAGES
   Used automatically when a category has no photos yet,
   so the gallery always looks full while you're adding your own.
   You can delete these once your real photos are loaded.
   ============================================================ */
const FALLBACK_IMAGES = {
    kitchen:      { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", title: "Kitchen Remodel",        caption: "Concord, NC — Custom cabinets & quartz countertops" },
    bathroom:     { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80", title: "Spa Bathroom",          caption: "Charlotte, NC — Walk-in shower with custom tile" },
    outdoor:      { src: "https://images.unsplash.com/photo-1591579068535-ecdcb3dc07f1?auto=format&fit=crop&w=800&q=80", title: "Composite Deck",        caption: "Concord, NC — 400 sq ft composite deck" },
    flooring:     { src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80", title: "LVP Flooring Install",  caption: "Charlotte, NC — Full first-floor LVP" },
    painting:     { src: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=800&q=80", title: "Interior Painting",      caption: "Concord, NC — Full interior repaint" },
    
};
