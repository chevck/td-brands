export function RecipesDetailModal({ recipe }) {
  return (
    <>
      <div
        className='modal fade recipe-details-modal'
        id='recipe-details-modal'
        tabIndex={-1}
        aria-labelledby='recipe-details-modal-label'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button
                type='button'
                className='bttn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <i className='bi bi-x-circle'></i>
              </button>
            </div>
            <div className='modal-body'>
              <h3>{recipe?.fields?.foodName}</h3>
              <div className='main-ingredient'>
                <i className='bi bi-star-fill'></i>
                <h2>{recipe?.fields?.mainIngredient}</h2>
              </div>
              <div className='details'>
                <div className=''>
                  <i className='bi bi-pin-map'></i>
                  <p>{recipe?.fields?.origin}</p>
                </div>
                <div className=''>
                  <i className='bi bi-star'></i>
                  <p>{recipe?.fields?.vibe}</p>
                </div>
                <div className=''>
                  <i className='bi bi-clock-history'></i>
                  <p>{recipe?.fields?.preparationTime}</p>
                </div>
              </div>
              <div className='description'>
                <h4>Description</h4>
                <p>{recipe?.fields?.description}</p>
              </div>

              <div className='flex'>
                <div className='food-image'>
                  <img
                    src={recipe?.fields?.foodImage.fields.file.url}
                    alt='food-image'
                  />
                </div>
                <div className='ingredients'>
                  <h4>Ingredients</h4>
                  <ul>
                    {(
                      recipe?.fields?.ingredientsList.content.find(
                        (el) => el.nodeType === "unordered-list"
                      )?.content ?? []
                    ).map((el, key) => (
                      <li key={key}>{el.content[0].content[0].value}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='preparation-steps'>
                <h4>Preparation Steps</h4>
                <ul>
                  {(
                    recipe?.fields?.preparationInstructions.content.find(
                      (el) => el.nodeType === "unordered-list"
                    )?.content ?? []
                  ).map((el, key) => (
                    <li key={key}>{el.content[0].content[0].value}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
