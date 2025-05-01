document.addEventListener("DOMContentLoaded", function () {
    // Sort recipes by title
    document.getElementById("sort-title").addEventListener("click", function() {
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      recipes.sort((a, b) => a.title.localeCompare(b.title));  // Sort alphabetically
      localStorage.setItem("recipes", JSON.stringify(recipes));
      displayRecipes();  // Re-display sorted recipes
    });
  
    // Sort recipes by category
    document.getElementById("sort-category").addEventListener("click", function() {
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      recipes.sort((a, b) => a.category.localeCompare(b.category));  // Sort alphabetically
      localStorage.setItem("recipes", JSON.stringify(recipes));
      displayRecipes();  // Re-display sorted recipes
    });
  
    // Function to display recipes
    function displayRecipes() {
      const recipesContainer = document.getElementById("recipes-container");
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      recipesContainer.innerHTML = ''; // Clear the container before displaying new content
  
      if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found.</p>';
      }
  
      recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
          <h3>${recipe.title}</h3>
          <p><strong>Category:</strong> ${recipe.category}</p>
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
        recipesContainer.appendChild(recipeDiv);
      });
    }
  });
  