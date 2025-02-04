// import { jsPDF } from "jspdf";
// import logo from "../Assets/img/ollir-organics-background.png";

// const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFont("Helvetica"); // Use Helvetica for modern text rendering

//     let currentY = 20;

//     // Add Logo (Make sure the image path is correct)
//     doc.addImage(logo, "PNG", 150, 10, 50, 30); // Adjust position and size

//     // Header Section: "Bill of Supply"
//     doc.setFontSize(18);
//     doc.setFont("Helvetica", "bold");
//     doc.text("Request Quote", 14, currentY);
//     currentY += 10; // Increase spacing after the header

//     // Order ID and Date
//     doc.setFontSize(12);
//     doc.setFont("Helvetica", "normal");
//     doc.text(`Order ID: ${orderId}`, 14, currentY);
//     currentY += 5;
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, currentY);
//     currentY += 5;

//     // Add a horizontal line to separate sections
//     doc.setLineWidth(0.5);
//     doc.line(14, currentY, 200, currentY); // Draw horizontal line
//     currentY += 10;

//     // "Sold by" and "Billing Details" on the same line
//     const address = [
//       "Ollir Organics",
//       "C.K Colony, New Sidhapudur, Coimbatore,",
//       "Pincode:641044",
//       "Tamil Nadu.",
//     ];

//     const { name, contact, address: userAddress } = personalDetails;

//     // "Sold by" (Right-aligned)
//     doc.setFontSize(12);
//     doc.setFont("Helvetica", "bold");
//     doc.text("Sold by:", 120, currentY);
//     doc.setFont("Helvetica", "normal");
//     address.forEach((line) => {
//       currentY += 5;
//       doc.text(line, 120, currentY);
//     });

//     // "Billing Details" (Left-aligned)
//     currentY = 50; // Reset the Y to avoid overlap with Sold by
//     doc.setFontSize(12);
//     doc.setFont("Helvetica", "bold");
//     doc.text("Billing Details:", 14, currentY);
//     currentY += 5;

//     // Billing Details Information (name, contact, and address)
//     doc.setFont("Helvetica", "normal");
//     doc.text(`${name}`, 14, currentY);
//     currentY += 5;
//     doc.text(`${contact}`, 14, currentY);
//     // Handle multi-line address input
//     const userAddressLines = userAddress.split(","); // Assuming the address is comma-separated
//     userAddressLines.forEach((line) => {
//       currentY += 5;
//       doc.text(line.trim(), 14, currentY);
//     });

//     // Add space before Order Summary
//     currentY += 20;
//     doc.setFontSize(14);
//     doc.setFont("Helvetica", "bold");
//     doc.text("Order Summary:", 14, currentY);
//     currentY += 10;

//     // Table Headers
//     const headers = [
//       "S.No",
//       "Product",
//       "Quantity",
//       "Unit Price",
//       "Total Price",
//     ];
//     const columnWidths = [20, 70, 30, 30, 40];
//     doc.setFontSize(10);
//     doc.setFont("Helvetica", "bold");

//     let xPosition = 14;
//     headers.forEach((header, index) => {
//       const textWidth = doc.getTextWidth(header); // Get text width
//       const centerX = xPosition + (columnWidths[index] - textWidth) / 2; // Center alignment
//       doc.text(header, centerX, currentY);
//       xPosition += columnWidths[index];
//     });

//     currentY += 10;

//     // Table Content
//     doc.setFont("Helvetica", "normal");
//     let totalAmount = 0;
//     let serialNo = 1;

//     Object.keys(cartItems).forEach((itemId) => {
//       const quantity = cartItems[itemId];
//       const product = products[itemId];

//       if (quantity > 0) {
//         const unitPrice = parseFloat(product.price).toFixed(2);
//         const totalPrice = (quantity * parseFloat(product.price)).toFixed(2);

//         xPosition = 14;

//         // Add row values
//         // S.No - Center aligned
//         let textWidth = doc.getTextWidth(serialNo.toString());
//         doc.text(
//           serialNo.toString(),
//           xPosition + (columnWidths[0] - textWidth) / 2,
//           currentY
//         );
//         xPosition += columnWidths[0];

//         // Product - Left aligned
//         doc.text(product.title, xPosition, currentY);
//         xPosition += columnWidths[1];

//         // Quantity - Center aligned
//         textWidth = doc.getTextWidth(quantity.toString());
//         doc.text(
//           quantity.toString(),
//           xPosition + (columnWidths[2] - textWidth) / 2,
//           currentY
//         );
//         xPosition += columnWidths[2];

//         // Unit Price - Center aligned
//         textWidth = doc.getTextWidth(unitPrice);
//         doc.text(
//           `${unitPrice}`,
//           xPosition + (columnWidths[3] - textWidth) / 2,
//           currentY
//         );
//         xPosition += columnWidths[3];

//         // Total Price - Center aligned
//         textWidth = doc.getTextWidth(totalPrice);
//         doc.text(
//           `${totalPrice}`,
//           xPosition + (columnWidths[4] - textWidth) / 2,
//           currentY
//         );
//         currentY += 10;

//         totalAmount += parseFloat(totalPrice);
//         serialNo += 1;
//       }
//     });

//     // Add a horizontal line before the total amount
//     doc.setLineWidth(0.5);
//     doc.line(14, currentY, 200, currentY);
//     currentY += 10;

//     // Display the total amount
//     doc.setFont("Helvetica");
//     doc.text("Total Amount:", 150, currentY);
//     const totalAmountX = 175; // Adjust X value for right alignment
//     doc.text(`Rs ${totalAmount.toFixed(2)}`, totalAmountX, currentY);
//     currentY += 20;

//     doc.setFont("Helvetica", "bold");
//     doc.setFontSize(16); // Set the font size to 16 (adjust as needed)
//     doc.text(
//       `Grand Total: Rs. ${totalAmount.toFixed(2)} + Shipping Fee`,
//       14,
//       currentY
//     );
//     currentY += 20; // Adjust the vertical spacing as needed

//     currentY += 20;

//     // Footer Section
//     const thankYouText = "Thank you for shopping with us!";
//     const textWidth = doc.getTextWidth(thankYouText);
//     const x = (doc.internal.pageSize.width - textWidth) / 2; // Center the "thank you" message
//     doc.setFont("Helvetica", "italic");
//     doc.setFontSize(16);
//     doc.text(thankYouText, x, currentY);

//     // Save the PDF
//     doc.save(`${orderId}_invoice.pdf`);
//   };
