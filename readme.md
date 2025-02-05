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
### lataukset
- lataa venv `python -m venv .venv`
- käytä `.venv\Scripts\Activate.ps1`
- lataa kaikki dependency `pip install -r requirements.txt`

### käynnistys
- mene /backend
- käytä `.venv\Scripts\Activate.ps1`
- `fastapi dev app/main.py`
- käytä `deactivate` jos haluat venv pois

## Miten frontend
### lataukset
- `npm i` (toivottavasti)

### käynnistys
- mene /notes 
- käytä `npx expo start`
- `npx expo start --port=8082` en tiedä ajaako saman asian kuin npx expo start mutta 8082 on käytettävä koska phpmyadmin runnaa 8081 portissa
---

### testing api locally
- uvicorn main:app --reload

### Mitä backend tehty
- yhteys database ja backend välillä
- kun user deleted, poistaa kaikki notes, tags ja colors userilta toivottavasti
- started semi security

### metro bundler (sisäänrakenettu vite mutta vain react nativessa) 
- npx react-native start --reset-cache /voi korjata ongelmia

### axios
- käytämme axiosta koska sisään rakennettu fetch api on huonompi

## häx box 360
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5#short-description