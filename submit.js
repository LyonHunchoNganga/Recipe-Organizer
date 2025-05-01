
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); 
  
      // Get values from the form fields
      const title = document.getElementById("title").value.trim();
      const category = document.getElementById("category").value;
      const ingredients = document.getElementById("ingredients").value.trim();
      const instructions = document.getElementById("instructions").value.trim();
  
    
      if (!title || !category || !ingredients || !instructions) {
        alert("Please fill in all fields before submitting your recipe.");
        return; // Exit the function if fields are empty
      }
  
      // Create a new recipe object
      const newRecipe = {
        title,
        category,
        ingredients,
        instructions,
        createdAt: new Date().toISOString(), // Store the creation date
      };
  
      // Get existing recipes from localStorage or initialize as an empty array
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  
      // Add the new recipe to the recipes array
      recipes.push(newRecipe);
  
      // Save the updated recipes array back to localStorage
      localStorage.setItem("recipes", JSON.stringify(recipes));
  
      // Display success message
      alert("✅ Your recipe has been successfully added!");
  
      // Reset the form to clear the fields
      form.reset();
    });
  });
      
      
     // Function to display recipes from localStorage
     function displayRecipes() {
        const recipeList = document.getElementById("recipe-list");
        recipeList.innerHTML = ""; // Clear existing list
      
        // Get recipes from localStorage
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      
        // Check if there are any recipes to display
        if (recipes.length === 0) {
          recipeList.innerHTML = "<p>No recipes found.</p>";
          return;
        }
      
        // Loop through each recipe and create HTML elements to display them
        recipes.forEach((recipe, index) => {
          const recipeItem = document.createElement("div");
          recipeItem.className = "recipe-item";
          recipeItem.innerHTML = `
             <h3>${recipe.title}</h3>
             <p><strong>Category:</strong> ${recipe.category}</p>
             <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
             <p><strong>Instructions:</strong> ${recipe.instructions}</p>
             <button class="delete-btn" data-index="${index}">Delete</button>
          `;
          recipeList.appendChild(recipeItem);
      
          // Add event listener for delete button
          const deleteBtn = recipeItem.querySelector(".delete-btn");
          deleteBtn.addEventListener("click", function () {
             deleteRecipe(index); // Call delete function with the index of the recipe
          });
        });
     }  