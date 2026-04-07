# Airbean API – Dokumentation

REST API som hanterar kaffe menyn, orders och users.
Bas-URL: `http://localhost:3000`


# ☕ Menu
### GET /menu

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


# 👤 Users
### GET /api/users/:userId

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

### POST /api/users

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

### PUT /api/users/:userId

Här kan du ändra users namn eller email och sedan uppdatera.

**Body:**

```json
{
    "name": "Lisa",
    "email": "lisaj@example.se"
}
```

**Svar:** `200 OK`

```json
{
    "userId": "58f632c2-18a7-46d4-baff-591a5c9de95f",
    "name": "Lisa",
    "email": "lisaj@example.se",
    "createdAt": "2026-04-02T12:51:34.568Z"
}
```

**Fel:** `404 Not Found`

```json
{
    "fel": "Användaren hittades inte"
}
```

---

### DELETE /api/users/:userId

Den tar bort en user.

**Svar:** `204 No Content`
```json
{
    "message": "Användaren och relaterade orderhistoriken anonymiserades"
}

```

**Fel:** `404 Not Found`

```json
{
    "fel": "Användaren hittades inte"
}
```

# 🧾 Orders
### GET /api/orders/

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

**Fel:** `404 Not Found` | `500 Internal Server Error`

---

### POST /api/orders/

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
}
    "newOrder": {
        "orderId": "b1c57f22-bfec-4c64-910a-f6c2cf5dc17a",
        "eta": 10,
        "total": 88,
        "userId": "e0c77c6b-ee9d-491c-b35d-d71c9d7a9849",
        "createdAt": "2026-04-07T08:38:13.244Z"
    },
    "message": "Order mottagen! Din beställning kommer att vara klar om ca 10 minuter."
}
```

**Fel:** `400 Bad Request`

```json
{
    "fel": "items must be a non-empty array"
}
```
---

### GET api/orders/status/orderId

Här kan man se orderstatusen för det man har beställt genom att använda orderId som man fick vid beställningen.

**Svar:** `200 OK`


```json
{
    "orderId": "074e2150-bc65-4a3c-b81a-3ef85ad579df",
    "eta": 16,
    "createdAt": "2026-04-01T08:50:37.117Z",
    "total": 137
}
```
---
### GET api/orders/user/userId

Här kan du se orderhistoriken för vad user med sitt unika id har gjort.

**Svar:** `200 OK`

```json
[
    {
        "orderId": "2cc10b59-9b26-4183-b316-fa6d1da0b3fe",
        "eta": 8,
        "total": 54,
        "userId": "cf99c8c1-9a36-41b9-acd6-d927b66433e9",
        "createdAt": "2026-04-07T08:05:53.865Z"
    }
]
```

**Fel:** `404 Not Found`