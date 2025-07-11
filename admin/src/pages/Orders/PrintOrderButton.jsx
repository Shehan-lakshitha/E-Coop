import React from "react";

const PrintOrderButton = ({ order }) => {
  const printOrder = () => {
    const printWindow = window.open("", "_blank", "width=600,height=600");

    const totalAmount =
      order.amount ||
      order.items.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );

    const orderHtml = `
      <html>
        <head>
          <title>Print Order</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2, h3 { color: #333; margin-bottom: 5px; }
            p { margin: 4px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f4f4f4; }
            tfoot td { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Invoice</h1>
          <div style="text-align: right; margin-top: -40px;">
            <img src="./E-Coop.png" alt="Logo" style="height: 40px;" />
            <p>+94 11 23 34 400</p>
            <p>newecoop@gmail.com</p>
          </div>
          <h2>Order Details</h2>
          <p><strong>Customer Name:</strong> ${order.userName || "Customer"}</p>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Order Date:</strong> ${
            order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"
          }</p>
          <p><strong>Delivery Address:</strong> ${
            order.address
              ? `${order.address.street}, ${order.address.city}, ${order.address.postalCode}`
              : "N/A"
          }</p>

          <h3>Items</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Description</th><th>Price</th><th>Quantity</th><th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.description || "-"}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${item.quantity || 1}</td>
                  <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                </tr>`
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" style="text-align:right;">Total Amount</td>
                <td>${totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(orderHtml);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <button className="print-btn" onClick={printOrder} title="Print this order">
      Print
    </button>
  );
};

export default PrintOrderButton;
