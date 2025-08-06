import jsPDF from "jspdf";

export function generateGroceryPDF(items) {
  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(16);
  doc.text("Grocery List", 10, y);
  y += 10;

  if (!Array.isArray(items) || items.length === 0) {
    doc.text("No grocery items available.", 10, y);
    doc.save("grocery_list.pdf");
    return;
  }

  const grouped = items.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  for (const [category, list] of Object.entries(grouped)) {
    if (y > 270) {
      doc.addPage();
      y = 10;
    }

    doc.setFontSize(14);
    doc.text(`${category}`, 10, y);
    y += 8;

    doc.setFontSize(11);

    list.forEach((item) => {
      const name = item.ingredientName || item.name || item.title || "Unnamed";
      const qty = item.quantity || "N/A";
      const unit = item.unit || "";
      doc.text(`• ${name} (${qty} ${unit})`, 12, y);
      y += 6;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    y += 4;
  }

  doc.save("grocery_list.pdf");
}
