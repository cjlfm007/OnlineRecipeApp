/*import str from './models/Search'
//import { add as a, multiply as m,ID} from './views/searchView';
import * as searchView from './views/searchView'
//console.log(`Using imported functions! ${a(ID,2)} and ${m(3,5)}.${str}}`);
console.log(`Using imported functions! ${searchView.add(searchView.ID,2)} and ${searchView.multiply(3,5)}.${str}}`);*/
//3535bebde6997633c11f1d49881788cd
//http://food2fork.com/api/search 
import axios from 'axios';

async function getResults(query) {
    //fetch
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '3535bebde6997633c11f1d49881788cd';
    try{
    const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = res.data.recipes;
    console.log(recipes);
    }catch(error){
        alert(error);
    }

}
getResults('pizza');