import {SET_STATE,EDIT_CATEGORY,ADD_CATEGORY, ADD_CLOTHES,ADD_SET, SEND_LOUNDRY, SEND_MISSING, DELETE_LOUNDRY, DELETE_MISSING,CATEGORY_SELECTED,SET_SELECTED} from './Types';

function setState(state){
    return {type: SET_STATE, payload: state};
}

function addCategory(item){
    return {type: ADD_CATEGORY, payload: item};
}

function editCategory(item){
    return {type: EDIT_CATEGORY, payload: item};
}

function addChothes(item){
    return {type: ADD_CLOTHES, payload: item};
}
function addSet(item){
    return {type: ADD_SET, payload: item};
}

function sendLoundry(item){
    return {type: SEND_LOUNDRY, payload: item};
}

function sendMissing(item){
    return {type: SEND_MISSING, payload: item};
}

function deleteLoundry(index){
    return {type: DELETE_LOUNDRY, payload: index};
}

function deleteMissing(index){
    return {type: DELETE_MISSING, payload: index};
}
function categorySelected(index){
    return {type: CATEGORY_SELECTED, payload: index};
}
function setSelected(index){
    return {type: SET_SELECTED, payload: index};
}


const actionsCreator ={
  addCategory,editCategory,setState,addChothes,addSet,sendLoundry,sendMissing,deleteLoundry,deleteMissing,categorySelected,categorySelected,setSelected

};

export {actionsCreator};
