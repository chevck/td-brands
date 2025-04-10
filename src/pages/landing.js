import { Header } from "../components/header";
import MangroveLogo from "../assets/mangroove-logo.svg";
import LeavesLeft from "../assets/leaves-left.png";
import Tomatoes from "../assets/tomatoes.png";
import MangroveGreenPeas from "../assets/mangrove-green-peas.png";
import MangroveSweetCorn from "../assets/mangrove-sweet-corn.png";
import FullColorFlavorImg from "../assets/full-color-flavor.png";
import Beans from "../assets/beans.png";
import LeavesRight from "../assets/leaves-right.png";
import Corn from "../assets/corn.png";
import MangroveProducts from "../assets/mangroove-products.png";
import Peas from "../assets/peas.png";
import PepperNut from "../assets/pepper-nut.png";
import JollofPlate from "../assets/jollof-plate.png";
import Carousel from "react-multi-carousel";
import MangroveBrand from "../assets/mangroove-brand.svg";
import React from "react";

export function LandingPage() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="landing-page">
      <Header />
      <div className="">
        {/* <div className="container-fluid"> */}
        <div className="hero-section">
          <div className="hero-section-content">
            <img
              className="hero-section-img _left-leaves"
              src={LeavesLeft}
              alt="Leaves Left"
            />
            <img
              className="hero-section-img _tomatoes"
              src={Tomatoes}
              alt="Tomatoes"
            />
            <img
              className="hero-section-img _full-color-flavor"
              src={FullColorFlavorImg}
              alt="Full Color Flavor"
            />
            <img className="hero-section-img _beans" src={Beans} alt="Beans" />
            <img
              className="hero-section-img _leaves-right"
              src={LeavesRight}
              alt="Leaves Right"
            />
            <img className="hero-section-img _corn" src={Corn} alt="Corn" />

            <button>
              <p>Where to Buy</p>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="products-range" id="products-range">
          <h5>Explore our range</h5>
          <div className="">
            <div className="products">
              <img
                src={MangroveSweetCorn}
                // src={
                //   "https://images.ctfassets.net/b9z5sch0zany/3pUvzr8arIvZJUxlCUqx5n/413fd68f4d8202b006140633fa7d682f/MANGROVE_CAN_SWEETCORN__2_.png"
                // }
                alt="sweet corn"
                className="img-fluid"
              />
              <img
                src={
                  "https://images.ctfassets.net/b9z5sch0zany/uw8Sa1f0N1XiG6KYyCPpN/c200642270d721a490b8934aa883b8da/MANGROVE_CANS_SARDINES.png"
                }
                alt="sardines"
                className="img-fluid"
              />
              <img
                src={
                  "https://images.ctfassets.net/b9z5sch0zany/2AbCvvdQhmmwthp7Gq2jUc/565dff0f1e2e7c75b16291598597feba/MANGROVE_CAN_BAKED-BEANS.png"
                }
                alt="baked beans"
                className="img-fluid"
              />
              <img
                src={MangroveGreenPeas}
                // src={
                //   "https://images.ctfassets.net/b9z5sch0zany/10FxFA3doGziGZtRDvMJ0j/926811c4ecaeb06e53d123499b58d501/MANGROVE_CAN_PEAS.png"
                // }
                alt="peas"
                className="img-fluid"
              />
              <img
                src={
                  "https://images.ctfassets.net/b9z5sch0zany/4ksgBaRv2XA0THoABxBGU5/5974040fea3caea221d21d45d78cab0d/MANGROVE_CAN_MACKEREL.png"
                }
                alt="mackerel"
                className="img-fluid"
              />
            </div>
            <div className="discover-more-btn">
              <button>
                <p>Discover More</p>
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="about-mangrove" id="about-us">
          <h5>About Mangrove Foods</h5>
          <img src={Peas} alt="Peas" className="img-fluid side-img peas" />
          <h6>
            Everyone at Mangrove Foods works hard to bring you high-quality
            ingredients from across the tropics direct to your door. From rice
            and traditional flours to palm oil and fine spices, our passion for
            food is in every colourful bite.
          </h6>
          <img
            src={MangroveProducts}
            alt="Mangrove Products"
            className="img-fluid"
          />
          <div className="about-mangrove-block-2"></div>
          <img
            src={PepperNut}
            alt="Pepper Nut"
            className="img-fluid side-img pepper-nut"
          />
        </div>
        <div className="our-recipes">
          <h5>Mangrove Recipes</h5>
          <div className="our-recipes-content">
            <Carousel
              arrows={false}
              autoPlaySpeed={1000}
              autoPlay={true}
              centerMode={false}
              showDots={true}
              responsive={responsive}
              className="our-recipes-content-carousel"
            >
              {[1, 2, 3].map((_, key) => (
                <div className="our-recipes-content-item" key={key}>
                  <div className="our-recipes-content-item-img">
                    <img
                      src={JollofPlate}
                      alt="Jollof Plate"
                      className="img-fluid"
                    />
                  </div>
                  <div className="our-recipes-content-item-text">
                    <h6>Jollof Rice</h6>
                    <p>
                      Delicious and rich in flavour, this classic recipe is a
                      wonderful taste of home in a bowl
                    </p>
                    <button>
                      <p>See Recipe</p>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="more-recipes-btn-container">
            <button className="more-recipes-btn">
              <p>More Recipes</p>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="footer">
          <div className="logo-column">
            <img src={MangroveLogo} alt="Mangrove Logo" />
          </div>
          <div className="height-line" />
          <div className="menu-column">
            <ul>
              <li>
                <a href="#about-us">About Us</a>
              </li>
              <li>
                <a href="#products-range">products</a>
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
            <div className="copyright-text bottom-footer">
              © MANGROVE FOODS LTD {new Date().getFullYear()} - ALL RIGHTS
              RESERVED
            </div>
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
            <img
              src={MangroveBrand}
              alt="Mangrove Brand"
              className="img-fluid mangrove-brand"
            />
            <div className="social-media-icons bottom-footer">
              <a href="https://www.facebook.com/mangrovefoods">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com/mangrovefoods">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
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
      </div>
    </div>
  );
}
