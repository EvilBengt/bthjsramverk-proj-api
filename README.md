> API för slutprojekt i kursen "JavaScript-baserade webbramverk" (jsramverk) på Blekinge Tekniska Högskola (BTH)

---------------

Krav 1: Backend
===============

Jag valde att bygga api:n med node och Express som vanligt. Efter att ha testat
flera olika backend-tekniker känner jag att jag är mest bekväm med Express när
det kommer till att bygga lite mer omfattande servrar så som REST-API.

För att lagra data valde jag SQLite. Jag funderade faktiskt en hel del på att
gå över till MongDB då vi testat det i ett tidigare kursmoment, men jag kände
inte att jag var tillräckligt bekväm med det för lite mer omfattande system.
Jag funderade även på MySQL då det utan tvekan är det jag har arbetat med mest,
dock var SQLite så oerhört mycket enklare att dra igång med då jag redan har
det installerat på servern och har använt det tidigare.

För att strukturera API:et delade jag upp den i flera sub-routrar; "funds",
"auth" och "account". Under funds ligger alla publika routes för att hämta data
om de olika fonderna. I auth finns routes för att logga in och skapa konto.
Account har sedan allt som har med konto och handel att göra. Hela routen
ligger bakom en middleware som kollar "x-access-token" så användaren är inloggad.
När användaren till exempel väljer att köpa fler andelar i en fond, skickas
endast fondens namn och antalet andelar i request bodyn. Eftersom inloggning
så klart krävs, kan servern plocka ut epost-adressen ur token:en

För att få så små och lätta route-hanterare som möjligt, har jag separerat
all databaskod och allmän affärskod till modeller som routerna använder sig av.

Krav 3: Realtid
===============

Jag valde även denna gången att köra realtids-tjänsten i en separat server.
Den ligger som en andra entrypoint i källkoden för API:et och har därför tillgång
till exakt samma resurser och kod som API:et. Anledningen till att jag inte
integrerade den direkt in i app.js (entrypoint för API:et) var att jag ville
dela upp det lite. API:et ska vara ett API och inget annat, och realtids-tjänsten
ska vara så ren som möjligt. Enda anledningen till att jag lade dem i samma projekt
är som sagt för att de ska kunna dela viss källkod och framförallt databasen.

Socket.io blev mitt val igen då det var extremt smidigt och enkelt att arbeta med
och jag kände att det passade perfekt till även detta ändamålet. Min önskan från
början var att eventuellt kunna dela upp de olika fonderna i olika kanaler eller
rum så klienten inte får en massa orelevant data. Det verkade dock inte allt för
smidigt så jag gick den lite enklare vägen med att bara mata ut ett array med
all data om alla fonder till alla eventuella klienter. Det visade sig vara ett
bra val då jag senare i utvecklingen av klienten faktiskt behövde data för alla
fonder på en gång (i "Mina sidor").
