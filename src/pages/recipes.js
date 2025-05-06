import { Header } from "../components/header";
import ChefTwo from "../assets/chef-one.png";
import { createClient } from "contentful";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Footer } from "../components/footer";

export function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_API_KEY,
  });

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line
  }, []);

  const fetchRecipes = async () => {
    try {
      const { items } = await client.getEntries({
        content_type: "recipes",
        order: "sys.createdAt",
      });
      const categories = [
        ...new Set(items.map((el) => el.fields.mainIngredient)),
      ];
      setCategories(categories);
      setRecipes(items);
    } catch (error) {
      console.log("eree", error);
      toast.error("There was a problem fetching recipes");
    }
  };

  return (
    <div className='recipes'>
      <Header />
      <div className='hero-block'>
        <div className='content'>
          <h3>Delicious Recipes Made With Love</h3>
          <h6>
            From Jollof to Beans Porridge to Eba, explore vibrant recipes
            crafted with Mangrove Foods.
          </h6>
          {/* <button>
            <p>Submit your recipe</p>
            <i className='bi bi-chevron-right'></i>
          </button> */}
        </div>
        <div className='_img'>
          <img src={ChefTwo} alt='chef-look' />
        </div>
      </div>
      <div className='recipes-container'>
        <h1 className='page-title'>Explore Our Recipes</h1>
        <ul className='recipe-categories'>
          <li
            className={`recipe-category ${
              selectedCategory === "all" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </li>
          {categories.map((el, key) => (
            <li
              className={`recipe-category ${
                selectedCategory === el ? "active" : ""
              }`}
              key={key}
              onClick={() => setSelectedCategory(el)}
            >
              {el}
            </li>
          ))}
        </ul>
        <div className='recipes-flex-2'>
          {[...recipes]
            .filter(
              (el) =>
                selectedCategory === "all" ||
                el.fields.mainIngredient === selectedCategory
            )
            .map((el, key) => (
              <div className='recipe-box' key={key}>
                <div className={`recipe-box-img`}>
                  <img
                    src={el.fields.foodImage.fields.file.url}
                    alt='recipe'
                    className={`img-fluid`}
                  />
                </div>
                <div className='recipe-box-content'>
                  <h3>{el?.fields?.foodName || "-"}</h3>
                  <ul>
                    <li>Origin: {el?.fields?.origin || "-"}</li>
                    <li>
                      Main Ingredient: {el?.fields?.mainIngredient || "-"}
                    </li>
                    <li>Vibe: {el?.fields?.vibe || "-"}</li>
                    <li>
                      Time (<i className='bi bi-clock'></i>):{" "}
                      {el?.fields?.preparationTime || "-"}
                    </li>
                  </ul>
                  <button>
                    <p>View Recipe</p>
                    <i className='bi bi-chevron-right'></i>
                  </button>
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
      <Footer />
    </div>
  );
}
