# Airbean API – Dokumentation

REST API som hanterar kaffe menyn.
Bas-URL: `http://localhost:3000`

---

## GET /menu

Hämtar hela menyn.

**Svar:** `200 OK`

```json
    {
        "id": 1,
        "title": "Bryggkaffe",
        "desc": "Bryggd på månadens bönor.",
        "price": 39
    }
```

---

## GET /api/users/:userId

Hämtar usern med sitt unika ID.

**Svar:** `200 OK`

```json
{
    "id": "980e94fd-2a4b-4859-8a45-dea74c330130",
    "name": "Lisa",
    "email": "lisa@example.se",
    "createdAt": "2026-04-02T08:19:23.712Z"
}
```

**Fel:** `404 Not Found`

```json 
{
    "fel": "Användaren hittades inte"
}
```

---

## POST /api/users

Skapar en user med ett unikt ID.

**Body:**

```json
{
    "name": "Lisa",
    "email": "lisa@example.se"
}
```

**Svar:** `201 Created`

```json
{
    "id": "980e94fd-2a4b-4859-8a45-dea74c330130",
    "name": "Lisa",
    "email": "lisa@example.se",
    "createdAt": "2026-04-02T08:19:23.712Z"
}
```

**Fel:** `400 Bad Request`

```json
{
    "fel": "Name och email krävs"
}
```

---

## PUT /api/users/:userId

Här kan du ändra users namn eller email och sedan uppdatera.

**Body:**

```json
{
    "name": "Lisa",
    "email": "lisaj@example.se"
}
```

**Svar:** `200 OK`
**Fel:** `404 Not Found` | `400 Bad Request`

---

## DELETE /api/users/:userId

Den tar bort en user.

**Svar:** `204 No Content`
```json
1

```

**Fel:** `404 Not Found`

```json
{
    "fel": "Användaren hittades inte"
}
```
---

## GET /api/orders/

Den hämtar alla orders som ligger i databasen. 

**Svar:** `200 OK`

```json
    {
        "orderId": "074e2150-bc65-4a3c-b81a-3ef85ad579df",
        "eta": 16,
        "total": 137,
        "userId": "user-123",
        "createdAt": "2026-04-01T08:50:37.117Z"
    }
```

**Fel:** `404 Not Found`

---

## POST /api/orders/

Skapar en order som kopplas ihop med userId. 

**Body:**

```json
{
    "items": [4],
    "userId": "980e94fd-2a4b-4859-8a45-dea74c330130"
}
```
**Svar:** `201 Created`

```json
{
    "orderId": "3f1c8035-c93e-4a29-9f33-d871b1212074",
    "eta": 12,
    "items": [
        4
    ],
    "total": 49,
    "userId": "980e94fd-2a4b-4859-8a45-dea74c330130",
    "newOrder": {
        "orderId": "3f1c8035-c93e-4a29-9f33-d871b1212074",
        "eta": 12,
        "total": 49,
        "userId": "980e94fd-2a4b-4859-8a45-dea74c330130",
        "createdAt": "2026-04-02T08:42:02.178Z"
    },
    "message": "Order mottagen! Din beställning kommer att vara klar om ca 12 minuter."
}
```

**Fel:** `400 Bad Request`

```json
{
    "fel": "items must be a non-empty array"
}
```