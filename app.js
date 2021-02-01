const getMealBtn = document.getElementById("get_meal");
const mealContainer = document.getElementById("meal");

getMealBtn.addEventListener('click', ()=>{
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
        createMeal(res.meals[0])
    })
});

function createMeal(meal) {

    const ingredients = [];
    for(i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            )
        } else {
            break;
        }
    }

    mealContainer.innerHTML = `
        <div class="row">
            <div class="columns five">
                <img class="p-top" src="${meal.strMealThumb}" alt="Meal Image"/>
                <div class="p-top m-5">
                <p><strong>Category: </strong>${meal.strCategory}</p>
                <p><strong>Area: </strong>${meal.strArea}</p>
                <p><strong>Tags: </strong>${meal.strTags}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>
                    ${ingredients.map(ingredient => `
                        <li>${ingredient}</li>   
                    `).join('')}
                </ul>
                </div>
            </div>
            <div class="seven p-top m-side">
                <h4 class="text-center">${meal.strMeal}</h4>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
        <div class="text-center p-top">
            <h5 class="m-b">Video Recipe Link: </h5>
            <a target="blank" href= ${meal.strYoutube}>Click here</a>
            
        </div>
    `;
}