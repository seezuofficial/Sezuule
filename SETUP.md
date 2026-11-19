# SEEZU® setup checklist

## 1. Content bharna (sirf `content.js`)
- [ ] `social`: Instagram, X (aur chahiye to YouTube/LinkedIn) ke asli links
- [ ] `intro`: apna introduction (photo `photos/seezu.jpg` pehle se hai)
- [ ] `art`: drawings (photo + naam + category + 1 line)
- [ ] `albums`: albums aur unki photos
- [ ] `trips.done`: ho chuki trips, `trips.plan`: plan wali trips (**sirf mahina**, exact date nahi)
- [ ] Har trip ka Google Maps link (Maps -> Share -> Copy link)
- [ ] `tawk`: Tawk.to ki Property ID + Widget ID (dono). Tab tak chat bubble band rahega
- [ ] Sab "REPLACE:" bhar dene ke baad `demo: false` karein (EDIT tag aur khali cheezein chhup jayengi)

- [ ] `links`: apne saare links (group ke hisaab se). Social links Links page par apne aap upar aate hain
- [ ] `friends`: dost ka naam, tag, 1 line, profile link, photo. **Sirf unhi ko jodein jinhone haan kaha ho**
- [ ] `mail` (friend circle ki requests yahin aayengi) aur optional `friendsForm` (Google Form link)

> Friend circle GitHub Pages par chalta hai, jahan koi server nahi hota. Isliye log khud list mein add nahi ho sakte: wo mail/form se request bhejte hain, aap `content.js` mein jod dete hain.

## 2. Photos se location hatana (upload se PEHLE)
1. `pip install pillow`
2. `python strip-gps.py photos` -> `photos_clean/` banega
3. `photos_clean/` ki photos GitHub par upload karein

## 3. Purane placeholders (abhi code mein, apni marzi se badlein)
- [ ] `index.html`: contact section ke Instagram / X links
- [ ] `index.html`: "Now" strip (Playing / Watching)
- [ ] `projects.html`: screenshot `photos/seezu-site.jpg`
- [ ] `upgrade.js` ke upar wala EDIT block (popup text)

## 4. Publish
- [ ] Saari files GitHub repo mein upload/commit karein
- [ ] Settings -> Pages se check karein: seezuofficial.github.io/Sezuule
- [ ] Phone, tablet, laptop par ek baar dekh lein
