# Kircheim Nogomet — Team Picker (web verzija)

Statička web aplikacija (bez server) za izbor kapiteni/zamenici/golmani
i slučajna, no fer podelba na 3 tima. Baza na igrači i nedelnata brava na
izvlekuvanjeto se SPODELENI megu SITE korisnici koga e konfiguriran
Firebase (vidi podolu) — vo sprotivno, se čuvaat samo lokalno vo
brauzerot (localStorage) na uredot.

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

Toa e site. Nema potreba od build чекор ili server — samo statichni
fajlovi.

## Kako rabotat podatocite

- **Baza na igrači** — ako `firebase-config.js` e popolнет (vidi podolu),
  bazata e SPODELENA za SITE korisnici na SITE uredi/browseri, vo realno
  vreme (koga nekoj dodade/izbriše igrač, site ostanati go gledaat toa
  avtomatski, bez refresh). Ako Firebase NE e konfiguriran, sekoj korisnik
  ima svoja odvoena baza, samo vo negoviot browser (localStorage) — vo
  toj slučaj koristi "Export baza (.txt)" na eden uredaj i "Import baza
  (.txt)" na drugiot za da ja preneseš listata.
- **Denešen sostav, uloge i izvlečeni timovi** — ako Firebase e
  konfiguriran, i ova e SPODELENO za SITE korisnici, vo realno vreme:
  koj e izbran vo sostavot, koj e kapiten/zamenik/golman, i koi timovi se
  izvlečeni za ovaa nedela — site go gledaat istoto. Ako Firebase NE e
  konfiguriran, ova se čuva samo lokalno vo browserot.
- **Export CSV/PDF na timovite** — sluzhi za da im ja prateš listata na
  igrachite (na pr. preku WhatsApp) po izvlekuvanjeto.

## Spodelena baza I nedelna brava na izvlekuvanjeto (Firebase)

**Baza na igrači** — otkako ke go popolniš `firebase-config.js`, bazata
stanuva SPODELENA: koga nekoj dodade ili izbriše igrač, promenata se
gleda kaj SITE, na bilo koj uredaj, avtomatski.

**Nedelna brava na izvlekuvanjeto** — po standard, izvlekuvanjeto na
timovi e ograničeno na **ednaš nedelno** (od ponedelnik do nedela). Ako
veke ima izvlekuvanje ovaa nedela, sekoj sleden obid bara admin lozinka —
za bilo koj korisnik, na bilo koj uredaj, blagodarение na istata Firebase
Realtime Database.

Bez ovoj čekor, i dvete raboтat samo lokalno (vo istiot browser), kako
sto rabotеše i pred izmenata.

### Cekor po chekor (~5 minuti, besplatno, bez kreditna kartička)

1. Odi na [console.firebase.google.com](https://console.firebase.google.com)
   i najavi se so Google smetka.
2. Klikni **"Add project"**, daj mu bilo kakvo ime (na pr. `kircheim-nogomet`),
   isklučи Google Analytics (ne e potreben) i kreiraj go proektot.
3. Vo levoto meni, odi na **Build → Realtime Database** i klikni
   **"Create Database"**.
   - Izberi lokacija (na pr. `europe-west1`).
   - Izberi **"Start in test mode"** (dozvoluva čitanje/pišuvanje за 30 dena
     — posle toa treba da ги prodolжiš pravilata, vidi чекor 6 podolu).
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
   fajlot **`firebase-config.js`** od ovoj proekt — vo promenlivata
   **`FIREBASE_CONFIG`** (so golemi bukvi, taka kako sto e vekje napišano
   vo fajлot) i качи go i toj fajl na GitHub Pages zaedno so ostanatite.
6. (Preporačano) Vo **Realtime Database → Rules**, stavi nesto vakvo za
   да ne isteče posle 30 dena i za da e ograniченo samo na ovie dve mesta
   vo bazata:
   ```json
   {
     "rules": {
       "kircheimDrawLock": {
         ".read": true,
         ".write": true
       },
       "kircheimPickFirstLock": {
         ".read": true,
         ".write": true
       },
       "kircheimRoster": {
         ".read": true,
         ".write": true
       },
       "kircheimSquad": {
         ".read": true,
         ".write": true
       },
       "kircheimDrawResult": {
         ".read": true,
         ".write": true
       },
       "kircheimAuth": {
         ".read": true,
         ".write": false
       },
       ".read": false,
       ".write": false
     }
   }
   ```

   Забелешка за `kircheimAuth`: `.write` е нарочно `false`. Апликацијата
   само ги *чита* хешевите на лозинките оттаму — ти ги менуваш рачно
   преку Firebase Console (Realtime Database → Data → `kircheimAuth`),
   не преку самата апликација. Ова спречува било кој технички поткован
   корисник да ги промени лозинките преку browser конзолата.

7. **Menuvanje na lozinkite bez editiranje na app.js:** otvori го
   `hash-generator.html` (lokalno, vo bilo koj browser — ne bara internet
   ni Firebase), vnesi ja novata lozinka, kopiraj go generiraniot heš, i
   zalepi go vo Firebase Console → Realtime Database, pod:
   - `kircheimAuth/sitePasswordHash` — lozinkata za vlez vo aplikacijata
   - `kircheimAuth/adminPasswordHash` — admin lozinkata

   Ako `kircheimAuth` uste nema vrednosti (prv pat), aplikacijata
   automatski gi koristi standardnite lozinki `kircheim2026` i
   `admin2026` dodeka ne zapišeš svoi heševi.

**Vazhno za bezbednost:** ova e statička stranica bez server, pa `apiKey`-
ot vo `firebase-config.js` e vidliv za sekoj koj go otvora izvorniot kod
na stranicata (kako i admin lozinkata vo `app.js`). Toa e ista razina na
"zaštita" kako i ostanatiot del od aplikacijata — dobra za sprečuvanje
slučajno/nenamerno menuvanje megu drugarite od timot, no ne e vistinska
sigurnosna barierа protiv nekoj koj namerno saka da ja zaobiколи. Правилата
odgore go ograničuvaat pristapot samo do `kircheimDrawLock`,
`kircheimRoster`, `kircheimSquad` i `kircheimDrawResult` delovite od
bazata (ne dozvoluvaat čitanje/pišuvanje na ostanatiot del).

Ako ne saka da se zamaraš so Firebase, ostavi go `firebase-config.js`
kako sto e (so `TVOJ_...` placeholder-i) — aplikacijata ќе rabotи
normalno, samo sto sekoj korisnik ke ima svoja odvoena baza i bravata ќе
važи samo lokalno vo browserot na sekoj korisnik posebno.

## Lokalno testiranje pred da kachish

Ne ti treba ništo posebno — samo otvori go `index.html` direktno vo
brauzer, ili ako sakaš lokalen server:

```bash
python3 -m http.server 8000
```

i otvori `http://localhost:8000`.
