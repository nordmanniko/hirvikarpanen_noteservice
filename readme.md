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
- fastapi dev app/main.py
- käytä `deactivate` kun lopetat
- ??????

## Miten frontend
lataukset
- npm install --save-dev metro metro-core
    reactnavigation
- npm install @react-navigation/native
- npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-svg
- npm install @react-navigation/bottom-tabs

- mene /notes 
- käytä `npx expo start`
- npx react-native start --port=8082 /?entiedä ajaako saman asian kuin npx expo start mutta 8082 on käytettävä koska phpmyadmin runnaa 8081 portissa

## testing api locally
- uvicorn main:app --reload

## lataukset
- mene /back
- pip install "fastapi[standard]"
- python -m venv .venv
- pip install mysqlclient



## muita latauksia jotka voivat olla tarpeellisia
- pip install pyjwt
- pip install "sqlmodel[sqlalchemy]"
- pip install "pymysql"
- pip install "alembic"
- pip install "python-dotenv"


## Mitä backend tehty
- yhteys database ja backend välillä
- kun user deleted, poistaa kaikki notes, tags ja colors userilta
- started semi security

## metro bundler (sisäänrakenettu vite mutta vain react nativessa) 
- npx react-native start --reset-cache /voi korjata ongelmia

## axios
- käytämme axiosta koska sisään rakennettu fetch api on huonompi