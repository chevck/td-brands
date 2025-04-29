import MangroveLogo from "../assets/mangroove-logo.svg";
import MangroveBrand from "../assets/mangroove-brand.svg";
import { trackEvent } from "../utils/segment";
import { useState } from "react";

export function Footer() {
  const [emailAddress, setEmailAddress] = useState("");
  const isOnHomePage = window.location.pathname === "/";

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribeUser = () => {
    if (!isEmailValid(emailAddress)) return "Invalid Email Address";
    // save to segment
    trackEvent("Email Subscription", { emailAddress });
  };

  return (
    <div className='footer-container'>
      <div className='footer'>
        <div className='logo-column' onClick={() => window.location.href("/")}>
          <img src={MangroveLogo} alt='Mangrove Logo' />
        </div>
        <div className='height-line' />
        <div className='menu-column'>
          <ul>
            <li>
              <a
                href={isOnHomePage ? "#about-us" : "/#about-us"}
                onClick={() => trackEvent("Clicked About Us")}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href={isOnHomePage ? "#products-range" : "/#products-range"}
                onClick={() => trackEvent("Clicked Products")}
              >
                products
              </a>
            </li>
            <li>
              <a href='mailto:media@mangrovefoods.com'>Contact Us</a>
            </li>
            <li>
              <a href='/privacy-terms?page=privacy'>Privacy Policy</a>
            </li>
            <li>
              <a href='/privacy-terms?page=terms'>Terms and Conditions</a>
            </li>
          </ul>
        </div>
        <div className='height-line' />
        <div className='newsletter-column'>
          <h5>Stay up to date</h5>
          <p>
            Sign up for our newsletter and we’ll keep you up to date on
            everything from the Mangrove range
          </p>
          <input
            className='form-control'
            type='text'
            placeholder='Enter your email'
            onChange={({ target: { value } }) => setEmailAddress(value)}
          />
          <button onClick={handleSubscribeUser}>
            <p>Subscribe</p>
            <i className='bi bi-chevron-right'></i>
          </button>
        </div>
        <div className='mobile-copyright-column'>
          <p>
            © MANGROVE FOODS LTD {new Date().getFullYear()} - ALL RIGHTS
            RESERVED
          </p>
          <div className='social-media-icons'>
            <a
              href='https://www.facebook.com/mangrovefoods'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='bi bi-facebook'></i>
            </a>
            <a
              href='https://www.instagram.com/mangrovefoods'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='bi bi-instagram'></i>
            </a>
          </div>
        </div>
      </div>

      <img
        src={MangroveBrand}
        alt='Mangrove Brand'
        className='img-fluid mangrove-brand'
      />

      <div className='footer-bottom'>
        <div></div>
        <div></div>
        <p>
          © MANGROVE FOODS LTD {new Date().getFullYear()} - ALL RIGHTS RESERVED
        </p>
        <div />
        <div className='social-media-icons'>
          <a
            href='https://www.facebook.com/mangrovefoods'
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='bi bi-facebook'></i>
          </a>
          <a
            href='https://www.instagram.com/mangrovefoods'
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='bi bi-instagram'></i>
          </a>
          <a
            href='https://www.tiktok.com/mangrovefoods'
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='bi bi-tiktok'></i>
          </a>
        </div>
        <div />
      </div>
    </div>
  );
}
