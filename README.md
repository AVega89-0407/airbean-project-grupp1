# Airbean Project

API:et hämtar en meny med kaffe och pris. Sedan kan en användare skapa en user eller gå in som guest och skapa en order som sparas i databasen.

## Teknikstack

- Node.js
- Express
- SQLite (better-sqlite3)

## Installation

```bash
# Klona repot
git clone [repo-url]
cd [projektmapp]

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

[Skriv en kort reflektion: Hur skulle WebSockets kunna användas i det här projektet?
T.ex. realtidsuppdateringar av orderstatus, live-notiser till baristan, etc.]

## Gruppmedlemmar

- Andrea Vega Piñones
- Angelica Jonsson Landström
- [Namn 3]
