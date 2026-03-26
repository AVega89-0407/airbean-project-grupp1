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

## GET /api/[resurs]/:id

[Vad endpointen gör]

**Svar:** `200 OK`
**Fel:** `404 Not Found`

---

## POST /api/[resurs]

[Vad endpointen gör]

**Body:**

```json
{
  "fält1": "värde",
  "fält2": "värde"
}
```

**Svar:** `201 Created`
**Fel:** `400 Bad Request`

---

## PUT /api/[resurs]/:id

[Vad endpointen gör]

**Body:** [samma som POST]
**Svar:** `200 OK`
**Fel:** `404 Not Found` | `400 Bad Request`

---

## DELETE /api/[resurs]/:id

[Vad endpointen gör]

**Svar:** `204 No Content`
**Fel:** `404 Not Found`