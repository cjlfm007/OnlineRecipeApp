import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id:uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }
    deleteItem(id){
        //[2,4,8] splice(1,1) -> return 4, original array is [2,8] 从index 1 开始，拿走一个元素，会muted original array也就是改变原数组
        //[2,4,8] slice(1,1) -> return 4, original array is [2,4,8]从index 1 开始，拿走一个元素，不会muted original array
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}