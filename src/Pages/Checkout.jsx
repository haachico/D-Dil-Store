import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "..";
import CartCard from "../Components/CartCard";
import Modal from "../Components/Modal";

const Checkout = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
    contactNo: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactFormShown, setIsContactFormShown] = useState(false);
  const [contactsData, setContactsData] = useState([]);
  const { cartItems, setCartItems, quantity } = useContext(Context);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [buttonText, setButtonText] = useState("Place Order");



  useEffect(() => {

    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/d-dil-store-backend/config/api/Users/getAddresses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({ userId: JSON.parse(localStorage.getItem("userData")).id }),
          }
        );

        const data = await response.json();

        setContactsData( data.data );
        
        // Set the default address as selected on page load
        const defaultAddress = data.data.find(addr => addr.is_default === 1);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.id);
        }
      }

      catch (error) {
        console.error("Error fetching addresses:", error);

      }
    
    }

    fetchAddresses();

  }, []);

 let selectedAddressDetails = contactsData.find(addr => addr.id === selectedAddress);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    // setIsContactFormShown(true);
    openModal();
  };

  const handleCancelClick = () => {
    setIsContactFormShown(false);
  };

  const handleSaveClick = async () => {
    const isFormValid = Object.values(contact).every(
      (value) => value.trim() !== ""
    );

    console.log(isFormValid, Object.values(contact));

    if (isFormValid) {
      
      const response = fetch(
        "http://localhost:8080/d-dil-store-backend/config/api/Users/saveAddress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({ userId: JSON.parse(localStorage.getItem("userData")).id, ...contact }),
        }
      );

      const data = await response.json();

      console.log("Address saved:", data);
      setContactsData((prevData) => [...prevData, contact]);      
      
      setContact({
        firstName: "",
        lastName: "",
        pincode: "",
        city: "",
        state: "",
        address: "",
        contactNo: "",
      });
    } else {
      alert("*Please fill in all the fields");
    }
    setIsModalOpen(false);
  };

  const handleClearClick = () => {
    setContact({
      firstName: "",
      lastName: "",
      pincode: "",
      city: "",
      state: "",
      address: "",
      contactNo: "",
    });
  };

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


  const handleDefaultAddress = async (id) => {

    const response = await fetch(
      "http://localhost:8080/d-dil-store-backend/config/api/Users/setDefaultAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ userId: JSON.parse(localStorage.getItem("userData")).id, addressId: id}),
      }
    );
    // setSelectedAddress( JSON.parse( e.target.value ) );


  }

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
                  value={e.id}
                  checked={selectedAddress === e.id}
                  onChange={() => {
                    setSelectedAddress(e.id);
                    handleDefaultAddress(e.id);
                  }}
                />
                <span>
                  {console.log(selectedAddress, "SELECTED ADR")}
                  <p>
                    {" "}
                    <strong>Name:</strong> {`${e.first_name} ${e.last_name}`}{" "}
                  </p>
                  <p>
                    {" "}
                    <strong>Address: </strong> {e.address}{" "}
                  </p>
                  <p>
                    <strong>Pin code: </strong> {e.pin_code}
                  </p>
                  <p>
                    <strong>City: </strong> {e.city}
                  </p>
                  <p>
                    <strong>State:</strong> {e.state}
                  </p>
                  <p>
                    {" "}
                    <strong>Contact Number: </strong> {e.contact_no}{" "}
                  </p>
                  <button
                    onClick={() => handleDelete(e.first_name)}
                    className="delete--address"
                  >
                    Delete
                  </button>
                </span>
              </label>
            </div>
          ))}
          <button onClick={openModal} className="add--address--btn">
            {" "}
            <i class="fa-solid fa-plus"></i> {""}Add Address
          </button>
          {
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <form>
                <h4>Enter the address : </h4>
                <div className="form--content">
                  <div>
                    <label htmlFor="firstName">First Name: </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={contact.firstName}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="city">City: </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={contact.city}
                      onChange={(e) => handleChange(e)}
                    />

                    <label htmlFor="address">Address: </label>
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
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={contact.lastName}
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

                    <label htmlFor="mobileNum">Contact No.:</label>
                    <input
                      type="text"
                      id="mobileNum"
                      name="contactNo"
                      value={contact.contactNo}
                      onChange={(e) => handleChange(e)}
                    />

                    <div className="form--btns">
                      <button onClick={handleSaveClick}>Save</button>
                      <button onClick={handleClearClick}>Clear</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                  </div>
                </div>
              </form>
            </Modal>  
          }
        </div>
        <div>
          {selectedAddressDetails && (
            <div style={{ textAlign: "left", fontSize: "13px" }}>
              <p style={{ fontSize: "14px", textAlign: "left" }}>
                {" "}
                <strong>Deliver to :</strong> <p></p>
              </p>
              <p>{`${selectedAddressDetails.first_name} ${selectedAddressDetails.last_name}`}</p>
              <p style={{ fontSize: "13px", textAlign: "left" }}>
                {`${selectedAddressDetails.address}, ${selectedAddressDetails.city} ${selectedAddressDetails.pin_code}, ${selectedAddressDetails.state}. Contact No. : ${selectedAddressDetails.contact_no}`}
              </p>
            </div>
          )}
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
