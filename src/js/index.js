/*import str from './models/Search'
//import { add as a, multiply as m,ID} from './views/searchView';
import * as searchView from './views/searchView'
//console.log(`Using imported functions! ${a(ID,2)} and ${m(3,5)}.${str}}`);
console.log(`Using imported functions! ${searchView.add(searchView.ID,2)} and ${searchView.multiply(3,5)}.${str}}`);*/
//3535bebde6997633c11f1d49881788cd
//http://food2fork.com/api/search 

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Likes';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import {elements, renderLoader,clearLoader} from './views/base';
import Likes from './models/Likes';
/**Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
const state = {};
window.state = state;
/**
 * Search controller
 * 
 */
const controlSearch = async () => {
    // 1) Get query from  view
    const query = searchView.getIput(); //TODO
    if(query){
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            // 4) Search for recipes;
            await state.search.getResults();// 所有async method return 的都是promise，因为getResults定义的是async method所以这里也是返回的promise，所以需要await

            // 5) Render results on UI
            //console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');
    console.log(btn);
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
    }
});

/**
 * RECIPE CONTROLLER
 * const r = new Recipe(35477);
r.getRecipe();
console.log(r);
 */
const controlRecipe = async () => {
    //Get ID from url
    const id =window.location.hash.replace('#','');
    console.log(id);
    if(id){
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if(state.search)searchView.highlightSelected(id);

        //Create new recipe object
        state.recipe = new Recipe(id);

        try{
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //Render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );
        }catch(error){
            console.log(error);
            alert('Error processing recipe')

        }
        
    }
}
 //window.addEventListener('hashchange',controlRecipe);
 //window.addEventListener('load',controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

/***
 * 
 * List Controller
 * 
 */
const controlList = () => {
    //Create a new list IF there in none yet
    if(!state.list) state.list = new List();

    //Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count,el.unit,el.ingredient);
        listView.renderItem(item);
    });
}
//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //Handle the delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //Delete from state
        state.list.deleteItem(id);
        //Delte from  UI
        listView.deleteItem(id);

        //Handle the count update
    }else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value,10);
        state.list.updateCount(id,val);
    }
});

/***
 * 
 * Like Controller
 * 
 */
//TEsting
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());
const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    //user has NOT yet liked current recipe
    if(!state.likes.isLiked(currentID)){
        //Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        )
        //Toggle the like button
        likesView.toggleLikeBtn(true);
        //Add like to UI list
        likesView.renderLike(newLike);
    //user HAS liked current recipe

    }else{
        //Remove like to the state
        state.likes.deleteLike(currentID);
        //Toggle the like button
        likesView.toggleLikeBtn(false);

        //Remove like to UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }else if(e.target.matches('.btn-increase, .btn-increase *')){ //* means all its child
        //Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        //Add ingredients to shopping list
        controlList();
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        //Like controller
        controlLike();
    }
});

window.l = new List();