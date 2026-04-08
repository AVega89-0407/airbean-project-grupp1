# Airbean Kampanj Tests – Resultat

**Testat av:** Amir  
**Datum:** 2026-04-08  
**Verktyg:** POSTMAN 
**Resultat:** ✅ 7/7 requests, 29/29 assertions – ALLA GODKÄNDA

---

## Testresultat

### 1. Skapa user
- `POST http://localhost:3000/api/users` → **201 Created**
- ✅ User skapades (201)
- ✅ Har userId

### 2. Order UTAN rabatt (1 Bryggkaffe)
- `POST http://localhost:3000/api/orders` → **201 Created**
- ✅ baseTotal = 39
- ✅ discountTotal = 0
- ✅ total = 39
- ✅ Inga rabatter

### 3. Kampanj 1: Bryggkaffe 2-pack (−20 kr)
- `POST http://localhost:3000/api/orders` → **201 Created**
- ✅ baseTotal = 78
- ✅ discountTotal = 20
- ✅ total = 58
- ✅ Bryggkaffe 2-pack rabatt

### 4. Kampanj 2: Kaffekombo (−15 kr)
- `POST http://localhost:3000/api/orders` → **201 Created**
- ✅ baseTotal = 103
- ✅ discountTotal = 15
- ✅ total = 88
- ✅ Kaffekombo rabatt

### 5. Kampanj 3: Stororderrabatt (−10 kr)
- `POST http://localhost:3000/api/orders` → **201 Created**
- ✅ baseTotal = 137
- ✅ discountTotal = 10
- ✅ total = 127
- ✅ Stororderrabatt

### 6. ALLA 3 kampanjer (−45 kr)
- `POST http://localhost:3000/api/orders` → **201 Created**
- ✅ baseTotal = 181
- ✅ discountTotal = 45
- ✅ total = 136
- ✅ 3 rabatter applicerade

### 7. Hämta alla orders
- `GET http://localhost:3000/api/orders` → **200 OK**
- ✅ 200 OK
- ✅ Har orders

---

## Sammanfattning

| #  | Test                         | Status | Rabatt |
|----|------------------------------|--------|--------|
| 1  | Skapa user                   | ✅ 201 | –      |
| 2  | Order utan rabatt            | ✅ 201 | 0 kr   |
| 3  | Bryggkaffe 2-pack            | ✅ 201 | −20 kr |
| 4  | Kaffekombo                   | ✅ 201 | −15 kr |
| 5  | Stororderrabatt              | ✅ 201 | −10 kr |
| 6  | Alla 3 kampanjer             | ✅ 201 | −45 kr |
| 7  | Hämta alla orders            | ✅ 200 | –      |

**Alla 29 assertions godkända. Inga fel.**
