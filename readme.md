# RAP CLI Tool

`RAP datagen?` um ein Query für ChatGPT zu erstellen. Beim Datentyp `Date` (d) oder `String` (s) können noch zusätzliche Informationen eingegeben werden.

z.B.

Feldname: vorname
Feldtyp: `s` (String)
Zusätzliche Informationen...: französicher Vorname

Feldname: geburtsdatum
Feldtyp: `d` (Date)
Zusätzliche Informationen...: Geburtsdatum von Personen im Alter von 20 bis 30 Jahren.

Ohne Eingabe des Feldnamens wird der Query-String generiert und in die Zwischenablage kopiert.

Dieser kann in ChatGPT genutzt werden um eine JSON String zu erstellen.

`RAP datagen` (`RAP d`) mit optionaler Angabe des Tabellennamen z.B. `RAP d zusers`

Nach Beantwortung einiger Fragen wird der JSON String von ChatGPT aus der Zwischenablage verwendet um eine ABAP Klasse zu erstellen, die diese Daten in die angegebene Tabelle schreibt. Dessen Code liegt in die der Zwischenablage und kann nach dem erstellen der Klasse in Eclipse den vorhandenen Code komplett ersetzt. Aktivieren, Ausführen. Schon hat die Tabelle Daten.

---

Das Tools ist in der Entwicklung und wird später direkte Untersützung von ABAPGit Repositories und zusätzliche Funktionalitäten wie das erstellen kompletter Apps, hinzufügen von Metadatenerweiterungen usw. beinhalten.

---


# TODOs & Interne Notizen

- [ ] Ein-Englischen
- [ ] zusätzlich als yeoman Generator
- [ ] rap add ...  (direkt in Github Repo)
    - [ ] datagenerator class
    - [ ] metadata extension
    - [ ] behvaior definition
    - [ ] service binding/definition
    - [ ] data definition
- [ ] rap init ... (direkt in Github Repo)
    - [ ] Sample Project (simple)
    - [ ] Assist Project (Fragen -> Spezifisches Projekt)
    - [ ] Sample Project (komplex)
- [ ] Github Repo untersützung
    - [ ] Vorhandenes unterstüzen (um z.B. Metadatenerweiterungen zu erstellen)
    - [ ] Neues erstellen (git/gh CLI verwenden)
    - [ ] Ggfs nach Repos suchen, klonen, ... (ála yeoman mittels Tags; ggfs. auch in npm suchen)
- [ ] Unterstüzung der Datentypen (gerade beim erstellen von Data Definitions)
    - [ ] abap.clnt, key, not null
    - [ ] abap.char(x)
    - [ ] sysuuid_x16
    - [ ] abap.cuky (Currency Code, in Verbindung mit abap.curr(8,2))
    - [ ] abap.curr(8,2) in Verbindung mit Annotation für Currency Code (siehe Z01_TABLE)
    - [ ] abap.int4 (und andere int)
    - [ ] abap_boolean
    - [ ] abap.dats
- [ ] Feldtyp Number (n), mit Zusatzinfos (z.B. fortlaufende Zahl)
- [ ] Finale Zusatzinfo (nicht Feldbezogen, z.B. es handelt sich um eine Mitarbeiterliste, wähle dementsprechende Inhalte)
- [ ] Bei Datum muss immer JSON Datum im Format yyyy-mm-ddT00:00:00Z sein

# Schreibweisen für Datentypen

## Currency / Zahlen mit Nachkommastellen (curr(8,2))

Ohne Nachkommastellen (immer x.00) : 42
Mit Nachkommastellen               : "42.12"

Also als String!

## Datum

Immer als String im Format 'yyyymmdd'





# Version History
- 0.0.1 : First Version
- 0.0.2 : Refactoring in modules
- 0.0.3 : Version from package.json, change readme
- 0.0.4 : Größere Datenmengen werden in max. 40er Datensätze eingetragen

