document.getElementById('searchButton').addEventListener('click', function() {
    const ingredientInput = document.getElementById('ingredientInput').value;
    const ingredients = ingredientInput.split(',').map(ingredient => ingredient.trim());

    fetchRecipes(ingredients);
});

function fetchRecipes(ingredients) {
    const appId = 'e0554c24'; 
    const appKey = '010c3a0c52d2af93cd5203e9ddce6f72'; 
    const query = ingredients.join(',');
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayRecipes(data.hits))
        .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;

        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h2>${recipe.label}</h2>
            <ul>
                ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;

        recipesContainer.appendChild(recipeElement);
    });
}
