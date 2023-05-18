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
    alternatePhoneNumber: "",
  });

  const [isContactFormShown, setIsContactFormShown] = useState(false);
  const [contactsData, setContactsData] = useState([]);
  const { cartItems, quantity, setQuantity } = useContext(Context);
  const [selectedAddress, setSelectedAddress] = useState("");

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
    } else {
      alert("*Please fill in all the fields");
    }
  };

  const handleDelete = (name) => {
    setContactsData(contactsData.filter((e) => e.firstName !== name));
  };
  return (
    <div className="check--out">
      <div>
        {contactsData.map((e) => (
          <div className="address--section">
            <label>
              <input
                type="radio"
                name="selectedAddress"
                value={e.address}
                checked={selectedAddress === e.address}
                onChange={(e) => setSelectedAddress(e.target.value)}
              />
              <span>
                <p> Name: {`${e.firstName} ${e.lastName}`} </p>
                <p> Address: {e.address} </p>
                <p> Contact Number: {e.phoneNumber} </p>
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
            <label htmlFor="mobileNum">Contact No. :</label>
            <input
              type="text"
              id="mobileNum"
              name="phoneNumber"
              value={contact.phoneNumber}
              onChange={(e) => handleChange(e)}
            />

            <label htmlFor="alternateMobNum">
              Alternative contact No. (optional):{" "}
            </label>
            <input
              type="number"
              id="alternateMobNum"
              name="alternatePhoneNumber"
              value={contact.alternatePhoneNumber}
              onChange={(e) => handleChange(e)}
            />
            <div className="form--btns">
              <button onClick={handleSaveClick}>Save</button>
              <button>Clear</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          </form>
        )}
      </div>
      <div>
        <div className="bill">
          <h1>Billing Details</h1>
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
              <button className="checkout--btn">Check out </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
