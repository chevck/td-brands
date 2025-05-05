import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function PrivacyPolicyPage() {
  const [activePage] = useState(
    new URLSearchParams(window.location.search).get("page") ?? "privacy"
  );
  return (
    <div className='privacy-policy'>
      <Header />
      <div className='privacy-policy-container'>
        <ul class='nav nav-underline'>
          <li class='nav-item'>
            <a
              className={`nav-link ${activePage === "privacy" ? "active" : ""}`}
              href='?page=privacy'
            >
              Privacy Policy
            </a>
          </li>
          <li class='nav-item'>
            <a
              className={`nav-link ${activePage === "terms" ? "active" : ""}`}
              href='?page=terms'
            >
              Terms of Use
            </a>
          </li>
        </ul>
        <div className='content'>
          {activePage === "privacy" ? <PrivacyPage /> : <TermsOfUsePage />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function PrivacyPage() {
  return (
    <>
      <h3>Privacy Policy</h3>
      <h5>Last updated: January 2, 2025</h5>
      <p>
        At Mangrove Foods, we take your privacy seriously. This Privacy Policy
        explains how we collect, use, and protect your personal information.
      </p>
      <div className='point'>
        <h4>Information We Collect</h4>
        <ul>
          <li>
            Personal identification information (Name, email address, phone
            number)
          </li>
          <li>Payment information</li>
          <li>Website usage data</li>
        </ul>
      </div>
      <div className='point'>
        <h4>How We Use Your Information</h4>
        <ul>
          <li>To process your orders and transactions</li>
          <li>To send promotional communications</li>
          <li>To improve our products and services</li>
          <li>To comply with legal obligations</li>
        </ul>
      </div>
      <div className='point'>
        <h4>Data Sharing and Disclosure</h4>
        <p>
          We implement various security measures to maintain the safety of your
          personal information when you enter, submit, or access your personal
          information.
        </p>
      </div>
      <div className='point'>
        <h4>Cookies</h4>
        <p>
          We use cookies to help us remember and process the items in your
          shopping cart, understand and save your preferences for future visits,
          and compile aggregate data about site traffic and site interaction.
        </p>
      </div>
      <div className='point-block'>
        <h4>Questions About Our Privacy Policy?</h4>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <div class='holder'>
          <i class='bi bi-envelope'></i>
          <a href='mailto:privacy@mangrovefoods.com'>
            privacy@mangrovefoods.com
          </a>
        </div>
      </div>
    </>
  );
}

function TermsOfUsePage() {
  return (
    <>
      <h3>Terms of Use</h3>
      <h5>Last updated: January 2, 2025</h5>
      <p>
        By accessing and using the Mangrove Foods website, you accept and agree
        to be bound by these Terms of Use.
      </p>
      <div className='point'>
        <h4>Acceptance of Terms</h4>
        <p>
          These terms apply to all visitors, users, and others who access or use
          our website and services.
        </p>
      </div>
      <div className='point'>
        <h4>Intellectual Property</h4>
        <p>
          All content, features, and functionality of this website are owned by
          Mangrove Foods and are protected by international copyright,
          trademark, and other intellectual property laws.
        </p>
      </div>
      <div className='point'>
        <h4>User Conduct</h4>
        <ul>
          <li>Do not use the website for any illegal purpose</li>
          <li>Do not attempt to gain unauthorized access</li>
          <li>Do not interfere with the proper working of the website</li>
          <li>Do not impersonate others or provide false information</li>
        </ul>
      </div>
      <div className='point'>
        <h4>Disclaimer</h4>
        <p>
          The website is provided "as is" without any warranties, expressed or
          implied. Mangrove Foods does not warrant that the website will be
          error-free or uninterrupted.
        </p>
      </div>
      <div className='point-block'>
        <h4>Questions About Our Terms?</h4>
        <p>
          If you have any questions about these Terms of Use, please contact us:
        </p>
        <div class='holder'>
          <i class='bi bi-envelope'></i>
          <a href='mailto:legal@mangrovefoods.com'>legal@mangrovefoods.com</a>
        </div>
      </div>
    </>
  );
}
