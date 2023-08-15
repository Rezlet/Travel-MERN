const PDFDocument = require("pdfkit");
const fs = require("fs");

const fontPath = "Back-end/service/font/arial-unicode-ms.ttf";
const fontBuffer = fs.readFileSync(fontPath);
const buildPDF = (object) => {
  const invoice = {
    invoice_number: object.transactionId,
    invoice_date: new Date(),
    balance: object.amount,
    customer: {
      name: object.user.name,
      email: object.user.email,
      address: "", // Thêm địa chỉ khách hàng nếu có
      city: "", // Thêm thành phố khách hàng nếu có
      state: "", // Thêm bang/ tỉnh của khách hàng nếu có
      zip: "", // Thêm mã bưu chính của khách hàng nếu có
    },
    tour: {
      name: object.tour.name,
      price: object.tour.price,
      quantity: object.quantity,
      total: object.amount,
      received: object.received,
      remainingAmount: object.amount - object.received,
    companyAddress: "36 Ung Văn Khiêm, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh"

    },
  };

  const chunks = [];
  const doc = new PDFDocument({ margin: 50 });
  doc.registerFont("ArialUnicodeMS", fontBuffer);
  let resolve;

  const promise = new Promise((res) => {
    resolve = res;
  });

  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {
    const pdfBytes = Buffer.concat(chunks);
    resolve(pdfBytes);
  });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();

  return promise;
};

function generateHeader(doc) {
  doc
    .image("Back-end/service/images/logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .font("ArialUnicodeMS")
    .text("LOVE TRAVEL COOP", 110, 57)
    .fontSize(10)
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("Anytown, USA 12345", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  const { customer, tour } = invoice;

  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(`Hóa đơn #${invoice.invoice_number}`, 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Tên khách hàng:", 50, customerInformationTop)
    .font("ArialUnicodeMS")
    .text(customer.name, 150, customerInformationTop)
    .font("ArialUnicodeMS")
    .text("Email:", 50, customerInformationTop + 15)
    .text(customer.email, 150, customerInformationTop + 15)
    .text("Tour:", 50, customerInformationTop + 30)
    .text(tour.name, 150, customerInformationTop + 30)
    .text("Giá:", 50, customerInformationTop + 45)
    .text(formatCurrency(tour.price), 150, customerInformationTop + 45)
    .text("Số lượng:", 50, customerInformationTop + 60)
    .text(tour.quantity, 150, customerInformationTop + 60)
    .text("Tổng tiền hóa đơn:", 50, customerInformationTop + 75)
    .text(formatCurrency(tour.total), 150, customerInformationTop + 75)
    .text("Tổng tiền đã nhân:", 50, customerInformationTop + 90)
    .text(formatCurrency(tour.received), 150, customerInformationTop + 90)
    .text("Số tiền còn lại:", 50, customerInformationTop + 105)
    .text(formatCurrency(tour.remainingAmount), 150, customerInformationTop + 105)
    .text("Quý khách vui lòng thanh toán số tiền còn lại tại quầy thu ngân:", 50,customerInformationTop + 150)
    .text("Tại địa chỉ:" + tour.companyAddress, 50, customerInformationTop + 165)

  generateHr(doc, 400);
}

function generateInvoiceTable(doc, invoice) {
  // Không sử dụng hàm này trong trường hợp này
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text("Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.", 50, 780, {
      align: "center",
      width: 500,
    });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat().format(amount);
}

module.exports = { buildPDF };
