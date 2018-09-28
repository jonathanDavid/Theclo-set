import {ADD_CATEGORY, ADD_CLOTHES, SEND_LOUNDRY, SEND_MISSING, DELETE_LOUNDRY, DELETE_MISSING} from './Types';

function addCategory(item){
    return {type: ADD_CATEGORY, payload: item};
}

function addChothes(item){
    return {type: ADD_CLOTHES, payload: item};
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
    return {type: DELETE_MISSING};
}


const actionsCreator ={
  addCategory,addChothes,sendLoundry,sendMissing,deleteLoundry,deleteMissing

};

export {actionsCreator};
