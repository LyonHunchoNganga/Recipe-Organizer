document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    
    // Add event listener for the search input
    searchInput.addEventListener("input", function() {
      const searchTerm = searchInput.value.toLowerCase();
      const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) || 
        recipe.category.toLowerCase().includes(searchTerm)
      );
      displayRecipes(filteredRecipes);  // Display filtered recipes
    });
  
    // Function to display recipes
    function displayRecipes(filteredRecipes = []) {
      const recipesContainer = document.getElementById("recipes-container");
      recipesContainer.innerHTML = '';  // Clear the container before displaying new content
  
      if (filteredRecipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found matching your search.</p>';
      }
  
      filteredRecipes.forEach((recipe, index) => {
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
// This code listens for input in the search box and filters the displayed recipes based on the search term.  