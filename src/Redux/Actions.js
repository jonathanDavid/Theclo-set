import {REFRESH_CATEGORY,REFRESH_PRENDAS,SET_STATE,REFRESH_SETS} from './Types';

function setState(state){
    return {type: SET_STATE, payload: state};
}

function addCategory(item){
    return {type: REFRESH_CATEGORY, payload: item};
}
function refreshSets(item){
    return {type: REFRESH_SETS, payload: item};
}

function refreshPrendas(item){
    return {type: REFRESH_PRENDAS, payload: item};
}




const actionsCreator ={
  addCategory, setState,refreshSets,refreshPrendas
};

export {actionsCreator};
