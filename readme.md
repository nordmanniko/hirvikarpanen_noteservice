## Mitä?
- Muistiinpano aplikaatio, joka tallentaa käyttäjään muistiinpanot

### Ominaisuuksia
- gps:sää luvallisesti hyödyntäen voidaan filtteröidä esimerkiksi vain työpaikalla tehdyt muistiinpanot
- mahdollisuus organisoida muistiinpanoja omilla kategorioilla
- kuvaustoiminto
- hakutoiminto
- toimii selaimessa kuten puhelimessa eli pystytään käyttämään tietokoneellakin

### Huomioitavaa
- kirjautuminen ei ole pakollinen mutta tarvittava muistiinpanojen tallennusta varten
- gps ei ole pakollinen käyttää ja tuo ison tietoturva riskin joten se tehdään vain harjoittelu muodossa

## Kenelle?
- Kaikille jotka haluavat paremmin toimivan ja helppokäyttöisen muistiinpano vaihtoehdon
- tredun opiskelijat voisivat olla myös yksi kohderyhmä

## Miksi?
- Päätarkoitus tälle projektille on hauska harjoitus, mutta hyödytkään eivät ole olemattomissa
- Appi voitaisiin saada toimimaan tredun kirjautumisella ja "integroida" sen startti.tredu sivustolle jos aika sen sallii


## Ideat
- fast api back react front
- muistiinpano jossa tallentuu muistiinpanot emailina käyttäen kirjautumisessa
- tailwind (todenäköisesti ei saa toimimaan mobiilifrontilla)
- !mobiili frontti

### Filtteritoiminnot
- itsemuokattavat väri kategorioinnit, jotka auttavat organisoinnissa.
- gpssän avulla voi filtteröidä omat kirjoittamansa muistiinpanot esim työpaikan ja kodin muistiinpanot
- to do filtteri vaihtoehto

### Muita toimintoja
- automaattinen collapse isompia muistiinpanoja varten
- valokuvaus
- lightmode/darkmode (aloitetaan darkmodella)
- hakutoiminto
- "highlighter pen" jolla voi alleviivata kohtia muistiinpanoista

### Aikaa vievät ideat
- sso jotta apin voisi vaikka integroida koulun startti sivulle :D  >:|
- vaativampi teksti editori kirjoittaessa (boldaus, alleviivaus, kursiivi ja listaaminen valikkoon)

### Aloitus
- tehdään tosi "barebones" muistiinpano aplikaatio
- tehdään tietokanta
- tehdään fastapi back 
- tietokantayhteys
- "continious refining and remastering of the application"
- mahd mobiilifrontti

### Backend
- tehdään FastAPI:lla
- backendiin tulee seuraavat

| Notes | Users |
| ----------- | ----------- |
| title | username |
| note | email |
| tags | password |
| color |
| gps |
| picture (?) |

## Miten backend
- mene /backend
- käytä `.venv\Scripts\Activate.ps1` kun muokkaat
- fastapi dev main.py
- käytä `deactivate` kun lopetat
- ??????
## Miten frontend
- mene /notes 
- käytä `npx expo start`