import moment from 'moment';

function filterByProperty(array, prop){
    var filtered = [];
    for(var i = 0; i < array.length; i++){
        var obj = array[i];
        if(moment().isBefore(obj[prop])){
            filtered.push(obj);
        }
    }    

    return filtered;

}

export default filterByProperty;