/*import str from './models/Search'
//import { add as a, multiply as m,ID} from './views/searchView';
import * as searchView from './views/searchView'
//console.log(`Using imported functions! ${a(ID,2)} and ${m(3,5)}.${str}}`);
console.log(`Using imported functions! ${searchView.add(searchView.ID,2)} and ${searchView.multiply(3,5)}.${str}}`);*/
//3535bebde6997633c11f1d49881788cd
//http://food2fork.com/api/search 

import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';
/**Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1) Get query from  view
    const query = searchView.getIput(); //TODO
    //console.log(query);

    if(query){
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        // 4) Search for recipes;
        await state.search.getResults();// 所有async method return 的都是promise，因为getResults定义的是async method所以这里也是返回的promise，所以需要await

        // 5) Render results on UI
        //console.log(state.search.result);
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
});
//const search = new Search('pizza');
//console.log(search);
//search.getResults();
