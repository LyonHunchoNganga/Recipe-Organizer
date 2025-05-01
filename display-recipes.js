document.addEventListener("DOMContentLoaded", function () {
    // Function to display all saved recipes
    function displayRecipes() {
      const recipesContainer = document.getElementById("recipes-container");
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  
      // Clear any existing content
      recipesContainer.innerHTML = '';
  
      if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found. Start adding some!</p>';
      }
  
      // Loop through recipes and display each
      recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
  
        recipeDiv.innerHTML = `
          <h3>${recipe.title}</h3>
          <p><strong>Category:</strong> ${recipe.category}</p>
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <p><strong>Instructions:</strong> ${recipe.instructions}</p>
          <button class="delete-recipe" data-index="${index}">Delete Recipe</button>
        `;
  
        // Append recipe to the container
        recipesContainer.appendChild(recipeDiv);
      });
  
      // Add event listener for delete buttons
      document.querySelectorAll(".delete-recipe").forEach(button => {
        button.addEventListener("click", function () {
          const index = button.getAttribute("data-index");
          deleteRecipe(index);
        });
      });
    }
  
    // Delete a recipe from localStorage
    function deleteRecipe(index) {
      if (confirm("Are you sure you want to delete this recipe?")) {
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.splice(index, 1);  // Remove the recipe at the specified index
        localStorage.setItem("recipes", JSON.stringify(recipes));  // Save updated list back to localStorage
        displayRecipes();  // Re-render the recipes
      }
    }

    displayRecipes();
  });
  