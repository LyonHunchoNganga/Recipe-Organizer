
document.addEventListener("DOMContentLoaded", function () {

    
    function displayRecipes() {
      const recipesContainer = document.getElementById("recipes-container");
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      
    
      recipesContainer.innerHTML = '';
  
      if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found. Start adding some!</p>';
      }

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
        
        recipesContainer.appendChild(recipeDiv);
      });

      document.querySelectorAll(".delete-recipe").forEach(button => {
        button.addEventListener("click", function () {
          const index = button.getAttribute("data-index");
          deleteRecipe(index);
        });
      });
    }

    function deleteRecipe(index) {
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      recipes.splice(index, 1);  
      localStorage.setItem("recipes", JSON.stringify(recipes)); 
      displayRecipes();  
    }
  
  
    displayRecipes();
  
  
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault(); 
        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value;
        const ingredients = document.getElementById("ingredients").value.trim();
        const instructions = document.getElementById("instructions").value.trim();
  
        if (!title || !category || !ingredients || !instructions) {
          alert("Please fill in all fields before submitting.");
          return;
        }
  
        
        const recipe = {
          title,
          category,
          ingredients,
          instructions,
          createdAt: new Date().toISOString()
        };
  
      
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
  