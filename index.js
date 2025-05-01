
document.addEventListener("DOMContentLoaded", function () {

    // Function to display all saved recipes
    function displayRecipes() {
      const recipesContainer = document.getElementById("recipes-container");
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      
      // Clear existing content
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
  
    // Function to delete a recipe from localStorage
    function deleteRecipe(index) {
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      recipes.splice(index, 1);  // Remove the recipe by index
      localStorage.setItem("recipes", JSON.stringify(recipes)); // Save updated list
      displayRecipes();  // Re-display recipes after deletion
    }
  
    // Display recipes on page load
    displayRecipes();
  
    // Handle form submission for adding a new recipe
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop page reload on form submit
  
        // Get values from the form
        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value;
        const ingredients = document.getElementById("ingredients").value.trim();
        const instructions = document.getElementById("instructions").value.trim();
  
        // Validate form fields
        if (!title || !category || !ingredients || !instructions) {
          alert("Please fill in all fields before submitting.");
          return;
        }
  
        // Create new recipe object
        const recipe = {
          title,
          category,
          ingredients,
          instructions,
          createdAt: new Date().toISOString()
        };
  
        // Get existing recipes from localStorage or start with empty array
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  
        // Add new recipe to the array
        recipes.push(recipe);
  
        // Save updated recipes to localStorage
        localStorage.setItem("recipes", JSON.stringify(recipes));
  
        // Notify user of successful submission
        alert("✅ Recipe added successfully!");
  
        // Clear the form
        form.reset();
  
        // Display the updated recipes
        displayRecipes();
      });
    }
  });
  