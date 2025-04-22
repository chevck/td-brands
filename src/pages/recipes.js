import { Header } from "../components/header";
import CookedFoodOne from "../assets/processed-food.png";
import CookedFoodTwo from "../assets/fish-rice-removebg-preview.png";

export function Recipes() {
  return (
    <div className="recipes">
      <Header />
      <div className="recipes-container">
        <h1 className="page-title">Our Recipes</h1>
        <ul className="recipe-categories">
          <li className="active">Cereal</li>
          <li>Rice Recipes</li>
          <li>Yam Recipes</li>
          <li>Canned Foods</li>
        </ul>

        <div className="recipes-flex">
          {[1, 2, 3, 4, 5, 6, 2, 4, 2, 3, 2].map((el, key) => (
            <div className="recipe-box" key={key}>
              <div className={`recipe-box-img ${el % 2 ? "fish" : ""}`}>
                <img
                  src={el % 2 ? CookedFoodTwo : CookedFoodOne}
                  alt="recipe"
                  className={`img-fluid`}
                />
              </div>
              <h3>Pasta Del Magrese</h3>
              <ul>
                <li>Origin: Popular West African dish</li>
                <li>Main Ingredient: Mangrove Rice</li>
                <li>Vibe: Spicy, rich, and smoky</li>
                <li>
                  Time (<i className="bi bi-clock"></i>): 20 minutes
                </li>
              </ul>
              <button>
                <span>See More</span>
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
