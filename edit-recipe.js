document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    // Function to populate form with existing recipe data
    function loadRecipeForEditing(index) {
      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const recipeToEdit = recipes[index];
  
      document.getElementById("title").value = recipeToEdit.title;
      document.getElementById("category").value = recipeToEdit.category;
      document.getElementById("ingredients").value = recipeToEdit.ingredients;
      document.getElementById("instructions").value = recipeToEdit.instructions;
  
      // Change form action to update recipe
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
  
        // Get updated form values
        const updatedRecipe = {
          title: document.getElementById("title").value,
          category: document.getElementById("category").value,
          ingredients: document.getElementById("ingredients").value,
          instructions: document.getElementById("instructions").value,
          createdAt: recipeToEdit.createdAt,  // Keep original creation date
        };
  
        // Update the recipe in localStorage
        recipes[index] = updatedRecipe;
        localStorage.setItem("recipes", JSON.stringify(recipes));
  
        alert("✅ Recipe updated successfully!");
        window.location.href = "my-recipes.html";  // Redirect to the recipes list page after editing
      });
    }
  
    // Check for the 'edit' query parameter in URL and load the respective recipe
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('edit');  // Assuming the URL will have ?edit=1 or whatever index
  
    if (editIndex !== null) {
      loadRecipeForEditing(parseInt(editIndex));
    }
  });
  