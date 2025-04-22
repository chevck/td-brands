import { Header } from "../components/header";
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
import React, { useEffect } from "react";
import { Footer } from "../components/footer";
import { trackPageView } from "../utils/segment";

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

  useEffect(() => {
    trackPageView("Viewed Landing Page");
  }, []);

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
            <a href="/store-locator">
              <button>
                <p>Where to Buy</p>
                <i className="bi bi-chevron-right"></i>
              </button>
            </a>
          </div>
        </div>
        <div className="products-range" id="products-range">
          <h5>Explore our range</h5>
          <div className="">
            <div className="products">
              <img
                src={MangroveSweetCorn}
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
              <img src={MangroveGreenPeas} alt="peas" className="img-fluid" />
              <img
                src={
                  "https://images.ctfassets.net/b9z5sch0zany/4ksgBaRv2XA0THoABxBGU5/5974040fea3caea221d21d45d78cab0d/MANGROVE_CAN_MACKEREL.png"
                }
                alt="mackerel"
                className="img-fluid"
              />
            </div>
            <div className="discover-more-btn">
              {/* <button>
                <p>Discover More</p>
                <i className="bi bi-chevron-right"></i>
              </button> */}
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
              autoPlaySpeed={5000}
              autoPlay={true}
              centerMode={false}
              draggable={true}
              keyBoardControl={true}
              showDots={true}
              responsive={responsive}
              className="our-recipes-content-carousel"
              dotListClass="custom-dot-list-style"
              renderDotsOutside={true}
              // infinite={true}
            >
              {[1, 2, 3, 4, 5, 6].map((_, key) => (
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
            <button
              className="more-recipes-btn"
              onClick={() => (window.location.href = "/recipes")}
            >
              <p>More Recipes</p>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
