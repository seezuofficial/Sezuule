/* ===== SEEZU content: poora content yahin se badlega =====
   "REPLACE:" = yahan apni asli cheez likhein.
   demo:true  -> REPLACE wali cheezein "EDIT" tag ke saath dikhti hain
   demo:false -> REPLACE wali cheezein site par chhup jati hain (launch ke time false karein) */
window.SEEZU_C = {
  demo: true,

  social: [
    { n: "GITHUB",    u: "https://github.com/seezuofficial" },
    { n: "INSTAGRAM", u: "https://www.instagram.com/shady.seezu?cnvx=MWoyZ3I0cGNxNHc1dw==" },
    { n: "X",         u: "REPLACE: apna X / Twitter profile link" }
    // aur chahiye to: { n: "YOUTUBE", u: "REPLACE: link" }
  ],

  /* "Let's Connect" section (home page) + Links page "Social" group.
     id = brand icon, h = username shown on the card, u = link.
     copy = no link, tapping the card copies this text (WhatsApp: add u: "https://wa.me/91XXXXXXXXXX" to make it a link) */
  connect: [
    { id: "instagram", n: "Instagram", h: "@shady.seezu",   u: "https://www.instagram.com/shady.seezu?cnvx=MWoyZ3I0cGNxNHc1dw==" },
    { id: "whatsapp",  n: "WhatsApp",  h: "@seezurox",      copy: "@seezurox" },
    { id: "youtube",   n: "YouTube",   h: "@season302-t3c", u: "https://youtube.com/@season302-t3c?si=pQJCkCwbnszD0c0w" },
    { id: "facebook",  n: "Facebook",  h: "Open profile",   u: "https://www.facebook.com/share/1EKVfSWAT7/" },
    { id: "snapchat",  n: "Snapchat",  h: "sezzzu_2867121", u: "https://www.snapchat.com/add/sezzzu_2867121?share_id=yl-xuVaGReM&locale=en-IN" },
    { id: "telegram",  n: "Telegram",  h: "@seezuuuu07",    u: "https://t.me/seezuuuu07" },
    { id: "pinterest", n: "Pinterest", h: "Open profile",   u: "https://pin.it/6iiJwMWfP" }
  ],

  intro: [
    "REPLACE: apna introduction likhein (2-3 lines: aap kaun hain, kya karte hain, kya pasand hai)",
    "REPLACE: (optional) ek aur line"
  ],

  art: [
    { t: "REPLACE: drawing ka naam", cat: "REPLACE: category (jaise Sketch)", img: "REPLACE: photos/art-1.jpg", d: "REPLACE: drawing ke baare mein 1 line" },
    { t: "REPLACE: doosri drawing",  cat: "REPLACE: category (jaise Digital)", img: "REPLACE: photos/art-2.jpg", d: "REPLACE: 1 line" }
  ],

  albums: [
    { t: "REPLACE: album ka naam", d: "REPLACE: album ke baare mein 1 line", photos: [] /* jaise ["photos/a1.jpg","photos/a2.jpg"] */ },
    { t: "REPLACE: doosra album",  d: "REPLACE: 1 line", photos: [] }
  ],

  trips: {
    done: [ { place: "REPLACE: jagah", when: "REPLACE: mahina + saal", note: "REPLACE: 1 line", map: "REPLACE: Google Maps link" } ],
    plan: [ { place: "REPLACE: jagah", when: "REPLACE: sirf mahina (exact date nahi)", note: "REPLACE: 1 line", map: "REPLACE: Google Maps link" } ]
  },

  /* Email jis par friend circle ki requests aayengi (aapki site ka wahi mail) */
  mail: "hello@seezu.me",

  /* LINKS page: groups. Social links apne aap sabse upar aate hain (upar wale "social" se) */
  links: [
    { group: "REPLACE: group ka naam (jaise Projects / Music / Work)", items: [
      { t: "REPLACE: link ka title", u: "REPLACE: https://...", d: "REPLACE: 1 line (optional)" }
    ] }
  ],

  /* FRIENDS page: sirf unhi ko jodein jinhone haan kaha ho; private jaankari mat daalein */
  friends: [
    { name: "REPLACE: dost ka naam", tag: "REPLACE: kaun hai (jaise College / Gaming)", bio: "REPLACE: 1 line", link: "REPLACE: unka profile link", photo: "REPLACE: photos/friend-1.jpg" }
  ],
  /* optional: Google Form ka link, taaki log khud form bhar sakein (mail ke alawa) */
  friendsForm: "REPLACE: Google Form link (optional)",

  /* Tawk.to: dono ID aane par hi chat bubble chalu hoga */
  tawk: { propertyId: "REPLACE: Tawk property ID", widgetId: "REPLACE: Tawk widget ID" }
};
