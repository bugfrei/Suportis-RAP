# RAP CLI Tool




# TODOs

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

# Schreibweisen für Datentypen

## Currency / Zahlen mit Nachkommastellen (curr(8,2))

Ohne Nachkommastellen (immer x.00) : 42
Mit Nachkommastellen               : "42.12"

Also als String!

## Datum

Immer als String im Format 'yyyymmdd'





# Version History
0.0.1 : First Version
0.0.2 : Refactoring in modules

