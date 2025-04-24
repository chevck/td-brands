import { Header } from "../components/header";
import CookedFoodOne from "../assets/processed-food.png";
import CookedFoodTwo from "../assets/fish-rice-removebg-preview.png";
import ChefTwo from "../assets/chef-two.png";

export function Recipes() {
  return (
    <div className="recipes">
      <Header />
      <div className="hero-block">
        <img src={ChefTwo} alt="chef-look" />
        <h3>Delicious Recipes Made With Love</h3>
        <h6>
          From Jollof to Beans Porridge to Eba, explore vibrant recipes crafted
          with Mangrove Foods.
        </h6>
        <button>Submit your recipe</button>
      </div>
      <div className="recipes-container">
        <h1 className="page-title">Explore Our Recipes</h1>
        <ul className="recipe-categories">
          <li className="active">Cereal</li>
          <li>Rice Recipes</li>
          <li>Yam Recipes</li>
          <li>Canned Foods</li>
        </ul>
        <div className="recipes-flex-2">
          {[1, 2, 3, 4, 5, 6, 6, 3, 2, 2].map((el, key) => (
            <div className="recipe-box" key={key}>
              <div className={`recipe-box-img ${el % 2 ? "fish" : ""}`}>
                <img
                  src={el % 2 ? CookedFoodTwo : CookedFoodOne}
                  alt="recipe"
                  className={`img-fluid`}
                />
              </div>
              <div className="recipe-box-content">
                <h3>Jollof Rice</h3>
                <p>A delicious beef african classic</p>
                <button>View Recipe</button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="recipes-flex">
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
        </div> */}
      </div>
    </div>
  );
}
