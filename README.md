# Airbean Project

API:et hämtar en meny med kaffe och pris. Sedan kan en användare skapa en user eller gå in som guest och skapa en order som sparas i databasen.

## Teknikstack

- Node.js
- Express
- SQLite (better-sqlite3)

## Installation

```bash
# Klona repot
git clone https://github.com/AVega89-0407/airbean-project-grupp1.git
cd airbean-project-grupp1

# Installera beroenden
npm install

# Skapa .env (kopiera från .env.example)
cp .env.example .env
# Fyll i dina värden i .env

# Starta servern
node server.js
# eller med --watch:
node --watch server.js
```

Servern startar på `http://localhost:3000`.

## API-dokumentation

- [API Documentation](./Documents/api-docs.md)

## WebSocket-diskussion

Skulle vi ha använt webSockets hade vi gjort realtidsuppdateringar av orderstatus så att usern kan se när deras beställning är klar i realtid.

## Gruppmedlemmar

- Andrea Vega Piñones
- Angelica Jonsson Landström
- Amir Hem
