import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "..";
import CartCard from "../Components/CartCard";

const Checkout = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
    phoneNumber: "",
  });

  const [isContactFormShown, setIsContactFormShown] = useState(false);
  const [contactsData, setContactsData] = useState([]);
  const { cartItems, setCartItems, quantity } = useContext(Context);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [buttonText, setButtonText] = useState("Place Order");

  console.log(cartItems, "CART ITEMS");

  const cartTotal = cartItems.reduce(
    (acc, curr) => acc + curr.price * 70 * quantity,
    0
  );

  const totalDiscount = cartItems.reduce(
    (acc, curr) =>
      acc + (curr.discountPercentage / 100) * curr.price * 70 * quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log(contact);

  const handleAddAddress = () => {
    setIsContactFormShown(true);
  };

  const handleCancelClick = () => {
    setIsContactFormShown(false);
  };

  const handleSaveClick = () => {
    const isFormValid = Object.values(contact).every(
      (value) => value.trim() !== ""
    );

    if (isFormValid) {
      setIsContactFormShown(false);
      setContactsData([...contactsData, contact]);
      setContact({
        firstName: "",
        lastName: "",
        pincode: "",
        city: "",
        state: "",
        address: "",
        phoneNumber: "",
      });
    } else {
      alert("*Please fill in all the fields");
    }
  };

  const handleClearClick = () => {
    setContact({
      firstName: "",
      lastName: "",
      pincode: "",
      city: "",
      state: "",
      address: "",
      phoneNumber: "",
    });
  };

  console.log(contact, "Contact");

  const handleDelete = (name) => {
    setContactsData(contactsData.filter((e) => e.firstName !== name));
  };

  const handlePlaceOrder = () => {
    if (selectedAddress === "") {
      alert("Please select an address");
    } else if (cartItems.length === 0) {
      alert("Please add items to cart!");
    } else {
      setButtonText("Ordering...");

      setTimeout(() => {
        alert("Order Placed!");
        setCartItems([]);
        console.log("Cart emptied!");
        setButtonText("Place order");
      }, 3000);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/cart" className="back--button">
        &larr; <span>Back</span>
      </Link>
      <div className="check--out">
        <div>
          {contactsData.map((e) => (
            <div className="address--section">
              <label>
                <input
                  type="radio"
                  name="selectedAddress"
                  value={JSON.stringify(e)}
                  checked={
                    JSON.stringify(selectedAddress) === JSON.stringify(e)
                  }
                  onChange={(e) =>
                    setSelectedAddress(JSON.parse(e.target.value))
                  }
                />
                <span>
                  {console.log(selectedAddress, "SELECTED ADR")}
                  <p>
                    {" "}
                    <strong>Name</strong>: {`${e.firstName} ${e.lastName}`}{" "}
                  </p>
                  <p>
                    {" "}
                    <strong>Address</strong>: {e.address}{" "}
                  </p>
                  <p>
                    <strong>Pin code </strong>: {e.pincode}
                  </p>
                  <p>
                    <strong>City</strong> : {e.city}
                  </p>
                  <p>
                    <strong>State</strong>: {e.state}
                  </p>
                  <p>
                    {" "}
                    <strong>Contact Number</strong>: {e.phoneNumber}{" "}
                  </p>
                  <button
                    onClick={() => handleDelete(e.firstName)}
                    className="delete--address"
                  >
                    Delete
                  </button>
                </span>
              </label>
            </div>
          ))}
          <button onClick={handleAddAddress} className="add--address--btn">
            {" "}
            <i class="fa-solid fa-plus"></i> {""}Add Address
          </button>
          {isContactFormShown && (
            <form className="form">
              <label htmlFor="firstName">First Name : </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={contact.firstName}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="lastName">Last Name : </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={contact.lastName}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="address">Address : </label>
              <textarea
                className="textArea"
                id="address"
                name="address"
                value={contact.address}
                onChange={(e) => handleChange(e)}
                required
              />
              <label htmlFor="pincode">Pin code: </label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                value={contact.pincode}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="city">City : </label>
              <input
                type="text"
                id="city"
                name="city"
                value={contact.city}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="state">State: </label>
              <input
                type="text"
                id="state"
                name="state"
                value={contact.state}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="mobileNum">Contact No. :</label>
              <input
                type="text"
                id="mobileNum"
                name="phoneNumber"
                value={contact.phoneNumber}
                onChange={(e) => handleChange(e)}
              />

              <div className="form--btns">
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleClearClick}>Clear</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </form>
          )}
        </div>
        <div>
          <div style={{ textAlign: "left", fontSize: "13px" }}>
            <p style={{ fontSize: "14px", textAlign: "left" }}>
              {" "}
              <strong>Deliver to :</strong> <p></p>
            </p>
            <p>{`${selectedAddress.firstName} ${selectedAddress.lastName}`}</p>
            <p style={{ fontSize: "13px", textAlign: "left" }}>
              {`${selectedAddress.address}, ${selectedAddress.city} ${selectedAddress.pincode}, ${selectedAddress.state}. Contact No. : ${selectedAddress.phoneNumber}`}
            </p>
          </div>
          <div className="bill">
            <h3>Billing Details</h3>
            <div>
              <div className="billing--details">
                <div>
                  <p>Cart total : </p>
                  <p>Discount : </p>
                  <h3>Total Amount : </h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p> ₹ {cartTotal}</p>
                  <p> ₹ {Math.round(totalDiscount)}</p>
                  <h3> ₹ {cartTotal - Math.round(totalDiscount)}</h3>
                </div>
              </div>

              <Link to="/checkout">
                <button className="checkout--btn" onClick={handlePlaceOrder}>
                  {buttonText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
