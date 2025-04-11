import Logo from "../assets/mangroove-logo.svg";

export function Header() {
  const path = window.location.pathname;

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
                  // className={`nav-link ${
                  //   path === "/our-wines" ? "active" : ""
                  // }`}
                  aria-current="page"
                  href="#about-us"
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  // className={`nav-link ${path === "/story" ? "active" : ""}`}
                  // href="/story"
                  href="#products-range"
                >
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  // className={`nav-link ${
                  //   path === "/community" ? "active" : ""
                  // }`}
                  aria-disabled="true"
                  href="#contact-us"
                >
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    path === "/community" ? "active" : ""
                  }`}
                  aria-disabled="true"
                  href="/community"
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
