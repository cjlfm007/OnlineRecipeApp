//export default 'I am an exported string.';
import axios from 'axios';
import {key, proxy} from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults() {
        //fetch
        try{
        const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.result = res.data.recipes;
        console.log(this.result);
        }catch(error){
            alert(error);
        }

    }
}