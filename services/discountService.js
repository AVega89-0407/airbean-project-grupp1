// Kampanjrabatter (VG-krav)
// Kontrollerar produktkombinationer och applicerar rabatter automatiskt

export function calculateTotal(items, menu) {
  let baseTotal = 0;
  // qty = "quantity" (antal), {} skapar ett tomt objekt som fylls med antal per produkt-id
  const qty = {};

  // Räknar antal av varje produkt och totalpris
  for (const itemId of items) {
    const product = menu.find(m => m.id === itemId);
    if (product) {
      // += betyder "add and assign", samma som: baseTotal = baseTotal + product.price
      baseTotal += product.price;
      qty[itemId] = (qty[itemId] || 0) + 1;
    }
  }

  let total = baseTotal;
  // Tom array som fylls med rabatter som matchar, börjar tom för varje ny order
  const applied = [];

  // Kampanj 1: minst 2 Bryggkaffe (id:1) = 20 kr rabatt
  if ((qty[1] || 0) >= 2) {
    total -= 20;
    applied.push({ name: 'Bryggkaffe 2-pack', amount: 20 });
  }

  // Kampanj 2: Cappuccino (id:3) + Kaffe Latte (id:5) = 15 kr rabatt
  if ((qty[3] || 0) >= 1 && (qty[5] || 0) >= 1) {
    total -= 15;
    applied.push({ name: 'Kaffekombo (Cappuccino + Kaffe Latte)', amount: 15 });
  }

  // Kampanj 3: minst 3 valfria produkter = 10 kr rabatt
  if (items.length >= 3) {
    total -= 10;
    applied.push({ name: 'Stororderrabatt (3+ varor)', amount: 10 });
  }

  if (total < 0) total = 0;

  return {
    baseTotal,
    total,
    discountTotal: baseTotal - total,
    applied,
  };
}
