import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer--div">
      <div>
        <div>
          <h1>Get in touch</h1>
        </div>
        <div className="list--div">
          <div className="icon--div">
            <span>
              <i class="fa-solid fa-phone" style={{ color: "white" }}></i>
            </span>
            <p>+91 322 2232 5343</p>
          </div>
          <div className="icon--div">
            <span>
              <i class="fa-solid fa-envelope" style={{ color: "white" }}></i>
            </span>
            <p>Enquiry@ddilstore.com</p>
          </div>

          <div className="icon--div">
            <span>
              {" "}
              <i
                class="fa-solid fa-envelope-open-text"
                style={{ color: "white" }}
              ></i>
            </span>
            <p>info@ddilstore.com</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h1>Quick Links</h1>
        </div>
        <div className="list--div">
          <ul>
            <li>FAQs</li>
            <li>Term Conditions</li>
            <li>Privacy Policy</li>
            <li>Cancellation Refund Policy</li>
            <li>Shipping Policy</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <h1>Social Medias</h1>
        </div>
        <div className="list--div">
          <ul className="socialmedia--icons">
            <Link to="https://www.instagram.com/haachico/">
              <span>
                <li>
                  <i class="fa-brands fa-instagram"></i>
                </li>
              </span>
            </Link>
            <Link to="https://www.facebook.com/nilesh.kokare.7/">
              <span>
                <li>
                  <i class="fa-brands fa-facebook-f"></i>
                </li>
              </span>
            </Link>
            <Link to="https://twitter.com/haachico">
              <span>
                <li>
                  <i class="fa-brands fa-twitter"></i>
                </li>
              </span>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
