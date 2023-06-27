const PDFDocument = require("pdfkit");
const fs = require("fs");

function buildPDF(dataCallback, endCallback) {
  const invoice = {
    invoice_number: 1234,
    invoice_date: new Date(),
    balance: 1000000,
    customer: {
      name: "ta thach loi",
      email: "thanhtrollvt02@gmail.com",
    },
    // items: items.map((item) => ({
    //   item: item.name,
    //   description: item.description,
    //   quantity: item.quantity,
    //   price: item.price,
    // })),
    // subtotal: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    // paid: 0,
  };

  const doc = new PDFDocument({ margin: 50 });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  // generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  // doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("Anytown, USA 12345", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  const { customer } = invoice;

  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_number, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(invoice.invoice_date), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(formatCurrency(invoice.balance), 150, customerInformationTop + 30);

  doc
    .font("Helvetica-Bold")
    .text(customer.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(customer.address, 300, customerInformationTop + 15)
    .text(
      `${customer.city}, ${customer.state} ${customer.zip}`,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

// function generateInvoiceTable(doc, invoice) {
//   let i;
//   const invoiceTableTop = 330;

//   doc.font("Helvetica-Bold");
//   generateTableRow(
//     doc,
//     invoiceTableTop,
//     "Item",
//     "Description",
//     "Quantity",
//     "Price",
//     "Line Total"
//   );
//   generateHr(doc, invoiceTableTop + 20);
//   doc.font("Helvetica");

//   for (i = 0; i < invoice.items.length; i++) {
//     const item = invoice.items[i];
//     const position = invoiceTableTop + (i + 1) * 30;
//     generateTableRow(
//       doc,
//       position,
//       item.item,
//       item.description,
//       item.quantity,
//       formatCurrency(item.price),
//       formatCurrency(item.quantity * item.price)
//     );

//     generateHr(doc, position + 20);
//   }

//   const subtotalPosition = invoiceTableTop + (i + 1) * 30;
//   generateTableRow(
//     doc,
//     subtotalPosition,
//     "",
//     "",
//     "",
//     "Subtotal",
//     formatCurrency(invoice.subtotal)
//   );

//   const paidToDatePosition = subtotalPosition + 20;
//   generateTableRow(
//     doc,
//     paidToDatePosition,
//     "",
//     "",
//     "",
//     "Paid To Date",
//     formatCurrency(invoice.paid)
//   );

//   const duePosition = paidToDatePosition + 20;
//   doc.font("Helvetica-Bold");
//   generateTableRow(
//     doc,
//     duePosition,
//     "",
//     "",
//     "",
//     "Balance Due",
//     formatCurrency(invoice.balance)
//   );
//   doc.font("Helvetica");
// }

function generateFooter(doc) {
  doc.fontSize(10).text("Thank you for your business.", 50, 780, {
    align: "center",
    width: 500,
  });
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  quantity,
  price,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(quantity, 200, y, { width: 50, align: "right" })
    .text(price, 280, y, { width: 90, align: "right" })
    .text(lineTotal, 370, y, { width: 90, align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function formatCurrency(amount) {
  return "$" + Number(amount).toFixed(2);
}

module.exports = { buildPDF };
