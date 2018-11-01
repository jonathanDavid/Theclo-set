import {SET_STATE,ADD_CATEGORY, ADD_CLOTHES,ADD_SET, SEND_LOUNDRY, SEND_MISSING, DELETE_LOUNDRY, DELETE_MISSING, CATEGORY_SELECTED,SET_SELECTED} from './Types';
import firebase from 'firebase';
import ApiKeys from '../Database/ApiKeys';
import _ from 'lodash'


const initialState = {};



function applyAddCategory(state,payload){
  console.log(payload);
  return{
    ...state,
    Categorias:{...payload},
  };
}



function applySetState(state,payload){
  return{
    ...payload
  };
}

function applyAddSet(state,payload,Sets){
  return{
    ...state,
    Sets:[...Sets,payload],
  };
}

function applySendLoundry(state,payload,Prendas){
  //let prendas = Prendas;
  //prendas=prendas.Estado = 1;
  return{
    ...state,
    Prendas:[...Prendas]
  };
}

function applyDeleteLoundry(state,payload,Loundry){
  return{
    ...state,
    Loundry: Loundry.filter((Loundry,i)=>i!=payload),
  }
}

function applyAddClothes(state,payload,Categorias,CategorySelected){
  Categorias[CategorySelected].push(payload);
  return{
    ...state,
    Categorias:[...Categorias],
  };
}

function applySendMissing(state,payload,Missing){
  return{
    ...state,
    Missing:[...Missing,payload],
  };
}

function applyDeleteMissing(state,payload,Missing){
  return{
    ...state,
    Missing: Missing.filter((Missing,i)=>i!=payload),
  }
}

function applyCategorySelected(state,payload){
  return{
    ...state,
    CategorySelected:payload,
  };
}

function applySetSelected(state,payload){
  return{
    ...state,
    SetSelected:payload,
  };
}


//reducer funtion
export default Reducer = (state=initialState, action)=>{
  const {Categorias,Prendas,Loundry,Missing, Sets, CategorySelected} = state;
  const {type,payload} = action;

  switch (type) {
    case ADD_CATEGORY:
      return applyAddCategory(state,payload);
    break;
    case ADD_CLOTHES:
      return applyAddClothes(state,payload,Categorias,CategorySelected);
    break;
    case ADD_SET:
      return applyAddSet(state,payload,Sets);
    break;
    case SEND_LOUNDRY:
      return applySendLoundry(state,payload,Prendas);
    break;
    case SEND_MISSING:
      return applySendMissing(state,payload,Missing);
    break;
    case DELETE_LOUNDRY:
      return applyDeleteLoundry(state,payload,Loundry);
    break;
    case DELETE_MISSING:
      return applyDeleteMissing(state,payload,Missing);
    break;
    case CATEGORY_SELECTED:
      return applyCategorySelected(state,payload)
    break;
    case SET_SELECTED:
      return applySetSelected(state,payload)
    break;
    case SET_STATE:
      return applySetState(state,payload)
    break;
    default:
      return state;

  }

}
