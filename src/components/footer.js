import MangroveLogo from "../assets/mangroove-logo.svg";
import MangroveBrand from "../assets/mangroove-brand.svg";
import { trackEvent } from "../utils/segment";

export function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="logo-column">
          <img src={MangroveLogo} alt="Mangrove Logo" />
        </div>
        <div className="height-line" />
        <div className="menu-column">
          <ul>
            <li>
              <a
                href="#about-us"
                onClick={() => trackEvent("Clicked About Us")}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#products-range"
                onClick={() => trackEvent("Clicked Products")}
              >
                products
              </a>
            </li>
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>
            <li>
              <a href="#privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms-and-conditions">Terms and Conditions</a>
            </li>
          </ul>
        </div>
        <div className="height-line" />
        <div className="newsletter-column">
          <h5>Stay up to date</h5>
          <p>
            Sign up for our newsletter and we’ll keep you up to date on
            everything from the Mangrove range
          </p>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your email"
          />
          <button>
            <p>Subscribe</p>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="mobile-copyright-column">
          <p>
            © MANGROVE FOODS LTD {new Date().getFullYear()} - ALL RIGHTS
            RESERVED
          </p>
          <div className="social-media-icons">
            <a href="https://www.facebook.com/mangrovefoods">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.instagram.com/mangrovefoods">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <img
        src={MangroveBrand}
        alt="Mangrove Brand"
        className="img-fluid mangrove-brand"
      />

      <div className="footer-bottom">
        <div></div>
        <div></div>
        <p>
          © MANGROVE FOODS LTD {new Date().getFullYear()} - ALL RIGHTS RESERVED
        </p>
        <div />
        <div className="social-media-icons">
          <a href="https://www.facebook.com/mangrovefoods">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/mangrovefoods">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
        <div />
      </div>
    </div>
  );
}
