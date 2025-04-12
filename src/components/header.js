import Logo from "../assets/mangroove-logo.svg";
import { trackEvent } from "../utils/segment";
export function Header() {
  return (
    <div className="header-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="Mangrove Logo" className="img-fluid" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-start menu-items"
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="#about-us"
                  onClick={() => trackEvent("Clicked About Us")}
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#products-range"
                  onClick={() => trackEvent("Clicked Products")}
                >
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-disabled="true"
                  href="#contact-us"
                  onClick={() => trackEvent("Clicked Contact Us")}
                >
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link`}
                  aria-disabled="true"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://form.typeform.com/to/aRzLhKrv"
                  onClick={() => trackEvent("Clicked Distributors Typeform")}
                >
                  Distributors
                </a>
              </li>
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end social-media-icons"
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a href="instagram.com">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
