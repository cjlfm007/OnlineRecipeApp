//export default 'I am an exported string.';
import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults() {
        //fetch
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '3535bebde6997633c11f1d49881788cd';
        try{
        const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.result = res.data.recipes;
        console.log(this.result);
        }catch(error){
            alert(error);
        }

    }
}