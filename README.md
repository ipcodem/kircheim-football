# Kircheim Nogomet — Team Picker (web verzija)

Statička web aplikacija (bez server, bez baza) za izbor kapiteni/zamenici/golmani
i slučajna, no fer podelba na 3 tima. Site podatoci se čuvaat lokalno vo
brauzerot (localStorage) na uredot na koj se koristi.

## Kako da ja staviš na GitHub Pages (besplatno hosting)

1. Napravi nov repozitorium na GitHub (na pr. `kircheim-nogomet`).
2. Kači gi ovie fajla vo root na repozitoriumot:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `firebase-config.js`
   - papkata `assets/` (so `flags_tile.png`)
3. Odi vo **Settings → Pages** na repozitoriumot.
4. Pod "Build and deployment", izberi **Deploy from a branch**, granka `main`,
   folder `/ (root)`.
5. Začuvaj. Po nekolku minuti, stranicata ќе biде dostapna na:
   `https://<tvoeto-korisnichko-ime>.github.io/kircheim-nogomet/`

Toa e site. Nema potreba od build чекор, server, ili baza — samo statichni
fajlovi.

## Kako rabotat podatocite

- **Baza na igrači** — se čuva vo brauzerot (localStorage) na uredot. Ako
  koristiš aplikacijata na poveke telefoni/kompjuteri, koristi go
  "Export baza (.json)" na eden uredaj i "Import baza (.json)" na drugiot
  za da ja preneseš listata.
- **Denešen sostav i uloge** — isto taka se čuvaat lokalno, za da ne se
  izgubat ako go zatvoriš brauzerot slučajno.
- **Export CSV/PDF na timovite** — sluzhi za da im ja prateš listata na
  igrachite (na pr. preku WhatsApp) po izvlekuvanjeto.

## Sподelena nedelna brava na izvlekuvanjeto (Firebase)

Po standard, izvlekuvanjeto na timovi e ograničeno na **ednaš nedelno**
(od ponedelnik do nedela). Ako veke ima izvlekuvanje ovaa nedela, sekoj
sleden obid bara admin lozinka — i toa **za bilo koj korisnik, na bilo koj
browser ili uredaj**, ne samo lokalno, blagodarение na besplatna Firebase
Realtime Database. Bez ovoj čekor, bravata rabotи samo lokalno (vo
istiot browser), kako sto rabotеše i pred izmenata.

### Cekor po chekor (~5 minuti, besplatno, bez kreditna kartička)

1. Odi na [console.firebase.google.com](https://console.firebase.google.com)
   i najavi se so Google smetka.
2. Klikni **"Add project"**, daj mu bilo kakvo ime (na pr. `kircheim-nogomet`),
   isklučи Google Analytics (ne e potreben) i kreiraj go proektot.
3. Vo levoto meni, odi na **Build → Realtime Database** i klikni
   **"Create Database"**.
   - Izberi lokacija (na pr. `europe-west1`).
   - Izberi **"Start in test mode"** (dozvolува čitanje/pišuvanje за 30 dena
     — posle toa treba da ги prodolжiš pravilata, vidi чекor 5 podolu).
4. Otkako ќе se kreira bazata, vo levoto meni klikni na sikonata **⚙️
   (Project settings)** → skroluj dolu do **"Your apps"** → klikni na
   ikonata `</>` (Web app) → daj mu ime i klikni **"Register app"**.
   Firebase ќе ti pokaže objekt sličen na ovoj:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "kircheim-nogomet.firebaseapp.com",
     databaseURL: "https://kircheim-nogomet-default-rtdb.europe-west1.firebasedatabase.app",
     projectId: "kircheim-nogomet",
     ...
   };
   ```
5. Kopiraj gi `apiKey`, `authDomain`, `databaseURL` i `projectId` vo
   fajlot **`firebase-config.js`** od ovoj proekt (zameni gi
   `TVOJ_API_KEY` / `TVOJ_PROJEKT` so tvoite vrednosti) i качи go i toj
   fajl na GitHub Pages zaedno so ostanatite.
6. (Preporačano) Vo **Realtime Database → Rules**, stavi nesto vakvo za
   да ne isteče posle 30 dena i za da e ograniченo samo na ova mesto vo
   bazata:
   ```json
   {
     "rules": {
       "kircheimDrawLock": {
         ".read": true,
         ".write": true
       },
       ".read": false,
       ".write": false
     }
   }
   ```

**Vazhno za bezbednost:** ova e statička stranica bez server, pa `apiKey`-
ot vo `firebase-config.js` e vidliv za sekoj koj go otvora izvorniot kod
na stranicata (kako i admin lozinkata vo `app.js`). Toa e ista razina na
"zaštita" kako i ostanatiot del od aplikacijata — dobra za sprečuvanje
slučajno/nenamerno menuvanje megu drugarite od timot, no ne e vistinska
sigurnosna barierа protiv nekoj koj namerno saka da ja zaobiколи. Правилата
odgore go ograničuvaat pristapot samo do `kircheimDrawLock` delot od
bazata (ne dozvolувaat čitanje/pišuvanje na ostanatiot del).

Ako ne saka da se zamaraš so Firebase, ostavi go `firebase-config.js`
kako sto e (so `TVOJ_...` placeholder-i) — aplikacijata ќе rabotи
normalno, samo sto bravata ќе važи samo lokalno vo browserot na sekoj
korisnik posebno (kako pred ovaa izmena).

## Lokalno testiranje pred da kachish

Ne ti treba ništo posebno — samo otvori go `index.html` direktno vo
brauzer, ili ako sakaš lokalen server:

```bash
python3 -m http.server 8000
```

i otvori `http://localhost:8000`.
