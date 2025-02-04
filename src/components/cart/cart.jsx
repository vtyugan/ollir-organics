import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";


import "./Cart-Items.css";

const CartItems = () => {
  const { getTotalCartAmount, products, cartItems, removeFromCart, addToCart } =
    useContext(ShopContext);

  const [showDialog, setShowDialog] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  // Generate Order ID in format 000001-YYYYMMDD
  const generateOrderId = () => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
    const sequencePart = String(
      Math.floor(Math.random() * 999999) + 1
    ).padStart(6, "0"); // 6-digit sequence
    return `${sequencePart}-${datePart}`;
  };

  const handleProceedToCheckout = () => {
    // Check if cart is empty
    if (
      Object.keys(cartItems).filter((itemId) => cartItems[itemId] > 0)
        .length === 0
    ) {
      alert("Your cart is empty. Please add products to proceed.");
      return;
    }

    // Reset error and proceed to checkout
    setError("");
    setOrderId(generateOrderId());
    setShowDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    // Allow only alphabetic characters and spaces
    if (/^[A-Za-z\s]*$/.test(value)) {
      setPersonalDetails((prevDetails) => ({
        ...prevDetails,
        name: value,
      }));
    }
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    // Allow only numbers (0-9)
    if (/^\d*$/.test(value)) {
      setPersonalDetails((prevDetails) => ({
        ...prevDetails,
        contact: value,
      }));
    }
  };

  const validateFields = () => {
    const { name, contact, address } = personalDetails;
    let errorMessage = "";

    if (!name.trim()) {
      errorMessage += "Name is required.\n";
    }
    if (!contact.trim()) {
      errorMessage += "10 Digit mobile number.\n";
    } else if (!/^[6-9]\d{9}$/.test(contact)) {
      // Indian 10-digit phone number validation
      errorMessage += "Not a valid phone number.\n";
    }
    if (!address.trim()) {
      errorMessage += "Address is required.\n";
    }

    if (errorMessage) {
      setError(errorMessage);
      return false;
    }
    setError(""); // Clear error if fields are valid
    return true;
  };

  const handleAlertResponse = (response) => {
    if (response === "yes") {
      if (validateFields()) {
        shareOnWhatsApp();
      }
    } else {
      setShowDialog(false);
    }
  };

  const shareOnWhatsApp = () => {
    const cartSummary = generateCartSummary();
    const phoneNumber = "+919363620057";
    const { name, contact, address } = personalDetails;
    const message = `Order ID: ${orderId}\n\nOrder Summary:\n${cartSummary}\n\nPersonal Details:\nName: ${name}\nContact: ${contact}\nAddress: ${address}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
    setShowDialog(false);
  };

  const generateCartSummary = () => {
    const cartSummary = Object.keys(cartItems)
      .map((itemId) => {
        const quantity = cartItems[itemId];
        const product = products[itemId];
        if (quantity > 0) {
          return `${product.title} (x${quantity}) - ₹${(
            quantity * parseFloat(product.price)
          ).toFixed(2)}`;
        }
        return null;
      })
      .filter((item) => item !== null)
      .join("\n");

    const subtotal = getTotalCartAmount();
    const total = parseFloat(subtotal) || 0;

    // Return without subtotal for the dialog box
    return `${cartSummary}\n\nTotal: ₹${total.toFixed(2)} + Shipping fee`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

 
  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top after component renders
  }, []); // Runs only once when the component mounts

  return (
    <div className="cartitems">
      <hr />
      {Object.keys(cartItems).map((itemId) => {
        const quantity = cartItems[itemId];
        const product = products[itemId];

        if (quantity > 0) {
          return (
            <div key={itemId}>
              <div className="cartitems-format">
                <img
                  src={product.image}
                  alt={product.title}
                  className="carticon-product-icon"
                />
                <p>{product.title}</p>
                <p>₹{product.price}</p>
                <div className="cartitems-quantity">
                  {quantity === 1 ? (
                    <>
                      <DeleteIcon
                        onClick={() => removeFromCart(itemId)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      />
                      <span>{quantity}</span>
                      <AddIcon
                        onClick={() => addToCart(itemId)}
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                      />
                    </>
                  ) : (
                    <>
                      <RemoveIcon
                        onClick={() => removeFromCart(itemId)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      />
                      <span>{quantity}</span>
                      <AddIcon
                        onClick={() => addToCart(itemId)}
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                      />
                    </>
                  )}
                </div>
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{formatAmount(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Total</p>
              <p>₹{formatAmount(getTotalCartAmount())} + Shipping Fee</p>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button
            className="handle-btn"
            onClick={handleProceedToCheckout}
            disabled={
              Object.keys(cartItems).filter((itemId) => cartItems[itemId] > 0)
                .length === 0 || getTotalCartAmount() === 0
            }
          >
            Proceed to checkout
          </button>
        </div>
      </div>

      {/* Dialog Box for Personal Details */}
      {showDialog && (
        <div className="checkout-dialog">
          <div className="checkout-dialog-box">
            <h2>Billing Details</h2>
            <p>Order ID: {orderId}</p>
            {/* <pre>{generateCartSummary()}</pre> Display cart summary as text */}
            <div className="input-container">
              <label className={personalDetails.name ? "input-filled" : ""}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={personalDetails.name}
                onChange={(e) => handleNameChange(e)}
                required
              />
            </div>
            <div className="input-container">
              <label className={personalDetails.contact ? "input-filled" : ""}>
                Contact Number
              </label>
              <input
                type="text" // Changed to text to allow input validation
                name="contact"
                value={personalDetails.contact}
                onChange={(e) => handleContactChange(e)}
                required
              />
            </div>
            <div className="input-container">
              <label className={personalDetails.address ? "input-filled" : ""}>
                Shipping Address
              </label>
              <textarea
                name="address"
                value={personalDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <p style={{ textAlign: "center" }}>Confirm Order</p>
            <button
              onClick={() => handleAlertResponse("yes")}
              className="sucess-button"
            >
              Yes
            </button>
            <button
              onClick={() => handleAlertResponse("no")}
              className="danger-button"
            >
              No
            </button>{" "}
            {/* Added class for styling */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
