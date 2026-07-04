// =========================================================
// Kircheim Nogomet — Team Picker (static, localStorage-based)
// =========================================================

const STORAGE_ROSTER = "kircheim.roster.v1";
const STORAGE_SESSION = "kircheim.session.v1";
const STORAGE_LAST_DRAW = "kircheim.lastdraw.v1";
const STORAGE_AUTH = "kircheim.auth.v1";
const SESSION_MAX_AGE_MS = 60 * 60 * 1000; // 1 čas — posle ovoj period, bara повторно lozinka
const STORAGE_LANG = "kircheim.lang.v1";
const MAX_ROSTER = 50;

// Zaedничka lozinka za vlez na site. Promeni ja ovaa vrednost ako sakaš druga.
const SITE_PASSWORD = "kircheim2026";

// Admin lozinka koja dozvoluva povtorno izvlekuvanje ist den i celosen reset.
// Promeni ja ovaa vrednost ako sakaš druga lozinka.
const ADMIN_PASSWORD = "admin2026";

// =========================================================
// i18n — Makedonski / Srpski / Hrvatski / Crnogorski / Deutsch
// =========================================================

const LANGS = ["mk", "sr", "hr", "cnr", "ba", "de"];
const DEFAULT_LANG = "mk";

const I18N = {
  login_subtitle: {
    mk: "Vnesi ja lozinkata za timot za da vlezeš.",
    sr: "Unesi lozinku tima da bi ušao.",
    hr: "Unesi lozinku ekipe da bi ušao.", ba: "Unesi lozinku ekipe da bi ušao.",
    cnr: "Unesi lozinku ekipe da bi ušao.",
    de: "Gib das Team-Passwort ein, um fortzufahren.",
  },
  login_pass_placeholder: {
    mk: "Lozinka…", sr: "Lozinka…", hr: "Lozinka…", ba: "Lozinka…", cnr: "Lozinka…", de: "Passwort…",
  },
  login_btn: {
    mk: "Vlez", sr: "Uđi", hr: "Uđi", ba: "Uđi", cnr: "Uđi", de: "Anmelden",
  },
  login_error: {
    mk: "Pogrešna lozinka, probaj povtorno.",
    sr: "Pogrešna lozinka, probaj ponovo.",
    hr: "Pogrešna lozinka, pokušaj ponovno.", ba: "Pogrešna lozinka, pokušaj ponovno.",
    cnr: "Pogrešna lozinka, probaj ponovo.",
    de: "Falsches Passwort, versuch es noch einmal.",
  },
  banner_lead: {
    mk: "Vnesi igrači, izberi kapiteni i golmani, i izvlечи tri fer timovi za denešniot mač.",
    sr: "Unesi igrače, izaberi kapitene i golmane, i izvuci tri fer tima za današnji meč.",
    hr: "Unesi igrače, izaberi kapetane i vratare, i izvuci tri fer momčadi za današnju utakmicu.", ba: "Unesi igrače, izaberi kapetane i vratare, i izvuci tri fer momčadi za današnju utakmicu.",
    cnr: "Unesi igrače, izaberi kapitene i golmane, i izvuci tri fer tima za današnji meč.",
    de: "Spieler eingeben, Kapitäne und Torwarte wählen und drei faire Teams fürs heutige Spiel auslosen.",
  },
  step1: { mk: "Vnes", sr: "Unos", hr: "Unos", ba: "Unos", cnr: "Unos", de: "Eingabe" },
  step2: { mk: "Uloge", sr: "Uloge", hr: "Uloge", ba: "Uloge", cnr: "Uloge", de: "Rollen" },
  step3: { mk: "Izvlekuvanje", sr: "Izvlačenje", hr: "Izvlačenje", ba: "Izvlačenje", cnr: "Izvlačenje", de: "Auslosung" },

  logout_btn: {
    mk: "⏻ Odjava", sr: "⏻ Odjava", hr: "⏻ Odjava", ba: "⏻ Odjava", cnr: "⏻ Odjava", de: "⏻ Abmelden",
  },

  col1_title: {
    mk: "Baza na igrači", sr: "Baza igrača", hr: "Baza igrača", ba: "Baza igrača", cnr: "Baza igrača", de: "Spielerdatenbank",
  },
  col1_hint: {
    mk: 'Klikni ime za da go dodadeš vo denešniot sostav. „✕" trajno briše od bazata (bara admin lozinka).',
    sr: 'Klikni ime da ga dodaš u današnji sastav. „✕" trajno briše iz baze (potrebna admin lozinka).',
    hr: 'Klikni ime da ga dodaš u današnji sastav. „✕" trajno briše iz baze (potrebna admin lozinka).', ba: 'Klikni ime da ga dodaš u današnji sastav. „✕" trajno briše iz baze (potrebna admin lozinka).',
    cnr: 'Klikni ime da ga dodaš u današnji sastav. „✕" trajno briše iz baze (potrebna admin lozinka).',
    de: 'Klick auf einen Namen, um ihn zum heutigen Kader hinzuzufügen. „✕" löscht ihn dauerhaft (Admin-Passwort erforderlich).',
  },
  roster_search_placeholder: {
    mk: "Pretraži ja bazata…", sr: "Pretraži bazu…", hr: "Pretraži bazu…", ba: "Pretraži bazu…", cnr: "Pretraži bazu…", de: "Datenbank durchsuchen…",
  },
  new_roster_placeholder: {
    mk: "Novo ime za bazata…", sr: "Novo ime za bazu…", hr: "Novo ime za bazu…", ba: "Novo ime za bazu…", cnr: "Novo ime za bazu…", de: "Neuer Name…",
  },
  add_roster_btn: { mk: "Dodadi", sr: "Dodaj", hr: "Dodaj", ba: "Dodaj", cnr: "Dodaj", de: "Hinzufügen" },
  bulk_summary: {
    mk: "Rakopisno / uvezi listа od notepad",
    sr: "Ručni unos / uvezi listu iz notepada",
    hr: "Ručni unos / uvezi popis iz notepada", ba: "Ručni unos / uvezi popis iz notepada",
    cnr: "Ručni unos / uvezi listu iz notepada",
    de: "Manuell eingeben / Liste aus Notepad importieren",
  },
  bulk_hint: {
    mk: "Edno ime vo sekoj red. Bazata prima maks. 50 igrači.",
    sr: "Jedno ime u svakom redu. Baza prima maks. 50 igrača.",
    hr: "Jedno ime u svakom retku. Baza prima maks. 50 igrača.", ba: "Jedno ime u svakom retku. Baza prima maks. 50 igrača.",
    cnr: "Jedno ime u svakom redu. Baza prima maks. 50 igrača.",
    de: "Ein Name pro Zeile. Die Datenbank fasst max. 50 Spieler.",
  },
  bulk_textarea_placeholder: {
    mk: "Igor\nAdo\nHaris…", sr: "Igor\nAdo\nHaris…", hr: "Igor\nAdo\nHaris…", ba: "Igor\nAdo\nHaris…", cnr: "Igor\nAdo\nHaris…", de: "Igor\nAdo\nHaris…",
  },
  bulk_import_btn: {
    mk: "Dodadi ja listata vo bazata",
    sr: "Dodaj listu u bazu",
    hr: "Dodaj popis u bazu", ba: "Dodaj popis u bazu",
    cnr: "Dodaj listu u bazu",
    de: "Liste zur Datenbank hinzufügen",
  },
  export_roster_btn: { mk: "⭳ Export baza (.txt)", sr: "⭳ Izvezi bazu (.txt)", hr: "⭳ Izvezi bazu (.txt)", ba: "⭳ Izvezi bazu (.txt)", cnr: "⭳ Izvezi bazu (.txt)", de: "⭳ Datenbank exportieren (.txt)" },
  import_roster_btn: { mk: "⭱ Import baza (.txt)", sr: "⭱ Uvezi bazu (.txt)", hr: "⭱ Uvezi bazu (.txt)", ba: "⭱ Uvezi bazu (.txt)", cnr: "⭱ Uvezi bazu (.txt)", de: "⭱ Datenbank importieren (.txt)" },

  col2_title: { mk: "Denešen sostav", sr: "Današnji sastav", hr: "Današnji sastav", ba: "Današnji sastav", cnr: "Današnji sastav", de: "Heutiger Kader" },
  clear_squad_btn: {
    mk: "🗑 Isprazni go sostavot", sr: "🗑 Isprazni sastav", hr: "🗑 Isprazni sastav", ba: "🗑 Isprazni sastav", cnr: "🗑 Isprazni sastav", de: "🗑 Kader leeren",
  },
  squad_empty: {
    mk: "Uште nema izbrani igrači. Klikni imiња od bazata levo.",
    sr: "Još nema izabranih igrača. Klikni imena iz baze levo.",
    hr: "Još nema izabranih igrača. Klikni imena iz baze lijevo.", ba: "Još nema izabranih igrača. Klikni imena iz baze lijevo.",
    cnr: "Još nema izabranih igrača. Klikni imena iz baze lijevo.",
    de: "Noch keine Spieler ausgewählt. Klick links auf Namen aus der Datenbank.",
  },
  legend_captain: { mk: "Kapiten", sr: "Kapiten", hr: "Kapetan", ba: "Kapetan", cnr: "Kapiten", de: "Kapitän" },
  legend_vice: { mk: "Zamenik", sr: "Zamenik", hr: "Zamjenik", ba: "Zamjenik", cnr: "Zamjenik", de: "Vize-Kapitän" },
  legend_gk: { mk: "Golman", sr: "Golman", hr: "Vratar", ba: "Vratar", cnr: "Golman", de: "Torwart" },

  col3_title: { mk: "Izvlekuvanje", sr: "Izvlačenje", hr: "Izvlačenje", ba: "Izvlačenje", cnr: "Izvlačenje", de: "Auslosung" },
  col3_hint: {
    mk: "Slučaen raspored — po eden kapiten i zamenik vo sekoj tim, i po eden golman.",
    sr: "Slučajan, ali fer raspored — po jedan kapiten i zamenik u svakom timu.",
    hr: "Slučajan, ali fer raspored — po jedan kapetan i zamjenik u svakoj momčadi.", ba: "Slučajan, ali fer raspored — po jedan kapetan i zamjenik u svakoj momčadi.",
    cnr: "Slučajan, ali fer raspored — po jedan kapiten i zamjenik u svakom timu.",
    de: "Zufällige, aber faire Aufteilung — je ein Kapitän und Vize pro Team.",
  },
  draw_btn: { mk: "🎲 Podeli timovi", sr: "🎲 Podeli timove", hr: "🎲 Podijeli momčadi", ba: "🎲 Podijeli momčadi", cnr: "🎲 Podijeli timove", de: "🎲 Teams auslosen" },
  pick_first_btn: { mk: "⚽ Koj igra prvi", sr: "⚽ Ko igra prvi", hr: "⚽ Tko igra prvi", ba: "⚽ Tko igra prvi", cnr: "⚽ Ko igra prvi", de: "⚽ Wer spielt zuerst" },

  team1: { mk: "Tim 1", sr: "Tim 1", hr: "Momčad 1", ba: "Momčad 1", cnr: "Tim 1", de: "Team 1" },
  team2: { mk: "Tim 2", sr: "Tim 2", hr: "Momčad 2", ba: "Momčad 2", cnr: "Tim 2", de: "Team 2" },
  team3: { mk: "Tim 3", sr: "Tim 3", hr: "Momčad 3", ba: "Momčad 3", cnr: "Tim 3", de: "Team 3" },
  team_word: { mk: "Tim", sr: "Tim", hr: "Momčad", ba: "Momčad", cnr: "Tim", de: "Team" },

  matchbox_title: { mk: "KOJ IGRA PRVI", sr: "KO IGRA PRVI", hr: "TKO IGRA PRVI", ba: "TKO IGRA PRVI", cnr: "KO IGRA PRVI", de: "WER SPIELT ZUERST" },
  matchbox_playing: { mk: "IGRAAT:", sr: "IGRAJU:", hr: "IGRAJU:", ba: "IGRAJU:", cnr: "IGRAJU:", de: "SPIELEN:" },
  matchbox_waiting: { mk: "ČEKA:", sr: "ČEKA:", hr: "ČEKA:", ba: "ČEKA:", cnr: "ČEKA:", de: "WARTET:" },

  export_csv_btn: { mk: "⭳ Export CSV", sr: "⭳ Izvezi CSV", hr: "⭳ Izvezi CSV", ba: "⭳ Izvezi CSV", cnr: "⭳ Izvezi CSV", de: "⭳ CSV exportieren" },
  export_pdf_btn: { mk: "⭳ Export PDF", sr: "⭳ Izvezi PDF", hr: "⭳ Izvezi PDF", ba: "⭳ Izvezi PDF", cnr: "⭳ Izvezi PDF", de: "⭳ PDF exportieren" },

  footer_text: {
    mk: 'Sè se čuva lokalno vo ovoj brauzer. Koristi „Export baza" za da napraviš rezervna kopija ili za da ja prenesеš na drug uredaj.',
    sr: 'Sve se čuva lokalno u ovom pregledaču. Koristi „Izvezi bazu" da napraviš rezervnu kopiju ili je prebaciš na drugi uređaj.',
    hr: 'Sve se sprema lokalno u ovom pregledniku. Koristi „Izvezi bazu" da napraviš sigurnosnu kopiju ili je prebaciš na drugi uređaj.', ba: 'Sve se sprema lokalno u ovom pregledniku. Koristi „Izvezi bazu" da napraviš sigurnosnu kopiju ili je prebaciš na drugi uređaj.',
    cnr: 'Sve se čuva lokalno u ovom pregledaču. Koristi „Izvezi bazu" da napraviš rezervnu kopiju ili je prebaciš na drugi uređaj.',
    de: 'Alles wird lokal in diesem Browser gespeichert. Nutze „Datenbank exportieren" für ein Backup oder um es auf ein anderes Gerät zu übertragen.',
  },
  sync_status_shared: {
    mk: "🟢 Baza na igrači: spodelena preku Firebase (site korisnici ja gledaat).",
    sr: "🟢 Baza igrača: deljena preko Firebase-a (svi korisnici je vide).",
    hr: "🟢 Baza igrača: dijeljena preko Firebasea (svi korisnici je vide).", ba: "🟢 Baza igrača: dijeljena preko Firebasea (svi korisnici je vide).",
    cnr: "🟢 Baza igrača: deljena preko Firebase-a (svi korisnici je vide).",
    de: "🟢 Spielerdatenbank: über Firebase geteilt (für alle sichtbar).",
  },
  sync_status_local: {
    mk: "⚪ Baza na igrači: samo lokalno vo ovoj brauzer (Firebase ne e konfiguriran).",
    sr: "⚪ Baza igrača: samo lokalno u ovom pregledaču (Firebase nije podešen).",
    hr: "⚪ Baza igrača: samo lokalno u ovom pregledniku (Firebase nije podešen).", ba: "⚪ Baza igrača: samo lokalno u ovom pregledniku (Firebase nije podešen).",
    cnr: "⚪ Baza igrača: samo lokalno u ovom pregledaču (Firebase nije podešen).",
    de: "⚪ Spielerdatenbank: nur lokal in diesem Browser (Firebase nicht konfiguriert).",
  },
  sync_status_error: {
    mk: "🔴 Baza na igrači: Firebase e konfiguriran, no pristapot e odbien — provei gi Rules vo Firebase Console (vidi README).",
    sr: "🔴 Baza igrača: Firebase je podešen, ali pristup je odbijen — proveri Rules u Firebase Console-i (vidi README).",
    hr: "🔴 Baza igrača: Firebase je podešen, ali pristup je odbijen — provjeri Rules u Firebase Console-i (vidi README).", ba: "🔴 Baza igrača: Firebase je podešen, ali pristup je odbijen — provjeri Rules u Firebase Console-i (vidi README).",
    cnr: "🔴 Baza igrača: Firebase je podešen, ali pristup je odbijen — proveri Rules u Firebase Console-i (vidi README).",
    de: "🔴 Spielerdatenbank: Firebase konfiguriert, aber Zugriff verweigert — prüfe die Rules in der Firebase Console (siehe README).",
  },
  reset_all_btn: {
    mk: "♻ Startuvaj odnovo (izbriši sè)",
    sr: "♻ Počni ispočetka (izbriši sve)",
    hr: "♻ Počni ispočetka (izbriši sve)", ba: "♻ Počni ispočetka (izbriši sve)",
    cnr: "♻ Počni ispočetka (izbriši sve)",
    de: "♻ Neu starten (alles löschen)",
  },

  // dynamic / toasts / confirms
  roster_empty_db: {
    mk: "Bazata e prazna. Dodadi igrači dolu za idnina.",
    sr: "Baza je prazna. Dodaj igrače ispod.",
    hr: "Baza je prazna. Dodaj igrače ispod.", ba: "Baza je prazna. Dodaj igrače ispod.",
    cnr: "Baza je prazna. Dodaj igrače ispod.",
    de: "Die Datenbank ist leer. Füge unten Spieler hinzu.",
  },
  roster_no_results: {
    mk: 'Nema rezultati za „{query}".',
    sr: 'Nema rezultata za „{query}".',
    hr: 'Nema rezultata za „{query}".', ba: 'Nema rezultata za „{query}".',
    cnr: 'Nema rezultata za „{query}".',
    de: 'Keine Treffer für „{query}".',
  },
  added_pill: { mk: "Dodaden", sr: "Dodat", hr: "Dodan", ba: "Dodan", cnr: "Dodat", de: "Hinzugefügt" },
  del_btn_title: {
    mk: "Trajno izbriši od bazata (admin lozinka)",
    sr: "Trajno obriši iz baze (admin lozinka)",
    hr: "Trajno obriši iz baze (admin lozinka)", ba: "Trajno obriši iz baze (admin lozinka)",
    cnr: "Trajno obriši iz baze (admin lozinka)",
    de: "Dauerhaft löschen (Admin-Passwort)",
  },
  admin_pass_placeholder: {
    mk: "Admin lozinka…", sr: "Admin lozinka…", hr: "Admin lozinka…", ba: "Admin lozinka…", cnr: "Admin lozinka…", de: "Admin-Passwort…",
  },
  admin_modal_cancel: {
    mk: "Otkaži", sr: "Otkaži", hr: "Otkaži", ba: "Otkaži", cnr: "Otkaži", de: "Abbrechen",
  },
  admin_modal_confirm: {
    mk: "Potvrdi", sr: "Potvrdi", hr: "Potvrdi", ba: "Potvrdi", cnr: "Potvrdi", de: "Bestätigen",
  },

  delete_confirm: {
    mk: 'Vnesi admin lozinka za trajno da se izbriše „{name}" od bazata:',
    sr: 'Unesi admin lozinku da trajno obrišeš „{name}" iz baze:',
    hr: 'Unesi admin lozinku za trajno brisanje „{name}" iz baze:', ba: 'Unesi admin lozinku za trajno brisanje „{name}" iz baze:',
    cnr: 'Unesi admin lozinku da trajno obrišeš „{name}" iz baze:',
    de: 'Admin-Passwort eingeben, um „{name}" dauerhaft aus der Datenbank zu löschen:',
  },
  delete_wrong_pass: {
    mk: "Pogrešna lozinka. Brisanjeto e otkažano.",
    sr: "Pogrešna lozinka. Brisanje je otkazano.",
    hr: "Pogrešna lozinka. Brisanje je otkazano.", ba: "Pogrešna lozinka. Brisanje je otkazano.",
    cnr: "Pogrešna lozinka. Brisanje je otkazano.",
    de: "Falsches Passwort. Löschen abgebrochen.",
  },
  deleted_toast: {
    mk: '„{name}" e otstranet od bazata.', sr: '„{name}" je uklonjen iz baze.', hr: '„{name}" je uklonjen iz baze.', ba: '„{name}" je uklonjen iz baze.', cnr: '„{name}" je uklonjen iz baze.', de: '„{name}" wurde aus der Datenbank entfernt.',
  },
  exists_toast: {
    mk: '„{name}" veke postoi vo bazata.', sr: '„{name}" već postoji u bazi.', hr: '„{name}" već postoji u bazi.', ba: '„{name}" već postoji u bazi.', cnr: '„{name}" već postoji u bazi.', de: '„{name}" existiert bereits in der Datenbank.',
  },
  roster_full_toast: {
    mk: "Bazata e ograničena na {max} igrači. Izbriši nekoгo za da dodadeš nov.",
    sr: "Baza je ograničena na {max} igrača. Obriši nekog da dodaš novog.",
    hr: "Baza je ograničena na {max} igrača. Obriši nekoga da dodaš novog.", ba: "Baza je ograničena na {max} igrača. Obriši nekoga da dodaš novog.",
    cnr: "Baza je ograničena na {max} igrača. Obriši nekog da dodaš novog.",
    de: "Die Datenbank ist auf {max} Spieler begrenzt. Lösche jemanden, um einen neuen hinzuzufügen.",
  },
  added_toast: {
    mk: '„{name}" e dodaden vo bazata.', sr: '„{name}" je dodat u bazu.', hr: '„{name}" je dodan u bazu.', ba: '„{name}" je dodan u bazu.', cnr: '„{name}" je dodat u bazu.', de: '„{name}" wurde zur Datenbank hinzugefügt.',
  },
  bulk_empty_toast: {
    mk: "Nema iminja vo listata za dodavanje.", sr: "Nema imena u listi za dodavanje.", hr: "Nema imena u popisu za dodavanje.", ba: "Nema imena u popisu za dodavanje.", cnr: "Nema imena u listi za dodavanje.", de: "Keine Namen zum Hinzufügen in der Liste.",
  },
  bulk_added_toast: {
    mk: "Dodadeni {added} novi iminja vo bazata ({total}/{max} vkupno).",
    sr: "Dodato {added} novih imena u bazu ({total}/{max} ukupno).",
    hr: "Dodano {added} novih imena u bazu ({total}/{max} ukupno).", ba: "Dodano {added} novih imena u bazu ({total}/{max} ukupno).",
    cnr: "Dodato {added} novih imena u bazu ({total}/{max} ukupno).",
    de: "{added} neue Namen zur Datenbank hinzugefügt ({total}/{max} insgesamt).",
  },
  full_suffix: {
    mk: " {skipped} ne stanaa - bazata e polna.",
    sr: " {skipped} nije stalo - baza je puna.",
    hr: " {skipped} nije stalo - baza je puna.", ba: " {skipped} nije stalo - baza je puna.",
    cnr: " {skipped} nije stalo - baza je puna.",
    de: " {skipped} passten nicht mehr - Datenbank ist voll.",
  },
  import_empty_toast: {
    mk: "Fajlot e prazen ili nema validni iminja.",
    sr: "Fajl je prazan ili nema validnih imena.",
    hr: "Datoteka je prazna ili nema valjanih imena.", ba: "Datoteka je prazna ili nema valjanih imena.",
    cnr: "Fajl je prazan ili nema validnih imena.",
    de: "Die Datei ist leer oder enthält keine gültigen Namen.",
  },
  import_added_toast: {
    mk: "Uvezeni {added} novi iminja od fajlot ({total}/{max} vkupno).",
    sr: "Uvezeno {added} novih imena iz fajla ({total}/{max} ukupno).",
    hr: "Uvezeno {added} novih imena iz datoteke ({total}/{max} ukupno).", ba: "Uvezeno {added} novih imena iz datoteke ({total}/{max} ukupno).",
    cnr: "Uvezeno {added} novih imena iz fajla ({total}/{max} ukupno).",
    de: "{added} neue Namen aus der Datei importiert ({total}/{max} insgesamt).",
  },
  roster_count_hint: {
    mk: "{count} / {max} igrači vo bazata.",
    sr: "{count} / {max} igrača u bazi.",
    hr: "{count} / {max} igrača u bazi.", ba: "{count} / {max} igrača u bazi.",
    cnr: "{count} / {max} igrača u bazi.",
    de: "{count} / {max} Spieler in der Datenbank.",
  },
  squad_count_hint: {
    mk: "{n} igrači • kapiteni {c}/3 • zamenici {v}/3 • golmani {g}/3",
    sr: "{n} igrača • kapiteni {c}/3 • zamenici {v}/3 • golmani {g}/3",
    hr: "{n} igrača • kapetani {c}/3 • zamjenici {v}/3 • vratari {g}/3", ba: "{n} igrača • kapetani {c}/3 • zamjenici {v}/3 • vratari {g}/3",
    cnr: "{n} igrača • kapiteni {c}/3 • zamjenici {v}/3 • golmani {g}/3",
    de: "{n} Spieler • Kapitäne {c}/3 • Vizes {v}/3 • Torwarte {g}/3",
  },
  toggle_cap_max: {
    mk: "Veke imaš 3 kapiteni.", sr: "Već imaš 3 kapitena.", hr: "Već imaš 3 kapetana.", ba: "Već imaš 3 kapetana.", cnr: "Već imaš 3 kapitena.", de: "Du hast bereits 3 Kapitäne.",
  },
  toggle_vice_max: {
    mk: "Veke imaš 3 zamenici.", sr: "Već imaš 3 zamenika.", hr: "Već imaš 3 zamjenika.", ba: "Već imaš 3 zamjenika.", cnr: "Već imaš 3 zamjenika.", de: "Du hast bereits 3 Vize-Kapitäne.",
  },
  toggle_gk_max: {
    mk: "Maksimum 3 golmani.", sr: "Maksimum 3 golmana.", hr: "Maksimalno 3 vratara.", ba: "Maksimalno 3 vratara.", cnr: "Maksimum 3 golmana.", de: "Maximal 3 Torwarte.",
  },
  vice_tag_title: {
    mk: "Zamenik kapiten", sr: "Zamenik kapitena", hr: "Zamjenik kapetana", ba: "Zamjenik kapetana", cnr: "Zamjenik kapitena", de: "Vize-Kapitän",
  },
  remove_x_title: {
    mk: "Otstrani od sostavot", sr: "Ukloni iz sastava", hr: "Ukloni iz sastava", ba: "Ukloni iz sastava", cnr: "Ukloni iz sastava", de: "Aus dem Kader entfernen",
  },
  draw_locked_prompt: {
    mk: "Izvlekuvanjeto veke e napraveno ovaa nedela. Vnesi admin lozinka za da povtoriš:",
    sr: "Izvlačenje je već obavljeno ove nedelje. Unesi admin lozinku da ponoviš:",
    hr: "Izvlačenje je već obavljeno ovaj tjedan. Unesi admin lozinku da ponoviš:", ba: "Izvlačenje je već obavljeno ove sedmice. Unesi admin lozinku da ponoviš:",
    cnr: "Izvlačenje je već obavljeno ove sedmice. Unesi admin lozinku da ponoviš:",
    de: "Die Auslosung wurde diese Woche bereits durchgeführt. Admin-Passwort eingeben, um zu wiederholen:",
  },
  draw_wrong_pass: {
    mk: "Pogrešna lozinka. Izvlekuvanjeto e ograničeno na ednaš nedelno.",
    sr: "Pogrešna lozinka. Izvlačenje je ograničeno na jednom nedeljno.",
    hr: "Pogrešna lozinka. Izvlačenje je ograničeno na jednom tjedno.", ba: "Pogrešna lozinka. Izvlačenje je ograničeno na jednom sedmično.",
    cnr: "Pogrešna lozinka. Izvlačenje je ograničeno na jednom sedmično.",
    de: "Falsches Passwort. Die Auslosung ist auf einmal pro Woche begrenzt.",
  },
  draw_admin_ok: {
    mk: "Admin lozinka prifatena — izvlekuvanjeto se povtoruva.",
    sr: "Admin lozinka prihvaćena — izvlačenje se ponavlja.",
    hr: "Admin lozinka prihvaćena — izvlačenje se ponavlja.", ba: "Admin lozinka prihvaćena — izvlačenje se ponavlja.",
    cnr: "Admin lozinka prihvaćena — izvlačenje se ponavlja.",
    de: "Admin-Passwort akzeptiert — Auslosung wird wiederholt.",
  },
  csv_num_header: { mk: "Br.", sr: "Br.", hr: "Br.", ba: "Br.", cnr: "Br.", de: "Nr." },
  csv_team_header: { mk: "Tim", sr: "Tim", hr: "Momčad", ba: "Momčad", cnr: "Tim", de: "Team" },
  csv_name_header: { mk: "Ime", sr: "Ime", hr: "Ime", ba: "Ime", cnr: "Ime", de: "Name" },
  csv_role_header: { mk: "Uloga", sr: "Uloga", hr: "Uloga", ba: "Uloga", cnr: "Uloga", de: "Rolle" },
  pdf_title: { mk: "Kircheim Nogomet — Timovi", sr: "Kircheim Nogomet — Timovi", hr: "Kircheim Nogomet — Momčadi", ba: "Kircheim Nogomet — Momčadi", cnr: "Kircheim Nogomet — Timovi", de: "Kircheim Nogomet — Teams" },
  clear_squad_confirm: {
    mk: "Vnesi admin lozinka za da go isprazniš denešniot sostav (bez da se briše bazata):",
    sr: "Unesi admin lozinku da isprazniš današnji sastav (bez brisanja baze):",
    hr: "Unesi admin lozinku za pražnjenje današnjeg sastava (bez brisanja baze):", ba: "Unesi admin lozinku za pražnjenje današnjeg sastava (bez brisanja baze):",
    cnr: "Unesi admin lozinku da isprazniš današnji sastav (bez brisanja baze):",
    de: "Admin-Passwort eingeben, um den heutigen Kader zu leeren (ohne die Datenbank zu löschen):",
  },
  clear_squad_wrong_pass: {
    mk: "Pogrešna lozinka. Praznenjeto e otkažano.",
    sr: "Pogrešna lozinka. Pražnjenje je otkazano.",
    hr: "Pogrešna lozinka. Pražnjenje je otkazano.", ba: "Pogrešna lozinka. Pražnjenje je otkazano.",
    cnr: "Pogrešna lozinka. Pražnjenje je otkazano.",
    de: "Falsches Passwort. Leeren abgebrochen.",
  },
  clear_squad_empty_toast: {
    mk: "Sostavot e veke prazen.", sr: "Sastav je već prazan.", hr: "Sastav je već prazan.", ba: "Sastav je već prazan.", cnr: "Sastav je već prazan.", de: "Der Kader ist bereits leer.",
  },
  clear_squad_done_toast: {
    mk: "Denešniot sostav e isprazneт.", sr: "Današnji sastav je ispražnjen.", hr: "Današnji sastav je ispražnjen.", ba: "Današnji sastav je ispražnjen.", cnr: "Današnji sastav je ispražnjen.", de: "Der heutige Kader wurde geleert.",
  },
  reset_prompt: {
    mk: "Ova trajno gi briše bazata na igrači, denešniot sostav i istorijata na izvlekuvanja.\nVnesi admin lozinka za da prodolžiš:",
    sr: "Ovo trajno briše bazu igrača, današnji sastav i istoriju izvlačenja.\nUnesi admin lozinku da nastaviš:",
    hr: "Ovo trajno briše bazu igrača, današnji sastav i povijest izvlačenja.\nUnesi admin lozinku za nastavak:", ba: "Ovo trajno briše bazu igrača, današnji sastav i povijest izvlačenja.\nUnesi admin lozinku za nastavak:",
    cnr: "Ovo trajno briše bazu igrača, današnji sastav i istoriju izvlačenja.\nUnesi admin lozinku da nastaviš:",
    de: "Dies löscht dauerhaft die Spielerdatenbank, den heutigen Kader und die Auslosungshistorie.\nAdmin-Passwort eingeben, um fortzufahren:",
  },
  reset_wrong_pass: {
    mk: "Pogrešna lozinka. Reset e otkažan.", sr: "Pogrešna lozinka. Reset je otkazan.", hr: "Pogrešna lozinka. Reset je otkazan.", ba: "Pogrešna lozinka. Reset je otkazan.", cnr: "Pogrešna lozinka. Reset je otkazan.", de: "Falsches Passwort. Zurücksetzen abgebrochen.",
  },
  reset_done_toast: {
    mk: "Sè e izbrišano. Startuvaš odnovo.", sr: "Sve je obrisano. Počinješ ispočetka.", hr: "Sve je obrisano. Počinješ ispočetka.", ba: "Sve je obrisano. Počinješ ispočetka.", cnr: "Sve je obrisano. Počinješ ispočetka.", de: "Alles wurde gelöscht. Du beginnst von vorn.",
  },
};

function currentLang() {
  try {
    const saved = localStorage.getItem(STORAGE_LANG);
    if (saved && LANGS.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

/** Translate a key, interpolating {token} placeholders from vars. */
function t(key, vars) {
  const entry = I18N[key];
  if (!entry) return key;
  let str = entry[currentLang()] || entry[DEFAULT_LANG] || key;
  if (vars) {
    for (const k in vars) {
      str = str.replace(new RegExp(`\\{${k}\\}`, "g"), vars[k]);
    }
  }
  return str;
}

function applyStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });
  document.documentElement.lang = currentLang() === "de" ? "de" : "mk";
}

function setLanguage(lang) {
  if (!LANGS.includes(lang)) return;
  try {
    localStorage.setItem(STORAGE_LANG, lang);
  } catch {
    /* ignore */
  }
  syncLangSelects();
  applyStaticI18n();
  renderRoster();
  renderSquad();
  updateSyncStatus(lastSyncState);
  if (lastTeams) renderTeams(lastTeams);
}

function syncLangSelects() {
  const lang = currentLang();
  ["langSelectLogin", "langSelectApp"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = lang;
  });
}

function buildLangOptionsHtml() {
  const labels = { mk: "Македонски", sr: "Srpski", hr: "Hrvatski", cnr: "Crnogorski", ba: "Bosanski", de: "Deutsch" };
  return LANGS.map((code) => `<option value="${code}">${labels[code]}</option>`).join("");
}

// ---------- login gate ----------

function isLoggedIn() {
  try {
    const raw = localStorage.getItem(STORAGE_AUTH);
    if (!raw) return false;
    const savedAt = Number(raw);
    if (!savedAt || Number.isNaN(savedAt)) return false;
    if (Date.now() - savedAt > SESSION_MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_AUTH);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function showApp() {
  document.getElementById("loginGate").hidden = true;
  document.getElementById("appRoot").hidden = false;
}

function logout() {
  try {
    localStorage.removeItem(STORAGE_AUTH);
  } catch {
    /* ignore */
  }
  document.getElementById("loginPassInput").value = "";
  document.getElementById("loginError").hidden = true;
  document.getElementById("appRoot").hidden = true;
  document.getElementById("loginGate").hidden = false;
}

function tryLogin() {
  const input = document.getElementById("loginPassInput");
  const error = document.getElementById("loginError");
  const pass = input.value;

  if (pass === SITE_PASSWORD) {
    try {
      localStorage.setItem(STORAGE_AUTH, String(Date.now()));
    } catch {
      /* ignore */
    }
    error.hidden = true;
    showApp();
  } else {
    error.hidden = false;
    input.value = "";
    input.focus();
  }
}

document.getElementById("langSelectApp").innerHTML = buildLangOptionsHtml();
syncLangSelects();
applyStaticI18n();

document.getElementById("langSelectLogin").addEventListener("change", (e) => setLanguage(e.target.value));
document.getElementById("langSelectApp").addEventListener("change", (e) => setLanguage(e.target.value));

if (isLoggedIn()) {
  showApp();
}

// Sekoja minuta proveruva dali sesijata e istekla (1 čas), taka što ako
// korisnikot ja ostavi otvorena stranicata, avtomatski ke se vrati na
// ekranot za lozinka bez да treba refresh.
setInterval(() => {
  if (!document.getElementById("appRoot").hidden && !isLoggedIn()) {
    logout();
  }
}, 60 * 1000);

document.getElementById("loginBtn").addEventListener("click", tryLogin);
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("loginPassInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") tryLogin();
});

// ---------- shared weekly draw lock ----------
// Ако е достапен Firebase (vidi firebase-config.js), zaklučuvanjeto se čuva
// spodeleno za SITE korisnici/browseri. Ako ne e konfiguriran, avtomatski
// pagja nazad na localStorage (samo lokalno, kako pred izmenata).

let fbDrawLockRef = null;
let fbRosterRef = null;
let fbSquadRef = null;
let fbDrawResultRef = null;
try {
  if (
    typeof FIREBASE_CONFIG !== "undefined" &&
    FIREBASE_CONFIG &&
    typeof FIREBASE_CONFIG.apiKey === "string" &&
    !FIREBASE_CONFIG.apiKey.startsWith("TVOJ_") &&
    typeof firebase !== "undefined"
  ) {
    firebase.initializeApp(FIREBASE_CONFIG);
    fbDrawLockRef = firebase.database().ref("kircheimDrawLock");
    fbRosterRef = firebase.database().ref("kircheimRoster");
    fbSquadRef = firebase.database().ref("kircheimSquad");
    fbDrawResultRef = firebase.database().ref("kircheimDrawResult");
  } else {
    console.warn(
      "Firebase ne e konfiguriran (vidi firebase-config.js) — nedelnata brava raboti samo lokalno vo ovoj browser."
    );
  }
} catch (err) {
  console.error("Firebase init ne uspea, se koristi lokalna brava:", err);
  fbDrawLockRef = null;
  fbRosterRef = null;
  fbSquadRef = null;
  fbDrawResultRef = null;
}

/** Ja postavuva vidlivata poraka vo footer-ot za sostojbata na spodelenata
 *  baza, taka što problem so Firebase (na pr. Rules) e vidliv veднаš na
 *  stranicata, bez da треба da se otvora konzolata za developeri. */
let lastSyncState = "local";
function updateSyncStatus(state) {
  lastSyncState = state;
  const el = document.getElementById("syncStatus");
  if (!el) return;
  el.className = "hint";
  if (state === "shared") {
    el.textContent = t("sync_status_shared");
    el.classList.add("sync-ok");
  } else if (state === "error") {
    el.textContent = t("sync_status_error");
    el.classList.add("sync-err");
  } else {
    el.textContent = t("sync_status_local");
  }
}

updateSyncStatus(fbRosterRef ? "checking" : "local");

/** Ponedelnik (kako početok na nedelata) za dadeниот datum, format YYYY-MM-DD. */
function weekKeyFor(date) {
  const d = new Date(date);
  const isoDay = (d.getDay() + 6) % 7; // 0 = ponedelnik ... 6 = nedela
  d.setDate(d.getDate() - isoDay);
  d.setHours(0, 0, 0, 0);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function currentWeekKey() {
  return weekKeyFor(new Date());
}

/** Ja vraka nedelata (YYYY-MM-DD) na poslednото izvlekuvanje — spodeleno ako e možno. */
async function getLastDrawWeek() {
  if (fbDrawLockRef) {
    try {
      const snap = await fbDrawLockRef.get();
      const val = snap.exists() ? snap.val() : null;
      if (val && val.weekKey) return val.weekKey;
      return "";
    } catch (err) {
      console.error("Ne mozhe da se pročita spodelenata brava, koristam lokalna:", err);
    }
  }
  try {
    return localStorage.getItem(STORAGE_LAST_DRAW) || "";
  } catch {
    return "";
  }
}

/** Go zapišuva tekovnata nedela kako "veke izvlekuvano" — spodeleno ako e možno. */
async function setLastDrawWeek() {
  const key = currentWeekKey();
  try {
    localStorage.setItem(STORAGE_LAST_DRAW, key);
  } catch {
    /* ignore */
  }
  if (fbDrawLockRef) {
    try {
      await fbDrawLockRef.set({ weekKey: key, ts: Date.now() });
    } catch (err) {
      console.error("Ne mozhe da se zapiše spodelenata brava:", err);
    }
  }
}

/** @type {string[]} full saved player database */
let roster = loadRoster();

/** @type {{name:string, captain:boolean, vice:boolean, gk:boolean}[]} today's squad */
let squad = loadSession();

let lastTeams = null; // last generated [[...],[...],[...]]
let lastMatch = null; // last {a, b, w} team indices for "who plays first"

// ---------- persistence ----------

function loadRoster() {
  try {
    const raw = localStorage.getItem(STORAGE_ROSTER);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Ja čuva bazata SAMO lokalno (koristeno od realtime listener-ot, za da
 *  ne se predizvika beskonečna jamka na zapišuvanje). */
function saveRosterLocalOnly() {
  try {
    localStorage.setItem(STORAGE_ROSTER, JSON.stringify(roster));
  } catch {
    /* ignore */
  }
}

/** Ja čuva bazata lokalno I ja isprakja do Firebase (ako e konfiguriran),
 *  za da ja vidat SITE korisnici, na bilo koj uredaj/browser, vedna_shto
 *  se dodade/izbriše igrač. */
function saveRoster() {
  saveRosterLocalOnly();
  if (fbRosterRef) {
    fbRosterRef.set(roster).catch((err) => {
      console.error("Ne mozhe da se zapiše spodelenata baza na Firebase:", err);
    });
  }
}

/** Ako e dostapen Firebase, sledi gi promenite na bazata na igrači vo
 *  realno vreme, taka što sekoj korisnik na bilo koj uredaj gi gleda
 *  dodavanjata/brisanjata na drugite (bez да treba да refreshira). */
function initRosterSync() {
  if (!fbRosterRef) return;

  fbRosterRef.on(
    "value",
    (snap) => {
      updateSyncStatus("shared");

      const exists = snap.exists();
      const val = exists ? snap.val() : null;

      if (!exists) {
        // Firebase e prazen (prv pat) — prenesi ja postoječkata lokalna
        // baza, ako ima nešto vo nea, taka što ne se gubi.
        if (roster.length > 0) {
          fbRosterRef.set(roster).catch((err) => {
            console.error("Ne mozhe da se prenese lokalnata baza na Firebase:", err);
            updateSyncStatus("error");
          });
        }
        return;
      }

      const remoteRoster = Array.isArray(val) ? val : Object.values(val || {});
      roster = remoteRoster.filter((n) => typeof n === "string");
      saveRosterLocalOnly();
      renderRoster();
      renderSquad();
    },
    (err) => {
      console.error("Ne mozhe da se sledi spodelenata baza, koristam lokalna:", err);
      updateSyncStatus("error");
    }
  );
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSessionLocalOnly() {
  try {
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(squad));
  } catch {
    /* ignore */
  }
}

function saveSession() {
  saveSessionLocalOnly();
  if (fbSquadRef) {
    fbSquadRef.set(squad).catch((err) => {
      console.error("Ne mozhe da se zapiše spodeleniot sostav na Firebase:", err);
    });
  }
}

/** Sledi go dnešniot sostav (koj e izbran, kapiten/zamenik/golman) vo
 *  realno vreme, taka što site korisnici go gledaat istiot sostav. */
function initSquadSync() {
  if (!fbSquadRef) return;

  fbSquadRef.on(
    "value",
    (snap) => {
      const exists = snap.exists();
      const val = exists ? snap.val() : null;

      if (!exists) {
        if (squad.length > 0) {
          fbSquadRef.set(squad).catch((err) => {
            console.error("Ne mozhe da se prenese lokalniot sostav na Firebase:", err);
          });
        }
        return;
      }

      const remoteSquad = Array.isArray(val) ? val : Object.values(val || {});
      squad = remoteSquad.filter((p) => p && typeof p.name === "string");
      saveSessionLocalOnly();
      renderSquad();
    },
    (err) => {
      console.error("Ne mozhe da se sledi spodeleniot sostav, koristam lokalen:", err);
    }
  );
}

/** Go čuva rezultatot od izvlekuvanjeto (timovite i koj igra prvi) — samo
 *  lokalno, i ako e moжno, i na Firebase, za da go gledaat SITE korisnici
 *  koi timovi se izvlečeni za ovaa nedela. */
function saveDrawResult() {
  if (fbDrawResultRef) {
    fbDrawResultRef.set({ teams: lastTeams, match: lastMatch }).catch((err) => {
      console.error("Ne mozhe da se zapiše spodeleniot rezultat na izvlekuvanjeto:", err);
    });
  }
}

function clearDrawResult() {
  if (fbDrawResultRef) {
    fbDrawResultRef.remove().catch((err) => {
      console.error("Ne mozhe da se izbriše spodeleniot rezultat na izvlekuvanjeto:", err);
    });
  }
}

/** Sledi go rezultatot od izvlekuvanjeto vo realno vreme, taka što site
 *  korisnici gi gledaat istite timovi za ovaa nedela, i koj igra prvi. */
function initDrawResultSync() {
  if (!fbDrawResultRef) return;

  fbDrawResultRef.on(
    "value",
    (snap) => {
      const exists = snap.exists();
      const val = exists ? snap.val() : null;

      if (!exists) {
        lastTeams = null;
        lastMatch = null;
        document.getElementById("teamsGrid").querySelectorAll("ul").forEach((ul) => (ul.innerHTML = ""));
        document.getElementById("matchBox").hidden = true;
        document.getElementById("pickFirstBtn").disabled = true;
        document.getElementById("exportCsvBtn").disabled = true;
        document.getElementById("exportPdfBtn").disabled = true;
        return;
      }

      lastTeams = Array.isArray(val.teams) ? val.teams : null;
      lastMatch = val.match || null;

      if (lastTeams) {
        renderTeams(lastTeams);
        document.getElementById("pickFirstBtn").disabled = false;
        document.getElementById("exportCsvBtn").disabled = false;
        document.getElementById("exportPdfBtn").disabled = false;
      }

      const box = document.getElementById("matchBox");
      if (lastMatch && lastTeams) {
        box.hidden = false;
        const { a, b, w } = lastMatch;
        document.getElementById("matchPlaying").textContent =
          `${teamLeaderLabel(lastTeams[a], a)}  vs  ${teamLeaderLabel(lastTeams[b], b)}`;
        document.getElementById("matchWaiting").textContent = teamLeaderLabel(lastTeams[w], w);
      } else {
        box.hidden = true;
      }
    },
    (err) => {
      console.error("Ne mozhe da se sledi spodeleniot rezultat na izvlekuvanjeto:", err);
    }
  );
}

// ---------- helpers ----------

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2600);
}

function normalizedIncludes(list, name) {
  return list.some((x) => x.toLowerCase() === name.toLowerCase());
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- rendering: roster (col 1) ----------

function renderRoster() {
  const list = document.getElementById("rosterList");
  const query = document.getElementById("rosterSearch").value.trim().toLowerCase();

  const countHint = document.getElementById("rosterCountHint");
  if (countHint) {
    countHint.textContent = t("roster_count_hint", { count: roster.length, max: MAX_ROSTER });
    countHint.className = roster.length >= MAX_ROSTER ? "hint warn" : "hint";
  }

  list.innerHTML = "";

  if (roster.length === 0) {
    list.innerHTML = `<p class="empty-msg">${t("roster_empty_db")}</p>`;
    return;
  }

  const visible = query
    ? roster.filter((n) => n.toLowerCase().includes(query))
    : roster;

  if (visible.length === 0) {
    list.innerHTML = `<p class="empty-msg">${t("roster_no_results", { query: escapeHtml(query) })}</p>`;
    return;
  }

  const sorted = visible.slice().sort((a, b) => a.localeCompare(b, "mk"));

  for (const name of sorted) {
    const inSquad = normalizedIncludes(squad.map((p) => p.name), name);
    const row = document.createElement("div");
    row.className = "roster-row" + (inSquad ? " in-squad" : "");
    row.innerHTML = `
      <span class="name">${escapeHtml(name)}</span>
      <span class="row-actions">
        ${inSquad ? `<span class="added-pill">${t("added_pill")}</span>` : ""}
        <button class="del-btn" title="${t("del_btn_title")}">✕</button>
      </span>
    `;
    row.addEventListener("click", (e) => {
      if (e.target.closest(".del-btn")) return;
      toggleInSquad(name);
    });
    row.querySelector(".del-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteFromRoster(name);
    });
    list.appendChild(row);
  }
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function toggleInSquad(name) {
  const idx = squad.findIndex((p) => p.name.toLowerCase() === name.toLowerCase());
  if (idx >= 0) {
    squad.splice(idx, 1);
  } else {
    squad.push({ name, captain: false, vice: false, gk: false });
  }
  saveSession();
  renderRoster();
  renderSquad();
}

// ---------- in-page admin password modal (zameна za native prompt()) ----------

function askAdminPassword(message) {
  return new Promise((resolve) => {
    const overlay = document.getElementById("adminModalOverlay");
    const msgEl = document.getElementById("adminModalMsg");
    const input = document.getElementById("adminModalInput");
    const confirmBtn = document.getElementById("adminModalConfirm");
    const cancelBtn = document.getElementById("adminModalCancel");

    msgEl.textContent = message;
    input.value = "";
    overlay.hidden = false;
    setTimeout(() => input.focus(), 30);

    function cleanup(result) {
      overlay.hidden = true;
      confirmBtn.removeEventListener("click", onConfirm);
      cancelBtn.removeEventListener("click", onCancel);
      input.removeEventListener("keydown", onKeydown);
      overlay.removeEventListener("click", onOverlayClick);
      resolve(result);
    }
    function onConfirm() { cleanup(input.value); }
    function onCancel() { cleanup(null); }
    function onKeydown(e) {
      if (e.key === "Enter") onConfirm();
      if (e.key === "Escape") onCancel();
    }
    function onOverlayClick(e) { if (e.target === overlay) onCancel(); }

    confirmBtn.addEventListener("click", onConfirm);
    cancelBtn.addEventListener("click", onCancel);
    input.addEventListener("keydown", onKeydown);
    overlay.addEventListener("click", onOverlayClick);
  });
}

async function deleteFromRoster(name) {
  const pass = await askAdminPassword(t("delete_confirm", { name }));
  if (pass === null) return; // otkažano
  if (pass !== ADMIN_PASSWORD) {
    toast(t("delete_wrong_pass"));
    return;
  }
  roster = roster.filter((n) => n.toLowerCase() !== name.toLowerCase());
  squad = squad.filter((p) => p.name.toLowerCase() !== name.toLowerCase());
  saveRoster();
  saveSession();
  renderRoster();
  renderSquad();
  toast(t("deleted_toast", { name }));
}

// ---------- adding to roster ----------

function addSingleName() {
  const input = document.getElementById("newRosterName");
  const name = input.value.trim();
  if (!name) return;
  if (normalizedIncludes(roster, name)) {
    toast(t("exists_toast", { name }));
    return;
  }
  if (roster.length >= MAX_ROSTER) {
    toast(t("roster_full_toast", { max: MAX_ROSTER }));
    return;
  }
  roster.push(name);
  saveRoster();
  input.value = "";
  renderRoster();
  toast(t("added_toast", { name }));
}

function bulkImport() {
  const raw = document.getElementById("bulkNames").value;
  const names = raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (names.length === 0) {
    toast(t("bulk_empty_toast"));
    return;
  }

  let added = 0;
  let skippedFull = 0;
  const uniqueIncoming = [...new Map(names.map((n) => [n.toLowerCase(), n])).values()];

  for (const name of uniqueIncoming) {
    if (normalizedIncludes(roster, name)) continue;
    if (roster.length >= MAX_ROSTER) { skippedFull++; continue; }
    roster.push(name);
    added++;
  }

  roster.sort((a, b) => a.localeCompare(b, "mk"));
  saveRoster();
  renderRoster();

  let msg = t("bulk_added_toast", { added, total: roster.length, max: MAX_ROSTER });
  if (skippedFull > 0) msg += t("full_suffix", { skipped: skippedFull });
  toast(msg);
}

// ---------- export / import roster file ----------

function exportRoster() {
  const content = roster.slice().sort((a, b) => a.localeCompare(b, "mk")).join("\r\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kircheim-baza-igraci.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function importRoster(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const names = String(reader.result)
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (names.length === 0) {
      toast(t("import_empty_toast"));
      return;
    }

    let added = 0;
    let skippedFull = 0;
    for (const name of names) {
      if (normalizedIncludes(roster, name)) continue;
      if (roster.length >= MAX_ROSTER) { skippedFull++; continue; }
      roster.push(name);
      added++;
    }

    roster.sort((a, b) => a.localeCompare(b, "mk"));
    saveRoster();
    renderRoster();

    let msg = t("import_added_toast", { added, total: roster.length, max: MAX_ROSTER });
    if (skippedFull > 0) msg += t("full_suffix", { skipped: skippedFull });
    toast(msg);
  };
  reader.readAsText(file);
}

// ---------- squad rendering (col 2) ----------

function renderSquad() {
  const container = document.getElementById("squadList");
  container.innerHTML = "";

  if (squad.length === 0) {
    container.innerHTML = `<p class="empty-msg">${t("squad_empty")}</p>`;
  } else {
    for (const p of squad) {
      const row = document.createElement("div");
      row.className = "squad-row";
      row.innerHTML = `
        <span class="name">${escapeHtml(p.name)}</span>
        <button class="tag tag-cap ${p.captain ? "active" : ""}" title="${t("legend_captain")}">K</button>
        <button class="tag tag-vice ${p.vice ? "active" : ""}" title="${t("vice_tag_title")}">ZK</button>
        <button class="tag tag-gk ${p.gk ? "active" : ""}" title="${t("legend_gk")}">G</button>
        <button class="remove-x" title="${t("remove_x_title")}">✕</button>
      `;
      row.querySelector(".tag-cap").addEventListener("click", () => toggleRole(p.name, "captain"));
      row.querySelector(".tag-vice").addEventListener("click", () => toggleRole(p.name, "vice"));
      row.querySelector(".tag-gk").addEventListener("click", () => toggleRole(p.name, "gk"));
      row.querySelector(".remove-x").addEventListener("click", () => toggleInSquad(p.name));
      container.appendChild(row);
    }
  }

  updateSquadHint();
  updateDrawAvailability();
  renderRoster();
}

function toggleRole(name, role) {
  const p = squad.find((x) => x.name === name);
  if (!p) return;

  if (role === "captain") {
    const count = squad.filter((x) => x.captain).length;
    if (!p.captain && count >= 3) { toast(t("toggle_cap_max")); return; }
    p.captain = !p.captain;
    if (p.captain) p.vice = false;
  } else if (role === "vice") {
    const count = squad.filter((x) => x.vice).length;
    if (!p.vice && count >= 3) { toast(t("toggle_vice_max")); return; }
    p.vice = !p.vice;
    if (p.vice) p.captain = false;
  } else if (role === "gk") {
    const count = squad.filter((x) => x.gk).length;
    if (!p.gk && count >= 3) { toast(t("toggle_gk_max")); return; }
    p.gk = !p.gk;
  }

  saveSession();
  renderSquad();
}

function updateSquadHint() {
  const hint = document.getElementById("squadCountHint");
  const caps = squad.filter((x) => x.captain).length;
  const vices = squad.filter((x) => x.vice).length;
  const gks = squad.filter((x) => x.gk).length;

  hint.textContent = t("squad_count_hint", { n: squad.length, c: caps, v: vices, g: gks });

  const ready = squad.length >= 3;
  hint.className = ready ? "ready" : "warn";
}

function updateDrawAvailability() {
  const ready = squad.length >= 3;
  document.getElementById("drawTeamsBtn").disabled = !ready;
}

// ---------- team generation (col 3) ----------

async function generateTeams() {
  const lastWeek = await getLastDrawWeek();
  if (lastWeek === currentWeekKey()) {
    const pass = await askAdminPassword(t("draw_locked_prompt"));
    if (pass === null) return; // otkažano
    if (pass !== ADMIN_PASSWORD) {
      toast(t("draw_wrong_pass"));
      return;
    }
    toast(t("draw_admin_ok"));
  }

  const caps = shuffle(squad.filter((p) => p.captain));
  const vices = shuffle(squad.filter((p) => p.vice));
  const gks = shuffle(squad.filter((p) => p.gk));
  const already = new Set([...caps, ...vices, ...gks].map((p) => p.name));
  const rest = shuffle(squad.filter((p) => !already.has(p.name)));

  const teams = [[], [], []];

  // Shared rotating pointer: captains, vices and goalkeepers all draw from the
  // same 0→1→2→0… sequence, so however many of each role exist (0-3, doesn't
  // have to be exactly 3), they keep spreading across the 3 teams instead of
  // clustering together in the same one.
  let teamPtr = 0;
  const nextTeam = () => teamPtr++ % 3;

  caps.forEach((p) => teams[nextTeam()].push({ ...p, role: "k" }));
  vices.forEach((p) => teams[nextTeam()].push({ ...p, role: "zk" }));
  gks.forEach((p) => teams[nextTeam()].push({ ...p, role: "g" }));

  // distribute remaining players to whichever team currently has fewest members
  for (const p of rest) {
    let smallest = 0;
    for (let i = 1; i < 3; i++) {
      if (teams[i].length < teams[smallest].length) smallest = i;
    }
    teams[smallest].push({ ...p, role: null });
  }

  lastTeams = teams;
  lastMatch = null;
  await setLastDrawWeek();
  saveDrawResult();
  renderTeams(teams);

  document.getElementById("pickFirstBtn").disabled = false;
  document.getElementById("exportCsvBtn").disabled = false;
  document.getElementById("exportPdfBtn").disabled = false;
  document.getElementById("matchBox").hidden = true;
}

function renderTeams(teams) {
  const cols = document.querySelectorAll(".team-col");
  teams.forEach((team, i) => {
    const ul = cols[i].querySelector("ul");
    ul.innerHTML = "";
    team.forEach((p, idx) => {
      const li = document.createElement("li");
      li.style.animationDelay = `${idx * 45}ms`;
      const tagHtml = p.role
        ? `<span class="mini-tag ${p.role}">${p.role.toUpperCase()}</span>`
        : "";
      li.innerHTML = `${tagHtml}<span>${escapeHtml(p.name)}</span>`;
      ul.appendChild(li);
    });
  });
}

/** Vraќa go imeto na kapitenot na timot (ili zamenik ako nema kapiten,
 *  ili "Tim N" ako nitu eden ne e izbran). */
function teamLeaderLabel(team, teamIndex) {
  const captain = team.find((p) => p.role === "k");
  if (captain) return captain.name;
  const vice = team.find((p) => p.role === "zk");
  if (vice) return vice.name;
  return `${t("team_word")} ${teamIndex + 1}`;
}

function pickWhoPlaysFirst() {
  if (!lastTeams) return;
  const pairs = [[0, 1, 2], [0, 2, 1], [1, 2, 0]]; // [playerA, playerB, waiting]
  const [a, b, w] = pairs[Math.floor(Math.random() * pairs.length)];
  lastMatch = { a, b, w };
  saveDrawResult();

  const box = document.getElementById("matchBox");
  box.hidden = false;
  const nameA = teamLeaderLabel(lastTeams[a], a);
  const nameB = teamLeaderLabel(lastTeams[b], b);
  const nameW = teamLeaderLabel(lastTeams[w], w);
  document.getElementById("matchPlaying").textContent = `${nameA}  vs  ${nameB}`;
  document.getElementById("matchWaiting").textContent = nameW;
}

// ---------- exports ----------

function exportCsv() {
  if (!lastTeams) return;
  const rows = [[t("csv_num_header"), t("csv_team_header"), t("csv_name_header"), t("csv_role_header")]];
  lastTeams.forEach((team, i) => {
    const teamLabel = `${t("team_word")} ${i + 1} — ${teamLeaderLabel(team, i)}`;
    team.forEach((p, idx) => {
      const uloga = p.role === "k" ? t("legend_captain") : p.role === "zk" ? t("legend_vice") : p.role === "g" ? t("legend_gk") : "";
      rows.push([idx + 1, teamLabel, p.name, uloga]);
    });
  });
  const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kircheim-timovi.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function csvEscape(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function exportPdf() {
  if (!lastTeams) return;

  const teamAccents = ["#E8B94A", "#2FBF9F", "#E1574B"]; // gold / teal / red — matches app accents
  const roleLabel = { k: "K", zk: "ZK", g: "G" };
  const roleName = {
    k: t("legend_captain"),
    zk: t("legend_vice"),
    g: t("legend_gk"),
  };

  const teamHtml = lastTeams
    .map((team, i) => {
      const leader = teamLeaderLabel(team, i);
      const accent = teamAccents[i % teamAccents.length];
      const playersHtml = team
        .map((p, idx) => {
          const badge = p.role ? `<span class="role-pill role-${p.role}">${roleLabel[p.role]}</span>` : "";
          return `<li><span class="pnum">${idx + 1}.</span>${badge}<span class="pname">${escapeHtml(p.name)}</span></li>`;
        })
        .join("");
      return `
      <div class="pdf-team" style="--accent:${accent}">
        <div class="pdf-team-head">
          <h2>${escapeHtml(leader)}</h2>
        </div>
        <ul>${playersHtml}</ul>
      </div>`;
    })
    .join("");

  const matchHtml =
    lastMatch && lastTeams
      ? `
      <div class="match-card">
        <div class="match-card-title">⚽ ${t("matchbox_title")}</div>
        <div class="match-card-vs">
          <span class="match-name">${escapeHtml(teamLeaderLabel(lastTeams[lastMatch.a], lastMatch.a))}</span>
          <span class="match-vs">VS</span>
          <span class="match-name">${escapeHtml(teamLeaderLabel(lastTeams[lastMatch.b], lastMatch.b))}</span>
        </div>
        <p class="match-waiting"><strong>${t("matchbox_waiting")}</strong> ${escapeHtml(teamLeaderLabel(lastTeams[lastMatch.w], lastMatch.w))}</p>
      </div>`
      : "";

  const win = window.open("", "_blank");
  win.document.write(`
    <html><head><title>${t("pdf_title")}</title>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --navy-0: #131A2C;
        --navy-1: #1D2745;
        --navy-2: #283257;
        --ink: #1B2033;
        --muted: #6b7593;
        --gold: #E8B94A;
      }
      * { box-sizing: border-box; }
      body {
        font-family: 'Inter', Arial, sans-serif;
        color: var(--ink);
        margin: 0;
        padding: 0 36px 40px;
        background: #F7F8FC;
      }
      .pdf-banner {
        margin: 0 -36px 28px;
        padding: 28px 36px 22px;
        background: linear-gradient(135deg, var(--navy-0), var(--navy-1));
        color: #F3F5FA;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 6px;
      }
      .pdf-banner h1 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 26px;
        margin: 0;
        letter-spacing: -0.01em;
      }
      .pdf-banner h1 span { color: var(--gold); }
      .pdf-banner .pdf-date {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12.5px;
        color: #C7CEE3;
      }

      .pdf-teams { display: flex; gap: 20px; margin-top: 4px; }
      .pdf-team {
        flex: 1;
        background: #fff;
        border-radius: 14px;
        border: 1px solid #E4E7F2;
        border-top: 5px solid var(--accent);
        padding: 16px 16px 18px;
      }
      .pdf-team-head { margin-bottom: 10px; }
      .pdf-team-tag {
        display: inline-block;
        font-family: 'JetBrains Mono', monospace;
        font-size: 10.5px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--accent);
        border: 1px solid var(--accent);
        border-radius: 6px;
        padding: 2px 7px;
        margin-bottom: 6px;
      }
      .pdf-team h2 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 19px;
        margin: 4px 0 0;
      }
      .pdf-team ul { list-style: none; margin: 12px 0 0; padding: 0; }
      .pdf-team li {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        padding: 6px 0;
        border-top: 1px solid #EEF0F8;
      }
      .pdf-team li:first-child { border-top: none; }
      .pnum {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        font-weight: 700;
        color: #9AA1B5;
        flex-shrink: 0;
        min-width: 16px;
      }
      .role-pill {
        font-family: 'JetBrains Mono', monospace;
        font-size: 9.5px;
        font-weight: 700;
        border-radius: 5px;
        width: 20px;
        height: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        flex-shrink: 0;
      }
      .role-k { background: #C99A2E; }
      .role-zk { background: #1E7FA3; }
      .role-g { background: #C7473C; }

      .match-card {
        margin-top: 26px;
        background: linear-gradient(135deg, var(--navy-1), var(--navy-2));
        color: #F3F5FA;
        border-radius: 16px;
        padding: 22px 26px;
        text-align: center;
      }
      .match-card-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--gold);
        margin-bottom: 12px;
      }
      .match-card-vs {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 18px;
        flex-wrap: wrap;
      }
      .match-name {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 22px;
        font-weight: 700;
      }
      .match-vs {
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        color: var(--gold);
        border: 1px solid rgba(232,185,74,0.5);
        border-radius: 20px;
        padding: 4px 10px;
      }
      .match-waiting {
        margin: 14px 0 0;
        font-size: 13.5px;
        color: #C7CEE3;
      }
      .match-waiting strong { color: #F3F5FA; }

      .pdf-footer {
        margin-top: 30px;
        text-align: center;
        font-size: 11.5px;
        color: var(--muted);
      }

      @media print {
        body { background: #fff; }
        .pdf-banner { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .match-card { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .role-pill { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    </style>
    </head><body>
      <div class="pdf-banner">
        <h1>Kircheim <span>Nogomet</span></h1>
        <span class="pdf-date">${new Date().toLocaleDateString("mk-MK")}</span>
      </div>
      <div class="pdf-teams">${teamHtml}</div>
      ${matchHtml}
      <p class="pdf-footer">⚽ Kircheim Nogomet — generirano so aplikacijata</p>
    </body></html>
  `);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 400);
}

async function clearSquad() {
  if (squad.length === 0) {
    toast(t("clear_squad_empty_toast"));
    return;
  }
  const pass = await askAdminPassword(t("clear_squad_confirm"));
  if (pass === null) return; // otkažano
  if (pass !== ADMIN_PASSWORD) {
    toast(t("clear_squad_wrong_pass"));
    return;
  }
  squad = [];
  lastTeams = null;
  lastMatch = null;
  saveSession();
  clearDrawResult();
  renderSquad();
  document.getElementById("teamsGrid").querySelectorAll("ul").forEach((ul) => (ul.innerHTML = ""));
  document.getElementById("matchBox").hidden = true;
  document.getElementById("pickFirstBtn").disabled = true;
  document.getElementById("exportCsvBtn").disabled = true;
  document.getElementById("exportPdfBtn").disabled = true;
  toast(t("clear_squad_done_toast"));
}

// ---------- full reset ----------

async function resetAll() {
  const pass = await askAdminPassword(t("reset_prompt"));
  if (pass === null) return; // otkažano
  if (pass !== ADMIN_PASSWORD) {
    toast(t("reset_wrong_pass"));
    return;
  }

  roster = [];
  squad = [];
  lastTeams = null;
  lastMatch = null;

  try {
    localStorage.removeItem(STORAGE_ROSTER);
    localStorage.removeItem(STORAGE_SESSION);
    localStorage.removeItem(STORAGE_LAST_DRAW);
  } catch {
    /* ignore */
  }

  if (fbDrawLockRef) {
    try {
      await fbDrawLockRef.remove();
    } catch (err) {
      console.error("Ne mozhe da se izbriše spodelenata brava:", err);
    }
  }

  if (fbRosterRef) {
    try {
      await fbRosterRef.remove();
    } catch (err) {
      console.error("Ne mozhe da se izbriše spodelenata baza:", err);
    }
  }

  if (fbSquadRef) {
    try {
      await fbSquadRef.remove();
    } catch (err) {
      console.error("Ne mozhe da se izbriše spodeleniot sostav:", err);
    }
  }

  if (fbDrawResultRef) {
    try {
      await fbDrawResultRef.remove();
    } catch (err) {
      console.error("Ne mozhe da se izbriše spodeleniot rezultat na izvlekuvanjeto:", err);
    }
  }

  renderRoster();
  renderSquad();
  document.getElementById("teamsGrid").querySelectorAll("ul").forEach((ul) => (ul.innerHTML = ""));
  document.getElementById("matchBox").hidden = true;
  document.getElementById("pickFirstBtn").disabled = true;
  document.getElementById("exportCsvBtn").disabled = true;
  document.getElementById("exportPdfBtn").disabled = true;

  toast(t("reset_done_toast"));
}

// ---------- wiring ----------

document.getElementById("clearSquadBtn").addEventListener("click", clearSquad);
document.getElementById("resetAllBtn").addEventListener("click", resetAll);
document.getElementById("rosterSearch").addEventListener("input", renderRoster);
document.getElementById("addRosterBtn").addEventListener("click", addSingleName);
document.getElementById("newRosterName").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addSingleName();
});
document.getElementById("bulkImportBtn").addEventListener("click", bulkImport);
document.getElementById("exportRosterBtn").addEventListener("click", exportRoster);
document.getElementById("importRosterInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) importRoster(file);
  e.target.value = "";
});
document.getElementById("drawTeamsBtn").addEventListener("click", generateTeams);
document.getElementById("pickFirstBtn").addEventListener("click", pickWhoPlaysFirst);
document.getElementById("exportCsvBtn").addEventListener("click", exportCsv);
document.getElementById("exportPdfBtn").addEventListener("click", exportPdf);

// ---------- initial render ----------

renderRoster();
renderSquad();
initRosterSync();
initSquadSync();
initDrawResultSync();
